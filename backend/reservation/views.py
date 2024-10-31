from django.shortcuts import render
from django.http import JsonResponse
from reservation.models import *

from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from reservation.serializers import *

# Create your views here.

# /api/ordering/
@api_view(['GET'])
def getRoutes(request):
  routes = [
    'api/reservation/',
    'api/reservation/all',
    'api/reservation/<id>',
  ]
  return Response(routes)

# /api/ordering/all/
@api_view(['GET'])
def getAllReservation(request):
  data = Reservation.objects.all()
  serializer = ReservationSerializer(data, many=True)
  return Response(serializer.data)

# /api/ordering/<id>/
@api_view(['GET'])
def getReservationById(request, pk):
  data = Reservation.objects.get(_id=pk)
  serializer = ReservationSerializer(data, many=False)
  return Response(serializer.data)