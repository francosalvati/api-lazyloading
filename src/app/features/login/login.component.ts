import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginFormValue } from 'src/app/models';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm:  FormGroup;
  show: any = false
  pista: string = 'admin@admin.com, 12345'

  mostrar = true;

  emailControl:FormControl = new FormControl('',[
    Validators.required,
    Validators.email
  ])

  passwordControl:FormControl = new FormControl('',[
    Validators.required
  ])

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
    ){

    this.loginForm = formBuilder.group({
      email: this.emailControl,
      password: this.passwordControl,
    })
  }

  onSubmit(): void{
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched()
    }else{
      this.show = this.authService.login(this.loginForm.value as LoginFormValue)

    }
  }

  handleMostrar(){
    this.mostrar = !this.mostrar
  }

}
