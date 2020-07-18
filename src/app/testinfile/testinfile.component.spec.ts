import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { TestinfileComponent } from './testinfile.component';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('TestingComponent', () => {
  let component: TestinfileComponent;
  let fixture: ComponentFixture<TestinfileComponent>;
  let debug: DebugElement;
  let html_element: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TestinfileComponent ],
imports: [
  BrowserModule,
  FormsModule,
  ReactiveFormsModule
]
}).compileComponents().then(()=>{
  fixture = TestBed.createComponent(TestinfileComponent);
  component = fixture.componentInstance;
  
  debug = fixture.debugElement.query(By.css('form'));
  html_element= debug.nativeElement;

});
  });
it('should have as text contact page',()=>{
  expect(component.test).toBe('Contact page');
});

it('should set submitted to true',()=>{
  component.onSubmit();
  expect(component.submitted).toBeTruthy();
});
it('should call the onSubmit method', ()=>{
fixture.detectChanges();
spyOn(component,'onSubmit');
html_element = fixture.debugElement.query(By.css('button')).nativeElement;
html_element.click();
expect(component.onSubmit).toHaveBeenCalledTimes(0);
});

it('form should be invalid',()=>{
  component.contactForm.controls['name'].setValue('');
  component.contactForm.controls['email'].setValue('');
  component.contactForm.controls['text'].setValue('');
  expect(component.contactForm.valid).toBeFalsy();
});

it('Form should be valid',()=>{
  component.contactForm.controls['name'].setValue('Enam');
  component.contactForm.controls['email'].setValue('enam@abc.com');
  component.contactForm.controls['text'].setValue('text');
  expect(component.contactForm.valid).toBeTruthy();
})


  
});

