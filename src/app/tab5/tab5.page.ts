import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tab5",
  templateUrl: "./tab5.page.html",
  styleUrls: ["./tab5.page.scss"],
})
export class Tab5Page implements OnInit {
  public contactsList: Array<any> = [];

  lat: any;
  lang: any;
  elementMap: HTMLElement;

  constructor(
  ) {
    //this.createMap();
  }

  ngOnInit() {
  }

  
}
