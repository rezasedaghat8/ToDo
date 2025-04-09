from django.shortcuts import render, redirect
from .models import Task
from .forms import TaskForm

def home (request):
    return render(request, 'index.html')

# ----- CRUD operations -----
def createTask(request):
    form = TaskForm()

    if request.method == 'POST':
        form = TaskForm(request.POST)

        if form.is_valid():
            form.save()

            return redirect('view-tasks')
    
    context = {'form':form}

    return render(request, 'create-task.html', context=context)

def viewTasks(request):

    queryDataAll = Task.objects.all()

    context = {'tasks' : queryDataAll}

    return render(request, 'view-tasks.html', context=context)

def updateTask(request, pk):
    
    task = Task.objects.get(id=pk)

    form = TaskForm(instance=task)

    if request.method == 'POST':
        form = TaskForm(request.POST, instance=task)

        if form.is_valid():
            form.save()

            return redirect('view-tasks')
    
    context = {'form' : form}

    return render(request, 'update-task.html', context=context)

def deleteTask(request, pk):

    task = Task.objects.get(id=pk)

    if request.method =='POST':

        task.delete()

        return redirect('view-tasks')

    context = {'object' : task.title}
    return render(request, 'delete-task.html', context=context)