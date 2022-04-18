import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogComponent} from "./dialog/dialog.component";
import {ApiService} from './services/api.service';
import { OnInit,ViewChild } from '@angular/core';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angularcrud';

  displayedColumns: string[] = ['productName', 'category', 'price', 'comment', 'date', 'freshness'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private api : ApiService){

  }

  ngOnInit(): void{
    this.getAllProducts();
  }

  openDialog(){
    this.dialog.open(DialogComponent, {
      width: '30%'
    })
  }
  getAllProducts(){
    this.api.getProduct()
    .subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=> {
        alert('Error while fetching doc')
      }
    })
  }
  applyFilter(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

}
