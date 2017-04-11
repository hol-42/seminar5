import { Component } from '@angular/core';
import dateFormat from 'dateformat';

@Component({
  selector: 'uhr-zeit', // Muss ein Bindestrich haben
  // Wenn man mehrere Zeilen machen will kann man Backticks verwenden oder ein sperates File benutzen
  template: '<p>Uhrzeit: {{ uhrZeit }}</p>'
})
export class UhrZeitComponent {
  uhrZeit: string = dateFormat(Date(), "dd.mm.yyyy h:MM:ss");
}
