# Generated by Django 5.1.1 on 2024-11-07 23:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_delete_foodcombo'),
        ('promotion', '0002_rename_userpromotions_userpromotion'),
    ]

    operations = [
        migrations.AlterField(
            model_name='promotion',
            name='food',
            field=models.ManyToManyField(null=True, to='base.food', verbose_name='promotion_foods'),
        ),
    ]
