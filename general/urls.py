from django.urls import include, path
from general import views

from rest_framework import routers



router = routers.DefaultRouter()
router.register(r'education', views.EducationViewSet)
router.register(r'experiences', views.ExperienceViewSet)
router.register(r'responsibilties', views.ResponsibilityViewSet)
router.register(r'projects', views.ProjectViewSet)

urlpatterns = [
    path('test', views.RenderTest, name='test'),
    
    # api:
    path('api/', include(router.urls))
]
