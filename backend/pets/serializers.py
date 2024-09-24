from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers

from .models import PetPic

class PetPicSerializer(serializers.ModelSerializer):
  owner_name = serializers.SerializerMethodField()

  def get_owner_name(self, pet_pic):
    first = pet_pic.owner.first_name
    lastInitial = pet_pic.owner.last_name[0]
    return first + ' ' + lastInitial + '.'
  class Meta:
    model = PetPic
    fields = ('id', 'pet_type', 'image', 'owner', 'owner_name', 'name', 'breed', 'birthday', 'created_at',)

  def to_representation(self, instance):
    representation = super().to_representation(instance)
    representation['owner'] = UserDetailsSerializer(instance.owner, many=False).data
    return representation
