from rest_framework import serializers
from ordering.models import *

class OrderingSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Ordering
    fields = '__all__'