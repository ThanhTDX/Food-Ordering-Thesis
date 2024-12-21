from django.shortcuts import render
from promotion.models import *

from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from rest_framework import status
from promotion.serializers import *

# Create your views here.

# /api/promotion/
@api_view(['GET'])
def getRoutes(request):
  routes = [
    'api/promotion/',
    'api/promotion/all/',
    'api/promotion/<:id>/',
    'api/promotion/user/<:id>/',
    'api/promotion/user/<:id>/<:promotion>'
  ]
  return Response(routes)

# /api/promotion/all/
@api_view(['GET'])
def getAllPromotions(request):
  promotions = Promotion.objects.all()
  serializer = PromotionSerializer(promotions, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)

# /api/promotion/<:id>/
@api_view(['GET'])
def getPromotionById(request,pk):
  data = Promotion.objects.get(_id=pk)
  serializer = PromotionSerializer(data, many=False)
  return Response(serializer.data, status=status.HTTP_200_OK)

# /api/promotion/user/<:id>/
@api_view(['GET'])
def getAllPromotionsFromUser(request, id):
  user = User.objects.get(_id=id)
  serializer = UserPromotionSerializer(user, many=True, context={'user':user})
  return Response(serializer.data, status=status.HTTP_200_OK)

# /api/promotion/user/<:id>/<:promotion>
@api_view(['GET'])
def getPromotionFromUser(request, id, promotion):
  user = User.objects.get(_id=id)
  serializer = UserPromotionSerializer(user, many=True, context={'user':user})
  return Response(serializer.data, status=status.HTTP_200_OK)