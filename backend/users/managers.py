from django.contrib.auth.models import BaseUserManager
from users.models import *
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
  def create_user(self, phone_number, password=None, **extra_fields):
      if not phone_number:
        raise ValueError(_('The Phone Number field must be set'))
      # it's just numbers, you don't normalize like in email
      # phone_number = self.normalize_phone_number(phone_number)
      user = self.model(phone_number=phone_number, **extra_fields)
      user.set_password(password)
      user.save(using=self._db)
      return user

  def create_superuser(self, phone_number, password=None, **extra_fields):
      extra_fields.setdefault('is_staff', True)
      extra_fields.setdefault('is_superuser', True)
      extra_fields.setdefault('is_active', True)
      extra_fields.setdefault('role', CustomUser.Roles.ADMIN)
      
      if extra_fields.get('is_staff') is not True:
        raise ValueError(_('Superuser must have is_staff=True.'))
      if extra_fields.get('is_superuser') is not True:
        raise ValueError(_('Superuser must have is_superuser=True.'))

      return self.create_user(phone_number, password, **extra_fields)
    
class Admin(models.Manager):
  class Meta: 
    proxy = True
    
class Manager(models.Manager):
  class Meta: 
    proxy = True
    
class Staff(models.Manager):
  def get_queryset(self):
    queryset = super(self).get_queryset()
    queryset = queryset.filter(role=CustomUser.Roles.Staff)
    return queryset
  
  class Meta: 
    proxy = True
    
class Customer(models.Manager):
  class Meta: 
    proxy = True
    