import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
  withComponentInputBinding,
} from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import { CategoryRepository } from './app/domain/repositories/category.repository';
import { CategoryDataSource } from './app/domain/datasources/category.datasource';
import { CategoryRepositoryImpl } from './app/data/repositories/category.repository.impl';
import { CategoryDataSourceImpl } from './app/data/datasources/category.datasource.impl';
import { TaskRepository } from './app/domain/repositories/task.repository';
import { TaskDataSource } from './app/domain/datasources/task.datasource';
import { TaskRepositoryImpl } from './app/data/repositories/task.repository.impl';
import { TaskDataSourceImpl } from './app/data/datasources/task.datasource.impl';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    importProvidersFrom(IonicStorageModule.forRoot()),
    provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding()),
    { provide: CategoryRepository, useClass: CategoryRepositoryImpl },
    { provide: CategoryDataSource, useClass: CategoryDataSourceImpl },
    { provide: TaskRepository, useClass: TaskRepositoryImpl },
    { provide: TaskDataSource, useClass: TaskDataSourceImpl },
    provideAppInitializer(() => {
      const initializerFn = (
        (storage: Storage) => () =>
          storage.create()
      )(inject(Storage));
      return initializerFn();
    }),
  ],
});
