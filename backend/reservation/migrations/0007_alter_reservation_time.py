# Generated by Django 5.1.1 on 2024-11-05 00:45

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reservation', '0006_alter_reservation_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 8, 0, 44, 59, 309444, tzinfo=datetime.timezone.utc)),
        ),
    ]
