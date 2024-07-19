from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

class Food(models.Model):
    food_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    price = models.FloatField(blank=True, null=True)
    nutrition_value = models.TextField(blank=True, null=True)
    image_link = models.ImageField(blank=True, null=True)
    type = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'food'
        
class FoodTag(models.Model):
    food = models.OneToOneField(Food, models.DO_NOTHING)
    tag = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'food_tag'
        
class Promotion(models.Model):
    promotion_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    decrease_price = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'promotion'
        
class FoodHasPromotion(models.Model):
    food = models.OneToOneField(Food, models.DO_NOTHING)
    promotion = models.OneToOneField(Promotion, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'food_has_promotion'
        
    
class Reservation(models.Model):
    reservation_id = models.AutoField(primary_key=True)
    customer_name = models.CharField(max_length=255, blank=False)
    phone_num = PhoneNumberField(blank=False, region='VN')
    eat_date = models.DateField(blank=True, null=True)
    eat_time = models.TimeField(blank=True, null=True)
    num_of_people = models.IntegerField(blank=True, null=True)
    review = models.TextField(blank=True, null=True)
    special_message = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'reservation'

class ReservationTable(models.Model):
    reservation = models.ForeignKey(Reservation, models.DO_NOTHING)
    table_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reservation_table'


class ReservationVip(models.Model):
    reservation = models.ForeignKey(Reservation, models.DO_NOTHING)
    vip_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reservation_vip'
