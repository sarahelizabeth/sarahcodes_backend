from rest_framework import serializers

from .models import Pet, PetImage

class PetImageSerializer(serializers.ModelSerializer):
  class Meta:
    model = PetImage
    fields = ('image', 'pet', 'title',)

class PetSerializer(serializers.ModelSerializer):
  images = serializers.SerializerMethodField()

  def get_images(self, pet):
    return PetImageSerializer(pet.images.all(), many=True).data
  
  class Meta:
    model = Pet
    fields = ('pet_type', 'name', 'breed', 'description', 'birthday', 'images',)