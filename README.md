# DomMapper

DomMapper is a lightweight rule engine that maps attributes onto a semantic structure.

## Status

The code in this repository is **under development** and not intended for production use at this time.

## License

DomMapper is open-source software licensed under the **BSD 3-clause license**. The full text of the license may be found in the [LICENSE](https://github.com/ebollens/dom_mapper/blob/master/LICENSE.txt) file.

## Credits

DomMapper is developed and maintained by [Eric Bollens](https://github.com/ebollens).

DomMapper leverages several open-source components, including [Specificity](https://github.com/keeganstreet/specificity) and [ES5 array polyfills on the Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). A sincere thanks is extended to the authors of these fine projects.

## Build

To pull dependencies required to build:

```
npm install
```

To generate a build:

```
node_modules/grunt-cli/bin/grunt
```

This will produce several files into `dist` (and their minified `.min.js` equivalent):

* `dom_mapper-core.js` - DomMapper class definition (must be included)
* `dom_mapper-polyfills.js` - ES5 Array polyfill (for Internte Explorer 7 & 8)
* `dom_mapper-rules-aria_mappings.js` - Common ARIA rulesets

## Use

```js
DomMapper.run(AriaMappings.Html5.All);
```

```js
var rules = [].concat(
  AriaMappings.Html5.Landmarks,
  { type: "role", role: "search", selector: "nav.search" },
  { type: "role", role: null, selector: ".no-role", specificity: "1,0,0,0" }
);

DomMapper.run(rules);
```

```js
var factory = new DomMapper.RulesFactory();

factory.append(AriaMappings.Html5);

factory.append([
  { type: "role", role: "search", selector: "nav.search" },
  { type: "role", role: null, selector: ".no-role" }
]);

factory.generate().run();
```

## Test

To pull dependencies required to test:

```
npm install
```

To run the jshint and qunit tests:

```
node_modules/grunt-cli/bin/grunt test
```

To view qunit test results through an interface, go to `test/index.html`.

