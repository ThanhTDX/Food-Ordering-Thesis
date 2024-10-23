from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes, name="user_routes"),
    path('all/', views.getUsers, name="users"),
    path('profile/', views.getUserProfile, name="user_profile"),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerCustomerUser, name='register_customer'),
    path('test_token/', views.test_token, name='test_token'),
]