from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Food(models.Model):
  name = models.CharField(max_length=256, null=True, blank=True)
  price = models.DecimalField(max_digits=8, decimal_places=2)
  nutrition_value = models.TextField(null=True, blank=True)
  food_type = models.CharField(max_length=256, null=True, blank=True)
  image = models.ImageField(null= True, blank=True)
  _id = _id = models.AutoField(primary_key=True, editable=False)
  
  def __str__(self):
    return str(self.name)