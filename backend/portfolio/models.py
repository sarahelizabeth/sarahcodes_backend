import os, uuid
from django.contrib.postgres.fields import ArrayField
from django.db import models

PROJECT_TYPES = [
  ('developer', 'Developer'),
  ('mentor', 'Mentor'),
  ('activist', 'Activist'),
]

class Experience(models.Model):
  name = models.CharField(max_length=100)
  duration = models.CharField(max_length=100)
  location = models.CharField(max_length=100)
  title = models.CharField(max_length=100)
  description = models.TextField()

  def __str__(self):
    return self.name


def get_file_path_image(instance, filename):
  extension = filename.split('.')[1]
  slug_ext = instance.slug + '.' + extension
  return os.path.join(
    'projects',
    instance.project_type,
    'images',
    slug_ext,
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
  title = models.CharField(max_length=100)
  project_type = models.CharField(max_length=10, choices=PROJECT_TYPES)
  description = models.TextField()
  logo = models.ImageField(upload_to=get_file_path_logo, null=True, blank=True)
  date = models.CharField(max_length=100)
  tools = ArrayField(models.CharField(max_length=100), null=True, blank=True)
  link = models.URLField(max_length=255, null=True, blank=True)
  quote = models.TextField(null=True, blank=True)
  attribution = models.CharField(max_length=200, null=True, blank=True)

  def __str__(self):
    return self.title

class ProjectImage(models.Model):
  id = models.UUIDField(
    primary_key=True,
    default=uuid.uuid4,
    editable=False,
  )
  image = models.ImageField(upload_to=get_file_path_image)
  project_type = models.CharField(max_length=10, choices=PROJECT_TYPES)
  project = models.ForeignKey(
    Project,
    related_name='images',
    on_delete=models.CASCADE,
  )
  slug = models.SlugField(max_length=100)
  alt_text = models.CharField(max_length=255, null=True, blank=True)

  def __str__(self):
    return self.slug