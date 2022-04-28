from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from core.models import Product
from product.serializers import ProductSerializer

PRODUCTS_URL = reverse('product:product-list')


def detail_url(product_id):
    """Return product detail URL"""
    return reverse('product:product-detail', args=[product_id])


def image_upload_url(product_id):
    """Return URL for product image upload"""
    return reverse('product:product-upload-image', args=[product_id])


def sample_product(user, **params):
    """Create and return a sample product"""
    defaults = {
        'title': 'Sample product',
        'price': 5.00,
    }
    defaults.update(params)
    return Product.objects.create(user=user, **defaults)


class PublicProductApiTests(TestCase):
    """Test unauthenticated product API access"""

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test that authentication is required"""
        res = self.client.get(PRODUCTS_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateProductApiTests(TestCase):
    """Test unauthenticated product API access"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'test@gmail.com',
            'testpass'
        )
        self.client.force_authenticate(self.user)

    def test_retrieve_products(self):
        """Test retrieving a list of products"""
        sample_product(user=self.user)
        sample_product(user=self.user)

        res = self.client.get(PRODUCTS_URL)

        products = Product.objects.all().order_by('-id')
        serializer = ProductSerializer(products, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_view_product_detail(self):
        """Test viewing a product detail"""
        product = sample_product(user=self.user)
        url = detail_url(product.id)
        res = self.client.get(url)

        serializer = ProductSerializer(product)
        self.assertEqual(res.data, serializer.data)

    def test_create_basic_product(self):
        """Test creating product"""
        payload = {
            'title': 'God of War',
            'price': 499,
        }
        res = self.client.post(PRODUCTS_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        product = Product.objects.get(id=res.data['id'])
        for key in payload.keys():
            self.assertEqual(payload[key], getattr(product, key))
