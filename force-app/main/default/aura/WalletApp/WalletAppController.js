({
  init: function (cmp, event, helper) {},
  createWallet: function (component, event, helper) {
    var action = component.get("c.saveWallet");
    action.setParams({
      accRec: component.get("v.acc")
    });
    action.setCallback(this, function (response) {
      if (response.getReturnValue() === "success") {
        //component.set('v.contactId',response.getReturnValue())
        //var WalletId = response.getReturnValue();
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
          title: "Success!",
          type: "Success",
          message: "Account created successfully."
        });
        toastEvent.fire();

        var navEvt = $A.get("e.force:refreshView");
        //navEvt.setParams({
        // "recordId": WalletIdS,
        // "slideDevName": "related"
        // });
        navEvt.fire();
      } else {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
          title: "Failure!",
          type: "Failure",
          message: "Account cannot be created."
        });
        toastEvent.fire();

        var navEvt = $A.get("e.force:refreshView");
        navEvt.fire();
      }
    });
    $A.enqueueAction(action);
  },
  /*showWallet : function(component, event, helper) {
                              var action = component.get("c.retrieveWallet");       
      action.setCallback(this, function(data){

          component.set("v.WalletList",data.getReturnValue());

      });       

      $A.enqueueAction(action); 
              },
  handleSuccess: function (cmp, event, helper) {
      cmp.find('notifLib').showToast({
          "title": "Record updated!",
          "message": "The record "+ event.getParam("id") + " has been updated successfully.",
          "variant": "success"
      });
  },

  handleError: function (cmp, event, helper) {
      cmp.find('notifLib').showToast({
          "title": "Something has gone wrong!",
          "message": event.getParam("message"),
          "variant": "error"
      });
  },*/
  handleSaveEdition: function (cmp, event, helper) {
    var draftValues = event.getParam("draftValues");
    console.log(draftValues);
    var action = cmp.get("c.updateAccount");
    action.setParams({ acc: draftValues });
    action.setCallback(this, function (response) {
      var state = response.getState();
      $A.get("e.force:refreshView").fire();
    });
    $A.enqueueAction(action);
  }
});