from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
import re

# Create your models here.

class CustomUserManager(BaseUserManager):
    use_in_migrations=True
    def create_user(self, phone_number, username, password=None, **extra_fields):
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

    def create_staff(self, phone_number, username, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_active', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Staff must have is_staff=True.'))   
        if password is None:
            raise ValueError(_('A Staff must have a password.'))
        if username is None:
            raise ValueError(_('A Staff must have a username.'))
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Staff must have is_staff=True.'))

        return self.create_user(phone_number, username, password, **extra_fields)
    
class CustomUser(AbstractBaseUser, PermissionsMixin):
    phone_number = models.CharField(
        max_length=15, 
        validators=[RegexValidator(regex=r'^0[19]\d{8}$', message="Wrong number format entered")], 
        unique=True, 
        error_messages={'unique': _("This phone number is already in use.")}
    )
    username = models.CharField(max_length=50, default='')
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
    
    @classmethod
    def get_roles(self):
        return self.Roles

    def save(self, *args, **kwargs):
        if not self.username and self.phone_number:
            self.username = self.phone_number
        if not self.is_valid_phone_number(self.phone_number):
            raise ValidationError("Invalid phone number format.")
        return super().save(*args, **kwargs)

    @staticmethod
    def is_valid_phone_number(phone):
        return re.match(r'^0[19]\d{8}$', phone) is not None
    
    @classmethod
    # Fake user for default values
    def default_pk(cls):
        user, created = cls.objects.get_or_create(
            phone_number = '0912345678'
        )
        return user.pk

    def __str__(self):
        return str(self.phone_number)

class ManagerManager(models.Manager):
    def create(self, *args, **kwargs):
        # Custom logic before creating a Manager instance
        manager_instance = super().create(*args, **kwargs)
        manager_instance.type = CustomUser.Roles.MANAGER
        manager_instance.save()
        return manager_instance
    
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(role=CustomUser.Roles.MANAGER)

class Manager(CustomUser):
    objects = ManagerManager()
    class Meta:
        proxy = True
        
    def save(self, *args, **kwargs):
        if not self.pk:
            self.is_staff = True
            self.is_superuser = False
            self.role = CustomUser.Roles.MANAGER
        return super().save(*args, **kwargs)
        
class StaffManager(models.Manager):
    def create(self, *args, **kwargs):
        # Custom logic before creating a Staff instance
        staff_instance = super().create(*args, **kwargs)
        staff_instance.type = CustomUser.Roles.STAFF
        staff_instance.save() 
        return staff_instance
    
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(role=CustomUser.Roles.STAFF)

class Staff(CustomUser):
    objects = StaffManager()
    class Meta:
        proxy = True
        
    def __init__(self, *args, **kwargs):
        self.role = CustomUser.Roles.MANAGER
        return super().__init__(*args, **kwargs)
    
    def save(self, *args, **kwargs):
        if not self.pk:
            self.is_staff = True
            self.is_superuser = False
            self.role = CustomUser.Roles.STAFF
        return super().save(*args, **kwargs)
        
class CustomerManager(models.Manager):
    def create(self, *args, **kwargs):
        # Custom logic before creating a Customer instance
        customer_instance = super().create(*args, **kwargs)
        customer_instance.type = CustomUser.Roles.CUSTOMER 
        customer_instance.save()  
        return customer_instance
    
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(role=CustomUser.Roles.CUSTOMER)

class Customer(CustomUser):
    objects = CustomerManager()
    class Meta:
        proxy = True
        
    def __init__(self, *args, **kwargs):
        self.role = CustomUser.Roles.CUSTOMER
        return super().__init__(*args, **kwargs)
        
    def save(self, *args, **kwargs):
        if not self.pk:
            self.is_staff = False
            self.is_superuser = False
            self.role = CustomUser.Roles.CUSTOMER
        return super().save(*args, **kwargs)

class AdminManager(models.Manager):
    def create(self, *args, **kwargs):
        # Custom logic before creating a Customer instance
        customer_instance = super().create(*args, **kwargs)
        customer_instance.type = CustomUser.Roles.CUSTOMER 
        customer_instance.save()  
        return customer_instance
    
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(role=CustomUser.Roles.ADMIN)

class Admin(CustomUser):
    objects = AdminManager()
    class Meta:
        proxy = True
        
    def __init__(self, *args, **kwargs):
        self.role = CustomUser.Roles.ADMIN
        return super().__init__(*args, **kwargs)
        
    def save(self, *args, **kwargs):
        if not self.pk:
            self.role = CustomUser.Roles.ADMIN
            self.is_staff = True
            self.is_superuser = True
        return super().save(*args, **kwargs)
    
class UserProfile(models.Model):
  user = models.OneToOneField("users.CustomUser", on_delete=models.CASCADE, null=True)

class UserCustomMenuDetailsFood_FK(models.Model):
  custom_menu = models.ForeignKey("users.UserCustomMenu", on_delete=models.CASCADE)
  food = models.ForeignKey("base.Food", on_delete=models.CASCADE)
  qty = models.IntegerField(_("Quantity"), default=1)
  
class UserCustomMenuDetailsCombo_FK(models.Model):
  custom_menu = models.ForeignKey("users.UserCustomMenu", on_delete=models.CASCADE)
  combo = models.ForeignKey("base.Combo", on_delete=models.CASCADE)
  qty = models.IntegerField(_("Quantity"), default=1)
  
class UserCustomMenu(models.Model):
  name = models.CharField(max_length=256, default="Custom Menu")
  user = models.ForeignKey("users.UserProfile", on_delete=models.CASCADE, null=True)
  date_created = models.DateTimeField(default=timezone.now)
  price = models.DecimalField(max_digits=8, decimal_places=0, default=0)
  _id = models.AutoField(primary_key=True, editable=False)
  
  nutrition_value = models.TextField(null=True)
  num_ppl_eating = models.IntegerField(_("Number of people eating"), default=1)
  
  foods = models.ManyToManyField("base.Food", verbose_name=_("food_list"), related_name="custommenufood_set", through=UserCustomMenuDetailsFood_FK)
  combos = models.ManyToManyField("base.Combo", verbose_name=_("combo_list"), related_name="custommenucombo_set",through=UserCustomMenuDetailsCombo_FK)
  def __str__(self):
    return str(self.name) + " made by: " + str(self.user.username)
  
    
