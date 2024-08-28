from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .models import Media, Like
from .serializers import MediaSerializer, LikeSerializer

class MediaViewSet(viewsets.ModelViewSet):
  queryset = Media.objects.all()
  serializer_class = MediaSerializer
  filter_backends = [DjangoFilterBackend]
  filterset_fields = ['media_type', 'visible']

class LikeViewSet(viewsets.ModelViewSet):
  queryset = Like.objects.all()
  serializer_class = LikeSerializer

