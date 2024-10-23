from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
import re

# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, phone_number, username="", password=None, **extra_fields):
        if not phone_number:
            raise ValueError(_('The Phone Number field must be set'))
        # it's just numbers, you don't normalize like in email
        # phone_number = self.normalize_phone_number(phone_number)
        
        if extra_fields.get('role') is not CustomUser.Roles.ADMIN:
            if extra_fields.get('is_staff') is True:
                raise ValueError(_('User must have is_staff=False.'))
        
            if extra_fields.get('is_superuser') is True:
                raise ValueError(_('Superuser must have is_superuser=False.'))
        

        user = self.model(phone_number=phone_number, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', CustomUser.Roles.ADMIN)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self.create_user(phone_number, username, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    phone_number = models.CharField(
        max_length=15, 
        validators=[RegexValidator(regex=r'^0[19]\d{8}$', message="Wrong number format entered")], 
        unique=True, 
        error_messages={'unique': _("This phone number is already in use.")}
    )
    username = models.CharField(max_length=50, unique=False, default="")
    start_date = models.DateTimeField(default=timezone.now)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    class Roles(models.TextChoices):
        MANAGER = "MANAGER", "Manager"
        STAFF = "STAFF", "Staff"
        CUSTOMER = "CUSTOMER", "Customer"
        ADMIN = "ADMIN", "Admin"
    # For authorization
    role = models.CharField(_('Role'), max_length=20 , choices=Roles.choices, default=Roles.CUSTOMER)

    objects = CustomUserManager()

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = ['username']  # Other required fields

    def save(self, *args, **kwargs):
        if not self.is_valid_phone_number(self.phone_number):
            raise ValidationError("Invalid phone number format.")
        return super().save(*args, **kwargs)

    @staticmethod
    def is_valid_phone_number(phone):
        return re.match(r'^0[19]\d{8}$', phone) is not None

    def __str__(self):
        return str(self.phone_number)

class ManagerManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(role=CustomUser.Roles.MANAGER)

class Manager(CustomUser):
    objects = ManagerManager()
    class Meta:
        proxy = True
        
    def save(self, *args, **kwargs):
        if not self.pk:
            self.type = CustomUser.Roles.MANAGER
        return super().save(*args, **kwargs)
        
class StaffManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(role=CustomUser.Roles.STAFF)

class Staff(CustomUser):
    objects = StaffManager()
    class Meta:
        proxy = True
        
    def save(self, *args, **kwargs):
        if not self.pk:
            self.type = CustomUser.Roles.STAFF
        return super().save(*args, **kwargs)
        
class CustomerManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(role=CustomUser.Roles.CUSTOMER)

class Customer(CustomUser):
    objects = CustomerManager()
    class Meta:
        proxy = True
        
    def save(self, *args, **kwargs):
        if not self.pk:
            self.type = CustomUser.Roles.CUSTOMER
        return super().save(*args, **kwargs)

class AdminManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(role=CustomUser.Roles.ADMIN)

class Admin(CustomUser):
    objects = AdminManager()
    class Meta:
        proxy = True
        
    def save(self, *args, **kwargs):
        if not self.pk:
            self.type = CustomUser.Roles.ADMIN
        return super().save(*args, **kwargs)