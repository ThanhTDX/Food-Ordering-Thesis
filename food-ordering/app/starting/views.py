from django.http import HttpResponse
from django.template import loader

def index(request):
  template = loader.get_template('index.html')
  return HttpResponse(template.render())

def about(request):
  template = loader.get_template('about.html')
  return HttpResponse(template.render())

def booking(request):
  template = loader.get_template('booking.html')
  return HttpResponse(template.render())

def contact(request):
  template = loader.get_template('contact.html')
  return HttpResponse(template.render())

def menu(request):
  template = loader.get_template('menu.html')
  return HttpResponse(template.render())

def service(request):
  template = loader.get_template('service.html')
  return HttpResponse(template.render())

def team(request):
  template = loader.get_template('team.html')
  return HttpResponse(template.render())

def testimonial(request):
  template = loader.get_template('testimonial.html')
  return HttpResponse(template.render())