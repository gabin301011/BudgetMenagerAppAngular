import { Component, OnInit, ViewChild } from '@angular/core';
import { BudgetItem } from 'src/shared/models/budget-item.model';
import { UpdateEvent } from '../budget-item-list/budget-item-list.component';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;

  budgetItems: BudgetItem[] = new Array<BudgetItem>();
  totalBudget: number = 0;
  income: number = 0;
  expenses: number = 0;

  public doughnutChartLabels = ['Income', 'Expenses'];
  public doughnutChartData = [1,1];
  public doughnutChartType = 'doughnut';

  constructor() {}

  ngOnInit() {}

  ngDoCheck() {
    setTimeout(() => {
      this.chart.chart.data.datasets[0].data = [this.income, this.expenses]
      this.chart.chart.update();
  }, 2000);
  }

  updateChart() {
    this.chart.chart.update(); // This re-renders the canvas element.
}

  addItem(newItem: BudgetItem) {
    this.budgetItems.push(newItem);
    this.totalBudget += newItem.amount;
    if(newItem.amount>0) {
      this.income += newItem.amount;
    }
    else if(newItem.amount<0) {
      this.expenses += newItem.amount;
    }
    //this.reset();
    //this.ngOnInit;
  }

  deleteItem(item: BudgetItem) {
    let index = this.budgetItems.indexOf(item);
    this.budgetItems.splice(index, 1);
    this.totalBudget -= item.amount;
    if(item.amount>0) {
      this.income -= item.amount;
    }
    else if(item.amount<0) {
      this.expenses -= item.amount;
    }
  }

  updateItem(updateEvent: UpdateEvent) {
    // result is the update budget item
    // replace the item with the updated/submitted item from the form
    this.budgetItems[this.budgetItems.indexOf(updateEvent.old)] = updateEvent.new;

    // update the total budget
    this.totalBudget -= updateEvent.old.amount;
    this.totalBudget += updateEvent.new.amount;

    if(updateEvent.old.amount>0) {
      this.income -= updateEvent.old.amount;
      this.income += updateEvent.new.amount;
    }
    else if(updateEvent.old.amount<0) {
      this.expenses -= updateEvent.old.amount;
      this.expenses += updateEvent.new.amount;
    }
  }
}
