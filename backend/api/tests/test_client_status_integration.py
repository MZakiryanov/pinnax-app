from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
import json
from datetime import datetime, timedelta

from api.services.client_status_calculator import (
    calculate_client_status,
    recalculate_statuses,
    INITIAL_STATUS_SETTINGS
)
from api.models import Client as ClientModel
from api.serializers import ClientSerializer

class TestClientStatusIntegration(TestCase):
    def setUp(self):
        """Настройка тестового окружения"""
        self.client = Client()
        self.frontend_url = "https://mzakiryanov.github.io/pinnax-app"
        
        # Тестовые данные клиента
        self.test_client_data = {
            "id": "test123",
            "status": "new",
            "orders": [
                {
                    "id": "order1",
                    "date": (datetime.now() - timedelta(days=30)).isoformat(),
                    "total": 100.0
                },
                {
                    "id": "order2",
                    "date": datetime.now().isoformat(),
                    "total": 150.0
                }
            ],
            "statusChange": None,
            "averageInterval": 30.0,
            "daysSinceLastOrder": 0,
            "ordersCount": 2
        }

    def test_status_settings_endpoints(self):
        """Тест эндпоинтов настроек статуса"""
        # Тест GET запроса настроек
        response = self.client.get(reverse('status-settings'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('manual', response.json())
        self.assertIn('useAutoCalculation', response.json())

        # Тест POST запроса настроек
        new_settings = INITIAL_STATUS_SETTINGS.copy()
        new_settings['manual']['ordersX'] = 3
        response = self.client.post(
            reverse('status-settings'),
            data=json.dumps(new_settings),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['manual']['ordersX'], 3)

    def test_client_status_calculation(self):
        """Тест расчёта статуса клиента"""
        response = self.client.post(
            reverse('recalculate-statuses'),
            data=json.dumps({'clients': [self.test_client_data]}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        updated_clients = response.json()
        self.assertGreater(len(updated_clients), 0)

    def test_data_integrity(self):
        """Тест целостности данных между фронтендом и бэкендом"""
        # Получение текущих настроек
        response = self.client.get(reverse('status-settings'))
        initial_settings = response.json()

        # Тестовые настройки
        test_settings = {
            'manual': {
                'ordersX': 4,
                'ordersY': 8,
                'ordersZ': 12,
                'intervalA': 25,
                'intervalB': 15,
                'daysC': 60
            },
            'useAutoCalculation': False
        }

        # Обновление настроек
        response = self.client.post(
            reverse('status-settings'),
            data=json.dumps(test_settings),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Проверка обновления
        response = self.client.get(reverse('status-settings'))
        updated_settings = response.json()
        self.assertEqual(updated_settings['manual']['ordersX'], 4)

    def test_error_handling(self):
        """Тест обработки ошибок"""
        # Тест невалидных настроек
        invalid_settings = {
            'manual': {
                'ordersX': -1  # Невалидное значение
            },
            'useAutoCalculation': False
        }

        response = self.client.post(
            reverse('status-settings'),
            data=json.dumps(invalid_settings),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_status_recalculation_trigger(self):
        """Тест триггера пересчёта статуса с фронтенда"""
        # Создание тестового клиента
        client_obj = ClientModel.objects.create(**self.test_client_data)
        
        # Триггер пересчёта
        response = self.client.post(
            reverse('recalculate-statuses'),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Проверка обновления клиента
        updated_clients = response.json()
        test_client = next(
            (c for c in updated_clients if c['id'] == self.test_client_data['id']),
            None
        )
        self.assertIsNotNone(test_client)
        self.assertIn('status', test_client)

    def test_frontend_api_compatibility(self):
        """Тест совместимости API с фронтендом"""
        # Тест формата данных для фронтенда
        response = self.client.get(reverse('status-settings'))
        settings_data = response.json()
        
        # Проверка наличия всех необходимых полей для фронтенда
        required_fields = ['manual', 'useAutoCalculation']
        for field in required_fields:
            self.assertIn(field, settings_data)
            
        # Проверка формата данных в manual
        manual_fields = ['ordersX', 'ordersY', 'ordersZ', 'intervalA', 'intervalB', 'daysC']
        for field in manual_fields:
            self.assertIn(field, settings_data['manual'])
            self.assertIsInstance(settings_data['manual'][field], int)