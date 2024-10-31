from django.shortcuts import render
from ordering.models import *

from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from ordering.serializers import *
# Create your views here.

# /api/ordering/
@api_view(['GET'])
def getRoutes(request):
  routes = [
    '/api/ordering/',
    '/api/ordering/all/',
    '/api/ordering/<id>/',
  ]
  return Response(routes)

# /api/ordering/all/
@api_view(['GET'])
def getAllOrdering(request):
  data = Ordering.objects.all()
  serializer = OrderingSerializer(data, many=True)
  return Response(serializer.data)

# /api/ordering/<id>
@api_view(['GET'])
def getOrderingById(request, pk):
  data = Ordering.objects.get(_id=pk)
  serializer = OrderingSerializer(data, many=False)
  return Response(serializer.data)