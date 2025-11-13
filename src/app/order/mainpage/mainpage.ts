import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { users, addUser, User } from '../../data/users';
import { AuthService } from '../../services/auth.service';
AuthService
@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.css',
})
export class Mainpage {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  phone: string = '';
  email: string = '';
  error: string = '';

  isLoggedIn: boolean = false;
  isRegisterMode: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  toggleRegisterMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.error = '';
    this.username = this.password = this.confirmPassword = this.phone = this.email = '';
  } 
  onSubmit() {
    if (!this.username || !this.password) {
      this.error = 'Vui lòng điền đầy đủ thông tin';
      return;
    }

    const user = users.find(
      (u) => u.username === this.username && u.password === this.password
    );

    if (user) {
      this.error = '';
      const sessionData = {
        user,
        loginTime: new Date().toISOString(),
      };
      sessionStorage.setItem('currentUserSession', JSON.stringify(sessionData));
      this.authService.login();
      this.isLoggedIn = true;

      alert(`Đăng nhập thành công với vai trò ${user.role}`);
    } else {
      this.error = 'Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.';
    }
  }

  ngAfterViewInit(){

  }
  scrollLeft(){
    const container=this.scrollContainer.nativeElement;
    if (container.scrollLeft <=0){
      container.scrollTo({
        left: container.scrollWidth,
        behavior: 'smooth'
      })
    } else {
      container.scrollBy({
        left: -300,
        behavior: 'smooth'
      })
    }
  }
  scrollRight() {
    const container = this.scrollContainer.nativeElement
    
    const maxScrollLeft = container.scrollWidth - container.clientWidth
    if (container.scrollLeft >= maxScrollLeft - 5) {
      container.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    } else {
      container.scrollBy({
        left: 300,
        behavior: 'smooth',
      })
    }
  }
}
