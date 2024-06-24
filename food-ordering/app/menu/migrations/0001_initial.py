# Generated by Django 4.2.11 on 2024-06-23 02:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Food',
            fields=[
                ('food_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('price', models.FloatField(blank=True, null=True)),
                ('nutrition_value', models.TextField(blank=True, null=True)),
                ('image_link', models.ImageField(blank=True, null=True, upload_to='')),
                ('type', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'food',
                'managed': False,
            },
        ),
    ]