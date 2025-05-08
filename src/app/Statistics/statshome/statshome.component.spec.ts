import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatshomeComponent } from './statshome.component';

describe('StatshomeComponent', () => {
  let component: StatshomeComponent;
  let fixture: ComponentFixture<StatshomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatshomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
