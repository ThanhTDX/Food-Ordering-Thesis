from django.http import HttpResponseRedirect
from django.shortcuts import render , redirect
from django.template import loader
from . models import Food , FoodTag
from . forms import ReservationForm , ReservationTableForm , ReservationVipForm
import datetime
from datetime import date
# Create your views here.



def ReservationView(request):
  template = 'restaurant/reservation.html'
  
  # POST REQUEST
  if request.method == 'POST' :
    reservation_form = ReservationForm(request.POST)
    reservation_table = ReservationTableForm(request.POST)
    reservation_vip = ReservationVipForm(request.POST)
    
    if reservation_form.is_valid() and reservation_table.is_valid() and reservation_vip.is_valid():
      cleaned_form = reservation_form.cleaned_data
      new_data = reservation_form.save(commit=False)
      new_data.eat_date = datetime.date(date.today().year, cleaned_form['eat_month'], cleaned_form['eat_date'])
      new_data.eat_time = datetime.time(cleaned_form['eat_hour'], cleaned_form['eat_minute'], 0)
      new_data.save()
      
      table_data = reservation_table.save(commit=False)
      table_data.reservation = new_data
      table_data.save()
      
      vip_data = reservation_vip.save(commit=False)
      vip_data.reservation = new_data
      vip_data.save()
      
      return redirect("main")
  
   # GET REQUEST 
  else:
    reservation_form = ReservationForm()
    reservation_table = ReservationTableForm()
    reservation_vip = ReservationVipForm()
    
  
  context = {
    'reservationForm' : reservation_form,
    'reservationTable' : reservation_table,
    'reservationVip' : reservation_vip
  }
  return render(request, template, context)

def OrderView(request):
  template = 'restaurant/order.html'
  context = {}
  return render(request, template, context)

def MenuView(request):
  template = 'restaurant/menu.html'
  context = {}
  context = {
    "foodlist" : Food.objects.all()
  }
  return render(request, template, context)

def MenuItemView(request, id):
  template = 'restaurant/menu-item.html'
  context = {}
  return render(request, template, context)