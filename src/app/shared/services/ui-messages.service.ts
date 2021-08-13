import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class UiMessagesService {

  constructor() { }

  uiMessageAutoClose(titulo: string, sub: string) {
    let timerInterval: any;
    const ref = Swal.fire({
      title: titulo,
      html: sub,
      //timer: 5000,
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
        // let b = Swal.getHtmlContainer()?.querySelector('b')?.textContent
        timerInterval = setInterval(() => {
          // b = Swal.getTimerLeft() as unknown as string
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    })
    return ref;
  }
  
  uiMessageError(text:any, title:string, footer?: string) {
    Swal.fire({
      icon: 'error',
      title,
      text,
      footer
    })
  }

  successMessage(title: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title,
      showConfirmButton: true,
      timer: 1000
    })
  }
}
