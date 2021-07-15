import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsMgntComponent } from './account-settings-mgnt.component';

describe('AccountSettingsMgntComponent', () => {
  let component: AccountSettingsMgntComponent;
  let fixture: ComponentFixture<AccountSettingsMgntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingsMgntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsMgntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
