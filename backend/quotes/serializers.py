from rest_framework import serializers

from catalog.models import Category
from .models import QuoteRequest


class QuoteRequestSerializer(serializers.ModelSerializer):
    # Request type: a category slug from the catalogue, or "other"
    category = serializers.CharField()
    # Honeypot: real users never see or fill this field
    website = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = QuoteRequest
        fields = ["full_name", "company_name", "phone", "email", "category",
                  "service_or_product", "quantity", "project_location", "preferred_date",
                  "budget", "request_note", "attachment", "preferred_contact_method", "website"]
        extra_kwargs = {
            "request_note": {"min_length": 10},
            "quantity": {"min_value": 1, "max_value": 100000},
        }

    def validate_category(self, value):
        if value == "other":
            return None
        try:
            return Category.objects.get(slug=value, is_active=True)
        except Category.DoesNotExist:
            raise serializers.ValidationError("Choose a request type from the list.")

    def validate(self, data):
        if data.pop("website", ""):
            raise serializers.ValidationError("Request rejected.")
        return data
