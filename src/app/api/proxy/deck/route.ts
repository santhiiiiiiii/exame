import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    // Captura parâmetros da query
    const count = searchParams.get('count') || '52'; // Número de cartas a serem puxadas

    try {
        // API para puxar as cartas do baralho
        const response = await fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${count}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erro desconhecido');
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao buscar cartas:', error);
        return NextResponse.json({ error: 'Erro ao buscar cartas do baralho.' }, { status: 500 });
    }
}
