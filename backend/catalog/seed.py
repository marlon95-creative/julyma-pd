"""Starting catalogue taken from the Julyma Printers and Designers Ltd company profile.

Runs after `migrate` when the catalogue is empty, or any time with `python manage.py seed_julyma`
(which only adds what is missing and never overwrites what staff have edited).
Product photos live in backend/seed_media/products/ and are copied into the media folder.
"""
from pathlib import Path

from django.core.files.base import ContentFile

SEED_DIR = Path(__file__).resolve().parent.parent / "seed_media" / "products"

CATEGORIES = [
    # slug, name, kind, description
    ("ppe", "PPEs", "product",
     "Personal protective equipment: safety boots, gumboots, dust masks, safety glasses, earplugs, helmets, "
     "gloves, reflectors, fire safety PPEs, bee PPEs and more."),
    ("hospital-uniforms", "Hospital Uniforms", "product",
     "Uniforms for nurses, doctors and hospital staff: scrubs, dresses, gowns, coats and aprons."),
    ("executive-uniforms", "Executive Uniforms", "product",
     "Executive and office uniforms: shirts, suits, polo shirts and jackets."),
    ("school-uniforms", "School Uniforms", "product",
     "Education and school uniforms: shirts, ties and skirts."),
    ("industrial-uniforms", "Industrial Uniforms and Work Wear", "product",
     "Safety garments for work: overalls, dust coats, work suits, work shirts, work trousers, "
     "work blouses and work skirts."),
    ("branding-services", "Printing and Branding Services", "service",
     "Large format printing, screen printing and embroidery."),
]

