# Generated by Django 2.2 on 2020-04-28 10:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_user_ph_number'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='ph_number',
        ),
    ]
