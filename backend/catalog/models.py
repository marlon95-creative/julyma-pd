from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    """A product group (PPEs, Hospital Uniforms...) or a service group (branding)."""

    class Kind(models.TextChoices):
        PRODUCT = "product", "Products (shown in the catalogue)"
        SERVICE = "service", "Services (quote form only)"

    name = models.CharField(max_length=120, unique=True)
    slug = models.SlugField(max_length=130, unique=True, blank=True)
    kind = models.CharField(max_length=10, choices=Kind.choices, default=Kind.PRODUCT)
    description = models.CharField(max_length=400, blank=True)
    image = models.ImageField(upload_to="categories/", blank=True,
                              help_text="Optional. If empty, a product photo from this category is used.")
    is_active = models.BooleanField("active", default=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "name"]
        verbose_name_plural = "categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)[:120] or "category"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Product(models.Model):
    """A catalogue item. Staff add and change these in the admin area."""

    name = models.CharField(max_length=150)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="products",
                                 limit_choices_to={"kind": "product"})
    description = models.CharField(max_length=300, blank=True)
    specifications = models.TextField(blank=True, help_text="Only confirmed specs. One per line.")
    image = models.ImageField(upload_to="products/", blank=True)
    image_alt = models.CharField(max_length=150, blank=True)
    featured = models.BooleanField(default=False, help_text="Show on the Home page")
    is_active = models.BooleanField("published", default=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["category__sort_order", "sort_order", "name"]

    def __str__(self):
        return self.name
