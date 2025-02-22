import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Types
type Period = 'day' | 'week' | 'month' | 'quarter' | 'year';
type MetricType = 'revenue' | 'averageCheck' | 'orders' | 'clients' | 'conversion';

interface Metric {
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

interface DashboardMetrics {
  revenue: Metric;
  averageCheck: Metric;
  orders: Metric;
  clients: Metric;
  conversion: Metric;
}

// Helper function для метрик
const getMetricInfo = (type: MetricType): { title: string; suffix: string } => {
  switch (type) {
    case 'revenue':
      return { title: 'Выручка', suffix: ' ₸' };
    case 'averageCheck':
      return { title: 'Средний чек', suffix: ' ₸' };
    case 'orders':
      return { title: 'Заказы', suffix: '' };
    case 'clients':
      return { title: 'Клиенты', suffix: '' };
    case 'conversion':
      return { title: 'Конверсия', suffix: '%' };
  }
};

// Generate distribution data
const generateDistributionData = (periodType: Period, metricType: MetricType) => {
  const getBaseValue = () => {
    switch (metricType) {
      case 'revenue': return Math.floor(Math.random() * 1000000) + 500000;
      case 'averageCheck': return Math.floor(Math.random() * 15000) + 8000;
      case 'orders': return Math.floor(Math.random() * 50) + 10;
      case 'clients': return Math.floor(Math.random() * 30) + 5;
      case 'conversion': return Math.floor(Math.random() * 40) + 20;
    }
  };

  // Get current date for calculations
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const getCurrentQuarter = (date: Date): number => {
    return Math.floor(date.getMonth() / 3) + 1;
  };

  const getQuarterStartWeek = (quarter: number): number => {
    return (quarter - 1) * 13 + 1;
  };

  switch (periodType) {
    case 'day':
      return Array.from({ length: 24 }, (_, i) => ({
        name: i % 4 === 0 ? `${i.toString().padStart(2, '0')}:00` : '',
        displayName: `${i.toString().padStart(2, '0')}:00`,
        value: getBaseValue()
      }));
    case 'week':
      return [
        { name: 'Пн', value: getBaseValue() },
        { name: 'Вт', value: getBaseValue() },
        { name: 'Ср', value: getBaseValue() },
        { name: 'Чт', value: getBaseValue() },
        { name: 'Пт', value: getBaseValue() },
        { name: 'Сб', value: getBaseValue() },
        { name: 'Вс', value: getBaseValue() },
      ];
    case 'month':
      // Calculate first day of current month
      const firstDay = new Date(currentYear, currentMonth, 1);
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      
      return Array.from({ length: daysInMonth }, (_, i) => {
        const currentDay = new Date(firstDay);
        currentDay.setDate(i + 1);
        const isSunday = currentDay.getDay() === 0;
        return {
          name: isSunday ? 'Вс' : '', // Показываем только воскресенья на оси
          displayName: (i + 1).toString(), // Полная дата для tooltip
          value: getBaseValue(),
          isSunday
        };
      });
    case 'quarter':
      const currentQuarter = getCurrentQuarter(currentDate);
      const startWeek = getQuarterStartWeek(currentQuarter);
      
      return Array.from({ length: 13 }, (_, i) => {
        const weekNumber = startWeek + i;
        return {
          name: `${weekNumber}`, // Номер недели с начала года
          displayName: `Неделя ${weekNumber}`,
          value: getBaseValue()
        };
      });
    case 'year':
      return [
        { name: 'Янв', value: getBaseValue() },
        { name: 'Фев', value: getBaseValue() },
        { name: 'Мар', value: getBaseValue() },
        { name: 'Апр', value: getBaseValue() },
        { name: 'Май', value: getBaseValue() },
        { name: 'Июн', value: getBaseValue() },
        { name: 'Июл', value: getBaseValue() },
        { name: 'Авг', value: getBaseValue() },
        { name: 'Сен', value: getBaseValue() },
        { name: 'Окт', value: getBaseValue() },
        { name: 'Ноя', value: getBaseValue() },
        { name: 'Дек', value: getBaseValue() },
      ];
  }
};

// Mock data generator
const generateMetrics = (): DashboardMetrics => {
  const randomChange = () => (Math.random() * 20 - 10).toFixed(1);
  const randomTrend = (change: number): 'up' | 'down' | 'neutral' => {
    if (change > 0) return 'up';
    if (change < 0) return 'down';
    return 'neutral';
  };

  const createMetric = (baseValue: number): Metric => {
    const change = Number(randomChange());
    return {
      value: baseValue.toLocaleString(),
      change,
      trend: randomTrend(change)
    };
  };

  return {
    revenue: createMetric(2450000),
    averageCheck: createMetric(12500),
    orders: createMetric(196),
    clients: createMetric(145),
    conversion: createMetric(32),
  };
};

const DashboardSection: React.FC = () => {
  const [period, setPeriod] = useState<Period>('day');
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('orders');
  const [metrics] = useState<DashboardMetrics>(generateMetrics());
  const [distributionData, setDistributionData] = useState(generateDistributionData('day', 'orders'));

  const handlePeriodChange = (newPeriod: Period) => {
    setPeriod(newPeriod);
    setDistributionData(generateDistributionData(newPeriod, selectedMetric));
  };

  const handleMetricChange = (e: React.ChangeEvent<HTMLSelectElement>) => {const newMetric = e.target.value as MetricType;
    setSelectedMetric(newMetric);
    setDistributionData(generateDistributionData(period, newMetric));
  };

  const getPeriodTitle = (p: Period): string => {
    switch (p) {
      case 'day': return 'День';
      case 'week': return 'Неделя';
      case 'month': return 'Месяц';
      case 'quarter': return 'Квартал';
      case 'year': return 'Год';
    }
  };

  const MetricItem: React.FC<{
    type: MetricType;
    metric: Metric;
  }> = ({ type, metric }) => {
    const { title, suffix } = getMetricInfo(type);
    
    return (
      <div className="flex flex-col items-center">
        <h3 className="text-sm font-medium text-[#A7ABAA] mb-1">{title}</h3>
        <div className="flex items-baseline space-x-2">
          <p className="text-lg font-semibold text-[#465357]">
            {metric.value}
            {suffix}
          </p>
          <span className={`text-sm font-medium ${
            metric.trend === 'up' ? 'text-[#245D33]' :
            metric.trend === 'down' ? 'text-[#FF4444]' :
            'text-[#A7ABAA]'
          }`}>
            {metric.change > 0 ? '+' : ''}{metric.change}%
          </span>
        </div>
      </div>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-[#A7ABAA] rounded-lg">
          <p className="text-sm text-[#465357]">{data.displayName || data.name}</p>
          <p className="text-sm font-medium text-[#245D33]">
            {payload[0].value.toLocaleString()}{getMetricInfo(selectedMetric).suffix}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Period Selection */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-center space-x-2">
          {(['day', 'week', 'month', 'quarter', 'year'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => handlePeriodChange(p)}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                period === p
                  ? 'bg-[#245D33]/10 text-[#245D33]'
                  : 'text-[#465357] hover:bg-[#EFF6EF]'
              }`}
            >
              {getPeriodTitle(p)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-medium text-[#465357] mb-6">
          Статистика за {getPeriodTitle(period).toLowerCase()}
        </h2>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {(Object.keys(metrics) as MetricType[]).map((type) => (
            <MetricItem
              key={type}
              type={type}
              metric={metrics[type]}
            />
          ))}
        </div>

        {/* Distribution Chart */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium text-[#465357]">
              Распределение по периодам
            </h3>
            <select
              value={selectedMetric}
              onChange={handleMetricChange}
              className="px-3 py-2 border border-[#A7ABAA] rounded-lg focus:ring-2 focus:ring-[#245D33] focus:border-transparent"
            >
              {(Object.keys(metrics) as MetricType[]).map((type) => (
                <option key={type} value={type}>
                  {getMetricInfo(type).title}
                </option>
              ))}
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#A7ABAA" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#465357' }}
                />
                <YAxis tick={{ fill: '#465357' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  fill="#245D33" 
                  name={getMetricInfo(selectedMetric).title}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;