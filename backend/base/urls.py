from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('menu/', views.getAllFood, name="allFood"),
    path('menu/<str:pk>', views.getFoodDetailById, name="FoodDetailById"),
]
