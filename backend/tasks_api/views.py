from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from tasks.models import Task

class ApiOverview(APIView):
    def get(self, request):
        api_urls = {
            'List' : '/task-list',
            'Detail View': '/task-detail/<str:pk>/',
            'Create': '/task-create/',
            'Update': '/task-update/<str:pk>/',
            'Delete': '/task-delete/<str:pk>/',
        }

        return Response(api_urls)
    
class TaskList(APIView):
    def get(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
class TaskDetail(APIView):
    def get(self, request, pk):
        task = Task.objects.get(task_id=pk)
        serializer = TaskSerializer(task, many=False)
        return Response(serializer.data)
    
class TaskCreate(APIView):
    def post(self, request):
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)
    