from django.urls import path
from .views import RegisterView, CustomAuthToken, LogoutView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', CustomAuthToken.as_view()),
    path('logout/', LogoutView.as_view()),
]
