from django.db import models
from django.contrib.auth.models import User

# Create your models here.

  
class FoodTag(models.Model):
  name = models.CharField(max_length=256, null=True, blank=True)
  _id = models.AutoField(primary_key=True, editable=False)
  
  def __str__(self):
    return str(self.name)
  
class FoodIngredient(models.Model):
  name = models.CharField(max_length=256, null=True, blank=True)
  _id = models.AutoField(primary_key=True, editable=False)
  
  def __str__(self):
    return str(self.name)
  
class FoodType(models.Model):
  name = models.CharField(max_length=256, null=True, blank=True)
  _id = models.AutoField(primary_key=True, editable=False)
  
  def __str__(self):
    return str(self.name)

class Food(models.Model):
  name = models.CharField(max_length=256, null=True, blank=True)
  price = models.DecimalField(max_digits=8, decimal_places=0)
  count_in_stock = models.IntegerField(null=True, blank=True, default=0)
  food_type = models.ForeignKey(FoodType, on_delete=models.SET_NULL, null=True)
  image = models.ImageField(null= True, blank=True)
  _id = models.AutoField(primary_key=True, editable=False)
  food_tag = models.ManyToManyField(FoodTag, null=True, blank=True)
  ingredient = models.ManyToManyField(FoodIngredient, null=True, blank=True)
  nutrition_value = models.CharField(max_length=256, null=True, blank=True)
  number_people_eating = models.IntegerField(null=True, blank=True, default=0)
  
  def __str__(self):
    return str(self.name)
