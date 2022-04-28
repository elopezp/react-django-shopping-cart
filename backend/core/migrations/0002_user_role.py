# Generated by Django 3.1.14 on 2022-04-28 03:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.PositiveSmallIntegerField(choices=[(1, 'buyer'), (2, 'sales')], default=1),
        ),
    ]