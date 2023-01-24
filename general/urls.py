from django.urls import include, path
from general import views

from rest_framework import routers



router = routers.DefaultRouter()
router.register(r'contact', views.ContactViewSet)
router.register(r'education', views.EducationViewSet)
router.register(r'experiences', views.ExperienceViewSet)
router.register(r'responsibilties', views.ResponsibilityViewSet)
router.register(r'projects', views.ProjectViewSet)
router.register(r'skills', views.SkillViewSet)
router.register(r'publications', views.PublicationViewSet)

urlpatterns = [
    
    # templates:
    path('', views.RenderIndex, name='home'),
    
    # api:
    path('api/', include(router.urls))
]
