import { LightningElement, track, wire } from "lwc";
import sendMoneyToUsers from "@salesforce/apex/WalletData.sendMoneyToUsers";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class SendMoney extends LightningElement {
  @track palName;
  @track balance;
  @track val;
  @track error;
  @track amount;
  handlepal(event) {
    this.palName = event.detail.value;
  }
  handleamount(event) {
    this.amount = event.detail.value;
  }
  sendMoney(event) {
    this.palName = String(this.palName); // To convert palName Id from object to string
    this.val = sendMoneyToUsers({ amount: this.amount, sendId: this.palName });
    const evt = new ShowToastEvent({
      title: "",
      message: "Sent successfully",
      variant: "success",
      mode: "dismissable"
    });
    this.dispatchEvent(evt);
    eval("$A.get('e.force:refreshView').fire();"); // to refresh the view
  }
}
