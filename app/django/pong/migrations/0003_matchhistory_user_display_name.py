# Generated by Django 5.0.6 on 2024-06-12 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pong', '0002_user_is_online'),
    ]

    operations = [
        migrations.AddField(
            model_name='matchhistory',
            name='user_display_name',
            field=models.CharField(default='You', max_length=150),
        ),
    ]