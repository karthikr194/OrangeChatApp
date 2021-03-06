import { Component, OnInit } from '@angular/core';
import { countryCodes } from 'src/common/CountryCodes';
import { Platform, NavController } from '@ionic/angular';
import { SnackbarService } from '../services/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as firebase from 'firebase';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import {  NavParams, AlertController  } from '@ionic/angular';
import { CommonService } from '../services/common.service';
import { AppLoaderService } from 'src/common/app-loader.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public countries: Array<any> = countryCodes;
  public confirmData: any = { code: '+91',mobile:'' }
  public logoPath = "assets/imgs/logo.png";
  recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  db:any;
  public mobile:any ="";
  public showRegisterPage:boolean = false;

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private _snackBar: MatSnackBar,
    private alertCtrl: AlertController,
    private common:CommonService,
    private loadingService : AppLoaderService
  ) {
    if (!this.platform.is('cordova')) this.logoPath = `/${this.logoPath}`;
    this.db = firebase.firestore();//firebase.database();

    
  }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          // reCAPTCHA solved - will proceed with submit function
          console.log(response);
        },
        "expired-callback": function () {
          // Reset reCAPTCHA?
        },
      }
    );
    
    let user = localStorage.getItem('loggedIn');
    console.log(user);
    if(user ==="true"){
      let mobileNo = localStorage.getItem('mobile');
      this.getMobileUserData(mobileNo);
    }else{
      this.showRegisterPage = true;
    }
  }

  async getMobileUserData(mobileNo){
    const snapshot = await firebase.firestore().collection('users').where("id", "==", mobileNo).get();
   let userList = [];
    snapshot.forEach(doc => {
      userList.push(doc.data());
    });
    console.log("received user data "+ userList)
    if(userList && userList.length>0){
      this.common.userProfileLoad = userList[0];
      localStorage.setItem('userProfileLoad', JSON.stringify(userList[0])); 
      this.navCtrl.navigateRoot('tabs/tabs');
    }else{
      this.showRegisterPage = true;
    }
  }

  signIn(mobileNo:any,country:any){
    
    let appVerifier = this.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(mobileNo,appVerifier).then(async (confirmationResult) =>{
      let prompt = await this.alertCtrl.create({
        header: 'Enter the One Time Password',
        inputs: [{name:'ConfirmationCode',placeholder:'Confirmation Code' }],
        buttons: [{
          text:'Cancel',handler:data=>{
            this.mobile =""
            console.log('Cancel clicked');
          }
        },
        {
          text:'Send',handler:data=>{
            confirmationResult.confirm(data.ConfirmationCode).then(async (result)=>{
              this.loadingService.loadingPresent("Please Wait! We are loading your Profile");
              let userData:any;
              this.common.mobileNumber = mobileNo;
              this.common.mobile_details = this.confirmData
              this.common.selected_country = country;
              let userProfile = await this.db.collection("users").where("id", "==", mobileNo) 
              .onSnapshot((querySnapshot)=> {
                  querySnapshot.forEach((doc)=> {
                      // doc.data() is never undefined for query doc snapshots
                      let data = doc.data();
                      if(data && data.registered_time != null){
                        userData = doc.data();
                        localStorage.setItem('loggedIn', "true"); 
                        localStorage.setItem('mobile', mobileNo); 
                        localStorage.setItem('userProfileLoad', JSON.stringify(userData)); 
                        this.common.userProfileLoad = userData;
                        if(userData){
                          this.navCtrl.navigateRoot('tabs/tabs');
                        }else{
                          this.navCtrl.navigateRoot('enter-code')
                        }
                        this.loadingService.loadingDismiss();
                      }
                  });
                });
             
            });
          }
        }]
        
      });
      //this.loadingService.loadingDismiss();
      await prompt.present();
    }).catch(function(error){
      console.log("SMS not sent "+error);
     // this.openSnackBar("Technical issue occured - Error in sending SMS.","")
      this.showPrompt(error)
    }
    )
  }

  async onSignInSubmit()
  {
    const data: any = {};
    data.code = this.confirmData.code,
    data.mobile = this.confirmData.mobile,
    console.log(data);
    if(!!data.code && !!data.mobile){
      //this.loadingService.loadingPresent("Validating the entered mobile number");
      this.mobile = data.code+''+data.mobile
      let country = this.countries.filter(obj => obj.dial_code === this.confirmData.code)
      this.signIn(this.mobile,country);
    }else{
      this.openSnackBar("Please enter mobile number","")
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

  async showPrompt(error) {
    const alert = await this.alertCtrl.create({
      cssClass: 'popupClass',
      header: 'eMessage Error',
      message: error,
      buttons: ['OK']
    });

    await alert.present();
  }

}
