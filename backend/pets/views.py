from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from .models import Pet
from .serializers import PetSerializer

class PetViewSet(viewsets.ModelViewSet):
  queryset = Pet.objects.all()
  serializer_class = PetSerializer
  filter_backends = [DjangoFilterBackend]
  filterset_fields = ['pet_type', 'owner']
