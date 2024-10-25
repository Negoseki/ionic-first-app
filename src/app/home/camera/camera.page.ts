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
  IonCol,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
  standalone: true,
  imports: [
    IonCol,
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

  async canTakePhoto(): Promise<boolean> {
    if (Capacitor.isNativePlatform()) {
      const status = await Camera.requestPermissions();

      if (status.camera === 'denied') {
        return false;
      }
    }

    return true;
  }

  async takePhoto(): Promise<void> {
    const canTake = await this.canTakePhoto();
    if (!canTake) {
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

  async sharePhoto(): Promise<void> {
    console.log({ photo: this.photo });

    const photoUrl = Capacitor.isNativePlatform()
      ? this.photo?.path
      : this.photo?.webPath;

    if (!photoUrl) {
      return;
    }

    let photoFile: File | string = photoUrl;

    if (photoUrl.startsWith('blob:')) {
      const file = await this.getPhotoFile(
        photoUrl,
        this.photo?.format ?? 'jpeg',
      );

      if (!file) {
        return;
      }

      photoFile = file;
    }

    console.log({ photoFile });
    if (photoFile instanceof File) {
      navigator.share({
        text: 'See my photo here',
        files: [photoFile],
      });

      return;
    }

    Share.share({
      dialogTitle: 'Share my Photo!', // Only works on Android
      text: 'See my photo here',
      files: [photoFile], // Only for iOS and Android
    });
  }

  private async getPhotoFile(
    fileUrl: string,
    format: string,
  ): Promise<File | null> {
    const response = await fetch(fileUrl);

    if (!response.ok) {
      return null;
    }

    const blob = await response.blob();

    const file = new File([blob], `photo_${Date.now()}.${format}`, {
      type: 'image/' + format,
    });

    return file;
  }
}
