import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ProcessoService, AlertService } from '@app/_services';
import { Parecer } from '@app/_models';

@Component({ templateUrl: 'parecer.component.html' })
export class ParecerComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    titulo: string;
    descricaoProcesso:string;

    idUsuario:string;
    idProcesso:string;

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
            descricaoParecer: ['', Validators.required],
        });

        if (!this.isAddMode) {

            this.processoService.getById(this.id)
                .pipe(first())
                .subscribe(async (res:any) => {
                    this.f.titulo.setValue(res.content[0].titulo);
                    this.f.descricao.setValue(res.content[0].descricao);

                    this.titulo = res.content[0].titulo;
                    this.descricaoProcesso =res.content[0].descricao;
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
        } 
    }

     createProcesso() {

       this.idProcesso = this.id;
    
       this.findByEmailUsuario(localStorage.getItem('email'));

        this.processoService.parecerInsert(this.idProcesso,this.idUsuario,this.form.value.descricaoParecer)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Parecer adicionado com sucesso', { keepAfterRouteChange: true });
                    this.router.navigate(['.', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error("Erro ao criar Parecer");
                    this.loading = false;
                });
    }


  private  findByEmailUsuario(email){
       return this.processoService.getByEmailUsuario(email)
        .pipe(first())
        .subscribe(async (res:any) => {
         this.idUsuario = res.content[0].id;
        });
    }
}


