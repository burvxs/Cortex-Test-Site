# Generated by Django 2.2 on 2020-04-30 19:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('marketing', '0002_marketingpreference_mailchimp_subscribed'),
    ]

    operations = [
        migrations.RenameField(
            model_name='marketingpreference',
            old_name='update',
            new_name='updated',
        ),
    ]
