from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=85)
    completed = models.BooleanField(default=False, blank=True, null=True)
