from django.shortcuts import render
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
        return HttpResponseRedirect("/")
      else:
        message.success(request, ("There was an error logging in."))
        return HttpResponseRedirect("/login")

  context = {'loginform':form}
  return render(request, template, context=context)

def LogoutView(request):
    logout(request)
    message.success(request,("You have logged out."))
    return HttpResponseRedirect("/login")


def RegisterView(request):
    registerForm = RegisterForm()
    template = 'user/register.html'  
    
    if request.method == "POST":
        form = RegisterForm(request.POST) 
        if form.is_valid():
            form.save()
            return HttpResponseRedirect("/login")

    context = {'registerForm':registerForm}

    return render(request, template, context)

def UserPageView(request):
    return HttpResponse("<h1> USER PAGE </h1>")