trigger DiscountTrigger on Bills__c (before insert, before update) {
     for (Bills__c obj: trigger.new){
if(obj.Amount__c>5000 && obj.Amount__c<=10000)
{
    
    obj.Offer_applied__c=20;
    obj.Amount__c=obj.Amount__c*0.8;
    
}
         if(obj.Amount__c>10000 && obj.Amount__c<=15000)
{
    
    obj.Offer_applied__c=50;
    obj.Amount__c=obj.Amount__c*0.5;
    
}
         if(obj.amount__c>15000)
{
    
    obj.Offer_applied__c=80;
    obj.Amount__c=obj.Amount__c*0.2;
    
}
   

  }


}