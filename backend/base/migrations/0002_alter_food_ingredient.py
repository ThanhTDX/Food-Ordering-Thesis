# Generated by Django 5.1.1 on 2024-10-30 06:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='food',
            name='ingredient',
            field=models.ManyToManyField(related_name='ingredient', to='base.foodingredient'),
        ),
    ]
