from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
# Create your models here.


User = get_user_model()

class UserProfile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE ,default=User.default_pk)
  pass


class UserCustomMenu(models.Model):
  name = models.CharField(max_length=256, default="Custom Menu")
  user = models.ForeignKey("user_profile.UserProfile", on_delete=models.CASCADE, default=User.default_pk, related_name="custom_menus")
  date_created = models.DateTimeField(default=timezone.now)
  price = models.DecimalField(max_digits=8, decimal_places=0, default=0)
  _id = models.AutoField(primary_key=True, editable=False)
  
  # nutrition_value = models.
  # num_ppl_eating = models.
  def __str__(self):
    return str(self.name) + " made by: " + str(self.user.username)

class UserCustomMenuDetails(models.Model):
  custom_menu = models.ManyToManyField("user_profile.UserCustomMenu")
  