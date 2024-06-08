import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarTurnoPage } from './editar-turno.page';

describe('EditarTurnoPage', () => {
  let component: EditarTurnoPage;
  let fixture: ComponentFixture<EditarTurnoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTurnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
