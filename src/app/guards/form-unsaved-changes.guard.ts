import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { BookFormComponent } from '../book-management/book-form/book-form.component';

@Injectable({
  providedIn: 'root'
})
export class FormUnsavedChangesGuard implements CanDeactivate<BookFormComponent> {
  canDeactivate(component: BookFormComponent): boolean {
    if (component.isFormDirty()) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }
}
