# Julyma Printers and Designers Ltd: website (React + Django)

Frontend: React (Vite) in `frontend/`. Backend: Django + Django REST Framework in `backend/`.
Content comes from the company profile (PPEs, Hospital, Executive, School and Industrial uniforms, printing and branding).

## Run it locally
**Backend** (Python 3.11+)
```bash
cd backend
python -m venv .venv && source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                                    # then edit values
python manage.py migrate                                # also loads the categories and 49 product photos
python manage.py createsuperuser                        # you choose the admin username and password
python manage.py runserver                              # http://localhost:8000/admin/
```
**Frontend** (Node 18+)
```bash
cd frontend
npm install
npm run dev                                             # http://localhost:5173
```
Migrations are already included. `python manage.py test` runs the backend tests.

## What is on the site
- **Header**: company logo on the left, navigation, Light/Dark toggle, phone and email bar. **Footer**: logo, links, categories, phones, email, website and the addresses below.
- **Pages**: Home, About (company, management, organization structure, clientele, registration), Services, Products (by category), Request Quote, Contact.
- **Categories**: PPEs, Hospital Uniforms, Executive Uniforms, School Uniforms, Industrial Uniforms and Work Wear (also in the profile), and Printing and Branding Services (quote form only).
- **Request Quote form**: request type = the categories above (or Other); the "Product or service" list then shows the products of that category, so everything in the catalogue can be requested. Product cards open the form pre-filled.

## Addresses (from the profile, in `frontend/src/config.js`)
- Main Office: P.O. Box 238, Kona ya Bwiru, Mwanza, Tanzania. Phone +255 622 552 421.
- Branch Office: P.O. Box 31996, Ali Maua B Street / Salma Kikwete Road, Kijitonyama, Dar es Salaam, Tanzania. Phone +255 754 620 348 / +255 622 552 421.
- Factory: Kunduchi RTD, Plot No. 513, along Salasala Road, Dar es Salaam.
- Email info@julyma-pd.co.tz, website www.julyma-pd.co.tz.
Change them in `config.js` only; the header, footer, Home and Contact pages all read from it.

## Managing the site (`/admin/`)
- **Products / Categories**: add, edit, hide (untick "published"), re-order, mark "featured" for the Home page, upload photos. Move a product to another category by editing it.
- **Quote requests**: filter by status, category and date; change status; record the quotation response; download attachments (staff only).
- To re-add missing starter items later: `python manage.py seed_julyma` (never overwrites your edits).

## Production notes
Set `DJANGO_DEBUG=0`, a long `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`, `CSRF_TRUSTED_ORIGINS`, PostgreSQL and SMTP variables (see `.env.example`). Run `npm run build`, serve `frontend/dist` on the same domain and proxy `/api`, `/admin` and `/media` to gunicorn (or set `VITE_API_URL` and `CORS_ALLOWED_ORIGINS`). Serve `/media/` (product photos) from your web server; `private_media/` (client attachments) must never be web-served. Run `collectstatic` for the admin styles.
