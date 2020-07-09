//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
AppConfig = {
    clickType:                         "mouse",
    playersCount:                      5,
    buttonToBoardHeightCoeff:          0, //0.030548,
    buttonsPanelLeftToBoardWidthCoeff: 0, //0.473816,
    fontsizeToButtonWidthCoeff:        0.8,
    playersColors: [
        {background: "#8B2323", font: "#CCCCCC"}, 
        {background: "#FFFF00", font: "#444444"}, 
        {background: "#912CEE", font: "#EEEEEE"}, 
        {background: "#00FF00", font: "#222222"}, 
        {background: "#1D4BA0", font: "#EEEEEE"}, 
        {background: "#EE2C2C", font: "#222222"}, 
        {background: "#ff7f50", font: "#222222"}, 
        {background: "#009ACD", font: "#222222"},
        {background: "#8B2323", font: "#CCCCCC"}, 
        {background: "#FFFF00", font: "#444444"}, 
        {background: "#912CEE", font: "#EEEEEE"}, 
        {background: "#00FF00", font: "#222222"}, 
        {background: "#1D4BA0", font: "#EEEEEE"}, 
        {background: "#EE2C2C", font: "#222222"}, 
        {background: "#ff7f50", font: "#222222"}, 
        {background: "#009ACD", font: "#222222"},
        {background: "#8B2323", font: "#CCCCCC"}, 
        {background: "#FFFF00", font: "#444444"}, 
        {background: "#912CEE", font: "#EEEEEE"}, 
        {background: "#00FF00", font: "#222222"}, 
        {background: "#1D4BA0", font: "#EEEEEE"}, 
        {background: "#EE2C2C", font: "#222222"}, 
        {background: "#ff7f50", font: "#222222"},
        {background: "#ff7f50", font: "#222222"}
    ],
    ballsCount: 0,
    ballsColors: [
        {background: "#ffa500"}, {background: "#CC3333"}, 
        {background: "#222333"}, {background: "#0000FF"}
    ],
    shapesColors: [
        {stroke: "#000000", fill: "#000000"}, 
        {stroke: "#FF3300", fill: "#FF3300"}, 
        {stroke: "#FF7F50", fill: "#FF7F50"}, 
        {stroke: "#FFFF00", fill: "#FFFF00"}, 
        {stroke: "#FFFFFF", fill: "#FFFFFF"},
        {stroke: "#0000FF", fill: "#0000FF"}        
    ]
};

var _objeto        = null,
    _boardObj      = null,
    _linkDataStore = null,
    _projectTexts  = null,
    _pages         = {main: null, animation: null},
    _currentPage   = null,
    _scrollTimer   = null,
    _ap_request    = null,
    _isEditable    = "EDIT_SI";
    _animation     = null;
    _iduser        = localStorage.getItem("LS_USER_ID"); 


