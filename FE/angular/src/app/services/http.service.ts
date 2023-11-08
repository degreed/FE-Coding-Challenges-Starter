import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, of } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class HttpService {

    constructor( private http: HttpClient) {}

    get<K>(path: string){
        return this.http.get<K>(path)
        .pipe(
            map((x)=> x),
            catchError((err)=> {
                console.error(err);
                return of();
            })
        )
    }
}