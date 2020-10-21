import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { ViewComponent } from './view.component';
import { ParecerComponent } from './parecer.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: ListComponent },
            { path: 'pen/:filtro', component: ListComponent },
            { path: 'pen/:filtro/add', component: ListComponent },
            { path: 'add', component: AddEditComponent },
            { path: 'view/:id', component: ViewComponent },
            { path: 'edit/:id', component: AddEditComponent },
            { path: 'pen/:filtro/parecer/:id', component: ParecerComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcessosRoutingModule { }