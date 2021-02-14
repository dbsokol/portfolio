from django.shortcuts import render, HttpResponse

from rest_framework import viewsets

from general import serializers as general_serializers
from general import models as general_models

from pprint import pprint
import weasyprint
import json


def DownloadPDF(request):
    
    htmlstring = json.loads(request.body.decode('utf-8'))
    
    html = weasyprint.HTML(string=htmlstring)
    pdf = html.write_pdf()
    
    print(type(pdf))
    
    with open('/portfolio/temp.pdf', 'wb+') as f: f.write(pdf)
    
    return HttpResponse(pdf, content_type='application/pdf')
    
    

def RenderIndex(request):
    
    context = {
        'status' : 0,
        'success' : True,
        'template_name' : 'general/index.html',
        'title' : 'Engineer',
    }
    
    return render(request, context['template_name'], context=context)



def RenderTest(request):
    
    context = {
        'status' : 0,
        'success' : True,
        'template_name' : 'general/test.html',
        'title' : 'Test',
    }
    
    return render(request, context['template_name'], context=context)



    
    


########################
## -- Base ViewSet -- ##
########################
    
class BaseViewSet(viewsets.ModelViewSet):
    
    def get_queryset(self):
        
        queryset = self.queryset
        custom_filter = self.request.query_params.get('filter')
        custom_exclude = self.request.query_params.get('exclude')
    
        if custom_filter: 
            custom_filter = json.loads(custom_filter)
            queryset = queryset.filter(**custom_filter)
        
        if custom_exclude: 
            custom_exclude = json.loads(custom_exclude)
            queryset = queryset.exclude(**custom_exclude)
        
        pprint(queryset)
        
        return queryset

    http_method_names = ['get']


####################
## -- ViewSets -- ##
####################

class ContactViewSet(BaseViewSet):
    
    queryset = general_models.Contact.objects.all().order_by('-id')
    serializer_class = general_serializers.ContactSerializer
    
    

class EducationViewSet(BaseViewSet):
    
    queryset = general_models.Education.objects.all().order_by('-created_at')
    serializer_class = general_serializers.EducationSerializer



class ExperienceViewSet(BaseViewSet):
    
    queryset = general_models.Experience.objects.all().order_by('-created_at')
    serializer_class = general_serializers.ExperienceSerializer



class ResponsibilityViewSet(BaseViewSet):
    
    queryset = general_models.Responsibility.objects.all().order_by('-created_at')
    serializer_class = general_serializers.ResponsibilitySerializer



class ProjectViewSet(BaseViewSet):
    
    queryset = general_models.Project.objects.all().order_by('-created_at')
    serializer_class = general_serializers.ProjectSerializer



class SkillViewSet(BaseViewSet):
    
    queryset = general_models.Skill.objects.all().order_by('start_date')
    serializer_class = general_serializers.SkillSerializer
