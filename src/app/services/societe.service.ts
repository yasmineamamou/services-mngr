import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocieteService {

  constructor(private http: HttpClient) { }

  async getSocietes() {
    let promise = new Promise<any>((resolve, reject) => {
      this.http.get(environment.url_backend+'/api/societes?populate=*').toPromise().then(res => {
        resolve(res);
      }).catch(err=>{
        reject(err);
      });
    });
    return promise;
  }
  async addSociete(societeData) {
    let promise = new Promise<any>((resolve, reject) => {
        this.http.post(environment.url_backend+'/api/societes', { data: societeData }).toPromise().then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
    return promise;
  }
  async editSociete(societeId, societeData) {
    let promise = new Promise<any>((resolve, reject) => {
        this.http.put(environment.url_backend+`/api/societes/${societeId}`, { data: societeData }).toPromise().then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
    return promise;
  }
  async deleteSociete(societeId) {
    let promise = new Promise<any>((resolve, reject) => {
        this.http.delete(environment.url_backend+`/api/societes/${societeId}`).toPromise().then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
    return promise;
  }
  async getDepartements() {
    let promise = new Promise<any>((resolve, reject) => {
        this.http.get(environment.url_backend+'/api/departements').toPromise().then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
    return promise;
  }
  async getTypes() { 
    let promise = new Promise<any>((resolve, reject) => {
        this.http.get(environment.url_backend+'/api/types').toPromise().then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
    return promise;
  }
  async getComptes() { 
    let promise = new Promise<any>((resolve, reject) => {
        this.http.get(environment.url_backend+'/api/comptes').toPromise().then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
    return promise;
  } 
}
