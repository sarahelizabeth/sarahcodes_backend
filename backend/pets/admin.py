from django.contrib import admin

from .models import Pet, PetImage

class PetImageInline(admin.TabularInline):
  model = PetImage

class PetAdmin(admin.ModelAdmin):
  list_display = ('owner', 'pet_type', 'name',)
  inlines = [PetImageInline]

  @admin.display(description='Owner Name', ordering='owner__first_name')
  def get_owner_name(self, obj):
      return obj.owner.first_name

admin.site.register(Pet, PetAdmin)
admin.site.register(PetImage)
