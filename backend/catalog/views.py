from rest_framework.generics import ListAPIView

from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer


class CategoryList(ListAPIView):
    serializer_class = CategorySerializer
    pagination_class = None
    queryset = Category.objects.filter(is_active=True)


class ProductList(ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Product.objects.filter(is_active=True, category__is_active=True).select_related("category")
        slug = self.request.query_params.get("category")
        if slug:
            qs = qs.filter(category__slug=slug)
        return qs
