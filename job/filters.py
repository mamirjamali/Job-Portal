from django_filters import rest_framework as filter
from .models import Job


class JobsFilter(filter.FilterSet):

    keyword = filter.CharFilter(field_name='title', lookup_expr='icontains')
    location = filter.CharFilter(field_name='address', lookup_expr='icontains')
    min_salary = filter.NumberFilter(
        field_name='salary' or 0, lookup_expr='gte')
    max_salary = filter.NumberFilter(
        field_name='salary' or 1000000, lookup_expr='lte')

    class Meta:
        model = Job
        fields = ('location', 'keyword', 'education', 'jobType', 'experience',
                  'min_salary', 'max_salary')
