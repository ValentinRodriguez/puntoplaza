import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class UiMessagesService {

  constructor() { }

  uiMessageAutoClose() {
    let timerInterval: any;
    Swal.fire({
      title: 'Auto close alert!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 5000,
      timerProgressBar: true,
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
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }
}
