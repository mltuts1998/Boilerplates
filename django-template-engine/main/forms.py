from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class UserRegisterForm(UserCreationForm):
	# designation = forms.ChoiceField(choices = DETAIL)
	class Meta:
		model = User
		fields = ("first_name","last_name", "username", 
			"email", "password1", "password2", 
				  	# "designation"
		)

class UserLoginForm(forms.Form):
    username = forms.CharField(max_length=100)
    password = forms.CharField(widget=forms.PasswordInput())