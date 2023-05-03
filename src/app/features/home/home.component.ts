import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  usuarios!: User[];

  constructor(
    private userService: UserService,
    private authService: AuthService
    ) {
      userService.getUsers().subscribe(usuario => this.usuarios = usuario)
  }
  ngOnInit(): void {
    this.authService.verificarToken()
  }


  getUsers() {
    this.userService.getUsers().subscribe( user => {
      this.usuarios = user
    })
  }

  exit(){
    this.authService.logout()
  }
}
