"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [fipeData, setFipeData] = useState(null);
  const [loading, setLoading] = useState(false);

  const vehicleTypes = [
    { value: "cars", label: "Carros" },
    { value: "motorcycles", label: "Motos" },
    { value: "trucks", label: "Caminhões" }
  ];

  const BaseUrl = "https://fipe.parallelum.com.br/api/v2/";

  useEffect(() => {
    if (selectedVehicleType) {
      fetchBrands(selectedVehicleType);
    } else {
      setBrands([]);
      setSelectedBrand("");
      setModels([]);
      setSelectedModel("");
      setYears([]);
      setSelectedYear("");
      setFipeData(null);
    }
  }, [selectedVehicleType]);

  useEffect(() => {
    if (selectedBrand && selectedVehicleType) {
      fetchModels(selectedVehicleType, selectedBrand);
    } else {
      setModels([]);
      setSelectedModel("");
      setYears([]);
      setSelectedYear("");
      setFipeData(null);
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedModel && selectedBrand && selectedVehicleType) {
      fetchYears(selectedVehicleType, selectedBrand, selectedModel);
    } else {
      setYears([]);
      setSelectedYear("");
      setFipeData(null);
    }
  }, [selectedModel]);

  useEffect(() => {
    if (selectedYear && selectedModel && selectedBrand && selectedVehicleType) {
      fetchFipeData(selectedVehicleType, selectedBrand, selectedModel, selectedYear);
    } else {
      setFipeData(null);
    }
  }, [selectedYear]);

  const fetchBrands = async (vehicleType) => {
    setLoading(true);
    try {
      console.log("Buscando marcas para:", vehicleType);
      const response = await fetch(`/api/route?type=${vehicleType}`);
      console.log("Response status:", response.status);
      
      if (response.ok) {
        const brandsData = await response.json();
        console.log("Marcas recebidas:", brandsData);
        console.log("Tipo de dados:", typeof brandsData);
        console.log("É array?", Array.isArray(brandsData));
        console.log("Primeiro item:", brandsData[0]);
        console.log("Estrutura do primeiro item:", Object.keys(brandsData[0] || {}));
        setBrands(brandsData);
        setSelectedBrand("");
      } else {
        console.error("Erro na resposta:", response.statusText);
        const errorData = await response.json();
        console.error("Error details:", errorData);
      }
    } catch (error) {
      console.error("Erro ao buscar marcas:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchModels = async (vehicleType, brandId) => {
    setLoading(true);
    try {
      console.log("Buscando modelos para:", vehicleType, brandId);
      const response = await fetch(`/api/models?type=${vehicleType}&brandId=${brandId}`);
      
      if (response.ok) {
        const modelsData = await response.json();
        console.log("Modelos recebidos:", modelsData);
        setModels(modelsData);
        setSelectedModel("");
      } else {
        console.error("Erro na resposta modelos:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar modelos:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchYears = async (vehicleType, brandId, modelId) => {
    setLoading(true);
    try {
      console.log("Buscando anos para:", vehicleType, brandId, modelId);
      const response = await fetch(`/api/years?type=${vehicleType}&brandId=${brandId}&modelId=${modelId}`);
      
      if (response.ok) {
        const yearsData = await response.json();
        console.log("Anos recebidos:", yearsData);
        setYears(yearsData);
        setSelectedYear("");
      } else {
        console.error("Erro na resposta anos:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar anos:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFipeData = async (vehicleType, brandId, modelId, yearId) => {
    setLoading(true);
    try {
      console.log("Buscando valor FIPE para:", vehicleType, brandId, modelId, yearId);
      const response = await fetch(`/api/fipe?type=${vehicleType}&brandId=${brandId}&modelId=${modelId}&yearId=${yearId}`);
      
      if (response.ok) {
        const fipeInfo = await response.json();
        console.log("Dados FIPE recebidos:", fipeInfo);
        setFipeData(fipeInfo);
      } else {
        console.error("Erro na resposta FIPE:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar valor FIPE:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white font-sans">
      <main className="flex min-h-screen w-full max-w-7xl mx-auto flex-col py-6 px-4 sm:py-8 sm:px-6 md:py-12 md:px-8 lg:py-16 lg:px-12">
        <header className="w-full text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">Consulta Fipe Brasil</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300">Consulta os valores de veículos do Brasil</p>
        </header>

        <div className="w-full max-w-2xl mx-auto sm:max-w-3xl md:max-w-4xl lg:max-w-5xl">
          <form className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-300 mb-2">Selecione o tipo de veículo</label>
            <select 
              id="vehicleType" 
              value={selectedVehicleType}
              onChange={(e) => setSelectedVehicleType(e.target.value)}
              className="mt-1 w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            >
              <option value="">Selecione...</option>
              {vehicleTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-300 mb-2">Selecione a marca</label>
            <select 
              id="brand" 
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              disabled={!selectedVehicleType || loading}
              className="mt-1 w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-700 disabled:cursor-not-allowed"
            >
              <option value="">
                {loading ? "Carregando..." : selectedVehicleType ? "Selecione uma marca..." : "Selecione o tipo primeiro"}
              </option>
              {brands.map((brand, index) => {
                const key = brand.codigo || brand.id || brand.code || index;
                const value = brand.codigo || brand.id || brand.code || index;
                const label = brand.nome || brand.name || brand.label || `Marca ${index + 1}`;
                
                return (
                  <option key={key} value={value}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-300 mb-2">Selecione o modelo</label>
            <select 
              id="model" 
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={!selectedBrand || loading}
              className="mt-1 w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-700 disabled:cursor-not-allowed"
            >
              <option value="">
                {loading ? "Carregando..." : selectedBrand ? "Selecione um modelo..." : "Selecione a marca primeiro"}
              </option>
              {models.map((model, index) => {
                const key = model.codigo || model.id || model.code || index;
                const value = model.codigo || model.id || model.code || index;
                const label = model.nome || model.name || model.label || `Modelo ${index + 1}`;
                
                return (
                  <option key={key} value={value}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-2">Selecione o ano</label>
            <select 
              id="year" 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              disabled={!selectedModel || loading}
              className="mt-1 w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-700 disabled:cursor-not-allowed"
            >
              <option value="">
                {loading ? "Carregando..." : selectedModel ? "Selecione um ano..." : "Selecione o modelo primeiro"}
              </option>
              {years.map((year, index) => {
                const key = year.codigo || year.id || year.code || year.nome || year.year || index;
                const value = year.codigo || year.id || year.code || year.nome || year.year || index;
                const label = year.nome || year.name || year.label || year.year || `Ano ${index + 1}`;
                
                return (
                  <option key={key} value={value}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>

          {selectedVehicleType && selectedBrand && selectedModel && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                <span className="block sm:inline">Tipo: {vehicleTypes.find(t => t.value === selectedVehicleType)?.label}</span>
                <span className="hidden sm:inline"> | </span>
                <span className="block sm:inline">Marca: {brands.find(b => (b.codigo || b.id || b.code) == selectedBrand)?.nome || brands.find(b => (b.codigo || b.id || b.code) == selectedBrand)?.name || `Marca ${selectedBrand}`}</span>
                <span className="hidden sm:inline"> | </span>
                <span className="block sm:inline">Modelo: {models.find(m => (m.codigo || m.id || m.code) == selectedModel)?.nome || models.find(m => (m.codigo || m.id || m.code) == selectedModel)?.name || `Modelo ${selectedModel}`}</span>
                {selectedYear && (
                  <>
                    <span className="hidden sm:inline"> | </span>
                    <span className="block sm:inline">Ano: {years.find(y => (y.codigo || y.id || y.code || y.nome || y.year) == selectedYear)?.nome || years.find(y => (y.codigo || y.id || y.code || y.nome || y.year) == selectedYear)?.year || selectedYear}</span>
                  </>
                )}
              </p>
            </div>
          )}

          {fipeData && (
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl border border-blue-700 shadow-xl">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Valor FIPE</h2>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span className="text-gray-300 text-sm">Veículo:</span>
                  <span className="text-white font-medium text-sm text-right">{fipeData.model || `${brands.find(b => (b.codigo || b.id || b.code) == selectedBrand)?.nome || ''} ${models.find(m => (m.codigo || m.id || m.code) == selectedModel)?.nome || ''}`}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span className="text-gray-300 text-sm">Ano:</span>
                  <span className="text-white font-medium text-sm text-right">{years.find(y => (y.codigo || y.id || y.code || y.nome || y.year) == selectedYear)?.nome || years.find(y => (y.codigo || y.id || y.code || y.nome || y.year) == selectedYear)?.year || selectedYear}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span className="text-gray-300 text-sm">Combustível:</span>
                  <span className="text-white font-medium text-sm text-right">{fipeData.fuel || '-'}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span className="text-gray-300 text-sm">Código FIPE:</span>
                  <span className="text-white font-medium text-sm text-right">{fipeData.codeFipe || '-'}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                  <span className="text-gray-300 text-sm">Referência:</span>
                  <span className="text-white font-medium text-sm text-right">{fipeData.referenceMonth || '-'}</span>
                </div>
                <div className="border-t border-blue-700 pt-3 sm:pt-4 mt-3 sm:mt-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-2 sm:gap-0">
                    <span className="text-lg sm:text-xl text-gray-300">Valor:</span>
                    <span className="text-2xl sm:text-3xl font-bold text-green-400 text-right">
                      {fipeData.price ? `R$ ${parseFloat(fipeData.price.replace('R$', '').replace('.', '').replace(',', '.').trim()).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : fipeData.preco || '-'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          </form>
        </div>
      </main>
    </div>
  );
}