# image file (without .webp) or None, name, category slug, description, featured
PRODUCTS = [
    # ---------------- PPEs ----------------
    ("safety-helmet-red", "Safety helmet", "ppe", "Red hard hat for head protection on site.", True),
    ("bump-cap-blue", "Bump cap (blue)", "ppe", "Blue bump cap with a reflective strip.", False),
    ("work-cap-yellow", "Work cap (yellow)", "ppe", "Yellow work cap. Can be branded with your logo.", False),
    ("work-cap-blue", "Work cap (blue)", "ppe", "Blue work cap. Can be branded with your logo.", False),
    ("reflective-vest-lime", "Reflective vest (lime)", "ppe", "High-visibility lime vest with silver reflective bands and a front zip.", False),
    ("reflective-vest-green-navy", "Reflective vest (green and navy)", "ppe", "High-visibility green vest with navy and reflective bands.", False),
    ("fire-safety-suit-navy", "Fire safety suit", "ppe", "Navy fire safety jacket and trousers with reflective bands.", False),
    ("aluminised-fire-suit", "Aluminised fire suit", "ppe", "Silver aluminised fire suit.", False),
    ("fire-helmet-visor", "Fire helmet with visor", "ppe", "Fire safety helmet with a face visor and neck cover.", False),
    ("fire-safety-boots", "Fire safety boots", "ppe", "Yellow and black fire safety boots.", False),
    ("fire-safety-gloves", "Fire safety gloves", "ppe", "Navy fire safety gloves with a reflective strip.", False),
    ("protective-arm-sleeves", "Protective arm sleeves", "ppe", "Grey protective arm sleeves.", False),
    ("rubber-gloves", "Rubber gloves", "ppe", "Long-cuff rubber gloves.", False),
    ("leather-work-gloves", "Leather work gloves", "ppe", "Leather work gloves with striped cotton backs.", False),
    ("blue-leather-gloves", "Blue work gloves", "ppe", "Blue long-cuff work gloves.", False),
    ("dust-mask-valve", "Dust mask with valve", "ppe", "Dust mask with an exhalation valve.", False),
    ("half-face-respirator-black", "Half-face respirator (black)", "ppe", "Half-face respirator with filter cartridges.", False),
    ("half-face-respirator-grey", "Half-face respirator (grey)", "ppe", "Half-face respirator with head straps.", False),
    ("full-face-respirator", "Full-face respirator", "ppe", "Full-face mask with filter.", False),
    ("safety-shoes-grey", "Safety boots (black and grey)", "ppe", "Lace-up safety boots with a thick tread sole.", False),
    ("safety-boots-tan", "Safety boots (tan)", "ppe", "Tan lace-up safety boots.", False),
    ("safety-boots-brown", "Safety boots (brown)", "ppe", "Brown lace-up safety boots.", False),
    ("safety-shoes-black", "Safety shoes (black)", "ppe", "Black leather safety shoes.", False),
    ("safety-harness", "Safety harness", "ppe", "Safety harness with lanyard.", False),
    (None, "Gumboots", "ppe", "Supplied on request. Tell us the size and quantity.", False),
    (None, "Safety glasses", "ppe", "Supplied on request. Tell us the quantity.", False),
    (None, "Earplugs", "ppe", "Supplied on request. Tell us the quantity.", False),
    (None, "Bee PPE", "ppe", "Protective wear for beekeeping. Supplied on request.", False),
    # ---------------- Hospital Uniforms ----------------
    ("scrub-set-pink", "Scrub set (pink)", "hospital-uniforms", "Scrub top and trousers set.", True),
    ("nurse-dress-navy", "Nurse dress (navy)", "hospital-uniforms", "Navy nurse dress with white trim.", False),
    ("nurse-dress-white", "Nurse dress (white)", "hospital-uniforms", "White nurse dress.", False),
    ("wrap-dress-pink", "Wrap-style uniform (pink)", "hospital-uniforms", "Pink short-sleeve wrap-style uniform.", False),
    ("hospital-gown-green", "Hospital gown (green)", "hospital-uniforms", "Green gown with side ties.", False),
    ("lab-coat-white", "Lab coat (white)", "hospital-uniforms", "White coat with pockets.", False),
    ("chef-hat", "Chef hat", "hospital-uniforms", "White chef hat.", False),
    ("aprons-white", "Aprons (white)", "hospital-uniforms", "White aprons with a front pocket.", False),
    # ---------------- Executive Uniforms ----------------
    ("office-shirt-and-tie", "Office shirt, tie and trousers", "executive-uniforms", "Corporate shirt, tie and trousers for men and women.", True),
    ("office-shirt-blue", "Office shirt (blue)", "executive-uniforms", "Blue long-sleeve office shirt. Logo embroidery available.", False),
    ("kaunda-suit-grey", "Kaunda suit (grey)", "executive-uniforms", "Grey Kaunda suit.", False),
    ("polo-shirts-assorted", "Polo shirts (assorted colours)", "executive-uniforms", "Polo shirts in assorted colours. Can be branded with your logo.", False),
    ("work-shirt-grey", "Long-sleeve shirt (grey)", "executive-uniforms", "Grey long-sleeve shirt with a chest pocket.", False),
    ("utility-jacket-khaki", "Utility jacket (khaki)", "executive-uniforms", "Khaki utility jacket with pockets.", False),
    ("short-sleeve-shirt-teal", "Short-sleeve shirt (teal)", "executive-uniforms", "Teal short-sleeve shirt with white piping.", False),
    ("short-sleeve-shirt-white", "Short-sleeve shirt (white)", "executive-uniforms", "White short-sleeve shirt with a chest pocket.", False),
    ("scrub-top-printed", "Printed top (women)", "executive-uniforms", "Printed short-sleeve top for women.", False),
    # ---------------- School Uniforms ----------------
    ("girls-school-uniform", "Girls' school uniform", "school-uniforms", "White shirt, tie and checked skirt.", True),
    ("boys-school-shirt-tie", "Boys' school shirt and tie", "school-uniforms", "Light blue short-sleeve shirt with tie.", False),
    # ---------------- Industrial Uniforms ----------------
    ("hi-vis-shirt-yellow", "Hi-vis work shirt (yellow and navy)", "industrial-uniforms", "Yellow and navy work shirt with reflective bands.", False),
    ("hi-vis-shirt-orange", "Hi-vis work shirt (orange and navy)", "industrial-uniforms", "Orange and navy work shirt with reflective bands.", False),
    ("coveralls-assorted", "Overalls (assorted colours)", "industrial-uniforms", "Overalls with reflective strips, in grey, navy, beige, orange, red and blue.", False),
    ("dust-coat-blue", "Dust coat (blue)", "industrial-uniforms", "Blue dust coat.", False),
    ("work-trousers-navy", "Work trousers (navy)", "industrial-uniforms", "Navy work trousers with reflective bands.", False),
    ("work-trousers-yellow", "Work trousers (yellow)", "industrial-uniforms", "Yellow work trousers with a reflective band.", False),
]


def seed_defaults(sender=None, force=False, **kwargs):
    """Seed once on an empty catalogue (after migrate), or top up when forced."""
    from .models import Category, Product

    if not force and Category.objects.exists():
        return 0
    created = 0
    cats = {}
    for i, (slug, name, kind, desc) in enumerate(CATEGORIES):
        cat, was_new = Category.objects.get_or_create(
            slug=slug, defaults={"name": name, "kind": kind, "description": desc, "sort_order": i})
        cats[slug] = cat
        created += was_new
    for i, (img, name, cat_slug, desc, featured) in enumerate(PRODUCTS):
        product, was_new = Product.objects.get_or_create(
            name=name, category=cats[cat_slug],
            defaults={"description": desc, "featured": featured, "sort_order": i, "image_alt": name})
        if was_new:
            created += 1
            path = SEED_DIR / f"{img}.webp" if img else None
            if path and path.exists():
                product.image.save(f"{img}.webp", ContentFile(path.read_bytes()), save=True)
    return created