//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// EJERCICIO 1.JS
(function() {
    function a(a) {
        if (!(a instanceof HTMLElement || a instanceof SVGElement)) throw Error("an HTMLElement or SVGElement is required; got " + a);
    }

    function d(a) {
        return a && 0 == a.lastIndexOf("http", 0) && -1 == a.lastIndexOf(window.location.host)
    }

    function g(f, c) {
        a(f);
        var b = f.querySelectorAll("image"),
            e = b.length,
            q = function() {
                0 === e && c()
            };
        q();
        for (var g = 0; g < b.length; g++)(function(a) {
            var c = a.getAttributeNS("http://www.w3.org/1999/xlink", "href");
            if (c && d(c.value)) console.warn("Cannot render embedded images linking to external hosts: " +
                c.value);
            else {
                var f = document.createElement("canvas"),
                    b = f.getContext("2d"),
                    l = new Image;
                l.crossOrigin = "anonymous";
                (c = c || a.getAttribute("href")) ? (l.src = c, l.onload = function() {
                    f.width = l.width;
                    f.height = l.height;
                    b.drawImage(l, 0, 0);
                    a.setAttributeNS("http://www.w3.org/1999/xlink", "href", f.toDataURL("image/png"));
                    e--;
                    q()
                }, l.onerror = function() {
                    //console.log("Could not load " + c);
                    e--;
                    q()
                }) : (e--, q())
            }
        })(b[g])
    }

    function h(a, c, b) {
        function f(a) {
            for (var c = {
                    woff2: "font/woff2",
                    woff: "font/woff",
                    otf: "application/x-font-opentype",
                    ttf: "application/x-font-ttf",
                    eot: "application/vnd.ms-fontobject",
                    sfnt: "application/font-sfnt",
                    svg: "image/svg+xml"
                }, f = Object.keys(c), b = 0; b < f.length; ++b) {
                var d = f[b];
                if (0 < a.indexOf("." + d)) return c[d]
            }
            console.error("Unknown font format for " + a + "; Fonts may not be working correctly");
            return "application/octet-stream"
        }

        function d(a) {
            function c(c) {
                function f(f) {
                    console.warn("Failed to load font from: " + c.url);
                    console.warn(f);
                    l += c.text + "\n";
                    d(a)
                }

                function b(c, f) {
                    l += c.text.replace(c.fontUrlRegexp, 'url("data:' +
                        c.format + ";base64," + f + '")') + "\n";
                    setTimeout(function() {
                        d(a)
                    }, 0)
                }
                var e = new XMLHttpRequest;
                e.addEventListener("load", function() {
                    var a = "";
                    for (var f = new Uint8Array(e.response), d = f.byteLength, l = 0; l < d; l++) a += String.fromCharCode(f[l]);
                    a = window.btoa(a);
                    b(c, a)
                });

                e.addEventListener("error", f);
                e.addEventListener("abort", f);
                e.open("GET", c.url);
                e.responseType = "arraybuffer";
                e.send()
            }
            if (0 < a.length) {
                var f = a.pop();
                c(f)
            } else b(l)
        }
        var e = c.selectorRemap;
        c = c.modifyStyle;
        for (var l = "", g = [], h = document.styleSheets, k = 0; k <
            h.length; k++) {
            try {
                var m = h[k].cssRules
            } catch (v) {
                console.warn("Stylesheet could not be loaded: " + h[k].href);
                continue
            }
            if (null != m)
                for (var z = 0, r; z < m.length; z++, r = null) {
                    var p = m[z];
                    if ("undefined" != typeof p.style) {
                        try {
                            var w = p.selectorText
                        } catch (v) {
                            console.warn('The following CSS rule has an invalid selector: "' + p + '"', v)
                        }
                        try {
                            w && (r = a.querySelector(w) || a.parentNode.querySelector(w))
                        } catch (v) {
                            console.warn('Invalid CSS selector "' + w + '"', v)
                        }
                        if (r) r = e ? e(p.selectorText) : p.selectorText, p = c ? c(p.style.cssText) : p.style.cssText,
                            l += r + " { " + p + " }\n";
                        else if (p.cssText.match(/^@font-face/)) {
                            r = /url\(["']?(.+?)["']?\)/;
                            var n = p.cssText.match(r),
                                n = n && n[1] || "";
                            n.match(/^data:/) && (n = "");
                            "about:blank" === n && (n = "");
                            n ? (n.startsWith("../") ? n = h[k].href + "/../" + n : n.startsWith("./") && (n = h[k].href + "/." + n), g.push({
                                text: p.cssText,
                                fontUrlRegexp: r,
                                format: f(n),
                                url: n
                            })) : l += p.cssText + "\n"
                        }
                    }
                }
        }
        d(g)
    }

    function m(a, c, b) {
        a = a.viewBox && a.viewBox.baseVal && a.viewBox.baseVal[b] || null !== c.getAttribute(b) && !c.getAttribute(b).match(/%$/) && parseInt(c.getAttribute(b)) ||
            a.getBoundingClientRect()[b] || parseInt(c.style[b]) || parseInt(window.getComputedStyle(a).getPropertyValue(b));
        return "undefined" === typeof a || null === a || isNaN(parseFloat(a)) ? 0 : a
    }

    function e(a) {
        a = encodeURIComponent(a);
        a = a.replace(/%([0-9A-F]{2})/g, function(a, b) {
            var c = String.fromCharCode("0x" + b);
            return "%" === c ? "%25" : c
        });
        return decodeURIComponent(a)
    }

    function k(a) {
        var c = window.atob(a.split(",")[1]);
        a = a.split(",")[0].split(":")[1].split(";")[0];
        for (var b = new ArrayBuffer(c.length), d = new Uint8Array(b), f = 0; f < c.length; f++) d[f] =
            c.charCodeAt(f);
        return new Blob([b], {
            type: a
        })
    }
    var b = "undefined" != typeof exports && exports || "undefined" != typeof define && {} || this;
    b.prepareSvg = function(b, c, d) {
        a(b);
        c = c || {};
        c.scale = c.scale || 1;
        c.responsive = c.responsive || !1;
        g(b, function() {
            var a = document.createElement("div"),
                e = b.cloneNode(!0);
            if ("svg" == b.tagName) {
                var f = c.width || m(b, e, "width");
                var l = c.height || m(b, e, "height")
            } else if (b.getBBox) {
                var g = b.getBBox();
                f = g.x + g.width;
                l = g.y + g.height;
                e.setAttribute("transform", e.getAttribute("transform").replace(/translate\(.*?\)/, ""));
                g = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                g.appendChild(e);
                e = g
            } else {
                console.error("Attempted to render non-SVG element", b);
                return
            }
            e.setAttribute("version", "1.1");
            e.getAttribute("xmlns") || e.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
            e.getAttribute("xmlns:xlink") || e.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
            c.responsive ? (e.removeAttribute("width"), e.removeAttribute("height"), e.setAttribute("preserveAspectRatio",
                "xMinYMin meet")) : (e.setAttribute("width", f * c.scale), e.setAttribute("height", l * c.scale));
            e.setAttribute("viewBox", [c.left || 0, c.top || 0, f, l].join(" "));
            for (var g = e.querySelectorAll("foreignObject > *"), k = 0; k < g.length; k++) g[k].getAttribute("xmlns") || g[k].setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/1999/xhtml");
            a.appendChild(e);
            h(b, c, function(b) {
                var c = document.createElement("style");
                c.setAttribute("type", "text/css");
                c.innerHTML = "<![CDATA[\n" + b + "\n]]\x3e";
                b = document.createElement("defs");
                b.appendChild(c);
                e.insertBefore(b, e.firstChild);
                d && (c = a.innerHTML, c = c.replace(/NS\d+:href/gi, 'xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href'), d(c, f, l))
            })
        })
    };
    b.svgAsDataUri = function(a, c, d) {
        b.prepareSvg(a, c, function(a) {
            a = "data:image/svg+xml;base64," + window.btoa(e('<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" [<!ENTITY nbsp "&#160;">]>' + a));
            d && d(a)
        })
    };
    b.svgAsPngUri = function(e, c, d) {
        a(e);
        c = c || {};
        c.encoderType =
            c.encoderType || "image/png";
        c.encoderOptions = c.encoderOptions || .8;
        var f = function(a, b, e) {
            var f = document.createElement("canvas"),
                g = f.getContext("2d");
            f.width = b - 2 * b * c.widthCoeff;
            f.height = e - 2 * e * c.heightCoeff;
            c.canvg ? c.canvg(f, a) : g.drawImage(a, -b * c.widthCoeff, -e * c.heightCoeff);
            c.backgroundColor && (g.globalCompositeOperation = "destination-over", g.fillStyle = c.backgroundColor, g.fillRect(0, 0, f.width, f.height));
            try {
                var l = f.toDataURL(c.encoderType, c.encoderOptions)
            } catch (y) {
                if ("undefined" !== typeof SecurityError &&
                    y instanceof SecurityError || "SecurityError" == y.name) {
                    console.error("Rendered SVG images cannot be downloaded in this browser.");
                    return
                }
                throw y;
            }
            d(l)
        };
        c.canvg ? b.prepareSvg(e, c, f) : b.svgAsDataUri(e, c, function(a) {
            var b = new Image;
            b.onload = function() {
                f(b, b.width, b.height)
            };
            b.onerror = function() {
                console.error("There was an error loading the data URI as an image on the following SVG\n", window.atob(a.slice(26)), "\n", "Open the following link to see browser's diagnosis\n", a)
            };
            b.src = a
        })
    };
    b.download = function(a,
        b) {
        if (navigator.msSaveOrOpenBlob) navigator.msSaveOrOpenBlob(k(b), a);
        else {
            var c = document.createElement("a");
            if ("download" in c) {
                c.download = a;
                c.style.display = "none";
                document.body.appendChild(c);
                try {
                    var e = k(b),
                        d = URL.createObjectURL(e);
                    c.href = d;
                    c.onclick = function() {
                        requestAnimationFrame(function() {
                            URL.revokeObjectURL(d)
                        })
                    }
                } catch (u) {
                    console.warn("This browser does not support object URLs. Falling back to string URL."), c.href = b
                }
                c.click();
                document.body.removeChild(c)
            } else window.open(b, "_temp", "menubar=no,toolbar=no,status=no")
        }
    };
    b.saveSvg = function(e, c, d) {
        a(e);
        d = d || {};
        b.svgAsDataUri(e, d, function(a) {
            b.download(c, a)
        })
    };
    b.saveSvgAsPng = function(e, c, d) {
        a(e);
        d = d || {};
        b.svgAsPngUri(e, d, function(a) {
            b.download(c, a)
        })
    };
    "undefined" !== typeof define && define(function() {
        return b
    })
})();
var Session = {
    set: function(a, d) {
        return window.sessionStorage ? sessionStorage.setItem(a, d) : !1
    },
    get: function(a) {
        return window.sessionStorage ? sessionStorage.getItem(a) : !1
    },
    remove: function(a) {
        return window.sessionStorage ? sessionStorage.removeItem(a) : !1
    }
};

function addClass(a, d) {
    a.classList ? a.classList.add(d) : a.className += " " + d
}

function removeClass(a, d) {
    a.classList ? a.classList.remove(d) : a.className = a.className.replace(new RegExp("(^|\\b)" + d.split(" ").join("|") + "(\\b|$)", "gi"), " ")
}

function addEventForElements(a, d, g) {
    a = document.querySelectorAll(a);
    for (var h = 0; h < a.length; h++) a[h].addEventListener(d, g, !1)
}

function removeEventFromElements(a, d, g) {
    a = document.querySelectorAll(a);
    for (var h = 0; h < a.length; h++) a[h].removeEventListener(d, g)
}

function hideElement(a) {
    a = document.querySelectorAll(a);
    for (var d = 0; d < a.length; d++) a[d].style.display = ""
}

function showElement(a, d) {
    d = d || "block";
    for (var g = document.querySelectorAll(a), h = 0; h < g.length; h++) g[h].style.display = d
}

function removeElement(a) {
    a = document.querySelectorAll(a);
    for (var d = 0; d < a.length; d++) a[d].remove()
}

function isFlashEnabled() {
    var a = !1;
    if ("undefined" != typeof navigator.plugins && "object" == typeof navigator.plugins["Shockwave Flash"]) a = !0;
    else if ("undefined" != typeof window.ActiveXObject) try {
        new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), a = !0
    } catch (d) {}
    return a
}

function emptyObject(a) {
    for (var d in a)
        if (a.hasOwnProperty(d)) return !1;
    return !0
}

function parseSvgMarkup(a, d) {
    try {
        document.getElementById(d).textContent = "";

        var g = Object.create(null);
            g.image = a.match(/<image [^>]*>/ig);
            g.path = a.match(/<path [^\/>]*\/>/ig);
            g.circle = a.match(/<circle [^\/>]*\/>/ig);
            g.text = a.match(/<text [^>]*>[^<]*<\/text>/ig);
            
        for (var h in g)
            if (g[h])
                for (var m = 0; m < g[h].length; m++) {
                    var e = g[h][m],
                        k = null;
                    switch (h) {
                        case "path":
                        case "circle":
                        case "image":
                            e = e.replace("<" + h, "").trim();
                            e = e.replace("/>", "").trim();
                            break;
                        case "text":
                            k = e.match(/>([^<]*)<\/text>/i)[1], e = e.match(/<text ([^>]*)>/i)[1]
                    }
                    for (var e =
                            e.trim(), b = e.match(/[^=]*="[^"]*"/ig), f = document.createElementNS("http://www.w3.org/2000/svg", h), c = 0; c < b.length; c++) {
                        b[c] = b[c].replace(/"/g, "").trim();
                        var l = b[c].split("="),
                            t = l[0].trim(),
                            q = l[1].trim();
                        "xlink:href" == t ? f.setAttributeNS("http://www.w3.org/1999/xlink", t, q) : f.setAttribute(t, q)
                    }
                    k && (f.textContent = k);
                    f = $(f).appendTo($("#" + d))
                }
    } catch (u) {
        console.error("parseSvgMarkup Error", u.message)
    }
}

function generateUUID() {
    var a = (new Date).getTime();
    return "xxxxx4xxxyxxxx".replace(/[xy]/g, function(d) {
        var g = (a + 16 * Math.random()) % 16 | 0;
        a = Math.floor(a / 16);
        return ("x" == d ? g : g & 7 | 8).toString(16)
    })
}

(function() {
    Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(a) {
        a = (this.document || this.ownerDocument).querySelectorAll(a);
        for (var d = a.length; 0 <= --d && a.item(d) !== this;);
        return -1 < d
    });
    Element.prototype.closest || (Element.prototype.closest = function(a) {
        for (var d = this; d;) {
            if (d.matches(a)) return d;
            d = d.parentElement
        }
        return null
    })
})();

(function() {
    "remove" in Element.prototype || (Element.prototype.remove = function() {
        this.parentNode && this.parentNode.removeChild(this)
    })
})();

var AppTexts = function() {
        var a = null;
        this.get = function() {
            if (null !== a) return a;
            var d = $("#param_lang_key").val();
            $.ajax({
                url: "lang/es.json",
                type: "get",
                async: !1,
                data: {
                    lang_key: d
                },
                success: function(d) {
                    a = d
                },
                error: function(a) {
                    //console.log(a)
                }
            });
            return a
        }
    },
    ModalWindow = function(a) {
        function d() {
            k.hide();
            b.hide();
            t && setTimeout(t, 50)
        }
        var g = a.html,
            h = a.width || 0,
            m = a.height || 0,
            e = a.closeButton || !1,
            e = !!e,
            k = $("#modal_window"),
            b = $("#modal_window_bg"),
            f = .02; + $("#is_mobile").val() && a.increasedClosedBtn &&
            (f = .05);
        var c = a.yesButtonFunction || !1,
            l = a.afterWindowCreatedFunction || null,
            t = a.afterWindowClosedFunction || null;
        this.close = function() {
            d()
        };
        k.html() || (k = $("<DIV class=modal-window>").attr("id", "modal_window"), $(document.body).append(k), $(document).keydown(function(a) {
            27 == a.keyCode && d()
        }));
        if (null === b.html() || void 0 === b.html()) b = $("<DIV>").attr("id", "modal_window_bg"), $(document.body).append(b), $("#modal_window_bg").on("click", function() {
            d();
            return !1
        });
        k.css("width", "");
        0 < h && k.width(h);
        k.css("height",
            "");
        0 < m && k.height(m);
        $(k).html(g);
        var q = Math.ceil(.005 * _boardObj.getSize().width),
            u = Math.ceil(.015 * _boardObj.getSize().width),
            x = Math.ceil(.0225 * _boardObj.getSize().width);
        $("#modal_window").css({
            fontSize: Math.ceil(.017 * _boardObj.getSize().width) + "px", borderWidth: q + "px"
        });
        $(".info-modal-window") && ($(".info-modal-window").css("paddingLeft", Math.ceil(.015 * _boardObj.getSize().width) + "px"), $(".info-modal-window").css("paddingRight", Math.ceil(.015 * _boardObj.getSize().width) +
            "px"));
        void 0 !== a.top ? "center" == a.top ? ($("#modal_window").css({
            top: "50%"
        }), a = $("#modal_window").height(), $("#modal_window").css({
            "margin-top": -a / 2 + "px"
        })) : $("#modal_window").css({
            top: a.top + "px"
        }) : $("#modal_window").css({
            top: "10%"
        });
        if (e || c) e = Math.ceil(f * _boardObj.getSize().width), f = $('<DIV id="modal_window_close"><IMG src="images/buttons/mw-close.png" id="modal_window_close_img">'), k.append(f), $("#modal_window_close").on("click", function() {
                d();
                return !1
            }), $("#modal_window_close_img").width(e),
            $("#modal_window_close_img").height(e);
        c && (e = Math.ceil(.04 * _boardObj.getSize().width), f = $('<DIV id="modal_window_yes_buttons" class="modal-window-yes-panel"><DIV id="modal_window_yes"><IMG src="images/buttons/mw-button-yes.png"></DIV>'), k.append(f), $("#modal_window_yes").on("click", function() {
            c();
            d();
            return !1
        }), $("#modal_window_yes_buttons").width(1.33 * e), $("#modal_window_yes_buttons DIV").width(1.33 * e), $("#modal_window_yes_buttons DIV").height(1.33 * e), $("#modal_window_yes_buttons DIV").css("borderRadius",
            Math.ceil(.2666 * e)), $("#modal_window_yes_buttons DIV").css("borderWidth", Math.ceil(.111 * e)), $("#modal_window_yes_buttons DIV IMG").width(e), $("#modal_window_yes_buttons DIV IMG").height(e), $("#modal_window_yes_buttons DIV IMG").css("marginTop", .15 * e + "px"));
        e = $(window).width();
        f = k.width();
        e = e / 2 - (f + u + x + 2 * q) / 2;
        $("#modal_window").css({
            left: +e + "px"
        });
      
        k.show("fast", function() {
            var a = $(window).width(),
                b = k.width(),
                a = a / 2 - (b + u + x + 2 * q) / 2;
            $("#modal_window").css({
                left: +a + "px"
            });
        });
        b.show();
        l && setTimeout(l, 200)
    },
    LinkDataStore = function() {
        var a = this;
            a.data = {};
            a.get = function(d, g, c) {
                if(c == 1){
                    var URL = "getEjercicioObjectUserMiPlanificacion";
                }else{
                    var URL = (d == "ADMIN") ? "getEjercicioObject" : "getEjercicioObjectUser";
                }
                
                $.ajax({
                    type: "get",
                    dataType: "json",
                    headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
                    url: URL_SERVER+URL+"/"+g,
                    async: !1,
                    beforeSend: function() { $("#bg_loading_link_data_store").show() },
                    success: function(e) {                     
                        a.data.animation = e;
                    },
                    complete: function() {
                        $("#bg_loading_link_data_store").hide()
                    },
                    error: function(e) {
                        var d = _projectTexts.get();
                        document.querySelector("#param_animation_edit_mode") && +document.querySelector("#param_animation_edit_mode").value && (a.data.animation = {});
                    }

                });
            };
    }
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// EJERCICIO 2.JS
isTouch() && (AppConfig.clickType = "touch");
document.addEventListener("DOMContentLoaded", _run);
window.addEventListener("resize", _refresh);

var FINAL_MODAL = null;

var BoardHelpers = {
        boardFactory: function() {
            var J = "PADEL",
                w = this.boardsConfigs[J];
                w.type = J;
            return new Board(w)
        },
        showPage: function(J) {
            _currentPage && _pages[_currentPage] && _pages[_currentPage].hide();
            _currentPage = J;
            if (!_pages[_currentPage]) {
                var w = "_pages[_currentPage] = new " + J.charAt(0).toUpperCase() + J.substr(1, J.length - 1);
                eval(w + ";")
            } 
            _pages[_currentPage].show()
        },
        boardsConfigs: { "PADEL": {bgColor: "#738554", strokeColor: "#ffffff", heightToWidthCoeff: 0.6568, playerToBoardWidthCoeff: 0.026184} }
    },
    Board = function(J) {
        var L = J.type,
            x = J.key,
            G = J.heightToWidthCoeff,
            v = J.playerToBoardWidthCoeff,
            c = 0.6 * v,
            h = {width: null, height: null},
            n = {bgColor: J.bgColor, strokeColor: J.strokeColor},
            e = null,
            b = null,
            m = document.getElementById("board"),
            u = null,
            a = !1;

        function q() {  // ESTA FUNCION CONTROLA LAS DIMENCIONES DE LA PISTA 
            var a = window.innerWidth.toFixed(0),
                b = window.innerHeight.toFixed(0),
                e = a,
                c = 200;
            for ("touch" == AppConfig.clickType || 520 >= b ? c = 0 : 700 >= b ? c = 100 : 800 >= b && (c = 150);;) {
                e--;
                var l = Math.ceil(e * G);
                if (e < a && l < b - Math.ceil(.7 * c)) break
            }
            h.width  = a;
            h.height = b;
        }

        function w() { // ESTA FUNCION AÑADE LOS TAMAÑOS AL SVG            
            u || (u = document.getElementById("svg_canvas"));
            u.setAttribute("width", h.width);
            u.setAttribute("height", h.height);
            u.setAttribute("viewBox", "0 0 " + h.width + " " + h.height);

            // TAMAÑO DE LAS PISTA
            var PISTA = document.getElementById("imgPista");
                PISTA.setAttribute("width", h.width);
                PISTA.setAttribute("height", h.height);

        }

        function C() {
            e = Math.ceil(h.width * AppConfig.buttonToBoardHeightCoeff);
            b = Math.ceil(e * AppConfig.fontsizeToButtonWidthCoeff);
            10 > b && (b = 10);
            (function() {
                var a = Math.ceil(b / 2);
                12 > a && (a = 12);
                for (var r = Math.ceil(e / 10), c = Math.ceil(e / 15), l = Math.ceil(e / 5), m = Math.ceil(e / 15), h = document.querySelectorAll(".context-menu"), F = 0; F < h.length; F++) h[F].style.fontSize = a + "px", h[F].style.padding = r + "px", h[F].style.borderWidth = c + "px", h[F].style.borderRadius = l + "px";
                h = document.querySelectorAll(".context-menu input");
                for (F = 0; F < h.length; F++) h[F].style.fontSize = a + "px", h[F].style.marginBottom = m + "px"
            })();
            (function() {
                var ANCHOMONITOR = document.getElementById('main_body').offsetWidth;
                a = document.getElementById("main_html");
            })();
            (function() {
                var a = document.getElementById("shape_color_button_title");
                var b = document.getElementById("shape_color");
                if (a && !b) {
                    for (var c = 0; c < AppConfig.shapesColors.length; c++) {
                        var l = "color-" + AppConfig.shapesColors[c].stroke.substr(1);
                        b = document.createElement("img");
                        b.className = "ap-button hidden";
                        b.setAttribute("id", "shape_color_" + c);
                        b.setAttribute("src", "images/buttons/shapes/" + l + ".png");
                        b.setAttribute("title", a.value);
                        document.querySelector("div#shapes_colors").appendChild(b)
                    }
                    l = "color-" + AppConfig.shapesColors[0].stroke.substr(1);
                    b = document.createElement("img");
                    b.className = "ap-button";
                    b.setAttribute("id", "shape_color");
                    b.setAttribute("src", "images/buttons/shapes/" + l + ".png");
                    b.setAttribute("title", a.value);
                    document.querySelector("div#shapes_colors").appendChild(b);
                    document.getElementById("shape_color_button_title").remove()
                }
                a = document.querySelectorAll("#shapes_buttons_panel .ap-button");
                for (b = 0; b < a.length; b++) a[b].style.width = "30px", a[b].style.height = "30px";
                a = document.querySelectorAll("#shapes_buttons_panel div");
                a = 0;
                b = Math.ceil(1.1 * 50);
            })();
            (function() {
                for (var a = document.querySelectorAll("#anim_frames_container .anim-frame"), c = 0; c < a.length; c++) a[c].style.height = "30px", a[c].style.lineHeight = "31px", a[c].style.width = "30px";
                a = document.querySelectorAll(".anim-frame-img");
                for (c = 0; c < a.length; c++) a[c].style.height = "30px", a[c].style.width = "30px";
                a = document.querySelectorAll("#anim_frames_container .anim-frame .anim-frame-text");
                for (c = 0; c < a.length; c++) a[c].style.height = "30px", a[c].style.width = "30px", a[c].style.lineHeight = "31px", a[c].style.fontSize = Math.ceil(b / 1.5) + "px";
            
            })();
            (function() {
                for (var a = document.querySelectorAll("#animation_buttons_panel .ap-button"), c = 0; c < a.length; c++) a[c].style.width = "30px", a[c].style.height = "30px", a[c].style.marginRight = Math.ceil(.1 * e) + "px";
                a = document.querySelectorAll("#animation_buttons_panel .button_no_hover");
                a = document.querySelectorAll("#animation_buttons_panel .anim-frame-text");
                for (c = 0; c < a.length; c++) a[c].style.height = "30px", a[c].style.width = "30px", a[c].style.lineHeight = "31px", a[c].style.fontSize = Math.ceil(b / 1.5) + "px"
            })()
        }

        function E() {
            (function() {
                document.addEventListener("selectstart", function(a) {
                    if (!(a.target && a.target.localName && "input" ==
                            a.target.localName.toLowerCase() || a.target && a.target.nodeName && "input" == a.target.nodeName.toLowerCase() || a.target && a.target.tagName && "input" == a.target.tagName.toLowerCase())) return a.preventDefault(), !1
                }, !1);
                "touch" != AppConfig.clickType ? document.addEventListener("contextmenu", function(a) {
                    if (!(a.target && a.target.localName && "input" == a.target.localName.toLowerCase() || a.target && a.target.nodeName && "input" == a.target.nodeName.toLowerCase() || a.target && a.target.tagName && "input" == a.target.tagName.toLowerCase())) return a.preventDefault(),
                        hideElement(".context-menu"), !1
                }, !1) : document.addEventListener("contextmenu", function(a) {
                    a.preventDefault();
                    return !1
                }, !1);
                "touch" != AppConfig.clickType && window.addEventListener("scroll", function(a) {
                    hideElement(".context-menu")
                })
            })();
            (function() {
                addEventForElements(".context-menu", "keydown", function(a) {
                    27 == a.which && hideElement(".context-menu")
                })
            })();
            (function() {
                addEventForElements("#shapes_buttons_panel .ap-button", "mousedown", function(a) {
                    a.preventDefault();
                    return !1
                }, !1);
                addEventForElements("div.shapes-selector-column .hidden", "click", function() {
                    var a = this.id.split("_"),
                        b = a[1],
                        c = a[a.length - 1],
                        b = "set" + b.charAt(0).toUpperCase() + b.slice(1);
                    _pages[_currentPage].getShapesPainter()[b](c);
                    --a.length;
                    a = a.join("_");
                    document.getElementById(a).setAttribute("src", this.getAttribute("src"));
                    hideElement("div.shapes-selector-column img.hidden");
                    return !1
                });
                addEventForElements("#shapes_elements .ap_top_menu_margin", "mouseover", function() {
                    showElement("#shapes_elements img.hidden")
                });
                addEventForElements("#shapes_elements .ap_top_menu_margin", "mouseout", function() {
                    hideElement("#shapes_elements img.hidden")
                });
                addEventForElements("#shapes_elements .ap_top_menu_margin", "touchstart", function() {
                    hideElement("#shapes_elements img.hidden");
                    
                });

                addEventForElements("#shapes_stroke_styles .ap_top_menu_margin", "mouseover", function() {
                    showElement("#shapes_stroke_styles img.hidden")
                });
                addEventForElements("#shapes_stroke_styles .ap_top_menu_margin", "mouseout", function() {
                    hideElement("#shapes_stroke_styles img.hidden")
                });
                addEventForElements("#shapes_arrow .ap_top_menu_margin", "mouseover", function() {
                    showElement("#shapes_arrow img.hidden")
                });
                addEventForElements("#shapes_arrow .ap_top_menu_margin", "mouseout", function() {
                    hideElement("#shapes_arrow img.hidden")
                });
                addEventForElements("#shapes_colors .ap_top_menu_margin", "mouseover", function() {
                    howElement("#shapes_colors img.hidden");
                });
                addEventForElements("#shapes_colors .ap_top_menu_margin", "mouseout", function() {
                    hideElement("#shapes_colors img.hidden");
                })
            })();
            (function() {
                for (var a = document.querySelectorAll("#top_buttons_panel .ap_top_menu"), b = 0; b < a.length; b++) a[b].addEventListener("mousedown",
                    function(a) {
                        a.preventDefault();
                        return !1
                    }, !1);
            })();              
            (function() {
                window.addEventListener("popstate", function(a) {
                    if (a.state && a.state.page && _pages[a.state.page]) {
                        BoardHelpers.showPage(a.state.page)
                    }
                })
            })()
        }

        this.init = function() {
            q();
            w();
            C();
            E();
        };
        this.refresh = function() {
            q();
            w();
            C()
        };
        this.getPlayerToBoardWidthCoeff = function() {return v};
        this.getBallToBoardWidthCoeff = function() {return c};
        this.getSize      = function() {return h};
        this.getColors    = function() {return n};
        this.getType      = function() {return L};
        this.getKey       = function() {return x};
        this.getContainer = function() {return m};
        this.getCanvasId  = function() {return "svg_canvas"};
        this.getCanvasContainer = function() {
            u || (u = document.getElementById("svg_canvas"));
            return u
        }
    },
    Player = function(J) {
        var c = J,
            h = this,
            n = c.number,
            e = c.name || "",
            b = c.colors,
            m = c.playerID,
            l = c.zindex || 100001,
            u = _boardObj.getPlayerToBoardWidthCoeff(),
            a = null,
            k = null,
            r = null,
            A = null,
            B = c.playerPositionRelations,
            D = null,
            y = _boardObj.getCanvasId();
            
        function q(a) { // EN ESTA FUNCION POSICIONA EL MENU CONTEXTUAL DE LOS OBJETOS
            hideElement(".context-menu");
            if (1 == _pages[_currentPage].getPlayers().lockContextMenu()) return !1;

            var b = document.querySelector("#" + a.containerID),
                f = Math.ceil(_boardObj.getSize().width * u),
                d = parseInt(k.getAttribute("x")),
                c = parseInt(k.getAttribute("y")),
                e = $(b).width(),
                l = b.style.borderTopWidth,
                l = parseInt(l);
            isNaN(l) && (l = 2);

            var p = b.style.paddingLeft,
                p = parseInt(p);
            isNaN(p) && (p = 3);

            d = d - Math.ceil(e / 2) - p - l;
            e = k.getAttribute("fill");
            document.querySelector("#" + a.containerID).style.background = e;
            f = Math.ceil(c + f / 2 + Math.ceil(.25 * f));
            b.style.left    = d + "px";
            b.style.top     = f + "px";
            b.style.display = "block";
            if (a.onMenuOpen) a.onMenuOpen(h);
            return !1
        }

        function w(a, b, f) {  // ESTA FUNCION CONFIGURA LA POSISICION DE LOS OBJETOS
            _boardObj.getSize();

            f.setAttribute("x", a);
            f.setAttribute("y", b);
        }

        function C(a, b, f) {  // ESTA FUNCION CONTROLA LA POSICION DEL NUMERO DE LA IMAGEN
            var d = Math.ceil(_boardObj.getSize().width * u),
                c = +(a - d / 4.8).toFixed(0);
                1 < (n + "").length && (c = +(a - d / 2.4).toFixed(0));
                a = +(b + d / 4).toFixed(0);
            
            f.setAttribute("x", a);
            f.setAttribute("y", c)
        }

        function E(a, b, f) {  // ESTA FUNCION CONTROLA LA POSICION DEL TEXTO DE LA IMAGEN
            var d = Math.ceil(_boardObj.getSize().width * u);
                a = +(a - f.getBoundingClientRect().width / 2).toFixed(0);
                b = +(b - d / 1.4).toFixed(0);
            
            f.setAttribute("x", a);
            f.setAttribute("y", b)
        }

        function L(a, b) {
            return b ? Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientY + document.body.scrollTop : a.pageY : Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ?
                event.clientX + document.body.scrollTop : a.pageX
        }

        function x(a, b) {
            function f(a) {
                if (!n) {
                    var b = L(a, 1) + l - h;
                    a = L(a) + t - p;
                    a < e / 2 ? a = e / 2 : a > _boardObj.getSize().width - e / 2 && (a = _boardObj.getSize().width - e / 2);
                    b < +(2 * e).toFixed(0) ? b = +(2 * e).toFixed(0) : parseInt(k.getAttribute("y")) <= _boardObj.getSize().height - 1.6 * e ? b > _boardObj.getSize().height - 1.6 * e && (b = _boardObj.getSize().height - 1.6 * e) : a > .45 * _boardObj.getSize().width && (a = .45 * _boardObj.getSize().width);
                    var d = a+20,
                        f = b;
                    w(d, f, k);
                    C(d, f, r);
                    E(d, f, A);
                    B.left = +(a / _boardObj.getSize().width).toFixed(20);
                    B.top = +(b / _boardObj.getSize().height).toFixed(20);
                    if (c.onMove) c.onMove(m, {
                        x: +B.left,
                        y: +B.top
                    });                     
                }
            }

            function d(a) {
                n = 1;
                if (c.onMoveEnd) c.onMoveEnd(m, {
                    x: +B.left,
                    y: +B.top
                });
                document.removeEventListener("mousemove", f);
                document.removeEventListener("mouseup", d)
            }
            var e = Math.ceil(_boardObj.getSize().width * u),
                t = parseInt(k.getAttribute("x")),
                l = parseInt(k.getAttribute("y")),
                p = L(b),
                h = L(b, 1),
                n;
            document.addEventListener("mousemove", f, !1);
            document.addEventListener("mouseup", d, !1);
            if (c.onMoveStart) c.onMoveStart(m)
        }

        function G(a, b) {
            function f(a) {
                if (+e.changedTouches[0].clientX.toFixed(5) == +a.changedTouches[0].clientX.toFixed(5) && +e.changedTouches[0].clientY.toFixed(5) == +a.changedTouches[0].clientY.toFixed(5)) return !1;
                clearTimeout(D);
                hideElement(".context-menu");
                if (1 == _pages[_currentPage].getPlayers().lockMoving()) return !1;
                var b = a.touches[0].pageX - F.left + t - p;
                a = a.touches[0].pageY - F.top + l - h;
                b < n / 2 ? b = n / 2 : b > _boardObj.getSize().width - n / 2 && (b = _boardObj.getSize().width - n / 2);
                a < +(2 * n).toFixed(0) ? a = +(2 * n).toFixed(0) : parseInt(k.getAttribute("y")) <= _boardObj.getSize().height - 1.6 * n ? a > _boardObj.getSize().height - 1.6 * n && (a = _boardObj.getSize().height - 1.6 * n) : b > .45 * _boardObj.getSize().width && (b = .45 * _boardObj.getSize().width);
                var d = b,
                    f = a;
                w(d, f, k);
                C(d, f, r);
                E(d, f, A);
                B.top = +(a / _boardObj.getSize().height).toFixed(20);
                B.left = +(b / _boardObj.getSize().width).toFixed(20);
                if (c.onMove) c.onMove(m, {
                    x: +B.left,
                    y: +B.top
                });
                return !1
            }

            function d() {
                clearTimeout(D);
                document.removeEventListener("touchmove", f);
                document.removeEventListener("touchend", d);
                if (c.onMoveEnd) c.onMoveEnd(m, {
                    x: +B.left,
                    y: +B.top
                })
            }
            b.preventDefault();
            var e = b.originalEvent,
                t = parseInt(k.getAttribute("x")),
                l = parseInt(k.getAttribute("y")),
                p = e.changedTouches[0].pageX - $("#" + y).offset().left,
                h = e.changedTouches[0].pageY - $("#" + y).offset().top,
                n = Math.ceil(_boardObj.getSize().width * u),
                F = $("#" + y).offset();
            if (c.onMoveStart) c.onMoveStart(m);
            document.addEventListener("touchmove", f, !1);
            document.addEventListener("touchend", d, !1)
        }

        function v(a) {
            clearTimeout(D);
            c.contextMenu && (D = setTimeout(function() {
                q({
                    containerID: c.contextMenu.containerID,
                    onMenuOpen: c.contextMenu.onMenuOpen
                });
                return !1
            }, 750))
        }

        (function() {
            a = $(document.getElementById(m));
            a.show();
            k = document.getElementById(m + "_shape");
            r = document.getElementById(m + "_number");
            A = document.getElementById(m + "_name");
            A.textContent = e;

            var F = Math.ceil(_boardObj.getSize().width * u),
                t = +(_boardObj.getSize().width * B.left).toFixed(0),
                f = +(_boardObj.getSize().height * B.top).toFixed(0),
                d = +(.67 * F).toFixed(0);
            8 > d && (d = 8);

            var y = Math.ceil(d / 1.25),
                F = Math.ceil(F / 2);

            w(t, f, k);
            
            k.setAttribute("fill", b.background);
            r.setAttribute("font-size", d + "px");
            r.setAttribute("fill", b.font);
            C(t, f, r);
            
            A.setAttribute("font-size", y + "px");
            A.setAttribute("fill", "#000000");
            E(t, f, A);

            if ("touch" == AppConfig.clickType) a.on("click", function(a) {
                    animate_btn_save_play();
                    clearTimeout(D)
                }), a.on("touchstart", function(b) {
                    animate_btn_save_play();
                v(b);
                _pages[_currentPage].getShapesPainter && _pages[_currentPage].getShapesPainter() && _pages[_currentPage].getShapesPainter().removeAdditionalShapes();
                hideElement(".context-menu");
                if (1 == _pages[_currentPage].getPlayers().lockMoving()) return !1;
                var d = _pages[_currentPage].getPlayers().getMaxZindex();
                d > l && (d++, _pages[_currentPage].getPlayers().setMaxZindex(d), h.setZindex(d));
                d = document.getElementById("players_section").lastElementChild;
                a.insertAfter($(d));
                G($(this), b);
                return !1
            });
            else if (a.on("mousedown", function(b) {
                    animate_btn_save_play();
                    _pages[_currentPage].getShapesPainter && _pages[_currentPage].getShapesPainter() && _pages[_currentPage].getShapesPainter().removeAdditionalShapes();
                    hideElement(".context-menu");
                    if (1 == _pages[_currentPage].getPlayers().lockMoving()) return !1;
                    var d = _pages[_currentPage].getPlayers().getMaxZindex();
                    d > l && (d++, _pages[_currentPage].getPlayers().setMaxZindex(d), h.setZindex(d));
                    d = document.getElementById("players_section").lastElementChild;
                    a.insertAfter($(d));
                    x(document.getElementById(m), b);
                    return !1
                }), c.contextMenu) a.on("contextmenu", function(a) {
                a.preventDefault();
                q({
                    containerID: c.contextMenu.containerID,
                    onMenuOpen: c.contextMenu.onMenuOpen
                });
                return !1
            });
        })();

        h.refresh = function(b) {
            if (a) {
                var c = Math.ceil(_boardObj.getSize().width * u); // Radio circulos
                    b = +(_boardObj.getSize().width * B.left).toFixed(0); // + 20;
                    f = +(_boardObj.getSize().height * B.top).toFixed(0);
                    d = +(.67 * c).toFixed(0);
                
                    8 > d && (d = 8);
                
                var e = Math.ceil(d / 1.25),
                    c = +(c).toFixed(0);   
                w(b, f, k);
                r.setAttribute("font-size", d + "px");
                C(b, f, r);
                A.setAttribute("font-size", e + "px");
                E(b, f, A)
            }
        };
        h.setPosition = function(a) {
            B = a.playerPositionRelations;
            a = Math.ceil(_boardObj.getSize().width * B.left);
            b = Math.ceil(_boardObj.getSize().height * B.top);
            
            w(a, b, k);
            C(a, b, r);
            E(a, b, A)
        };
        h.setNumber = function(a) {
            n = a;
            _boardObj.getSize();
            a = parseInt(k.getAttribute("x"));
            var b = parseInt(k.getAttribute("y"));
            C(a, b, r);
            if (a = document.getElementById("anim_clone_" + m + "_number")) {
                var f = document.getElementById("anim_clone_" + m + "_shape");
                a.textContent = n;
                b = parseInt(f.getAttribute("x"));
                f = parseInt(f.getAttribute("y"));
                C(b, f, a)
            }
        };
        h.setName = function(a) {
            e = a;
            A.textContent = e;
            a = parseInt(k.getAttribute("x"));
            var b = parseInt(k.getAttribute("y"));
            E(a, b, A);
            if (a = document.getElementById("anim_clone_" + m + "_name")) {
                var f = document.getElementById("anim_clone_" + m + "_shape");
                a.textContent = e;
                b = parseInt(f.getAttribute("x"));
                f = parseInt(f.getAttribute("y"));
                E(b, f, a)
            }
        };
        h.createClone = function(b, c) {
            var f = $(a).clone();
            var d = b + m;
            f.insertBefore("#" + m);
            f.attr("id", d);
            for (var d = document.getElementById(d).childNodes, e = 0; e < d.length; e++) {
                var t = null;
                d[e].getAttribute && (t = d[e].getAttribute("id"));
                t && d[e].setAttribute("id", b + t)
            }
            f.attr("opacity", "0.5");
            f.removeClass("svg-player-shape");
            f = document.getElementById(b + m + "_shape");
            f.style.cursor = "default";
            if (void 0 !== c) {
                f = document.getElementById(b + m + "_shape");
                d = document.getElementById(b + m + "_name");
                e = document.getElementById(b + m + "_number");
                _boardObj.getSize();
                var t = c.x * _boardObj.getSize().width + 20,
                    k = c.y * _boardObj.getSize().height;
                w(t, k, f);
                C(t, k, e);
                E(t, k, d)
            }
        };
        h.getPositionRelations = function() { return B };
        h.getInfo = function() {
            return {
                nmb: n,
                nm: e,
                zi: l,
                pos: {
                    x: +(+B.left).toFixed(8),
                    y: +(+B.top).toFixed(8)
                }
            }
        };
        h.getId = function() {return m};
        h.getNumber = function() {return n};
        h.getName = function() {return e};
        h.getZindex = function() {return l};
        h.setZindex = function(a) {l = a}
    },
    Players = function(J) {
        var w = J || {},
            C = {},
            E = {},
            L = 100001,
            x = L,
            G = !1,
            v = !1;

        function q(c) {
            if (c) {
                var h = [];
                for (n in c) c.hasOwnProperty(n) && C[n] && c[n].pos && (c[n].id = n, h.push(c[n]));
                h.sort(function(b, c) {
                    if (!b.zi) return -1;
                    if (!c.zi) return 1;
                    if (b.zi < c.zi) return -1;
                    if (b.zi > c.zi) return 1
                });
                for (c = 0; c < h.length; c++) {
                    var n = h[c].id;
                    C[n].setPosition({
                        playerPositionRelations: {
                            left: h[c].pos.x,
                            top: h[c].pos.y
                        }                       
                    });
                    
                    void 0 !== h[c].nmb && C[n].setNumber(h[c].nmb);
                    void 0 !== h[c].nm && C[n].setName(h[c].nm);
                    void 0 !== h[c].zi && (C[n].setZindex(h[c].zi), h[c].zi > x && (x = h[c].zi));
                    var e = document.getElementById("players_section").lastElementChild;
                    $("#" + n).insertAfter($(e))
                }
            }
        }
        
        (function() {
            for (var c = _boardObj.getSize().width * _boardObj.getPlayerToBoardWidthCoeff(), h = +(_boardObj.getSize().height - .6 * c).toFixed(0), n = 0; n < AppConfig.playersColors.length; n++)
                for (var e = AppConfig.playersCount; 0 < e; e--) {
                    var b = _currentPage + "_player_" + e + "_" + (parseInt(n) + 1),
                        m = {};

                        m.colors   = AppConfig.playersColors[n];
                        m.playerID = b;
                        m.number   = e;
                        m.name     = "";
                        m.zindex   = L++;

                    var l = Math.ceil(n * c) + Math.ceil(c / 0.35) * n;
                        l = l + .33333 * c / 1.75 + .0636 * _boardObj.getSize().width + 0.5 * c;
                        l = Math.ceil(l);                    
                        l = {
                            top: + (h / _boardObj.getSize().height).toFixed(20),
                            left: + (l / _boardObj.getSize().width).toFixed(20)
                        };
                    
                    m.playerPositionRelations = l;
                    w.onPlayerMoveStart && (m.onMoveStart = w.onPlayerMoveStart);
                    w.onPlayerMove && (m.onMove = w.onPlayerMove);
                    w.onPlayerMoveEnd && (m.onMoveEnd = w.onPlayerMoveEnd);
                    w.contextMenu && (m.contextMenu = w.contextMenu);

                    C[b] = new Player(m);
                    E[b] = {};
                    E[b].top    = l.top;
                    E[b].left   = l.left;
                    E[b].number = e;
                    E[b].zindex = m.zindex
                }
            x = L + 1
        })();

        this.show          = function() {showElement('[id^="' + _currentPage + '_player_"]')};
        this.hide          = function() {hideElement('[id^="' + _currentPage + '_player_"]')};
        this.refresh       = function() {for (var c in C) C.hasOwnProperty(c) && C[c].refresh && C[c].refresh()};
        this.getPlayerInfo = function(c) {return C[c].getInfo()};
        this.restore       = function(c) {q(c)};
        this.reset         = function(c) {
            c = c || {}; 
            if (c.player_id) return C[c.player_id].setPosition({
                playerPositionRelations: {
                    left: E[c.player_id].left,
                    top: E[c.player_id].top
                }
            }), C[c.player_id].setNumber(E[c.player_id].number), C[c.player_id].setName(""), C[c.player_id].setZindex(E[c.player_id].zindex), !0;
            x = 0;
            for (var h in C) C.hasOwnProperty(h) && (C[h].setPosition({
                playerPositionRelations: {
                    left: E[h].left,
                    top: E[h].top - 0.1950
                }
            }), C[h].setNumber(E[h].number), C[h].setName(""), C[h].setZindex(E[h].zindex)), E[h].zindex > x && (x = E[h].zindex)
        };
        this.reset_ap      = function(c) {
            c = c || {}; 
            if (c.player_id) return C[c.player_id].setPosition({
                playerPositionRelations: {
                    left: E[c.player_id].left,
                    top: E[c.player_id].top
                }
            }), C[c.player_id].setNumber(E[c.player_id].number), C[c.player_id].setName(""), C[c.player_id].setZindex(E[c.player_id].zindex), !0;
            x = 0;
            for (var h in C) C.hasOwnProperty(h) && (C[h].setPosition({
                playerPositionRelations: {
                    left: E[h].left,
                    top: E[h].top - 0.122
                }
            }), C[h].setNumber(E[h].number), C[h].setName(""), C[h].setZindex(E[h].zindex)), E[h].zindex > x && (x = E[h].zindex)
        };
        this.setMaxZindex = function(c) {x = c};
        this.getMaxZindex = function() {return x};
        this.lockMoving   = function(c) {
            if (void 0 === c) return G;
            G = c;
            return G = !!G
        };
        this.lockContextMenu = function(c) {
            if (void 0 === c) return v;
            v = c;
            return v = !!v
        };
        this.setPlayerPosition = function(c, h) {C[c].setPosition(h)};
        this.setPlayerNumber   = function(c, h) {C[c].setNumber(h)};
        this.setPlayerName     = function(c, h) {C[c].setName(h)};
        this.createPlayerClone = function(c, h, n) {C[c].createClone(h, n)}
    },
    ShapesPainter = function(J) {
        function q() {
            var a = [];
            $.each(e, function(b, d) {
                var c = d.getStoreInfo();
                a.push(c)
            });
            return a
        }

        function w(a) {
            $.each(a, function(a, b) {
                var d = Shapes.Factory(b.t, {
                    onChanged: v.onShapeChanged
                });
                if (d) {
                    var c = {
                        canvas_element_id: h,
                        stroke_width: C(d)
                    };
                    d.create(c);
                    d.restore({
                        points_positions_relations: b.ppr,
                        stroke_style: b.ss,
                        arrow: b.a,
                        stroke_color: b.sc,
                        fill_color: b.fc
                    });
                    d.draw();
                    e.push(d)
                }
            })
        }

        function C(a) {
            var b = l;
            a && a.getStrokeWidthToBoardCoeff && (b = _boardObj.getSize().width * a.getStrokeWidthToBoardCoeff());
            return b = Math.ceil(b)
        }

        function E() { "touch" == AppConfig.clickType ? n.addEventListener("touchstart", L, !1) : n.addEventListener("mousedown", L, !1) }

        function L(e) {
            c.removeAdditionalShapes();
            if (B) {
                hideElement(".context-menu");
                y = !1;
                if (e.touches && 1 != e.touches.length) return !0;
                e.preventDefault();
                if (e.touches) {
                    var f = e.touches[0].pageX - $("#" + h).offset().left;
                    e = e.touches[0].pageY - $("#" + h).offset().top
                } else {
                    if (1 !== e.which) return !0;
                    f = e.pageX - $("#" + h).offset().left;
                    e = e.pageY - $("#" + h).offset().top
                }
                if (b = Shapes.Factory(m, {
                        onChanged: v.onShapeChanged
                    })) f = {
                    canvas_element_id: h,
                    left: f,
                    top: e,
                    stroke_color: r,
                    stroke_width: C(b),
                    stroke_style: u,
                    arrow: a,
                    fill_color: k
                }, b.create(f);
                else return !0;
                D = !1;
                "touch" == AppConfig.clickType ? (document.addEventListener("touchmove", G, !1), document.addEventListener("touchend", x, !1)) : (document.addEventListener("mousemove", G, !1), document.addEventListener("mouseup", x, !1))
            }
        }

        function x() {
            if (!D) {
                D = !0;
                if (b) {
                    if (!y || b.isValid && !b.isValid()) return b.remove(), y = !1, !0;
                    b.afterCreated();
                    e.push(b);
                    if (v.onShapeAdded) v.onShapeAdded(b)
                }
                "touch" == AppConfig.clickType ? (document.removeEventListener("touchmove", G), document.removeEventListener("touchend", x)) : (document.removeEventListener("mousemove", G), document.removeEventListener("mouseup", x));
                y = !1
            }
        }

        function G(a) {
            if (!D) {
                "touch" != AppConfig.clickType && a.preventDefault();
                if (a.touches) {
                    var c =
                        a.touches[0].pageX - $("#" + h).offset().left;
                    a = a.touches[0].pageY - $("#" + h).offset().top
                } else c = a.pageX - $("#" + h).offset().left, a = a.pageY - $("#" + h).offset().top;
                b && b.creating({
                    left: c,
                    top: a
                });
                y = !0
            }
        }
        var v = J || {},
            c = this;
        document.getElementById("board");
        var h = _boardObj.getCanvasId(),
            n = _boardObj.getCanvasContainer(),
            e = [],
            b = null,
            m = null,
            l = Math.ceil(.0017456 * _boardObj.getSize().width),
            u = null,
            a = null,
            k = AppConfig.shapesColors[0].fill,
            r = AppConfig.shapesColors[0].stroke,
            A = 0,
            B = !1,
            D = !0,
            y = !1,
            F = !1,
            h = _boardObj.getCanvasId(),
            n = _boardObj.getCanvasContainer();
        E();
        c.refresh = function(a) {
            document.getElementById("shapes_1_section").textContent = "";
            document.getElementById("shapes_2_section").textContent = "";
            l = Math.ceil(.0017456 * _boardObj.getSize().width);
            n = _boardObj.getCanvasContainer();
            E();
            a = {
                stroke_width: l
            };
            for (var b = 0; b < e.length; b++) a.stroke_width = C(e[b]), e[b].draw(a)
        };
        c.hide = function() {
            removeElement('[id^="svg_shape_"]');
            removeElement(".svg-shape-arrow");
            c.removeAdditionalShapes();
            hideElement(".context-menu");
            "touch" == AppConfig.clickType ?
                n.removeEventListener("touchstart", L) : n.removeEventListener("mousedown", L);
            B = !1;
            document.querySelector("#" + h).style.cursor = "default"
        };
        c.getInfo = function() { return q() };
        c.getStrokeWidthToBoardCoeff = function() { return .0017456 };
        c.restore = function(a) { w(a) };
        c.enable = function() {
            if (m && "null" != m) {
                B = !0;
                var a = "images/cursors/pencil.png";
                document.querySelector("#" + h).style.cursor = 'url("' + a + '"), default'
            }
        };
        c.disable = function() {
            B = !1;
            document.querySelector("#" + h).style.cursor = "default"
        };
        c.lockShapesFocusing =
            function(a) {
                for (var b = 0; b < e.length; b++) e[b].lockFocusing(a)
            };
        c.lockShapesChanging = function(a) {
            for (var b = 0; b < e.length; b++) e[b].lockChanging(a)
        };
        c.lockContextMenu = function(a) {
            if (void 0 === a) return F;
            F = a;
            return F = !!F
        };
        c.clean = function(a) {
            for (a = 0; a < e.length; a++) e[a].remove();
            removeElement(".svg-shape-arrow");
            c.removeAdditionalShapes();
            hideElement(".context-menu");
            e = []
        };
        c.removeLastShape = function() {
            if (0 == e.length) return !1;
            var a = e.length - 1;
            if (v.onShapeBeforeRemoved) v.onShapeBeforeRemoved(e[a]);
            e[a].remove();
            e.length = a;
            c.removeAdditionalShapes();
            hideElement(".context-menu");
            if (v.onShapeRemoved) v.onShapeRemoved()
        };
        c.removeShape = function(a) {
            for (var b = 0; b < e.length; b++)
                if (e[b].getId() == a) {
                    if (v.onShapeBeforeRemoved) v.onShapeBeforeRemoved(e[b]);
                    e[b].remove();
                    c.removeAdditionalShapes();
                    hideElement(".context-menu");
                    e.splice(b, 1);
                    if (v.onShapeRemoved) v.onShapeRemoved();
                    break
                }
        };
        c.setShapeType = function(a) {
            (m = a) && "null" != a ? (B = !0, a = "images/cursors/pencil.png", document.querySelector("#" + h).style.cursor =
                'url("' + a + '"), default') : (B = !1, document.querySelector("#" + h).style.cursor = "default")
        };
        c.setStrokeStyle = function(a) { u = a };
        c.setArrow = function(b) { a = b };
        c.setColor = function(a) {
            k = AppConfig.shapesColors[a].fill;
            r = AppConfig.shapesColors[a].stroke;
            A = a
        };
        c.removeAdditionalShapes = function() {
            removeElement(".svg-shape-shadow");
            removeElement('[id^="svg_node_shape_"]')
        };
        c.shapeContextMenu = function(a, b) {
            if (F || !v.contextMenu) return !1;
            hideElement(".context-menu");
            var d = Math.ceil(.015 * _boardObj.getSize().width);
            8 > d &&
                (d = 8);
            var c = document.querySelector("#" + v.contextMenu.containerID);
            c.style.fontSize = d + "px";
            if ("touch" == AppConfig.clickType) {
                var f = a.originalEvent;
                d = f.changedTouches[0].pageX - $("#" + v.contextMenu.containerID).width() / 2;
                f = f.changedTouches[0].pageY + $("#" + v.contextMenu.containerID).height() / 2
            } else f = 0, document.body && document.body.scrollTop ? f = document.body.scrollTop : document.documentElement && document.documentElement.scrollTop && (f = document.documentElement.scrollTop), d = a.pageX - $("#" + v.contextMenu.containerID).width() /
                2, f = a.pageY - f + $("#" + v.contextMenu.containerID).height() / 2;
            c.style.left = d + "px";
            c.style.top = f + "px";
            if (v.contextMenu.onMenuOpen) v.contextMenu.onMenuOpen(b);
            c.style.display = "block";
            return !1
        };
        c.shapeKeyDownEvent = function(a) {
            $(document).off("keydown.remove_shape");
            $(document).on("keydown.remove_shape", function(b) {
                if (1 == $("#shadow_" + a).length && 46 == b.keyCode) {
                    for (b = 0; b < e.length; b++)
                        if (e[b].getId() == a) {
                            if (v.onShapeBeforeRemoved) v.onShapeBeforeRemoved(e[b]);
                            e[b].remove();
                            c.removeAdditionalShapes();
                            hideElement(".context-menu");
                            e.splice(b, 1);
                            if (v.onShapeRemoved) v.onShapeRemoved();
                            break
                        }
                    $(document).off("keydown.remove_shape")
                }
            })
        };
        c.addShape = function(a) { e.push(a) };
        c.refreshPanelButtons = function() {
            var b = document.querySelector("#shape_shapeType"),
                f = "shape_shapeType_null";
            m && (f = "shape_shapeType_" + m);
            b.setAttribute("src", document.querySelector("#" + f).getAttribute("src"));
            c.disable();
            m && c.enable();
            b = document.querySelector("#shape_strokeStyle");
            f = "shape_strokeStyle_solid";
            u && (f = "shape_strokeStyle_" + u);
            b.setAttribute("src", document.querySelector("#" + f).getAttribute("src"));
            b = document.querySelector("#shape_arrow");
            f = "shape_arrow_none";
            a && (f = "shape_arrow_" + a);
            b.setAttribute("src", document.querySelector("#" + f).getAttribute("src"));
            b = document.querySelector("#shape_color");
            f = "shape_color_0";
            A && (f = "shape_color_" + A);
            b.setAttribute("src", document.querySelector("#" + f).getAttribute("src"))
        }
    },
    Shapes = {
        Factory: function(J, q) {
            switch (J) {
                case "line":
                    return new Shapes.Line(q);
                case "pencil":
                    return new Shapes.Pencil(q);
                case "arrow":
                    return new Shapes.Arrow(q);
                case "rectangle":
                    return new Shapes.Rectangle(q);
                case "polygon":
                    return new Shapes.Polygon(q);
                case "ellipse":
                    return new Shapes.Ellipse(q);
                case "curve-line":
                    return new Shapes.CurveLine(q);
                default:
                    return null
            }
        },
        Pencil: function(J) {
            function q() {
                if (U) return !1;
                var a = document.getElementById("shapes_2_section").lastElementChild;
                b.insertAfter($(a));
                m.insertBefore(b);
                $.each(k, function(a, b) {
                    b.insertAfter($("#" + e))
                });
                E();
                _pages[_currentPage].getShapesPainter().shapeKeyDownEvent(e)
            }

            function w(a) {
                var d = null;
                b.attr("points") && (d = b.attr("points").split(" "));
                if (!(d && 3 < d.length)) return !1;
                if ("start" == a) {
                    var f = +d[3].split(",")[0];
                    var p = +d[3].split(",")[1];
                    var h = +d[0].split(",")[0];
                    var z = +d[0].split(",")[1]
                } else "end" == a && (f = +d[d.length - 3].split(",")[0], p = +d[d.length - 3].split(",")[1], h = +d[d.length - 1].split(",")[0], z = +d[d.length - 1].split(",")[1]);
                var I = Math.sqrt(Math.pow(f - h, 2) + Math.pow(p - z, 2)) / r;
                if (0 == I) return !1;
                var d = h,
                    fa = z;
                0 != I && (h = (h * (1 + I) - f) / I, z = (z * (1 + I) - p) / I);
                f = d;
                p = fa;
                var I = d + r / 3 / Math.sqrt(1 + Math.pow((f - h) / (p - z), 2)),
                    Z = fa - r / 3 / Math.sqrt(1 + Math.pow((p - z) / (f - h),
                        2)),
                    N = d - r / 3 / Math.sqrt(1 + Math.pow((f - h) / (p - z), 2)),
                    O = fa + r / 3 / Math.sqrt(1 + Math.pow((p - z) / (f - h), 2));
                if (0 > z - p && 0 < h - f || 0 < z - p && 0 > h - f) I = d + r / 3 / Math.sqrt(1 + Math.pow((f - h) / (p - z), 2)), Z = fa + r / 3 / Math.sqrt(1 + Math.pow((p - z) / (f - h), 2)), N = d - r / 3 / Math.sqrt(1 + Math.pow((f - h) / (p - z), 2)), O = fa - r / 3 / Math.sqrt(1 + Math.pow((p - z) / (f - h), 2));
                f = f + "," + p + " " + h + "," + z + " " + I + "," + Z + " " + h + "," + z + " " + N + "," + O;
                if (!k[a]) {
                    p = "svg_shape_arrow_" + a + "_" + e;
                    $("#" + p).remove();
                    k[a] = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                    k[a] = $(k[a]).insertAfter("#" + e);
                    k[a].attr("id", p);
                    k[a].addClass("svg-shape-arrow");
                    k[a].attr("stroke", b.attr("stroke"));
                    k[a].attr("stroke-width", b.attr("stroke-width"));
                    k[a].attr("fill", b.attr("fill"));
                    k[a].attr("fill-rule", b.attr("fill-rule"));
                    k[a].attr("fill-opacity", b.attr("fill-opacity"));
                    k[a].css("cursor", "pointer");
                    l.push(document.querySelector("#" + p));
                    if ("touch" == AppConfig.clickType) k[a].on("touchstart", function(a) {
                        c(a);
                        v(a);
                        return !1
                    });
                    else k[a].on("mousedown", function(a) {
                        if (1 == a.which) return G(a), !1
                    }), k[a].on("contextmenu",
                        function(a) {
                            a.preventDefault();
                            q();
                            _pages[_currentPage].getShapesPainter().shapeContextMenu(a, n);
                            return !1
                        });
                    k[a].on("click", function(a) {
                        clearTimeout(B);
                        a.preventDefault();
                        q();
                        return !1
                    })
                }
                k[a].attr("points", f)
            }

            function C() {
                var a = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                b = $(a).appendTo("#shapes_2_section");
                b.attr("id", e);
                b.addClass("shape-high-level", e);
                b.css("cursor", "pointer");
                l.push(document.querySelector("#" + e));
                a = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                m = $(a).insertBefore(b);
                m.attr("id", e + "_bg");
                m.addClass("shape-high-level", e + "_bg");
                m.addClass("svg-shape-bg-line", e + "_bg");
                m.css("cursor", "pointer");
                l.push(document.querySelector("#" + e + "_bg"));

                "touch" == AppConfig.clickType ? (b.on("touchstart", function(a) {
                    c(a);
                    v(a);
                    return !1
                }), m.on("touchstart", function(a) {
                    c(a);
                    v(a);
                    return !1
                })) : (b.on("mousedown", function(a) {
                    if (1 == a.which) return G(a), !1
                }), b.on("contextmenu", function(a) {
                    a.preventDefault();
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, n);
                    return !1
                }), m.on("mousedown", function(a) {
                    if (1 == a.which) return G(a), !1
                }), m.on("contextmenu", function(a) {
                    a.preventDefault();
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, n);
                    return !1
                }));
                b.on("click", function(a) {
                    clearTimeout(B);
                    a.preventDefault();
                    q();
                    return !1
                });
                m.on("click", function(a) {
                    clearTimeout(B);
                    a.preventDefault();
                    q();
                    return !1
                });
                $.each(f, function(a, d) {
                    b.attr(a, d);
                    m.attr(a, d)
                });
                m.attr("stroke-opacity", .01);
                m.attr("stroke-width", 6 * b.attr("stroke-width"));
                "dashed" == y && b.attr("stroke-dasharray",
                    3 * f["stroke-width"] + "px," + 4 * f["stroke-width"] + "px");
                $.each(d, function(a, d) {
                    b.attr(a, d);
                    m.attr(a, d)
                })
            }

            function E() {
                $(".svg-shape-shadow").remove();
                var a = document.createElementNS("http://www.w3.org/2000/svg", "polyline"),
                    c = $(a).insertBefore("#" + e + "_bg");
                c.attr("id", "shadow_" + e);
                c.addClass("svg-shape-shadow");
                $.each(f, function(a, b) { c.attr(a, b) });
                c.attr("stroke-opacity", 0);
                c.attr("points", b.attr("points"));
                c.attr("stroke-width", 3 * b.attr("stroke-width"));
                $.each(d, function(a, b) { c.attr(a, b) });
                $.each(k,
                    function(a, c) {
                        var p = document.createElementNS("http://www.w3.org/2000/svg", "polyline"),
                            k = $(p).insertBefore("#" + e);
                        k.addClass("svg-shape-shadow");
                        $.each(f, function(a, b) { k.attr(a, b) });
                        k.attr("stroke-opacity", 0);
                        k.attr("points", c.attr("points"));
                        k.attr("stroke-width", 3 * b.attr("stroke-width"));
                        $.each(d, function(a, b) {
                            k.attr(a, b)
                        })
                    })
            }

            function L(a) {
                a = a || window.event;
                if (null == a.pageX && null != a.clientX) {
                    var b = _canvasElement,
                        d = document.body;
                    a.pageX = a.clientX + (b && b.scrollLeft || d && d.scrollLeft || 0) - (b.clientLeft ||
                        0);
                    a.pageY = a.clientY + (b && b.scrollTop || d && d.scrollTop || 0) - (b.clientTop || 0)
                }!a.which && a.button && (a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0);
                return a
            }

            function x(a, b) {
                return b ? Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientY + document.body.scrollTop : a.pageY : Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientX + document.body.scrollTop : a.pageX
            }

            function G(d) {
                function c(d) {
                    if (!l) {
                        d.preventDefault();
                        d = L(d);
                        var c = x(d);
                        d = x(d, 1);
                        for (var f = 0; f < D.length; f++) D[f].split(","),
                            D[f].split(","), I[f].x += c - e, I[f].y += d - k, D[f] = I[f].x + "," + I[f].y;
                        e = c;
                        k = d;
                        b.attr("points", D.join(" "));
                        m.attr("points", D.join(" "));
                        u && w("start");
                        a && w("end");
                        E()
                    }
                }

                function f() {
                    l = 1;
                    q();
                    document.removeEventListener("mousemove", c);
                    document.removeEventListener("mouseup", f);
                    b.attr("points", D.join(" "));
                    m.attr("points", D.join(" "));
                    u && w("start");
                    a && w("end");
                    A = [];
                    for (var d = 0; d < D.length; d++) {
                        var I = +D[d].split(",")[0],
                            e = +D[d].split(",")[1],
                            I = +(I / K.width).toFixed(4) + "," + +(e / K.height).toFixed(4);
                        A.push(I)
                    }
                    if (h.onChanged) h.onChanged()
                }
                if (P) return !1;
                $(".context-menu").hide();
                d.preventDefault();
                d = L(d);
                n.focus();
                var e = x(d),
                    k = x(d, 1),
                    l = 0,
                    I = [];
                for (d = 0; d < D.length; d++) {
                    var p = +D[d].split(",")[0],
                        Z = +D[d].split(",")[1];
                    I.push({
                        x: p,
                        y: Z
                    })
                }
                document.addEventListener("mousemove", c, !1);
                document.addEventListener("mouseup", f, !1)
            }

            function v(d) {
                function c(d) {
                    clearTimeout(B);
                    if (!l) {
                        $(".context-menu").hide();
                        var c = d.touches[0].pageX - $("#" + t).offset().left;
                        d = d.touches[0].pageY - $("#" + t).offset().top;
                        for (var f = 0; f < D.length; f++) D[f].split(","), D[f].split(","),
                            I[f].x += c - e, I[f].y += d - k, D[f] = I[f].x + "," + I[f].y;
                        e = c;
                        k = d;
                        b.attr("points", D.join(" "));
                        m.attr("points", D.join(" "));
                        u && w("start");
                        a && w("end");
                        E()
                    }
                }

                function f() {
                    clearTimeout(B);
                    l = 1;
                    q();
                    document.removeEventListener("touchmove", c);
                    document.removeEventListener("touchend", f);
                    b.attr("points", D.join(" "));
                    m.attr("points", D.join(" "));
                    u && w("start");
                    a && w("end");
                    A = [];
                    for (var d = 0; d < D.length; d++) {
                        var I = +D[d].split(",")[0],
                            e = +D[d].split(",")[1],
                            I = +(I / K.width).toFixed(4) + "," + +(e / K.height).toFixed(4);
                        A.push(I)
                    }
                    if (h.onChanged) h.onChanged()
                }
                if (P) return !1;
                $(".context-menu").hide();
                d.preventDefault();
                n.focus();
                d = d.originalEvent;
                var e = d.changedTouches[0].pageX - $("#" + t).offset().left,
                    k = d.changedTouches[0].pageY - $("#" + t).offset().top,
                    l = 0,
                    I = [];
                for (d = 0; d < D.length; d++) {
                    var p = +D[d].split(",")[0],
                        Z = +D[d].split(",")[1];
                    I.push({
                        x: p,
                        y: Z
                    })
                }
                document.addEventListener("touchmove", c, !1);
                document.addEventListener("touchend", f, !1)
            }

            function c(a) {
                clearTimeout(B);
                B = setTimeout(function() {
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, n)
                }, 750)
            }
            var h =
                J || {},
                n = this,
                e = null,
                b = null,
                m = null,
                l = [],
                u = 0,
                a = 0,
                k = {},
                r = null,
                A = null,
                B = null,
                D = [],
                y = null,
                F = "n",
                t = null,
                f = {
                    stroke: null,
                    "stroke-width": null,
                    "stroke-linejoin": "round",
                    "stroke-opacity": .8
                },
                d = {
                    fill: "none",
                    "fill-opacity": .4,
                    "fill-rule": "nonzero"
                },
                U = !1,
                P = !1,
                K = _boardObj.getSize();
            n.create = function(d) {
                D = d.points || [];
                f.stroke = d.stroke_color;
                f["stroke-width"] = d.stroke_width;
                y = d.stroke_style;
                (F = d.arrow) || (F = "n");
                F = F[0];
                switch (F) {
                    case "n":
                        a = u = 0;
                        break;
                    case "e":
                        u = 0;
                        a = 1;
                        break;
                    case "s":
                        u = 1;
                        a = 0;
                        break;
                    case "b":
                        a = u = 1;
                        break;
                    default:
                        a = u = 0
                }
                r = 7 * f["stroke-width"];
                t = d.canvas_element_id;
                for (d = 1;;) {
                    if (!document.getElementById("svg_shape_pencil_" + d)) {
                        e = "svg_shape_pencil_" + d;
                        break
                    }
                    d++
                }
                C();
                b.attr("points", D.join(" "));
                m.attr("points", D.join(" "));
                u && w("start");
                a && w("end")
            };
            n.creating = function(d) {
                b.css("cursor", $("#" + t).css("cursor"));
                m.css("cursor", $("#" + t).css("cursor"));
                k.start && k.start.css("cursor", $("#" + t).css("cursor"));
                k.end && k.end.css("cursor", $("#" + t).css("cursor"));
                var c = d.left;
                d = d.top;
                var f = +(c / K.width).toFixed(4) + "," +
                    +(d / K.height).toFixed(4);
                A || (A = []);
                A.push(f);
                D.push(c + "," + d);
                b.attr("points", D.join(" "));
                m.attr("points", D.join(" "));
                u && w("start");
                a && w("end")
            };
            n.afterCreated = function(a) {
                b.css("cursor", "pointer");
                m.css("cursor", "pointer");
                k.start && k.start.css("cursor", "pointer");
                k.end && k.end.css("cursor", "pointer");
                setTimeout(q, 200)
            };
            n.draw = function(d) {
                if (!A) return document.getElementById(e) && b.remove(), document.getElementById(e + "_bg") && m.remove(), !1;
                document.getElementById(e) || C();
                D = [];
                $.each(A, function(a, b) {
                    var d =
                        b.split(",");
                    D.push(d[0] * K.width + "," + d[1] * K.height)
                });
                d && d.stroke_width && f["stroke-width"] != d.stroke_width && (f["stroke-width"] = d.stroke_width, b.attr("stroke-width", f["stroke-width"]), m.attr("stroke-width", 6 * f["stroke-width"]), r = 7 * f["stroke-width"], "dashed" == y && b.attr("stroke-dasharray", 3 * f["stroke-width"] + "px," + 4 * f["stroke-width"] + "px"));
                b.attr("points", D.join(" "));
                m.attr("points", D.join(" "));
                k = {};
                u && w("start");
                a && w("end")
            };
            n.show = function() {
                for (var a = 0; a < l.length; a++) l[a].style.visibility = "visible"
            };
            n.hide = function() {
                for (var a = 0; a < l.length; a++) l[a].style.visibility = "hidden"
            };
            n.focus = function() {
                q()
            };
            n.lockFocusing = function(a) {
                if (void 0 === a) return U;
                U = a;
                return U = !!U
            };
            n.lockChanging = function(a) {
                if (void 0 === a) return P;
                P = a;
                return P = !!P
            };
            n.getStoreInfo = function() {
                return A ? {
                    t: "pencil",
                    ppr: A,
                    ss: y,
                    a: F,
                    sc: f.stroke
                } : !1
            };
            n.restore = function(c) {
                A = c.points_positions_relations;
                if (!A) return !1;
                y = c.stroke_style;
                f.stroke = c.stroke_color;
                (F = c.arrow) || (F = "n");
                switch (F) {
                    case "n":
                        a = u = 0;
                        break;
                    case "e":
                        u = 0;
                        a = 1;
                        break;
                    case "s":
                        u =
                            1;
                        a = 0;
                        break;
                    case "b":
                        a = u = 1;
                        break;
                    default:
                        a = u = 0
                }
                $.each(f, function(a, d) {
                    b.attr(a, d);
                    m.attr(a, d)
                });
                m.attr("stroke-opacity", .01);
                m.attr("stroke-width", 6 * b.attr("stroke-width"));
                $.each(d, function(a, d) {
                    b.attr(a, d);
                    m.attr(a, d)
                });
                "dashed" == y && b.attr("stroke-dasharray", 3 * f["stroke-width"] + "px," + 4 * f["stroke-width"] + "px")
            };
            n.getId = function() {
                return e
            };
            n.remove = function() {
                b.remove();
                m.remove();
                $("#svg_shape_arrow_start_" + e).remove();
                $("#svg_shape_arrow_end_" + e).remove()
            };
            n.isValid = function() {
                return !D || 3 > D.length ?
                    !1 : !0
            }
        },
        Line: function(J) {
            function q() {
                if (W) return !1;
                var b = document.getElementById("shapes_2_section").lastElementChild;
                k.insertAfter($(b));
                r.insertBefore(k);
                $.each(y, function(b, d) { d.insertAfter($("#" + a)) });
                x();
                C();
                _pages[_currentPage].getShapesPainter().shapeKeyDownEvent(a)
            }

            function w(b) {
                var c = null;
                k.attr("points") && (c = k.attr("points").split(" "));
                if ("start" == b) {
                    var e = d.end.x;
                    var I = d.end.y;
                    c && 30 < c.length && (e = +c[5].split(",")[0], I = +c[5].split(",")[1]);
                    var l = d.start.y;
                    var z = d.start.x
                } else "end" == b &&
                    (e = d.start.x, I = d.start.y, c && 30 < c.length && (e = +c[c.length - 5].split(",")[0], I = +c[c.length - 5].split(",")[1]), l = d.end.y, z = d.end.x);
                var r = Math.sqrt(Math.pow(e - z, 2) + Math.pow(I - l, 2)) / F;
                if (0 == r) return !1;
                var c = z,
                    p = l;
                0 != r && (z = (z * (1 + r) - e) / r, l = (l * (1 + r) - I) / r);
                e = c;
                I = p;
                var r = c + F / 3 / Math.sqrt(1 + Math.pow((e - z) / (I - l), 2)),
                    t = p - F / 3 / Math.sqrt(1 + Math.pow((I - l) / (e - z), 2)),
                    v = c - F / 3 / Math.sqrt(1 + Math.pow((e - z) / (I - l), 2)),
                    g = p + F / 3 / Math.sqrt(1 + Math.pow((I - l) / (e - z), 2));
                if (0 > l - I && 0 < z - e || 0 < l - I && 0 > z - e) r = c + F / 3 / Math.sqrt(1 + Math.pow((e - z) /
                    (I - l), 2)), t = p + F / 3 / Math.sqrt(1 + Math.pow((I - l) / (e - z), 2)), v = c - F / 3 / Math.sqrt(1 + Math.pow((e - z) / (I - l), 2)), g = p - F / 3 / Math.sqrt(1 + Math.pow((I - l) / (e - z), 2));
                e = e + "," + I + " " + z + "," + l + " " + r + "," + t + " " + z + "," + l + " " + v + "," + g;
                if (!y[b]) {
                    I = "svg_shape_arrow_" + b + "_" + a;
                    $("#" + I).remove();
                    y[b] = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                    y[b] = $(y[b]).insertAfter("#" + a);
                    y[b].attr("id", I);
                    y[b].addClass("shape-arrow");
                    y[b].attr("stroke", k.attr("stroke"));
                    y[b].attr("stroke-width", k.attr("stroke-width"));
                    y[b].attr("fill",
                        k.attr("fill"));
                    y[b].attr("fill-rule", k.attr("fill-rule"));
                    y[b].attr("fill-opacity", k.attr("fill-opacity"));
                    y[b].css("cursor", "pointer");
                    A.push(document.querySelector("#" + I));
                    if ("touch" == AppConfig.clickType) y[b].on("touchstart", function(a) {
                        m(a);
                        n(a);
                        return !1
                    });
                    else y[b].on("mousedown", function(a) {
                        if (1 == a.which) return h(a), !1
                    }), y[b].on("contextmenu", function(a) {
                        a.preventDefault();
                        q();
                        _pages[_currentPage].getShapesPainter().shapeContextMenu(a, u);
                        return !1
                    });
                    y[b].on("click", function(a) {
                        clearTimeout(f);
                        a.preventDefault();
                        q();
                        return !1
                    })
                }
                y[b].attr("points", e)
            }

            function C() {
                $("[id^='svg_node_shape_']").remove();
                var c = 0 + Math.sqrt(Math.pow(d.start.x - d.im1.x, 2) + Math.pow(d.start.y - d.im1.y, 2)) + Math.sqrt(Math.pow(d.im1.x - d.im2.x, 2) + Math.pow(d.im1.y - d.im2.y, 2)) + Math.sqrt(Math.pow(d.im2.x - d.end.x, 2) + Math.pow(d.im2.y - d.end.y, 2)),
                    f = Math.ceil(_boardObj.getSize().width * ba);
                if (c < 12 * f) return !1;
                c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                c = y.start ? $(c).insertAfter(y.start) : $(c).insertAfter("#" +
                    a);
                c.attr("id", "svg_node_shape_line_start_" + a);
                c.attr("stroke", _boardObj.getColors().bgColor);
                c.attr("stroke-width", "1px");
                c.attr("fill", $("#" + a).attr("stroke"));
                c.attr("fill-rule", "nonzero");
                c.attr("fill-opacity", .8);
                c.attr("cx", d.start.x);
                c.attr("cy", d.start.y);
                c.attr("r", f + "px");
                c.css("cursor", "pointer");
                if ("touch" == AppConfig.clickType) c.on("touchstart", function(a) {
                    m(a);
                    b($(this), a, "start");
                    return !1
                });
                else c.on("mousedown", function(a) {
                    if (1 == a.which) return e($(this), a, "start"), !1
                }), c.on("contextmenu",
                    function(a) {
                        a.preventDefault();
                        q();
                        _pages[_currentPage].getShapesPainter().shapeContextMenu(a, u);
                        return !1
                    });
                c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                c = $(c).insertAfter("#" + a);
                c.attr("id", "svg_node_shape_line_im1_" + a);
                c.attr("stroke", _boardObj.getColors().bgColor);
                c.attr("stroke-width", "1px");
                c.attr("fill", $("#" + a).attr("stroke"));
                c.attr("fill-rule", "nonzero");
                c.attr("fill-opacity", .8);
                c.attr("cx", d.im1.x);
                c.attr("cy", d.im1.y);
                c.attr("r", f + "px");
                c.css("cursor", "pointer");
                if ("touch" ==
                    AppConfig.clickType) c.on("touchstart", function(a) {
                    m(a);
                    b($(this), a, "im1");
                    return !1
                });
                else c.on("mousedown", function(a) {
                    if (1 == a.which) return e($(this), a, "im1"), !1
                }), c.on("contextmenu", function(a) {
                    a.preventDefault();
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, u);
                    return !1
                });
                c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                c = $(c).insertAfter("#" + a);
                c.attr("id", "svg_node_shape_line_im2_" + a);
                c.attr("stroke", _boardObj.getColors().bgColor);
                c.attr("stroke-width", "1px");
                c.attr("fill", $("#" + a).attr("stroke"));
                c.attr("fill-rule", "nonzero");
                c.attr("fill-opacity", .8);
                c.attr("cx", d.im2.x);
                c.attr("cy", d.im2.y);
                c.attr("r", f + "px");
                c.css("cursor", "pointer");
                if ("touch" == AppConfig.clickType) c.on("touchstart", function(a) {
                    m(a);
                    b($(this), a, "im2");
                    return !1
                });
                else c.on("mousedown", function(a) {
                    if (1 == a.which) return e($(this), a, "im2"), !1
                }), c.on("contextmenu", function(a) {
                    a.preventDefault();
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, u);
                    return !1
                });
                c = document.createElementNS("http://www.w3.org/2000/svg",
                    "circle");
                c = y.end ? $(c).insertAfter(y.end) : $(c).insertAfter("#" + a);
                c.attr("id", "svg_node_shape_line_end_" + a);
                c.attr("stroke", _boardObj.getColors().bgColor);
                c.attr("stroke-width", "1px");
                c.attr("fill", $("#" + a).attr("stroke"));
                c.attr("fill-rule", "nonzero");
                c.attr("fill-opacity", .8);
                c.attr("cx", d.end.x);
                c.attr("cy", d.end.y);
                c.attr("r", f + "px");
                c.css("cursor", "pointer");
                if ("touch" == AppConfig.clickType) c.on("touchstart", function(a) {
                    m(a);
                    b($(this), a, "end");
                    return !1
                });
                else c.on("mousedown", function(a) {
                    if (1 ==
                        a.which) return e($(this), a, "end"), !1
                }), c.on("contextmenu", function(a) {
                    a.preventDefault();
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, u);
                    return !1
                })
            }

            function E() {
                var b = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                k = $(b).appendTo("#shapes_2_section");
                k.attr("id", a);
                k.addClass("shape-high-level", a);
                k.css("cursor", "pointer");
                A.push(document.querySelector("#" + a));
                b = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                r = $(b).insertBefore(k);
                r.attr("id", a + "_bg");
                r.addClass("shape-high-level", a + "_bg");
                r.addClass("svg-shape-bg-line", a + "_bg");
                r.css("cursor", "pointer");
                A.push(document.querySelector("#" + a + "_bg"));
                "touch" == AppConfig.clickType ? (k.on("touchstart", function(a) {
                    m(a);
                    n(a);
                    return !1
                }), r.on("touchstart", function(a) {
                    m(a);
                    n(a);
                    return !1
                })) : (k.on("mousedown", function(a) {
                    if (1 == a.which) return h(a), !1
                }), k.on("contextmenu", function(a) {
                    a.preventDefault();
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, u);
                    return !1
                }), r.on("mousedown", function(a) {
                    if (1 ==
                        a.which) return h(a), !1
                }), r.on("contextmenu", function(a) {
                    a.preventDefault();
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, u);
                    return !1
                }));
                k.on("click", function(a) {
                    clearTimeout(f);
                    a.preventDefault();
                    q();
                    return !1
                });
                r.on("click", function(a) {
                    clearTimeout(f);
                    a.preventDefault();
                    q();
                    return !1
                });
                $.each(p, function(a, b) {
                    k.attr(a, b);
                    r.attr(a, b)
                });
                r.attr("stroke-opacity", .01);
                r.attr("stroke-width", 6 * k.attr("stroke-width"));
                "dashed" == U && k.attr("stroke-dasharray", 3 * p["stroke-width"] + "px," + 4 * p["stroke-width"] +
                    "px");
                $.each(ca, function(a, b) {
                    k.attr(a, b);
                    r.attr(a, b)
                })
            }

            function L() {
                d.im1 || (d.im1 = {}, d.im1.x = d.start.x + (d.end.x - d.start.x) / 3, d.im1.y = d.start.y + (d.end.y - d.start.y) / 3, d.im2 = {}, d.im2.x = d.start.x + (d.end.x - d.start.x) / 3 * 2, d.im2.y = d.start.y + (d.end.y - d.start.y) / 3 * 2);
                var a = [];
                a.push({x: d.start.x, y: d.start.y});
                a.push({x: d.im1.x, y: d.im1.y});
                a.push({x: d.im2.x, y: d.im2.y});
                a.push({x: d.end.x, y: d.end.y});
                a = v(a);
                k.attr("points", a);
                r.attr("points", a);
                B && w("start");
                D && w("end");
                t = [];
                a = +(d.start.x / z.width).toFixed(4) + "," + +(d.start.y / z.height).toFixed(4);
                t.push(a);
                a = +(d.im1.x / z.width).toFixed(4) + "," + +(d.im1.y / z.height).toFixed(4);
                t.push(a);
                a = +(d.im2.x / z.width).toFixed(4) + "," + +(d.im2.y / z.height).toFixed(4);
                t.push(a);
                a = +(d.end.x / z.width).toFixed(4) + "," + +(d.end.y / z.height).toFixed(4);
                t.push(a)
            }

            function x() {
                $(".svg-shape-shadow").remove();
                var b = document.createElementNS("http://www.w3.org/2000/svg", "polyline"),
                    c = $(b).insertBefore("#" + a + "_bg");
                c.attr("id", "shadow_" + a);
                c.addClass("svg-shape-shadow");
                $.each(p, function(a, b) { c.attr(a, b) });
                c.attr("stroke-opacity", 0);
                c.attr("points", k.attr("points"));
                c.attr("stroke-width", 3 * k.attr("stroke-width"));
                $.each(ca, function(a, b) { c.attr(a, b) });
                $.each(y, function(b, c) {
                    var d = document.createElementNS("http://www.w3.org/2000/svg", "polyline"),
                        f = $(d).insertBefore("#" + a);
                    f.addClass("svg-shape-shadow");
                    $.each(p, function(a, b) {
                        f.attr(a, b)
                    });
                    f.attr("stroke-opacity", 0);
                    f.attr("points", c.attr("points"));
                    f.attr("stroke-width", 3 * k.attr("stroke-width"));
                    $.each(ca, function(a, b) {
                        f.attr(a, b)
                    })
                })
            }

            function G(a) {
                a = a || window.event;
                if (null == a.pageX && null != a.clientX) {
                    var b = _canvasElement,
                        c = document.body;
                    a.pageX = a.clientX + (b && b.scrollLeft || c && c.scrollLeft || 0) - (b.clientLeft || 0);
                    a.pageY = a.clientY + (b && b.scrollTop || c && c.scrollTop || 0) - (b.clientTop || 0)
                }!a.which && a.button && (a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0);
                return a
            }

            function v(a) {
                if (2 == a.length) {
                    var b = a[0],
                        c = a[1],
                        d = {
                            x: b.x + (c.x - b.x) / 3,
                            y: b.y + (c.y - b.y) / 3
                        },
                        f = {
                            x: b.x + (c.x - b.x) / 3 * 2,
                            y: b.y + (c.y - b.y) / 3 * 2
                        };
                    a = [];
                    a.push(b);
                    a.push(d);
                    a.push(f);
                    a.push(c)
                }
                var b = [],
                    c = a.length,
                    d = a.concat();
                d.unshift(a[0]);
                d.push(a[c - 1]);
                for (var e = 1; e < c; e++) {
                    var k = d[e].x;
                    var l = d[e].y;
                    var h = d[e + 1].x;
                    var I = d[e + 1].y;
                    a = .5 * (h - d[e - 1].x);
                    f = .5 * (d[e + 2].x - k);
                    var g = .5 * (I - d[e - 1].y);
                    var z = .5 * (d[e + 2].y - l);
                    for (var r = 0; 50 >= r; r++) {
                        var m = r / 50;
                        var p = Math.pow(m, 2);
                        var n = p * m;
                        var t = 3 * p;
                        var u = 2 * n;
                        var v = u - t + 1;
                        u = t - u;
                        m = n - 2 * p + m;
                        n -= p;
                        b.push("" + (v * k + u * h + m * a + n * f) + "," + (v * l + u * I + m * g + n * z) + "")
                    }
                }
                return b.join(" ")
            }

            function c(a, b) {
                return b ? Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientY +
                    document.body.scrollTop : a.pageY : Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientX + document.body.scrollTop : a.pageX
            }

            function h(a) {
                function b(a) {
                    if (!h) {
                        $("[id^='svg_node_shape_']").remove();
                        a.preventDefault();
                        a = G(a);
                        var b = c(a);
                        a = c(a, 1);
                        d.start.x += b - e;
                        d.start.y += a - k;
                        d.end.x += b - e;
                        d.end.y += a - k;
                        d.im1 && (d.im1.x += b - e, d.im1.y += a - k, d.im2.x += b - e, d.im2.y += a - k);
                        e = b;
                        k = a;
                        L();
                        x()
                    }
                }

                function f() {
                    h = 1;
                    L();
                    q();
                    document.removeEventListener("mousemove", b);
                    document.removeEventListener("mouseup", f);
                    if (l.onChanged) l.onChanged()
                }
                if (T) return !1;
                $(".context-menu").hide();
                a.preventDefault();
                a = G(a);
                u.focus();
                var e = c(a),
                    k = c(a, 1),
                    h = 0;
                document.addEventListener("mousemove", b, !1);
                document.addEventListener("mouseup", f, !1)
            }

            function n(a) {
                function b(a) {
                    clearTimeout(f);
                    if (!h) {
                        $(".context-menu").hide();
                        $("[id^='svg_node_shape_']").remove();
                        var b = a.touches[0].pageX - $("#" + K).offset().left;
                        a = a.touches[0].pageY - $("#" + K).offset().top;
                        d.start.x += b - e;
                        d.start.y += a - k;
                        d.end.x += b - e;
                        d.end.y += a - k;
                        d.im1 && (d.im1.x += b - e,
                            d.im1.y += a - k, d.im2.x += b - e, d.im2.y += a - k);
                        e = b;
                        k = a;
                        L();
                        x()
                    }
                }

                function c() {
                    clearTimeout(f);
                    h = 1;
                    L();
                    q();
                    document.removeEventListener("touchmove", b);
                    document.removeEventListener("touchend", c);
                    if (l.onChanged) l.onChanged()
                }
                if (T) return !1;
                $(".context-menu").hide();
                a.preventDefault();
                u.focus();
                a = a.originalEvent;
                var e = a.changedTouches[0].pageX - $("#" + K).offset().left,
                    k = a.changedTouches[0].pageY - $("#" + K).offset().top,
                    h = 0;
                document.addEventListener("touchmove", b, !1);
                document.addEventListener("touchend", c, !1)
            }

            function e(a, b, f) {
                function e(b) {
                    if (!n) {
                        b.preventDefault();
                        b = G(b);
                        var e = c(b, 1) + z - r;
                        b = c(b) + I - m;
                        b < h && (b = h);
                        b > $("#" + K).width() - h && (b = $("#" + K).width() - h);
                        e < 7 * h && (e = 7 * h);
                        e > $("#" + K).height() - 7 * h && (e = $("#" + K).height() - 7 * h);
                        g = b + "px";
                        p = e + "px";
                        a.attr("cx", g);
                        a.attr("cy", p);
                        d[f].x = b;
                        d[f].y = e;
                        L();
                        x()
                    }
                }

                function k() {
                    n = 1;
                    L();
                    q();
                    document.removeEventListener("mousemove", e);
                    document.removeEventListener("mouseup", k);
                    if (l.onChanged) l.onChanged()
                }
                if (T) return !1;
                $(".context-menu").hide();
                b.preventDefault();
                b = G(b);
                var h = parseInt($(a).attr("r")),
                    I = parseInt(a.attr("cx")),
                    z = parseInt(a.attr("cy")),
                    m = c(b),
                    r = c(b, 1),
                    g, p, n = 0;
                document.addEventListener("mousemove", e, !1);
                document.addEventListener("mouseup", k, !1)
            }

            function b(a, b, c) {
                function e(b) {
                    clearTimeout(f);
                    if (!n) {
                        $(".context-menu").hide();
                        var e = b.touches[0].pageX - $("#" + K).offset().left + z - m;
                        b = b.touches[0].pageY - $("#" + K).offset().top + I - r;
                        e < -h && (e = -h);
                        e > $("#" + K).width() - 2 * h && (e = $("#" + K).width() - 2 * h);
                        b < 2 * h && (b = 2 * h);
                        b > $("#" + K).height() - 6 * h && (b = $("#" + K).height() - 6 * h);
                        g = e + "px";
                        p = b + "px";
                        a.attr("cx", g);
                        a.attr("cy", p);
                        d[c].x = e;
                        d[c].y = b;
                        L();
                        x()
                    }
                }

                function k() {
                    clearTimeout(f);
                    n = 1;
                    L();
                    q();
                    document.removeEventListener("touchmove", e);
                    document.removeEventListener("touchend", k);
                    if (l.onChanged) l.onChanged()
                }
                if (T) return !1;
                $(".context-menu").hide();
                b.preventDefault();
                var h = parseInt($(a).attr("r"));
                b = b.originalEvent;
                var z = parseInt(a.attr("cx")),
                    I = parseInt(a.attr("cy")),
                    m = b.changedTouches[0].pageX - $("#" + K).offset().left,
                    r = b.changedTouches[0].pageY - $("#" + K).offset().top,
                    g, p, n = 0;
                document.addEventListener("touchmove",
                    e, !1);
                document.addEventListener("touchend", k, !1)
            }

            function m(a) {
                clearTimeout(f);
                f = setTimeout(function() {
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, u)
                }, 750)
            }
            var l = J || {},
                u = this,
                a = null,
                k = null,
                r = null,
                A = [],
                B = 0,
                D = 0,
                y = {},
                F = null,
                t = null,
                f = null,
                d = {
                    start: null,
                    im1: null,
                    im2: null,
                    end: null
                },
                U = null,
                P = "n",
                K = null,
                p = {
                    stroke: null,
                    "stroke-width": null,
                    "stroke-linejoin": "round",
                    "stroke-opacity": .8
                },
                ca = {
                    fill: "none",
                    "fill-opacity": .4,
                    "fill-rule": "nonzero"
                },
                ba = .0061096;
            "touch" == AppConfig.clickType && (ba = .0104736);
            var W = !1,
                T = !1,
                z = _boardObj.getSize();
            u.create = function(b) {
                void 0 !== b.left && (d.start = {}, d.start.x = b.left, d.start.y = b.top, d.end = {}, d.end.x = b.left, d.end.y = b.top);
                p.stroke = b.stroke_color;
                p["stroke-width"] = b.stroke_width;
                U = b.stroke_style;
                (P = b.arrow) || (P = "n");
                P = P[0];
                switch (P) {
                    case "n":
                        D = B = 0;
                        break;
                    case "e":
                        B = 0;
                        D = 1;
                        break;
                    case "s":
                        B = 1;
                        D = 0;
                        break;
                    case "b":
                        D = B = 1;
                        break;
                    default:
                        D = B = 0
                }
                F = 7 * p["stroke-width"];
                K = b.canvas_element_id;
                for (b = 1;;) {
                    if (!document.getElementById("svg_shape_line_" + b)) {
                        a = "svg_shape_line_" + b;
                        break
                    }
                    b++
                }
                E()
            };
            u.creating = function(a) {
                k.css("cursor", $("#" + K).css("cursor"));
                r.css("cursor", $("#" + K).css("cursor"));
                y.start && y.start.css("cursor", $("#" + K).css("cursor"));
                y.end && y.end.css("cursor", $("#" + K).css("cursor"));
                d.end.x = a.left;
                d.end.y = a.top;
                a = [];
                a.push({
                    x: d.start.x,
                    y: d.start.y
                });
                a.push({
                    x: d.end.x,
                    y: d.end.y
                });
                a = v(a);
                k.attr("points", a);
                r.attr("points", a);
                B && w("start");
                D && w("end");
                t = [];
                a = +(d.start.x / z.width).toFixed(4) + "," + +d.start.y.toFixed(4);
                t.push(a);
                a = +(d.end.x / z.width).toFixed(4) + "," + +(d.end.y / z.height).toFixed(4);
                t.push(a)
            };
            u.afterCreated = function(a) {
                k.css("cursor", "pointer");
                r.css("cursor", "pointer");
                y.start && y.start.css("cursor", "pointer");
                y.end && y.end.css("cursor", "pointer");
                L();
                setTimeout(q, 200)
            };
            u.draw = function(b) {
                if (!t) return document.getElementById(a) && k.remove(), document.getElementById(a + "_bg") && r.remove(), !1;
                document.getElementById(a) || E();
                var c = t[0].split(","),
                    f = t[t.length - 1].split(",");
                d.start = {};
                d.start.x = c[0] * z.width;
                d.start.y = c[1] * z.height;
                d.end = {};
                d.end.x = f[0] * z.width;
                d.end.y = f[1] * z.height;
                4 == t.length && (c = t[1].split(","), d.im1 = {}, d.im1.x = c[0] * z.width, d.im1.y = c[1] * z.height, c = t[2].split(","), d.im2 = {}, d.im2.x = c[0] * z.width, d.im2.y = c[1] * z.height);
                b && b.stroke_width && p["stroke-width"] != b.stroke_width && (p["stroke-width"] = b.stroke_width, k.attr("stroke-width", p["stroke-width"]), r.attr("stroke-width", 6 * p["stroke-width"]), F = 7 * p["stroke-width"], "dashed" == U && k.attr("stroke-dasharray", 3 * p["stroke-width"] + "px," + 4 * p["stroke-width"] + "px"));
                $(".svg-shape-shadow").remove();
                y = {};
                L()
            };
            u.focus = function() {
                q()
            };
            u.lockFocusing = function(a) {
                if (void 0 === a) return W;
                W = a;
                return W = !!W
            };
            u.lockChanging = function(a) {
                if (void 0 === a) return T;
                T = a;
                return T = !!T
            };
            u.show = function() {
                for (var a = 0; a < A.length; a++) A[a].style.visibility = "visible"
            };
            u.hide = function() {
                for (var a = 0; a < A.length; a++) A[a].style.visibility = "hidden"
            };
            u.getStoreInfo = function() {
                return t ? {
                    t: "line",
                    ppr: t,
                    ss: U,
                    a: P,
                    sc: p.stroke
                } : !1
            };
            u.restore = function(a) {
                t = a.points_positions_relations;
                if (!t) return !1;
                U = a.stroke_style;
                p.stroke = a.stroke_color;
                (P = a.arrow) || (P = "n");
                switch (P) {
                    case "n":
                        D =
                            B = 0;
                        break;
                    case "e":
                        B = 0;
                        D = 1;
                        break;
                    case "s":
                        B = 1;
                        D = 0;
                        break;
                    case "b":
                        D = B = 1;
                        break;
                    default:
                        D = B = 0
                }
                $.each(p, function(a, b) {
                    k.attr(a, b);
                    r.attr(a, b)
                });
                r.attr("stroke-opacity", .01);
                r.attr("stroke-width", 6 * k.attr("stroke-width"));
                $.each(ca, function(a, b) {
                    k.attr(a, b);
                    r.attr(a, b)
                });
                "dashed" == U && k.attr("stroke-dasharray", 3 * p["stroke-width"] + "px," + 4 * p["stroke-width"] + "px")
            };
            u.getId = function() {
                return a
            };
            u.remove = function() {
                k.remove();
                r.remove();
                $("#svg_shape_arrow_start_" + a).remove();
                $("#svg_shape_arrow_end_" + a).remove()
            };
            u.isValid = function() {
                return !k || !d.start || !d.end || !d.im1 && !d.im2 && Math.sqrt(Math.pow(d.start.x - d.end.x, 2) + Math.pow(d.start.y - d.end.y, 2)) < .008 * z.width ? !1 : !0
            }
        },
        CurveLine: function(J) {
            function q() {
                if (ba) return !1;
                var a = document.getElementById("shapes_2_section").lastElementChild;
                l.insertAfter($(a));
                u.insertBefore(l);
                $.each(y, function(a, b) {
                    b.insertAfter($("#" + m))
                });
                L();
                _pages[_currentPage].getShapesPainter().shapeKeyDownEvent(m)
            }

            function w(e) {
                if ("start" == e) {
                    var k = d.end.x;
                    var r = d.end.y;
                    var z = d.start.y;
                    var p =
                        d.start.x
                } else "end" == e && (k = d.start.x, r = d.start.y, z = d.end.y, p = d.end.x);
                var t = Math.sqrt(Math.pow(k - p, 2) + Math.pow(r - z, 2)) / F;
                if (0 == t) return !1;
                var u = p,
                    v = z;
                0 != t && (p = (p * (1 + t) - k) / t, z = (z * (1 + t) - r) / t);
                k = u;
                r = v;
                var t = u + F / 3 / Math.sqrt(1 + Math.pow((k - p) / (r - z), 2)),
                    A = v - F / 3 / Math.sqrt(1 + Math.pow((r - z) / (k - p), 2)),
                    w = u - F / 3 / Math.sqrt(1 + Math.pow((k - p) / (r - z), 2)),
                    K = v + F / 3 / Math.sqrt(1 + Math.pow((r - z) / (k - p), 2));
                if (0 > z - r && 0 < p - k || 0 < z - r && 0 > p - k) t = u + F / 3 / Math.sqrt(1 + Math.pow((k - p) / (r - z), 2)), A = v + F / 3 / Math.sqrt(1 + Math.pow((r - z) / (k - p), 2)),
                    w = u - F / 3 / Math.sqrt(1 + Math.pow((k - p) / (r - z), 2)), K = v - F / 3 / Math.sqrt(1 + Math.pow((r - z) / (k - p), 2));
                k = k + "," + r + " " + p + "," + z + " " + t + "," + A + " " + p + "," + z + " " + w + "," + K;
                if (!y[e]) {
                    r = "svg_shape_arrow_" + e + "_" + m;
                    $("#" + r).remove();
                    y[e] = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                    y[e] = $(y[e]).insertAfter("#" + m);
                    y[e].attr("id", r);
                    y[e].addClass("svg-shape-arrow");
                    y[e].attr("stroke", l.attr("stroke"));
                    y[e].attr("stroke-width", l.attr("stroke-width"));
                    y[e].attr("fill", l.attr("fill"));
                    y[e].attr("fill-rule", l.attr("fill-rule"));
                    y[e].attr("fill-opacity", l.attr("fill-opacity"));
                    y[e].css("cursor", "pointer");
                    a.push(document.querySelector("#" + r));
                    if ("touch" == AppConfig.clickType) y[e].on("touchstart", function(a) {
                        n(a);
                        h(a);
                        return !1
                    });
                    else y[e].on("mousedown", function(a) {
                        if (1 == a.which) return c(a), !1
                    }), y[e].on("contextmenu", function(a) {
                        a.preventDefault();
                        q();
                        _pages[_currentPage].getShapesPainter().shapeContextMenu(a, b);
                        return !1
                    });
                    y[e].on("click", function(a) {
                        clearTimeout(f);
                        a.preventDefault();
                        q();
                        return !1
                    })
                }
                y[e].attr("points", k)
            }

            function C() {
                var d =
                    document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                l = $(d).appendTo("#shapes_2_section");
                l.attr("id", m);
                l.addClass("shape-high-level", m);
                l.css("cursor", "pointer");
                a.push(document.querySelector("#" + m));
                d = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                u = $(d).insertBefore(l);
                u.attr("id", m + "_bg");
                u.addClass("shape-high-level", m + "_bg");
                u.addClass("svg-shape-bg-line", m + "_bg");
                u.css("cursor", "pointer");
                a.push(document.querySelector("#" + m + "_bg"));
                "touch" == AppConfig.clickType ?
                    (l.on("touchstart", function(a) {
                        n(a);
                        h(a);
                        return !1
                    }), u.on("touchstart", function(a) {
                        n(a);
                        h(a);
                        return !1
                    })) : (l.on("mousedown", function(a) {
                        if (1 == a.which) return c(a), !1
                    }), l.on("contextmenu", function(a) {
                        a.preventDefault();
                        q();
                        _pages[_currentPage].getShapesPainter().shapeContextMenu(a, b);
                        return !1
                    }), u.on("mousedown", function(a) {
                        if (1 == a.which) return c(a), !1
                    }), u.on("contextmenu", function(a) {
                        a.preventDefault();
                        q();
                        _pages[_currentPage].getShapesPainter().shapeContextMenu(a, b);
                        return !1
                    }));
                l.on("click", function(a) {
                    clearTimeout(f);
                    a.preventDefault();
                    q();
                    return !1
                });
                u.on("click", function(a) {
                    clearTimeout(f);
                    a.preventDefault();
                    q();
                    return !1
                });
                $.each(p, function(a, b) {
                    l.attr(a, b);
                    u.attr(a, b)
                });
                u.attr("stroke-opacity", .01);
                u.attr("stroke-width", 6 * l.attr("stroke-width"));
                "dashed" == U && l.attr("stroke-dasharray", 3 * p["stroke-width"] + "px," + 4 * p["stroke-width"] + "px");
                $.each(ca, function(a, b) {
                    l.attr(a, b);
                    u.attr(a, b)
                })
            }

            function E() {
                var a = [];
                a.push({
                    x: d.end.x,
                    y: d.end.y
                });
                a.push({
                    x: d.start.x,
                    y: d.start.y
                });
                a = G(a);
                l.attr("points", a);
                u.attr("points",
                    a);
                B && w("start");
                D && w("end");
                t = [];
                a = +(d.start.x / T.width).toFixed(4) + "," + +(d.start.y / T.height).toFixed(4);
                t.push(a);
                a = +(d.end.x / T.width).toFixed(4) + "," + +(d.end.y / T.height).toFixed(4);
                t.push(a)
            }

            function L() {
                $(".svg-shape-shadow").remove();
                var a = document.createElementNS("http://www.w3.org/2000/svg", "polyline"),
                    b = $(a).insertBefore("#" + m + "_bg");
                b.attr("id", "shadow_" + m);
                b.addClass("svg-shape-shadow");
                $.each(p, function(a, c) { b.attr(a, c) });
                b.attr("stroke-opacity", 0);
                b.attr("points", l.attr("points"));
                b.attr("stroke-width", 3 * l.attr("stroke-width"));
                $.each(ca, function(a, c) { b.attr(a, c) });
                $.each(y, function(a, b) {
                    var c = document.createElementNS("http://www.w3.org/2000/svg", "polyline"),
                        d = $(c).insertBefore("#" + m);
                    d.addClass("svg-shape-shadow");
                    $.each(p, function(a, b) { d.attr(a, b) });
                    d.attr("stroke-opacity", 0);
                    d.attr("points", b.attr("points"));
                    d.attr("stroke-width", 3 * l.attr("stroke-width"));
                    $.each(ca, function(a, b) { d.attr(a, b) })
                })
            }

            function x(a) {
                a = a || window.event;
                if (null == a.pageX && null != a.clientX) {
                    var b = _canvasElement,
                        c = document.body;
                    a.pageX = a.clientX + (b && b.scrollLeft || c && c.scrollLeft || 0) - (b.clientLeft || 0);
                    a.pageY = a.clientY + (b && b.scrollTop || c && c.scrollTop || 0) - (b.clientTop || 0)
                }!a.which && a.button && (a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0);
                return a
            }

            function G(a) {
                var b = [],
                    c = a[0].x,
                    d = a[0].y,
                    f = a[1].x;
                a = a[1].y;
                for (var e = Math.sqrt(Math.pow(f - c, 2) + Math.pow(a - d, 2)), h = Math.abs(f - c) / e, l = Math.sqrt(1 - Math.pow(h, 2)), p = -k; p <= e - k; p++) {
                    var m = 0 > p ? 0 : Math.sin(p / r) * A;
                    if (f >= c && a >= d) {
                        var n = p * h - m * l;
                        var g = p * l + m * h;
                        n += k * h;
                        g += k * l
                    } else f < c && a >= d ?
                        (n = -p * h - m * l, g = p * l - m * h, n -= k * h, g += k * l) : f >= c && a < d ? (n = p * h + m * l, g = -p * l + m * h, n += k * h, g -= k * l) : f < c && a < d && (n = -p * h + m * l, g = -p * l - m * h, n -= k * h, g -= k * l);
                    n += c;
                    g += d;
                    b.push(n + "," + g)
                }
                return b.join(" ")
            }

            function v(a, b) {
                return b ? Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientY + document.body.scrollTop : a.pageY : Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientX + document.body.scrollTop : a.pageX
            }

            function c(a) {
                function c(a) {
                    if (!l) {
                        $('[id^="svg_node_shape_"]').remove();
                        a.preventDefault();
                        a = x(a);
                        var b = v(a);
                        a = v(a, 1);
                        d.start.x += b - k;
                        d.start.y += a - h;
                        d.end.x += b - k;
                        d.end.y += a - h;
                        k = b;
                        h = a;
                        E();
                        L()
                    }
                }

                function f() {
                    l = 1;
                    E();
                    q();
                    document.removeEventListener("mousemove", c);
                    document.removeEventListener("mouseup", f);
                    if (e.onChanged) e.onChanged()
                }
                if (W) return !1;
                $(".context-menu").hide();
                a.preventDefault();
                a = x(a);
                b.focus();
                var k = v(a),
                    h = v(a, 1),
                    l = 0;
                document.addEventListener("mousemove", c, !1);
                document.addEventListener("mouseup", f, !1)
            }

            function h(a) {
                function c(a) {
                    clearTimeout(f);
                    if (!p) {
                        $(".context-menu").hide();
                        $('[id^="svg_node_shape_"]').remove();
                        var b = a.touches[0].pageX - $("#" + K).offset().left;
                        a = a.touches[0].pageY - $("#" + K).offset().top;
                        d.start.x += b - h;
                        d.start.y += a - l;
                        d.end.x += b - h;
                        d.end.y += a - l;
                        h = b;
                        l = a;
                        E();
                        L()
                    }
                }

                function k() {
                    clearTimeout(f);
                    p = 1;
                    E();
                    q();
                    document.removeEventListener("touchmove", c);
                    document.removeEventListener("touchend", k);
                    if (e.onChanged) e.onChanged()
                }
                if (W) return !1;
                $(".context-menu").hide();
                a.preventDefault();
                b.focus();
                a = a.originalEvent;
                var h = a.changedTouches[0].pageX - $("#" + K).offset().left,
                    l = a.changedTouches[0].pageY - $("#" + K).offset().top,
                    p = 0;
                document.addEventListener("touchmove", c, !1);
                document.addEventListener("touchend", k, !1)
            }

            function n(a) {
                clearTimeout(f);
                f = setTimeout(function() {
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, b)
                }, 750)
            }
            var e = J || {},
                b = this,
                m = null,
                l = null,
                u = null,
                a = [],
                k = null,
                r = null,
                A = null,
                B = 0,
                D = 0,
                y = {},
                F = null,
                t = null,
                f = null,
                d = {
                    start: null,
                    end: null
                },
                U = null,
                P = "n",
                K = null,
                p = {
                    stroke: null,
                    "stroke-width": null,
                    "stroke-linejoin": "round",
                    "stroke-opacity": .8
                },
                ca = {
                    fill: "none",
                    "fill-opacity": .4,
                    "fill-rule": "nonzero"
                },
                ba = !1,
                W = !1,
                T = _boardObj.getSize();
            b.create = function(a) {
                void 0 !== a.left && (d.start = {}, d.start.x = a.left, d.start.y = a.top, d.end = {}, d.end.x = a.left, d.end.y = a.top);
                p.stroke = a.stroke_color;
                p["stroke-width"] = a.stroke_width;
                U = a.stroke_style;
                (P = a.arrow) || (P = "n");
                P = P[0];
                switch (P) {
                    case "n":
                        D = B = 0;
                        break;
                    case "e":
                        B = 0;
                        D = 1;
                        break;
                    case "s":
                        B = 1;
                        D = 0;
                        break;
                    case "b":
                        D = B = 1;
                        break;
                    default:
                        D = B = 0
                }
                F = 7 * p["stroke-width"];
                k = 0 * p["stroke-width"];
                r = 3.3333 * p["stroke-width"];
                A = 3.3333 * p["stroke-width"];
                K = a.canvas_element_id;
                for (a = 1;;) {
                    if (!document.getElementById("svg_shape_curve_line_" + a)) {
                        m = "svg_shape_curve_line_" + a;
                        break
                    }
                    a++
                }
                C()
            };
            b.creating = function(a) {
                l.css("cursor", $("#" + K).css("cursor"));
                u.css("cursor", $("#" + K).css("cursor"));
                y.start && y.start.css("cursor", $("#" + K).css("cursor"));
                y.end && y.end.css("cursor", $("#" + K).css("cursor"));
                d.end.x = a.left;
                d.end.y = a.top;
                a = [];
                a.push({
                    x: d.end.x,
                    y: d.end.y
                });
                a.push({
                    x: d.start.x,
                    y: d.start.y
                });
                a = G(a);
                l.attr("points", a);
                u.attr("points", a);
                B && w("start");
                D && w("end");
                t = [];
                a = +(d.start.x / T.width).toFixed(4) + "," + +d.start.y.toFixed(4);
                t.push(a);
                a = +(d.end.x / T.width).toFixed(4) + "," + +(d.end.y / T.height).toFixed(4);
                t.push(a)
            };
            b.afterCreated = function(a) {
                l.css("cursor", "pointer");
                u.css("cursor", "pointer");
                y.start && y.start.css("cursor", "pointer");
                y.end && y.end.css("cursor", "pointer");
                E();
                setTimeout(q, 200)
            };
            b.draw = function(a) {
                if (!t) return document.getElementById(m) && l.remove(), document.getElementById(m + "_bg") && u.remove(), !1;
                document.getElementById(m) || C();
                var b = t[0].split(","),
                    c = t[t.length - 1].split(",");
                d.start = {};
                d.start.x = b[0] * T.width;
                d.start.y = b[1] * T.height;
                d.end = {};
                d.end.x = c[0] * T.width;
                d.end.y = c[1] * T.height;
                a && a.stroke_width && p["stroke-width"] != a.stroke_width && (p["stroke-width"] = a.stroke_width, k = 0 * p["stroke-width"], r = 3.3333 * p["stroke-width"], A = 3.3333 * p["stroke-width"], l.attr("stroke-width", p["stroke-width"]), u.attr("stroke-width", 6 * p["stroke-width"]), F = 7 * p["stroke-width"], "dashed" == U && l.attr("stroke-dasharray", 3 * p["stroke-width"] + "px," + 4 * p["stroke-width"] + "px"));
                $(".svg-shape-shadow").remove();
                y = {};
                E()
            };
            b.show = function() {
                for (var b = 0; b < a.length; b++) a[b].style.visibility = "visible"
            };
            b.hide = function() {
                for (var b = 0; b < a.length; b++) a[b].style.visibility = "hidden"
            };
            b.focus = function() {
                q()
            };
            b.lockFocusing = function(a) {
                if (void 0 === a) return ba;
                ba = a;
                return ba = !!ba
            };
            b.lockChanging = function(a) {
                if (void 0 === a) return W;
                W = a;
                return W = !!W
            };
            b.getStoreInfo = function() {
                return t ? {
                    t: "curve-line",
                    ppr: t,
                    ss: U,
                    a: P,
                    sc: p.stroke
                } : !1
            };
            b.restore = function(a) {
                t = a.points_positions_relations;
                if (!t) return !1;
                U = a.stroke_style;
                p.stroke =
                    a.stroke_color;
                (P = a.arrow) || (P = "n");
                switch (P) {
                    case "n":
                        D = B = 0;
                        break;
                    case "e":
                        B = 0;
                        D = 1;
                        break;
                    case "s":
                        B = 1;
                        D = 0;
                        break;
                    case "b":
                        D = B = 1;
                        break;
                    default:
                        D = B = 0
                }
                $.each(p, function(a, b) {
                    l.attr(a, b);
                    u.attr(a, b)
                });
                u.attr("stroke-opacity", .01);
                u.attr("stroke-width", 6 * l.attr("stroke-width"));
                "dashed" == U && l.attr("stroke-dasharray", 3 * p["stroke-width"] + "px," + 4 * p["stroke-width"] + "px")
            };
            b.getId = function() {
                return m
            };
            b.remove = function() {
                l.remove();
                u.remove();
                $("#svg_shape_arrow_start_" + m).remove();
                $("#svg_shape_arrow_end_" +
                    m).remove()
            };
            b.isValid = function() {
                return !l || !d.start || !d.end || Math.sqrt(Math.pow(d.start.x - d.end.x, 2) + Math.pow(d.start.y - d.end.y, 2)) < .015 * T.width ? !1 : !0
            }
        },
        Rectangle: function(J) {
            function q() {
                if (y) return !1;
                a.start.x = parseInt(b.attr("x"));
                a.start.y = parseInt(b.attr("y"));
                a.end.x = parseInt(b.attr("width"));
                a.end.x += a.start.x;
                a.end.y = parseInt(b.attr("height"));
                a.end.y += a.start.y;
                l = [];
                var c = +(a.start.x / t.width).toFixed(4) + "," + +(a.start.y / t.height).toFixed(4);
                l.push(c);
                c = +(a.end.x / t.width).toFixed(4) + "," +
                    +(a.end.y / t.height).toFixed(4);
                l.push(c);
                c = document.getElementById("shapes_1_section").lastElementChild;
                b.insertAfter($(c));
                C();
                $("[id^='svg_node_shape_']").remove();
                _boardObj.getSize();
                var c = a.start.x + (a.end.x - a.start.x) / 2;
                var d = a.start.y;
                var k = a.end.x;
                var h = a.start.y + (a.end.y - a.start.y) / 2;
                var r = a.start.x + (a.end.x - a.start.x) / 2;
                var p = a.end.y;
                var m = a.start.x;
                var n = a.start.y + (a.end.y - a.start.y) / 2;
                E(1, c, d);
                E(2, k, h);
                E(3, r, p);
                E(4, m, n);
                E(11, a.start.x, a.start.y);
                E(22, a.end.x, a.start.y);
                E(33, a.end.x, a.end.y);
                E(44, a.start.x, a.end.y);
                _pages[_currentPage].getShapesPainter().shapeKeyDownEvent(e)
            }

            function w() {
                var a = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                b = $(a).appendTo("#shapes_1_section");
                b.attr("id", e);
                b.addClass("shape-low-level", e);
                m.push(document.querySelector("#" + e));
                if ("touch" == AppConfig.clickType) b.on("touchstart", function(a) {
                    function b(a) {
                        clearTimeout(u)
                    }

                    function d() {
                        clearTimeout(u);
                        document.removeEventListener("touchmove", b);
                        document.removeEventListener("touchend", d)
                    }
                    c(a);
                    document.addEventListener("touchmove", b, !1);
                    document.addEventListener("touchend", d, !1)
                });
                else b.on("mousedown", function(a) {
                    function c(a) {
                        if (3 == a.which && (b.off("contextmenu").one("contextmenu", function(a) {
                                a.preventDefault();
                                return !1
                            }), a.pageX == d && a.pageY == f && $(a.target).attr("id") == e)) return a.preventDefault(), b.attr("fill-opacity", .6), setTimeout(function() {
                            b.attr("fill-opacity", .2)
                        }, 100), q(), _pages[_currentPage].getShapesPainter().shapeContextMenu(a, n), !1
                    }
                    $(".context-menu").hide();
                    _pages[_currentPage].getShapesPainter().removeAdditionalShapes();
                    a = L(a);
                    if (3 == a.which) {
                        var d = a.pageX;
                        var f = a.pageY;
                        a.preventDefault();
                        b.one("mouseup", c);
                        return !1
                    }
                });
                $.each(A, function(a, c) {
                    b.attr(a, c)
                });
                "dashed" == k && b.attr("stroke-dasharray", 3 * A["stroke-width"] + "px," + 4 * A["stroke-width"] + "px");
                $.each(B, function(a, c) {
                    b.attr(a, c)
                })
            }

            function C() {
                $(".svg-shape-shadow").remove();
                var a = document.createElementNS("http://www.w3.org/2000/svg", "rect"),
                    c = $(a).insertBefore("#" + e);
                c.attr("id", "shadow_" + e);
                c.addClass("svg-shape-shadow");
                $.each(A, function(a, b) {
                    c.attr(a, b)
                });
                c.attr("stroke-opacity", 0.15);
                c.attr("x", b.attr("x"));
                c.attr("y", b.attr("y"));
                c.attr("width", b.attr("width"));
                c.attr("height", b.attr("height"));
                c.attr("stroke-width", 3 * b.attr("stroke-width"));
                $.each(B, function(a, b) {
                    c.attr(a, b)
                });
                c.attr("fill", "none")
            }

            function E(a, b, k) {
                var d = Math.ceil(_boardObj.getSize().width * D),
                    f = document.createElementNS("http://www.w3.org/2000/svg", "circle"),
                    f = $(f).insertAfter("#" + e);

                    f.attr("id", "svg_node_shape_" + a + "_" + e);
                    f.attr("stroke", _boardObj.getColors().bgColor);
                    f.attr("stroke-width", "1px");
                    f.attr("fill",
                        $("#" + e).attr("stroke"));
                    f.attr("fill-rule", "nonzero");
                    f.attr("fill-opacity", .8);
                    f.attr("cx", b);
                    f.attr("cy", k);
                    f.attr("r", d + "px");
                    f.css("cursor", "pointer");
                if ("touch" == AppConfig.clickType) f.on("touchstart", function(b) {
                    if (F) return !1;
                    c(b);
                    v($(this), b, a);
                    return !1
                });
                else f.on("mousedown", function(b) {
                    if (F) return !1;
                    if (1 == b.which) return G($(this), b, a), !1
                }), f.on("contextmenu", function(a) {
                    a.preventDefault();
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, n);
                    return !1
                })
            }

            function L(a) {
                a = a || window.event;
                if (null == a.pageX && null != a.clientX) {
                    var b = _canvasElement,
                        c = document.body;
                    a.pageX = a.clientX + (b && b.scrollLeft || c && c.scrollLeft || 0) - (b.clientLeft || 0);
                    a.pageY = a.clientY + (b && b.scrollTop || c && c.scrollTop || 0) - (b.clientTop || 0)
                }!a.which && a.button && (a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0);
                return a
            }

            function x(a, b) {
                return b ? Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientY + document.body.scrollTop : a.pageY : Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientX +
                    document.body.scrollTop : a.pageX
            }

            function G(c, d, e) {
                function f(d) {
                    if (!B) {
                        $("[id^='svg_node_shape_']").hide();
                        c.show();
                        d.preventDefault();
                        d = L(d);
                        switch (e) {
                            case 1:
                            case 3:
                                var f = n;
                                var k = x(d, 1) + u - A;
                                break;
                            case 2:
                            case 4:
                                f = x(d) + n - v;
                                k = u;
                                break;
                            case 11:
                            case 22:
                            case 33:
                            case 44:
                                f = x(d) + n - v, k = x(d, 1) + u - A
                        }
                        f < m && (f = m);
                        f > $("#" + r).width() - m && (f = $("#" + r).width() - m);
                        k < 7 * m && (k = 7 * m);
                        k > $("#" + r).height() - 7 * m && (k = $("#" + r).height() - 7 * m);
                        switch (e) {
                            case 1:
                                var h = a.start.x;
                                var p = k;
                                var q = a.end.x - a.start.x;
                                var z = a.end.y - k;
                                0 > z && (p = a.end.y,
                                    z = -z);
                                break;
                            case 2:
                                h = a.start.x;
                                p = a.start.y;
                                q = f - a.start.x;
                                z = a.end.y - a.start.y;
                                0 > q && (h = f, q = -q);
                                break;
                            case 3:
                                h = a.start.x;
                                p = a.start.y;
                                q = a.end.x - a.start.x;
                                z = k - a.start.y;
                                0 > z && (p = k, z = -z);
                                break;
                            case 4:
                                h = f;
                                p = a.start.y;
                                q = a.end.x - f;
                                z = a.end.y - a.start.y;
                                0 > q && (h = a.end.x, q = -q);
                                break;
                            case 11:
                                h = f;
                                p = k;
                                q = a.end.x - f;
                                z = a.end.y - k;
                                0 > q && (h = a.end.x, q = -q);
                                0 > z && (p = a.end.y, z = -z);
                                break;
                            case 22:
                                h = a.start.x;
                                p = k;
                                q = f - a.start.x;
                                z = a.end.y - k;
                                0 > q && (h = f, q = -q);
                                0 > z && (p = a.end.y, z = -z);
                                break;
                            case 33:
                                h = a.start.x;
                                p = a.start.y;
                                q = f - a.start.x;
                                z =
                                    k - a.start.y;
                                0 > q && (h = f, q = -q);
                                0 > z && (p = k, z = -z);
                                break;
                            case 44:
                                h = f, p = a.start.y, q = a.end.x - f, z = k - a.start.y, 0 > q && (h = a.end.x, q = -q), 0 > z && (p = k, z = -z)
                        }
                        w = f + "px";
                        y = k + "px";
                        c.attr("cx", w);
                        c.attr("cy", y);
                        b.attr("x", h);
                        b.attr("y", p);
                        b.attr("width", q);
                        b.attr("height", z);
                        C();
                        l = [];
                        d = +(h / t.width).toFixed(4) + "," + +(p / t.height).toFixed(4);
                        l.push(d);
                        d = +((h + q) / t.width).toFixed(4) + "," + +((p + z) / t.height).toFixed(4);
                        l.push(d)
                    }
                }

                function k() {
                    B = 1;
                    a.start.x = parseInt(b.attr("x"));
                    a.start.y = parseInt(b.attr("y"));
                    a.end.x = parseInt(b.attr("width"));
                    a.end.x += a.start.x;
                    a.end.y = parseInt(b.attr("height"));
                    a.end.y += a.start.y;
                    document.removeEventListener("mousemove", f);
                    document.removeEventListener("mouseup", k);
                    q();
                    l = [];
                    var c = +(a.start.x / t.width).toFixed(4) + "," + +(a.start.y / t.height).toFixed(4);
                    l.push(c);
                    c = +(a.end.x / t.width).toFixed(4) + "," + +(a.end.y / t.height).toFixed(4);
                    l.push(c);
                    if (h.onChanged) h.onChanged()
                }
                $(".context-menu").hide();
                d.preventDefault();
                d = L(d);
                var m = parseInt($(c).attr("r")),
                    n = parseInt(c.attr("cx")),
                    u = parseInt(c.attr("cy")),
                    v = x(d),
                    A = x(d, 1),
                    w, y, B = 0;
                document.addEventListener("mousemove", f, !1);
                document.addEventListener("mouseup", k, !1)
            }

            function v(c, d, e) {
                function f(d) {
                    clearTimeout(u);
                    if (!B) {
                        $(".context-menu").hide();
                        $("[id^='svg_node_shape_']").hide();
                        c.show();
                        var f = d.touches[0].pageX - $("#" + r).offset().left + n - A,
                            k = d.touches[0].pageY - $("#" + r).offset().top + v - w;
                        switch (e) {
                            case 1:
                            case 3:
                                f = n;
                                k = d.touches[0].pageY - $("#" + r).offset().top + v - w;
                                break;
                            case 2:
                            case 4:
                                f = d.touches[0].pageX - $("#" + r).offset().left + n - A;
                                k = v;
                                break;
                            case 11:
                            case 22:
                            case 33:
                            case 44:
                                f =
                                    d.touches[0].pageX - $("#" + r).offset().left + n - A, k = d.touches[0].pageY - $("#" + r).offset().top + v - w
                        }
                        f < -m && (f = -m);
                        f > $("#" + r).width() - 2 * m && (f = $("#" + r).width() - 2 * m);
                        k < 2 * m && (k = 2 * m);
                        k > $("#" + r).height() - 6 * m && (k = $("#" + r).height() - 6 * m);
                        switch (e) {
                            case 1:
                                var h = a.start.x;
                                var p = k;
                                var q = a.end.x - a.start.x;
                                var x = a.end.y - k;
                                0 > x && (p = a.end.y, x = -x);
                                break;
                            case 2:
                                h = a.start.x;
                                p = a.start.y;
                                q = f - a.start.x;
                                x = a.end.y - a.start.y;
                                0 > q && (h = f, q = -q);
                                break;
                            case 3:
                                h = a.start.x;
                                p = a.start.y;
                                q = a.end.x - a.start.x;
                                x = k - a.start.y;
                                0 > x && (p = k, x = -x);
                                break;
                            case 4:
                                h = f;
                                p = a.start.y;
                                q = a.end.x - f;
                                x = a.end.y - a.start.y;
                                0 > q && (h = a.end.x, q = -q);
                                break;
                            case 11:
                                h = f;
                                p = k;
                                q = a.end.x - f;
                                x = a.end.y - k;
                                0 > q && (h = a.end.x, q = -q);
                                0 > x && (p = a.end.y, x = -x);
                                break;
                            case 22:
                                h = a.start.x;
                                p = k;
                                q = f - a.start.x;
                                x = a.end.y - k;
                                0 > q && (h = f, q = -q);
                                0 > x && (p = a.end.y, x = -x);
                                break;
                            case 33:
                                h = a.start.x;
                                p = a.start.y;
                                q = f - a.start.x;
                                x = k - a.start.y;
                                0 > q && (h = f, q = -q);
                                0 > x && (p = k, x = -x);
                                break;
                            case 44:
                                h = f, p = a.start.y, q = a.end.x - f, x = k - a.start.y, 0 > q && (h = a.end.x, q = -q), 0 > x && (p = k, x = -x)
                        }
                        z = f + "px";
                        y = k + "px";
                        c.attr("cx", z);
                        c.attr("cy", y);
                        b.attr("x", h);
                        b.attr("y", p);
                        b.attr("width", q);
                        b.attr("height", x);
                        C();
                        l = [];
                        d = +(h / t.width).toFixed(4) + "," + +(p / t.height).toFixed(4);
                        l.push(d);
                        d = +((h + q) / t.width).toFixed(4) + "," + +((p + x) / t.height).toFixed(4);
                        l.push(d)
                    }
                }

                function k() {
                    clearTimeout(u);
                    B = 1;
                    a.start.x = parseInt(b.attr("x"));
                    a.start.y = parseInt(b.attr("y"));
                    a.end.x = parseInt(b.attr("width"));
                    a.end.x += a.start.x;
                    a.end.y = parseInt(b.attr("height"));
                    a.end.y += a.start.y;
                    document.removeEventListener("touchmove", f);
                    document.removeEventListener("touchend",
                        k);
                    q();
                    l = [];
                    var c = +(a.start.x / t.width).toFixed(4) + "," + +(a.start.y / t.height).toFixed(4);
                    l.push(c);
                    c = +(a.end.x / t.width).toFixed(4) + "," + +(a.end.y / t.height).toFixed(4);
                    l.push(c);
                    if (h.onChanged) h.onChanged()
                }
                $(".context-menu").hide();
                d.preventDefault();
                var m = parseInt($(c).attr("r"));
                d = d.originalEvent;
                var n = parseInt(c.attr("cx")),
                    v = parseInt(c.attr("cy")),
                    A = d.changedTouches[0].pageX - $("#" + r).offset().left,
                    w = d.changedTouches[0].pageY - $("#" + r).offset().top,
                    z, y, B = 0;
                document.addEventListener("touchmove", f, !1);
                document.addEventListener("touchend", k, !1)
            }

            function c(a) {
                clearTimeout(u);
                u = setTimeout(function() {
                    b.attr("fill-opacity", .6);
                    setTimeout(function() {
                        b.attr("fill-opacity", .2)
                    }, 100);
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, n)
                }, 750)
            }
            var h = J || {},
                n = this,
                e = null,
                b = null,
                m = [],
                l = null,
                u = null,
                a = {
                    start: null,
                    end: null
                },
                k = null,
                r = null,
                A = {
                    stroke: null,
                    "stroke-width": null,
                    "stroke-linejoin": "round",
                    "stroke-opacity": .8
                },
                B = {
                    fill: "none",
                    "fill-opacity": .2,
                    "fill-rule": "nonzero"
                },
                D = .0061096;
            "touch" == AppConfig.clickType && (D = .0104736);
            var y = !1,
                F = !1,
                t = _boardObj.getSize();
            n.create = function(c) {
                a.start = {};
                a.start.x = c.left;
                a.start.y = c.top;
                a.end = {};
                a.end.x = c.left;
                a.end.y = c.top;
                A.stroke = c.stroke_color;
                A["stroke-width"] = c.stroke_width;
                B.fill = c.fill_color;
                k = c.stroke_style;
                r = c.canvas_element_id;
                for (c = 1;;) {
                    if (!document.getElementById("svg_shape_rectangle_" + c)) {
                        e = "svg_shape_rectangle_" + c;
                        break
                    }
                    c++
                }
                w();
                b.attr("x", a.start.x);
                b.attr("y", a.start.y)
            };
            n.creating = function(c) {
                a.end || (a.end = {});
                a.end.x = c.left;
                a.end.y =
                    c.top;
                var d = a.end.x - a.start.x,
                    f = a.start.x;
                c = a.end.x;
                0 > d && (b.attr("x", a.end.x), d = Math.abs(d), f = a.end.x, c = a.start.x);
                var e = a.end.y - a.start.y,
                    k = a.start.y,
                    h = a.end.y;
                0 > e && (b.attr("y", a.end.y), e = Math.abs(e), k = a.end.y, h = a.start.y);
                b.attr("width", d);
                b.attr("height", e);
                l = [];
                d = +(f / t.width).toFixed(4) + "," + +(k / t.height).toFixed(4);
                l.push(d);
                d = +(c / t.width).toFixed(4) + "," + +(h / t.height).toFixed(4);
                l.push(d)
            };
            n.afterCreated = function(c) {
                a.start.x = parseInt(b.attr("x"));
                a.start.y = parseInt(b.attr("y"));
                a.end.x = parseInt(b.attr("width"));
                a.end.x += a.start.x;
                a.end.y = parseInt(b.attr("height"));
                a.end.y += a.start.y;
                l = [];
                c = +(a.start.x / t.width).toFixed(4) + "," + +(a.start.y / t.height).toFixed(4);
                l.push(c);
                c = +(a.end.x / t.width).toFixed(4) + "," + +(a.end.y / t.height).toFixed(4);
                l.push(c)
            };
            n.draw = function(c) {
                if (!l) return document.getElementById(e) && b.remove(), !1;
                document.getElementById(e) || w();
                var d = l[0].split(","),
                    f = l[1].split(",");
                a.start = {};
                a.start.x = d[0] * t.width;
                a.start.y = d[1] * t.height;
                a.end = {};
                a.end.x = f[0] * t.width;
                a.end.y = f[1] * t.height;
                b.attr("x",
                    a.start.x);
                b.attr("y", a.start.y);
                b.attr("width", a.end.x - a.start.x);
                b.attr("height", a.end.y - a.start.y);
                c && c.stroke_width && A["stroke-width"] != c.stroke_width && (A["stroke-width"] = c.stroke_width, b.attr("stroke-width", A["stroke-width"]), "dashed" == k && b.attr("stroke-dasharray", 3 * A["stroke-width"] + "px," + 4 * A["stroke-width"] + "px"))
            };
            n.show = function() {
                for (var a = 0; a < m.length; a++) m[a].style.visibility = "visible"
            };
            n.hide = function() {
                for (var a = 0; a < m.length; a++) m[a].style.visibility = "hidden"
            };
            n.focus = function() {
                q()
            };
            n.lockFocusing = function(a) {
                if (void 0 === a) return y;
                y = a;
                return y = !!y
            };
            n.lockChanging = function(a) {
                if (void 0 === a) return F;
                F = a;
                return F = !!F
            };
            n.getStoreInfo = function() {
                return l ? {
                    t: "rectangle",
                    ppr: l,
                    ss: k,
                    sc: A.stroke,
                    fc: B.fill
                } : !1
            };
            n.restore = function(a) {
                l = a.points_positions_relations;
                if (!l) return !1;
                k = a.stroke_style;
                A.stroke = a.stroke_color;
                B.fill = a.fill_color;
                $.each(A, function(a, c) {
                    b.attr(a, c)
                });
                $.each(B, function(a, c) {
                    b.attr(a, c)
                });
                "dashed" == k && b.attr("stroke-dasharray", 3 * A["stroke-width"] + "px," + 4 * A["stroke-width"] +
                    "px")
            };
            n.getId = function() {
                return e
            };
            n.remove = function() {
                b.remove()
            };
            n.isValid = function() {
                return !b || !a.start || !a.end || a.start.x == a.end.x || a.start.y == a.end.y || Math.sqrt(Math.pow(a.start.x - a.end.x, 2) + Math.pow(a.start.y - a.end.y, 2)) < .005 * t.width ? !1 : !0
            };
            n.getStrokeWidthToBoardCoeff = function() {
                return 8.728E-4
            }
        },
        Ellipse: function(J) {
            function q() {
                if (y) return !1;
                var c = parseInt(b.attr("cx")),
                    d = parseInt(b.attr("cy")),
                    k = parseInt(b.attr("rx")),
                    h = parseInt(b.attr("ry"));
                a.start.x = c - k;
                a.start.y = d - h;
                a.end.x = c + k;
                a.end.y =
                    d + h;
                l = [];
                c = (a.start.x / t.width).toFixed(4) + "," + (a.start.y / t.height).toFixed(4);
                l.push(c);
                c = (a.end.x / t.width).toFixed(4) + "," + (a.end.y / t.height).toFixed(4);
                l.push(c);
                c = document.getElementById("shapes_1_section").lastElementChild;
                b.insertAfter($(c));
                C();
                $("[id^='svg_node_shape_']").remove();
                var c = a.start.x + (a.end.x - a.start.x) / 2,
                    d = a.start.y,
                    k = a.end.x,
                    h = a.start.y + (a.end.y - a.start.y) / 2;
                var m = a.start.x + (a.end.x - a.start.x) / 2;
                var p = a.end.y;
                var r = a.start.x;
                var n = a.start.y + (a.end.y - a.start.y) / 2;
                E(1, c, d);
                E(2,
                    k, h);
                E(3, m, p);
                E(4, r, n);
                E(11, a.start.x, a.start.y);
                E(22, a.end.x, a.start.y);
                E(33, a.end.x, a.end.y);
                E(44, a.start.x, a.end.y);
                _pages[_currentPage].getShapesPainter().shapeKeyDownEvent(e)
            }

            function w() {
                var a = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
                b = $(a).appendTo("#shapes_1_section");
                b.attr("id", e);
                b.addClass("shape-low-level", e);
                m.push(document.querySelector("#" + e));
                if ("touch" == AppConfig.clickType) b.on("touchstart", function(a) {
                    function b(a) {
                        clearTimeout(u)
                    }

                    function d() {
                        clearTimeout(u);
                        document.removeEventListener("touchmove", b);
                        document.removeEventListener("touchend", d)
                    }
                    c(a);
                    document.addEventListener("touchmove", b, !1);
                    document.addEventListener("touchend", d, !1)
                });
                else b.on("mousedown", function(a) {
                    function c(a) {
                        if (3 == a.which && (b.off("contextmenu").one("contextmenu", function(a) {
                                a.preventDefault();
                                return !1
                            }), a.pageX == d && a.pageY == f && $(a.target).attr("id") == e)) return a.preventDefault(), b.attr("fill-opacity", .6), setTimeout(function() {
                            b.attr("fill-opacity", .2)
                        }, 100), q(), _pages[_currentPage].getShapesPainter().shapeContextMenu(a,
                            n), !1
                    }
                    $(".context-menu").hide();
                    _pages[_currentPage].getShapesPainter().removeAdditionalShapes();
                    a = L(a);
                    if (3 == a.which) {
                        var d = a.pageX;
                        var f = a.pageY;
                        a.preventDefault();
                        b.one("mouseup", c);
                        return !1
                    }
                });
                $.each(A, function(a, c) {
                    b.attr(a, c)
                });
                "dashed" == k && b.attr("stroke-dasharray", 3 * A["stroke-width"] + "px," + 4 * A["stroke-width"] + "px");
                $.each(B, function(a, c) {
                    b.attr(a, c)
                })
            }

            function C() {
                $(".svg-shape-shadow").remove();
                var a = document.createElementNS("http://www.w3.org/2000/svg", "ellipse"),
                    c = $(a).insertBefore("#" +
                        e);
                c.attr("id", "shadow_" + e);
                c.addClass("svg-shape-shadow");
                $.each(A, function(a, b) {
                    c.attr(a, b)
                });
                c.attr("stroke-opacity", 0);
                c.attr("cx", b.attr("cx"));
                c.attr("cy", b.attr("cy"));
                c.attr("rx", b.attr("rx"));
                c.attr("ry", b.attr("ry"));
                c.attr("stroke-width", 3 * b.attr("stroke-width"));
                $.each(B, function(a, b) {
                    c.attr(a, b)
                });
                c.attr("fill", "none")
            }

            function E(a, b, k) {
                var d = Math.ceil(_boardObj.getSize().width * D),
                    f = document.createElementNS("http://www.w3.org/2000/svg", "circle"),
                    f = $(f).insertAfter("#" + e);
                f.attr("id",
                    "svg_node_shape_" + a + "_" + e);
                f.attr("stroke", _boardObj.getColors().bgColor);
                f.attr("stroke-width", "1px");
                f.attr("fill", $("#" + e).attr("stroke"));
                f.attr("fill-rule", "nonzero");
                f.attr("fill-opacity", .8);
                f.attr("cx", b);
                f.attr("cy", k);
                f.attr("r", d + "px");
                f.css("cursor", "pointer");
                if ("touch" == AppConfig.clickType) f.on("touchstart", function(b) {
                    if (F) return !1;
                    c(b);
                    v($(this), b, a);
                    return !1
                });
                else f.on("mousedown", function(b) {
                    if (F) return !1;
                    if (1 == b.which) return G($(this), b, a), !1
                }), f.on("contextmenu", function(a) {
                    a.preventDefault();
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, n);
                    return !1
                })
            }

            function L(a) {
                a = a || window.event;
                if (null == a.pageX && null != a.clientX) {
                    var b = _canvasElement,
                        c = document.body;
                    a.pageX = a.clientX + (b && b.scrollLeft || c && c.scrollLeft || 0) - (b.clientLeft || 0);
                    a.pageY = a.clientY + (b && b.scrollTop || c && c.scrollTop || 0) - (b.clientTop || 0)
                }!a.which && a.button && (a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0);
                return a
            }

            function x(a, b) {
                return b ? Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientY +
                    document.body.scrollTop : a.pageY : Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientX + document.body.scrollTop : a.pageX
            }

            function G(c, d, e) {
                function f(d) {
                    if (!B) {
                        $("[id^='svg_node_shape_']").hide();
                        c.show();
                        d.preventDefault();
                        d = L(d);
                        switch (e) {
                            case 1:
                            case 3:
                                var f = n;
                                var k = x(d, 1) + u - A;
                                break;
                            case 2:
                            case 4:
                                f = x(d) + n - v;
                                k = u;
                                break;
                            case 11:
                            case 22:
                            case 33:
                            case 44:
                                f = x(d) + n - v, k = x(d, 1) + u - A
                        }
                        f < m && (f = m);
                        f > $("#" + r).width() - m && (f = $("#" + r).width() - m);
                        k < 7 * m && (k = 7 * m);
                        k > $("#" + r).height() - 7 * m && (k = $("#" +
                            r).height() - 7 * m);
                        d = (a.end.x + a.start.x) / 2;
                        var h = (a.end.y + a.start.y) / 2,
                            p = Math.abs((a.end.x - a.start.x) / 2),
                            q = Math.abs((a.end.y - a.start.y) / 2);
                        switch (e) {
                            case 1:
                                h = (a.end.y + k) / 2;
                                q = Math.abs((a.end.y - k) / 2);
                                break;
                            case 2:
                                d = (a.start.x + f) / 2;
                                p = Math.abs((f - a.start.x) / 2);
                                break;
                            case 3:
                                h = (a.start.y + k) / 2;
                                q = Math.abs((k - a.start.y) / 2);
                                break;
                            case 4:
                                d = (a.end.x + f) / 2;
                                p = Math.abs((a.end.x - f) / 2);
                                break;
                            case 11:
                                d = (a.end.x + f) / 2;
                                p = Math.abs((a.end.x - f) / 2);
                                h = (a.end.y + k) / 2;
                                q = Math.abs((a.end.y - k) / 2);
                                break;
                            case 22:
                                d = (a.start.x + f) / 2;
                                p =
                                    Math.abs((f - a.start.x) / 2);
                                h = (a.end.y + k) / 2;
                                q = Math.abs((a.end.y - k) / 2);
                                break;
                            case 33:
                                d = (a.start.x + f) / 2;
                                p = Math.abs((f - a.start.x) / 2);
                                h = (a.start.y + k) / 2;
                                q = Math.abs((k - a.start.y) / 2);
                                break;
                            case 44:
                                d = (a.end.x + f) / 2, p = Math.abs((a.end.x - f) / 2), h = (a.start.y + k) / 2, q = Math.abs((k - a.start.y) / 2)
                        }
                        w = f + "px";
                        y = k + "px";
                        c.attr("cx", w);
                        c.attr("cy", y);
                        b.attr("cx", d);
                        b.attr("cy", h);
                        b.attr("rx", p);
                        b.attr("ry", q);
                        C();
                        l = [];
                        f = +((d - p) / t.width).toFixed(4) + "," + +((h - q) / t.height).toFixed(4);
                        l.push(f);
                        f = +((d + p) / t.width).toFixed(4) + "," +
                            +((h + q) / t.height).toFixed(4);
                        l.push(f)
                    }
                }

                function k() {
                    B = 1;
                    var c = parseInt(b.attr("cx")),
                        d = parseInt(b.attr("cy")),
                        e = parseInt(b.attr("rx")),
                        m = parseInt(b.attr("ry"));
                    a.start.x = c - e;
                    a.start.y = d - m;
                    a.end.x = c + e;
                    a.end.y = d + m;
                    document.removeEventListener("mousemove", f);
                    document.removeEventListener("mouseup", k);
                    q();
                    l = [];
                    c = (a.start.x / t.width).toFixed(4) + "," + (a.start.y / t.height).toFixed(4);
                    l.push(c);
                    c = (a.end.x / t.width).toFixed(4) + "," + (a.end.y / t.height).toFixed(4);
                    l.push(c);
                    if (h.onChanged) h.onChanged()
                }
                $(".context-menu").hide();
                d.preventDefault();
                d = L(d);
                var m = parseInt($(c).attr("r")),
                    n = parseInt(c.attr("cx")),
                    u = parseInt(c.attr("cy")),
                    v = x(d),
                    A = x(d, 1),
                    w, y, B = 0;
                document.addEventListener("mousemove", f, !1);
                document.addEventListener("mouseup", k, !1)
            }

            function v(c, d, e) {
                function f(d) {
                    clearTimeout(u);
                    if (!B) {
                        $(".context-menu").hide();
                        $("[id^='svg_node_shape_']").hide();
                        c.show();
                        var f = d.touches[0].pageX - $("#" + r).offset().left + n - A,
                            k = d.touches[0].pageY - $("#" + r).offset().top + v - w;
                        switch (e) {
                            case 1:
                            case 3:
                                f = n;
                                k = d.touches[0].pageY - $("#" + r).offset().top +
                                    v - w;
                                break;
                            case 2:
                            case 4:
                                f = d.touches[0].pageX - $("#" + r).offset().left + n - A;
                                k = v;
                                break;
                            case 11:
                            case 22:
                            case 33:
                            case 44:
                                f = d.touches[0].pageX - $("#" + r).offset().left + n - A, k = d.touches[0].pageY - $("#" + r).offset().top + v - w
                        }
                        f < -m && (f = -m);
                        f > $("#" + r).width() - 2 * m && (f = $("#" + r).width() - 2 * m);
                        k < 2 * m && (k = 2 * m);
                        k > $("#" + r).height() - 6 * m && (k = $("#" + r).height() - 6 * m);
                        d = (a.end.x + a.start.x) / 2;
                        var h = (a.end.y + a.start.y) / 2,
                            p = Math.abs((a.end.x - a.start.x) / 2),
                            q = Math.abs((a.end.y - a.start.y) / 2);
                        switch (e) {
                            case 1:
                                h = (a.end.y + k) / 2;
                                q = Math.abs((a.end.y -
                                    k) / 2);
                                break;
                            case 2:
                                d = (a.start.x + f) / 2;
                                p = Math.abs((f - a.start.x) / 2);
                                break;
                            case 3:
                                h = (a.start.y + k) / 2;
                                q = Math.abs((k - a.start.y) / 2);
                                break;
                            case 4:
                                d = (a.end.x + f) / 2;
                                p = Math.abs((a.end.x - f) / 2);
                                break;
                            case 11:
                                d = (a.end.x + f) / 2;
                                p = Math.abs((a.end.x - f) / 2);
                                h = (a.end.y + k) / 2;
                                q = Math.abs((a.end.y - k) / 2);
                                break;
                            case 22:
                                d = (a.start.x + f) / 2;
                                p = Math.abs((f - a.start.x) / 2);
                                h = (a.end.y + k) / 2;
                                q = Math.abs((a.end.y - k) / 2);
                                break;
                            case 33:
                                d = (a.start.x + f) / 2;
                                p = Math.abs((f - a.start.x) / 2);
                                h = (a.start.y + k) / 2;
                                q = Math.abs((k - a.start.y) / 2);
                                break;
                            case 44:
                                d =
                                    (a.end.x + f) / 2, p = Math.abs((a.end.x - f) / 2), h = (a.start.y + k) / 2, q = Math.abs((k - a.start.y) / 2)
                        }
                        y = f + "px";
                        x = k + "px";
                        c.attr("cx", y);
                        c.attr("cy", x);
                        b.attr("cx", d);
                        b.attr("cy", h);
                        b.attr("rx", p);
                        b.attr("ry", q);
                        C();
                        l = [];
                        f = +((d - p) / t.width).toFixed(4) + "," + +((h - q) / t.height).toFixed(4);
                        l.push(f);
                        f = +((d + p) / t.width).toFixed(4) + "," + +((h + q) / t.height).toFixed(4);
                        l.push(f)
                    }
                }

                function k() {
                    clearTimeout(u);
                    B = 1;
                    var c = parseInt(b.attr("cx")),
                        d = parseInt(b.attr("cy")),
                        e = parseInt(b.attr("rx")),
                        m = parseInt(b.attr("ry"));
                    a.start.x = c -
                        e;
                    a.start.y = d - m;
                    a.end.x = c + e;
                    a.end.y = d + m;
                    document.removeEventListener("touchmove", f);
                    document.removeEventListener("touchend", k);
                    q();
                    l = [];
                    c = (a.start.x / t.width).toFixed(4) + "," + (a.start.y / t.height).toFixed(4);
                    l.push(c);
                    c = (a.end.x / t.width).toFixed(4) + "," + (a.end.y / t.height).toFixed(4);
                    l.push(c);
                    if (h.onChanged) h.onChanged()
                }
                $(".context-menu").hide();
                d.preventDefault();
                var m = parseInt($(c).attr("r"));
                d = d.originalEvent;
                var n = parseInt(c.attr("cx")),
                    v = parseInt(c.attr("cy")),
                    A = d.changedTouches[0].pageX - $("#" +
                        r).offset().left,
                    w = d.changedTouches[0].pageY - $("#" + r).offset().top,
                    y, x, B = 0;
                document.addEventListener("touchmove", f, !1);
                document.addEventListener("touchend", k, !1)
            }

            function c(a) {
                clearTimeout(u);
                u = setTimeout(function() {
                    b.attr("fill-opacity", .6);
                    setTimeout(function() {
                        b.attr("fill-opacity", .2)
                    }, 100);
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, n)
                }, 750)
            }
            var h = J || {},
                n = this,
                e = null,
                b = null,
                m = [],
                l = null,
                u = null,
                a = {
                    start: null,
                    end: null
                },
                k = null,
                r = null,
                A = {
                    stroke: null,
                    "stroke-width": null,
                    "stroke-linejoin": "round",
                    "stroke-opacity": .8
                },
                B = {
                    fill: "none",
                    "fill-opacity": .2,
                    "fill-rule": "nonzero"
                },
                D = .0061096;
            "touch" == AppConfig.clickType && (D = .0104736);
            var y = !1,
                F = !1,
                t = _boardObj.getSize();
            n.create = function(b) {
                a.start = {};
                a.start.x = b.left;
                a.start.y = b.top;
                a.end = {};
                a.end.x = b.left;
                a.end.y = b.top;
                A.stroke = b.stroke_color;
                A["stroke-width"] = b.stroke_width;
                B.fill = b.fill_color;
                k = b.stroke_style;
                r = b.canvas_element_id;
                for (b = 1;;) {
                    if (!document.getElementById("svg_shape_ellipse_" + b)) {
                        e = "svg_shape_ellipse_" + b;
                        break
                    }
                    b++
                }
                w()
            };
            n.creating =
                function(c) {
                    a.end || (a.end = {});
                    a.end.x = c.left;
                    a.end.y = c.top;
                    c = (a.end.y + a.start.y) / 2;
                    var d = Math.abs((a.end.x - a.start.x) / 2),
                        e = Math.abs((a.end.y - a.start.y) / 2);
                    b.attr("cx", (a.end.x + a.start.x) / 2);
                    b.attr("cy", c);
                    b.attr("rx", d);
                    b.attr("ry", e);
                    l = [];
                    c = +(a.start.x / t.width).toFixed(4) + "," + +(a.start.y / t.height).toFixed(4);
                    l.push(c);
                    c = +(a.end.x / t.width).toFixed(4) + "," + +(a.end.y / t.height).toFixed(4);
                    l.push(c)
                };
            n.afterCreated = function(a) {};
            n.draw = function(c) {
                if (!l) return document.getElementById(e) && b.remove(), !1;
                document.getElementById(e) || w();
                var d = l[0].split(","),
                    f = l[1].split(",");
                a.start = {};
                a.start.x = d[0] * t.width;
                a.start.y = d[1] * t.height;
                a.end = {};
                a.end.x = f[0] * t.width;
                a.end.y = f[1] * t.height;
                var d = (a.end.y + a.start.y) / 2,
                    f = Math.abs((a.end.x - a.start.x) / 2),
                    h = Math.abs((a.end.y - a.start.y) / 2);
                b.attr("cx", (a.end.x + a.start.x) / 2);
                b.attr("cy", d);
                b.attr("rx", f);
                b.attr("ry", h);
                c && c.stroke_width && A["stroke-width"] != c.stroke_width && (A["stroke-width"] = c.stroke_width, b.attr("stroke-width", A["stroke-width"]), "dashed" == k &&
                    b.attr("stroke-dasharray", 3 * A["stroke-width"] + "px," + 4 * A["stroke-width"] + "px"))
            };
            n.show = function() {
                for (var a = 0; a < m.length; a++) m[a].style.visibility = "visible"
            };
            n.hide = function() {
                for (var a = 0; a < m.length; a++) m[a].style.visibility = "hidden"
            };
            n.focus = function() {
                q()
            };
            n.lockFocusing = function(a) {
                if (void 0 === a) return y;
                y = a;
                return y = !!y
            };
            n.lockChanging = function(a) {
                if (void 0 === a) return F;
                F = a;
                return F = !!F
            };
            n.getStoreInfo = function() {
                return l ? {
                    t: "ellipse",
                    ppr: l,
                    ss: k,
                    sc: A.stroke,
                    fc: B.fill
                } : !1
            };
            n.restore = function(a) {
                l =
                    a.points_positions_relations;
                if (!l) return !1;
                k = a.stroke_style;
                A.stroke = a.stroke_color;
                B.fill = a.fill_color;
                $.each(A, function(a, c) {
                    b.attr(a, c)
                });
                $.each(B, function(a, c) {
                    b.attr(a, c)
                });
                "dashed" == k && b.attr("stroke-dasharray", 3 * A["stroke-width"] + "px," + 4 * A["stroke-width"] + "px")
            };
            n.getId = function() {
                return e
            };
            n.remove = function() {
                b.remove()
            };
            n.isValid = function() {
                return !b || !a.start || !a.end || a.start.x == a.end.x || a.start.y == a.end.y || Math.sqrt(Math.pow(a.start.x - a.end.x, 2) + Math.pow(a.start.y - a.end.y, 2)) < .005 * t.width ?
                    !1 : !0
            };
            n.getStrokeWidthToBoardCoeff = function() {
                return 8.728E-4
            }
        },
        Polygon: function(J) {
            function q() {
                if (u) return !1;
                var a = document.getElementById("shapes_1_section").lastElementChild;
                v.insertAfter($(a));
                C();
                _pages[_currentPage].getShapesPainter().shapeKeyDownEvent(G)
            }

            function w() {
                var a = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                v = $(a).appendTo("#shapes_1_section");
                v.attr("id", G);
                v.addClass("shape-low-level", G);
                v.css("cursor", "pointer");
                c.push(document.querySelector("#" + G));
                if ("touch" == AppConfig.clickType) v.on("touchstart",
                    function(a) {
                        function b(a) {
                            clearTimeout(n)
                        }

                        function c() {
                            clearTimeout(n);
                            document.removeEventListener("touchmove", b);
                            document.removeEventListener("touchend", c)
                        }
                        L(a);
                        document.addEventListener("touchmove", b, !1);
                        document.addEventListener("touchend", c, !1)
                    });
                else v.on("mousedown", function(a) {
                    function b(a) {
                        if (3 == a.which && (v.off("contextmenu").one("contextmenu", function(a) {
                                a.preventDefault();
                                return !1
                            }), a.pageX == c && a.pageY == e && $(a.target).attr("id") == G)) return a.preventDefault(), v.attr("fill-opacity", .6), setTimeout(function() {
                            v.attr("fill-opacity",
                                .2)
                        }, 100), q(), _pages[_currentPage].getShapesPainter().shapeContextMenu(a, x), !1
                    }
                    $(".context-menu").hide();
                    _pages[_currentPage].getShapesPainter().removeAdditionalShapes();
                    a = E(a);
                    if (3 == a.which) {
                        var c = a.pageX;
                        var e = a.pageY;
                        a.preventDefault();
                        v.one("mouseup", b);
                        return !1
                    }
                });
                $.each(m, function(a, b) {
                    v.attr(a, b)
                });
                "dashed" == b && v.attr("stroke-dasharray", 3 * m["stroke-width"] + "px," + 4 * m["stroke-width"] + "px");
                $.each(l, function(a, b) {
                    v.attr(a, b)
                })
            }

            function C() {
                $(".svg-shape-shadow").remove();
                var a = document.createElementNS("http://www.w3.org/2000/svg", "polyline"),
                    b = $(a).insertBefore("#" + G);
                b.attr("id", "shadow_" + G);
                b.addClass("svg-shape-shadow");
                b.addClass("svg-shape-shadow-no-cursor");
                $.each(m, function(a, c) {
                    b.attr(a, c)
                });
                b.attr("stroke-opacity", 0);
                b.attr("points", v.attr("points"));
                b.attr("stroke-width", 10 * v.attr("stroke-width"));
                $.each(l, function(a, c) {
                    b.attr(a, c)
                });
                b.attr("fill", "none")
            }

            function E(a) {
                a = a || window.event;
                if (null == a.pageX && null != a.clientX) {
                    var b = _canvasElement,
                        c = document.body;
                    a.pageX = a.clientX + (b && b.scrollLeft || c && c.scrollLeft || 0) -
                        (b.clientLeft || 0);
                    a.pageY = a.clientY + (b && b.scrollTop || c && c.scrollTop || 0) - (b.clientTop || 0)
                }!a.which && a.button && (a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0);
                return a
            }

            function L(a) {
                clearTimeout(n);
                n = setTimeout(function() {
                    v.attr("fill-opacity", .6);
                    setTimeout(function() {
                        v.attr("fill-opacity", .2)
                    }, 100);
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, x)
                }, 750)
            }
            var x = this,
                G = null,
                v = null,
                c = [],
                h = null,
                n = null,
                e = [],
                b = null,
                m = {
                    stroke: null,
                    "stroke-width": null,
                    "stroke-linejoin": "round",
                    "stroke-opacity": .8
                },
                l = {
                    fill: "none",
                    "fill-opacity": .2,
                    "fill-rule": "nonzero"
                },
                u = !1,
                a = _boardObj.getSize();
            x.create = function(a) {
                e = a.points || [];
                m.stroke = a.stroke_color;
                m["stroke-width"] = a.stroke_width;
                l.fill = a.fill_color;
                b = a.stroke_style;
                for (a = 1;;) {
                    if (!document.getElementById("svg_shape_polygon_" + a)) {
                        G = "svg_shape_polygon_" + a;
                        break
                    }
                    a++
                }
                w();
                v.attr("points", e.join(" "))
            };
            x.creating = function(b) {
                var c = b.left;
                b = b.top;
                var k = +(c / a.width).toFixed(4) + "," + +(b / a.height).toFixed(4);
                h || (h = []);
                h.push(k);
                e.push(c + "," + b);
                v.attr("points", e.join(" "))
            };
            x.afterCreated = function(a) {};
            x.draw = function(c) {
                if (!h) return document.getElementById(G) && v.remove(), !1;
                document.getElementById(G) || w();
                e = [];
                $.each(h, function(b, c) {
                    var k = c.split(",");
                    e.push(k[0] * a.width + "," + k[1] * a.height)
                });
                c && c.stroke_width && m["stroke-width"] != c.stroke_width && (m["stroke-width"] = c.stroke_width, v.attr("stroke-width", m["stroke-width"]), "dashed" == b && v.attr("stroke-dasharray", 3 * m["stroke-width"] + "px," + 4 * m["stroke-width"] + "px"));
                v.attr("points", e.join(" "))
            };
            x.show = function() {for (var a =0; a < c.length; a++) c[a].style.visibility = "visible"};
            x.hide = function() {for (var a = 0; a < c.length; a++) c[a].style.visibility = "hidden"};
            x.focus = function() {q()};
            x.lockFocusing = function(a) {
                if (void 0 === a) return u;
                u = a;
                return u = !!u
            };
            x.lockChanging = function(a) {};
            x.getStoreInfo = function() {
                return h ? {
                    t: "polygon",
                    ppr: h,
                    ss: b,
                    sc: m.stroke,
                    fc: l.fill
                } : !1
            };
            x.restore = function(a) {
                h = a.points_positions_relations;
                if (!h) return !1;
                b = a.stroke_style;
                m.stroke = a.stroke_color;
                l.fill = a.fill_color;
                $.each(m, function(a, b) {
                    v.attr(a, b)
                });
                $.each(l,
                    function(a, b) {
                        v.attr(a, b)
                    });
                "dashed" == b && v.attr("stroke-dasharray", 3 * m["stroke-width"] + "px," + 4 * m["stroke-width"] + "px")
            };
            x.getId = function() {return G};
            x.remove = function() {v.remove()};
            x.isValid = function() {return !e || 15 > e.length ? !1 : !0};
            x.getStrokeWidthToBoardCoeff = function() {return 8.728E-4}
        }
    },
    Animation = function(J) {
        var fa = J || {},
            Z  = this,
            N  = null,
            O  = null,
            Q  = null,
            qa = null,
            ha = "svg_canvas";
        void 0 !== fa.svgFieldID && (ha = fa.svgFieldID);
        var ua = "board";
        void 0 !== fa.mainFieldID && (ua = fa.boardID);
        var R  = !0,
            g  = [],
            M  = {},
            da = [],
            S  = 5,
            ma = null,
            H  = 0,
            na = !1,
            ja = {},
            ea = 0,
            X  = 0,
            ka = 1,
            V  = 1,
            Y  = !0,
            aa = !1,
            ga = !1,
            la = null,
            ta = Math.ceil(8.728E-4 * _boardObj.getSize().width),
            pa = .0061096;
        "touch" == AppConfig.clickType && (pa = .0104736);
        var oa = !0,
            ia = !0,
            sa = [],
            wa = null;

        function q() {
            for (var a = [], b = 0; b < g.length; b++) {
                var c = {elements: {}},
                    d;
                for (d in g[b].elements) g[b].elements.hasOwnProperty(d) && (c.elements[d] = {}, c.elements[d].pos = g[b].elements[d].pos);
                if (g[b].shapes)
                    for (var e = 0; e < g[b].shapes.length; e++) c.shps || (c.shps = []), c.shps.push(g[b].shapes[e].getStoreInfo());
                a.push(c)
            }
            return {
                frames: a,
                frames_elements: M,
                speed: +S,
                repeat: +Y
            }
        }

        function w() {  // ESTA FUNCION CREA EL LOCAL STORAGE DE LOS FRAMES Y ELEMENTOS
            if (!(R && oa && "localStorage" in window && null !== window.localStorage)) return !1;
            localStorage.setItem("animation_" + _boardObj.getType(), JSON.stringify(q()));
        }

        function C() { // ESTA FUNCION CARGA LOS ELEMENTOS DE LOCALSTORAGE
            if (!("localStorage" in window && null !== window.localStorage)) return !1;
            var a = JSON.parse(localStorage.getItem("animation_" + _boardObj.getType()));
            if (a) {
                (g = a.frames) || (g = []);
                for (var b = 0; b < g.length; b++) {
                    if (!g[b].elements) {
                        var c = g[b];
                        g[b] = {};
                        g[b].elements = c
                    }
                    if (g[b].shps) {
                        for (c = 0; c < g[b].shps.length; c++) {
                            var d = Shapes.Factory(g[b].shps[c].t, {
                                onChanged: function() { w() }
                            });
                            if (d) {
                                var e = Math.ceil(_boardObj.getSize().width * N.getStrokeWidthToBoardCoeff());
                                d.getStrokeWidthToBoardCoeff && (e = _boardObj.getSize().width * d.getStrokeWidthToBoardCoeff());
                                e = Math.ceil(e);
                                d.create({
                                    canvas_element_id: ha,
                                    stroke_width: e
                                });
                                d.restore({
                                    points_positions_relations: g[b].shps[c].ppr,
                                    stroke_style:               g[b].shps[c].ss,
                                    arrow:                      g[b].shps[c].a,
                                    stroke_color:               g[b].shps[c].sc,
                                    fill_color:                 g[b].shps[c].fc
                                });
                                d.draw();
                                g[b].shapes || (g[b].shapes = []);
                                g[b].shapes.push(d);
                                da.push(d);
                                N.addShape(d)
                            }
                        }
                        delete g[b].shps
                    }
                }(M = a.frames_elements) || (M = {});
                (S = +a.speed) || (S = 5);
                Y = +a.repeat;
                Y = !!Y;
                1 < g.length && (B(g.length - 1) || g.pop())
            }
        }

        function E() { // ESTA FUNCION CARGA LOS ELEMENTOS CUANDO VIENEN DE BASE DE DATOS
            (g = _linkDataStore.data.animation.frames) || (g = []);
            for (var a = 0; a < g.length; a++) {
                if (!g[a].elements) {
                    var b = g[a];
                    g[a] = {};
                    g[a].elements = b
                }
                if (g[a].shps) {
                    for (b = 0; b < g[a].shps.length; b++) {
                        var c = Shapes.Factory(g[a].shps[b].t, { onChanged: function() { w() } });
                        if (c) {
                            var d = Math.ceil(_boardObj.getSize().width * N.getStrokeWidthToBoardCoeff());
                            c.getStrokeWidthToBoardCoeff && (d = _boardObj.getSize().width * c.getStrokeWidthToBoardCoeff());
                            d = Math.ceil(d);
                            c.create({
                                canvas_element_id: ha,
                                stroke_width: d
                            });
                            c.restore({
                                points_positions_relations: g[a].shps[b].ppr,
                                stroke_style:               g[a].shps[b].ss,
                                arrow:                      g[a].shps[b].a,
                                stroke_color:               g[a].shps[b].sc,
                                fill_color:                 g[a].shps[b].fc
                            });
                            c.draw();
                            g[a].shapes || (g[a].shapes = []);
                            g[a].shapes.push(c);
                            da.push(c);
                            N.addShape(c)
                        }
                    }
                    delete g[a].shps
                }
            }
            (M = _linkDataStore.data.animation.frames_elements) || (M = {});
            (S = +_linkDataStore.data.animation.speed) || (S = 5);
            Y = +_linkDataStore.data.animation.repeat;
            Y = !!Y;
            (R = void 0 === _linkDataStore.data.animation.edit_mode ? !0 : !!_linkDataStore.data.animation.edit_mode) || (oa = !1);
            _linkDataStore.data.animation = null;
            delete _linkDataStore.data.animation;
        }

        function L() {  // ESTA FUNCION AGREGA TODOS LOS EVENTOS
            function b(a) {
                var b = _boardObj.getSize().width * _boardObj.getPlayerToBoardWidthCoeff();
                $("#anim_frames_container").scrollLeft($("#anim_frames_container").scrollLeft() + a * b)
            }
            document.querySelector("#context_menu_player_animation").addEventListener("keypress", G().contextMenuKeyPress, !1);
            document.querySelector("#context_menu_player_delete_btn_animation").addEventListener("click", G().playerContextMenuDelete, !1);
            document.querySelector("#context_menu_ball_name_animation").addEventListener("input", G().ballContextMenuNameInput, !1);
            document.querySelector("#context_menu_ball_animation").addEventListener("keypress", G().contextMenuKeyPress, !1);
            document.querySelector("#context_menu_ball_delete_btn_animation").addEventListener("click", G().ballContextMenuDelete, !1);
            document.querySelector("#context_menu_shape_delete_btn_animation").addEventListener("click", G().shapesPainterRemoveShape, !1);
            document.querySelector("#btn_anim_add_frame").addEventListener("click", G().addFrameButtonClick, !1);
            document.querySelector("#btn_anim_start_frame").addEventListener("click", G().addStartFrameButtonClick, !1);
            document.querySelector("#remove_frame_button_img").addEventListener("click", G().removeFrameButtonClick, !1);
            document.querySelector("#btn_animation_frames_left").addEventListener("click", function() { b(-1) }, !1);
            document.querySelector("#btn_animation_frames_right").addEventListener("click", function() { b(1) }, !1);
            document.querySelector("#animation_play").addEventListener("click", function() {a(!1)}, !1);
            document.querySelector("#animation_play_current_frame").addEventListener("click",function() {a(!0)}, !1);
            document.querySelector("#animation_pause").addEventListener("click", function() {u()}, !1);
            document.querySelector("#animation_stop").addEventListener("click", function() {r()}, !1);
            document.querySelector("#btn_animation_remove_last_frame").addEventListener("click", function() { c() }, !1);
            document.querySelector("#animation_repeat").addEventListener("click", function() {
                Y = !Y;
                removeClass(document.querySelector("#animation_buttons_panel #animation_repeat"), "button-selected");
                Y && addClass(document.querySelector("#animation_buttons_panel #animation_repeat"), "button-selected");
                w()
            }, !1);
           
            document.querySelector("#apRangeVelocidad").addEventListener("change", function() { m( $(this).val() ) }, !1);
            document.querySelector("#clear_animation_button").addEventListener("click", G().clearAnimationButtonClick, !1);
            document.querySelector("#btnDeleteEjercicio").addEventListener("click", G().resetAnimationButtonClick, !1);
            document.querySelector("#addEjercicioAnimation").addEventListener("click", G().resetAnimationButtonClick, !1);
            document.querySelector("#btnCloseEjercicio").addEventListener("click", G().resetAnimationButtonClick, !1);

            $("#mainOpenEjercicios").click(function(){
                G().resetAnimationButtonClick_ap;
            }); 

            $(".menu_bottom_icon").on('click', function(event){ animate_btn_save_play(); });
            $(".menu_bottom_icon").on('touchstart', function(event){ console.log("UP"); });
            $(".menu_bottom_icon").on('touchend', function(event){ 
                //$(".menu_bottom_icon").css("display", "none"); 
            });
            
            $.fn.dragImCircleMobile = G().dragImCircleMobile
        }

        function x() {
            document.querySelector("#shapes_buttons_panel #remove_last_shape").removeEventListener("click", G().shapesPainterRemoveLastShape);
            document.querySelector("#shapes_buttons_panel #remove_all_shapes").removeEventListener("click", G().shapesPainterRemoveAllShapes)
        }

        function G() { // FUNCIONES EXTRAS PARA LOS BOTONES
            qa || (qa = {
                contextMenuKeyPress: function(a) { 13 == a.which && hideElement(".context-menu") },
                playerContextMenuNumberInput: function() {
                    var a = document.querySelector("#context_menu_player_id_animation").value,
                        b = null; //document.querySelector("#context_menu_player_number_animation").value;
                    O.setPlayerNumber(a, b);
                    M[a].nmb = b;
                    w()
                },
                playerContextMenuNameInput: function() {
                    var a =
                        document.querySelector("#context_menu_player_id_animation").value,
                        b = null; //document.querySelector("#context_menu_player_name_animation").value;
                    O.setPlayerName(a, b);
                    M[a].nm = b;
                    w()
                },
                playerContextMenuDelete: function() {
                    var a = document.querySelector("#context_menu_player_id_animation").value;
                    e(a)
                },
                ballContextMenuNameInput: function() {
                    var a = document.querySelector("#context_menu_ball_id_animation").value,
                        b = document.querySelector("#context_menu_ball_name_animation").value;
                    M[a].nm = b;
                    w()
                },
                ballContextMenuDelete: function() {
                    var a =
                        document.querySelector("#context_menu_ball_id_animation").value;
                    e(a)
                },
                shapesPainterRemoveShape: function(a) {
                    a = document.querySelector("#context_menu_shape_id_animation").value;
                    b(a, H);
                    N.removeShape(a)
                },
                shapesPainterRemoveLastShape: function(a) {
                    g[H].shapes && 0 < g[H].shapes.length && (a = g[H].shapes[g[H].shapes.length - 1].getId(), b(a, H), N.removeShape(a), w())
                },
                shapesPainterRemoveAllShapes: function(a) {
                    if (g[H].shapes && 0 < g[H].shapes.length) {
                        for (; 0 < g[H].shapes.length;) a = g[H].shapes[0].getId(), b(a, H), N.removeShape(a);
                        g[H].shapes = [];
                        w()
                    }
                },
                addFrameButtonClick: function(a) {  // ESTA FUNCION SE EJECUTA CUANDO SE AÑADE UN NUEVO FRAME                    
                    a.preventDefault();
                    v();
                    return !1
                },
                addStartFrameButtonClick: function(a) { // ESTA FUNCION SE EJECUTA CUANDO CAMBIAS DE FRAME LA DEL INICIO                    
                    a.preventDefault();
                    r();
                    H = 0;
                    l(0);
                    return !1
                },
                removeFrameButtonClick: function(a) {
                    a.preventDefault();
                    r();
                    if (a = parseInt(document.querySelector("#context_menu_frame_button > #context_menu_frame_button_index").value)) h(a), H = a < g.length && 0 <= a ? a : g.length - 1, l(H);
                    hideElement(".context-menu");
                    return !1
                },
                clearAnimationButtonClick: function(a) {
                    a = _projectTexts.get();
                    
                    app.dialog.confirm(a.are_you_sure + "<br>" + a.ensure_you_got_animation_links, function () {
                        A();
                    });
                    /*new ModalWindow({
                        html: '<p class="info-modal-window">' +
                            a.are_you_sure + "<br>" + a.ensure_you_got_animation_links + "</p>",
                        yesButtonFunction: function() {
                            A()
                        }
                    })*/
                },
                resetAnimationButtonClick: function(a) { $("#lblTitleHeader").html(""); A(); },
                animationLinksButtonClick: function(a) {
                    a.preventDefault();
                    a = generateUUID() + "_" + _boardObj.getKey();
                    if (2 > g.length) return !1;
                    if (!B(g.length - 1)) {
                        if (3 > g.length) return a = _projectTexts.get(), new ModalWindow({
                            html: '<p class="info-modal-window">' + a.animation_no_moves_for_animation + "</p>",
                            closeButton: !0
                        }), !1;
                        c()
                    }
                    new ModalWindow({
                        html: '<div class="loading-image-modal-window"></div>'
                    });
                    for (var b = !1, d = JSON.stringify(q()),
                            e = [], f = 0;;) {
                        var va = d.substr(1E5 * f, 1E5);
                        if ("" === va) break;
                        e.push(va);
                        f++
                    }
                    for (d = 0; d < e.length && !b; d++) $.ajax({
                        url: "&ajax_request=store_animation_data_for_link",
                        type: "post",
                        async: !1,
                        data: {
                            linkToken: a,
                            boardType: _boardObj.getType(),
                            dataPart: e[d],
                            dataPartIndex: d
                        },
                        error: function(a) {
                            b = !0;
                            //console.log(a)
                        }
                    });
                    $.ajax({
                        url: "&ajax_request=animation_links_window",
                        type: "post",
                        data: {
                            linkToken: a
                        },
                        success: function(a) {
                            if (b) a = _projectTexts.get(), new ModalWindow({
                                html: '<span class="error-modal-window">' +
                                    a.server_error + '</span><br><span class="error-modal-window">' + a.try_again_later + "</span>",
                                closeButton: !0
                            });
                            else {
                                new ModalWindow({
                                    html: a,
                                    closeButton: !0
                                });
                                a = Math.ceil(.0095 * _boardObj.getSize().width * document.querySelector("#txt_box_animation_edit_link").value.length);
                                var c = Math.ceil(.015 * _boardObj.getSize().width);
                                document.querySelector("#txt_box_animation_link").style.fontSize = c + "px";
                                document.querySelector("#txt_box_animation_link").style.width = a + "px";
                                document.querySelector("#txt_box_animation_edit_link").style.fontSize = c + "px";
                                document.querySelector("#txt_box_animation_edit_link").style.width = a + "px";
                                document.querySelector("#copy_animation_link_button").style.width = a + "px";
                                document.querySelector("#copy_animation_link_button").style.height = 3 * c + "px";
                                document.querySelector("#copy_animation_edit_link_button").style.width = a + "px";
                                document.querySelector("#copy_animation_edit_link_button").style.height = 3 * c + "px";
                                document.queryCommandSupported("copy") ? (document.querySelector("#copy_animation_link_button").addEventListener("click",
                                    function() {
                                        try {
                                            document.querySelector("#txt_box_animation_link").select(), document.execCommand("copy")
                                        } catch (ra) {
                                            //console.log(ra)
                                        }
                                    }), document.querySelector("#copy_animation_edit_link_button").addEventListener("click", function() {
                                    try {
                                        document.querySelector("#txt_box_animation_edit_link").select(), document.execCommand("copy")
                                    } catch (ra) {
                                        //console.log(ra)
                                    }
                                })) : isFlashEnabled() ? ($("#copy_animation_link_button").zclip({
                                    path: "js/ZeroClipboard.swf",
                                    copy: document.querySelector("#txt_box_animation_link").value,
                                    afterCopy: function() {
                                        document.querySelector("#txt_box_animation_link").select()
                                    }
                                }), $("#copy_animation_edit_link_button").zclip({
                                    path: "js/ZeroClipboard.swf",
                                    copy: document.querySelector("#txt_box_animation_edit_link").value,
                                    afterCopy: function() {
                                        document.querySelector("#txt_box_animation_edit_link").select()
                                    }
                                })) : ($("#copy_animation_link_button").hide(), $("#copy_animation_edit_link_button").hide())
                            }
                        },
                        error: function(a) {
                            //console.log(a);
                            a = _projectTexts.get();
                            new ModalWindow({
                                html: '<span class="error-modal-window">' +
                                    a.server_error + '</span><br><span class="error-modal-window">' + a.try_again_later + "</span>",
                                closeButton: !0
                            })
                        }
                    });
                    return !1
                },
                frameElementMoveStart: function(a) { // ESTA FUNCION SE EJECUTA CUANDO INICIAS EL MOVIMIENTO
                    var b = document.querySelector("#anim_circle_im1_" + a);
                    b && b.remove();
                    (a = document.querySelector("#anim_circle_im2_" + a)) && a.remove()
                },
                frameElementMove: function(a, b) { // ESTA FUNCION CREA LA LINEA CUANDO SE MUEVE EL OBJETO
                    n(a, b, H);
                    if (void 0 === g[H].elements[a]) return !1;
                    g[H].elements[a].pos.e = b;
                    if (void 0 !== g[H].elements[a].pos.s) {
                        var c = g[H].elements[a].pos.s;
                        g[H].elements[a].pos.im1 = {};
                        g[H].elements[a].pos.im1.x = c.x + (b.x - c.x) / 3;
                        g[H].elements[a].pos.im1.y = c.y + (b.y - c.y) / 3;
                        g[H].elements[a].pos.im2 = {};
                        g[H].elements[a].pos.im2.x = c.x + (b.x - c.x) / 3 * 2;
                        g[H].elements[a].pos.im2.y = c.y + (b.y - c.y) / 3 * 2;
                        void 0 === g[H].elements[a].line_way && d(a, H);
                        var e = $("#" + a).width() + 55 / 2 + _boardObj.getSize().width * c.x,
                            f = $("#" + a).width() + 60 / 2 + _boardObj.getSize().height * c.y,
                            c = e + "," + f,
                            e = $("#" + a).width() + 55 / 2 + _boardObj.getSize().width * b.x,
                            f = $("#" + a).width() + 60 / 2 + _boardObj.getSize().height * b.y;
                        g[H].elements[a].line_way.attr("points", c + (" " + e + "," + f));
                    }
                    return !0
                },
                frameElementMoveEnd: function(a, b) { // ESTA FUNCION SE EJECUTA CUANDO TERMINAS DE EJECUTAR EL OBJETO
                    for (var c = H + 1; c < g.length; c++) g[c].elements[a] ? (g[c].elements[a].pos.s.x == g[c].elements[a].pos.e.x && (g[c].elements[a].pos.e.x = g[c - 1].elements[a].pos.e.x, g[c].elements[a].pos.e.y = g[c - 1].elements[a].pos.e.y), g[c].elements[a].pos.s.x = g[c - 1].elements[a].pos.e.x, g[c].elements[a].pos.s.y = g[c - 1].elements[a].pos.e.y, c == H + 1 && g[c].elements[a].pos.im1 && (g[c].elements[a].pos.im1 = {}, g[c].elements[a].pos.im1.x = g[c].elements[a].pos.s.x + (g[c].elements[a].pos.e.x - g[c].elements[a].pos.s.x) /
                        3, g[c].elements[a].pos.im1.y = g[c].elements[a].pos.s.y + (g[c].elements[a].pos.e.y - g[c].elements[a].pos.s.y) / 3, g[c].elements[a].pos.im2 = {}, g[c].elements[a].pos.im2.x = g[c].elements[a].pos.s.x + (g[c].elements[a].pos.e.x - g[c].elements[a].pos.s.x) / 3 * 2, g[c].elements[a].pos.im2.y = g[c].elements[a].pos.s.y + (g[c].elements[a].pos.e.y - g[c].elements[a].pos.s.y) / 3 * 2)) : (n(a, b, c), g[c].elements[a].pos.s = {}, g[c].elements[a].pos.s.x = b.x, g[c].elements[a].pos.s.y = b.y);
                    if (!g[H].elements[a]) return !1;
                    w();
                    if (void 0 === g[H].elements[a].line_way || void 0 === g[H].elements[a].pos.im1) return !1;
                    U(a, H); // ESTOS SON LOS PUNTOS DE LAS LINEA DEL MOVIMIENTO
                    f(a, H) // ESTA CREA LA LINEA DEL MOVIMIENTO
                },
                dragImCircleMobile: function(a, b) {
                    var c = null,
                        d = Math.ceil(_boardObj.getSize().width * pa);
                    this.on("touchstart", function(a) {
                        N.removeAdditionalShapes();
                        hideElement(".context-menu");
                        a = a.originalEvent;
                        c = {
                            x: a.changedTouches[0].pageX - parseFloat($(this).attr("cx")) + parseFloat($(this).attr("r")),
                            y: a.changedTouches[0].pageY - parseFloat($(this).attr("cy")) + parseFloat($(this).attr("r"))
                        }
                    });
                    this.on("touchmove", function(e) {
                        e.preventDefault();
                        var g = e.originalEvent;
                        e = $("#" + a).width() + 60 / 2;
                        var h = g.changedTouches[0].pageX - c.x + d,
                            g = g.changedTouches[0].pageY - c.y + d;
                        h < d ? h = d : h > _boardObj.getSize().width - d && (h = _boardObj.getSize().width - d);
                        g < 4 * d ? g = 4 * d : g > $("#" + ha).height() - 4 * d && (g = $("#" + ha).height() - 4 * d);
                        tY = g + "px";
                        tX = h + "px";
                        $(this).attr("cx", tX);
                        $(this).attr("cy", tY);
                        b.x = (h - e) / _boardObj.getSize().width;
                        b.y = (g - e) / _boardObj.getSize().height;
                        f(a, H);
                        return !1
                    });
                    this.on("touchend", function(a) {
                        w()
                    })
                }
            });
            return qa
        }

        function v() {  // ESTA FUNCION SE EJECUTA CUANDO AÑADES UN NUEVO FRAME
            r(); 
            var a = { elements: {} };
            if (0 === g.length) return g.push(a), l(g.length - 1), !0;
            if (1 == g.length && (!g[0].elements || emptyObject(g[0].elements))) return a = _projectTexts.get(), new ModalWindow({
                html: '<p class="info-modal-window">' + a.animation_add_at_least_one_element + "</p>",
                closeButton: !0
            }), !1;
            if (!B(g.length - 1)) {
                if (H !== g.length - 1) return H = g.length - 1, l(g.length - 1), !1;
                a = _projectTexts.get();
                new ModalWindow({
                    html: '<p class="info-modal-window">' + a.animation_no_moves_on_prev_frame + "</p>",
                    closeButton: !0
                });
                return !1
            }
            var b = g[g.length - 1],
                c;
            for (c in b.elements)
                if (b.elements.hasOwnProperty(c)) {
                    var d = {
                        x: b.elements[c].pos.e.x,
                        y: b.elements[c].pos.e.y
                    };
                    a.elements[c] = {};
                    a.elements[c].pos = {};
                    a.elements[c].pos.s = d;
                    a.elements[c].pos.e = d

                }
            if (b.shapes && 0 < b.shapes.length)
                for (c = 0; c < b.shapes.length; c++) {
                    var d = b.shapes[c].getStoreInfo(),
                        e = Shapes.Factory(d.t, {
                            onChanged: function() {
                                w()
                            }
                        });
                    if (e) {
                        var f = Math.ceil(_boardObj.getSize().width * N.getStrokeWidthToBoardCoeff());
                        e.getStrokeWidthToBoardCoeff && (f = _boardObj.getSize().width * e.getStrokeWidthToBoardCoeff());
                        f = Math.ceil(f);
                        e.create({
                            canvas_element_id: ha,
                            stroke_width: f
                        });
                        e.restore({
                            points_positions_relations: d.ppr,
                            stroke_style: d.ss,
                            arrow: d.a,
                            stroke_color: d.sc,
                            fill_color: d.fc
                        });
                        e.draw();
                        a.shapes || (a.shapes = []);
                        a.shapes.push(e);
                        da.push(e);
                        N.addShape(e)
                    }
                }
            g.push(a);
            F();
            H = g.length - 1;
            l(g.length - 1);
            R && showElement("#btn_animation_remove_last_frame");
            w();
        }

        function c() {
            if (2 > g.length) return !1;
            r();
            if (g[g.length - 1].shapes && 0 < g[g.length - 1].shapes.length)
                for (; 0 < g[g.length - 1].shapes.length;) {
                    var a = g[g.length - 1].shapes[0].getId();
                    b(a, g.length - 1);
                    N.removeShape(a)
                }
            g.pop();
            for (var a = {}, c = 0; c < g.length; c++)
                for (var d in g[c].elements) g[c].elements.hasOwnProperty(d) && (a[d] = 1);
            for (d in M) M.hasOwnProperty(d) && void 0 == a[d] && (delete M[d], removeClass(document.querySelector("#" + d), "anim-elem"), showElement("#" + d));
            document.querySelector("#btn_anim_frame_" + g.length).remove();
            H = g.length - 1;
            l(g.length - 1);
            2 > g.length && hideElement("#btn_animation_remove_last_frame");
            w()
        }

        function h(a) {
            if (g[a].shapes && 0 < g[a].shapes.length) {
                for (; 0 < g[a].shapes.length;) {
                    var c = g[a].shapes[0].getId();
                    b(c, a);
                    N.removeShape(c)
                }
                g[a].shapes = [];
                w()
            }
            g[a] = void 0;
            g.splice(a, 1);
            for (c = a; c < g.length && g[c - 1] && g[c].elements; c++)
                for (var d in g[c].elements) g[c].elements.hasOwnProperty(d) && g[c].elements[d].pos.s && g[c - 1].elements[d] && g[c - 1].elements[d].pos.e && (g[c].elements[d].pos.s.x == g[c].elements[d].pos.e.x && (g[c].elements[d].pos.e.x = g[c - 1].elements[d].pos.e.x, g[c].elements[d].pos.e.y = g[c - 1].elements[d].pos.e.y), g[c].elements[d].pos.s.x = g[c - 1].elements[d].pos.e.x, g[c].elements[d].pos.s.y = g[c - 1].elements[d].pos.e.y, c == a && g[c].elements[d].pos.im1 &&
                    (g[c].elements[d].pos.im1 = {}, g[c].elements[d].pos.im1.x = g[c].elements[d].pos.s.x + (g[c].elements[d].pos.e.x - g[c].elements[d].pos.s.x) / 3, g[c].elements[d].pos.im1.y = g[c].elements[d].pos.s.y + (g[c].elements[d].pos.e.y - g[c].elements[d].pos.s.y) / 3, g[c].elements[d].pos.im2 = {}, g[c].elements[d].pos.im2.x = g[c].elements[d].pos.s.x + (g[c].elements[d].pos.e.x - g[c].elements[d].pos.s.x) / 3 * 2, g[c].elements[d].pos.im2.y = g[c].elements[d].pos.s.y + (g[c].elements[d].pos.e.y - g[c].elements[d].pos.s.y) / 3 * 2));
            a = document.querySelectorAll('div [id^="btn_anim_frame_"]');
            for (d = 0; d < a.length; d++) a[d].remove();
            for (a = 1; a < g.length; a++) F(a);
            hideElement("#btn_animation_remove_last_frame");
            1 < g.length && showElement("#btn_animation_remove_last_frame")
        }

        function n(a, b, c) {
            void 0 === c && (c = H);
            if (g[c].elements && void 0 !== g[c].elements[a]) return !1;
            void 0 === M[a] && addClass(document.querySelector("#" + a), "anim-elem");
            M[a] = {};
            void 0 !== J && (M[a] = J);
            g[c].elements[a] = {};
            g[c].elements[a].pos = {};
            g[c].elements[a].pos.e = b;
            w();
            return !0
        }

        function e(a) {
            var b;
            M[a] && delete M[a];
            for (b = 0; b < g.length; b++) g[b].elements[a] && delete g[b].elements[a];
            (b = document.querySelector("#anim_clone_" + a)) && b.remove();
            (b = document.querySelector("#anim_circle_im1_" + a)) && b.remove();
            (b = document.querySelector("#anim_circle_im2_" + a)) && b.remove();
            (b = document.querySelector("#anim_line_way_" + a)) && b.remove();
            hideElement(".context-menu");
            0 === a.indexOf("animation_player_") ? O.reset({
                player_id: a
            }) : null;
            emptyObject(g[H].elements) && (h(H), 0 < H && H--);
            if (g.length) {
                for (b = g.length - 1; !(emptyObject(g[b].elements) ?
                        (h(b), H = b = g.length - 1) : b--, 0 > b););
                if (g.length) {
                    for (; !B(g.length - 1) && !(c(), 2 > g.length););
                    if (1 < g.length)
                        for (b = 1; !(B(b) ? b++ : (h(b), b = 1), b >= g.length););
                } else A()
            } else A();
            if (H >= g.length || 0 > H) H = g.length - 1;
            l(H);
            w()
        }

        function b(a, b) {
            for (var c = 0; c < g[b].shapes.length; c++) g[b].shapes[c].getId() == a && g[b].shapes.splice(c, 1);
            for (c = 0; c < da.length; c++) da[c].getId() == a && da.splice(c, 1)
        }

        function m(b) {
            void 0 !== b && (S = b);
            9 < S && (S = 9);
            1 > S && (S = 1);
            // document.querySelector("#animation_speed_text").innerHTML = S;
            w();
            ka = 1;
            8 < S ? ka = 6 : 6 < S ? ka = 4 : 4 < S && (ka = 2);
            3 < S ? ma = 500 * (10 - S) : 3 == S ? ma = 4E3 : 2 == S ? ma = 5E3 : 1 == S && (ma = 7E3);
            aa && (u(), a(na))
        }

        function l(a) { // ESTA FUNCION ASIGNAMOS LOS ELEMENTO DE FRAME EN SU NUEMRO
            void 0 === a && (a = H);
            !R || aa || ga || (O.lockMoving(!1), O.lockContextMenu(!1), N.lockShapesFocusing(!1), N.lockShapesChanging(!1), N.lockContextMenu(!1));
            y();
            if (R && !aa && !ga)
                for (var b in M) M.hasOwnProperty(b) && (0 === b.indexOf("animation_player_") ? O.reset({
                    player_id: b
                }) : hideElement("#" + b));
            for (b in g[a].elements)
                if (g[a].elements.hasOwnProperty(b)) {
                    showElement("#" + b);
                    var c = {
                        top: g[a].elements[b].pos.e.y,
                        left: g[a].elements[b].pos.e.x
                    };
                    R || (c = void 0 !== g[a].elements[b].pos.s ? {
                        top: g[a].elements[b].pos.s.y,
                        left: g[a].elements[b].pos.s.x
                    } : {
                        top: g[a].elements[b].pos.e.y,
                        left: g[a].elements[b].pos.e.x
                    });
                    void 0 !== ja[b] ? c = {
                        top: ja[b].y,
                        left: ja[b].x
                    } : !0 === aa && void 0 !== g[a].elements[b].pos.s && (c = {
                        top: g[a].elements[b].pos.s.y,
                        left: g[a].elements[b].pos.s.x
                    });
                    0 === b.indexOf("animation_player_") ? (O.setPlayerPosition(b, {
                        playerPositionRelations: c
                    }), void 0 !== M[b] && (void 0 !== M[b].nmb &&
                        O.setPlayerNumber(b, M[b].nmb), void 0 !== M[b].nm && O.setPlayerName(b, M[b].nm), void 0 !== M[b].z && O.setPlayerZindex(b, M[b].z))) : 0 === b.indexOf("animation_ball_");
                    void 0 !== g[a].elements[b].pos.s && void 0 === g[a].elements[b].pos.im1 && !0 !== aa && !0 !== ga && 1 == R && (0 === b.indexOf("animation_player_") && O.createPlayerClone(b, "anim_clone_"), 0 === b.indexOf("animation_ball_"));
                    void 0 !== g[a].elements[b].pos.im1 && !0 !== aa && !0 !== ga && (1 == R && (0 === b.indexOf("animation_player_") && O.createPlayerClone(b, "anim_clone_", g[a].elements[b].pos.s), 0 === b.indexOf("animation_ball_"), d(b, a), U(b, a)), f(b, a))
                }
            N.removeAdditionalShapes();
            ca();
            if (g[a].shapes && g[a].shapes.length)
                for (b = 0; b < g[a].shapes.length; b++) g[a].shapes[b].show();
            R && D(a)
        }

        function u() {
            O.lockMoving(!0);
            O.lockContextMenu(!0);
            N.lockShapesFocusing(!0);
            N.lockShapesChanging(!0);
            N.lockContextMenu(!0);
            if (aa) {
                aa = !1;
                ga = !0;
                clearInterval(la);
                for (var a = document.querySelectorAll("#animation_buttons_panel .ap-button"), b = 0; b < a.length; b++) removeClass(a[b], "button-selected");
                addClass(document.querySelector("#animation_buttons_panel #animation_pause"), "button-selected");
                return !1
            }
        }

        function a(a) { // ESTA FUNCION EJECUTA EL MOVIMIENTO
            if (aa) return !1;
            na = a;
            na = !!na;
            N.removeAdditionalShapes();
            if (!ga) {
                if (2 > g.length) return !1;
                if (!0 === a) {
                    if (!B(H)) return a = _projectTexts.get(), new ModalWindow({
                        html: '<p class="info-modal-window">' + a.animation_no_moves_on_current_frame + "</p>",
                        closeButton: !0
                    }), !1
                } else if (!B(g.length - 1)) {
                    if (3 > g.length) return a = _projectTexts.get(), new ModalWindow({
                        html: '<p class="info-modal-window">' + a.animation_no_moves_for_animation + "</p>",
                        closeButton: !0
                    }), !1;
                    c()
                }
                V = 1;
                clearInterval(la);
                if (!0 === a || 0 < H && H < g.length - 1) V = H;
                R && (y(), p(!1), hideElement("#shapes_buttons_panel"), N.disable());
                for (var b = 0; b < g.length; b++)
                    for (var d in g[b].elements)
                        if (g[b].elements.hasOwnProperty(d) && (g[b].elements[d].element = document.querySelector("#" + d), g[b].elements[d].lineWayPoints = void 0, void 0 !== g[b].elements[d].pos.im1)) {
                            var e = [];
                            e.push({
                                x: g[b].elements[d].pos.s.x,
                                y: g[b].elements[d].pos.s.y
                            });
                            e.push({
                                x: g[b].elements[d].pos.im1.x,
                                y: g[b].elements[d].pos.im1.y
                            });
                            e.push({
                                x: g[b].elements[d].pos.im2.x,
                                y: g[b].elements[d].pos.im2.y
                            });
                            e.push({
                                x: g[b].elements[d].pos.e.x,
                                y: g[b].elements[d].pos.e.y
                            });
                            g[b].elements[d].lineWayPoints = ba(e);
                            ea || (ea = g[b].elements[d].lineWayPoints.length)
                        }
            }
            aa = !0;
            ga = !1;
            O.lockMoving(!0);
            O.lockContextMenu(!0);
            N.lockShapesFocusing(!0);
            N.lockShapesChanging(!0);
            N.lockContextMenu(!0);
            sa = document.querySelectorAll(".anim-elem");
            k(a, ma / (ea / ka) * .95);
            b = document.querySelectorAll("#animation_buttons_panel .ap-button");
            for (d = 0; d < b.length; d++) removeClass(b[d], "button-selected");
            a ? addClass(document.querySelector("#animation_buttons_panel #animation_play_current_frame"), "button-selected") : addClass(document.querySelector("#animation_buttons_panel #animation_play"), "button-selected")

            isEditable(_isEditable);
        }

        function k(a, b) {
            var c =
                g[V],
                d = (g.length - 1) * ea;
            R && D(V);
            la = setInterval(function() {
                if (X >= ea) {
                    ja = {};
                    if (!0 !== a)
                        if (V++, V < g.length) X = X - ea + 1, c = g[V];
                        else if (!0 === Y) {
                        for (var b = X = 0; b < sa.length; b++) sa[b].style.display = "none";
                        V = 1;
                        c = g[V]
                    } else return clearInterval(la), b = 100, R || (b = 750), setTimeout(function() {
                        r()
                    }, b), !1;
                    else if (Y) X = 0;
                    else return clearInterval(la), setTimeout(function() {
                        r()
                    }, 100), !1;
                    R && D(V)
                }
                for (var e in c.elements) c.elements.hasOwnProperty(e) && (c.elements[e].element.style.display = "block", void 0 !== c.elements[e].lineWayPoints ?
                    (0 === e.indexOf("animation_player_") && O.setPlayerPosition(e, {
                        playerPositionRelations: {
                            left: c.elements[e].lineWayPoints[X].x,
                            top: c.elements[e].lineWayPoints[X].y
                        }
                    }), ja[e] = c.elements[e].lineWayPoints[X]) : void 0 === c.elements[e].pos.s ? (0 === e.indexOf("animation_player_") && O.setPlayerPosition(e, {
                            playerPositionRelations: {
                                left: c.elements[e].pos.e.x,
                                top: c.elements[e].pos.e.y
                            }
                        }), void 0 !== M[e] && (0 === e.indexOf("animation_player_") ? (void 0 !== M[e].nmb && O.setPlayerNumber(e, M[e].nmb), void 0 !== M[e].nm && O.setPlayerName(e, M[e].nm), void 0 !== M[e].z && O.setPlayerZindex(e, M[e].z)) : 0 === e.indexOf("animation_ball_") && void 0 !== M[e].nm)) : (0 === e.indexOf("animation_player_") && O.setPlayerPosition(e, {
                        playerPositionRelations: {
                            left: c.elements[e].pos.s.x,
                            top: c.elements[e].pos.s.y
                        }
                    }), 0 === e.indexOf("animation_ball_")));
                    
                ca();
                if (g[V].shapes && g[V].shapes.length)
                    for (b = 0; b < g[V].shapes.length; b++) g[V].shapes[b].show();
                X = V != g.length - 1 && !0 !== a || 1 != ea - X ? X + ka : ea;
                X > ea && (V == g.length - 1 || !0 === a) && (X = ea - 1)
            }, b)
        }

        function r() {  // ESTA FUNCION CONTROLA LOS ESTADOS DE LOS BOTONES
            $("#animation_play").removeClass("button-selected");
            $("#animation_stop").removeClass("button-selected");
            clearInterval(la);
            X = 0;
            V = 1;
            ja = {};
            if (!aa && !ga) return !1;
            ga = aa = !1;
            if (R) p(!0), showElement("#shapes_buttons_panel"),
                N.enable(), !0 === na ? l(H) : 0 < g.length && R && (H = g.length - 1, l(g.length - 1), $("#anim_frames_container").scrollLeft(1E3));
            else {
                hideElement(".anim-elem");
                for (var a in g[1].elements) g[1].elements.hasOwnProperty(a) && showElement("#" + a);
                H = 1;
                l(1);
            }
            a = document.querySelectorAll("#animation_buttons_panel .ap_top_menu_margin");
            for (var b = 0; b < a.length; b++) removeClass(a[b], "button-selected");

            isEditable(_isEditable);
        }

        function A() { // ESTA FUNCION REINICIA TODO LIMPIA
            r();
            y();
            for (var a = document.querySelectorAll('div [id^="btn_anim_frame_"]'), b = 0; b < a.length; b++) a[b].remove();
            O.lockMoving(!1);
            O.lockContextMenu(!1);
            N.lockShapesFocusing(!1);
            N.lockShapesChanging(!1);
            N.lockContextMenu(!1);
            for (var c in M) M.hasOwnProperty(c) && removeClass(document.querySelector("#" + c), "anim-elem");
            showElement("#" + c);
            //p(!0);
            O.reset();
            S = 5;
            m(S);
            Y = !0;
            removeClass(document.querySelector("#animation_buttons_panel #animation_repeat"), "button-selected");
            Y && addClass(document.querySelector("#animation_buttons_panel #animation_repeat"), "button-selected");
            oa && "localStorage" in window && null !== window.localStorage && localStorage.removeItem("animation_" + _boardObj.getType());
            g = [];
            M = {};
            v();
            initIcons();
        }

        function A_ap() { // ESTA FUNCION REINICIA TODO LIMPIA
            r();
            y();
            for (var a = document.querySelectorAll('div [id^="btn_anim_frame_"]'), b = 0; b < a.length; b++) a[b].remove();
            O.lockMoving(!1);
            O.lockContextMenu(!1);
            N.lockShapesFocusing(!1);
            N.lockShapesChanging(!1);
            N.lockContextMenu(!1);
            for (var c in M) M.hasOwnProperty(c) && removeClass(document.querySelector("#" + c), "anim-elem");
            showElement("#" + c);
            p(!0);
            O.reset_ap(); // ESTO RESETEA LOS ICONOS DE LA PANTALLA
            S = 5;
            m(S);
            Y = !0;
            removeClass(document.querySelector("#animation_buttons_panel #animation_repeat"), "button-selected");
            Y && addClass(document.querySelector("#animation_buttons_panel #animation_repeat"), "button-selected");
            oa && "localStorage" in window && null !== window.localStorage && localStorage.removeItem("animation_" + _boardObj.getType());
            g = [];
            M = {};
            v();
            initIcons();
        }

        function B(a) {
            if (2 > g.length) return !0;
            var b = !1,
                c;
            for (c in g[a].elements)
                if (g[a].elements.hasOwnProperty(c) && void 0 !== g[a].elements[c].pos.s && void 0 !== g[a].elements[c].pos.e && (g[a].elements[c].pos.e.x != g[a].elements[c].pos.s.x || g[a].elements[c].pos.e.y != g[a].elements[c].pos.s.y || void 0 !== g[a].elements[c].pos.im1)) {
                    b = !0;
                    break
                }
            return b
        }

        function D(a) { // ESTA FUNCION AÑADE CSS A LOS FRAMES NO A LAS ANIMACIONES
            removeClass(document.querySelector("#btn_anim_start_frame"), "anim-frame-selected");
            for (var b = document.querySelectorAll('div [id^="btn_anim_frame_"]'), c = 0; c < b.length; c++) removeClass(b[c], "anim-frame-selected");
            0 == a ? addClass(document.querySelector("#btn_anim_start_frame"), "anim-frame-selected") : addClass(document.querySelector("#btn_anim_frame_" + a), "anim-frame-selected");
            H = a;
            aa && $("#anim_frames_container").scrollLeft($("#btn_anim_start_frame").width() * a)
        }

        function y() { // ESTA FUNCION ELIMINA LOS ELEMETOS DEL EJERCICIO
            for (var a = document.querySelectorAll(".anim-circle"), b = 0; b < a.length; b++) a[b].remove();
            a = document.querySelectorAll(".anim-circle-touch");
            for (b = 0; b < a.length; b++) a[b].remove();
            a = document.querySelectorAll(".anim-line-way");
            for (b = 0; b < a.length; b++) a[b].remove();
            a = document.querySelectorAll('[id^="anim_clone_"]');
            for (b = 0; b < a.length; b++) a[b].remove()
        }

        function F(a) { // ESTA FUNCION AÑADE LOS FRAMES 
            ia = !0;
            void 0 === a && (a = g.length - 1);
            var b = "btn_anim_frame_" + a,
                c = $("#btn_anim_start_frame").clone();
            c.insertBefore("#btn_anim_add_frame");
            c.attr("id", b);
            document.querySelector("#" + b + " .anim-frame-text").innerHTML = a;
            $(".c2").width();
            $("#anim_frames_container").scrollLeft(1E3);
            c.on("click",
                function() {
                    hideElement(".context-menu");
                    if (!ia) return !1;
                    r();
                    H = a;
                    l(a);
                    return !1
                });
            c.on("mousedown", function(a) {
                hideElement(".context-menu");
                z(a);
                return !1
            });
            c.on("touchstart", function(a) {
                hideElement(".context-menu");
                z(a)
            });
            c.on("contextmenu", t)
        }

        function t() {
            hideElement(".context-menu");
            clearTimeout(wa);
            var a = this.id.replace("btn_anim_frame_", "");
            if (a != H) return !1;
            var b = document.querySelector("#context_menu_frame_button"),
                c = this.offsetWidth,
                d = this.offsetTop,
                e = this.offsetHeight;
            b.style.left = this.offsetLeft + "px";
            b.style.top = d + "px";
            b.style.width = c + "px";
            b.style.height = e + "px";
            d = document.querySelector("#context_menu_frame_button > #remove_frame_button_img");
            d.style.width = c + "px";
            d.style.height = e + "px";
            b.style.display = "block";
            document.querySelector("#context_menu_frame_button > #context_menu_frame_button_index").value = a;
            wa = setTimeout(function() {
                document.querySelector("#context_menu_frame_button").style.display = "none"
            }, 2E3);
            return !1
        }

        function f(a, b) { // ESTA FUNCION CREA LA LINEA DEL MOVIMIENTO CUANDO SE DETIENE EL MOVIMIENTO
            void 0 === b && (b = g.length - 1);
            var c = [];
            c.push({
                x: g[b].elements[a].pos.s.x,
                y: g[b].elements[a].pos.s.y
            });
            c.push({
                x: g[b].elements[a].pos.im1.x,
                y: g[b].elements[a].pos.im1.y
            });
            c.push({
                x: g[b].elements[a].pos.im2.x,
                y: g[b].elements[a].pos.im2.y
            });
            c.push({
                x: g[b].elements[a].pos.e.x,
                y: g[b].elements[a].pos.e.y
            });
            for (var c = ba(c, 13), d = [], e = $("#" + a).width(), f = 0; f < c.length; f++) d.push(e + 55 / 2 + (_boardObj.getSize().width * c[f].x) + "," + (e + 60 / 2 + _boardObj.getSize().height * c[f].y));
            R && g[b].elements[a].line_way.attr("points", d.join(" "));
        }

        function d(a, b) {
            void 0 === b && (b = g.length - 1);
            var c = document.querySelector("#" + a + "_shape").getAttribute("fill");
            var d = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            g[b].elements[a].line_way = $(d).insertBefore($("#" + a));
            g[b].elements[a].line_way.attr("class", "anim-line-way");
            g[b].elements[a].line_way.attr("id", "anim_line_way_" + a);
            g[b].elements[a].line_way.css("fill", "none");
            g[b].elements[a].line_way.css("stroke", c);
            g[b].elements[a].line_way.css("stroke-width", ta);
            g[b].elements[a].line_way.css("stroke-dasharray", 3 * ta + "px," + 4 * ta + "px")
        }

        function U(a, b) { // ESTA FUNCION CREA LOS PUNTOS DE LA LINEA DEL MOVIMIENTO
            var c = "#555",
                c = document.querySelector("#" + a + "_shape").getAttribute("fill"),
                d = Math.ceil(_boardObj.getSize().width * pa) + 8,
                e = $("#" + a).width(),
                f = document.createElementNS("http://www.w3.org/2000/svg", "circle");

                g[b].elements[a].circle_im1 = $(f).insertBefore($("#" + a));
                g[b].elements[a].circle_im1.attr("class", "anim-circle");
                g[b].elements[a].circle_im1.attr("id", "anim_circle_im1_" + a);
                g[b].elements[a].circle_im1.attr("fill", c);
                g[b].elements[a].circle_im1.attr("fill-rule", "nonzero");
                g[b].elements[a].circle_im1.attr("fill-opacity", .8);

                "touch" == AppConfig.clickType && (g[b].elements[a].circle_im1.attr("class", "anim-circle-touch"), g[b].elements[a].circle_im1.attr("stroke", c), g[b].elements[a].circle_im1.attr("fill-opacity", .2), g[b].elements[a].circle_im1.attr("stroke-width", "1px"));
                g[b].elements[a].circle_im1.attr("cx", e + 55 / 2 + _boardObj.getSize().width * g[b].elements[a].pos.im1.x);
                g[b].elements[a].circle_im1.attr("cy", e + 60 / 2 + _boardObj.getSize().height * g[b].elements[a].pos.im1.y);
            
                g[b].elements[a].circle_im1.attr("r", d + "px");
                f = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                g[b].elements[a].circle_im2 = $(f).insertBefore($("#" + a));
                g[b].elements[a].circle_im2.attr("class", "anim-circle");
                g[b].elements[a].circle_im2.attr("id", "anim_circle_im2_" + a);
                g[b].elements[a].circle_im2.attr("fill", c);
                g[b].elements[a].circle_im2.attr("fill-rule", "nonzero");
                g[b].elements[a].circle_im2.attr("fill-opacity", .8);

                "touch" == AppConfig.clickType && (g[b].elements[a].circle_im2.attr("class", "anim-circle-touch"), g[b].elements[a].circle_im2.css("stroke", c), g[b].elements[a].circle_im2.attr("fill-opacity", 0.2), g[b].elements[a].circle_im2.attr("stroke-width", "1px"));
                g[b].elements[a].circle_im2.attr("cx", e + 55 / 2 + _boardObj.getSize().width * g[b].elements[a].pos.im2.x);
                g[b].elements[a].circle_im2.attr("cy", e + 60 / 2 + _boardObj.getSize().height * g[b].elements[a].pos.im2.y);
                g[b].elements[a].circle_im2.attr("r", d + "px");

                "touch" == AppConfig.clickType ? (g[b].elements[a].circle_im1.dragImCircleMobile(a, g[b].elements[a].pos.im1), g[b].elements[a].circle_im2.dragImCircleMobile(a, g[b].elements[a].pos.im2)) : (g[b].elements[a].circle_im1.on("mousedown", function(c) {
                    N.removeAdditionalShapes();
                    hideElement(".context-menu");
                    T($(this), c, a, g[b].elements[a].pos.im1);
                    return !1
                }), g[b].elements[a].circle_im2.on("mousedown", function(c) {
                    N.removeAdditionalShapes();
                    hideElement(".context-menu");
                    T($(this), c, a, g[b].elements[a].pos.im2);
                    return !1
                }))
        }

        function p(a) { // ESTA FUNCION MUESTRA LOS ELEMENTOS BALL
            !1 === a ? (hideElement(".player"), hideElement(".ball")) : (showElement(".player"), showElement(".ball"))
        }

        function ca() {
            if (da && da.length)
                for (var a = 0; a < da.length; a++) da[a].hide()
        }

        function ba(a, b) {
            var c = [],
                d = a.length;
            void 0 === b && (b = 50);
            var e = a.concat();
            e.unshift(a[0]);
            e.push(a[d - 1]);
            for (var f = 1; f < d; f++) {
                var g = e[f].x;
                var h = e[f].y;
                var k = e[f + 1].x;
                var l = e[f + 1].y;
                var m = .5 * (k - e[f - 1].x);
                var n = .5 * (e[f + 2].x - g);
                var p = .5 * (l - e[f - 1].y);
                var q = .5 * (e[f + 2].y - h);
                for (var t = 0; t <= b; t++) {
                    var r = t / b;
                    var u = Math.pow(r, 2);
                    var v = u * r;
                    var w = 3 * u;
                    var x = 2 * v;
                    var y = x - w + 1;
                    x = w - x;
                    r = v - 2 * u + r;
                    v -= u;
                    c.push({
                        x: y * g + x * k + r * m + v *
                            n,
                        y: y * h + x * l + r * p + v * q
                    })
                }
            }
            return c
        }

        function W(a, b) {
            return b ? Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientY + document.body.scrollTop : a.pageY : Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientX + document.body.scrollTop : a.pageX
        }

        function T(a, b, c, d) {  // ESTA FUNCION CONTROLA EL MOVIEMIENTO DE LAS CIRCULOS DE LAS LINEAS   
            function e(b) {
                var e = $("#" + c).width() / 2;
                if (!r) {
                    var g = W(b, 1) + l - n;
                    b = W(b) + k - m;
                    b < h && (b = h);
                    b > _boardObj.getSize().width - h && (b = _boardObj.getSize().width - h);
                    g < 6 * h && (g = 6 * h);
                    g > $("#" + ha).height() - 6 * h && (g = $("#" + ha).height() - 6 * h);
                    q = g + "px";
                    p = b + "px";
                    a.attr("cx", p);
                    a.attr("cy", q);
                    d.x = (b - e) / _boardObj.getSize().width;
                    d.y = (g - e) / _boardObj.getSize().height;
                    f(c, H)
                }
            }

            function g() {
                r = 1;
                document.onmousemove = "";
                document.removeEventListener("mousemove", e);
                document.removeEventListener("mouseup", g);
                w()
            }
            
            var h = Math.ceil(_boardObj.getSize().width * pa),
                k = parseInt(a.attr("cx")),
                l = parseInt(a.attr("cy")),
                m = W(b),
                n = W(b, 1),
                p, q, r;

            document.addEventListener("mousemove", e, !1);
            document.addEventListener("mouseup", g, !1)
        }

        function z(a) {
            function b(a) {
                if (!d) {
                    ia = !1;
                    f = a.clientX;
                    if (a.originalEvent) {
                        var b = a.originalEvent;
                        b.changedTouches ? f = b.changedTouches[0].clientX : b.clientX && (f = a.clientX)
                    }
                    a = h + e - f;
                    $("#anim_frames_container").scrollLeft(a)
                }
            }

            function c(a) {
                d = 1;
                $("#anim_frames_container").off("mousemove.swipe");
                $("#anim_frames_container").off("mouseup.swipe");
                $("#anim_frames_container").off("mouseleave.swipe")
            }
            var d = 0,
                e = a.clientX,
                f = a.clientX;
            if (a.originalEvent) {
                var g = a.originalEvent;
                g.changedTouches ? (e = g.changedTouches[0].clientX, f = g.changedTouches[0].clientX) :
                    g.clientX && (f = e = a.clientX)
            }
            $("#anim_frames_container").on("mousemove.swipe", b);
            $("#anim_frames_container").on("touchmove.swipe", b);
            $("#anim_frames_container").on("mouseup.swipe", function(a) {
                c(a);
                f == e ? ia = !0 : setTimeout(function() {
                    ia = !0
                }, 100)
            });
            $("#anim_frames_container").on("mouseleave.swipe", function(a) {
                c(a);
                ia = !0
            });
            $("#anim_frames_container").on("touchend.swipe", function(a) {
                c(a);
                f == e ? ia = !0 : setTimeout(function() {
                    ia = !0
                }, 100)
            });
            var h = $("#anim_frames_container").scrollLeft()
        }

        function I() {
            if ("localStorage" in window && null !== window.localStorage) {
                var a = +localStorage.getItem("full_screen_ad_appearence_count");
                localStorage.setItem("full_screen_ad_appearence_count", a + 1);
                if (1 !== a % 3) return a++, localStorage.setItem("full_screen_ad_appearence_count", a), !1
            }
            if (a = document.querySelector("#param_remote_ip")) a = a.value;
            if (a = document.querySelector("#param_is_mobile")) a = a.value;
            1 == a && (a = $(window).height(), new ModalWindow({
                width: Math.ceil(.95 * _boardObj.getSize().width),
                height: Math.ceil(.9 * a),
                increasedClosedBtn: 1,
                top: Math.ceil(.02 * $(window).height()),
                html: '<div id="full_screen_ad" style="margin-top:' + Math.ceil(.05 * a) + 'px;"></div>',
                closeButton: !0,
                afterWindowCreatedFunction: function() {
                    $("#full_screen_ad").html('')
                }
            }))
        }

        (function() {
            L(); // CARGAMOS LO EVENTOD

            /* INICIALIZAMOS LAS FUNCIONES */
            N = new ShapesPainter({
                contextMenu: {
                    containerID: "context_menu_shape_animation",
                    onMenuOpen: function(a) {
                        document.querySelector("#context_menu_shape_id_animation").value = a.getId();
                        a = Math.ceil(.015 * _boardObj.getSize().width / 3);
                        document.querySelector("#context_menu_shape_delete_btn_animation").style.padding = a + "px"
                    }
                },
                onShapeAdded: function(a) {
                    g[H].shapes || (g[H].shapes = []);
                    g[H].shapes.push(a);
                    da.push(a);
                    w()
                },
                onShapeChanged: function() {
                    w()
                },
                onShapeRemoved: function(a) {
                    w()
                }
            });
            O = new Players({
                onPlayerMoveStart: G().frameElementMoveStart,
                onPlayerMove:      G().frameElementMove,
                onPlayerMoveEnd:   G().frameElementMoveEnd,
                contextMenu: {
                    containerID: "context_menu_player_animation",
                    onMenuOpen: function(a) {
                        document.querySelector("#context_menu_player_id_animation").value = a.getId();
                        a = Math.ceil(.015 * _boardObj.getSize().width);
                        document.querySelector("#context_menu_player_delete_btn_animation").style.marginTop = a + "px";
                    }
                }
            });

            _linkDataStore.data.animation ? E() : C();

            if (0 < g.length) {
                if (1 < g.length && !R) {
                    p(!1);
                    for (var a in g[1].elements) g[1].elements.hasOwnProperty(a) && showElement("#" + a);
                    H = 1;
                    l(1)
                }
                if (R) {
                    for (var b = 1; b < g.length; b++) F(b);
                    H = g.length - 1;
                    l(g.length - 1);
                    1 < g.length && showElement("#btn_animation_remove_last_frame");
                    showElement("#top_buttons_panel");
                    showElement("#anim_frames_container");
                    $("#anim_frames_container").scrollLeft(1E3)
                }
            } else g = [], M = {}, v();
            for (a in M) M.hasOwnProperty(a) && addClass(document.querySelector("#" + a), "anim-elem");
        })();

        function initGetAnimation(){
            document.querySelectorAll('div [id^="btn_anim_frame_"]').forEach(el => el.remove());

            N = new ShapesPainter({
                contextMenu: {
                    containerID: "context_menu_shape_animation",
                    onMenuOpen: function(a) {
                        document.querySelector("#context_menu_shape_id_animation").value = a.getId();
                        a = Math.ceil(.015 * _boardObj.getSize().width / 3);
                        document.querySelector("#context_menu_shape_delete_btn_animation").style.padding = a + "px"
                    }
                },
                onShapeAdded: function(a) {
                    g[H].shapes || (g[H].shapes = []);
                    g[H].shapes.push(a);
                    da.push(a);
                    w()
                },
                onShapeChanged: function() {
                    w()
                },
                onShapeRemoved: function(a) {
                    w()
                }
            });
            O = new Players({
                onPlayerMoveStart: G().frameElementMoveStart,
                onPlayerMove:      G().frameElementMove,
                onPlayerMoveEnd:   G().frameElementMoveEnd,
                contextMenu: {
                    containerID: "context_menu_player_animation",
                    onMenuOpen: function(a) {
                        document.querySelector("#context_menu_player_id_animation").value = a.getId();
                        a = Math.ceil(.015 * _boardObj.getSize().width);
                        document.querySelector("#context_menu_player_delete_btn_animation").style.marginTop = a + "px";
                    }
                }
            });

            E(); // _linkDataStore.data.animation ? E() : C();

            if (0 < g.length) {
                if (1 < g.length && !R) {
                    p(!1);
                    for (var a in g[1].elements) g[1].elements.hasOwnProperty(a) && showElement("#" + a);
                    H = 1;
                    l(1)
                }
                if (R) {
                    for (var b = 1; b < g.length; b++) F(b);
                    H = g.length - 1;
                    l(g.length - 1);
                    1 < g.length && showElement("#btn_animation_remove_last_frame");
                    showElement("#top_buttons_panel");
                    showElement("#anim_frames_container");
                    $("#anim_frames_container").scrollLeft(1E3)
                }
            } else g = [], M = {}, v();
            for (a in M) M.hasOwnProperty(a) && addClass(document.querySelector("#" + a), "anim-elem");
        
        };

        function isEditable(IS_EDIT){
            if(IS_EDIT == "EDIT_NO"){
                O.lockMoving(!0);
                hide_bars();
            }else{
                O.lockMoving(!1);
                show_bars();
            }

            //corregirObjetos();
        };

        Z.show = function(a) {
            a = a || {};
            I();
            aa = !1;
            ja = {};
            showElement("#top_buttons_panel");
            showElement("#clear_animation_button");
            showElement("#animation_buttons_panel");
            showElement("#anim_frames_container");
            showElement(".anim-frames-arrows");
            showElement(".anim-speed-setters");
            showElement("#animation_play_current_frame");
            showElement("#shapes_buttons_panel");
            1 < g.length && showElement("#btn_animation_remove_last_frame");
            R || (hideElement("#clear_animation_button"), hideElement("#anim_frames_container"), hideElement(".anim-frames-arrows"), hideElement("#animation_play_current_frame"), hideElement("#btn_animation_remove_last_frame"), hideElement("#shapes_buttons_panel"), O.lockMoving(!0), O.lockContextMenu(!0), N.lockShapesFocusing(!0), N.lockShapesChanging(!0), N.lockContextMenu(!0), S = 5, Y = !0);
            R && (N.refreshPanelButtons(), y(), O.show());
            removeClass(document.querySelector("#animation_buttons_panel #animation_repeat"), "button-selected");
            Y && addClass(document.querySelector("#animation_buttons_panel #animation_repeat"), "button-selected");
            m(S);
            Z.refresh();
            x();
            document.querySelector("#shapes_buttons_panel #remove_last_shape").addEventListener("click", G().shapesPainterRemoveLastShape, !1);
            document.querySelector("#shapes_buttons_panel #remove_all_shapes").addEventListener("click", G().shapesPainterRemoveAllShapes, !1)
        };
        Z.hide = function() {
            x();
            r();
            O.hide();
            y();
            if (!R) {
                R = !0;
                A();
                C();
                if (0 < g.length) {
                    for (var a = 1; a < g.length; a++) F(a);
                    H = g.length - 1;
                    for (var b in M) M.hasOwnProperty(b) && addClass(document.querySelector("#" + b), "anim-elem")
                }
                oa = !0;
                showElement("#anim_frames_container");
                $("#anim_frames_container").scrollLeft(1E3)
            }
            hideElement("#clear_animation_button");
            hideElement("#animation_buttons_panel");
            hideElement("#anim_frames_container");
            hideElement(".anim-frames-arrows");
            hideElement(".anim-speed-setters");
            hideElement("#animation_play_current_frame");
            hideElement("#shapes_buttons_panel");
            N.disable()
        };
        Z.refresh = function() {
            var a = Math.ceil(_boardObj.getSize().width * AppConfig.buttonToBoardHeightCoeff),
                b = document.querySelector("#animation_buttons_panel");
                b.style.marginTop = .1 * a + "px";
        
            R && (b.style.zIndex = 101);
            O.refresh();
            N.refresh();
            l();
            R || (document.querySelector("#animation_buttons_panel").style.zIndex = 100000001);
            R && (document.querySelector("#animation_buttons_panel").style.zIndex = 101)
        };
        Z.getPlayers = function() {return O};
        Z.getBalls = function() {return Q};
        Z.getShapesPainter = function() {return N};
        Z.resetFrames = function() {return A};
        Z.initAnimation = function(){return initGetAnimation();};
        Z.play = function(){return a(!1);}
        Z.stop = function(){return r();}
    }; 




