# Generated by Django 5.1.1 on 2024-11-13 23:49

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reservation', '0012_alter_reservation_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 16, 23, 49, 3, 874890, tzinfo=datetime.timezone.utc)),
        ),
    ]
