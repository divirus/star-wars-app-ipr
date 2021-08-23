import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatableElementsComponent } from './relatable-elements.component';

describe('RelatableElementsComponent', () => {
  let component: RelatableElementsComponent;
  let fixture: ComponentFixture<RelatableElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatableElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatableElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
