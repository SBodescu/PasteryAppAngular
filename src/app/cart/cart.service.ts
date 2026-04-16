import { Injectable } from '@angular/core';
import { CartItem } from './cart-item/cart-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
  cartObservable$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  addToCart(item: CartItem): void {
    const existingItem = this.cartItems.find(
      (cartItem) => cartItem.id === item.id,
    );
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push({ ...item });
    }
    this.emitCart();
    this.saveCartToStorage();
  }

  removeFromCart(itemId: string): void {
    const item = this.cartItems.find((cartItem) => cartItem.id === itemId);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.cartItems = this.cartItems.filter((i) => i.id !== itemId);
      }
      this.emitCart();
      this.saveCartToStorage();
    }
  }

  updateQuantity(itemId: string, quantity: number): void {
    const item = this.cartItems.find((cartItem) => cartItem.id === itemId);
    if (item && quantity > 0) {
      item.quantity = quantity;
      this.emitCart();
      this.saveCartToStorage();
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  clearCart(): void {
    this.cartItems = [];
    this.emitCart();
    this.clearCartFromStorage();
  }

  private loadCartFromStorage(): void {
    const storedCart = localStorage.getItem('cartItems');
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
    this.emitCart();
  }

  private saveCartToStorage(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private emitCart(): void {
    this.cartSubject.next([...this.cartItems]);
  }

  private clearCartFromStorage(): void {
    localStorage.removeItem('cartItems');
  }
}
