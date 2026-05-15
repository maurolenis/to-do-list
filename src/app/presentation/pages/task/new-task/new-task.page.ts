import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonInput,
  IonItem,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ItemPickerComponent } from 'src/app/presentation/components/item-picker/item-picker.component';
import { Category } from 'src/app/domain/entities/category.entity';
import { CategoryUseCases } from 'src/app/domain/use-cases/category.use-cases';
import { ToastService } from 'src/app/presentation/services/toast.service';
import { TaskUseCases } from 'src/app/domain/use-cases/task.use-cases';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardContent,
    IonItem,
    IonInput,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ItemPickerComponent,
  ],
})
export class NewTaskPage {
  public id = input<string>();
  private router = inject(Router);
  public form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });
  private categoryService = inject(CategoryUseCases);
  private taskService = inject(TaskUseCases);
  private toastService = inject(ToastService);
  private $destroy = new Subject<void>();
  public categoryOptions: Category[] = [];

  ionViewWillEnter() {
    this.form.reset();
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.$destroy))
      .subscribe(categories => {
        this.categoryOptions = categories;
      });
    if (this.id()) {
      this.taskService
        .getTaskById(this.id()!)
        .pipe(takeUntil(this.$destroy))
        .subscribe({
          next: task => {
            if (task) {
              this.form.setValue({
                name: task.title,
                category: task.categoryId || '',
              });
            }
          },
          error: err => {
            console.error('Error fetching task:', err);
          },
        });
    }
  }

  public onSubmit() {
    if (this.form.valid) {
      const { name, category } = this.form.value;
      if (this.id()) {
        this.updateTask(this.id()!, name, category);
      } else {
        this.createTask(name, category);
      }
    }
  }

  private createTask(name: string, category: string) {
    this.taskService
      .createTask(name, category)
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: () => {
          this.toastService.showToast('Tarea creada exitosamente', 'success');
          this.router.navigate(['/base/tasks']);
        },
        error: err => {
          this.toastService.showToast('Error al crear la tarea', 'danger');
          console.error('Error creating task:', err);
        },
      });
  }

  private updateTask(id: string, name: string, category: string) {
    this.taskService
      .updateTask(id, name, category)
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: () => {
          this.toastService.showToast('Tarea actualizada exitosamente', 'success');
          this.router.navigate(['/base/tasks']);
        },
        error: err => {
          this.toastService.showToast('Error al actualizar la tarea', 'danger');
          console.error('Error updating task:', err);
        },
      });
  }

  ionViewWillLeave() {
    this.$destroy.next();
    this.$destroy.complete();
    this.$destroy = new Subject<void>();
  }
}
