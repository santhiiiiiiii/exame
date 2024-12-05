'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

// Tipagem das cartas
interface Card {
    code: string;
    value: string;
    suit: string;
    image: string;
}

const Dashboard = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(false);

    // Função para buscar as cartas do baralho
    const fetchDeck = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52');
            const data = await response.json();
            setCards(data.cards || []);
            localStorage.setItem('deck', JSON.stringify(data.cards)); // Salvar estado no localStorage
        } catch (error) {
            console.error('Erro ao buscar o baralho:', error);
        } finally {
            setLoading(false);
        }
    };

    // Carregar o baralho do localStorage ou buscar novo
    useEffect(() => {
        const storedDeck = localStorage.getItem('deck');
        if (storedDeck) {
            setCards(JSON.parse(storedDeck));
        } else {
            fetchDeck();
        }
    }, []);

    // Função para embaralhar o baralho
    const shuffleDeck = async () => {
        setLoading(true);
        try {
            await fetchDeck(); // Novo fetch que já retorna cartas embaralhadas
        } catch (error) {
            console.error('Erro ao embaralhar o baralho:', error);
        } finally {
            setLoading(false);
        }
    };
    // Função para deslogar
    const handleLogout = () => {
        localStorage.removeItem('deck');
        localStorage.removeItem('favorites');
        localStorage.removeItem('isLoggedIn');
        window.location.href = '/login';
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Baralho</h1>
            <button onClick={handleLogout} className={styles.logoutButton}>Deslogar</button>
            <button onClick={shuffleDeck} className={styles.shuffleButton}>Embaralhar</button>
            {loading ? (
                <p>Carregando cartas...</p>
            ) : (
                <div className={styles.cardGrid}>
                    {cards.map((card) => (
                        <div key={card.code} className={styles.card}>
                            <Image src={card.image} alt={`${card.value} de ${card.suit}`} width={150} height={200} />
                            <h3>{card.value} de {card.suit}</h3>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
