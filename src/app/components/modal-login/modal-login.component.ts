import { HttpStatusCode } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { User } from 'src/app/models/user';
import { ScreenReaderAnnouncerService } from 'src/app/services/screen-reader-announcer.service';
import { UserDataService } from 'src/app/services/user.data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss'],
})
export class ModalLoginComponent implements AfterViewInit, OnDestroy {
  modalRef?: BsModalRef;
  current: number = 0;
  images = [
    { key: 'octopus', src: 'assets/images/octopus.png', alt: 'Polvo' },
    { key: 'panda', src: 'assets/images/panda.png', alt: 'Panda' },
    { key: 'lion', src: 'assets/images/lion.png', alt: 'Leão' },
    { key: 'unicorn', src: 'assets/images/unicorn.png', alt: 'Unicórnio' },
    { key: 'raccoon', src: 'assets/images/raccoon.png', alt: 'Guaxinim' },
  ];

  @ViewChild('modalTemplate', { read: TemplateRef })
  modalTemplate?: TemplateRef<any>;

  userForm: FormGroup = this.formBuilder.group({
    nickName: [undefined, [Validators.required]],
    avatar: [this.images[0].key, [Validators.required]],
  });

  saving = false;
  modalShownSub?: Subscription;

  constructor(
    private modalService: BsModalService,
    private userService: UserService,
    private userDataService: UserDataService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private screenReaderAnnouncerService: ScreenReaderAnnouncerService
  ) {}

  ngAfterViewInit(): void {
    if (!this.userDataService.user) {
      this.showModal();
    }
  }

  focusFirstCharacter() {
    setTimeout(() => {
      const character = document.querySelector('.character');
      character && (character as HTMLElement).focus();
    }, 300);
  }

  focusPageHeader() {
    setTimeout(() => {
      const link = document.querySelector('.navbar .nav-link');
      link && (link as HTMLElement).focus();
    }, 300);
  }

  ngOnDestroy(): void {
    this.modalShownSub?.unsubscribe();
  }

  showModal(): void {
    if (this.modalTemplate) {
      this.modalShownSub = this.modalService.onShown.subscribe(() => {
        this.focusFirstCharacter();
      });

      this.modalRef = this.modalService.show(this.modalTemplate, {
        class: 'modal-dialog-centered',
        keyboard: false,
        closeInterceptor: () => new Promise((_, reject) => reject()),
      });
    }
  }

  selectImage(index: number): void {
    this.current = index;
    const selected = this.images[this.current];
    this.userForm.patchValue({ avatar: selected.key });
    this.screenReaderAnnouncerService.postMessage(
      `${selected.key} selecionado`
    );
  }

  createUser(): void {
    const { nickName, avatar } = this.userForm.value;
    const user = new User(nickName, avatar);
    this.saving = true;
    this.userService.save(user).subscribe({
      next: (user) => {
        this.userDataService.user = user;
        this.modalRef?.hide();
        this.toastr
          .success('Usuário salvo com sucesso!', 'Sucesso!')
          .onHidden.pipe(take(1))
          .subscribe(() => {
            this.focusPageHeader();
            this.screenReaderAnnouncerService.postMessage('Página Inicial');
          });
      },
      error: (err) => {
        this.saving = false;
        console.error(err);
        if (err.status === HttpStatusCode.UnprocessableEntity) {
          this.userDataService.user = user;
          this.modalRef?.hide();
          this.toastr.success('Bem-vindo de volta!', 'Sucesso!');
        } else {
          this.toastr.error('Ocorreu um erro. Tente novamente!', 'Erro!');
        }
      },
    });
  }
}
