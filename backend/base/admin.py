from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Food)
admin.site.register(FoodTag)
admin.site.register(FoodIngredient)
admin.site.register(FoodType)
admin.site.register(Comment)
admin.site.register(FoodPromotion)
admin.site.register(FoodCombo)