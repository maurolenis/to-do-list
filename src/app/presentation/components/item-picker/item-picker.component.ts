import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonIcon,
  IonLabel,
  IonItem,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

export interface ItemPicker {
  id: string;
  name: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-item-picker',
  templateUrl: './item-picker.component.html',
  styleUrls: ['./item-picker.component.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonLabel,
    CommonModule,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonIcon,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemPickerComponent),
      multi: true,
    },
  ],
})
export class ItemPickerComponent implements ControlValueAccessor {
  selectedItem: string | null = null;
  disabled = false;
  @Input() items: ItemPicker[] = [];
  @Input() label: string = '';
  categories = [
    { id: '1', name: 'Personal', icon: 'person-outline', color: '#6366f1' },
    { id: '2', name: 'Work', icon: 'briefcase-outline', color: '#6366f1' },
    { id: '3', name: 'Shopping', icon: 'cart-outline', color: '#6366f1' },
    { id: '4', name: 'None', icon: 'ban-outline', color: '#6366f1' },
  ];

  // Funciones del ControlValueAccessor
  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  // Escribe el valor desde el formulario al componente
  writeValue(value: string | null): void {
    this.selectedItem = value;
  }

  // Registra la función que se llama cuando cambia el valor
  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  // Registra la función que se llama cuando se toca el control
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Habilita/deshabilita el control
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Método para seleccionar categoría
  selectItem(id: string): void {
    if (this.disabled) return;

    this.selectedItem = id;
    this.onChange(id);
    this.onTouched();
  }
}
