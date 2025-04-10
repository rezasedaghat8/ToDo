from django.shortcuts import render, redirect
from .models import Task
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from serializers import TaskSerializer
from rest_framework import status

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


# # ----- CRUD operations -----
# @api_view(['POST'])
# def createTask(request):

#     serializer = TaskSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET'])
# def viewTasks(request):


#     tasks = Task.objects.all()

#     serializer = TaskSerializer(tasks, many=True)
    
#     return Response(serializer.data)

# @api_view(['PUT'])
# def updateTask(request, pk):

#     try:
#         task = Task.objects.get(id=pk)
#     except Task.DoesNotExist:
#         return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
    
#     serializer = TaskSerializer(task, data=request.data)

#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
    
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
# @api_view(['DELETE'])
# def deleteTask(request, pk):
    try:
        task = Task.objects.get(id=pk)
    except Task.DoesNotExist:
        return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)

    task.delete()

    return Response({'message': 'Task deleted successfully'}, status=status.HTTP_204_NO_CONTENT)