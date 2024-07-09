from django.urls import path
from . import views

urlpatterns = [
    path('', views.MainView, name='index'),
    path('about', views.AboutView, name='about'),
    path('booking', views.BookingView, name='booking'),
    path('contact', views.ContactView, name='contact'),
    path('menu', views.MenuView, name='menu'),
    path('service', views.ServiceView, name='service'),
    path('reservation', views.ReservationView, name='reservation'),
    path('order', views.OrderView, name='order'),
    path('testimonial', views.TestimonialView, name='testimonial'),
    path('login', views.LoginView, name='login'),
    path('register', views.RegisterView, name='register'),
    path('logout', views.LogoutView, name='logout'),
]