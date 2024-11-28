from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('all/', views.getAllReservation, name="allReservation"),
    path('create/', views.createReservation, name="createReservation"),
    path('<str:pk>/', views.getReservationById, name="reservationById"),
]