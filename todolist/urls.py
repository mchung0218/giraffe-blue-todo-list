from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^$', views.list, name='list'),
    url(r'^tasks/$', views.tasks, name='tasks'),
    url(r'^task/(?P<id>\d+)$', views.task, name='task'),
    url(r'^task/completed/(?P<id>\d+)$', views.task_completed,
        name='task_completed'),
    url(r'^task/priority/(?P<id>\d+)$', views.task_priority,
        name='task_priority'),
]
