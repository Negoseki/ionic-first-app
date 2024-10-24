import { ScrollingModule } from '@angular/cdk/scrolling';
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
  IonInfiniteScrollContent,
  IonInfiniteScroll,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

const PAGE_SIZE = 30;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
  standalone: true,
  providers: [CallNumber],
  imports: [
    IonInfiniteScroll,
    IonInfiniteScrollContent,
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
    ScrollingModule,
  ],
})
export class ContactsPage implements OnInit {
  callNumber = inject(CallNumber);
  contacts: ContactPayload[] = [];
  allContacts: ContactPayload[] = [];
  page: number = 0;

  constructor() {
    addIcons({ add });
  }

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
    this.allContacts = result.contacts.filter((c) => c.name);
    this.contacts = this.allContacts.slice(0, PAGE_SIZE);
    this.page = 1;
  }

  async callContactNumber(contact: ContactPayload): Promise<void> {
    const callNumber = contact.phones?.[0]?.number;
    if (!callNumber) return;

    await this.callNumber.callNumber(callNumber, false).catch(console.log);
  }

  async infiniteScroll(ev: InfiniteScrollCustomEvent): Promise<void> {
    const totalPageSize = this.page * PAGE_SIZE;

    console.log({ totalPageSize });

    if (!this.allContacts || totalPageSize > this.allContacts?.length) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.contacts = [
      ...this.contacts,
      ...this.allContacts.slice(totalPageSize, totalPageSize + PAGE_SIZE),
    ];
    this.page++;
    console.log('contacts', this.contacts);
    await ev.target.complete();
  }
}
