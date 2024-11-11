from django.shortcuts import render
from django.http import JsonResponse
from promotion.models import *

from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from rest_framework import status
from promotion.serializers import *

# Create your views here.

# /api/ordering/
@api_view(['GET'])
def getRoutes(request):
  routes = [
    'api/promotion/',
    'api/reservation/all',
    'api/reservation/user',
  ]
  return Response(routes)

# /api/ordering/all/
@api_view(['GET'])
def getAllPromotions(request):
  data = Promotion.objects.all()
  serializer = PromotionSerializer(data, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)

# /api/ordering/all/
@api_view(['GET'])
def getPromotionById(request,pk):
  data = Promotion.objects.get(_id=pk)
  serializer = PromotionSerializer(data, many=False)
  return Response(serializer.data, status=status.HTTP_200_OK)


# /api/ordering/user/
@api_view(['GET'])
def getAllUserPromotions(request):
  data = UserPromotion.objects.all()
  serializer = UserPromotionSerializer(data, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)