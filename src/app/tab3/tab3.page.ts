import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public contactsList: Array<any> = [];
  public loadUserData:any;
  public db:any;
  public getPublicUsers :any=[];

  constructor(
    private navCtrl: NavController,
    private common:CommonService,
  ) {
    this.db = firebase.firestore();//firebase.database();
  }

  
  
  ngOnInit() {
    this.loadUserData = JSON.parse(localStorage.getItem("userProfileLoad"));
    this.common.userProfileLoad = this.loadUserData;
    console.log(this.loadUserData);
    
  }

  logoutFromApp(){
    localStorage.removeItem('userProfileLoad'); 
    localStorage.removeItem('loggedIn'); 
    localStorage.removeItem('mobile'); 
    this.navCtrl.navigateRoot('signup');
    
    //  if (this.afAuth.currentUser) {
    //     this.afAuth.signOut()
    //       .then(() => {
    //         console.log("LOG Out");
    //         resolve();
    //       }).catch((error) => {
    //         reject();
    //       });
    //   }
    // })
  }
  

}
