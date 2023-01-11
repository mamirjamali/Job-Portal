from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import SignUpSerializer, UserSerializer


# Register users
@api_view(['POST'])
def register(request):
    data = request.data

    user = SignUpSerializer(data=data)

    if user.is_valid():
        if not User.objects.filter(username=data['email']).exists():
            user = User.objects.create(
                first_name=data['first_name'],
                last_name=data['last_name'],
                username=data['email'],
                email=data['email'],
                password=make_password(data['password'])
            )

            return Response(
                {'message': 'You have successfuly registered'},
                status=status.HTTP_200_OK
            )

        else:
            return Response(
                {'error': 'User already exists'}
            )

    else:
        return Response(user.errors)


# Login user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def currentUser(request):
    user = UserSerializer(request.user)

    return Response(user.data)
