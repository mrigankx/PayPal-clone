public with sharing class AccountHelper {
    @AuraEnabled(cacheable=true)
    public static List<Wallet__c> getAccountList() {
        return [SELECT Name, Id FROM Wallet__c];
    }
}