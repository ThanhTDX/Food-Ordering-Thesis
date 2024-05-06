from django.db import models

# Create your models here.

class User(models.Model):
    user_id = models.IntegerField()
    # password = models.Pas()
    full_name = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.name
    
class Reservation(models.Model):
    customer_name = models.CharField(max_length=255)