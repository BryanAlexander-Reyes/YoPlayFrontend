import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Environment} from '../../environments/environments';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root',
})

export class RequestManagerUsuario {

    private readonly path = Environment.apiUrl;

    constructor(private http: HttpClient) {}

    public get<T>(endpoint: string): Observable<T> {
        return this.http.get<T>(`${this.path}${endpoint}`);
    }
    public getById<T>(endpoint:string, id:string | number): Observable<T>{
        return this.http.get<T>(`${this.path}${endpoint}/${id}`);
    }

    public post<T>(endpoint: string, element: unknown): Observable<T> {
        return this.http.post<T>(`${this.path}${endpoint}`, element);
    }

    public put<T>(endpoint: string, element:unknown): Observable<T>{
        return this.http.put<T>(`${this.path}${endpoint}`, element);
    }

    public delete<T>(endpoint: string,id:string | number): Observable<T>{
        return this.http.delete<T>(`${this.path}${endpoint}/${id}`);
    }
}