/*******************************************
* FUNCIONES
*/

function isTouch() {return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch}

function _run() {_init();}

function _refresh() {
    if ("touch" == AppConfig.clickType && !AppConfig.fullscreenClicked) return !0;
    hideElement(".context-menu");
    hideElement("#modal_window");
    hideElement("#modal_window_bg");
    _boardObj.refresh();

    _scrollBoard();
    AppConfig.fullscreenClicked = !1
}

function _init() {
    //localStorage.removeItem('animation_PADEL');

    _linkDataStore = new LinkDataStore;
    _boardObj      = BoardHelpers.boardFactory();
    _projectTexts  = new AppTexts;

    _boardObj.init();
    
    setInfoUser(localStorage.getItem('LS_USER_AUTENTIFICADO'));
}

function _scrollBoard() {
    _scrollTimer && clearTimeout(_scrollTimer);
    _scrollTimer = setTimeout(function() {
        var J = Math.ceil(.8 * $("#board").offset().top);
        if (!J || isNaN(J)) J = 0;
        $("HTML, BODY").animate({
            scrollTop: J
        }, 1E3)
    }, 1E3)
}

function _hideElements() {
    $(".context-menu").hide();
    shapesPainter.removeAdditionalShapes();
    var J = $("#modal_window"),
        q = $("#modal_window_bg");
    J && J.hide();
    q && q.hide()
}

