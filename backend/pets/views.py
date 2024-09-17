from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
# from rest_framework.response import Response
# from rest_framework.views import APIView

from .models import Pet, PetImage
from .serializers import PetSerializer, PetImageSerializer

class PetViewSet(viewsets.ModelViewSet):
  queryset = Pet.objects.all()
  serializer_class = PetSerializer
  filter_backends = [DjangoFilterBackend]
  filterset_fields = ['pet_type', 'owner']

# class ListPetImageItems(APIView):
#   def get(self, request):
#     items = PetImage.objects.all()
#     serializer = PetImageSerializer(items, many=True)
#     return Response(serializer.data)
  
class PetImageViewSet(viewsets.ModelViewSet):
  queryset = PetImage.objects.all()
  serializer_class = PetImageSerializer

