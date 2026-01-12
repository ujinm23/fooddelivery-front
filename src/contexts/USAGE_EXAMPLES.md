# Provider Хэрэглээний Жишээ

## 1. Cart Provider - Жишээ

### Cart-д item нэмэх
```jsx
"use client";
import { useCart } from "@/contexts/CartContext";

function FoodCard({ food }) {
  const { addToCart } = useCart();

  return (
    <button onClick={() => addToCart({
      id: food._id,
      name: food.foodName,
      price: food.price,
      image: food.image
    })}>
      Add to Cart
    </button>
  );
}
```

### Cart-ийн мэдээлэл харуулах
```jsx
"use client";
import { useCart } from "@/contexts/CartContext";

function CartSummary() {
  const { cartItems, getTotalPrice, getCartItemCount } = useCart();

  return (
    <div>
      <p>Items: {getCartItemCount()}</p>
      <p>Total: ${getTotalPrice().toFixed(2)}</p>
      {cartItems.map(item => (
        <div key={item.id}>
          {item.name} x {item.quantity}
        </div>
      ))}
    </div>
  );
}
```

### Cart-аас item хасах
```jsx
"use client";
import { useCart } from "@/contexts/CartContext";

function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div>
      <span>{item.name}</span>
      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
        -
      </button>
      <span>{item.quantity}</span>
      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
        +
      </button>
      <button onClick={() => removeFromCart(item.id)}>Remove</button>
    </div>
  );
}
```

## 2. Auth Provider - Жишээ

### Login хийх
```jsx
"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    
    if (data.user) {
      login(data.user, data.token);
      router.push("/");
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### User мэдээлэл харуулах
```jsx
"use client";
import { useAuth } from "@/contexts/AuthContext";

function UserProfile() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated()) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <p>Name: {user?.firstName}</p>
      <p>Email: {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Protected Route (Нэвтрэх шаардлагатай)
```jsx
"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ProtectedPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated()) return null;

  return <div>Protected Content</div>;
}
```

## 3. Хоёр Provider хамт ашиглах

```jsx
"use client";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

function CheckoutButton() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const handleCheckout = async () => {
    if (!isAuthenticated()) {
      alert("Please login first");
      return;
    }

    const orderData = {
      user: user._id,
      foodOrderItems: cartItems.map(item => ({
        food: item.id,
        quantity: item.quantity,
      })),
      totalPrice: getTotalPrice(),
    };

    // Order үүсгэх
    await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });

    clearCart();
  };

  return (
    <button onClick={handleCheckout}>
      Checkout - ${getTotalPrice().toFixed(2)}
    </button>
  );
}
```

## 4. Одоогийн код руу шилжүүлэх

### Өмнө (Props ашиглаж байсан):
```jsx
// Mainpage.js
const [cart, setCart] = useState([]);

// CartDrawer.js
export default function CartDrawer({ cartItems, onUpdateQty, onRemoveItem }) {
  // ...
}
```

### Одоо (Provider ашиглаж байна):
```jsx
// Mainpage.js
import { useCart } from "@/contexts/CartContext";

export default function MainPage() {
  const { cartItems, addToCart } = useCart();
  // cartItems ашиглах
}

// CartDrawer.js
import { useCart } from "@/contexts/CartContext";

export default function CartDrawer() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  // cartItems, updateQuantity, removeFromCart ашиглах
}
```
