# Generated by Django 5.1.1 on 2024-10-31 09:01

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ordering', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ordering',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 3, 9, 1, 58, 2176, tzinfo=datetime.timezone.utc)),
        ),
    ]
