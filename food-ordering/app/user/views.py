from django.shortcuts import render

# Create your views here.
def user_logout(request):
    auth.logout(request)
    return request("")