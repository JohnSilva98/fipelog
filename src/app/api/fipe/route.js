import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const vehicleType = searchParams.get('type');
  const brandId = searchParams.get('brandId');
  const modelId = searchParams.get('modelId');
  const yearId = searchParams.get('yearId');

  console.log('API FIPE: Buscando valor FIPE para tipo:', vehicleType, 'marca:', brandId, 'modelo:', modelId, 'ano:', yearId);

  if (!vehicleType || !brandId || !modelId || !yearId) {
    console.log('API FIPE: Parâmetros incompletos');
    return NextResponse.json({ error: 'Todos os parâmetros são necessários' }, { status: 400 });
  }

  try {
    const apiUrl = `https://fipe.parallelum.com.br/api/v2/${vehicleType}/brands/${brandId}/models/${modelId}/years/${yearId}`;
    console.log('API FIPE: Chamando URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    console.log('API FIPE: Status da resposta:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('API FIPE: Erro na resposta:', errorText);
      throw new Error(`Erro ao buscar valor FIPE: ${response.status} ${response.statusText}`);
    }

    const fipeData = await response.json();
    console.log('API FIPE: Dados FIPE recebidos:', fipeData);
    
    return NextResponse.json(fipeData);
  } catch (error) {
    console.error('API FIPE: Erro completo:', error);
    return NextResponse.json({ 
      error: 'Erro ao buscar valor FIPE', 
      details: error.message 
    }, { status: 500 });
  }
}