function savExercise() {
    animate_btn_save_stop();

    var IDEJERCICIO      = localStorage.getItem('LS_ID_EJERCICIO'),
        IDPLANIFICACION  = localStorage.getItem('LS_ID_PLANIFICACION'),
        TITULO           = localStorage.getItem('LS_TITLE_EJERCICIO'),
        DESCRIPCION      = localStorage.getItem('LS_DESCRIPTION_EJERCICIO'),
        CODIGO_EJERCICIO = localStorage.getItem('LS_CODIGO_EJERCICIO'),
        PISTA_EJERCICIO  = localStorage.getItem('LS_PISTA_EJERCICIO');
        TEMPLATE         = "";

    $.ajax({
        type: "GET",
        headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
        url: URL_SERVER+"tengoAcceso/mod_ejercicios",
        dataType: 'json',
        data: { idEjercicio : IDEJERCICIO },
        success: function (data){
            if(data.tengo_acceso == "SI"){
                if(data.error_mod == true){
                    app.dialog.alert(data.num_mensaje);
                }else{
                    ////////////////////////////////
                    if(localStorage.LS_ID_EJERCICIO === undefined){
                        app.dialog.alert('<p>Tienes que crear o seleccionar un ejercicio antes de cualquier acción.</p>');
                    }else{
                        var CODIGO_HIDEN = localStorage.getItem('LS_USER_ID') == 3 ? "text" : "hidden"
                    
                        TEMPLATE = '<div class="sheet-modal" style="z-index:111115;">'+
                                '<div class="toolbar">'+
                                '<div class="toolbar-inner">'+
                                    '<div class="left"></div>'+
                                    '<div class="right">'+
                                    '<a class="link sheet-close">Cerrar</a>'+
                                    '</div>'+
                                '</div>'+
                                '</div>'+
                                '<div class="sheet-modal-inner">'+
                                '<div class="block">'+
                                    '<p><hr></p>'+
                                    '<form class="form" id="formEjerciciosAA"><input type="hidden" name="txtPistaEjercicio" id="txtPistaEjercicio" value="'+PISTA_EJERCICIO+'" /> <input type="hidden" name="txtIdPlanificacion" id="txtIdPlanificacion" value="'+IDPLANIFICACION+'" /> <input type="hidden" name="txtIdEjercicio" id="txtIdEjercicio" value="'+IDEJERCICIO+'" /> <input name="txtCodigoEjercicio" type="'+CODIGO_HIDEN+'" class="input feedback-input" id="txtCodigoEjercicio" value="'+CODIGO_EJERCICIO+'" placeholder="Codigo" /> <input name="txtTituloEjercicio" type="text" class="input feedback-input" placeholder="Nombre ejercicio" id="txtTituloEjercicio" value="'+TITULO+'" /> <textarea name="txtDescripcionEjercicio" class="textarea feedback-input" id="txtDescripcionEjercicio" placeholder="Descripcion del ejercicio">'+DESCRIPCION+'</textarea><input type="button" value="Guardar" onclick="saveEjercicioAA();" id="button-blue"/></form>'+
                                '</div>'+
                                '</div>'+
                            '</div>';
                        dynamicSheet = app.sheet.create({
                            content: TEMPLATE, 
                            on: {
                                open: function (sheet) {  },
                                opened: function (sheet) {  },
                            }
                        });
                        dynamicSheet.open();
                    }
                    ////////////////////////////////
                }
            }else{
                app.dialog.alert(data.mensaje);
            }
                                
        }
    }); 
}

