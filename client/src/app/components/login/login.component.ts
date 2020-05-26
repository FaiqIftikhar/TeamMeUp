import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    dataRcvd:any = {};
    messageClass;
    message;
    processing = false;
    roleSelect = false;
    form: FormGroup;
    prevUrl;
    Role = 'player';



    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private authGuard: AuthGuard ) {
        this.createForm();
    }

    createForm() {
        this.form = this.formBuilder.group({
          username: ['', Validators.required], 
          password: ['', Validators.required] 
        });
    }

    disableForm() {
        this.form.controls['username'].disable(); 
        this.form.controls['password'].disable(); 
    }

    enableForm() {
        this.form.controls['username'].enable();
        this.form.controls['password'].enable();
    }

    onLoginSubmit() {
        this.processing = true;
        this.disableForm(); 
        const user = {
          username: this.form.get('username').value,
          password: this.form.get('password').value,
          role: this.Role
        }
    
        // Function to send login data to API
        this.authService.login(user).subscribe(data => {
          this.dataRcvd = data;
          console.log(this.dataRcvd);
          if (!this.dataRcvd.success) {
            this.messageClass = 'alert alert-danger';
            this.message = this.dataRcvd.message;
            this.processing = false;
            this.enableForm();
          } else {
            this.messageClass = 'alert alert-success';
            this.message = this.dataRcvd.message;
            this.authService.storeUserData(this.dataRcvd.token, this.dataRcvd.user);
            setTimeout(() => {
              if(this.prevUrl) this.router.navigate([this.prevUrl]);
              else{
                // if (this.dataRcvd.user.lastLogin == null && this.Role == 'player') {
                //   this.router.navigate(['/dashboard']);
                // }
                if (this.Role == 'player' && this.dataRcvd.user.lastLogin == null) this.router.navigate(['/dashboard']);
                else if (this.Role == 'player') this.router.navigate(['/profile']);
                else if (this.Role == 'coach') this.router.navigate(['/home']);
                else this.router.navigate(['/dashboard']);
              }
            }, 2000);
          }
        });
      }
      
      selectRole(val) {
        if (val.target.value == -1) {
          this.roleSelect = false;
        }
        else {
          this.roleSelect = true;
          this.Role = val.target.value;
        }
      }


    ngOnInit(): void {
      if (this.authGuard.redirectUrl) {
        this.messageClass = 'alert alert-danger';
        this.message = 'You must be logged in to view that page.'
        this.prevUrl = this.authGuard.redirectUrl;
        this.authGuard.redirectUrl = undefined;
      }
    }
}