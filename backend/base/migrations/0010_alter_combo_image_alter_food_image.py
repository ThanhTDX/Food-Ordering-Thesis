# Generated by Django 5.1.1 on 2024-12-04 15:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_food_num_of_rating_food_rating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='combo',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='media/static/images'),
        ),
        migrations.AlterField(
            model_name='food',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='media/static/images'),
        ),
    ]
