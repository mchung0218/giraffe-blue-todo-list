from django.db import models

# Create your models here.

class user(models.Model):
	username = models.CharField(max_length=30, primary_key=True)
	email = models.CharField(max_length=30)
	userpass = models.TextField


class task(models.Model):
	username = models.ForeignKey(user)
	tasknum = models.IntegerField
	taskdesc = models.TextField
	priority = models.CharField(max_length=20)
	status = models.CharField(max_length=20)
	
	class meta:
		unique_together = (("username", "tasknum"),)
