import { Component } from '@angular/core';
import { IOnExit } from '../../../guards/exit-guard';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements IOnExit {

  onExit() {
    const rta = window.confirm('¿Estás seguro de salir?');
    return rta;
  }

}
