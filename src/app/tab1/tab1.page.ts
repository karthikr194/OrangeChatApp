import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AppLoaderService } from 'src/common/app-loader.service';
import { ApiService } from '../api/api.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public chatList: Array<any> = [];
  public db:any;
  public getPublicUsers :any=[];

  constructor(
    private navCtrl: NavController,
    private common:CommonService,
    private loadingService : AppLoaderService,
    private api : ApiService
  ) {
    this.db = firebase.firestore();//firebase.database();
  }
  
  ngOnInit() {
    let loadUserData = JSON.parse(localStorage.getItem("userProfileLoad"));
    this.common.userProfileLoad = loadUserData;
    this.getChatList();
  }

  async getChatList(){
    let fromMobile = localStorage.getItem('mobile');
    let toMobile ="+918610916551";
    // let chatlist ={
    //   chat_from:fromMobile,
    //   chat_to: toMobile,
    //   chat_msg:"hi Karthik",
    //   chat_type:"received",
    //   chat_time:Date.now()
    // }
    // let postListRef = firebase.database().ref('stringapp').child(fromMobile);
    // postListRef.child(toMobile).push(chatlist);
    this.loadingService.loadingPresent("Please Wait! We are loading your chat list");
    this.getLastChatMsg();
  }

  async getLastChatMsg(){
    let info =[];
    let fromMobile = localStorage.getItem('mobile');
    firebase.database().ref('stringapp').child(fromMobile).on('value', resp => {
   
     info =this.snapshotToObject(resp);
     console.log(info);
     for(let key in info){
        let messageKey =  info[key].msg;
        let message = messageKey[messageKey.length-1];
        console.log(message.chat_msg);

        this.chatList.push({
          user: { name: info[key].mobile, avatar: "https://e7.pngegg.com/pngimages/980/886/png-clipart-male-portrait-avatar-computer-icons-icon-design-avatar-flat-face-icon-people-head.png" },
          message: { snippet: message.chat_msg, created: this.api.formatAMPM(message.chat_time)},
          allMsg:{msg:messageKey}
        });
      }
    });
   
   
  }

  

  snapshotToObject = snapshot => {
    let item = snapshot.val();
    item.key = snapshot.key;
    let lastChatMsg =[];
    for (let i in item){
      let object = item[i]
      let chatMobile = i;
      let msg = [];
      for (let j in object ){
        let userMsg = object[j];
        if(!!userMsg && !!userMsg.chat_time){
          msg.push(userMsg);
        }
      }
      if(msg.length>0){
        lastChatMsg[chatMobile] = {mobile:chatMobile,msg:msg}
      }
    }
    this.loadingService.loadingDismiss();
    return lastChatMsg;
  }

  async getMarker() {
    const snapshot = await firebase.firestore().collection('users').where("view_public_prof", "==", true).get();
    this.getPublicUsers = [];
    snapshot.forEach(doc => {
       this.getPublicUsers.push(doc.data());
    });

    this.getPublicUsers.forEach(element => {
      this.chatList.push({
        user: { name: element.name, avatar: element.avatar },
        message: { snippet: 'See you later', created: '09:00 AM' }
      });
    });

}

  private showConversationPage (chat)
  {
    console.log(chat);
    this.common.currentUserChatWndw = chat;
    this.navCtrl.navigateForward('conversation')
  }

}
