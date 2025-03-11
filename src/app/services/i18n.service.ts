import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class I18nService {
  private availableLangs = ['en', 'tw', 'cn'];
  private currentLangSubject = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLangSubject.asObservable();

  constructor(private translate: TranslateService) {
    this.translate.addLangs(this.availableLangs);
    this.translate.setDefaultLang('en');
  }

  // currentLang getter
  getCurrentLang(): string {
    return this.currentLangSubject.value;
  }

  // language settings
  setLanguage(lang: string) {
    if (!this.availableLangs.includes(lang)) {
      lang = 'en';
    }
    this.translate.use(lang);
    this.currentLangSubject.next(lang);
  }

  // get translation
  getTranslationAsync(key: string, params?: any) {
    return this.translate.get(key, params);
  }

}
