import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Parecer, Processo } from '@app/_models';


import { HttpUtilService } from './http-util.service';

@Injectable({ providedIn: 'root' })
export class ProcessoService {

    private processoSubject: BehaviorSubject<Processo>;

    public processo: Observable<Processo>;

    public parecerObj:Parecer;

    private httpUtil: HttpUtilService

    private idProcesso:any;
    private idUsuario:any;
    private descricao:string;
s
    public processos:any;

    constructor(
        private router: Router,
        private http: HttpClient
       
    ) {
        this.processoSubject = new BehaviorSubject<Processo>(JSON.parse(localStorage.getItem('user')));
        this.processo = this.processoSubject.asObservable();

        this.httpUtil = new HttpUtilService;

        this.parecerObj = new Parecer;
    }
   
    register(processo: Processo) {

        return this.http.post(`${environment.apiUrl}/api/processo`, processo,this.httpUtil.headers());
    }

    atribuir(idProcesso,idUsuario){
        return this.http.post(`${environment.apiUrl}/api/usuario/${idUsuario}/processo/${idProcesso}`,this.httpUtil.headers());
    }

    parecerInsert(idProcesso,idUsuario,parecerIn){

        console.log("in="+parecerIn);

        this.parecerObj.descricao = parecerIn;
        
        return this.http.post(`${environment.apiUrl}/api/parecer/usuario/${idUsuario}/processo/${idProcesso}`,this.parecerObj,this.httpUtil.headers());
    }

    getByEmailUsuario(email) {
        return this.http.get<any>(`${environment.apiUrl}/api/processo?email=${email}`,this.httpUtil.headers());
    }

    getAll() {
        return this.http.get<any>(`${environment.apiUrl}/api/processo`,this.httpUtil.headers());
    }

    getAllPendente() {
        return this.http.get<any>(`${environment.apiUrl}/api/processo/pendentes`,this.httpUtil.headers());
    }
    getById(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/api/processo/${id}`,this.httpUtil.headers());
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/api/processo/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/api/processo/${id}`,this.httpUtil.headers())
            .pipe(map(x => {
                return x;
            }));
    }
}