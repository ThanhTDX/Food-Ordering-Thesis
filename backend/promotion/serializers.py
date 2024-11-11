from rest_framework import serializers
from promotion.models import *
from base.serializers import FoodSerializer
    
class PromotionSerializer(serializers.ModelSerializer):
  food = FoodSerializer(many=True, read_only=True)
  class Meta:
    model = Promotion
    fields = '__all__'
    
class UserPromotionSerializer(serializers.ModelSerializer):
  promotion = PromotionSerializer(many=False, read_only=True)
  class Meta:
    model = UserPromotion
    fields = '__all__'