/* *****  A C C I O N E S  ****** */
var dynamicSheet = "";
function saveEjercicioAA(){
       
    var OBJETOS          = localStorage.getItem("animation_PADEL");
    var ID_EJERCICIO     = $("#txtIdEjercicio").val();
    var ID_PLANIFICACION = $("#txtIdPlanificacion").val();
    var METODO           = (ID_EJERCICIO == 0) ? "POST" : "PUT";
    var URL              = (ID_EJERCICIO == 0) ? "" : "/"+ID_EJERCICIO;

    if($('#txtTituloEjercicio').val() == ''){
        app.dialog.alert('<p>Tienes que añadir un titulo al ejercicio.</p>');
    }else{
        var form_data = $("#formEjerciciosAA").serialize() + "&txtObjetos="+OBJETOS;

        $.ajax({
            type: METODO,
            headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
            url: URL_SERVER+"ejercicio"+URL,
            dataType: 'json',
            data:form_data,
            statusCode: { 
                401: function (error) { 
                    app.loginScreen.open('.ap-login-screen');
                },
                400: function (data) {
                    console.log(data);
                    app.dialog.alert('<p>'+data.responseJSON.message+'</p>');
                }
            },
            success: function (data){          
                if(data.error === "true"){
                    app.dialog.alert('<p>'+data.message+'</p>');
                }else{
                    if(data.message == 'AP_INSERT'){
                        app.dialog.alert('<p>Ejercicio creado con exito.</p>');                            
                    }
                    if(data.message == 'AP_UPDATE'){
                        app.dialog.alert('<p>Ejercicio actualizado con exito.</p>');
                    }

                    $(".txtCardTitleEjercicio").text(data.TITULO);
                    $("#lblTitleHeader").text(data.TITULO);
                    $("#txtCardInfoEjercicio").html(data.DESCRIPCION);

                    localStorage.setItem('LS_ID_EJERCICIO', data.ejercicio_id);
                    localStorage.setItem('LS_CODIGO_EJERCICIO', data.CODIGO );
                    localStorage.setItem('LS_TITLE_EJERCICIO', data.TITULO );
                    localStorage.setItem('LS_DESCRIPTION_EJERCICIO', data.DESCRIPCION );  
                    localStorage.setItem('LS_PISTA_EJERCICIO', data.PISTA);
                    
                    //corregirObjetos();
                    loadEjercicios();	
                    loadEjerciciosPlantilla();
                    dynamicSheet.close();
                }
            }
        });

    }   
}

