import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { ContentStatus } from '@app/_models';

const baseUrl = `${environment.apiUrl}/content_statuses`;

@Injectable({ providedIn: 'root' })
export class ContentStatusService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<ContentStatus[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<ContentStatus>(`${baseUrl}/${id}`);
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
