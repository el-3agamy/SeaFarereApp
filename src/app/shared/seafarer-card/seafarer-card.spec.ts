import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeafarerCard } from './seafarer-card';

describe('SeafarerCard', () => {
  let component: SeafarerCard;
  let fixture: ComponentFixture<SeafarerCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeafarerCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeafarerCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
