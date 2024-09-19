import os
from django.db import models
from django.contrib.auth import get_user_model

MEDIA_TYPES = [
  ('book', 'Book'),
  ('show', 'TV Show'),
  ('film', 'Film'),
  ('app', 'App'),
  ('article', 'Article'),
  ('video', 'YouTube Video'),
]

def get_file_path(instance, filename):
  filename_clean = filename.replace('_', ' ')
  return os.path.join(
    'bookshelf',
    instance.media_type,
    filename_clean
  )

class Media(models.Model):
  media_type = models.CharField(max_length=10, choices=MEDIA_TYPES)
  title = models.CharField(max_length=255)
  creator = models.CharField(max_length=255)
  image = models.ImageField(upload_to=get_file_path, null=True, blank=True)
  link = models.URLField(max_length=255, null=True, blank=True)
  description = models.TextField(null=True, blank=True)
  recommended_by = models.ForeignKey(
    get_user_model(), 
    on_delete=models.CASCADE,
    null=True,
    blank=True,
  )
  visible = models.BooleanField(default=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    verbose_name_plural = 'media'

  def __str__(self):
    return self.title
  

class Like(models.Model):
  media = models.ForeignKey(
    Media,
    related_name='likes',
    on_delete=models.CASCADE,
  )
  author = models.ForeignKey(
    get_user_model(), 
    on_delete=models.CASCADE
  )
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.media.title + ' / ' + self.author.email

