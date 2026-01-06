import { useState, useEffect } from 'react';

export interface HistoryItem {
    id: string;
    title: string;
    platform: 'facebook' | 'youtube' | 'tiktok';
    thumbnail?: string;
    date: number;
    status: 'completed' | 'failed';
    format?: string;
}

const HISTORY_KEY = 'fty_download_history';
const MAX_ITEMS = 50;

export function useDownloadHistory() {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        const loadHistory = () => {
            const stored = localStorage.getItem(HISTORY_KEY);
            if (stored) {
                try {
                    setHistory(JSON.parse(stored));
                } catch (e) {
                    console.error('Error parsing history:', e);
                    setHistory([]);
                }
            } else {
                setHistory([]);
            }
        };

        loadHistory();

        const handleStorageChange = () => loadHistory();

        // Listen to custom event for intra-app updates and storage event for cross-tab
        window.addEventListener('history-updated', handleStorageChange);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('history-updated', handleStorageChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const addToHistory = (item: Omit<HistoryItem, 'id' | 'date'>) => {
        const newItem: HistoryItem = {
            ...item,
            id: crypto.randomUUID(),
            date: Date.now(),
        };

        const stored = localStorage.getItem(HISTORY_KEY);
        const currentHistory: HistoryItem[] = stored ? JSON.parse(stored) : [];

        const updated = [newItem, ...currentHistory].slice(0, MAX_ITEMS);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));

        // Update local state
        setHistory(updated);

        // Notify other components
        window.dispatchEvent(new Event('history-updated'));
        console.log('✅ History updated:', newItem.title);
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem(HISTORY_KEY);
        window.dispatchEvent(new Event('history-updated'));
    };

    const deleteItem = (id: string) => {
        const stored = localStorage.getItem(HISTORY_KEY);
        if (stored) {
            const currentItems: HistoryItem[] = JSON.parse(stored);
            const updated = currentItems.filter(i => i.id !== id);
            setHistory(updated);
            localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
            window.dispatchEvent(new Event('history-updated'));
        }
    };

    return {
        history,
        addToHistory,
        clearHistory,
        deleteItem
    };
}
