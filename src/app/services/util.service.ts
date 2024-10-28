import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  async showLoader(message: string = 'Please wait...') {
    const loading = await this.loadingController.create({ message });
    await loading.present();
  }

  async hideLoader() {
    await this.loadingController.dismiss();
  }

  async showToast(message: string, duration: number = 2000) {
    const toast = await this.toastController.create({ message, duration });
    await toast.present();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showConfirm(header: string, message: string): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: [
          { text: 'Cancel', role: 'cancel', handler: () => resolve(false) },
          { text: 'OK', handler: () => resolve(true) },
        ],
      });
      await alert.present();
    });
  }
}
