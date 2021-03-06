import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public mobileNumber:any;
  public userName:any;
  public profilePic:any;
  public mobile_details: any ={};
  public selected_country: any =[];
  public userProfileLoad: any =[];
  public currentUserChatWndw: any =[];

  constructor() { }
}
