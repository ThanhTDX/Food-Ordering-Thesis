from django.urls import path
from . import views

# Create urls path here.

urlpatterns = [
    path('', views.UserPageView, name='userpage'),
    path('login', views.LoginView, name='login'),
    path('register', views.RegisterView, name='register'),
    path('logout', views.LogoutView, name='logout'),
]