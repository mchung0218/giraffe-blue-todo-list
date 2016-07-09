from django.db import models
from django.conf import settings


class Task(models.Model):
	owner = models.ForeignKey(
		settings.AUTH_USER_MODEL,
        related_name='task_owner',
        null=True,
        blank=True
	)
	text = models.CharField(max_length=99999, null=True)
	priority = models.CharField(max_length=20)
	completed = models.IntegerField(default=0)

	def __str__(self):
		return self.text + " " + self.priority
