/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeeService } from './service';
import { State } from './data';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: EmployeeService, useValue: getEmployeeService() }]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Address book');
  }));
});

function getEmployeeService() {
  return new EmployeeService(new State());
}
