'use client';
 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
 
const Login = () => {
    const [username, setUsername] = useState(''); // Estado para o usuário
    const [password, setPassword] = useState(''); // Estado para a senha
    const [error, setError] = useState('');
    const router = useRouter();
 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
 
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
 
            if (!response.ok) {
                const data = await response.json();
                setError(data.message);
                return;
            }
 
            // Salvar estado de login no localStorage
            localStorage.setItem('isLoggedIn', 'true');
 
            // Redirecionar para a área logada
            router.push('/dashboard');
        } catch (error) {
            console.error('Erro no login:', error);
            setError('Erro no servidor.');
        }
    };
 
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Login</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    placeholder="Digite seu usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Entrar</button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
            <footer className={styles.footer}>
                <p>Santhiago De Gobbi - RM: 98420</p>
            </footer>
        </div>
    );
};
 
export default Login;

