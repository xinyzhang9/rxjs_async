import { Observable } from 'rxjs/Rx';

const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');

const start$ = Observable.fromEvent(startButton, 'click');
const interval$ = Observable.interval(1000);
const stop$ = Observable.fromEvent(stopButton, 'click');
const reset$ = Observable.fromEvent(resetButton, 'click');

const intervalThatStops$ = interval$
    .takeUntil(stop$);

const data = {count:0};
const inc = (acc) => ({count: acc.count + 1});
const reset = (acc) => data;

const incOrReset$ = Observable.merge(
    intervalThatStops$.mapTo(inc),
    reset$.mapTo(reset)
);
start$   
    .switchMapTo(incOrReset$)
    .startWith(data)
    .scan((acc,curr) => {
        return curr(acc);
    })
    .subscribe( (x) => console.log(x) );