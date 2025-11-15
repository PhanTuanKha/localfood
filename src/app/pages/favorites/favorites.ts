import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface FavoriteItem {
  id: number;
  name: string;
  restaurant: string;
  price: number;
  image: string;
  rating: number;
}

@Component({
  selector: 'app-favorites',
  imports: [CommonModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class FavoritesComponent {
  favoriteItems: FavoriteItem[] = [
    {
      id: 1,
      name: 'Cheese Burger',
      restaurant: 'Burger Arena',
      price: 50000,
      image: 'assets/images/logo/cheeseburger.png',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Pancake',
      restaurant: 'Cake Word',
      price: 28000,
      image: 'assets/images/logo/pancake.png',
      rating: 4.2
    },
    {
      id: 3,
      name: 'Crispy Sandwich',
      restaurant: 'Fastfood Dine',
      price: 45000,
      image: 'assets/images/logo/crispy.png',
      rating: 4.7
    }
  ];

  constructor(private router: Router) {}

  removeFromFavorites(itemId: number): void {
    this.favoriteItems = this.favoriteItems.filter(item => item.id !== itemId);
  }

  goToOrder(item?: FavoriteItem): void {
    if (item) {
      this.router.navigate(['/order'], { state: { item } });
    } else {
      this.router.navigate(['/']);
    }
  }

  goBack(): void {
    this.router.navigate(['/account']);
  }
}