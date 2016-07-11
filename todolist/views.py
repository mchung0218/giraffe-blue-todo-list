from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.template.context_processors import csrf
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib import auth
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
@login_required
def task(request, id):

    # Add task
    if request.method == 'POST':
        try:
            new_task = Task(owner=request.user,
                            text=request.POST["text"],
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

            if task.owner == request.user:
                body_unicode = request.body.decode('utf-8')
                body = json.loads(body_unicode)
                task.text = body["text"]
                task.save()
                return JsonResponse({'error': 'false'})
            else:
                return JsonResponse({'error': 'true', 'errorMessage': 'Permission Denied'})

        except Exception as e:
            return JsonResponse({'error': 'true', 'errorMessage': e})

    # Delete task
    elif request.method == 'DELETE':
        try:
            task = get_object_or_404(Task, id=id)

            if task.owner == request.user:
                task.delete()
                return JsonResponse({'error': 'false'})
            else:
                return JsonResponse({'error': 'true', 'errorMessage': 'Permission Denied'})

        except Exception as e:
            return JsonResponse({'error': 'true', 'errorMessage': e})


# /task/completed/{id}
@login_required
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
@login_required
def task_priority(request, id):

    # Set priority
    if request.method == 'PATCH':
        try:
            task = get_object_or_404(Task, owner=request.user, id=id)

            if task.completed:
                task.completed = 0

            task.priority = json.loads(request.body.decode("utf-8"))["priority"]
            task.save()

            return JsonResponse({'error': 'false'})
        except Exception as e:
            return JsonResponse({'error': 'true', 'errorMessage': e})


# /tasks
@login_required
def tasks(request):

    # Get all tasks
    if request.method == 'GET':
        tasks = Task.objects.filter(owner=request.user).order_by("id")
        tasks_json = {"tasks": []}
        for task in tasks:
            task_json = {"text": task.text, "priority": task.priority,
                         "completed": task.completed, "id": task.id}
            tasks_json["tasks"].append(task_json)

        return JsonResponse(tasks_json)


# /user/create
def user_create(request):
    if request.method == 'POST':
        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            username = body["email"]
            password = body["password"]
            user = User.objects.create_user(username, username, password)

            return JsonResponse({'error': 'false'})
        except Exception as e:
            #return JsonResponse({'error': 'true', 'errorMessage': e})
            return(request.POST)
        else:
            return JsonResponse({'error': 'true', 'errorMessage': 'Expected POST request. Recieved method: ' + request.method })


# /user/auth
def user_auth(request):
    username = request.POST["email"]
    password = request.POST["password"]
    user = auth.authenticate(username=username, password=password)

    if user is not None:
        auth.login(request, user)
        return JsonResponse({'login': 'true' })
    else:
        return JsonResponse({'error': 'true',
                            'errorMessage': 'Email or Password is incorrect',
                            'login': 'false'})

# /user/logout
@login_required
def user_logout(request):
    try:
        auth.logout(request)
        return JsonResponse({'error': 'false'})
    except Exception as e:
        return JsonResponse({'error': 'true',
                            'errorMessage': 'Could not logout: ' + e})


# /user/loggedin
def user_loggedin(request):
    if request.user.is_authenticated():
        return JsonResponse({'login': 'true', 'username': request.user.username })
    else:
        return JsonResponse({'login': 'false' })


# /user/changepass
def user_changepass(request):
    try:
        user = User.objects.get(username=request.POST["username"])
    except:
        return JsonResponse({'error': 'true',
                             'errorMessage': 'User not found'})
    if user is not None:
        user.set_password(request.POST["new_password"])
        user.save()

        return JsonResponse({'error': 'false'})
    else:
        return JsonResponse({'error': 'true',
                             'errorMessage': 'User not found'})
