from rest_framework import serializers
from  django.contrib.auth.models import User
from .models import *

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

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
    

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):      
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items() :
          data[k] = v

        return data
      

      
class UserSerializer(serializers.ModelSerializer):
  name = serializers.SerializerMethodField(read_only=True)
  _id = serializers.SerializerMethodField(read_only=True)
  isAdmin = serializers.SerializerMethodField(read_only=True)
  
  def get__id(self,obj):
    return obj.id
  
  def get_name(self, obj):
    name = obj.first_name
    if name == '':
      name = obj.email
    return name
  
  def get_isAdmin(self,obj):
    return obj.is_staff
  
  class Meta:
    model = User
    fields = ['_id', 'username', 'email', 'name', 'isAdmin']
    
class UserSerializerWithToken(UserSerializer):
  token = serializers.SerializerMethodField(read_only=True)
  
  def get_token(self, obj): 
    token = RefreshToken.for_user(obj)
    return str(token.access_token)
  
  class Meta:
    model = User
    fields = ['_id', 'username', 'email', 'name', 'isAdmin', 'token']