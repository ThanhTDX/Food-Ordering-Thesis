# Generated by Django 5.1.1 on 2024-10-28 22:13

import django.db.models.deletion
import users.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user_profile', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='user',
            field=models.OneToOneField(default=users.models.CustomUser.default_pk, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='usercustommenu',
            name='user',
            field=models.ForeignKey(default=users.models.CustomUser.default_pk, on_delete=django.db.models.deletion.CASCADE, related_name='custom_menus', to='user_profile.userprofile'),
        ),
    ]
