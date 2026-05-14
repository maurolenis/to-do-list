import { Task } from './../../../../domain/entities/task.entity';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonCard,
  IonCardContent,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonButton,
  IonBadge,
  IonList,
  IonModal,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { TaskUseCases } from 'src/app/domain/use-cases/task.use-cases';
import { AlertService } from 'src/app/presentation/services/alert.service';
import { ToastService } from 'src/app/presentation/services/toast.service';
import { CategoryUseCases } from 'src/app/domain/use-cases/category.use-cases';
import { Category } from 'src/app/domain/entities/category.entity';
import { TaskGroup } from 'src/app/domain/models/task-group.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [
    IonList,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonFab,
    IonFabButton,
    IonIcon,
    IonCard,
    IonCardContent,
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonBadge,
    IonModal,
  ],
})
export class TasksPage {
  private router = inject(Router);
  private taskService = inject(TaskUseCases);
  private categoryService = inject(CategoryUseCases);
  private alertService = inject(AlertService);
  private toastService = inject(ToastService);
  // public categories: Category[] = [];
  public intialData: TaskGroup[] = [];
  public tasksGroup: TaskGroup[] = [];
  // public taskGroupSelected: TaskGroup | null = null;

  ionViewWillEnter() {
    this.loadTasks();
  }

  private loadTasks() {
    this.taskService.getTasksGroupedByCategory().subscribe({
      next: tasksGroup => {
        this.intialData = [...tasksGroup];
        this.tasksGroup = [...tasksGroup];
      },
      error: err => {
        this.toastService.showToast('Error al cargar las tareas', 'error');
        console.error('Error fetching tasks:', err);
      },
    });
  }

  public navigateToTaskCreation(id?: string) {
    this.router.navigate(['base/new-task'], { queryParams: { id } });
  }

  public toggleTaskCompletion(taskId: string) {
    const taskGroup = this.tasksGroup.find(group => group.tasks.some(task => task.id === taskId));
    if (!taskGroup) return;

    const task = taskGroup.tasks.find(task => task.id === taskId);
    if (!task) return;

    this.taskService.updateTask(task.id, task.title, task.categoryId, !task.completed).subscribe({
      next: () => {
        task.completed = !task.completed;
      },
      error: err => {
        this.toastService.showToast('Error al actualizar la tarea', 'error');
        console.error('Error updating task:', err);
      },
    });
  }

  public showDeleteConfirmation(task: Task) {
    this.alertService.showAlert(
      'CONFIRMAR ELIMINACIÓN',
      `¿Estás seguro de que deseas eliminar la tarea "${task.title}"?`,
      [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', role: 'destructive', handler: () => this.deleteTask(task) },
      ]
    );
  }

  private deleteTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.toastService.showToast(`Tarea "${task.title}" eliminada exitosamente`, 'success');
        // this.loadCategories();
        this.loadTasks();
      },
      error: err => {
        this.toastService.showToast('Error al eliminar la tarea', 'error');
        console.error('Error deleting task:', err);
      },
    });
  }

  public filterTasksByCategory(categoryId: string) {
    this.tasksGroup = [...this.intialData.filter(group => group.category.id === categoryId)];
  }

  public clearCategoryFilter() {
    this.tasksGroup = [...this.intialData];
  }
}
