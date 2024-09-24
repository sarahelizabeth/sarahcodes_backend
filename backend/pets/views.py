from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from .models import PetPic
from .serializers import PetPicSerializer

class PetPicViewSet(viewsets.ModelViewSet):
  queryset = PetPic.objects.all()
  serializer_class = PetPicSerializer
  filter_backends = [DjangoFilterBackend]
  filterset_fields = ['pet_type', 'owner']

