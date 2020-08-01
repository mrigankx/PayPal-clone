import { LightningElement, api, track, wire } from "lwc";
import getPassbook from "@salesforce/apex/WalletData.getPassbook";

export default class PassbookTable extends LightningElement {
  @track pbook;
  @wire(getPassbook)
  wiredpassbook({ error, data }) {
    if (data) {
      this.pbook = data;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.pbook = undefined;
    }
  }
  sendRecord(event) {
    var id = event.target.dataset.id;
  }
}