function loadEjercicios(){
    var HTML_1 = "";

    _pages[_currentPage].stop();

    $.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"listEjerciciosUser",
		dataType: 'json',
		success: function (data){
			$.each(data.Ejercicios, function(index, item) {
                var ICON_ADMIN = "";
                if(item.edit == "EDIT_NO"){
                    ICON_ADMIN = '<img src="images/eye.png" style="width:15px;"> ';
                }else{
                    ICON_ADMIN = '<img src="images/lapiz.png" style="width:15px;"> ';
                }

                if(item.id != 0){
                    HTML_1 += "<li class=\"item-content\" data-edit="+item.edit+" onclick=\"getEjercicioByIdUser('"+item.id+"', 0); app.sheet.close('.my_modal_list_ejercicios');\"> <div class=\"item-inner\"> <div class=\"item-title item_title_ejercicio\" style=\"text-align:left;white-space: normal;width:100%;\"> <div style=\"float:left;padding-right:5px;\">"+ICON_ADMIN+"</div>  <div style=\"\">"+item.title+"</div> </div> </div> </li>";
			    }
            });   
			
            $("#ulEjercicios").html(HTML_1);

            searchbarEjercicios = app.searchbar.create({
                el: '.ap_searchbar_ejercicio',
                searchContainer: '.list_ejercicio',
                searchIn: '.item_title_ejercicio',
                on: {
                  search(sb, query, previousQuery) {
                    console.log(query, previousQuery);
                  }
                }
            });
        },
        error: function(request,status,errorThrown) {
            if (request.status == 401) {
                app.loginScreen.close('.ap-ejercicios-screen');
                app.loginScreen.open('.ap-login-screen');
            } 
       }
    }); 

    return false;
}

