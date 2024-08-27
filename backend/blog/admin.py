from django.contrib import admin

from .models import Question, Answer, Comment

class AnswerInline(admin.TabularInline):
  model = Answer

class QuestionAdmin(admin.ModelAdmin):
  list_display = ('body', 'author', 'created_at',)
  inlines = [AnswerInline]

admin.site.register(Question, QuestionAdmin)
admin.site.register(Comment)