from django.urls import path
from . import views

urlpatterns = [
    path('', views.main, name='main'),
    path('link1', views.link1, name='link1'),
    path('link2', views.link2, name='link2'),
    path('link3', views.link3, name='link3'),
    path('link4', views.link4, name='link4'),
]