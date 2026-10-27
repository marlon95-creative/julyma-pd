from rest_framework import serializers

from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "kind", "description", "image", "product_count"]

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        first = (obj.products.filter(is_active=True).exclude(image="")
                 .order_by("-featured", "sort_order", "name").first())
        return first.image.url if first else None

    def get_product_count(self, obj):
        return obj.products.filter(is_active=True).count()


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field="slug", read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)
    image = serializers.SerializerMethodField()
    specifications = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id", "name", "category", "category_name", "description",
                  "specifications", "image", "image_alt", "featured"]

    def get_image(self, obj):
        return obj.image.url if obj.image else None

    def get_specifications(self, obj):
        return [l.strip() for l in obj.specifications.splitlines() if l.strip()]