function loadEjerciciosPlantilla(){
    var HTML_1 = "";

    _pages[_currentPage].stop();
    
    $.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"listEjercicios",
		dataType: 'json',
		success: function (data){
			$.each(data.Ejercicios, function(index, item) {
                HTML_1 += "<li class=\"item-content\" onclick=\"getEjercicioByIdPlantilla("+item.id+", 0); app.sheet.close('.my_modal_list_ejercicios');\"> <div class=\"item-inner\"> <div class=\"item-title item_title_ejercicio\" style=\"white-space: normal;\">"+item.title+"</div> </div> </li>";			
			});   
			
            $("#ulEjercicios").html(HTML_1);
            
            searchbarEjercicios = app.searchbar.create({
                el: '.ap_searchbar_ejercicio',
                searchContainer: '.list_ejercicio',
                searchIn: '.item_title_ejercicio',
                on: {
                  search(sb, query, previousQuery) {
                    console.log(query, previousQuery);
                  }
                }
            });
        },
        error: function(request,status,errorThrown) {
            if (request.status == 401) {
                app.loginScreen.close('.ap-ejercicios-screen');
                app.loginScreen.open('.ap-login-screen');
            } 
       }
    });    

    $("#divContentModalPlantilla").append('</ul></div>');

    return false;
}

