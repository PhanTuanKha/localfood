import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { CartSidebar } from '../order/cart-sidebar/cart-sidebar';
@Component({
  selector: 'app-header',
  imports: [CommonModule, CartSidebar, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  location: string = 'Đang tải vị trí...';
  loading: boolean = true;
  dropdownOpen: boolean = false;
  activeMenu: string = '';
  isLoggedIn: boolean = false;

  isCartOpen: boolean = false;
  private authSubscription!: Subscription;
  private clickListener!: (event: any) => void;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      (status) => {
        this.isLoggedIn = status;
      }
    );

    this.getUserLocation();

    this.clickListener = (event: any) => {
      const inside = event.target.closest('.dropdown-wrapper');
      if (!inside) {
        this.ngZone.run(() => (this.dropdownOpen = false));
      }
    };

    document.addEventListener('click', this.clickListener);
  }

  ngOnDestroy(): void {
    if (this.authSubscription) this.authSubscription.unsubscribe();
    if (this.clickListener) document.removeEventListener('click', this.clickListener);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleCart() {
  console.log('Cart clicked')
  this.isCartOpen = !this.isCartOpen;
}

  handleMenuClick(menu: string) {
  this.activeMenu = menu;
  this.dropdownOpen = false; // đóng dropdown sau khi click

  switch (menu) {
    case 'Đơn hàng':
      this.router.navigate(['/order-history']);
      break;
    case 'Tài khoản':
      this.router.navigate(['/account']);
      break;
    case 'Cài đặt':
      this.router.navigate(['/settings']);
      break;
    case 'Hỗ trợ':
      this.router.navigate(['/support']);
      break;
    case 'Trợ giúp':
      this.router.navigate(['/help']);
      break;
    case 'Đăng nhập':
      this.router.navigate(['/signin']);
      break;
    case 'Đăng xuất':
      this.authService.logout();
      alert('Đã đăng xuất');
      this.router.navigate(['/signin']);
      break;
  }
}

  getUserLocation(): void {
    if (!navigator.geolocation) {
      this.location = 'Trình duyệt không hỗ trợ định vị';
      this.loading = false;
      return;
    }

    let timeoutReached = false;
    const timeout = setTimeout(() => {
      timeoutReached = true;
      this.ngZone.run(() => {
        this.location = 'Không thể xác định vị trí';
        this.loading = false;
      });
    }, 15000);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (timeoutReached) return;
        clearTimeout(timeout);
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
          {
            headers: {
              'User-Agent': 'AngularApp/1.0 (youremail@example.com)',
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            this.ngZone.run(() => {
              this.location =
                data.address?.city ||
                data.address?.town ||
                data.address?.village ||
                data.display_name ||
                'Không xác định được vị trí';
              this.loading = false;
            });
          })
          .catch(() => {
            this.ngZone.run(() => {
              this.location = 'Không thể lấy thông tin vị trí';
              this.loading = false;
            });
          });
      },
      (error) => {
        clearTimeout(timeout);
        this.ngZone.run(() => {
          this.location = 'Quyền truy cập vị trí bị từ chối';
          this.loading = false;
        });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }
}
