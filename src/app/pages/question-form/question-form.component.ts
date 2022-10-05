import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {

  inputForm = this.fb.group({
    question: ['', Validators.required],
    question_type: ['', Validators.required],
    question_active: ['']
  });
  errorMessage: String = "";
  isNewRecord = false;
  questionIdFromRoute: any = null;

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.questionIdFromRoute = routeParams.get('id');
    this.isNewRecord = this.questionIdFromRoute === null
    if (!this.isNewRecord) {
      this.getQuestionById(this.questionIdFromRoute)
    }
  }

  get f() { return this.inputForm.value; }

  getQuestionById(questionId: string) {
    this.firestore.collection("questions")
      .doc(questionId).ref.get().then((item) => {
        if (item.exists) {
          const data = item.data() as any
          this.inputForm.get("question")?.setValue(data.question);
          this.inputForm.get("question_type")?.setValue(data.type);
          this.inputForm.get("question_active")?.setValue(data.active);
        } else {
          this.displayErrorMessage("Question not found");
          this.redirectToList();
        }
      })
  }

  onSubmitClick() {
    this.errorMessage = "";
    if (!this.inputForm.valid) {
      this.errorMessage = "Fill required information!"
      return;
    }
    const data = {
      question: this.f.question,
      type: this.f.question_type,
      active: this.f.question_active || false,
    }
    if (!this.isNewRecord) {
      this.firestore
        .collection("questions")
        .doc(this.questionIdFromRoute).update(data).then((docRef) => {
          this.displaySuccessMessage("Question updated successfully!")
          this.redirectToList();
        }).catch((error) => {
          this.displayErrorMessage(error.messgae);
        })
    } else {
      this.firestore
        .collection("questions")
        .add(data).then((docRef) => {
          this.displaySuccessMessage("Question added successfully!")
          this.redirectToList();
        }).catch((error) => {
          this.displayErrorMessage(error.messgae);
        })
    }
  }
  onCancelClick() {
    this.redirectToList();
  }
  redirectToList() {
    this.router.navigate(['/admin/questions']);
  };
  displaySuccessMessage(message: string) {
    this.toastr.success(message);
  }
  displayErrorMessage(message: string) {
    this.toastr.error(message);
  }
}
