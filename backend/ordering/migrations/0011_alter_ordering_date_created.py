# Generated by Django 5.1.1 on 2024-11-07 22:57

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ordering', '0010_alter_ordering_date_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ordering',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 10, 22, 57, 30, 966953, tzinfo=datetime.timezone.utc)),
        ),
    ]