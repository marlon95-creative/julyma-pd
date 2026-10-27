import uuid

from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.db import models

from catalog.models import Category
from .validators import phone_validator, validate_attachment

private_storage = FileSystemStorage(location=settings.PRIVATE_MEDIA_ROOT)


def attachment_path(instance, filename):
    # Random name: the client's filename is never used on disk
    ext = filename.rsplit(".", 1)[-1].lower()
    return f"quotes/{uuid.uuid4().hex}.{ext}"


class QuoteRequest(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "New"
        REVIEWING = "reviewing", "Reviewing"
        QUOTED = "quoted", "Quoted"
        COMPLETED = "completed", "Completed"
        CANCELLED = "cancelled", "Cancelled"

    class ContactMethod(models.TextChoices):
        PHONE = "phone", "Phone"
        EMAIL = "email", "Email"
        WHATSAPP = "whatsapp", "WhatsApp"

    full_name = models.CharField(max_length=120)
    company_name = models.CharField(max_length=150, blank=True)
    phone = models.CharField(max_length=25, validators=[phone_validator])
    email = models.EmailField()
    category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.SET_NULL,
                                 related_name="quote_requests", help_text="Empty means Other / not sure.")
    service_or_product = models.CharField(max_length=150)
    quantity = models.PositiveIntegerField(null=True, blank=True)
    project_location = models.CharField(max_length=200, blank=True)
    preferred_date = models.CharField("preferred date / timeline", max_length=100, blank=True)
    budget = models.CharField(max_length=100, blank=True)
    request_note = models.TextField(max_length=3000)
    attachment = models.FileField(upload_to=attachment_path, storage=private_storage,
                                  blank=True, validators=[validate_attachment])
    preferred_contact_method = models.CharField(max_length=10, choices=ContactMethod.choices, blank=True)

    status = models.CharField(max_length=12, choices=Status.choices, default=Status.NEW, db_index=True)
    quotation_response = models.TextField(blank=True, help_text="Staff only: quotation / response given to the client.")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    @property
    def reference(self):
        return f"JP-{self.created_at:%Y%m%d}-{self.pk:05d}"

    @property
    def request_type_label(self):
        return self.category.name if self.category else "Other"

    def __str__(self):
        return f"{self.reference} - {self.full_name}"
