import { Injectable } from '@angular/core';

export interface User {
  username: string;
  password: string;
  role: 'customer' | 'vendor' | 'admin';
  phone?: string;
  email?: string;
  address?: string;
  description?: string;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private users: User[] = [];

  constructor() {}

  async loadUsers(): Promise<void> {
    const saved = localStorage.getItem('users');
    this.users = saved ? JSON.parse(saved) : [];
  }

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User) {
    this.users.push(user);
    this.saveUsers();
  }

  private saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getNextVendorNumber(): number {
    const vendorCount = this.users.filter(u => u.role === 'vendor').length;
    return vendorCount + 1;
  }

  checkLogin(username: string, password: string): User | null {
    return this.users.find(u => u.username === username && u.password === password) || null;
  }
}
