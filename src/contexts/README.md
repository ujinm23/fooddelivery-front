# Context Providers - Хэрэглээний заавар

## 📋 Агуулга

Энэ folder нь React Context Provider-үүдийг агуулна. Provider-ууд нь global state management-ийг хялбаршуулдаг.

## 🎯 Provider-үүд

### 1. **CartProvider** (`CartContext.js`)
Cart (сагс)-ийн state-ийг удирдана.

**Функц:**
- `addToCart(item)` - Cart-д item нэмэх
- `removeFromCart(itemId)` - Cart-аас item хасах
- `updateQuantity(itemId, quantity)` - Item-ийн тоо шинэчлэх
- `clearCart()` - Cart-ийг цэвэрлэх
- `getTotalPrice()` - Нийт үнэ тооцоолох
- `getCartItemCount()` - Cart-ийн item-ийн тоо

**Хэрэглээ:**
```jsx
import { useCart } from "@/contexts/CartContext";

function MyComponent() {
  const { cartItems, addToCart, removeFromCart, getTotalPrice } = useCart();

  return (
    <div>
      <p>Cart items: {cartItems.length}</p>
      <p>Total: ${getTotalPrice()}</p>
      <button onClick={() => addToCart({ id: 1, name: "Food", price: 10 })}>
        Add to Cart
      </button>
    </div>
  );
}
```

### 2. **AuthProvider** (`AuthContext.js`)
User authentication state-ийг удирдана.

**Функц:**
- `login(userData, token)` - User нэвтрэх
- `logout()` - User гарах
- `updateUser(userData)` - User мэдээлэл шинэчлэх
- `isAuthenticated()` - User нэвтэрсэн эсэхийг шалгах
- `getUserId()` - User ID авах

**Хэрэглээ:**
```jsx
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <p>Welcome, {user?.firstName}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 3. **AppProvider** (`AppProvider.js`)
Бүх Provider-үүдийг нэгтгэсэн Provider. `layout.js` дээр ашиглана.

## 🚀 Хэрхэн ашиглах

### Step 1: Layout.js дээр AppProvider нэмэх

`src/app/layout.js` файлд AppProvider-ийг нэмсэн байна:

```jsx
import { AppProvider } from "@/contexts/AppProvider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
```

### Step 2: Компонент дээр Hook ашиглах

```jsx
"use client";

import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

export default function MyComponent() {
  const { cartItems, addToCart } = useCart();
  const { user, login, logout } = useAuth();

  // ... component logic
}
```

## 📝 Жишээ: Cart-д item нэмэх

```jsx
"use client";

import { useCart } from "@/contexts/CartContext";

export default function FoodCard({ food }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: food._id,
      name: food.foodName,
      price: food.price,
      image: food.image,
    });
  };

  return (
    <div>
      <h3>{food.foodName}</h3>
      <p>${food.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
```

## 📝 Жишээ: Login хийх

```jsx
"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();

  const handleLogin = async (email, password) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    
    if (data.user) {
      login(data.user, data.token);
    }
  };

  // ... form logic
}
```

## ⚠️ Анхаарах зүйлс

1. **Hook-уудыг зөвхөн Provider дотор ашиглах**
   - `useCart()` болон `useAuth()` hook-уудыг зөвхөн `AppProvider`-ийн доторх компонентууд дээр ашиглах ёстой.

2. **"use client" directive**
   - Context Provider-үүд нь client-side компонентууд тул `"use client"` directive шаардлагатай.

3. **localStorage синхрончлол**
   - Cart болон Auth state нь localStorage-тай автоматаар синхрончлогддог.

## 🔄 Migration (Одоогийн код руу шилжүүлэх)

Одоогийн код дээр Provider ашиглахын тулд:

1. `Mainpage.js` дээрх cart state-ийг `useCart()` hook-оор солих
2. `CartDrawer.js` дээрх cart props-ийг `useCart()` hook-оор солих
3. User state-ийг `useAuth()` hook-оор солих

## 📚 Нэмэлт мэдээлэл

- [React Context Documentation](https://react.dev/reference/react/createContext)
- [Next.js App Router](https://nextjs.org/docs/app)
