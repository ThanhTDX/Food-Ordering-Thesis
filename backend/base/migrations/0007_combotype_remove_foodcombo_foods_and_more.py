# Generated by Django 5.1.1 on 2024-11-07 22:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_alter_foodcombo_type_foodcombo_ingredient_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ComboType',
            fields=[
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
        ),
        migrations.RemoveField(
            model_name='foodcombo',
            name='foods',
        ),
        migrations.RemoveField(
            model_name='foodcombo',
            name='ingredient',
        ),
        migrations.RemoveField(
            model_name='foodcombo',
            name='tag',
        ),
        migrations.RemoveField(
            model_name='foodcombo',
            name='type',
        ),
        migrations.RenameModel(
            old_name='FoodComboItem',
            new_name='ComboItem',
        ),
        migrations.CreateModel(
            name='Combo',
            fields=[
                ('name', models.CharField(blank=True, max_length=256, null=True)),
                ('price', models.DecimalField(decimal_places=0, default=0, max_digits=8)),
                ('image', models.ImageField(blank=True, null=True, upload_to='static/images')),
                ('count_in_stock', models.IntegerField(default=10, editable=False)),
                ('num_ppl_eat', models.IntegerField(default=1)),
                ('is_hot', models.BooleanField(default=False)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('foods', models.ManyToManyField(through='base.ComboItem', to='base.food')),
                ('ingredient', models.ManyToManyField(editable=False, to='base.foodingredient')),
                ('tag', models.ManyToManyField(editable=False, to='base.foodtag')),
                ('type', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.combotype')),
            ],
        ),
        migrations.AlterField(
            model_name='comboitem',
            name='combo',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.combo'),
        ),
    ]