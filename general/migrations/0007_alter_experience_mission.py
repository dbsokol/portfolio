# Generated by Django 4.0.6 on 2023-10-05 17:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('general', '0006_publication'),
    ]

    operations = [
        migrations.AlterField(
            model_name='experience',
            name='mission',
            field=models.CharField(blank=True, max_length=320, null=True),
        ),
    ]