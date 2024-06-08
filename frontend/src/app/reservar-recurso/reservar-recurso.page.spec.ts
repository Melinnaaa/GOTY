import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservarRecursoPage } from './reservar-recurso.page';

describe('ReservarRecursoPage', () => {
  let component: ReservarRecursoPage;
  let fixture: ComponentFixture<ReservarRecursoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservarRecursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
