from .models import CustomUser

from django.contrib.auth.forms import UserCreationForm , UserChangeForm

# THIS FORM IS ONLY FOR ADMIN LEVEL CREATION

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('phone_number',) 
    
class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = "__all__"
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].required = False
