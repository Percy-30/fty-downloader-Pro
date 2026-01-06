import { LocalNotifications } from '@capacitor/local-notifications';
import { useEffect } from 'react';
import { usePlatform } from './usePlatform';

export function useNotifications() {
    const { isNative } = usePlatform();

    useEffect(() => {
        if (isNative) {
            // Crear canal para Android 8+ (Requerido para que se muestren)
            LocalNotifications.createChannel({
                id: 'downloads',
                name: 'Descargas Completadas',
                description: 'Notifica cuando una descarga ha finalizado',
                importance: 5,
                visibility: 1,
                vibration: true,
            }).catch(err => console.error('Error creating notification channel:', err));

            // Solicitar permisos explícitos al montar
            LocalNotifications.requestPermissions();
        }
    }, [isNative]);

    const scheduleNotification = async (title: string, body: string) => {
        if (!isNative) return;

        try {
            const id = Math.floor(Math.random() * 1000000);
            await LocalNotifications.schedule({
                notifications: [
                    {
                        title,
                        body,
                        id,
                        channelId: 'downloads', // Vinculación crucial con el canal
                        schedule: { at: new Date(Date.now() + 100) }, // Pequeño delay
                    }
                ]
            });
        } catch (error) {
            console.error('Error scheduling notification:', error);
        }
    };

    return { scheduleNotification };
}
