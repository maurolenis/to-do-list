import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonCol,
  IonRow,
  IonCard,
  IonButton,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Category } from 'src/app/domain/entities/category.entity';
import { CategoryUseCases } from 'src/app/domain/use-cases/category.use-cases';
import { AlertService } from 'src/app/presentation/services/alert.service';
import { ToastService } from 'src/app/presentation/services/toast.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonFab,
    IonFabButton,
    IonIcon,
    CommonModule,
    FormsModule,
    IonCol,
    IonRow,
    IonCard,
    IonItem,
    IonLabel,
    IonButton,
  ],
})
export class CategoriesPage {
  private router = inject(Router);
  private categoryService = inject(CategoryUseCases);
  private alertService = inject(AlertService);
  private toastService = inject(ToastService);
  public categories: Category[] = [];
  ionViewWillEnter() {
    this.loadCategories();
  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: categories => {
        this.categories = categories;
      },
      error: err => {
        this.toastService.showToast('Error al cargar las categorías', 'error');
        console.error('Error fetching categories:', err);
      },
    });
  }

  public navigateToCategoryCreation(id?: string) {
    this.router.navigate(['base/new-category'], { queryParams: { id } });
  }

  public showDeleteConfirmation(category: Category) {
    this.alertService.showAlert(
      'CONFIRMAR ELIMINACIÓN',
      `¿Estás seguro de que deseas eliminar la categoría "${category.name}"?`,
      [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', role: 'destructive', handler: () => this.deleteCategory(category) },
      ]
    );
  }

  private deleteCategory(category: Category) {
    this.categoryService.deleteCategory(category.id).subscribe({
      next: () => {
        this.toastService.showToast(
          `Categoría "${category.name}" eliminada exitosamente`,
          'success'
        );
        this.loadCategories();
      },
      error: err => {
        this.toastService.showToast('Error al eliminar la categoría', 'error');
        console.error('Error deleting category:', err);
      },
    });
  }
}
