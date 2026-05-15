import { CategoryUseCases } from 'src/app/domain/use-cases/category.use-cases';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError, switchMap, combineLatest, map } from 'rxjs';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repository';
import { TaskGroup } from '../models/task-group.model';

@Injectable({ providedIn: 'root' })
export class TaskUseCases {
  private repository = inject(TaskRepository);
  private categoryUseCases = inject(CategoryUseCases);

  getTasksGroupedByCategory(): Observable<TaskGroup[]> {
    return combineLatest([this.categoryUseCases.getCategories(), this.repository.getTasks()]).pipe(
      map(([categories, tasks]) => {
        const cat = categories.map(category => ({
          category,
          tasks: tasks.filter(task => task.categoryId === category.id),
        }));
        return cat.filter(group => group.tasks.length > 0);
      })
    );
  }

  getTasks(): Observable<Task[]> {
    return this.repository.getTasks();
  }

  getTaskById(id: string): Observable<Task | null> {
    return this.repository.getTaskById(id);
  }

  createTask(title: string, categoryId?: string): Observable<void> {
    return this.repository.getTasks().pipe(
      switchMap(tasks => {
        const exists = tasks.some(
          t => t.title.toLowerCase() === title.toLowerCase() && t.categoryId === categoryId
        );

        if (exists) {
          return throwError(() => new Error('Task already exists'));
        }
        const task = Task.create(title, categoryId);
        return this.repository.createTask(task);
      })
    );
  }

  updateTask(
    id: string,
    title: string,
    categoryId?: string,
    completed?: boolean
  ): Observable<void> {
    return this.repository.getTaskById(id).pipe(
      switchMap(existing => {
        if (!existing) {
          return throwError(() => new Error('Task not found'));
        }

        const updated = new Task(
          id,
          title || existing.title,
          categoryId !== undefined ? categoryId : existing.categoryId,
          completed !== undefined ? completed : existing.completed
        );

        return this.repository.updateTask(updated);
      })
    );
  }

  toggleTaskCompletion(id: string): Observable<void> {
    return this.repository.getTaskById(id).pipe(
      switchMap(existing => {
        if (!existing) {
          return throwError(() => new Error('Task not found'));
        }

        const updated = new Task(
          existing.id,
          existing.title,
          existing.categoryId,
          !existing.completed
        );

        return this.repository.updateTask(updated);
      })
    );
  }

  deleteTask(id: string): Observable<void> {
    if (!id) {
      return throwError(() => new Error('Task ID is required'));
    }

    return this.repository.getTaskById(id).pipe(
      switchMap(task => {
        if (!task) {
          return throwError(() => new Error('Task not found'));
        }
        return this.repository.deleteTask(id);
      })
    );
  }
}
