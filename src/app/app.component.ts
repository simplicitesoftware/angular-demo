/*  ___ _            _ _    _ _
 * / __(_)_ __  _ __| (_)__(_) |_ ___
 * \__ \ | '  \| '_ \ | / _| |  _/ -_)
 * |___/_|_|_|_| .__/_|_\__|_|\__\___|
 *             |_|
 * This example is using the Simplicite node.js & browser JavaScript API
 */
import { Component } from '@angular/core';
import Simplicite from 'simplicite';

let app = Simplicite.session({
	url: 'https://demo.dev.simplicite.io',
	username: 'website',
	password: 'simplicite',
	debug: false
});

app.login().then(function(params) {
	console.log('Logged in as ' + params.username);
	return app.getGrant().then(function(grant) {
		console.log('Hello ' + grant.getLogin() + '!');
	});
}).fail(function(reason) {
	console.log('Login failed (status: ' + reason.status + ', message: ' + reason.message + ')');
});

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Angular demo';
}
