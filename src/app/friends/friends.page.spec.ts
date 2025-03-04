import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { FriendsPage } from './friends.page';

describe('FolderPage', () => {
  let component: FriendsPage;
  let fixture: ComponentFixture<FriendsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendsPage],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(FriendsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
