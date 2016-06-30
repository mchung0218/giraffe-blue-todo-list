from django.shortcuts import render
from django.http import JsonResponse
from django.template.context_processors import csrf


# /
def list(request):
    c = {}
    c.update(csrf(request))

    return render(request, 'todolist/list.html', c)


# /task/{id}
def task(request, id):

    # Add task
    if request.method == 'POST':
        return JsonResponse({'errorExists': 'false'})

    # Update task
    elif request.method == 'PUT':
        return JsonResponse({'errorExists': 'false'})

    # Delete task
    elif request.method == 'DELETE':
        return JsonResponse({'errorExists': 'false'})


# /task/completed/{id}
def task_completed(request, id):

    # Mark as completed
    if request.method == 'PUT':
        return JsonResponse({'errorExists': 'false'})


# /task/importance/{id}
def task_importance(request, id):

    # Set importance
    if request.method == 'PUT':
        return JsonResponse({'errorExists': 'false'})


# /tasks
def tasks(request):

    # Get all tasks
    if request.method == 'GET':
        tasks = {'tasks':[{'method': 'Get'}]}
        return JsonResponse(tasks)
