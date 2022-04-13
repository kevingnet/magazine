﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Subscription } from '@app/_models';

const baseUrl = `${environment.apiUrl}/subscription_statuses`;

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Subscription[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<Subscription>(`${baseUrl}/${id}`);
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