function getEjercicioFromCalendar(ID){
    var TIPO   = "ANIMATION";
    var TIPO1  = TIPO.toLowerCase(); 

        localStorage.setItem('LS_ID_EJERCICIO', ID);
        localStorage.setItem('LS_TYPE', TIPO);

        var q = TIPO1;
        var J = ID;

        _linkDataStore = new LinkDataStore;
        _linkDataStore.get(q, J, 0);
        BoardHelpers.showPage(q);

        
    $.ajax({
		type: "GET",
		headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
		url: URL_SERVER+"getEjercicio/"+ID,
		dataType: 'json',
        statusCode: { 
            401: function (error) { 
                app.loginScreen.open('.ap-login-screen');
            } 
        },
		success: function (data){
            localStorage.setItem('LS_TITLE_EJERCICIO', data.titulo);
            localStorage.setItem('LS_DESCRIPTION_EJERCICIO', data.descripcion);   
            localStorage.setItem('LS_CODIGO_EJERCICIO', data.cod_ejercicio);  
        }
    });

    return false;
}

function existeObjeto(OBJETO){

    var DATA = JSON.parse(localStorage.getItem("animation_PADEL"));
    var VALOR = false;

    $.each(DATA.frames_elements, function(i, v) {
        if(i == OBJETO){ VALOR = true; }
    });
   
    return VALOR;
}

function anterior_Menu_Animation(){  
    $('#players_section > .player_animation').each(function() {
        var THIS      = this.id,
            ID        = $('#'+ this.id +'_shape'),
            POS_LEFT  = ID.attr("x");
            NUW_VALOR = parseInt(POS_LEFT) + 60; 

        var OBJETO = existeObjeto(THIS);

        if(OBJETO){
            //return false;
        }else{
            CLASS = $('#'+THIS ).attr('class').split(' ')[2];
            if(CLASS != "anim-elem"){
                $('#'+ THIS +'_shape').attr("x", NUW_VALOR);
            }            
        }    
    });
}

function siguiente_Menu_Animation(){
    $('#players_section > .player_animation').each(function() {
        var THIS      = this.id,
            ID        = $('#'+ this.id +'_shape'),
            POS_LEFT  = ID.attr("x");
            NUW_VALOR = parseInt(POS_LEFT) - 60; 

        var OBJETO = existeObjeto(THIS);

        if(OBJETO){
            //return false;
        }else{
            CLASS = $('#'+THIS ).attr('class').split(' ')[2];
            if(CLASS != "anim-elem"){
                $('#'+ THIS +'_shape').attr("x", NUW_VALOR);
            } 
        }   
        
    
    });
}

function addEjercicio(){
    
    localStorage.setItem('animation_PADEL', '{"frames":[{"elements":{}}],"frames_elements":{},"speed":5,"repeat":1}');                
    localStorage.setItem('LS_TYPE', "ANIMATION");
    BoardHelpers.showPage("animation"); 

    localStorage.setItem('LS_ID_EJERCICIO', 0);
    localStorage.setItem('LS_CODIGO_EJERCICIO', "");
    localStorage.setItem('LS_TITLE_EJERCICIO', "");
    localStorage.setItem('LS_DESCRIPTION_EJERCICIO', "");  

    app.popover.close('.popover-app-ejercicio');

    savExercise();
    initIcons();
}

function resetEjercicio(){               
    localStorage.setItem('animation_PADEL', '{"frames":[{"elements":{}}],"frames_elements":{},"speed":5,"repeat":1}');                      
    localStorage.setItem('LS_TYPE', "ANIMATION");
    localStorage.setItem('LS_ID_EJERCICIO', 0);
    localStorage.setItem('LS_ID_PLANIFICACION', 0);
    localStorage.setItem('LS_PISTA_EJERCICIO', "pista.png");
    
    localStorage.setItem('LS_CODIGO_EJERCICIO', "");
    localStorage.setItem('LS_TITLE_EJERCICIO', "");
    localStorage.setItem('LS_DESCRIPTION_EJERCICIO', ""); 

    loadPlanificacionItems(localStorage.getItem('LS_ID_PLANIFICACION_LOAD'), localStorage.getItem('LS_TRIMESTRE_PLANIFICACION_LOAD'), localStorage.getItem('LS_TITULO_PLANIFICACION_LOAD'));

    BoardHelpers.showPage("animation");
    show_bars();
}

function hide_bars(){
    $("#top_buttons_panel").hide();
    $("#shapes_buttons_panel").hide();
    $("#save_button").hide();
    $("#clear_animation_button").hide();
    $("#list_ejercicios").hide();
    $("#btn_pistas").hide();
    $("#btnAddEjercicio").hide();
    $("#btnDeleteEjercicio").hide();
    $("#btn_Anterior_Menu_Animation").hide();
    $("#btn_Siguiente_Menu_Animation").hide();
    $("#lblTitleHeader").css("width", "calc(100% - 100px)");

    $('#players_section > .player_animation').each(function() {
        var THIS   = this.id,
            OBJETO = existeObjeto(THIS);

        if(OBJETO){
            //return false;
        }else{
            CLASS = $('#'+THIS ).attr('class').split(' ')[2];
            if(CLASS != "anim-elem"){
                $('#'+ THIS +'_shape').parent().hide();
            } 
        }   
    });
}

function show_bars(){
    $("#top_buttons_panel").show();
    $("#shapes_buttons_panel").show();
    $("#save_button").show();
    $("#clear_animation_button").show();
    $("#list_ejercicios").show();
    $("#btn_pistas").show();
    $("#btnAddEjercicio").show();
    $("#btnDeleteEjercicio").show();
    $("#btn_Anterior_Menu_Animation").show();
    $("#btn_Siguiente_Menu_Animation").show();
    $("#lblTitleHeader").css("width", "calc(100% - 175px)");

    $('#players_section > .player_animation').each(function() {
        var THIS   = this.id,
            OBJETO = existeObjeto(THIS);

        if(OBJETO){
            //return false;
        }else{
            CLASS = $('#'+THIS ).attr('class').split(' ')[2];
            if(CLASS != "anim-elem"){
                $('#'+ THIS +'_shape').parent().show();
            } 
        }   
    });
}

function openEjercicio(){
    $OBJETO = '{"frames":[{"elements":{}}],"frames_elements":{},"speed":5,"repeat":0}';

    localStorage.setItem('animation_PADEL', $OBJETO);
    localStorage.setItem('LS_ID_PLANIFICACION', 0);
    localStorage.setItem('LS_TITLE_EJERCICIO', "");
    localStorage.setItem('LS_DESCRIPTION_EJERCICIO', "");   
    localStorage.setItem('LS_CODIGO_EJERCICIO', ""); 
    localStorage.setItem('LS_ID_EJERCICIO', 0); 

    $(".txtCardTitleEjercicio").text("");
    $("#lblTitleHeader").text("");
    $("#txtCardInfoEjercicio").html("");
        
    var Y = $("#animation_player_1_1_shape").attr("y");

    BoardHelpers.showPage("animation");
    _linkDataStore.get('ADMIN', 0, 0);

    show_bars();
    initIcons();
}

function isRol(IDROL, MENSAGE){
    if(IDROL == 1){
        app.dialog.alert(MENSAGE);
    }

    return false;
}

function initIcons(){
    var NUM_LARGO = AppConfig.playersColors.length;
    var NUM_CORTO = AppConfig.playersCount;
    var ALTO      = $( window ).height();
    
    for (var i = 1; i <= NUM_CORTO; i++) {
        for (var ii = 1; ii <= NUM_LARGO; ii++) {
            var VALOR    = document.getElementById("animation_player_"+i+"_"+ii+"_shape").getAttribute("y");
            var NEWVALOR = VALOR - 85;
            if(NEWVALOR != VALOR){
                //document.getElementById("animation_player_"+i+"_"+ii+"_shape").setAttribute("y", VALOR - 115);
                document.getElementById("animation_player_"+i+"_"+ii+"_shape").setAttribute("y", ALTO - 115);
            }
        }
    }
}

function corregirObjetos(){
    document.querySelectorAll('div [id^="anim_clone_animation_player_"]').forEach(el => el.setAttribute("x", el.getAttribute("x") - 20) );
}

function animate_btn_save_play(){
    $("#save_button").addClass("animated");
    $("#save_button").addClass("flash"); 
    return false;
}

function animate_btn_save_stop(){
    $("#save_button").removeClass("animated");
    $("#save_button").removeClass("flash"); 
    return false;
}


//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// FUNCIONES QUE ABREN EL MODULO EJERCICIO DESDE LAS PLANIFICACIONES
function abrir_items_planificacion(THIS){ 
    URL = $(THIS).attr("data-url"); 
    ////////////////////////////////
    app.preloader.hide();
    mainView.router.navigate(URL); 
    ////////////////////////////////

    /*$.ajax({
        type: "GET",
        headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
        url: URL_SERVER+"tengoAcceso/mod_planificacion",
        dataType: 'json',
        success: function (data){
            if(data.tengo_acceso == "SI"){
                if(data.error_mod == true){
                    ////////////////////////////////
                    app.preloader.hide();
                    app.dialog.alert(data.num_mensaje);
                    ////////////////////////////////
                   
                }else{
                    ////////////////////////////////
                    app.preloader.hide();
                    mainView.router.navigate(URL); 
                    ////////////////////////////////
                }
            }else{
                app.dialog.alert(data.mensaje);
            }
                                
        }
    });  */
    
    return false;
}
function abrir_ejercicio_desde_planificacion(EDITABLE, ID, IDPLANIFICACION, LOTENGO, CREADO){   

    ////////////////////////////////
    if(CREADO == 0){
        if(localStorage.getItem("LS_USER_ID") == 3){
            //_linkDataStore.get('ADMIN', 0, 0);
            //BoardHelpers.showPage('animation');
            getEjercicioById(ID, IDPLANIFICACION); 
            app.loginScreen.open('.ap-ejercicios-screen');
            
        }else{
            app.dialog.alert('<p>Este ejercicio aun no ha sido creado.</p>'); 
        }    
        
    }else{
        getEjercicioById(ID, IDPLANIFICACION); 
        app.loginScreen.open('.ap-ejercicios-screen');
        
        hide_bars();
    }
    ////////////////////////////////  
    
    return false;
}

function abrir_ejercicio_desde_planificacionUser(ID, IDPLANIFICACION, LOTENGO, CREADO){  
    getEjercicioByIdUserMiPlanificacion(ID, IDPLANIFICACION);
    app.loginScreen.open('.ap-ejercicios-screen');
    
    return false;
}

function getEjercicioByIdPlantilla(ID, IDPLANIFICACION){ 
    animate_btn_save_play();

    if(localStorage.getItem('LS_ID_PLANIFICACION') == 0){
        localStorage.setItem('LS_ID_PLANIFICACION', IDPLANIFICACION);
    }    

    $.ajax({
        type: "GET",
        headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
        url: URL_SERVER+"tengoAcceso/mod_ejercicios",
        dataType: 'json',
        success: function (data){
            if(data.tengo_acceso == "SI"){
                if(data.error_mod == true){
                    app.dialog.alert(data.num_mensaje);
                }else{
                    ////////////////////////////////
                    $.ajax({
                        type: "GET",
                        headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
                        url: URL_SERVER+"getEjercicioByIdPlantilla/"+ID,
                        dataType: 'json',
                        statusCode: { 
                            401: function (error) { 
                                app.loginScreen.open('.ap-login-screen');
                            },
                            404: function (error) {
                                if( error.responseJSON.existe == 1 ){
                                    changePistaEjercicios(error.responseJSON.pista);
                
                                    $(".txtCardTitleEjercicio").text(error.responseJSON.titulo);
                                    $("#lblTitleHeader").text(error.responseJSON.titulo);
                                    $("#txtCardInfoEjercicio").html(error.responseJSON.descripcion);
                                    
                                    localStorage.setItem('animation_PADEL', error.responseJSON.objeto);
                                    localStorage.setItem('LS_TITLE_EJERCICIO', error.responseJSON.titulo);
                                    localStorage.setItem('LS_DESCRIPTION_EJERCICIO', error.responseJSON.descripcion);   
                                    localStorage.setItem('LS_CODIGO_EJERCICIO', error.responseJSON.cod_ejercicio); 
                                    localStorage.setItem('LS_ID_EJERCICIO', 0); 
                                            
                                    _linkDataStore.get("ADMIN", error.responseJSON.idEjercicio, 0);
                                    _pages[_currentPage].initAnimation();
                                    _pages[_currentPage].play();
                
                                    show_bars();
                                    _isEditable = "EDIT_SI";
                                }                   
                                
                                app.dialog.alert(error.responseJSON.message);
                            }
                        },
                        success: function (data){
                            changePistaEjercicios(data.pista);
                
                            $(".txtCardTitleEjercicio").text(data.titulo);
                            $("#lblTitleHeader").text(data.titulo);
                            $("#txtCardInfoEjercicio").html(data.descripcion);
                            
                            localStorage.setItem('animation_PADEL', data.objeto);
                            localStorage.setItem('LS_TITLE_EJERCICIO', data.titulo);
                            localStorage.setItem('LS_DESCRIPTION_EJERCICIO', data.descripcion);   
                            localStorage.setItem('LS_CODIGO_EJERCICIO', data.cod_ejercicio); 
                            localStorage.setItem('LS_ID_EJERCICIO', 0); 
                                    
                            _linkDataStore.get("ADMIN", data.idEjercicio, 0);
                            _pages[_currentPage].initAnimation();
                            _pages[_currentPage].play();
                
                            show_bars();
                            initIcons();
                            _isEditable = "EDIT_SI";
                        }
                    });
                    ////////////////////////////////
                }
            }else{
                app.dialog.alert(data.mensaje);
            }
                                
        }
    }); 

    return false;
}

function getEjercicioById(ID, IDPLANIFICACION){ 
    localStorage.setItem('LS_ID_PLANIFICACION', IDPLANIFICACION);

    if(ID == 0){
        localStorage.setItem('LS_ID_EJERCICIO', 0);
        localStorage.setItem('LS_CODIGO_EJERCICIO', "");
        localStorage.setItem('LS_TITLE_EJERCICIO', "");
        localStorage.setItem('LS_DESCRIPTION_EJERCICIO', "");  
    }else{  
        $.ajax({
            type: "GET",
            headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
            url: URL_SERVER+"getEjercicioById/"+ID,
            dataType: 'json',
            statusCode: { 
                401: function (error) { 
                    app.loginScreen.open('.ap-login-screen');
                },
                404: function (error) {
                    if( error.responseJSON.existe == 1 ){
                        changePistaEjercicios(error.responseJSON.pista);

                        $(".txtCardTitleEjercicio").text(error.responseJSON.titulo);
                        $("#lblTitleHeader").text(error.responseJSON.titulo);
                        $("#txtCardInfoEjercicio").html(error.responseJSON.descripcion);
                        
                        localStorage.setItem('animation_PADEL', error.responseJSON.objeto);
                        localStorage.setItem('LS_TITLE_EJERCICIO', error.responseJSON.titulo);
                        localStorage.setItem('LS_DESCRIPTION_EJERCICIO', error.responseJSON.descripcion);   
                        localStorage.setItem('LS_CODIGO_EJERCICIO', error.responseJSON.cod_ejercicio); 
                        localStorage.setItem('LS_ID_EJERCICIO', error.responseJSON.idEjercicio); 
                                
                        _linkDataStore.get("ADMIN", error.responseJSON.idEjercicio, 0);
                        _pages[_currentPage].initAnimation();
                        _pages[_currentPage].play();

                        if( localStorage.getItem("LS_USER_ID") != 3){
                            error.responseJSON.edit == "EDIT_SI" ? openPopover('#save_button', '<b>¡Recuerda!</b><br><i>Guarda el ejercicio si lo modificas</i>') : null;
                            error.responseJSON.edit == "EDIT_SI" ? show_bars() : hide_bars();
                            _isEditable = error.responseJSON.edit;
                        }else{
                            show_bars();
                            _isEditable = "EDIT_SI";
                        }
                    }                 
                    
                    app.dialog.alert(error.responseJSON.message);
                }
            },
            success: function (data){
                BoardHelpers.showPage("animation");
                _linkDataStore.get('ADMIN', 0, 0);
                changePistaEjercicios(data.pista);

                $(".txtCardTitleEjercicio").html(data.titulo);
                $("#lblTitleHeader").text(data.titulo);
                $("#txtCardInfoEjercicio").html(data.descripcion);
                
                localStorage.setItem('animation_PADEL', data.objeto);
                localStorage.setItem('LS_TITLE_EJERCICIO', data.titulo);
                localStorage.setItem('LS_DESCRIPTION_EJERCICIO', data.descripcion);   
                localStorage.setItem('LS_CODIGO_EJERCICIO', data.cod_ejercicio); 
                localStorage.setItem('LS_ID_EJERCICIO', data.idEjercicio); 
                        
                _linkDataStore.get("ADMIN", data.idEjercicio, 0);
                _pages[_currentPage].initAnimation();
                _pages[_currentPage].play();

                if( localStorage.getItem("LS_USER_ID") != 3){
                    // isRol(data.rol, 'Recuerda que con esta licencia te quedan solo '+data.queda+' visualizaciones más');
                    data.edit == "EDIT_SI" ? openPopover('#save_button', '<b>¡Recuerda!</b><br><i>Guarda el ejercicio si lo modificas</i>') : null;
                    data.edit == "EDIT_SI" ? show_bars() : hide_bars();
                    _isEditable = data.edit;
                }else{
                    show_bars();
                    _isEditable = "EDIT_SI";
                }
                
            }
        });
    }

    return false;
}

function getEjercicioByIdUserMiPlanificacion(ID, IDPLANIFICACION){ 
    localStorage.setItem('LS_ID_PLANIFICACION', IDPLANIFICACION);

    if(ID == 0){
        localStorage.setItem('LS_ID_EJERCICIO', 0);
        localStorage.setItem('LS_CODIGO_EJERCICIO', "");
        localStorage.setItem('LS_TITLE_EJERCICIO', "");
        localStorage.setItem('LS_DESCRIPTION_EJERCICIO', "");  

    }else{  
        $.ajax({
            type: "GET",
            headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
            url: URL_SERVER+"getEjercicioByIdUserMiPlanificacion/"+ID,
            dataType: 'json',
            success: function (data){
                BoardHelpers.showPage("animation");
                _linkDataStore.get('USER', 0, 0); 
                changePistaEjercicios(data.pista);

                $(".txtCardTitleEjercicio").text(data.titulo);
                $("#lblTitleHeader").text(data.titulo);
                $("#txtCardInfoEjercicio").html(data.descripcion);
                
                localStorage.setItem('animation_PADEL', data.objeto);
                localStorage.setItem('LS_TITLE_EJERCICIO', data.titulo);
                localStorage.setItem('LS_DESCRIPTION_EJERCICIO', data.descripcion);   
                localStorage.setItem('LS_CODIGO_EJERCICIO', data.cod_ejercicio); 
                localStorage.setItem('LS_ID_EJERCICIO', data.idEjercicio); 
                        
                _linkDataStore.get("USER", data.idEjercicio, 0);
                _pages[_currentPage].initAnimation();
                _pages[_currentPage].play();

                show_bars();
                _isEditable = "EDIT_SI";
                initIcons();
                $("#btnAddEjercicio").hide();
            }
        });
    }

    return false;
}

function getEjercicioByIdUser(ID, IDPLANIFICACION){ 
    localStorage.setItem('LS_ID_PLANIFICACION', IDPLANIFICACION);

    if(ID == 0){
        localStorage.setItem('LS_ID_EJERCICIO', 0);
        localStorage.setItem('LS_CODIGO_EJERCICIO', "");
        localStorage.setItem('LS_TITLE_EJERCICIO', "");
        localStorage.setItem('LS_DESCRIPTION_EJERCICIO', "");  
    }else{  
        $.ajax({
            type: "GET",
            headers: {"Authorization": localStorage.getItem("LS_USER_API_KEY")},
            url: URL_SERVER+"getEjercicioByIdUser/"+ID,
            dataType: 'json',
            statusCode: { 
                401: function (error) { 
                    app.loginScreen.open('.ap-login-screen');
                }
            },
            success: function (data){
                changePistaEjercicios(data.pista);

                if( (data.objeto == "") || (data.objeto == "null") ){
                    $OBJETO = '{"frames":[{"elements":{}}],"frames_elements":{},"speed":5,"repeat":0}';
                }else{
                    $OBJETO = data.objeto;
                }

                $(".txtCardTitleEjercicio").text(data.titulo);
                $("#lblTitleHeader").text(data.titulo);
                $("#txtCardInfoEjercicio").html(data.descripcion);
                
                localStorage.setItem('animation_PADEL', $OBJETO);
                localStorage.setItem('LS_TITLE_EJERCICIO', data.titulo);
                localStorage.setItem('LS_DESCRIPTION_EJERCICIO', data.descripcion);   
                localStorage.setItem('LS_CODIGO_EJERCICIO', data.cod_ejercicio); 
                localStorage.setItem('LS_ID_EJERCICIO', data.idEjercicio); 
                        
                _linkDataStore.get("USER", data.idEjercicio, 0);
                _pages[_currentPage].initAnimation();
                _pages[_currentPage].play();
                
                //isRol(data.rol, 'Recuerda que con esta licencia te quedan solo '+data.queda+' visualizaciones más');
                data.edit == "EDIT_SI" ? openPopover('#save_button', '<b>¡Recuerda!</b><br><i>Guarda el ejercicio si lo modificas</i>') : null;
                data.edit == "EDIT_SI" ? show_bars() : hide_bars();
                _isEditable = data.edit;
            
                show_bars();
                initIcons();
            }
        });
    }

    return false;
}

function recortaDatos(dato,longitud){
    var respuesta = dato;
    if(dato.length>longitud){
    respuesta = dato.substring(0,longitud-3)+"...";
    }
    return respuesta;
}

function loadPlanificacionItems(ID, TRIMESTRES, TITLE){

    if((ID > 0) && (ID <=40)){ 
        $("#txtTitulo3").html("Menores : Base"); 
        $("#txtTrimestre2").html( "Semana "+(ID) );
        $("#txtTrimestre3").html(recortaDatos(TITLE, 50));
        $("#txtCardTitleEjercicio").html(TITLE);
    }

    if((ID > 40) && (ID <=80)){ 
        $("#txtTitulo3").html("Menores : Avanzado"); 
        $("#txtTrimestre2").html( "Semana "+(ID - 40) );
        $("#txtTrimestre3").html(recortaDatos(TITLE, 50));
        $("#txtCardTitleEjercicio").html(TITLE);
    }

    if((ID > 80) && (ID <=120)){ 
        $("#txtTitulo3").html("Menores : Competición"); 
        $("#txtTrimestre2").html( "Semana "+(ID - 80) );
        $("#txtTrimestre3").html(recortaDatos(TITLE, 50));
        $("#txtCardTitleEjercicio").html(TITLE);
    }

    if((ID > 120) && (ID <=160)){ 
        $("#txtTitulo3").html("Adultos : Iniciación"); 
        $("#txtTrimestre2").html( "Semana "+(ID - 120) );
        $("#txtTrimestre3").html(recortaDatos(TITLE, 50));
        $("#txtCardTitleEjercicio").html(TITLE);
    }

    if((ID > 160) && (ID <=200)){ 
        $("#txtTitulo3").html("Adultos : Intermedio"); 
        $("#txtTrimestre2").html( "Semana "+(ID - 160) );
        $("#txtTrimestre3").html(recortaDatos(TITLE, 50));
        $("#txtCardTitleEjercicio").html(TITLE);
    }

    if((ID > 200) && (ID <=240)){ 
        $("#txtTitulo3").html("Adultos : Competición"); 
        $("#txtTrimestre2").html( "Semana "+(ID - 200) );
        $("#txtTrimestre3").html(recortaDatos(TITLE, 50));
        $("#txtCardTitleEjercicio").html(TITLE);
    }


    var API_USER = localStorage.getItem("LS_USER_API_KEY");
    var HTML  = "";

    $.ajax({
        type: "GET",
        headers: {"Authorization": API_USER},
        url: URL_SERVER+"planificacionItems/"+ID+"/1",
        dataType: 'json',
        success: function (data){
            $.each(data.PLANIFICACIONITEM, function(index, item) {
                var IDITEM = item.id;
                HTML += '<div class="card">';
                HTML += '<div class="card-content card-content-padding">';
                HTML += '<b class="ap_card-title ap-accordion" onclick="ap_accordion(this);" style="text-transform:uppercase;">'+ item.tema +'</b>';
                HTML += '<div class="ap-panel" id="liItemsDiv'+IDITEM+'">';
                
                    var HTML2 = '';
                    $.ajax({
                        type: "GET",
                        headers: {"Authorization": API_USER},
                        url: URL_SERVER+"planificacionItems/"+IDITEM+"/3",
                        dataType: 'json',
                        success: function (data){
                            $.each(data.PLANIFICACIONITEM, function(index, item) {
                                var IDITEM2 = item.id;
                                HTML2 += '<h3 style="text-align:center;text-transform:uppercase;">'+ item.descripcion +'</h3>';
                                HTML2 += '<ul id="liItemliItemsDivOtrosDiv'+IDITEM2+'">';

                                var HTML3 = "";
                                $.ajax({
                                    type: "GET",
                                    headers: {"Authorization": API_USER},
                                    url: URL_SERVER+"planificacionItems/"+IDITEM2+"/3",
                                    dataType: 'json',
                                    success: function (data){
                                        $.each(data.PLANIFICACIONITEM, function(index, item) {
                                            var EYE    = item.lotengo == 0 ? "" : '<i class="f7-icons" style="font-size: 20px;">eye</i>';
                                            var CREADO = item.creado == 0 ? "" : 'style="font-weight: bold;"';
                                            HTML3 += "<li>" + EYE +" <a href=\"#\" class=\"item-link\" "+CREADO+" data-edit="+item.edit+" onclick=\"abrir_ejercicio_desde_planificacion('"+item.edit+"', '"+item.idEjercicio+"', '"+item.id+"', '"+item.lotengo+"', '"+item.creado+"');\">"+ item.item + "</a></li>";
                                        });

                                        $("#liItemliItemsDivOtrosDiv"+IDITEM2).html(HTML3);
                                    }
                                });

                                HTML2 += '</ul>';
                            });
                            $("#liItemsDiv"+IDITEM).html(HTML2);
                        }
                    }); 

                HTML += '</div>';
                HTML += '</div>';
                HTML += '</div>';
                HTML += '<div class="separacion"></div>';
            });   
            
            $("#divItemEntrenamiento").html(HTML);
        }
    });  
}

function loadPlanificacionItemsUser(ID, TRIMESTRES){        
    var API_USER = localStorage.getItem("LS_USER_API_KEY");
    var HTML  = "";

    $.ajax({
        type: "GET",
        headers: {"Authorization": API_USER},
        url: URL_SERVER+"planificacionItemsUser/"+ID+"/1",
        dataType: 'json',
        success: function (data){
            $.each(data.PLANIFICACIONITEM, function(index, item) {
                var IDITEM = item.id;
                HTML += '<div class="card">';
                HTML += '<div class="card-content card-content-padding">';
                HTML += '<b class="ap_card-title ap-accordion" onclick="ap_accordion(this);" style="text-transform:uppercase;">'+ item.tema +'</b>';
                HTML += '<div class="ap-panel" id="liItemsDiv'+IDITEM+'">';
                
                    var HTML2 = '';
                    $.ajax({
                        type: "GET",
                        headers: {"Authorization": API_USER},
                        url: URL_SERVER+"planificacionItemsUser/"+IDITEM+"/3",
                        dataType: 'json',
                        success: function (data){
                            $.each(data.PLANIFICACIONITEM, function(index, item) {
                                var IDITEM2 = item.id;
                                HTML2 += '<h3 style="text-align:center;text-transform:uppercase;">'+ item.descripcion +'</h3>';
                                HTML2 += '<a href="#" data-id="'+IDITEM2+'" id="btnEditMiCLoud" class="link" onclick="modeEditMiCloud(this, \'ITEMS\');"><i class="icon f7-icons">compose_fill</i></a>';
                                HTML2 += '<a href="#" data-id="'+IDITEM2+'" id="btnAddMiCLoud" class="link" onclick="addMiCloud(this, \'ITEMS\');"><i class="icon f7-icons">add_round</i></a>';
                                HTML2 += '<ul id="liItemliItemsDivOtrosDiv'+IDITEM2+'">';

                                var HTML3 = "";
                                $.ajax({
                                    type: "GET",
                                    headers: {"Authorization": API_USER},
                                    url: URL_SERVER+"planificacionItemsUser/"+IDITEM2+"/3",
                                    dataType: 'json',
                                    success: function (data){
                                        $.each(data.PLANIFICACIONITEM, function(index, item) {
                                            var EYE = item.lotengo == 0 ? "" : '<i class="f7-icons">eye</i>';
                                            HTML3 += '<h3 style="text-align: center;"></h3>';
                                            HTML3 += "<li><a href=\"#\" class=\"item-link\" data-edit="+item.edit+" onclick=\"abrir_ejercicio_desde_planificacionUser('"+item.id+"');\">"+ item.item + " " + EYE +"</a></li>";
                                        });

                                        $("#liItemliItemsDivOtrosDiv"+IDITEM2).html(HTML3);
                                    }
                                });

                                HTML2 += '</ul>';
                            });
                            $("#liItemsDiv"+IDITEM).html(HTML2);
                        }
                    }); 

                HTML += '</div>';
                HTML += '</div>';
                HTML += '</div>';
                HTML += '<div class="separacion"></div>';
            });   
            
            $("#divItemEntrenamientoUser").html(HTML);
        }
    });   
}



// EJERCICIO
function drawFieldMarkup(a, b, c) {
    c = c || "#000";
    var e = document.getElementById("param_site_name"),
        e = e ? e.value : "",
        d = (.00235656 * a).toFixed(0);
    0 != d % 2 && d--;
    0 >= d && (d = 2);

    var V_RESTAR      = 60;
    var VERTICAL_LINE = (b - V_RESTAR);
    var MITAD         = a / 2;
    var POS_1         = (VERTICAL_LINE * 0.2);
    var POS_2         = (VERTICAL_LINE * 0.8);

    a = ''; // '<path d="M10 10 H' + (a-10).toFixed(0) + ' V' + (VERTICAL_LINE).toFixed(0) + ' H10 V10 M' + (MITAD).toFixed(0) + ' ' + (POS_1).toFixed(0) + ' V' + (POS_2).toFixed(0) + ' M10 ' + (POS_1).toFixed(0) + ' H' + (a - 10).toFixed(0) + ' M10 ' + (POS_2).toFixed(0) + ' H' + (a - 10).toFixed(0) + ' Z" fill="none" stroke="' + c + '" stroke-linecap="square" stroke-width="' + d + '"/>';



    document.getElementById("board_svg_markup").innerHTML = a;
    parseSvgMarkup(a, "board_svg_markup")
};