import { HttpStatusCode } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserDataService } from 'src/app/services/user.data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss'],
})
export class ModalLoginComponent implements AfterViewInit {
  modalRef?: BsModalRef;
  current: number = 0;
  images = [
    { key: 'octopus', src: 'assets/images/octopus.png' },
    { key: 'panda', src: 'assets/images/panda.png' },
    { key: 'lion', src: 'assets/images/lion.png' },
    { key: 'unicorn', src: 'assets/images/unicorn.png' },
    { key: 'raccoon', src: 'assets/images/raccoon.png' },
  ];

  @ViewChild('modalTemplate', { read: TemplateRef })
  modalTemplate?: TemplateRef<any>;

  userForm: FormGroup = this.formBuilder.group({
    nickName: [undefined, [Validators.required]],
    avatar: [this.images[0].key, [Validators.required]],
  });

  saving = false;

  constructor(
    private modalService: BsModalService,
    private userService: UserService,
    private userDataService: UserDataService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit(): void {
    if (!this.userDataService.user) {
      this.showModal();
    }
  }

  showModal(): void {
    if (this.modalTemplate) {
      this.modalRef = this.modalService.show(this.modalTemplate, {
        class: 'modal-dialog-centered',
        keyboard: false,
        closeInterceptor: () => new Promise((_, reject) => reject()),
      });
    }
  }

  selectImage(index: number): void {
    this.current = index;
    this.userForm.patchValue({ avatar: this.images[this.current].key });
  }

  createUser(): void {
    const { nickName, avatar } = this.userForm.value;
    const user = new User(nickName, avatar);
    this.saving = true;
    this.userService.save(user).subscribe({
      next: (user) => {
        this.userDataService.user = user;
        this.modalRef?.hide();
        this.toastr.success('Usuário salvo com sucesso!', 'Sucesso!');
      },
      error: (err) => {
        this.saving = false;
        console.error(err);
        if (err.status === HttpStatusCode.UnprocessableEntity) {
          this.toastr.error('Este apelido já existe!', 'Erro!');
        } else {
          this.toastr.error('Ocorreu um erro. Tente novamente!', 'Erro!');
        }
      },
    });
  }
}
