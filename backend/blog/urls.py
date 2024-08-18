from rest_framework.routers import DefaultRouter

from .views import QuestionViewSet, AnswerViewSet, CommentViewSet

router = DefaultRouter()
router.register(r'questions', QuestionViewSet, basename='questions')
router.register(r'answers', AnswerViewSet, basename='answers')
router.register(r'comments', CommentViewSet, basename='comments')
urlpatterns = router.urls