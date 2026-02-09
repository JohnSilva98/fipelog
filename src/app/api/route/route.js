import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const vehicleType = searchParams.get('type');

  console.log('API Route: Buscando marcas para tipo:', vehicleType);

  if (!vehicleType) {
    console.log('API Route: Tipo de veículo não fornecido');
    return NextResponse.json({ error: 'É necessário informar o tipo de veículo' }, { status: 400 });
  }

  try {
    const apiUrl = `https://fipe.parallelum.com.br/api/v2/${vehicleType}/brands`;
    console.log('API Route: Chamando URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    console.log('API Route: Status da resposta:', response.status);
    console.log('API Route: Headers da resposta:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('API Route: Erro na resposta:', errorText);
      throw new Error(`Erro ao buscar marcas: ${response.status} ${response.statusText}`);
    }

    const brands = await response.json();
    console.log('API Route: Marcas recebidas:', brands.length, 'itens');
    console.log('API Route: Primeira marca:', brands[0]);
    
    return NextResponse.json(brands);
  } catch (error) {
    console.error('API Route: Erro completo:', error);
    return NextResponse.json({ 
      error: 'Erro ao buscar marcas', 
      details: error.message 
    }, { status: 500 });
  }
}
