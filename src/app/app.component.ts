import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {

  public readonly valueTypes: string[] = ['px', 'em', 'rem', '%'];
  public readonly initialWidth: string = '100';
  public blockSize = {width: this.initialWidth + this.valueTypes[0]};
  public reactiveMode: boolean = false;

  @ViewChild('form', {static: false}) form: NgForm;

  ngAfterViewInit(): void {
    this.form.valueChanges.subscribe((value: any) => {
      this.reactiveMode && this.changeBlockSizeParams(value);
    });

  }

  public _setValue(formValue: any): void {
    this.changeBlockSizeParams(formValue);
  }

  public modeChange(e: any): void {
    this.reactiveMode = e.target.checked;
  }

  private changeBlockSizeParams(value: any): void {
    (this.blockSize = {...this.blockSize, width: value.value + value.type});
  }
}
