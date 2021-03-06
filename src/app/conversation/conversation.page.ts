import { Component, OnInit, ViewChild } from '@angular/core';
import { AppLoaderService } from 'src/common/app-loader.service';
import { ApiService } from '../api/api.service';
import { CommonService } from '../services/common.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  public userWindow: any;
  public contactInfo: any = {}
  public showOptions: boolean = false;
  public messages: Array<any> = [];
  public avaterChat:string ="";
  public sendMsgData:string ="";
  @ViewChild('content') private content: any;


  constructor(  private common:CommonService,
    private loadingService : AppLoaderService,
    private api : ApiService) { }

  ngOnInit() {
    this.getUserChatList();
    this.scrollToBottomOnInit();
    
  }


  getUserChatList(){
    this.userWindow = this.common.currentUserChatWndw;
    this.contactInfo = {
      name: this.userWindow.user.name,
      status: 'Online'
    }
    this.avaterChat = this.userWindow.user.avatar;
    console.log(this.avaterChat);
    this.userWindow.allMsg.msg.forEach(text => {
      this.messages.push( { text: text.chat_msg, type: text.chat_type, created: this.api.formatAMPM(text.chat_time) });
    });
    this.scrollToBottomOnInit();
   
  }
  scrollToBottomOnInit() {
    setTimeout(() => {
            this.content.scrollToBottom(600);
    }, 500);
}

  sendMsg(){
    if(this.sendMsgData !==""){
      let fromMobile= "+919965086619"        //this.common.mobileNumber;
      let toMobile = this.userWindow.user.name
      let chatlistsend ={
        chat_from:fromMobile,
        chat_to: toMobile,
        chat_msg:this.sendMsgData,
        chat_type:"send",
        chat_time:Date.now()
      }
      let postListRef = firebase.database().ref('stringapp').child(fromMobile);
      postListRef.child(toMobile).push(chatlistsend);

      let chatlistreceive ={
        chat_from:fromMobile,
        chat_to: toMobile,
        chat_msg:this.sendMsgData,
        chat_type:"received",
        chat_time:Date.now()
      }
      let postListRefRec = firebase.database().ref('stringapp').child(toMobile);
      postListRefRec.child(fromMobile).push(chatlistreceive);
      this.messages.push( { text: this.sendMsgData, type: "send", created: this.api.formatAMPM(Date.now()) });
      this.sendMsgData ="";
    }
    
  }

  showOptionsToggle(value?: boolean) {
    if (value !== undefined) {
      this.showOptions = value;
      return;
    }
    this.showOptions = !this.showOptions;
  }
  showContactProfile(){
    
  }
}
