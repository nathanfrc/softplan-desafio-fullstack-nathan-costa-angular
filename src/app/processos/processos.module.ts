import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProcessosRoutingModule } from './processos-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { ViewComponent } from './view.component';
import { ParecerComponent } from './parecer.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProcessosRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent,
        ViewComponent,
        ParecerComponent
    ]
})
export class ProcesssosModule { }