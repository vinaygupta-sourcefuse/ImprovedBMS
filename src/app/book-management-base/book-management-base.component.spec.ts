import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookManagementBaseComponent } from './book-management-base.component';

describe('BookManagementBaseComponent', () => {
  let component: BookManagementBaseComponent;
  let fixture: ComponentFixture<BookManagementBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookManagementBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookManagementBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
