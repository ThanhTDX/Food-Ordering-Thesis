from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.template import loader
from . models import Food
from . forms import ReservationForm
# Create your views here.

def ReservationView(request):
  template = 'restaurant/reservation.html'
  
  # POST REQUEST
  if request.method == 'POST' :
    form = ReservationForm(request.POST)
    if form.is_valid():
      customer_name = form.cleaned_data('customer_name')
      phone_num = form.cleaned_data('phone_num')
      vip_room = form.cleaned_data('vip_room')
      eat_time = form.cleaned_data('eat_time')
      num_of_people = form.cleaned_data('num_of_people')
      review = form.cleaned_data('review')
      form.save()
      return HttpResponseRedirect('/')
  
   # GET REQUEST 
  else:
    form = ReservationForm()
  
  context = {'reservationForm' : form }
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