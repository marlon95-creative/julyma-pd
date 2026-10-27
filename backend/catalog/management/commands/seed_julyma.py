from django.core.management.base import BaseCommand

from catalog.seed import seed_defaults


class Command(BaseCommand):
    help = "Create (or top up) the Julyma categories and products from the company profile. Safe to run again."

    def handle(self, *args, **options):
        made = seed_defaults(force=True)
        self.stdout.write(self.style.SUCCESS(f"Done. Created {made} new item(s)."))
