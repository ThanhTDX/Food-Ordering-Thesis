from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('menu/', views.getAllFood, name="allFood"),
    path('menu/ingredient', views.getAllFoodIngredient, name="allFoodIngredient"),
    path('menu/tag', views.getAllFoodTag, name="allFoodTag"),
    path('menu/type', views.getAllFoodType, name="allFoodType"),
    path('menu/<str:pk>', views.getFoodDetailById, name="FoodDetailById"),
]
