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
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { TaskUseCases } from 'src/app/domain/use-cases/task.use-cases';
import { AlertService } from 'src/app/presentation/services/alert.service';
import { ToastService } from 'src/app/presentation/services/toast.service';
import { TaskGroup } from 'src/app/domain/models/task-group.model';
import { EmptyStateComponent } from 'src/app/presentation/components/empty-state/empty-state.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [
    IonInfiniteScrollContent,
    IonInfiniteScroll,
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
    EmptyStateComponent,
  ],
})
export class TasksPage {
  private router = inject(Router);
  private taskService = inject(TaskUseCases);
  private alertService = inject(AlertService);
  private toastService = inject(ToastService);
  private $destroy = new Subject<void>();
  public intialData: TaskGroup[] = [];
  public tasksGroup: TaskGroup[] = [];
  public tasksGroupShown: TaskGroup[] = [];
  public filterApplied: boolean = false;

  ionViewWillEnter() {
    this.loadTasks();
  }

  private loadTasks() {
    this.taskService
      .getTasksGroupedByCategory()
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: tasksGroup => {
          this.intialData = [...tasksGroup];
          this.tasksGroup = [...tasksGroup];
          this.tasksGroupShown = [];
          this.generateItemsToShow();
        },
        error: err => {
          this.toastService.showToast('Error al cargar las tareas', 'danger');
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

    this.taskService
      .updateTask(task.id, task.title, task.categoryId, !task.completed)
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: () => {
          task.completed = !task.completed;
        },
        error: err => {
          this.toastService.showToast('Error al actualizar la tarea', 'danger');
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
    this.taskService
      .deleteTask(task.id)
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: () => {
          this.toastService.showToast(`Tarea "${task.title}" eliminada exitosamente`, 'success');
          // this.loadCategories();
          this.loadTasks();
        },
        error: err => {
          this.toastService.showToast('Error al eliminar la tarea', 'danger');
          console.error('Error deleting task:', err);
        },
      });
  }

  public filterTasksByCategory(categoryId: string) {
    this.tasksGroup = [...this.intialData.filter(group => group.category.id === categoryId)];
    this.tasksGroupShown = [];
    this.generateItemsToShow();
    this.filterApplied = true;
  }

  public clearCategoryFilter() {
    this.tasksGroup = [...this.intialData];
    this.tasksGroupShown = [];
    this.generateItemsToShow();
    this.filterApplied = false;
  }

  private generateItemsToShow() {
    const itemsPerPage = 5;
    const currentLength = this.tasksGroupShown.length;

    if (currentLength >= this.tasksGroup.length) {
      return;
    }

    const nextItems = this.tasksGroup.slice(currentLength, currentLength + itemsPerPage);
    this.tasksGroupShown = [...this.tasksGroupShown, ...nextItems];
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
