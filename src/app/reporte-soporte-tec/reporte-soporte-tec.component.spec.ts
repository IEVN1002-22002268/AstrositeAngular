import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSoporteTecComponent } from './reporte-soporte-tec.component';

describe('ReporteSoporteTecComponent', () => {
  let component: ReporteSoporteTecComponent;
  let fixture: ComponentFixture<ReporteSoporteTecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteSoporteTecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteSoporteTecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
