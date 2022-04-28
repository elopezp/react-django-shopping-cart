from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from core.models import Order, Product
from order.serializers import OrderSerializer,\
    OrderUserSerializer, OrderDetailSerializer


ORDERS_URL = reverse('order:orders')

ORDERS_CREATE_URL = reverse('order:orders-create')


def detail_url(order_id):
    """Return order detail URL"""
    return reverse('order:order-detail', args=[order_id])


def sample_order(user, **params):
    """Create and return a sample order"""
    defaults = {
        'totalPrice': 999.00
    }
    defaults.update(params)
    return Order.objects.create(user=user, **defaults)


def sample_product(user, **params):
    """Create and return a sample product"""
    defaults = {
        'title': 'God of War',
        'price': 300.00,
        'countInStock': 10,
        'image': '/placeholder.jpg'
    }
    defaults.update(params)
    return Product.objects.create(user=user, **defaults)


class PublicOrderApiTests(TestCase):
    """Test unauthenticated order API access"""

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test that authentication is required"""
        res = self.client.get(ORDERS_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateOrderApiTests(TestCase):
    """Test unauthenticated order API access"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'test@gmail.com',
            'testpass'
        )
        self.client.force_authenticate(self.user)

    def test_retrieve_orders(self):
        """Test retrieving a list of orders"""
        sample_order(user=self.user)
        sample_order(user=self.user)

        res = self.client.get(ORDERS_URL)

        orders = Order.objects.all().order_by('-id')
        serializer = OrderUserSerializer(orders, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['orders'], serializer.data)

    def test_create_order_items(self):
        """Test creating order with items"""
        payload = {
            "totalPrice": 600.00,
            "orderItems": [
            {
                "product": 1,
                "qty": 1,
                "price": 300.00
            },
            {
                "product": 2,
                "qty": 10,
                "price": 300.00
            }
            ]
        }
        sample_product(user=self.user)
        sample_product(user=self.user)
        res = self.client.post(ORDERS_CREATE_URL, payload, format='json')

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        order = Order.objects.get(id=res.data['id'])
        serializer = OrderSerializer(order, many=False)
        self.assertEqual(res.data, serializer.data)

    def test_retrieve_order(self):
        """Test retrieving a order"""
        order = sample_order(user=self.user)
        url = detail_url(order.id)
        res = self.client.get(url)
        orders = Order.objects.get(id=res.data['id'])
        serializer = OrderDetailSerializer(orders, many=False)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)
