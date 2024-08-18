from rest_framework import viewsets

from .models import Question, Answer, Comment
from .serializers import QuestionSerializer, AnswerSerializer, CommentSerializer

class QuestionViewSet(viewsets.ModelViewSet):
  queryset = Question.objects.all()
  serializer_class = QuestionSerializer

class AnswerViewSet(viewsets.ModelViewSet):
  queryset = Answer.objects.all()
  serializer_class = AnswerSerializer

class CommentViewSet(viewsets.ModelViewSet):
  queryset = Comment.objects.all()
  serializer_class = CommentSerializer

