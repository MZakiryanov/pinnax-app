# tests/test_views/test_update_client_statuses.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from api.models import StatusSettings, Client

class UpdateClientStatusesTests(APITestCase):
    def setUp(self):
        self.url = reverse('update-client-statuses')
        self.status_settings = StatusSettings.objects.create(
            manual_settings={
                "ordersX": 2,
                "ordersY": 5,
                "ordersZ": 6,
                "intervalA": 30,
                "intervalB": 15,
                "daysC": 60
            },
            use_auto_calculation=False
        )
        self.client_data = {
            "id": "TEST001",
            "status": "regular",
            "orders": [],
            "average_interval": 15,
            "days_since_last_order": 10,
            "orders_count": 3
        }

    def test_update_client_statuses_success(self):
        response = self.client.post(
            self.url,
            [self.client_data],
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], self.client_data['id'])

    def test_update_client_statuses_without_settings(self):
        StatusSettings.objects.all().delete()
        response = self.client.post(
            self.url,
            [self.client_data],
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_client_statuses_with_invalid_data(self):
        invalid_data = [
            {
                "id": "TEST001",
                "status": "invalid_status",  # Invalid status
                "orders": [],
                "average_interval": 15,
                "days_since_last_order": 10,
                "orders_count": 3
            }
        ]
        response = self.client.post(
            self.url,
            invalid_data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)