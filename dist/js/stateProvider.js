window.stateProviderDefine={handle:a=>{if(window.customStateProvider)window.customStateProvider(a);else{let b="withAut"===$("script[src*=app\\.js]")[0].src.split("type=")[1]?"withAut":"withoutAuth";window.stateProviderDefine[b]&&window.stateProviderDefine[b](a)}},withAuth:a=>{a.state("login",{url:"",controller:"LoginController",templateUrl:"views/login.view.html"}).state("reset-password",{url:"/public/reset-password",controller:"ResetPasswordController",templateUrl:"views/public/reset-password.view.html"}).state("social",{url:"/connected",controller:"SocialController",templateUrl:"views/login.view.html"}).state("socialError",{url:"/notconnected",controller:"SocialController",templateUrl:"views/login.view.html"}).state("main",{url:"/",controller:"LoginController",templateUrl:"views/login.view.html"}).state("publicRoot",{url:"/public/{name:.*}",controller:"PageController",templateUrl:function(a){return"views/public/"+a.name+".view.html"}}).state("public",{url:"/home/public",controller:"PublicController",templateUrl:function(){return"views/public/home.view.html"}}).state("public.pages",{url:"/{name:.*}",controller:"PageController",templateUrl:function(a){return"views/public/"+a.name+".view.html"}}).state("home",{url:"/home",controller:"HomeController",templateUrl:"views/logged/home.view.html",resolve:{data:function(a){a.refresh()}}}).state("home.pages",{url:"/{name:.*}",controller:"PageController",templateUrl:function(a){return"views/"+a.name+".view.html"}}).state("404",{url:"/error/404",controller:"PageController",templateUrl:function(){return"views/error/404.view.html"}}).state("403",{url:"/error/403",controller:"PageController",templateUrl:function(){return"views/error/403.view.html"}})},withoutAuth:a=>{a.state("index",{url:"",controller:"HomeController",templateUrl:"views/home.view.html"}).state("main",{url:"/",controller:"HomeController",templateUrl:"views/home.view.html"}).state("home",{url:"/home",controller:"HomeController",templateUrl:"views/home.view.html"}).state("home.pages",{url:"/{name:.*}",controller:"PageController",templateUrl:function(a){return"views/"+a.name+".view.html"}}).state("404",{url:"/error/404",controller:"PageController",templateUrl:function(){return"views/error/404.view.html"}}).state("403",{url:"/error/403",controller:"PageController",templateUrl:function(){return"views/error/403.view.html"}})}};