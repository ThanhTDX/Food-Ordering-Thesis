from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('food/all/', views.getAllFood, name="allFood"),
    path('food/<str:pk>/', views.getFoodById, name="allFood"),
    path('combo/', views.getAllFoodCombo, name="allFoodCombo"),
    path('combo/<str:pk>/', views.getFoodComboDetailById, name="foodComboDetailById"),
    path('ingredient/', views.getAllFoodIngredient, name="allFoodIngredient"),
    path('tag/', views.getAllFoodTag, name="allFoodTag"),
    path('type/', views.getAllFoodType, name="allFoodType"),
    path('comment/',views.getAllComment, name="allComment"),
]

