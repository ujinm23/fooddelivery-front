"use client";

import { CartProvider } from "./CartContext";
import { AuthProvider } from "./AuthContext";

/**
 * AppProvider - Бүх Context Provider-үүдийг нэгтгэсэн Provider
 * 
 * Хэрэглээ:
 * 1. layout.js дээр AppProvider-ийг wrap хийх
 * 2. Компонентууд дээр useCart(), useAuth() hook-ууд ашиглах
 * 
 * Жишээ:
 * ```jsx
 * // layout.js
 * import { AppProvider } from "@/contexts/AppProvider";
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <AppProvider>
 *           {children}
 *         </AppProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * 
 * // Компонент дээр
 * import { useCart } from "@/contexts/CartContext";
 * import { useAuth } from "@/contexts/AuthContext";
 * 
 * function MyComponent() {
 *   const { cartItems, addToCart } = useCart();
 *   const { user, login, logout } = useAuth();
 *   // ...
 * }
 * ```
 */
export function AppProvider({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
}
