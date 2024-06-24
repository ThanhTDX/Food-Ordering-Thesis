from django.urls import path
from . import views

urlpatterns = [
    path('chao-long', views.chaoLong, name='chaolong'),
]