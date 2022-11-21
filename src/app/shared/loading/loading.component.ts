import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
  <div class="d-flex align-items-center">
    <div *ngIf="loading" class="spinner-border spinner-border-sm text-secondary me-1" role="status">
      <span span class= "visually-hidden">Loading...</span>
    </div>
    <div *ngIf="text">{{ text }}</div>
  </div>
  `
})
export class LoadingComponent implements OnInit {
  @Input() loading: boolean;
  @Input() text: string;
  constructor() { }

  ngOnInit(): void {
  }

}
