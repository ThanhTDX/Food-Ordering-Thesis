from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('all/', views.getAllPromotions, name="allPromotion"),
    path('all/<str:pk>', views.getPromotionById, name="promotionById"),
    path('user/', views.getAllUserPromotions, name="userPromotion"),
]