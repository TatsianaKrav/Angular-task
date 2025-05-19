import { Component } from '@angular/core';
import { TreeComponent } from './components/tree/tree.component';
import { treeData } from './utils/data';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TreeComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  data = treeData;
  form: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      myTree: [[]]
    });
  }
}
