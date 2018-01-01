import { Observable } from 'rxjs/Rx';

const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');

const start$ = Observable.fromEvent(startButton, 'click');
const interval$ = Observable.interval(1000);
const stop$ = Observable.fromEvent(stopButton, 'click');

const intervalThatStops$ = interval$
    .takeUntil(stop$);

start$   
    .switchMapTo( intervalThatStops$ )
    .startWith(0)
    .scan((acc,curr) => {
        return acc+1
    })
    .subscribe( x => console.log(x) );