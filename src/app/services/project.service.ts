import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
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

  getArtistProject(
    pageNumber: number,
    pageSize: number,
    isAsc: boolean,
    isProcess: boolean
  ) {
    return this.http.get(this.baseUrl + '/api/v1/projects/own/', {
      observe: 'response', headers: this.httpHeaders, params: {
        pageNumber: pageNumber, pageSize: pageSize,
        isAsc: isAsc,
        isProcess: isProcess,
      },
    });
  }

  getPendingProject(
    pageNumber: number,
    pageSize: number,
    isAsc: boolean,
    search?: string
  ) {
    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)
      .set('isAsc', isAsc)
      .set('searchString', search || "")
      .set('filter', 'ResponsePending')
    return this.http.get(this.baseUrl + '/api/v1/projects/own/', {
      observe: 'response', headers: this.httpHeaders, params: params
    })
  }

  getProjectsDiscover(pageNumber: number, pageSize: number, isAsc: boolean, search?: string) {
    var params = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      isAsc: isAsc,
      searchString: search || ""
    }
    return this.http.get(this.baseUrl + '/api/v1/projects/pending', {
      observe: 'response', headers: this.httpHeaders, params: params
    })
  }

  getFinishProject(pageNumber: number, pageSize: number, isAsc: boolean, search?: string) {
    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)
      .set('isAsc', isAsc)
      .set('searchString', search || "")
      .set('filter', 'Done')
    return this.http.get(this.baseUrl + '/api/v1/projects/own/', {
      observe: 'response', headers: this.httpHeaders, params: params
    })
  }

  getDeniedProject(
    pageNumber: number,
    pageSize: number,
    isAsc: boolean,
    searchString: string
  ) {
    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)
      .set('isAsc', isAsc)
      .set('searchString', searchString)
      .set('filter', 'Deny')
    return this.http.get(this.baseUrl + '/api/v1/projects/own/', {
      observe: 'response', headers: this.httpHeaders, params: params
    })
  }

  getProcessingProject(
    pageNumber: number,
    pageSize: number,
    isAsc: boolean,
    search?: string
  ) {
    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)
      .set('isAsc', isAsc)
      .set('searchString', search || "")
      .set('filter', 'Accept')
    return this.http.get(this.baseUrl + '/api/v1/projects/own/', {
      observe: 'response', headers: this.httpHeaders, params: params
    })
  }

  getInviteProject(
    pageNumber: number,
    pageSize: number,
    isAsc: boolean,
    search?: string
  ) {
    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)
      .set('isAsc', isAsc)
      .set('searchString', search || "")
      .set('filter', 'InvitePending')
    return this.http.get(this.baseUrl + '/api/v1/projects/own/', {
      observe: 'response', headers: this.httpHeaders, params: params
    })
  }


  getProjectDetail(id: string) {
    return this.http.get(this.baseUrl + '/api/v1/projects/' + id, {
      observe: 'response',
      headers: this.httpHeaders,
    });
  }

  getTextFile(url: string) {
    var param = {
      scriptId: url
    }
    return this.http.get(this.baseUrl + '/api/v1/projects/script',
      {
        params: param,
        observe: 'response',
        responseType: 'blob',
        headers: this.httpHeaders,
      });
  }

  acceptVoice(id: string, comment?: string) {
    var body = {
      voiceId: id,
      status: "Accept",
      comment: comment
    }
    return this.http.post<any>(this.baseUrl + '/api/v1/projects/file/status', body, {
      observe: 'response', headers: this.httpHeaders
    })
  }

  denyVoice(id: string, comment?: string) {
    var body = {
      voiceId: id,
      status: "Deny",
      comment: comment
    }
    return this.http.post<any>(this.baseUrl + '/api/v1/projects/file/status', body, {
      observe: 'response', headers: this.httpHeaders
    })
  }

  payVoice(id: string) {
    var params = {
      voiceId: id
    }
    return this.http.post<any>(this.baseUrl + '/api/v1/transactions/pay/', null, {
      observe: 'response', headers: this.httpHeaders, params: params
    })
  }

  acceptAtist(id: string, artistId: string) {
    var params = {
      artistId: artistId,
      isAccept: true
    }
    return this.http.put<any>(this.baseUrl + '/api/v1/projects/' + id + '/response', null, {
      observe: 'response', headers: this.httpHeaders, params: params
    })
  }

  denyAtist(id: string, artistId: string) {
    var params = {
      artistId: artistId,
      isAccept: false
    }
    return this.http.put<any>(this.baseUrl + '/api/v1/projects/' + id + '/response', null, {
      observe: 'response', headers: this.httpHeaders, params: params
    })
  }

  carryOutProject(id: string) {
    var params = {
      status: 'Process'
    }
    return this.http.put<any>(this.baseUrl + '/api/v1/projects/' + id + '/status', null, {
      observe: 'response', headers: this.httpHeaders, params: params
    })
  }

  getArtistVoiceDemo(id: string) {
    var params = {
      pageNumber: 1,
      pageSize: 2
    }
    return this.http.get<any>(this.baseUrl + '/api/v1/artists/voice-demo/' + id, {
      observe: 'response', headers: this.httpHeaders, params: params
    })
  }

  downloadVoice(id: string) {
    return this.http.get(this.baseUrl + '/api/v1/projects/voice/' + id, {
      observe: 'response', headers: this.httpHeaders
    })
  }

  downloadByUrl(url: string) {
    return this.http.get(url);
  }

  makeArtistDone(projectId: string, artistId: string) {
    var params = {
      artistId: artistId
    }
    return this.http.put(this.baseUrl + '/api/v1/projects/' + projectId + '/done-artist', null, {
      observe: 'response', headers: this.httpHeaders, params: params
    })
  }

  finishProject(id: string) {
    var params = {
      status: 'Done'
    }
    return this.http.put<any>(this.baseUrl + '/api/v1/projects/' + id + '/status', null, {
      observe: 'response', headers: this.httpHeaders, params: params
    })
  }

  uploadVoiceToProject(id: string, data: FormData) {
    var headers = this.httpHeaders;
    headers = headers.delete('Content-Type');
    headers = headers.set('enctype', 'multipart/form-data');
    return this.http.post(this.baseUrl + '/api/v1/projects/' + id + '/voice', data, { headers: headers, observe: 'response' })
  }

  getArtistReady(pageNumber: number, pageSize: number, search?: string) {
    var params = {
      pageSize: pageSize,
      pageNumber: pageNumber,
      searchString: search || '',
      isAsc: 'true'
    }
    return this.http.get(this.baseUrl + '/api/v1/artists/ready', { headers: this.httpHeaders, observe: 'response', params: params })
  }

  inviteArtistToJoinProject(projectId: string, artistId: string) {
    var params = {
      artistId: artistId
    }
    return this.http.put(this.baseUrl + '/api/v1/projects/' + projectId + '/invite', null, { headers: this.httpHeaders, observe: 'response', params: params })
  }

  downloadFile(url: string) {
    var param = {
      scriptId: url
    }
    return this.http.get(this.baseUrl + '/api/v1/projects/script',
      {
        params: param,
        observe: 'response',
        responseType: 'blob',
        headers: this.httpHeaders,
      });
  }

  acceptToJoinProject(id: string) {
    var params = {
      isAccept: true
    }
    return this.http.put(this.baseUrl + '/api/v1/projects/' + id + '/reply', null, { headers: this.httpHeaders, observe: 'response', params: params })
  }

  avoidToJoinProject(id: string) {
    var params = {
      isAccept: false
    }
    return this.http.put(this.baseUrl + '/api/v1/projects/' + id + '/reply', null, { headers: this.httpHeaders, observe: 'response', params: params })
  }

  artistJoinProject(id: string) {
    return this.http.put(this.baseUrl + '/api/v1/projects/' + id + '/request', null, { headers: this.httpHeaders, observe: 'response' })
  }

}
