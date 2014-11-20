var testContainer = document.querySelectorAll('#test-container')[0];

QUnit.test( "DomMapper.Rule.Role", function( assert ) {

  var rule, rule2;

  assert.ok( DomMapper.Rule.Role !== undefined, "DomMapper.Rule.Role is defined" );

  testContainer.innerHTML = '<nav></nav><nav></nav>';
  rule = new DomMapper.Rule.Role({
    type: 'role',
    role: 'navigation',
    selector: 'nav',
    context: testContainer
  });
  rule.run();
  assert.ok( testContainer.querySelectorAll('[role="navigation"]').length == 2, 'role attribute applied based on selector' );
  assert.ok( testContainer.querySelectorAll('[data-role-specificity="0,0,0,1"]').length == 2, 'data-role-specificity attribute applied based on selector' );

  testContainer.innerHTML = '<nav role="search"></nav><nav class="test"></nav><nav></nav>';
  rule2 = new DomMapper.Rule.Role({
    type: 'role',
    role: 'complementary',
    selector: '.test',
    context: testContainer
  });
  rule.run();
  rule2.run();
  assert.ok( testContainer.querySelectorAll('[role="search"]').length == 1 && testContainer.querySelectorAll('[role="navigation"]').length == 1 && testContainer.querySelectorAll('[role="complementary"]').length == 1,
    'role attribute applied based on selector with specificity awareness' );
  assert.ok( testContainer.querySelectorAll('[data-role-specificity="1,0,0,0"]').length == 1 && testContainer.querySelectorAll('[data-role-specificity="0,0,1,0"]').length == 1 && testContainer.querySelectorAll('[data-role-specificity="0,0,0,1"]').length == 1,
    'data-role-specificity attribute applied based on specificity of role applied' );

});