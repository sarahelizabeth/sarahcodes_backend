from rest_framework.routers import DefaultRouter

from .views import MediaViewSet, LikeViewSet

router = DefaultRouter()
router.register(r'media', MediaViewSet, basename='media')
router.register(r'likes', LikeViewSet, basename='likes')
urlpatterns = router.urls