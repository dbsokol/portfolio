from django.contrib.auth.models import Group, User
from django.contrib import admin

from general import models



class BaseAdmin(admin.ModelAdmin):
    
    list_display = ['id', 'created_at', 'last_updated_at']



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
    
    


# unregister default group admin:
admin.site.unregister(Group)
admin.site.unregister(User)
