from django.db import models
from django.utils import timezone
from users.models import CustomUser



# Create your models here.

# class Staff(models.Model):
#   class UserRole(models.TextChoices):
#     MANAGER = 'MANAGER' , 'Manager'
#     EMPLOYEE = 'EMPLOYEE' , 'Employee'
#     IT_ADMIN = 'IT_ADMIN' , 'IT_admin'


class UserCustomMenu(models.Model):
  name = models.CharField(max_length=256, null=True, default="User")
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=False)
  # food_item = models.ManyToManyField("app.Model", verbose_name=_(""))
  _id = models.AutoField(primary_key=True, editable=False)
  
  def __str__(self): 
    return str(self.name)
  
# class UserCustomMenuCombo(models.Model):
#   def __str__(self): 
#     return str(self.name)




  
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

class Food(models.Model):
  name = models.CharField(max_length=256, null=True, blank=True)
  price = models.DecimalField(max_digits=8, decimal_places=0)
  image = models.ImageField(null= True, blank=True)
  count_in_stock = models.IntegerField(null=True, blank=False, default=0)
  type = models.ForeignKey(FoodType, on_delete=models.CASCADE, null=True, related_name="type")
  tag = models.ManyToManyField(FoodTag, blank=True, related_name="tags")
  ingredient = models.ManyToManyField(FoodIngredient, blank=True, default='')
  nutrition_value = models.CharField(max_length=256, null=True, blank=True, default='')
  num_ppl_eat = models.IntegerField(null=True, blank=True, default=1)
  is_hot = models.BooleanField(default=False)
  _id = models.AutoField(primary_key=True, editable=False)
  
  def update_rating(self):
    ratings = self.foodrating
  
  rating = models.DecimalField(max_digits=2, decimal_places=1, default=0)
  num_of_rating = models.IntegerField(null=True, blank=False, default=0)
  
  def __str__(self):
    return str(self.name)
  
class FoodReview(models.Model):
  name = models.CharField(max_length=100, null=False, default="Anonymous")
  user = models.ForeignKey(CustomUser, on_delete=models.SET_DEFAULT, default="")
  food = models.ForeignKey(Food, on_delete=models.CASCADE)
  
  rating = models.DecimalField(max_digits=2, decimal_places=0, default=0.0)
  description = models.TextField(default="")
  time_upload = models.DateTimeField(null=True, blank=True)
  
  def __str__(self):
    return str(self.name)
  
  
class FoodCombo(models.Model):
  name = models.CharField(max_length=256, null=True, blank=True)
  food = models.ManyToManyField(Food)
  _id = models.AutoField(primary_key=True, editable=False)
  
  def __str__(self):
    return str(self.name)


class Comment(models.Model):
  commenter_name = models.CharField(max_length=256, null=False, default="Commenter")
  description = models.TextField(null=True, blank=True)
  # time = models.DateTimeField(default=)
  like_reaction = models.IntegerField(null=True, blank=True, default=0)
  dislike_reaction = models.IntegerField(null=True, blank=True, default=0)
  star_rating = models.DecimalField(max_digits=2, decimal_places=0)
  _id = models.AutoField(primary_key=True, editable=False)
  reply_comment= models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
  food_id = models.ForeignKey(Food, on_delete=models.CASCADE, default=-1)
  
  def __str__(self):
    return str(self._id) + str(self.name) 
