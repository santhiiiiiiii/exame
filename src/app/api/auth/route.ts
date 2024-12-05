import { NextRequest, NextResponse } from 'next/server';
 
export async function POST(request: NextRequest) {
    const { password } = await request.json();
 
    // Validar senha usando variável de ambiente
    if (!password) {
        return NextResponse.json({ message: 'Senha não fornecida!' }, { status: 400 });
    }
 
    if (password === process.env.SENHA_USUARIO) {
        return NextResponse.json({ message: 'Autenticado com sucesso!' });
    } else {
        return NextResponse.json({ message: 'Senha incorreta!' }, { status: 401 });
    }
}
