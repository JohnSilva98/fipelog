import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const vehicleType = searchParams.get('type');
  const brandId = searchParams.get('brandId');

  console.log('API Models: Buscando modelos para tipo:', vehicleType, 'marca:', brandId);

  if (!vehicleType || !brandId) {
    console.log('API Models: Parâmetros incompletos');
    return NextResponse.json({ error: 'Tipo e marca são necessários' }, { status: 400 });
  }

  try {
    const apiUrl = `https://fipe.parallelum.com.br/api/v2/${vehicleType}/brands/${brandId}/models`;
    console.log('API Models: Chamando URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    console.log('API Models: Status da resposta:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('API Models: Erro na resposta:', errorText);
      throw new Error(`Erro ao buscar modelos: ${response.status} ${response.statusText}`);
    }

    const models = await response.json();
    console.log('API Models: Modelos recebidos:', models.length, 'itens');
    
    return NextResponse.json(models);
  } catch (error) {
    console.error('API Models: Erro completo:', error);
    return NextResponse.json({ 
      error: 'Erro ao buscar modelos', 
      details: error.message 
    }, { status: 500 });
  }
}
