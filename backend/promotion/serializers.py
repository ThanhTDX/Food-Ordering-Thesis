from rest_framework import serializers
from promotion.models import *
from base.models import *
from base.serializers import FoodSerializer


# Nested serializer for Food with `qty` from Promotion_FoodFK
class PromotionFoodFKSerializer(serializers.ModelSerializer):
  food = FoodSerializer()

  class Meta:
      model = Promotion_FoodFK
      fields = ['food', 'qty']
        
class PromotionSerializer(serializers.ModelSerializer):
  foods = PromotionFoodFKSerializer(source= 'promotion_foodfk_set', many=True)

  class Meta:
      model = Promotion
      fields = '__all__'
    
class UserPromotionSerializer(serializers.ModelSerializer):
  promotion = PromotionSerializer(many=False, read_only=True)
  class Meta:
    model = UserPromotion
    fields = '__all__'