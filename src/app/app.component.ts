import { AfterViewInit, OnInit } from '@angular/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, interval, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular-observable-switchmap';

  //inner observable example
  srcObservable = of(1, 2, 3, 4)
  innerObservable = of('A', 'B', 'C', 'D')
  obs = of(1, 2, 3, 4)

  ngOnInit() {
    this.srcObservable.pipe(
      switchMap(val => {
        console.log('Source value ' + val)
        console.log('starting new observable')
        return this.innerObservable
      })
    )
      .subscribe(ret => {
        console.log('Recd ' + ret);
      })

    this.obs.pipe(
      switchMap(val => {
        return of(val * 2)  //Returning observable
      })
    )
      .subscribe(ret => {
        console.log('Recd from switchMap : ' + ret);
      })
  }

  //button example
  @ViewChild('btn', { static: true }) button: ElementRef;
  clicks$: Observable<any>;

  ngAfterViewInit() {
    this.clicks$ = fromEvent(this.button.nativeElement, 'click');
    this.switchExample();
  }

  switchExample() {
    this.clicks$
      .pipe(
        switchMap(() => {
          return interval(500)
        })
      )
      .subscribe(val => console.log(val));
  }
}
