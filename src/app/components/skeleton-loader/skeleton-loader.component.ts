import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.css'],
})
export class SkeletonLoaderComponent {

  /*------- loading -------*/
  @Input() isSkeletonLoading: boolean = true;

}
