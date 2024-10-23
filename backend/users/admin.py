from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserCreationForm , CustomUserChangeForm
from .models import *
# Register your models here.


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    add_form = CustomUserCreationForm
    change_form = CustomUserChangeForm
    
    list_display = ('phone_number', 'username', 'role', 'last_login', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'role')
    ordering = ('phone_number',)

    fieldsets = (
        (None, {"fields": ("phone_number", "username", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "role", "groups", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "phone_number", "password1", "password2"
            )}
        ),
    )

admin.site.register(CustomUser, CustomUserAdmin)