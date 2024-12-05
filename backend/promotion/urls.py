from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('all/', views.getAllPromotions, name="allPromotion"),
    path('user/<str:id>', views.getAllPromotionsFromUser, name="userPromotion"),
    path('user/<str:id>/<str:promotion>', views.getPromotionFromUser, name="userPromotion"),
    path('<str:pk>', views.getPromotionById, name="promotionById"),
    
]