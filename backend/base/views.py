from django.shortcuts import render
from django.http import JsonResponse
from .models import Food

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import FoodSerializer

# Create your views here.

# /api
@api_view(['GET'])
def getRoutes(request):
  routes = [
    'api/menu/',
    'api/menu/create',
    'api/menu/upload',
    'api/menu/<id>',
  ]
  return Response(routes)


# /api/menu
@api_view(['GET'])
def getAllFood(request):
  foods = Food.objects.all()
  serializer = FoodSerializer(foods, many=True)
  return Response(serializer.data)


# '/api/menu/<id>/',
@api_view(['GET'])
def getFoodDetailById(request, pk):
  menuItem = Product.objects.get(_id=pk)
  serializer = ProductSerializer(menuItem, many=False)
  return Response(serializer.data)