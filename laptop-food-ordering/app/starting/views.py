from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.template import loader
from django.contrib import messages
from . forms import ReservationForm
from . models import Food

def MainView(request):
  return render(request, 'main.html')

def AboutView(request):
  return render(request, 'about.html')

def BookingView(request):
  return render(request, 'booking.html')

def ContactView(request):
  return render(request, 'contact.html')

def MenuView(request):
  template = 'menu.html'
  context = {}
  context["foodlist"] = Food.objects.all()
  return render(request, template, context)

def MenuItemView(request, id):
  template = 'menu-item.html'
  context = {}
  return render(request, template, context)

def ServiceView(request):
  return render(request, 'service.html')

def ReservationView(request):
  template = 'reservation/index.html'
  
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
  return render(request, 'order.html')

def TestimonialView(request):
  return render(request, 'testimonial.html')