import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dialog-confirm',
  standalone: true,
  imports: [],
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.css'
})
export class DialogConfirmComponent {
  public fName!: string;
  public fIndex: any;
  @ViewChild('confirmModal') confirmModal!: ElementRef;

  constructor() { }

  confirm() {
    // Perform confirmation actions
    this.closeModal();
  }

  cancel() {
    // Perform cancellation actions
    this.closeModal();
  }

  private closeModal() {
    const modal: any = this.confirmModal.nativeElement;
    modal.hide();
  }
}