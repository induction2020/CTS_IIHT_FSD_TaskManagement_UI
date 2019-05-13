import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMaintainComponent } from './user-maintain.component';

describe('UserMaintainComponent', () => {
  let component: UserMaintainComponent;
  let fixture: ComponentFixture<UserMaintainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMaintainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
