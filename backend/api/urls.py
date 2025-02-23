from django.urls import path
from .views import StatusSettingsView, update_client_statuses
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def api_root(request):
    return Response({
        'status': 'API is running',
        'available_endpoints': [
            '/api/status-settings/',
            '/api/clients/update-statuses/'
        ]
    })

urlpatterns = [
    path('', api_root, name='api-root'),
    path(
        'status-settings/',
        StatusSettingsView.as_view(),
        name='status-settings'
    ),
    path(
        'clients/update-statuses/',
        update_client_statuses,
        name='update-client-statuses'
    ),
]