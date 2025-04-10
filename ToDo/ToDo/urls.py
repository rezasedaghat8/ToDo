from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.contrib import admin
from ToDoApp.views import TaskViewSet

router = DefaultRouter()
router.register(r'todos', TaskViewSet, basename='todo')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('ToDoApp.urls'))
]

