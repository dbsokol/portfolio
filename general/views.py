from django.shortcuts import render, redirect

from rest_framework.pagination import PageNumberPagination
from rest_framework import viewsets

from general import serializers as general_serializers
from general import models as general_models


def RenderIndex(request):
    
    context = {
        'status' : 0,
        'success' : True,
        'template_name' : 'general/index.html',
        'title' : 'Engineer',
    }
    
    return render(request, context['template_name'], context=context)


def Redirect404(request, exception): return redirect('/')
    
    


########################
## -- Base ViewSet -- ##
########################

class BasePagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'size'



class BaseViewSet(viewsets.ModelViewSet):
    
    http_method_names = ['get']
    pagination_class = BasePagination


####################
## -- ViewSets -- ##
####################

class ContactViewSet(BaseViewSet):
    
    queryset = general_models.Contact.objects.filter(is_deleted=False).order_by('-id')
    serializer_class = general_serializers.ContactSerializer
    
    

class EducationViewSet(BaseViewSet):
    
    queryset = general_models.Education.objects.filter(is_deleted=False).order_by('-created_at')
    serializer_class = general_serializers.EducationSerializer



class ExperienceViewSet(BaseViewSet):
    
    queryset = general_models.Experience.objects.filter(is_deleted=False).order_by('-created_at')
    serializer_class = general_serializers.ExperienceSerializer



class ResponsibilityViewSet(BaseViewSet):
    
    queryset = general_models.Responsibility.objects.filter(is_deleted=False).order_by('-created_at')
    serializer_class = general_serializers.ResponsibilitySerializer



class ProjectViewSet(BaseViewSet):
    
    queryset = general_models.Project.objects.filter(is_deleted=False).order_by('-created_at')
    serializer_class = general_serializers.ProjectSerializer



class SkillViewSet(BaseViewSet):
    
    queryset = general_models.Skill.objects.filter(is_deleted=False).order_by('start_date')
    serializer_class = general_serializers.SkillSerializer



class PublicationViewSet(BaseViewSet):
    
    queryset = general_models.Publication.objects.filter(is_deleted=False).order_by('published_date')
    serializer_class = general_serializers.PublicationSerializer