import { Injectable } from '@angular/core';
import { Beer } from './beer';
import { Http, Response } from '@angular/http';

@Injectable()
export class BeerService {
    private beersUrl = '/api/beers';

    constructor (private http: Http) {}

    // get("/api/beers")
    getBeers(): Promise<void | Beer[]> {
      return this.http.get(this.beersUrl)
                 .toPromise()
                 .then(response => response.json() as Beer[])
                 .catch(this.handleError);
    }

    // post("/api/beers")
    createBeer(newBeer: Beer): Promise<void | Beer> {
      return this.http.post(this.beersUrl, newBeer)
                 .toPromise()
                 .then(response => response.json() as Beer)
                 .catch(this.handleError);
    }

    // get("/api/beers/:id") endpoint not used by Angular app

    // delete("/api/beers/:id")
    deleteBeer(delBeerId: String): Promise<void | String> {
      return this.http.delete(this.beersUrl + '/' + delBeerId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/beers/:id")
    updateBeer(putBeer: Beer): Promise<void | Beer> {
      var putUrl = this.beersUrl + '/' + putBeer._id;
      return this.http.put(putUrl, putBeer)
                 .toPromise()
                 .then(response => response.json() as Beer)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}