(function (C) {
    jQuery.extend({
        ht_getcookie: function (W) {
            var k = document.cookie.indexOf(W);
            var i = document.cookie.indexOf(";", k);
            return k == -1 ? "" : unescape(document.cookie.substring(k + W.length + 1, (i > k ? i : document.cookie.length)))
        }, ht_setcookie: function (aa, Z, Y, X, k, W) {
            var i = new Date();
            i.setTime(i.getTime() + Y * 1000);
            document.cookie = escape(aa) + "=" + escape(Z) + (i ? "; expires=" + i.toGMTString() : "") + (X ? "; path=" + X : "; path=/") + (k ? "; domain=" + k : "") + (W ? "; secure" : "")
        }, textFocus: function (W) {
            var k, i, W = W === undefined ? 0 : parseInt(W);
            this.each(function () {
                if (!this.setSelectionRange) {
                    k = this.createTextRange();
                    W === 0 ? k.collapse(false) : k.move("character", W);
                    k.select()
                } else {
                    i = this.value.length;
                    W === 0 ? this.setSelectionRange(i, i) : this.setSelectionRange(W, W)
                }
                this.focus()
            });
            return this
        }
    });
    var w = [];
    var D = [];
    var E = [];
    var G = [];
    var v = 0;
    var y = 0;
    var A = 0;
    var S = 0;
    var U = false;
    var g = false;
    var H = false;
    var z = 0;
    var I = null;
    var m = -1;
    var N = {};
    var f = [];
    var e = [];
    var d = [];
    var b = [];
    var V = [];
    var F = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
    var j = [];
    var x = false;
    var c = [];
    for (var R = 0; R < 26; R++) {
        c[R] = []
    }
    var P = [];
    for (var T = 0; T < 5; T++) {
        P[T] = []
    }
    var t = [];
    var s = [];
    var q = [];
    var p = [];
    var o = [];
    var K = [];
    var a = false;
    var L = true;
    var u = 12;
    var h = "简码/汉字";
    var n = "简码/汉字";
    var r = "inp-txt_select";
    var l = "inp-txt";
    var B = false;
    var J = null;
    var Q = null;
    var M = false;
    var O = C.ht_getcookie("hj_favcity");
    C.stationFor12306 = {
        bindInputs: [], get_initInputValue: function () {
            return h
        }, get_initTopInputValue: function () {
            return n
        }, city_Bind: function (k) {
            if (k.length == 0) {
                return
            }
            var i = "";
            C.each(k, function (W) {
                if (O == k[W][2]) {
                    i += "<div class='cityline' id='citem_" + W + "' cturn='" + k[W][6] + "'><span class='ralign'><b>" + k[W][1] + "</b></span></div>\n"
                } else {
                    i += "<div class='cityline' id='citem_" + W + "' cturn='" + k[W][6] + "'><span class='ralign'>" + k[W][1] + "</span><span style='float:right;' class='ralign'>" + k[W][3] + "</span></div>\n"
                }
            });
            C("#panel_cities").html(i);
            C(".cityline").mouseover(function () {
                C.stationFor12306.city_shiftSelect(this)
            }).click(function () {
                C.stationFor12306.city_confirmSelect();
                E = C.stationFor12306.filterCity("");
                C.stationFor12306.city_showlist(0)
            });
            C.stationFor12306.city_shiftSelect(C("#citem_0"))
        }, city_changeSelectIndex: function (i) {
            var k = A + i;
            if (k == -1) {
                C.stationFor12306.city_showlist(z - 1);
                C.stationFor12306.city_shiftSelect(C("#citem_" + (G.length - 1)))
            } else {
                if (k == G.length) {
                    C.stationFor12306.city_showlist(z + 1);
                    C.stationFor12306.city_shiftSelect(C("#citem_0"))
                } else {
                    C.stationFor12306.city_shiftSelect(C("#citem_" + k))
                }
            }
        }, city_confirmSelect: function () {
            I.val(S[1]);
            curObjCode.val(S[2]);
            if (B) {
                C.stationFor12306.setStationInCookies(S[1], S[2])
            }
            C("#form_cities").css("display", "none");
            C("#form_cities2").css("display", "none");
            C("#form_cities3").css("display", "none");
            m = -1;
            y = 0;
            C.stationFor12306.setStationStyle();
            if (L) {
                C.stationFor12306.LoadJS(S[2])
            }
            if (J) {
                J(I, curObjCode)
            }
        }, city_shiftSelect: function (k) {
            if (v != k) {
                if (v != 0) {
                    C(v).removeClass("citylineover").addClass("cityline").css("backgroundColor", "white")
                }
                if (k != 0) {
                    try {
                        v = k;
                        var i = C(v).removeClass("cityline").addClass("citylineover").css("backgroundColor", "#c8e3fc");
                        A = Number(i.attr("id").split("_")[1]);
                        S = w[Number(i.attr("cturn"))];
                        C("#cityid").val(S[2])
                    } catch (W) {
                    }
                }
            }
        }, city_shiftSelectInLi: function (i) {
            if (y != i) {
                if (y != 0) {
                    C(y).removeClass("ac_over").addClass("ac_odd")
                }
                if (i != 0) {
                    try {
                        y = i;
                        C(y).removeClass("ac_odd").addClass("ac_over")
                    } catch (k) {
                    }
                }
            }
        }, js: function (W) {
            var k;
            for (k = 1; k <= 7; k++) {
                if (C("#nav_list" + k).attr("class")) {
                    C("#ul_list" + k).css("display", "none");
                    C("#nav_list" + k).removeClass("action")
                }
            }
            for (k = 1; k <= 7; k++) {
                if (k == W) {
                    C("#ul_list" + k).css("display", "block");
                    C("#nav_list" + k).addClass("action");
                    if (k == 1 || k == 7) {
                        C("#flip_cities2").css("display", "none")
                    }
                    if (k > 1 && k < 7) {
                        var Y = C.stationFor12306.tHtmlGetCityName(W - 1, -1, 0);
                        if (Y > u) {
                            var X = Math.ceil(Y / u);
                            if (X > 1) {
                                C.stationFor12306.pageDesigh(X, 0, k)
                            }
                            C("#flip_cities2").css("display", "block")
                        } else {
                            C("#flip_cities2").css("display", "none")
                        }
                    } else {
                        I.focus()
                    }
                } else {
                    C("#ul_list" + k).css("display", "none");
                    C("#nav_list" + k).removeClass("action")
                }
            }
            if (1 != W) {
                C(".ac_even").on("mouseover", function () {
                    C.stationFor12306.city_shiftSelectInLi(this)
                }).on("click", function () {
                    I.val(C(this).text());
                    curObjCode.val(C(this).attr("data"));
                    if (B) {
                        C.stationFor12306.setStationInCookies(C(this).text(), C(this).attr("data"))
                    }
                    C("#form_cities2").css("display", "none");
                    m = -1;
                    y = 0;
                    C.stationFor12306.setStationStyle();
                    if (L) {
                        C.stationFor12306.LoadJS(C(this).attr("data"))
                    }
                    if (J) {
                        J(I, curObjCode)
                    }
                })
            }
        }, tHtmlGetCityName: function (k, i, X) {
            switch (k) {
                case 0:
                    if (i == -1) {
                        return D.length
                    }
                    if (i == -2) {
                        return D
                    }
                    return D[i];
                    break;
                case 1:
                    if (i == -1) {
                        return c[3].length
                    }
                    if (i == -2) {
                        return f
                    }
                    if (f.length > u) {
                        var W = Math.ceil((f.length) / u);
                        if (W > 1) {
                            t = f.slice(u * (X), Math.min(u * (X + 1), f.length));
                            return t[i]
                        }
                    }
                    return f[i];
                    break;
                case 2:
                    if (i == -1) {
                        return c[7].length
                    }
                    if (i == -2) {
                        return e
                    }
                    if (e.length > u) {
                        var W = Math.ceil((e.length) / u);
                        if (W > 1) {
                            s = e.slice(u * (X), Math.min(u * (X + 1), e.length));
                            return s[i]
                        }
                    }
                    return e[i];
                    break;
                case 3:
                    if (i == -1) {
                        return c[11].length
                    }
                    if (i == -2) {
                        return d
                    }
                    if (d.length > u) {
                        var W = Math.ceil((d.length) / u);
                        if (W > 1) {
                            q = d.slice(u * (X), Math.min(u * (X + 1), d.length));
                            return q[i]
                        }
                    }
                    return d[i];
                    break;
                case 4:
                    if (i == -1) {
                        return c[18].length
                    }
                    if (i == -2) {
                        return b
                    }
                    if (b.length > u) {
                        var W = Math.ceil((b.length) / u);
                        if (W > 1) {
                            p = b.slice(u * (X), Math.min(u * (X + 1), b.length));
                            return p[i]
                        }
                    }
                    return b[i];
                    break;
                case 5:
                    if (i == -1) {
                        return c[24].length
                    }
                    if (i == -2) {
                        return V
                    }
                    if (V.length > u) {
                        var W = Math.ceil((V.length) / u);
                        if (W > 1) {
                            o = V.slice(u * (X), Math.min(u * (X + 1), V.length));
                            return o[i]
                        }
                    }
                    return V[i];
                    break;
                default:
                    return "error";
                    break
            }
        }, closeShowCity: function () {
            C("#form_cities2").css("display", "none");
            m = -1;
            y = 0;
            C.each(C.stationFor12306.bindInputs, function (Y, X) {
                var W = "#" + X;
                var k = "#" + X + "Text";
                var i = C(k).val();
                if ("" == i) {
                    C(k).val(h);
                    C.stationFor12306.from_to_station_class_gray(C(k));
                    C(W).val("")
                }
            })
        }, showAllCity: function () {
            var ab = "";
            var k = "440px";
            if (B) {
                k = "400px"
            }
            ab = '<div class="com_hotresults" id="thetable" style="width:' + k + '"><div style="width:100%;"><div class="ac_title"><span>拼音支持首字母输入</span><a class="ac_close" style="cursor:pointer" title="关闭" onclick="$.stationFor12306.closeShowCity()"></a></div><ul class="AbcSearch clx" id="abc">';
            if (B) {
                ab = ab + '<li class="action" index="7" method="liHotTab"  onclick="$.stationFor12306.js(7)" id="nav_list7">常用</li>'
            }
            ab = ab + '<li index="1" method="liHotTab"  onclick="$.stationFor12306.js(1)" id="nav_list1">热门</li><li index="2" method="liHotTab"  onclick="$.stationFor12306.js(2)" id="nav_list2">ABCDE</li><li index="3" method="liHotTab"  onclick="$.stationFor12306.js(3)" id="nav_list3">FGHIJ</li><li index="4" method="liHotTab"  onclick="$.stationFor12306.js(4)" id="nav_list4">KLMNO</li><li index="5" method="liHotTab"  onclick="$.stationFor12306.js(5)" id="nav_list5">PQRST</li><li index="6" method="liHotTab"  onclick="$.stationFor12306.js(6)" id="nav_list6">UVWXYZ</li></ul>';
            if (B) {
                ab += '<ul class="popcitylist" style="overflow: auto;max-height: 280px;height: 191px;" method="hotData" id="ul_list7">';
                var ac = C.stationFor12306.getStationInCookies();
                var Y = ac.length;
                if (Y > 2) {
                    M = true;
                    for (var ad = 0; ad < Y; ad++) {
                        ab += '<li class="ac_even"   title="' + ac[ad][0] + '" 分析js文件="' + ac[ad][1] + '">' + ac[ad][0] + "</li>"
                    }
                }
                ab += "</ul>"
            }
            ab += '<ul class="popcitylist" style="overflow: auto;max-height: 280px;height: 191px;display:none;" method="hotData" id="ul_list1">';
            var X = C.stationFor12306.tHtmlGetCityName(0, -1, 0);
            var aa = "";
            if (!B) {
                aa = " openLi"
            }
            for (var ad = 0; ad < X; ad++) {
                ab += '<li class="ac_even' + aa + '"   title="' + C.stationFor12306.tHtmlGetCityName(0, ad, 0)[1] + '" 分析js文件="' + C.stationFor12306.tHtmlGetCityName(0, ad, 0)[2] + '">' + C.stationFor12306.tHtmlGetCityName(0, ad, 0)[1] + "</li>"
            }
            ab += "</ul>";
            for (var ae = 2; ae <= 6; ae++) {
                var Z = ae - 1;
                var i = C.stationFor12306.tHtmlGetCityName(Z, -1, 0);
                if (i > u) {
                    var W = Math.ceil((i) / u);
                    if (W > 1) {
                        ab += '<div id="ul_list' + ae + '">';
                        C.stationFor12306.pageDesigh(W, 0, ae)
                    }
                    C("#flip_cities2").css("display", "block")
                } else {
                    ab += '<ul  class="popcitylist" style="overflow: auto; max-height: 260px; height: 191px;display:none;" id="ul_list' + ae + '">';
                    C("#flip_cities2").css("display", "none");
                    var aa = "";
                    if (!B) {
                        aa = " openLi"
                    }
                    for (var ad = 0; ad < C.stationFor12306.tHtmlGetCityName(Z, -1, 0); ad++) {
                        ab += '<li class="ac_even' + aa + '"   title="' + C.stationFor12306.tHtmlGetCityName(Z, ad, 0)[1] + '" 分析js文件="' + C.stationFor12306.tHtmlGetCityName(Z, ad, 0)[2] + '">' + C.stationFor12306.tHtmlGetCityName(Z, ad, 0)[1] + "</li>"
                    }
                }
                ab += "</div>"
            }
            ab += '<div id="flip_cities2"> 翻页控制区</div>';
            ab += "</div>";
            C("#panel_cities2").html(ab);
            C("#thetable").on("click", function () {
                if (C("#form_cities2").css("display") == "block") {
                    if (m == 1 | m == 0) {
                        m == -1
                    }
                    I.select()
                }
            });
            C("#form_cities").on("click", function () {
                if (C("#form_cities").css("display") == "block") {
                    if (m == 1 | m == 0) {
                        m == -1
                    }
                    I.select()
                }
            });
            C(".ac_even").on("mouseover", function () {
                C.stationFor12306.city_shiftSelectInLi(this)
            }).on("click", function () {
                I.val(C(this).text());
                curObjCode.val(C(this).attr("data"));
                if (B) {
                    C.stationFor12306.setStationInCookies(C(this).text(), C(this).attr("data"))
                }
                C("#form_cities2").css("display", "none");
                m = -1;
                y = 0;
                C.stationFor12306.setStationStyle();
                if (L) {
                    C.stationFor12306.LoadJS(C(this).attr("data"))
                }
                if (J) {
                    J(I, curObjCode)
                }
            });
            C("#flip_cities2").css("display", "none");
            return w
        }, LoadJS: function (W) {
            if (((typeof(mm_addjs) != "undefined")) && ("" != mm_addjs) && (mm_addjs == 1)) {
                var k = document.getElementsByTagName("HEAD").item(0);
                var i = document.createElement("SCRIPT");
                i.src = mm_srcjs + W + ".js";
                i.type = "text/javascript";
                k.appendChild(i)
            }
        }, addZMHtml: function (X, Y) {
            var W = "";
            if (X && X.length > 0) {
                var Z = X[0][0].charAt(0);
                W += '<ul  class="popcitylist" style="overflow: auto; max-height: 260px; " >';
                W += '<li class="ac_letter">' + Z.toUpperCase() + "</li>";
                for (var i = 0; i < 12; i++) {
                    var k = X[i];
                    if (k) {
                        W += '<li class="ac_even' + Y + '"   title="' + k[1] + '" 分析js文件="' + k[2] + '">' + k[1] + "</li>"
                    } else {
                        W += '<li class="ac_even' + Y + '" </li>'
                    }
                }
                W += "</ul>"
            }
            return W
        }, pageDesigh: function (Z, ac, ad) {
            var W = "";
            if (Z > 1) {
                if (ac == -1) {
                    ac = (Z - 1)
                } else {
                    if (ac == Z) {
                        ac = 0
                    }
                }
                var ab = "";
                if (!B) {
                    ab = " openLi"
                }
                for (var X = 2; X <= 6; X++) {
                    if (X == ad) {
                        var aa = P[X - 2];
                        for (var i = 0; i < aa.length; i++) {
                            K = aa[i].slice(ac * u, (ac + 1) * u);
                            W += C.stationFor12306.addZMHtml(K, ab)
                        }
                    }
                }
                C("#ul_list" + ad).html(W);
                C("#ul_list" + ad).css("height", 270);
                if (W) {
                    var Y = (ac == 0) ? "&laquo;&nbsp;上一页" : "<a style='cursor:pointer'    class='cityflip' onclick='$.stationFor12306.pageDesigh(" + Z + "," + (ac - 1) + "," + ad + ");return false;'>&laquo;&nbsp;上一页</a>";
                    Y += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;";
                    Y += (ac == Z - 1) ? "下一页&nbsp;&raquo;" : "<a style='cursor:pointer' class='cityflip'  onclick='$.stationFor12306.pageDesigh(" + Z + "," + (ac + 1) + "," + ad + ")'>下一页&nbsp;&raquo;</a>";
                    C("#flip_cities2").html(Y)
                } else {
                    C("#flip_cities2").html("")
                }
                if (m == 1 | m == 0 | m == 2) {
                    m == -1
                }
                if (I) {
                    I.select()
                }
            } else {
            }
            C(".ac_even").on("mouseover", function () {
                C.stationFor12306.city_shiftSelectInLi(this)
            }).on("click", function () {
                I.val(C(this).text());
                curObjCode.val(C(this).attr("data"));
                if (B) {
                    C.stationFor12306.setStationInCookies(C(this).text(), C(this).attr("data"))
                }
                C("#form_cities2").css("display", "none");
                m = -1;
                y = 0;
                C.stationFor12306.setStationStyle();
                if (L) {
                    C.stationFor12306.LoadJS(C(this).attr("data"))
                }
                if (J) {
                    J(I, curObjCode)
                }
            })
        }, filterCity: function (Z) {
            if (Z.length == 0) {
                C("#top_cities").html(n);
                return w
            }
            var Y = /<\/?[^>]*>/g;
            Z = Z.replace(Y, "");
            var W = [];
            var k = /[^A-z]/.test(Z);
            for (var X = 0; X < w.length; X++) {
                if (C.stationFor12306.isMatchCity(w[X], Z, k)) {
                    W.push(w[X])
                }
            }
            if (W.length > 0) {
                C("#top_cities").html('按"<font color=red>' + Z + '</font>"检索：');
                return W
            } else {
                C("#top_cities").html("无法匹配:<font color=red>" + Z + "</font>");
                return []
            }
        }, replaceChar: function (i, W, k) {
            return i.substr(0, W) + k + i.substr(W + 1, i.length - 1)
        }, isMatchCity: function (Z, ac, W) {
            var ac = ac.toLowerCase();
            var k = [Z[4].toLowerCase(), Z[1], Z[3].toLowerCase()];
            var ab = -1;
            var Y = -1;
            if (W) {
                ac = ac.split("");
                for (var X = 0; X < ac.length; X++) {
                    var ae = k[1].indexOf(ac[X]);
                    if (ae > ab && ae <= X) {
                        k[1] = C.stationFor12306.replaceChar(k[1], ae, "-");
                        ab = ae
                    } else {
                        return false
                    }
                }
            } else {
                ac = ac.split("");
                var i = true;
                var aa = true;
                for (var X = 0; X < ac.length; X++) {
                    var ae = k[0].indexOf(ac[X]);
                    if (ae > ab && ae <= X) {
                        k[0] = C.stationFor12306.replaceChar(k[0], ae, "-");
                        ab = ae
                    } else {
                        i = false;
                        break
                    }
                }
                for (var X = 0; X < ac.length; X++) {
                    var ad = k[2].indexOf(ac[X]);
                    if (ad > Y && ad <= X) {
                        k[2] = C.stationFor12306.replaceChar(k[2], ad, "-");
                        Y = ad
                    } else {
                        aa = false;
                        break
                    }
                }
                if ((i == false) && (aa == false)) {
                    return false
                }
            }
            return true
        }, city_showlist_page: function (ad, Y) {
            var Z = "";
            Z += '<div class="citypage">';
            Z += (ad == 0) ? "" : '<a href="#" class="pagetxt" onclick="$.stationFor12306.city_showlist(' + (ad - 1) + ');return false;"><<</a>';
            var ae = ad + 1;
            var aa = Y;
            var ab = 2;
            var ac = 5;
            var k = (ae - ab) > 0 ? (ae + ab > aa ? aa - ac + 1 : ae - ab) : 1;
            var W = k + ac > aa ? aa + 1 : k + ac;
            if (aa < ac) {
                for (var X = 1; X < aa + 1; X++) {
                    if (ae == X) {
                        Z += "<a href='' class='cur' onclick='$.stationFor12306.city_showlist(" + (X - 1) + ");return false;'>" + (X) + "</a>"
                    } else {
                        Z += "<a href='' onclick='$.stationFor12306.city_showlist(" + (X - 1) + ");return false;'>" + (X) + "</a>"
                    }
                }
            } else {
                for (var X = k; X < W; X++) {
                    if (ae == X) {
                        Z += "<a href='' class='cur' onclick='$.stationFor12306.city_showlist(" + (X - 1) + ");return false;'>" + (X) + "</a>"
                    } else {
                        Z += "<a href='' onclick='$.stationFor12306.city_showlist(" + (X - 1) + ");return false;'>" + (X) + "</a>"
                    }
                }
            }
            Z += (ad == Y - 1) ? "" : '<a href="" class="pagetxt" onclick="$.stationFor12306.city_showlist(' + (ad + 1) + ');return false;">>></a>';
            Z += "</div>";
            return Z
        }, city_showlist: function (W) {
            if (E.length > 6) {
                var k = Math.ceil((E.length) / 6);
                if (W == -1) {
                    W = (k - 1)
                } else {
                    if (W == k) {
                        W = 0
                    }
                }
                G = E.slice(6 * (W), Math.min(6 * (W + 1), E.length));
                C.stationFor12306.city_Bind(G);
                var i = "";
                i += C.stationFor12306.city_showlist_page(W, k);
                C("#flip_cities").html(i);
                C("#flip_cities").css("display", "block")
            } else {
                W = 0;
                G = E;
                C.stationFor12306.city_Bind(G);
                C("#flip_cities").css("display", "none")
            }
            z = W;
            if (C("#form_cities").css("display") == "block") {
                a = true;
                I.focus()
            }
        }, fixDivBugInIE6: function (i) {
            try {
                i.bgiframe();
                if (i.width() > C("> ul", i).width()) {
                    i.css("overflow", "hidden")
                } else {
                    C("> iframe.bgiframe", i).width(C("> ul", i).width());
                    i.css("overflow", "scroll")
                }
                if (i.height() > C("> ul", i).height()) {
                    i.css("overflow", "hidden")
                } else {
                    C("> iframe.bgiframe", i).height(C("> ul", i).height());
                    i.css("overflow", "scroll")
                }
            } catch (k) {
            }
        }, clearStation: function (i) {
            m = -1;
            var W = I.val();
            var X = curObjCode.val();
            if (W == "" || X == "") {
                I.val("");
                curObjCode.val("")
            } else {
                var k = W + "|" + X;
                if (typeof(station_names) != "undefined") {
                    if (station_names.indexOf(k) == -1) {
                        I.val("");
                        curObjCode.val("")
                    } else {
                        if ("click" == i) {
                            I.select();
                            if (C("#form_cities").is(":hidden")) {
                                C("#form_cities2").css("display", "block")
                            }
                        }
                    }
                } else {
                    I.val("");
                    curObjCode.val("")
                }
            }
        }, MapCityID: function (W) {
            for (var k = 0; k < w.length; k++) {
                if (w[k][1] == W) {
                    return w[k][2]
                }
            }
            return 0
        }, MapCityName: function (k) {
            for (var W = 0; W < w.length; W++) {
                if (w[W][2] == k) {
                    return w[W][1]
                }
            }
            return ""
        }, SetISPos: function (Y) {
            if (Q) {
                Q(C("#form_cities"), C("#form_cities2"))
            } else {
                C("#form_cities").css("left", Y.position().left);
                C("#form_cities").css("top", Y.position().top + Y.height() + 12);
                C("#form_cities2").css("left", Y.position().left);
                C("#form_cities2").css("top", Y.position().top + Y.height() + 12)
            }
            var X = Y.offset().top;
            var i = C("#search_div");
            var k = C("#choice_div");
            i.css("top", X);
            k.css("top", X);
            var W = Y.offset().left;
            i.css("left", W);
            k.css("left", W)
        }, myHandlerFg: function (i) {
            if (i == null) {
                i.keyCode = 9
            } else {
                if (!i.which && i.which == 13) {
                    i.preventDefault()
                } else {
                    if (i.which && i.keyCode == 13) {
                        i.which = 9
                    }
                }
            }
        }, myHandler2: function (i) {
            if (i == null) {
                i = window.event;
                i.returnValue = false
            } else {
                if (i.which && i.which == 13) {
                    var W = document.getElementById("Upload_Data3");
                    if (document.createEvent) {
                        var k = document.createEvent("MouseEvents");
                        k.initEvent("click", true, false);
                        W.dispatchEvent(k)
                    } else {
                        if (document.createEventObject) {
                            W.fireEvent("onclick")
                        }
                    }
                } else {
                    if (!i.which && i.which == 13) {
                        i.preventDefault()
                    }
                }
            }
        }, from_to_station_class_plain: function (i) {
            if (l && l != "") {
                i.removeClass(l)
            }
            if (r && r != "") {
                i.addClass(r)
            }
        }, from_to_station_class_gray: function (i) {
            if (r && r != "") {
                i.removeClass(r)
            }
            if (l && l != "") {
                i.addClass(l)
            }
        }, setStationStyle: function () {
            var i = I.val();
            if (i == "") {
                I.val(h);
                C.stationFor12306.from_to_station_class_gray(I);
                curObjCode.val("")
            } else {
                C.stationFor12306.from_to_station_class_plain(I)
            }
        }, setCurValue: function () {
            I.val(S[1]);
            curObjCode.val(S[2])
        }, bindEvent: function (i) {
            var W = "#" + i;
            var k = "#" + i + "Text";
            C(k).keydown(function (Y) {
                I = C(k);
                curObjCode = C(W);
                m = 0;
                a = true;
                L = true;
                C("#form_cities2").css("display", "none");
                y = 0;
                var X = C(k).width();
                if (-[1,]) {
                    X = X - 4
                }
                X = X < 220 ? 220 : X;
                C("#form_cities").css("width", X);
                C("#form_cities").css("display", "block");
                C(".AbcSearch li").removeClass("action");
                C(".popcitylist").css("display", "none");
                if (M && B) {
                    C("#ul_list7").css("display", "block");
                    C("#nav_list7").addClass("action")
                } else {
                    C("#nav_list1").addClass("action");
                    C("#ul_list1").css("display", "block")
                }
                C("#flip_cities2").css("display", "none");
                C(".ac_even").removeClass("ac_over").addClass("ac_odd");
                Y = Y || window.event;
                if (Y.keyCode == 40) {
                    C.stationFor12306.city_changeSelectIndex(1);
                    C("#form_cities").css("display", "block");
                    C.stationFor12306.SetISPos(I);
                    C.stationFor12306.setCurValue()
                } else {
                    if (Y.keyCode == 38) {
                        C.stationFor12306.city_changeSelectIndex(-1);
                        C.stationFor12306.setCurValue();
                        C("#form_cities").css("display", "block");
                        C.stationFor12306.SetISPos(I)
                    } else {
                        if (Y.keyCode == 13) {
                            C.stationFor12306.city_confirmSelect();
                            if (document.addEventListener) {
                                document.addEventListener("keypress", C.stationFor12306.myHandlerFg, true)
                            } else {
                                evt = window.event;
                                evt.keyCode = 9
                            }
                        }
                    }
                }
            }).focus(function () {
                L = true;
                if (a) {
                    C("#form_cities2").css("display", "none");
                    y = 0;
                    a = false;
                    m = -1
                } else {
                    if (m == -1) {
                        C(".AbcSearch li").removeClass("action");
                        C(".popcitylist").css("display", "none");
                        C("#flip_cities2").css("display", "none");
                        if (M && B) {
                            C("#ul_list7").css("display", "block");
                            C("#nav_list7").addClass("action")
                        } else {
                            C("#nav_list1").addClass("action");
                            C("#ul_list1").css("display", "block")
                        }
                        C(".ac_even").removeClass("ac_over").addClass("ac_odd");
                        C("#form_cities2").css("display", "block");
                        for (var X = 2; X <= 6; X++) {
                            C("#ul_list" + X).css("height", 0)
                        }
                    }
                }
                I = C(k);
                curObjCode = C(W);
                m = 0;
                U = true;
                C.stationFor12306.SetISPos(I)
            }).blur(function () {
                I = C(k);
                curObjCode = C(W);
                m = 0;
                a = false;
                L = true;
                if (!g && !H) {
                    C.stationFor12306.clearStation("blur");
                    U = false;
                    C("#form_cities").css("display", "none");
                    C("#form_cities2").css("display", "none");
                    m = -1;
                    y = 0;
                    E = C.stationFor12306.filterCity("");
                    C.stationFor12306.city_showlist(0);
                    C.stationFor12306.setStationStyle()
                }
            }).keyup(function (X) {
                I = C(k);
                curObjCode = C(W);
                m = 0;
                a = true;
                X = X || window.event;
                if (X.keyCode != 40 && X.keyCode != 38 && X.keyCode != 37 && X.keyCode != 39 && X.keyCode != 13 && X.keyCode != 9) {
                    E = C.stationFor12306.filterCity(I.val());
                    C.stationFor12306.city_showlist(0)
                }
            }).click(function () {
                C.stationFor12306.clearStation("click")
            });
            C.stationFor12306.bindInputs.push(i)
        }, getStationInCookies: function () {
            var W = [];
            var k = C.ht_getcookie("_city_name_save_station");
            if (k) {
                var i = k.split(",");
                if (i && i.length > 0) {
                    C.each(i, function (aa, Z) {
                        var X = Z.split("#");
                        var Y = [];
                        Y[0] = X[0];
                        Y[1] = X[1];
                        W[aa] = Y
                    })
                }
            }
            return W
        }, setStationInCookies: function (af, W) {
            var ac = C.stationFor12306.getStationInCookies();
            var Z = [];
            var ag = ac.length;
            var Y = true;
            var ah = 10;
            for (var aa = 0; aa < ag; aa++) {
                if (ac[aa][0] == af && ac[aa][1] == W) {
                    Y = false
                }
                Z.push(ac[aa])
            }
            if (Y) {
                Z.push([af, W])
            }
            var ab = Z;
            var X = "";
            var ad = ab.length;
            var aa = 0;
            if (ad > ah) {
                aa = 1
            }
            var i = aa;
            if (ad > 1) {
                C("#ul_list7").html("");
                M = true
            }
            var ae = "";
            for (; aa < ad; aa++) {
                if (aa > i) {
                    X += ","
                }
                X += ab[aa][0] + "#" + ab[aa][1];
                if (M && B) {
                    ae += '<li class="ac_even" onmouseover="$.stationFor12306.city_shiftSelectInLi(this);" onclick="$.stationFor12306.li_click(this);"   title="' + ab[aa][0] + '" 分析js文件="' + ab[aa][1] + '">' + ab[aa][0] + "</li>"
                }
            }
            if (M && B) {
                C("#ul_list7").html(ae)
            }
            C.ht_setcookie("_city_name_save_station", X, 365 * 24 * 60 * 60)
        }, li_click: function (i) {
            I.val(C(i).text());
            curObjCode.val(C(i).attr("data"));
            if (B) {
                C.stationFor12306.setStationInCookies(C(i).text(), C(i).attr("data"))
            }
            C("#form_cities2").css("display", "none");
            m = -1;
            y = 0;
            C.stationFor12306.setStationStyle();
            if (L) {
                C.stationFor12306.LoadJS(C(i).attr("data"))
            }
            if (J) {
                J(I, curObjCode)
            }
        }, init: function (ac, ad) {
            if (typeof(ad) != "undefined") {
                if (typeof(ad._init_input) != "undefined") {
                    h = ad._init_input
                }
                if (typeof(ad._top_4_initInput) != "undefined") {
                    n = ad._top_4_initInput
                }
                if (typeof(ad.confirmCallBack) != "undefined") {
                    J = ad.confirmCallBack
                }
                if (typeof(ad._selected_class) != "undefined") {
                    r = ad._selected_class
                }
                if (typeof(ad._unselected_class) != "undefined") {
                    l = ad._unselected_class
                }
                if (typeof(ad._12306_openFavorite) != "undefined") {
                    B = ad._12306_openFavorite
                }
                if (typeof(ad.position) != "undefined") {
                    Q = ad.position
                }
            }
            if (typeof(station_names) != "undefined") {
                var Z = station_names.split("@");
                for (var Y = 0; Y < Z.length; Y++) {
                    var ab = Z[Y];
                    var aa = ab.toString().charAt(0);
                    for (var X in F) {
                        if (aa == F[X]) {
                            c[X].push(ab.split("|"))
                        }
                    }
                    if (ab.length > 0) {
                        ab = ab.split("|");
                        if (O != "" && ab[2] == O) {
                            favcity = ab;
                            w.unshift(ab);
                            if (Y > 6) {
                                w.push(ab)
                            }
                        } else {
                            w.push(ab)
                        }
                    }
                }
                f = c[0].concat(c[1]).concat(c[2]).concat(c[3]).concat(c[4]);
                e = c[5].concat(c[6]).concat(c[7]).concat(c[8]).concat(c[9]);
                d = c[10].concat(c[11]).concat(c[12]).concat(c[13]).concat(c[14]);
                b = c[15].concat(c[16]).concat(c[17]).concat(c[18]).concat(c[19]);
                V = c[20].concat(c[21]).concat(c[22]).concat(c[23]).concat(c[24]).concat(c[25]);
                P[0] = [c[0], c[1], c[2], c[3], c[4]];
                P[1] = [c[5], c[6], c[7], c[8], c[9]];
                P[2] = [c[10], c[11], c[12], c[13], c[14]];
                P[3] = [c[15], c[16], c[17], c[18], c[19]];
                P[4] = [c[20], c[22], c[23], c[24], c[25]];
                for (var Y = 0; Y < w.length; Y++) {
                    w[Y].push(Y)
                }
            }
            if (typeof(favorite_names) != "undefined") {
                var W = favorite_names.split("@");
                for (var Y = 0; Y < W.length; Y++) {
                    var ab = W[Y];
                    if (ab.length > 0) {
                        ab = ab.split("|");
                        D.push(ab)
                    }
                }
                for (var Y = 0; Y < D.length; Y++) {
                    D[Y].push(Y)
                }
            }
            E = C.stationFor12306.filterCity("");
            C.stationFor12306.city_showlist(0);
            C.stationFor12306.showAllCity();
            a = false;
            C.stationFor12306.fixDivBugInIE6(C("#form_cities"));
            C.stationFor12306.fixDivBugInIE6(C("#form_cities2"));
            if (ac && ac.length > 0) {
                C.each(ac, function (k, i) {
                    C.stationFor12306.bindEvent(i)
                })
            }
            C("#form_cities").mousedown(function () {
                g = true
            }).mouseup(function () {
                g = false
            });
            C("#form_cities2").mousedown(function () {
                H = true
            }).mouseup(function () {
                H = false
            })
        }
    }
})(jQuery);
(function () {
    $.stopStation = function (a) {
        var b = this;
        b.init = function () {
            b.options = $.extend({}, $.stopStation.defaultOptions, a);
            if (null == b.options.url || null == b.options.getSearchDate) {
                throw"error options,url can not be null"
            }
            b.options.mouseOnPanel = 0;
            if (!$("#" + b.options.showDivId)[0]) {
                var d = [];
                var c = -1;
                d[++c] = '<div class="station" style="display:none;" id="' + b.options.showDivId + '"><b></b>';
                d[++c] = '<div class="station-info" id="' + b.options.showTitleId + '"></div>';
                d[++c] = '<div class="station-hd"><span class="zx">站序</span><span class="zm">站名</span><span class="dzsj">到站时间</span>';
                d[++c] = '<span class="cfsj">出发时间</span><span class="tlsj">停留时间</span>';
                d[++c] = '<a id="_stopStation_close_id" class="close" title="关闭" href="javascript:" </a></div>';
                d[++c] = '<div class="station-bd"><table><tbody id="' + b.options.showTableId + '"></tbody></table></div></div>';
                $(d.join("")).appendTo($("body:eq(0)"));
                $("#_stopStation_close_id").on("click", b.close)
            }
            $("#" + b.options.showDivId).css("z-index", "20001");
            if (b.options.mouseOutClose) {
                $("#" + b.options.showDivId).on("mouseenter", function (e) {
                    b.options.mouseOnPanel = 1
                }).on("mouseleave", function () {
                    b.options.mouseOnPanel = 0;
                    $("#" + b.options.showDivId).hide().appendTo($("body:eq(0)"));
                    $("#" + b.options.showTableId).html("")
                })
            }
        };
        b.close = function () {
            $("#" + $.stopStation.defaultOptions.showDivId).closest("tr").removeAttr("style");
            $("#" + $.stopStation.defaultOptions.showDivId).removeAttr("style");
            b.options.mouseOnPanel = 0;
            $("#" + $.stopStation.defaultOptions.showDivId).hide().appendTo($("body:eq(0)"));
            $("#" + $.stopStation.defaultOptions.showTableId).html("")
        };
        b.open = function (f, j, h, e, i, c) {
            $("#" + $.stopStation.defaultOptions.showDivId).attr("style", "z-index:20001");
            if (a.timer) {
                clearTimeout(a.timer)
            }
            var g = a.getSearchDate();
            if (i && "" != i && null != i) {
                var d = formatDate(i);
                if ("-" != d) {
                    g = formatDate(i)
                } else {
                    g = a.getSearchDate()
                }
            } else {
                g = a.getSearchDate()
            }
            $.ajax({
                url: a.url,
                type: "get",
                isTakeParam: false,
                beforeSend: function (k) {
                    k.setRequestHeader("If-Modified-Since", "0");
                    k.setRequestHeader("Cache-Control", "no-cache")
                },
                data: {train_no: j, from_station_telecode: h, to_station_telecode: e, depart_date: g},
                success: function (p) {
                    var t = p.data.data;
                    if (t && t.length > 0) {
                        var r = [];
                        var u = -1;
                        for (var q = 0; q < t.length; q++) {
                            var l = t[q];
                            if (q == 0) {
                                var n = null;
                                n = l.train_class_name;
                                var s = l.service_type;
                                if ("0" == s) {
                                    c = "无空调"
                                } else {
                                    c = "有空调"
                                }
                                if (!n) {
                                    n = "&nbsp;&nbsp;"
                                }
                                $("#" + $.stopStation.defaultOptions.showTitleId).html('<span class="item1">' + l.station_train_code + '次      </span><span class="item2">' + l.start_station_name + "<em>--></em>" + l.end_station_name + '</span><span class="item3">' + n + '</span><span class="item4">' + c + "</span>").find("span").css("color", "#333")
                            }
                            var m = "";
                            if (!l.isEnabled) {
                                m = " style='color: #999;' "
                            }
                            r[++u] = '<tr><td width="50" class="tc" ' + m + ">" + l.station_no + "</td>";
                            r[++u] = '<td width="75" ' + m + ">" + l.station_name + "</td>";
                            r[++u] = '<td width="75" ' + m + ">" + l.arrive_time + "</td>";
                            r[++u] = '<td width="75" ' + m + ">" + l.start_time + "</td>";
                            r[++u] = "<td " + m + ">" + l.stopover_time + "</td></tr>"
                        }
                        $("#" + $.stopStation.defaultOptions.showTableId).html(r.join(""));
                        var o = $("#" + $.stopStation.defaultOptions.appendTo + f);
                        $("#" + $.stopStation.defaultOptions.showDivId).appendTo(o).show();
                        $(".ticket-info").filter("div").attr("style", "");
                        o[0].style["z-index"] = 19999;
                        if (!(navigator.appVersion.indexOf("MSIE 6") > -1)) {
                        } else {
                        }
                    }
                }
            })
        };
        b.init();
        myStopStation = b;
        return b
    };
    $.fn.stopStation = function () {
        return (new $.stopStation(Array.prototype.slice.call(arguments)[0]))
    };
    $.stopStation.defaultOptions = {
        url: null,
        mouseOutClose: false,
        showDivId: "train_div_",
        showTableId: "train_table_",
        showTitleId: "train_span_",
        appendTo: "train_num_",
        getSearchDate: null
    }
})();
var myStopStation = function () {
};
var formatDate = function (b) {
    if (b && (b.length == 8)) {
        var c = b.substring(0, 4);
        var d = b.substring(4, 6);
        var a = b.substring(6, 8);
        return c + "-" + d + "-" + a
    } else {
        return "-"
    }
};
var checkusermdId;
var showTrainStop;
var hideTrainStop;
var showTicketPrice;
var isInitQueryInput = false;
var isInitStationDiv = false;
var isInitJsrenderTemplate = false;
var isInitDateRange = false;
var tickets_info;
var location_code;
var md5Str;
var leftTicketStr;
var isAsync;
var box;
var countDown = null;
var ischeckAutoSubmitCode = true;
var hainan_tip;
var firstShow = 1;
var endShow = 20;
var dataNumber = 0;
var change_dates_arr = [];
var isOther = true;
var dwTranTimeStr;
var ydTranTimeStr;
var uninputmsg = "用户名／邮箱／手机号码";
var adtimeout = 5000;
var iframeUrl = "https://ad.12306.cn/res/0004.html";
var frameComplete = false;
var iframeOnload = function () {
    frameComplete = true
};
var yxTrainPageSize = 15;
var passengerPageSize = 20;
var timer_time = 3;
var yxTrainChange = "";
var trainListForIE = [];
var queryLeftTicket_times = 0;
var queryLeftTicket_count = 10;
var ifAlertCode = false;
var intervalTime;
(function () {
    var a;
    var a2 = null;
    var bC;
    var bq;
    var N;
    var af;
    var cb;
    var bT;
    var p = false;
    var b1 = 0;
    var ax;
    var bd;
    var x;
    var ac;
    var ci;
    var ba = new Array();
    var bQ = new Array();
    var b0 = new Array();
    var W = new Array();
    var bL = new Array();
    var K;
    var aC = new Array();
    tickets_info = new Array();
    var a3 = true, b3 = true, aY = true, ay = "starttime";
    var aB = true;
    var by = [];
    var bg = [];
    var bS = [];
    var aO;
    var H = [];
    var bR = "";
    var b9 = "";
    var a8 = "";
    var g = "";
    var D = "";
    $(document).ready(function () {
        $.init_ul4li();
        f();
        Y();
        y();
        ab();
        F();
        az();
        a5();
        bw();
        clickCheckBoxName();
        bB();
        bV();
        aq();
        ag();
        b5();
        A();
        aX();
        bH();
        $("#float").headerFloat();
        $(window).scroll(function () {
            if (a2 != null && (!a2.isHidden())) {
                $("#floatTable").hide();
                $(window).scrollTop(a)
            }
        });
        $.stopStation({
            url: ctx + "czxx/queryByTrainNo", getSearchDate: function () {
                return train_tour_flag == "fc" ? $.trim($("#back_train_date").val()) : $.trim($("#train_date").val())
            }
        });
        bc();
        cn();
        b6();
        o();
        R();
        ad();
        bR = $("#fromStationText").val();
        b9 = $("#toStationText").val();
        $("#showOnlyTicA").bind("click", function () {
            $("#filterTic").attr("checked", "checked");
            // 封装了车次列表数据
            bh();
            $jpopup.startOrHiden()
        });
        aO = $.autoSubmit();
        var cs = $("#train_date").val();
        var cq = $("#back_train_date").val();
        if (cq == "") {
            $("#back_train_date").val(cs)
        } else {
            $("#back_train_date").val(cq)
        }
        t();
        aV();
        var cr = new bp("right");
        cr.init();
        G();
        U();
        if (page_show_flag == "preStep") {
            $("#query_ticket").click()
        }
    });
    var bp = function (cx) {
        var cy, cu = {}, cz, cv = this, ct = false, cr, cw, cs = {x: 10, y: 66}, cq = {x: 5, y: 1};
        this.move = function () {
            cr = cr + cq.x;
            cw = cw + cq.y;
            if (cr < cs.x) {
                cr = cs.x;
                cq.x = -cq.x
            } else {
                if (cr > cu.dx) {
                    cr = cu.dx;
                    cq.x = -cq.x
                }
            }
            if (cw < cs.y) {
                cw = cs.y;
                cq.y = -cq.y
            } else {
                if (cw > cu.dy) {
                    cw = cu.dy;
                    cq.y = -cq.y
                }
            }
            cz.css(cx, cr + "px").css("top", cw + "px")
        };
        this.init = function () {
            if (ct) {
                return
            }
            ct = true;
            cz = $(bp.htmlTemplate);
            $(window).on("resize", cv.resize);
            cz.css(cx, cs.x + "px").css({top: cs.y + "px"}).on("mouseenter", cv.stop).on("mouseleave", cv.resize).children("a.close").on("click", cv.hidden);
            $("body").append(cz);
            cr = cs.x;
            cw = cs.y;
            cv.resize()
        };
        this.destory = function () {
            cz.remove()
        };
        this.resize = function () {
            cu.dx = ($(window).width() - $(".content").width()) / 2 - cz.width();
            cu.dy = ($(window).height()) - cz.height();
            if (cu.dx <= (cs.x + Math.abs(cq.x)) || cu.dy <= (cs.y + Math.abs(cq.y))) {
                cv.stop()
            } else {
                cv.alive()
            }
        };
        this.show = function () {
            cz.show();
            cv.alive()
        };
        this.hidden = function () {
            cv.stop();
            cz.hide()
        };
        this.stop = function () {
            clearInterval(cy)
        };
        this.alive = function () {
            cv.stop();
            cy = setInterval(cv.move, 200)
        }
    };
    bp.htmlTemplate = '<div class="fix-yh" id="myfix_yh" style="overflow: hidden;"><iframe onload="iframeOnload()" style="border:0;width:110%;height:110%;" id="ad_frame_query" src="' + iframeUrl + '"></iframe></div>';
    function G() {
        setTimeout(function () {
            if (!frameComplete) {
                var cr = $("#ad_frame_query");
                var cq = cr.get(0);
                var cs = ctx + "resources/images/bg11.png";
                cr.remove();
                $("#myfix_yh").css("background", "url(" + cs + ") no-repeat");
                $("#myfix_yh").html('<a href="javascript:void(0);" class="close" title="关闭">关闭</a>');
                $("#myfix_yh").children("a.close").on("click", function () {
                    $(this).parent().hide()
                })
            }
        }, adtimeout)
    }

    function bI(cr) {
        if (cr) {
            $(".yzm").show();
            $("#orange_msg").hide();
            $("#randCodeForm_id").find("a").css("margin-top", "30px");
            var cq = $("#qr_submit1");
            cq.unbind("click").bind("click", h);
            cq.removeClass("btn92").addClass("btn92s").show();
            ifAlertCode = true
        } else {
            $(".yzm").hide();
            $("#orange_msg").show();
            $("#qr_submit1").hide();
            ifAlertCode = false
        }
    }

    function ad() {
        if (rqChecked.length == 0) {
            if (train_tour_flag == "fc") {
                rqChecked.push($("#back_train_date").val())
            } else {
                rqChecked.push($("#train_date").val())
            }
        }
    }

    function b6() {
        if (ClickWho == "0X00") {
            $("#sf1").attr("disabled", "true");
            $("#sf1_label").addClass("color999");
            $("#sf2").attr("checked", "true");
            $("#query_ticket").removeClass().addClass("btn92s")
        } else {
            if (ClickWho == "00" || ClickWho == "ADULT") {
                $("#sf2").attr("disabled", "true");
                $("#sf2_label").addClass("color999");
                $("#query_ticket").removeClass().addClass("btn92s")
            } else {
                $("#query_ticket").removeClass().addClass("btn92s")
            }
        }
        if (isstudentDate) {
            $("#sf2").attr("disabled", "true");
            $("#sf2_label").addClass("color999");
            $("#query_ticket").removeClass().addClass("btn92s")
        }
    }

    /**
     * 添加数据到车次列表中
     * 没有发现对确认订单接口所需要的数据进行处理
     */
    function ah() {
        if (!isInitStationDiv) {
            d();
            isInitStationDiv = true
        }
        if (!isInitJsrenderTemplate) {
            at();
            isInitJsrenderTemplate = true
        }
    }

    function bc() {
        $("#fromStationText").mouseover(ah);
        $("#toStationText").mouseover(ah);
        $("#dc").mouseover(ah);
        $("#wf").mouseover(ah);
        $("#dc_label").mouseover(ah);
        $("#wf_label").mouseover(ah);
        $("#train_date").mouseover(ah);
        $("#back_train_date").mouseover(ah);
        $("#date_range").mouseover(ah)
    }

    function aA(cq) {
        aL();
        var cx = bL.length;
        if ($("#query_ticket").html() == "停止查询") {
            if (cx > 0 && aP) {
                $("#auto_query").removeAttr("disabled");
                if ($("#dc").is(":checked") && train_tour_flag != "gc") {
                    $("#autoSubmit").removeAttr("disabled");
                    $("#partSubmit").removeAttr("disabled")
                }
                $("#query_ticket").html("查询");
                $("#query_ticket").unbind("click");
                bM();
                if (countDown) {
                    clearInterval(countDown)
                }
                $("#filterTicDiv").html("<strong><label for='filterTic' style='cursor: pointer;'>仅显示选定车次</label></strong>");
                if (!$("#autoSubmit").is(":checked")) {
                    clearInterval(a0);
                    if (ccSelected.length > 0 || rqChecked.length > 0 || xbChecked.length > 0) {
                        myJpopup.startOrHiden();
                        if (train_tour_flag == "fc") {
                            var cy = "成功查到" + $("#back_train_date").val() + "的" + bL[0]["queryLeftNewDTO"]["station_train_code"] + "次"
                        } else {
                            var cy = "成功查到" + $("#train_date").val() + "的" + bL[0]["queryLeftNewDTO"]["station_train_code"] + "次"
                        }
                        if (cx == 1) {
                            cy = cy + "车。"
                        } else {
                            cy = cy + "等" + cx + "趟车。"
                        }
                        $("#filterRes").html(cy)
                    }
                }
                jPlayer("play")
            } else {
                if (countDown) {
                    clearInterval(countDown)
                }
                var cw = autoSearchTime / 1000;
                $("#filterTicDiv").html("<strong>离下次刷新时间<font class='colorA' style='font-size: 16px;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + cw + "</font>秒<strong>");
                countDown = window.setInterval(function () {
                    var cz = "<strong>离下次刷新时间<font class='colorA' style='font-size: 16px;'>";
                    if (cw == 0) {
                        cw = autoSearchTime / 1000
                    }
                    cw = cw - 1;
                    if (cw == 4) {
                        cz = cz + "&nbsp;&nbsp;&nbsp;&nbsp;"
                    }
                    if (cw == 3) {
                        cz = cz + "&nbsp;&nbsp;&nbsp;"
                    }
                    if (cw == 2) {
                        cz = cz + "&nbsp;&nbsp;"
                    }
                    if (cw == 1) {
                        cz = cz + "&nbsp;"
                    }

                    cz = cz + cw;
                    cz += "</font>秒<strong>";
                    $("#filterTicDiv").html(cz)
                }, 1000);
                $("#filterTic").hide()
            }
        }
        var cv = new Array();
        cv.push('<tbody id="queryLeftTable">');
        cq = aR(cq);
        var cs = bX(cq);
        if (cs) {
            cq = ce(cq)
        }
        if ($("#avail_jf")[0].checked) {
            cq = aH(cq)
        }
        for (var cr = 0; cr < cq.length; cr++) {
            cv.push('<tr id="ticket_');
            cv.push(cq[cr].queryLeftNewDTO.train_no);
            cv.push('" class="');
            cv.push(cr % 2 ? '">' : 'bgc">');
            cv.push('<td colspan="4" width="370">');
            cv.push('<div class="ticket-info clearfix" id="train_num_');
            cv.push(cr);
            cv.push('">');
            cv.push('<div class="train" id="ticket_');
            cv.push(cq[cr].queryLeftNewDTO.train_no);
            cv.push('_train">');
            var cu = "";
            if (c(cq[cr].queryLeftNewDTO.station_train_code)) {
                cu = ' style="color:red;" '
            }
            cv.push("<div><a  " + cu + ' title="点击查看停靠站信息" href="javascript:" id="');
            cv.push(cq[cr].queryLeftNewDTO.train_no);
            cv.push("_");
            cv.push(cq[cr].queryLeftNewDTO.from_station_telecode);
            cv.push("_");
            cv.push(cq[cr].queryLeftNewDTO.to_station_telecode);
            if ("1" == cq[cr].queryLeftNewDTO.controlled_train_flag || "2" == cq[cr].queryLeftNewDTO.controlled_train_flag) {
                cv.push('" class="number"');
                cv.push(">")
            } else {
                cv.push('" class="number"  onclick="myStopStation.open(\'');
                cv.push(cr);
                cv.push("','");
                cv.push(cq[cr].queryLeftNewDTO.train_no);
                cv.push("','");
                cv.push(cq[cr].queryLeftNewDTO.from_station_telecode);
                cv.push("','");
                cv.push(cq[cr].queryLeftNewDTO.to_station_telecode);
                cv.push("','");
                cv.push(cq[cr].queryLeftNewDTO.start_train_date);
                cv.push("','");
                cv.push(cq[cr].queryLeftNewDTO.train_seat_feature);
                cv.push("');\">")
            }
            cv.push(cq[cr].queryLeftNewDTO.station_train_code);
            cv.push("</a>");
            if (cq[cr].queryLeftNewDTO.is_support_card != 0) {
                cv.push(' <span class="i-card" title="可凭二代身份证直接进出站"></span>')
            }
            cv.push("</div>");
            cv.push('<span id="');
            cv.push(cq[cr].queryLeftNewDTO.train_no);
            cv.push("_");
            cv.push(cq[cr].queryLeftNewDTO.from_station_no);
            cv.push("_");
            cv.push(cq[cr].queryLeftNewDTO.to_station_no);
            cv.push("_");
            cv.push(cq[cr].queryLeftNewDTO.yp_info);
            cv.push("_");
            cv.push(cq[cr].queryLeftNewDTO.seat_types);
            if ("1" == cq[cr].queryLeftNewDTO.controlled_train_flag || "2" == cq[cr].queryLeftNewDTO.controlled_train_flag) {
                cv.push('" class="lookup"><span style="display:none;">查看票价</span><b style="display:none;" title="查看票价"></b></span>')
            } else {
                cv.push('" class="lookup" onclick="showTicketPrice(this)"><span style="display:none;">查看票价</span><b title="查看票价"></b></span>')
            }
            cv.push("</div>");
            cv.push('<div class="cdz">');
            if (cq[cr].queryLeftNewDTO.from_station_telecode != null && cq[cr].queryLeftNewDTO.from_station_telecode == cq[cr].queryLeftNewDTO.start_station_telecode) {
                cv.push('<strong class="start-s">');
                cv.push(cq[cr].queryLeftNewDTO.from_station_name);
                cv.push("</strong>")
            } else {
                cv.push("<strong>");
                cv.push(cq[cr].queryLeftNewDTO.from_station_name);
                cv.push("</strong>")
            }
            if (cq[cr].queryLeftNewDTO.to_station_telecode != null && cq[cr].queryLeftNewDTO.to_station_telecode == cq[cr].queryLeftNewDTO.end_station_telecode) {
                cv.push('<strong class="end-s">');
                cv.push(cq[cr].queryLeftNewDTO.to_station_name);
                cv.push("</strong>")
            } else {
                cv.push("<strong>");
                cv.push(cq[cr].queryLeftNewDTO.to_station_name);
                cv.push("</strong>")
            }
            cv.push("</div>");
            cv.push('<div class="cds">');
            if ("1" == cq[cr].queryLeftNewDTO.controlled_train_flag || "2" == cq[cr].queryLeftNewDTO.controlled_train_flag) {
                cv.push('<strong class="start-t" style="color:#999;">');
                cv.push("-----");
                cv.push("</strong>");
                cv.push('<strong class="color999">');
                cv.push("-----");
                cv.push("</strong>")
            } else {
                cv.push('<strong class="start-t">');
                cv.push(cq[cr].queryLeftNewDTO.start_time);
                cv.push("</strong>");
                cv.push('<strong class="color999">');
                cv.push(cq[cr].queryLeftNewDTO.arrive_time);
                cv.push("</strong>")
            }
            cv.push("</div>");
            cv.push('<div  class="ls" ');
            cv.push('id="');
            cv.push(cq[cr].queryLeftNewDTO.train_no);
            cv.push('_ls">');
            if ("1" == cq[cr].queryLeftNewDTO.controlled_train_flag || "2" == cq[cr].queryLeftNewDTO.controlled_train_flag) {
                cv.push('<strong class="color999">');
                cv.push("------");
                cv.push("</strong>");
                cv.push('<strong class="color999">');
                cv.push("------");
                cv.push("</strong>")
            } else {
                cv.push("<strong>");
                cv.push(cq[cr].queryLeftNewDTO.lishi);
                cv.push("</strong>");
                cv.push("<span>");
                cv.push(changeArriveDate(cq[cr].queryLeftNewDTO.start_time, cq[cr].queryLeftNewDTO.lishi));
                cv.push("到达</span>")
            }
            cv.push("</div>");
            cv.push("</div>");
            cv.push("</td>");
            if (cq[cr].queryLeftNewDTO.swz_num && cq[cr].queryLeftNewDTO.swz_num != "--" && cq[cr].queryLeftNewDTO.swz_num != 0 && cq[cr].queryLeftNewDTO.swz_num != "无") {
                b7(cv, cq[cr].queryLeftNewDTO.swz_num, "SWZ_", cq[cr].queryLeftNewDTO.train_no, cq[cr].queryLeftNewDTO.yp_ex, "91", cq[cr].queryLeftNewDTO.controlled_train_flag)
            } else {
                if (cq[cr].queryLeftNewDTO.tz_num && cq[cr].queryLeftNewDTO.tz_num != "--" && cq[cr].queryLeftNewDTO.tz_num != 0 && cq[cr].queryLeftNewDTO.tz_num != "无") {
                    b7(cv, cq[cr].queryLeftNewDTO.tz_num, "TZ_", cq[cr].queryLeftNewDTO.train_no, cq[cr].queryLeftNewDTO.yp_ex, "P1", cq[cr].queryLeftNewDTO.controlled_train_flag)
                } else {
                    if (cq[cr].queryLeftNewDTO.swz_num && cq[cr].queryLeftNewDTO.swz_num == "无") {
                        b7(cv, cq[cr].queryLeftNewDTO.swz_num, "SWZ_", cq[cr].queryLeftNewDTO.train_no, cq[cr].queryLeftNewDTO.yp_ex, "91", cq[cr].queryLeftNewDTO.controlled_train_flag)
                    } else {
                        b7(cv, cq[cr].queryLeftNewDTO.tz_num, "TZ_", cq[cr].queryLeftNewDTO.train_no, cq[cr].queryLeftNewDTO.yp_ex, "P1", cq[cr].queryLeftNewDTO.controlled_train_flag)
                    }
                }
            }
            b7(cv, cq[cr].queryLeftNewDTO.zy_num, "ZY_", cq[cr].queryLeftNewDTO.train_no, cq[cr].queryLeftNewDTO.yp_ex, "M1", cq[cr].queryLeftNewDTO.controlled_train_flag);
            b7(cv, cq[cr].queryLeftNewDTO.ze_num, "ZE_", cq[cr].queryLeftNewDTO.train_no, cq[cr].queryLeftNewDTO.yp_ex, "O1", cq[cr].queryLeftNewDTO.controlled_train_flag);
            b7(cv, cq[cr].queryLeftNewDTO.gr_num, "GR_", cq[cr].queryLeftNewDTO.train_no, cq[cr].queryLeftNewDTO.yp_ex, "61", cq[cr].queryLeftNewDTO.controlled_train_flag);
            b7(cv, cq[cr].queryLeftNewDTO.rw_num, "RW_", cq[cr].queryLeftNewDTO.train_no, cq[cr].queryLeftNewDTO.yp_ex, "41", cq[cr].queryLeftNewDTO.controlled_train_flag);
            b7(cv, cq[cr].queryLeftNewDTO.srrb_num, "SRRB_", cq[cr].queryLeftNewDTO.train_no, cq[cr].queryLeftNewDTO.yp_ex, "F1", cq[cr].queryLeftNewDTO.controlled_train_flag);
            b7(cv, cq[cr].queryLeftNewDTO.yw_num, "YW_", cq[cr].queryLeftNewDTO.train_no, cq[cr].queryLeftNewDTO.yp_ex, "31", cq[cr].queryLeftNewDTO.controlled_train_flag);
            b7(cv, cq[cr].queryLeftNewDTO.rz_num, "RZ_", cq[cr].queryLeftNewDTO.train_no, cq[cr].queryLeftNewDTO.yp_ex, "21", cq[cr].queryLeftNewDTO.controlled_train_flag);
            b7(cv, cq[cr].queryLeftNewDTO.yz_num, "YZ_", cq[cr].queryLeftNewDTO.train_no, cq[cr].queryLeftNewDTO.yp_ex, "11", cq[cr].queryLeftNewDTO.controlled_train_flag);
            b7(cv, cq[cr].queryLeftNewDTO.wz_num, "WZ_", cq[cr].queryLeftNewDTO.train_no, cq[cr].queryLeftNewDTO.yp_ex, "W1", cq[cr].queryLeftNewDTO.controlled_train_flag);
            b7(cv, cq[cr].queryLeftNewDTO.qt_num, "QT_", cq[cr].queryLeftNewDTO.train_no, cq[cr].queryLeftNewDTO.yp_ex, "", cq[cr].queryLeftNewDTO.controlled_train_flag);
            if ("Y" == cq[cr].queryLeftNewDTO.canWebBuy) {
                cv.push(' <td align="center" width="80" class="no-br"><a href="javascript:" class="btn72" onclick="checkG1234(\'');
                cv.push(cq[cr].secretStr);
                cv.push("','");
                cv.push(cq[cr].queryLeftNewDTO.start_time);
                cv.push("','");
                cv.push(cq[cr].queryLeftNewDTO.train_no);
                cv.push("','");
                cv.push(cq[cr].queryLeftNewDTO.from_station_telecode);
                cv.push("','");
                cv.push(cq[cr].queryLeftNewDTO.to_station_telecode);
                cv.push("')\">");
                cv.push(buttonText());
                if (cq[cr].queryLeftNewDTO.exchange_train_flag == 1) {
                    cv.push("<i class='ico-dh'></i>")
                }
                cv.push("</a>");
                cv.push("</td>")
            } else {
                cv.push('<td align="center" width="80" class="no-br">');
                cv.push(cq[cr].buttonTextInfo);
                cv.push("</td>")
            }
            cv.push("</tr>");
            cv.push('<tr datatran="' + cq[cr].queryLeftNewDTO.station_train_code + '" id="price_');
            cv.push(cq[cr].queryLeftNewDTO.train_no);
            cv.push('" style="display:none;"></tr>')
        }
        cv.push("</tbody>");
        $("#queryLeftTable").replaceWith(cv.join(""));
        if (cs) {
            for (var cr = 0; cr < cq.length; cr++) {
                var ct = cq[cr];
                if (c(ct.queryLeftNewDTO.station_train_code)) {
                }
            }
        }
    }

    function ce(cr) {
        if (cr && cr.length > 0) {
            var cv = [];
            var cq = [];
            for (var cs = 0, ct = cr.length; cs < ct; cs++) {
                var cu = cr[cs];
                if (c(cu.queryLeftNewDTO.station_train_code)) {
                    cv.push(cu)
                } else {
                    cq.push(cu)
                }
            }
            cr = cv.concat(cq)
        }
        return cr
    }

    function aH(cq) {
        if (cq && cq.length > 0) {
            for (var cr = cq.length - 1; cr >= 0; cr--) {
                if (cq[cr].queryLeftNewDTO.exchange_train_flag == 0 || cq[cr].queryLeftNewDTO.canWebBuy != "Y") {
                    cq.splice(cr, 1)
                }
            }
        }
        return cq
    }

    function aR(cq) {
        if (cq && cq.length > 0) {
            var cw = [];
            var cr = [];
            for (var cs = 0, cy = cq.length; cs < cy; cs++) {
                var cu = cq[cs];
                var cv = cu.queryLeftNewDTO.yp_ex.split("");
                var cx = false;
                for (var ct = 0; ct < cv.length; ct++) {
                    if (ct % 2 == 1 && cv[ct] == 1) {
                        cx = true;
                        break
                    }
                }
                if (cx) {
                    cw.push(cu)
                } else {
                    cr.push(cu)
                }
            }
            cq = cw.concat(cr)
        }
        return cq
    }

    function c(cs) {
        if (DW_TRAINS && DW_TRAINS.length) {
            for (var cq = 0, cr = DW_TRAINS.length; cq < cr; cq++) {
                if (cs == DW_TRAINS[cq]) {
                    return true
                }
            }
        } else {
            return false
        }
        return false
    }

    function bX(cq) {
        if (cq && cq.length > 0) {
            if (DW_TRAINS && DW_TRAINS.length) {
                for (var ct = 0, cv = cq.length; ct < cv; ct++) {
                    var cu = cq[ct].queryLeftNewDTO.station_train_code;
                    for (var cr = 0, cs = DW_TRAINS.length; cr < cs; cr++) {
                        if (cu == DW_TRAINS[cr]) {
                            return true
                        }
                    }
                }
            }
        }
        return false
    }

    function ae(cw, cq) {
        var cx, cu, ct;
        var cs;
        ct = cw["leftTicketDTO.train_date"];
        if (hainan_limit_start_traindate && C(ct) >= C(hainan_limit_start_traindate)) {
            if (hainan_limit_from_telcode && hainan_limit_to_telcode) {
                for (var cr = 0, cv = cq.length; cr < cv; cr++) {
                    cx = cq[cr].queryLeftNewDTO.from_station_telecode;
                    cu = cq[cr].queryLeftNewDTO.to_station_telecode;
                    cs = cq[cr].buttonTextInfo;
                    if (hainan_limit_from_telcode.indexOf(cx) > -1 && hainan_limit_to_telcode.indexOf(cu) > -1 && cs.indexOf("起售") > -1) {
                        return true
                    }
                }
            }
        }
        return false
    }

    function b7(cw, cr, cB, cx, ct, cA, cu) {
        ct = ct.replace("A", "6");
        var cz = ct ? ct.indexOf(cA) : -1;
        var cy = false;
        if (cz > -1 && (cz % 2) == 0) {
            cy = true
        }
        if (cA == "") {
            cy = false;
            var cv = ct.split("");
            for (var cs = 0; cs < cv.length; cs++) {
                if (cs % 2 == 0 && cv[cs] != "9" && cv[cs] != "P" && cv[cs] != "M" && cv[cs] != "O" && cv[cs] != "6" && cv[cs] != "4" && cv[cs] != "F" && cv[cs] != "3" && cv[cs] != "2" && cv[cs] != "1" && cv[cs] != "W") {
                    if (cv[cs + 1] == "1") {
                        cy = true;
                        break
                    }
                }
            }
        }
        if ("1" == cu || "2" == cu) {
            cw.push(' <td width="46" align="center" style="cursor: pointer;"  id="');
            cw.push(cB);
            cw.push(cx);
            cw.push('">');
            cw.push(cr);
            cw.push("</td>")
        } else {
            if ("有" == cr) {
                if (cB == "SWZ_" || cB == "TZ_") {
                    cw.push('<td width="46" align="center" class="yes" onclick="showTicketPrice(this)"　style="cursor: pointer;" id="');
                    cw.push(cB);
                    cw.push(cx);
                    cw.push('">');
                    if (cy) {
                        cw.push('<div class="sale" title="本席别票价打折">' + cr + '<span class="i-mark">折</span></div>')
                    } else {
                        cw.push(cr)
                    }
                    cw.push("</td>")
                } else {
                    if (cB == "ZY_" || cB == "ZE_") {
                        cw.push('<td width="46" align="center" class="yes" style="cursor: pointer;" onclick="showTicketPrice(this)" id="');
                        cw.push(cB);
                        cw.push(cx);
                        cw.push('">');
                        if (cy) {
                            cw.push('<div class="sale" title="本席别票价打折">' + cr + '<span class="i-mark">折</span></div>')
                        } else {
                            cw.push(cr)
                        }
                        cw.push("</td>")
                    } else {
                        cw.push('<td width="46" align="center" style="cursor: pointer;" class="yes" onclick="showTicketPrice(this)" id="');
                        cw.push(cB);
                        cw.push(cx);
                        cw.push('">');
                        if (cy) {
                            cw.push('<div class="sale" title="本席别票价打折">' + cr + '<span class="i-mark">折</span></div>')
                        } else {
                            cw.push(cr)
                        }
                        cw.push("</td>")
                    }
                }
            } else {
                if (cr == "无" || isNum(cr) >= 0) {
                    var cq = ' class="t-num" ';
                    if (cr == "无" || isNum(cr) == 0) {
                        cq = ""
                    }
                    if (cB == "SWZ_" || cB == "TZ_" || cB == "ZY_" || cB == "ZE_") {
                        cw.push('<td width="46" align="center" style="cursor: pointer;" ' + cq + ' onclick="showTicketPrice(this)" id="');
                        cw.push(cB);
                        cw.push(cx);
                        cw.push('">');
                        cw.push("<div>");
                        if (cy) {
                            cw.push('<div class="sale" title="本席别票价打折">' + cr + '<span class="i-mark">折</span></div>')
                        } else {
                            cw.push(cr)
                        }
                        cw.push("</td>")
                    } else {
                        cw.push('<td width="46" align="center" style="cursor: pointer;" ' + cq + ' onclick="showTicketPrice(this)" id="');
                        cw.push(cB);
                        cw.push(cx);
                        cw.push('">');
                        if (cy) {
                            cw.push('<div class="sale" title="本席别票价打折">' + cr + '<span class="i-mark">折</span></div>')
                        } else {
                            cw.push(cr)
                        }
                        cw.push("</td>")
                    }
                } else {
                    cw.push(' <td width="46" align="center" style="cursor: pointer;" onclick="showTicketPrice(this)"  id="');
                    cw.push(cB);
                    cw.push(cx);
                    cw.push('">');
                    cw.push(cr);
                    cw.push("</td>")
                }
            }
        }
    }

    function k(cr, cq) {
        ishaveCheckId = false;
        for (i = 0; i < cr.length; i++) {
            if (cr[i][0] == cq) {
                cr[i][1] = $("#".concat($("#".concat(cq)).attr("for"))).is(":checked");
                ishaveCheckId = true
            }
        }
        if (!ishaveCheckId) {
            cr[cr.length] = [cq, true]
        }
    }

    function bO() {
        e(bC);
        e(bq);
        e(N)
    }

    function e(cq) {
        for (i = 0; i < cq.length; i++) {
            if (cq[i][1]) {
                $("#".concat(cq[i][0]).concat("_check")).attr("checked", true)
            }
        }
    }

    function C(cr) {
        var cq = new Date();
        var cs = cr.split("-");
        cq.setFullYear(parseInt(cs[0]), parseInt(cs[1] - 1, 10), parseInt(cs[2], 10));
        if (cs.length >= 6) {
            cq.setHours(cs[3], cs[4], cs[5])
        }
        return cq
    }

    Date.prototype.format = function (cr) {
        var cs = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            S: this.getMilliseconds()
        };
        if (/(y+)/.test(cr)) {
            cr = cr.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
        }
        for (var cq in cs) {
            if (new RegExp("(" + cq + ")").test(cr)) {
                cr = cr.replace(RegExp.$1, RegExp.$1.length == 1 ? cs[cq] : ("00" + cs[cq]).substr(("" + cs[cq]).length))
            }
        }
        return cr
    };
    function aK(cs, cr) {
        var cq = new Date(Date.parse(cs.replace(/-/g, "/")));
        cq.setDate(cq.getDate() + cr);
        return P(cq)
    }

    function P(cr) {
        var cs = cr.getFullYear();
        var cu = cr.getMonth() + 1;
        var ct = cr.getDate();
        var cq = cs + "-" + cu + "-" + ct;
        return cq
    }

    function bE() {
        var cs = $("#train_date").val();
        var cr = $("#back_train_date").val();
        var cq = false;
        if ($("#wf").is(":checked")) {
            if (C(cs) <= C(cr)) {
                cq = true
            }
        } else {
            return true
        }
        return cq
    }

    function cg() {
        var ct = $.jc_getFromStation();
        if (ct) {
            var cs = ct.split(",");
            if (cs && cs.length == 2) {
                $("#fromStationText").val(cs[0]);
                $("#fromStation").val(cs[1])
            }
        }
        var cr = $.jc_getToStation();
        if (cr) {
            var cs = cr.split(",");
            if (cs && cs.length == 2) {
                $("#toStationText").val(cs[0]);
                $("#toStation").val(cs[1])
            }
        }
        var cu = [];
        cu = stu_buy_date.split("&");
        var cq = $.jc_getFromDate();
        if (cq) {
            if (cq >= cu[0] && cq <= cu[1]) {
                $("#train_date").val(cq)
            }
        }
        var cv = $.jc_getWfOrDc();
        if (cv && "wf" == cv) {
            $("#wf").click();
            var cw = $.jc_getToDate();
            if (cw) {
                if (cw >= cu[0] && cw <= cu[1]) {
                    $("#back_train_date").val(cw)
                }
            }
        } else {
            $("#dc").click()
        }
    }

    function a1() {
        $("#train_stop").on("mouseover", function (cq) {
            if (checkHover(cq, this)) {
                b1 = 1
            }
        }).on("mouseleave", function () {
            b1 = 0;
            $("#train_stop").hide();
            $("#train_table_").html("")
        })
    }

    function f() {
        fromStation = from_station;
        fromStationName = from_station_name;
        toStation = to_station;
        toStationName = to_station_name;
        trainDate = trainDate;
        backTrainDate = backTrainDate;
        bC = new Array();
        bq = new Array();
        N = new Array()
    }

    function t() {
        if ($("#sf1").is(":checked")) {
            isOther = true;
            if (other_control < dataNumber) {
                for (var cq = other_control + 1; cq <= dataNumber; cq++) {
                    $("#date-list>li:nth-child(" + cq + ")").hide()
                }
            } else {
                for (var cq = 1; cq <= dataNumber; cq++) {
                    $("#date-list>li:nth-child(" + cq + ")").show()
                }
            }
        } else {
            isOther = false;
            if (stu_control < dataNumber) {
                for (var cq = stu_control + 1; cq <= dataNumber; cq++) {
                    $("#date-list>li:nth-child(" + cq + ")").hide()
                }
            } else {
                for (var cq = 1; cq <= dataNumber; cq++) {
                    $("#date-list>li:nth-child(" + cq + ")").show()
                }
            }
        }
    }

    function o() {
        $("#fromStation").val(fromStation);
        $("#fromStationText").val(fromStationName);
        $("#toStation").val(toStation);
        $("#toStationText").val(toStationName);
        $("#train_date").val(trainDate);
        if (isInMaintenanceHours) {
            if (!isSuperLogin) {
                $("#autoSubmit").prop("checked", false);
                $("#autoSubmit").attr("disabled", true);
                $("#autoSubmit").siblings("label").css("color", "#999");
                $("#autoSubmitTxt").attr("title", "系统维护时间下不允许自动提交");
                $("#partSubmit").prop("checked", false);
                $("#partSubmit").attr("disabled", true);
                $("#partSubmit").siblings("label").css("color", "#999");
                $("#partSubmitTxt").attr("title", "系统维护时间下不允许自动提交");
                $("#auto_query").prop("checked", false);
                $("#auto_query").attr("disabled", true);
                $("#auto_query").siblings("label").css("color", "#999");
                $("#autoQueryTxt").attr("title", "系统维护时间下不允许自动查询")
            }
        }
        if (backTrainDate != null && backTrainDate != "") {
            $("#back_train_date").val(backTrainDate)
        }
        if ($("#fromStationText").val() == "") {
            $("#fromStationText").val("简拼/全拼/汉字")
        }
        if ($("#toStationText").val() == "") {
            $("#toStationText").val("简拼/全拼/汉字")
        }
        if (page_show_flag == null) {
            cg()
        } else {
            if (page_show_flag == "index") {
                bo()
            } else {
                if (page_show_flag == "preStep") {
                    ca()
                } else {
                    if (page_show_flag == "fcInit") {
                        v();
                        $("#autoSubmit").attr("disabled", true);
                        $("#autoSubmit").siblings("label").css("color", "#999");
                        $("#partSubmit").attr("disabled", true);
                        $("#partSubmit").siblings("label").css("color", "#999")
                    } else {
                        if (page_show_flag == "gcInit") {
                            br();
                            $("#autoSubmit").attr("disabled", true);
                            $("#autoSubmit").siblings("label").css("color", "#999");
                            $("#partSubmit").attr("disabled", true);
                            $("#partSubmit").siblings("label").css("color", "#999")
                        }
                    }
                }
            }
        }
    }

    function bo() {
        if (tour_flag == "wf") {
            $("#wf").click()
        } else {
            if (tour_flag == "dc") {
                $("#dc").click()
            }
        }
        if (purposeCodeFromIndex == "0X00") {
            $("#sf2").click()
        } else {
            if (purposeCodeFromIndex == "ADULT") {
                $("#sf1").click()
            }
        }
        var cq = [];
        $("#date_range>ul>li").each(function () {
            var cr = $(this).children("span:first-child").html();
            cq.push(cr)
        });
        $("#query_ticket").click()
    }

    function ca() {
        $("#fromStationText").removeClass().addClass("inp_selected");
        $("#toStationText").removeClass().addClass("inp_selected");
        if (train_tour_flag == "dc") {
            ar(trainDate);
            $("#dc").click()
        }
        if (train_tour_flag == "wc") {
            ar(trainDate);
            $("#wf").click()
        }
        if (train_tour_flag == "fc") {
            ar(backTrainDate);
            $("#wf").click();
            $("#wf").attr("disabled", "true");
            $("#dc").attr("disabled", "true");
            $("#change_station").removeClass().addClass("i-change i-change2");
            $("#change_station").attr("style", "");
            $("#fromStationText").attr("title", "返程时不得变更出发地或不能变更到达地");
            $("#toStationText").attr("title", "返程时不得变更出发地或不能变更到达地");
            $("#toStationText").unbind("focus").unbind("click").attr("readonly", "true");
            $("#fromStationText").unbind("focus").unbind("click").attr("readonly", "true");
            $("#dfc>ul>li:nth-child(2)").children("label:first").removeClass().addClass("color999");
            $("#dfc>ul>li:nth-child(1)").children("label:first").removeClass().addClass("color999");
            $("#place_area>ul>li:nth-child(1)").addClass("no-change");
            $("#place_area>ul>li:nth-child(3)").addClass("no-change");
            $("#place_area>ul>li:nth-child(4)").addClass("no-change");
            $("#fromStationText").removeClass().addClass("inp-txt");
            $("#toStationText").removeClass().addClass("inp-txt");
            $("#change_station").unbind();
            $("#train_date").val(trainDate);
            $("#train_date").attr("readonly", "true");
            $("#train_date").removeClass().addClass("inp-txt");
            $("#train_date").unbind("click");
            $("#date_icon_1").unbind("click");
            $("#date_area>ul>li:nth-child(1)>span>label").addClass("color999");
            $("#back_train_date").val(backTrainDate);
            $("#back_train_date").removeAttr("disabled");
            $("#date_area>ul>li:nth-child(2)>span>label").removeClass("color999");
            $("#back_train_date").removeClass().addClass("inp_selected");
            $("#autoSubmit").attr("disabled", true);
            $("#autoSubmit").siblings("label").css("color", "#999");
            $("#partSubmit").attr("disabled", true);
            $("#partSubmit").siblings("label").css("color", "#999")
        }
        if (train_tour_flag == "gc") {
            ar(trainDate);
            br();
            $("#autoSubmit").attr("disabled", true);
            $("#autoSubmit").siblings("label").css("color", "#999");
            $("#partSubmit").attr("disabled", true);
            $("#partSubmit").siblings("label").css("color", "#999")
        }
    }

    function ar(cs) {
        for (var cq = 1; cq <= 20; cq++) {
            var cr = $("#date_range>ul>li:nth-child(" + cq + ")").children("span:first-child").text();
            cr = "2013-" + cr;
            if (cs == cr) {
                $("#date_range>ul>li").removeClass("sel");
                $("#date_range>ul>li").removeAttr("alt");
                $("#date_range>ul>li:nth-child(" + cq + ")").addClass("sel");
                $("#date_range>ul>li:nth-child(" + cq + ")").attr("alt", "show");
                $("#date_range>ul>li:nth-child(20)").addClass("end");
                $("#date_range>ul>li:nth-child(" + cq + ")").children("span:first-child").removeClass();
                $("#date_range>ul>li:nth-child(" + cq + ")").children("span:last-child").removeClass();
                $("#date_range>ul>li:nth-child(" + cq + ")").children("span:first-child").addClass("hide");
                $("#date_range>ul>li:nth-child(1)").children().addClass("first");
                bT = $("#date_range>ul>li:nth-child(" + cq + ")").children("span:first-child").text();
                break
            }
        }
    }

    function br() {
        $("#fromStationText").attr("title", "改签时不得变更出发地或不能变更到达地");
        $("#dc").click();
        $("#wf").attr("disabled", "true");
        $("#dc").attr("disabled", "true");
        $("#place_area>ul>li:nth-child(1)").addClass("no-change");
        $("#place_area>ul>li:nth-child(3)").addClass("no-change");
        $("#place_area>ul>li:nth-child(5)").addClass("no-change");
        $("#dfc>ul>li:nth-child(1)").children("label:first").removeClass().addClass("color999");
        $("#dfc>ul>li:nth-child(2)").children("label:first").removeClass().addClass("color999");
        $("#fromStationText").unbind("focus").unbind("click").attr("readonly", "true");
        if ("Y" != canChangeToStation) {
            $("#toStationText").unbind("focus").unbind("click").attr("readonly", "true");
            $("#toStationText").removeClass().addClass("inp-txt");
            $("#toStationText_label").addClass("color999")
        }
        $("#fromStationText").removeClass().addClass("inp-txt");
        $("#fromStationText_label").addClass("color999");
        $("#change_station").unbind();
        $("#change_station").removeClass().addClass("i-change i-change2");
        $("#change_station").attr("style", "")
    }

    function v() {
        $("#fromStationText").attr("title", "订返程票时不得变更出发地或不能变更到达地");
        $("#toStationText").attr("title", "订返程票时不得变更出发地或不能变更到达地");
        ar(backTrainDate);
        $("#wf").click();
        $("#dc").attr("disabled", "true");
        $("#wf").attr("disabled", "true");
        $("#place_area>ul>li:nth-child(1)").addClass("no-change");
        $("#place_area>ul>li:nth-child(3)").addClass("no-change");
        $("#place_area>ul>li:nth-child(4)").addClass("no-change");
        $("#dfc>ul>li:nth-child(1)").children("label:first").removeClass().addClass("color999");
        $("#dfc>ul>li:nth-child(2)").children("label:first").removeClass().addClass("color999");
        $("#train_date").attr("readonly", "true");
        $("#train_date").addClass("color999");
        $("#train_date").attr("disabled", true);
        $("#train_date").unbind("click");
        $("#date_icon_1").unbind("click");
        $("#date_area>ul>li:nth-child(1)>span>label").addClass("color999");
        $("#back_train_date").removeAttr("disabled");
        $("#date_area>ul>li:nth-child(2)>span>label").removeClass("color999");
        $("#train_date").removeClass().addClass("inp-txt");
        $("#back_train_date").removeClass().addClass("inp_selected");
        $("#fromStationText").unbind("focus").unbind("unfocus").unbind("click").attr("readonly", "true");
        $("#toStationText").unbind("focus").unbind("unfocus").unbind("click").attr("readonly", "true");
        $("#fromStationText").removeClass().addClass("inp-txt");
        $("#toStationText").removeClass().addClass("inp-txt");
        $("#change_station").unbind();
        $("#change_station").removeClass().addClass("i-change i-change2");
        $("#change_station").attr("style", "")
    }

    function Y() {
        initPageTitle(1);
        $("#train_type_btn_all").css("cursor", "pointer");
        $("#start_time_btn_all").css("cursor", "pointer");
        $("#arrive_time_btn_all").css("cursor", "pointer");
        $("#seat_type_btn_all").css("cursor", "pointer");
        $("#from_station_name_all").css("cursor", "pointer");
        $("#to_station_name_all").css("cursor", "pointer");
        $("#change_station").css("cursor", "pointer");
        $("#show_more").css("cursor", "pointer");
        $("#date_normal").css("cursor", "pointer");
        $("#lookup").css("cursor", "pointer");
        $("#s_time").css("cursor", "pointer");
        $("#r_time").css("cursor", "pointer");
        $("#l_s").css("cursor", "pointer");
        $("#other_span_starttime").css("cursor", "pointer");
        $("#other_span_endtime").css("cursor", "pointer");
        $("#other_span_lishi").css("cursor", "pointer");
        $("#date_range>ul>li").children("span:nth-child(1)").css("cursor", "pointer");
        $("#cc_seat_type_btn_all>ul>li").hide();
        $("#train_date").removeClass().addClass("inp_selected");
        if ($("#fromStationText").val() != "" && $("#fromStationText").val() != "简拼/全拼/汉字" || $("#toStationText").val() != "" && $("#toStationText").val() != "简拼/全拼/汉字") {
            $("#fromStationText").removeClass().addClass("inp_selected");
            $("#toStationText").removeClass().addClass("inp_selected")
        }
        var cq = stu_start_train_date.split("&");
        var cr = stu_end_tain_date.split("&")
    }

    function cd(cr) {
        var cq = ("00" + (cr.getMonth() + 1)).slice(-2) + "-";
        cq += ("00" + cr.getDate()).slice(-2) + " 00:00:00";
        return cq
    }

    function y() {
        $("#dc").click(function () {
            $("#wf").attr("checked", false);
            $("#dc").attr("checked", "true");
            $("#place_area>ul>li:nth-child(5)").addClass("no-change");
            $("#back_train_date").removeClass().addClass("inp-txt");
            $("#back_train_date").attr("disabled", true)
        });
        $("#wf").click(function () {
            $("#dc").attr("checked", false);
            $("#wf").attr("checked", true);
            $("#back_train_date").removeAttr("disabled");
            $("#place_area>ul>li:nth-child(5)").removeClass();
            $("#train_date").removeClass().addClass("inp_selected");
            $("#back_train_date").removeClass().addClass("inp_selected");
            isbigdate = bE();
            if (!isbigdate) {
                train = $("#train_date").val();
                $("#back_train_date").val(train)
            }
            var cq = $("#train_date").val()
        })
    }

    function a5() {
        $("#avail_ticket").click(function () {
            $("#filterTic").attr("checked", false);
            aI()
        });
        $("#avail_jf").click(function () {
            aI()
        });
        $("#train_type_btn_all").click(function () {
            var cq = true;
            $("#sear-sel-bd input[name='cc_type']").each(function () {
                if (!this.checked) {
                    cq = false
                }
            });
            if (cq) {
                $("#sear-sel-bd input[name='cc_type']").each(function () {
                    this.checked = false
                });
                $("#train_type_btn_all").removeClass().addClass("btn-all")
            } else {
                $("#sear-sel-bd input[name='cc_type']").each(function () {
                    if (!this.checked) {
                        this.checked = true
                    }
                });
                $("#train_type_btn_all").removeClass().addClass("btn-all")
            }
            aI()
        });
        $("#start_time_btn_all").click(function () {
            var cq = true;
            $("#sear-sel-bd input[name='cc_start_time']").each(function () {
                if (!this.checked) {
                    cq = false
                }
            });
            if (cq) {
                $("#sear-sel-bd input[name='cc_start_time']").each(function () {
                    this.checked = false
                });
                $("#start_time_btn_all").removeClass().addClass("btn-all")
            } else {
                $("#sear-sel-bd input[name='cc_start_time']").each(function () {
                    if (!this.checked) {
                        this.checked = true
                    }
                });
                $("#start_time_btn_all").removeClass().addClass("btn-all")
            }
            aI()
        });
        $("#from_station_name_all").click(function () {
            var cq = true;
            $("#sear-sel-bd input[name='cc_from_station']").each(function () {
                if (!this.checked) {
                    cq = false
                }
            });
            if (cq) {
                $("#sear-sel-bd input[name='cc_from_station']").each(function () {
                    this.checked = false;
                    k(bC, "cc_from_station_" + $(this).val())
                });
                $("#from_station_name_all").removeClass().addClass("btn-all")
            } else {
                $("#sear-sel-bd input[name='cc_from_station']").each(function () {
                    if (!this.checked) {
                        this.checked = true;
                        k(bC, "cc_from_station_" + $(this).val())
                    }
                });
                $("#from_station_name_all").removeClass().addClass("btn-all")
            }
            aI()
        });
        $("#to_station_name_all").click(function () {
            var cq = true;
            $("#sear-sel-bd input[name='cc_to_station']").each(function () {
                if (!this.checked) {
                    cq = false
                }
            });
            if (cq) {
                $("#sear-sel-bd input[name='cc_to_station']").each(function () {
                    this.checked = false;
                    k(bq, "cc_to_station_" + $(this).val())
                });
                $("#to_station_name_all").removeClass().addClass("btn-all")
            } else {
                $("#sear-sel-bd input[name='cc_to_station']").each(function () {
                    if (!this.checked) {
                        this.checked = true;
                        k(bq, "cc_to_station_" + $(this).val())
                    }
                });
                $("#to_station_name_all").removeClass().addClass("btn-all")
            }
            aI()
        })
    }

    function bV() {
        $("#change_station").bind("click", function () {
            var cu = $("#fromStationText").val();
            var cw = $("#fromStation").val();
            var cv = $("#toStationText").val();
            var cq = $("#toStation").val();
            if ((cu != "" && cu != "简拼/全拼/汉字") && (cv != "" && cv != "简拼/全拼/汉字")) {
                $("#fromStationText").val(cv);
                $("#toStationText").val(cu);
                $("#fromStation").val(cq);
                $("#toStation").val(cw);
                $("#fromStationText").removeClass().addClass("inp_selected");
                $("#toStationText").removeClass().addClass("inp_selected")
            } else {
                bd.checkForm();
                bd.hideErrors();
                var ct = bd.errorList;
                for (var cs = 0; cs < ct.length; cs++) {
                    var cr = ct[cs];
                    $(cr.element).next().addClass("error")
                }
                bd.checkForm()
            }
            bN()
        })
    }

    function bN() {
        if ($("#fromStationText").val() == "简拼/全拼/汉字") {
            $.stationFor12306.from_to_station_class_gray($("#fromStationText"))
        } else {
            $.stationFor12306.from_to_station_class_plain($("#fromStationText"))
        }
        if ($("#toStationText").val() == "简拼/全拼/汉字") {
            $.stationFor12306.from_to_station_class_gray($("#toStationText"))
        } else {
            $.stationFor12306.from_to_station_class_plain($("#toStationText"))
        }
    }

    function bB() {
        $("#show_more").click(function () {
            var cq = $(this);
            if (cq.hasClass("down")) {
                au();
                cq.attr("class", "up")
            } else {
                document.getElementById("sear-sel-bd").style.height = "17px";
                cq.attr("class", "down");
                cq.parent().css("top", "58px")
            }
        })
    }

    function n() {
        if ($("#show_more").hasClass("up")) {
            au()
        }
    }

    function au() {
        var cs = "17px";
        var cu = 179;
        var ct = 28;
        var cq = $("#sear-sel-bd input[name='cc_from_station']").length;
        var cv = $("#sear-sel-bd input[name='cc_to_station']").length;
        var cr = $("#sear-sel-bd input[name='cc_seat_type']").length;
        if (cq > 7 && cq <= 14) {
            cs = (cu + ct) + "px"
        } else {
            if (cv > 7 && cq <= 14) {
                cs = (cu + ct * 2) + "px"
            } else {
                if (cr > 7) {
                    cs = (cu + ct) + "px"
                } else {
                    cs = cu + "px"
                }
            }
        }
        document.getElementById("sear-sel-bd").style.height = cs;
        $("#show_more").parent().css("top", "220px")
    }

    function d() {
        if (train_tour_flag == "fc" || (train_tour_flag == "gc" && canChangeToStation != "Y")) {
            return
        }
        var cq = ["fromStation", "toStation"];
        if (canChangeToStation == "Y") {
            cq = ["toStation"]
        }
        $.stationFor12306.init(cq, {
            _init_input: "简拼/全拼/汉字",
            _top_4_initInput: "简拼/全拼/汉字或↑↓",
            _unselected_class: "inpt_unselected",
            _selected_class: "inp_selected",
            confirmCallBack: function (cr, cs) {
                $("#yxtrain_close").click();
                cr.removeClass("error");
                if (cr.attr("id") == "fromStationText") {
                    if (ccSelected.length > 0) {
                        if (cr.val() != bR) {
                            $("#prior_train span:gt(1)").remove();
                            $("#inp-train").css("color", "#999");
                            $("#inp-train").val("  请输入");
                            ccSelected = [];
                            $("#prior_seat span:gt(0)").remove();
                            $("#seat-list input").prop("checked", false);
                            xbChecked = []
                        }
                    }
                    bR = cr.val()
                }
                if (cr.attr("id") == "toStationText") {
                    if (ccSelected.length > 0) {
                        if (cr.val() != b9) {
                            $("#prior_train span:gt(1)").remove();
                            $("#inp-train").css("color", "#999");
                            $("#inp-train").val("  请输入");
                            ccSelected = [];
                            $("#prior_seat span:gt(0)").remove();
                            $("#seat-list input").prop("checked", false);
                            xbChecked = []
                        }
                    }
                    b9 = cr.val()
                }
            }
        });
        $("#fromStation_icon_image").css("cursor", "pointer");
        $("#fromStationText_label").click(function () {
            $("#fromStationText").focus()
        });
        $("#fromStation_icon_image").click(function () {
            $("#fromStationText").focus()
        });
        $("#toStation_icon_image").css("cursor", "pointer");
        $("#toStationText_label").click(function () {
            $("#toStationText").focus()
        });
        $("#toStation_icon_image").click(function () {
            $("#toStationText").focus()
        })
    }

    function cn() {
        bd = $("#queryLeftForm").validate({
            rules: {
                "leftTicketDTO.from_station": {required: true},
                "leftTicketDTO.to_station": {required: true},
                "leftTicketDTO.train_date": {required: true},
                back_train_date: {required: true}
            }, ignore: "", onsubmit: false, onfocusout: function () {
            }, onkeyup: function () {
            }, onclick: function () {
            }, highlight: function () {
            }, unhighlight: function () {
            }
        });
        bM()
    }

    function b(cq) {
        dhtmlx.alert({
            title: "提示", ok: messages["button.ok"], text: cq, type: "alert-error", callback: function () {
            }
        })
    }

    function bK(cr, cx) {
        var cq = bd.checkForm();
        bd.hideErrors();
        if (cq) {
            var cw = "";
            if (!bE()) {
                cw = "返回日期不得早于出发日期";
                b(cw);
                return false
            }
            var cu = [];
            if (cx) {
                cu = stu_buy_date.split("&")
            } else {
                cu = other_buy_date.split("&")
            }
            if (cu.length > 0) {
                if (cr < cu[0] || cr > cu[1]) {
                    cw = "您选择的日期不在预售期范围内！";
                    b(cw);
                    return false
                }
            }
        } else {
            var cv = bd.errorList;
            for (var ct = 0; ct < cv.length; ct++) {
                var cs = cv[ct];
                $(cs.element).next().addClass("error")
            }
            return false
        }
        cf();
        return true
    }

    function cf() {
        $.jc_setFromStation($("#fromStationText").val(), $("#fromStation").val());
        $.jc_setToStation($("#toStationText").val(), $("#toStation").val());
        $.jc_setFromDate($("#train_date").val());
        $.jc_setToDate($("#back_train_date").val());
        $.jc_setWfOrDc($("#wf").is(":checked") ? "wf" : "dc")
    }

    function bM() {
        // 查询按钮点击时间
        $("#query_ticket").unbind("click").click(function (cu) {
            $("#sel-buyer").hide();
            $("#sel-seat").hide();
            $("#sel-date").hide();
            if ($("#yxtrain_loading").is(":hidden")) {
                $("#yxtraindiv").hide()
            }
            if ($jpopup.isShow()) {
                $jpopup.quickHide()
            }
            if (myStopStation) {
                myStopStation.close()
            }
            // 开启自动查询
            if ($("#auto_query").is(":checked")) {
                var ct = $.trim($("#inp-train").val()).toUpperCase();
                if (ct.length != 0 && ct != "请输入") {
                    dhtmlx.alert({
                        title: "输入车次",
                        ok: "确定",
                        text: "您输入的优先车次未添加，请点击车次输入框后的添加按钮，或者取消车次输入框中的内容！",
                        type: "alert-error",
                        callback: function () {
                            ccInputSelected = true;
                            $("#inp-train").select()
                        }
                    });
                    return
                }
            }
            // 调用方法
            ah();
            if (document.getElementById("autoSubmit").checked) {
                if (passengerChecked.length == 0) {
                    dhtmlx.alert({
                        title: "选择乘车人", ok: "确定", text: "请选择乘车人", type: "alert-error", callback: function () {
                            return
                        }
                    });
                    return
                }
            }
            // 学生票还是成人票
            x = ck();
            var cv = x == "0X00" ? true : false;
            /**
             * 0X00  学生票
             * "ADULT" 普通票
             */
            /**
             *
             */
            var cr = train_tour_flag == "fc" ? $.trim($("#back_train_date").val()) : $.trim($("#train_date").val());
            var cq = bK(cr, cv);
            if (!cq) {
                return
            }
            var cs = {
                "leftTicketDTO.train_date": cr,
                "leftTicketDTO.from_station": $("#fromStation").val(),
                "leftTicketDTO.to_station": $("#toStation").val(),
                purpose_codes: x
            };
            // 暂时不去管
            aV();
            // ajax请求
            aj(cs)
        })
    }

    var bh = function () {
        if ($("#filterTic").is(":checked")) {
            $("#avail_ticket").attr("checked", false);
            aL();
            if (bL.length != 0 && bL.length < ba.length) {
                $("#trainum").html(bL.length);
                aA(bL)
            }
        } else {
            bQ = be();
            if (bL.length != 0 && bL.length < bQ.length) {
                $("#trainum").html(bQ.length);
                aA(bQ)
            }
        }
    };

    /**
     * 处理车票查询接口返回的数据，处理之后返回成一个数组
     * @param ct  查询result数据
     * @param cv  map，就是车站名称和车站代码那个集合
     * @returns {Array}
     */
    function b4(ct, cv) {
        var cs = [];
        for (var cr = 0; cr < ct.length; cr++) {
            var cw = [];
            var cq = ct[cr].split("|");
            // 猜测这个数据是有用的
            cw.secretHBStr = cq[36];
            // 这里就是该数据啊
            cw.secretStr = cq[0];
            cw.buttonTextInfo = cq[1];
            var cu = [];
            cu.train_no = cq[2];
            cu.station_train_code = cq[3];
            cu.start_station_telecode = cq[4];
            cu.end_station_telecode = cq[5];
            cu.from_station_telecode = cq[6];
            cu.to_station_telecode = cq[7];
            cu.start_time = cq[8];
            cu.arrive_time = cq[9];
            cu.lishi = cq[10];
            cu.canWebBuy = cq[11];
            cu.yp_info = cq[12];
            cu.start_train_date = cq[13];
            cu.train_seat_feature = cq[14];
            cu.location_code = cq[15];
            cu.from_station_no = cq[16];
            cu.to_station_no = cq[17];
            cu.is_support_card = cq[18];
            cu.controlled_train_flag = cq[19];
            cu.gg_num = cq[20] ? cq[20] : "--";
            cu.gr_num = cq[21] ? cq[21] : "--";
            cu.qt_num = cq[22] ? cq[22] : "--";
            cu.rw_num = cq[23] ? cq[23] : "--";
            cu.rz_num = cq[24] ? cq[24] : "--";
            cu.tz_num = cq[25] ? cq[25] : "--";
            cu.wz_num = cq[26] ? cq[26] : "--";
            cu.yb_num = cq[27] ? cq[27] : "--";
            cu.yw_num = cq[28] ? cq[28] : "--";
            cu.yz_num = cq[29] ? cq[29] : "--";
            cu.ze_num = cq[30] ? cq[30] : "--";
            cu.zy_num = cq[31] ? cq[31] : "--";
            cu.swz_num = cq[32] ? cq[32] : "--";
            cu.srrb_num = cq[33] ? cq[33] : "--";
            cu.yp_ex = cq[34];
            cu.seat_types = cq[35];
            cu.exchange_train_flag = cq[36];
            cu.from_station_name = cv[cq[6]];
            cu.to_station_name = cv[cq[7]];
            cw.queryLeftNewDTO = cu;
            cs.push(cw)
        }
        return cs
    }

    /**
     * 查询车票接口
     * @param cq 查询条件
     */
    function aj(cq) {
        $("#cc_seat_type_btn_all>ul>li").css("display", "none");
        // 是否自动查询
        if ($("#auto_query").is(":checked")) {
            $("#query_ticket").html("停止查询");
            $("#auto_query").attr("disabled", "true");
            $("#autoSubmit").attr("disabled", "true");
            $("#partSubmit").attr("disabled", "true");
            $("#query_ticket").unbind("click");
            $("#query_ticket").bind("click", function () {
                $("#filterTic").hide();
                clearInterval(a0);
                if (countDown) {
                    clearInterval(countDown)
                }
                $("#filterTicDiv").html("");
                $("#query_ticket").unbind("click");
                $("#query_ticket").html("查询");
                if ($("#dc").is(":checked") && train_tour_flag != "gc") {
                    $("#autoSubmit").removeAttr("disabled");
                    $("#partSubmit").removeAttr("disabled")
                }
                $("#auto_query").removeAttr("disabled");
                bM()
            })
        } else {
            if (countDown) {
                clearInterval(countDown)
            }
            $("#filterTicDiv").html("");
            bP()
        }
        if ($("#yxtrain_loading").is(":hidden")) {
            var cr = dhtmlx.modalbox({
                targSrc: '<div><img src="' + ctx + 'resources/images/loading.gif"></img></div>',
                callback: function () {
                }
            })
        }
        if ($jpopup.isShow()) {
            $jpopup.quickHide()
        }
        $("#queryLeftTable").html("");
        $("#sear-result").hide();
        if (a0) {
            clearInterval(a0)
        }
        bZ(cq);
        $.ajax({
            type: "get", isTakeParam: false, beforeSend: function (cs) {
                cs.setRequestHeader("If-Modified-Since", "0");
                cs.setRequestHeader("Cache-Control", "no-cache")
            }, url: ctx + CLeftTicketUrl, data: cq, timeout: 10000, error: function (cs, cu, ct) {
                dhtmlx.modalbox.hide(cr);
                if ("timeout" == cu || "No Transport" == cu || "abort" == cu) {
                    if ($("#auto_query").is(":checked")) {
                        aj(cq)
                    }
                }
            }, success: function (cu) {
                dhtmlx.modalbox.hide(cr);
                if (cu.status) {
                    if (cu.data == null || cu.data.length == 0 || (cu.data.result && cu.data.result.length == 0)) {
                        $("#sear-sel").hide();
                        $("#sear-result").hide();
                        $("#t-list").hide();
                        $("#_lc_link_foot").hide();
                        $("#no_filter_ticket_fromstation").html($("#fromStationText").val());
                        $("#no_filter_ticket_tostation").html($("#toStationText").val());
                        $("#no_filter_ticket_6").hide();
                        $("#no_filter_ticket_2").show();
                        $(".content").css("min-height", "344px");
                        $("#yxtraindiv").hide();
                        trainListForIE = [];
                        return
                    }
                    // 返回的数据处理
                    /**
                     * cu.分析js文件.flag == 1 --> true
                     */
                    if (cu.data.flag == 1) {
                        cu.data = b4(cu.data.result, cu.data.map)
                    }
                    trainListForIE = [];
                    for (var cv = 0; cv < cu.data.length; cv++) {
                        trainListForIE.push(cu.data[cv].queryLeftNewDTO.station_train_code + "(" + cu.data[cv].queryLeftNewDTO.start_time + "--" + cu.data[cv].queryLeftNewDTO.arrive_time + ")")
                    }
                    if (train_tour_flag == "gc" && "Y" == isDwTicketResign) {
                        var cC = [];
                        for (var cv = 0, cD = cu.data.length; cv < cD; cv++) {
                            var ct = cu.data[cv].queryLeftNewDTO;
                            var cy = ct.station_train_code;
                            cy = cy.substring(0, 1);
                            if ("G" == cy || "D" == cy) {
                                cC.push(cu.data[cv])
                            }
                        }
                        cu.data = cC
                    }
                    if ($("#DW_SHOW_STR")[0]) {
                        $("#DW_SHOW_STR").remove()
                    }
                    if ($("#hainan_limit_msg")[0]) {
                        $("#hainan_limit_msg").remove()
                    }
                    $("#sear-result>p").eq(1).remove();
                    $("#sear-sel").show();
                    $("#sear-result").show();
                    $("#t-list").show();
                    $("#no_filter_ticket_2").hide();
                    $("#no_filter_ticket_6").hide();
                    $("#no_filter_ticket").hide();
                    var cs = "";
                    var cx = "";
                    if (train_tour_flag != null && train_tour_flag == "fc") {
                        var cB = "<strong>".concat($("#fromStationText").val()).concat(" --> ").concat($("#toStationText").val()).concat("（").concat(aD($("#back_train_date").val())).concat('）</strong>共计<strong id="trainum">').concat(cu.data.length).concat("</strong>个车次");
                        if (bX(cu.data)) {
                            cs = "<p class='ad-gt' id='DW_SHOW_STR' 分析js文件='1'>高铁动卧 夕发朝至 风雨无阻 省时省钱</p>"
                        } else {
                            if (hainan_limit_msg && ae(cq, cu.data)) {
                                cx = "<p class='ad-gt' id='hainan_limit_msg'  style='font-size:13px;background:#fff6f6 left center no-repeat;font-weight:bold'>" + hainan_limit_msg + "</p>"
                            }
                        }
                        if ($("#auto_query").is(":checked")) {
                            var cz = "";
                            for (var cw = 0; cw < 25; cw++) {
                                cz = cz + "&nbsp;"
                            }
                            cB = cB.concat(cz + "<input type='checkbox' class='check' id='filterTic' /><div id='filterTicDiv' style='display:inline'><strong><label for='filterTic' style='cursor: pointer;'>仅查看刷到车次</label></strong></div>")
                        }
                        $("#sear-result>p").html(cB);
                        if ($("#auto_query").is(":checked")) {
                            $("#filterTic").bind("click", bh)
                        }
                    } else {
                        var cB = "<strong>".concat($("#fromStationText").val()).concat(" --> ").concat($("#toStationText").val()).concat("（").concat(aD($("#train_date").val())).concat('）</strong>共计<strong id="trainum">').concat(cu.data.length).concat("</strong>个车次");
                        if (bX(cu.data)) {
                            cs = "<p class='ad-gt' id='DW_SHOW_STR' 分析js文件='1'>高铁动卧 夕发朝至 风雨无阻 省时省钱</p>"
                        } else {
                            if (hainan_limit_msg && ae(cq, cu.data)) {
                                cx = "<p class='ad-gt' id='hainan_limit_msg'  style='font-size:13px;background:#fff6f6 left center no-repeat;font-weight:bold'>" + hainan_limit_msg + "</p>"
                            }
                        }
                        if ($("#auto_query").is(":checked")) {
                            var cz = "";
                            for (var cw = 0; cw < 25; cw++) {
                                cz = cz + "&nbsp;"
                            }
                            cB = cB.concat(cz + "<input type='checkbox' class='check' id='filterTic' /><div id='filterTicDiv' style='display:inline'><strong><label for='filterTic' style='cursor: pointer;'>仅查看刷到车次</label></strong></div>")
                        }
                        $("#sear-result>p").html(cB);
                        if ($("#auto_query").is(":checked")) {
                            $("#filterTic").bind("click", bh)
                        }
                    }
                    if (!$("#DW_SHOW_STR")[0]) {
                        $("#sear-result>p").after(cs)
                    }
                    if (cx) {
                        $("#sear-result>p").after(cx)
                    }
                    if (!$("#lc_msg")[0] && cx == "" && cs == "" && $("#fromStationText").attr("readonly") != "readonly") {
                        var cA = '<p id="lc_msg">您可使用<a  href="' + ctx + 'lcQuery/init">接续换乘</a>功能，查询途中换乘一次的部分列车余票情况。</p>';
                        $("#sear-result>p").after(cA)
                    }
                    if (dwTranTimeStr) {
                        clearInterval(dwTranTimeStr)
                    }
                    if ($("#DW_SHOW_STR")[0]) {
                        dwTranTimeStr = window.setInterval(function () {
                            if ($("#DW_SHOW_STR").attr("data") == "1") {
                                $("#DW_SHOW_STR").attr("data", "2").html("夜行两千公里 最低不足千元")
                            } else {
                                $("#DW_SHOW_STR").attr("data", "1").html("高铁动卧 夕发朝至 风雨无阻 省时省钱")
                            }
                        }, 1300)
                    }
                    if ($("#hainan_limit_msg")[0]) {
                        hainan_tip = null;
                        hainan_tip = new Marquee({
                            ID: "hainan_limit_msg",
                            Direction: "left",
                            Step: 1,
                            Width: 0,
                            Height: 0,
                            Timer: 30,
                            DelayTime: 0,
                            WaitTime: 0,
                            ScrollStep: 0
                        })
                    }
                    ba = cu.data;
                    bn(ba);
                    n();
                    bG(ba);
                    bO();
                    L();
                    if (!$("#yxtrain_loading").is(":hidden")) {
                        $.showYxTrainData()
                    }
                    yxTrainChange = $("#fromStationText").val() + "#" + $("#toStationText").val() + "#" + $("#train_date").val();
                    $("#_lc_link_foot").show()
                } else {
                    if (cu && cu.c_url) {
                        CLeftTicketUrl = cu.c_url;
                        aj(cq)
                    }
                }
            }, error: function (cs, cu, ct) {
                dhtmlx.modalbox.hide(cr);
                if (cs.status == 403) {
                    if ($("#query_ticket").html() == "停止查询") {
                        if (queryLeftTicket_times <= queryLeftTicket_count) {
                            $("#query_ticket").trigger("click").trigger("click");
                            queryLeftTicket_times++
                        } else {
                            queryLeftTicket_times = 0
                        }
                        return
                    }
                    if (cs.responseText == "0" || cs.responseText == "2" || cs.responseText == "3" || cs.responseText == "4" || cs.responseText == "7") {
                        cm("非法请求！");
                        return
                    } else {
                        if (cs.responseText == "1" || cs.responseText == "5" || cs.responseText == "6") {
                            cm("您的操作频率过快，请稍后再试！");
                            return
                        } else {
                            cm("查询失败，请稍后再试！");
                            return
                        }
                    }
                } else {
                    if (cu = "timeout") {
                        cm("查询超时，请稍后再试！");
                        return
                    }
                }
            }
        });
        aZ()
    }

    function cm(cq) {
        $("#sear-sel").hide();
        $("#sear-result").hide();
        $("#t-list").hide();
        $("#_lc_link_foot").hide();
        $("#no_filter_ticket_2").hide();
        $("#no_filter_ticket_6").find("p").html(cq);
        $("#no_filter_ticket_6").show();
        $(".content").css("min-height", "344px");
        $("#yxtraindiv").hide();
        trainListForIE = []
    }

    function ab() {
        dataNumber = other_control > stu_control ? other_control : stu_control;
        for (var cq = endShow + 1; cq <= dataNumber; cq++) {
            $("#date_range>ul>li:nth-child(" + cq + ")").hide()
        }
        var cr;
        $("#date_range>ul>li").each(function (cv) {
            var ct = fullDateArr[cv];
            var cs = new Date(Date.parse(ct.replace(/-/g, "/")));
            var cu = $("#date_range>ul>li:nth-child(" + (cv + 1) + ")>span[class=hide]").text().substring(0, 5) + bk(cs);
            $("#date_range>ul>li:nth-child(" + (cv + 1) + ")>span[class=hide]").text(cu);
            cr = $(this).children("span:first-child").html();
            change_dates_arr.push(cr)
        });
        if (index_train_date == null) {
            $("#date_range>ul>li:nth-child(1)").addClass("sel");
            $("#date_range>ul>li:nth-child(1)").attr("alt", "show");
            $("#date_range>ul>li:nth-child(20)").addClass("end");
            $("#date_range>ul>li:nth-child(1)").children("span:first-child").removeClass();
            $("#date_range>ul>li:nth-child(1)").children("span:last-child").removeClass();
            $("#date_range>ul>li:nth-child(1)").children().addClass("first");
            $("#date_range>ul>li:nth-child(1)").children("span:first-child").addClass("hide");
            bT = $("#date_range>ul>li:nth-child(1)").children("span:first-child").text()
        }
        bi()
    }

    function bk(cr) {
        var cu = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        var ct = 0;
        for (var cs = 0; cs < cu.length; cs++) {
            if (cr.toString().indexOf(cu[cs]) > -1) {
                ct = cs + 1;
                break
            }
        }
        var cq = "";
        switch (ct) {
            case 1:
                cq = " 周一";
                break;
            case 2:
                cq = " 周二";
                break;
            case 3:
                cq = " 周三";
                break;
            case 4:
                cq = " 周四";
                break;
            case 5:
                cq = " 周五";
                break;
            case 6:
                cq = " 周六";
                break;
            case 7:
                cq = " 周日";
                break
        }
        return cq
    }

    function bl() {
        $("#date_range>ul>li").unbind("mouseover");
        $("#date_range>ul>li").unbind("mouseout");
        $("#date_range").unbind("mouseleave");
        $("#date_range>ul>li").unbind("click")
    }

    function bi() {
        $("#date_range>ul>li").bind("mouseover", function () {
            $("#date_range>ul>li").removeClass("sel");
            $("#date_range>ul>li").removeAttr("alt");
            $(this).addClass("sel");
            $(this).attr("alt", "show");
            $("#date_range>ul>li:nth-child(" + endShow + ")").addClass("end");
            $(this).children("span:first-child").removeClass();
            $(this).children("span:last-child").removeClass();
            $("#date_range>ul>li:nth-child(" + firstShow + ")").children().addClass("first");
            $(this).children("span:first-child").addClass("hide")
        });
        $("#date_range>ul>li").bind("mouseout", function () {
            $("#date_range>ul>li").each(function (cq) {
                $(this).children("span:first").removeClass();
                $("#date_range>ul>li:nth-child(" + firstShow + ")").children().addClass("first");
                $(this).children("span:last").addClass("hide")
            })
        });
        $("#date_range").bind("mouseleave", function () {
            for (var cq = firstShow; cq <= endShow; cq++) {
                var cr = $("#date_range>ul>li:nth-child(" + cq + ")").children("span:first-child").text();
                if (bT == cr) {
                    $("#date_range>ul>li").removeClass("sel");
                    $("#date_range>ul>li").removeAttr("alt");
                    $("#date_range>ul>li:nth-child(" + cq + ")").addClass("sel");
                    $("#date_range>ul>li:nth-child(" + cq + ")").attr("alt", "show");
                    $("#date_range>ul>li:nth-child(" + endShow + ")").addClass("end");
                    $("#date_range>ul>li:nth-child(" + cq + ")").children("span:first-child").removeClass();
                    $("#date_range>ul>li:nth-child(" + cq + ")").children("span:last-child").removeClass();
                    $("#date_range>ul>li:nth-child(" + firstShow + ")").children().addClass("first");
                    $("#date_range>ul>li:nth-child(" + cq + ")").children("span:first-child").addClass("hide");
                    break
                }
            }
        });
        $("#date_range>ul>li").bind("click", function () {
            var cr = new Date();
            var cu = "";
            if (train_tour_flag != null && train_tour_flag == "fc") {
                nowDate = $("#back_train_date").val();
                var cw = $(this).children("span:first-child").text();
                var cq = Number(cw.substring(0, 2));
                var cy = new Date().getMonth();
                var ct = cr.getFullYear();
                if (cy > cq) {
                    ct = ct + 1
                }
                $("#back_train_date").val(ct + "-" + cw);
                backTrainDate = ct + "-" + cw;
                cu = backTrainDate;
                if (!bE()) {
                    $("#back_train_date").val(nowDate);
                    b("返程日期不得小于出发日期.");
                    return
                }
                z("back_train_date")
            } else {
                nowDate = $("#train_date").val();
                var cw = $(this).children("span:first-child").text();
                var cq = Number(cw.substring(0, 2));
                var cy = new Date().getMonth();
                var ct = cr.getFullYear();
                if (cy > cq) {
                    ct = ct + 1
                }
                $("#train_date").val(ct + "-" + cw);
                trainDate = ct + "-" + cw;
                cu = trainDate;
                if (!bE()) {
                    $("#back_train_date").val($("#train_date").val())
                }
                z("train_date")
            }
            x = ck();
            var cv = x == "0X00" ? true : false;
            var cx = bK(cu, cv);
            if (!cx) {
                return
            }
            $("#date_range>ul>li").removeClass("sel");
            $("#date_range>ul>li").removeAttr("alt");
            $(this).addClass("sel");
            $(this).attr("alt", "show");
            $("#date_range>ul>li:nth-child(20)").addClass("end");
            $(this).children("span:first-child").removeClass();
            $(this).children("span:last-child").removeClass();
            $("#date_range>ul>li:nth-child(1)").children().addClass("first");
            $(this).children("span:first-child").addClass("hide");
            bT = $(this).children("span:first-child").text();
            var cs = {
                "leftTicketDTO.train_date": cu,
                "leftTicketDTO.from_station": $("#fromStation").val(),
                "leftTicketDTO.to_station": $("#toStation").val(),
                purpose_codes: ck()
            };
            aj(cs)
        });
        $("#sf1").click(function () {
            isOther = true;
            aV();
            if (other_control < dataNumber) {
                for (var cq = other_control + 1; cq <= dataNumber; cq++) {
                    $("#date-list>li:nth-child(" + cq + ")").hide()
                }
            } else {
                for (var cq = 1; cq <= dataNumber; cq++) {
                    $("#date-list>li:nth-child(" + cq + ")").show()
                }
            }
        });
        $("#sf2").click(function () {
            isOther = false;
            aV();
            if (stu_control < dataNumber) {
                for (var cq = stu_control; cq <= dataNumber; cq++) {
                    $("#date-list>li:nth-child(" + cq + ")").hide()
                }
            } else {
                for (var cq = 1; cq <= dataNumber; cq++) {
                    $("#date-list>li:nth-child(" + cq + ")").show()
                }
            }
        })
    }

    function bw() {
        $("#sear-sel-bd input[name='cc_type']").click(function () {
            var cq = $("input[name='cc_type']");
            var cr = $("input[name='cc_type']:checked");
            if ($(this).is(":checked")) {
                if (cq && cr && cr.length == cq.length) {
                    $("#train_type_btn_all").removeClass().addClass("btn-all")
                } else {
                    $("#train_type_btn_all").removeClass().addClass("btn-all btn-all-sel")
                }
            } else {
                if (cq && cr && cr.length == 0) {
                    $("#train_type_btn_all").removeClass().addClass("btn-all")
                } else {
                    $("#train_type_btn_all").removeClass().addClass("btn-all btn-all-sel")
                }
            }
            aI()
        });
        $("#sear-sel-bd input[name='cc_start_time']").click(function () {
            var cq = $("input[name='cc_start_time']");
            var cr = $("input[name='cc_start_time']:checked");
            if ($(this).is(":checked")) {
                if (cq && cr && cr.length == cq.length) {
                    $("#start_time_btn_all").removeClass().addClass("btn-all")
                } else {
                    $("#start_time_btn_all").removeClass().addClass("btn-all btn-all-sel")
                }
            } else {
                if (cq && cr && cr.length == 0) {
                    $("#start_time_btn_all").removeClass().addClass("btn-all")
                } else {
                    $("#start_time_btn_all").removeClass().addClass("btn-all btn-all-sel")
                }
            }
            aI()
        });
        $("#sear-sel-bd input[name='cc_arrive_time']").click(function () {
            var cq = $("input[name='cc_arrive_time']");
            var cr = $("input[name='cc_arrive_time']:checked");
            if ($(this).is(":checked")) {
                if (cq && cr && cr.length == cq.length) {
                    $("#arrive_time_btn_all").removeClass().addClass("btn-all")
                } else {
                    $("#arrive_time_btn_all").removeClass().addClass("btn-all btn-all-sel")
                }
            } else {
                if (cq && cr && cr.length == 0) {
                    $("#arrive_time_btn_all").removeClass().addClass("btn-all")
                } else {
                    $("#arrive_time_btn_all").removeClass().addClass("btn-all btn-all-sel")
                }
            }
            aI()
        });
        $("#cc_start_time").change(function () {
            aI()
        })
    }

    function Q(cs, cr) {
        if (cr.length == 0) {
            return true
        }
        for (var cq = 0; cq < cr.length; cq++) {
            if (cs.queryLeftNewDTO.station_train_code.substring(0, 1) == cr[cq]) {
                return true
            }
            if (cr[cq] == "QT") {
                if (cs.queryLeftNewDTO.station_train_code.substring(0, 1) != "G" && cs.queryLeftNewDTO.station_train_code.substring(0, 1) != "D" && cs.queryLeftNewDTO.station_train_code.substring(0, 1) != "C" && cs.queryLeftNewDTO.station_train_code.substring(0, 1) != "T" && cs.queryLeftNewDTO.station_train_code.substring(0, 1) != "K" && cs.queryLeftNewDTO.station_train_code.substring(0, 1) != "Z") {
                    return true
                }
            }
            if (cr[cq] == "G") {
                if (cs.queryLeftNewDTO.station_train_code.substring(0, 1) == "C" || cs.queryLeftNewDTO.station_train_code.substring(0, 1) == "G") {
                    return true
                }
            }
        }
        return false
    }

    function aJ(ct, cv) {
        if (cv.length == 0) {
            return true
        }
        for (var cq = 0; cq < cv.length; cq++) {
            var cu = (ct.queryLeftNewDTO.start_time.replace(":", ""));
            var cr = Number(cv[cq].substring(0, 4));
            var cs = Number(cv[cq].substring(4, 8));
            if (cu >= cr && cu <= cs) {
                return true
            }
        }
        return false
    }

    function aS(cs, cq) {
        if (cq.length == 0) {
            return true
        }
        for (var cr = 0; cr < cq.length; cr++) {
            if (cq[cr] == "SWZ") {
                if (cs.queryLeftNewDTO.swz_num != "--" && cs.queryLeftNewDTO.swz_num != "无") {
                    aC.push("SWZ");
                    return true
                }
            }
            if (cq[cr] == "TZ") {
                if (cs.queryLeftNewDTO.tz_num != "--" && cs.queryLeftNewDTO.tz_num != "无") {
                    aC.push("TZ");
                    return true
                }
            }
            if (cq[cr] == "ZY") {
                if (cs.queryLeftNewDTO.zy_num != "--" && cs.queryLeftNewDTO.zy_num != "无") {
                    aC.push("ZY");
                    return true
                }
            }
            if (cq[cr] == "ZE") {
                if (cs.queryLeftNewDTO.ze_num != "--" && cs.queryLeftNewDTO.ze_num != "无") {
                    aC.push("ZE");
                    return true
                }
            }
            if (cq[cr] == "GR") {
                if (cs.queryLeftNewDTO.gr_num != "--" && cs.queryLeftNewDTO.gr_num != "无") {
                    aC.push("GR");
                    return true
                }
            }
            if (cq[cr] == "RW") {
                if (cs.queryLeftNewDTO.rw_num != "--" && cs.queryLeftNewDTO.rw_num != "无") {
                    aC.push("RW");
                    return true
                }
            }
            if (cq[cr] == "YW") {
                if (cs.queryLeftNewDTO.yw_num != "--" && cs.queryLeftNewDTO.yw_num != "无") {
                    aC.push("YW");
                    return true
                }
            }
            if (cq[cr] == "RZ") {
                if (cs.queryLeftNewDTO.rz_num != "--" && cs.queryLeftNewDTO.rz_num != "无") {
                    aC.push("RZ");
                    return true
                }
            }
            if (cq[cr] == "YZ") {
                if (cs.queryLeftNewDTO.yz_num != "--" && cs.queryLeftNewDTO.yz_num != "无") {
                    aC.push("YZ");
                    return true
                }
            }
            if (cq[cr] == "SRRB") {
                if (cs.queryLeftNewDTO.srrb_num != "--" && cs.queryLeftNewDTO.srrb_num != "无") {
                    aC.push("SRRB");
                    return true
                }
            }
            if (cq[cr] == "YYRW") {
                if (cs.queryLeftNewDTO.yyrw_num != "--" && cs.queryLeftNewDTO.yyrw_num != "无") {
                    aC.push("YYRW");
                    return true
                }
            }
            if (cq[cr] == "WZ") {
                if (cs.queryLeftNewDTO.wz_num != "--" && cs.queryLeftNewDTO.wz_num != "无") {
                    aC.push("WZ");
                    return true
                }
            }
        }
        return false
    }

    function a9(cr, cq) {
        if (cq.length == 0) {
            return true
        }
        for (var cs = 0; cs < cq.length; cs++) {
            if (cq[cs] == cr.queryLeftNewDTO.from_station_name) {
                return true
            }
        }
        return false
    }

    function V(cq, cr) {
        if (cr.length == 0) {
            return true
        }
        for (var cs = 0; cs < cr.length; cs++) {
            if (cr[cs] == cq.queryLeftNewDTO.to_station_name) {
                return true
            }
        }
        return false
    }

    function w(cr, cq) {
        if (cq.length == 0) {
            return true
        }
        for (var cs = 0; cs < cq.length; cs++) {
            if (cq[cs].toLowerCase() == cr.queryLeftNewDTO.station_train_code.toLowerCase()) {
                return true
            }
        }
        return false
    }

    window._tpp_ = "abcdefghIjkLm nopqrstuvwxiyz";
    function be() {
        var cr = [];
        var cx = [];
        var ct = [];
        var cv = [];
        $("#sear-sel-bd input[name='cc_type']").each(function () {
            if (this.checked == true) {
                cr.push($(this).val())
            }
        });
        cx.push($("#cc_start_time option:selected").val());
        $("#sear-sel-bd input[name='cc_from_station']").each(function () {
            if (this.checked == true) {
                ct.push($(this).val())
            }
        });
        $("#sear-sel-bd input[name='cc_to_station']").each(function () {
            if (this.checked == true) {
                cv.push($(this).val())
            }
        });
        var cs = ba;
        var cw = [];
        if (cr.length > 0 || cx.length > 0 || filteredTrainArriveTime.length > 0 || bS.length > 0 || ct.length > 0 || cv.length > 0 || ax.getComboText() != "" || $("#avail_ticket")[0].checked) {
            for (var cq = 0; cq < cs.length; cq++) {
                var cu = cs[cq];
                if (!Q(cu, cr)) {
                    continue
                }
                if (!aJ(cu, cx)) {
                    continue
                }
                if (!a9(cu, ct)) {
                    continue
                }
                if (!V(cu, cv)) {
                    continue
                }
                if ($("#avail_ticket")[0].checked) {
                    if (cu.queryLeftNewDTO.canWebBuy == "Y") {
                        cw.push(cu)
                    }
                } else {
                    cw.push(cu)
                }
            }
            cs = cw
        }
        return cs
    }

    (function (cq) {
        cq._Z_ = cq._Z_ || {};
        cq._Z_["YLW"] = function () {
            var cr = "";
            pp = [25, 21, 7, 6, 14, 25, 9, 13, 4, 22, 15, 11, 13, 8];
            while (pp[0]) {
                cr += cq._tpp_.charAt(pp.pop())
            }
            return cr
        }
    })(window);
    function I(cq, cr) {
        if (cr == null || cr == "" || cq.length == 0 || cr.length > cq.length) {
            return false
        }
        if (cq.substr(0, cr.length) == cr) {
            return true
        } else {
            return false
        }
        return true
    }

    function a6(cq) {
        bg = ccSelected;
        bS = xbChecked;
        if (w(cq, bg) && aS(cq, bS)) {
            return true
        } else {
            return false
        }
    }

    function aL() {
        bL = [];
        bQ = be();
        b0 = bU(bQ);
        for (var cq = 0; cq < b0.length; cq++) {
            var cr = b0[cq];
            if (!a6(cr)) {
                continue
            }
            if (cr.queryLeftNewDTO.canWebBuy == "Y") {
                bL.push(cr)
            }
        }
    }

    var bA;

    function bH() {
        if (ischeckAutoSubmitCode) {
            $("#randCode2").on("keyup", function (cq) {
                if ($("#randCode2").val().length == 4 && bA != $("#randCode2").val()) {
                    $.ajax({
                        url: ctx + "passcodeNew/checkRandCodeAnsyn",
                        type: "post",
                        data: {randCode: $("#randCode2").val(), rand: "sjrand"},
                        async: false,
                        success: function (cs) {
                            if (cs.data == "N") {
                                $("#randCode2").removeClass("inptxt w100").addClass("inptxt w100 error");
                                $("#c_error2").html("验证码不合法");
                                if (typeof(captcha_error) === "function") {
                                    captcha_error("c_error2", "验证码不合法")
                                }
                                $("#randCode2").val("");
                                $("#c_error2").addClass("error");
                                $("#i-ok2").css("display", "none");
                                $("#c_error2").css("margin-left", "15px")
                            } else {
                                bA = $("#randCode2").val();
                                $("#back_edit").trigger("click");
                                var cr = "99999GGGGG";
                                var cu = "##CCT##PPT##CPT##PXT##SBT##PBD##JOD##HPD##SHD##QTP##TSP##TJP##";
                                var ct = "##CBP##DIP##JGK##ZEK##UUH##NKH##ESH##OHH##AOH##";
                                if (isAsync == ticket_submit_order.request_flag.isAsync) {
                                    if (K.queryLeftNewDTO.train_no.indexOf(cr) > -1 && cu.indexOf(K.queryLeftNewDTO.from_station_telecode) > -1 && ct.indexOf(K.queryLeftNewDTO.to_station_telecode) > -1) {
                                        dhtmlx.createWin({
                                            winId: "confirmG1234",
                                            closeWinId: ["close_conifrmdialog_G1234", "cancel_dialog_G1234"],
                                            okId: "goto_integration_G1234",
                                            okCallBack: function () {
                                                q()
                                            },
                                            callback: function () {
                                                return
                                            }
                                        })
                                    } else {
                                        q()
                                    }
                                } else {
                                    if (K.queryLeftNewDTO.train_no.indexOf(cr) > -1 && cu.indexOf(K.queryLeftNewDTO.from_station_telecode) > -1 && ct.indexOf(K.queryLeftNewDTO.to_station_telecode) > -1) {
                                        dhtmlx.createWin({
                                            winId: "confirmG1234",
                                            closeWinId: ["close_conifrmdialog_G1234", "cancel_dialog_G1234"],
                                            okId: "goto_integration_G1234",
                                            okCallBack: function () {
                                                co()
                                            },
                                            callback: function () {
                                                return
                                            }
                                        })
                                    } else {
                                        co()
                                    }
                                }
                                $("#randCode2").removeClass("inptxt w100 error").addClass("inptxt w100");
                                $("#i-ok2").css("display", "block");
                                $("#c_error2").html("");
                                $("#c_error2").removeClass("error");
                                return
                            }
                        }
                    })
                } else {
                    if ($("#randCode2").val().length != 4) {
                        $("#randCode2").removeClass("inptxt w100").addClass("inptxt w100 error");
                        $("#c_error2").html("请输入四位长度验证码");
                        $("#c_error2").addClass("error");
                        $("#i-ok2").css("display", "none");
                        $("#c_error2").css("margin-left", "15px")
                    }
                }
                bA = $("#randCode2").val()
            })
        }
    }

    function al(cq) {
        return aO.autoSubmit(bL, passengerChecked, xbChecked, ccSelected)
    }

    var aP = false;

    function L() {
        $("#queryLeftTable").html("");
        $("#trainum").html("");
        aL();
        if ($("#auto_query").is(":checked")) {
            if (b0.length < 0) {
                $("#no_filter_ticket").show();
                $("#trainum").html("0");
                aP = true
            } else {
                if (bL.length > 0) {
                    $("#no_filter_ticket").hide();
                    if (document.getElementById("autoSubmit").checked) {
                        var cu = [];
                        for (var cA = 0; cA < passengerChecked.length; cA++) {
                            var ct = false;
                            var cx = passengerChecked[cA];
                            for (var cB = 0; cB < cu.length; cB++) {
                                var cr = cu[cB];
                                if (cx.passenger_type != 2) {
                                    if (cx.passenger_name == cr.passenger_name && cx.passenger_id_type_code == cr.passenger_id_type_code && cx.passenger_id_no == cr.passenger_id_no) {
                                        if (cr.passenger_type != 2) {
                                            ct = true;
                                            break
                                        }
                                    }
                                }
                            }
                            if (!ct) {
                                cu.push(cx)
                            }
                        }
                        passengerChecked = cu;
                        var cG = al(true);
                        if (cG[0] == 1 || cG[0] == 2) {
                            aP = true;
                            K = cG[1];
                            var cz = ck();
                            var cD = K.secretStr;
                            m(cG);
                            var cC = checkusermdId != undefined ? "&_json_att=" + encodeURIComponent(checkusermdId) : "";
                            var cq = "";
                            if ($("#dc").is(":checked")) {
                                cq = "dc"
                            } else {
                                cq = "wc"
                            }
                            if ("undefined" == typeof(submitForm)) {
                                var cH = "secretStr=" + cD + "&train_date=" + $("#train_date").val() + "&tour_flag=" + cq + "&purpose_codes=" + cz + "&query_from_station_name=" + $("#fromStationText").val() + "&query_to_station_name=" + $("#toStationText").val() + "&" + cC + "&cancel_flag=2&bed_level_order_num=000000000000000000000000000000&passengerTicketStr=" + getpassengerTicketsForAutoSubmit() + "&oldPassengerStr=" + getOldPassengersForAutoSubmit()
                            } else {
                                var cs = submitForm();
                                var cy = cs.split(":::");
                                var cF = cy[0].split(",-,")[0];
                                var cw = cy[0].split(",-,")[1];
                                var cE = cy[1].split(",-,")[0];
                                var cv = cy[1].split(",-,")[1];
                                var cH = escape(cF) + "=" + escape(cw) + "&" + cE + "=" + cv + "&secretStr=" + cD + "&train_date=" + $("#train_date").val() + "&tour_flag=" + cq + "&purpose_codes=" + cz + "&query_from_station_name=" + $("#fromStationText").val() + "&query_to_station_name=" + $("#toStationText").val() + "&" + cC + "&cancel_flag=2&bed_level_order_num=000000000000000000000000000000&passengerTicketStr=" + getpassengerTicketsForAutoSubmit() + "&oldPassengerStr=" + getOldPassengersForAutoSubmit()
                            }
                            $.ajax({
                                type: "post",
                                url: ctx + "confirmPassenger/autoSubmitOrderRequest",
                                async: false,
                                data: cH,
                                success: function (cI) {
                                    if (cI.status) {
                                        if (!cI.data.submitStatus) {
                                            if (cI.data.isRelogin) {
                                                window.location.href = ctx + "login/init?random=" + new Date().getTime()
                                            } else {
                                                if (cI.data.isNoActive) {
                                                    ac(cI.data.errMsg, true, "", true, "warn")
                                                } else {
                                                    if (cI.data.checkSeatNum) {
                                                        ac("很抱歉，无法提交您的订单!", true, "原因： " + cI.data.errMsg, true, "warn")
                                                    } else {
                                                        ac("车票信息不合法!", true, "原因： " + cI.data.errMsg, true, "warn")
                                                    }
                                                }
                                            }
                                            return
                                        }
                                        }
                                        intervalTime = cI.data.ifShowPassCodeTime;
                                        if (cI.data.ifShowPassCode == "Y") {
                                            bI(true)
                                        } else {
                                            bI(false)
                                        }
                                        canChooseSeats = cI.data.canChooseSeats;
                                        choose_Seats = cI.data.choose_Seats;
                                        canChooseBeds = cI.data.canChooseBeds;
                                        isCanChooseMid = cI.data.isCanChooseMid;
                                        if (cI.data.smokeStr != "" && cI.data.smokeStr.length > 0) {
                                            $("#dialog_smoker_msg").html(cI.data.smokeStr);
                                            dhtmlx.createWin({
                                                winId: "dialog_smoker",
                                                closeWinId: ["dialog_smoker_close", "dialog_smoker_cancel"],
                                                okId: "dialog_smoker_ok",
                                                okCallBack: function () {
                                                    l(cI, cz)
                                                },
                                                checkConfirm: function () {
                                                    return true
                                                },
                                                callback: function () {
                                                }
                                            })
                                        } else {
                                            l(cI, cz)
                                        }
                                    }
                                }
                            })
                        } else {
                            aP = false;
                            M()
                        }
                    } else {
                        aP = true
                    }
                } else {
                    aP = false;
                    M()
                }
                $("#trainum").html(b0.length);
                aA(b0)
            }
        } else {
            if (b0.length < 0) {
                aP = true;
                $("#no_filter_ticket").show();
                $("#no_filter_ticket_msg_1").show();
                $("#no_filter_ticket_msg_2").hide();
                $("#trainum").html("0");
                return
            } else {
                aP = true;
                $("#trainum").html(b0.length);
                aA(b0)
            }
        }
    }

    function l(cr, cs) {
        if (cr.data.isNeedPassCode == "N") {
            $("#leftTicketOrderNote").hide();
            $("#qr_submit").nextAll("a").eq(0).hide();
            ischeckAutoSubmitCode = false
        } else {
            $("#leftTicketOrderNote").show();
            $("#qr_submit").nextAll("a").eq(0).show();
            ischeckAutoSubmitCode = true
        }
        if (cr.data && undefined != cr.data.result && typeof(cr.data.result) != "undefined") {
            var ct = cr.data.get608Msg;
            if (undefined != ct && typeof(ct) != "undefined" && "" != ct) {
                if (cr.data.name && cr.data.card && cr.data.tel) {
                    $("#608_check_msg").html(ct);
                    dhtmlx.createWin({
                        winId: "608_check",
                        closeWinId: ["608_check_close", "608_check_cancel"],
                        okId: "608_check_ok",
                        okCallBack: function () {
                            $("#608_name").html(cr.data.name);
                            $("#608_card").html(cr.data.card);
                            $("#608_tel").html(cr.data.tel);
                            $("#ticketInfo").html(cr.data.ticketInfo);
                            dhtmlx.createWin({
                                winId: "608_complain",
                                closeWinId: ["608_complain_close", "608_complain_cancel"],
                                okId: "608_complain_ok",
                                okCallBack: function () {
                                    var cu = dhtmlx.modalbox({
                                        targSrc: '<div><img src="' + ctx + 'resources/images/loading.gif"></img></div>',
                                        callback: function () {
                                        }
                                    });
                                    $.ajax({
                                        url: ctx + "confirmPassenger/report",
                                        type: "post",
                                        async: false,
                                        success: function (cv) {
                                            dhtmlx.modalbox.hide(cu);
                                            dhtmlx.alert({
                                                title: "提示",
                                                ok: messages["button.ok"],
                                                text: cv.data == "Y" ? "举报成功" : "举报失败",
                                                type: "alert-info"
                                            })
                                        },
                                        error: function (cv, cx, cw) {
                                            dhtmlx.modalbox.hide(cu)
                                        }
                                    })
                                },
                                checkConfirm: function () {
                                    return true
                                }
                            });
                            $("#608_complain").css("top", "200px")
                        },
                        checkConfirm: function () {
                            return true
                        }
                    });
                    $("#608_check").css("top", "200px")
                } else {
                    dhtmlx.alert({
                        title: "警告", ok: "确定", text: ct, type: "alert-error", callback: function () {
                            var cu = cr.data.result;
                            location_code = cu.split("#")[0];
                            md5Str = cu.split("#")[1];
                            leftTicketStr = cu.split("#")[2];
                            isAsync = cu.split("#")[3];
                            bs(cs, cr.data.isCheckOrderInfo, cr.data.doneHMD)
                        }
                    })
                }
            } else {
                var cq = cr.data.result;
                location_code = cq.split("#")[0];
                md5Str = cq.split("#")[1];
                leftTicketStr = cq.split("#")[2];
                isAsync = cq.split("#")[3];
                bs(cs, cr.data.isCheckOrderInfo, cr.data.doneHMD)
            }
        }
    }

    var O = 0;
    var a0;

    function M() {
        var cq;
        if (rqChecked.length > 1) {
            if (O >= rqChecked.length) {
                O = 0
            }
            cq = rqChecked[O++]
        } else {
            if (train_tour_flag == "fc") {
                cq = $.trim($("#back_train_date").val())
            } else {
                cq = $.trim($("#train_date").val())
            }
        }
        clearInterval(a0);
        a0 = window.setInterval(function () {
            if (train_tour_flag == "fc") {
                $("#back_train_date").val(cq)
            } else {
                $("#train_date").val(cq)
            }
            var cr = {
                "leftTicketDTO.train_date": cq,
                "leftTicketDTO.from_station": $("#fromStation").val(),
                "leftTicketDTO.to_station": $("#toStation").val(),
                purpose_codes: ck()
            };
            aV();
            aj(cr)
        }, autoSearchTime)
    }

    function h() {
        if (ifAlertCode && !verifyRandCode($("#randCode_other")[0], true)) {
            return
        }
        var cq = bF();
        if (cq.length == 0 || tickets_info.length == cq.length / 2) {
            $("#content_autosubmitcheckticketinfo").hide();
            loadGrayBackground();
            if (isAsync == ticket_submit_order.request_flag.isAsync) {
                q()
            } else {
                co()
            }
        } else {
            dhtmlx.alert({
                title: "警告",
                ok: "确定",
                text: "您还有未选座的乘客，请选座完成后再提交订单！",
                type: "alert-error",
                callback: function () {
                }
            })
        }
    }

    function bW() {
        aw();
        cj(tickets_info);
        T();
        b8();
        $("#i-ok2").hide();
        if (ifAlertCode) {
            refreshImg("passenger", "randp", "other")
        }
        $("#error_msgmypasscode2").hide();
        $("#content_autosubmitcheckticketinfo").show();
        box = dhtmlx.createWin({
            winId: "autosubmitcheckticketinfo", closeWinId: ["back_edit"], callback: function () {
                clearTimeout(aG);
                jPlayer("stop")
            }, okId: "qr_submit", okCallBack: function () {
                jPlayer("stop");
                if (isAsync == ticket_submit_order.request_flag.isAsync) {
                    q()
                } else {
                    co()
                }
            }, checkConfirm: function () {
                if (!bm()) {
                    return false
                }
                if (!ischeckAutoSubmitCode) {
                    return true
                }
                if (ifAlertCode) {
                    return verifyRandCode($("#randCode_other")[0], true)
                } else {
                    if (isAsync == ticket_submit_order.request_flag.isAsync) {
                        q()
                    } else {
                        co()
                    }
                }
            }
        });
        var cr = parseInt(intervalTime / timer_time);
        if (!ifAlertCode) {
            ai(timer_time, cr)
        } else {
            var cq = $("#qr_submit1");
            cq.unbind("click");
            cq.removeClass("btn92s").addClass("btn92");
            aF(timer_time, cr)
        }
        if (tickets_info.length > 3 && canChooseSeats && "Y" == canChooseSeats) {
            $("#autosubmitcheckticketinfo").css("top", "70px")
        } else {
            $("#autosubmitcheckticketinfo").css("top", "100px")
        }
        $("#autosubmitcheckticketinfo").css("position", "absolute");
        $(".dhx_modal_cover").css("background-color", "#EEEEEE");
        $("#randCode_other").focus()
    }

    var aG;

    function ai(cr, cq) {
        if (cr == 0) {
            clearTimeout(aG);
            h();
            return
        } else {
            cr--
        }
        aG = setTimeout(function () {
            ai(cr, cq)
        }, cq)
    }

    var bt;

    function aF(cs, cr) {
        if (cs == 0) {
            clearTimeout(bt);
            var cq = $("#qr_submit1");
            cq.unbind("click").bind("click", h);
            cq.removeClass("btn92").addClass("btn92s");
            return
        } else {
            cs--
        }
        bt = setTimeout(function () {
            aF(cs, cr)
        }, cr)
    }

    function aI() {
        if (ba.length == 0) {
            return
        }
        var cq = be();
        var cr = bU(cq);
        $("#train_stop").appendTo($("body")).hide();
        $("#queryLeftTable").html("");
        $("#trainum").html("");
        if (cr.length > 0) {
            $("#no_filter_ticket").hide();
            $("#trainum").html(cr.length)
        } else {
            $("#no_filter_ticket").show();
            $("#no_filter_ticket_msg_1").show();
            $("#no_filter_ticket_msg_2").hide();
            $("#trainum").html("0");
            return
        }
        aA(cr)
    }

    function bx(cr) {
        var cq = cb.createWindow(cr + "_", 0, 0, 660, 100);
        cq.attachObject(cr);
        cq.clearIcon();
        cq.denyResize();
        cq.setModal(true);
        cq.center();
        cq.button("park").hide();
        cq.button("minmax1").hide();
        cq.hideHeader();
        return cq
    }

    function aw() {
        var cv = new Array();
        $("#autosubmit_check_ticket_tit").html("");
        var ct = $("#train_date").val();
        var cq = bk(new Date(Date.parse(ct.replace(/-/g, "/"))));
        var cr = K.queryLeftNewDTO.station_train_code;
        var cA = null;
        var cB = K.queryLeftNewDTO.from_station_name;
        var cu = K.queryLeftNewDTO.to_station_name;
        var cw = K.queryLeftNewDTO.start_time;
        var cz = K.queryLeftNewDTO.arrive_time;
        var cy = function (cD, cF, cC, cH, cE, cG, cJ, cI) {
            this.date = cD;
            this.week = cF;
            this.station_train_code = cC;
            this.train_headers = cH;
            this.from_station = cE;
            this.start_time = cG;
            this.to_station = cJ;
            this.arrive_time = cI
        };
        var cs = new cy(ct, cq, cr, cA, cB, cw, cu, cz);
        cv.push(cs);
        var cx = $("#autoSubTicketTitTemplate").html();
        $.templates({leftTableTemplate: cx});
        $("#autosubmit_check_ticket_tit").html($.render.leftTableTemplate(cv))
    }

    function m(cC) {
        if (a0) {
            clearInterval(a0)
        }
        var cr = "";
        var cs = "";
        var cx = "";
        var ct = "";
        if ($("#sf2").is(":checked")) {
            cx = "3";
            ct = "学生票"
        }
        tickets_info = new Array();
        var cD = cC[1];
        var cw = cC[2];
        var cv = 0;
        var cu = passengerChecked.length;
        for (var cy = 0; cy < cw.length; cy++) {
            var cA = 0;
            if (cw[cy].toLowerCase() == "yyrw") {
                var cq = cD.queryLeftNewDTO["seat_types"];
                if (cw[cy].toLowerCase() == "yyrw" && cq.indexOf("A") > -1) {
                    cA = cD.queryLeftNewDTO["gr_num"]
                }
            } else {
                cA = cD.queryLeftNewDTO[cw[cy].toLowerCase() + "_num"]
            }
            if (cA == "--" || cA == "无") {
                cA = 0
            } else {
                if (cA == "有") {
                    cA = 20
                } else {
                    cA = Number(cA)
                }
            }
            if (cv >= cu) {
                break
            }
            var cB = cw[cy];
            cr = av(cB);
            cs = J(cB);
            for (var cz = 0; cz < cA; cz++) {
                if (cv >= cu) {
                    break
                }
                cx = passengerChecked[cz].passenger_type;
                if (!cx || "" == cx) {
                    cx = "1"
                }
                if (cx == "1") {
                    ct = "成人票"
                } else {
                    if (cx == "2") {
                        ct = "儿童票"
                    } else {
                        if (cx == "3") {
                            ct = "学生票"
                        } else {
                            if (cx == "4") {
                                ct = "残军票"
                            }
                        }
                    }
                }
                tickets_info.push(new bb("sdAdd_" + am(), cr, cs, cx, ct, passengerChecked[cv].passenger_name, passengerChecked[cv].passenger_id_type_code, passengerChecked[cv].passenger_id_type_name, passengerChecked[cv].passenger_id_no, passengerChecked[cv].mobile_no));
                cv++
            }
        }
    }

    function cj(cr) {
        var cq;
        if ("X" == canChooseBeds) {
            $("#bed_show").html("<span style='background:url(../resources/images/icon_new.png) right center no-repeat; padding-right:30px; cursor: pointer;' title='欢迎使用12306选铺功能'>铺别</span>");
            cq = $("#autoSubCheckTicketInfoTemplate_chooseBeds").html().replace("<!--", "").replace("-->", "");
            $("#bed_show").show()
        } else {
            $("#bed_show").hide();
            cq = $("#autoSubCheckTicketInfoTemplate").html()
        }
        $.templates({leftTableTemplate: cq});
        $("#autosubmit_check_ticketInfo").html($.render.leftTableTemplate(cr))
    }

    function j() {
        var ct = K.queryLeftNewDTO.yz_num;
        var cq = K.queryLeftNewDTO.rz_num;
        var cx = K.queryLeftNewDTO.yw_num;
        var cv = K.queryLeftNewDTO.rw_num;
        var cw = K.queryLeftNewDTO.gr_num;
        var cu = K.queryLeftNewDTO.ze_num;
        var cz = K.queryLeftNewDTO.zy_num;
        var cA = K.queryLeftNewDTO.tz_num;
        var cr = K.queryLeftNewDTO.swz_num;
        var cy = K.queryLeftNewDTO.wz_num;
        var cs = "";
        if (ct != "--") {
            cs = "YZ";
            return cs
        }
        if (cu != "--") {
            cs = "ZE";
            return cs
        }
        if (cx != "--") {
            cs = "YW";
            return cs
        }
        if (cz != "--") {
            cs = "ZY";
            return cs
        }
        if (cq != "--") {
            cs = "RZ";
            return cs
        }
        if (cv != "--") {
            cs = "RW";
            return cs
        }
        if (cA != "--") {
            cs = "TZ";
            return cs
        }
        if (cw != "--") {
            cs = "GR";
            return cs
        }
        if (cr != "--") {
            cs = "SWZ";
            return cs
        }
        if (cy != "--") {
            cs = "WZ";
            return cs
        }
    }

    function J(cr) {
        var cq = "";
        if (cr == "ZY") {
            cq = "一等座"
        }
        if (cr == "ZE") {
            cq = "二等座"
        }
        if (cr == "SWZ") {
            cq = "商务座"
        }
        if (cr == "TZ") {
            cq = "特等座"
        }
        if (cr == "YZ") {
            cq = "硬座"
        }
        if (cr == "RZ") {
            cq = "软座"
        }
        if (cr == "YW") {
            cq = "硬卧"
        }
        if (cr == "RW") {
            cq = "软卧"
        }
        if (cr == "GR") {
            cq = "高级软卧"
        }
        if (cr == "SRRB") {
            cq = "动卧"
        }
        if (cr == "YYRW") {
            cq = "高级动卧"
        }
        if (cr == "WZ") {
            cq = "无座"
        }
        return cq
    }

    function av(cr) {
        var cq = "";
        if (cr == "ZY") {
            cq = "M"
        }
        if (cr == "ZE") {
            cq = "O"
        }
        if (cr == "SWZ") {
            cq = "9"
        }
        if (cr == "TZ") {
            cq = "P"
        }
        if (cr == "YZ") {
            cq = "1"
        }
        if (cr == "RZ") {
            cq = "2"
        }
        if (cr == "YW") {
            cq = "3"
        }
        if (cr == "RW") {
            cq = "4"
        }
        if (cr == "GR") {
            cq = "6"
        }
        if (cr == "WZ") {
            cq = "WZ"
        }
        if (cr == "SRRB") {
            cq = "F"
        }
        if (cr == "YYRW") {
            cq = "A"
        }
        return cq
    }

    function bb(cx, cs, ct, cv, cu, cr, cz, cy, cw, cq) {
        this.only_id = cx, this.seat_type = cs;
        this.seat_type_name = ct;
        this.ticket_type = cv, this.ticket_type_name = cu;
        this.name = cr;
        this.id_type = cz;
        this.id_type_name = cy;
        this.id_no = cw;
        this.phone_no = cq;
        this.toString = function () {
            return this.name + "_" + this.id_type + "_" + this.id_no + "_" + this.phone_no
        }
    }

    function am() {
        if (tickets_info.length < 1) {
            return tickets_info.length
        } else {
            var cs = 0;
            for (var cr = 0; cr < tickets_info.length; cr++) {
                var cq = Number(tickets_info[cr].only_id.split("_")[1]);
                if (cq > cs) {
                    cs = cq
                }
            }
            return cs + 1
        }
    }

    function aZ() {
        bL = [];
        W = [];
        aC = [];
        tickets_info = [];
        bQ = [];
        b0 = [];
        K = "";
        isAsync = "";
        location_code = "";
        md5Str = "";
        leftTicketStr = ""
    }

    getpassengerTicketsForAutoSubmit = function () {
        var cr = "";
        for (var cw = 0; cw < tickets_info.length; cw++) {
            var cx = "";
            if ("WZ" == tickets_info[cw].seat_type) {
                cx = av(j())
            } else {
                cx = tickets_info[cw].seat_type
            }
            var cu = $("#autosubmit_check_ticketInfo").find("select[id^=ticketype_]");
            var cy = "0";
            if (cu && cu.length > 0) {
                var cq = tickets_info[cw].seat_type + "#" + tickets_info[cw].ticket_type + "#" + tickets_info[cw].name + "#" + tickets_info[cw].id_no;
                for (var cv = 0, cB = cu.length; cv < cB; cv++) {
                    var cz = cu.eq(cv);
                    var cs = cz.val().split("_")[0];
                    var ct = cz.val().split("_")[1];
                    if (cq == cs) {
                        cy = ct
                    }
                }
            }
            var cA = cx + "," + cy + "," + tickets_info[cw].ticket_type + "," + tickets_info[cw].name + "," + tickets_info[cw].id_type + "," + tickets_info[cw].id_no + "," + (tickets_info[cw].phone_no == null ? "" : tickets_info[cw].phone_no) + ",N";
            cr += cA + "_"
        }
        return cr.substring(0, cr.length - 1)
    };
    getOldPassengersForAutoSubmit = function () {
        var cs = "";
        for (var cr = 0; cr < passengerChecked.length; cr++) {
            var cq = passengerChecked[cr].passenger_name + "," + passengerChecked[cr].passenger_id_type_code + "," + passengerChecked[cr].passenger_id_no + "," + passengerChecked[cr].passenger_type;
            cs += cq + "_"
        }
        return cs
    };
    var aN = false;

    function bs(cq, cr) {
        var cv = "";
        var cs = $("#train_date").val().split("-");
        var ct = new Date();
        ct.setFullYear(cs[0], cs[1] - 1, cs[2]);
        if (isAsync == ticket_submit_order.request_flag.isAsync && leftTicketStr != "") {
            var cu = null;
            if (tickets_info[0].seat_type == "WZ") {
                if (K.queryLeftNewDTO.yz_num != "--") {
                    tickets_info[0].seat_type = "1";
                    aN = true;
                    tickets_info[0].seat_type_name = "硬座"
                } else {
                    if (K.queryLeftNewDTO.ze_num != "--") {
                        tickets_info[0].seat_type = "O";
                        aN = true;
                        tickets_info[0].seat_type_name = "二等座"
                    }
                }
            }
            $.ajax({
                url: ctx + "confirmPassenger/getQueueCountAsync",
                type: "post",
                async: false,
                data: {
                    train_date: ct.toString(),
                    train_no: K.queryLeftNewDTO.train_no,
                    stationTrainCode: K.queryLeftNewDTO.station_train_code,
                    seatType: tickets_info[0].seat_type,
                    fromStationTelecode: K.queryLeftNewDTO.from_station_telecode,
                    toStationTelecode: K.queryLeftNewDTO.to_station_telecode,
                    leftTicket: leftTicketStr,
                    purpose_codes: cq,
                    isCheckOrderInfo: cr
                },
                dataType: "json",
                success: function (cy) {
                    if (cy.status) {
                        if (cy.data.isRelogin == "Y") {
                            window.location.href = ctx + "login/init?random=" + new Date().getTime()
                        }
                        var cz = null;
                        var cx = tickets_info[0].seat_type;
                        cz = cy.data.ticket.split(",");
                        cv = "本次列车，" + (tickets_info[0].seat_type_name).split("（")[0] + "余票";
                        if (parseInt(cz[0]) >= 0) {
                            cv += "<strong>" + cz[0] + "</strong>张"
                        } else {
                            cv += cz[0]
                        }
                        var cw = false;
                        if (cz.length > 1) {
                            cv += ",无座余票";
                            if (parseInt(cz[1]) >= 0) {
                                cv += "<strong>" + cz[1] + "</strong>张"
                            } else {
                                cv += cz[1]
                            }
                            cw = true
                        }
                        cv += "。";
                        if (cy.data.op_2 == "true") {
                            if ((aN && !cw) || !aN) {
                                aP = false;
                                M();
                                return
                            }
                            cv += '<font color="red">目前排队人数已经超过余票张数，请您选择其他席别或车次。</font>'
                        } else {
                            if (cy.data.countT > 0) {
                                cv += '目前排队人数<font color="red">' + cy.data.countT + "</font>人，";
                                if (if_show_pass_code_login == "Y") {
                                    cv += "<br/>请确认以上信息是否正确，点击“确认”后，系统将为您分配席位。"
                                }
                            }
                        }
                        var cA = $("#sy_ticket_num_id");
                        if (cA != null) {
                            cA.html(cv)
                        }
                        bW()
                    }
                },
                error: function (cw, cy, cx) {
                    return
                }
            })
        } else {
            bW()
        }
    }

    function bu(cr, cq) {
        rt = "";
        seat_1 = -1;
        seat_2 = -1;
        i = 0;
        while (i < cr.length) {
            s = cr.substr(i, 10);
            c_seat = s.substr(0, 1);
            if (c_seat == cq) {
                count = s.substr(6, 4);
                while (count.length > 1 && count.substr(0, 1) == "0") {
                    count = count.substr(1, count.length)
                }
                count = parseInt(count);
                if (count < 3000) {
                    seat_1 = count
                } else {
                    seat_2 = (count - 3000)
                }
            }
            i = i + 10
        }
        if (seat_1 > -1) {
            rt += seat_1
        }
        if (seat_2 > -1) {
            rt += "," + seat_2
        }
        return rt
    }

    function co() {
        $.ajax({
            url: ctx + "confirmPassenger/confirmSingle",
            type: "post",
            data: {
                passengerTicketStr: getpassengerTicketsForAutoSubmit(),
                oldPassengerStr: getOldPassengersForAutoSubmit(),
                tour_flag: "dc",
                randCode: $("#randCode_other").val(),
                purpose_codes: ck(),
                key_check_isChange: md5Str,
                train_location: location_code,
                choose_seats: bF(),
                seatDetailType: aM()
            },
            dataType: "json",
            async: true,
            success: function (cq) {
                if (cq.status) {
                    if (cq.data.submitStatus) {
                        otsRedirect("post", ctx + "payOrder/init?random=" + new Date().getTime(), {})
                    } else {
                        ac("出票失败!", false, "原因： " + cq.data.errMsg + '<a  id="xg_close_win_id">点击修改</a>', true, "lose");
                        $("#xg_close_win_id").click(function () {
                            af("transforNotice_id", true);
                            $("#i-ok").css("display", "none")
                        })
                    }
                } else {
                    ac("订票失败!", true, "很抱歉！请关闭窗口重新预定车票", true, "lose")
                }
            },
            error: function (cq, cs, cr) {
                ac("订票失败!", true, "很抱歉！网络忙，请关闭窗口稍后再试。", true, "lose");
                return
            }
        })
    }

    function q() {
        $.ajax({
            url: ctx + "confirmPassenger/confirmSingleForQueueAsys",
            type: "post",
            data: {
                passengerTicketStr: getpassengerTicketsForAutoSubmit(),
                oldPassengerStr: getOldPassengersForAutoSubmit(),
                randCode: $("#randCode_other").val(),
                purpose_codes: ck(),
                key_check_isChange: md5Str,
                leftTicketStr: leftTicketStr,
                train_location: location_code,
                choose_seats: bF(),
                seatDetailType: aM()
            },
            dataType: "json",
            async: true,
            success: function (cq) {
                $("#i-ok").css("display", "none");
                $("#i-ok2").css("display", "none");
                $("#c_error2").html("");
                $("#c_error2").removeClass("error");
                $("#randCode2").val("");
                if (cq.status) {
                    if (!cq.data.submitStatus) {
                        ac("出票失败!", false, "原因： " + cq.data.errMsg + '<a id="xg_close_win_id" >点击修改</a>', true, "lose");
                        $("#xg_close_win_id").click(function () {
                            af("transforNotice_id", true)
                        });
                        if (cq.data.errMsg.indexOf("余票不足") >= 0) {
                            jPlayer("stop");
                            $("#qr_closeTranforDialog_id").click();
                            $("#query_ticket").click()
                        }
                    } else {
                        var cr = new OrderQueueWaitTime("dc", an, r);
                        cr.start(queryOrderWaitTimeInterval)
                    }
                } else {
                    ac("订票失败!", true, "很抱歉！请关闭窗口重新预定车票", true, "lose")
                }
            },
            error: function (cq, cs, cr) {
                ac("订票失败!", true, "很抱歉！网络忙，请关闭窗口稍后再试。", true, "lose");
                return
            }
        })
    }

    function an(cq, cs, cr) {
        if (cs <= 5) {
            ac("订单已经提交，系统正在处理中，请稍等。", false, "", false, "work")
        } else {
            if (cs > 30 * 60) {
                ac("订单已经提交，预计等待时间超过30分钟，请耐心等待。", false, "", false, "queue")
            } else {
                ac("订单已经提交，最新预估等待时间" + cr + "，请耐心等待。", false, "", false, "queue")
            }
        }
    }

    function r(cq, cs, cr) {
        if (cs == -1 || cs == -100) {
            $.ajax({
                url: ctx + "confirmPassenger/resultOrderForDcQueue",
                data: {orderSequence_no: cr.orderId},
                type: "POST",
                dataType: "json",
                success: function (ct) {
                    if (ct.status) {
                        if (ct.data.submitStatus) {
                            otsRedirect("post", ctx + "/payOrder/init?random=" + new Date().getTime(), {})
                        } else {
                            ac("下单成功", false, "", false, "win")
                        }
                    } else {
                        ac("下单成功。", false, "", false, "win")
                    }
                },
                error: function (ct, cv, cu) {
                    ac("下单成功。", false, "", false, "win")
                }
            })
        } else {
            bJ(cs, cr)
        }
    }

    function bJ(cq, cr) {
        if (cr.name && cr.card && cr.tel) {
            af("transforNotice_id", true);
            $("#608_check_msg").html(cr.msg);
            dhtmlx.createWin({
                winId: "608_check",
                closeWinId: ["608_check_close", "608_check_cancel"],
                okId: "608_check_ok",
                okCallBack: function () {
                    $("#608_name").html(cr.name);
                    $("#608_card").html(cr.card);
                    $("#608_tel").html(cr.tel);
                    $("#ticketInfo").html(cr.ticketInfo);
                    dhtmlx.createWin({
                        winId: "608_complain",
                        closeWinId: ["608_complain_close", "608_complain_cancel"],
                        okId: "608_complain_ok",
                        okCallBack: function () {
                            var cs = dhtmlx.modalbox({
                                targSrc: '<div><img src="' + ctx + 'resources/images/loading.gif"></img></div>',
                                callback: function () {
                                }
                            });
                            $.ajax({
                                url: ctx + "confirmPassenger/report",
                                type: "post",
                                async: false,
                                success: function (ct) {
                                    dhtmlx.modalbox.hide(cs);
                                    if (ct.data == "Y") {
                                        dhtmlx.alert({
                                            title: "提示",
                                            ok: messages["button.ok"],
                                            text: "举报成功",
                                            type: "alert-info"
                                        })
                                    } else {
                                        dhtmlx.alert({
                                            title: "提示",
                                            ok: messages["button.ok"],
                                            text: "举报失败",
                                            type: "alert-error"
                                        })
                                    }
                                    $("#i-okmypasscode1").hide();
                                    if (ifAlertCode) {
                                        refreshImg("passenger", "randp", "other")
                                    }
                                },
                                error: function (ct, cv, cu) {
                                    dhtmlx.modalbox.hide(cs)
                                }
                            })
                        },
                        checkConfirm: function () {
                            return true
                        }
                    });
                    $("#608_complain").css("top", "200px")
                },
                checkConfirm: function () {
                    return true
                },
                callback: function () {
                    $("#i-okmypasscode1").hide();
                    if (ifAlertCode) {
                        refreshImg("passenger", "randp", "other")
                    }
                }
            });
            $("#608_check").css("top", "200px");
            return
        }
        if (cq == -1) {
            return
        } else {
            if (cq == -2) {
                if (cr.errorcode == 0) {
                    ac("订票失败!", true, "原因： " + cr.msg, true, "lose")
                } else {
                    ac("订票失败!", true, "原因： " + cr.msg, true, "lose")
                }
                if (cr.msg.indexOf("没有足够的票") > -1) {
                    jPlayer("stop");
                    $("#qr_closeTranforDialog_id").click();
                    $("#query_ticket").click()
                }
            } else {
                if (cq == -3) {
                    ac("哎呀,订票失败!", true, "订单已撤销", true, "lose")
                } else {
                    window.location.href = ctx + "queryOrder/initNoComplete?random=" + new Date().getTime()
                }
            }
        }
    }

    function R() {
        ci = new dhtmlXWindows();
        ci.enableAutoViewport(true);
        ci.setSkin("dhx_terrace");
        ci.setImagePath(ctx + "resources/js/rich/windows/imgs/");
        af = function (cu, ct) {
            unLoadGrayBackground();
            if (ci.isWindow(cu + "_")) {
                ci.window(cu + "_").setModal(false);
                ci.window(cu + "_").hide()
            }
        };
        ac = function (cA, cx, cu, ct, cw) {
            var cz = '<div class="tit">' + (cx ? '<span class="colorC">' + cA + "</span>" : cA) + "</div>";
            var cv = "<P>" + cu + "</p>";
            var cy = cx ? '<p>请点击[<a href="' + ctx + 'queryOrder/init"><strong>我的12306</strong></a>]办理其他业务。您也可以点击[<a href="' + ctx + 'leftTicket/init"><strong>预订车票</strong></a>]，重新规划您的旅程。</p>' : '<P>查看订单处理情况，请点击“<a href="' + ctx + 'queryOrder/initNoComplete">未完成订单</a>”</P>';
            $("#iamge_status_id").removeClass().addClass("icon i-" + cw);
            if (ct) {
                $("#up-box-hd_id").html("提示<a id='closeTranforDialog_id' href='#nogo'>关闭</a>");
                cy = "";
                $("#lay-btn_id").html("<a href='#nogo' id='qr_closeTranforDialog_id'  class='btn92s'>确认</a>")
            } else {
                $("#up-box-hd_id").html("提示");
                $("#lay-btn_id").html("")
            }
            $("#orderResultInfo_id").html(cz + (cu == "" || cu == null || cu == "undefined" || cu == undefined ? "" : cv) + cy);
            cq("transforNotice_id");
            if (ct) {
                $("#closeTranforDialog_id").click(function () {
                    af("transforNotice_id", true)
                });
                $("#qr_closeTranforDialog_id").click(function () {
                    af("transforNotice_id", true);
                    $("#i-ok").css("display", "none")
                })
            }
        };
        function cq(cx) {
            af(cx, false);
            if ("checkticketinfo_id" == cx) {
                var cv = ticketInfoForPassengerForm.queryLeftNewDetailDTO;
                if (cv.to_station_telecode == ticket_submit_order.special_areas.lso || cv.to_station_telecode == ticket_submit_order.special_areas.dao || cv.to_station_telecode == ticket_submit_order.special_areas.ado || cv.to_station_telecode == ticket_submit_order.special_areas.nqo || cv.to_station_telecode == ticket_submit_order.special_areas.tho) {
                    if (cr()) {
                        $("#notice_1_id").html("1.系统将随机为您申请席位，暂不支持自选席位。");
                        $("#notice_2_id").html("2.根据现行规定，外国人在购买进西藏火车票时，须出示西藏自治区外事办公室或旅游局、商务厅的批准函（电），或者出示中国内地司局级接待单位出具的、已征得自治区上述部门同意的证明信函。台湾同胞赴藏从事旅游、商务活动，须事先向西藏自治区旅游局或商务厅提出申请，购买进藏火车票时须出示有关批准函。");
                        if (cs()) {
                            $("#notice_3_id").html("3.按现行规定，学生票购票区间必须与学生证上的乘车区间一致，否则车站将不予换票。")
                        } else {
                            $("#notice_3_id").html("")
                        }
                    }
                } else {
                    $("#notice_1_id").html("1.系统将随机为您申请席位，暂不支持自选席位。");
                    if (cs()) {
                        $("#notice_3_id").html("2.按现行规定，学生票购票区间必须与学生证上的乘车区间一致，否则车站将不予换票。")
                    } else {
                        $("#notice_3_id").html("")
                    }
                }
            }
            var cu = a4(cx);
            var ct = $(window).width() / 2 - 300;
            var cw = ch() + ($(window).height() / 2 - 200);
            cu.setDimension($("#content_" + cx).width(), $("#content_" + cx).height() + 10);
            $(".dhtmlx_window_active").height($("#content_" + cx).height());
            $(".dhtmlx_window_active").css({left: ct + "px", top: cw + "px"})
        }

        function cs() {
            for (var cu = 0; cu < limit_tickets.length; cu++) {
                var ct = limit_tickets[cu];
                if (ct.ticket_type == ticket_submit_order.ticket_type.student) {
                    return true
                }
            }
            return false
        }

        function cr() {
            for (var cu = 0; cu < limit_tickets.length; cu++) {
                var ct = limit_tickets[cu];
                if ((ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.fc || ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.gc) && ct.save_status != "" && (ct.id_type == ticket_submit_order.passenger_card_type.passport || ct.id_type == ticket_submit_order.passenger_card_type.work || ct.id_type == ticket_submit_order.passenger_card_type.taiwan)) {
                    return true
                } else {
                    if ((ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.wc || ticketInfoForPassengerForm.tour_flag == ticket_submit_order.tour_flag.dc) && (ct.id_type == ticket_submit_order.passenger_card_type.passport || ct.id_type == ticket_submit_order.passenger_card_type.work || ct.id_type == ticket_submit_order.passenger_card_type.taiwan)) {
                        return true
                    }
                }
            }
            return false
        }
    }

    function a4(cr) {
        var cq = ci.createWindow(cr + "_", 0, 0, 660, 100);
        cq.attachObject(cr);
        cq.clearIcon();
        cq.denyResize();
        cq.setModal(true);
        cq.center();
        cq.button("park").hide();
        cq.button("minmax1").hide();
        cq.hideHeader();
        return cq
    }

    function C(cr) {
        var cq = new Date();
        var cs = cr.split("-");
        cq.setFullYear(parseInt(cs[0]), parseInt(cs[1] - 1, 10), parseInt(cs[2], 10));
        if (cs.length >= 6) {
            cq.setHours(cs[3], cs[4], cs[5])
        }
        return cq
    }

    function aD(cq) {
        var ct = "", cs = "";
        var cv = cq.replace(/-/g, "");
        if (cv.substring(4, 5) == "0") {
            ct = cv.substring(5, 6) + "月"
        } else {
            ct = cv.substring(4, 6) + "月"
        }
        if (cv.substring(6, 7) == "0") {
            cs = cv.substring(7, 8) + "日"
        } else {
            cs = cv.substring(6, 8) + "日"
        }
        var cr = new Date(Date.parse(cq.replace(/-/g, "/")));
        var cu = "日一二三四五六";
        return ct.concat(cs).concat("&nbsp;&nbsp;").concat("周").concat(cu.charAt(cr.getDay()))
    }

    showTicketPrice = function (cu) {
        var cy = $(cu).parent("tr").children("td").children("div").children("div").children("span").attr("id");
        if (undefined == cy || cy == null || "undefined" == typeof(cy)) {
            cy = $(cu).attr("id")
        }
        $("#price_" + cv).hide();
        $("#tp-list-price").hide();
        $("#sleeper-price>span").css("cursor", "pointer");
        var cv = cy.split("_")[0];
        var cw = $("#price_" + cv).attr("datatran");
        var cx = cy.split("_")[1];
        var ct = cy.split("_")[2];
        var cz = cy.split("_")[3];
        var cs = cy.split("_")[4];
        var cq = $("#WZ_" + cv).html();
        var cr = $("#QT_" + cv).html();
        if (cs && ($("#ticket_" + cv + "_train>span>span").text() == "查看票价")) {
            if ($("#ticket_" + cv).attr("class") == "bgc") {
                $("#price_" + cv).addClass("bgc")
            }
            $.ajax({
                type: "get",
                isTakeParam: false,
                beforeSend: function (cA) {
                    cA.setRequestHeader("If-Modified-Since", "0");
                    cA.setRequestHeader("Cache-Control", "no-cache")
                },
                url: ctx + "leftTicket/queryTicketPriceFL",
                data: {
                    train_no: cv,
                    from_station_no: cx,
                    to_station_no: ct,
                    seat_types: cs,
                    train_date: train_tour_flag == "fc" ? $.trim($("#back_train_date").val()) : $.trim($("#train_date").val())
                },
                timeout: 1000,
                error: function (cA, cC, cB) {
                },
                success: function (cA) {
                }
            });
            $.ajax({
                type: "get",
                isTakeParam: false,
                beforeSend: function (cA) {
                    cA.setRequestHeader("If-Modified-Since", "0");
                    cA.setRequestHeader("Cache-Control", "no-cache")
                },
                url: ctx + "leftTicket/queryTicketPrice",
                data: {
                    train_no: cv,
                    from_station_no: cx,
                    to_station_no: ct,
                    seat_types: cs,
                    train_date: train_tour_flag == "fc" ? $.trim($("#back_train_date").val()) : $.trim($("#train_date").val())
                },
                success: function (cA) {
                    if (cA.status) {
                        $("#ticket_" + cv + "_train>span>span").html("收起票价");
                        $("#ticket_" + cv + "_train>span>b").addClass("open");
                        $("#ticket_" + cv + "_train>span>b").attr("title", "收起票价");
                        if (cr == "--") {
                            cA.data.MIN = ""
                        }
                        if (cq == "--") {
                            cA.data.WZ = ""
                        }
                        $("#price_" + cv).html($.render.priceTableTemplate(cA.data));
                        $("#price_" + cv).show();
                        if (cw && c(cw)) {
                            $("#price_" + cv).find("td").eq(0).html('<a class="ad-tlist-hot" href="javascript:void(0);">移动宾馆 免费晚餐 快捷舒适 准时正点</a>')
                        } else {
                            $("#price_" + cv).find("td").eq(0).html("")
                        }
                        if (cA.data.PM != "--") {
                            $("#sleeper-price_" + cv).mouseover(function () {
                                $("#tp-list-price_" + cv).show()
                            });
                            $("#sleeper-price_" + cv).mouseout(function () {
                                $("#tp-list-price_" + cv).hide()
                            })
                        }
                    }
                }
            })
        } else {
            $("#ticket_" + cv + "_train>span>span").html("查看票价");
            $("#ticket_" + cv + "_train>span>b").attr("title", "查看票价");
            $("#ticket_" + cv + "_train>span>b").removeClass();
            $("#price_" + cv).html("");
            $("#price_" + cv).hide()
        }
    };
    function bU(cq) {
        if (ay == "starttime") {
            return cq.sort(function (cs, cr) {
                var cu = Number(cs.queryLeftNewDTO.start_time.replace(":", ""));
                var ct = Number(cr.queryLeftNewDTO.start_time.replace(":", ""));
                if (cu > ct) {
                    return a3 ? 1 : -1
                } else {
                    return a3 ? -1 : 1
                }
            })
        } else {
            if (ay == "arrivedtime") {
                return cq.sort(function (cs, cr) {
                    var cu = Number(cs.queryLeftNewDTO.arrive_time.replace(":", ""));
                    var ct = Number(cr.queryLeftNewDTO.arrive_time.replace(":", ""));
                    if (cu > ct) {
                        return b3 ? 1 : -1
                    } else {
                        return b3 ? -1 : 1
                    }
                })
            } else {
                if (ay == "lishi") {
                    return cq.sort(function (cs, cr) {
                        var cu = Number(cs.queryLeftNewDTO.lishi.replace(":", ""));
                        var ct = Number(cr.queryLeftNewDTO.lishi.replace(":", ""));
                        if (cu > ct) {
                            return aY ? 1 : -1
                        } else {
                            return aY ? -1 : 1
                        }
                    })
                }
            }
        }
        return cq
    }

    function az() {
        $("#s_time").click(function () {
            if (a3) {
                $("#s_time").removeClass().addClass("b4");
                if ($("#r_time").attr("class") == "b4") {
                    $("#r_time").removeClass().addClass("b2")
                } else {
                    if ($("#r_time").attr("class") == "b3") {
                        $("#r_time").removeClass().addClass("b1")
                    }
                }
                if ($("#l_s").attr("class") == "b4") {
                    $("#l_s").removeClass().addClass("b2")
                } else {
                    if ($("#l_s").attr("class") == "b3") {
                        $("#l_s").removeClass().addClass("b1")
                    }
                }
                a3 = false;
                $("#other_span_starttime").removeClass().addClass("b4");
                if ($("#other_span_endtime").attr("class") == "b4") {
                    $("#other_span_endtime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_endtime").attr("class") == "b3") {
                        $("#other_span_endtime").removeClass().addClass("b1")
                    }
                }
                if ($("#other_span_lishi").attr("class") == "b4") {
                    $("#other_span_lishi").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_lishi").attr("class") == "b3") {
                        $("#other_span_lishi").removeClass().addClass("b1")
                    }
                }
            } else {
                $("#s_time").removeClass().addClass("b3");
                if ($("#r_time").attr("class") == "b4") {
                    $("#r_time").removeClass().addClass("b2")
                } else {
                    if ($("#r_time").attr("class") == "b3") {
                        $("#r_time").removeClass().addClass("b1")
                    }
                }
                if ($("#l_s").attr("class") == "b4") {
                    $("#l_s").removeClass().addClass("b2")
                } else {
                    if ($("#l_s").attr("class") == "b3") {
                        $("#l_s").removeClass().addClass("b1")
                    }
                }
                a3 = true;
                $("#other_span_starttime").removeClass().addClass("b3");
                if ($("#other_span_endtime").attr("class") == "b4") {
                    $("#other_span_endtime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_endtime").attr("class") == "b3") {
                        $("#other_span_endtime").removeClass().addClass("b1")
                    }
                }
                if ($("#other_span_lishi").attr("class") == "b4") {
                    $("#other_span_lishi").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_lishi").attr("class") == "b3") {
                        $("#other_span_lishi").removeClass().addClass("b1")
                    }
                }
            }
            ay = "starttime";
            aI()
        });
        $("#other_span_starttime").click(function () {
            if (a3) {
                $("#s_time").removeClass().addClass("b4");
                if ($("#r_time").attr("class") == "b4") {
                    $("#r_time").removeClass().addClass("b2")
                } else {
                    if ($("#r_time").attr("class") == "b3") {
                        $("#r_time").removeClass().addClass("b1")
                    }
                }
                if ($("#l_s").attr("class") == "b4") {
                    $("#l_s").removeClass().addClass("b2")
                } else {
                    if ($("#l_s").attr("class") == "b3") {
                        $("#l_s").removeClass().addClass("b1")
                    }
                }
                a3 = false;
                $("#other_span_starttime").removeClass().addClass("b4");
                if ($("#other_span_endtime").attr("class") == "b4") {
                    $("#other_span_endtime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_endtime").attr("class") == "b3") {
                        $("#other_span_endtime").removeClass().addClass("b1")
                    }
                }
                if ($("#other_span_lishi").attr("class") == "b4") {
                    $("#other_span_lishi").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_lishi").attr("class") == "b3") {
                        $("#other_span_lishi").removeClass().addClass("b1")
                    }
                }
            } else {
                $("#s_time").removeClass().addClass("b3");
                if ($("#r_time").attr("class") == "b4") {
                    $("#r_time").removeClass().addClass("b2")
                } else {
                    if ($("#r_time").attr("class") == "b3") {
                        $("#r_time").removeClass().addClass("b1")
                    }
                }
                if ($("#l_s").attr("class") == "b4") {
                    $("#l_s").removeClass().addClass("b2")
                } else {
                    if ($("#l_s").attr("class") == "b3") {
                        $("#l_s").removeClass().addClass("b1")
                    }
                }
                a3 = true;
                $("#other_span_starttime").removeClass().addClass("b3");
                if ($("#other_span_endtime").attr("class") == "b4") {
                    $("#other_span_endtime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_endtime").attr("class") == "b3") {
                        $("#other_span_endtime").removeClass().addClass("b1")
                    }
                }
                if ($("#other_span_lishi").attr("class") == "b4") {
                    $("#other_span_lishi").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_lishi").attr("class") == "b3") {
                        $("#other_span_lishi").removeClass().addClass("b1")
                    }
                }
            }
            ay = "starttime";
            aI()
        });
        $("#r_time").click(function () {
            if (b3) {
                $("#r_time").removeClass().addClass("b4");
                if ($("#s_time").attr("class") == "b4") {
                    $("#s_time").removeClass().addClass("b2")
                } else {
                    if ($("#s_time").attr("class") == "b3") {
                        $("#s_time").removeClass().addClass("b1")
                    }
                }
                if ($("#l_s").attr("class") == "b4") {
                    $("#l_s").removeClass().addClass("b2")
                } else {
                    if ($("#l_s").attr("class") == "b3") {
                        $("#l_s").removeClass().addClass("b1")
                    }
                }
                b3 = false;
                $("#other_span_starttime").removeClass().addClass("b4");
                $("#other_span_endtime").removeClass().addClass("b2");
                $("#other_span_lishi").removeClass().addClass("b2")
            } else {
                $("#r_time").removeClass().addClass("b3");
                if ($("#s_time").attr("class") == "b4") {
                    $("#s_time").removeClass().addClass("b2")
                } else {
                    if ($("#s_time").attr("class") == "b3") {
                        $("#s_time").removeClass().addClass("b1")
                    }
                }
                if ($("#l_s").attr("class") == "b4") {
                    $("#l_s").removeClass().addClass("b2")
                } else {
                    if ($("#l_s").attr("class") == "b3") {
                        $("#l_s").removeClass().addClass("b1")
                    }
                }
                b3 = true;
                $("#other_span_endtime").removeClass().addClass("b2");
                if ($("#other_span_starttime").attr("class") == "b4") {
                    $("#other_span_starttime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_starttime").attr("class") == "b3") {
                        $("#other_span_starttime").removeClass().addClass("b1")
                    }
                }
                if ($("#other_span_lishi").attr("class") == "b4") {
                    $("#other_span_lishi").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_lishi").attr("class") == "b3") {
                        $("#other_span_lishi").removeClass().addClass("b1")
                    }
                }
            }
            ay = "arrivedtime";
            aI()
        });
        $("#other_span_endtime").click(function () {
            if (b3) {
                $("#r_time").removeClass().addClass("b4");
                if ($("#s_time").attr("class") == "b4") {
                    $("#s_time").removeClass().addClass("b2")
                } else {
                    if ($("#s_time").attr("class") == "b3") {
                        $("#s_time").removeClass().addClass("b1")
                    }
                }
                if ($("#l_s").attr("class") == "b4") {
                    $("#l_s").removeClass().addClass("b2")
                } else {
                    if ($("#l_s").attr("class") == "b3") {
                        $("#l_s").removeClass().addClass("b1")
                    }
                }
                b3 = false;
                $("#other_span_endtime").removeClass().addClass("b4");
                if ($("#other_span_starttime").attr("class") == "b4") {
                    $("#other_span_starttime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_starttime").attr("class") == "b3") {
                        $("#other_span_starttime").removeClass().addClass("b1")
                    }
                }
                if ($("#other_span_lishi").attr("class") == "b4") {
                    $("#other_span_lishi").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_lishi").attr("class") == "b3") {
                        $("#other_span_lishi").removeClass().addClass("b1")
                    }
                }
            } else {
                $("#r_time").removeClass().addClass("b3");
                if ($("#s_time").attr("class") == "b4") {
                    $("#s_time").removeClass().addClass("b2")
                } else {
                    if ($("#s_time").attr("class") == "b3") {
                        $("#s_time").removeClass().addClass("b1")
                    }
                }
                if ($("#l_s").attr("class") == "b4") {
                    $("#l_s").removeClass().addClass("b2")
                } else {
                    if ($("#l_s").attr("class") == "b3") {
                        $("#l_s").removeClass().addClass("b1")
                    }
                }
                b3 = true;
                $("#other_span_endtime").removeClass().addClass("b3");
                if ($("#other_span_starttime").attr("class") == "b4") {
                    $("#other_span_starttime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_starttime").attr("class") == "b3") {
                        $("#other_span_starttime").removeClass().addClass("b1")
                    }
                }
                if ($("#other_span_lishi").attr("class") == "b4") {
                    $("#other_span_lishi").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_lishi").attr("class") == "b3") {
                        $("#other_span_lishi").removeClass().addClass("b1")
                    }
                }
            }
            ay = "arrivedtime";
            aI()
        });
        $("#l_s").click(function () {
            if (aY) {
                $("#l_s").removeClass().addClass("b4");
                if ($("#r_time").attr("class") == "b4") {
                    $("#r_time").removeClass().addClass("b2")
                } else {
                    if ($("#r_time").attr("class") == "b3") {
                        $("#r_time").removeClass().addClass("b1")
                    }
                }
                if ($("#s_time").attr("class") == "b4") {
                    $("#s_time").removeClass().addClass("b2")
                } else {
                    if ($("#s_time").attr("class") == "b3") {
                        $("#s_time").removeClass().addClass("b1")
                    }
                }
                aY = false;
                $("#other_span_lishi").removeClass().addClass("b4");
                if ($("#other_span_endtime").attr("class") == "b4") {
                    $("#other_span_endtime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_endtime").attr("class") == "b3") {
                        $("#other_span_endtime").removeClass().addClass("b1")
                    }
                }
                if ($("#other_span_starttime").attr("class") == "b4") {
                    $("#other_span_starttime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_starttime").attr("class") == "b3") {
                        $("#other_span_starttime").removeClass().addClass("b1")
                    }
                }
            } else {
                $("#l_s").removeClass().addClass("b3");
                if ($("#r_time").attr("class") == "b4") {
                    $("#r_time").removeClass().addClass("b2")
                } else {
                    if ($("#r_time").attr("class") == "b3") {
                        $("#r_time").removeClass().addClass("b1")
                    }
                }
                if ($("#s_time").attr("class") == "b4") {
                    $("#s_time").removeClass().addClass("b2")
                } else {
                    if ($("#s_time").attr("class") == "b3") {
                        $("#s_time").removeClass().addClass("b1")
                    }
                }
                aY = true;
                $("#other_span_lishi").removeClass().addClass("b3");
                if ($("#other_span_endtime").attr("class") == "b4") {
                    $("#other_span_endtime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_endtime").attr("class") == "b3") {
                        $("#other_span_endtime").removeClass().addClass("b1")
                    }
                }
                if ($("#other_span_starttime").attr("class") == "b4") {
                    $("#other_span_starttime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_starttime").attr("class") == "b3") {
                        $("#other_span_starttime").removeClass().addClass("b1")
                    }
                }
            }
            ay = "lishi";
            aI()
        });
        $("#other_span_lishi").click(function () {
            if (aY) {
                $("#l_s").removeClass().addClass("b4");
                if ($("#r_time").attr("class") == "b4") {
                    $("#r_time").removeClass().addClass("b2")
                } else {
                    if ($("#r_time").attr("class") == "b3") {
                        $("#r_time").removeClass().addClass("b1")
                    }
                }
                if ($("#s_time").attr("class") == "b4") {
                    $("#s_time").removeClass().addClass("b2")
                } else {
                    if ($("#s_time").attr("class") == "b3") {
                        $("#s_time").removeClass().addClass("b1")
                    }
                }
                aY = false;
                $("#other_span_lishi").removeClass().addClass("b4");
                if ($("#other_span_endtime").attr("class") == "b4") {
                    $("#other_span_endtime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_endtime").attr("class") == "b3") {
                        $("#other_span_endtime").removeClass().addClass("b1")
                    }
                }
                if ($("#other_span_starttime").attr("class") == "b4") {
                    $("#other_span_starttime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_starttime").attr("class") == "b3") {
                        $("#other_span_starttime").removeClass().addClass("b1")
                    }
                }
            } else {
                $("#l_s").removeClass().addClass("b3");
                if ($("#r_time").attr("class") == "b4") {
                    $("#r_time").removeClass().addClass("b2")
                } else {
                    if ($("#r_time").attr("class") == "b3") {
                        $("#r_time").removeClass().addClass("b1")
                    }
                }
                if ($("#s_time").attr("class") == "b4") {
                    $("#s_time").removeClass().addClass("b2")
                } else {
                    if ($("#s_time").attr("class") == "b3") {
                        $("#s_time").removeClass().addClass("b1")
                    }
                }
                aY = true;
                $("#other_span_lishi").removeClass().addClass("b3");
                if ($("#other_span_endtime").attr("class") == "b4") {
                    $("#other_span_endtime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_endtime").attr("class") == "b3") {
                        $("#other_span_endtime").removeClass().addClass("b1")
                    }
                }
                if ($("#other_span_starttime").attr("class") == "b4") {
                    $("#other_span_starttime").removeClass().addClass("b2")
                } else {
                    if ($("#other_span_starttime").attr("class") == "b3") {
                        $("#other_span_starttime").removeClass().addClass("b1")
                    }
                }
            }
            ay = "lishi";
            aI()
        })
    }

    closeTrainStop = function () {
        over_flag = false;
        b1 = 0;
        $("#train_stop").hide();
        $("#train_table").html("")
    };
    hideTrainStop = function (cq) {
        over_flag = false;
        if (p) {
            clearTimeout(p)
        }
        p = window.setTimeout(function () {
            if (b1 != 1) {
                b1 = 0;
                $("#train_stop").hide();
                $("#train_table").html("")
            }
        }, 130)
    };
    checkHover = function (cr, cq) {
        if (getEvent(cr).type == "mouseover") {
            return !$.contains(cq, getEvent(cr).relatedTarget || getEvent(cr).fromElement) && !((getEvent(cr).relatedTarget || getEvent(cr).fromElement) === cq)
        } else {
            return !$.contains(cq, getEvent(cr).relatedTarget || getEvent(cr).toElement) && !((getEvent(cr).relatedTarget || getEvent(cr).toElement) === cq)
        }
    };
    getEvent = function (cq) {
        return cq || window.event
    };
    checkHover = function (cr, cq) {
        if (getEvent(cr).type == "mouseover") {
            return !$.contains(cq, getEvent(cr).relatedTarget || getEvent(cr).fromElement) && !((getEvent(cr).relatedTarget || getEvent(cr).fromElement) === cq)
        } else {
            return !$.contains(cq, getEvent(cr).relatedTarget || getEvent(cr).toElement) && !((getEvent(cr).relatedTarget || getEvent(cr).toElement) === cq)
        }
    };
    getEvent = function (cq) {
        return cq || window.event
    };
    function bD(cs, cq) {
        for (var cr = 0; cr < cq.length; cr++) {
            if (cq[cr].key == cs) {
                return true
            }
        }
        return false
    }

    function bn(cu) {
        var cz = function (cA) {
            this.value = cA
        };
        var cv = new Array();
        var cr = new Array();
        var ct = {};
        var cq = {};
        $("#cc_from_station_name_all>ul").html("");
        $("#cc_to_station_name_all>ul").html("");
        var cs;
        var cy;
        var cx;
        for (var cw = 0; cw < cu.length; cw++) {
            cs = cu[cw].queryLeftNewDTO.from_station_name;
            cy = cu[cw].queryLeftNewDTO.to_station_name;
            cx = cu[cw];
            if (!ct[cs]) {
                cv.push(new cz(cs));
                ct[cs] = true
            }
            if (!cq[cy]) {
                cr.push(new cz(cy));
                cq[cy] = true
            }
        }
        $("#to_station_ul").html($.render.toStationNameTableTemplate(cr));
        $("#from_station_ul").html($.render.stationNameTableTemplate(cv));
        $("#sear-sel-bd input[name='cc_from_station']").click(function () {
            k(bC, "cc_from_station_" + $(this).val());
            var cA = $("input[name='cc_from_station']");
            var cB = $("input[name='cc_from_station']:checked");
            if ($(this).is(":checked")) {
                if (cA && cB && cB.length == cA.length) {
                    $("#from_station_name_all").removeClass().addClass("btn-all")
                } else {
                    $("#from_station_name_all").removeClass().addClass("btn-all btn-all-sel")
                }
            } else {
                if (cA && cB && cB.length == 0) {
                    $("#from_station_name_all").removeClass().addClass("btn-all")
                } else {
                    $("#from_station_name_all").removeClass().addClass("btn-all btn-all-sel")
                }
            }
            aI()
        });
        $("#sear-sel-bd input[name='cc_to_station']").click(function () {
            k(bq, "cc_to_station_" + $(this).val());
            var cA = $("input[name='cc_to_station']");
            var cB = $("input[name='cc_to_station']:checked");
            if ($(this).is(":checked")) {
                if (cA && cB && cB.length == cA.length) {
                    $("#to_station_name_all").removeClass().addClass("btn-all")
                } else {
                    $("#to_station_name_all").removeClass().addClass("btn-all btn-all-sel")
                }
            } else {
                if (cA && cB && cB.length == 0) {
                    $("#to_station_name_all").removeClass().addClass("btn-all")
                } else {
                    $("#to_station_name_all").removeClass().addClass("btn-all btn-all-sel")
                }
            }
            aI()
        })
    }

    submitOrderRequest = function (cr, cq) {
        $.ajax({
            type: "post", url: ctx + "login/checkUser", data: {}, beforeSend: function (cs) {
                cs.setRequestHeader("If-Modified-Since", "0");
                cs.setRequestHeader("Cache-Control", "no-cache")
            }, success: function (cs) {
                var cu;
                checkusermdId = cs.attributes;
                if (cs.data.flag) {
                    if (train_tour_flag == "fc") {
                        cu = $("#back_train_date").val()
                    } else {
                        cu = $("#train_date").val()
                    }
                    if (x == "0X00") {
                        var ct = false;
                        for (i = (studentComPerArr.length - 1); i >= 0; i = i - 2) {
                            if (C(studentComPerArr[i - 1]) <= C(cu) && C(studentComPerArr[i]) >= C(cu)) {
                                ct = true;
                                break
                            }
                        }
                        if (!ct) {
                            b("学生票的乘车时间为每年的暑假6月1日至9月30日、寒假12月1日至3月31日，目前不办理学生票业务。");
                            return
                        }
                    }
                    S(cr, cq)
                } else {
                    bx();
                    $("#floatTable").hide();
                    a = $(window).scrollTop();
                    aa(cr, cq)
                }
            }
        })
    };
    function S(cD, cw) {
        var cq = "";
        if ($("#dc").is(":checked")) {
            cq = "dc"
        } else {
            cq = "wc"
        }
        if (train_tour_flag == "fc") {
            cq = "fc";
            var ct = cw.split(":");
            var cs = $("#back_train_date").val() + "-" + ct[0] + "-" + ct[1] + "-00";
            try {
                if (roundReferTime) {
                    if (C(roundReferTime) >= C(cs)) {
                        b("您预订的往程车票到站时间为" + C(roundReferTime).format("yyyy年MM月dd日 hh时mm分") + "，返回日期不能早于此时间");
                        return
                    }
                }
            } catch (cy) {
            }
        }
        if (train_tour_flag == "gc") {
            cq = "gc"
        }
        if ("undefined" == typeof(submitForm)) {
            var cu = "secretStr=" + cD + "&train_date=" + $("#train_date").val() + "&back_train_date=" + $("#back_train_date").val() + "&tour_flag=" + cq + "&purpose_codes=" + ck() + "&query_from_station_name=" + $("#fromStationText").val() + "&query_to_station_name=" + $("#toStationText").val() + "&" + cB
        } else {
            var cr = submitForm();
            var cC = cr.split(":::");
            var cx = cC[0].split(",-,")[0];
            var cA = cC[0].split(",-,")[1];
            var cv = cC[1].split(",-,")[0];
            var cz = cC[1].split(",-,")[1];
            var cu = escape(cx) + "=" + escape(cA) + "&" + cv + "=" + cz + "&secretStr=" + cD + "&train_date=" + $("#train_date").val() + "&back_train_date=" + $("#back_train_date").val() + "&tour_flag=" + cq + "&purpose_codes=" + ck() + "&query_from_station_name=" + $("#fromStationText").val() + "&query_to_station_name=" + $("#toStationText").val() + "&" + cB
        }
        var cB = checkusermdId != undefined ? "&_json_att=" + encodeURIComponent(checkusermdId) : "";
        $.ajax({
            type: "post",
            url: ctx + "leftTicket/submitOrderRequest",
            data: cu,
            async: false,
            success: function (cE) {
                if (cE.status) {
                    if (cE.data == "Y") {
                        dhtmlx.alert({
                            title: "温馨提示",
                            ok: "确定",
                            text: "您选择的列车距开车时间很近了，请确保有足够的时间抵达车站，并办理换取纸质车票、安全检查、实名制验证及检票等手续，以免耽误您的旅行。",
                            type: "alert-warn",
                            callback: function () {
                                aW(cq, train_tour_flag)
                            }
                        })
                    } else {
                        aW(cq, train_tour_flag)
                    }
                }
            }
        })
    }

    function aW(cr, cq) {
        if (cq != null) {
            if (cq == "fc") {
                otsRedirect("post", ctx + "confirmPassenger/initFc", {});
                return
            }
            if (cq == "gc") {
                otsRedirect("post", ctx + "confirmPassenger/initGc", {});
                return
            }
        }
        if (cr == "dc") {
            otsRedirect("post", ctx + "confirmPassenger/initDc", {});
            return
        } else {
            otsRedirect("post", ctx + "confirmPassenger/initWc", {})
        }
    }

    var cl = $("#fromStation").val();
    var bf = $("#toStation").val();
    var bY = $.trim($("#train_date").val());
    a8 = cl + bf + bY;
    $("#add-train").click(function () {
        if ($("#fromStationText").val() == "简拼/全拼/汉字") {
            dhtmlx.alert({title: "输入车次", ok: "确定", text: "请填写出发地！", type: "alert-error"});
            return
        }
        if ($("#toStationText").val() == "简拼/全拼/汉字") {
            dhtmlx.alert({title: "输入车次", ok: "确定", text: "请填写目的地！", type: "alert-error"});
            return
        }
        var ct = $('#prior_train span[name="prior_train-span"]').length;
        var cu = $.trim($("#inp-train").val()).toUpperCase();
        if (cu.length == 0 || cu == "请输入") {
            dhtmlx.alert({
                title: "输入车次", ok: "确定", text: "请输入车次", type: "alert-error", callback: function () {
                    $("#inp-train").val("");
                    $("#inp-train").focus()
                }
            })
        } else {
            if (ct < 6) {
                var cr = /^[a-zA-Z0-9]+$/;
                var cs = /^[0-9]+$/;
                if (!cr.test(cu)) {
                    dhtmlx.alert({
                        title: "输入车次",
                        ok: "确定",
                        text: "车次格式输入错误！",
                        type: "alert-error",
                        callback: function () {
                            ccInputSelected = true;
                            $("#inp-train").select()
                        }
                    })
                } else {
                    if (cs.test(cu) && cu.length > 4) {
                        dhtmlx.alert({
                            title: "输入车次",
                            ok: "确定",
                            text: "车次格式输入错误！",
                            type: "alert-error",
                            callback: function () {
                                ccInputSelected = true;
                                $("#inp-train").select()
                            }
                        })
                    } else {
                        if (cu.length < 2) {
                            dhtmlx.alert({
                                title: "输入车次",
                                ok: "确定",
                                text: "车次格式输入错误！",
                                type: "alert-error",
                                callback: function () {
                                    ccInputSelected = true;
                                    $("#inp-train").select()
                                }
                            })
                        } else {
                            if ($.inArray(cu, ccSelected) < 0) {
                                var cq = "<span name='prior_train-span' class='sel-box w80'>" + cu + "<a class='close' href='javascript:' onclick='$.removeSel(this,\"" + cu + "\",4)'></a></span>";
                                $("#prior_train").append(cq);
                                ccSelected.push(cu);
                                $("#inp-train").val("")
                            } else {
                                dhtmlx.alert({
                                    title: "输入车次",
                                    ok: "确定",
                                    text: "此车次已经添加过！",
                                    type: "alert-error",
                                    callback: function () {
                                        ccInputSelected = true;
                                        $("#inp-train").select()
                                    }
                                })
                            }
                        }
                    }
                }
            } else {
                dhtmlx.alert({title: "输入车次", ok: "确定", text: "最多添加5个优先车次", type: "alert-error"});
                $("#inp-train").val("")
            }
        }
    });
    function ck() {
        if ($("#sf2").is(":checked")) {
            return "0X00"
        } else {
            return "ADULT"
        }
    }

    $("#yxtrain_close").click(function (cq) {
        $("#yxtraindiv").hide()
    });
    $("#yxtrain_a_close").click(function (cq) {
        $("#yxtraininput").val("");
        $("#yxtraininput").trigger("keyup")
    });
    $("#passenger_a_close").click(function (cq) {
        $("#searchPassenger").val("");
        $("#searchPassenger").trigger("keyup")
    });
    $("#yxtraininput").bind("keyup", function () {
        var cr = $(this).val().toUpperCase();
        var cq = $("#yxtrain_code").height();
        if (u(cr, 0)) {
            cp(1)
        } else {
            cp(3)
        }
        $("#yxtrain_code").css("height", cq)
    });
    function cp(cq) {
        $("#yxtrain_loading").hide();
        $("#yxtrain_code").hide();
        $("#yxTrain_page").hide();
        $("#yxtrain_empty").hide();
        if (1 == cq) {
            $("#yxtrain_code").show();
            $("#yxTrain_page").show()
        } else {
            if (2 == cq) {
                $("#yxtrain_loading").show()
            } else {
                if (3 == cq) {
                    $("#yxtrain_empty").show()
                }
            }
        }
    }

    function u(cE, cq) {
        cE = cE.toUpperCase();
        var cA = [];
        var cF = $("#prior_train span:gt(1)");
        if (cF && cF.length > 0) {
            for (var ct = 0; ct < cF.length; ct++) {
                cA.push(cF[ct].innerText)
            }
        }
        var cD = [];
        var cz = [];
        if (trainListForIE && trainListForIE.length > 0) {
            for (var cr = 0; cr < trainListForIE.length; cr++) {
                cD.push(trainListForIE[cr]);
                cz.push(trainListForIE[cr])
            }
        }
        if (cE) {
            for (var ct = 0; ct < cz.length; ct++) {
                var cy = cz[ct].substring(0, cz[ct].indexOf("("));
                if (cy.indexOf(cE) <= -1) {
                    cD.splice($.inArray(cz[ct], cD), 1)
                }
            }
        }
        if (cD && cD.length > 0) {
            var cv = "";
            for (var ct = 0; ct < cD.length; ct++) {
                var cy = cD[ct];
                var cu = cy.indexOf("(") > -1 ? cy.substring(0, cy.indexOf("(")) : cy;
                var cB = ct >= yxTrainPageSize * (cq) && ct < yxTrainPageSize * (cq + 1);
                if (cB) {
                    if (cu.indexOf(cE) > -1) {
                        var cx = cy.indexOf(cE);
                        var cw = cy.substring(0, cx);
                        var cC = cy.substring(cx + cE.length, cy.indexOf("("));
                        var cs = cy.substring(cy.indexOf("("));
                        if (cA && cA.length > 0 && $.inArray(cu, cA) > -1) {
                            cv += '<li style="width: 140px;" traincode=' + cu + ' name="yxtrainli" class="cur"><span style="font-size:15px;">' + cw + '<span style="color:red;">' + cE + "</span>" + cC + "</span>" + cs + "</li>"
                        } else {
                            cv += '<li style="width: 140px;" traincode=' + cu + ' name="yxtrainli"><span style="font-size:15px;">' + cw + '<span style="color:red;">' + cE + "</span>" + cC + "</span>" + cs + "</li>"
                        }
                    }
                }
            }
            $("#yxtrain_code").html(cv)
        } else {
            return false
        }
        if (cD.length > 0) {
            E(cq, cD.length)
        }
        $('li[name="yxtrainli"]').click(function () {
            if ($(this).attr("class") == "cur") {
                var cI = $('span[name="prior_train-span"]');
                for (var cG = 0; cG < cI.length; cG++) {
                    var cH = $(cI[cG]).html();
                    if (cH.indexOf($(this).attr("traincode")) > -1) {
                        $(cI[cG]).children().click()
                    }
                }
                $(this).removeClass()
            } else {
                $("#inp-train").val($(this).attr("traincode"));
                var cJ = $('#prior_train span[name="prior_train-span"]').length;
                $("#add-train").click();
                if (cJ < 6) {
                    $(this).attr("class", "cur");
                    $.chooseAutoSubmit()
                }
            }
        });
        return true
    }

    function E(cq, cr) {
        var cs = Math.ceil(cr / yxTrainPageSize);
        $("#yxTrain_page").html(aE(cq, cs)).show()
    }

    function aE(cy, ct) {
        var cu = "";
        cu += (cy == 0) ? "" : '<a href="javascript:void(0);" onclick="$.click_YX_page(' + (cy - 1) + ')" class="prev">上一页</a>';
        var cz = cy + 1;
        var cv = ct;
        var cw = 2;
        var cx = 5;
        var cq = (cz - cw) > 0 ? (cz + cw > cv ? cv - cx + 1 : cz - cw) : 1;
        var cr = cq + cx > cv ? cv + 1 : cq + cx;
        if (cv < cx) {
            for (var cs = 1; cs < cv + 1; cs++) {
                if (cz == cs) {
                    cu += '<a href="javascript:void(0);" onclick="$.click_YX_page(' + (cs - 1) + ')" class="on">' + (cs) + "</a>"
                } else {
                    cu += '<a href="javascript:void(0);" onclick="$.click_YX_page(' + (cs - 1) + ')">' + (cs) + "</a>"
                }
            }
        } else {
            for (var cs = cq; cs < cr; cs++) {
                if (cz == cs) {
                    cu += '<a href="javascript:void(0);" onclick="$.click_YX_page(' + (cs - 1) + ')" class="on">' + (cs) + "</a>"
                } else {
                    cu += '<a href="javascript:void(0);" onclick="$.click_YX_page(' + (cs - 1) + ')">' + (cs) + "</a>"
                }
            }
        }
        cu += (cy == ct - 1) ? "" : '<a href="javascript:void(0);" onclick="$.click_YX_page(' + (cy + 1) + ')" class="next">下一页</a>';
        return cu
    }

    function a7(cy, ct) {
        if (ct == 0) {
            return ""
        }
        var cu = "";
        cu += (cy == 0) ? "" : '<a href="javascript:void(0);" onclick="$.click_passenger_page(' + (cy - 1) + ')" class="prev">上一页</a>';
        var cz = cy + 1;
        var cv = ct;
        var cw = 2;
        var cx = 5;
        var cq = (cz - cw) > 0 ? (cz + cw > cv ? cv - cx + 1 : cz - cw) : 1;
        var cr = cq + cx > cv ? cv + 1 : cq + cx;
        if (cv < cx) {
            for (var cs = 1; cs < cv + 1; cs++) {
                if (cz == cs) {
                    cu += '<a href="javascript:void(0);" onclick="$.click_passenger_page(' + (cs - 1) + ')" class="on">' + (cs) + "</a>"
                } else {
                    cu += '<a href="javascript:void(0);" onclick="$.click_passenger_page(' + (cs - 1) + ')">' + (cs) + "</a>"
                }
            }
        } else {
            for (var cs = cq; cs < cr; cs++) {
                if (cz == cs) {
                    cu += '<a href="javascript:void(0);" onclick="$.click_passenger_page(' + (cs - 1) + ')" class="on">' + (cs) + "</a>"
                } else {
                    cu += '<a href="javascript:void(0);" onclick="$.click_passenger_page(' + (cs - 1) + ')">' + (cs) + "</a>"
                }
            }
        }
        cu += (cy == ct - 1) ? "" : '<a href="javascript:void(0);" onclick="$.click_passenger_page(' + (cy + 1) + ')" class="next">下一页</a>';
        return cu
    }

    function ck() {
        if ($("#sf2").is(":checked")) {
            return "0X00"
        } else {
            return "ADULT"
        }
    }

    jQuery.extend({
        chooseAutoSubmit: function () {
            if (!$("#autoSubmit").is(":disabled")) {
                if (!$("#autoSubmit").is(":checked")) {
                    $("#autoSubmit").click()
                }
            }
        }, init_ul4li: function () {
            var cq = [];
            var cs = 0;
            cq[cs++] = '<li><input name="cc_type" value="G" type="checkbox" class="check" /><label for="">GC-高铁/城际</label></li>';
            cq[cs++] = '<li><input name="cc_type" value="D" type="checkbox" class="check" /><label for="">D-动车</label></li>';
            cq[cs++] = '<li><input name="cc_type" value="Z" type="checkbox" class="check" /><label for="">Z-直达</label></li>';
            cq[cs++] = '<li><input name="cc_type" value="T" type="checkbox" class="check" /><label for="">T-特快</label></li>';
            cq[cs++] = '<li><input name="cc_type" value="K" type="checkbox" class="check" /><label for="">K-快速</label></li>';
            cq[cs++] = '<li><input name="cc_type" value="QT" type="checkbox" class="check" /><label for="">其他</label></li>';
            $("#_ul_station_train_code").html(cq.join(""));
            if (train_tour_flag == "gc" && "Y" == isDwTicketResign) {
                var cu = $("#_ul_station_train_code li");
                for (var cr = 2, ct = cu.length; cr < ct; cr++) {
                    cu.eq(cr).find("input").attr("disabled", "disabled");
                    cu.eq(cr).find("label").attr("for", "").attr("style", "color: rgb(153, 153, 153)")
                }
            }
            $("#startendtime").html('<span class="b1" id="s_time">出发时间</span><br /><span class="b2" id="r_time">到达时间</span>');
            $("#floatstartendtime").html('<span class="b1" id="other_span_starttime">出发时间</span><br /><span class="b2" id="other_span_endtime">到达时间</span>')
        }, parseDateFormat: function (cu) {
            var cq = "";
            var cr = cu.getFullYear();
            var ct = cu.getMonth() + 1;
            var cs = cu.getDate();
            if (ct < 10) {
                ct = "0" + ct
            }
            if (cs < 10) {
                cs = "0" + cs
            }
            cq = cr + "-" + ct + "-" + cs;
            return cq
        }, renderPassenger: function (cI) {
            if (!cI) {
                cI = 0
            }
            if (passengerAll) {
                var cu = $("#searchPassenger").val();
                var cq = [];
                if (cu != "" && cu != "输入乘客姓名") {
                    var cG = passengerAll.length;
                    for (var cD = 0; cD < cG; cD++) {
                        var cC = passengerAll[cD];
                        if (cC.passenger_name.indexOf(cu) > -1 || (cC.first_letter && cC.first_letter.toUpperCase().indexOf(cu.toUpperCase()) > -1)) {
                            cq.push(cC)
                        }
                    }
                } else {
                    cq = passengerAll.slice(passengerPageSize * (cI), Math.min(passengerPageSize * (cI + 1), passengerAll.length))
                }
                var cB = cq.length;
                var cz = [];
                var cv = 0;
                for (var cD = 0; cD < cB; cD++) {
                    var cC = cq[cD];
                    var cH = cC.passenger_type_name;
                    if (!cH) {
                        cH = ""
                    }
                    var ct = "";
                    var cr = "";
                    if ($("#sf2").is(":checked")) {
                        if (cC.passenger_type != "3") {
                            ct = " disabled='true' ";
                            cr = " class='color999' "
                        }
                    }
                    var cy = cC.total_times;
                    if (cC.passenger_id_type_code == "2") {
                        ct = " disabled='true' ";
                        cr = " class='color999' title='请修改身份信息' "
                    } else {
                        if (cC.passenger_id_type_code == "1") {
                            if (!isCanGP("1", cy)) {
                                ct = " disabled='true' ";
                                cr = " class='color999' title='请修改身份信息' "
                            }
                        } else {
                            if (!isCanGP("B", cy)) {
                                ct = " disabled='true' ";
                                cr = " class='color999' title='请修改身份信息' "
                            }
                            if (!isCanGP("H", cy)) {
                                ct = " disabled='true' ";
                                cr = " class='color999' title='请修改身份信息' "
                            }
                        }
                    }
                    var cA = cH == "成人" ? cC.passenger_name : cC.passenger_name + "(" + cH + ")";
                    cA = cA.substring(0, 9);
                    if (cu != "" && cu != "输入乘客姓名") {
                        if (cC.passenger_name.indexOf(cu) > -1 || (cC.first_letter && cC.first_letter.toUpperCase().indexOf(cu.toUpperCase()) > -1)) {
                            cv++;
                            if ($.pHasInSelected(cC)) {
                                if (cr) {
                                    var cx = cr.indexOf("'");
                                    cr = cr.substring(0, cx + 1) + "cur " + cr.substring(cx + 1)
                                } else {
                                    cr = "class='cur'"
                                }
                            }
                            cz[cD] = "<li style='width:110px' " + cr + " p_value='" + cC.passenger_name + "(" + cH + ")(" + cC.passenger_id_no + ")' name='" + cC.passenger_type + "' codeType='" + cC.passenger_id_type_code + "' flag='" + cC.total_times + "'>" + cA + "</li>"
                        }
                    } else {
                        cv++;
                        if ($.pHasInSelected(cC)) {
                            if (cr) {
                                var cx = cr.indexOf("'");
                                cr = cr.substring(0, cx) + "cur " + cr.substring(cx)
                            } else {
                                cr = "class='cur'"
                            }
                        }
                        cz[cD] = "<li style='width:110px' " + cr + " p_value='" + cC.passenger_name + "(" + cH + ")(" + cC.passenger_id_no + ")'  name='" + cC.passenger_type + "' codeType='" + cC.passenger_id_type_code + "' flag='" + cC.total_times + "'>" + cA + "</li>"
                    }
                }
                var cE = 100;
                var cF = 0;
                if (cv / 3 > 11) {
                    cE = 310;
                    cF = 258
                } else {
                    cE = 100 + parseInt((cv / 3) * 25);
                    cF = cE - 48
                }
                $("#sel-buyer").css("height", cE);
                $("#pContent").css("height", cF);
                $("#buyer-list").html(cz.join(""));
                var cs = 0;
                if (cu != "" && cu != "输入乘客姓名") {
                    cs = cq.length
                } else {
                    cs = passengerAll.length
                }
                var cw = Math.ceil(cs / passengerPageSize);
                $("#passenger_page").html(a7(cI, cw)).show()
            }
            $("#buyer-list li").click(function () {
                if ($(this).hasClass("color999")) {
                    return
                }
                var cL = $("#setion_postion span").length;
                var cN = $(this).attr("p_value");
                if (!$(this).hasClass("cur")) {
                    if (cL < 6) {
                        var cJ = "";
                        var cK = true;
                        if (cN.indexOf("成人") > -1 || cN.indexOf("残疾军人、伤残人民警察") > -1) {
                            cJ = "<span name='" + cN + "' class='sel-box w80'><a href='javascript:' onclick='$.addChildPassenger(\"" + cN + "\");' style='position:static;background:none;width:auto;' title='您可点击此乘车人添加儿童票。'>" + cN + "</a><a class='close' href='javascript:' onclick='$.removeSel(this,\"" + cN + "\",1)'></a></span>";
                            $("#setion_postion").append(cJ);
                            $.checkedPasseanger(cN)
                        } else {
                            if (cN.indexOf("学生") > -1) {
                                var cM = $(this);
                                if ($.checkSeatTypes()) {
                                    cJ = "<span name='" + cN + "' class='sel-box w80'>" + cN + "<a class='close' href='javascript:' onclick='$.removeSel(this,\"" + cN + "\",1)'></a></span>";
                                    $("#setion_postion").append(cJ);
                                    $.checkedPasseanger(cN)
                                } else {
                                    $("#conifrmdialog_student_to_adult_context").html("当前选择的优先席别有不支持学生票的，是否选择购买成人票？");
                                    dhtmlx.createWin({
                                        winId: "confirmChangeStudentToAdult",
                                        closeWinId: ["close_conifrmdialog_student_to_adult", "cancel_dialog_student_to_adult"],
                                        callback: function () {
                                            $(cM).prop("checked", false)
                                        },
                                        okId: "goto_student_to_adult",
                                        okCallBack: function () {
                                            var cO = cN.replace(/学生/, "成人");
                                            cJ = "<span name='" + cN + "' class='sel-box w80'>" + cO + "<a class='close' href='javascript:' onclick='$.removeSel(this,\"" + cN + "\",1)'></a></span>";
                                            $("#setion_postion").append(cJ);
                                            $.checkedPasseanger(cO)
                                        }
                                    })
                                }
                            } else {
                                if (cN.indexOf("儿童") > -1) {
                                    cJ = "<span name='" + cN + "' class='sel-box w80' title='如需修改旅客类型，请修改相应常用联系人信息。'>" + cN + "<a class='close' href='javascript:' onclick='$.removeSel(this,\"" + cN + "\",1)'></a></span>";
                                    $("#setion_postion").append(cJ);
                                    $.checkedPasseanger(cN)
                                } else {
                                    cJ = "<span name='" + cN + "' class='sel-box w80'>" + cN + "<a class='close' href='javascript:' onclick='$.removeSel(this,\"" + cN + "\",1)'></a></span>";
                                    $("#setion_postion").append(cJ);
                                    $.checkedPasseanger(cN)
                                }
                            }
                        }
                        $(this).addClass("cur");
                        $.chooseAutoSubmit()
                    } else {
                        dhtmlx.alert({title: "添加常用联系人", ok: "确定", text: "最多添加5位联系人", type: "alert-error"});
                        $(this).removeClass("cur")
                    }
                } else {
                    $.each($("#setion_postion span"), function (cO, cP) {
                        if (cN == $(cP).attr("name")) {
                            $(cP).remove();
                            $.removePasseanger(cN);
                            return
                        }
                    });
                    $(this).removeClass("cur")
                }
            })
        }, reloadPassenger: function () {
            var cq = dhtmlx.modalbox({
                targSrc: '<div><img src="' + ctx + 'resources/images/loading.gif"></img></div>',
                callback: function () {
                }
            });
            $.ajax({
                type: "post",
                isTakeParam: false,
                cache: false,
                async: false,
                url: ctx + "confirmPassenger/getPassengerDTOs",
                timeout: 10000,
                error: function (cr, ct, cs) {
                    dhtmlx.modalbox.hide(cq)
                },
                success: function (cr) {
                    dhtmlx.modalbox.hide(cq);
                    if (cr.status) {
                        if (cr.data.noLogin == "true") {
                            bx();
                            $("#floatTable").hide();
                            a = $(window).scrollTop();
                            Z()
                        } else {
                            if (cr.data.exMsg != "" && cr.data.exMsg != null && cr.data.exMsg != "null") {
                                b(cr.data.exMsg);
                                return
                            }
                            $("#sel-buyer").show();
                            $("#sel-seat").hide();
                            $("#sel-date").hide();
                            $("#sel-buyer").css("left", $("#sear-sel").position().left + 80);
                            $("#sel-buyer").css("left", $("#sear-sel").position().left + 80);
                            $("#sel-buyer").css("top", $("#sear-sel").position().top + 4 * 28 + 16);
                            passengerAll = cr.data.normal_passengers;
                            if (!(passengerAll && passengerAll.length > 0)) {
                                passengerAll = []
                            }
                            var cu = cr.data.dj_passengers;
                            if (cu && cu.length > 0) {
                                var ct = cu.length;
                                for (var cs = 0; cs < ct; cs++) {
                                    if (!$.checkIsHas(passengerAll, cu[cs])) {
                                        passengerAll.push(cu[cs])
                                    }
                                }
                            }
                            two_isOpenClick = cr.data.two_isOpenClick;
                            other_isOpenClick = cr.data.other_isOpenClick;
                            $.renderPassenger()
                        }
                    }
                }
            })
        }, checkIsHas: function (cs, ct) {
            var cr = cs.length;
            for (var cq = 0; cq < cr; cq++) {
                if (cs[cq].passenger_name == ct.passenger_name && cs[cq].passenger_id_type_code == ct.passenger_id_type_code && ct.passenger_id_no == cs[cq].passenger_id_no) {
                    return true
                }
            }
            return false
        }, pHasInSelected: function (ct) {
            var cr = passengerChecked.length;
            if (cr > 0) {
                for (var cq = 0; cq < cr; cq++) {
                    var cs = passengerChecked[cq];
                    if (cs.passenger_name == ct.passenger_name && cs.passenger_id_type_code == ct.passenger_id_type_code && cs.passenger_id_no == ct.passenger_id_no) {
                        return true
                    }
                }
            }
            return false
        }, showSelectBuyer: function () {
            $("#sel-seat").hide();
            $("#yxtraindiv").hide();
            $("#sel-date").hide();
            if (!passengerAll) {
                $.reloadPassenger()
            } else {
                var cq = $("#buyer-list li");
                for (var cr = 0; cr < cq.length; cr++) {
                    var ct = $(cq[cr]).attr("name");
                    var cs = $(cq[cr]).attr("codeType");
                    var cu = $(cq[cr]).attr("flag");
                    if ($("#sf2").is(":checked")) {
                        if (ct != "3") {
                            $(cq[cr]).addClass("color999")
                        } else {
                            $(cq[cr]).removeClass("color999")
                        }
                    } else {
                        $(cq[cr]).removeClass("color999")
                    }
                    if (cs == "2") {
                        $(cq[cr]).addClass("color999")
                    } else {
                        if (cs == "1") {
                            if (!isCanGP("1", cu)) {
                                $(cq[cr]).addClass("color999")
                            }
                        } else {
                            if (!isCanGP("B", cu)) {
                                $(cq[cr]).addClass("color999")
                            }
                            if (!isCanGP("H", cu)) {
                                $(cq[cr]).addClass("color999")
                            }
                        }
                    }
                }
                $("#sel-buyer").show();
                $("#sel-buyer").css("left", $("#sear-sel").position().left + 80);
                $("#sel-buyer").css("top", $("#sear-sel").position().top + 4 * 28 + 16)
            }
        }, click_YX_page: function (cr) {
            var cs = $("#yxtraininput").val().toUpperCase();
            var cq = $("#yxtrain_code").height();
            if (u(cs, cr)) {
                cp(1)
            } else {
                cp(3)
            }
            $("#yxtrain_code").css("height", cq)
        }, click_passenger_page: function (cq) {
            $.renderPassenger(cq)
        }, showYxTrain: function () {
            $("#yxtrain_code").css("height", "auto");
            $("#yxtrain_code li").removeClass();
            $("#yxtraininput").val("");
            $("#yxtraindiv").css("top", $("#showYxTrainSpan").offset().top + $("#showYxTrainSpan").outerHeight()).css("left", $("#showYxTrainSpan").offset().left).show();
            cp(2);
            var cs = $("#fromStationText").val() + "#" + $("#toStationText").val() + "#" + $("#train_date").val();
            if (trainListForIE.length == 0 || yxTrainChange != cs) {
                x = ck();
                var cu = x == "0X00" ? true : false;
                var cr = train_tour_flag == "fc" ? $.trim($("#back_train_date").val()) : $.trim($("#train_date").val());
                var cq = bK(cr, cu);
                if (!cq) {
                    $("#yxtraindiv").hide();
                    return
                }
                var ct = {
                    "leftTicketDTO.train_date": cr,
                    "leftTicketDTO.from_station": $("#fromStation").val(),
                    "leftTicketDTO.to_station": $("#toStation").val(),
                    purpose_codes: x
                };
                aV();
                $.ajax({
                    type: "get", isTakeParam: false, beforeSend: function (cv) {
                        cv.setRequestHeader("If-Modified-Since", "0");
                        cv.setRequestHeader("Cache-Control", "no-cache")
                    }, url: ctx + CLeftTicketUrl, data: ct, timeout: 10000, success: function (cx) {
                        if (cx.status) {
                            if (cx.data == null || cx.data.length == 0) {
                                cp(3);
                                trainListForIE = [];
                                return
                            }
                            if (cx.data.flag == 1) {
                                cx.data = b4(cx.data.result, cx.data.map)
                            }
                            trainListForIE = [];
                            for (var cy = 0; cy < cx.data.length; cy++) {
                                trainListForIE.push(cx.data[cy].queryLeftNewDTO.station_train_code + "(" + cx.data[cy].queryLeftNewDTO.start_time + "--" + cx.data[cy].queryLeftNewDTO.arrive_time + ")")
                            }
                            if (train_tour_flag == "gc" && "Y" == isDwTicketResign) {
                                var cE = [];
                                for (var cy = 0, cF = cx.data.length; cy < cF; cy++) {
                                    var cw = cx.data[cy].queryLeftNewDTO;
                                    var cB = cw.station_train_code;
                                    cB = cB.substring(0, 1);
                                    if ("G" == cB || "D" == cB) {
                                        cE.push(cx.data[cy])
                                    }
                                }
                                cx.data = cE
                            }
                            if ($("#DW_SHOW_STR")[0]) {
                                $("#DW_SHOW_STR").remove()
                            }
                            if ($("#hainan_limit_msg")[0]) {
                                $("#hainan_limit_msg").remove()
                            }
                            $("#sear-sel").show();
                            $("#sear-result").show();
                            $("#t-list").show();
                            $("#no_filter_ticket_2").hide();
                            $("#no_filter_ticket_6").hide();
                            $("#no_filter_ticket").hide();
                            var cv = "";
                            var cA = "";
                            if (train_tour_flag != null && train_tour_flag == "fc") {
                                var cD = "<strong>".concat($("#fromStationText").val()).concat(" --> ").concat($("#toStationText").val()).concat("（").concat(aD($("#back_train_date").val())).concat('）</strong>共计<strong id="trainum">').concat(cx.data.length).concat("</strong>个车次");
                                if (bX(cx.data)) {
                                    cv = "<p class='ad-gt' id='DW_SHOW_STR' 分析js文件='1'>高铁动卧 夕发朝至 风雨无阻 省时省钱</p>"
                                } else {
                                    if (hainan_limit_msg && ae(ct, cx.data)) {
                                        cA = "<p class='ad-gt' id='hainan_limit_msg'  style='font-size:13px;background:#fff6f6 left center no-repeat;font-weight:bold'>" + hainan_limit_msg + "</p>"
                                    }
                                }
                                if ($("#auto_query").is(":checked")) {
                                    var cC = "";
                                    for (var cz = 0; cz < 25; cz++) {
                                        cC = cC + "&nbsp;"
                                    }
                                    cD = cD.concat(cC + "<input type='checkbox' class='check' id='filterTic' /><div id='filterTicDiv' style='display:inline'><strong><label for='filterTic' style='cursor: pointer;'>仅查看刷到车次</label></strong></div>")
                                }
                                $("#sear-result>p").html(cD);
                                if ($("#auto_query").is(":checked")) {
                                    $("#filterTic").bind("click", bh)
                                }
                            } else {
                                var cD = "<strong>".concat($("#fromStationText").val()).concat(" --> ").concat($("#toStationText").val()).concat("（").concat(aD($("#train_date").val())).concat('）</strong>共计<strong id="trainum">').concat(cx.data.length).concat("</strong>个车次");
                                if (bX(cx.data)) {
                                    cv = "<p class='ad-gt' id='DW_SHOW_STR' 分析js文件='1'>高铁动卧 夕发朝至 风雨无阻 省时省钱</p>"
                                } else {
                                    if (hainan_limit_msg && ae(ct, cx.data)) {
                                        cA = "<p class='ad-gt' id='hainan_limit_msg'  style='font-size:13px;background:#fff6f6 left center no-repeat;font-weight:bold'>" + hainan_limit_msg + "</p>"
                                    }
                                }
                                if ($("#auto_query").is(":checked")) {
                                    var cC = "";
                                    for (var cz = 0; cz < 25; cz++) {
                                        cC = cC + "&nbsp;"
                                    }
                                    cD = cD.concat(cC + "<input type='checkbox' class='check' id='filterTic' /><div id='filterTicDiv' style='display:inline'><strong><label for='filterTic' style='cursor: pointer;'>仅查看刷到车次</label></strong></div>")
                                }
                                $("#sear-result>p").html(cD);
                                if ($("#auto_query").is(":checked")) {
                                    $("#filterTic").bind("click", bh)
                                }
                            }
                            if (!$("#DW_SHOW_STR")[0]) {
                                $("#sear-result>p").after(cv)
                            }
                            if (cA) {
                                $("#sear-result>p").after(cA)
                            }
                            if (dwTranTimeStr) {
                                clearInterval(dwTranTimeStr)
                            }
                            if ($("#DW_SHOW_STR")[0]) {
                                dwTranTimeStr = window.setInterval(function () {
                                    if ($("#DW_SHOW_STR").attr("data") == "1") {
                                        $("#DW_SHOW_STR").attr("data", "2").html("夜行两千公里 最低不足千元")
                                    } else {
                                        $("#DW_SHOW_STR").attr("data", "1").html("高铁动卧 夕发朝至 风雨无阻 省时省钱")
                                    }
                                }, 1300)
                            }
                            if ($("#hainan_limit_msg")[0]) {
                                hainan_tip = null;
                                hainan_tip = new Marquee({
                                    ID: "hainan_limit_msg",
                                    Direction: "left",
                                    Step: 1,
                                    Width: 0,
                                    Height: 0,
                                    Timer: 30,
                                    DelayTime: 0,
                                    WaitTime: 0,
                                    ScrollStep: 0
                                })
                            }
                            ba = cx.data;
                            ah();
                            bn(ba);
                            n();
                            bG(ba);
                            bO();
                            $("#queryLeftTable").html("");
                            $("#trainum").html("");
                            aL();
                            if (b0.length < 0) {
                                aP = true;
                                $("#no_filter_ticket").show();
                                $("#no_filter_ticket_msg_1").show();
                                $("#no_filter_ticket_msg_2").hide();
                                $("#trainum").html("0");
                                return
                            } else {
                                aP = true;
                                $("#trainum").html(b0.length);
                                aA(b0);
                                $.showYxTrainData()
                            }
                            yxTrainChange = $("#fromStationText").val() + "#" + $("#toStationText").val() + "#" + $("#train_date").val()
                        } else {
                            if (cx && cx.c_url) {
                                CLeftTicketUrl = cx.c_url;
                                aj(ct)
                            }
                        }
                    }
                });
                yxTrainChange = cs
            } else {
                $.showYxTrainData()
            }
            $("#sel-buyer").hide();
            $("#sel-seat").hide();
            $("#sel-date").hide()
        }, showYxTrainData: function () {
            if (u($("#yxtraininput").val(), 0)) {
                $("#yxtraindiv").css("top", $("#showYxTrainSpan").offset().top + $("#showYxTrainSpan").outerHeight()).css("left", $("#showYxTrainSpan").offset().left).show();
                cp(1);
                $("#yxtraininput").focus()
            } else {
                cp(3)
            }
        }, getMindateForCal: function () {
            if ($("#sf2").is(":checked")) {
                g = studentMindate
            } else {
                g = otherMindate
            }
            return g
        }, getMaxdateForCal: function () {
            if ($("#sf2").is(":checked")) {
                D = studentMaxdate
            } else {
                D = otherMaxdate
            }
            return D
        }
    });
    function F() {
        $("#show_all_query_result").click(function () {
            bC = new Array();
            bq = new Array();
            N = new Array();
            $("#train_type_btn_all").removeClass().addClass("btn-all");
            $("#start_time_btn_all").removeClass().addClass("btn-all");
            $("#arrive_time_btn_all").removeClass().addClass("btn-all");
            $("#seat_type_btn_all").removeClass().addClass("btn-all");
            $("#from_station_name_all").removeClass().addClass("btn-all");
            $("#to_station_name_all").removeClass().addClass("btn-all");
            $("#sear-sel-bd input").each(function () {
                if (this.checked) {
                    this.checked = false
                }
            });
            if (ax) {
                ax.setComboText("")
            }
            $("#avail_ticket").attr("checked", false);
            aI()
        })
    }

    function at() {
        var cq = $("#queryPriceTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({priceTableTemplate: cq});
        var cq = $("#fromStationNameTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({stationNameTableTemplate: cq});
        var cq = $("#toStationNameTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({toStationNameTableTemplate: cq});
        var cq = $("#seatTypeTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({seatTypeTemplate: cq});
        var cq = $("#stationinfoTemplate").html().replace("<!--", "").replace("-->", "");
        $.templates({stationinfoTemplate: cq})
    }

    function bG(cr) {
        dhtmlXCombo_defaultOption.prototype._DrawHeaderButton = function () {
        };
        $("#train_combo_box").hide();
        var cq = [];
        if (!ax) {
            ax = new dhtmlXCombo("train_combo_box_div", "cc", 90)
        } else {
            ax.setComboText("")
        }
        ax.clearAll();
        $(cr).each(function () {
            cq.push([this.queryLeftNewDTO.station_train_code, this.queryLeftNewDTO.station_train_code])
        });
        ax.addOption(cq);
        ax.enableFilteringMode(true);
        ax.attachEvent("onChange", function () {
            if (ax.getComboText() != "") {
                if ($("#iLcear").is(":hidden")) {
                    $("#iLcear").show()
                }
            }
            aI()
        });
        if (!$("#iLcear")[0]) {
            $(".dhx_combo_box ").append($('<span style="display: none;" class="i-clear dhx_combo_img_iClear" id="iLcear"></span>'));
            $("#iLcear").on("click", function () {
                if (ax) {
                    ax.setComboText("");
                    $(this).hide()
                }
            })
        }
        $(".dhx_combo_input").on("keyup", function () {
            if ($(this).val() == "") {
                $("#iLcear").hide()
            } else {
                if ($("#iLcear").is(":hidden")) {
                    $("#iLcear").show()
                }
            }
        })
    }

    function aq() {
        if (!cb) {
            cb = new dhtmlXWindows();
            cb.enableAutoViewport(true);
            cb.setSkin("dhx_terrace");
            cb.attachViewportTo("winVP");
            cb.setImagePath(ctx + "resources/js/rich/windows/imgs/")
        }
        $("#username").keydown(function () {
            login_errorMsg_hide()
        });
        $("#password").keydown(function () {
            login_errorMsg_hide()
        })
    }

    function bv() {
        cb.window("login").hide();
        cb.window("login").setModal(false)
    }

    function bx() {
        if (cb.window("login")) {
            cb.window("login").setModal(false);
            cb.window("login").hide()
        }
        a2 = cb.createWindow("login", 0, 0, 400, 350);
        var cq, cr;
        if (typeof(TouLocal) != "undefined" && TouLocal.checkZByTargeElement("")) {
            cq = $(window).width() / 2 - 208;
            cr = ch() + ($(window).height() / 2 - 232)
        } else {
            cq = $(window).width() / 2 - 200;
            cr = ch() + ($(window).height() / 2 - 205)
        }
        a2.attachObject("relogin");
        if (if_show_pass_code_login == "Y") {
            a2.setDimension($("#content").width(), $("#content").height() + 10)
        } else {
            a2.setDimension(530, 343);
            cq = $(window).width() / 2 - 250
        }
        $(".dhtmlx_window_active").height($("#content").height());
        $(".dhtmlx_window_active").css({left: cq, top: cr});
        a2.bringToTop();
        cb.window("login").clearIcon();
        cb.window("login").denyResize();
        a2.button("park").hide();
        a2.button("minmax1").hide();
        a2.hideHeader();
        if (if_show_pass_code_login == "Y") {
            if (is_uam_login == "Y") {
                refreshImgUAM("login", "sjrand")
            } else {
                refreshImg("login", "sjrand")
            }
        }
        a2.setModal(true);
        $("#relogin_close").click(function () {
            bj();
            var cs = $(window).scrollTop();
            var ct = $("#float").position().top;
            if (cs > ct + 30) {
                $("#floatTable").show()
            }
            bv()
        });
        if (typeof(touclickHook_leftTicketLogin) === "function") {
            touclickHook_leftTicketLogin()
        }
    }

    function bj() {
        aQ();
        $("#username").val("");
        $("#password").val("");
        $("#randCode").val("");
        b5()
    }

    function ch() {
        if ("pageYOffset" in window) {
            return window.pageYOffset
        } else {
            if (document.compatMode == "BackCompat") {
                return document.body.scrollTop
            } else {
                return document.documentElement.scrollTop
            }
        }
    }

    function aQ() {
        $("#username").add($("#password")).add($("#randCode")).add($("#randCode2")).removeClass("error")
    }

    function B(cu) {
        var cr = /^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])|(19[0-9])|(16[0-9])\d{8}$/;
        var cq = /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/;
        var ct = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
        var cs = true;
        aQ();
        if ("" == cu || cu == null || cu == uninputmsg || cu == "admin") {
            $("#username").removeClass("inptxt w200").addClass("inptxt w200 error");
            cs = login_messages.userNameEmpty
        } else {
            if (!cq.test(cu) && !ct.test(cu) && !cr.test(cu)) {
                $("#username").removeClass("inptxt w200").addClass("inptxt w200 error");
                cs = login_messages.userNameFormat
            }
        }
        return cs
    }

    function bz(cq) {
        var cr = true;
        aQ();
        if ("" == cq || cq == null) {
            $("#password").removeClass("inptxt w200").addClass("inptxt w200 error");
            cr = login_messages.passwordEmpty
        } else {
            if (cq.length < 6) {
                $("#password").removeClass("inptxt w200").addClass("inptxt w200 error");
                cr = login_messages.passwordLength
            }
        }
        return cr
    }

    function aU() {
        var cs = $.trim($("#username").val());
        var cq = $.trim($("#password").val());
        var cr = B(cs);
        return typeof(cr) === "boolean" ? bz(cq) : cr
    }

    function A() {
        var cr = false;
        var cq = false;
        $("#username").on("keyup", function () {
            aB = true
        }).blur(function () {
            if (aB) {
                var cs = $.trim($("#username").val());
                cr = B(cs);
                if (if_show_pass_code_login == "Y") {
                    if (typeof(cr) !== "boolean") {
                        showError($("#randCode")[0], cr)
                    } else {
                        if (cr === true) {
                            showError($("#randCode")[0]).hide()
                        }
                    }
                } else {
                    if (typeof(cr) !== "boolean") {
                        login_errorMsg(cr)
                    } else {
                        if (cr === true) {
                            login_errorMsg_hide()
                        }
                    }
                }
            }
        });
        $("#password").blur(function () {
            if (aB) {
                var cs = $.trim($("#password").val());
                if (if_show_pass_code_login == "Y") {
                    if (cr === true && typeof(cq = bz(cs)) !== "boolean") {
                        showError($("#randCode")[0], cq)
                    } else {
                        if (cr === true && cq === true) {
                            showError($("#randCode")[0]).hide()
                        }
                    }
                } else {
                    if (cr === true && typeof(cq = bz(cs)) !== "boolean") {
                        login_errorMsg(cq)
                    } else {
                        if (cr === true && cq === true) {
                            login_errorMsg_hide()
                        }
                    }
                }
            }
        })
    }

    function cc(cq) {
        $("#password").val("");
        $("#randCode").val("");
        if (cq != null) {
            if (cq == "登录名不存在。") {
                aB = false;
                $("#username").add($("#password")).add($("#randCode")).add($("#randCode2")).removeClass("error");
                $("#username").removeClass("inptxt w200").addClass("inptxt w200 error");
                $("#username").focus()
            } else {
                if (cq.indexOf("密码输入错误。") != -1) {
                    $("#username").add($("#password")).add($("#randCode")).add($("#randCode2")).removeClass("error");
                    $("#password").removeClass("inptxt w200").addClass("inptxt w200 error");
                    $("#password").focus()
                }
            }
            if (if_show_pass_code_login == "Y") {
                showError($("#randCode")[0], cq)
            } else {
                login_errorMsg(cq)
            }
        }
    }

    function aa(cr, cq) {
        $("#loginSubAsyn").unbind("click");
        $("#loginSubAsyn").click(function () {
            var cs = aU();
            if (is_uam_login == "Y") {
                if (if_show_pass_code_login == "Y" && !verifyRandCodeUAM($("#randCode")[0], cs)) {
                    return
                }
                if (if_show_pass_code_login == "N" && typeof(cs) !== "boolean") {
                    login_errorMsg(cs);
                    return
                }
                $.ajax({
                    url: passport_login,
                    data: {username: $("#username").val(), password: $("#password").val(), appid: passport_appId},
                    dataType: "json",
                    type: "POST",
                    xhrFields: {withCredentials: true},
                    success: function (ct) {
                        if (ct.result_code == 0) {
                            $.ajax({
                                type: "POST",
                                url: passport_authuam,
                                async: false,
                                data: {appid: passport_appId},
                                dataType: "jsonp",
                                jsonp: "callback",
                                success: function (cu) {
                                    if (cu.result_code == 0) {
                                        var cv = cu.newapptk || cu.apptk;
                                        $.ajax({
                                            type: "POST",
                                            async: false,
                                            url: ctx + passport_authclient,
                                            data: {tk: cv},
                                            datatype: "json",
                                            success: function (cw) {
                                                if (cw.result_code == 0) {
                                                    bv();
                                                    loginAsyn(cw.username);
                                                    S(cr, cq)
                                                }
                                            },
                                            error: function () {
                                            }
                                        })
                                    }
                                },
                                error: function () {
                                }
                            })
                        } else {
                            if (if_show_pass_code_login == "Y") {
                                showSuc($("#randCode")[0]).hide()
                            } else {
                                login_errorMsg_hide()
                            }
                            if (if_show_pass_code_login == "Y") {
                                refreshImgUAM("login", "sjrand")
                            }
                            cc(ct.result_message)
                        }
                    }
                })
            } else {
                if (if_show_pass_code_login == "Y" && !verifyRandCode($("#randCode")[0], cs)) {
                    return
                }
                if (if_show_pass_code_login == "N" && typeof(cs) !== "boolean") {
                    login_errorMsg(cs);
                    return
                }
                $("#loginForm").ajaxSubmit({
                    url: ctx + "login/loginUserAsyn?random=" + new Date().getTime(),
                    type: "post",
                    dataType: "json",
                    async: false,
                    success: function (ct) {
                        if (ct.data.status) {
                            if (ct.data.username != null) {
                                bv();
                                loginAsyn(ct.data.username);
                                if (ct.data.otherMsg != "") {
                                    dhtmlx.alert({
                                        title: messages["message.error"],
                                        ok: messages["button.ok"],
                                        text: ct.data.otherMsg,
                                        type: "alert-error",
                                        callback: function () {
                                            if ("Y" == ct.data.notifysession) {
                                                dhtmlx.createWin({
                                                    winId: "notifysession",
                                                    closeWinId: ["close_notifysession"],
                                                    okId: "goto_notifysession",
                                                    okCallBack: function () {
                                                        S(cr, cq)
                                                    }
                                                })
                                            } else {
                                                S(cr, cq)
                                            }
                                        }
                                    })
                                } else {
                                    if ("Y" == ct.data.notifysession) {
                                        dhtmlx.createWin({
                                            winId: "notifysession",
                                            closeWinId: ["close_notifysession"],
                                            okId: "goto_notifysession",
                                            okCallBack: function () {
                                                S(cr, cq)
                                            }
                                        })
                                    } else {
                                        S(cr, cq)
                                    }
                                }
                            }
                        } else {
                            if (ct.data.uamflag == "1") {
                                location.reload(true)
                            }
                            if (if_show_pass_code_login == "Y") {
                                showSuc($("#randCode")[0]).hide()
                            } else {
                                login_errorMsg_hide()
                            }
                            if (if_show_pass_code_login == "Y") {
                                refreshImg("login", "sjrand")
                            }
                            cc(ct.data.loginFail)
                        }
                    }
                })
            }
        })
    }

    function Z() {
        var cq = false;
        $("#loginSubAsyn").unbind("click");
        $("#loginSubAsyn").click(function () {
            if (!cq) {
                var cr = aU();
                if (is_uam_login == "Y") {
                    if (if_show_pass_code_login == "Y" && !verifyRandCodeUAM($("#randCode")[0], cr)) {
                        cq = false;
                        return
                    }
                    cq = true;
                    $("#loginForm").ajaxSubmit({
                        url: passport_login,
                        data: {username: $("#username").val(), password: $("#password").val(), appid: passport_appId},
                        dataType: "json",
                        type: "POST",
                        xhrFields: {withCredentials: true},
                        success: function (cs) {
                            if (cs.result_code == 0) {
                                $.ajax({
                                    type: "POST",
                                    url: passport_authuam,
                                    async: false,
                                    data: {appid: passport_appId},
                                    dataType: "jsonp",
                                    jsonp: "callback",
                                    success: function (ct) {
                                        if (ct.result_code == 0) {
                                            var cu = ct.newapptk || ct.apptk;
                                            $.ajax({
                                                type: "POST",
                                                async: false,
                                                url: ctx + passport_authclient,
                                                data: {tk: cu},
                                                datatype: "json",
                                                success: function (cv) {
                                                    if (cv.result_code == 0) {
                                                        bv();
                                                        loginAsyn(cv.username)
                                                    }
                                                },
                                                error: function () {
                                                }
                                            })
                                        }
                                    },
                                    error: function () {
                                    }
                                })
                            } else {
                                $("#i-ok").hide();
                                if (if_show_pass_code_login == "Y") {
                                    refreshImgUAM("login", "sjrand")
                                }
                                cc(cs.result_message)
                            }
                        },
                        complete: function () {
                            cq = false
                        }
                    })
                } else {
                    if (if_show_pass_code_login == "Y" && !verifyRandCode($("#randCode")[0], cr)) {
                        cq = false;
                        return
                    }
                    cq = true;
                    $("#loginForm").ajaxSubmit({
                        url: ctx + "login/loginUserAsyn?random=" + new Date().getTime(),
                        type: "post",
                        dataType: "json",
                        async: false,
                        success: function (cs) {
                            if (cs.data.status) {
                                if (cs.data.otherMsg != "") {
                                    dhtmlx.alert({
                                        title: messages["message.error"],
                                        ok: messages["button.ok"],
                                        text: cs.data.otherMsg,
                                        type: "alert-error",
                                        callback: function () {
                                            if (cs.data.username != null) {
                                                bv();
                                                loginAsyn(cs.data.username)
                                            }
                                        }
                                    })
                                } else {
                                    if (cs.data.username != null) {
                                        bv();
                                        loginAsyn(cs.data.username)
                                    }
                                }
                            } else {
                                if (cs.data.uamflag == "1") {
                                    location.reload(true)
                                }
                                $("#i-ok").hide();
                                if (if_show_pass_code_login == "Y") {
                                    refreshImg("login", "sjrand")
                                }
                                cc(cs.data.loginFail)
                            }
                        },
                        complete: function () {
                            cq = false
                        }
                    })
                }
            }
        })
    }

    function aX() {
        window.sucessCallback = function () {
            bA = $("#randCode2").val();
            $("#back_edit").trigger("click");
            var cq = "99999GGGGG";
            var cs = "##CCT##PPT##CPT##PXT##SBT##PBD##JOD##HPD##SHD##QTP##TSP##TJP##";
            var cr = "##CBP##DIP##JGK##ZEK##UUH##NKH##ESH##OHH##AOH##";
            if (isAsync == ticket_submit_order.request_flag.isAsync) {
                if (K.queryLeftNewDTO.train_no.indexOf(cq) > -1 && cs.indexOf(K.queryLeftNewDTO.from_station_telecode) > -1 && cr.indexOf(K.queryLeftNewDTO.to_station_telecode) > -1) {
                    dhtmlx.createWin({
                        winId: "confirmG1234",
                        closeWinId: ["close_conifrmdialog_G1234", "cancel_dialog_G1234"],
                        okId: "goto_integration_G1234",
                        okCallBack: function () {
                            q()
                        },
                        callback: function () {
                            return
                        }
                    })
                } else {
                    q()
                }
            } else {
                if (K.queryLeftNewDTO.train_no.indexOf(cq) > -1 && cs.indexOf(K.queryLeftNewDTO.from_station_telecode) > -1 && cr.indexOf(K.queryLeftNewDTO.to_station_telecode) > -1) {
                    dhtmlx.createWin({
                        winId: "confirmG1234",
                        closeWinId: ["close_conifrmdialog_G1234", "cancel_dialog_G1234"],
                        okId: "goto_integration_G1234",
                        okCallBack: function () {
                            co()
                        },
                        callback: function () {
                            return
                        }
                    })
                } else {
                    co()
                }
            }
            return
        }
    }

    function b5() {
        $("#username").css("color", "#333");
        $("#password").css("color", "#333");
        $("#randCode").css("color", "#333");
        if ($("#username").val() == "" || $("#username").val() == uninputmsg || $("#username").val() == null || $("#username").val() == "admin") {
            $("#username").css("color", "#999");
            $("#username").val(uninputmsg);
            $("#password").val("")
        }
        $("#username").focus(function () {
            var cq = $("#username").val();
            if (cq == uninputmsg) {
                $("#username").css("color", "#333");
                $("#username").val("");
                $("#password").val("")
            }
        }).blur(function () {
            var cq = $("#username").val();
            if (cq == "") {
                $("#username").css("color", "#999");
                $("#username").val(uninputmsg)
            }
        })
    }

    function ag() {
        $("#forget_my_password_id").on("click", function (cq) {
            otsRedirect("post", ctx + "forgetPassword/initforgetMyPassword")
        })
    }

    function aV() {
        var cq = 1;
        var cw;
        var cB;
        var cs;
        var cv = true;
        var cu = true;
        var cz = true;
        var cD;
        var cr;
        var cA = false;
        var cx = false;
        var cC = false;
        cs = dataNumber;
        var cy;
        if (train_tour_flag != null && train_tour_flag != "" && train_tour_flag == "fc") {
            cy = jQuery.inArray($("#back_train_date").val().substring(5, 10), change_dates_arr)
        } else {
            cy = jQuery.inArray($("#train_date").val().substring(5, 10), change_dates_arr)
        }
        if (cy != "-1") {
            cy = cy + 1;
            cD = firstShow;
            cr = endShow;
            if (parseInt(cy) >= parseInt(firstShow) && parseInt(cy) <= parseInt(endShow)) {
                if (isOther) {
                    if (parseInt(endShow) > parseInt(other_control)) {
                        endShow = other_control;
                        cx = true;
                        cA = true
                    }
                } else {
                    if (parseInt(endShow) > parseInt(stu_control)) {
                        endShow = stu_control
                    }
                }
                if (!cx) {
                    cv = false;
                    cu = false;
                    cz = false;
                    cB = endShow + 1
                }
            } else {
                cA = true;
                firstShow = cy;
                endShow = firstShow + 19;
                if (isOther) {
                    if (parseInt(endShow) > parseInt(other_control)) {
                        endShow = other_control;
                        cx = true
                    }
                } else {
                    if (parseInt(endShow) > parseInt(stu_control)) {
                        endShow = stu_control;
                        cx = true
                    }
                }
                if (!cx) {
                    cw = firstShow - 1;
                    cB = endShow + 1;
                    if (cw < cq) {
                        cv = false
                    }
                }
            }
            if (isOther) {
                if (other_control < dataNumber) {
                    cC = true
                }
            } else {
                if (stu_control < dataNumber) {
                    cC = true
                }
            }
            if (cx) {
                cA = true;
                firstShow = endShow - 19;
                cw = firstShow - 1;
                if (cC) {
                    cu = true;
                    cB = endShow + 1;
                    cs = dataNumber
                } else {
                    cu = false
                }
                if (train_tour_flag != null && train_tour_flag != "" && train_tour_flag == "fc") {
                    $("#back_train_date").val(fullDateArr[cy - 1])
                } else {
                    $("#train_date").val(fullDateArr[cy - 1])
                }
            }
            if (parseInt(firstShow) < 1) {
                firstShow = 1
            }
            if (cv) {
                for (var ct = cq; ct <= cw; ct++) {
                    $("#date_range>ul>li:nth-child(" + ct + ")").hide()
                }
            }
            if (cu) {
                for (var ct = cB; ct <= cs; ct++) {
                    $("#date_range>ul>li:nth-child(" + ct + ")").hide()
                }
            }
            if (cz) {
                for (var ct = firstShow; ct <= endShow; ct++) {
                    $("#date_range>ul>li:nth-child(" + ct + ")").show()
                }
            }
            $("#date_range>ul>li").removeClass("sel");
            if (cA) {
                $("#date_range>ul>li:nth-child(" + cD + ")").children("span:first").removeClass();
                $("#date_range>ul>li:nth-child(" + cD + ")").children("span:last").removeClass();
                $("#date_range>ul>li:nth-child(" + cr + ")").removeClass();
                $("#date_range>ul>li:nth-child(" + firstShow + ")").children("span:first").addClass("first");
                $("#date_range>ul>li:nth-child(" + firstShow + ")").children("span:last").addClass("first");
                $("#date_range>ul>li:nth-child(" + firstShow + ")").children().addClass("first");
                $("#date_range>ul>li:nth-child(" + endShow + ")").addClass("end")
            }
            $("#date_range>ul>li:nth-child(" + cy + ")").addClass("sel");
            $("#date_range>ul>li:nth-child(" + cy + ")").children("span:last-child").removeClass();
            $("#date_range>ul>li:nth-child(" + cy + ")").children("span:first-child").addClass("hide");
            bT = $("#date_range>ul>li:nth-child(" + cy + ")").children("span:first-child").text()
        }
    }

    function bP() {
        $("#query_ticket").unbind("click");
        $("#query_ticket_stu").unbind("click");
        $("#query_ticket").removeClass().addClass("btn92s btn-disabled");
        $("#query_ticket_stu").removeClass().addClass("btn92s btn-disabled");
        bl();
        setTimeout(function () {
            cn();
            bi();
            $("#query_ticket").removeClass().addClass("btn92s");
            $("#query_ticket_stu").removeClass().addClass("btn92s");
            if (train_tour_flag != "gc" && train_tour_flag != "fc") {
                if (ClickWho == "0X00") {
                    $("#query_ticket").unbind();
                    $("#query_ticket").removeClass().addClass("btn92s btn-disabled");
                    $("#query_ticket_stu").removeClass().addClass("btn92s")
                }
                if (ClickWho == "00") {
                    $("#query_ticket_stu").unbind();
                    $("#query_ticket_stu").removeClass().addClass("btn92s btn-disabled");
                    $("#query_ticket").removeClass().addClass("btn92s")
                }
            }
            if (isstudentDate) {
                $("#query_ticket_stu").unbind();
                $("#query_ticket_stu").removeClass().addClass("btn92s btn-disabled");
                $("#query_ticket").removeClass().addClass("btn92s")
            }
        }, 1000)
    }

    changeArriveDate = function (cr, cq) {
        cr = cr.replace(":", "");
        cq = cq.replace(":", "");
        hour_value = Number(cr.substring(0, 2)) + Number(cq.substring(0, 2));
        min_value = Number(cr.substring(2, 4)) + Number(cq.substring(2, 4));
        if (min_value >= 60) {
            hour_value = hour_value + 1
        }
        if (hour_value >= 24 && hour_value < 48) {
            return "次日"
        } else {
            if (hour_value >= 48 && hour_value < 72) {
                return "两日"
            } else {
                if (hour_value >= 72) {
                    return "三日"
                } else {
                    return "当日"
                }
            }
        }
    };
    changeLiShi = function (cq) {
        if (cq.substring(0, 1) == "0") {
            if (cq.substring(1, 2) == "0") {
                if (cq.substring(3, 4) == "0") {
                    cq = cq.substring(4, 5) + "分"
                } else {
                    cq = cq.substring(3, 5) + "分"
                }
            } else {
                cq = cq.substring(1, 2) + "小时" + cq.substring(3, 5) + "分"
            }
        } else {
            if (cq.substring(3, 5) == "00") {
                cq = cq.substring(0, 2) + "小时"
            } else {
                cq = cq.substring(0, 2) + "小时" + cq.substring(3, 5) + "分"
            }
        }
        return cq
    };
    isNum = function (cq) {
        return parseInt(cq)
    };
    buttonText = function () {
        return "预订"
    };
    function ao() {
        if ($("#sf2").is(":checked")) {
            if (C($("#train_date").val()) > C(init_maxPeriod) - 24 * 60 * 60 * 1000) {
                bl()
            } else {
                bi()
            }
        }
    }

    function ap() {
        if (train_tour_flag == "fc") {
            var cq = $("#back_train_date").val();
            z("back_train_date")
        } else {
            var cq = $("#train_date").val();
            z("train_date")
        }
        if (rqChecked.length == 0) {
            rqChecked.push(cq)
        }
        var cr = false;
        if (cq != rqChecked[0]) {
            for (var cs = 0; cs < rqChecked.length; cs++) {
                if (cq == rqChecked[cs]) {
                    cr = true;
                    rqChecked.splice(cs, 1);
                    $("#date-list input[scode=" + rqChecked[0] + "]").prop("checked", false);
                    rqChecked.splice(0, 1, cq);
                    $("#prior_date span[name=" + cq + "]").remove();
                    break
                }
            }
            if (!cr) {
                $("#date-list input[scode=" + rqChecked[0] + "]").prop("checked", false);
                rqChecked.splice(0, 1, cq);
                $("#date-list input[scode=" + rqChecked[0] + "]").prop("checked", true)
            }
        }
    }

    $("#train_date").focus(function () {
        $("#train_date").jcalendar({
            isSingle: false,
            startDate: $.getMindateForCal(),
            endDate: $.getMaxdateForCal(),
            onpicked: function () {
                ap();
                $("#train_date").blur();
                var cq = $("#train_date").val();
                var cr = $("#back_train_date").val();
                if ($("#wf").is(":checked")) {
                    if (!cr | C(cq) > C(cr)) {
                        $("#back_train_date").val(cq)
                    }
                }
                aV()
            }
        })
    });
    $("#date_icon_1").click(function () {
        $("#train_date").focus()
    });
    $("#back_train_date").focus(function () {
        $("#back_train_date").jcalendar({
            isSingle: false,
            startDate: $("#train_date").val(),
            endDate: $.getMaxdateForCal(),
            onpicked: function () {
                ap();
                $("#back_train_date").blur();
                aV()
            }
        })
    });
    $("#date_icon_2").click(function () {
        $("#back_train_date").focus()
    });
    String.prototype.toDate = function () {
        style = "yyyy-MM-dd hh:mm";
        var ct = {"y+": "y", "M+": "M", "d+": "d", "h+": "h", "m+": "m"};
        var cq = {y: "", M: "", d: "", h: "00", m: "00"};
        var cs = style;
        for (var cr in ct) {
            if (new RegExp("(" + cr + ")").test(style)) {
                cq[ct[cr]] = this.substring(cs.indexOf(RegExp.$1), cs.indexOf(RegExp.$1) + RegExp.$1.length)
            }
        }
        return new Date(cq.y, cq.M - 1, cq.d, cq.h, cq.m)
    };
    function z(cu) {
        if (cu == "back_train_date" && ClickWho != "0X00") {
            return
        }
        var cq = ($("#" + cu).val().split(" ")[0] + " 00:00:00").toDate().getTime();
        var cw = stu_start_train_date.split("&");
        var cs = stu_end_tain_date.split("&");
        var cr = false;
        for (var ct = 0, cv = cw.length; ct < cv; ct++) {
            if (cq >= cw[ct].toDate().getTime() && cq <= cs[ct].toDate().getTime()) {
                cr = true;
                break
            }
        }
        if (cr) {
            $("#sf2").attr("disabled", false);
            $("#sf2_label").removeClass("color999")
        } else {
            $("#sf2").attr("checked", false);
            $("#sf1")[0]["checked"] = "checked";
            $("#sf2").attr("disabled", true);
            $("#sf2_label").addClass("color999")
        }
    }

    function bZ(cq) {
        if (isSaveQueryLog == "Y") {
            $.ajax({
                type: "get", isTakeParam: false, beforeSend: function (cr) {
                    cr.setRequestHeader("If-Modified-Since", "0");
                    cr.setRequestHeader("Cache-Control", "no-cache")
                }, url: ctx + "leftTicket/log", data: cq, timeout: 15000, error: function (cr, ct, cs) {
                }, success: function (cr) {
                }
            })
        }
    }

    var aT = 0;
    var X = new Array();

    function U() {
        $("div#id-seat-sel div.sel-item a").on("click", function () {
            if ($(this).attr("class") == "cur") {
                $(this).removeClass("cur");
                aT--;
                var cr = $(this).attr("id");
                $.each(X, function (cs, cu) {
                    var ct = $(cu).attr("id");
                    if (cr == ct) {
                        X.splice(cs, 1)
                    }
                });
                $("#selectNo").html(aT + "/" + tickets_info.length)
            } else {
                X.push($(this));
                $(this).addClass("cur");
                if (aT == tickets_info.length) {
                    var cq = X[aT - 1];
                    $(cq).removeClass("cur");
                    X.splice(aT - 1, 1);
                    return
                }
                aT++;
                $("#selectNo").html(aT + "/" + tickets_info.length)
            }
        })
    }

    function T() {
        ak();
        if (tickets_info && tickets_info.length > 0) {
            var cu = "Y";
            var cq = tickets_info[0].seat_type;
            for (var ct = 0; ct < tickets_info.length; ct++) {
                var cs = tickets_info[ct];
                if (cs.seat_type != cq) {
                    cu = "N";
                    break
                }
            }
            if (canChooseSeats && "Y" == canChooseSeats && "Y" == cu) {
                if (choose_Seats) {
                    var cr = "*如果本次列车剩余席位无法满足您的选座需求，系统将自动为您分配席位。";
                    if ("M" == cq && choose_Seats.indexOf("M") > -1) {
                        $("#id-seat-sel").css("display", "block");
                        $("#yideng1").css("display", "block");
                        if (tickets_info.length > 1) {
                            $("#yideng2").css("display", "block")
                        }
                        $("#notice_1_id").html(cr)
                    }
                    if ("O" == cq && choose_Seats.indexOf("O") > -1) {
                        $("#id-seat-sel").css("display", "block");
                        $("#erdeng1").css("display", "block");
                        if (tickets_info.length > 1) {
                            $("#erdeng2").css("display", "block")
                        }
                        $("#notice_1_id").html(cr)
                    }
                    if ("P" == cq && choose_Seats.indexOf("P") > -1) {
                        $("#id-seat-sel").css("display", "block");
                        $("#tedeng1").css("display", "block");
                        if (tickets_info.length > 1) {
                            $("#tedeng2").css("display", "block")
                        }
                        $("#notice_1_id").html(cr)
                    }
                    if ("9" == cq && choose_Seats.indexOf("9") > -1) {
                        $("#id-seat-sel").css("display", "block");
                        $("#tedeng1").css("display", "block");
                        if (tickets_info.length > 1) {
                            $("#tedeng2").css("display", "block")
                        }
                        $("#notice_1_id").html(cr)
                    }
                }
            }
        }
    }

    function ak() {
        $("div#id-seat-sel div.sel-item a").removeClass("cur");
        aT = 0;
        X = new Array();
        $("#selectNo").html(aT + "/" + tickets_info.length);
        $("#id-seat-sel.sel-item").css("display", "none");
        $("#id-seat-sel").css("display", "none");
        $("#notice_1_id").html("");
        $("#yideng1").css("display", "none");
        $("#yideng2").css("display", "none");
        $("#erdeng1").css("display", "none");
        $("#erdeng2").css("display", "none");
        $("#tedeng1").css("display", "none");
        $("#tedeng2").css("display", "none")
    }

    function bF() {
        var cq = "";
        $.each($("div#id-seat-sel div.seat-sel-bd a"), function () {
            if ($(this).attr("class") == "cur") {
                var cr = $(this).attr("id");
                cq += cr
            }
        });
        return cq
    }

    function bm() {
        if (aT != 0 && aT != tickets_info.length) {
            $("#sy_ticket_num_id").html("<span style='color:red;'>请按照乘车人个数选座对应的席位。</span>");
            return false
        } else {
            return true
        }
    }

    function b8() {
        b2();
        if (tickets_info && tickets_info.length > 0) {
            if (canChooseBeds && "Y" == canChooseBeds) {
                $("#id-bed-sel").css("display", "block");
                $("#notice_1_id").html("*选铺后如果系统票额不足，系统将随机为您申请铺位。");
                if (isCanChooseMid && "Y" == isCanChooseMid) {
                    $("#mid_bed").css("display", "block")
                } else {
                    $("#mid_bed").css("display", "none")
                }
            } else {
                $("#id-bed-sel").css("display", "none")
            }
        }
    }

    numSet = function (ct, cq) {
        var cy = parseInt($("#x_no").text());
        var cu = parseInt($("#z_no").text());
        var cs = parseInt($("#s_no").text());
        var cw = tickets_info.length;
        var cr = cy + cu + cs;
        if ("add" == ct) {
            if (cr < cw) {
                var cx = document.getElementById(cq).innerText;
                var cv = parseInt(cx) + 1;
                document.getElementById(cq).innerText = cv;
                $("#selectBedNo").html(cr + 1 + "/" + cw)
            }
        } else {
            var cx = document.getElementById(cq).innerText;
            if (cr > 0 && parseInt(cx) > 0) {
                var cv = parseInt(cx) - 1;
                document.getElementById(cq).innerText = cv;
                $("#selectBedNo").html(cr - 1 + "/" + cw)
            }
        }
    };
    function b2() {
        $("#x_no").html("0");
        $("#z_no").html("0");
        $("#s_no").html("0");
        $("#selectBedNo").html(0 + "/" + tickets_info.length);
        $("#confirmDiv").css("padding", "20px 0");
        $("#checktrain").css("display", "none")
    }

    function aM() {
        var cq = $("#x_no").text();
        var cr = $("#z_no").text();
        var cs = $("#s_no").text();
        return cq + cr + cs
    }
})();
onclick="checkG1234('','06:55','78000K940605','GIW','ZIW')">
/**
 * 预订接口
 *
 * '','06:55','78000K940605','GIW','ZIW'
 * @param g 车次最长的那个数据
 * @param f 发车时间
 * @param c 车次编号
 * @param h 出发地点
 * @param b 结束地点
 */
