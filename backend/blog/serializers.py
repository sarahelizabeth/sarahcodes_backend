from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers

from .models import Question, Answer, Comment

class AnswerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Answer
    fields = ('body', 'created_at',)

class QuestionSerializer(serializers.ModelSerializer):
  answer = serializers.PrimaryKeyRelatedField(read_only=True)
  class Meta:
    model = Question
    fields = ('body', 'author', 'created_at', 'answer',)

  def to_representation(self, instance):
    representation = super().to_representation(instance)
    representation['author'] = UserDetailsSerializer(instance.author, many=False).data
    return representation

class CommentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comment
    fields = ('question', 'body', 'author', 'created_at',)