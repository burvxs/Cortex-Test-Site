# Generated by Django 2.2 on 2020-04-30 19:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketing', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='marketingpreference',
            name='mailchimp_subscribed',
            field=models.NullBooleanField(),
        ),
    ]
