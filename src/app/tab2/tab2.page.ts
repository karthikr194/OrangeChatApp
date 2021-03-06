import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import {
  Contacts,
  Contact,
  ContactField,
  ContactName,
} from "@ionic-native/contacts";
@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
  providers: [Contacts],
})
export class Tab2Page {
  public contactsList: Array<any> = [
    {
      name: "Bar",
      avatar: "https://ui-avatars.com/api/?name=Bar",
      status: "Idk",
    },
  ];
  public contact = {
    displayName: null,
    phoneNumbers: null,
    birthday: null,
  };

  constructor(private navCtrl: NavController, private contacts: Contacts) {}

  ngOnInit() {
    //this.initContacts();
    this.selectContact();
  }

  selectContact() {
    this.contacts.pickContact().then((contact) => {
      alert("contacts:-->" + JSON.stringify(contact));
      this.contact.displayName = contact.displayName;
      this.contact.phoneNumbers = contact.phoneNumbers[0].value;
      contact.birthday = contact.birthday;
    });
  }

  initContacts(): void {
    let contact: Contact = this.contacts.create();

    contact.name = new ContactName(null, "Smith", "John");
    contact.phoneNumbers = [new ContactField("mobile", "6471234567")];
    contact.save().then(
      () => console.log("Contact saved!", contact),
      (error: any) => console.error("Error saving contact.", error)
    );

    // If you want to open the native contacts screen and select the contacts from there use pickContact()

    this.contacts.pickContact().then((response: Contact) => {
      console.log(response);
    });
  }

  private showConversationPage() {
    this.navCtrl.navigateForward("conversation");
  }
}
