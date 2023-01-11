from django.shortcuts import render, get_object_or_404
from django.db.models import Avg, Max, Min, Count

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

from .serializers import JobSerializer
from .models import Job
from .filters import JobsFilter


# Get job list
@api_view(['GET'])
def getAllJobs(request):

    filterset = JobsFilter(
        request.GET, queryset=Job.objects.all().order_by('id'))
    count = filterset.qs.count()

    # Pagination
    perPage = 2
    paginator = PageNumberPagination()
    paginator.page_size = perPage

    queryset = paginator.paginate_queryset(filterset.qs, request)

    serializer = JobSerializer(queryset, many=True)
    return Response({
        'count': count,
        'perPage': perPage,
        'jobs': serializer.data
    })


# Get job by id
@api_view(['GET'])
def getJob(request, pk):
    job = get_object_or_404(Job, id=pk)

    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)


# Post new job
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def newJob(request):

    request.data['user'] = request.user
    data = request.data

    job = Job.objects.create(**data)

    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)


# Update job by id
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateJob(request, pk):

    job = get_object_or_404(Job, id=pk)

    if job.user != request.user:
        return Response(
            {'message': 'You are not allowed to update this job'},
            status=status.HTTP_403_FORBIDDEN
        )

    job.title = request.data['title']
    job.description = request.data['description']
    job.email = request.data['email']
    job.address = request.data['address']
    job.jobType = request.data['jobType']
    job.education = request.data['education']
    job.industry = request.data['industry']
    job.experience = request.data['experience']
    job.salary = request.data['salary']
    job.position = request.data['position']
    job.company = request.data['company']

    job.save()

    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)


# Delete job by id
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteJob(request, pk):
    job = get_object_or_404(Job, id=pk)

    if job.user != request.user:
        return Response(
            {'message': 'You are not allowed to update this job'},
            status=status.HTTP_403_FORBIDDEN
        )

    job.delete()
    return Response({'message: Item deleted'}, status=status.HTTP_200_OK)


# Search Topic
@api_view(['GET'])
def getTopicStat(request, topic):

    args = {'title__icontains': topic}
    jobs = Job.objects.filter(**args)

    if len(jobs) == 0:
        return Response({'message': 'No stats founded for {topic}'.format(topic=topic)})

    stats = jobs.aggregate(
        total_jobs=Count('title'),
        avg_position=Avg('position'),
        avg_salary=Avg('salary'),
        min_salary=Min('salary'),
        max_salary=Max('salary')
    )

    return Response(stats)
