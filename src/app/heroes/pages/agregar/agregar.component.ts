import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.activatedRoute.params
    //retrive the data  and fills the forms for editing
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroePorId( id ))
      )
      .subscribe( heroe => this.heroe = heroe );
  }

  guardar() {
    if( this.heroe.superhero.trim().length === 0){
      return;
    }

    if( this.heroe.id ) {
      //update hero regisrter
      this.heroesService.updateHeroe( this.heroe )
        .subscribe( heroe => console.log('Actualizando', heroe ) )
    } else {
      //create hero register
      this.heroesService.addHeroe( this.heroe )
        .subscribe( heroe => {
          this.router.navigate(['/heroes/editar', heroe.id])
        })
    }
  }

}
