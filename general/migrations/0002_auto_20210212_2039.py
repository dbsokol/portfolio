# Generated by Django 3.1.6 on 2021-02-12 20:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('general', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='education',
            options={'verbose_name_plural': 'Education'},
        ),
        migrations.AlterModelOptions(
            name='responsibility',
            options={'verbose_name_plural': 'Responsibilities'},
        ),
        migrations.RenameField(
            model_name='project',
            old_name='title',
            new_name='name',
        ),
    ]
