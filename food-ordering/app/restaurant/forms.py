from django.contrib.auth.models import User
from django import forms
from django.forms import ModelForm
from django.forms.widgets import TextInput
from . models import Reservation

# Create your Forms here

# Reservation Form

class ReservationForm(forms.ModelForm):
    VIP_CHOICES = ( 
        ("1", "VIP1"), 
        ("2", "VIP2"), 
    ) 
    TABLES_CHOICES = (
        ("1", "A1"),
        ("2", "A2"),
        ("3", "A3"),
        ("4", "B1"),
        ("5", "B2"),
        ("6", "B3"),
    )

    customer_name = forms.CharField(label="Customer Name", max_length=100)
    phone_num = forms.CharField(label="Phone Number")
    vip_room = forms.ChoiceField(label="VIP Room", choices=VIP_CHOICES, required=False)
    table = forms.MultipleChoiceField(label="Table Choice", choices=TABLES_CHOICES, required=False)
    
    eat_time = forms.DateTimeField(
        label="Eat Time",
        widget=forms.DateInput(
            attrs=  {
                'class':'form-control',
                'type':'date'
            }
        ),
        initial='2024-5-9'
    )
    
    num_of_people = forms.IntegerField(label="Number of People")
    review = forms.CharField(label="Special Message")
    
    class Meta:
        model = Reservation
        field = "__all__"
        exclude = ['reservation_id']
        
        # widgets = {
        #     'customer_name' :
        #     'phone_num' :
        #     'vip_room' :
        #     'table' : 
        #     'eat_time' :
        # }
        
    def __init__(self, *args, **kwargs):
        super(ReservationForm, self).__init__(*args, **kwargs)

# Ordering Form

# class OrderingForm():