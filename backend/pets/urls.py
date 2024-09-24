from rest_framework.routers import DefaultRouter

from .views import PetPicViewSet

router = DefaultRouter()
router.register(r'pics', PetPicViewSet, basename='pics')

urlpatterns = router.urls
