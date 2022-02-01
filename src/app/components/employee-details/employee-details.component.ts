import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit { 

  employee: Employee;
  form: FormGroup;

  id: string;
  fullName: string;
  phone: string;
  email: string;
  salary: number;
  
  isDisabled: boolean = false;
  result: string = '';

  constructor(private router: Router,private route: ActivatedRoute,private custService: EmployeeService,private fb: FormBuilder,public dialog : MatDialog) { 
  }

  ngOnInit() {
 
      this.route.queryParams.subscribe(params => {
        this.id = params['id'];
        this.fullName = params['fullName'];
        this.phone = params['phone'];
        this.email = params['email'];
        this.salary = params['salary'];
      });
  

      this.form = new FormGroup({
        id:new FormControl({value: this.id , disabled: true}),
        fullName: new FormControl({value: this.fullName, disabled: this.isDisabled}),
        phone: new FormControl({value: this.phone, disabled: this.isDisabled}),
        email: new FormControl({value: this.email, disabled: this.isDisabled}),
        salary: new FormControl({value: this.salary, disabled: this.isDisabled})
      });

  
}


  onSubmit()
  {
    console.warn(this.form.value);
  }

 
save() {

   
   var request = this.form.getRawValue();

   const message = '';;

   this.custService.updateEmployeeDetails(request).subscribe(result => {
     this.confirmDialog( ` ! פרטי העובד עודכנו בהצלחה `);

   },
   error => {
       this.confirmDialog( ` שגיאה בשמירת הנתונים ` + error);
   },
   () => {
       // No errors
   }
   );

}


public GetControlValue(form: FormGroup, field: string){
  let el = document.querySelector('input[name="'+field+'"]');
  return form.get(field).value;
}

confirmDialog(message:string): void {

  const dialogData = new ConfirmDialogModel(" עדכון פרטי עובד ", message);

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    this.result = dialogResult;
  });
}
}
