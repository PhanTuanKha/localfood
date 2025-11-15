import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {
  darkMode = false;
  selectedLanguage = 'vi';
  currentTheme = 'orange';

  pushNotifications = true;
  emailNotifications = true;
  soundNotifications = false;

  locationServices = true;
  dataSaving = false;
  autoLogout = true;

  toastVisible = false;
  toastMessage = '';

  changePassword(): void {
    this.router.navigate(['/forgot-password']);
  }
  
  constructor(
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(): void {
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedLanguage = localStorage.getItem('language');
    const savedTheme = localStorage.getItem('theme');

    const savedPush = localStorage.getItem('pushNotifications');
    const savedEmail = localStorage.getItem('emailNotifications');
    const savedSound = localStorage.getItem('soundNotifications');

    const savedLocation = localStorage.getItem('locationServices');
    const savedDataSaving = localStorage.getItem('dataSaving');
    const savedAutoLogout = localStorage.getItem('autoLogout');

    if (savedDarkMode) {
      this.darkMode = JSON.parse(savedDarkMode);
      this.applyDarkMode(this.darkMode);
    }

    if (savedLanguage) {
      this.selectedLanguage = savedLanguage;
      this.applyLanguage(this.selectedLanguage);
    }

    if (savedTheme) {
      this.currentTheme = savedTheme;
      this.applyTheme(this.currentTheme);
    }

    if (savedPush) this.pushNotifications = JSON.parse(savedPush);
    if (savedEmail) this.emailNotifications = JSON.parse(savedEmail);
    if (savedSound) this.soundNotifications = JSON.parse(savedSound);

    if (savedLocation) this.locationServices = JSON.parse(savedLocation);
    if (savedDataSaving) this.dataSaving = JSON.parse(savedDataSaving);
    if (savedAutoLogout) this.autoLogout = JSON.parse(savedAutoLogout);
  }
  toggleDarkMode(): void {
    this.applyDarkMode(this.darkMode);
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
    this.showToast(`Dark mode ${this.darkMode ? 'bật' : 'tắt'}`);
  }

  private applyDarkMode(isDark: boolean): void {
    if (isDark) {
      this.renderer.addClass(this.document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(this.document.body, 'dark-mode');
    }
  }

  onLanguageChange(): void {
    this.applyLanguage(this.selectedLanguage);
    localStorage.setItem('language', this.selectedLanguage);
  }

  private applyLanguage(language: string): void {
    const html = this.document.documentElement;
    this.renderer.setAttribute(html, 'lang', language);

    this.showToast(`Đã đổi sang ngôn ngữ: ${this.getLanguageName(language)}`);
  }

  private getLanguageName(code: string): string {
    const languages: { [key: string]: string } = {
      vi: 'Tiếng Việt',
      en: 'English',
      zh: '中文',
    };
    return languages[code] || code;
  }

  setTheme(theme: string): void {
    this.currentTheme = theme;
    this.applyTheme(theme);
    localStorage.setItem('theme', theme);
  }

  private applyTheme(theme: string): void {
    const body = this.document.body;

    this.renderer.removeClass(body, 'theme-orange');
    this.renderer.removeClass(body, 'theme-blue');
    this.renderer.removeClass(body, 'theme-green');
    this.renderer.removeClass(body, 'theme-purple');

    this.renderer.addClass(body, `theme-${theme}`);
    this.showToast(`Đã đổi màu chủ đề`);
  }

  togglePushNotifications(): void {
    localStorage.setItem('pushNotifications', JSON.stringify(this.pushNotifications));
    this.showToast(`Thông báo đẩy ${this.pushNotifications ? 'bật' : 'tắt'}`);
  }

  toggleEmailNotifications(): void {
    localStorage.setItem('emailNotifications', JSON.stringify(this.emailNotifications));
    this.showToast(`Email ${this.emailNotifications ? 'bật' : 'tắt'}`);
  }

  toggleSoundNotifications(): void {
    localStorage.setItem('soundNotifications', JSON.stringify(this.soundNotifications));
    this.showToast(`Âm thanh ${this.soundNotifications ? 'bật' : 'tắt'}`);
  }


  toggleLocationServices(): void {
    localStorage.setItem('locationServices', JSON.stringify(this.locationServices));
    this.showToast(`Dịch vụ vị trí ${this.locationServices ? 'bật' : 'tắt'}`);
  }

  toggleDataSaving(): void {
    localStorage.setItem('dataSaving', JSON.stringify(this.dataSaving));
    this.showToast(`Chế độ tiết kiệm dữ liệu ${this.dataSaving ? 'bật' : 'tắt'}`);
  }

  toggleAutoLogout(): void {
    localStorage.setItem('autoLogout', JSON.stringify(this.autoLogout));
    this.showToast(`Tự động đăng xuất ${this.autoLogout ? 'bật' : 'tắt'}`);
  }

  exportData(): void {
    const data = {
      language: this.selectedLanguage,
      theme: this.currentTheme,
      darkMode: this.darkMode,
      notifications: {
        push: this.pushNotifications,
        email: this.emailNotifications,
        sound: this.soundNotifications,
      },
      privacy: {
        location: this.locationServices,
        dataSaving: this.dataSaving,
        autoLogout: this.autoLogout,
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = 'user-settings.json';
    a.click();

    URL.revokeObjectURL(url);

    this.showToast('Đã xuất dữ liệu!');
  }


  deleteAccount(): void {
    if (!confirm('Bạn có chắc chắn muốn xóa tài khoản?')) return;

    localStorage.clear();
    this.showToast('Tài khoản đã bị xóa!');

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1200);
  }

  showToast(message: string): void {
    this.toastMessage = message;
    this.toastVisible = true;

    setTimeout(() => {
      this.toastVisible = false;
    }, 1500);
  }
}
