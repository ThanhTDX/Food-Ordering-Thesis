from django.db.models.signals import post_save
from django.dispatch import receiver
from promotion.models import *
from users.models import *

@receiver(post_save, sender=CustomUser)
def create_user_promotion(sender, instance, created, **kwargs):
    if created:
      # Create 2 new promotions for every User created
      promotion1 = Promotion.objects.get(name='USERPROMO1')
      promotion2 = Promotion.objects.get(name='USERPROMO2')
      new_promotion1 = UserPromotion()
      new_promotion1.promotion = promotion1
      new_promotion1.user = instance
      new_promotion1.save()
      
      new_promotion2 = UserPromotion()
      new_promotion2.promotion = promotion2
      new_promotion2.user = instance
      new_promotion2.save()
      