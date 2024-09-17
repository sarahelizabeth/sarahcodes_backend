from rest_framework import serializers

from .models import Pet, PetImage

class PetImageSerializer(serializers.ModelSerializer):
  pet_type = serializers.SerializerMethodField()

  def get_pet_type(self, pet_image):
    return pet_image.pet.pet_type
  
  class Meta:
    model = PetImage
    fields = ('image', 'pet', 'title', 'pet_type')

class PetSerializer(serializers.ModelSerializer):
  images = serializers.SerializerMethodField()

  def get_images(self, pet):
    return PetImageSerializer(pet.images.all(), many=True).data
  
  class Meta:
    model = Pet
    fields = ('pet_type', 'name', 'breed', 'description', 'birthday', 'images',)
