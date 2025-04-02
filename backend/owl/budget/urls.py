from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ExpenseViewSet, RegisterView, ProfileView

router = DefaultRouter()
router.register(r'expenses', ExpenseViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile'),
]