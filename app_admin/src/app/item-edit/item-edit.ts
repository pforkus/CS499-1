import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Items } from '../services/items';

@Component({
  selector: 'app-item-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-edit.html',
  styleUrl: './item-edit.css',
})
export class ItemEdit implements OnInit {
  public editForm!: FormGroup;
  submitted = false;
  itemId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private itemsService: Items
  ) {}

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      _id: [],
      sku: [''],
      name: ['', Validators.required],
      category: [''],
      price: [''],
      quantity: ['', Validators.required],
      description: [''],
    });

    // Grab the :id from the URL
    this.itemId = this.route.snapshot.paramMap.get('id')!;

    // Fetch the existing item and pre-fill the form
    this.itemsService.getItem(this.itemId).subscribe({
      next: (item: any) => {
        this.editForm.patchValue(item);
      },
      error: (err) => {
        console.error('Failed to load item', err);
      }
    });
  }

  public onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      this.itemsService.updateItem(this.itemId, this.editForm.value)
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

  get f() { return this.editForm.controls; }
}