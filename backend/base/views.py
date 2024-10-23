from django.shortcuts import render
from django.http import JsonResponse
from .models import *

from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from .serializers import *

# Create your views here.

# /api
@api_view(['GET'])
def getRoutes(request):
  routes = [
    'api/menu/',
    'api/menu/create',
    'api/menu/upload',
    'api/menu/<id>',
    'api/menu/ingredient',
    'api/menu/tag',
    'api/menu/type',
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
  food = Food.objects.get(_id=pk)
  serializer = FoodSerializer(food, many=False)
  return Response(serializer.data)

# /api/menu/ingredient
@api_view(['GET'])
def getAllFoodIngredient(request):
  data = FoodIngredient.objects.all()
  serializer = FoodIngredientSerializer(data, many=True)
  return Response(serializer.data)

# /api/menu/tag
@api_view(['GET'])
def getAllFoodTag(request):
  data = FoodTag.objects.all()
  serializer = FoodTagSerializer(data, many=True)
  return Response(serializer.data)

# /api/menu/type
@api_view(['GET'])
def getAllFoodType(request):
  data = FoodType.objects.all()
  serializer = FoodTypeSerializer(data, many=True)
  return Response(serializer.data)

# /api/comment
@api_view(['GET'])
def getAllComment(request):
  data = Comment.objects.all()
  serializer = FoodTypeSerializer(data, many=True)
  return Response(serializer.data)

