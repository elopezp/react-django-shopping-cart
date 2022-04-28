from django.urls import path
from order import views

app_name = 'order'

urlpatterns = [
    path('', views.getOrders, name='orders'),
    path('create/', views.createOrderItems, name='orders-create'),
    path('<str:pk>/', views.getOrderDetail, name='order-detail'),
]
