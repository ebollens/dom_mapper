var DomMapper = {

  run: function(rules){

    (new DomMapper.RulesFactory(rules)).generate().run();

  },

  Rule: {

  },

  Rules: function(rules){

    this.get = function(){
      return rules;
    };

    this.run = function(){
      rules.forEach(function(rule){
        rule.run();
      });
    };

  },

  RulesFactory: function(definitions, context){

    var __self__ = this;

    if(!definitions)
      definitions = [];

    if(!context)
      context = document;

    this.append = function(additionalDefinitions){
      definitions = definitions.concat(additionalDefinitions);
      return this;
    };

    this.generate = function(){
      return new DomMapper.Rules(this.get().map(function(definition){
        if(!definition.context)
          definition.context = __self__.getContext();
        return new DomMapper.Rule[definition.type.charAt(0).toUpperCase() + definition.type.slice(1)](definition);
      }));
    };

    this.get = function(){
      return definitions;
    };

    this.getContext = function(){
      return context;
    };

    this.filter = function(callback){
      definitions = definitions.filter(callback);
      return this;
    };

    this.setContext = function(_context){
      context = _context;
    };

  }

};