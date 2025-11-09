import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
<<<<<<< Updated upstream
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
=======
  selector: 'app-header', 
  imports: [CommonModule], 
  templateUrl: './header.html', 
  styleUrl: './header.css', })
>>>>>>> Stashed changes
export class Header implements OnInit, OnDestroy {
  location: string = 'Đang tải vị trí...';
  loading: boolean = true;
  dropdownOpen: boolean = false;
  activeMenu: string = '';
  isLoggedIn: boolean = false;
  private authSubscription!: Subscription;

  constructor(private ngZone: NgZone, private router: Router, private authService: AuthService) {}
  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  handleMenuClick(menu: string) {
    this.activeMenu = menu;
    if (menu === 'Đăng nhập') {
      this.router.navigate(['/signin']);
    }
    if (menu === 'Đăng xuất') {
      this.authService.logout();
      alert('Đã đăng xuất');
      this.router.navigate(['/signin']);
    }
  }
  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
    this.getUserLocation();
    document.addEventListener('click', (event: any) => {
      const inside = event.target.closest('.dropdown-wrapper');
      if (!inside) {
        this.ngZone.run(() => (this.dropdownOpen = false));
      }
    });
    this.authSubscription = this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
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
        console.error('Lỗi định vị:', error);
        this.ngZone.run(() => {
          this.location = 'Quyền truy cập vị trí bị từ chối';
          this.loading = false;
        });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }
}