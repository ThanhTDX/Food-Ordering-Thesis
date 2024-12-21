# Generated by Django 5.1.1 on 2024-12-21 05:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ordering', '0020_ordering_bill_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ordering',
            name='bill_url',
        ),
        migrations.AddField(
            model_name='ordering',
            name='bill',
            field=models.FileField(null=True, upload_to='', verbose_name='Bill Url'),
        ),
    ]
