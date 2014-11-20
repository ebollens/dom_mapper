AriaMappings.Html5.Landmarks = (function(){
  var sectionalElements = [
        'article','section','nav','aside','h1','h2','h3','h4','h5','h6','header','footer','main'
      ],
      selectorNotInElementByTagName = function(selector, notInElements){
        var elements = [],
            rawElements = Array.prototype.slice.call(document.querySelectorAll(selector));
        for(var i in rawElements){
          var element = rawElements[i], skip = false;
          for(var parent = element.parentNode; parent.tagName.toLowerCase() != 'body'; parent = parent.parentNode) {
            console.log(parent.tagName.toLowerCase());
            if (notInElements.indexOf(parent.tagName.toLowerCase()) >= 0) {
              skip = true;
              break;
            }
          }
          if(!skip)
            elements.push(element);
        }
        return elements;
      },
      selectorNotInSectionalElement = function(selector){
        return selectorNotInElementByTagName(selector, sectionalElements);
      },
      firstSelectorNotInSectionalElement = function(selector){
        var selectors = selectorNotInSectionalElement(selector);
        return selectors.length > 0 ? [selectors[0]] : [];
      };

  return [
    {sel: "header", role: "banner", one: true},
    {sel: "footer", role: "contentinfo", one: true},
    {sel: "main", role: "main", one: true},
    {sel: "nav", role: "navigation"},
    {sel: "section", role: "region"},
    {sel: "form", role: "form"}
  ].map(function(m){
    return {
      type: "role",
      role: m.role,
      selector: m.sel,
      elements: m.one ? function(){ return firstSelectorNotInSectionalElement(m.sel); } : null
    };
  }).concat({
    type: "role",
    role: "complementary",
    selector: "aside",
    elements: function(){ return selectorNotInElementByTagName('aside', ['main']); }
  });

})();

AriaMappings.Html5.All = AriaMappings.Html5.All.concat(AriaMappings.Html5.Landmarks);