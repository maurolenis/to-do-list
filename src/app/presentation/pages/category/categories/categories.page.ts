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
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Category } from 'src/app/domain/entities/category.entity';
import { CategoryUseCases } from 'src/app/domain/use-cases/category.use-cases';
import { AlertService } from 'src/app/presentation/services/alert.service';
import { ToastService } from 'src/app/presentation/services/toast.service';
import { EmptyStateComponent } from 'src/app/presentation/components/empty-state/empty-state.component';
import { RemoteConfigService } from 'src/app/config/services/remote-config.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [
    IonInfiniteScrollContent,
    IonInfiniteScroll,
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
    EmptyStateComponent,
  ],
})
export class CategoriesPage {
  private router = inject(Router);
  private categoryService = inject(CategoryUseCases);
  private alertService = inject(AlertService);
  private toastService = inject(ToastService);
  private remoteConfigService = inject(RemoteConfigService);
  private $destroy = new Subject<void>();
  public enableEdit = false;
  public categories: Category[] = [];
  public categoriesShown: Category[] = [];
  async ionViewWillEnter() {
    await this.loadFeatureFlags();
    this.loadCategories();
  }

  private async loadFeatureFlags() {
    this.enableEdit = await this.remoteConfigService.getFeatureFlag('enable_edit_category');
  }

  private loadCategories() {
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: categories => {
          this.categories = categories;
          this.generateItemsToShow(true);
        },
        error: err => {
          this.toastService.showToast('Error al cargar las categorías', 'danger');
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
    this.categoryService
      .deleteCategory(category.id)
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: () => {
          this.toastService.showToast(
            `Categoría "${category.name}" eliminada exitosamente`,
            'success'
          );
          this.loadCategories();
        },
        error: err => {
          this.toastService.showToast('Error al eliminar la categoría', 'danger');
          console.error('Error deleting category:', err);
        },
      });
  }
  private generateItemsToShow(initial: boolean = false) {
    const itemsPerPage = 5;
    const currentLength = initial ? 0 : this.categoriesShown.length;
    const nextItems = this.categories.slice(currentLength, currentLength + itemsPerPage);
    this.categoriesShown = initial ? nextItems : [...this.categoriesShown, ...nextItems];
  }

  onIonInfinite(event: any) {
    setTimeout(() => {
      this.generateItemsToShow();
      event.target.complete();
    }, 500);
  }

  ionViewWillLeave() {
    this.$destroy.next();
    this.$destroy.complete();
    this.$destroy = new Subject<void>();
  }
}
