import { Observable } from 'rxjs/Rx';

const startButton = document.querySelector('#start');

Observable.fromEvent(startButton, 'click')
    .subscribe( event => console.log(event));