# Generated by Django 5.1.1 on 2024-10-30 06:19

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0005_alter_usercustommenu_date_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usercustommenu',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2024, 10, 30, 6, 19, 56, 663916, tzinfo=datetime.timezone.utc)),
        ),
    ]
