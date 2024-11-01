from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

# class UserCustomMenu(models.Model):
#   name = models.CharField(max_length=256, null=True, default="User")
#   user = models.ForeignKey(User, on_delete=models.CASCADE, default=User.default_pk)
#   food_item = models.ManyToManyField("base.Food")
#   combo = models.ManyToManyField("base.FoodCombo")
#   _id = models.AutoField(primary_key=True, editable=False)
  
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
  amount_percentage = models.IntegerField(default=0)
  amount_value = models.IntegerField(default=0)
  _id = models.AutoField(primary_key=True, editable=False)
  
  def __str__(self):
    return str(self.name)

class Food(models.Model):
  name = models.CharField(max_length=256,null=True,blank=True)
  price = models.DecimalField(max_digits=8,decimal_places=0,default=0)
  image = models.ImageField(upload_to='static/images',null=True,blank=True)
  count_in_stock = models.IntegerField(default=10)
  type = models.ForeignKey("base.FoodType", on_delete=models.CASCADE, null=True, related_name="type")
  tag = models.ManyToManyField("base.FoodTag", related_name="tags")
  ingredient = models.ManyToManyField("base.FoodIngredient", related_name="ingredient")
  nutrition_value = models.CharField(max_length=256, default='')
  num_ppl_eat = models.IntegerField(default=1)
  is_hot = models.BooleanField(default=False)
  _id = models.AutoField(primary_key=True, editable=False)
  
  # def update_rating(self):
  #   ratings =self.rating
  
  # rating = models.DecimalField(max_digits=2, decimal_places=1, default=0)
  # num_of_rating = models.IntegerField(null=True, blank=False, default=0)
    
  def __str__(self):
    return str(self.name)
  
class FoodReview(models.Model):
  name = models.CharField(max_length=100, null=False, default="Anonymous")
  user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
  food = models.ForeignKey("base.Food", on_delete=models.CASCADE, null=True)
  
  rating = models.DecimalField(max_digits=2, decimal_places=0, default=0.0)
  description = models.TextField(default="")
  time_upload = models.DateTimeField(null=True, blank=True)
  
  def __str__(self):
    return str(self.name)
  
  
class ComboType(models.Model):
  name = models.CharField(max_length=256, null=True, blank=True)
  
  _id = models.AutoField(primary_key=True, editable=False)
  def __str__(self):
    return str(self.name)
  
  @classmethod
  def default_pk(cls):
      type, created = cls.objects.get_or_create(
          name='Base Type', 
      )
      return type.pk

class FoodCombo(models.Model):
  name = models.CharField(max_length=256, null=True, blank=True)
  foods = models.ManyToManyField("base.Food", through="FoodComboItem")
  type = models.ForeignKey("base.ComboType", on_delete=models.CASCADE, null=True)
  price = models.DecimalField(max_digits=8, decimal_places=0, default=0)
  num_ppl_eat = models.IntegerField(default=1)
  image = models.ImageField(upload_to='static/images',null=True,blank=True)
  
  count_in_stock = models.IntegerField(default=1, editable=False)
  _id = models.AutoField(primary_key=True, editable=False)
  
  @staticmethod
  def calculate_count_in_stock(self):
    result = 0
    return result
  
  def __str__(self):
    return str(self.name)
  
class FoodComboItem(models.Model):
  food = models.ForeignKey(Food, on_delete=models.CASCADE)
  combo = models.ForeignKey(FoodCombo, on_delete=models.CASCADE)
  qty = models.SmallIntegerField(default=1)
  
  def __str__(self):
    return str(self.food) + str(self.combo)

class FoodComment(models.Model):
  commenter_name = models.CharField(max_length=256, null=False, default="Commenter")
  description = models.TextField(null=True, blank=True)
  # time = models.DateTimeField(default=)
  like_reaction = models.IntegerField(null=True, blank=True, default=0)
  dislike_reaction = models.IntegerField(null=True, blank=True, default=0)
  star_rating = models.DecimalField(max_digits=2, decimal_places=0)
  _id = models.AutoField(primary_key=True, editable=False)
  reply_comment= models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
  food_id = models.ForeignKey(Food, on_delete=models.CASCADE, null=True)
  
  def __str__(self):
    return str(self._id) + str(self.commenter_name) 
