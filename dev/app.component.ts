import { Component } from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `
        <div class="col-md-12">
            <h1>Boilerplate app</h1>
        </div> 
        <div class="col-md-6">
            <span>Links</span>
        </div>
        <div class="col-md-6">
            <span>Rechts</span>
        </div>     
    `
})

export class AppComponent { }