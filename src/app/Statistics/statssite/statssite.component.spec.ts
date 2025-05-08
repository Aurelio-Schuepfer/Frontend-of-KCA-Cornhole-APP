import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatssiteComponent } from './statssite.component';

describe('StatssiteComponent', () => {
  let component: StatssiteComponent;
  let fixture: ComponentFixture<StatssiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatssiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatssiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
