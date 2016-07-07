from django.db import models


class Task(models.Model):
	text = models.CharField(max_length=99999, null=True)
	priority = models.CharField(max_length=20)
	completed = models.IntegerField(default=0)

	def __str__(self):
		return self.text + " " + self.priority
