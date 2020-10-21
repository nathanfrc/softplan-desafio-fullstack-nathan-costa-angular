import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpUtilService {

  constructor() { }

  headers() {

  	let httpHeaders: HttpHeaders = new HttpHeaders();
	
  	if (localStorage.getItem('user')) {
  	    httpHeaders = httpHeaders.set(
  	  		'Authorization', 'Bearer ' + localStorage.getItem('user').replace(/"/g,"")
		);
		
		console.log("token:"+localStorage.getItem('user').replace(/"/g,""));

  	}
    
    return { headers: httpHeaders };
  }

}