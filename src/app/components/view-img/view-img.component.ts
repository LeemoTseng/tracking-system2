import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-img',
  imports: [MatIconModule, CommonModule],
  templateUrl: './view-img.component.html',
  styleUrl: './view-img.component.css'
})
export class ViewImgComponent {

  /*--------- Input data ---------*/
  
  http = inject(HttpClient);

  /*--------- Input data ---------*/

  @Input() imgList: any

  /*--------- Output data ---------*/

  @Output() closeClicked = new EventEmitter<boolean>();
  
  /*--------- Variables ---------*/

  currentIndex: number = 0

  imgList2: any[] = [
    {
      id:1,
      img: 'https://picsum.photos/id/684/80/1200',
      name: 'snow'
    },
    {
      id:2,
      img: 'https://picsum.photos/id/685/600/900',
      name: 'mountain'
    },
    {
      id:3,
      img: 'https://picsum.photos/id/699/600/430',
      name: 'grass'
    }
  ]

  
  /*--------- Data import ---------*/

  /*--------- Functions ---------*/

  ngOnInit(): void {
    console.log('imgList', this.imgList)
  }

  closeImg(e: any) {

    this.currentIndex = 0
  }

  get currentImg() {
    //this.postImgData(this.imgList[this.currentIndex].Guid)
    return this.imgList2[this.currentIndex];
    
  }

  nextImg() {
    this.currentIndex = (this.currentIndex + 1) % this.imgList2.length;
  }

  prevImg() {
    this.currentIndex = (this.currentIndex - 1 + this.imgList2.length) % this.imgList2.length;
  }


  /*
    postImgData(data: any): Observable<any> {
      return this.http.post<any>(`${this.imagesDataAPI}/data`, data);
    }
      獲得Img檔案
  */

  sendCloseClicked(){
    this.closeClicked.emit(false);
    console.log('sendCloseClicked')
  }

}
