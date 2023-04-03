import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
// import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
// import 'rxjs/add/operator/filter';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';


@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss']
})

export class AdminLayoutComponent implements OnInit {
    constructor() { }
    ngOnInit(): void {

    }
}

