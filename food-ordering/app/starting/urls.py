from django.urls import path
from . import views

urlpatterns = [
    path('', views.MainView, name='index'),
    path('about', views.AboutView, name='about'),
    path('booking', views.BookingView, name='booking'),
    path('contact', views.ContactView, name='contact'),
    path('service', views.ServiceView, name='service'),
    path('testimonial', views.TestimonialView, name='testimonial'),
]