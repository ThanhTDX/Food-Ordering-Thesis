# Generated by Django 5.1.1 on 2024-11-21 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0004_alter_payment_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='order_id',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
    ]
