from django.urls import path
from .views import *

urlpatterns = [
    path('', ApiOverview.as_view(), name="api_overview"),
    path('task-list/', TaskList.as_view(), name="task_list"),
    path('task-detail/<str:pk>/', TaskDetail.as_view(), name="task_detail"),
    path('task-create/', TaskCreate.as_view(), name="task_create"),
    path('task-update/<str:pk>/', TaskUpdate.as_view(), name="task_update"),
    path('task-delete/<str:pk>/', TaskDelete.as_view(), name="task_delete"),
]
