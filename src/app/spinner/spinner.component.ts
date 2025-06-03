import { Component } from '@angular/core';
@Component({
  selector: 'app-spinner',
  template: `<div class="spinner-backdrop"><div class="spinner"></div></div>`,
  styleUrls: ['./spinner.component.scss'],
  standalone: false,
})
export class SpinnerComponent {}