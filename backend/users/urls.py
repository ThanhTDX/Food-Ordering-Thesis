from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes, name="userRoutes"),
    path('profile', views.getUserProfile, name="userProfile"),
    path('login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
]