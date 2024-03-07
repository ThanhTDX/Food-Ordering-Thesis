from django.http import HttpResponse
from django.template import loader

def main(request):
  template = loader.get_template('main.html')
  return HttpResponse(template.render())

def link1(request):
  template = loader.get_template('link1.html')
  return HttpResponse(template.render())

def link2(request):
  template = loader.get_template('link2.html')
  return HttpResponse(template.render())

def link3(request):
  template = loader.get_template('link3.html')
  return HttpResponse(template.render())

def link4(request):
  template = loader.get_template('link4.html')
  return HttpResponse(template.render())