from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('menu/', views.getAllFood, name="allFood"),
    path('menu/ingredient', views.getAllFoodIngredient, name="allFoodIngredient"),
    path('menu/tag', views.getAllFoodTag, name="allFoodTag"),
    path('menu/type', views.getAllFoodType, name="allFoodType"),
    path('menu/<str:pk>', views.getFoodDetailById, name="FoodDetailById"),
    
    path('users/login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]
