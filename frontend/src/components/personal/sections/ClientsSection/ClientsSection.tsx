import React from 'react';
import { useClientData } from './hooks/useClientsData';
import { useClientFilters } from './hooks/useClientFilters';
import { useClientStatus } from './hooks/useClientStatus';
import { TEXT_STYLES, COMPONENT_STYLES } from '@/theme';
import { ClientFilters } from './types';

import Toolbar from './components/Toolbar/Toolbar';
import Table from './components/Table/Table';
import ClientCard from './components/ClientCard/ClientCard';
import StatusSettings from './components/StatusSettings/StatusSettings';
import { mockClients } from './mockData';

const ClientsSection: React.FC = () => {
  const {
    clients,
    selectedClientId,
    selectClient,
    updateClientDiscount,
    exportClientsToCSV
  } = useClientData(mockClients);

  const {
    filters,
    searchQuery,
    showFilters,
    filteredClients,
    updateFilters,
    setSearchQuery,
    toggleFilters
  } = useClientFilters(clients);

  const {
    statusSettings,
    showStatusSettings,
    clientStats,
    autoCalculationRequirements,
    toggleStatusSettings,
    updateStatusSettings,
    loading,
    error,
    isReady
  } = useClientStatus(clients);

  const [showExtended, setShowExtended] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  // Обработчики событий
  const handleClientSelect = (clientId: string) => {
    selectClient(clientId);
  };

  const handleClientCardClose = () => {
    selectClient(null);
  };

  const handleClientDiscountSave = (clientId: string, discount: number) => {
    updateClientDiscount(clientId, discount);
    selectClient(null);
  };

  const handleStatusSettingsSave = async () => {
    try {
      await updateStatusSettings(statusSettings!);
      toggleStatusSettings();
    } catch (error) {
      console.error('Error saving status settings:', error);
    }
  };

  const handleFiltersChange = (newFilters: ClientFilters) => {
    updateFilters(newFilters);
  };

  const handleShowExtendedChange = (show: boolean) => {
    setShowExtended(show);
  };

  // Находим выбранного клиента
  const selectedClient = clients.find(client => client.id === selectedClientId);

  return (
    <div className={`space-y-6 ${TEXT_STYLES.body}`}>
      <Toolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showFilters={showFilters}
        onToggleFilters={toggleFilters}
        onExport={exportClientsToCSV}
        onOpenSettings={toggleStatusSettings}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        showExtended={showExtended}
        onShowExtendedChange={handleShowExtendedChange}
      />
      
      <div className={COMPONENT_STYLES.card.base}>
        <Table
          clients={clients}
          filteredClients={filteredClients}
          showExtended={showExtended}
          onClientSelect={handleClientSelect}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>

      {selectedClient && (
        <ClientCard
          client={selectedClient}
          onClose={handleClientCardClose}
          onSave={handleClientDiscountSave}
        />
      )}

      {showStatusSettings && isReady && statusSettings && (
        <StatusSettings
          isOpen={showStatusSettings}
          onClose={toggleStatusSettings}
          settings={statusSettings}
          onSettingsChange={updateStatusSettings}
          stats={clientStats}
          onSave={handleStatusSettingsSave}
          autoCalculationRequirements={autoCalculationRequirements}
        />
      )}

      {showStatusSettings && loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#245D33]"></div>
          </div>
        </div>
      )}

      {showStatusSettings && error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h3 className={`${TEXT_STYLES.h3} text-center mb-4`}>Ошибка</h3>
            <p className={`${TEXT_STYLES.body} text-center mb-4`}>{error.message}</p>
            <div className="flex justify-center">
              <button
                onClick={() => (window as any).location.reload()}
                className="px-4 py-2 bg-[#245D33] text-white rounded-lg hover:opacity-90"
              >
                Попробовать снова
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsSection;