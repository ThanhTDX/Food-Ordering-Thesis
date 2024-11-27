# Generated by Django 5.1.1 on 2024-10-31 08:42

import datetime
import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('base', '0002_alter_food_ingredient'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Ordering',
            fields=[
                ('name', models.CharField(blank=True, max_length=256, null=True)),
                ('phone_number', models.CharField(error_messages={'unique': 'This phone number is already in use.'}, max_length=15, unique=True, validators=[django.core.validators.RegexValidator(message='Wrong number format entered', regex='^0[19]\\d{8}$')])),
                ('price', models.DecimalField(decimal_places=0, default=0, max_digits=10)),
                ('address', models.CharField(blank=True, max_length=256, null=True)),
                ('time', models.DateTimeField()),
                ('status', models.CharField(choices=[('PENDING', 'Pending'), ('SHIPPING', 'Shipping'), ('CANCELLED', 'Cancelled'), ('FINISHED', 'Finished')], default='FINISHED', max_length=20, verbose_name='Status')),
                ('date_created', models.DateTimeField(default=datetime.datetime(2024, 11, 3, 8, 42, 1, 76174, tzinfo=datetime.timezone.utc))),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='OrderingCombo_FK',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qty', models.SmallIntegerField()),
                ('combo', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='base.foodcombo')),
                ('ordering', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='ordering.ordering')),
            ],
        ),
        migrations.AddField(
            model_name='ordering',
            name='combo',
            field=models.ManyToManyField(through='ordering.OrderingCombo_FK', to='base.foodcombo'),
        ),
        migrations.CreateModel(
            name='OrderingFood_FK',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qty', models.SmallIntegerField()),
                ('food', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='base.food')),
                ('ordering', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='ordering.ordering')),
            ],
        ),
        migrations.AddField(
            model_name='ordering',
            name='food',
            field=models.ManyToManyField(through='ordering.OrderingFood_FK', to='base.food'),
        ),
    ]