import logging

from django.conf import settings
from django.core.mail import send_mail

log = logging.getLogger(__name__)


def send_quote_emails(q):
    """An email problem must never fail the client's submission."""
    try:
        if settings.QUOTE_NOTIFY_EMAIL:
            send_mail(
                f"New quote request {q.reference}: {q.request_type_label}",
                f"From: {q.full_name} ({q.company_name or 'no company'})\n"
                f"Phone: {q.phone}\nEmail: {q.email}\n"
                f"Type: {q.request_type_label}\nItem: {q.service_or_product} (qty: {q.quantity or '-'})\n"
                f"Location: {q.project_location or '-'}\nTimeline: {q.preferred_date or '-'}\n"
                f"Budget: {q.budget or '-'}\n\n{q.request_note}\n\nManage it in the admin area.",
                settings.DEFAULT_FROM_EMAIL, [settings.QUOTE_NOTIFY_EMAIL],
            )
        send_mail(
            f"We received your request {q.reference}",
            f"Hello {q.full_name},\n\nThank you for contacting us. Your reference number is "
            f"{q.reference}. Our team will review your request and reply with a quotation.\n",
            settings.DEFAULT_FROM_EMAIL, [q.email],
        )
    except Exception:  # noqa: BLE001
        log.exception("Quote notification failed for %s", q.pk)
