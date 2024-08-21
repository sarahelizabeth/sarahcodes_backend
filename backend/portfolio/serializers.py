from rest_framework import serializers

from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
  tools = serializers.ListField(child=serializers.CharField(), allow_empty=True)
  
  class Meta:
    model = Project
    fields = ('title', 'project_type', 'description', 'date', 'tools', 'image', 'logo', 'link',)