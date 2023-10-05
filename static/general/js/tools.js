/* global $, csrf_token */

var last_response;

function GET(props) {
  
  // default success function:
  props.success = props.success || function(response) {
    props.table.ajax.reload(null, false);
  };
  
  // default error function:
  props.error = props.error || function(response) {
    console.log(response);
    alert('something went wrong');
  };
    
  // verbose level:
  if(props.verbose_level === undefined) props.verbose_level = 2;
    
  // send ajax request:
  $.ajax({
    url : props.url,
    type : 'GET',
    beforeSend:function(xhr){
      if (props.verbose_level>1) console_log_request(props.url, props.data, 'GET');
      xhr.setRequestHeader("X-CSRFToken", csrf_token);
    },
    data : props.data,
    success : props.success,
    error : props.error,
    complete:function(response) {
      if (props.verbose_level>1) console_log_response(props.url, response);
      last_response = response;
    },
  });
  
}


function POST(props) {
  
  // default success function:
  props.success = props.success || function(response) {console.log(response)};
  
  // default error function:
  props.error = props.error || function(response) {
    console.log(response);
    alert('something went wrong');
  };
  
  // send ajax request:
  $.ajax({
    url : props.url,
    type : 'POST',
    beforeSend:function(xhr){
      console_log_request(props.url, props.data, 'POST');
      xhr.setRequestHeader("X-CSRFToken", csrf_token);
    },
    data : JSON.stringify(props.data),
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success : props.success,
    error : props.error,
    complete:function(response) {
      console_log_response(props.url, response);
      last_response = response;
    },
  });
  
}


// prints front end request:
function console_log_request(url, data, method) {
  
  var datetime = Date().split(' GMT')[0];
  var date_message = datetime;
  var date_style = 'background-color:white; color:DarkSlateGrey';
  var type_message = ' REQUEST ';
  var type_style = 'background-color:blue; color:white';
  var data_message = data ? JSON.stringify(data).slice(0,30) : 'none';
  var content_message = 'URL [' + url + '] Method [' + method + '] Data [' + data_message + ']';
  var content_style = 'background-color:white; color:black';
  var message = '%c' + date_message + '%c  %c' + type_message + '%c ' + content_message;

  console.log(message, date_style, content_style, type_style, content_style);
}


// prints backend response:
function console_log_response(url, response) {
  var datetime = Date().split(' GMT')[0];

  var date_message = datetime;
  var date_style = 'background-color:white; color:DarkSlateGrey';
  var type_message = ' RESPONSE ';
  var type_style = 'background-color:red; color:white';
  var content_message = 'URL [' + url + '] Status [' + response.status + '] Message [' + response.statusText + ']';
  var content_style = 'background-color:white; color:black';
  var message = '%c' + date_message + ' %c' + type_message + '%c ' + content_message;

  console.log(message, date_style, type_style, content_style);
  
}


$(document).ready(function() {
  Element.prototype.serializeWithStyles = (function () {  

    // Mapping between tag names and css default values lookup tables. This allows to exclude default values in the result.
    var defaultStylesByTagName = {};

    // Styles inherited from style sheets will not be rendered for elements with these tag names
    var noStyleTags = {"BASE":true,"HEAD":true,"HTML":true,"META":true,"NOFRAME":true,"NOSCRIPT":true,"PARAM":true,"SCRIPT":true,"STYLE":true,"TITLE":true};

    // This list determines which css default values lookup tables are precomputed at load time
    // Lookup tables for other tag names will be automatically built at runtime if needed
    var tagNames = ["A","ABBR","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BASE","BDI","BDO","BLOCKQUOTE","BODY","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATALIST","DD","DEL","DETAILS","DFN","DIV","DL","DT","EM","EMBED","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEAD","HEADER","HGROUP","HR","HTML","I","IFRAME","IMG","INPUT","INS","KBD","KEYGEN","LABEL","LEGEND","LI","LINK","MAP","MARK","MATH","MENU","META","METER","NAV","NOBR","NOSCRIPT","OBJECT","OL","OPTION","OPTGROUP","OUTPUT","P","PARAM","PRE","PROGRESS","Q","RP","RT","RUBY","S","SAMP","SCRIPT","SECTION","SELECT","SMALL","SOURCE","SPAN","STRONG","STYLE","SUB","SUMMARY","SUP","SVG","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TITLE","TR","TRACK","U","UL","VAR","VIDEO","WBR"];

    // Precompute the lookup tables.
    for (var i = 0; i < tagNames.length; i++) {
        if(!noStyleTags[tagNames[i]]) {
            defaultStylesByTagName[tagNames[i]] = computeDefaultStyleByTagName(tagNames[i]);
        }
    }

    function computeDefaultStyleByTagName(tagName) {
        var defaultStyle = {};
        var element = document.body.appendChild(document.createElement(tagName));
        var computedStyle = getComputedStyle(element);
        for (var i = 0; i < computedStyle.length; i++) {
            defaultStyle[computedStyle[i]] = computedStyle[computedStyle[i]];
        }
        document.body.removeChild(element); 
        return defaultStyle;
    }

    function getDefaultStyleByTagName(tagName) {
        tagName = tagName.toUpperCase();
        if (!defaultStylesByTagName[tagName]) {
            defaultStylesByTagName[tagName] = computeDefaultStyleByTagName(tagName);
        }
        return defaultStylesByTagName[tagName];
    }

    return function serializeWithStyles() {
        if (this.nodeType !== Node.ELEMENT_NODE) { throw new TypeError(); }
        var cssTexts = [];
        var elements = this.querySelectorAll("*");
        for ( var i = 0; i < elements.length; i++ ) {
            var e = elements[i];
            if (!noStyleTags[e.tagName]) {
                var computedStyle = getComputedStyle(e);
                var defaultStyle = getDefaultStyleByTagName(e.tagName);
                cssTexts[i] = e.style.cssText;
                for (var ii = 0; ii < computedStyle.length; ii++) {
                    var cssPropName = computedStyle[ii];
                    if (computedStyle[cssPropName] !== defaultStyle[cssPropName]) {
                        e.style[cssPropName] = computedStyle[cssPropName];
                    }
                }
            }
        }
        var result = this.outerHTML;
        for ( var i = 0; i < elements.length; i++ ) {
            elements[i].style.cssText = cssTexts[i];
        }
        return result;
    }
  })();
})
