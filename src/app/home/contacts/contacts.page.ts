import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { ContactPayload, Contacts } from '@capacitor-community/contacts';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
  standalone: true,
  providers: [CallNumber],
  imports: [
    IonIcon,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonBackButton,
    IonButtons,
    IonItem,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class ContactsPage implements OnInit {
  callNumber = inject(CallNumber);
  contacts?: ContactPayload[];

  ngOnInit() {
    this.getContacts();
  }

  async getContacts(): Promise<void> {
    const permission = await Contacts.requestPermissions();

    console.log('permission', permission.contacts);

    if (permission.contacts === 'denied') {
      return;
    }

    const result = await Contacts.getContacts({
      projection: { name: true, phones: true },
    });

    console.log('Contacts: ', result);
    this.contacts = result.contacts;
  }

  async callContactNumber(contact: ContactPayload): Promise<void> {
    const callNumber = contact.phones?.[0]?.number;
    if (!callNumber) return;

    await this.callNumber.callNumber(callNumber, false).catch(console.log);
  }
}
