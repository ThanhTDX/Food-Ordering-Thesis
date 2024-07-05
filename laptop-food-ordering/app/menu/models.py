from django.db import models

# Create your models here.

def filepath(request, filepath):
        old_filepath = filepath
        return os.path.join('uploads/', filepath)

class Food(models.Model):
    food_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    price = models.FloatField(blank=True, null=True)
    nutrition_value = models.TextField(blank=True, null=True)
    image_link = models.ImageField(upload_to=filepath, blank=True, null=True)
    type = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return self.name
    

    class Meta:
        managed = False
        db_table = 'food'