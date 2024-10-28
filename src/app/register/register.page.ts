import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonSelect, IonSelectOption, IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonInput, IonIcon, IonButton, IonItem, IonLabel, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { globeOutline, personOutline, mailOutline, lockClosedOutline, languageOutline } from 'ionicons/icons'
import { UserService } from '../services/user.service';
import { UtilService } from '../services/util.service';
import { Country, Language } from '../interface';
import { CountryService } from '../services/country.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonText, IonLabel, IonItem, IonButton, IonSelect, IonSelectOption, IonIcon, IonInput, IonRow, IonCol, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  ngOnInit(){
    this.load()
  }

  constructor(
    private fb: FormBuilder,
    private usr: UserService,
    private utl: UtilService,

    private cnt: CountryService,
    private lng: LanguageService
  ) {
    addIcons({globeOutline, personOutline, mailOutline, lockClosedOutline, languageOutline})
    this.registerForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z\s]+$/),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
        ],
      ],
      repeat_password: [
        '',
        [Validators.required],
      ],
      country: ['', Validators.required],
      language: ['en', Validators.required],
    }, {
      validators: this.passwordMatchValidator,
    });
  }

  async onRegister() {
    if (this.registerForm.valid) {
      await this.utl.showLoader();
      try {
        const response = await this.usr.register(this.registerForm.value);
        this.utl.showToast(response.msg);
      } catch (error) {
        this.utl.showAlert('Registration Failed', 'An error occurred while registering.');
      } finally {
        this.utl.hideLoader();
      }
    } else {
      this.utl.showAlert('Invalid Input', 'Please fill out the form correctly.');
    }
  }

  countries: Country[] = []
  languages: Language[] = []
  async load(){
    this.countries = await this.cnt.getAll()
    this.languages = await this.lng.getAll()
  }

  private passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeat_password')?.value;
    return password === repeatPassword ? null : { passwordMismatch: true };
  }

  // Convenience getter for easier access to form fields in the template
  get f() {
    return this.registerForm.controls;
  }

}
