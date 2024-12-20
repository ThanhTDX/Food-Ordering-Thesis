# Generated by Django 5.1.1 on 2024-11-21 15:41

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reservation', '0018_alter_reservation_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='date_created',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='phone_number',
            field=models.CharField(max_length=15, validators=[django.core.validators.RegexValidator(message='Wrong number format entered', regex='^0[19]\\d{8}$')]),
        ),
    ]
