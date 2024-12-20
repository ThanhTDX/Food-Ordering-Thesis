from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from datetime import timedelta
# Create your models here.

User = get_user_model()


class OrderingFood_FK(models.Model):
  ordering = models.ForeignKey("ordering.Ordering", on_delete=models.CASCADE, null=True)
  food = models.ForeignKey("base.Food", on_delete=models.DO_NOTHING, null=True)
  qty = models.SmallIntegerField()
  
class Ordering(models.Model):
  name = models.CharField(max_length=256, null=True, blank=True)
  phone_number = models.CharField(
    max_length=15, 
    validators=[RegexValidator(regex=r'^0[19]\d{8}$', message="Wrong number format entered")], 
    unique=False,
  )
  user = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True)
  user_name = models.CharField(max_length=256, null=True, blank=True)
  price = models.DecimalField(max_digits=10, decimal_places=0, default=0)
  address = models.CharField(max_length=256, null=True, blank=True)
  delivery_time = models.DateTimeField()
  bill_url = models.URLField(_("Bill Url"), max_length=200)
  
  class Statuses(models.TextChoices):
    PENDING = "PENDING", "Pending"
    SHIPPING = "SHIPPING", "Shipping"
    CANCELLED = "CANCELLED", "Cancelled"
    FINISHED = "FINISHED", "Finished"
  status = models.CharField(_('Status'), max_length=20 , choices=Statuses.choices, default=Statuses.PENDING)
    
  payment = models.OneToOneField("payment.Payment", on_delete=models.DO_NOTHING, null=True)
  food = models.ManyToManyField("base.Food", through=OrderingFood_FK)
  date_created = models.DateTimeField()

  _id = models.AutoField(primary_key=True, editable=False)
