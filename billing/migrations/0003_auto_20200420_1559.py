# Generated by Django 2.2 on 2020-04-20 05:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('billing', '0002_auto_20200420_1413'),
    ]

    operations = [
        migrations.AlterField(
            model_name='billingprofile',
            name='user',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]