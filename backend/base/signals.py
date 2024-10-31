from django.db.models.signals import post_save
from django.dispatch import receiver

from base.models import *

@receiver(post_save, sender=Food)
def set_default_food_fk(sender, instance, created, **kwargs):
    if created and not instance.type:
        # Set the default instance if none was provided
        default_instance, _ = FoodType.objects.get_or_create(name='Base Type')
        instance.type = default_instance
        instance.save()
        
    if created and not instance.ingredient:
        # Set the default instance if none was provided
        default_instance, _ = FoodIngredient.objects.get_or_create(name='Base Type')
        instance.ingredient = default_instance
        instance.save()
        
@receiver(post_save, sender=Food)
def set_default_foodCombo_fk(sender, instance, created, **kwargs):
        
    if created and not instance.type:
        # Set the default instance if none was provided
        default_instance, _ = ComboType.objects.get_or_create(name='Base Combo Type')
        instance.type = default_instance
        instance.save()