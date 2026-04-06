/**
 * Mock Data Loader
 * Loads data from separate JSON files for each "sheet"
 */

const MockData = (() => {
  let data = {
    stockData: [],
    movimientos: [],
    alertasData: [],
    bobinasData: [],
    consumoFibraHistory: [],
    tecnicosData: [],
    equiposData: [],
    kpisData: [],
  };

  /**
   * Load all JSON data files
   * @returns {Promise<Object>} Merged data object
   */
  const loadData = async () => {
    try {
      const [stock, movimientos, alertas, bobinas, consumo, tecnicos, equipos, kpis] =
        await Promise.all([
          fetch('js/db/stock.json').then(r => r.json()),
          fetch('js/db/movimientos.json').then(r => r.json()),
          fetch('js/db/alertas.json').then(r => r.json()),
          fetch('js/db/bobinas.json').then(r => r.json()),
          fetch('js/db/consumo-fibra.json').then(r => r.json()),
          fetch('js/db/tecnicos.json').then(r => r.json()),
          fetch('js/db/equipos.json').then(r => r.json()),
          fetch('js/db/kpis.json').then(r => r.json()),
        ]);

      // Merge into single object with same structure as before
      data = {
        stockData: stock.stockData || [],
        movimientos: movimientos.movimientos || [],
        alertasData: alertas.alertasData || [],
        bobinasData: bobinas.bobinasData || [],
        consumoFibraHistory: consumo.consumoFibraHistory || [],
        tecnicosData: tecnicos.tecnicosData || [],
        equiposData: equipos.equiposData || [],
        kpisData: kpis.kpisData || [],
      };

      console.log('✅ Data loaded successfully:', data);
      return data;
    } catch (error) {
      console.error('❌ Failed to load data:', error);
      return null;
    }
  };

  // Auto-load data when DOM is ready
  const autoLoad = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadData);
    } else {
      loadData();
    }
  };

  return {
    loadData,
    autoLoad,
    getData: () => data,
    // Getters for backward compatibility
    get stockData() { return data.stockData || []; },
    get movimientos() { return data.movimientos || []; },
    get alertasData() { return data.alertasData || []; },
    get bobinasData() { return data.bobinasData || []; },
    get consumoFibraHistory() { return data.consumoFibraHistory || []; },
    get tecnicosData() { return data.tecnicosData || []; },
    get equiposData() { return data.equiposData || []; },
    get kpisData() { return data.kpisData || []; },
  };
})();

// Auto-load data on script execution
MockData.autoLoad();
