from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django import forms
from django.forms.widgets import PasswordInput, TextInput


# - Create/Register a user (Model Form)

class RegisterForm(UserCreationForm):

    class Meta:

        model = User
        fields = ['username', 'email', 'password1', 'password2']
        
        
# - Authentication Form

class LoginForm(AuthenticationForm):
    username = forms.CharField(label="Username", widget=TextInput())
    password = forms.CharField(label="Password", widget=PasswordInput())
    
    
# Reservation Form

class ReservationForm():
    customer_name = forms.CharField(label="customer_name", max_length=100)
    
# Ordering Form

# class OrderingForm():