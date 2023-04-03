import { Component, OnInit } from '@angular/core';
import { StorageService, StorageKey } from '../../shared/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public storageService: StorageService, private router: Router) {
    if (this.storageService.getValue(StorageKey.IsDiyanLogin) !== 'true') {
      this.router.navigate(['/admin/admin-login']);
    }
  }

  ngOnInit(): void {
  }

}
