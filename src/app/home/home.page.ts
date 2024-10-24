import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCol,
  IonCard,
  IonButton,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonCard,
    IonCol,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    RouterLink,
  ],
})
export class HomePage {
  share(): void {
    Share.share({
      dialogTitle: 'Share cool stuff!', // Only works on Android
      text: 'Text to be shared',
      url: 'https://negoseki.tech',
    });

    // Working with web:
    // navigator.share({ text: 'teste' });
  }
}
