from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.template import loader
from django.contrib.auth import authenticate , login , logout
from django.contrib import messages
from . forms import RegisterForm , LoginForm ,  ReservationForm
from . models import Food

# - Authentication models and functions

from django.contrib.auth.models import auth
from django.contrib.auth import authenticate, login, logout

def index(request):
  return render(request, 'index.html')

def about(request):
  return render(request, 'about.html')

def booking(request):
  return render(request, 'booking.html')

def contact(request):
  return render(request, 'contact.html')

def menu(request):
  template = 'menu.html'
  context = {}
  context["foodlist"] = Food.objects.all()
  return render(request, template, context)

def service(request):
  return render(request, 'service.html')

def reservation(request):
  form = ReservationForm()
  template = 'reservation/reservation.html'
  
  # CREATE RESERVATION FUNCTION
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
  else:
    form = ReservationForm()
  context = {'reservationForm':form}
  return render(request, template, context)

def order(request):
  return render(request, 'order.html')

def testimonial(request):
  return render(request, 'testimonial.html')

def login(request):
  form = LoginForm()
  template = 'login.html'
  
  # LOGIN FUNCTION (Post)
  if request.method == 'POST':
    form = LoginForm(request, data=request.POST)
    if form.is_valid():
      username = request.POST.get('username')
      password = request.POST.get('password')
      
      user = authenticate(request, username=username, password=password)
      
      if user is not None:
        auth.login(request, user)
        return HttpResponseRedirect("/")
      else:
        message.success(request, ("There was an error logging in."))
        return HttpResponseRedirect("/login")

      

  context = {'loginform':form}
  return render(request, template, context=context)

def logout(request):
    logout(request)
    message.success(request,("You have logged out."))
    return HttpResponseRedirect("/")

def register(request):
  
    template = 'register.html'  
    form = RegisterForm()
    if request.method == "POST":
        form = RegisterForm(request.POST) 
        if form.is_valid():
            form.save()
            return HttpResponseRedirect("/")

    context = {'registerForm':form}

    return render(request, template, context=context)