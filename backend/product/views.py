from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from core.models import Product
from product import serializers


class ProductViewSet(viewsets.ModelViewSet):
    """Manage products in the database"""
    serializer_class = serializers.ProductSerializer
    queryset = Product.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def _params_to_ints(self, qs):
        """Convert a list of string IDs to a list of integers"""
        return [int(str_id) for str_id in qs.split(',')]

    def get_queryset(self):
        """Retrieve the products for the authenticated user"""
        queryset = self.queryset
        return queryset.all().order_by('-id')

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            return serializers.ProductSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new product"""
        serializer.save(user=self.request.user)

    @action(detail=False, url_path="instock")
    def get_instock(self, request):
        """Retrieve the products in stock for the authenticated user"""
        products = self.get_queryset().filter(countInStock__gt=0)
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)
