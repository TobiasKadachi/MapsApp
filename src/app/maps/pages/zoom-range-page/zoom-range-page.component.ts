import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import 'maplibre-gl/dist/maplibre-gl.css';
import { LngLat, Map } from 'maplibre-gl';

@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{



  @ViewChild('map') divMap!: ElementRef;

  public zoom: number = 0;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-0, 0);



  ngAfterViewInit(): void {

    if(!this.divMap) throw 'El elemento html no fue encontrado.'

    this.map = new Map({
      container: this.divMap.nativeElement, // container id
      style: 'https://demotiles.maplibre.org/style.json', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom // starting zoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners(){
    if( !this.map ) throw 'Mapa no inicializado';

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if( this.map!.getZoom() < 5) return;

      this.map?.zoomTo(5);
    });

    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter();
      const { lng, lat } = this.currentLngLat;
    })

  }

  zoomIn(){
    this.map?.zoomIn()


  }

  zoomOut(){
    this.map?.zoomOut()

  }

  zoomChanged(value: string){
    this.zoom = Number(value);
    this.map?.zoomTo( this.zoom );
  }

}
