from django.shortcuts import render
from django.http import JsonResponse
from base.models import *

from rest_framework import status
from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from base.serializers import *

# Create your views here.

# /api/menu/
@api_view(['GET'])
def getRoutes(request):
  routes = [
    '/api/menu/',
    '/api/menu/food/all/',
    '/api/menu/food/<id>/',
    '/api/menu/combo/all',
    '/api/menu/combo/<id>/',
    '/api/menu/combo/type/',
    '/api/menu/create/',
    '/api/menu/upload/',
    '/api/menu/ingredient/',
    '/api/menu/tag/',
    '/api/menu/type/',
    '/api/menu/comment/',
  ]
  return Response(routes, status=status.HTTP_200_OK)


# /api/menu/food/all/
@api_view(['GET'])
def getAllFood(request):
  foods = Food.objects.all()
  serializer = FoodSerializer(foods, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)

# /api/menu/food/<id>/,
@api_view(['GET'])
def getFoodById(request, pk):
  food = Food.objects.get(_id=pk)
  serializer = FoodSerializer(food, many=False)
  return Response(serializer.data, status=status.HTTP_200_OK)

# /api/menu/combo/
@api_view(['GET'])
def getAllCombo(request):
  data = Combo.objects.all()
  serializer = ComboSerializer(data, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)


# /api/menu/combo/<id>/
@api_view(['GET'])
def getComboDetailById(request, pk):
  data = Combo.objects.get(_id=pk)
  serializer = ComboSerializer(data, many=False)
  return Response(serializer.data, status=status.HTTP_200_OK)

# /api/menu/combo/type/
@api_view(['GET'])
def getAllComboType(request):
  data = ComboType.objects.all()
  serializer = ComboTypeSerializer(data, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)

# /api/menu/ingredient/
@api_view(['GET'])
def getAllFoodIngredient(request):
  data = FoodIngredient.objects.all()
  serializer = FoodIngredientSerializer(data, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)

# /api/menu/tag/
@api_view(['GET'])
def getAllFoodTag(request):
  data = FoodTag.objects.all()
  serializer = FoodTagSerializer(data, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)

# /api/menu/type/
@api_view(['GET'])
def getAllFoodType(request):
  data = FoodType.objects.all()
  serializer = FoodTypeSerializer(data, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)

# /api/menu/comment/
@api_view(['GET'])
def getAllComment(request):
  data = FoodComment.objects.all()
  serializer = FoodCommentSerializer(data, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)

