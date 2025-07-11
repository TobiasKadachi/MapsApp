import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Map } from 'maplibre-gl';

@Component({
  selector: 'maps-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map') divMap!: ElementRef;



  ngAfterViewInit(): void {

    if(!this.divMap) throw 'El elemento html no fue encontrado.'

    const map = new Map({
      container: this.divMap?.nativeElement, // container id
      style: 'https://demotiles.maplibre.org/style.json', // style URL
      center: [0, 0], // starting position [lng, lat]
      zoom: 1 // starting zoom
    });
  }

}

