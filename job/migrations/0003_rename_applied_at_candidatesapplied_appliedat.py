# Generated by Django 4.1.5 on 2023-01-13 15:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0002_candidatesapplied'),
    ]

    operations = [
        migrations.RenameField(
            model_name='candidatesapplied',
            old_name='applied_at',
            new_name='appliedAt',
        ),
    ]
