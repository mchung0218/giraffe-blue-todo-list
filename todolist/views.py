from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.template.context_processors import csrf
from todolist.models import Task
from .forms import *
import json


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
        try:
            new_task = Task(text=request.POST["text"],
                            priority=request.POST["priority"],
                            completed=0)
            new_task.save()

            task = {"text": request.POST["text"],
                    "priority": request.POST["priority"],
                    "completed": 0,
                    "id": new_task.id}
            return JsonResponse({'error': 'false', 'task': task})
        except Exception as e:
            return JsonResponse({'error': 'true', 'errorMessage': e})

    # Update task
    elif request.method == 'PATCH':
        try:
            task = get_object_or_404(Task, id=id)
            task.text = create_json(request.body)["text"]
            task.save()

            return JsonResponse({'error': 'false'})
        except Exception as e:
            return JsonResponse({'error': 'true', 'errorMessage': e})

    # Delete task
    elif request.method == 'DELETE':
        try:
            task = get_object_or_404(Task, id=id)
            task.delete()

            return JsonResponse({'error': 'false'})
        except Exception as e:
            return JsonResponse({'error': 'true', 'errorMessage': e})


def task_update(request, id):
    try:
        task = get_object_or_404(Task, id=id)
        task.text = request.POST["text"]
        task.save()

        return JsonResponse({'error': 'false'})
    except Exception as e:
        return JsonResponse({'error': 'true', 'errorMessage': e})

def task_delete(request, id):
    try:
        task = get_object_or_404(Task, id=id)
        task.delete()

        return JsonResponse({'error': 'false'})
    except Exception as e:
        return JsonResponse({'error': 'true', 'errorMessage': e})


# /task/completed/{id}
def task_completed(request, id):

    # Mark as completed
    if request.method == 'PATCH':
        try:
            task = get_object_or_404(Task, id=id)
            task.completed = 1
            task.save()

            return JsonResponse({'error': 'false'})
        except Exception as e:
            return JsonResponse({'error': 'true', 'errorMessage': e})


# /task/priority/{id}
def task_priority(request, id):

    # Set priority
    if request.method == 'PATCH':
        try:
            task = get_object_or_404(Task, id=id)
            task.priority = create_json(request.body)["priority"]
            task.save()

            return JsonResponse({'error': 'false'})
        except Exception as e:
            return JsonResponse({'error': 'true', 'errorMessage': e})


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



### Functions ###

# Create a json/dict object from byte string
def create_json(task_info):
    task_info = task_info.decode("utf-8").split("&")

    json_obj = {}
    for info in task_info:
        info_ele = info.split("=")
        json_obj[info_ele[0]] = info_ele[1]

    return json_obj
