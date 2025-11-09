import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-header', 
  imports: [], 
  templateUrl: './header.html', 
  styleUrl: './header.css', })
export class Header implements OnInit {
  location: string = 'Đang tải vị trí...';

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.getUserLocation();
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // 👇 Gọi API reverse geocoding của OpenStreetMap
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`, {
            headers: {
              'User-Agent': 'AngularApp/1.0 (example@email.com)',
            },
          })
            .then((response) => response.json())
            .then((data) => {
              this.ngZone.run(() => {
                this.location =
                  data.address.city ||
                  data.address.town ||
                  data.address.village ||
                  data.display_name ||
                  'Không xác định được vị trí';
              });
            })
            .catch(() => {
              this.ngZone.run(() => {
                this.location = 'Không thể lấy thông tin vị trí';
              });
            });
        },
        (error) => {
          console.error('Lỗi định vị:', error);
          this.ngZone.run(() => {
            this.location = 'Quyền truy cập vị trí bị từ chối';
          });
        }
      );
    } else {
      this.location = 'Trình duyệt không hỗ trợ định vị';
    }
  }
}