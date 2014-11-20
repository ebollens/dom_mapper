var testContainer = document.querySelectorAll('#test-container')[0];

QUnit.test( "DomMapper namespace", function( assert ) {

  assert.ok( DomMapper !== undefined, "DomMapper is defined" );
  assert.ok( DomMapper.run !== undefined, "DomMapper.apply is defined" );
  assert.ok( DomMapper.Rules !== undefined, "DomMapper.Rules is defined" );
  assert.ok( DomMapper.RulesFactory !== undefined, "DomMapper.RulesFactory is defined" );
  assert.ok( DomMapper.Rule !== undefined, "DomMapper.Type is defined" );

});

QUnit.test( "DomMapper.Rules", function( assert ) {

  var ruleStub = {run:function(){ testContainer.html = 'foo'; }},
      ruleStub2 = {run:function(){ testContainer.html += 'bar'; }},
      rules = new DomMapper.Rules([ruleStub, ruleStub2]);

  assert.ok( typeof rules.get == "function", "get() function exists" );
  assert.ok( (new DomMapper.Rules(['test'])).get()[0] == 'test', "get() returned expected value" );
  assert.ok( rules.get().length == 2, "get() recognizes multiple values" );

  testContainer.html = '';
  assert.ok( typeof rules.run == "function", "run() function exists" );
  rules.run();
  assert.ok( testContainer.html == "foobar", "run() calls contained functions in order" );

});

QUnit.test( "DomMapper.RulesFactory", function( assert ) {

  var factory, rules, rule;

  factory = new DomMapper.RulesFactory(["a","b","c"]);
  assert.ok( typeof factory.append == "function", "append() function exists" );
  assert.ok( typeof factory.filter == "function", "filter() function exists" );
  assert.ok( typeof factory.generate == "function", "generate() function exists" );
  assert.ok( typeof factory.get == "function", "get() function exists" );
  assert.ok( typeof factory.getContext == "function", "getContext() function exists" );
  assert.ok( typeof factory.setContext == "function", "setContext() function exists" );
  assert.ok( factory.get()[0] == "a", "get() returned expected value" );
  factory.filter(function(v){ return v != 'b'; });
  assert.ok( factory.get().length == 2 && factory.get()[0] == 'a' && factory.get()[1] == 'c', "filter() removed value as expected" );

  factory = new DomMapper.RulesFactory();
  assert.ok( factory.get().length === 0, "get() returns empty array when initialized empty" );
  factory.append('a');
  assert.ok( factory.get()[0] == 'a', "append() adds record to empty" );
  factory.append('b');
  assert.ok( factory.get()[1] == 'b', "append() adds record to end" );

  factory = new DomMapper.RulesFactory([{
    type: 'role',
    role: 'navigation',
    selector: 'nav'
  }]);
  rules = factory.generate();
  assert.ok( rules instanceof DomMapper.Rules, "generate() returns DomMapper.Rules" );
  assert.ok( rules.get().length == 1, "generate() returns an array" );
  rule = rules.get()[0];
  assert.ok( rule instanceof DomMapper.Rule.Role , "generate() constructed specified DomMapper.Rule.* based on type" );
  assert.ok( rule.getOptions().role == 'navigation', "generate() passed options into constructor" );

});