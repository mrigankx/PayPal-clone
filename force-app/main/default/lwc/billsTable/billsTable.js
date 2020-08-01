import { LightningElement, track, wire } from "lwc";
import getBillsList from "@salesforce/apex/WalletData.getBillsList";
import getWalletList from "@salesforce/apex/WalletData.getWalletList";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";
import payBills from "@salesforce/apex/WalletData.payBills";
import { getFieldValue } from "lightning/uiRecordApi";

import WALLET_BALANCE_FIELD from "@salesforce/schema/Wallet__c.Balance__c";

const columns = [
  //creating columns for data-table
  { label: "Bill Id", fieldName: "Bill_id__c", type: "text" },
  { label: "Name", fieldName: "Name" },
  { label: "Amount", fieldName: "Amount__c", type: "currency" },
  { label: "Offer applied(%)", fieldName: "Offer_applied__c", type: "number" },
  { label: "Category", fieldName: "Category__c", type: "text" },
  { label: "Pay Before", fieldName: "Pay_before__c", type: "text" },
  { label: "Paid?", fieldName: "Paid__c", type: "boolean" },
  { label: "Successfull?", fieldName: "Successful__c", type: "boolean" },
  {
    type: "button",
    fixedWidth: 150,
    typeAttributes: {
      label: "Pay Bill",
      title: "Pay Bill",
      name: "payBill",
      value: "payBills",
      variant: "brand"
    }
  }
];
export default class BillsTable extends NavigationMixin(LightningElement) {
  @track bills;
  bill;
  columns = columns;
  @track wallData;
  wallet = {};
  @track record = {};
  amount;
  balance;
  @wire(getWalletList)
  wiredwallet({ error, data }) {
    if (data) {
      this.wallet = data;
      this.wallData = JSON.stringify(this.wallet); //to store the information in a form of string
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.wallet = undefined;
    }
  }
  @wire(getBillsList)
  wiredbills({ error, data }) {
    if (data) {
      this.bills = data;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.bills = undefined;
    }
  }

  callRowAction(event) {
    const actionName = event.detail.action.name;
    // const row = event.detail.row; //store the row information of clicked event target
    // this.record = row;
    this.record = event.detail.row;
    this.amount = this.record.Amount__c; //storing the amount in a variable
    var data = JSON.parse(this.wallData); //parsing the string to object
    this.balance = data[0].Balance__c; //as there is only one record fetched from wallet, so we have to store thet record from list
    if (actionName === "payBill") {
      if (this.record.Paid__c == true && this.record.Successful__c == true) {
        const evt = new ShowToastEvent({
          title: "",
          message: "Already Paid",
          variant: "success",
          mode: "dismissable"
        });
        this.dispatchEvent(evt);
      } else if (this.amount <= this.balance) {
        payBills({ id_str: this.record.Id })
          .then((result) => {
            this.bill = result;
          })
          .catch((error) => {
            this.error = error;
          });
        const evt = new ShowToastEvent({
          title: "",
          message: "Bill Paid",
          variant: "success",
          mode: "dismissable"
        });
        this.dispatchEvent(evt);
        eval("$A.get('e.force:refreshView').fire();");
        window.location.reload();
      } else {
        const evt = new ShowToastEvent({
          //show an error message
          title: "",
          message: "Insufficient Balance",
          variant: "error",
          mode: "dismissable"
        });
        this.dispatchEvent(evt);
        this[NavigationMixin.Navigate]({
          //navigate to wallet page
          type: "standard__webPage",
          attributes: {
            url: "/lightning/n/Wallet"
          }
        });
      }
    }
  }
}
