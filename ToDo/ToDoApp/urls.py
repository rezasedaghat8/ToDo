from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    
    # CRUD operations
    path('create-task', views.createTask, name='create-task'),
    path('view-tasks', views.viewTasks, name='view-tasks'),
    path('update-task/<str:pk>/', views.updateTask, name='update-task'),
    path('delete-task/<str:pk>/', views.deleteTask, name='delete-task'),

]