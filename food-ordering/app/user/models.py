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