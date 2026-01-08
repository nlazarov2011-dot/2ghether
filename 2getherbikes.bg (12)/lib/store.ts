import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, CartItem } from '../types';
import { supabase } from './supabase';
import { PRODUCTS } from './data';

// Helper to get current user ID securely
const getUserId = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user?.id;
};

interface CartState {
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, size: string | undefined, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  getCartCount: () => number;
  syncCart: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      addToCart: async (product, size) => {
        const userId = await getUserId();
        const targetSize = size || product.sizes[0];
        const state = get();
        
        // 1. Calculate the New State (Optimistic)
        const existingItemIndex = state.cart.findIndex(
          item => item.id === product.id && item.selectedSize === targetSize
        );
        
        let newQuantity = 1;
        let itemToStore: CartItem;

        if (existingItemIndex > -1) {
          newQuantity = state.cart[existingItemIndex].quantity + 1;
          itemToStore = { ...state.cart[existingItemIndex], quantity: newQuantity };
        } else {
          itemToStore = { ...product, quantity: 1, selectedSize: targetSize };
        }

        // 2. If Logged In: Update Supabase First
        if (userId) {
          const { error } = await supabase.from('cart_items').upsert({
            user_id: userId,
            product_id: product.id,
            quantity: newQuantity,
            product_data: itemToStore, 
            selected_size: targetSize
          }, { onConflict: 'user_id, product_id, selected_size' });
          
          if (error) {
            console.error('Error adding to cart in DB:', error);
            // Optionally return here if you want to block local update on DB failure
          }
        }

        // 3. Update Local State (Guest or User)
        let newCart = [...state.cart];
        if (existingItemIndex > -1) {
          newCart[existingItemIndex].quantity = newQuantity;
        } else {
          newCart = [...state.cart, itemToStore];
        }
        
        set({ cart: newCart, isCartOpen: true });
      },

      removeFromCart: async (productId, size) => {
        const userId = await getUserId();
        
        // 1. If Logged In: Update Supabase First
        if (userId) {
          await supabase.from('cart_items').delete().match({
            user_id: userId,
            product_id: productId,
            selected_size: size
          });
        }

        // 2. Update Local State
        set((state) => ({ 
          cart: state.cart.filter(item => !(item.id === productId && item.selectedSize === size)) 
        }));
      },

      updateQuantity: async (productId, size, quantity) => {
        const userId = await getUserId();

        if (quantity <= 0) {
          get().removeFromCart(productId, size);
          return;
        }

        // 1. If Logged In: Update Supabase First
        if (userId) {
          await supabase.from('cart_items').update({ quantity }).match({
             user_id: userId,
             product_id: productId,
             selected_size: size
          });
        }

        // 2. Update Local State
        set((state) => ({
          cart: state.cart.map(item => 
            (item.id === productId && item.selectedSize === size) 
              ? { ...item, quantity } 
              : item
          )
        }));
      },

      clearCart: async () => {
        const userId = await getUserId();
        
        if (userId) {
          await supabase.from('cart_items').delete().eq('user_id', userId);
        }
        
        set({ cart: [] });
      },

      cartTotal: () => {
        const state = get();
        return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getCartCount: () => {
        const state = get();
        return state.cart.reduce((acc, item) => acc + item.quantity, 0);
      },

      // --- CRITICAL SYNC LOGIC ---
      syncCart: async () => {
        const userId = await getUserId();
        if (!userId) return; // Not logged in, nothing to sync

        // 1. MERGE: Push local guest items to DB
        const { cart: localCart } = get();
        
        if (localCart.length > 0) {
          const itemsToUpsert = localCart.map(item => ({
             user_id: userId,
             product_id: item.id,
             quantity: item.quantity,
             product_data: item,
             selected_size: item.selectedSize
          }));

          // Upsert ensures we don't create duplicates, we update quantities/data if exists
          const { error: upsertError } = await supabase.from('cart_items').upsert(itemsToUpsert, {
            onConflict: 'user_id, product_id, selected_size'
          });
          
          if (upsertError) console.error("Sync Cart Upsert Error:", upsertError);
        }

        // 2. FETCH: Get the definitive state from DB (User's historical + Guest items merged)
        const { data, error: fetchError } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', userId);
        
        if (!fetchError && data) {
          // Rehydrate CartItems from DB rows
          const mergedCart: CartItem[] = data.map(row => ({
            ...row.product_data, // Spread the stored JSON product data
            quantity: row.quantity,
            selectedSize: row.selected_size || row.product_data.selectedSize
          }));
          
          // Update local store with DB truth
          set({ cart: mergedCart });
        }
      }
    }),
    {
      name: '2getherbikes-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

interface WishlistState {
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  syncWishlist: () => Promise<void>;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],

      toggleWishlist: async (productId) => {
        const state = get();
        const exists = state.wishlist.includes(productId);
        const userId = await getUserId();
        const product = PRODUCTS.find(p => p.id === productId);

        // 1. If Logged In: Update Supabase First
        if (userId) {
          if (exists) {
            await supabase.from('favorites').delete().match({ user_id: userId, product_id: productId });
          } else {
            await supabase.from('favorites').insert({ 
              user_id: userId, 
              product_id: productId,
              product_data: product || {} 
            });
          }
        }

        // 2. Update Local State
        const newWishlist = exists 
          ? state.wishlist.filter(id => id !== productId)
          : [...state.wishlist, productId];
        
        set({ wishlist: newWishlist });
      },

      isInWishlist: (productId) => {
        return get().wishlist.includes(productId);
      },

      // --- CRITICAL SYNC LOGIC ---
      syncWishlist: async () => {
        const userId = await getUserId();
        if (!userId) return;

        // 1. MERGE: Push local guest favorites to DB
        const { wishlist: localWishlist } = get();
        
        if (localWishlist.length > 0) {
          const itemsToInsert = localWishlist.map(id => {
             const product = PRODUCTS.find(p => p.id === id);
             return {
                user_id: userId,
                product_id: id,
                product_data: product || {}
             };
          });
          
          // Upsert/Insert ignoring duplicates
          await supabase.from('favorites').upsert(itemsToInsert, { 
             onConflict: 'user_id, product_id',
             ignoreDuplicates: true 
          });
        }

        // 2. FETCH: Get definitive list from DB
        const { data, error } = await supabase
          .from('favorites')
          .select('product_id')
          .eq('user_id', userId);
        
        if (!error && data) {
          set({ wishlist: data.map(row => row.product_id) });
        }
      }
    }),
    {
      name: '2getherbikes-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface UIState {
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSearchOpen: false,
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
}));

interface AuthModalState {
  isAuthOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  isAuthOpen: false,
  openAuth: () => set({ isAuthOpen: true }),
  closeAuth: () => set({ isAuthOpen: false }),
}));

interface BookingModalState {
  isBookingOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
}

export const useBookingModalStore = create<BookingModalState>((set) => ({
  isBookingOpen: false,
  openBooking: () => set({ isBookingOpen: true }),
  closeBooking: () => set({ isBookingOpen: false }),
}));

// User / Auth State
interface UserState {
  user: any | null;
  setUser: (user: any | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
    // Trigger syncs when user logs in (user is not null)
    if (user) {
      // We use setTimeout to ensure Zustand persist has hydrated (though usually sync)
      // and to push execution to end of event loop so previous state is settled.
      setTimeout(() => {
        useCartStore.getState().syncCart();
        useWishlistStore.getState().syncWishlist();
      }, 0);
    }
  },
}));