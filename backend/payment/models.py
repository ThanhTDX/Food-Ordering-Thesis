from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator

# Create your models here.

class Payment(models.Model):
  phone_number = models.CharField(
        max_length=15, 
        validators=[RegexValidator(regex=r'^0[19]\d{8}$', message="Wrong number format entered")], 
    )
  amount = models.DecimalField(max_digits=12,decimal_places=0,default=0)
  
  class STATUSES(models.TextChoices):
    PENDING = "PENDING" , "Pending"
    SUCCESSFUL = "SUCCESSFUL" , "Successful"
    CANCELLED = "CANCELLED" , "Cancelled"
    
  status = models.CharField(_('Status'), max_length=20 , choices=STATUSES.choices, default=STATUSES.PENDING)
    
  time_created = models.DateTimeField()
  order_id = models.CharField(max_length=256, null=True, blank=True)
  _id = models.AutoField(_("id"), primary_key=True, editable=False)
  
  def __str__(self):
    return str(self.phone_number) + " at " + str(self.time_created)
  
class PaymentInformation(models.Model):
  payment = models.OneToOneField("payment.Payment", on_delete=models.CASCADE)
  payment_method = models.CharField(max_length=15)
  data = models.JSONField()