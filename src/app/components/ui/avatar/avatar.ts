import { Component, computed, input } from '@angular/core';

const PALETTE = ['#7c6ee0', '#e0956e', '#5fb37a', '#5b93d6', '#d67ab0', '#e0c15f'];

function hashColor(str: string): string {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % PALETTE.length;
  return PALETTE[h];
}

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
})
export class Avatar {
  name = input('');
  size = input(40);
  color = input<string | undefined>(undefined);

  initial = computed(() => (this.name() || '?').trim().charAt(0).toUpperCase());
  background = computed(() => this.color() || hashColor(this.name() || '?'));
}
