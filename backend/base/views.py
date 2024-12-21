import json

from django.shortcuts import render
from django.http import JsonResponse
from django.utils import timezone
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
    '/api/menu/food/<id>/comment/',
    '/api/menu/combo/all/',
    '/api/menu/combo/<id>/',
    '/api/menu/combo/type/',
    '/api/menu/ingredient/',
    '/api/menu/tag/',
    '/api/menu/type/',
    '/api/menu/comment/',
    '/api/menu/comment/create/',
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
def getFoodById(request, id):
  food = Food.objects.get(_id=id)
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
def getComboDetailById(request, id):
  data = Combo.objects.get(_id=id)
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

# /api/menu/food/<id>/comment/
@api_view(['GET'])
def getFoodComment(request, id):
  food = Food.objects.get(_id=id)
  data = food.foodcomment_set.all()
  serializer = FoodCommentSerializer(data, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)

# /api/menu/comment/create/
@api_view(['POST'])
def createComment(request):
  try:

    request_data = json.loads(request.body)
    print(request_data)
    new_comment = FoodComment()
    new_comment.commenter_name = request_data.get("username")
    new_comment.food_id = Food.objects.get(_id=request_data.get("food"))
    new_comment.description = request_data.get("description")
    new_comment.star_rating = request_data.get("star_rating")
    new_comment.date_created = timezone.now()
    new_comment.save()
    
    return Response({'status':'successful'},status=status.HTTP_200_OK)
  except Exception:
    print(Exception)
    return Response({'status':'failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  
