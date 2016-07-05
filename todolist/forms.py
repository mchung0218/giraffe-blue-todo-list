from django import forms

class testUpdateForm(forms.Form):
	text = forms.CharField(label="Text", max_length=99999)
	priority = forms.CharField(label="priority", max_length=20)


class testDeleteForm(forms.Form):
	text = forms.CharField(label="Text", max_length=99999)
