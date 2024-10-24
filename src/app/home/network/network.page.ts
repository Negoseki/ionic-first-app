import { JsonPipe } from '@angular/common';
import { Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PluginListenerHandle } from '@capacitor/core';
import { ConnectionStatus, Network } from '@capacitor/network';
import { Toast } from '@capacitor/toast';
import {
  IonCard,
  IonCol,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonButtons,
    IonButton,
    IonCard,
    IonCol,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    JsonPipe,
    RouterLink,
  ],
})
export class NetworkPage implements OnInit, OnDestroy {
  private networkListner?: PluginListenerHandle;
  private ngZone = inject(NgZone);
  status?: ConnectionStatus;

  async ngOnInit(): Promise<void> {
    this.networkListner = await Network.addListener(
      'networkStatusChange',
      (status) => {
        console.log('Newtwork status changed: ', status);
        this.ngZone.run(() => {
          this.changeStatus(status);
        });
      }
    );
    const status = await Network.getStatus();
    this.changeStatus(status);
    console.log('Network status: ', status);
  }

  ngOnDestroy(): void {
    this.networkListner?.remove();
  }

  changeStatus(status: ConnectionStatus): void {
    this.status = status;
    Toast.show({ text: this.status.connected ? 'Online' : 'Offline' });
  }
}
