from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('success/', views.handleSuccessPayment, name="handleSuccessPayment"),
    path('fail/', views.handleFailPayment, name="routes"),
]