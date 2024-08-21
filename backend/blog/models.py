from django.db import models
from django.contrib.auth import get_user_model

class Question(models.Model):
  body = models.TextField()
  author = models.ForeignKey(
    get_user_model(), 
    on_delete=models.CASCADE
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.body
  
class Answer(models.Model):
  question = models.OneToOneField(
    Question,
    on_delete=models.CASCADE
  )
  body = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.body
  
class Comment(models.Model):
  body = models.TextField()
  question = models.ForeignKey(
    Question, 
    related_name='comments',
    on_delete=models.CASCADE
  )
  author = models.ForeignKey(
    get_user_model(), 
    on_delete=models.CASCADE
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.body