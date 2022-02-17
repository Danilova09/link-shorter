import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  @ViewChild('form') form!: NgForm;

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
