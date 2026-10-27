from django.contrib.admin.views.decorators import staff_member_required
from django.http import FileResponse, Http404
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView

from .models import QuoteRequest
from .notifications import send_quote_emails
from .serializers import QuoteRequestSerializer


class QuoteThrottle(AnonRateThrottle):
    scope = "quote"


class QuoteCreate(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    throttle_classes = [QuoteThrottle]

    def post(self, request):
        ser = QuoteRequestSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        quote = ser.save()
        send_quote_emails(quote)
        # Only the reference goes back: no personal data is echoed to the browser
        return Response({"reference": quote.reference}, status=status.HTTP_201_CREATED)


@staff_member_required
def download_attachment(request, pk):
    quote = get_object_or_404(QuoteRequest, pk=pk)
    if not quote.attachment:
        raise Http404
    return FileResponse(quote.attachment.open("rb"), as_attachment=True)
