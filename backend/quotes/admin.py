from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html

from .models import QuoteRequest


@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = ("reference", "full_name", "category", "service_or_product", "phone", "status", "created_at")
    list_editable = ("status",)
    list_filter = ("status", "category", "created_at")
    search_fields = ("full_name", "company_name", "email", "phone", "service_or_product", "request_note")
    date_hierarchy = "created_at"
    readonly_fields = ("reference", "created_at", "updated_at", "attachment_link")
    exclude = ("attachment",)
    fieldsets = (
        ("Client", {"fields": ("reference", "full_name", "company_name", "phone", "email", "preferred_contact_method")}),
        ("Request", {"fields": ("category", "service_or_product", "quantity", "project_location",
                                "preferred_date", "budget", "request_note", "attachment_link")}),
        ("Management", {"fields": ("status", "quotation_response", "created_at", "updated_at")}),
    )

    @admin.display(description="Attachment")
    def attachment_link(self, obj):
        if obj.pk and obj.attachment:
            return format_html('<a href="{}">Download</a>', reverse("quote-attachment", args=[obj.pk]))
        return "None"

    def has_add_permission(self, request):
        return False  # requests come from the public form only
