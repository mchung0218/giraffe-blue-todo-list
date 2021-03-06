from django.conf.urls import url
from . import views


urlpatterns = [
    # Tasks
    url(r'^$', views.list, name='list'),
    url(r'^tasks/$', views.tasks, name='tasks'),
    url(r'^task/(?P<id>\d+)$', views.task, name='task'),
    url(r'^task/completed/(?P<id>\d+)$', views.task_completed,
        name='task_completed'),
    url(r'^task/priority/(?P<id>\d+)$', views.task_priority,
        name='task_priority'),

    # User
    url(r'^user/create$', views.user_create, name='create_user'),
    url(r'^user/auth$', views.user_auth, name='auth_user'),
    url(r'^user/changepass$', views.user_changepass, name='changepass_user'),
    url(r'^user/loggedin$', views.user_loggedin, name='user_loggedin'),
    url(r'^user/logout$', views.user_logout, name='logout'),
]
