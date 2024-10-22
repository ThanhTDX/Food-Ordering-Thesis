from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from users.managers import *
import re

# Create your models here.

class CustomUser(AbstractBaseUser, PermissionsMixin):
  phone_number = models.CharField(max_length=15, unique=True, error_messages={'unique': _("This phone number is already in use.")})
  username = models.CharField(max_length=20, unique=False, default="")
  start_date = models.DateTimeField(default=timezone.now)

  is_active = models.BooleanField(default=False)
  is_staff = models.BooleanField(default=False)
  
  class Roles(models.TextChoices):
    MANAGER = "MANAGER", "Mangager"
    STAFF = "STAFF", "Staff"
    CUSTOMER = "CUSTOMER", "Customer"
    ADMIN = "ADMIN", "Admin"
    
  role = models.CharField(_('Role'), max_length=20 , choices=Roles.choices, default=Roles.CUSTOMER)
  
  objects = CustomUserManager()
  
  USERNAME_FIELD = 'phone_number'
  REQUIRED_FIELDS = ['username']  # Other required fields

  def save(self, *args, **kwargs):
      if not self.is_valid_phone_number(self.phone_number):
          raise ValidationError("Invalid phone number format.")
      super().save(*args, **kwargs)

  @staticmethod
  def is_valid_phone_number(phone):
      return re.match(r'^0[1-9]\d{8}$', phone) is not None

  def __str__(self):
      return str(self.phone_number)

