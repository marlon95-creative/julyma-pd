from django.core.cache import cache
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings
import tempfile

from catalog.models import Category, Product
from .models import QuoteRequest

VALID = {
    "full_name": "Asha Mushi", "phone": "+255 754 000 111", "email": "asha@example.com",
    "category": "hospital-uniforms", "service_or_product": "Scrub set (pink)",
    "request_note": "We need 40 scrub sets in mixed sizes.", "quantity": "40",
}


@override_settings(PRIVATE_MEDIA_ROOT=tempfile.mkdtemp())
class CatalogApiTests(TestCase):
    def setUp(self):
        cache.clear()

    def test_the_four_profile_categories_exist(self):
        names = [c["name"] for c in self.client.get("/api/categories/").json()]
        for wanted in ("PPEs", "Hospital Uniforms", "Executive Uniforms", "School Uniforms"):
            self.assertIn(wanted, names)

    def test_every_product_category_has_photos(self):
        for cat in Category.objects.filter(kind="product"):
            self.assertTrue(cat.products.exclude(image="").exists(), cat.slug)

    def test_products_filter_by_category(self):
        data = self.client.get("/api/products/?category=school-uniforms").json()
        self.assertEqual({p["category"] for p in data}, {"school-uniforms"})
        self.assertTrue(all(p["image"] for p in data))

    def test_unpublished_products_are_hidden(self):
        p = Product.objects.filter(category__slug="ppe").first()
        p.is_active = False
        p.save()
        names = [x["name"] for x in self.client.get("/api/products/?category=ppe").json()]
        self.assertNotIn(p.name, names)


@override_settings(PRIVATE_MEDIA_ROOT=tempfile.mkdtemp())
class QuoteApiTests(TestCase):
    def setUp(self):
        cache.clear()

    def test_valid_request_is_stored_and_returns_only_a_reference(self):
        r = self.client.post("/api/quotes/", VALID)
        self.assertEqual(r.status_code, 201)
        self.assertEqual(list(r.json()), ["reference"])
        q = QuoteRequest.objects.get()
        self.assertEqual(q.category.slug, "hospital-uniforms")
        self.assertTrue(q.reference.startswith("JP-"))

    def test_every_category_is_accepted_including_other(self):
        for slug in ["ppe", "hospital-uniforms", "executive-uniforms", "school-uniforms", "other"]:
            cache.clear()
            self.assertEqual(self.client.post("/api/quotes/", {**VALID, "category": slug}).status_code, 201, slug)
        self.assertIsNone(QuoteRequest.objects.filter(category=None).first().category)

    def test_unknown_category_and_missing_fields_are_rejected(self):
        self.assertEqual(self.client.post("/api/quotes/", {**VALID, "category": "nope"}).status_code, 400)
        bad = {k: v for k, v in VALID.items() if k not in ("email", "phone")}
        r = self.client.post("/api/quotes/", bad)
        self.assertEqual(r.status_code, 400)
        self.assertIn("email", r.json())
        self.assertIn("phone", r.json())
        self.assertEqual(QuoteRequest.objects.count(), 0)

    def test_honeypot_blocks_bots(self):
        self.assertEqual(self.client.post("/api/quotes/", {**VALID, "website": "http://spam"}).status_code, 400)

    def test_attachment_type_is_checked_by_content(self):
        fake = SimpleUploadedFile("plan.pdf", b"MZ-this-is-an-exe", content_type="application/pdf")
        self.assertEqual(self.client.post("/api/quotes/", {**VALID, "attachment": fake}).status_code, 400)
        cache.clear()
        ok = SimpleUploadedFile("plan.pdf", b"%PDF-1.4 test", content_type="application/pdf")
        self.assertEqual(self.client.post("/api/quotes/", {**VALID, "attachment": ok}).status_code, 201)

    def test_rate_limit(self):
        codes = [self.client.post("/api/quotes/", VALID).status_code for _ in range(7)]
        self.assertIn(429, codes)

    def test_attachments_are_staff_only(self):
        ok = SimpleUploadedFile("plan.pdf", b"%PDF-1.4 test", content_type="application/pdf")
        self.client.post("/api/quotes/", {**VALID, "attachment": ok})
        pk = QuoteRequest.objects.get().pk
        self.assertEqual(self.client.get(f"/admin-files/quotes/{pk}/attachment/").status_code, 302)  # to login
