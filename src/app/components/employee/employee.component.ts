import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatTable } from '@angular/material';
//import { DialogComponent } from  '../employee/dialog/dialog.component';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

 
  employees: Employee[] = [];
  salaries: number = 0;

  displayedColumns: string[] = ['fullName','salary'];
  
  dataSource: Employee[];
  
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  
   constructor(private router: Router,private route: ActivatedRoute,public dialog: MatDialog,private custService: EmployeeService) { }

  ngOnInit() {
    
    this.custService.getEmployees().subscribe(result => {
      this.employees = [...result]; 
      this.dataSource = this.employees;
     },
    error => {
        alert("getEmployees error : " + JSON.stringify(error));
    },
    () => {
        // 'onCompleted' callback.
        // No errors
    }
    );
   
    this.dataSource = this.employees;
 
  }

  
  onRowClicked(row) {
     this.router.navigate(['/employeeDetails'], { queryParams: { id: row.id, fullName:row.fullName ,phone: row.phone,email: row.email,salary: row.salary}});
  }

  openDialog(action,obj) {
    if (obj) obj.action = action;
    
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data:obj,
      autoFocus: false
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      if(result.event == 'Update')
      {
        this.updateRowData(result.data);
        this.table.renderRows();
      }
    });
  }
  
 
  
  updateRowData(row_obj){
    var employee = this.employees.find(x=> x.id === row_obj.id );
    if (employee)
    {
      
      employee.fullName = row_obj.fullName;
      employee.phone = row_obj.phone;
      employee.email = row_obj.email;
      employee.salary = row_obj.salary;
      
      this.custService.updateEmployeeDetails(employee).subscribe(result => {
        console.log("updateEmployeeDetails result : " + result );
      },
      error => {
          alert("updateEmployeeDetails error : " + error);
      },
      () => {
          // No errors
      }
      );

      this.table.renderRows();
   }

  }
  
  public GetControlValue(form: FormGroup, field: string){
    let el = document.querySelector('input[name="'+field+'"]');
    return form.get(field).value;
  }

  calcSalaries()
  {
    this.custService.calcSalaries(this.employees).subscribe(result => {
      console.log("calcSalaries result : " + result );
      this.salaries = result;
    },
    error => {
        alert("calcSalaries error : " + error);
    },
    () => {
        // No errors
    }
    );

  }
  


}
