from django.db import models
from datetime import time
from django.core.validators import RegexValidator
from django.db.models import Avg, Count

from users.models import Manager

# Create your models here.


class Restaurant(models.Model): 
  name = models.CharField(max_length=256, null=False)
  address = models.CharField(max_length=256, null=True, blank=True)
  hotline = models.CharField(max_length=10, default="0101010101", validators=[RegexValidator(regex=r'^0[19]\d{8}$', message="Wrong number format entered")])
  manager = models.ForeignKey(Manager, on_delete=models.CASCADE, null=True)
  opening_time = models.TimeField()
  closing_time = models.TimeField()
  _id = models.AutoField(primary_key=True, editable=False)
  
  # Derived fields, from RestaurantRating (can't be updated here)
  rating = models.DecimalField(max_digits=2, decimal_places=0, default=0.0, editable=False) # rating range: 0.0 - 5.0
  num_of_rating = models.IntegerField(default=0, editable=False)
  
  def update_rating(self):
    # Update rating and num_of_rating based on related ratings
    rating_data = self.rating_set.aggregate(avg_rating=Avg('score'), count=Count('id'))
    self.rating = rating_data['avg_rating'] or 0
    self.num_of_rating = rating_data['count'] or 0
    self.save()
    
  def get_name(self):
    return self.name
  
  def __str__(self):
    return self.name

  class Meta: 
    ordering = ['_id']
  
class RestaurantTable(models.Model):
  name = models.CharField(max_length=256, null=True, blank=True)
  restaurant = models.ForeignKey("restaurant.Restaurant", on_delete=models.CASCADE, default=-1, related_name="tables")
  description = models.TextField()
  _id = models.AutoField(primary_key=True, editable=False)
  
  def __str__(self):
    return "Table " + str(self.name) + " at restaurant " + str(self.restaurant.get_name)

class RestaurantVIP(models.Model):
  name = models.CharField(max_length=256, null=True, blank=True)
  restaurant = models.ForeignKey("restaurant.Restaurant", on_delete=models.CASCADE, default=-1, related_name="vips")
  description = models.TextField()
  _id = models.AutoField(primary_key=True, editable=False)
  
  def __str__(self):
    return "VIP " + str(self.name) + " at restaurant " + str(self.restaurant.get_name)
  
class RestaurantRating(models.Model):
  restaurant = models.ForeignKey(Restaurant, related_name='ratings', on_delete=models.CASCADE)
  score = models.DecimalField(max_digits=1, decimal_places=0) # score range: 0 - 5
  _id = models.AutoField(primary_key=True, editable=False)
  
  def save(self, *args, **kwargs):
      super().save(*args, **kwargs)
      # Update the restaurant's rating after creating a new rating
      self.restaurant.update_rating()