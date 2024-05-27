import {Component, Input} from "@angular/core";
import {User} from "../users/user";
import {AuthService} from "../users/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent{

  @Input() users: User[] = [];

 title:string = 'App Angular'
  token: string;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  get login(){
   return this.authService.user;
  }

  get admin(){
   return this.authService.isAdmin();
  }

  handlerLogout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
