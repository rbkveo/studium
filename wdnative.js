var czilla_widget = (function () {
  var czilla_widget = {
    push: function (args) {
      var nounce = Math.floor(Math.random() * 1000000000000);
      var urlCheck = 'https://request-global.czilladx.com/serve/native.php?z=' + args.zone + '&n=' + nounce;
      if (typeof args.mobile === 'undefined') {
        args.mobile = true;
      }
      if (!args.mobile && mobile.true) return;
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open('GET', urlCheck);
      xhr.onload = function () {
        if (xhr.status === 200) {
	  //gtag('event', 'zila', {'event_label': 'yes','event_category': 'wdn',}); 
          if (util.isEmptyString(xhr.responseText)) return;
          var response = JSON.parse(xhr.responseText);
          if (response.ad === 'undefined') return;
          response = response.ad;
          load["initialized"] = function (args, response) {
            return new this(args, response);
          };
          load["initialized"](args, response);
        } 
        //else {
	  //gtag('event', 'zila', {'event_label': 'no','event_category': 'wdn',}); 
	    //}
      };
      xhr.send();
    }
  };
  var fullAgent = navigator.userAgent,
    userAgent = navigator.userAgent.toLowerCase(),
    mobile = {
      true: /iphone|ipad|android|ucbrowser|iemobile|ipod|blackberry|bada/.test(userAgent)
    },
    util = {
      isEmptyString: function (string) {
        return (
          (typeof string == 'undefined')
          ||
          (string == null)
          ||
          (string == false)  //same as: !x
          ||
          (string.length == 0)
          ||
          (string == "")
          ||
          (string.replace(/\s/g, "") == "")
          ||
          (!/[^\s]/.test(string))
          ||
          (/^\s*$/.test(string))
        );
      }
    },
    load = function (args, content) {
      this.construct(args, content)
    };

  load.prototype = {

    construct: function (args, content) {
      this.data = content;
      this.settings = this.settings_check(args);
      var domain = document.domain;
      if (this.settings.css_defaults) {
        var css = " #c_widget_wrapper_" + this.settings.zone + " {font:inherit;font-size:12px;text-decoration:none;}"  +
          ".czilnat {cursor: pointer}" +
          "#c_widget_wrapper_" + this.settings.zone + " {cursor: pointer}"/* +
          "#c_widget_content_" + this.settings.zone + " {display: inline-block; max-width:100%; width:100%; padding:10px;}" +
          "#c_widget_title_" + this.settings.zone + " {font-size: 1.4rem}" +
          "#c_widget_website_" + this.settings.zone + " {display: block; font-size: 12px;text-align: left;}" +
          "#c_widget_by_" + this.settings.zone + " {display: block; font-size: 12px; float:right}" */,
          style = document.createElement('style');
        css = css + this.settings.style;
        style.type = 'text/css';
        if (style.styleSheet) {
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }
        document.getElementById("c_widget_" + this.settings.zone).appendChild(style);
      }

      var elem = document.createElement('span');
      elem.id = "c_widget_wrapper_" + this.settings.zone;
      elem.className = "coinzilla_widget_wrapper" + this.settings.custom_class;
        elem.innerHTML = 
        "<a href='"+this.data.url+"' style='text-decoration: none;'>Featured:  &nbsp;"+
        "<img src='"+this.data.img+"' style='width: 20px;'>"+
        "&nbsp;"+this.data.title+""+
        "&nbsp;-&nbsp;"+this.data.description_short+"&nbsp;"+
        "<span class='czilnat'><b>"+
        ""+this.data.website+"! "+
        "</b></span></a>"
        
        document.getElementById("c_widget_" + this.settings.zone).appendChild(elem);


        document.getElementById("c_widget_wrapper_" + this.settings.zone).onclick = function(){
           window.open(content.url)
        };
        


      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open('GET', this.data.impressionUrl);
      xhr.onload = function () {
        if (xhr.status !== 200) {
          console.log("Coinzilla -> Tracking server not responding -> " + xhr.status)
        }
      };
      xhr.send();
    },
    settings_check: function (settings) {
      var validateHex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
      var validateInteger = /^[0-9]*$/i;
      var wrapperWidth = document.getElementById("c_widget_" + settings.zone).offsetWidth;
      if (typeof wrapperWidth === 'undefined') {
        wrapperWidth = 900;
      } else {
        if (wrapperWidth === 0) {
          wrapperWidth = document.getElementById("c_widget_" + settings.zone).clientWidth;
          if (wrapperWidth === 0) {
            wrapperWidth = 900;
          }
        }
      }
      if (typeof settings.breakpoint === 'undefined') {
        settings.breakpoint = '400';
      } else {
        if (!validateInteger.test(settings.breakpoint)) {
          settings.width = '400';
        }
      }
      if (wrapperWidth <= settings.breakpoint) {
        settings.article = false;
      }
      if (typeof settings.article === 'undefined') {
        settings.article = true;
        settings.themeFlex = "";
        settings.themeImgWrapperWidth = "width:80%;";
      } else {
        if (settings.article === false) {
          settings.themeFlex = "flex-wrap: wrap;";
          settings.themeImgWrapperWidth = "width:100%;";
        }
        if (settings.article === true) {
          settings.themeFlex = "";
          settings.themeImgWrapperWidth = "width:80%;";
        }
      }
      if (typeof settings.style === 'undefined') {
        settings.style = '';
      }
      if (typeof settings.image === 'undefined') {
        settings.image = true;
      }
      if (typeof settings.description === 'undefined') {
        settings.description = true;
      }
      if (typeof settings.website === 'undefined') {
        settings.website = true;
      }
      if (typeof settings.sponsored === 'undefined') {
        settings.sponsored = true;
      }
      if (typeof settings.css_defaults === 'undefined') {
        settings.css_defaults = true;
      }
      if (typeof settings.custom_class === 'undefined') {
        settings.custom_class = '';
      } else {
        if (settings.custom_class)
          settings.custom_class = '_' + settings.custom_class;
        else
          settings.custom_class = '';
      }
      return settings;
    }
  };
  if (typeof window.czilla_widget !== "undefined") {
    for (var i = 0; i < window.czilla_widget.length; i++) {
      czilla_widget.push(window.czilla_widget[i]);
    }
  }
  return czilla_widget;
})();
