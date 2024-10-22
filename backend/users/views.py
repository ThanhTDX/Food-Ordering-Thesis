from django.shortcuts import render

from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from rest_framework.response import Response
from .serializers import *

from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer
  
# /users
@api_view(['GET'])
def getRoutes(request):
  routes = [
    '/users/login',
    '/users/profile'
  ]
  return Response(routes)

# /users/profile
@api_view(['GET'])
def getUserProfile(request):
  user = request.user
  serializer = UserSerializer(user, many=False)
  return Response(serializer.data)