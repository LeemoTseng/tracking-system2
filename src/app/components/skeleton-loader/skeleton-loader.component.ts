import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  imports: [],
  templateUrl: './skeleton-loader.component.html',
  animations: [
    trigger('shimmer', [
      transition(':enter', [
        animate(
          '1.5s linear infinite',
          keyframes([
            style({ backgroundPosition: '-200% 0', offset: 0 }),
            style({ backgroundPosition: '200% 0', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SkeletonLoaderComponent {


  /*------- loading -------*/
  @Input() isLoading: boolean = false;

}
