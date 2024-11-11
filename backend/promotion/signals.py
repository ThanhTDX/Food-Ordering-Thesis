from django.db.models.signals import post_save
from django.dispatch import receiver
from promotion.models import *
from users.models import *

@receiver(post_save, sender=CustomUser)
def create_user_promotion(sender, instance, created, **kwargs):
    if created:
      promotion, _ = Promotion.objects.get_or_create(name='USERPROMO')
      new_promotion = UserPromotion()
      new_promotion.promotion = promotion
      new_promotion.user = instance
      new_promotion.save()
      