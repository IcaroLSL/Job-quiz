import axios from 'axios';
import { useState } from 'react';

interface UseNotificationsResult {
    GetNotifications: (id: string) => Promise<UseNotificationsResult>;
    loading: boolean;
    error: string | null;
}

interface Notification {
    id: string;
    title: string;
    message: string;
    read: boolean;
    timestamp: Date;
    priority: 'info' | 'low' | 'medium' | 'high' | 'warning' | 'critical';
}

export function useGetNotifications(): UseNotificationsResult {
  const [loading, setLoading] = useState(false);

  const getNotifications = async (id: string): Promise<UseNotificationsResult> => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8080/v1/notifications?id=${id}`)
      if (res.status === 200) {
        return res.data as UseNotificationsResult;
      } else {
        return { notifications: [], loading: false, error: 'Erro externo ao buscar notificações' }
      }
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
      return { notifications: [], loading: false, error: 'Erro interno ao buscar notificações' };
    }
    finally {
      setLoading(false);
    }

  };

  return { getNotifications, loading };
}