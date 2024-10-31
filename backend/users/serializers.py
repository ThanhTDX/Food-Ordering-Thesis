from rest_framework import serializers

from users.models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):      
  def validate(self, attrs):
      data = super().validate(attrs)
      serializer = UserSerializerWithToken(self.user).data
      for k, v in serializer.items() :
        data[k] = v
      return data

class CustomUserSerializer(serializers.ModelSerializer):
  username = serializers.SerializerMethodField(read_only=True)
  _id = serializers.SerializerMethodField(read_only=True)
  isSuperuser = serializers.SerializerMethodField(read_only=True)
  
  def get__id(self,obj):
    return obj.id
  
  def get_username(self, obj):
    username = obj.username
    if username == '':
      username = obj.phone_number
    return username
  
  def get_isSuperuser(self,obj):
    return obj.is_superuser
  
  class Meta:
    model = CustomUser
    fields = ['_id', 'phone_number', 'username', 'isSuperuser']

class UserSerializerWithToken(CustomUserSerializer):
  token = serializers.SerializerMethodField(read_only=True)
  
  def get_token(self, obj): 
    token = RefreshToken.for_user(obj)
    return str(token.access_token)
  
  class Meta:
    model = CustomUser
    fields = ['_id', 'username', 'phone_number', 'isSuperuser', 'token']