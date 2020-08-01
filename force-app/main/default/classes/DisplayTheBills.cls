public with sharing class DisplayTheBills {
    @auraEnabled
public static List<Bills__c> getBills(){
   List<Bills__c> exchange=[SELECT Name,for_user__c,bill_Id__c,Paid__c,Category__c, Amount__c, Offer_Applied__c, Pay_Before__c, Successful__c, Id FROM Bills__c];
    System.debug('Bill Record===>'+exchange);
    return exchange;
    
}
    @auraEnabled
    public static Boolean payBills(String id_str){
        Bills__c AmountInBill = [SELECT Amount__c,Paid__c,Successful__c FROM Bills__c where Id=:id_str];
         wallet__c BillPay = [SELECT Balance__c FROM wallet__c LIMIT 1]; 
        if((BillPay.Balance__c >= AmountInBill.Amount__c) && (AmountInBill.Paid__c==false ||AmountInBill.Successful__c==false))
        {
            BillPay.Balance__c-=AmountInBill.Amount__c;
            AmountInBill.Paid__c=true;
            AmountInBill.Successful__c=true;
            update AmountInBill;
            update BillPay;}
       else{
            return false;
        }
        return true;
    }
    @auraEnabled
    public static boolean IsPaid(String id_str){
        Bills__c AmountInBilled = [SELECT Amount__c,Paid__c,Successful__c FROM Bills__c where Id=:id_str];
        if(AmountInBilled.Paid__c==true || AmountInBilled.Successful__c==true)
            return false;
        else
            return true;
    }
}