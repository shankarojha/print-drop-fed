import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  success(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center', // Options: 'start', 'center', 'end', 'left', 'right'
      verticalPosition: 'bottom',  // Options: 'top', 'bottom'
      panelClass: ["successSnackBar"]
    });

  }

  error(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'center', // Options: 'start', 'center', 'end', 'left', 'right'
      verticalPosition: 'bottom',  // Options: 'top', 'bottom'
      panelClass: ["errorSnackBar"]
    });
  }

  info(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'center', // Options: 'start', 'center', 'end', 'left', 'right'
      verticalPosition: 'bottom',  // Options: 'top', 'bottom'
      panelClass: ["infoSnackBar"]
    });
  }

  warning(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'center', // Options: 'start', 'center', 'end', 'left', 'right'
      verticalPosition: 'bottom',  // Options: 'top', 'bottom'
      panelClass: ["warningSnackBar"]
    });
  }
}
