# Generated by Django 5.1.1 on 2024-10-28 22:13

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('restaurant', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='restaurant',
            name='manager',
            field=models.ForeignKey(default=-1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='restaurantrating',
            name='restaurant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ratings', to='restaurant.restaurant'),
        ),
        migrations.AddField(
            model_name='restauranttable',
            name='restaurant',
            field=models.ForeignKey(default=-1, on_delete=django.db.models.deletion.CASCADE, related_name='tables', to='restaurant.restaurant'),
        ),
        migrations.AddField(
            model_name='restaurantvip',
            name='restaurant',
            field=models.ForeignKey(default=-1, on_delete=django.db.models.deletion.CASCADE, related_name='vips', to='restaurant.restaurant'),
        ),
    ]
