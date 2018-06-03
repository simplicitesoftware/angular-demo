import { Component } from '@angular/core';
import Simplicite from 'simplicite';

let app = Simplicite.session({
	url: 'https://demo.dev.simplicite.io',
	username: 'website',
	password: 'simplicite',
	debug: true
});

app.login().then(function(params) {
	console.log('Logged in as ' + params.username);
	return app.getGrant(); // next promise
}, function(reason) {
	app = null;
	console.log('Login failed (status: ' + reason.status + ', message: ' + reason.message + ')');
}).then(function(grant) {
	if (!app) return;
	console.log('Hello ' + grant.getLogin() + '!');
});

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Angular demo';
}
