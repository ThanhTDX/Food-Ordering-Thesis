from django.urls import path
from . import views

urlpatterns = [
    path('members/', views.main, name='main'),
    path('members/link1', views.link1, name='link1'),
    path('members/link2', views.link2, name='link2'),
    path('members/link3', views.link3, name='link3'),
    path('members/link4', views.link4, name='link4'),
]