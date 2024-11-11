from rest_framework import serializers
from base.models import *

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
    
class FoodCommentSerializer(serializers.ModelSerializer):
  class Meta: 
    model = FoodComment
    fields = '__all__' 
    
class FoodSerializer(serializers.ModelSerializer):
  tag = FoodTagSerializer(many=True, read_only=True)
  type = FoodTypeSerializer(read_only=True)
  
  class Meta:
    model = Food 
    fields = '__all__'
    
class ComboItemSerializer(serializers.ModelSerializer):
  food = FoodSerializer(many=False, read_only=True)
  class Meta:
    model = ComboItem
    fields = '__all__'
    
class ComboTypeSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = ComboType
    fields = '__all__'
    
class ComboSerializer(serializers.ModelSerializer):
  food = ComboItemSerializer(many=True, read_only=True)
  
  class Meta:
    model = Combo
    fields = '__all__'