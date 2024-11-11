from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.


class Promotion(models.Model):
  name = models.CharField(_("Name"), max_length=50)
  start_time = models.DateTimeField(_("Start Date"), auto_now=False, auto_now_add=False) 
  end_time = models.DateTimeField(_("End Date"), auto_now=False, auto_now_add=False) 
  _id = models.AutoField(_("id"), primary_key=True, editable=False)
  class DiscountTypes(models.TextChoices):
    FLAT = "FLAT", "Flat"
    PERCENTAGE = "PERCENTAGE", "Percentage"
    
  food = models.ManyToManyField("base.Food", verbose_name=_("promotion_foods"))
  
  discount_type = models.CharField(_("Discount Type"), max_length=20, choices=DiscountTypes.choices, default=DiscountTypes.FLAT )
  amount = models.CharField(_("Amount Reduced"), max_length=20, default="25000")
  
  def __str__(self):
    return str(self.name) + ", Starts at: " + str(self.start_time) + ", Ends at: " + str(self.end_time)
  
class UserPromotion(models.Model):
  _id = models.AutoField(_("id"), primary_key=True, editable=False)
  user = models.ForeignKey("users.CustomUser", null=True, on_delete=models.CASCADE)
  promotion = models.ForeignKey("promotion.Promotion", null=True, on_delete=models.CASCADE)
  
  def __str__(self):
    return "Promotion " + str(self.promotion.name) + " on user " + str(self.user.username)