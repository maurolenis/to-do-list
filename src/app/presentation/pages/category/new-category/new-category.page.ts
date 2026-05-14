import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonItem,
  IonInput,
  IonCard,
  IonCardContent,
  IonButton,
} from '@ionic/angular/standalone';
import {
  ItemPicker,
  ItemPickerComponent,
} from 'src/app/presentation/components/item-picker/item-picker.component';
import { Router } from '@angular/router';
import { CategoryUseCases } from 'src/app/domain/use-cases/category.use-cases';
import { ToastService } from 'src/app/presentation/services/toast.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.page.html',
  styleUrls: ['./new-category.page.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardContent,
    IonButtons,
    IonBackButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonItem,
    IonInput,
    IonButton,
    ItemPickerComponent,
  ],
})
export class NewCategoryPage {
  public id = input<string>();
  private router = inject(Router);
  public form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
  });
  public iconOptions: ItemPicker[] = [
    { id: 'person-outline', name: 'Personal', icon: 'person-outline', color: '#6366f1' },
    { id: 'briefcase-outline', name: 'Work', icon: 'briefcase-outline', color: '#6366f1' },
    { id: 'cart-outline', name: 'Shopping', icon: 'cart-outline', color: '#6366f1' },
    { id: 'home-outline', name: 'Home', icon: 'home-outline', color: '#6366f1' },
    { id: 'fitness-outline', name: 'Fitness', icon: 'fitness-outline', color: '#6366f1' },
    { id: 'book-outline', name: 'Education', icon: 'book-outline', color: '#6366f1' },
    { id: 'school-outline', name: 'School', icon: 'school-outline', color: '#6366f1' },
    { id: 'medkit-outline', name: 'Health', icon: 'medkit-outline', color: '#6366f1' },
    { id: 'restaurant-outline', name: 'Food', icon: 'restaurant-outline', color: '#6366f1' },
    { id: 'airplane-outline', name: 'Travel', icon: 'airplane-outline', color: '#6366f1' },
    { id: 'car-outline', name: 'Transport', icon: 'car-outline', color: '#6366f1' },
    { id: 'heart-outline', name: 'Love', icon: 'heart-outline', color: '#6366f1' },
    {
      id: 'game-controller-outline',
      name: 'Entertainment',
      icon: 'game-controller-outline',
      color: '#6366f1',
    },
  ];

  public colorOptions: ItemPicker[] = [
    { id: '#6366f1', name: 'Purple', icon: 'ellipse', color: '#6366f1' },
    { id: '#ef4444', name: 'Red', icon: 'ellipse', color: '#ef4444' },
    { id: '#10b981', name: 'Green', icon: 'ellipse', color: '#10b981' },
    { id: '#f59e0b', name: 'Orange', icon: 'ellipse', color: '#f59e0b' },
    { id: '#3b82f6', name: 'Blue', icon: 'ellipse', color: '#3b82f6' },
    { id: '#8b5cf6', name: 'Violet', icon: 'ellipse', color: '#8b5cf6' },
    { id: '#ec4899', name: 'Pink', icon: 'ellipse', color: '#ec4899' },
    { id: '#6b7280', name: 'Gray', icon: 'ellipse', color: '#6b7280' },
    { id: '#f43f5e', name: 'Rose', icon: 'ellipse', color: '#f43f5e' },
    { id: '#14b8a6', name: 'Teal', icon: 'ellipse', color: '#14b8a6' },
  ];

  private categoryService = inject(CategoryUseCases);
  private toastService = inject(ToastService);

  ionViewWillEnter() {
    this.form.reset();
    if (this.id()) {
      this.categoryService.getCategoryById(this.id()!).subscribe({
        next: category => {
          if (category) {
            this.form.setValue({
              name: category.name,
              icon: category.icon,
              color: category.color,
            });
          }
        },
        error: err => {
          console.error('Error fetching category:', err);
        },
      });
    }
  }

  public onSubmit() {
    if (this.form.valid) {
      const { name, icon, color } = this.form.value;
      if (this.id()) {
        this.updateCategory(this.id()!, name, icon, color);
      } else {
        this.createCategory(name, icon, color);
      }
    }
  }

  private createCategory(name: string, icon: string, color: string) {
    this.categoryService.createCategory(name, icon, color).subscribe({
      next: () => {
        this.toastService.showToast('Categoria creada exitosamente', 'success');
        this.router.navigate(['base/categories']);
      },
      error: err => {
        this.toastService.showToast('Error al crear la categoría', 'error');
        console.error('Error creating category:', err);
      },
    });
  }

  private updateCategory(id: string, name: string, icon: string, color: string) {
    this.categoryService.updateCategory(id, name, icon, color).subscribe({
      next: () => {
        this.toastService.showToast('Categoría actualizada exitosamente', 'success');
        this.router.navigate(['base/categories']);
      },
      error: err => {
        this.toastService.showToast('Error al actualizar la categoría', 'error');
        console.error('Error updating category:', err);
      },
    });
  }
}
