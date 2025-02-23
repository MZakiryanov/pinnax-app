# tests/test_views/test_status_settings_view.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from api.models import StatusSettings

class StatusSettingsViewTests(APITestCase):
    def setUp(self):
        self.url = reverse('status-settings')
        self.valid_settings = {
            "manual_settings": {
                "ordersX": 2,
                "ordersY": 5,
                "ordersZ": 6,
                "intervalA": 30,
                "intervalB": 15,
                "daysC": 60
            },
            "use_auto_calculation": False
        }

    def test_get_status_settings_creates_default_if_none_exists(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('manual_settings', response.data)
        self.assertIn('use_auto_calculation', response.data)

    def test_get_status_settings_returns_existing(self):
        StatusSettings.objects.create(**self.valid_settings)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data['manual_settings'],
            self.valid_settings['manual_settings']
        )

    def test_update_status_settings(self):
        response = self.client.post(
            self.url,
            self.valid_settings,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data['manual_settings'],
            self.valid_settings['manual_settings']
        )

    def test_update_status_settings_with_invalid_data(self):
        invalid_settings = {
            "manual_settings": {
                "ordersX": 5,
                "ordersY": 2,  # Invalid: Y < X
                "ordersZ": 6,
                "intervalA": 30,
                "intervalB": 15,
                "daysC": 60
            },
            "use_auto_calculation": False
        }
        response = self.client.post(
            self.url,
            invalid_settings,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)