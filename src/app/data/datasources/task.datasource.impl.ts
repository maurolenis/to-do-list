import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, Observable, switchMap } from 'rxjs';
import { TaskDataSource } from 'src/app/domain/datasources/task.datasource';
import { TaskDTO } from '../models/task.mode';

@Injectable({ providedIn: 'root' })
export class TaskDataSourceImpl implements TaskDataSource {
  private readonly STORAGE_KEY = 'tasks';
  private storage = inject(Storage);

  getTasks(): Observable<TaskDTO[]> {
    return from(this.storage.get(this.STORAGE_KEY).then(tasks => tasks || []));
  }

  getTaskById(id: string): Observable<TaskDTO | null> {
    return this.getTasks().pipe(
      switchMap(tasks => {
        const task = tasks.find(t => t.id === id) || null;
        return from(Promise.resolve(task));
      })
    );
  }

  createTask(task: TaskDTO): Observable<void> {
    return this.getTasks().pipe(
      switchMap(tasks => {
        const updatedTasks = [...tasks, task];
        return from(this.storage.set(this.STORAGE_KEY, updatedTasks));
      })
    );
  }

  updateTask(task: TaskDTO): Observable<void> {
    return this.getTasks().pipe(
      switchMap(tasks => {
        const updatedTasks = tasks.map(t => (t.id === task.id ? task : t));
        return from(this.storage.set(this.STORAGE_KEY, updatedTasks));
      })
    );
  }

  deleteTask(id: string): Observable<void> {
    return this.getTasks().pipe(
      switchMap(tasks => {
        const updatedTasks = tasks.filter(t => t.id !== id);
        return from(this.storage.set(this.STORAGE_KEY, updatedTasks));
      })
    );
  }
}
