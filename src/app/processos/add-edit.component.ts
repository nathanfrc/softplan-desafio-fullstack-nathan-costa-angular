import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ProcessoService, AlertService } from '@app/_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private processoService: ProcessoService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
       
        this.form = this.formBuilder.group({
            titulo: ['', Validators.required],
            descricao: ['', Validators.required],
        });

        if (!this.isAddMode) {

            this.processoService.getById(this.id)
                .pipe(first())
                .subscribe(async (res:any) => {
                    this.f.titulo.setValue(res.content[0].titulo);
                    this.f.descricao.setValue(res.content[0].descricao);
                });
        }
    }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        this.alertService.clear();

        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        if (this.isAddMode) {
            this.createProcesso();
        } else {
            this.updateProcesso();
        }
    }

    private createProcesso() {
        this.processoService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Processo adicionado com sucesso', { keepAfterRouteChange: true });
                    this.router.navigate(['.', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error("Erro ao criar");
                    this.loading = false;
                });

    }

    private updateProcesso() {
        this.processoService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Processo atualizado com sucesso', { keepAfterRouteChange: true });
                    this.router.navigate(['..', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}