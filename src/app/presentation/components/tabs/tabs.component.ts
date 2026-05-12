import { IonTabs, IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from 'src/app/config/menu/menu.constant';
import { addIcons } from 'ionicons';
import { home, list, settings, folder  } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [IonIcon, IonTabs, IonTabBar, IonTabButton]
})
export class TabsComponent  implements OnInit {

  public menuItems = MENU_ITEMS;
  constructor() {
    addIcons({
      list,
      folder
    });
   }

  ngOnInit() {}

}
