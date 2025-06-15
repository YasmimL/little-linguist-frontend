import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenReaderAnnouncerService {
  constructor() {}

  public postMessage(message: string) {
    const announcer = document.getElementById('screen-reader-announcer');
    if (announcer) {
      announcer.textContent = message;
    }
  }
}
