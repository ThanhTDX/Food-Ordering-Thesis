from django.db import models

# Create your models here.


class User(models.Model):
    user_id = models.IntegerField()
    # password = models.Pas()
    full_name = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.name
    
class User1(models.Model):
    user_id = models.AutoField(primary_key=True)  # The composite primary key (user_id, phone_num) found, that is not supported. The first column is selected.
    phone_num = models.IntegerField(unique=True)
    password = models.CharField(max_length=255)
    full_name = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'user'
        unique_together = (('user_id', 'phone_num'),)
    
        
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
