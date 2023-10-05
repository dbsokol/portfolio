from rest_framework import serializers

from general import models as general_models


###########################
## -- Base Serializer -- ##
###########################

class BaseSerializer(serializers.ModelSerializer):
    
    class Meta:
        fields = ['id']#, 'created_at', 'last_updated_at']



#######################
## -- Serializers -- ##
#######################

class ContactSerializer(BaseSerializer):
    
    class Meta:
        model = general_models.Contact
        fields = BaseSerializer.Meta.fields + ['name', 'value', 'url']
        read_only_fields = fields 
    


class EducationSerializer(BaseSerializer):
    
    class Meta:
        model = general_models.Education
        fields = BaseSerializer.Meta.fields + ['institution', 'degree', 'major', 'start_date', 'end_date']
        read_only_fields = fields             



class ResponsibilitySerializer(BaseSerializer):
    
    class Meta:
        model = general_models.Responsibility
        fields = BaseSerializer.Meta.fields + ['experience', 'details', 'is_deleted']
        read_only_fields = fields     



class ExperienceSerializer(BaseSerializer):
    
    responsibilties = ResponsibilitySerializer(many=True)
    
    class Meta:
        model = general_models.Experience
        fields = BaseSerializer.Meta.fields + ['institution', 'title', 'mission', 'start_date', 'end_date', 'responsibilties']
        read_only_fields = fields      



class ProjectSerializer(BaseSerializer):
    
    class Meta:
        model = general_models.Project
        fields = BaseSerializer.Meta.fields + ['name', 'url']
        read_only_fields = fields       



class SkillSerializer(BaseSerializer):
    
    class Meta:
        model = general_models.Skill
        fields = BaseSerializer.Meta.fields + ['name', 'start_date']
        read_only_fields = fields    



class PublicationSerializer(BaseSerializer):
    
    class Meta:
        model = general_models.Publication
        fields = BaseSerializer.Meta.fields + ['name', 'url', 'published_date']
        read_only_fields = fields   


