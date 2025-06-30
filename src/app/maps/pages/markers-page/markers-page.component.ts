import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'maplibre-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {
  @ViewChild('map') divMap!: ElementRef;

  public markers: MarkerAndColor[] = [];

  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-0, 0);



  ngAfterViewInit(): void {

    if(!this.divMap) throw 'El elemento html no fue encontrado.'

    this.map = new Map({
      container: this.divMap.nativeElement, // container id
      style: 'https://demotiles.maplibre.org/style.json', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 0 // starting zoom
    });

    // const markerHTML = document.createElement('div');
    // markerHTML.innerHTML = 'Victor'

    // const marker = new Marker({
    //   element: markerHTML
    // })
    // .setLngLat([-4.0, 40.5])
    // .addTo( this.map );

  }

  createMarker(){
    if( !this.map ) return;


    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lnglat = this.map.getCenter();

    this.addMarker( lnglat, color );


  }

  addMarker( lnglat: LngLat, color: string ){
    if( !this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true
    }).setLngLat( lnglat )
      .addTo( this.map );

      this.markers.push({ color, marker });
  }

  deleteMarker( index: number ){
    this.markers[index].marker.remove();
    this.markers.splice(index, 1)
  }

  flyTo( marker: Marker ){
    this.map?.flyTo({
      zoom: 5,
      center: marker.getLngLat()
    })
  }

}
