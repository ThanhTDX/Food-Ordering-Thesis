from django.shortcuts import render
from . models import Food
from django.template import loader
from django.http import HttpResponse

# Create your views here.

def chaoLong(request):
    template = 'chaolong.html'
    context = {}
    context["chaolong"] = Food.objects.filter(food_id=44)
    return render(request, template, context)

