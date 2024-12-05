import json
import os

from datetime import datetime

from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse
from django.utils import timezone

from reservation.models import *
from restaurant.models import *

from rest_framework import status
from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from reservation.serializers import *

# Get the User model
User = get_user_model()

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

# /api/ordering/<id>/
@api_view(['POST'])
def createReservation(request):
  try:
    request_data = json.loads(request.body)
    # USER information
    new_reservation = Reservation()
    new_reservation.name = request_data.get("name")
    new_reservation.phone_number = request_data.get("phoneNumber")
    if request_data.get("user"):
      if User.objects.get(_id = int(request_data.get("user"))):
        new_reservation.user = User.objects.get(_id = int(request_data.get("user")))
        
    # TIME information
    datetime_str = f"{request_data.get("date")} {request_data.get("time")}"
    new_reservation.time = datetime.strptime(datetime_str, "%Y-%m-%d %H:%M")
    new_reservation.eat_time = timedelta(hours=float(request_data.get("eatTime"))) # input was a number
    new_reservation.date_created = timezone.now()     
    new_reservation.save()
    
    # RESTAURANT information
    get_restaurant = Restaurant.objects.get(_id=int(request_data.get("restaurant")))
    new_reservation.restaurant = get_restaurant
    for table in request_data.get("tables"):
      new_reservation.tables.add(RestaurantTable.objects.get(restaurant=get_restaurant, name=table))
    for vip in request_data.get("vips"):
      new_reservation.vips.add(RestaurantVIP.objects.get(restaurant=get_restaurant, name=vip))
    
    new_reservation.save()
    # serializer = ReservationSerializer(data, many=False)
    return Response({'status':200},status=status.HTTP_200_OK)
  except Exception as e:
    print(e)
    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)