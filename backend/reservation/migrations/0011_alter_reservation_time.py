# Generated by Django 5.1.1 on 2024-11-07 22:57

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reservation', '0010_alter_reservation_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 10, 22, 57, 30, 964954, tzinfo=datetime.timezone.utc)),
        ),
    ]
