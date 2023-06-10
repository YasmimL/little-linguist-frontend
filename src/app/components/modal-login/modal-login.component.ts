import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss'],
})
export class ModalLoginComponent implements AfterViewInit {
  modalRef?: BsModalRef;
  current: number = 0;
  images = [
    { key: 'octopus', src: 'assets/images/login-img1.png' },
    { key: 'panda', src: 'assets/images/login-img2.png' },
    { key: 'lion', src: 'assets/images/login-img3.png' },
    { key: 'unicorn', src: 'assets/images/login-img4.png' },
    { key: 'raccoon', src: 'assets/images/login-img5.png' },
  ];

  @ViewChild('modalTemplate', { read: TemplateRef })
  modalTemplate?: TemplateRef<any>;

  constructor(private modalService: BsModalService) {}

  ngAfterViewInit(): void {
    this.showModal();
  }

  showModal(): void {
    if (this.modalTemplate) {
      this.modalRef = this.modalService.show(this.modalTemplate, {
        class: 'modal-dialog-centered',
      });
    }
  }

  selectImage(index: number): void {
    this.current = index;
  }
}
