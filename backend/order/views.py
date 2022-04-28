from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from core.models import Product, Order, OrderItem
from order.serializers import OrderSerializer, OrderUserSerializer, OrderDetailSerializer
from rest_framework import status


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def createOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response(
            {'detail': 'No Order Items'},
            status=status.HTTP_400_BAD_REQUEST
        )
    else:
        # (1) Create order
        order = Order.objects.create(
            user=user,
            totalPrice=data['totalPrice']
        )
        # (2) Create order items adn set order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                title=product.title,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )
            # (3) Update stock
            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getOrders(request):
    orders = Order.objects.order_by('-createdAt')
    page = request.query_params.get('page')
    paginator = Paginator(orders, 5)
    try:
        orders = paginator.page(page)
    except PageNotAnInteger:
        orders = paginator.page(1)
    except EmptyPage:
        orders = paginator.page(paginator.num_pages)

    if page is None:
        page = 1
    page = int(page)
    serializer = OrderUserSerializer(orders, many=True)
    return Response({
        'orders': serializer.data,
        'page': page,
        'pages': paginator.num_pages,
        })


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getOrderDetail(request, pk):
    order = Order.objects.get(id=pk)
    serializer = OrderDetailSerializer(order, many=False)
    return Response(serializer.data)
