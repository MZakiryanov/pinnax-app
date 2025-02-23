# api/serializers.py
from rest_framework import serializers
from .models import StatusSettings, Client, Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'name', 'quantity', 'price', 'total']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'date', 'total', 'items']

class ClientSerializer(serializers.ModelSerializer):
    orders = OrderSerializer(many=True, read_only=True)

    class Meta:
        model = Client
        fields = [
            'id', 'status', 'status_change', 'orders',
            'average_interval', 'days_since_last_order',
            'orders_count'
        ]

class StatusSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusSettings
        fields = ['manual_settings', 'use_auto_calculation']

class StatusSettingsUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusSettings
        fields = ['manual_settings', 'use_auto_calculation']
        extra_kwargs = {
            'manual_settings': {'required': False},
            'use_auto_calculation': {'required': False}
        }