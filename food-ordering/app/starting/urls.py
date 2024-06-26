from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about', views.about, name='about'),
    path('booking', views.booking, name='booking'),
    path('contact', views.contact, name='contact'),
    path('menu', views.menu, name='menu'),
    path('service', views.service, name='service'),
    path('reservation', views.reservation, name='reservation'),
    path('order', views.order, name='order'),
    path('testimonial', views.testimonial, name='testimonial'),
    path('login', views.login, name='login'),
    path('register', views.register, name='register'),
    path('logout', views.logout, name='logout'),
]