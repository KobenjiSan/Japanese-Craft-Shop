import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNavColumnComponent } from './admin-nav-column.component';

describe('AdminNavColumnComponent', () => {
  let component: AdminNavColumnComponent;
  let fixture: ComponentFixture<AdminNavColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNavColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNavColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
