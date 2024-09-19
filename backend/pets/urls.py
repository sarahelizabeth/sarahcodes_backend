from rest_framework.routers import DefaultRouter

from .views import PetViewSet, PetImageViewSet

router = DefaultRouter()
router.register(r'cuties', PetViewSet, basename='cuties')
router.register(r'pics', PetImageViewSet, basename='pics')

urlpatterns = router.urls
