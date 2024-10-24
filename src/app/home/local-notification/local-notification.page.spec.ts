import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalNotificationPage } from './local-notification.page';

describe('LocalNotificationPage', () => {
  let component: LocalNotificationPage;
  let fixture: ComponentFixture<LocalNotificationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalNotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
