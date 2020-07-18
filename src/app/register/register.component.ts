import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import { AlertService, UserService, AuthenticationService } from '../_services';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    // minDate: Date;
    // maxDate: Date;
    minDate = new Date(12,12,1920);
    maxDate = new Date();
    
    
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    //     this.minDate = new Date();
    // this.maxDate = new Date();
    // this.minDate.setDate(this.minDate.getDate() - 1);
    // this.maxDate.setDate(this.maxDate.getDate() + 7);
    }

ngOnInit() {
this.registerForm = this.formBuilder.group({
firstName: ['', [Validators.required]],
lastName: ['', [Validators.required]],
username: ['', [Validators.required]],
emailId: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
phoneNumber: ['', Validators.required],
gender: ['',Validators.required],
dateBirth:['',Validators.required],
password: ['', [Validators.required, Validators.minLength(8)]],

street:['',Validators.required],
city: ['',Validators.required],
state:['',Validators.required ],
pinCode:['',[Validators.required, Validators.minLength(6),Validators.pattern('^[0-9]{6}(?:-[0-9]{4})?$')]],
country:['',Validators.required]
            
            
        });
           
    }
    // convenience getter for easy access to form fields
    get f() {
         return this.registerForm.controls; 
    }
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            alert("Form Not Valid");
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value).pipe(first()).subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}



