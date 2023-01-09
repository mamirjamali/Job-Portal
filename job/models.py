from django.db import models

import os
import geocoder

from datetime import *

from django.contrib.auth.models import User
from django.contrib.gis.db import models as gismodels
from django.contrib.gis.geos import Point

from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here.


class JobType(models.TextChoices):
    Permeanet = 'Permenet'
    Temporary = 'Temporary'
    Intership = 'Intership'


class Education(models.TextChoices):
    Bachelors = 'Bachelors'
    Masters = 'Masters'
    Phd = 'Phd'


class Industry(models.TextChoices):
    Business = 'Business'
    IT = 'Information Technology'
    Banking = 'Banking'
    Education = 'Education/Training'
    Telecommunication = 'Telecommunication'
    Others = 'Others'


class Experience(models.TextChoices):
    No_Experience = 'No Experience'
    ONE_YAER = '1 Year'
    TWO_YAER = '2 Years'
    THREE_YEAR_PLUS = '3 Years above'


def return_date_time():
    now = datetime.now()
    return now + timedelta(days=10)


class Job(models.Model):
    title = models.CharField(max_length=20, null=True)
    description = models.TextField(null=True)
    email = models.EmailField()
    address = models.CharField(max_length=100, null=True)
    jobType = models.CharField(
        max_length=10,
        choices=JobType.choices,
        default=JobType.Permeanet
    )
    education = models.CharField(
        max_length=10,
        choices=Education.choices,
        default=Education.Bachelors
    )
    industry = models.CharField(
        max_length=30,
        choices=Industry.choices,
        default=Industry.Business
    )
    experience = models.CharField(
        max_length=20,
        choices=Experience.choices,
        default=Experience.No_Experience
    )
    salary = models.IntegerField(default=1, validators=[
                                 MinValueValidator(1), MaxValueValidator(1000000)])
    position = models.IntegerField(default=1)
    company = models.CharField(max_length=100, null=True)
    point = gismodels.PointField(default=Point(0.0, 0.0))
    lastdate = models.DateTimeField(default=return_date_time)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    createsAt = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        g = geocoder.mapquest(self.address, key=os.environ.get("GEOCODER_API"))

        print(g)

        lng = g.lng
        lat = g.lat

        self.point = Point(lng, lat)
        super(Job, self).save(*args, **kwargs)
