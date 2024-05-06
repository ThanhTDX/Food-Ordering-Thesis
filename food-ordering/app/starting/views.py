from django.http import HttpResponse
from django.shortcuts import render,redirect
from django.template import loader
from . forms import CreateUserForm , LoginForm

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
  return render(request, 'menu.html')

def service(request):
  return render(request, 'service.html')

def reservation(request):
  return render(request, 'reservation.html')

def order(request):
  return render(request, 'order.html')

def testimonial(request):
  return render(request, 'testimonial.html')

def login(request):
  form = LoginForm()
  template = 'login.html'
  
  if request.method == 'POST' :
    form = LoginForm(request, data=request.POST)
    if form.is_valid():
      username = request.POST.get('username')
      password = request.POST.get('password')
      
      user = authenticate(request, username=username, password=password)
      
      if user is not None:
        auth.login(request, user)
        return redirect("index")
      
  context = {'loginform':form}
  return render(request, template, context=context)

def user_logout(request):
    auth.logout(request)
    return request("")

def register(request):
  
    template = 'register.html'  
    form = CreateUserForm()
    if request.method == "POST":
        form = CreateUserForm(request.POST) 
        if form.is_valid():
            form.save()
            return redirect("index")

    context = {'registerform':form}

    return render(request, template, context=context)