import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Content } from '@app/_models';

const baseUrl = `${environment.apiUrl}/contents`;

@Injectable({ providedIn: 'root' })
export class ContentService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Content[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<Content>(`${baseUrl}/${id}`);
    }

    create(params: any) {
        return this.http.post(baseUrl, params);
    }

    update(id: string, params: any) {
        return this.http.put(`${baseUrl}/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}
