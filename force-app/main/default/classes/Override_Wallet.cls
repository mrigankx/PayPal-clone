public with sharing class Override_Wallet {
    @AuraEnabled
    public static String saveWallet(Wallet__c accRec){
            Integer i = [SELECT COUNT() FROM Wallet__c where id=:UserInfo.getUserId()];
            if(i==0){
            insert accRec;
                return 'success';
            }
            else{
               return 'failure';
            }
    }  
    @AuraEnabled
    public static List<Wallet__c> retrieveWallet(){
        return [select name,added_from__c,balance__c,date_time__c from Wallet__c];
    }
    
    @AuraEnabled
    public static void updateAccount(List<wallet__c> acc ){
        update acc;
    }
       
}