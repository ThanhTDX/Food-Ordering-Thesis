# Generated by Django 5.1.1 on 2024-11-14 10:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0002_rename_iscancelled_payment_is_cancelled_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='payment',
            name='is_cancelled',
        ),
    ]
