import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeParagraph } from './code-paragraph';

describe('CodeParagraph', () => {
  let component: CodeParagraph;
  let fixture: ComponentFixture<CodeParagraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeParagraph]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeParagraph);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
