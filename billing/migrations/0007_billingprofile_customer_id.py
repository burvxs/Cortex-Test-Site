# Generated by Django 2.2 on 2020-04-29 12:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('billing', '0006_auto_20200426_1516'),
    ]

    operations = [
        migrations.AddField(
            model_name='billingprofile',
            name='customer_id',
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
    ]
