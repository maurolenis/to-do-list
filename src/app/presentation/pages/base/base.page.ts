import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonTabBar, IonTabButton, IonTabs, IonIcon } from '@ionic/angular/standalone';
import { MENU_ITEMS } from 'src/app/config/menu/menu.constant';

@Component({
  selector: 'app-base',
  templateUrl: './base.page.html',
  styleUrls: ['./base.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonTabs, IonIcon, IonTabBar, IonTabButton],
})
export class BasePage {
  public menuItems = MENU_ITEMS;
}
