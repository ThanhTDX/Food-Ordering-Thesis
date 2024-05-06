from django.urls import path
from . import views

urlpatterns = [
    path('/', views.index, name='index'),
    path('user_logout', views.user_logout, name='user_logout')
]