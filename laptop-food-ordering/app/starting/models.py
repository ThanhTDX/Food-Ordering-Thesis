from django.db import models

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

    
class Reservation(models.Model):
    reservation_id = models.AutoField(primary_key=True)
    customer_name = models.CharField(max_length=255, blank=True, null=True)
    phone_num = models.IntegerField(blank=True, null=True)
    eat_time = models.DateTimeField(blank=True, null=True)
    num_of_people = models.IntegerField(blank=True, null=True)
    review = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'reservation'
        
class ReservationTable(models.Model):
    reservation = models.OneToOneField(Reservation, models.DO_NOTHING)
    table_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reservation_table'


class ReservationVip(models.Model):
    reservation = models.OneToOneField(Reservation, models.DO_NOTHING)
    table_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reservation_vip'
