from django.contrib import admin

from .models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "kind", "is_active", "sort_order")
    list_editable = ("is_active", "sort_order")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "featured", "is_active", "sort_order")
    list_filter = ("category", "featured", "is_active")
    list_editable = ("featured", "is_active", "sort_order")
    search_fields = ("name", "description")
