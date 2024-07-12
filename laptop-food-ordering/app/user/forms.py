from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django import forms
from django.forms.widgets import PasswordInput, TextInput

# Login/Authentication Form

class LoginForm(AuthenticationForm):
    username = forms.CharField(label="Username", widget=TextInput())
    password = forms.CharField(label="Password", widget=PasswordInput())
    
# - Create/Register a user

class RegisterForm(UserCreationForm):
    

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
    