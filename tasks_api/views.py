from rest_framework import status

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
        try:
            task = Task.objects.get(task_id=pk)
            serializer = TaskSerializer(task, many=False)
            return Response(serializer.data)
        except Task.DoesNotExist:
            return Response({'error': 'Task not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TaskCreate(APIView):
    def post(self, request):
        serializer = TaskSerializer(data=request.data)

        try:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TaskUpdate(APIView):
    def post(self, request, pk):
        try:
            task = Task.objects.get(task_id=pk)
            serializer = TaskSerializer(instance=task, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Task.DoesNotExist:
            return Response({'error': 'Task not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TaskDelete(APIView):
    def delete(self, request, pk):
        try:
            task = Task.objects.get(task_id=pk)
            task.delete()
            return Response('Item succsesfully delete!')
        except Task.DoesNotExist:
            return Response({'error': 'Task not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)