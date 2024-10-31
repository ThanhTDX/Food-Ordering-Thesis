from rest_framework import serializers
from reservation.models import *
from restaurant.models import RestaurantTable, RestaurantVIP
from base.serializers import FoodSerializer, FoodComboSerializer
    
class ReservationTableSerializer(serializers.ModelSerializer):
  class Meta:
    model = RestaurantTable
    fields = '__all__'
    
class ReservationVipSerializer(serializers.ModelSerializer):
  class Meta:
    model = RestaurantVIP
    fields = '__all__'
    
class ReservationFoodFKSerializer(serializers.ModelSerializer):
  food = FoodSerializer(many=False, read_only=True)
  
  class Meta:
    model = ReservationFood_FK
    fields = '__all__'
    
class ReservationComboFKSerializer(serializers.ModelSerializer):
  combo = FoodComboSerializer(many=False, read_only=True)
  
  class Meta:
    model = ReservationFood_FK
    fields = '__all__'
    
class ReservationSerializer(serializers.ModelSerializer):
  tables = ReservationTableSerializer(many=True, read_only=True)
  vips = ReservationVipSerializer(many=True, read_only=True)
  foods = ReservationFoodFKSerializer(many=True, source='reservationfood_fk')
  combos = ReservationComboFKSerializer(many=True, source='reservationcombo_fk')
  
  class Meta: 
    model = Reservation
    fields = '__all__'