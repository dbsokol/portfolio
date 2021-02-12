# Generated by Django 3.1.6 on 2021-02-12 20:25

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('last_updated_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('institution', models.CharField(max_length=64)),
                ('degree', models.CharField(max_length=64)),
                ('major', models.CharField(max_length=64)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('last_updated_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('institution', models.CharField(max_length=64)),
                ('mission', models.CharField(max_length=320)),
                ('title', models.CharField(max_length=64)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField(blank=True, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('last_updated_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('title', models.CharField(max_length=64)),
                ('url', models.URLField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Responsibility',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('last_updated_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('details', models.CharField(max_length=320)),
                ('experience', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='responsibilties', to='general.experience')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
