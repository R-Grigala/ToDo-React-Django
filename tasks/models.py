from django.db import models

class Task(models.Model):
    task_id = models.BigIntegerField(primary_key=True)
    title = models.CharField(max_length=200)
    compileted = models.BooleanField(default=False, blank=True, null=True)

    def __str__(self):
        return self.title