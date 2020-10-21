import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { ProcessoService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {

    processos = null;
    pendente:string;
    status:boolean;

    constructor(private processoService: ProcessoService,
        private route: ActivatedRoute,
        private router: Router) {}

    ngOnInit() {

            this.pendente = this.route.snapshot.params['filtro'];

            if(!this.pendente){
                this.processoService.getAll()
                .subscribe(async (res:any) => {
                    this.processos = res.content;
                });

                this.status = true;

            }else{
                this.processoService.getAllPendente()
                .subscribe(async (res:any) => {
                    this.processos = res.content;
                });

                this.status = false;

            }

           

            console.log(this.processos);
    }

    processoUser(id: string) {
        const user = this.processos.find(x => x.id === id);
        user.isDeleting = true;
        this.processoService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.processos = this.processos.filter(x => x.id !== id) 
            });
    }

    all(){
        this.router.navigate(['.', { relativeTo: this.processos }]);
    }

    linkParecer(id){
        console.log("teste id do usuario="+id);
        //this.router.navigate(['processo/parecer/'+id,{ relativeTo: this.route }]);

    }
}