from django.urls import path
from .views import TransactionList, CategoryList, TransactionDetail

urlpatterns = [
    path('transactions/', TransactionList.as_view()),
    path('transactions/<int:pk>/', TransactionDetail.as_view()),  # ← новый маршрут
    path('categories/', CategoryList.as_view()),
]
