from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('all/', views.getAllReservation, name="allReservation"),
    path('<str:pk>/', views.getReservationById, name="reservationById"),
]