import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/angular/standalone';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-local-notification',
  templateUrl: './local-notification.page.html',
  styleUrls: ['./local-notification.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class LocalNotificationPage implements OnInit {
  async ngOnInit(): Promise<void> {
    await LocalNotifications.requestPermissions();
  }

  async scheule(): Promise<void> {
    const platform = await Capacitor.getPlatform();
    if (platform !== 'android') {
      return; 
    }

    await LocalNotifications.createChannel({
      id: '1',
      name: 'local notifications',
      sound: 'sound.wav',
    });

    const notify = await LocalNotifications.schedule({
      notifications: [
        {
          id: 1,
          title: 'Native Plugins App',
          body: 'Checking local notification',
          schedule: { at: new Date(Date.now() + 5000) },
          sound: 'sound.wav',
        },
      ],
    });
    console.log('Notification: ', notify);
  }
}
