from rest_framework import serializers
from core.models import Product


class ProductSerializer(serializers.ModelSerializer):
    """Serialize a product"""

    class Meta:
        model = Product
        fields = (
            'id', 'title', 'price', 'countInStock', 'image',
        )
        read_only_fields = ('id',)
