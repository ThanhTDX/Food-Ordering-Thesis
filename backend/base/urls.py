from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('food/all/', views.getAllFood, name="allFood"),
    path('food/<str:pk>/', views.getFoodById, name="allFood"),
    path('combo/all/', views.getAllCombo, name="allCombo"),
    path('combo/type/', views.getAllComboType, name="allComboType"),
    path('combo/<str:pk>/', views.getComboDetailById, name="comboDetailById"),
    path('ingredient/', views.getAllFoodIngredient, name="allFoodIngredient"),
    path('tag/', views.getAllFoodTag, name="allFoodTag"),
    path('type/', views.getAllFoodType, name="allFoodType"),
    path('comment/',views.getAllComment, name="allComment"),
]

