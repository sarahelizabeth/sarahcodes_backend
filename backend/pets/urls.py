from rest_framework.routers import DefaultRouter

from .views import PetViewSet

router = DefaultRouter()
router.register(r'cuties', PetViewSet, basename='cuties')
urlpatterns = router.urls
