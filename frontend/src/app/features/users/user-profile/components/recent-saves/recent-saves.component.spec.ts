import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentSavesComponent } from './recent-saves.component';

describe('RecentSavesComponent', () => {
  let component: RecentSavesComponent;
  let fixture: ComponentFixture<RecentSavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentSavesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentSavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
