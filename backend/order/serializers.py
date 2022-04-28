from rest_framework import serializers
from core.models import Order, OrderItem
from account.serializers import UserSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = (
            'id', 'title', 'qty', 'price', 'image',
        )
        read_only_fields = ('id',)


class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = (
            'id', 'totalPrice', 'createdAt',
        )
        read_only_fields = ('id',)


class OrderUserSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = (
            'id', 'totalPrice', 'createdAt', 'user',
        )
        read_only_fields = ('id',)

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data


class OrderDetailSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = (
            'id', 'totalPrice', 'orderItems',
        )
        read_only_fields = ('id',)

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data
