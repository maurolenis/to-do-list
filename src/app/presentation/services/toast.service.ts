import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
type typeToast = 'success' | 'danger' | 'warning';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastController = inject(ToastController);

  public async showToast(message: string, type: typeToast = 'success', duration: number = 2000) {
    const toast = await this.toastController.create({
      message,
      duration,
      color: type,
    });
    await toast.present();
  }
}
