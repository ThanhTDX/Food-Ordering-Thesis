from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('all/', views.getAllRestaurant, name="allRestaurant"),
    path('<str:pk>/', views.getRestaurantById, name="restaurantById"),
]