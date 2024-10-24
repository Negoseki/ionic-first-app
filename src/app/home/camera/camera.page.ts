import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar, IonCol } from '@ionic/angular/standalone';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
  standalone: true,
  imports: [IonCol, 
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class CameraPage {
  photo?: Photo;

  checkPlatformForWeb(): boolean {
    return !Capacitor.isNativePlatform();
  }

  async takePhoto(): Promise<void> {
    const status = await Camera.requestPermissions();

    if (status.camera === 'denied') {
      return;
    }

    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      quality: 90,
      // allowEditing: true,
      source: CameraSource.Prompt,
    });

    this.photo = photo;
  }

  sharePhoto(): void {
    if (!this.photo?.path) return;

    Share.share({
      dialogTitle: 'Share my Photo!', // Only works on Android
      text: 'See my photo here',
      files: [this.photo.path],
    });
  }
}
