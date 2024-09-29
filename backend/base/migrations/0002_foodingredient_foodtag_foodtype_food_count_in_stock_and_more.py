# Generated by Django 5.1.1 on 2024-09-27 00:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='FoodIngredient',
            fields=[
                ('name', models.CharField(blank=True, max_length=256, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='FoodTag',
            fields=[
                ('name', models.CharField(blank=True, max_length=256, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='FoodType',
            fields=[
                ('name', models.CharField(blank=True, max_length=256, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
        ),
        migrations.AddField(
            model_name='food',
            name='count_in_stock',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='food',
            name='nutrition_value',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
        migrations.AddField(
            model_name='food',
            name='ingredient',
            field=models.ManyToManyField(to='base.foodingredient'),
        ),
        migrations.AddField(
            model_name='food',
            name='food_tag',
            field=models.ManyToManyField(to='base.foodtag'),
        ),
        migrations.AlterField(
            model_name='food',
            name='food_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.foodtype'),
        ),
    ]
