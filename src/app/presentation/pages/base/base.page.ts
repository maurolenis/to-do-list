import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterOutlet } from '@angular/router';
import { TabsComponent } from '../../components/tabs/tabs.component';

@Component({
  selector: 'app-base',
  templateUrl: './base.page.html',
  styleUrls: ['./base.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterOutlet,
    TabsComponent,
  ],
})
export class BasePage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
