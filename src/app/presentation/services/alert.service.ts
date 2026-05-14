import { inject, Injectable } from '@angular/core';
import { AlertController, AlertButton } from '@ionic/angular/standalone';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertController = inject(AlertController);

  public async showAlert(
    title: string,
    message: string,
    buttons: (string | AlertButton)[] = ['OK']
  ) {
    const alert = await this.alertController.create({
      header: title.toUpperCase(),
      message,
      buttons,
    });
    await alert.present();
  }
}
