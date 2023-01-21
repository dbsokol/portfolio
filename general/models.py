from django.utils import timezone as django_timezone
from datetime import datetime, timezone
from django.db import models


########################
## -- Model Mixins -- ##
########################

class BaseModel(models.Model):

    ''' Extension of base model class '''

    created_at = models.DateTimeField(editable=False, default=django_timezone.now)
    last_updated_at = models.DateTimeField(editable=False, default=django_timezone.now)
    
    def save(self, *args, **kwargs):
        
        # set created at field:        
        if not self.id: self.created_at = datetime.now(timezone.utc)
        
        # set last updated at field:
        self.last_updated_at = datetime.now(timezone.utc)
    
        super(BaseModel, self).save(*args, **kwargs)

    class Meta: abstract = True
    


##################
## -- Models -- ##
##################

class Contact(BaseModel):
    
    name = models.CharField(max_length=65)
    value = models.CharField(max_length=65)
    url = models.URLField(blank=True, null=True)



class Education(BaseModel):
    
    institution = models.CharField(max_length=64)
    degree = models.CharField(max_length=64)
    major = models.CharField(max_length=64)
    start_date = models.DateField()
    end_date = models.DateField()
    
    class Meta: verbose_name_plural = 'Education'
    
    

class Experience(BaseModel):
    
    institution = models.CharField(max_length=64)
    title = models.CharField(max_length=64)
    mission = models.CharField(max_length=320)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    
    def __str__(self): return self.institution
    
    

class Responsibility(BaseModel):
    
    experience = models.ForeignKey('Experience', on_delete=models.CASCADE, related_name='responsibilties')
    details = models.CharField(max_length=320)


    class Meta: verbose_name_plural = 'Responsibilities'
    


class Project(BaseModel):
    
    name = models.CharField(max_length=64)
    url = models.URLField()
    
    

class Skill(BaseModel):
    
    name = models.CharField(max_length=64)
    start_date = models.DateField()
    