import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class VocalService {

    private baseUrl = environment.baseUrl;
    private httpHeaders: HttpHeaders;

    constructor(private http: HttpClient) {
        this.httpHeaders = this.getHttpHeaders();
    }

    private getHttpHeaders(): HttpHeaders {
        var data = localStorage.getItem('USER');
        var headers = new HttpHeaders();
        if (data) {
            var user: User = JSON.parse(data);
            headers = headers.set('Content-Type', 'application/json; charset=utf-8');
            headers = headers.set('Authorization', 'Bearer ' + user.token);
        }
        return headers;
    }

    getArtistVocal(pageNumber: number, pageSize: number) {
        var params = {
            pageNumber: pageNumber,
            pageSize: pageSize
        }
        return this.http.get(this.baseUrl + "/api/v1/artists/dashboard/voice", { observe: 'response', headers: this.httpHeaders, params: params })
    }

    getArtistProject() {
        return this.http.get(this.baseUrl + "/api/v1/artists/dashboard/project", { observe: 'response', headers: this.httpHeaders })
    }

}