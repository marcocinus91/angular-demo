import { Component, input } from '@angular/core';

export type IconName =
  | 'menu'
  | 'search'
  | 'sun'
  | 'moon'
  | 'pencil-line'
  | 'x'
  | 'plus'
  | 'layout-dashboard'
  | 'users'
  | 'list-checks'
  | 'clock'
  | 'bell'
  | 'circle-check-big';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})
export class Icon {
  name = input.required<IconName>();
  size = input(18);
  strokeWidth = input(2);
}
