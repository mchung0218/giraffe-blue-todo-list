from django.db import models

# Create your models here.

#class user(models.Model):
#	username = models.CharField(max_length=30, primary_key=True)
#	email = models.CharField(max_length=30)
#	userpass = models.CharField(max_length=100000)


# class Task(models.Model):
# 	username = models.ForeignKey(user, null=True)
# 	tasknum = models.IntegerField
# 	taskdesc = models.CharField(max_length=100000)
# 	priority = models.CharField(max_length=20)
# 	status = models.CharField(max_length=20)
# 	completed = models.IntegerField(default=0)
#
# 	class meta:
# 		unique_together = (("username", "tasknum"),)


class Task(models.Model):
	#id = models.IntegerField(primary_key=True)
	#Django will automatically create a auto ID pk field
	text = models.CharField(max_length=99999, null=True)
	priority = models.CharField(max_length=20)
	completed = models.IntegerField(default=0)

	def __str__(self):
		return self.text + " " + self.priority
