from django.urls import path
from .views import QuoteCreate

urlpatterns = [path("quotes/", QuoteCreate.as_view(), name="quote-create")]
