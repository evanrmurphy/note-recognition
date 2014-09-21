require('react')

var ReactCreateClass = require('react/lib/ReactCompositeComponent').createClass
  , ReactRenderComponent = require('react/lib/ReactMount').renderComponent
  , ReactDOM = require('react/lib/ReactDOM')

var App =
  ReactCreateClass
    ( { render:
          function() {
            var testEs6 = 'with ES6 features'
              , andReact = 'and React'
            return ReactDOM.div
                     ({},`Hello note recognition ${testEs6} ${andReact}!`)
          }
      }
    )

ReactRenderComponent(App(), document.body)
