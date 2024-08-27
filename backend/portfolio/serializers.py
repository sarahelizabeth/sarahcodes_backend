from rest_framework import serializers

from .models import Project, ProjectImage

class ProjectImageSerializer(serializers.ModelSerializer):
  class Meta:
    model = ProjectImage
    fields = ('image', 'alt_text',)

class ProjectSerializer(serializers.ModelSerializer):
  tools = serializers.ListField(child=serializers.CharField(), allow_empty=True)
  images = serializers.SerializerMethodField()

  def get_images(self, project):
    return ProjectImageSerializer(project.images.all(), many=True).data
  class Meta:
    model = Project
    fields = ('title', 'project_type', 'description', 'date', 'tools', 'images', 'logo', 'link', 'quote', 'attribution',)