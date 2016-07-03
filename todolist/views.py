from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.template.context_processors import csrf
from todolist.models import Task


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
    elif request.method == 'PUT':
        return JsonResponse({'error': 'false'})

    # Delete task
    elif request.method == 'DELETE':
        return JsonResponse({'error': 'false'})


# /task/completed/{id}
def task_completed(request, id):

    # Mark as completed
    if request.method == 'PUT':

        task = get_object_or_404(Task, id=id)
        task.completed = 1
        task.save()

        return JsonResponse({'error': 'false'})


# /task/importance/{id}
def task_importance(request, id):

    # Set importance
    if request.method == 'PUT':
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
