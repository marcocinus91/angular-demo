import { Component, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { Icon } from '../ui/icon/icon';
import { IconButton } from '../ui/icon-button/icon-button';
import { Avatar } from '../ui/avatar/avatar';

const PAGE_TITLES: Record<string, string> = {
  overview: 'Overview',
  'team-mates': 'Team Mates',
  'todo-list': 'Todo List',
};

const THEME_KEY = 'angular-demo-theme';

function titleForUrl(url: string): string {
  const segment = url.split('/').filter(Boolean)[0];
  return PAGE_TITLES[segment] ?? 'Overview';
}

@Component({
  selector: 'app-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, Icon, IconButton, Avatar],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  sidebarOpen = signal(false);
  theme = signal<'light' | 'dark'>(this.readInitialTheme());

  pageTitle = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => titleForUrl(event.urlAfterRedirects)),
    ),
    { initialValue: titleForUrl(this.router.url) },
  );

  constructor() {
    effect(() => {
      const theme = this.theme();
      if (!isPlatformBrowser(this.platformId)) return;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(THEME_KEY, theme);
    });
  }

  private readInitialTheme(): 'light' | 'dark' {
    if (!isPlatformBrowser(this.platformId)) return 'light';
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
  }

  toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  toggleTheme(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }
}
