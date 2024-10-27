import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSelect, IonSelectOption, IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonInput, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { globeOutline, personOutline, mailOutline, lockClosedOutline, languageOutline } from 'ionicons/icons'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonButton, IonSelect, IonSelectOption, IonIcon, IonInput, IonRow, IonCol, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {

  constructor() { 
    addIcons({personOutline, mailOutline, lockClosedOutline, globeOutline, languageOutline})

  }

  ngOnInit() {
  }

  async on_submit(){
    console.log( "working" );
  }

}
