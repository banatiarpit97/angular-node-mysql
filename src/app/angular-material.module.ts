import { NgModule } from '@angular/core';
import {
    MatToolbarModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSnackBarModule
} from '@angular/material';

@NgModule({
    exports: [
        MatToolbarModule,
        MatExpansionModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatInputModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSnackBarModule
    ]
})
export class MaterialModule { }

