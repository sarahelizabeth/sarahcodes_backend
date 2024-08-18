from rest_framework import serializers

from .models import Question, Answer, Comment

class QuestionSerializer(serializers.ModelSerializer):
  # author = UserSerializer(many=False)
  
  class Meta:
    model = Question
    fields = ('body', 'author', 'created_at',)

class AnswerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Answer
    fields = ('question', 'body', 'created_at',)

class CommentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comment
    fields = ('question', 'body', 'author', 'created_at',)