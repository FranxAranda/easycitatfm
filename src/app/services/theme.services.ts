import { Injectable } from '@angular/core';

const THEME_KEY = 'easycita_theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = false;

  constructor() {
    this.isDark = (localStorage.getItem(THEME_KEY) === 'dark');
    this.apply();
  }

  toggle() {
    this.isDark = !this.isDark;
    localStorage.setItem(THEME_KEY, this.isDark ? 'dark' : 'light');
    this.apply();
  }

  setDark(dark: boolean) {
    this.isDark = dark;
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
    this.apply();
  }

  apply() {
    if (this.isDark) document.documentElement.classList.add('dark-theme');
    else document.documentElement.classList.remove('dark-theme');
  }
}
