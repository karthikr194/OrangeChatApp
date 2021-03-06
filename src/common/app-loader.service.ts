import { Injectable } from '@angular/core'; 
import { LoadingController } from '@ionic/angular'; 

@Injectable({
  providedIn: 'root'
})
export class AppLoaderService {

  isLoading = false;
  constructor(
    public loadingController: LoadingController
  ) 
  { } 

  async loadingPresent(msg) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: msg,
      spinner: 'crescent' 
    }).then(a => {
      a.present().then(() => {
        console.log('loading presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort loading'));
        }
      });
    });
  }

  async loadingDismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('loading dismissed'));
  }
}
