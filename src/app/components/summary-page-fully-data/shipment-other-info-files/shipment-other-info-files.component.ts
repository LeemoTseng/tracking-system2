import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../.environments/environment.prod';
import { Observable } from 'rxjs';
import { ViewImgComponent } from '../../view-img/view-img.component';


@Component({
  selector: 'app-shipment-other-info-files',
  imports: [MatIconModule, MatRipple, ViewImgComponent],
  templateUrl: './shipment-other-info-files.component.html',
  styleUrl: './shipment-other-info-files.component.css'
})
export class ShipmentOtherInfoFilesComponent {

  /*--------- Inject ---------*/
  http = inject(HttpClient);
  
  /*--------- @Iutput ---------*/
  @Input() trackingNumber: string = '';
  

  /*--------- style settings ---------*/
  skeletonClass: string = 'w-full h-5 rounded bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear]';

  /*--------- Data output ---------*/

  /*--------- Data import ---------*/
  filesDataAPI = environment.baseAPI


  getFilesData(trackingNumber: string): Observable<any[]> {
    const token = this.getCookie('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams().set('trackingNo', trackingNumber);

    return this.http.get<any[]>(`${this.filesDataAPI}TrackingApi/fileList`, { headers, params });
  }


  /*--------- Variables ---------*/

  // skeleton loader
  isSkeletonLoading: boolean = true;

  // files
  allFiles: any = []
  files: any[] = []
  newFilesList: any[] = []
  allImages: any = []
  newImagesList: any[] = []

  // image viewer
  isViewImg: boolean = false;



  /*--------- Functions ---------*/

  ngOnInit(): void {

    // 測試用：this.getFilesData('THI132400003').subscribe({
      this.getFilesData(this.trackingNumber).subscribe({
      next: (res) => {
        // files
        this.allFiles = res
        this.files = this.allFiles.data.Documents
        this.newFilesList = this.transformAndSortFiles(this.files)

        // images
        this.allImages = this.allFiles.data.Pictures
        this.newImagesList = this.renderImage(this.allImages)

        this.isSkeletonLoading = false;

      },
      error: (err) => {
        console.log('error', err)
        this.isSkeletonLoading = false;
      },
      complete: () => { }
    })
  }


  // get coolies
  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }


  // rearrange files
  transformAndSortFiles(files: any[]): { Type: string, Name: string, Guid: string }[] {
    let newFilesList: { Type: string, Name: string, Guid: string }[] = []
    files.forEach((file) => {
      if (file.Files == 0) {
        newFilesList.push({
          Type: file.FileType ? file.FileType : '',
          Name: '',
          Guid: ''
        });
      } else {
        file.Files.forEach((f: any) => {
          newFilesList.push({
            Type: file.FileType ? file.FileType : '',
            Name: f.FileName ? f.FileName : '',
            Guid: f.Guid ? f.Guid : ''
          });
        });
      }
    })

    // The sequence of the files
    const sequence = ['PACKING', 'INVOICE', 'HAWB', 'MAWB', 'POD', 'OTHER'];
    newFilesList.sort((a, b) => sequence.indexOf(a.Type) - sequence.indexOf(b.Type));
    return newFilesList;
  }

  // render images
  renderImage(images: any): any[] {
    let newList: any = []

    images.forEach((img: any) => {
      if (img.Files != 0) {
        img.Files.forEach((f: any) => {
          newList.push({
            Type: this.trangeFileName(img.FileType),
            Name: f.FileName,
            Guid: f.Guid
          })
        })
      }

    })
    return newList;
  }

  trangeFileName(name: string): string {
    let newName = ''
    if (name = "DELIVERY") {
      newName = "Delivery"
    }
    if (name = "AIRPORT PICKUP") {
      newName = "Airport Pickup"
    }
    if (name = "WAREHOUSE") {
      newName = "Cargo Arrive Terminal"
    }
    return newName
  }

  // POST request to the API
  postFilesData(type: string, guid: string) {
    console.log(type, guid)
    /*
    postFilesData(data: any): Observable<any> {
      return this.http.post<any>(`${this.filesDataAPI}/data`, data);
    }
    */
  }

  postImgData(guid: string) {
    console.log(guid)
    this.isViewImg = true;

    /*
    postImgData(data: any): Observable<any> {
      return this.http.post<any>(`${this.imagesDataAPI}/data`, data);
    }
    */
  }

  // get close button



  getClosedStatus(e: any) {
    this.isViewImg = e;
    console.log('getClosedStatus', e)
  }




}




