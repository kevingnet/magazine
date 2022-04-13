import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Rating } from '@app/_models';

const baseUrl = `${environment.apiUrl}/ratings`;

@Injectable({ providedIn: 'root' })
export class RatingService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Rating[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<Rating>(`${baseUrl}/${id}`);
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
