# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-02 22:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todolist', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='completed',
            field=models.IntegerField(default=0),
        ),
    ]