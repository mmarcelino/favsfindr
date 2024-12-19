import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { handleError } from '../utils/errorHandling';
import { withRetry } from '../utils/supabaseRetry';

interface FavoriteRecord {
  place_id: string;
}

export function useFavorites(user: User | null) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchFavorites = async () => {
      if (!user) {
        if (mounted) {
          setFavorites([]);
          setLoading(false);
        }
        return;
      }

      try {
        const { data, error: supabaseError } = await withRetry(() =>
          supabase
            .from('favorites')
            .select('place_id')
            .eq('user_id', user.id)
        );

        if (supabaseError) throw supabaseError;

        if (mounted) {
          setFavorites(data?.map((fav: FavoriteRecord) => fav.place_id) ?? []);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          const errorMessage = handleError(err);
          setError(new Error(errorMessage));
          setFavorites([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchFavorites();

    // Subscribe to realtime changes
    const subscription = supabase
      .channel('favorites_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'favorites',
          filter: `user_id=eq.${user?.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setFavorites((prev) => [...prev, payload.new.place_id]);
          } else if (payload.eventType === 'DELETE') {
            setFavorites((prev) => prev.filter(id => id !== payload.old.place_id));
          }
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [user]);

  const toggleFavorite = async (placeId: string) => {
    if (!user) return;

    try {
      const isFavorite = favorites.includes(placeId);

      if (isFavorite) {
        const { error } = await withRetry(() =>
          supabase
            .from('favorites')
            .delete()
            .eq('user_id', user.id)
            .eq('place_id', placeId)
        );

        if (error) throw error;
      } else {
        const { error } = await withRetry(() =>
          supabase
            .from('favorites')
            .insert({ user_id: user.id, place_id: placeId })
        );

        if (error) throw error;
      }
      setError(null);
    } catch (err) {
      const errorMessage = handleError(err);
      setError(new Error(errorMessage));
    }
  };

  return { favorites, loading, error, toggleFavorite };
}