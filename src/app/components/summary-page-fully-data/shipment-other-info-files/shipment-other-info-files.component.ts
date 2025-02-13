import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, inject, Output } from '@angular/core';
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

  /*--------- style settings ---------*/
  skeletonClass: string = 'w-full h-5 rounded bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear]';



  /*--------- Data output ---------*/

  /*--------- Data import ---------*/
  filesDataAPI = environment.baseAPI

  trackingNo: string = 'THI132400003';

  getFilesData(trackingNo: string): Observable<any[]> {
    const params = new HttpParams().set('trackingNo', trackingNo);
    return this.http.get<any[]>(`${this.filesDataAPI}TrackingApi/fileList`, { params });
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
    // console.log('API URL:', this.filesDataAPI)
    // console.log('Tracking No:', this.trackingNo);

    console.log(this.filesDataAPI)
    this.getFilesData(this.trackingNo).subscribe({
      next: (res) => {
        console.log('res', res)
        // files
        this.allFiles = res
        this.files = this.allFiles.data.Documents
        this.newFilesList = this.transformAndSortFiles(this.files)

        // images
        this.allImages = this.allFiles.data.Pictures
        console.log('allImages', this.allImages)
        this.newImagesList = this.renderImage(this.allImages)
        console.log('imagefileList', this.newImagesList)

        this.isSkeletonLoading = false;


      },
      error: (err) => {
        console.log('error', err)
        this.isSkeletonLoading = false;
      },
      complete: () => {}
    })
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




