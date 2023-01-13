from rest_framework import serializers
from .models import Job, CandidatesApplied


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'


class CandidatesAppliedSerializere(serializers.ModelSerializer):

    job = JobSerializer()

    class Meta:
        model = CandidatesApplied
        fields = ('user', 'resume', 'appliedAt', 'job')
