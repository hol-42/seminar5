## Seminar 5

In diesem Seminar werden wir mit Angular 2 von der Command Line aus arbeiten. 
Zuerst etwas umschauen. node.js ist schon vorinstalliert.

1. Cloud 9 mit nur Blank Ubuntu anlegen
2. In der Bash `node` eingeben, dann Javascript ausprobieren
```
hol42:~/workspace $ node
> console.log('hallo welt')
hallo welt
undefined
> process.exit()
```
3. Zuerst müssen wir Node auf die neueste Version bringen:
```
nvm install stable
```
Erklärung: `nvm` ist der Node Version Manager

4. Um Angular 2 Command Line Tool (Abgekürzt CLI) benutzen zu können:
```
npm install -g @angular/cli
```
Erklärung: npm ist der Nodes Package Manager. Der Parameter `install` lädt 
von der https://www.npmjs.com/ Webseite wo alle node module veröffentlicht
werden, die dann alle Open Source sind und die Sourcen immer auf Github
dann gehostet werden. `-g` bedeutet, dass die Angular CLI nicht nur
in diesem Verzeichnis installiert wird sondern global. Das wird 
später noch etwas näher erklärt.

5. Jetzt da wir das Angular 2 CLI installiert haben verwenden wir es
um die erste Angular 2 Anwendung aufzubauen. 

```
ng new my-app
```
6. Jetzt wurden im Verzeichnis `my-app` jede Menge Dateien angelegt.
Das meiste benötigen wir im Moment nicht. Aber zunächst gehen wir
in das Verzeichnis:
```
cd my-app
```
7. Und jetzt starten wir mal die angelegte App
```
ng serve --host 0.0.0.0  
```
Eigentlich würde es `ng server --open` heissen. Aber in dem Docker
Container in dem wir uns befinden (in der Cloud9) gibt es gar
keine grafische Oberfläche. Ausserdem würde dann der Server
auf http://localhost:8080 laufen und das funktioniert auch nicht. 
Aber mit `--host 0.0.0.0` kann man Cloud9 überzeugen und dann kann
man von jeder belieben Stelle aus einfach drauf zugreifen mit 
`http://<workspace>.<username>.c9users.io:8080/`
z.B. http://seminar5.hol42.c9users.io:8080/

8. Jetzt solltest Du 'app works!' im Browser sehen
9. Verändere etwas: Navigiere in Cloud 9 im "Workspace" zu der Source
die den Text "app works!" enthält:

my-app > src > app > app.component.ts

(Das ist nicht Javascript, das ist jetzt) Typescript und das das zwei Punkte
im Filenamen sind, lässt vielleicht den einen oder anderen zusammenzucken, aber 
in Angular 2 und allgemein Node finden sie diese Namenskonvention scheinbar 
cool.

Also editere mal was anders rein:

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sehen wir mal ob das funktioniert!';
}
```
Der Browser find beim Speichern automatisch aktualisiert. Wir arbeiten hier 
mit Hot Reload. Das ist ein Feature den uns Webpack bringt.

Webpack ist ein node Modul, dass im Build Prozess benutzt wird und im Development
Modus dann immer auf Dateiänderungen achtet und dann dem Browser mitteilt, dass
sich etwas verändert hat. Teilweise funktioniert das sogar ohne Reload im
Browser, sondern nur im Hintergrund wird verändert. Aber bei diesem zentralen
Modul ist Webpack der Meinung, dass es gleich alles noch einmal lädt.

10. Als nächstes wollen wir eine eigene Komponente erstellen. Unter
my-app/src/app erstelle das File uhrzeit.component.ts:

```
import { Component } from '@angular/core';

@Component({
  selector: 'uhr-zeit', // Muss ein Bindestrich haben
  // Wenn man mehrere Zeilen machen will kann man Backticks verwenden oder ein sperates File benutzen
  template: '<p>Uhrzeit: {{ uhrZeit }}</p>'
})
export class UhrZeitComponent {
  uhrZeit: string = Date()
}
```
Diese kann jetzt verwendet werden. Editiere app.component.html:
```
<h1>
  {{title}}<br>
  <uhr-zeit></uhr-zeit>
</h1>
```
Damit das Tag verwendet werden kann, muss die Klasse UhrZeitComponent (die
ja exportiert wurde) in das App Modul importiert werden. Editiere also noch
app.module.ts:
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UhrZeitComponent } from './uhrzeit.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    UhrZeitComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
11. Als letztes möchte ich noch gerne zeigen wie node.js verschiedenste
Module zur Verfügung stellt.

Das formatieren von Uhrzeiten ist in Javascript manchmal etwas schwerfällig. 
Einfacher funktioniert es mit https://www.npmjs.com/package/dateformat

Dazu in der Commando-Zeile kurz mal den Server abbrechen (CTRL+C). Dann 
eingeben: 
```
npm install dateformat
```
Dateformat ist jetzt verfügbar in diesem Projekt (nicht global). 
Jetzt kannst Du es so machen (in uhrzeit.component.ts):
```js
  uhrZeit: string = dateFormat(Date(), "dd.mm.yyyy h:MM:ss");
```
