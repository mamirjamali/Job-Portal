from django.urls import path
from . import views

urlpatterns = [
    path('jobs/', views.getAllJobs, name="jobs"),
    path('jobs/new/', views.newJob, name="new_job"),
    path('jobs/<str:pk>/', views.getJob, name="job"),
    path('jobs/<str:pk>/update/', views.updateJob, name="update_job"),
    path('jobs/<str:pk>/delete/', views.deleteJob, name="delete_job"),
    path('jobs/<str:pk>/apply/', views.applyToJob, name="apply_to_job"),
    path('jobs/<int:pk>/check/', views.isApplied, name="is_applied_to_job"),
    path('job/<int:pk>/candidates/', views.getCandidatesApllied,
         name="get_candidates_applied"),
    path('stats/<str:topic>/', views.getTopicStat, name="get_topic_stats"),
    path('me/jobs/applied/', views.getCurrentUserAppliedJobs,
         name="get_current_user_applied_jobs"),
    path('me/jobs/', views.getCurrentUserCreatedJobs,
         name="get_current_user_created_jobs")
]
