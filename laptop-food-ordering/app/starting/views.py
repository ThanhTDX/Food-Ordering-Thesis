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
  template = 'reservation.html'
  
  # CREATE RESERVATION FUNCTION
  if request.method == 'POST' :
    form = ReservationForm(request.POST)
    if form.is_valid():
      customer_name = request.POST.get('customer_name')
      phone_num = request.POST.get('phone_num')
      vip_room = request.POST.get('vip_room')
      eat_time = request.POST.get('eat_time')
      num_of_people = request.POST.get('num_of_people')
      review = request.POST.get('review')
      form.save()
      return HttpResponseRedirect('/')
  
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