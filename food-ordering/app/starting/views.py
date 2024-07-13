from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.template import loader
from django.contrib import messages


def MainView(request):
  return render(request, 'main.html')

def AboutView(request):
  return render(request, 'about.html')

def BookingView(request):
  return render(request, 'booking.html')

def ContactView(request):
  return render(request, 'contact.html')

def ServiceView(request):
  return render(request, 'service.html')

def TestimonialView(request):
  return render(request, 'testimonial.html')