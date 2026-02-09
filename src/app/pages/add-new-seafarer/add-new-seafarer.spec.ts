import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSeafarer } from './add-new-seafarer';

describe('AddNewSeafarer', () => {
  let component: AddNewSeafarer;
  let fixture: ComponentFixture<AddNewSeafarer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewSeafarer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewSeafarer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
