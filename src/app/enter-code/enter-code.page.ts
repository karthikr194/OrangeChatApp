import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from '../services/common.service';
import * as firebase from 'firebase';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-enter-code',
  templateUrl: './enter-code.page.html',
  styleUrls: ['./enter-code.page.scss'],
})
export class EnterCodePage implements OnInit {

  public userName: string = "";
  public phone: string = "";
  public db: any;
  public selectedCountry:any;
  public mobileDetails:any;
  public profiletype: boolean = true;
  public viewpublic: boolean = false;

  constructor(
    private navCtrl: NavController,
    private common:CommonService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.phone = this.common.mobileNumber;
    this.selectedCountry = this.common.selected_country;
    this.mobileDetails = this.common.mobile_details;
    this.db = firebase.firestore();//firebase.database();
  }

  async enterToTabsPage () 
  {
    if(this.userName && this.userName !=null){
      let avatar = this.userName.split(" ").join('+');
      this.db.collection("users").doc(this.phone).set({
        name: this.userName,
        id: this.phone,
        mobile: this.phone,
        set_private: this.profiletype,
        view_public_prof:this.viewpublic,
        avatar: 'https://ui-avatars.com/api/?name='+avatar,
        country: this.selectedCountry[0].name,
        dial_code: this.selectedCountry[0].dial_code,
        country_code:this.selectedCountry[0].code,
        registered_time:firebase.firestore.FieldValue.serverTimestamp()
      });
      let userProfile =await this.db.collection("users").where("id", "==", this.phone) 
      .onSnapshot((querySnapshot)=> {
          querySnapshot.forEach((doc)=> {
              // doc.data() is never undefined for query doc snapshots
              let data = doc.data();
              if(data && data.logged_in_time != null){
                console.log(doc.data());
              }
          });
        });
        console.log(userProfile);
      this.navCtrl.navigateRoot('tabs/tabs')
    } else{
      this.openSnackBar("Please enter the user name","");
    }
  }

  
  openSnackBar(message: string, action: string) {
    //this._snackBar.open(message, action, {verticalPosition: 'bottom', horizontalPosition: 'end', duration: 800000,});
    // this.showPrompt(message);
    this._snackBar.open(message,action, {
      verticalPosition: 'bottom',
      duration: 6000,
      panelClass: ['blue-snackbar']
    });
  }

}
