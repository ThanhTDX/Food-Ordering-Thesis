from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from datetime import timedelta
# Create your models here.

User = get_user_model()

class ReservationFood_FK(models.Model):
  ordering = models.ForeignKey("reservation.Reservation", on_delete=models.CASCADE, null=True)
  food = models.ForeignKey("base.Food", on_delete=models.DO_NOTHING, null=True)
  qty = models.SmallIntegerField()
  
class ReservationCombo_FK(models.Model):
  reservation = models.ForeignKey("reservation.Reservation", on_delete=models.CASCADE, null=True)
  combo = models.ForeignKey("base.FoodCombo", on_delete=models.DO_NOTHING, null=True)
  qty = models.SmallIntegerField()

class Reservation(models.Model):
  name = models.CharField(max_length=256, null=True, blank=True)
  phone_number = models.CharField(
        max_length=15, 
        validators=[RegexValidator(regex=r'^0[19]\d{8}$', message="Wrong number format entered")], 
        unique=True, 
        error_messages={'unique': _("This phone number is already in use.")}
    )
  user = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True)
  price = models.DecimalField(max_digits=10, decimal_places=0, editable=False, default=0)
  
  time = models.DateTimeField(default=timezone.now() + timedelta(days=3))
  eat_time = models.DurationField(default=timedelta(hours=1))
  
  class Statuses(models.TextChoices):
    PENDING = "PENDING", "Pending"
    ONGOING = "ONGOING", "Ongoing"
    CANCELLED = "CANCELLED", "Cancelled"
    FINISHED = "FINISHED", "Finished"
    
  status = models.CharField(_('Status'), max_length=20 , choices=Statuses.choices, default=Statuses.FINISHED)
    
  tables = models.ManyToManyField("restaurant.RestaurantTable", related_name="tables")
  vips = models.ManyToManyField("restaurant.RestaurantVIP", related_name="vips")
  foods = models.ManyToManyField("base.Food", through=ReservationFood_FK, related_name="foods")
  combos = models.ManyToManyField("base.FoodCombo", through=ReservationCombo_FK, related_name="combos")
  
  date_created = models.DateTimeField(default=timezone.now)
  
  _id = models.AutoField(primary_key=True, editable=False)
  
  def save(self, *args, **kwargs):
    # Calculate the price based on selected food and combo
    total_price = 0
    if self.food:
        total_price += self.food.price
    if self.combo:
        total_price += self.combo.price
    
    self.price = total_price  # Set the price attribute
    super().save(*args, **kwargs)  # Call the parent save method
    
  def __str__(self):
    return str(self.name)
