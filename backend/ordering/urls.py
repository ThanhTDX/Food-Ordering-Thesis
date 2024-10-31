from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('all', views.getAllOrdering, name="allOrdering"),
    path('<str:pk>', views.getOrderingById, name="orderingById"),
]
