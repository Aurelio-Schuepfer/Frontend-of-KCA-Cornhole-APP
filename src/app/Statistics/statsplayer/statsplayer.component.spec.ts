import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsplayerComponent } from './statsplayer.component';

describe('StatsplayerComponent', () => {
  let component: StatsplayerComponent;
  let fixture: ComponentFixture<StatsplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatsplayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
