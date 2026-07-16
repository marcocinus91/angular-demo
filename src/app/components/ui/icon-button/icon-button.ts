import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.css',
})
export class IconButton {
  active = input(false);
  size = input(36);
  title = input('');
}
