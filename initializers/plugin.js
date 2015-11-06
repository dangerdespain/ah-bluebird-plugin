module.exports = {
  initialize: function(api, next){
    
    api.actionProcessor.prototype.runAction = function(){
      var self = this;

      self.preProcessAction(function(error){
        self.reduceParams();
        self.validateParams();

        if(error){
          self.completeAction(error);
        }else if(self.missingParams.length > 0){
          self.completeAction('missing_params');
        }else if(self.validatorErrors.length > 0){
          self.completeAction('validator_errors');
        }else if(self.toProcess === true && !error){
          var runFunc = self.actionTemplate.run(api, self, function(error){
            if(error){
              self.completeAction(error);
            }else{
              self.postProcessAction(function(error){
                self.completeAction(error);
              });
            }
          });
          if(runFunc && typeof runFunc.then === 'function'){ // if the run function returns a "thenable"
            runFunc.then(function(res){ // construct the promise chain and automatically set the response
              self.response.result = res;
              self.postProcessAction(function(error){
                self.completeAction(error);
              });
            }).catch(function(error){ // or catch and pass along errors
              self.completeAction(error);
            })
          }
        }else{
          self.completeAction();
        }
      });
    }
    
    next();
  }
};
