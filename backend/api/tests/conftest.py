# tests/conftest.py
import pytest
from django.utils import timezone
from api.models import StatusSettings, Client, Order, OrderItem

@pytest.fixture
def status_settings():
    return StatusSettings.objects.create(
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

@pytest.fixture
def sample_client():
    return Client.objects.create(
        id="TEST001",
        status="regular",
        average_interval=15.0,
        days_since_last_order=10,
        orders_count=3
    )

@pytest.fixture
def sample_orders(sample_client):
    orders = []
    dates = [
        timezone.now() - timezone.timedelta(days=x) 
        for x in [30, 15, 0]
    ]
    
    for i, date in enumerate(dates):
        order = Order.objects.create(
            id=f"ORDER00{i+1}",
            client=sample_client,
            date=date,
            total=100.00 * (i + 1)
        )
        orders.append(order)
    
    return orders