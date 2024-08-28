from django.contrib import admin

from .models import Media, Like

class LikeInline(admin.TabularInline):
  model = Like

class MediaAdmin(admin.ModelAdmin):
  list_display = ('title', 'media_type', 'creator', 'visible',)
  inlines = [LikeInline]

admin.site.register(Media, MediaAdmin)
