import { Component, Input } from '@angular/core';
import { Beer } from '../beer';
import { BeerService } from '../beer.service';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css']
})

export class BeerDetailsComponent {
  @Input()
  beer: Beer;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private beerService: BeerService) {}

  createBeer(beer: Beer) {
    this.beerService.createBeer(beer).then((newBeer: Beer) => {
      this.createHandler(newBeer);
    });
  }

  updateBeer(beer: Beer): void {
    this.beerService.updateBeer(beer).then((updatedBeer: Beer) => {
      this.updateHandler(updatedBeer);
    });
  }

  deleteBeer(beerId: String): void {
    this.beerService.deleteBeer(beerId).then((deletedBeerId: String) => {
      this.deleteHandler(deletedBeerId);
    });
  }
}