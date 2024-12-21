from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

from django.core.exceptions import ValidationError

from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from .serializers import *

from users.models import *
from reservation.models import Reservation
from ordering.models import Ordering

from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

# /users
@api_view(['GET'])
def getRoutes(request):
  routes = [
    '/api/users/',
    '/api/users/all/',
    '/api/users/profile/',
    '/api/users/reservation/<:id>',
    '/api/users/ordering/<:id>',
    
    '/api/users/login/',
    '/api/users/register/',
    '/api/users/test_token/',
  ]
  return Response(routes)

User = get_user_model()

# api/users/all/
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllUsers(request):
  user = User.objects.all()
  serializer = CustomUserSerializer(user, many=True)
  return Response(serializer.data)

# api/users/profile
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
  data = request.data
  
  user = request.user(phone_number=data["phone_number"])
  user_profile = UserProfile(user=user)
  user_reservation = Reservation(user=user)
  user_ordering = Ordering(user=user)
  user_custom_menu = UserCustomMenu(user=user_profile)
  serializer = CustomUserSerializer(user, many=False)
  return Response(serializer.data)

# 'api/users/reservation/<:id>'
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getUserReservationById(request, id):
  data = request.data
  user = request.user(phone_number=data["phone_number"])

  user_reservation = Reservation(user=user)
  serializer = ReservationSerializer(user_reservation, many=False)
  return Response(serializer.data)

# 'api/users/reservation/<:id>'
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getUserOrderinngById(request, id):
  data = request.data
  user = request.user(phone_number=data["phone_number"])
  
  user_ordering = Ordering(user=user, _id=id)
  serializer = OrderingSerializer(user_ordering, many=False)
  return Response(serializer.data)


### REST_FRAMEWORK AUTHENTICATION (using simple_jwt)

# api/users/login/
# {
#   'phone_number': 
#   'password':
# }
#
class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer

# api/users/register/
@api_view(['POST'])
def registerCustomerUser(request):
  data = request.data
  try:
    user = Customer.objects.create(
      phone_number = data['phone_number'],
      password=make_password(data['password'])
    )
    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)
  except ValidationError:
    message = {'detail': 'Invalid Phone Number'}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)
  except:
    message = {'detail': 'This phone number is already in use'}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)

# /users/test_token
@api_view(['GET'])
def test_token(request):
  return Response({})
