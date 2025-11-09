import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-header', 
  imports: [], 
  templateUrl: './header.html', 
  styleUrl: './header.css', })
export class Header implements OnInit {
  location: string = 'Đang tải vị trí...';
  loading: boolean = true;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.getUserLocation();
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

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`, {
          headers: { 'User-Agent': 'AngularApp/1.0 (youremail@example.com)' },
        })
          .then(res => res.json())
          .then(data => {
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