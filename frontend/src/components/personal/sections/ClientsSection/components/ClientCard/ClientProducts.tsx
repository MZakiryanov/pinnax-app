// src/components/personal/sections/ClientsSection/components/ClientCard/ClientProducts.tsx
import React from 'react';
import { Product } from '../../types';
import { COLORS } from '@/theme/colors';
import { TEXT_STYLES } from '@/theme/typography';

interface ClientProductsProps {
  products: Product[];
}

const ClientProducts: React.FC<ClientProductsProps> = ({ products }) => {
  // Вычисление общей суммы
  const totalSum = products.reduce((sum, product) => {
    const price = parseFloat(product.total.replace(/[^\d.-]/g, ''));
    return sum + price;
  }, 0);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[#A7ABAA]/20">
        <thead className={`bg-[${COLORS.background}]`}>
          <tr>
            <th className={`px-6 py-3 text-left ${TEXT_STYLES.tiny} text-[${COLORS.secondary}] uppercase tracking-wider`}>
              ID
            </th>
            <th className={`px-6 py-3 text-left ${TEXT_STYLES.tiny} text-[${COLORS.secondary}] uppercase tracking-wider`}>
              Наименование
            </th>
            <th className={`px-6 py-3 text-left ${TEXT_STYLES.tiny} text-[${COLORS.secondary}] uppercase tracking-wider`}>
              Количество
            </th>
            <th className={`px-6 py-3 text-left ${TEXT_STYLES.tiny} text-[${COLORS.secondary}] uppercase tracking-wider`}>
              Цена
            </th>
            <th className={`px-6 py-3 text-left ${TEXT_STYLES.tiny} text-[${COLORS.secondary}] uppercase tracking-wider`}>
              Сумма
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[#A7ABAA]/20">
          {products.map((product) => (
            <tr key={product.id} className={`hover:bg-[${COLORS.background}]`}>
              <td className={`px-6 py-4 whitespace-nowrap ${TEXT_STYLES.small} text-[${COLORS.text}]`}>
                {product.id}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap ${TEXT_STYLES.small} text-[${COLORS.text}]`}>
                {product.name}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap ${TEXT_STYLES.small} text-[${COLORS.text}]`}>
                {product.quantity}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap ${TEXT_STYLES.small} text-[${COLORS.text}]`}>
                {product.price}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap ${TEXT_STYLES.small} text-[${COLORS.text}]`}>
                {product.total}
              </td>
            </tr>
          ))}
          {/* Итоговая строка */}
          <tr className={`bg-[${COLORS.background}]`}>
            <td 
              colSpan={4} 
              className={`px-6 py-4 whitespace-nowrap ${TEXT_STYLES.small} text-[${COLORS.text}] text-right font-medium`}
            >
              Итого:
            </td>
            <td className={`px-6 py-4 whitespace-nowrap ${TEXT_STYLES.small} text-[${COLORS.text}] font-medium`}>
              {`${totalSum.toLocaleString()} ₸`}
            </td>
          </tr>
        </tbody>
      </table>

      {products.length === 0 && (
        <div className={`text-center py-8 text-[${COLORS.secondary}]`}>
          У клиента пока нет покупок
        </div>
      )}
    </div>
  );
};

export default ClientProducts;