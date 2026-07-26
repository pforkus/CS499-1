import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAdd } from './item-add';

describe('ItemAdd', () => {
  let component: ItemAdd;
  let fixture: ComponentFixture<ItemAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
