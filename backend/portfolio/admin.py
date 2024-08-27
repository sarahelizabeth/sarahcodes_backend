from django.contrib import admin

from .models import Experience, Project, ProjectImage

class ProjectImageInline(admin.TabularInline):
  model = ProjectImage

class ProjectAdmin(admin.ModelAdmin):
  list_display = ('title', 'project_type',)
  inlines = [ProjectImageInline]

admin.site.register(Experience)
admin.site.register(Project, ProjectAdmin)
admin.site.register(ProjectImage)