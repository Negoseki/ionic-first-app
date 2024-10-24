import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'network',
    loadComponent: () =>
      import('./home/network/network.page').then((m) => m.NetworkPage),
  },
  {
    path: 'camera',
    loadComponent: () =>
      import('./home/camera/camera.page').then((m) => m.CameraPage),
  },
  {
    path: 'contacts',
    loadComponent: () => import('./home/contacts/contacts.page').then( m => m.ContactsPage)
  },
  {
    path: 'local-notification',
    loadComponent: () => import('./home/local-notification/local-notification.page').then( m => m.LocalNotificationPage)
  },
];
