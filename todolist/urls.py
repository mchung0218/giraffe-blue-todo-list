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
    url(r'^task/update/(?P<id>\d+)$', views.task_update,
        name='task_update'),
    url(r'^task/delete/(?P<id>\d+)$', views.task_delete,
        name='task_delete'),
    url(r'^task/test/Update$', views.testUpdate, name='testUpdate'), #test URL
    url(r'^task/test/Delete$', views.testDelete, name='testDelete'), #test URL
]
