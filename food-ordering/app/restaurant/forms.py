from django.contrib.auth.models import User
from django import forms
from django.forms import ModelForm
from django.forms.widgets import TextInput
from . models import Reservation , ReservationTable , ReservationVip
from datetime import date

# Create your Forms here

# Reservation Form

class ReservationForm(forms.ModelForm):
    
    MINUTE_CHOICE = (
        (0, 0),
        (15, 15),
        (30, 30),
        (45, 45),
    )
    
    HOUR_CHOICE = ( [(x, x) for x in range(1,12)] )
    
    MONTH_CHOICE = ( [(x, x) for x in range(1,12)] )
    
    DAY_CHOICE = ( [(x, x) for x in range(1,31)] )
    
    eat_date = forms.TypedChoiceField(
        label="Day",
        choices=DAY_CHOICE,
        coerce=int,
        empty_value=DAY_CHOICE[date.today().day]
    )
    
    eat_month = forms.TypedChoiceField(
        label="Month",
        choices=MONTH_CHOICE,
        coerce=int,
        empty_value=MONTH_CHOICE[date.today().month]
    )
    
    eat_hour = forms.TypedChoiceField(
        label="Hour",
        choices=HOUR_CHOICE,
        coerce=int,
        empty_value=HOUR_CHOICE[0],
    )
    
    eat_minute = forms.TypedChoiceField(
        label="Minute",
        choices=MINUTE_CHOICE,
        coerce=int,
        empty_value=MINUTE_CHOICE[0],
    )
    
    class Meta:
        model = Reservation
        field = "__all__"
        exclude = ['review', 'eat_date', 'eat_time']
        
        widgets = {
            'customer_name' : forms.TextInput(attrs={'class':'form-control'}),
            'num_of_people' : forms.NumberInput(attrs={'class':'form-control'}),
            'special_message' : forms.Textarea(attrs={'class':'form-control'}),
        }
        
    def __init__(self, *args, **kwargs):
        super(ReservationForm, self).__init__(*args, **kwargs)

class ReservationTableForm(forms.ModelForm):
    TABLES_CHOICES = (
        ("1", "A1"),
        ("2", "A2"),
        ("3", "A3"),
        ("4", "B1"),
        ("5", "B2"),
        ("6", "B3"),
    )
    
    table_name = forms.MultipleChoiceField(label="Table Choice", choices=TABLES_CHOICES, required=False)
    
    class Meta:
        model = ReservationTable
        fields = ['table_name',]
        
    def __init__(self, *args, **kwargs):
        super(ReservationTableForm, self).__init__(*args, **kwargs)

class ReservationVipForm(forms.ModelForm):
    VIP_CHOICES = ( 
        ("1", "VIP1"), 
        ("2", "VIP2"), 
    ) 
    
    vip_name = forms.MultipleChoiceField(label="VIP Room", choices=VIP_CHOICES, required=False)
    
    class Meta:
        model = ReservationVip
        fields = ('vip_name',)
        
        widgets = {
            'vip_name' : forms.SelectMultiple(attrs={'class':'form-control'}),
        }
        
    def __init__(self, *args, **kwargs):
        super(ReservationVipForm, self).__init__(*args, **kwargs)
    
# Ordering Form

# class OrderingForm():