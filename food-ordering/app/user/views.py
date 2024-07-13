from django.shortcuts import render , redirect
from django.template import loader
from django.contrib.auth.models import auth
from django.contrib.auth import authenticate , login , logout
from . forms import LoginForm , RegisterForm

# Create your views here.

def LoginView(request):
  form = LoginForm()
  template = 'user/login.html'
  
  # LOGIN FUNCTION (Post)
  if request.method == 'POST':
    form = LoginForm(request, data=request.POST)
    if form.is_valid():
      username = request.POST.get('username')
      password = request.POST.get('password')
      
      user = authenticate(request, username=username, password=password)
      
      if user is not None:
        auth.login(request, user)
        return redirect("main")
      else:
        message.success(request, ("There was an error logging in."))
        return redirect("login")

  context = {'loginform':form}
  return render(request, template, context=context)

def LogoutView(request):
    logout(request)
    # message.success(request,("You have logged out."))
    return redirect("login")


def RegisterView(request):
    registerForm = RegisterForm()
    template = 'user/register.html'  
    
    if request.method == "POST":
        form = RegisterForm(request.POST) 
        if form.is_valid():
            form.save()
            return redirect("login")

    context = {'registerForm':registerForm}

    return render(request, template, context)

def UserPageView(request):
  template = 'user/userPage.html'
  context = {}
  return render(request, template, context)