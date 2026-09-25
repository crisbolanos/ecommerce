import { Component, inject, signal, OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from './services/auth';
import { Users } from './services/users'
import { Files } from './services/files';
import { RouterOutlet } from '@angular/router';
import { Token } from './services/token';


@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  imgParent = '';
  showImg = true;
  token = '';
  imgRta = signal<string>('');

  private authService = inject(Auth);
  private usersService = inject(Users);
  private filesService = inject(Files);
  private tokenService = inject(Token);

  ngOnInit() {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.profile().subscribe()
    }
  }


  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService.create({
      name: 'Cristian',
      email: 'cristian@email.com',
      password: '123456',
      role: 'customer'
    })
      .subscribe(rta => {
        console.log(rta);
      })
  }

  downloadPDF() {
    this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
      .subscribe(rta => {
        // console.log(rta);
      })
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file)
        .subscribe(rta => {
          this.imgRta.set(rta.location);
        })
    }
  }

}
