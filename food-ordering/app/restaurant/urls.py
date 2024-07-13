from django.urls import path
from . import views

urlpatterns = [
    path('reservation', views.ReservationView, name='reservation'),
    path('order', views.OrderView, name='order'),
    path('menu', views.MenuView, name='menu'),
    path('menu/<int:id>', views.MenuItemView, name='menu-item'),
]