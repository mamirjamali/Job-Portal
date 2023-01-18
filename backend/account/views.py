from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import SignUpSerializer, UserSerializer
from .models import UserProfile
from .validators import validate_file_extention


# Register users
@api_view(['POST'])
def register(request):
    data = request.data

    user = SignUpSerializer(data=data)

    if user.is_valid():
        if not User.objects.filter(username=data['email']).exists():
            user = User.objects.create(first_name=data['first_name'],
                                       last_name=data['last_name'],
                                       username=data['email'],
                                       email=data['email'],
                                       password=make_password(
                                           data['password']))

            return Response({'message': 'You have successfuly registered'},
                            status=status.HTTP_200_OK)

        else:
            return Response({'error': 'User already exists'})

    else:
        return Response(user.errors)


# Login user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def currentUser(request):
    user = UserSerializer(request.user)

    return Response(user.data)


# Update user
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request):
    user = request.user

    data = request.data

    user.first_name = data['first_name']
    user.last_name = data['last_name']
    user.username = data['username']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


# Upload resume
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def uploadResume(request):

    user = request.user
    resume = request.FILES['resume']

    if resume == '':
        return Response({'error': 'Please upload your resume'},
                        status=status.HTTP_400_BAD_REQUEST)

    isValidFile = validate_file_extention(resume.name)

    if not isValidFile:
        return Response({'error': 'Please upload only PDF file.'},
                        status=status.HTTP_400_BAD_REQUEST)

    user.userprofile.resume = resume
    user.userprofile.save()

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)
