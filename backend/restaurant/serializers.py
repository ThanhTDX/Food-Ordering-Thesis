from rest_framework import serializers
from users.models import Manager
from restaurant.models import *
from users.serializers import CustomUserSerializer

class RestaurantTableSerializer(serializers.ModelSerializer):
  class Meta:
    model = RestaurantTable
    fields = ["_id", "name", "description"]

class RestaurantVipSerializer(serializers.ModelSerializer):

  class Meta:
    model = RestaurantVIP
    fields = ["_id", "name", "description"]

class RestaurantSerializer(serializers.ModelSerializer):
  tables = RestaurantTableSerializer(many=True, read_only=True)
  vips = RestaurantVipSerializer(many=True, read_only=True)

  class Meta:
    model = Restaurant
    fields = "__all__"