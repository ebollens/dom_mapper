AriaMappings.Framework.Bootstrap = (function(){
  return [].concat([
    {sel: "a.btn", role: "button"},
    {sel: ".alert", role: "alert"},
    {sel: ".carousel-inner", role: "listbox"},
    {sel: ".dropdown-menu", role: "menu"},
    {sel: ".dropdown-menu > li", role: "presentation"},
    {sel: ".dropdown-menu > li > a", role: "menuitem"},
    {sel: ".dropdown-toggle", role: "button"},
    {sel: ".btn-group", role: "group"},
    {sel: ".btn-toolbar", role: "toolbar"},
    {sel: ".modal.fade", role: "dialog"},
    {sel: ".tab-pane", role: "tabpanel"},
    {sel: ".nav", role: "navigation"},
    {sel: "nav .nav", role: null}, // html5 polyfill will define role="navigation" on the nav element
    {sel: ".nav > li", role: "presentation"},
    {sel: ".nav.nav-pills", role: "tablist"},
    {sel: ".nav.nav-tabs", role: "tablist"},
    {sel: ".nav.nav-tabs [data-toggle]", role: "tab"},
    {sel: ".navbar", role: "navigation"},
    {sel: ".navbar form.navbar-form", role: "search"},
    {sel: ".panel-group", role: "tab"},
    {sel: ".panel-heading", role: "tablist"},
    {sel: ".panel-collapse", role: "tabpanel"},
    {sel: ".progress-bar", role: "progressbar"},
    {sel: ".tooltip", role: "tooltip"}
  ].map(function(m){
    return {
      type: "role",
      role: m.role,
      selector: m.sel
    };
  }));
})();