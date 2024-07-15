from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.template import loader
from . models import Food
from . forms import ReservationForm , ReservationTableForm , ReservationVipForm
# Create your views here.



def ReservationView(request):
  template = 'restaurant/reservation.html'
  
  # POST REQUEST
  if request.method == 'POST' :
    reservation_form = ReservationForm(request.POST)
    reservation_table = ReservationTableForm(request.POST)
    reservation_vip = ReservationVipForm(request.POST)
    
    if reservation_form.is_valid() and reservation_table.is_valid() and reservation_vip.is_valid():
      # customer_name = reservation_form.cleaned_data('customer_name')
      # phone_num = reservation_form.cleaned_data('phone_num')
      
      # eat_date = reservation_form.cleaned_data('eat_date')
      # eat_time = reservation_form.cleaned_data('eat_time')
      # num_of_people = reservation_form.cleaned_data('num_of_people')
      # special_message = reservation_form.cleaned_data('special_message')
      
      # table = reservation_table.cleaned_data('table_name')
      # vip_room = reservation_vip.cleaned_data('vip_room')
      
      reservation_form.save()
      reservation_table.save()
      reservation_vip.save()
      return HttpResponseRedirect('/')
  
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
  context["foodlist"] = Food.objects.all()
  return render(request, template, context)

def MenuItemView(request, id):
  template = 'restaurant/menu-item.html'
  context = {}
  return render(request, template, context)