import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Environment} from '../../environments/environments';
import {Observable, catchError} from 'rxjs';
import { HttpErrorManager } from './hettp-error-manager';


@Injectable({
    providedIn: 'root',
})

export class RequestManagerUsuario {

    private readonly path = Environment.apiUrl;
    private readonly base = Environment.base;

    constructor(
        private http: HttpClient,
        private errorManager: HttpErrorManager
    ) {}

    public get<T>(endpoint: string): Observable<T> {
        return this.http.get<T>(`${this.path}${endpoint}`).pipe(
            catchError(error =>this.errorManager.handleError(error))
        );
    }
    public getById<T>(endpoint:string, id:string | number): Observable<T>{
        return this.http.get<T>(`${this.path}${endpoint}/${id}`).pipe(
            catchError(error =>this.errorManager.handleError(error))
        );
    }

    public post<T>(endpoint: string, element: unknown): Observable<T> {
        return this.http.post<T>(`${this.path}${endpoint}`, element).pipe(
            catchError(error =>this.errorManager.handleError(error))
        );
    }

    public put<T>(endpoint: string, element:unknown): Observable<T>{
        return this.http.put<T>(`${this.path}${endpoint}`, element).pipe(
            catchError(error =>this.errorManager.handleError(error))
        );
    }

    public delete<T>(endpoint: string,id:string | number): Observable<T>{
        return this.http.delete<T>(`${this.path}${endpoint}/${id}`).pipe(
            catchError(error =>this.errorManager.handleError(error))
        );
    }


    // traer los datos de documentos
    public getDocumentos<T>(endpoint: string): Observable<T> {
        return this.http.get<T>(`${this.base}${endpoint}`).pipe(catchError(error =>this.errorManager.handleError(error)));
    }

}