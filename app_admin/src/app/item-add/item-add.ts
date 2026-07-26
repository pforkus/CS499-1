import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Items } from '../services/items';

@Component({
  selector: 'app-item-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-add.html',
  styleUrl: './item-add.css',
})
export class ItemAdd {
  public addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private itemsService: Items
  ) {
    this.addForm = this.formBuilder.group({
      sku: [''],
      name: ['', Validators.required],
      category: [''],
      price: [''],
      quantity: ['', Validators.required],
      description: [''],
    });
  }

  public onSubmit() {
    this.submitted = true;

    if (this.addForm.valid) {
      this.itemsService.addItem(this.addForm.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        });
    }
  }

  public onCancel() {
    this.router.navigate([""]);
  }

  get f() { return this.addForm.controls; }
}