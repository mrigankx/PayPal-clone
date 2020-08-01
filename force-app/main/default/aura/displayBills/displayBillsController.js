({
  doInit: function (component, event, helper) {
    var action = component.get("c.getBills");
    action.setCallback(this, function (data) {
      console.log("Bills===>" + data.getReturnValue());
      component.set("v.bills", data.getReturnValue());
    });

    $A.enqueueAction(action);
  },
  buttonAction: function (component, event, helper) {
    var button = event.getSource();
    var entryId = button.get("v.value");
    //alert(entryId);
    var action = component.get("c.payBills");
    action.setParams({ id_str: entryId });
    //action.setCallback(this, function(data){
    //if(data.getReturnValue()==true){
    //$A.get('e.force:refreshView').fire();
    //}else{
    //var urlEvent = $A.get("e.force:navigateToURL");
    //urlEvent.setParams({
    //  "url" : "/lightning/o/Wallet__c/home"
    //});
    //urlEvent.fire();
    //}

    // });
    $A.enqueueAction(action);
  }
});