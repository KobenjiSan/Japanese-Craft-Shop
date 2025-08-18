import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedByListCardComponent } from './liked-by-list-card.component';

describe('LikedByListCardComponent', () => {
  let component: LikedByListCardComponent;
  let fixture: ComponentFixture<LikedByListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikedByListCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikedByListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
