from datetime import datetime, timedelta
from typing import List, Dict, Literal, Optional, TypedDict
from dataclasses import dataclass

# Определение типов
class Order(TypedDict):
    id: str
    date: str
    total: float

class StatusSettings(TypedDict):
    manual: Dict[str, int]
    useAutoCalculation: bool

class ClientStats(TypedDict):
    cold: int
    new: int
    regular: int
    loyal: int
    lost: int

class Client(TypedDict):
    id: str
    status: Literal['cold', 'new', 'regular', 'loyal', 'lost']
    orders: List[Order]
    statusChange: Optional[Literal['upgrade', 'downgrade']]
    averageInterval: float
    daysSinceLastOrder: int
    ordersCount: int

# Константы
INITIAL_STATUS_SETTINGS = {
    "manual": {
        "ordersX": 2,
        "ordersY": 5,
        "ordersZ": 6,
        "intervalA": 30,
        "intervalB": 15,
        "daysC": 60,
    },
    "useAutoCalculation": False
}

AUTO_CALCULATION_REQUIREMENTS = {
    "MIN_REGULAR_CLIENTS": 20,
    "MIN_LOYAL_CLIENTS": 5
}

def calculate_client_stats(clients: List[Client]) -> ClientStats:
    """Вычисляет статистику по статусам клиентов."""
    stats: ClientStats = {
        'cold': 0,
        'new': 0,
        'regular': 0,
        'loyal': 0,
        'lost': 0
    }
    
    for client in clients:
        stats[client['status']] += 1
        
    return stats

def calculate_average_interval(orders: List[Order]) -> float:
    """Вычисляет средний интервал между заказами в днях."""
    if len(orders) <= 1:
        return 0.0
        
    sorted_orders = sorted(orders, key=lambda x: datetime.fromisoformat(x['date']))
    total_interval = 0
    
    for i in range(1, len(sorted_orders)):
        current_date = datetime.fromisoformat(sorted_orders[i]['date'])
        previous_date = datetime.fromisoformat(sorted_orders[i-1]['date'])
        interval = (current_date - previous_date).days
        total_interval += interval
        
    return round(total_interval / (len(sorted_orders) - 1))

def calculate_days_since_last_order(last_order: Optional[str]) -> int:
    """Вычисляет количество дней с последнего заказа."""
    if not last_order:
        return 0
        
    last_order_date = datetime.fromisoformat(last_order)
    current_date = datetime.now()
    return (current_date - last_order_date).days

def validate_status_settings(settings: StatusSettings) -> bool:
    """Проверяет корректность настроек статусов."""
    manual = settings['manual']
    
    return all([
        manual['ordersX'] >= 0,
        manual['ordersY'] >= manual['ordersX'],
        manual['ordersZ'] > manual['ordersY'],
        manual['intervalA'] > 0,
        manual['intervalB'] > 0,
        manual['daysC'] > 0
    ])

def calculate_average_loyal_interval(clients: List[Client]) -> float:
    """Вычисляет средний интервал для лояльных клиентов."""
    loyal_clients = [client for client in clients if client['status'] == 'loyal']
    if not loyal_clients:
        return 0.0
    
    total_interval = sum(client['averageInterval'] for client in loyal_clients)
    return round(total_interval / len(loyal_clients))

def calculate_average_regular_interval(clients: List[Client]) -> float:
    """Вычисляет средний интервал для постоянных клиентов."""
    regular_clients = [client for client in clients if client['status'] == 'regular']
    if not regular_clients:
        return 0.0
    
    total_interval = sum(client['averageInterval'] for client in regular_clients)
    return round(total_interval / len(regular_clients))

def is_auto_calculation_available(client_stats: ClientStats) -> bool:
    """Проверяет доступность автоматического расчета."""
    return (client_stats['regular'] >= AUTO_CALCULATION_REQUIREMENTS['MIN_REGULAR_CLIENTS'] and
            client_stats['loyal'] >= AUTO_CALCULATION_REQUIREMENTS['MIN_LOYAL_CLIENTS'])

def calculate_client_status(
    client: Client,
    settings: StatusSettings,
    average_loyal_interval: float,
    average_regular_interval: float
) -> Literal['cold', 'new', 'regular', 'loyal', 'lost']:
    """Определяет статус клиента на основе настроек и статистики."""
    orders_count = client['ordersCount']
    average_interval = client['averageInterval']
    days_since_last_order = client['daysSinceLastOrder']
    
    if settings['useAutoCalculation']:
        if orders_count == 0:
            return 'cold'
        if orders_count == 1:
            return 'new'
        if orders_count >= 6 and average_interval <= average_loyal_interval:
            return 'loyal'
        
        if days_since_last_order > average_interval + average_loyal_interval:
            return 'regular'
        if days_since_last_order > average_interval + average_regular_interval:
            return 'lost'
        
        return 'regular'
    else:
        manual = settings['manual']
        if orders_count == 0:
            return 'cold'
        if orders_count == 1:
            return 'new'
        if manual['ordersX'] <= orders_count <= manual['ordersY'] and average_interval > manual['intervalA']:
            return 'regular'
        if orders_count >= manual['ordersZ'] and average_interval <= manual['intervalB']:
            return 'loyal'
        if days_since_last_order > manual['daysC']:
            return 'lost'
        return 'regular'

def recalculate_statuses(clients: List[Client], status_settings: StatusSettings) -> List[Client]:
    """Пересчитывает статусы всех клиентов."""
    # Обновляем интервалы для всех клиентов
    clients_with_intervals = []
    for client in clients:
        client_copy = client.copy()
        client_copy['averageInterval'] = calculate_average_interval(client['orders'])
        client_copy['daysSinceLastOrder'] = calculate_days_since_last_order(
            client['orders'][-1]['date'] if client['orders'] else None
        )
        clients_with_intervals.append(client_copy)

    # Вычисляем средние интервалы
    average_loyal_interval = calculate_average_loyal_interval(clients_with_intervals)
    average_regular_interval = calculate_average_regular_interval(clients_with_intervals)
    
    # Обновляем статусы
    updated_clients = []
    for client in clients_with_intervals:
        new_status = calculate_client_status(
            client,
            status_settings,
            average_loyal_interval,
            average_regular_interval
        )
        
        client_copy = client.copy()
        old_status = client_copy['status']
        client_copy['status'] = new_status
        
        # Определяем направление изменения статуса
        if new_status != old_status:
            if (old_status == 'regular' and new_status == 'loyal') or \
               (old_status == 'new' and new_status == 'regular'):
                client_copy['statusChange'] = 'upgrade'
            elif (old_status == 'loyal' and new_status == 'regular') or \
                 (old_status == 'regular' and new_status == 'lost'):
                client_copy['statusChange'] = 'downgrade'
            else:
                client_copy['statusChange'] = None
        
        updated_clients.append(client_copy)
    
    return updated_clients