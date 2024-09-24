import os, uuid
from django.contrib.auth import get_user_model
from django.db import models

PET_TYPES = [
  ('cat', 'Cat'),
  ('dog', 'Dog'),
  ('fish', 'Fish'),
  ('reptile', 'Reptile'),
  ('bird', 'Bird'),
  ('plant', 'Plant'),
  ('other', 'Other'),
]

def get_file_path(instance, filename):
  filename_clean = filename.replace('_', ' ')
  owner_pk = str(instance.owner.pk)
  return os.path.join(
    'pet_pics',
    owner_pk,
    filename_clean
  )  
def get_file_path_image(instance, filename):
  filename_clean = filename.replace('_', ' ')
  owner_pk = str(instance.owner.pk)
  return os.path.join(
    'pet_pics',
    owner_pk,
    filename_clean
  )  

class PetPic(models.Model):
  id = models.UUIDField(
    primary_key=True,
    default=uuid.uuid4,
    editable=False,
  )
  pet_type = models.CharField(max_length=15, choices=PET_TYPES)
  name = models.CharField(max_length=100)
  breed = models.CharField(max_length=100, blank=True, null=True)
  birthday = models.DateField(blank=True, null=True)
  owner = models.ForeignKey(
    get_user_model(),
    on_delete=models.CASCADE
  )
  image = models.ImageField(upload_to=get_file_path)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.pet_type + ' / ' + self.name