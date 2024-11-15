from django.shortcuts import render
from django.http import JsonResponse
from base.models import *

from rest_framework import status
from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from base.serializers import *

# Create your views here.


# /api/payment/
@api_view(['GET'])
def getRoutes(request):
  routes = [
    '/api/payment/',
    '/api/payment/success',
    '/api/payment/fail',
  ]
  return Response(routes, status=status.HTTP_200_OK)

# '/api/payment/success',
def handleSuccessPayment(request):
  print(request)

# '/api/payment/fail',
def handleFailPayment(request):
  print(request)
  
# '/api/payment/cancel/<:id>',
def handleCancelPayment(request, pk):
  print(request)