from django.shortcuts import render
from django.http import JsonResponse
from restaurant.models import *

from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from restaurant.serializers import *

# Create your views here.

# /api/restaurant/
@api_view(['GET'])
def getRoutes(request):
  routes = [
    '/api/restaurant/',
    '/api/restaurant/all',
    '/api/restaurant/<id>',
  ]
  return Response(routes)

# /api/restaurant/all
@api_view(['GET'])
def getAllRestaurant(request):
  data = Restaurant.objects.all()
  serializer = RestaurantSerializer(data, many=True)
  return Response(serializer.data)

# /api/restaurant/<id>/,
@api_view(['GET'])
def getRestaurantById(request, pk):
  data = Restaurant.objects.get(_id=pk)
  serializer = RestaurantSerializer(data, many=False)
  return Response(serializer.data)