import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean = false;

  private _notifyUpload = new EventEmitter<any>();

  private _handlerLoginEventEmitter = new EventEmitter();


  constructor() {}

  get handlerLoginEventEmitter() {
    return this._handlerLoginEventEmitter;
  }

  get notifyUpload(): EventEmitter<any> {
    return this._notifyUpload;
  }


  openModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }
}
