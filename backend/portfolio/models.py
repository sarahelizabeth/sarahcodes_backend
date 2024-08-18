import os
from django.contrib.postgres.fields import ArrayField
from django.db import models

class Experience(models.Model):
  name = models.CharField(max_length=100)
  duration = models.CharField(max_length=100)
  location = models.CharField(max_length=100)
  title = models.CharField(max_length=100)
  description = models.TextField()

  def __str__(self):
    return self.name
  
def get_file_path_image(instance, filename):
    filename_clean = filename.replace('_', ' ')
    return os.path.join(
      'projects',
      instance.project_type,
      'images',
      filename_clean
    )
  
def get_file_path_logo(instance, filename):
  filename_clean = filename.replace('_', ' ')
  return os.path.join(
    'projects',
    instance.project_type,
    'logos',
    filename_clean
  )

class Project(models.Model):
  PROJECT_TYPES = [
    ('developer', 'Developer'),
    ('mentor', 'Mentor'),
    ('activist', 'Activist'),
  ]
  title = models.CharField(max_length=100)
  project_type = models.CharField(max_length=10, choices=PROJECT_TYPES)
  description = models.TextField()
  image = models.ImageField(upload_to=get_file_path_image, null=True, blank=True)
  logo = models.ImageField(upload_to=get_file_path_logo, null=True, blank=True)
  date = models.CharField(max_length=100)
  tools = ArrayField(models.CharField(max_length=100), null=True, blank=True)
  link = models.URLField(max_length=255, null=True, blank=True)
  quote = models.TextField(null=True, blank=True)
  attribution = models.CharField(max_length=200, null=True, blank=True)

  def __str__(self):
    return self.title


