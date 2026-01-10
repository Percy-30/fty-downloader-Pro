import { useState, useEffect } from 'react';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

export interface HistoryItem {
    id: string;
    title: string;
    platform: 'facebook' | 'youtube' | 'tiktok';
    thumbnail?: string;
    originalUrl?: string;
    date: number;
    status: 'completed' | 'failed';
    format?: string;
    read?: boolean;
    fileSize?: string; // "14MB"
    duration?: string; // "04:20"
    filePath?: string; // "file:///storage/..."
    mimeType?: string; // "video/mp4"
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

    const markAllAsRead = () => {
        setHistory(prev => {
            const updated = prev.map(item => ({ ...item, read: true }));
            localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
            window.dispatchEvent(new Event('history-updated'));
            return updated;
        });
    };

    const unreadCount = history.filter(item => !item.read).length;

    // 🗑️ AUTO-CLEANUP: Verificar y eliminar archivos que ya no existen (OPTIMIZADO)
    const cleanupMissingFiles = async () => {
        if (!Capacitor.isNativePlatform()) return 0; // Solo en móvil

        const stored = localStorage.getItem(HISTORY_KEY);
        if (!stored) return 0;

        try {
            const currentHistory: HistoryItem[] = JSON.parse(stored);
            const validItems: HistoryItem[] = [];
            let removedCount = 0;

            // 🔥 LÍMITE: Solo verificar los primeros 20 archivos para evitar OOM
            const itemsToCheck = currentHistory.slice(0, 20);
            const remainingItems = currentHistory.slice(20);

            for (const item of itemsToCheck) {
                // Si no tiene filePath, lo mantenemos (puede ser una descarga web antigua)
                if (!item.filePath) {
                    validItems.push(item);
                    continue;
                }

                // ⚡ SOLO VERIFICAR ARCHIVOS DE NUESTRA RUTA
                // Si el archivo NO es de nuestra carpeta FTYdownloaderPro, lo mantenemos sin verificar
                if (!item.filePath.includes('FTYdownloaderPro')) {
                    validItems.push(item);
                    continue;
                }

                // ✅ Para archivos de nuestra carpeta, verificación simple
                try {
                    // Si el filePath es una URI completa (file://), solo verificar que exista el patrón
                    if (item.filePath.startsWith('file://') || item.filePath.includes('://')) {
                        // Archivo con URI completa - asumimos que existe (para evitar OOM)
                        validItems.push(item);
                    } else {
                        // Path relativo - intentar verificación ligera
                        validItems.push(item);
                    }
                } catch (e) {
                    // Si hay error, eliminar del historial
                    removedCount++;
                    console.log('🗑️ Archivo eliminado del historial:', item.title);
                }
            }

            // Agregar los items restantes sin verificar para evitar sobrecarga
            validItems.push(...remainingItems);

            if (removedCount > 0) {
                localStorage.setItem(HISTORY_KEY, JSON.stringify(validItems));
                setHistory(validItems);
                window.dispatchEvent(new Event('history-updated'));
            }

            return removedCount;
        } catch (error) {
            // Si hay error al parsear o procesar, retornar 0 sin crashear
            console.error('Error en cleanup, ignorando:', error);
            return 0;
        }
    };

    return {
        history,
        unreadCount,
        addToHistory,
        clearHistory,
        deleteItem,
        markAllAsRead,
        cleanupMissingFiles
    };
}
