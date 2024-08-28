from rest_framework import serializers

from .models import Media, Like

class LikeSerializer(serializers.ModelSerializer):
  class Meta:
    model = Like
    fields = ('author', 'created_at',)


class MediaSerializer(serializers.ModelSerializer):
  likes = serializers.SerializerMethodField()

  def get_likes(self, media):
    return LikeSerializer(media.likes.all(), many=True).data
  
  class Meta:
    model = Media
    fields = ('media_type', 'title', 'creator', 'image', 'link', 'description', 'likes',)