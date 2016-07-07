from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.template.context_processors import csrf
from todolist.models import Task
from .forms import *


# FOR TESTING ONLY
def testUpdate(request):
    form = testUpdateForm()
    return render(request, 'todolist/testUpdateTask.html', {'form':form})

def testDelete(request):
    form = testDeleteForm()
    return render(request, 'todolist/testDeleteTask.html', {'form':form})


# /
def list(request):
    c = {}
    c.update(csrf(request))

    return render(request, 'todolist/index.html', c)


# /task/{id}
def task(request, id):

    # Add task
    if request.method == 'POST':
        print(request.POST)

        new_task = Task(text=request.POST["text"],
                        priority=request.POST["priority"],
                        completed=0)
        new_task.save()

        return JsonResponse({'error': 'false'})

    # Update task
    elif request.method == 'PATCH':
        return task_update(request, id)

    # Delete task
    elif request.method == 'DELETE':
        return task_delete(request, id)


def task_update(request, id):
    try:
        task = get_object_or_404(Task, id=id)
        task.text = request.POST["text"]
        task.save()
        return JsonResponse({'error': 'false'})
    except:
        return JsonResponse({'error': 'true'})	

def task_delete(request, id):
    try:
        task = get_object_or_404(Task, id=id)
        task.delete()
        return JsonResponse({'error': 'false'})
    except:
        return JsonResponse({'error': 'true'})

# /task/completed/{id}
def task_completed(request, id):

    # Mark as completed
    if request.method == 'PATCH':

        task = get_object_or_404(Task, id=id)
        task.completed = 1
        task.save()

        return JsonResponse({'error': 'false'})


# /task/priority/{id}
def task_priority(request, id):

    # Set priority
    if request.method == 'PATCH':

        task = get_object_or_404(Task, id=id)
        task.priority = request.body.decode("utf-8").split("=")[0]
        task.save()

        return JsonResponse({'error': 'false'})


# /tasks
def tasks(request):

    # Get all tasks
    if request.method == 'GET':
        tasks = Task.objects.all()
        tasks_json = {"tasks": []}
        for task in tasks:
            task_json = {"text": task.text, "priority": task.priority,
                         "completed": task.completed, "id": task.id}
            tasks_json["tasks"].append(task_json)

        return JsonResponse(tasks_json)
