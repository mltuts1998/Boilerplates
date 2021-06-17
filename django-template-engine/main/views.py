from django.shortcuts import render, redirect, reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.models import User
from django.contrib import messages
from .forms import UserRegisterForm, UserLoginForm
from verify_email.email_handler import send_verification_email


def register(request):
    if request.user.is_authenticated:
        return redirect("main:home")
    form = UserRegisterForm(request.POST or None)
    
    if form.is_valid():
        inactive_user = send_verification_email(request, form)
        print(inactive_user)
    return render(request, "register.html", {"form": form})


def login(request):
    if request.user.is_authenticated:
        return redirect("main:home")
    
    form = UserLoginForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        username = form.cleaned_data.get("username")
        password = form.cleaned_data.get("password")

        user = authenticate(request, username=username,
                            password = password)
        if user:
            if user.is_active:
                auth_login(request, user)	
                return redirect("main:home")
            else:
                messages.error(request, "Invalid Credentials")			
        else:
                messages.error(request, "Invalid Credentials")
    return render(request, "login.html", {"form": form})


@login_required
def home(request):
    User.objects.get(username=request.user)
    return render(request, 'home.html')
