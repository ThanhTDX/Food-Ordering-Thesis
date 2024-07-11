from django.urls import path
from . import views

urlpatterns = [
    path('', views.MainView, name='index'),
    path('about', views.AboutView, name='about'),
    path('booking', views.BookingView, name='booking'),
    path('contact', views.ContactView, name='contact'),
    path('menu', views.MenuView, name='menu'),
    path('menu/<int:id>', views.MenuItemView, name='menu-item'),
    path('service', views.ServiceView, name='service'),
    path('reservation', views.ReservationView, name='reservation'),
    path('order', views.OrderView, name='order'),
    path('testimonial', views.TestimonialView, name='testimonial'),
]