function checkG1234(g, f, c, h, b) {
    var a = "99999GGGGG";
    var e = "##CCT##PPT##CPT##PXT##SBT##PBD##JOD##HPD##SHD##QTP##TSP##TJP##";
    var d = "##CBP##DIP##JGK##ZEK##UUH##NKH##ESH##OHH##AOH##";
    if (c.indexOf(a) > -1 && e.indexOf(h) > -1 && d.indexOf(b) > -1) {
        dhtmlx.createWin({
            winId: "confirmG1234",
            closeWinId: ["close_conifrmdialog_G1234", "cancel_dialog_G1234"],
            okId: "goto_integration_G1234",
            okCallBack: function () {
                submitOrderRequest(g, f)
            },
            callback: function () {
                return
            }
        })
    } else {
        submitOrderRequest(g, f)
    }
}
function checkRandCodeUAM(e) {
    var b = false, a = e.value, c = "sjrand", d = TouClick.get("touclick-" + e.id);
    $.ajax({
        url: passport_captcha_check,
        type: "post",
        dataType: "json",
        xhrFields: {withCredentials: true},
        data: {answer: a, login_site: "E", rand: c},
        async: false,
        success: function (f) {
            if (f.result_code == "4") {
                b = true;
                d.success();
                setTimeout(function () {
                    if (d.getState() === "success") {
                        d.reload()
                    }
                }, 3000)
            } else {
                b = false;
                var g = f.result_message;
                d.fail()
            }
        }
    });
    return b
}
function refreshImgUAM(c, e, d) {
    if ($(".login .touclick-image").attr("src").indexOf(passport_captcha) != -1) {
        TouClick.get("touclick-" + TouLocal.getRandCodeName(d)).reload();
        return
    }
    var h = "randCode";
    if (targetelement[0] !== "") {
        h += "_" + targetelement[0]
    }
    var b = $("#" + targetdiv[0]), g = b.data("code_type");
    var j = "sjrand";
    var f = "E";
    var a = passport_captcha + "?login_site=" + f + "&module=" + g + "&rand=" + j;
    TouClick.ready(function () {
        var k = TouClick.get("touclick-" + h).start({
            gp_url: a, onClick: function (m) {
                var o = $("#" + h);
                o.val(m);
                var n = $("#error_msg" + targetdiv[0]);
                var l = o[0];
                if (n.data("tag") === 1) {
                    n.hide()
                }
            }, onReload: function () {
                $("#" + h).val("");
                $("#error_msg").css("display", "none");
                var l = $.jc_getcookie("current_captcha_type")
            }, onReloading: function () {
                return true
            }
        })
    });
    TouClick.get("touclick-" + TouLocal.getRandCodeName(d)).reload();
    $(".login .touclick-image").attr("src", a)
}
function verifyRandCodeUAM(d, b) {
    if (typeof(b) !== "boolean") {
        showError(d, b);
        return false
    }
    var a = d.value;
    var c = typeof(TouLocal.getErrorMessage) === "function" ? TouLocal.getErrorMessage(d) : login_messages.pleaseClickCaptcha;
    if ("" == a || null == a) {
        showError(d, c, 1);
        return false
    }
    if (!checkRandCodeUAM(d)) {
        c = typeof(TouLocal.getErrorMessage) === "function" ? TouLocal.getErrorMessage(d, false) : login_messages.pleaseClickCaptcha;
        showError(d, c, 1);
        return false
    }
    showError(d).hide();
    return true
};
var left_ticket_messages = {
    "leftTicketDTO.from_station": "出发站",
    "leftTicketDTO.to_station": "目的站",
    "leftTicketDTO.train_no": "车次",
    "leftTicketDTO.train_date": "出发日",
    back_train_date: "返程日"
};
jQuery.validator.addMethod("checkLoginUserName", function (f, d) {
    var a = false;
    var c = /^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])|(19[0-9])|(16[0-9])\d{8}$/;
    var b = /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/;
    var e = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
    if (b.test(f) || e.test(f) || c.test(f)) {
        a = true
    }
    return this.optional(d) || a
}, "wrong username.");
jQuery.validator.addMethod("requiredUserName", function (b, a) {
    if ("用户名／邮箱／手机号" == b) {
        return false
    }
    if (b == null || "" == b) {
        return false
    }
    return true
}, "wrong username.");
jQuery.validator.addMethod("requiredSchoolName", function (b, a) {
    if ("简码／汉字" == b) {
        return false
    }
    if (b == null || "" == b) {
        return false
    }
    return true
}, "wrong schoolname.");
jQuery.validator.addMethod("randCodeRequired", function (b, a) {
    $("#i-ok").css("display", "none");
    return b.length > 0
}, "验证码错误!");
jQuery.validator.addMethod("randCodeFormat", function (c, b) {
    $("#i-ok").css("display", "none");
    var a = /^[a-zA-Z0-9]+$/;
    return this.optional(b) || a.test(c)
}, "验证码错误!");
jQuery.validator.addMethod("randCodeLength", function (b, a) {
    $("#i-ok").css("display", "none");
    return b.length == 4
}, "验证码错误!.");
jQuery.validator.addMethod("integrationCheck", function (b, a) {
    var c = /^\d{6}$/;
    return this.optional(a) || c.test(b)
}, "wrong integrationpassword");
jQuery.validator.addMethod("integrationPwdCheck", function (b, a, c) {
    if ($("#" + c[0]).val() == $("#" + c[1]).val()) {
        return true
    }
    return false
}, "两次输入密码不一致!.");
jQuery.validator.addMethod("checkRandCode", function (c, b, d) {
    var a = true;
    if (c && c.length == 4) {
        $.ajax({
            url: ctx + "passcodeNew/checkRandCodeAnsyn",
            type: "post",
            data: {randCode: c, rand: d},
            async: false,
            success: function (e) {
                if (e.data == "N") {
                    a = false;
                    $("#i-ok").css("display", "none")
                } else {
                    a = true;
                    $("#i-ok").css("display", "block")
                }
            }
        })
    } else {
        a = false;
        $("#i-ok").css("display", "none")
    }
    return a
}, "验证码错误!.");
jQuery.validator.addMethod("validateUsersName", function (b, a) {
    return this.optional(a) || /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/.test(b)
}, "用户名只能由字母、数字或_组成");
jQuery.validator.addMethod("checkWriteSpace", function (c, b) {
    for (var a = 0; a < c.length; a++) {
        if (c.charCodeAt(a) == 32) {
            return false
        }
    }
    return true
}, "contain writespace");
jQuery.validator.addMethod("validateRandCode", function (b, a) {
    return this.optional(a) || /^[a-zA-Z0-9]+$/.test(b)
}, "验证码错误!.");
jQuery.validator.addMethod("checkPassward", function (c, b, e) {
    var d = true;
    for (var a = 0; a < c.length; a++) {
        if (c.charCodeAt(a) == 39 || c.charCodeAt(a) == 60 || c.charCodeAt(a) == 62) {
            d = false
        }
        if (!d) {
            break
        }
    }
    return this.optional(b) || d
}, "Passward wrong");
function validateSecIdCard(g) {
    var f = 0;
    var a = g;
    var e = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙",
        21: "辽宁",
        22: "吉林",
        23: "黑龙",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    };
    if (!/^\d{17}(\d|x)$/i.test(a)) {
        return false
    }
    a = a.replace(/x$/i, "a");
    if (e[parseInt(a.substr(0, 2))] == null) {
        return false
    }
    var c = a.substr(6, 4) + "-" + Number(a.substr(10, 2)) + "-" + Number(a.substr(12, 2));
    var h = new Date(c.replace(/-/g, "/"));
    if (c != (h.getFullYear() + "-" + (h.getMonth() + 1) + "-" + h.getDate())) {
        return false
    }
    for (var b = 17; b >= 0; b--) {
        f += (Math.pow(2, b) % 11) * parseInt(a.charAt(17 - b), 11)
    }
    if (f % 11 != 1) {
        return false
    }
    return true
}
function validateFirIdCard(g) {
    var f = 0;
    var a;
    var e = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙",
        21: "辽宁",
        22: "吉林",
        23: "黑龙",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    };
    if (g.length == 15) {
        a = idCardUpdate(g)
    } else {
        a = g
    }
    if (!/^\d{17}(\d|x)$/i.test(a)) {
        return false
    }
    a = a.replace(/x$/i, "a");
    if (e[parseInt(a.substr(0, 2))] == null) {
        return false
    }
    var c = a.substr(6, 4) + "-" + Number(a.substr(10, 2)) + "-" + Number(a.substr(12, 2));
    var h = new Date(c.replace(/-/g, "/"));
    if (c != (h.getFullYear() + "-" + (h.getMonth() + 1) + "-" + h.getDate())) {
        return false
    }
    for (var b = 17; b >= 0; b--) {
        f += (Math.pow(2, b) % 11) * parseInt(a.charAt(17 - b), 11)
    }
    if (f % 11 != 1) {
        return false
    }
    return true
}
function idCardUpdate(g) {
    var b;
    var f = /^(\d){15}$/;
    if (f.test(g)) {
        var e = 0;
        var a = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var d = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
        g = g.substr(0, 6) + "19" + g.substr(6, g.length - 6);
        for (var c = 0; c < g.length; c++) {
            e += parseInt(g.substr(c, 1)) * a[c]
        }
        g += d[e % 11];
        b = g
    } else {
        b = "#"
    }
    return b
}
jQuery.validator.addMethod("checkBorth", function (e, c) {
    var b = e;
    if (b == "") {
        return true
    } else {
        var a = b.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (a == null) {
            return false
        }
        var f = new Date(a[1], a[3] - 1, a[4]);
        return (f.getFullYear() == a[1] && (f.getMonth() + 1) == a[3] && f.getDate() == a[4])
    }
}, "日期格式不合法");
jQuery.validator.addMethod("byteRangeLength", function (d, b, e) {
    var c = d.length;
    for (var a = 0; a < d.length; a++) {
        if (d.charCodeAt(a) > 127) {
            c++
        }
    }
    return this.optional(b) || (c >= e[0] && c <= e[1])
}, "length wrong");
jQuery.validator.addMethod("checkNameCharBlank", function (c, b, d) {
    var a = d.split("@");
    if ($("#" + a[1]).val() == "") {
        return true
    } else {
        if ($("#" + a[0]).val() == "1" || $("#" + a[0]).val() == "2") {
            return this.optional(b) || /^[a-zA-Z·.．\u3400-\u9FFF]+$/.test(c)
        } else {
            if ($("#" + a[0]).val() == "B") {
                if (/^[-]+$/.test(c)) {
                    return false
                }
                return this.optional(b) || /^[a-z A-Z·.．\u3400-\u9FFF\-]+$/.test(c)
            } else {
                if ($("#" + a[0]).val() == "H") {
                    if (/^[-]+$/.test(c)) {
                        return false
                    }
                    return this.optional(b) || /^[a-z A-Z·。.．\u3400-\u9FFF-]+$/.test(c)
                } else {
                    return this.optional(b) || /^[a-z A-Z·.．\u3400-\u9FFF]+$/.test(c)
                }
            }
        }
    }
}, "wrong name.");
jQuery.validator.addMethod("checkIdValidStr", function (c, b) {
    var a = /^[a-zA-Z0-9\_\-\(\)]+$/;
    return this.optional(b) || (a.test(c))
}, "wrong id");
jQuery.validator.addMethod("isSecIDCard", function (b, a, c) {
    if (!checkIfSecIdCard($(c).val())) {
        return true
    }
    return validateSecIdCard(b)
}, "wrong");
function checkIfSecIdCard(a) {
    if (a == "1") {
        return true
    }
    return false
}
function checkIfFirIdCard(a) {
    if (a == "2") {
        return true
    }
    return false
}
function checkCardForHKorTW(a) {
    if (a == "C" || a == "G") {
        return true
    }
    return false
}
jQuery.validator.addMethod("isFirIDCard", function (b, a, c) {
    if (!checkIfFirIdCard($(c).val())) {
        return true
    }
    return validateFirIdCard(b)
}, "wrong");
jQuery.validator.addMethod("checkHkongMacao", function (c, b, d) {
    if ($(d).val() == "C") {
        var a = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/;
        return this.optional(b) || (a.test(c))
    } else {
        return true
    }
}, "wrong format.");
jQuery.validator.addMethod("checkTaiw", function (c, a, e) {
    if ($(e).val() == "G") {
        var d = /^[0-9]{8}$/;
        var b = /^[0-9]{10}$/;
        return this.optional(a) || (d.test(c)) || (b.test(c))
    } else {
        return true
    }
}, "wrong format.");
jQuery.validator.addMethod("checkPassport", function (d, b, e) {
    if ($(e).val() == "B") {
        var c = /^[a-zA-Z]{5,17}$/;
        var a = /^[a-zA-Z0-9]{5,17}$/;
        return this.optional(b) || (a.test(d)) || c.test(d)
    } else {
        return true
    }
}, "wrong format.");
jQuery.validator.addMethod("checkWork", function (c, b, d) {
    if ($(d).val() == "H") {
        var a = /^[a-zA-Z]{3}[0-9]{12}$/;
        return this.optional(b) || (a.test(c))
    } else {
        return true
    }
}, "wrong format.");
jQuery.validator.addMethod("isMobile", function (d, b) {
    var c = d.length;
    var a = /^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])|(19[0-9])|(16[0-9])\d{8}$/;
    return this.optional(b) || (c == 11 && a.test(d))
}, "wrong mobile phone ");
jQuery.validator.addMethod("isTelePhone", function (b, a) {
    var c = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}#)/;
    return this.optional(a) || (c.test(b))
}, "wrong telePhone ");
jQuery.validator.addMethod("illegalChar", function (c, b, e) {
    var d = true;
    if (c.indexOf("$") >= 0) {
        return false
    }
    for (var a = 0; a < c.length; a++) {
        if (c.charCodeAt(a) == 39 || c.charCodeAt(a) == 60 || c.charCodeAt(a) == 62 || c.charCodeAt(a) == 34 || c.charCodeAt(a) == 63) {
            d = false
        }
        if (!d) {
            break
        }
    }
    return this.optional(b) || d
}, "Illegal char wrong");
jQuery.validator.addMethod("isZipCode", function (c, b) {
    var a = /^[0-9]{6}$/;
    return this.optional(b) || (a.test(c))
}, "wrong zipcode");
jQuery.validator.addMethod("isEmail", function (c, a) {
    var b = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return this.optional(a) || (b.test(trim(c)))
}, "wrong email");
function replaceChar(b) {
    var a = b.value.replace(/['"<> ?]/g, "");
    b.value = a
}
function checkNameChar1(a) {
    return /^[a-zA-Z0-9\u3400-\u9FFF]+$/.test(a)
}
function trim(a) {
    return a.replace(/(^\s*)|(\s*$)/g, "")
}
function ltrim(a) {
    return a.replace(/(^\s*)/g, "")
}
function rtrim(a) {
    return a.replace(/(\s*$)/g, "")
}
jQuery.validator.addMethod("validateName", function (b, a) {
    return this.optional(a) || /^[a-zA-Z\u3400-\u9FFF0-9\_]+$/.test(b)
}, "wrong username.");
jQuery.validator.addMethod("studentRequired", function (b, a, c) {
    if ($(c).val() == "3") {
        return b && trim(b) != ""
    }
    return true
}, "wrong studentRequired.");
jQuery.validator.addMethod("studentStationRequired", function (b, a, c) {
    if ($(c).val() == "3") {
        return b && trim(b) != "简拼/全拼/汉字" && trim(b) != ""
    }
    return true
}, "wrong studentStationRequired.");
jQuery.validator.addMethod("studentValidateName", function (b, a, c) {
    if ($(c).val() == "3") {
        return this.optional(a) || /^[a-zA-Z\u3400-\u9FFF0-9\_]+$/.test(b)
    }
    return true
}, "wrong username.");
jQuery.validator.addMethod("checkStudentName", function (b, a, c) {
    if ($(c).val() == "3") {
        if ((!b || trim(b) == "" || trim(b) == "简码/汉字")) {
            return false
        }
    }
    return true
}, "wrong username.");
jQuery.validator.addMethod("isQuestionNull", function (b, a, c) {
    if (jQuery.trim(b) != "") {
        if (jQuery.trim($(c[0]).val()) == "customQuestion" && jQuery.trim($(c[1]).val()) == "" || jQuery.trim($(c[0]).val()) == "") {
            return false
        }
    }
    return true
}, "you should input the question");
jQuery.validator.addMethod("isAnswerNull", function (b, a, c) {
    if ((jQuery.trim($(c[0]).val()) == "customQuestion" && jQuery.trim($(c[1]).val()) != "") || (jQuery.trim($(c[0]).val()) != "")) {
        if (jQuery.trim(b) == "") {
            return false
        }
    }
    return true
}, "you should input the answer");
function checkSex(c, b, a) {
    if (!checkSexByCardId(c, b, a)) {
        if (!confirm("性别与身份证中的性别不符，是否继续?")) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}
function checkSexByCardId(c, e, a) {
    function b(h, i) {
        var g = null;
        if (i.length == 15) {
            g = i.substring(14, 15)
        } else {
            if (i.length == 18) {
                g = i.substring(16, 17)
            } else {
                return true
            }
        }
        if (g == "x" || g == "X") {
            g = "10"
        }
        var f = parseInt(g);
        var j = f % 2;
        if (j === 0 && h === "F") {
            return true
        } else {
            if (j === 1 && h === "M") {
                return true
            } else {
                return false
            }
        }
    }

    var d = $(a).val();
    if (checkIfSecIdCard($(e).val()) && validateSecIdCard(d)) {
        if (d !== "") {
            return b(c, d)
        } else {
            return true
        }
    } else {
        if (checkIfFirIdCard($(e).val()) && validateFirIdCard(d)) {
            if (d !== "") {
                return b(c, d)
            } else {
                return true
            }
        } else {
            return true
        }
    }
}
function checkBirdDateByCardId(c, e, b) {
    var a = null;
    var d = $(b).val();
    if (checkIfSecIdCard($(e).val()) && d !== "" && validateSecIdCard(d)) {
        a = d.substring(6, 14)
    } else {
        if (checkIfFirIdCard($(e).val()) && d !== "" && validateFirIdCard(d)) {
            if (d.length == 15) {
                a = "19" + d.substring(6, 12)
            } else {
                if (d.length == 18) {
                    a = d.substring(6, 14)
                }
            }
        } else {
            return true
        }
    }
    if (c !== "") {
        c = c.replace(/-/g, "");
        if (c != a) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}
function checkBirdate(c, b, a) {
    if (!checkBirdDateByCardId(c, b, a)) {
        if (!confirm("出生日期与身份证中的出生日期不符，是否继续?")) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}
jQuery.validator.addMethod("checkPwdValidate", function (b, a) {
    return this.optional(a) || /(?![a-z]+$|[0-9]+$|_+$)^[a-zA-Z0-9_]{6,}$/.test(b)
}, "contain writespace");
jQuery.validator.addMethod("checkConfirmPassWard", function (b, a, c) {
    if ($(c).val() != null) {
        return $(c).val() == b
    }
    return true
}, "contain writespace");
jQuery.validator.addMethod("IVR_passwd_format", function (b, a) {
    var c = /^[0-9]{6}$/;
    return this.optional(a) || c.test(b)
}, "验证码错误!.");
jQuery.validator.addMethod("checkStation", function (b, a) {
    if ((!b || trim(b) == "" || trim(b) == "简拼/全拼/汉字" || trim(b) == "简拼/全拼/汉字或↑↓")) {
        return false
    }
    return true
}, "wrong username.");
jQuery.validator.addMethod("checkAnsyUserName", function (e, c, f) {
    var b = f[0];
    var d = $("#" + f[1]).val();
    var a = true;
    $.ajax({
        url: b + "?user_name=" + e, type: "get", async: false, success: function (g, h) {
            if (g.data == true) {
                a = false
            } else {
                a = true
            }
        }, error: function (g, i, h) {
            a = false
        }
    });
    return a
}, "wrong cardNo");
function checkPwdRank(e, a, d) {
    var b = $(e);
    var c = b.val();
    if (c.length <= 6 || new RegExp("^[a-zA-Z]{6,}$").test(c) || new RegExp("^[0-9]{6,}$").test(c) || new RegExp("^[_]{6,}$").test(c)) {
        $("#" + a).attr("title", "危险");
        $("#" + d).html("危险");
        $("#" + a).removeClass("rank-a");
        $("#" + a).removeClass("rank-b");
        $("#" + a).removeClass("rank-c");
        $("#" + a).addClass("rank-a")
    } else {
        if (c.length > 6 && new RegExp("[a-zA-Z]").test(c) && new RegExp("[0-9]").test(c) && new RegExp("[_]").test(c)) {
            $("#" + a).attr("title", "安全");
            $("#" + d).html("安全");
            $("#" + a).removeClass("rank-a");
            $("#" + a).removeClass("rank-b");
            $("#" + a).removeClass("rank-c");
            $("#" + a).addClass("rank-c")
        } else {
            $("#" + a).attr("title", "一般");
            $("#" + d).html("一般");
            $("#" + a).removeClass("rank-a");
            $("#" + a).removeClass("rank-b");
            $("#" + a).removeClass("rank-c");
            $("#" + a).addClass("rank-b")
        }
    }
}
Array.prototype.unique = function () {
    var b = {}, a = this.length;
    for (var c = 0; c < a; c++) {
        if (typeof b[this[c]] == "undefined") {
            b[this[c]] = 1
        }
    }
    this.length = 0;
    a = 0;
    for (var c in b) {
        this[a++] = c
    }
    return this
};
function checkSearchPwdRank(h, c, g) {
    var e = $(h);
    var f = e.val();
    if (f.length < 6) {
        $("#" + c).attr("title", "危险");
        $("#" + g).html("危险");
        $("#" + c).removeClass("rank-a");
        $("#" + c).removeClass("rank-b");
        $("#" + c).removeClass("rank-c");
        $("#" + c).addClass("rank-a")
    } else {
        var a = [];
        for (var b = 0; b < 6; b++) {
            a.push(f.charAt(b))
        }
        a = a.unique();
        var d = a.length;
        if (d == 1) {
            $("#" + c).attr("title", "危险");
            $("#" + g).html("危险");
            $("#" + c).removeClass("rank-a");
            $("#" + c).removeClass("rank-b");
            $("#" + c).removeClass("rank-c");
            $("#" + c).addClass("rank-a")
        } else {
            if (d > 1 && d < 5) {
                $("#" + c).attr("title", "一般");
                $("#" + g).html("一般");
                $("#" + c).removeClass("rank-a");
                $("#" + c).removeClass("rank-b");
                $("#" + c).removeClass("rank-c");
                $("#" + c).addClass("rank-b")
            } else {
                $("#" + c).attr("title", "安全");
                $("#" + g).html("安全");
                $("#" + c).removeClass("rank-a");
                $("#" + c).removeClass("rank-b");
                $("#" + c).removeClass("rank-c");
                $("#" + c).addClass("rank-c")
            }
        }
    }
}
jQuery.validator.addMethod("checkDetailAddress", function (b, a) {
    return this.optional(a) || /^[0-9a-zA-Z\u3400-\u9FFF\#]+$/.test(b)
}, "wrong name.");
jQuery.validator.addMethod("checkAddressName", function (b, a) {
    if (/^[-]+$/.test(b)) {
        return false
    }
    return this.optional(a) || /^[a-z A-Z·.．\u3400-\u9FFF\-]+$/.test(b) || /^[a-zA-Z·.．\u3400-\u9FFF]+$/.test(b)
}, "wrong name.");
jQuery.validator.addMethod("checkAddressSelect", function (b, a) {
    if ("" == b) {
        return false
    }
    if (b) {
        return true
    }
    return this.optional(a)
}, "wrong name.");
var login_messages = {
    randCodeError: "验证码错误!",
    randCodeExpired: "验证码失效",
    randCodeLentgh: "验证码长度为4位!",
    randCodeFormat: "验证码只能由数字或字母组成!",
    randCodeEmpty: "验证码不能为空!",
    userNameEmpty: "登录名必须填写!",
    userNameFormat: "登录名格式不正确，请重新输入!",
    passwordEmpty: "密码必须填写,且不少于6位!",
    passwordLength: "密码长度不能少于6位!",
    pleaseClickCaptcha: "请点击验证码",
    pleaseClickLeftCaptcha: "请点击左侧验证码",
    pleaseClickCaptchaRight: "请点击正确的验证码",
    pleaseClickBottomCaptcha: "请点击下方验证码",
    loginError: "当前访问用户过多,请稍候重试!",
    submitAfterVerify: "提交",
    pleaseClickSubmitButtonAfterClick: "pleaseClickSubmitButtonAfterClick",
    leftTicketOrderNoteMessage: '点击"提交"按钮获取验证码',
    leftTicketOrderClickCallbackNoteMessage: '完成选择后，继续点击下方橙色"提交"按钮提交订单',
    leftTicketOrderShowCallbackNoteMessage: "按照提示点击选择所有的图片",
    leftTicketOrderHiddenCallbackNoteMessage: '点击"提交"按钮获取验证码',
    getCaptchaByClick: "点击获取验证码"
};
function Marquee(a) {
    if (a == null || a == "") {
        return
    }
    this.ID = document.getElementById(a.ID);
    if (!this.ID) {
        this.id = -1;
        return
    }
    this.Direction = this.Width = this.Height = this.DelayTime = this.WaitTime = this.CTL = this.StartID = this.Stop = this.MouseOver = 0;
    this.Step = 1;
    this.Timer = 30;
    this.DirectionArray = {top: 0, up: 0, bottom: 1, down: 1, left: 2, right: 3};
    if (typeof a.Direction == "number" && a.Direction) {
        this.Direction = a.Direction
    }
    if (typeof a.Direction == "string" && a.Direction) {
        this.Direction = this.DirectionArray[a.Direction.toString().toLowerCase()]
    }
    if (typeof a.Step == "number" && a.Step) {
        this.Step = a.Step
    }
    if (typeof a.Width == "number" && a.Width) {
        this.Width = a.Width
    }
    if (typeof a.Height == "number" && a.Height) {
        this.Height = a.Height
    }
    if (typeof a.Timer == "number" && a.Timer) {
        this.Timer = a.Timer
    }
    if (typeof a.DelayTime == "number" && a.DelayTime) {
        this.DelayTime = a.DelayTime
    }
    if (typeof a.WaitTime == "number" && a.WaitTime) {
        this.WaitTime = a.WaitTime
    }
    if (typeof a.ScrollStep == "number" && a.ScrollStep) {
        this.ScrollStep = a.ScrollStep
    }
    this.ID.style.overflow = this.ID.style.overflowX = this.ID.style.overflowY = "hidden";
    this.ID.noWrap = true;
    this.IsNotOpera = (navigator.userAgent.toLowerCase().indexOf("opera") == -1);
    this.Start()
}
Marquee.prototype.Start = function () {
    if (this.ID == -1) {
        return
    }
    if (this.Width == 0) {
        this.Width = parseInt(this.ID.style.width)
    }
    if (this.Height == 0) {
        this.Height = parseInt(this.ID.style.height)
    }
    if (this.Timer < 20) {
        this.Timer = 20
    }
    if (this.WaitTime < 800) {
        this.WaitTime = 800
    }
    this.HalfWidth = Math.round(this.Width / 2);
    this.HalfHeight = Math.round(this.Height / 2);
    this.BakStep = this.Step;
    this.ID.style.width = this.Width + "px";
    this.ID.style.height = this.Height + "px";
    if (typeof this.ScrollStep != "number") {
        this.ScrollStep = this.Direction > 1 ? this.Width : this.Height
    }
    var d = "<table cellspacing='0' cellpadding='0' style='border-collapse:collapse;display:inline;'><tr><td noWrap=true style='white-space: nowrap;word-break:keep-all;padding-right:100px;'>MSCLASS_TEMP_HTML</td><td noWrap=true style='white-space: nowrap;word-break:keep-all;'>MSCLASS_TEMP_HTML</td></tr></table>";
    var b = "<table cellspacing='0' cellpadding='0' style='border-collapse:collapse;'><tr><td>MSCLASS_TEMP_HTML</td></tr><tr><td>MSCLASS_TEMP_HTML</td></tr></table>";
    var e = this;
    e.tempHTML = e.ID.innerHTML;
    if (e.Direction <= 1) {
        e.ID.innerHTML = b.replace(/MSCLASS_TEMP_HTML/g, e.ID.innerHTML)
    } else {
        if (e.ScrollStep == 0 && e.DelayTime == 0) {
            e.ID.innerHTML += e.ID.innerHTML
        } else {
            e.ID.innerHTML = d.replace(/MSCLASS_TEMP_HTML/g, e.ID.innerHTML)
        }
    }
    var f = this.Timer;
    var a = this.DelayTime;
    var c = this.WaitTime;
    e.StartID = function () {
        e.Scroll()
    };
    e.Continue = function () {
        if (e.MouseOver == 1) {
            setTimeout(e.Continue, a)
        } else {
            clearInterval(e.TimerID);
            e.CTL = e.Stop = 0;
            e.TimerID = setInterval(e.StartID, f)
        }
    };
    e.Pause = function () {
        e.Stop = 1;
        clearInterval(e.TimerID);
        setTimeout(e.Continue, a)
    };
    e.Begin = function () {
        e.ClientScroll = e.Direction > 1 ? e.ID.scrollWidth / 2 : e.ID.scrollHeight / 2;
        if ((e.Direction <= 1 && e.ClientScroll <= e.Height + e.Step) || (e.Direction > 1 && e.ClientScroll <= e.Width + e.Step)) {
            e.ID.innerHTML = e.tempHTML;
            delete (e.tempHTML);
            return
        }
        delete (e.tempHTML);
        e.TimerID = setInterval(e.StartID, f);
        if (e.ScrollStep < 0) {
            return
        }
        e.ID.onmousemove = function (g) {
            if (e.ScrollStep == 0 && e.Direction > 1) {
                var g = g || window.event;
                if (window.event) {
                    if (e.IsNotOpera) {
                        e.EventLeft = g.srcElement.id == e.ID.id ? g.offsetX - e.ID.scrollLeft : g.srcElement.offsetLeft - e.ID.scrollLeft + g.offsetX
                    } else {
                        e.ScrollStep = null;
                        return
                    }
                } else {
                    e.EventLeft = g.layerX - e.ID.scrollLeft
                }
                e.Direction = e.EventLeft > e.HalfWidth ? 3 : 2;
                e.AbsCenter = Math.abs(e.HalfWidth - e.EventLeft);
                e.Step = Math.round(e.AbsCenter * (e.BakStep * 2) / e.HalfWidth)
            }
        };
        e.ID.onmouseover = function () {
            if (e.ScrollStep == 0) {
                return
            }
            e.MouseOver = 1;
            clearInterval(e.TimerID)
        };
        e.ID.onmouseout = function () {
            if (e.ScrollStep == 0) {
                if (e.Step == 0) {
                    e.Step = 1
                }
                return
            }
            e.MouseOver = 0;
            if (e.Stop == 0) {
                clearInterval(e.TimerID);
                e.TimerID = setInterval(e.StartID, f)
            }
        }
    };
    setTimeout(e.Begin, c)
};
Marquee.prototype.Scroll = function () {
    switch (this.Direction) {
        case 0:
            this.CTL += this.Step;
            if (this.CTL >= this.ScrollStep && this.DelayTime > 0) {
                this.ID.scrollTop += this.ScrollStep + this.Step - this.CTL;
                this.Pause();
                return
            } else {
                if (this.ID.scrollTop >= this.ClientScroll) {
                    this.ID.scrollTop -= this.ClientScroll
                }
                this.ID.scrollTop += this.Step
            }
            break;
        case 1:
            this.CTL += this.Step;
            if (this.CTL >= this.ScrollStep && this.DelayTime > 0) {
                this.ID.scrollTop -= this.ScrollStep + this.Step - this.CTL;
                this.Pause();
                return
            } else {
                if (this.ID.scrollTop <= 0) {
                    this.ID.scrollTop += this.ClientScroll
                }
                this.ID.scrollTop -= this.Step
            }
            break;
        case 2:
            this.CTL += this.Step;
            if (this.CTL >= this.ScrollStep && this.DelayTime > 0) {
                this.ID.scrollLeft += this.ScrollStep + this.Step - this.CTL;
                this.Pause();
                return
            } else {
                if (this.ID.scrollLeft >= this.ClientScroll) {
                    this.ID.scrollLeft -= this.ClientScroll
                }
                this.ID.scrollLeft += this.Step
            }
            break;
        case 3:
            this.CTL += this.Step;
            if (this.CTL >= this.ScrollStep && this.DelayTime > 0) {
                this.ID.scrollLeft -= this.ScrollStep + this.Step - this.CTL;
                this.Pause();
                return
            } else {
                if (this.ID.scrollLeft <= 0) {
                    this.ID.scrollLeft += this.ClientScroll
                }
                this.ID.scrollLeft -= this.Step
            }
            break
    }
};