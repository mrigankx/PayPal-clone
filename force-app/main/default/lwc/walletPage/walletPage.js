import { LightningElement, api, wire, track } from "lwc";
import getWalletList from "@salesforce/apex/WalletData.getWalletList";
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class walletPage extends NavigationMixin(LightningElement) {
  @track wallet; //to store data from apex method 'getWalletList'
  error;
  @track balance;
  @track pals;
  @api recordId;

  @wire(getWalletList)
  wiredwallet({ error, data }) {
    if (data) {
      this.wallet = data;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.wallet = undefined;
    }
  }
  
  handleBal(event) {
    this.balance = event.detail.value; //store the changed value from inputField to a variable
  }

  updateBalance(event) {
    const evt = new ShowToastEvent({
      title: "",
      message: "Insufficient Balance",
      variant: "error",
      mode: "dismissable"
    });
    this.dispatchEvent(evt);
  }
  sendMoney(event) {
    this[NavigationMixin.Navigate]({
      //navigate to sendmoney page
      type: "standard__webPage",
      attributes: {
        url: "/lightning/n/SendMoney"
      }
    });
  }
}