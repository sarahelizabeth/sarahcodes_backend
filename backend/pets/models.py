import os, uuid
from django.contrib.auth import get_user_model
from django.db import models

PET_TYPES = [
  ('cat', 'Cat'),
  ('dog', 'Dog'),
  ('fish', 'Fish'),
  ('reptile', 'Reptile'),
  ('bird', 'Bird'),
  ('other', 'Other'),
]

class Pet(models.Model):
  pet_type = models.CharField(max_length=15, choices=PET_TYPES)
  name = models.CharField(max_length=100)
  breed = models.CharField(max_length=100, blank=True, null=True)
  description = models.TextField(blank=True, null=True)
  birthday = models.DateField(blank=True, null=True)
  owner = models.ForeignKey(
    get_user_model(),
    on_delete=models.CASCADE
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.pet_type + ' / ' + self.name


def get_file_path_image(instance, filename):
  filename_clean = filename.replace('_', ' ')
  uuid_clean = str(instance.id)
  return os.path.join(
    'pet_images',
    uuid_clean,
    filename_clean
  )

class PetImage(models.Model):
  id = models.UUIDField(
    primary_key=True,
    default=uuid.uuid4,
    editable=False,
  )
  pet = models.ForeignKey(
    Pet,
    related_name='images',
    on_delete=models.CASCADE
  )
  image = models.ImageField(upload_to=get_file_path_image)
  title = models.CharField(max_length=255, blank=True, null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.pet.name