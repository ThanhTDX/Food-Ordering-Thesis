# Generated by Django 5.1.1 on 2024-11-07 22:36

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ordering', '0008_alter_ordering_date_created'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ordering',
            name='combo',
        ),
        migrations.AlterField(
            model_name='ordering',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 10, 22, 36, 48, 426048, tzinfo=datetime.timezone.utc)),
        ),
        migrations.DeleteModel(
            name='OrderingCombo_FK',
        ),
    ]
