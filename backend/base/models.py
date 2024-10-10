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
  
class FoodPromotion(models.Model):
  name = models.CharField(max_length=256, null=True, blank=True)
  start_date = models.DateTimeField(auto_now=True)
  end_date = models.DateTimeField(auto_now_add=False)
  amount_percentage = models.IntegerField(null=True, blank=False, default=0)
  amount_value = models.IntegerField(null=True, blank=False, default=0)
  _id = models.AutoField(primary_key=True, editable=False)
  
  def __str__(self):
    return str(self.name)
  
class FoodCombo(models.Model):
  name = models.CharField(max_length=256, null=True, blank=True)
  _id = models.AutoField(primary_key=True, editable=False)
  
  def __str__(self):
    return str(self.name)
  

class Food(models.Model):
  name = models.CharField(max_length=256, null=True, blank=True)
  price = models.DecimalField(max_digits=8, decimal_places=0)
  count_in_stock = models.IntegerField(null=True, blank=False, default=0)
  food_type = models.ForeignKey(FoodType, on_delete=models.CASCADE, null=True)
  image = models.ImageField(null= True, blank=True)
  _id = models.AutoField(primary_key=True, editable=False)
  food_tag = models.ManyToManyField(FoodTag, blank=True)
  ingredient = models.ManyToManyField(FoodIngredient, blank=True)
  nutrition_value = models.CharField(max_length=256, null=True, blank=True)
  number_people_eating = models.IntegerField(null=True, blank=True, default=0)
  is_hot = models.BooleanField(default=False)
  
  rating = models.DecimalField(max_digits=2, decimal_places=1, default=0)
  num_of_rating = models.IntegerField(null=True, blank=False, default=0)
  
  def __str__(self):
    return str(self.name)
  
class Comment(models.Model):
  commenter_name = models.CharField(max_length=256, null=False, default="Commenter")
  description = models.TextField(null=True, blank=True)
  like_reaction = models.IntegerField(null=True, blank=True, default=0)
  dislike_reaction = models.IntegerField(null=True, blank=True, default=0)
  star_rating = models.DecimalField(max_digits=2, decimal_places=0)
  _id = models.AutoField(primary_key=True, editable=False)
  reply_comment= models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)
  food_id = models.ForeignKey(Food, on_delete=models.CASCADE, default=-1)
  
  def __str__(self):
    return str(self._id) + str(self.name) 
