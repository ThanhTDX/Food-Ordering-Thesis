from django.contrib import admin

from .models import *

# Register your models here.

class FoodAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'type')
    
admin.site.register(Food, FoodAdmin)
admin.site.register(FoodTag)
admin.site.register(FoodIngredient)
admin.site.register(FoodType)
admin.site.register(Comment)
admin.site.register(FoodPromotion)
admin.site.register(FoodCombo)