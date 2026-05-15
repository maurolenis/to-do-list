// import { RemoteConfig } from './../../../../node_modules/@firebase/remote-config-types/index.d';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getRemoteConfig, fetchAndActivate, getBoolean } from 'firebase/remote-config';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {
  private remoteConfig!: any;

  constructor() {
    const app = initializeApp(environment.firebaseConfig);

    this.remoteConfig = getRemoteConfig(app);

    this.remoteConfig.settings.minimumFetchIntervalMillis = 0;
  }

  async getFeatureFlag(flagName: string): Promise<boolean> {
    try {
      await fetchAndActivate(this.remoteConfig);

      return getBoolean(this.remoteConfig, flagName);
    } catch (error) {
      console.error('Error obteniendo Remote Config:', error);
      return false;
    }
  }
}
