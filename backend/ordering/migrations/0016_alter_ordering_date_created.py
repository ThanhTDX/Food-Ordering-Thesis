# Generated by Django 5.1.1 on 2024-11-15 03:23

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ordering', '0015_alter_ordering_date_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ordering',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 18, 3, 23, 3, 841789, tzinfo=datetime.timezone.utc)),
        ),
    ]