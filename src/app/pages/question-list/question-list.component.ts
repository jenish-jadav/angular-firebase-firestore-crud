import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  public errorMessage: String = "";
  activePage: number = 0;
  questionList: Observable<[]> | any = null;

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getQuestionList()
  }

  getQuestionList() {
    this.questionList = this.firestore.collection("questions").valueChanges({ idField: 'id' });
  }

  onAddNewRecordClick() {
    this.router.navigate(['/admin/questions/add']);
  }

  onEditRecordClick(id: string) {
    this.router.navigate([`/admin/questions/edit/${id}`]);
  }

  onDeleteRecordClick(id: string) {
    this.firestore.collection("questions")
      .doc(id).delete().then((result) => {
        this.displaySuccessMessage("Question deleted successfully!")
      }).catch((error) => {
        this.displayErrorMessage(error.message);
      })
  }
  displaySuccessMessage(message: string) {
    this.toastr.success(message);
  }
  displayErrorMessage(message: string) {
    this.toastr.error(message);
  }
}
