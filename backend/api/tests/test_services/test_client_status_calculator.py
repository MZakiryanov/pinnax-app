# tests/test_services/test_client_status_calculator.py
import pytest
from datetime import datetime, timedelta
from api.services.client_status_calculator import (
    calculate_client_stats,
    calculate_average_interval,
    calculate_days_since_last_order,
    validate_status_settings,
    calculate_client_status,
    recalculate_statuses,
    calculate_average_loyal_interval,
    calculate_average_regular_interval,
    is_auto_calculation_available
)

def test_calculate_client_stats():
    clients = [
        {"id": "1", "status": "cold"},
        {"id": "2", "status": "new"},
        {"id": "3", "status": "regular"},
        {"id": "4", "status": "loyal"},
        {"id": "5", "status": "lost"},
        {"id": "6", "status": "regular"}
    ]
    
    stats = calculate_client_stats(clients)
    assert stats["cold"] == 1
    assert stats["new"] == 1
    assert stats["regular"] == 2
    assert stats["loyal"] == 1
    assert stats["lost"] == 1

def test_calculate_average_interval(sample_orders):
    average = calculate_average_interval(sample_orders)
    assert average == 15  # (30 + 15) / 2 = 15 days average

def test_calculate_days_since_last_order():
    current_date = datetime.now()
    last_order_date = (current_date - timedelta(days=5)).isoformat()
    days = calculate_days_since_last_order(last_order_date)
    assert days == 5

def test_validate_status_settings():
    valid_settings = {
        "manual": {
            "ordersX": 2,
            "ordersY": 5,
            "ordersZ": 6,
            "intervalA": 30,
            "intervalB": 15,
            "daysC": 60
        },
        "useAutoCalculation": False
    }
    assert validate_status_settings(valid_settings) is True

    invalid_settings = {
        "manual": {
            "ordersX": 5,
            "ordersY": 2,  # Invalid: Y < X
            "ordersZ": 6,
            "intervalA": 30,
            "intervalB": 15,
            "daysC": 60
        },
        "useAutoCalculation": False
    }
    assert validate_status_settings(invalid_settings) is False

def test_calculate_client_status():
    client = {
        "id": "1",
        "status": "regular",
        "orders": [],
        "statusChange": None,
        "averageInterval": 15,
        "daysSinceLastOrder": 10,
        "ordersCount": 3
    }
    
    settings = {
        "manual": {
            "ordersX": 2,
            "ordersY": 5,
            "ordersZ": 6,
            "intervalA": 30,
            "intervalB": 15,
            "daysC": 60
        },
        "useAutoCalculation": False
    }
    
    status = calculate_client_status(
        client,
        settings,
        average_loyal_interval=20,
        average_regular_interval=30
    )
    assert status == "regular"