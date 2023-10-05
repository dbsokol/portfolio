from django.contrib.auth.models import Group, User
from django.contrib import admin

from general import models



class BaseAdmin(admin.ModelAdmin):
    
    list_display = ['id', 'is_deleted',  'created_at', 'updated_at']



@admin.register(models.Contact)
class ContactAdmin(BaseAdmin): 
    
    list_display = BaseAdmin.list_display + ['name', 'value', 'url']



@admin.register(models.Education)
class EducationAdmin(BaseAdmin): 
    
    list_display = BaseAdmin.list_display + ['institution', 'degree', 'major', 'start_date', 'end_date']
    



@admin.register(models.Experience)
class ExperienceAdmin(BaseAdmin): 
    
    list_display = BaseAdmin.list_display + ['institution', 'title', 'mission', 'start_date', 'end_date']
    



@admin.register(models.Responsibility)
class ResponsibilityAdmin(BaseAdmin):
    list_display = BaseAdmin.list_display + ['experience', 'details']
    



@admin.register(models.Project)
class ProjectAdmin(BaseAdmin): 
    
    list_display = BaseAdmin.list_display + ['name', 'url']
    



@admin.register(models.Skill)
class SkillAdmin(BaseAdmin): 
    
    list_display = BaseAdmin.list_display + ['name', 'start_date']
    



@admin.register(models.Publication)
class PublicationAdmin(BaseAdmin): 
    
    list_display = BaseAdmin.list_display + ['name', 'url', 'published_date']
    


# unregister default group admin:
admin.site.unregister(Group)
admin.site.unregister(User)
