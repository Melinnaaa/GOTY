import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminRecursosPage } from './admin-recursos.page';

describe('AdminRecursosPage', () => {
  let component: AdminRecursosPage;
  let fixture: ComponentFixture<AdminRecursosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRecursosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
