import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {} from 'googlemaps';
import {ActivatedRoute, Router} from '@angular/router';
import {GpsData} from '../entity/gpsData';
import * as $ from "jquery";
import {MapService} from "@/_services/map.service";

declare var ol: any;
@Component({
  selector: 'app-workout-map',
  templateUrl: './workout-map.component.html',
  // styleUrls: ['./workout-map.component.css']
})
export class WorkoutMapComponent implements OnInit  {
  map: any;
  markerLayer:any;
  gpsData: Array<GpsData> = [];
  isLoadingResults = false;
  latitude = 51.23553;
  longitude = 22.54866;
  overlay: any;

  @ViewChild('popup', { static: false })
  container = document.getElementById('popup');

  @ViewChild('content', { static: false })
  content = document.getElementById('popup-content');
  popupOverlay: any;

  @ViewChild('closer', { static: false })
  closer = document.getElementById('popup-closer');

  @ViewChild('popup', { static: false })
  Force = document.getElementById('Force');


  constructor(private router: Router, private route: ActivatedRoute, private mapService: MapService) { }

  ngOnInit() {

    this.loadGpsData().subscribe((data: any) => {
      this.gpsData = data;
      this.prepareMap();
    });


  }

  loadGpsData() {
    return this.mapService.getRouteForWorkout(this.route.snapshot.params.id);
  }

  prepareRoute(){
    var punkty = this.gpsData.map(function(o) {
      return ol.proj.fromLonLat([o.gpsX, o.gpsY]);
    });
    return new ol.geom.LineString(punkty);
  }

  prepareMap(){
    this.map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
        //}).extend([mousePositionControl]),
      }),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: this.centerCoordinates(),
        zoom: 17
      })
    });

    ol.proj.fromLonLat([33.8, 8.4]);

    var layerLines = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: this.prepareRoute(),
          name: 'Line'
        })]
      }),
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'blue', width: 4}),
      })
    });
    this.map.addLayer(layerLines);

    var popup = new ol.Overlay({
      element: document.getElementById('Force')
    });
    this.map.addOverlay(popup);

    var extent = layerLines.getSource().getExtent();
    this.map.getView().fit(extent, this.map.getSize());

    this.map.on('click', function(evt) {
      var element = popup.getElement();
      var coordinate = evt.coordinate;
      var hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordinate));


      var modifyForce = 0;
      var forceBase = 15;
      var Force = (forceBase + modifyForce);
      var el = document.getElementById("Force");

      el.innerHTML = Force.toString();
      el.setAttribute('tooltip', forceBase + ' + ' + modifyForce);

      (<any>$(element)).popover('destroy');
      popup.setPosition(coordinate);
      (<any> $(element)).popover({
        placement: 'top',
        animation: false,
        html: true,
        content: '<p>The location you clicked was:</p><code>' + hdms + '</code>'
      });
      (<any> $(element)).popover('show');
    });
  }

  centerCoordinates() {
    var middleIndex = Math.floor(this.gpsData.length / 2);
    return ol.proj.fromLonLat([this.gpsData[middleIndex].gpsX, this.gpsData[middleIndex].gpsY]);
  }

}
