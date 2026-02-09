import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const vehicleType = searchParams.get('type');
  const brandId = searchParams.get('brandId');
  const modelId = searchParams.get('modelId');

  console.log('API Years: Buscando anos para tipo:', vehicleType, 'marca:', brandId, 'modelo:', modelId);

  if (!vehicleType || !brandId || !modelId) {
    console.log('API Years: Parâmetros incompletos');
    return NextResponse.json({ error: 'Tipo, marca e modelo são necessários' }, { status: 400 });
  }

  try {
    const apiUrl = `https://fipe.parallelum.com.br/api/v2/${vehicleType}/brands/${brandId}/models/${modelId}/years`;
    console.log('API Years: Chamando URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    console.log('API Years: Status da resposta:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('API Years: Erro na resposta:', errorText);
      throw new Error(`Erro ao buscar anos: ${response.status} ${response.statusText}`);
    }

    const years = await response.json();
    console.log('API Years: Anos recebidos:', years.length, 'itens');
    
    return NextResponse.json(years);
  } catch (error) {
    console.error('API Years: Erro completo:', error);
    return NextResponse.json({ 
      error: 'Erro ao buscar anos', 
      details: error.message 
    }, { status: 500 });
  }
}
