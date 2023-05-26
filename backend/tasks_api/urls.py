from django.urls import path
from .views import *

urlpatterns = [
    path('', ApiOverview.as_view(), name="api_overview"),
    path('task-list/', TaskList.as_view(), name="task_list"),
]
