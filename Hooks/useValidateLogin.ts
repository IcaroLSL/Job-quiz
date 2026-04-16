import axios from 'axios';
import { useState } from 'react';

interface UseValidateLoginResult {
  validateLogin: (username: string, password: string) => Promise<boolean>;
  loading: boolean;
}

export function useValidateLogin(): UseValidateLoginResult {
  const [loading, setLoading] = useState(false);

  const validateLogin = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // const res = await axios.get(`URLDAAPI/login?username=${username}&password=${password}`)
      // if (res.status === 200) {
      if (username === 'admin' && password === 'password') {
        return true; // Login bem-sucedidoa
      }
      return false;
      // } else {
      // return false
      // }
    } catch (error) {
      console.error('Erro ao validar login:', error);
      return false; // Em caso de erro, considerar o login como falhado
    }
    finally {
      setLoading(false);
    }

  };

  return { validateLogin, loading };
}