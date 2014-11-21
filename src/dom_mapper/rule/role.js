DomMapper.Rule.Role = function(options){

  var elements,
      specificity,
      specificityLibrary = SPECIFICITY,
      __self__ = this;

  this.resolve = function(){

    elements = null;

    if(options.elements)
      elements = typeof options.elements == 'function' ? options.elements.call(__self__) : options.elements;

    if(options.specificity)
      specificity = options.specificity;
    else if(options.selector)
      specificity = specificityLibrary.calculate(options.selector)[0].specificity;
    else if(options.elements)
      specificity = '1,0,0,0';
    else
      specificity = '0,0,0,0';

    return this;

  };

  // ACCESSORS

  this.getContext = function(){
    return options.context ? options.context : document;
  };

  this.getOptions = function(){
    return options;
  };

  this.getSpecificity = function(){
    _computeElements();
    return specificity;
  };

  this.getElements = function(){
    _computeElements();
    return elements;
  };

  // MUTATORS

  this.run = function(){

    this.resolve();

    Array.prototype.slice.call(this.getElements()).forEach(function(ele){

      var currentSpecificity = ele.getAttribute('data-role-specificity'),
          proposedSpecificity = __self__.getSpecificity();

      // if no specificity data attribute, but role is set, then role was applied inline, so implicitly inline-level specificity
      if(!currentSpecificity && ele.getAttribute('role')) {
        currentSpecificity = '1,0,0,0';
        ele.setAttribute('data-role-specificity', currentSpecificity);
      }

      // if the specificity that assigned its current role is more specific, continue without setting role
      if(currentSpecificity && specificityLibrary.compare(proposedSpecificity, currentSpecificity) < 0)
        return;

      if(options.role)
        ele.setAttribute('role', options.role);
      else
        ele.removeAttribute('role');

      ele.setAttribute('data-role-specificity', proposedSpecificity);

    });

  };

  // HELPERS

  var _computeElements = function(){
    if(elements === null){
      elements = options.selector ? __self__.getContext().querySelectorAll(options.selector) : [];
    }
  };

  this.resolve();

};