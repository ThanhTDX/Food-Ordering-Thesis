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

def ServiceView(request):
  return render(request, 'service.html')

def ReservationView(request):
  form = ReservationForm()
  template = 'reservation/index.html'
  
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
  
  # Rendering forms and put in context
  # rendered_form = ReservationForm.render("reservation/reservationForm.html")
  context = {'reservationForm':form}
  
  return render(request, template, context)

def OrderView(request):
  return render(request, 'order.html')

def TestimonialView(request):
  return render(request, 'testimonial.html')

def LoginView(request):
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

def LogoutView(request):
    logout(request)
    message.success(request,("You have logged out."))
    return HttpResponseRedirect("/")

def RegisterView(request):
  
    template = 'register.html'  
    form = RegisterForm()
    if request.method == "POST":
        form = RegisterForm(request.POST) 
        if form.is_valid():
            form.save()
            return HttpResponseRedirect("/")

    context = {'registerForm':form}

    return render(request, template, context=context)