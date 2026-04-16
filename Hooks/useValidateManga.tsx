import axios from 'axios';
import { useState } from 'react';
import { string } from 'yup';

interface UseValidateMangaResult {
  validateManga: (name: string) => Promise<boolean>;
  loading: boolean;
}

export function useValidateManga(): UseValidateMangaResult {
  const [loading, setLoading] = useState(false);

  const validateManga = async (name: string): Promise<boolean> => {
    setLoading(true);
    try {
      // const res = await axios.get(`URLDAAPI/login?username=${username}&password=${password}`)
      // if (res.status === 200) {
      if (typeof name === 'string') {
        return true;
      }
      return false;
      // } else {
      // return false
      // }
    } catch (error) {
      console.error('Erro ao validar manga:', error);
      return false; // Em caso de erro, considerar o manga como inválido
    }
    finally {
      setLoading(false);
    }

  };

  return { validateManga, loading };
}