from django.contrib.auth.models import User
from django import forms
from django.forms import ModelForm
from django.forms.widgets import TextInput
from . models import Reservation , ReservationTable , ReservationVip
from datetime import datetime

# Create your Forms here

# Reservation Form

class ReservationForm(forms.ModelForm):
    # customer_name = forms.CharField(label="Customer Name", max_length=100)
    # phone_num = forms.CharField(label="Phone Number")
    
    # eat_date = forms.DateField(
    #     label="Eat Date",
    #     widget=forms.DateInput(
    #         attrs=  {
    #             'class':'form-control col-6',
    #             'type':'date'
    #         }
    #     ),
    #     # initial='2024-5-9'
    # )
    
    # eat_time = forms.TimeField(
    #     label="Eat Time",
    #     widget=forms.TimeInput(
    #         attrs=  {
    #             'class':'form-control col-6',
    #             'type':'time'
    #         }
    #     ),
    #     # initial='2024-5-9'
    # )
    
    # num_of_people = forms.IntegerField(label="Number of People")
    # special_message = forms.CharField(label="Special Message")
    
    class Meta:
        model = Reservation
        field = "__all__"
        exclude = ['reservation_id', 'review']
        
        # widgets = {
        #     'customer_name' :
        #     'phone_num' :
        #     'vip_room' :
        #     'table' : 
        #     'eat_time' :
        # }
        
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
    
    table = forms.MultipleChoiceField(label="Table Choice", choices=TABLES_CHOICES, required=False)
    
    class Meta:
        model = ReservationTable
        fields = ['table_name',]
        exclude = []
        
    def __init__(self, *args, **kwargs):
        super(ReservationTableForm, self).__init__(*args, **kwargs)

class ReservationTableForm(forms.ModelForm):
    TABLES_CHOICES = (
        ("1", "A1"),
        ("2", "A2"),
        ("3", "A3"),
        ("4", "B1"),
        ("5", "B2"),
        ("6", "B3"),
    )
    
    table = forms.MultipleChoiceField(label="Table Choice", choices=TABLES_CHOICES, required=False)
    
    class Meta:
        model = ReservationTable
        fields = ()
        exclude = []
        
    def __init__(self, *args, **kwargs):
        super(ReservationTableForm, self).__init__(*args, **kwargs)

class ReservationVipForm(forms.ModelForm):
    VIP_CHOICES = ( 
        ("1", "VIP1"), 
        ("2", "VIP2"), 
    ) 
    
    vip_room = forms.MultipleChoiceField(label="VIP Room", choices=VIP_CHOICES, required=False)
    
    class Meta:
        model = ReservationVip
        fields = ()
        exclude = []
        
    def __init__(self, *args, **kwargs):
        super(ReservationVipForm, self).__init__(*args, **kwargs)
    
# Ordering Form

# class OrderingForm():