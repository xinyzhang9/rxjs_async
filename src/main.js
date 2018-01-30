import { Observable } from 'rxjs/Rx';

const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');
const halfButton = document.querySelector('#half');
const quarterButton = document.querySelector('#quarter');

const start$ = Observable.fromEvent(startButton, 'click');
const interval$ = Observable.interval(1000);
const stop$ = Observable.fromEvent(stopButton, 'click');
const reset$ = Observable.fromEvent(resetButton, 'click');
const half$ = Observable.fromEvent(halfButton, 'click');
const quarter$ = Observable.fromEvent(quarterButton, 'click');

const intervalThatStops$ = interval$
    .takeUntil(stop$);

const data = {count:0};
const inc = (acc) => ({count: acc.count + 1});
const reset = (acc) => data;

const incOrReset$ = Observable.merge(
    intervalThatStops$.mapTo(inc),
    reset$.mapTo(reset)
);
Obserable.merge(
        start$.mapTo(1000),
        half$.mapTo(500),
        quarter$.mapTo(250)
    )   
    .switchMapTo(incOrReset$)
    .startWith(data)
    .scan((acc,curr) => {
        return curr(acc);
    })
    .subscribe( (x) => console.log(x) );