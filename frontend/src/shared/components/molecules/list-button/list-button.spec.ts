import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListButton } from './list-button';
import { By } from '@angular/platform-browser';

describe('ListButton', () => {
  let component: ListButton;
  let fixture: ComponentFixture<ListButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListButton],
    }).compileComponents();

    fixture = TestBed.createComponent(ListButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set input properties correctly', () => {
    component.text = 'Test Button';
    component.iconName = 'test-icon';
    component.isSelected = true;
    component.openOptionsOnIconClick = true;
    fixture.detectChanges();

    expect(component.text).toBe('Test Button');
    expect(component.iconName).toBe('test-icon');
    expect(component.isSelected).toBe(true);
    expect(component.openOptionsOnIconClick).toBe(true);
  });

  it('should emit onClickButton event when button is clicked', () => {
    jest.spyOn(component.onClickButton, 'emit');

    const button = fixture.debugElement.query(By.css('.button__text'));
    button.triggerEventHandler('onClick', null);

    expect(component.onClickButton.emit).toHaveBeenCalled();
  });

  it('should emit onClickIcon event when icon is clicked', () => {
    component.iconName = 'test-icon';
    component.isHovering = true;
    fixture.detectChanges();

    jest.spyOn(component.onClickIcon, 'emit');
    const iconButton = fixture.debugElement.query(By.css('.button__icon'));
    iconButton.triggerEventHandler('onClick', null);
    expect(component.onClickIcon.emit).toHaveBeenCalled();
  });

  it('should show icon when isHovering is true and iconName is not empty', () => {
    component.iconName = 'test-icon';
    component.isHovering = true;
    fixture.detectChanges();

    const iconButton = fixture.debugElement.query(By.css('.button__icon'));
    expect(iconButton).toBeTruthy();
  });

  it('should not show icon when isHovering is false', () => {
    component.iconName = 'test-icon';
    component.isHovering = false;
    fixture.detectChanges();

    const iconButton = fixture.debugElement.query(By.css('.button__icon'));
    expect(iconButton).toBeFalsy();
  });

  it('should not show icon when iconName is empty', () => {
    component.iconName = '';
    component.isHovering = true;
    fixture.detectChanges();

    const iconButton = fixture.debugElement.query(By.css('.button__icon'));
    expect(iconButton).toBeFalsy();
  });
});
