from rest_framework import serializers
from  django.contrib.auth.models import User
from .models import *

class FoodSerializer(serializers.ModelSerializer):
  class Meta:
    model = Food 
    fields = '__all__'

class FoodIngredientSerializer(serializers.ModelSerializer):
  class Meta: 
    model = FoodIngredient
    fields = '__all__'
    
class FoodTagSerializer(serializers.ModelSerializer):
  class Meta: 
    model = FoodTag
    fields = '__all__'
    
class FoodTypeSerializer(serializers.ModelSerializer):
  class Meta: 
    model = FoodType
    fields = '__all__'
    
class CommentSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Comment
    fields = '__all__'