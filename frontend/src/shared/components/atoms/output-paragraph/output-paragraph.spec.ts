import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputParagraph } from './output-paragraph';

describe('OutputParagraph', () => {
  let component: OutputParagraph;
  let fixture: ComponentFixture<OutputParagraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutputParagraph]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputParagraph);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
