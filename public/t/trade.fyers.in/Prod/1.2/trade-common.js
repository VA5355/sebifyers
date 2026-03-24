! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.TradeCommon = t() : e.TradeCommon = t()
}(this, (() => (() => {
    var e = {
            961: (e, t, r) => {
                var a, i = function() {
                    var e = String.fromCharCode,
                        t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                        r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",
                        a = {};

                    function i(e, t) {
                        if (!a[e]) {
                            a[e] = {};
                            for (var r = 0; r < e.length; r++) a[e][e.charAt(r)] = r
                        }
                        return a[e][t]
                    }
                    var s = {
                        compressToBase64: function(e) {
                            if (null == e) return "";
                            var r = s._compress(e, 6, (function(e) {
                                return t.charAt(e)
                            }));
                            switch (r.length % 4) {
                                default:
                                    case 0:
                                    return r;
                                case 1:
                                        return r + "===";
                                case 2:
                                        return r + "==";
                                case 3:
                                        return r + "="
                            }
                        },
                        decompressFromBase64: function(e) {
                            return null == e ? "" : "" == e ? null : s._decompress(e.length, 32, (function(r) {
                                return i(t, e.charAt(r))
                            }))
                        },
                        compressToUTF16: function(t) {
                            return null == t ? "" : s._compress(t, 15, (function(t) {
                                return e(t + 32)
                            })) + " "
                        },
                        decompressFromUTF16: function(e) {
                            return null == e ? "" : "" == e ? null : s._decompress(e.length, 16384, (function(t) {
                                return e.charCodeAt(t) - 32
                            }))
                        },
                        compressToUint8Array: function(e) {
                            for (var t = s.compress(e), r = new Uint8Array(2 * t.length), a = 0, i = t.length; a < i; a++) {
                                var o = t.charCodeAt(a);
                                r[2 * a] = o >>> 8, r[2 * a + 1] = o % 256
                            }
                            return r
                        },
                        decompressFromUint8Array: function(t) {
                            if (null == t) return s.decompress(t);
                            for (var r = new Array(t.length / 2), a = 0, i = r.length; a < i; a++) r[a] = 256 * t[2 * a] + t[2 * a + 1];
                            var o = [];
                            return r.forEach((function(t) {
                                o.push(e(t))
                            })), s.decompress(o.join(""))
                        },
                        compressToEncodedURIComponent: function(e) {
                            return null == e ? "" : s._compress(e, 6, (function(e) {
                                return r.charAt(e)
                            }))
                        },
                        decompressFromEncodedURIComponent: function(e) {
                            return null == e ? "" : "" == e ? null : (e = e.replace(/ /g, "+"), s._decompress(e.length, 32, (function(t) {
                                return i(r, e.charAt(t))
                            })))
                        },
                        compress: function(t) {
                            return s._compress(t, 16, (function(t) {
                                return e(t)
                            }))
                        },
                        _compress: function(e, t, r) {
                            if (null == e) return "";
                            var a, i, s, o = {},
                                n = {},
                                d = "",
                                l = "",
                                c = "",
                                p = 2,
                                m = 3,
                                u = 2,
                                g = [],
                                h = 0,
                                y = 0;
                            for (s = 0; s < e.length; s += 1)
                                if (d = e.charAt(s), Object.prototype.hasOwnProperty.call(o, d) || (o[d] = m++, n[d] = !0), l = c + d, Object.prototype.hasOwnProperty.call(o, l)) c = l;
                                else {
                                    if (Object.prototype.hasOwnProperty.call(n, c)) {
                                        if (c.charCodeAt(0) < 256) {
                                            for (a = 0; a < u; a++) h <<= 1, y == t - 1 ? (y = 0, g.push(r(h)), h = 0) : y++;
                                            for (i = c.charCodeAt(0), a = 0; a < 8; a++) h = h << 1 | 1 & i, y == t - 1 ? (y = 0, g.push(r(h)), h = 0) : y++, i >>= 1
                                        } else {
                                            for (i = 1, a = 0; a < u; a++) h = h << 1 | i, y == t - 1 ? (y = 0, g.push(r(h)), h = 0) : y++, i = 0;
                                            for (i = c.charCodeAt(0), a = 0; a < 16; a++) h = h << 1 | 1 & i, y == t - 1 ? (y = 0, g.push(r(h)), h = 0) : y++, i >>= 1
                                        }
                                        0 == --p && (p = Math.pow(2, u), u++), delete n[c]
                                    } else
                                        for (i = o[c], a = 0; a < u; a++) h = h << 1 | 1 & i, y == t - 1 ? (y = 0, g.push(r(h)), h = 0) : y++, i >>= 1;
                                    0 == --p && (p = Math.pow(2, u), u++), o[l] = m++, c = String(d)
                                }
                            if ("" !== c) {
                                if (Object.prototype.hasOwnProperty.call(n, c)) {
                                    if (c.charCodeAt(0) < 256) {
                                        for (a = 0; a < u; a++) h <<= 1, y == t - 1 ? (y = 0, g.push(r(h)), h = 0) : y++;
                                        for (i = c.charCodeAt(0), a = 0; a < 8; a++) h = h << 1 | 1 & i, y == t - 1 ? (y = 0, g.push(r(h)), h = 0) : y++, i >>= 1
                                    } else {
                                        for (i = 1, a = 0; a < u; a++) h = h << 1 | i, y == t - 1 ? (y = 0, g.push(r(h)), h = 0) : y++, i = 0;
                                        for (i = c.charCodeAt(0), a = 0; a < 16; a++) h = h << 1 | 1 & i, y == t - 1 ? (y = 0, g.push(r(h)), h = 0) : y++, i >>= 1
                                    }
                                    0 == --p && (p = Math.pow(2, u), u++), delete n[c]
                                } else
                                    for (i = o[c], a = 0; a < u; a++) h = h << 1 | 1 & i, y == t - 1 ? (y = 0, g.push(r(h)), h = 0) : y++, i >>= 1;
                                0 == --p && (p = Math.pow(2, u), u++)
                            }
                            for (i = 2, a = 0; a < u; a++) h = h << 1 | 1 & i, y == t - 1 ? (y = 0, g.push(r(h)), h = 0) : y++, i >>= 1;
                            for (;;) {
                                if (h <<= 1, y == t - 1) {
                                    g.push(r(h));
                                    break
                                }
                                y++
                            }
                            return g.join("")
                        },
                        decompress: function(e) {
                            return null == e ? "" : "" == e ? null : s._decompress(e.length, 32768, (function(t) {
                                return e.charCodeAt(t)
                            }))
                        },
                        _decompress: function(t, r, a) {
                            var i, s, o, n, d, l, c, p = [],
                                m = 4,
                                u = 4,
                                g = 3,
                                h = "",
                                y = [],
                                S = {
                                    val: a(0),
                                    position: r,
                                    index: 1
                                };
                            for (i = 0; i < 3; i += 1) p[i] = i;
                            for (o = 0, d = Math.pow(2, 2), l = 1; l != d;) n = S.val & S.position, S.position >>= 1, 0 == S.position && (S.position = r, S.val = a(S.index++)), o |= (n > 0 ? 1 : 0) * l, l <<= 1;
                            switch (o) {
                                case 0:
                                    for (o = 0, d = Math.pow(2, 8), l = 1; l != d;) n = S.val & S.position, S.position >>= 1, 0 == S.position && (S.position = r, S.val = a(S.index++)), o |= (n > 0 ? 1 : 0) * l, l <<= 1;
                                    c = e(o);
                                    break;
                                case 1:
                                    for (o = 0, d = Math.pow(2, 16), l = 1; l != d;) n = S.val & S.position, S.position >>= 1, 0 == S.position && (S.position = r, S.val = a(S.index++)), o |= (n > 0 ? 1 : 0) * l, l <<= 1;
                                    c = e(o);
                                    break;
                                case 2:
                                    return ""
                            }
                            for (p[3] = c, s = c, y.push(c);;) {
                                if (S.index > t) return "";
                                for (o = 0, d = Math.pow(2, g), l = 1; l != d;) n = S.val & S.position, S.position >>= 1, 0 == S.position && (S.position = r, S.val = a(S.index++)), o |= (n > 0 ? 1 : 0) * l, l <<= 1;
                                switch (c = o) {
                                    case 0:
                                        for (o = 0, d = Math.pow(2, 8), l = 1; l != d;) n = S.val & S.position, S.position >>= 1, 0 == S.position && (S.position = r, S.val = a(S.index++)), o |= (n > 0 ? 1 : 0) * l, l <<= 1;
                                        p[u++] = e(o), c = u - 1, m--;
                                        break;
                                    case 1:
                                        for (o = 0, d = Math.pow(2, 16), l = 1; l != d;) n = S.val & S.position, S.position >>= 1, 0 == S.position && (S.position = r, S.val = a(S.index++)), o |= (n > 0 ? 1 : 0) * l, l <<= 1;
                                        p[u++] = e(o), c = u - 1, m--;
                                        break;
                                    case 2:
                                        return y.join("")
                                }
                                if (0 == m && (m = Math.pow(2, g), g++), p[c]) h = p[c];
                                else {
                                    if (c !== u) return null;
                                    h = s + s.charAt(0)
                                }
                                y.push(h), p[u++] = s + h.charAt(0), s = h, 0 == --m && (m = Math.pow(2, g), g++)
                            }
                        }
                    };
                    return s
                }();
                void 0 === (a = function() {
                    return i
                }.call(t, r, t, e)) || (e.exports = a)
            }
        },
        t = {};

    function r(a) {
        var i = t[a];
        if (void 0 !== i) return i.exports;
        var s = t[a] = {
            exports: {}
        };
        return e[a](s, s.exports, r), s.exports
    }
    r.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return r.d(t, {
            a: t
        }), t
    }, r.d = (e, t) => {
        for (var a in t) r.o(t, a) && !r.o(e, a) && Object.defineProperty(e, a, {
            enumerable: !0,
            get: t[a]
        })
    }, r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), r.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    };
    var a = {};
    return (() => {
        "use strict";
        r.r(a);
        const e = function() {
                function e(e) {
                    return $.cookie(e) ? $.cookie(e) : ""
                }

                function t() {
                    return localStorage.getItem("userSettingsData")
                }

                function r(e) {
                    const t = a(e.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"));
                    return JSON.parse(t)
                }

                function a(e) {
                    const t = e.padEnd(e.length + (4 - e.length % 4) % 4, "="),
                        r = window.atob(t);
                    return decodeURIComponent(Array.from(r).map((e => "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2))).join(""))
                }

                function i(e, t) {
                    const r = document.getElementById("tv_chart_container").firstElementChild;
                    if (r) {
                        const a = r.contentDocument.getElementsByClassName(e);
                        if (a) {
                            const r = a[0].parentNode;
                            r.classList.add(t);
                            const i = r.parentNode;
                            i && (i.classList.add(`topmost-${e}`), i.classList.add("custom-topbar-topmost-element"))
                        }
                    }
                }

                function s(e, t, r, a) {
                    return `\n        <div class='custom-topbar-item ${e} custom-topbar-item-large'>\n          <span class='topbar-item'>\n            <div class='topbar-img-container'>\n              ${t?`<img src='${t}'></img>`:a}\n            </div>\n            <span class='topbar-item-label'>${r}</span>\n          </span>\n        </div>`
                }

                function o(e) {
                    const t = document.getElementById("tv_chart_container").firstElementChild;
                    if (t) {
                        const r = t.contentDocument.getElementsByClassName(e);
                        if (r) {
                            const e = r[0] ? .parentNode ? .parentNode ? .parentNode;
                            if (e) {
                                const t = e.previousElementSibling;
                                t && t.className.includes("separator") && (t.style.display = "none")
                            }
                        }
                    }
                }

                function n(t, r) {
                    return e("_FYERS"), new Promise((async function(e, a) {
                        let i = {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                Authorization: auth_token,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(r)
                        };
                        try {
                            const r = await fetch(t, i);
                            r.ok && "ok" === (await r.json()).s ? e() : console.log("fail")
                        } catch (e) {
                            console.log("UserSettings Failed")
                        }
                    }))
                }

                function d() {
                    FyersWidget.messagebar.renderMessageBar({
                        type: 2,
                        title: "BOD Activity in Progress",
                        body: globalConstants.bodProcess.message
                    }, 30, !0)
                }

                function l() {
                    try {
                        const t = r(e(Be.FYERS_TOKEN_COOKIE_NAME));
                        return "Y" === t ? .isMtfEnabled
                    } catch (e) {
                        return console.error("Error checking if MTF is enabled:", e), !1
                    }
                }
                return {
                    handleClientRedirection: function() {
                        ! function(e, r) {
                            try {
                                const a = { ...JSON.parse(t()),
                                    chart_version: e
                                };
                                n(Be.USER_SETTINGS, a).then((() => {
                                    window.location.href = r
                                }))
                            } catch (e) {
                                console.log(`Legacy 1.5 redirection error : ${e}`)
                            }
                        }(0, Be.WEBLEGACY_URL)
                    },
                    openPopoutChart: function() {
                        try {
                            const e = globalConstants.constant.legacyPopoutUrl,
                                t = globalConstants.constant.onePointFivePopoutUrl;
                            tvWidget.saveChartToServer((() => {}), (() => {}), {
                                defaultChartName: "Autosaved Chart"
                            });
                            let r = tvWidget.activeChart().symbol();
                            const a = tvWidget.activeChart().resolution(),
                                i = tvWidget.getTheme();
                            r = encodeURIComponent(r);
                            let s = 1,
                                o = "";
                            0 === s ? o = e : 1 === s && (o = t), window.open(o + "?symbol=" + r + "&resolution=" + a + "&theme=" + i, "_blank")
                        } catch (e) {
                            return void(e != "Error: " + FyTrade.DEFINES.quotaExceeded.title && FyTrade.common._showNoticeToUser(FyTrade.DEFINES.chartLoadFail.title, FyTrade.DEFINES.chartLoadFail.body))
                        }
                    },
                    getParameterByName: function(e) {
                        e = e.replace(/[\[]/, "[").replace(/[\]]/, "]");
                        var t = new RegExp("[?&]" + e + "=([^&#]*)").exec(location.search);
                        return null === t ? "" : decodeURIComponent(t[1].replace(/\+/g, " "))
                    },
                    setCookie: function(e, t, r) {
                        var a, i = new Date,
                            s = r || 100;
                        i.setTime(i.getTime() + 24 * s * 60 * 60 * 1e3), a = i.toUTCString(), document.cookie = `${e}=${t};path=/;domain=${globalConstants.constant.domain}; expires=${a};`
                    },
                    getCookieData: e,
                    parseJWT: r,
                    decodeBase64Url: a,
                    customOrderDialog: function(e, t) {
                        return e.hasOwnProperty("status") ? 6 == e.status ? (localStorage.setItem("fyerstrade_nonDraggable", "true"), broker.modifyOrder(e, !1)) : void 0 : broker.placeOrder(e, !1)
                    },
                    customPositionDialog: function(e, t, r) {
                        return new Promise(((t, r) => {
                            let a = {
                                target: {
                                    id: e.id
                                }
                            };
                            broker.callPositionConversionFunc(a), t(!0)
                        }))
                    },
                    helperIncomingParamsAddWatchlist: async function(e) {
                        let t = e,
                            r = await tvWidget.watchList(),
                            a = await r.getActiveListId(),
                            i = await r.getList(a);
                        i.indexOf(t) < 0 && (i = Object.assign([], i), i.push(t), await r.updateList(a, i))
                    },
                    helperIncomingParams: function(e, t, r = void 0) {
                        {
                            let a, i = datafeed.unzippedData.data[t];
                            i && (a = {
                                duration: void 0,
                                limitPrice: 0,
                                price: 0,
                                qty: i[1],
                                side: e,
                                symbol: t,
                                type: 2,
                                productType: "MARGIN"
                            }), broker.placeOrder(a), r && "addToBasket" === r && (document.getElementById("showMoreContainer").style.display = "none", orderWindow.events.triggerShowMoreExpand(), $("#basket-order-check").prop("checked", !1), orderWindow.events.triggerBasketClick())
                        }
                    },
                    addCustomClassToTvParent: i,
                    createTopbarElement: s,
                    removeTvSeperator: o,
                    createCustomTopbarButton: function(e, t, r, a, n) {
                        let d = e.createButton();
                        d.setAttribute(t.key, t.value), d.addEventListener(r.action, r.callback), d.innerHTML = s(a.itemClassName, a.imageSrc, a.itemLabel, a.customHTML), i(a.itemClassName, "custom-topbar-item-container"), n && o(a.itemClassName)
                    },
                    createCommonTopbarButton: function(e) {
                        let t = e.createButton({
                            align: "right"
                        });
                        t.setAttribute("title", "Logout from the trading terminal"), t.addEventListener("click", (function() {
                            logoutStatus()
                        })), t.textContent = "Logout";
                        let r = e.createButton({
                            align: "right"
                        });
                        r.setAttribute("id", "productHeaderBtn"), r.setAttribute("data-mdb-toggle", "modal"), r.setAttribute("data-mdb-target", "#productMenuCenter"), r.setAttribute("data-backdrop", "View FYERS products"), r.addEventListener("click", (function() {
                            FyersWidget.globalHeader.displayGlobalHeader(), orderWindow.theme.applyTheme()
                        })), r.innerHTML = s("product-menu-item", "https://assets.fyers.in/global-components/trade-icons/topBar/menuIconLight.svg", "", ""), i("product-menu-item", "custom-topbar-item-container")
                    },
                    getProfitOrLossClass: function(e) {
                        return e > 0 ? "fy-profit" : e < 0 ? "fy-loss" : "fy-breakeven"
                    },
                    getChartVersion: function() {
                        return 1
                    },
                    mapWeekDay: function(e) {
                        let t;
                        switch (e) {
                            case "sunday":
                                t = 0;
                                break;
                            case "monday":
                            default:
                                t = 1;
                                break;
                            case "tuesday":
                                t = 2;
                                break;
                            case "wednesday":
                                t = 3;
                                break;
                            case "thursday":
                                t = 4;
                                break;
                            case "friday":
                                t = 5;
                                break;
                            case "saturday":
                                t = 6
                        }
                        return t
                    },
                    getIndianDateTime: function(e = null) {
                        let t = e ? new Date(e) : new Date;
                        return new Intl.DateTimeFormat("en-US", {
                            timeZone: "Asia/Kolkata",
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: !1
                        }).format(t)
                    },
                    createDateFromCustomFormat: function(e, t = null, r = null) {
                        const [a, i] = e.split(", "), [s, o, n] = a.split("/"), [d, l] = i.split(" "), [c, p, m] = d.split(":");
                        let u = parseInt(c, 10);
                        "PM" === l && u < 12 && (u += 12);
                        let g = new Date(n, s - 1, o, u, p, m);
                        return t && r && (g = new Date(n, s - 1, o, t, r, "00")), g
                    },
                    showBodBannerHelper: function(e, t, r, a, i) {
                        let s = !1;
                        const o = a - t;
                        !s && e && t > i && t <= r ? (s = !0, setTimeout((() => {
                            d()
                        }), r - t)) : !s && e && t > r && t < a && (d(), s = !0), s && setTimeout((() => {
                            FyersWidget.messagebar.subscribeCloseEvent(), s = !1
                        }), o)
                    },
                    getPublicHolidayForBodBanner: async function(e) {
                        try {
                            const t = localStorage.getItem("_publicHoliday");
                            if (globalConstants.masterFilesUpdateTime.holiday_json > e || !t) {
                                const e = await fetch(`${globalConstants.dynamicUrl.master_files.holiday_master}`),
                                    t = await e.json();
                                return localStorage.setItem("_publicHoliday", JSON.stringify(t)), t || []
                            }
                            return t && t.length > 0 ? JSON.parse(t) : []
                        } catch (e) {
                            console.log(`Error while getting PublicHoliday : ${e}`)
                        }
                    },
                    getEpochTimeStamp: function(e) {
                        const t = new Date(e).getTime();
                        return Math.floor(t / 1e3)
                    },
                    showBOD: d,
                    checkIfOISymbol: function(e) {
                        return !!e && e.endsWith("#OI")
                    },
                    getSymbolNameFromOiSymbol: function(e) {
                        return e ? e.replace("#OI", "") : ""
                    },
                    redirectToExternalUrl: function(e, t, r, a) {
                        let i = r || tvWidget.activeChart().symbol() || "NSE:NIFTY50-INDEX";
                        const s = encodeURIComponent(i);
                        1 === t ? e += `/${s}` : 2 === t && (e += `/?${a??"symbol"}=${s}`), window.open(e, "_blank")
                    },
                    enableMtfPopoup: function() {
                        const e = l();
                        if (TradeModules.common.logAnalyticEvents("BtClk_Navigation_MTF_MTFVw_PL_", {
                                activationStatus: e,
                                propertyName: "web"
                            }), e) window.open(Be.FYERS_APP_URL + "/profile/segments/mtf/enable", "_blank");
                        else if (!($("#mtfInfoTopbar").length > 0)) {
                            const e = '  \n      <div id="mtfInfoTopbar" style="width: 490px; position: absolute; border-radius: 12px; background: linear-gradient(98.02deg, #997a01, #665201 26.74%, #554899 85.04%); padding: 29px 18px; top:40px; left:270px; display: flex; flex-direction: row; z-index: 1">\n      <div><img src="https://assets.fyers.in/global-components/trade-icons/topBar/mtf_5x.svg" alt="" style="position: relative;"></div>\n      <div style="display: flex; flex-direction: column; width: 60%; padding-left: 29px;">\n          \x3c!-- Top Heading Container  --\x3e\n          <div>\n              <span  style="color: #ffcc02; font-size: 13px; font-weight: 400;">New</span>\n              <span  style="color: #fff; font-size: 17px; font-weight: 500;">Margin Trading Facility (MTF)</span>\n          </div>\n          <p class="mtf-topbar-mtfDescription" style="color: #EAEBED; leading-trim: both; text-edge: cap; font-feature-settings: \'clig\' off, \'liga\' off; font-family: Poppins; font-size: 12.921px; font-style: normal; font-weight: 400; line-height: normal;">Utilize the Margin Trading Facility (MTF) to invest in stocks with up to 4X leverage.</p>\n          \x3c!-- Button container  --\x3e\n          <div class="mtfInfoTopbarbtn-container" style="display: flex; gap: 12px; margin-top: 12px; padding-left: 18px;">\n              <div id="mtfTopBarEnableMtf"  style="display: inline-flex; height: 28px; padding: 10px; align-items: center; flex-shrink: 0; border-radius: 4px; background: #436af5; color: #fff; font-size: 14px; font-weight: 500; cursor: pointer;">Enable MTF</div>\n              <div id="mtfTopBarCancelMtf"  style="border-radius: 4px; border: 1px solid #fff; background: transparent; display: inline-flex; height: 25px; padding: 10px; align-items: center; gap: 8px; flex-shrink: 0; font-size: 14px; font-weight: 500; color: #fff; cursor: pointer;">Cancel</div>\n          </div>\n      </div>\n  </div>\n      ';
                            $(document.body).append(e), $("#mtfTopBarEnableMtf").click((() => {
                                window.open(Be.FYERS_APP_URL + "/profile/segments/mtf/enable", "_blank")
                            })), $("#mtfTopBarCancelMtf").click((() => {
                                $("#mtfInfoTopbar").remove()
                            }))
                        }
                    },
                    getMtfHTML: function() {
                        return '  \n      <div id="mtfInfoTopbar" style="width: 490px; position: absolute; border-radius: 12px; background: linear-gradient(98.02deg, #997a01, #665201 26.74%, #554899 85.04%); padding: 29px 18px; top:40px; left:270px; display: flex; flex-direction: row; z-index: 1">\n      <div><img src="https://assets.fyers.in/global-components/trade-icons/topBar/mtf_5x.svg" alt="" style="position: relative;"></div>\n      <div style="display: flex; flex-direction: column; width: 60%; padding-left: 29px;">\n          \x3c!-- Top Heading Container  --\x3e\n          <div>\n              <span  style="color: #ffcc02; font-size: 13px; font-weight: 400;">New</span>\n              <span  style="color: #fff; font-size: 17px; font-weight: 500;">Margin Trading Facility (MTF)</span>\n          </div>\n          <p class="mtf-topbar-mtfDescription" style="color: #EAEBED; leading-trim: both; text-edge: cap; font-feature-settings: \'clig\' off, \'liga\' off; font-family: Poppins; font-size: 12.921px; font-style: normal; font-weight: 400; line-height: normal;">Utilize the Margin Trading Facility (MTF) to invest in stocks with up to 4X leverage.</p>\n          \x3c!-- Button container  --\x3e\n          <div class="mtfInfoTopbarbtn-container" style="display: flex; gap: 12px; margin-top: 12px; padding-left: 18px;">\n              <div id="mtfTopBarEnableMtf"  style="display: inline-flex; height: 28px; padding: 10px; align-items: center; flex-shrink: 0; border-radius: 4px; background: #436af5; color: #fff; font-size: 14px; font-weight: 500; cursor: pointer;">Enable MTF</div>\n              <div id="mtfTopBarCancelMtf"  style="border-radius: 4px; border: 1px solid #fff; background: transparent; display: inline-flex; height: 25px; padding: 10px; align-items: center; gap: 8px; flex-shrink: 0; font-size: 14px; font-weight: 500; color: #fff; cursor: pointer;">Cancel</div>\n          </div>\n      </div>\n  </div>\n      '
                    },
                    getClientTokenIsMtfEnabled: l,
                    enableFiaPopoup: function() {
                        ! function() {
                            "block" === $("#overlay-ddpi").css("display") && $("#overlay-ddpi").css("display", "none");
                            const e = `${Be.FYERS_APP_URL}/`,
                                r = JSON.parse(t()).theme.toLowerCase();
                            document.querySelector("#overlay-mtf").innerHTML = `\n       <div class="container">\n        <span class="title screeners-link" style="display: flex; gap: 12px"> \n          <a id="screeners-link" class="fia-bc" style="text-decoration: none; color: #404040;font-size: 12px; font-weight: 500;" href="#"> \n            Screeners\n          </a> \n        </span>\n\n        <span class="title my-screeners-link" style="display: flex; align-items: center;"> \n          <a id="my-screeners-link" class="fia-bc" style="text-decoration: none; color: #404040;font-size: 12px; font-weight: 500;" href="#"> \n            My screeners\n          </a> \n        </span>\n\n        <span class="title fia-link" style="display: flex; align-items: center;"> \n          <a id="fia-link" class="fia-bc" style="text-decoration: none; color: #404040;font-size: 12px; font-weight: 500;" href="#"> \n            Explore\n          </a> \n        </span>\n\n        <span class="title fia-link" style="display: flex; align-items: center;"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n       \n        <span style="cursor: pointer; font-size: 18px;" class="close overlay-fia-close"><img src="https://assets.fyers.in/global-components/trade-icons/topBar/closeIcon_grey.webp" height="10" /></span>\n      </div>\n          <iframe src="${Be.FYERS_APP_URL}/fia?sidesheet=true&access_token=${token}&theme=${r||"light"}" id="fia-iframe" allow="clipboard-read; clipboard-write"></iframe>\n        \n    `, $(".container").css({
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "10px",
                                paddingBottom: "8px",
                                paddingTop: "8px",
                                fontSize: "18px",
                                backgroundColor: "dark" == r ? "#000000" : "#FFFFFF",
                                borderRadius: "0px"
                            }), $(".overlay-mtf iframe").css("height", "95%"), $(".overlay-mtf").css("width", "410px"), $(".overlay-mtf").css("overflow", "hidden"), $(".overlay-mtf").css("box-shadow", "0 4px 12px rgba(0, 0, 0, 0.2)"), $(".fia-bc").css("padding-bottom", "8px"), $(".fia-bc").css("color", "dark" == r ? "#FFFFFF" : "#404040"), $(".fia-bc").click((function() {
                                $(".fia-link").css("color", "#404040"), $(".fia-bc").css("color", "dark" == r ? "#FFFFFF" : "#404040"), $(".fia-bc").css("border-bottom", "none"), $(this).css("color", "#436AF5"), $(this).css("border-bottom", "1px solid #436AF5")
                            })), $("#fia-link").css("color", "#436AF5"), $("#fia-link").css("border-bottom", "1px solid #436AF5"), $("#my-screeners-link").click((function() {
                                $("#fia-iframe").attr("src", ""), setTimeout((function() {
                                    $("#fia-iframe").attr("src", e + "mobile_my_screeners?sidesheet=true&access_token=" + token)
                                }), 50)
                            })), $("#fia-link").click((function() {
                                $("#fia-iframe").attr("src", ""), setTimeout((function() {
                                    $("#fia-iframe").attr("src", e + "fia?sidesheet=true&access_token=" + token)
                                }), 50)
                            })), $("#screeners-link").click((function() {
                                $("#fia-iframe").attr("src", ""), setTimeout((function() {
                                    $("#fia-iframe").attr("src", e + "standalone_screener_home?sidesheet=true&access_token=" + token)
                                }), 50)
                            })), $(".overlay-fia-close").click((function() {
                                $("#overlay-mtf").css("display", "none"), $("#mtf-iframe").attr("src", ""), document.body.classList.remove("no-swipe-navigation")
                            })), $("#overlay-mtf").css("display", "block"), $("#mtf-iframe").attr("src", e + "fia_mobile?sidesheet=true&access_token=" + token), document.body.classList.add("no-swipe-navigation")
                        }()
                    },
                    isMobileResolution: function() {
                        return window.innerWidth < 600
                    },
                    postData: n,
                    getUserSettingsDataFromLocalStorage: t,
                    setUserSettingsDataToLocalStorage: function(e) {
                        localStorage.setItem("userSettingsData", e),
                            function() {
                                try {
                                    document.cookie = "userSettingsData=;path=/;domain=.fyers.in; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
                                } catch (e) {
                                    console.log("Error in clearing user settings data from cookie", e)
                                }
                            }()
                    }
                }
            }(),
            t = class {
                constructor() {}
                static async sendRequest(t, r, a = void 0, i = void 0) {
                    let s = {
                        method: r,
                        headers: {
                            Authorization: token ? ? e.getCookieData("_FYERS")
                        }
                    };
                    if (a) {
                        var o = JSON.stringify(a);
                        s.body = o
                    }
                    i && (s.body = i);
                    try {
                        let e = await fetch(t, s);
                        return await e.json()
                    } catch (e) {
                        return console.log(`Unable to make request to URL: ${t}`), {
                            s: "error",
                            message: "Failed: " + t
                        }
                    }
                }
            },
            i = "SET_SYMBOL_NAME_BAR",
            s = {
                symbolNameAndBar: {}
            },
            o = "SET_ORDERBOOK_DATA",
            n = "SET_FILTER_SELECTED_VALUE",
            d = "RESET_FILTER_SELECTED_VALUE",
            l = "SET_ORDERBOOK_DATA_WITH_KEY",
            c = "SMART_FILTER_SELECTED_STATE",
            p = {
                orderBookData: {},
                orderBookDataWithKey: {},
                selectedFilterData: {
                    exchange: [],
                    side: [],
                    productType: [],
                    smartOrderStatus: [],
                    smartOrderType: []
                },
                resetFilterData: {
                    exchange: [],
                    side: [],
                    productType: [],
                    smartOrderStatus: [],
                    smartOrderType: []
                },
                filterSelectedState: !1
            },
            m = "SET_CANCEL_ORDER_STATE",
            u = {
                cancelOrderData: {}
            },
            g = "SET_QUICKTRADE_DATA",
            h = "UPDATE_QUICKTRADE_DATA",
            y = "SET_QUICKTRADE_STATUS",
            S = "SET_BANNER_STATUS",
            v = "SET_QUICK_SYMBOL_CACHE",
            b = "RESET_QUICK_SYMBOL_CACHE",
            w = {
                quicktrade: {
                    product_type: "intraday_qr",
                    stoploss_type: "stopLossDifference",
                    target_type: "targetDifference",
                    position_sizing_type: "amountValue",
                    stoploss_qr_checkbox: !1,
                    target_qr_checkbox: !1,
                    positionSizing_qr_checkbox: !1,
                    stoplossValue_qr: 5,
                    targetValue_qr: 5,
                    positionSizingValue_qr: 5e3,
                    liveUpdates_qr_checkbox: !1
                },
                updatedQuickTradeData: {},
                quickTradeStatus: !1,
                bannerStatus: !1,
                symbolCache: []
            },
            T = "SET_ALERTS",
            f = "SET_ALERT_INSTANCE_FOR_SYMBOL",
            k = "DELETE_ALERT_INSTANCE",
            C = "UPDATE_ALERT",
            M = "DELETE_ALERT",
            _ = "PLUS_CLICKED_PRICE",
            x = {
                alertsData: {},
                alertsInstanceData: {},
                plusClickedPrice: 0
            },
            O = Redux.combineReducers({
                indicator: (e = s, t) => t.type === i ? Object.assign(e, {
                    symbolNameAndBar: t.payload
                }) : e,
                orderBook: (e = p, t) => {
                    switch (t.type) {
                        case o:
                            return Object.assign(e, {
                                orderBookData: t.payload
                            });
                        case n:
                            return Object.assign(e, {
                                selectedFilterData: t.payload
                            });
                        case d:
                            return Object.assign(e, {
                                selectedFilterData: p.resetFilterData
                            });
                        case l:
                            return Object.assign(e, {
                                orderBookDataWithKey: t.payload
                            });
                        case c:
                            return Object.assign(e, {
                                filterSelectedState: t.payload
                            });
                        default:
                            return e
                    }
                },
                cancelOrder: (e = u, t) => t.type === m ? Object.assign(e, {
                    cancelOrderData: t.payload
                }) : e,
                quickTrade: (e = w, t) => {
                    switch (t.type) {
                        case S:
                            return Object.assign(e, {
                                bannerStatus: t.payload
                            });
                        case g:
                            return Object.assign(e, {
                                quicktrade: t.payload,
                                updatedQuickTradeData: t.payload
                            });
                        case h:
                            return Object.assign(e, {
                                updatedQuickTradeData: { ...e.updatedQuickTradeData,
                                    [t.payload.key]: t.payload.value
                                }
                            });
                        case y:
                            return Object.assign(e, {
                                quickTradeStatus: t.payload
                            });
                        case v:
                            return Object.assign(e, {
                                symbolCache: [...e.symbolCache, t.payload]
                            });
                        case b:
                            return Object.assign(e, {
                                symbolCache: []
                            });
                        default:
                            return e
                    }
                },
                alertFromChart: (e = x, t) => {
                    switch (t.type) {
                        case T:
                            return { ...e,
                                alertsData: t.payload
                            };
                        case C:
                            return { ...e,
                                alertsData: { ...e.alertsData,
                                    [t.payload.key]: t.payload.value
                                }
                            };
                        case M:
                            const {
                                [t.payload]: r, ...a
                            } = e.alertsData;
                            return { ...e,
                                alertsData: { ...a
                                }
                            };
                        case f:
                            return { ...e,
                                alertsInstanceData: { ...e.alertsInstanceData,
                                    [t.payload.key]: { ...e.alertsInstanceData[t.payload.key],
                                        [t.payload.chartId]: t.payload.value
                                    }
                                }
                            };
                        case k:
                            const {
                                [t.payload]: i, ...s
                            } = e.alertsInstanceData;
                            return { ...e,
                                alertsInstanceData: { ...s
                                }
                            };
                        case _:
                            return { ...e,
                                plusClickedPrice: t.payload
                            };
                        default:
                            return e
                    }
                }
            }),
            P = Redux.createStore(O, Redux.applyMiddleware((({
                dispatch: e
            }) => t => r => "function" == typeof r ? r(e) : t(r)))),
            E = class {
                static setQuickTradeBannerStatus = e => ({
                    type: S,
                    payload: e
                });
                static setQuickTradeApiData = e => ({
                    type: g,
                    payload: e
                });
                static updateQuickTradeData = (e, t) => ({
                    type: h,
                    payload: {
                        key: e,
                        value: t
                    }
                });
                static setQuickTradeStatus = e => ({
                    type: y,
                    payload: e
                });
                static setQuickSymbolCache = e => ({
                    type: v,
                    payload: e
                });
                static resetQuickSymbolCache = () => ({
                    type: b
                })
            };
        class A {
            static smartMenuItems = [{
                title: "Smart Limit Order",
                description: "Instruction to buy or sell an asset at a specified price or better.",
                iconPathLightTheme: "https://assets.fyers.in/orderWindow/smartOrders/OrdersMenu/limitNew.svg",
                iconPathDarkTheme: "https://assets.fyers.in/orderWindow/smartOrders/OrdersMenu/limitNew_dark.svg",
                id: "smartLimitOrder",
                dropdownOrderContainerId: "so_dropdown_limit",
                dropdownOrderImgClass: "so_dropdown_limit_img"
            }, {
                title: "Smart Pegged Order",
                description: "Limit orders are placed and dynamically modified at specified intervals based on the required parameters.",
                iconPathLightTheme: "https://assets.fyers.in/orderWindow/smartOrders/OrdersMenu/pegged.svg",
                iconPathDarkTheme: "https://assets.fyers.in/orderWindow/smartOrders/OrdersMenu/pegged_dark.svg",
                id: "smartPeggedOrder",
                dropdownOrderContainerId: "so_dropdown_pegged",
                dropdownOrderImgClass: "so_dropdown_pegged_img"
            }, {
                title: "Smart Step Order",
                description: "The average amount of an order placed over a certain period.",
                iconPathLightTheme: "https://assets.fyers.in/orderWindow/smartOrders/OrdersMenu/step.svg?v=1.0",
                iconPathDarkTheme: "https://assets.fyers.in/orderWindow/smartOrders/OrdersMenu/step_dark?v=1.0.svg",
                id: "smartStepOrder",
                dropdownOrderContainerId: "so_dropdown_step",
                dropdownOrderImgClass: "so_dropdown_step_img"
            }, {
                title: "Smart Trail Order",
                description: "Order type where the stoploss would be continuously adjusted based on the price movement.",
                iconPathLightTheme: "https://assets.fyers.in/orderWindow/smartOrders/OrdersMenu/trail.svg?v=1.3",
                iconPathDarkTheme: "https://assets.fyers.in/orderWindow/smartOrders/OrdersMenu/trail_dark?v=1.0.svg",
                id: "smartTrailOrder",
                dropdownOrderContainerId: "so_dropdown_trail",
                dropdownOrderImgClass: "so_dropdown_trail_img"
            }, {
                title: "Smart Equity SIP",
                description: "A strategy to invest a fixed amount or quantity regularly.",
                iconPathLightTheme: "https://assets.fyers.in/orderWindow/smartOrders/OrdersMenu/sip.svg",
                iconPathDarkTheme: "https://assets.fyers.in/orderWindow/smartOrders/OrdersMenu/sip_dark.svg",
                id: "smartSipOrder",
                dropdownOrderContainerId: "so_dropdown_sip",
                dropdownOrderImgClass: "so_dropdown_sip_img"
            }];
            static rightArrowIcon = "https://assets.fyers.in/orderWindow/smartOrders/OrdersMenu/rightArrow.svg";
            static rightArrowIconDark = "https://assets.fyers.in/orderWindow/smartOrders/OrdersMenu/rightArrow.svg";
            static alertBarMessages = {
                ALERT_MESSAGES: {
                    price: function(e) {
                        return `Your limit price is out of preferred range which is ${e}% away from LTP. `
                    },
                    maxloss: function(e) {
                        return `You have exceeded your preferred max loss value which is ${e}. `
                    },
                    marginRequired: function(e) {
                        return `You are exceeding your set margin value of ${e}. `
                    },
                    stopLoss: function(e) {
                        return `Your stop-loss is exceeding your set maximum loss of ${e}%. `
                    },
                    nseLimit: function(e) {
                        return `Your limit price is out of prescribed limits (${e}% away from LTP). `
                    },
                    t2tSegment: function() {
                        return "To proceed, kindly confirm as this stock is in T2T segment and cannot be squared-off until settlement (T+1 Days)."
                    },
                    asmGsmAlert: function(e) {
                        return `Security is under ${e}, would you like to continue?`
                    },
                    physicalSettlementAlert: function() {
                        return 'Contract is under physical settlement, please check <a target="_blank" id="phySettlementAlert" href="https://community.fyers.in/blogs-gdppin8d/post/fyers-policies-on-physical-settlement-of-stock-derivatives-AWonjknqTUWOEjk"> FYERS Physical settlement policy.</a> '
                    },
                    marketPriceRisk: function() {
                        return "A market order carries the risk of adverse execution"
                    }
                },
                ERROR_MESSAGES: {
                    minQtyError: "Not sufficient minimum quantity.",
                    maxQtyError: "The maximum allowed quantity per order is capped at 9,99,999. Kindly modify your order to proceed.",
                    qtyMultiples: "Quantity should be multiples of Lot Size",
                    initialQtyMultiples: "Initial Quantity should be multiples of Lot Size",
                    avgQtyMultiples: "Average Quantity should be multiples of Lot Size",
                    limitgreaterLTP: "Limit price should be greater than LTP.",
                    limitlowerLTP: "Limit price should be lower than LTP.",
                    stopgreaterLTP: "Trigger price should be greater than LTP.",
                    stoplowerLTP: "Trigger price should be lesser than LTP.",
                    stoplesslimit: "Trigger price should be less than limit price.",
                    stopgreaterlimit: "Trigger price should be greater than limit price.",
                    stopmultiples: "Trigger price should be multiples of ",
                    highGreaterThanLow: "The higher price should be greater than the lower price in the price range.",
                    maxQtyLimit: "Max qty reached 999999",
                    validTimeInterval: "Please enter valid time interval",
                    adjustmentMultiples: "The specified price adjustment does not align with the required tick size increments.",
                    highMultiples: "High Price must be multiples of the tick size.",
                    lowMultiples: "Low Price must be multiples of the tick size.",
                    targetGreaterLTP: "Target price should be greater than LTP.",
                    targetLowerLTP: "Trigger price should be lesser than LTP.",
                    maxPriceGreaterLimit: "Max price cannot be less than or equal to limit price. ",
                    minPriceLowerLimit: "Min price cannot be greater than or equal to limit price.",
                    startTimeLessEndTime: "Start time should be less than end time",
                    initialQtyLessThanTotalQty: "Total Quantity should be greater than the sum of Initial Qty and Average Qty",
                    stepAverageQtyLessThan: "Total Quantity should be greater than the sum of Initial Qty and Average Qty",
                    sipLessLtp: "The SIP amount cannot be less than the LTP.",
                    sipLess500: "The SIP amount cannot be less than the 500.",
                    frequencyWeekend: "The SIP date shouldn't be on the weekend.",
                    expiryWeekend: "The expiry date shouldn't be on the weekend.",
                    sipLessMinvalue: function(e) {
                        return `The SIP amount cannot be less than ${e}.`
                    },
                    sipMultipleTick: "Amount should be multiple of 500",
                    sipStepUpVal: "Step up Value should be greater than 0",
                    sipExpiryQty: function(e) {
                        return `Expiry quantity should be greater than ${e}`
                    },
                    sipExpiryAmount: function(e) {
                        return `Expiry amount should be greater than ${e}`
                    },
                    freezeQtyReached: function(e) {
                        return `Maximum Qty ${e} reached , Please modify the QTY`
                    },
                    mppRangeBreached: function(e, t) {
                        return `MPP% should lie between ${e} to ${t} % .`
                    },
                    triggerMultiples: function(e) {
                        return `Trigger price should be multiples of ${e}`
                    },
                    limitmultiples: function(e) {
                        return `Limit price should be multiples of ${e}`
                    },
                    stepAverageEntryMultiples: function(e) {
                        return `Average Entry Price should be multiples of ${e}`
                    },
                    stepAverageEntryMinimum: function(e) {
                        return `Average Entry Price shouldn't be less than  ${(20*e).toFixed(2)}`
                    },
                    maxPriceMultiples: function(e) {
                        return `Max price should be multiples of ${e}`
                    },
                    minPriceMultiples: function(e) {
                        return `Min price should be multiples of ${e}`
                    },
                    jumpMultiples: function(e) {
                        return `Jump price should be multiples of ${e}`
                    },
                    targetPriceMultiples: function(e) {
                        return `Target price should be multiples of ${e}`
                    },
                    minJumpPrice: function(e) {
                        return `Jump Price should be more than or equal to  ${e}`
                    },
                    maxJumpPrice: function(e) {
                        return `Jump Price should be less than or equal to  ${e}`
                    }
                }
            };
            static smartMenuIdMatching = {
                sm_limit: "smartLimitOrder",
                sm_iceberg: "smartIcebergOrder",
                sm_slice: "smartSliceOrder",
                smart_step: "smartStepOrder",
                smart_trail: "smartTrailOrder",
                smart_pegged: "smartPeggedOrder",
                smart_sip: "smartSipOrder"
            };
            static disableItems = [this.smartMenuIdMatching.sm_iceberg, this.smartMenuIdMatching.sm_slice, this.smartMenuIdMatching.smart_step];
            static classNames = {
                displayBlock: "d-block",
                displayNone: "d-none"
            };
            static stepPayloadAndOredrBookKeymapper = {
                symbol: "symbol",
                side: "side",
                qty: "totqty",
                limitPrice: "price",
                productType: "product",
                orderType: "ordtype",
                startTime: "start",
                endTime: "end",
                hpr: "hpr",
                lpr: "lpr",
                mpp: "mpp",
                initQty: "initQty",
                direction: "direction",
                avgqty: "avgqty",
                avgdiff: "avgdiff"
            };
            static placeOrder = {
                title: {
                    success: "Order placement success",
                    error: "Order placement failed",
                    delete_success: "Smart Order Cancelled Successfully",
                    resume_success: "Smart Order Resumed Successfully",
                    pause_success: "Smart Order Paused Successfully",
                    clone_success: "Smart Order Cloned Successfully",
                    modify_success: "Smart Order Modified Successfully"
                },
                desc: {
                    success: "Request sent successfully",
                    error: "Check orderbook for more details",
                    delete_success: "Check orderbook for more details",
                    resume_success: "Request sent successfully"
                }
            };
            static apiCodes = {
                success: 200,
                fail: [-16, -50, -403, 500]
            };
            static statusMapper = {
                1: "ACKNOWLEDGED",
                3: "YET TO START",
                4: "MODIFIED",
                5: "MODIFIED",
                6: "YET TO START",
                7: "PAUSED",
                8: "FAILED",
                9: "FAILED",
                10: "FAILED",
                11: "FAILED",
                12: "FAILED",
                13: "CANCELLED",
                14: "COMPLETED",
                15: "RUNNING",
                18: "RUNNING"
            };
            static statusMapperByText = {
                ACKNOWLEDGED: [1],
                "YET TO START": [3, 6],
                MODIFIED: [4, 5],
                PAUSED: [7],
                FAILED: [8, 9, 10, 11, 12],
                CANCELLED: [13],
                COMPLETED: [14],
                RUNNING: [15, 18]
            };
            static soTypeMapper = {
                3: "STEP",
                4: "LIMIT",
                5: "PEG",
                6: "TRAIL",
                7: "SIP"
            };
            static flowTypeMapperByText = {
                STEP: 3,
                LIMIT: 4,
                PEG: 5,
                TRAIL: 6,
                SIP: 7
            };
            static valueToTextToShowInFilterModalMapper = {
                exchange: "Exchanges",
                side: "Side",
                productType: "Product Type",
                smartOrderStatus: "Smart Order Status",
                smartOrderType: "Smart Order Type"
            };
            static productType = {
                CNC: "CNC",
                INTRADAY: "INTRADAY",
                MARGIN: "MARGIN"
            };
            static tooltip = {
                smartOrderBook: {
                    modify: "It will allow you to change applicable aspects of the smart order.",
                    cancel: "It will permanently stop the smart order from creating new orders. Note: This won't change the open orders.",
                    pause: "It will temporarily pause the smart order from creating any new orders.",
                    resume: "It will resume the paused order and continue pending execution.",
                    clone: "It will create a duplicate smart order with the same parameters, allowing you to quickly place a similar order. "
                },
                common: [{
                    id: "tradeInfo",
                    text: "Trade with lower margin, position has to be exited before market closes.",
                    link: "https://support.fyers.in/portal/en/kb/articles/what-is-the-difference-between-trade-and-invest-in-the-order-panel-22-3-2022"
                }, {
                    id: "investInfo",
                    text: "Carry forward positions.",
                    link: "https://support.fyers.in/portal/en/kb/articles/what-is-the-difference-between-trade-and-invest-in-the-order-panel-22-3-2022"
                }, {
                    id: "mtfInfo",
                    text: "Buy now, pay later with up to 4x leverage. ",
                    link: globalConstants.dynamicUrl.tooltip_links.mtf_ow
                }],
                smartLimitOrder: [{
                    id: "smartLimitEndTimeInfoIcon",
                    text: "The specific time when your smart orders should stop.",
                    link: ""
                }, {
                    id: "actionAtEndTimeInfo",
                    text: "Decide how to handle any unfulfilled portion of your smart limit order if it isn't completely executed by the specified end time.",
                    link: ""
                }, {
                    id: "mppIconId",
                    text: "This ensures that your market orders are executed within a specified percentage range of the current market price. It serves as a protective measure to prevent order execution at unfavourable market prices.",
                    link: ""
                }],
                smartSipOrder: [{
                    id: "sipExecuteImmediatelyInfoIcon",
                    text: "The first SIP will be triggered instantly without waiting for the next planned date/time. This feature is available only during market hours, and the price range will not apply to the first execution.",
                    link: ""
                }, {
                    id: "smartStepAvgQtyInfoIcon",
                    text: "Sets the frequency of SIP, which can be daily, weekly or monthly.",
                    link: ""
                }, {
                    id: "smartStepAvgQtyInfoIcon2",
                    text: "Sets the frequency of SIP, which can be daily, weekly or monthly.",
                    link: ""
                }, {
                    id: "stepUpQFrequencyInfoIcon",
                    text: "Sets the period where the step-up happens.",
                    link: ""
                }, {
                    id: "stepUpQuantityInfoIcon",
                    text: "Sets the quantity/amount to be increased for every step up.",
                    link: ""
                }, {
                    id: "sipExpiryDateIcon",
                    text: "Sets the date/qty/amount by which SIP will be stopped.",
                    link: ""
                }],
                smartPeggedOrder: [{
                    id: "smartLimitTimeIntervalIcon",
                    text: "This is the period after which prices of pending orders will be modified based on peg conditions.",
                    link: ""
                }, {
                    id: "smartLimitEndTimeInfoIcon",
                    text: "The specific time when your smart orders should stop.",
                    link: ""
                }, {
                    id: "peggedToIcon",
                    text: "It is the basis on which the pegged price will be calculated.",
                    link: ""
                }, {
                    id: "adjustmentInfoIcon",
                    text: "It is the user-defined fixed deviation required from the pegged condition.",
                    link: ""
                }, {
                    id: "adjustmentDirection",
                    text: "It is the direction in which the adjustment value will be applied to the pegged price.",
                    link: ""
                }, {
                    id: "actionAtEndTimeInfo",
                    text: "Decide how to handle any unfulfilled portion of your smart limit order if it isn't completely executed by the specified end time.",
                    link: ""
                }, {
                    id: "priceRangeHighInfoIcon",
                    text: "The upper limit of the price range, above which orders won't be placed.",
                    link: ""
                }, {
                    id: "priceRangeLowInfoIcon",
                    text: "The lower limit of the price range, above which orders won't be placed.",
                    link: ""
                }, {
                    id: "mppIconId",
                    text: "This ensures that your market orders are executed within a specified percentage range of the current market price. It serves as a protective measure to prevent order execution at unfavourable market prices.",
                    link: ""
                }],
                smartTrailOrder: [{
                    id: "trailMarketPriceInfoIcon",
                    text: "Creates an MPP order whenever the stoploss price is triggered.",
                    link: ""
                }, {
                    id: "mppIconId",
                    text: "This ensures that your market orders are executed within a specified percentage range of the current market price. It serves as a protective measure to prevent order execution at unfavourable market prices.",
                    link: ""
                }, {
                    id: "smartTrailTragetPriceBoxIconId",
                    text: "Allows you to create a target price, which executes in MPP whenever the target price is triggered.",
                    link: ""
                }],
                smartStepOrder: [{
                    id: "smartStepAvgQtyInfoIcon",
                    text: "The qty to be bought/sold whenever the selected symbol price moves by the required avg entry difference price.",
                    link: ""
                }, {
                    id: "smartStepAvgEntryDiffQtyInfoIcon",
                    text: "The distance required to buy/sell required avg qty.",
                    link: ""
                }, {
                    id: "stepDirectionInfo",
                    text: "Direction: Applicable direction of the avg entry diff.",
                    link: ""
                }, {
                    id: "stepAveragingInfo",
                    text: "Averaging starts from: The required price from which the averaging starts from.",
                    link: ""
                }, {
                    id: "mppIconId",
                    text: "This ensures that your market orders are executed within a specified percentage range of the current market price. It serves as a protective measure to prevent order execution at unfavourable market prices.",
                    link: ""
                }]
            };
            static emptyObject = {
                emptySmart: {
                    content: "No Smart Orders Yet!",
                    subContent: "There are currently no orders in the Smart Order Book. Your smart order history will appear here.",
                    emptyIcon: "https://assets.fyers.in/orderWindow/smartOrders/orderHistory/noSmartItems.svg",
                    emptyDescription: "No Smart Orders Yet!",
                    emptyImageWrapper: "emptySmartImage"
                },
                emptyFilter: {
                    content: "No Match Found!",
                    subContent: "No matching results were found for the filters you selected. Please adjust the filters and try again.",
                    emptyIcon: "https://assets.fyers.in/orderWindow/smartOrders/orderHistory/emptyFilter.svg",
                    emptyDescription: "No Match Found",
                    emptyImageWrapper: "emptySmartFilterImage"
                }
            };
            static EMPTY_FILTER = "emptyFilter";
            static EMPTY_SMART = "emptySmart";
            static EXCLUDE_SMART_FILTER_MESSAGES = [105, 107, 108, 113]
        }
        const I = A,
            F = class {
                getDynamicTextBox(e, t, r, a, i, s, o, n, d, l, c) {
                    return `<div class="position-relative">\n        <label class="position-absolute dynamicTextBoxLabel" id=${t} for=${e}>${r} <span id=${a} style="color:#6A7582;">${i}</span></label>\n        <input type=${c} step=${s} id=${e} class="p-2 pb-1 dynamicTextBox" name=${l} placeholder=${d} style="height: ${o}px;width:${n}px">\n    </div>`
                }
                static getSmartOrdersMenuFrame() {
                    return `\n     <div class="so_menuParentContainer">\n     ${this.getSmartOrdersMenuItemFrame(I.smartMenuItems)}\n     </div>\n     `
                }
                static getSmartOrdersMenuItemFrame(e) {
                    return e.map((e => {
                        const t = R.getSmartOderTypesToMapWithConfig(e ? .id);
                        return `\n      <div class="so_itemContainer ${globalConstants.config.enabled_features.smart_order_types_v2[t]?"":"d-none"}" id=${e.id}>\n      <div class="${e.id}_menu_img">\n        </div>\n          <div class="so_itemsParagraph">\n            <span>${e?.title}</span>\n            <span>${e?.description}</span>\n          </div>\n        <img src=${I?.rightArrowIcon} alt="Second Image" height="20" width="20">\n      </div>`
                    })).join("")
                }
                static getDropDownFrame() {
                    return `\n     <div class="so_dropdown_container">\n    ${this.getDropDownItemFrame(I.smartMenuItems)}\n     </div>\n       `
                }
                static getDropDownItemFrame(e) {
                    return e.map((e => {
                        const t = R.getSmartOderTypesToMapWithConfig(e ? .id),
                            r = !globalConstants.config.enabled_features ? .smart_order_types_v2[t] || "smartSipOrder" === e ? .id && re.hideSmartSipFromSmartMenu(!0);
                        return `\n      <div id="${e?.dropdownOrderContainerId}" class="so_dropdown_row ${r?"d-none":""}">\n      <div class="so_dropdown_img ${e?.dropdownOrderImgClass}"></div>\n      <span>${e?.title}</span>\n      </div>\n      `
                    })).join("")
                }
                static getSmartOrderBookStatusAndHoverContainer(e) {
                    let t = I.tooltip.smartOrderBook;
                    const {
                        statusText: r,
                        statusIconUrl: a,
                        statusClass: i
                    } = R.getSmartOrderBookStatusMapper(e);
                    return ` <div class="so-item-execution-status-text d-flex ${i}">\n  <span id="soOrderStatusIcon" class="so-table-detail-status-icon">\n      <img class='mr-1 so_statusIcon' src=${a} alt='Order success' />\n      <span id="so_history_statusText">${r}</span>\n  </span>\n\n  <div class="so_orderHistory_hover_parent-container">\n        <div title="${t.clone}" class="so_orderHistory_hover_child so_orderHistory_hover_details d-none"></div>\n        <div title="${t.pause}" class="so_orderHistory_hover_child so_orderHistory_hover_paused d-none"></div>\n        <div title="${t.resume}" class="so_orderHistory_hover_child so_orderHistory_hover_resume d-none"></div>\n        <div title="${t.modify}" class="so_orderHistory_hover_child so_orderHistory_hover_modify d-none"></div>\n        <div title="${t.cancel}" class="so_orderHistory_hover_child so_orderHistory_hover_cancel d-none"></div>\n    </div>\n</div>`
                }
                static getSmartOrderHistorOrderTypeConatiner(e, t, r) {
                    return `\n    <div class="so_history_orderType_conatiner">\n        <div class="so_history_orderType_textStyle so_history_orderType_smartOrder">${e}</div>\n        <div class="so_history_orderType_textStyle ${"BUY"===t?"so_history_orderType_buy":"so_history_orderType_sell"}">${t}</div>\n        <div class="so_history_orderType_textStyle so_history_orderType_validity">${r}</div>\n    </div>`
                }
                static getSmartOredrHistoryLtpContainer(e, t = !1, r = void 0) {
                    let a = "https://assets.fyers.in/orderWindow/smartOrders/ltpUp.svg",
                        i = "so_ltpTextColorGreen",
                        s = "so_ltpGreenIcon";
                    t < 0 && (a = "https://assets.fyers.in/orderWindow/smartOrders/ltpDown.svg", i = "so_ltpTextColorRed", s = "so_ltpRedIcon"), 0 == t && (a = "", i = "so_ltpTextColorGrey", s = "");
                    let o = 12 === r ? 4 : 2;
                    return `\n    <div class="d-flex so_history_ltp_container">\n    <div class="so_ltpText ${i}">\n        ${e.toFixed(o)}\n    </div>\n    <div class="so_ltpIconImg ${s}">\n       \n    </div>\n    \n</div>\n    `
                }
                static getSmartOrderHistorySymbolContainer(e, t, r) {
                    return ` <div class="so_history_symbolConatiner">\n    <div class="so_history_symbol_col-1">\n        <div class="so_history_symbol">${e}</div>\n        <span class="so_history_exchange">${r}</span>\n    </div>\n    <span class="so_history_symbolDescription">${t}</span>\n</div>`
                }
            };
        class B {
            static getElementWithId(e) {
                return $(e)
            }
            static getInputBoxValue(e) {
                return $(e).val()
            }
            static addClass(e, t) {
                this.getElementWithId(e).addClass(t)
            }
            static removeClass(e, t) {
                this.getElementWithId(e).removeClass(t)
            }
            static addAndRemoveClass(e, t, r) {
                let a = this.getElementWithId(e);
                a.addClass(e, t), a.removeClass(e, r)
            }
            static toggleClass(e, t, r) {
                const a = $(`#${e}`);
                a.hasClass(t) ? a.addClass(r).removeClass(t) : a.removeClass(r).addClass(t)
            }
            static getRadioButtonCheckedOrNot(e) {
                return $(`#${e}`).prop("checked")
            }
            static getRadioButtonChecked(e) {
                return $(`#${e}`).prop("checked", !0)
            }
            static getRadioButtonUnChecked(e) {
                return $(`#${e}`).prop("checked", !1)
            }
            static updateInnerHtml(e, t) {
                this.getElementWithId(e).html(t)
            }
            static removeSmartBanner() {
                $("#smartOrdersParentContainer").empty(), $("#trade-buttons-container").addClass("d-none")
            }
            static hideoldOrderWindowBody() {
                $("#scheduleField").addClass("d-none"), $("#setting-icon-container").addClass("d-none"), $("#orderTypeRow").addClass("d-none"), $("#inputFieldsSectionOw").addClass("d-none"), $("#nonBSESection").addClass("d-none"), $("#smartOrdersParentContainer").removeClass("d-none").addClass("so_parentContainer"), $(".orderWindowModalAlerts").addClass("d-none").removeClass("d-block"), $("#os_info").addClass("d-none"), this.hideOwBootomFooter(), this.hideShowMoreContents(), this.hideMtfBanner()
            }
            static hideShowMoreContents() {
                $("#showMoreContainer").addClass("d-none")
            }
            static enableOwBottomFooter() {
                $(".orderwindow-footer").removeClass("d-none").addClass("d-block")
            }
            static hideOwBootomFooter() {
                $(".orderwindow-footer").addClass("d-none").removeClass("d-block")
            }
            static getLotSize(e = null) {
                return ie.getSymbolMasterValue(e ? ? orderWindow.orderData.selectedSymbol, "min_lot_size")
            }
            static getSessionEndTime() {
                const e = ie.getSymbolMasterValue(orderWindow.orderData.selectedSymbol, "trading_session"),
                    t = e.split("|")[0].substring(e.split("|")[0].indexOf("-") + 1);
                let r = parseInt(t.slice(0, 2)),
                    a = parseInt(t.slice(2));
                return 0 === a ? (r = 0 === r ? 23 : r - 1, a = 59) : a -= 1, `${r.toString().padStart(2,"0")}:${a.toString().padStart(2,"0")}`
            }
            static getSessionEndTimeInMinutes() {
                const e = this.getSessionEndTime().split(":");
                return 60 * parseInt(e[0]) + parseInt(e[1])
            }
            static prefillStartStepTime() {
                const e = new Date,
                    t = parseInt(e.getHours()),
                    r = parseInt(e.getMinutes());
                $("#smartStepStartTime").val(`${t.toString().padStart(2,"0")}:${r.toString().padStart(2,"0")}`)
            }
            static getSessionStartTime() {
                let e = ie.getSymbolMasterValue(orderWindow.orderData.selectedSymbol, "trading_session");
                return e.split("|")[0].split("-")[0].slice(0, 2) + ":" + e.split("|")[0].split("-")[0].slice(2)
            }
            static getSessionStartTimeInMinutes() {
                let e = this.getSessionStartTime().split(":");
                return 60 * parseInt(e[0]) + parseInt(e[1])
            }
            static getPriceTickSize(e = null) {
                try {
                    return datafeed.unzippedData.data[e ? ? orderWindow.orderData.selectedSymbol][12]
                } catch (e) {
                    return ""
                }
            }
            static getUpperCircuit() {
                try {
                    let e = datafeed.unzippedData.data[orderWindow.orderData.selectedSymbol][29];
                    return e = B.getPriceFormattedWithDecimalPlaces(B.getPriceWithNearestTickSize(e)), e
                } catch (e) {
                    return ""
                }
            }
            static getLowerCircuit() {
                try {
                    let e = datafeed.unzippedData.data[orderWindow.orderData.selectedSymbol][28];
                    return e = B.getPriceFormattedWithDecimalPlaces(B.getPriceWithNearestTickSize(e)), e
                } catch (e) {
                    return ""
                }
            }
            static floatSafeRemainder(e, t) {
                var r = (e.toString().split(".")[1] || "").length,
                    a = (t.toString().split(".")[1] || "").length,
                    i = r > a ? r : a;
                return parseInt(parseFloat(e).toFixed(i).replace(".", "")) % parseInt(parseFloat(t).toFixed(i).replace(".", "")) / Math.pow(10, i)
            }
            static getSmartOrderType(e) {
                try {
                    switch (e) {
                        case 3:
                            return "Step";
                        case 4:
                            return "Limit";
                        case 5:
                            return "Pegged";
                        case 6:
                            return "Trail";
                        case 7:
                            return "EQ SIP";
                        default:
                            return ""
                    }
                } catch (e) {
                    return console.log(e), ""
                }
            }
            static getSmartOderTypesToMapWithConfig(e) {
                switch (e) {
                    case "smartLimitOrder":
                        return 0;
                    case "smartPeggedOrder":
                        return 1;
                    case "smartTrailOrder":
                        return 2;
                    case "smartStepOrder":
                        return 3;
                    case "smartSipOrder":
                        return 4
                }
            }
            static getPriceWithNearestTickSize(e, t, r = null) {
                try {
                    return t || (t = B.getPriceTickSize(r)), Math.floor(e / t) * t
                } catch (e) {
                    return console.log(e), ""
                }
            }
            static getPrefillStopLossTriggerPriceForTrail() {
                try {
                    let e, t = ie.getLtpPrice();
                    const r = B.getPriceTickSize(),
                        a = ie.getBuySellSide(),
                        i = .05 * t,
                        s = 1 === a ? B.getUpperCircuit() : B.getLowerCircuit();
                    return 1 === a ? (e = Math.min(t + i, s), !s && (e = t + i), !t && (e = s)) : -1 === a && (e = Math.max(t - i, s), !s && (e = t - i), !t && (e = s)), e = this.getPriceWithNearestTickSize(e, r), B.getPriceFormattedWithDecimalPlaces(e)
                } catch (e) {
                    return console.log(e), ""
                }
            }
            static getPrefillTargetPriceForTrail() {
                try {
                    let e = ie.getLtpPrice();
                    const t = B.getPriceTickSize(),
                        r = ie.getBuySellSide(),
                        a = .05 * e,
                        i = 1 === r ? B.getLowerCircuit() : B.getUpperCircuit();
                    return 1 === r ? e = Math.max(e - a, i) : -1 === r && (e = Math.min(e + a, i)), e = this.getPriceWithNearestTickSize(e, t), B.getPriceFormattedWithDecimalPlaces(e)
                } catch (e) {
                    return console.log(e), ""
                }
            }
            static getPrefillMaxMinPriceForLimit() {
                try {
                    let e = ie.getLtpPrice();
                    const t = B.getPriceTickSize(),
                        r = ie.getBuySellSide(),
                        a = .05 * e;
                    let i;
                    return 1 === r ? i = e + a : -1 === r && (i = e - a), i = this.getPriceWithNearestTickSize(i, t), B.getPriceFormattedWithDecimalPlaces(i)
                } catch (e) {
                    return console.log(e), ""
                }
            }
            static getPrefillLimitPriceForTrail() {
                try {
                    let e = parseFloat(this.getPrefillStopLossTriggerPriceForTrail());
                    const t = B.getPriceTickSize(),
                        r = 100 * t;
                    return 1 === ie.getBuySellSide() ? e += r : e -= r, e = this.getPriceWithNearestTickSize(e, t), B.getPriceFormattedWithDecimalPlaces(parseFloat(e))
                } catch (e) {
                    return console.log(e), ""
                }
            }
            static getPrefillJumpPriceForTrail() {
                try {
                    let e;
                    const t = B.getPriceTickSize();
                    return e = B.getPriceFormattedWithDecimalPlaces(parseFloat(100 * t)), e
                } catch (e) {
                    return console.log(e), ""
                }
            }
            static getPriceFormattedWithDecimalPlaces(e, t = null) {
                try {
                    const r = 12 === B.getSegmentCode(t) ? e.toFixed(4) : e.toFixed(2);
                    return parseFloat(r)
                } catch (t) {
                    return console.log(t), e
                }
            }
            static getTheSelectedSmartOrder() {
                return $(".smart-order-body").attr("id")
            }
            static convertSecondsToMinutesAndRemainingSeconds(e) {
                const t = Math.floor(e / 60),
                    r = e % 60;
                return `${String(t).padStart(2,"0")}:${String(r).padStart(2,"0")}`
            }
            static getOrderHistoryDropDownEachContainerHelper(e) {
                let t = "",
                    r = "";
                switch (e) {
                    case 1:
                    default:
                        t = "Acknowledged", r = "so_o_yetToStart";
                        break;
                    case 3:
                        t = "Created", r = "so_h_modified";
                        break;
                    case 4:
                    case 5:
                    case 18:
                        t = "Modified", r = "so_h_modified";
                        break;
                    case 6:
                        t = "Resumed", r = "so_h_running";
                        break;
                    case 7:
                        t = "Paused", r = "so_h_paused";
                        break;
                    case 8:
                        t = "Create failed", r = "so_h_failed";
                        break;
                    case 9:
                        t = "Modify Failed", r = "so_h_failed";
                        break;
                    case 10:
                        t = "Resume Failed", r = "so_h_failed";
                        break;
                    case 11:
                        t = "Pause Failed", r = "so_h_failed";
                        break;
                    case 12:
                        t = "Cancel Failed", r = "so_h_failed";
                        break;
                    case 13:
                        t = "Cancelled", r = "so_h_modified";
                        break;
                    case 14:
                        t = "Completed", r = "so_h_completed";
                        break;
                    case 15:
                        t = "Started", r = "so_h_completed";
                        break;
                    case 130:
                        t = "Buy", r = "so_h_completed";
                        break;
                    case 131:
                        t = "Order Failed", r = "so_h_failed";
                        break;
                    case 133:
                        t = "SIP Skipped", r = "so_h_failed";
                        break;
                    case 132:
                        t = "System Cancelled", r = "so_h_modified"
                }
                return {
                    message: t,
                    classHistoryMessage: r
                }
            }
            static getSmartOrderBookStatusMapper(e) {
                let t, r, a, i, s;
                switch (e) {
                    case 1:
                    default:
                        t = "Acknowledged", r = "https://assets.fyers.in/orderWindow/smartOrders/statusIcon/yetToStart.svg", a = "so-order-yetToStart", i = "so_o_yetToStart", s = "so-order-yetToStart-icon";
                        break;
                    case 3:
                        t = "Yet To Start", r = "https://assets.fyers.in/orderWindow/smartOrders/statusIcon/yetToStart.svg", a = "so-order-yetToStart", i = "so_o_yetToStart", s = "so-order-yetToStart-icon";
                        break;
                    case 4:
                    case 5:
                        t = "Modified", r = "https://assets.fyers.in/orderWindow/smartOrders/statusIcon/yetToStart.svg", a = "so-order-yetToStart", i = "so_o_modified", s = "so-order-yetToStart-icon";
                        break;
                    case 6:
                        t = "Resumed", r = "https://assets.fyers.in/orderWindow/smartOrders/statusIcon/yetToStart.svg", a = "so-order-yetToStart", i = "so_o_yetToStart", s = "so-order-yetToStart-icon";
                        break;
                    case 7:
                        t = "Paused", r = "https://assets.fyers.in/orderWindow/smartOrders/statusIcon/paused.svg", a = "so-order-paused", i = "so_o_paused", s = "so-order-paused-icon";
                        break;
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                        t = "Failed", r = "https://assets.fyers.in/orderWindow/smartOrders/statusIcon/failed.svg", a = "so-order-failed", i = "so_o_failed", s = "so-order-failed-icon";
                        break;
                    case 13:
                        t = "Cancelled", r = "https://assets.fyers.in/orderWindow/smartOrders/statusIcon/cancel.svg", a = "so-order-cancelled", i = "so_o_cancelled", s = "so-order-cancelled-icon";
                        break;
                    case 132:
                        t = "System Cancelled", r = "https://assets.fyers.in/orderWindow/smartOrders/statusIcon/cancel.svg", a = "so-order-cancelled", i = "so_o_cancelled", s = "so-order-cancelled-icon";
                        break;
                    case 14:
                        t = "Completed", r = "https://assets.fyers.in/orderWindow/smartOrders/statusIcon/completed.svg", a = "so-order-completed", i = "so_o_completed", s = "so-order-completed-icon";
                        break;
                    case 15:
                    case 18:
                        t = "Running", r = "https://assets.fyers.in/orderWindow/smartOrders/statusIcon/running.svg", a = "so-order-running", i = "so_o_running", s = "so-order-running-icon"
                }
                return {
                    statusText: t,
                    statusIconUrl: r,
                    statusClass: a,
                    classOrderDetailsMessage: i
                }
            }
            static getDirectionText(e) {
                return 1 === e ? "Up" : -1 === e ? "Down" : void 0
            }
            static getNextSip(e) {
                const {
                    schedule_date_time: t,
                    freq: r
                } = e || {};
                switch (r) {
                    case 6:
                    case 2:
                    case 3:
                        return this.getDateAndTimeFromEpoch(t, !1, !0);
                    case 1:
                        return this.getDateAndTimeFromEpoch(t);
                    default:
                        return ""
                }
            }
            static createOrderDetails(e, t) {
                const r = 6 !== e && 7 === !e && B.getDateAndTimeFromEpoch(ie.convertToEpochTimeZoneFix((t ? .end).split(" ")[1])),
                    a = 3 === e && B.getDateAndTimeFromEpoch(ie.convertToEpochTimeZoneFix((t ? .start).split(" ")[1])),
                    i = {
                        "Total Qty": t ? .totqty,
                        "Placed Qty": t ? .totplcqty,
                        "Traded Qty": t ? .tradedQty,
                        "Open Qty": t ? .openQty,
                        "Failed Qty": t ? .rejQty,
                        "MPP%": 7 === e ? 0 : ie.handlePrecision(t ? .mpp),
                        "Average price": t ? .avgPrice
                    },
                    s = {
                        7: {
                            "Traded Qty": t ? .tradedQty,
                            "SIP Qty": t ? .totqty,
                            Frequency: ie.getSipFrequencyText(t ? .freq),
                            "Next SIP": this.getNextSip(t),
                            "SIP Amount": t ? .amount,
                            "Step Up Qty": t ? .step_up_qty,
                            "Step Up Amount": t ? .step_up_amount,
                            Expiry: this.getDateAndTimeFromEpoch(t ? .end_time, !1, !0),
                            "Expiry Amount": t ? .exp_amount,
                            "Expiry Qty": t ? .exp_qty
                        },
                        3: {
                            "Upper price range": t ? .hpr,
                            "Lower price range": t ? .lpr,
                            "Start time": a,
                            "End time": r,
                            "Avg qty": t ? .avgqty,
                            "Avg diff": Math.abs(t ? .avgdiff),
                            "Init Qty": t ? .initQty,
                            "Limit Price": t ? .price,
                            Direction: this.getDirectionText(t ? .direction)
                        },
                        4: {
                            "Limit Price": t ? .price,
                            "Stop / Trigger Price": t ? .trigprice,
                            "Action at End Time": this.getActionEndTimeText(t.on_exp),
                            "Max/Min Price": t ? .hpr || t ? .lpr,
                            "End time": r
                        },
                        5: {
                            "Time interval": t ? .interval,
                            "At expiry": this.getActionEndTimeText(t.on_exp),
                            "Peg to": this.getPegToText(t.peg),
                            Adjustment: t ? .offset,
                            "Upper price range": t ? .hpr,
                            "Lower price range": t ? .lpr,
                            "End time": r
                        },
                        6: {
                            "Stop / Trigger Price": t ? .trigprice,
                            "Jump Price": t ? .jump_diff,
                            "Target Price": t ? .target_price,
                            "Limit Price": t ? .price
                        }
                    },
                    o = {
                        "Order id": t ? .flowId
                    };
                !t ? .step_up_qty && delete s[7]["Step Up Qty"], !t ? .step_up_amount && delete s[7]["Step Up Amount"], !t ? .end_time && delete s[7].Expiry, !t ? .exp_amount && delete s[7]["Expiry Amount"], !t ? .exp_qty && delete s[7]["Expiry Qty"], !t ? .hpr && !t ? .lpr && delete s[4]["Max/Min Price"], !t ? .price && delete s[3]["Limit Price"], !t ? .price && delete s[6]["Limit Price"], !t ? .hpr && delete s[5]["Upper price range"], !t ? .lpr && delete s[5]["Lower price range"], !t ? .hpr && delete s[3]["Upper price range"], !t ? .lpr && delete s[3]["Lower price range"], !t ? .trigprice && delete s[4]["Stop / Trigger Price"], t ? .hpr && -1 !== t ? .hpr && (s[7]["Upper price range"] = t ? .hpr), t ? .lpr && -1 !== t ? .lpr && (s[7]["Lower price range"] = t ? .lpr), 8 !== t.messageType && 11 !== t.messageType && 10 !== t.messageType && 9 !== t.messageType && 12 !== t.messageType || (o.message = t ? .message), -1 !== t ? .mpp && 0 !== t ? .mpp || (i["MPP%"] = "Auto"), 7 !== e && 1 !== t ? .on_exp || delete i["MPP%"], t ? .target_price || delete s[6]["Target Price"];
                const n = s[e] || {};
                let d = { ...i,
                    ...n,
                    ...o
                };
                return this.sanistiseObjectwithUndefinedValues(d), d
            }
            static sanistiseObjectwithUndefinedValues(e) {
                try {
                    Object.keys(e).forEach((t => {
                        void 0 !== e[t] && null !== e[t] || delete e[t]
                    }))
                } catch (e) {
                    console.log(e)
                }
            }
            static getTimeFromDate(e) {
                return e.split(" ")[1]
            }
            static getEpochTime(e) {
                return e.split[0], e.split[1], new Date
            }
            static getActionEndTimeText(e) {
                return {
                    1: "Cancel the order",
                    2: "Convert to market"
                }[e]
            }
            static getPegToText(e) {
                return {
                    1: "LTP",
                    2: "Best Bid",
                    3: "Best Ask",
                    4: "Mid point of Bid and Ask"
                }[e]
            }
            static mapDataForOrderDetailSection(e) {
                let t = this.getSmartOrderBookStatusMapper(e.messageType),
                    r = e.symbol.split(":");
                return {
                    symbolForLtp: e.symbol,
                    symbol: r[1],
                    description: e.description,
                    side: 1 === e.side ? "BUY" : "SELL",
                    product: e.product,
                    smartOrderType: this.getSmartOrderType(e.flowtype),
                    exchange: r[0],
                    status: t.statusText,
                    statusClass: t.classOrderDetailsMessage,
                    statusIcon: t.statusIconUrl,
                    ltp: e.ltp,
                    chg: e.ch,
                    chp: this.getChpTruncated(e.chp)
                }
            }
            static orderObjMapperForInitOw(e) {
                return {
                    qty: e.totqty,
                    seenPrice: e.price,
                    side: e.side,
                    symbol: e.symbol,
                    type: e.ordtype
                }
            }
            static getChpTruncated(e) {
                return e.toFixed(2)
            }
            static getExchangeCode() {
                try {
                    return ie.getSymbolMasterValue(orderWindow.orderData.selectedSymbol, "exchange_code")
                } catch (e) {
                    console.log(e)
                }
            }
            static getSegmentCode(e) {
                try {
                    return ie.getSymbolMasterValue(e || orderWindow.orderData.selectedSymbol, "segment_code")
                } catch (e) {
                    console.log(e)
                }
            }
            static getInstrumentCode() {
                try {
                    return ie.getSymbolMasterValue(orderWindow.orderData.selectedSymbol, "inst_type")
                } catch (e) {
                    console.log(e)
                }
            }
            static getMppDataToPrefill() {
                try {
                    const e = JSON.parse(localStorage.getItem("_mppData"));
                    return e[`${this.getExchangeCode()}_${this.getSegmentCode()}`][`${this.getInstrumentCode()}`] ? e[`${this.getExchangeCode()}_${this.getSegmentCode()}`][`${this.getInstrumentCode()}`] : e[`${this.getExchangeCode()}_${this.getSegmentCode()}`] ? e[`${this.getExchangeCode()}_${this.getSegmentCode()}`].d : 0
                } catch (e) {
                    console.log(e)
                }
            }
            static checkIfCncOrMargin() {
                return 10 === this.getSegmentCode() ? "CNC" : "MARGIN"
            }
            static getAsmGsmFlag() {
                try {
                    return ie.getSymbolMasterValue(orderWindow.orderData.selectedSymbol, "asm_gsm_val")
                } catch (e) {
                    console.log(e)
                }
            }
            static getFreezeQty() {
                try {
                    return ie.getSymbolMasterValue(orderWindow.orderData.selectedSymbol, "vol_freeze_qty")
                } catch (e) {
                    console.log(e)
                }
            }
            static getSmartMaxQtyLimit() {
                try {
                    const e = this.getFreezeQty();
                    return e && Number(e) < 999999 ? Number(e) : 999999
                } catch (e) {
                    return console.log(e), 999999
                }
            }
            static getLtpDataIfCircuitsNotAvailable(e, t = !1) {
                try {
                    const r = Number($(`#${e}`).attr("step")),
                        a = FyTrade.data.symbolPriceDict[orderWindow.orderData.selectedSymbol].v.cmd.c ? FyTrade.data.symbolPriceDict[orderWindow.orderData.selectedSymbol].v.cmd.c : 0;
                    return t ? a : a + r
                } catch (e) {
                    console.log(e)
                }
            }
            static uniqueValuesFromOrderBookData(e) {
                const t = {
                    exchange: new Set,
                    side: new Set,
                    productType: new Set,
                    smartOrderStatus: new Set,
                    smartOrderType: new Set
                };
                return e.forEach((e => {
                    if (e.symbol) {
                        const r = e.symbol.split(":")[0];
                        t.exchange.add(r)
                    }
                    void 0 !== e.side && t.side.add(1 === e.side ? "Buy" : "Sell"), e.product && t.productType.add(e.product), void 0 !== e.messageType && t.smartOrderStatus.add(I.statusMapper[e.messageType]), void 0 !== e.flowtype && t.smartOrderType.add(I.soTypeMapper[e.flowtype])
                })), {
                    exchange: Array.from(t.exchange),
                    side: Array.from(t.side),
                    productType: Array.from(t.productType),
                    smartOrderStatus: Array.from(t.smartOrderStatus),
                    smartOrderType: Array.from(t.smartOrderType)
                }
            }
            static getDateAndTimeFromEpoch(e, t = !1, r = !1) {
                const a = new Date(1e3 * e),
                    i = FyTrade.data.datahelper.convertToLocalIST(a),
                    s = e => e.toString().padStart(2, "0"),
                    o = s(i.getDate()),
                    n = i.toLocaleString("en-US", {
                        month: "short"
                    }),
                    d = i.getFullYear().toString().slice(-2),
                    l = s(i.getHours() % 12 || 12),
                    c = s(i.getMinutes()),
                    p = s(i.getSeconds()),
                    m = i.getHours() >= 12 ? "pm" : "am";
                return t ? `${l}:${c}:${p} ${m}` : r ? `${o} ${n} ${d}` : `${o} ${n} ${d}, ${l}:${c}:${p} ${m}`
            }
            static checkIfArrayDataPresent(e) {
                return 0 !== e ? .length
            }
            static getTimeInTotalMinutes(e) {
                const t = $(`#${e}`).val(),
                    [r, a] = t.split(":").map(Number);
                return 60 * r + a
            }
            static checkIfHprValidationIsRequiredForStep() {
                const e = this.stepOrderWindowOpen(),
                    t = B.getRadioButtonCheckedOrNot("mppAdvancedToggle"),
                    r = B.getRadioButtonCheckedOrNot("so_priceRangeSlider"),
                    a = B.getRadioButtonCheckedOrNot("priceRangeRadioBtnHighId") || B.getRadioButtonCheckedOrNot("priceRangeRadioBtnHighLowId");
                return e && t && r && a
            }
            static checkIfLprValidationIsRequiredForStep() {
                const e = this.stepOrderWindowOpen(),
                    t = B.getRadioButtonCheckedOrNot("mppAdvancedToggle"),
                    r = B.getRadioButtonCheckedOrNot("so_priceRangeSlider"),
                    a = B.getRadioButtonCheckedOrNot("priceRangeRadioBtnLowId") || B.getRadioButtonCheckedOrNot("priceRangeRadioBtnHighLowId");
                return e && t && r && a
            }
            static checkIfHprValidationIsRequiredForSip() {
                const e = this.sipOrderWindowOpen(),
                    t = B.getRadioButtonCheckedOrNot("sipAdvancedSlider"),
                    r = B.getRadioButtonCheckedOrNot("so_priceRangeSlider"),
                    a = B.getRadioButtonCheckedOrNot("priceRangeRadioBtnHighId") || B.getRadioButtonCheckedOrNot("priceRangeRadioBtnHighLowId");
                return e && t && r && a
            }
            static checkIfLprValidationIsRequiredForSip() {
                const e = this.sipOrderWindowOpen(),
                    t = B.getRadioButtonCheckedOrNot("sipAdvancedSlider"),
                    r = B.getRadioButtonCheckedOrNot("so_priceRangeSlider"),
                    a = B.getRadioButtonCheckedOrNot("priceRangeRadioBtnLowId") || B.getRadioButtonCheckedOrNot("priceRangeRadioBtnHighLowId");
                return e && t && r && a
            }
            static checkIfMppValidationsIsRequired() {
                const e = B.getRadioButtonCheckedOrNot("mppAdvancedToggle"),
                    t = B.getRadioButtonCheckedOrNot("customMppCheckBox");
                return e && t
            }
            static checkIfTargetPriceValidationsIsRequired() {
                this.trailOrderWindowOpen();
                const e = B.getRadioButtonCheckedOrNot("mppAdvancedToggle"),
                    t = B.getRadioButtonCheckedOrNot("customTrailTargetCheckBox");
                return e && t
            }
            static checkIfStepLimitPriceValidationIsRequired() {
                const e = this.stepOrderWindowOpen(),
                    t = B.getRadioButtonCheckedOrNot("mppAdvancedToggle"),
                    r = B.getRadioButtonCheckedOrNot("stepOrderCustomAverage");
                return e && t && r
            }
            static checkIfLimitMaxMinValidationIsRequired() {
                const e = this.limitOrderWindowOpen(),
                    t = B.getRadioButtonCheckedOrNot("mppAdvancedToggle"),
                    r = B.getRadioButtonCheckedOrNot("customMaxPriceLimitCheckBox");
                return e && t && r
            }
            static checkIfSmartLimitTriggerPriceFieldValidationRequired() {
                const e = this.limitOrderWindowOpen(),
                    t = B.getRadioButtonCheckedOrNot("triggerPriceCheckBox");
                return e && t
            }
            static checkIfsmartTrailTriggerPriceValidationRequired() {
                return this.trailOrderWindowOpen()
            }
            static checkIfSmartTrailLimitPriceFieldValidationRequired() {
                const e = this.trailOrderWindowOpen(),
                    t = B.getRadioButtonCheckedOrNot("trailMarketPriceCheckBox");
                return e && !t
            }
            static checkIfSmartTrailJumpPriceFieldValidationRequired() {
                return this.trailOrderWindowOpen()
            }
            static checkIfInitialQtyValidationsIsRequired() {
                return this.stepOrderWindowOpen()
            }
            static checkIfAverageQtyValidationIsRequired() {
                return this.stepOrderWindowOpen()
            }
            static checkIfAverageEntryPriceValidationIsRequired() {
                return this.stepOrderWindowOpen()
            }
            static checkIfSmartLimitPricevalidationIsRequired() {
                return this.limitOrderWindowOpen()
            }
            static stepOrderWindowOpen() {
                return $("#smart-order-body-step").length
            }
            static limitOrderWindowOpen() {
                return $("#smart-order-body-limit").length
            }
            static peggedOrderWindowOpen() {
                return $("#smart-order-body-pegged").length
            }
            static trailOrderWindowOpen() {
                return $("#smart-order-body-trail").length
            }
            static sipOrderWindowOpen() {
                return $("#smart-order-body-sip").length
            }
            static hideMtfBanner() {
                $(".mtf-banner-component").addClass("d-none")
            }
            static makeOrderBookQueryParamsUrl(e) {
                let t = "";
                const r = {
                    exchange: "&exchange=",
                    productType: "&product=",
                    side: "&side=",
                    smartOrderType: "&flowType=",
                    smartOrderStatus: "&messageType="
                };
                for (const a in r) e[a] && e[a].length && e[a].forEach((e => {
                    if ("side" === a) t += `${r[a]}${"Buy"===e?1:-1}`;
                    else if ("smartOrderType" === a) {
                        const i = I.flowTypeMapperByText[e];
                        t += `${r[a]}${i}`
                    } else "smartOrderStatus" === a ? I.statusMapperByText[e].forEach((e => {
                        t += `${r[a]}${e}`
                    })) : t += `${r[a]}${e}`
                }));
                smartOrders.filterOrderBookParams = t, console.log(t)
            }
            static prefillLimitPrice() {
                try {
                    const e = ie.getBuySellSide(),
                        t = parseFloat(orderWindow.common.getInitialLimitPrice()),
                        r = 2 * parseFloat(this.getPriceTickSize()),
                        a = 1 === e ? t + r : t - r;
                    return this.getPriceFormattedWithDecimalPlaces(a)
                } catch (e) {
                    console.log(e)
                }
            }
            static getTodayDate() {
                const e = new Date;
                return {
                    year: e.getFullYear(),
                    month: String(e.getMonth() + 1).padStart(2, "0"),
                    day: String(e.getDate()).padStart(2, "0")
                }
            }
            static getSipStepFrequency(e = !1) {
                const t = $("#sipFrequencyInput").val();
                let r = [],
                    a = [];
                return "Daily" === t ? (r = ["Daily", "Weekly", "Monthly", "Yearly"], a = ["sip_dailyStep", "sip_weeklyStep", "sip_monthlyStep", "sip_customStep"]) : "Weekly" === t ? (r = ["Weekly", "Monthly", "Yearly"], a = ["sip_weeklyStep", "sip_monthlyStep", "sip_customStep"]) : "Monthly" === t ? (r = ["Monthly", "Yearly"], a = ["sip_monthlyStep", "sip_customStep"]) : "Custom" === t && (r = ["Yearly"], a = ["sip_customStep"]), e ? a : r
            }
            static getSipWeeklyFrequency(e = !1) {
                return e ? ["sip_weeklyMonday", "sip_weeklyTuesday", "sip_weeklyWednesday", "sip_weeklyThursday", "sip_weeklyFriday"] : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
            }
            static getSipMonthlyFrequency(e = !1) {
                let t = 1;
                const r = [],
                    a = [];
                for (t = 1; t <= 28; t++) r.push(t), a.push(`sip_monthly${t}`);
                return e ? a : r
            }
            static getEpochTimeWithSelectedDate(e) {
                const t = e ? .year,
                    r = e ? .month,
                    a = e ? .day,
                    i = new Date(t, r - 1, a);
                return parseInt(i.getTime() / 1e3)
            }
            static getSipAmountButtonActive() {
                return $("#so_sip_AmountSecondary").hasClass("so_qtyAmountSwapParentConatinerActive")
            }
            static getSipQtyButtonActive() {
                return $("#so_sip_QtyPrimary").hasClass("so_qtyAmountSwapParentConatinerActive")
            }
            static getSipExpiryConditionToVaidate() {
                return this.getRadioButtonCheckedOrNot("sipAdvancedSlider") && this.getRadioButtonCheckedOrNot("sipExpirySlider")
            }
            static getSipExpiryConditionToVaidateDate() {
                return this.getSipExpiryConditionToVaidate() && $("#sipExpiryDateButton").hasClass("so_qtyAmountSwapParentConatinerActive")
            }
            static getSipExpiryConditionToVaidateQtyOrAmount() {
                return this.getSipExpiryConditionToVaidate() && $("#sipExpiryAmountButton").hasClass("so_qtyAmountSwapParentConatinerActive")
            }
            static getMinSipValue() {
                const e = ie.getLtpPrice();
                return 500 >= e ? 500 : e
            }
            static getPrefillSipExpiryDate() {
                const e = $("#sipFrequencyInput").val(),
                    t = $("#sipExpiryInputId");
                let r = parseInt($("#sipFrequencyDayInput").val()) || 0;
                const a = e => (6 === e.getDay() ? e.setDate(e.getDate() + 2) : 0 === e.getDay() && e.setDate(e.getDate() + 1), e);
                let i = new Date;
                if ("Daily" === e) i = ((e, t) => {
                    for (; t > 0;) e.setDate(e.getDate() + 1), 0 !== e.getDay() && 6 !== e.getDay() && t--;
                    return e
                })(i, 2), $("#sipExpiryInputId").attr("min", `${B.getTodayDate().year}-${B.getTodayDate().month}-${B.getTodayDate().day+4}`);
                else if ("Weekly" === e) {
                    r = ie.getWeekDaySelected();
                    const e = new Date,
                        t = e.getDay();
                    let s = new Date(e);
                    if (t > r) {
                        const a = 7 - t + r;
                        s.setDate(e.getDate() + a)
                    } else {
                        const a = r - t;
                        s.setDate(e.getDate() + a)
                    }
                    s = a(s);
                    const o = new Date(s);
                    o.setDate(s.getDate() + 7);
                    const n = new Date(o);
                    n.setDate(o.getDate() + 1), i = a(n)
                } else if ("Monthly" === e) {
                    const e = (new Date).getDate();
                    let t = new Date;
                    e < r || t.setMonth(t.getMonth() + 1), t.setDate(r), t = a(t), i = new Date(t), i.setMonth(i.getMonth() + 1), i = a(i)
                }
                isNaN(i.getTime()) ? (console.error("Invalid expiry date calculation."), t.val("")) : t.val(i.toISOString().split("T")[0]), $("#sipExpiryInputId").val(`${B.getTodayDate().year+10}-${B.getTodayDate().month}-${B.getTodayDate().day}`)
            }
            static getPrefillSipExpiryDatev2() {
                const e = $("#sipFrequencyInput").val(),
                    t = $("#sipFrequencyDayInput").val(),
                    r = $("#sipExpiryInputId");
                let a, i = parseInt($("#sipFrequencyDayInput").val()) || 0;
                if ("Daily" === e) {
                    const e = new Date;
                    e.setDate(e.getDate() + 4), a = e
                } else if ("Weekly" === e) {
                    i = ie.getWeekDaySelected();
                    const e = new Date,
                        t = e.getDay();
                    let r;
                    r = t <= i ? i - t : 7 - (t - i);
                    const s = new Date(e);
                    s.setDate(e.getDate() + r + 32), a = s
                } else {
                    i = parseInt(t[1]) ? parseInt(t[0] + t[1]) : parseInt(t[0]);
                    const e = new Date;
                    let r;
                    r = e.getDate() <= i ? new Date(e.getFullYear(), e.getMonth(), i) : new Date(e.getFullYear(), e.getMonth() + 1, i), r.setDate(r.getDate() + 31), a = r
                }
                const s = `${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`;
                r.attr("min", s);
                const o = new Date;
                o.setFullYear(o.getFullYear() + 10);
                const n = `${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}-${String(o.getDate()).padStart(2,"0")}`;
                r.val(n)
            }
            static highlightSipFrequencyRadioButton() {
                const e = $("#sipFrequencyInput").val();
                ["daily", "weekly", "monthly", "custom"].forEach((t => {
                    const r = `sip_${t}` == `sip_${e.toLowerCase()}`;
                    $(`#sip_${t} > div > div`).toggleClass("radioButtonActive", r)
                }))
            }
            static highlightSipFrequencyWeekRadioButton() {
                const e = $("#sipFrequencyDayInput").val();
                ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].forEach((t => {
                    const r = `sip_weekly${t.toLowerCase()}` == `sip_weekly${e.toLowerCase()}`;
                    $(`#sip_weekly${t} > div > div`).toggleClass("radioButtonActive", r)
                }))
            }
            static highlightSipFrequencyMonthRadioButton(e = null) {
                let t = $("#sipFrequencyDayInput").val()[0] + (0 === parseInt($("#sipFrequencyDayInput").val()[1]) || parseInt($("#sipFrequencyDayInput").val()[1]) ? $("#sipFrequencyDayInput").val()[1] : "");
                ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"].forEach((r => {
                    const a = e ? r === e.toString() : `sip_monthly${r.toLowerCase()}` == `sip_monthly${t.toLowerCase()}`;
                    $(`#sip_monthly${r} > div > div`).toggleClass("radioButtonActive", a)
                }))
            }
            static highlightSipStepFrequencyRadioButton() {
                const e = $("#stepUpQFrequencyInputId").val();
                ["daily", "weekly", "monthly", "yearly"].forEach((t => {
                    const r = `sip_${t}Step` == `sip_${e.toLowerCase()}Step`;
                    "yearly" === t && (t = "custom"), $(`#sip_${t}Step > div > div`).toggleClass("radioButtonActive", r)
                }))
            }
        }
        const R = B,
            L = class {
                static textBox(e, t, r, a, i, s, o, n, d, l, c, p = "", m, u = "") {
                    return `<div id="${e}_contanier" class= "${p||"ml-3"} position-relative">\n            <label class="position-absolute dynamicTextBoxLabel" id=${t} for="">${r} <span id=${a} class="smartLimitLabelSpan">${"icon"==i?this.infoIcon():i}</span> ${m?`<span id=${m} class="smartLimitLabelSpan">${this.infoIcon()}</span>`:""} </label>\n            <input type=${c} step=${s||0} id=${e} class="p-2 pb-1 dynamicTextBox" name="${l}" placeholder="${d}" style="height: ${o}px;width:${n}px">\n            ${u||""}\n        </div>`
                }
                static checkBoxComponent(e, t, r, a = "", i = !1) {
                    return `<input id=${t} class="customCheckBoxInput" type="checkbox" ${i?"checked":""}>\n                <label class="customCheckBoxComp" for=${t}></label>\n                <label class=${a} for=${t}>${e} ${r?this.infoIcon(r):""}</label>`
                }
                static radioButtonComponent(e, t, r, a = !1, i = "") {
                    return `<input type="radio" class="customRadiokBoxInput" name=${e} id=${t} for="" ${a?"checked":""} value=${i}>\n                <label class="customRadioButtonComp" for=${t}></label>\n                <label class="actionEndTimeRadioButtons" for="">${r}</label>`
                }
                static sliderComponent(e, t = !1) {
                    return ` <label class="switch">\n                    <input id=${e} type="checkbox" ${t?"checked":""}>\n                    <span class="slider so-slider round"></span>\n                </label>`
                }
                static SmartLimitMenu(e) {
                    return `<div class="ml-1 d-flex ">\n                       <div class="so_backButtonContainer"> <span id="so-backArrow" style="margin-right: 5px;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n                            <path d="M10.0502 16.9808L5.22552 12.1561C4.99502 11.9256 4.99502 11.544 5.22552 11.3135L10.0502 6.4888C10.2808 6.25829 10.6623 6.25829 10.8928 6.4888C11.1233 6.7193 11.1233 7.10083 10.8928 7.33134L6.48933 11.7348L10.8928 16.1383C11.1233 16.3688 11.1233 16.7503 10.8928 16.9808C10.7815 17.1 10.6225 17.1557 10.4715 17.1557C10.3205 17.1557 10.1695 17.1 10.0502 16.9808Z" fill="#436AF5"/>\n                            <path d="M5.78238 12.329C5.4565 12.329 5.18625 12.0587 5.18625 11.7329C5.18625 11.407 5.4565 11.1367 5.78238 11.1367H19.1597C19.4856 11.1367 19.7558 11.407 19.7558 11.7329C19.7558 12.0587 19.4856 12.329 19.1597 12.329H5.78238Z" fill="#436AF5"/>\n                          </svg></span></div>\n                        <span class="so-menu-items cursor-pointer">${e}\n                            <span class="pl-2 so-downArrow">\n                                <img src="https://assets.fyers.in/orderWindow/smartOrders/OrdersMenu/dropDown.svg"/>\n                            </span>\n                        </span>\n        </div>`
                }
                static productTypeButtons(e, t, r, a) {
                    return `<button id="${a}" class="so-btn-product ${r?"so-btn-product-selected":""}">\n                            ${e}\n                            ${this.infoIcon(t)}\n                        </button>`
                }
                static infoIcon(e = "") {
                    return `<span id=${e} style="cursor:pointer">\n                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">\n                        <path d="M6.5625 6.41683V9.3335C6.5625 9.57266 6.76083 9.771 7 9.771C7.23917 9.771 7.4375 9.57266 7.4375 9.3335V6.41683C7.4375 6.17766 7.23917 5.97933 7 5.97933C6.76083 5.97933 6.5625 6.17766 6.5625 6.41683Z" fill="#959CA6"/>\n                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.729187 7.00016C0.729187 10.4593 3.54085 13.271 7.00002 13.271C10.4592 13.271 13.2709 10.4593 13.2709 7.00016C13.2709 3.541 10.4592 0.729329 7.00002 0.729329C3.54085 0.729329 0.729187 3.541 0.729187 7.00016ZM1.60419 7.00016C1.60419 4.02516 4.02502 1.60433 7.00002 1.60433C9.97502 1.60433 12.3959 4.02516 12.3959 7.00016C12.3959 9.97516 9.97502 12.396 7.00002 12.396C4.02502 12.396 1.60419 9.97516 1.60419 7.00016Z" fill="#959CA6"/>\n                        <path d="M6.77835 4.12999C6.70835 4.15915 6.64419 4.19999 6.58585 4.25249C6.53335 4.31082 6.49252 4.36915 6.46335 4.44499C6.43419 4.51499 6.41669 4.59082 6.41669 4.66665C6.41669 4.74249 6.43419 4.81832 6.46335 4.88832C6.49252 4.95832 6.53335 5.02249 6.58585 5.08082C6.64419 5.13332 6.70835 5.17415 6.77835 5.20332C6.91835 5.26165 7.08169 5.26165 7.22169 5.20332C7.29169 5.17415 7.35585 5.13332 7.41419 5.08082C7.46669 5.02249 7.50752 4.95832 7.53669 4.88832C7.56585 4.81832 7.58335 4.74249 7.58335 4.66665C7.58335 4.59082 7.56585 4.51499 7.53669 4.44499C7.50752 4.36915 7.46669 4.31082 7.41419 4.25249C7.35585 4.19999 7.29169 4.15915 7.22169 4.12999C7.15169 4.10082 7.07585 4.08332 7.00002 4.08332C6.92419 4.08332 6.84835 4.10082 6.77835 4.12999Z" fill="#959CA6"/>\n                    </svg>\n                </span>`
                }
                static smartOrderTypeHeader(e) {
                    const t = ("Equity SIP" === e ? [{
                        label: "Overnight",
                        info: "investInfo",
                        active: !0,
                        id: "so_invest"
                    }, {
                        label: "MTF",
                        info: "mtfInfo",
                        active: !1,
                        id: "so_mtf"
                    }] : [{
                        label: "Intraday",
                        info: "tradeInfo",
                        active: !0,
                        id: "so_trade"
                    }, {
                        label: "Overnight",
                        info: "investInfo",
                        active: !1,
                        id: "so_invest"
                    }, {
                        label: "MTF",
                        info: "mtfInfo",
                        active: !1,
                        id: "so_mtf"
                    }]).map((({
                        label: e,
                        info: t,
                        active: r,
                        id: a
                    }) => this.productTypeButtons(e, t, r, a))).join("");
                    return `\n          <div class="sl-part-1 d-flex justify-content-between align-items-center">\n              ${this.SmartLimitMenu(e)}\n              <div class="mr-2">${t}</div>\n          </div>`
                }
                static productTypeOrderType(e, t) {
                    return `<div id=${t} class="sl-part-2 p-2 pl-3">${e}</div>`
                }
                static inputBoxesWithoutTriggerComponent(e, t) {
                    const r = t ? 300 : 142;
                    return `<div class="sl-part-3 d-flex mt-3 mb-2">\n                    ${this.textBox("smartLimitQty","smartLimitQtyLabel","Qty","lotTextId","(Lot: 50)",R.getLotSize(),32,r,"","","number")}\n                    ${e?this.textBox("smartTimeInterval","smartLimitTimeIntervalLabel","Time interval","smartLimitTimeIntervalIcon","icon",2,32,142,"mm:ss","","text"):""}\n                    ${t?"":this.textBox("smartLimitEndTime","smartLimitEndLabel","EndTime","smartLimitEndTimeInfoIcon","icon",2,32,142,"","","time")}\n                </div>`
                }
                static qtyRowForSipOrder() {
                    return `<div class="sl-part-3 d-flex mt-3 mb-2">\n                    ${this.textBox("smartLimitQty","smartLimitQtyLabel","Qty","lotTextId","(Lot: 50)",R.getLotSize(),32,218,"","","number")}\n                    ${this.backForthSwitchButton("so_sip_QtyPrimary","Qty","so_sip_AmountSecondary","Amount",35,130)}\n                </div>`
                }
                static backForthSwitchButton(e, t, r, a, i, s) {
                    return `\n    <div style="justify-content: flex-start; align-items: center; display: inline-flex; cursor: pointer;margin-left: 20px;">\n    <div id=${e} style="height:${i}px;width:${s}px;"class="so_qtyAmountSwapParentConatiner so_qtyAmountSwapParentConatinerActive">\n        <div style="justify-content: center; align-items: center; gap: 50px; display: inline-flex;">\n            <div class="so_qtyAmountSwap">${t}</div>\n        </div>\n    </div>\n    <div id=${r} style="height:${i}px;width:${s}px;" class="so_qtyAmountSwapParentConatiner">\n        <div  style="justify-content: center; align-items: center; gap: 50px; display: inline-flex;">\n            <div class="so_qtyAmountSwap">${a}</div>\n        </div>\n    </div>\n</div>\n    `
                }
                static stepOrderQtyInputBox() {
                    const e = R.getLotSize(),
                        t = R.getPriceTickSize();
                    return `<div class="sl-part-3 d-flex mt-3 mb-2">\n      ${this.textBox("smartLimitQty","smartLimitQtyLabel","Qty","lotTextId",`(Lot: ${e})`,e,32,142,"","","number")}\n      ${this.textBox("smartStepAvgQty","smartStepAvgQtyLabel",`Avg Qty (Lot: ${e})`,"smartStepAvgQtyInfoIcon","icon",e,32,142,"","","number")}\n      ${this.textBox("smartStepAvgEntryDiffQty","smartStepAvgEntryDiffQtyLabel",`Avg Entry Diff (Price:${t})`,"smartStepAvgEntryDiffQtyInfoIcon","icon",t,32,195,"","","number")}\n  </div>`
                }
                static getDropDownIconHtml() {
                    return '<svg class=\'so_dropDownIconHtml\' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">\n  <path d="M5.87424 9.33336L2.07091 5.53003C1.90174 5.36086 1.90174 5.08086 2.07091 4.9117C2.24007 4.74253 2.52007 4.74253 2.68924 4.9117L6.49257 8.71503C6.77257 8.99503 7.22757 8.99503 7.50757 8.71503L11.3109 4.9117C11.4801 4.74253 11.7601 4.74253 11.9292 4.9117C12.0984 5.08086 12.0984 5.36086 11.9292 5.53003L8.12591 9.33336C7.81674 9.64253 7.40841 9.80003 7.00007 9.80003C6.59174 9.80003 6.18341 9.64253 5.87424 9.33336Z" fill="#6A7483" stroke="#6A7483" stroke-width="0.3"/>\n  <path opacity="0.01" fill-rule="evenodd" clip-rule="evenodd" d="M14 0V14H0V0H14Z" fill="#6A7483"/>\n</svg>'
                }
                static sipOrderFrequencyRow() {
                    const e = `\n    ${this.getDropDownIconHtml()}\n    ${this.sipFrequenceDropDown()}\n    `;
                    return `<div id="sipFrequencyContainer" class="sl-part-3 d-flex mt-3 mb-2">\n    ${this.textBox("sipFrequencyInput","sipFrequencyInputLabel","Frequency","smartStepAvgQtyInfoIcon","icon","",32,220,"Monthly","","text","","",`${e}`)}\n    ${this.textBox("sipFrequencyDayInput","sipFrequencyDayLabel","SIP Date","smartStepAvgQtyInfoIcon2","icon","",32,264,"5th of Every Month","","text","","",`${this.getDropDownIconHtml()}`)}\n</div>`
                }
                static sipExecuteFirstRow() {
                    return `\n   <div id="execurteFirstRow"  style="margin-top: 1.5rem;" class="marginLeft2rem" id="">\n   ${this.checkBoxComponent("Execute the first SIP Immediately","sipExecuteImmediately","sipExecuteImmediatelyInfoIcon")}\n</div>\n   `
                }
                static sipAdvancedComponent() {
                    return `<div id="so_advancedContainer" class="sipSo_advancedContainer d-flex align-items-center pb-2">\n    <div class="d-flex align-self-baseline  sl-advancedField">\n        <div class="actionAtEndTime">\n            Advanced \n        </div>\n        <div class="mt-1 ml-2"> \n            ${this.sliderComponent("sipAdvancedSlider")}\n            </div> \n    </div> \n    \n    \x3c!-- SIP Advnaced component --\x3e\n    <div id="sipAdvancedFeatureComponent" class="align-items-center pb-2">\n                    ${this.sipPriceRangeAdvanced()}\n                    ${this.sipSteupAdvanced()} \n                    ${this.sipExpiryAdvanced()}\n                </div>\n\n    \n</div>\n    `
                }
                static sipExpiryAdvanced() {
                    return `\n    \x3c!-- Expiry conditon   component --\x3e\n    <div id="sipExpiryAdvancedContainer" style="padding-left: 36px !important;" class="d-flex align-self-baseline  sl-advancedField">\n        <div class="actionAtEndTime">\n        Expiry Condition \n        </div>\n        <div class="mt-1 ml-2"> \n            ${this.sliderComponent("sipExpirySlider")}\n            </div> \n    </div>\n    <div id="sipExpiryAdvanced" class="ml-4">\n        <div class= "d-flex mt-3 spaceComp">\n            ${this.backForthSwitchButton("sipExpiryDateButton","Date","sipExpiryAmountButton","Qty",40,70)}\n            ${this.textBox("sipExpiryInputId","sipExpiryLabel","Expiry  Date ","priceRangeLowLabelSpan","",2,32,147,"","","date","","sipExpiryDateIcon")}\n        </div>\n    </div>\n    `
                }
                static sipSteupAdvanced() {
                    const e = `\n    ${this.getDropDownIconHtml()}\n    `;
                    return `\n    \x3c!-- Setup  component --\x3e\n    <div id="sipStepUpAdvancedConatiner" style="padding-left: 36px !important;" class="d-flex align-self-baseline  sl-advancedField">\n        <div class="actionAtEndTime">\n            Step Up \n        </div>\n        <div id="" class="mt-1 ml-2"> \n            ${this.sliderComponent("sipStepUpSlider")}\n            </div> \n    </div>\n    <div id="sipStepUpAdvancedInput" class="ml-4">\n       \n        <div id="sipStepUpAdvancedInputContainer" class="d-flex mt-3 spaceComp">\n        ${this.textBox("stepUpQFrequencyInputId","stepUpQFrequencyLabel","Step Up Frequency","stepUpQFrequencyInfoIcon","icon","",32,146,"Monthly","","text","","",`${e}`)}\n        ${this.textBox("stepUpQuantityInputId","stepUpQuantityLabel","Step Up Quantity","priceRangeHighLabelSpan","",1,32,142,"","","number","","stepUpQuantityInfoIcon")}\n        </div>\n    </div>\n    `
                }
                static sipPriceRangeAdvanced() {
                    return `\n    <div style="padding-left: 36px !important;" class="d-flex align-self-baseline  sl-advancedField">\n    <div class="actionAtEndTime">\n        Price range \n    </div>\n    <div class="mt-1 ml-2"> \n        ${this.sliderComponent("so_priceRangeSlider")}\n        </div> \n</div>\n<div id="sipHighLowComponent"class="ml-4 d-none">\n    <div id="so_priceRangeRadioButton" class="spaceComp invisible d-flex">\n        <div class="radioButtonStyles">${this.radioButtonComponent("priceRangeRadioBtn","priceRangeRadioBtnHighId","High",!1,1)}</div>\n        <div class="radioButtonStyles">${this.radioButtonComponent("priceRangeRadioBtn","priceRangeRadioBtnLowId","Low",!1,2)}</div>\n        <div class="radioButtonStyles">${this.radioButtonComponent("priceRangeRadioBtn","priceRangeRadioBtnHighLowId","High and Low",!1,3)}</div>\n    </div>\n    <div class= "d-flex mt-3 spaceComp">\n        ${this.textBox("priceRangeHigh","priceRangeHighLabel","High","priceRangeHighLabelSpan",`(Tick:${R.getPriceTickSize()})`,2,32,142,"","","number","","priceRangeHighInfoIcon")}\n        ${this.textBox("priceRangeLow","priceRangeLowLabel","Low","priceRangeLowLabelSpan",`(Tick:${R.getPriceTickSize()})`,2,32,142,"","","number","","priceRangeLowInfoIcon")}\n    </div>\n</div>\n    `
                }
                static sipFrequenceDropDown(e = "", t = [], r = [], a = !1) {
                    const i = t ? .length ? t : ["Daily", "Weekly", "Monthly", "Custom"],
                        s = `sipFrequenceDropDownContainer${e}`,
                        o = r ? .length ? r : [`sip_daily${e}`, `sip_weekly${e}`, `sip_monthly${e}`, `sip_custom${e}`];
                    return `\n    <div class="newBasketContainer ui-draggable show" id=${s}\n        style="display: none;height:auto;width:240px;left:0" aria-modal="true" role="dialog">\n\n        \x3c!-- Dropdown list--\x3e\n        <div style="height:${a?"250px":"auto"};"class="basketListContainer borderBottomBasketHeader" id="">\n        ${i.map(((e,t)=>this.sipDropDownSelection(o[t],e))).join("")}\n      </div>\n\n    </div>\n    `
                }
                static sipDropDownSelection(e, t) {
                    return `<span id=${e}>\n                <div style="position: relative !important;" class="basketDiv">\n                    <div\n                        style="width: 16px; height: 16px; left: 0px; top: 0px; position: absolute; border-radius: 16px; border: 1px #C9CDD2 solid;left: 10px;top: 17px;">\n                    </div>\n                    <span>${t}</span>\n                </div>\n            </span>`
                }
                static stepOrderInitialQtyInputBox() {
                    return `<div id="stepOrderInitialQtyInputContainer" class="sl-part-4 d-none  align-items-center">\n    <div id="mppContainer" class= "spaceComp-step">\n  ${this.textBox("mppQtyBox","mppFieldLabel","MPP","mppFieldLabelSpan","%",2,32,142,"Auto","","number","ml-5 mt-4")}\n  <div class="ml-5 mt-1 invisible" id="customMppCheckBoxContainer">\n      ${this.checkBoxComponent("Custom MPP","customMppCheckBox","mppIconId")}\n  </div>\n  </div>\n    <div class="">\n    ${this.textBox("smartStepInitialQty","smartStepInitialQtyLabel","Initial Qty","lotTextId",`(Lot: ${R.getLotSize()})`,R.getLotSize(),32,142,"","","number","mt-3Px ml-20Px")}\n    </div>\n  </div>`
                }
                static inputBoxesWithTriggerComponent() {
                    return `<div class="sl-part-4 d-flex mt-3 mb-2 align-items-center">\n                    <div class="">\n                        ${this.textBox("smartLimitPriceField","smartLimitPriceLabel","Price","smartLimitLabelSpan","(Tick: 0.05)",2,32,142,"","","number")}\n                    </div>\n                    <div class="triggerPriceContainer">\n                        ${this.textBox("smartLimitTriggerPriceField","smartLimittriggerPriceLabel","Trigger Price","smartLimitTriggerPriceFieldSpan","",2,32,142,"","","number")}\n                        <div id="triggerPriceCheckBoxContainer" class="ml-3 mt-1 sl-checkBoxLabel">\n                            ${this.checkBoxComponent("Trigger Buy","triggerPriceCheckBox","triggerPriceInfoIcon","smartTriggerBySell")}\n                        </div>\n                        \n                    </div>\n                </div>`
                }
                static inputBoxesWithTriggerComponentForTrailOrder() {
                    const e = R.getPriceTickSize();
                    return `<div class="sl-part-4 d-flex mt-3 mb-2 align-items-center">\n                  <div>\n                      ${this.textBox("smartTrailTriggerPrice","smartTrailTriggerLabel","SL Trigger Price","smartTrailTriggerLabelSpan","",e,32,142,"","","number")}\n                  </div>\n                  <div class="triggerPriceContainer">\n                      ${this.textBox("smartTrailLimitPriceField","smartTrailLimitPriceLabel","","smartTrailLimitPriceFieldSpan","SL Limit Price",e,32,160,`Price(Tick:${e})`,"","number")}\n                      <div id="triggerPriceCheckBoxContainer" class="ml-3 mt-1 sl-checkBoxLabel">\n                          ${this.checkBoxComponent("Market Price","trailMarketPriceCheckBox","trailMarketPriceInfoIcon","",!0)}\n                      </div>\n                      \n                  </div>\n                  <div class="">\n                  ${this.textBox("smartTrailJumpPriceField","smartTrailJumpPriceLabel","Jump Price","smartTrailJumpLabelSpan","",e,32,142,"","","number")}\n              </div>\n              </div>`
                }
                static actionAtEndTimecomponent() {
                    return `<div class="sl-part-5 d-flex justify-content-start align-items-center">\n                    <div>\n                        <span class="actionAtEndTime ml-3"> Action at End Time </span> ${this.infoIcon("actionAtEndTimeInfo")}\n                    </div>\n                    <div class='actionAtEndTimeRadios'>\n                      <div id="actionEndTimeConvert" class="radioButtonStyles">\n                        ${this.radioButtonComponent("actionEndTime","convertToMarket","Convert to market",!0,2)}\n                      </div>\n                      <div id="actionEndTimeCancel" class="radioButtonStyles">\n                        ${this.radioButtonComponent("actionEndTime","cancelTheOrder","Cancel the order",!1,1)}\n                      </div>\n                    </div>\n                </div>`
                }
                static stepDirectionUpDown() {
                    return `<div class="sl-part-5 d-flex justify-content-start align-items-center stepDirectionComponent">\n      <div>\n          <span class="actionAtEndTime ml-3"> Direction </span> ${this.infoIcon("stepDirectionInfo")}\n      </div>\n      <div class='actionAtEndTimeRadios_step'>\n        <div id="stepUpSideDirectionRadio" class="radioButtonStyles">\n          ${this.radioButtonComponent("stepDirection","stepOrderUpSideDirection","Up",!0,2)}\n        </div>\n        <div id="stepDownSideDirectionRadio" class="radioButtonStyles">\n          ${this.radioButtonComponent("stepDirection","stepOrderDownSideDirection","Down",!1,1)}\n        </div>\n      </div>\n  </div>`
                }
                static stepAveragingStartsFrom() {
                    return `<div id="stepAveragingStartsFromComponent" class=" d-none sl-part-5 justify-content-start align-items-center" style=" height: 70px;">\n      <div>\n          <span class="actionAtEndTime ml-3"> Averaging starts from </span> ${this.infoIcon("stepAveragingInfo")}\n      </div>\n      <div class='avergaingStartsFrom_step'>\n        <div id="stepOrderLtpAverageContainer" class="radioButtonStyles">\n          ${this.radioButtonComponent("stepAverage","stepOrderLtpAverage","Market",!0,2)}\n        </div>\n        <div id="stepOrderCustomAverageContainer" class="radioButtonStyles">\n          ${this.radioButtonComponent("stepAverage","stepOrderCustomAverage","Limit",!1,1)}\n        </div>\n        <div class="">\n         ${this.textBox("smartStepLimitPriceField","smartStepLimitPriceLabel","Limit Price","smartStepLimitLabelSpan",`(Tick:${R.getPriceTickSize()})`,R.getPriceTickSize(),32,160,`Tick:${R.getPriceTickSize()}`,"","number")}\n         </div>\n      </div>\n  </div>`
                }
                static stepOrderStartEndTimeInputBox() {
                    return `<div class="sl-part-3 d-flex mt-3 mb-2">\n      ${this.textBox("smartStepStartTime","smartLimitStartLabel","Start time","smartLimitStartTimeInfoIcon","icon",60,32,142,`${R.getSessionStartTime()}`,"","time")}\n      ${this.textBox("smartLimitEndTime","smartLimitEndLabel","EndTime","smartLimitEndTimeInfoIcon","icon",2,32,142,`${R.getSessionEndTime()}`,"","time")}\n  </div>\n      `
                }
                static executeImmediateComponent() {
                    return `<div class="sl-part-6 ml-2">\n                    ${this.checkBoxComponent("Execute Immediate","executeImmediate","executeImmediateInfo","sl-titleText")}\n                </div>`
                }
                static advancedComponent(e) {
                    return `<div id="so_advancedContainer" class="sl-part-7-trail-small d-flex align-items-center pb-2">\n                    <div class="d-flex align-self-baseline  sl-advancedField">\n                        <div class="actionAtEndTime">\n                            Advanced \n                        </div>\n                        <div class="mt-1 ml-2"> \n                            ${this.sliderComponent("mppAdvancedToggle")}\n                            </div> \n                    </div>\n                       ${"step"!==e?this.advancedComponentStepOrderAdjustment(e):""}          \n                </div>`
                }
                static advancedComponentStepOrderAdjustment(e) {
                    return `\n      <div id="mppContainer" class= "spaceComp d-none">\n      ${this.textBox("mppQtyBox","mppFieldLabel","MPP","mppFieldLabelSpan","%",2,32,142,"Auto","","number","ml-5 mt-4")}\n      <div class="ml-5 mt-1 invisible" id="customMppCheckBoxContainer">\n          ${this.checkBoxComponent("Custom MPP","customMppCheckBox","mppIconId")}\n      </div>\n  </div>\n  ${this.advancedMppAddition(e)}  \n      `
                }
                static advancedMppAddition(e) {
                    switch (e) {
                        case "trail":
                            return this.smartTrailAdvancedTargetPriceConatiner();
                        case "limit":
                            return this.smartLimitlAdvancedMaxPriceConatiner();
                        default:
                            return ""
                    }
                }
                static smartTrailAdvancedTargetPriceConatiner() {
                    return `\n      <div id="targetPriceContainer" class= "spaceComp d-none">\n      ${this.textBox("smartTrailTragetPriceBox","smartTrailTragetPriceLabel","","smartTrailTragetPriceSpan","",R.getPriceTickSize(),32,170,"Target Trigger Price","","number","marginLeft2rem mt-4")}\n      <div class="marginLeft2rem mt-1 invisible" id="smartTrailTragetPriceBoxContainer">\n          ${this.checkBoxComponent("Set Target Price","customTrailTargetCheckBox","smartTrailTragetPriceBoxIconId")}\n      </div>\n  </div>\n      `
                }
                static smartLimitlAdvancedMaxPriceConatiner() {
                    return `\n      <div id="limitMaxPriceContainer" class= "spaceComp d-none">\n      ${this.textBox("smartLimitMaxPriceBox","smartLimitMaxPriceLabel","","smartLimitMaxPriceSpan","",R.getPriceTickSize(),32,142,"Max Price","","number","marginLeft2rem mt-4")}\n      <div class="marginLeft2rem mt-1 invisible" id="smartLimitMaxPriceBoxContainer">\n          ${this.checkBoxComponent("Set Max Price","customMaxPriceLimitCheckBox","smartLimitMaxPriceInfoId","smartLimitMaxPriceLabelText")}\n      </div>\n  </div>\n      `
                }
                static peggedToComponent() {
                    return `<div class="peggedTo" style="min-height:7.813rem">\n                    <div class="ml-3 actionAtEndTime">\n                        <span class="mt-2">Pegged to ${this.infoIcon("peggedToIcon")}</span>\n                        <div class="d-flex mt-2 peggedRadioStyle">\n                            <div class="radioButtonStyles" id="peggedToLotIdSpan">${this.radioButtonComponent("peggedLot","peggedToLotId","LTP",!0,1)}</div>\n                            <div id="peggedBestBidSpan" class="radioButtonStyles">${this.radioButtonComponent("peggedLot","peggedBestBid","Best Bid",!1,2)}</div>\n                            <div id="peggedBestAskSpan" class="radioButtonStyles">${this.radioButtonComponent("peggedLot","peggedBestAsk","Best Ask",!1,3)}</div>\n                            <div id="peggedMidBidAskSpan" class="radioButtonStyles">${this.radioButtonComponent("peggedLot","peggedMidBidAsk","Mid point of Bid and Ask",!1,4)}</div>\n                        </div>\n                    </div>\n                    <div class="mt-4 d-flex">\n                        <div col-md-6>\n                            ${this.textBox("peggedAdjustmentField","peggedAdjustmentFieldLabel","Adjustment","adjustmentTick",`Tick(${R.getPriceTickSize()})`,2,32,191,"","","number","","adjustmentInfoIcon")}\n                        </div>\n                        <div class="ml-3" style="margin-top:-0.688rem;">\n                           <div class="actionEndTimeRadioButtons">Adjustment direction ${this.infoIcon("adjustmentDirection")}</div>\n                           <div class="mt-1 d-flex adjustmentDirection">\n                            <span class="" id="adjustmentDirectionUpIdSpan">${this.radioButtonComponent("adjustmentDirection","adjustmentDirectionUpId","Up",!0,1)} ${this.upArrow()}</span>\n                            <span class="ml-3" id="adjustmentDirectionDownIdSpan">${this.radioButtonComponent("adjustmentDirection","adjustmentDirectionDownId","Down",!1,-1)} ${this.downArrow()}</span>\n                           </div>\n                        </div>\n                    </div>\n                </div>`
                }
                static priceRangeComponent(e) {
                    return `<div id="${"step"===e?"stepPriceRangeComponent":""}" class="${"step"===e?"d-none":"d-flex"} ${"step"===e?"sl-part-7-step":"sl-part-7"} align-items-center pb-2">\n                    <div class="d-flex align-self-baseline  sl-advancedField">\n                        <div class="actionAtEndTime">\n                            Price range \n                        </div>\n                        <div class="mt-1 ml-2"> \n                            ${this.sliderComponent("so_priceRangeSlider")}\n                            </div> \n                    </div>\n                    <div class="ml-4">\n                        <div id="so_priceRangeRadioButton" class="spaceComp invisible d-flex">\n                            <div class="radioButtonStyles">${this.radioButtonComponent("priceRangeRadioBtn","priceRangeRadioBtnHighId","High",!1,1)}</div>\n                            <div class="radioButtonStyles">${this.radioButtonComponent("priceRangeRadioBtn","priceRangeRadioBtnLowId","Low",!1,2)}</div>\n                            <div class="radioButtonStyles">${this.radioButtonComponent("priceRangeRadioBtn","priceRangeRadioBtnHighLowId","High and Low",!1,3)}</div>\n                        </div>\n                        <div class= "d-flex mt-3 spaceComp">\n                            ${this.textBox("priceRangeHigh","priceRangeHighLabel","High","priceRangeHighLabelSpan",`(Tick:${R.getPriceTickSize()})`,2,32,142,"","","number","","priceRangeHighInfoIcon")}\n                            ${this.textBox("priceRangeLow","priceRangeLowLabel","Low","priceRangeLowLabelSpan",`(Tick:${R.getPriceTickSize()})`,2,32,142,"","","number","","priceRangeLowInfoIcon")}\n                        </div>\n                    </div>\n                </div>`
                }
                static upArrow() {
                    return '<svg class="upDownArrows" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">\n        <path d="M4.70978 8.67701L4.64212 1.32337" stroke="#6A7483" stroke-width="1.5" stroke-linecap="round"/>\n        <path d="M8.3519 4.91346L4.64212 1.32337L1 5.08691" stroke="#6A7483" stroke-width="1.5" stroke-linecap="round"/>\n      </svg>'
                }
                static downArrow() {
                    return '<svg class="upDownArrows" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">\n        <path d="M5.06171 1.32299L4.99405 8.67663" stroke="#6A7483" stroke-width="1.5" stroke-linecap="round"/>\n        <path d="M8.70383 5.08654L4.99405 8.67663L1.35193 4.91309" stroke="#6A7483" stroke-width="1.5" stroke-linecap="round"/>\n      </svg>'
                }
                static smartOrderDetails(e, t, r) {
                    return ` <div id="orderDetailsSideSection" class="">\n              ${this.orderDetailsHeaderSection()}\n              ${this.orderDetailsPreviewSection(r)}\n              <div class="scrip-detail-subContainer">\n                ${this.orderDetailsDropDownSection(e)}\n                ${this.orderHistoryDropDownSection(t)}\n              </div>\n      </div>`
                }
                static orderDetailsHeaderSection() {
                    return '\n      <div class="d-flex px-2 py-1 justify-content-between align-items-center">\n      <div class="orderDetailsHeading orderDetailsTopHeading">Order details</div>\n      <div id="smartOrderDetailsclose" class="smartOrderDetailscloseIcon">\n      </div>\n    </div>'
                }
                static orderDetailsPreviewSection(e) {
                    let t = "so-side-green";
                    return "SELL" === e ? .side && (t = "so-side-red"), `<div class="scrip-detail-container container py-3">\n      <div class="row px-2">\n        <div class="col-6 px-0">\n          <div class="scrip-name align-items-center">\n            ${e.symbol}<span class="px-2 smart-exchange-name py-1">${e.exchange}</span>\n          </div>\n          <div class="scrip-description mt-1">${e?.description}</div>\n        </div>\n        <div class="col-6 px-2">\n          <div class="ltp d-flex justify-content-end" data-smartscriptltp="${e?.symbolForLtp}">\n            ${F.getSmartOredrHistoryLtpContainer(e.ltp?e.ltp:0,e.chg)}\n          </div>\n          <div class="pnl mt-1" data-smartScriptChange="${e?.symbolForLtp}">${e.chg?e.chg:"0"}(${e.chp?e.chp:"0"}%)</div>\n        </div>\n      </div>\n      <div class="stroke-line my-3"></div>\n      <div class="row px-2">\n        <div class="col-3 px-0">\n          <div class="detail-heading">Smart order</div>\n          <div class="so-type d-inline">${e.smartOrderType}</div>\n        </div>\n        <div class="col-3 px-0">\n          <div class="detail-heading">Side</div>\n          <div class="so-side ${t} d-inline">${e.side}</div>\n        </div>\n        <div class="col-3 px-0">\n          <div class="detail-heading">Product</div>\n          <div class="so-product d-inline">${e.product}</div>\n        </div>\n        <div class="col-3 px-0">\n          <div class="detail-heading">Status</div>\n          <div class="status-container ${e.statusClass}">\n            <span><img src="${e.statusIcon}"/></span>\n            <span class="so-status d-inline" id="orderDetailsSectionStatus">${e.status}</span>\n          </div>\n        </div>\n      </div>\n    </div>`
                }
                static orderDetailDropDownContent(e, t) {
                    return `<div class="d-flex mx-2 justify-content-between py-2 od-section">\n                  <div class="od-tag">${e}</div>\n                  <div id="totalQty" class="od-data">${t}</div>\n                </div>`
                }
                static orderDetailsDropDownSection(e) {
                    return ` <div class="dropdown-parent bottom-border" id="orderDetailsDropDownWrapper">\n                <div class="px-2 py-2 mb-1 order-detail d-flex justify-content-between align-items-center dropdown-header">\n                  <div class="orderDetailsHeading">\n                    <span><img class="mr-2" src="https://assets.fyers.in/orderWindow/smartOrders/orderHistory/overview.svg" /></span>\n                    Order details\n                  </div>\n                  <div>\n                    <img class="dropdown-arrow" id="smartOrderSectionDropArrow" src="https://assets.fyers.in/orderWindow/smartOrders/orderHistory/arrow-down.svg" />\n                  </div>\n               </div>\n                <div class="order-detail-dropdown" id="orderDetailDropdown">\n                  ${Object.entries(e).map((([e,t])=>`${this.orderDetailDropDownContent(e,t)}`)).join("")}\n                  <div class="show-more-less my-3">Show less details <img class="ml-2" src="https://assets.fyers.in/orderWindow/smartOrders/orderHistory/arrow-square-up.svg" /></div>\n                </div>\n    </div>`
                }
                static orderHistoryDropDownSection(e) {
                    return `\n      <div class="dropdown-parent" id="orderHistoryDropDownWrapper">\n      <div class="px-2 py-2 my-1 order-detail d-flex justify-content-between align-items-center bottom-border dropdown-header">\n        <div class="orderDetailsHeading">\n          <span><img class="mr-2" src="https://assets.fyers.in/orderWindow/smartOrders/orderHistory/order-History.svg" /></span>\n          Order History\n        </div>\n        <div>\n          <img class="dropdown-arrow" id="smartOrderHistorySectionDropArrow" src="https://assets.fyers.in/orderWindow/smartOrders/orderHistory/arrow-down.svg" />\n        </div>\n      </div>\n      <div class="order-detail-dropdown" id="orderHistoryDropDown">\n        ${this.getOrderHistoryDropDownEachContainer(e)}\n      </div>\n    </div>\n      `
                }
                static getOrderHistoryDropDownEachContainer(e) {
                    const t = e ? .data,
                        r = e ? .flowtype;
                    return t.map(((e, t) => {
                        let a = R.getOrderHistoryDropDownEachContainerHelper(e ? .messageType),
                            i = a ? .classHistoryMessage,
                            s = 0 === t ? "py-3" : "pb-3 pt-2",
                            o = 130 === e ? .messageType || 131 === e ? .messageType || 131 === e ? .messageType && 7 === r ? "" : "d-none";
                        if (131 === e ? .messageType && (a.message = "Order Failed"), 130 === e ? .messageType && (a.message = "Order Success"), 130 === e ? .messageType && 7 === r && (a.message = "SIP Success"), 131 === e ? .messageType && 7 === r && (a.message = "SIP Failed"), !I.EXCLUDE_SMART_FILTER_MESSAGES.includes(e ? .messageType)) return `\n                <div class="d-flex justify-content-between align-items-center px-2 ${s}">\n                    <div class="d-flex align-items-center">\n                        <span class="circle mr-2 so_h_circle"></span>\n                        <span class="pill ${i} py-1 px-2">${a?.message}</span>\n                    </div>\n                    <div class="oh-date-time">\n                        <span class="oh-qty ${o} ">Qty:</span>\n                        <span class="oh-qty-data mr-3 ml-1 ${o}">${e?.qty}</span>\n                        ${R.getDateAndTimeFromEpoch(e?.timestamp)}\n                        <div class="orderDetailsCTA ${o}">Order details</div>\n                    </div>\n                </div>`
                    })).join("")
                }
                static createfilterModal(e) {
                    let t = R.uniqueValuesFromOrderBookData(e);
                    return `\n                ${this.topFilterSection()}\n                <div class="stroke-line"></div>\n                <div class="filterBodySection">\n                  ${this.filterBlock("exchange",t.exchange)}\n                  <div class="stroke-line"></div>\n                  ${this.filterBlock("side",t.side)}\n                  <div class="stroke-line"></div>\n                  ${this.filterBlock("productType",t.productType)}\n                  <div class="stroke-line"></div>\n                  ${this.filterBlock("smartOrderStatus",t.smartOrderStatus)}\n                  <div class="stroke-line"></div>\n                  ${this.filterBlock("smartOrderType",t.smartOrderType)}\n              </div>\n            `
                }
                static filterBlock(e, t) {
                    return `\n      <div class="filterBox">\n            ${this.filterHeaderSections("filterBoxHeader",e,I.valueToTextToShowInFilterModalMapper[e])}\n            <div class="d-flex flex-wrap mt-2 mb-3 filterItems">\n             ${this.createFilterItem(t)}\n            </div>\n          </div>`
                }
                static topFilterSection() {
                    return `\n      <div class="filterTopSection d-flex justify-content-between">\n        <div id="filterCrossBtn" class="filterClose" ></div>\n        <div class="mb-1">\n          ${this.button("filterTopBtn applyBtn","filterApply","Apply")}\n          ${this.button("filterTopBtn resetBtn","filterReset","Reset")}\n        </div>\n      </div>`
                }
                static button(e, t, r) {
                    return `<button class="${e}" id="${t}">${r}</button>`
                }
                static createFilterItem(e) {
                    return e.filter(Boolean).map((e => this.filterItem(e))).join("")
                }
                static filterItem(e) {
                    return `<div class="filterItemBtn" data-filterItem="${e}">${e}<span class="itemImage"></span></div>`
                }
                static filterHeaderSections(e, t, r) {
                    return `<div class="${e}" data-filterHeader="${t}">${r}</div>`
                }
            },
            D = class {
                static buildSmartLimitOrder(e = !1) {
                    return `<div id="smart-order-body-limit" class="smart-order-body d-flex-column">\n                    ${L.smartOrderTypeHeader("Smart Limit Order")}\n                    ${L.productTypeOrderType("INTRADAY","so_orderTypeText")}\n                    ${L.inputBoxesWithoutTriggerComponent()}\n                    ${L.inputBoxesWithTriggerComponent()}\n                    ${L.actionAtEndTimecomponent()}\n                    ${e?L.executeImmediateComponent():""}\n                    ${L.advancedComponent("limit")}\n                </div>`
                }
                static buildSmartPeggedOrder() {
                    return `<div id="smart-order-body-pegged" class="smart-order-body d-flex-column">\n                    ${L.smartOrderTypeHeader("Smart Pegged Order")}\n                    ${L.productTypeOrderType("INTRADAY","so_orderTypeText")}\n                    ${L.inputBoxesWithoutTriggerComponent(!0)}\n                    ${L.peggedToComponent()}\n                    ${L.actionAtEndTimecomponent()}\n                    ${L.priceRangeComponent()}\n                    ${L.advancedComponent()}\n                </div>`
                }
                static buildSmartTrailOrder() {
                    return `<div id="smart-order-body-trail" class="smart-order-body d-flex-column">\n        ${L.smartOrderTypeHeader("Smart Trail Order")}\n        ${L.productTypeOrderType("INTRADAY","so_orderTypeText")}\n        ${L.inputBoxesWithoutTriggerComponent(!1,!0)}\n        ${L.inputBoxesWithTriggerComponentForTrailOrder()}\n        ${L.advancedComponent("trail")}\n    </div>`
                }
                static buildSmartStepOrder() {
                    return `<div id="smart-order-body-step" class="smart-order-body d-flex-column">\n        ${L.smartOrderTypeHeader("Smart Step Order")}\n        ${L.productTypeOrderType("INTRADAY","so_orderTypeText")}\n        ${L.stepOrderQtyInputBox()}\n        ${L.stepDirectionUpDown()}\n        ${L.stepOrderStartEndTimeInputBox()}\n        ${L.advancedComponent("step")}\n        ${L.stepAveragingStartsFrom()}\n        ${L.priceRangeComponent("step")}\n        ${L.stepOrderInitialQtyInputBox()}\n    </div>`
                }
                static buildSmartSipOrder() {
                    return `<div id="smart-order-body-sip" class="smart-order-body d-flex-column">\n        ${L.smartOrderTypeHeader("Smart Equity SIP")} \n        ${L.productTypeOrderType("CNC - Equity SIP","so_orderTypeText")}\n        ${L.qtyRowForSipOrder()}\n        ${L.sipOrderFrequencyRow()}\n        ${L.sipExecuteFirstRow()}\n        ${L.sipAdvancedComponent()}\n        </div>`
                }
                static buildOrderDetailSection(e, t, r) {
                    return L.smartOrderDetails(e, t, r)
                }
                static buildFilterUiComponent(e) {
                    return `\n         <div class="filterContainer" id="smartFilterModal">\n            ${L.createfilterModal(e)}\n         </div>`
                }
                static buildOrderBookUiComponent() {}
            },
            W = class {
                constructor() {
                    this.smartOrderBuildingBlocks = new F
                }
                static getSmartLimitOrderFrame() {
                    return D.buildSmartLimitOrder()
                }
                static getSmartPeggedOrderFrame() {
                    return D.buildSmartPeggedOrder()
                }
                static getSmartTrailOrderFrame() {
                    return D.buildSmartTrailOrder()
                }
                static getSmartStepOrderFrame() {
                    return D.buildSmartStepOrder()
                }
                static getSmartSipOrderFrame() {
                    return D.buildSmartSipOrder()
                }
                static getSmartOrdeBookFrame() {
                    D.buildOrderBookUiComponent()
                }
                static getSmartOrderDetails(e, t, r) {
                    return D.buildOrderDetailSection(e, t, r)
                }
                static getSmartFilterFrame(e) {
                    return D.buildFilterUiComponent(e)
                }
            };
        class q {
            static SmartOrdersEndpoints = {
                cancel_smart_order: globalConstants.dynamicUrl ? .smart_orders ? .cancel_smart_order || "https://api-t1.fyers.co.in/smart-order/cancel",
                modify_smart_order: globalConstants.dynamicUrl ? .smart_orders ? .modify_smart_order || "https://api-t1.fyers.co.in/smart-order/modify",
                order_book: globalConstants.dynamicUrl ? .smart_orders ? .order_book_v2 || "https://api-t1.fyers.co.in/smart-order/v2/orderbook",
                order_history: globalConstants.dynamicUrl ? .smart_orders ? .order_history || "https://api-t1.fyers.co.in/smart-order/history",
                pause_smart_order: globalConstants.dynamicUrl ? .smart_orders ? .pause_smart_order || "https://api-t1.fyers.co.in/smart-order/pause",
                resume_smart_order: globalConstants.dynamicUrl ? .smart_orders ? .resume_smart_order || "https://api-t1.fyers.co.in/smart-order/resume",
                smart_order_mpp: globalConstants.dynamicUrl ? .smart_orders ? .smart_order_mpp || "https://public.fyers.co.in/mpp_details/mpp_config.json",
                start_limit_order: globalConstants.dynamicUrl ? .smart_orders ? .start_limit_order || "https://api-t1.fyers.co.in/smart-order/limit",
                start_peg_order: globalConstants.dynamicUrl ? .smart_orders ? .start_peg_order || "https://api-t1.fyers.co.in/smart-order/peg",
                start_trail_order: globalConstants.dynamicUrl ? .smart_orders ? .start_trail_order || "https://api-t1.fyers.co.in/smart-order/trail",
                start_step_order: globalConstants.dynamicUrl ? .smart_orders ? .start_step_order || "https://api-t1.fyers.co.in/smart-order/step",
                start_sip_order: globalConstants.dynamicUrl ? .smart_orders ? .start_sip_order || "https://api-t1.fyers.in/smart-order/sip",
                mandate_redirectionUrl: globalConstants.dynamicUrl ? .smart_orders ? .funds_mandate_web || "https://fyers.in/web/funds"
            }
        }
        const V = q,
            N = class {
                constructor() {}
                static async smartLimitOrderPlacement(e) {
                    try {
                        return await t.sendRequest(`${V.SmartOrdersEndpoints.start_limit_order}`, "POST", e)
                    } catch (e) {
                        throw `Error while fetching smart orders: ${e}`
                    }
                }
                static async smartModifyOrderPlacement(e) {
                    const r = ie.getSmartOrderObject(e);
                    r.flowId = ie.getCustomData("#buyButton", "modifyid");
                    try {
                        return await t.sendRequest(`${V.SmartOrdersEndpoints.modify_smart_order}`, "PATCH", r)
                    } catch (e) {
                        throw `Error while fetching smart orders: ${e}`
                    }
                }
                static async smartPauseOrderPlacement(e) {
                    const r = {
                        flowId: e
                    };
                    try {
                        return await t.sendRequest(`${V.SmartOrdersEndpoints.pause_smart_order}`, "PATCH", r)
                    } catch (e) {
                        throw `Error while fetching smart orders: ${e}`
                    }
                }
                static async smartCancelOrderPlacement(e) {
                    const r = {
                        flowId: e
                    };
                    try {
                        return await t.sendRequest(`${V.SmartOrdersEndpoints.cancel_smart_order}`, "DELETE", r)
                    } catch (e) {
                        throw `Error while fetching smart orders: ${e}`
                    }
                }
                static async smartResumeOrderPlacement(e) {
                    const r = {
                        flowId: e
                    };
                    try {
                        return await t.sendRequest(`${V.SmartOrdersEndpoints.resume_smart_order}`, "PATCH", r)
                    } catch (e) {
                        throw `Error while fetching smart orders: ${e}`
                    }
                }
                static async smartPeggedOrderPlacement(e) {
                    try {
                        return await t.sendRequest(`${V.SmartOrdersEndpoints.start_peg_order}`, "POST", e)
                    } catch (e) {
                        throw `Error while fetching smart orders: ${e}`
                    }
                }
                static async smartTrailOrderPlacement(e) {
                    try {
                        return await t.sendRequest(`${V.SmartOrdersEndpoints.start_trail_order}`, "POST", e)
                    } catch (e) {
                        throw `Error while fetching smart orders: ${e}`
                    }
                }
                static async smartStepOrderPlacement(e) {
                    try {
                        return await t.sendRequest(`${V.SmartOrdersEndpoints.start_step_order}`, "POST", e)
                    } catch (e) {
                        throw `Error while fetching smart orders: ${e}`
                    }
                }
                static async smartSipOrderPlacement(e) {
                    try {
                        return await t.sendRequest(`${V.SmartOrdersEndpoints.start_sip_order}`, "POST", e)
                    } catch (e) {
                        throw `Error while fetching smart orders: ${e}`
                    }
                }
                static async getSmartOrderBook() {
                    try {
                        smartOrders.orderBookLoading = !0;
                        let e = smartOrders.filterOrderBookParams ? `${V.SmartOrdersEndpoints.order_book}?page_no=${smartOrders.currentPage}${smartOrders.filterOrderBookParams}` : `${V.SmartOrdersEndpoints.order_book}?page_no=${smartOrders.currentPage}`;
                        return e += `${smartOrders.sorting.sortingParams}`, await t.sendRequest(e, "GET")
                    } catch (e) {
                        throw `Error While getting data of smart orderBook: ${e}`
                    }
                }
                static async getSmartOrderHistory(e, r) {
                    try {
                        const a = 7 === r;
                        return await t.sendRequest(`${V.SmartOrdersEndpoints.order_history}?flowId=${e}&page_size=200&is_sip=${a}`, "GET")
                    } catch (e) {
                        throw `Error While getting data of smart orderHistory: ${e}`
                    }
                }
            },
            Q = class {
                constructor() {}
                static getSmartOrderBookModel() {
                    return `\n       <div id="soHistoryWindow" class="so_history_parent_container">\n       ${this.getSmartHistoryHeadingConatiner()}\n       ${this.smartOrderHistoryTable()}\n       </div>\n       `
                }
                static getSmartHistoryHeadingConatiner() {
                    return '\n        <div class="so_history_heading-container">\n            <div class="so_history_headingPara">\n                <div class="so_history_heading">\n                    <div class="smartImage"></div>Orders\n                </div>\n            </div>\n            <div class="d-flex headerEndSection">\n                <div class="smartFilterIconForOrderBook" id="smartFilterIcon"></div>\n                <button id="closeSmartHistory" class="so_history_closeImage"></button>\n            </div>\n        </div>'
                }
                static smartOrderHistoryTable() {
                    return `\n        <div class="so_history_table-container">\n        <table class="so_history_table">\n        ${this.getSmartOrderHistoryTableHeading()}\n        <tbody id="so_orderBook_table_body">\n         ${this.getSmartOrderHistoryTableBodyRow()}\n        </tbody>  \n        </table>\n        </div>\n        `
                }
                static getSmartOrderHistoryTableHeading() {
                    return '<thead class="sticky-top">\n    <tr class="so_history_tableHead">\n        <th id="symbolSorting"  class="so_history_th sob_symbol_col">Symbol  <img  src="https://assets.fyers.in/orderWindow/smartOrders/sorting.svg" alt=""></th>\n        <th class="so_history_th sob_orderType_col">Order Type</th>\n        <th class="so_history_th sob_orderType_side">Side</th>\n        <th class="so_history_th sob_orderType_product">Product</th>\n        <th class="so_history_th sob_totQty_col">Qty/Amt</th>\n        <th class="so_history_th sob_plcdQty_col">Placed qty</th>\n        <th class="so_history_th sob_ltp_col">LTP</th>\n        <th id="createdSorting"  class="so_history_th sob_time_col">Created <img  src="https://assets.fyers.in/orderWindow/smartOrders/sorting.svg" alt=""></th>\n        <th id="updatedSorting" class="so_history_th sob_time_col">Updated <img  src="https://assets.fyers.in/orderWindow/smartOrders/sorting.svg" alt=""></th>\n        <th class="so_history_th sob_status_col">Status</th>\n    </tr>\n       </thead>'
                }
                static getSmartOrderHistoryTableBodyRow(e) {
                    try {
                        const t = e || P.getState().orderBook.orderBookData;
                        return R.checkIfArrayDataPresent(t) ? t.map((e => {
                            let t = R.getSegmentCode(e ? .symbol);
                            const r = "BUY" === ie.getBuySellSideInString(e ? .side) ? "so_history_orderType_buy" : "so_history_orderType_sell";
                            return `\n            <tr class="so_history_dataRow" data-flowId="${e?.flowId}" data-orderStatus="${e?.messageType}">\n                <td class="so_history_td sob_symbol_col">${F.getSmartOrderHistorySymbolContainer(e?.symbol.split(":")[1],e?.description,e?.symbol.split(":")[0])}</td>\n                <td class="so_history_td sob_orderType_col so_history_orderType_textStyle">${this.getOrderTypeContainer(e)}</td>\n                <td class="so_history_td sob_orderType_side so_history_orderType_textStyle ${r}">${ie.getBuySellSideInString(e?.side)}</td>\n                <td class="so_history_td sob_orderType_product so_history_orderType_textStyle">${e?.product}</td>\n                <td class="so_history_td sob_totQty_col so_history_qty_text">${0===e?.totqty?`₹${e?.amount}`:e?.totqty}</td>\n                <td class="so_history_td sob_plcdQty_col so_history_placedQty">${e?.totplcqty}</td>\n                <td class="so_history_td so_history_qty_text sob_ltp_col" data-smartscriptltp="${e?.symbol}">${F.getSmartOredrHistoryLtpContainer(e?.ltp,e?.chp,t)}</td>\n                <td class="so_history_td sob_time_col flex flex-col">${this.getCreatedTimeElementForOrderBook(e)}</td>\n                <td class="so_history_td sob_time_col flex flex-col">${this.getUpdatedTimeElementForOrderBook(e)}</td>\n                <td class="so_history_td sob_status_col so_history_statusContainer">${F.getSmartOrderBookStatusAndHoverContainer(e?.messageType)}</td>\n            </tr>`
                        })).join("") : this.getEmptySmartItemsUiForFiltersAndSmartBook(I.EMPTY_SMART)
                    } catch (e) {
                        console.log(e)
                    }
                }
                static getCreatedTimeElementForOrderBook(e) {
                    try {
                        const t = R.getDateAndTimeFromEpoch(e ? .created_at, !0);
                        return `\n            <div">${R.getDateAndTimeFromEpoch(e?.created_at,!1,!0)}</div>\n            <div id="createdTimeSmartOrder">${t}</div>\n            `
                    } catch (e) {
                        return console.log(e), ""
                    }
                }
                static getUpdatedTimeElementForOrderBook(e) {
                    try {
                        const t = R.getDateAndTimeFromEpoch(e ? .updated_at, !0);
                        return `\n            <div">${R.getDateAndTimeFromEpoch(e?.updated_at,!1,!0)}</div>\n            <div id="updatedTimeSmartOrder">${t}</div>\n            `
                    } catch (e) {
                        return console.log(e), ""
                    }
                }
                static getOrderTypeContainer(e) {
                    return `<div class="so_history_orderType_smartOrder">${R.getSmartOrderType(e?.flowtype)}</div>`
                }
                static getEmptySmartItemsUiForFiltersAndSmartBook(e) {
                    const t = I.emptyObject[e];
                    return `<tr class="so_history_dataRow" rowspan="4">\n                    <td colspan='6'>\n                        <div class="emtptySmartItemsWrapper">\n                            <div class="${t.emptyImageWrapper}"><img src="${t.emptyIcon}" alt="${t.emptyDescription}" height="90" width="90" /></div>\n                            <div class="emptySmartContent">${t.content}</div>\n                            <div class="emptySmartSubContent">${t.subContent}<div/>\n                        </div>\n                    </td>\n                </tr>`
                }
                static updatetableData() {}
            },
            H = class {
                static setOrderBookData = e => ({
                    type: o,
                    payload: e
                });
                static setOrderBookDataWithKey = e => ({
                    type: l,
                    payload: e
                });
                static setFilterSelectedValues = e => ({
                    type: n,
                    payload: e
                });
                static resetFilterSelectedValues = () => ({
                    type: d
                });
                static filterSelectedState = e => ({
                    type: c,
                    payload: e
                })
            };
        class U {
            static selectedValue = {};
            static selectedStatus = !1;
            static attachFilterUiToModal() {
                let e = P.getState().orderBook.orderBookData;
                const t = W.getSmartFilterFrame(e);
                $(".so_history_heading-container").append(t), this.handleFileterTheme(), this.attachEventListnersForFilterModal(), this.updateFilterBasedOnState()
            }
            static handleFileterTheme() {
                $(".so_history_parent_container").hasClass("so_history_parent_container-dark") ? $("#smartFilterModal").addClass("filterContainerDark") : $("#smartFilterModal").removeClass("filterContainerDark")
            }
            static updateFilterBasedOnState() {
                let e = P.getState().orderBook.selectedFilterData;
                for (const [t, r] of Object.entries(e))
                    for (const e of r) $('[data-filteritem="' + e + '"]').toggleClass("filterBtnSelected")
            }
            static attachEventListnersForFilterModal() {
                $(".filterItemBtn").off().on("click", (function() {
                    $(this).toggleClass("filterBtnSelected"), U.updateSelectedValues()
                })), $("#filterCrossBtn").off().on("click", (function() {
                    $("#smartFilterModal").remove()
                })), $("#filterReset").off().on("click", (function() {
                    $(".filterItemBtn").removeClass("filterBtnSelected"), U.updateSelectedValues(), smartOrders.filterOrderBookParams = ""
                })), $("#filterApply").off().on("click", (function() {
                    $("#smartFilterModal").remove(), U.updateRowsOfFilterBookBasedOnFiltersNew(), K.initiateSmartOrderHistoryEvents()
                }))
            }
            static updateSelectedValues() {
                let e = {};
                this.selectedStatus = !1, $(".filterBox").each((function() {
                    var t = $(this).find(".filterBoxHeader").data("filterheader"),
                        r = [];
                    $(this).find(".filterBtnSelected").each((function() {
                        r.push($(this).data("filteritem"))
                    })), r.length && !U.selectedStatus && (U.selectedStatus = !0), e[t] = r
                })), P.dispatch(H.filterSelectedState(U.selectedStatus)), this.selectedValue = e
            }
            static updateRowsOfFilterBookBasedOnFilters(e = !1) {
                try {
                    this.handleSelectedFilterStateIcon(), P.dispatch(H.setFilterSelectedValues(this.selectedValue));
                    const t = P.getState().orderBook.selectedFilterData,
                        r = P.getState().orderBook.orderBookData;
                    let a;
                    if (a = this.getFilterSelectedState() ? this.filterData(r, t) : r, e) return a;
                    this.updateSmartOrderBook(a)
                } catch (e) {
                    console.log(e)
                }
            }
            static updateRowsOfFilterBookBasedOnFiltersNew() {
                this.handleSelectedFilterStateIcon(), P.dispatch(H.setFilterSelectedValues(this.selectedValue));
                const e = P.getState().orderBook.selectedFilterData;
                P.getState().orderBook.orderBookData, $(".so_history_dataRow").remove(), G.unSubscribeSmartOrderStocksLTP(), P.dispatch(H.setOrderBookData({})), P.dispatch(H.setOrderBookDataWithKey({})), smartOrders.currentPage = 1, smartOrders.orderBookLoading = !1, smartOrders.paginationFlag = !1, smartOrders.furtherPageEmpty = !1, this.getFilterSelectedState() ? (R.makeOrderBookQueryParamsUrl(e), smartOrders.filterOrdersFlag = !0, G.displaySmartOrderBook()) : (smartOrders.filterOrdersFlag = !0, smartOrders.filterOrderBookParams = "", G.displaySmartOrderBook())
            }
            static updateSmartOrderBook(e) {
                let t = null;
                t = R.checkIfArrayDataPresent(e) ? Q.getSmartOrderHistoryTableBodyRow(e) : Q.getEmptySmartItemsUiForFiltersAndSmartBook(I.EMPTY_FILTER), $(".so_history_dataRow").remove(), $(".so_history_table tbody").append(t)
            }
            static filterData = (e, t) => e.filter((e => {
                if (t.exchange.length > 0) {
                    const r = e.symbol.split(":")[0];
                    if (!t.exchange.includes(r)) return !1
                }
                if (t.side.length > 0) {
                    let r = 1 === e.side ? "Buy" : "Sell";
                    if (!t.side.includes(r)) return !1
                }
                if (t.productType.length > 0 && !t.productType.includes(e.product)) return !1;
                if (t.smartOrderStatus.length > 0) {
                    const r = I.statusMapper[e.messageType];
                    if (!t.smartOrderStatus.includes(r)) return !1
                }
                if (t.smartOrderType.length > 0) {
                    const r = I.soTypeMapper[e.flowtype];
                    if (!t.smartOrderType.includes(r)) return !1
                }
                return !0
            }));
            static handleSelectedFilterStateIcon() {
                this.getFilterSelectedState() ? $("#smartFilterIcon").addClass("smartFilterIconSelectedForOrderBook") : $("#smartFilterIcon").removeClass("smartFilterIconSelectedForOrderBook")
            }
            static getFilterSelectedState() {
                return P.getState().orderBook.filterSelectedState
            }
        }
        const z = U,
            G = class {
                constructor() {
                    this.smartOrderQuotesSupplierUniqueId = FyTrade.helper.createGuid("bqsu_"), this.orderHistoryFromApi = null, this.smartOrderUniqueScripts = [], this.orderHistoryFromApiWithKey = new Map, this.currentPage = 1
                }
                static toShowSmartOrderBook() {
                    return !(smartOrders.furtherPageEmpty && !smartOrders.sorting.sortingFlag || smartOrders.smartOrderBookOpen && !smartOrders.paginationFlag && !smartOrders.filterOrdersFlag && !smartOrders.sorting.sortingFlag)
                }
                static async displaySmartOrderBook(e) {
                    const t = this;
                    try {
                        if (!t.toShowSmartOrderBook()) return;
                        let e = await N.getSmartOrderBook();
                        smartOrders.totalOrders = e.count, smartOrders.orderBookLoading = !1, smartOrders.smartOrderBookOpen = !0, t.orderHistoryFromApi = e.orderBook, 0 === t.orderHistoryFromApi ? .length && (smartOrders.furtherPageEmpty = !0), t.handleReduxStoreOperations(smartOrders.paginationFlag, smartOrders.sorting.sortingFlag);
                        const r = smartOrders.paginationFlag || smartOrders.filterOrdersFlag || smartOrders.sorting.sortingFlag ? z.updateRowsOfFilterBookBasedOnFilters(!0) : null;
                        t.appendOrUpdateOrderBookToUI(r, !!smartOrders.paginationFlag || !!smartOrders.filterOrdersFlag || !!smartOrders.sorting.sortingFlag), !smartOrders.filterOrdersFlag && P.dispatch(H.resetFilterSelectedValues()), orderWindow.theme.applyTheme(), t.subscribeSmartOrderStocksLTP(t.smartOrderUniqueScripts)
                    } catch (e) {
                        console.log(e)
                    }
                }
                static handleReduxStoreOperations(e = !1, t = !1) {
                    try {
                        const t = this,
                            r = P.getState().orderBook.orderBookData;
                        e ? t.updateOrderBookData(r) : t.initializeOrderBookData(), t.updateOrderBookDataWithKey(), t.updateSmartOrderUniqueScripts()
                    } catch (e) {
                        console.log(e)
                    }
                }
                static initializeOrderBookData() {
                    P.dispatch(H.setOrderBookData(this.orderHistoryFromApi))
                }
                static updateOrderBookData(e) {
                    const t = this,
                        r = [...e, ...t.orderHistoryFromApi];
                    t.orderHistoryFromApi = r, P.dispatch(H.setOrderBookData(t.orderHistoryFromApi))
                }
                static updateOrderBookDataWithKey() {
                    const e = this;
                    e.orderHistoryFromApiWithKey = e.makeMapForOrderBookdata(), P.dispatch(H.setOrderBookDataWithKey(e.orderHistoryFromApiWithKey))
                }
                static updateSmartOrderUniqueScripts() {
                    this.smartOrderUniqueScripts = this.makeDistinctScriptsFromOrderBookApi(P.getState().orderBook.orderBookData)
                }
                static sortOrderBookDataIfRequired(e) {
                    try {
                        return smartOrders.sorting.symbolSortingFlag ? this.sortBasedOnSymbolName(e) : smartOrders.sorting.createdSortingFlag ? this.sortBasedOnCreatedTime(e) : this.sortBasedOnUpdatedTime(e)
                    } catch (t) {
                        return console.log(t), e
                    }
                }
                static sortBasedOnSymbolName(e) {
                    const t = 1 === smartOrders.sorting.symbolSorting ? 1 : -1;
                    return e.sort(((e, r) => {
                        let a = e.symbol.split(":")[1],
                            i = r.symbol.split(":")[1];
                        return a.localeCompare(i) * t
                    }))
                }
                static sortBasedOnCreatedTime(e) {
                    const t = 1 === smartOrders.sorting.createdSorting ? -1 : 1;
                    return e.sort(((e, r) => (e.created_at - r.created_at) * t))
                }
                static sortBasedOnUpdatedTime(e) {
                    const t = 1 === smartOrders.sorting.updatedSorting ? 1 : -1;
                    return e.sort(((e, r) => (e.updated_at - r.updated_at) * t))
                }
                static makeDistinctScriptsFromOrderBookApi(e) {
                    try {
                        let t = [];
                        for (let r = 0; r < e.length; r++) 0 === r ? t.push(e[r] ? .symbol) : t.includes(e[r] ? .symbol) || t.push(e[r] ? .symbol);
                        return t
                    } catch (e) {
                        console.log(e)
                    }
                }
                static subscribeSmartOrderStocksLTP(e) {
                    try {
                        this.unSubscribeSmartOrderStocksLTP(), FyTrade.subscribeQuotesRtData(e, e, this.subscribeSmartStocksLTPCallback, this.smartOrderQuotesSupplierUniqueId)
                    } catch (e) {
                        console.log(e)
                    }
                }
                static unSubscribeSmartOrderStocksLTP() {
                    FyTrade.unsubscribeQuotesRtData(this.smartOrderQuotesSupplierUniqueId)
                }
                static subscribeSmartStocksLTPCallback(e) {
                    try {
                        for (let t = 0; t < e.length; t++) {
                            const r = e[t].symbol.replace(":", "\\:");
                            if ($(`[data-smartscriptltp=${r}]`).length) {
                                let a = 12 === R.getSegmentCode(e[t].symbol) ? 4 : 2;
                                $(`[data-smartscriptltp=${r}]`).each((function() {
                                    const r = e[t] ? .v ? .cmd ? .ltpFromSource,
                                        i = Number(e[t] ? .v ? .chp),
                                        s = $(this).find(".so_ltpText"),
                                        o = $(this).find(".so_ltpIconImg");
                                    r && (s.text(r.toFixed(a)), s.toggleClass("so_ltpTextColorRed", i < 0), s.toggleClass("so_ltpTextColorGreen", i > 0), s.toggleClass("so_ltpTextColorGrey", 0 == i), o.toggleClass("so_ltpRedIcon", i < 0), o.toggleClass("so_ltpGreenIcon", i > 0), o.toggleClass("so_ltpGreyIcon", 0 == i))
                                }));
                                let i = $(`[data-smartScriptChange=${r}]`);
                                if (i.length) {
                                    const r = e[t] ? .v ? .change,
                                        s = e[t] ? .v ? .change_percent;
                                    i.text(`${r.toFixed(a)} (${s.toFixed(a)}%)`)
                                }
                            }
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }
                static appendOrUpdateOrderBookToUI(e = null, t = !1) {
                    if (t) {
                        let t = Q.getSmartOrderHistoryTableBodyRow(e);
                        $(".so_history_dataRow").remove(), $(".so_history_table tbody").append(t)
                    } else {
                        const e = Q.getSmartOrderBookModel();
                        !$("#soHistoryWindow").length && $(document.body).append(e)
                    }
                    K.initiateSmartOrderHistoryEvents()
                }
                static updateOrderBookdataFromSocket(e) {
                    const t = e ? .smart_orders_all ? .flowId;
                    if (t) {
                        const r = this.orderBookObjectCreater(e);
                        let a = P.getState().orderBook.orderBookData,
                            i = P.getState().orderBook.orderBookDataWithKey;
                        i[t] = r, a = Object.values(i), a = this.sortOrderBookDataIfRequired(a), P.dispatch(H.setOrderBookData(a)), P.dispatch(H.setOrderBookDataWithKey(i));
                        const s = z.updateRowsOfFilterBookBasedOnFilters(!0);
                        this.appendOrUpdateOrderBookToUI(s, !0)
                    }
                }
                static makeMapForOrderBookdata() {
                    return P.getState().orderBook.orderBookData.reduce(((e, t) => (e[t.flowId] = t, e)), {})
                }
                static orderBookObjectCreater(e) {
                    const t = e ? .smart_orders_all,
                        r = t ? .payload;
                    return {
                        flowId: t ? .flowId,
                        Step_up_freq: r ? .Step_up_freq,
                        amount: r ? .amount,
                        exp_amount: r ? .exp_amount,
                        exp_qty: r ? .exp_qty,
                        freq: r ? .freq,
                        imd_start: r ? .imd_start,
                        sip_date: r ? .sip_date,
                        sip_day: r ? .sip_day,
                        sip_time: r ? .sip_time,
                        step_up_amount: r ? .step_up_amount,
                        step_up_qty: r ? .step_up_qty,
                        schedule_date_time: r ? .sip_scheduled_time,
                        flowtype: t ? .flowtype,
                        fyId: t ? .fyId,
                        timestamp: t ? .timestamp,
                        userTag: t ? .usertag,
                        end: r ? .end,
                        messageType: t ? .messageType,
                        symbol: r ? .symbol,
                        description: r ? .description,
                        fytoken: r ? .fytoken,
                        ordtype: r ? .ordtype,
                        pauseresumeind: r ? .pauseresumeind,
                        product: r ? .product,
                        side: 7 === t ? .flowtype ? 1 : r ? .side,
                        totqty: r ? .totqty,
                        tradedQty: r ? .tradedQty,
                        on_exp: r ? .on_exp,
                        remqty: r ? .remqty,
                        totplcqty: r ? .totplcqty,
                        mpp: r ? .mpp,
                        mpp_type: r ? .mpp_type,
                        avgPrice: r ? .avgPrice,
                        jump_diff: r ? .jump_diff,
                        rejQty: r ? .rejQty,
                        canQty: r ? .canQty,
                        validity: r ? .validity,
                        interval: r ? .interval,
                        direction: r ? .direction,
                        peg: r ? .peg,
                        offset: r ? .offset,
                        created_at: t ? .createdAt,
                        updated_at: t ? .timestamp,
                        hpr: r ? .hpr,
                        lpr: r ? .lpr,
                        price: r ? .price,
                        openQty: r ? .openQty,
                        trigprice: r ? .trigprice,
                        avgqty: r ? .avgqty,
                        avgdiff: r ? .avgdiff,
                        start: r ? .start,
                        initQty: r ? .initQty,
                        target_price: r ? .target_price,
                        ltp: FyTrade.data.symbolPriceDict[r ? .symbol] ? .v.cmd.c ? FyTrade.data.symbolPriceDict[r ? .symbol].v.cmd.c : 0,
                        ch: FyTrade.data.symbolPriceDict[r ? .symbol] ? .v.ch ? FyTrade.data.symbolPriceDict[r ? .symbol].v.ch : 0,
                        chp: FyTrade.data.symbolPriceDict[r ? .symbol] ? .v.chp ? FyTrade.data.symbolPriceDict[r ? .symbol].v.chp : 0
                    }
                }
            },
            j = class {
                static addValidation(e, t, r) {
                    const a = orderWindow.owModal.alertComponent(e, t);
                    orderWindow.common.addValidationResult(r, a)
                }
                static removeValidation(e, t) {
                    orderWindow.common.removeValidationResult(t, e)
                }
                static removeAllMaxMinPriceLimitValidations() {
                    $("#smartLimitMaxPriceBox").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.maxPriceMultiples(R.getPriceTickSize())), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.minPriceMultiples(R.getPriceTickSize())), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.maxPriceGreaterLimit), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.minPriceLowerLimit)
                }
                static removeSmartTrailTargetPriceValidation() {
                    orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.targetPriceMultiples(R.getPriceTickSize())), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.targetGreaterLTP), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.targetLowerLTP)
                }
                static removeSmartTrailJumpPriceValidation() {
                    const e = R.getPriceTickSize(),
                        t = parseFloat(20 * e);
                    orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.jumpMultiples(e)), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.minJumpPrice(t))
                }
                static removeSmartTrailLimitPriceValidation(e) {
                    orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.limitmultiples(R.getPriceTickSize())), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stoplesslimit), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stopgreaterlimit), orderWindow.common.removeValidationResult(orderWindow.alertMessages, I.alertBarMessages.ALERT_MESSAGES.nseLimit(e))
                }
                static removeSmartTrailTriggerPriceValidation() {
                    orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.triggerMultiples(R.getPriceTickSize())), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stopgreaterLTP), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stoplowerLTP), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stoplesslimit), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stopgreaterlimit)
                }
                static validateStartAndEndTimeErrorMessage() {
                    if (R.getTimeInTotalMinutes("smartStepStartTime") >= R.getTimeInTotalMinutes("smartLimitEndTime")) {
                        $("#smartLimitEndTime").addClass("input-field-error"), $("#smartStepStartTime").addClass("input-field-error");
                        const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.startTimeLessEndTime);
                        orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                    } else $("#smartLimitEndTime").removeClass("input-field-error"), $("#smartStepStartTime").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.startTimeLessEndTime);
                    K.smartStartTimeValidation()
                }
                static removeHprValidations() {
                    $("#priceRangeHigh").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.highMultiples), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.highGreaterThanLow)
                }
                static removeLprValidatios() {
                    $("#priceRangeLow").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.lowMultiples), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.highGreaterThanLow)
                }
                static removeMppvalidations() {
                    $("#mppQtyBox").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.mppRangeBreached(R.getMppDataToPrefill().min, R.getMppDataToPrefill().max))
                }
                static removeSmartStepAvgQtyValidation() {
                    $("#smartStepAvgQty").removeClass("input-field-error"), $("#smartLimitQty").removeClass("input-field-error"), $("#smartStepInitialQty").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.avgQtyMultiples), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stepAverageQtyLessThan)
                }
                static removeSmartStepAvgEntryDiffQtyValidation() {
                    $("#smartStepAvgEntryDiffQty").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stepAverageEntryMinimum(R.getPriceTickSize())), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stepAverageEntryMultiples(R.getPriceTickSize()))
                }
                static removeSmartStepInitialQtyValidation() {
                    $("#smartStepInitialQty").removeClass("input-field-error"), $("#smartLimitQty").removeClass("input-field-error"), $("#smartStepAvgQty").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.initialQtyMultiples), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.initialQtyLessThanTotalQty)
                }
                static removeSmartStepLimitPriceFieldValidation() {
                    $("#smartStepLimitPriceField").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.limitmultiples(R.getPriceTickSize()))
                }
                static removeSmartLimitTriggerPriceFieldValidation() {
                    $("#smartLimitTriggerPriceField").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.triggerMultiples(R.getPriceTickSize())), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stoplowerLTP), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stopgreaterlimit), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stopgreaterLTP), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stoplesslimit)
                }
                static handleInitialStepValidation() {
                    K.handleMarketOrderInfoMessage(), K.handleSmartValidations("smartLimitQty"), K.handleSmartValidations("smartStepAvgQty"), K.handleSmartValidations("smartStepAvgEntryDiffQty"), K.handleSmartValidations("smartStepStartTime"), K.handleSmartValidations("smartLimitEndTime"), K.handleSmartValidations("smartStepInitialQty"), K.handleSmartValidations("smartStepAvgQty"), K.handleSmartValidations("smartStepAvgEntryDiffQty"), K.handleSmartValidations("smartStepLimitPriceField"), K.handleSmartValidations("priceRangeHigh"), K.handleSmartValidations("priceRangeLow"), K.handleSmartValidations("mppQtyBox")
                }
                static handleInitialSipValidation() {
                    K.handleSmartValidations("smartLimitQty"), K.handleSmartValidations("priceRangeHigh"), K.handleSmartValidations("priceRangeLow"), K.handleSmartValidations("sipExpiryInputId"), K.handleSmartValidations("stepUpQuantityInputId"), this.validateSipFrequencyCustomValue()
                }
                static handleInitialTrailValidation() {
                    K.handleMarketOrderInfoMessage(), K.handleSmartValidations("smartLimitQty"), K.handleSmartValidations("smartTrailLimitPriceField"), K.handleSmartValidations("smartTrailTriggerPrice"), K.handleSmartValidations("smartTrailJumpPriceField"), K.handleSmartValidations("smartTrailTragetPriceBox"), K.handleSmartValidations("mppQtyBox")
                }
                static handleInitialLimitValidation() {
                    K.handleSmartValidations("smartLimitQty"), K.handleSmartValidations("smartLimitTriggerPriceField"), K.handleSmartValidations("smartLimitPriceField"), K.handleSmartValidations("smartLimitMaxPriceBox"), K.handleSmartValidations("mppQtyBox")
                }
                static validateSmartSipAmount(e, t) {
                    const r = ie.getLtpPrice(),
                        a = 500 >= r ? 500 : r;
                    if (e < a) {
                        $("#smartLimitQty").addClass("input-field-error");
                        const e = 500 === a ? I.alertBarMessages.ERROR_MESSAGES.sipLess500 : I.alertBarMessages.ERROR_MESSAGES.sipLessLtp,
                            t = orderWindow.owModal.alertComponent("error", e);
                        orderWindow.common.addValidationResult(orderWindow.errorMessages, t)
                    }
                    e >= a && ($("#smartLimitQty").removeClass("input-field-error"), re.handleMarginForSipAmount(), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.sipLess500), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.sipLessLtp))
                }
                static validateSipStepUpValue(e) {
                    if (!e || e <= 0) {
                        const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.sipStepUpVal);
                        orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                    } else orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.sipStepUpVal)
                }
                static validateSipExpiryInputValue(e = null) {
                    const t = parseInt($("#smartLimitQty").val());
                    if (!R.getRadioButtonCheckedOrNot("sipExpirySlider")) return orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.sipExpiryQty(t)), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.sipExpiryAmount(t)), void orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.expiryWeekend);
                    if (R.getSipQtyButtonActive() && $("#sipExpiryAmountButton").hasClass("so_qtyAmountSwapParentConatinerActive"))
                        if (orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.sipExpiryAmount(t)), !e || e <= t) {
                            const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.sipExpiryQty(t));
                            orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                        } else orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.sipExpiryQty(t));
                    else if (R.getSipAmountButtonActive() && $("#sipExpiryAmountButton").hasClass("so_qtyAmountSwapParentConatinerActive"))
                        if (orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.sipExpiryQty(t)), !e || e <= t) {
                            const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.sipExpiryAmount(t));
                            orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                        } else orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.sipExpiryAmount(t));
                    else if (R.getSipExpiryConditionToVaidateDate) {
                        orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.sipExpiryQty(t)), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.sipExpiryAmount(t)), e = $("#sipExpiryInputId").val();
                        const r = new Date(e).getDay();
                        if (0 === r || 6 === r) {
                            const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.expiryWeekend);
                            orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                        } else orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.expiryWeekend)
                    }
                }
                static validateSipFrequencyCustomValue(e = null) {
                    const t = $("#sipFrequencyInput").val(),
                        r = I.alertBarMessages.ERROR_MESSAGES.frequencyWeekend;
                    if ("Custom" !== t) return void orderWindow.common.removeValidationResult(orderWindow.errorMessages, r);
                    const a = new Date(e).getDay();
                    if (0 === a || 6 === a) {
                        const e = orderWindow.owModal.alertComponent("error", r);
                        orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                    } else orderWindow.common.removeValidationResult(orderWindow.errorMessages, r)
                }
                static validateSipExpiryDate(e = null) {}
            },
            Y = class {
                static handleInitialSmartOrderValidation() {
                    this.handleInitialSmartLimitValidation(), this.handleInitialSmartTrailValidation(), this.handleInitialSmartStepValidation()
                }
                static handleInitialSmartLimitValidation() {
                    j.handleInitialLimitValidation()
                }
                static handleInitialSmartTrailValidation() {
                    j.handleInitialTrailValidation()
                }
                static handleInitialSmartStepValidation() {
                    j.handleInitialStepValidation()
                }
                static handleInitialSmartSipValidation() {
                    j.handleInitialSipValidation()
                }
            };
        class J {
            constructor() {}
            handleSmartModifyFromAccountManager(e) {
                re.handleSmartModifyFromAccountManager(e)
            }
            handlePriceBreakupPrice() {
                return ie.getPriceForPriceBreakup()
            }
            attachSmartMenuBannerClickEvent() {
                re.attachSmartBannerClickEvents()
            }
            handleSmartButtonClickEvent() {
                re.handleSmartButtonClickedEvent()
            }
            handleSmartModifyWindow(e) {
                try {
                    re.handleSmartOrderModify(e)
                } catch (e) {
                    console.log(e)
                }
            }
            handleDomAndOptionChainBuySellClick() {
                J.smartBackArrowEvent()
            }
            handleSmartOrderClone(e) {
                const t = R.orderObjMapperForInitOw(e);
                orderWindow.orderData.selectedSymbol = e ? .symbol, FyTrade.placeOrder(t), re.emptyAlertSectionBar(), re.addAsmGmCheckIfRequired(), re.handleSmartClone(e), setTimeout((() => {
                    $(".orderwindow-body .main-setting-modal").addClass("d-none")
                }), 10), smartOrders.smartOrderOpen = !0, R.hideMtfBanner(), setTimeout((() => {
                    R.stepOrderWindowOpen() && j.handleInitialStepValidation()
                }), 100), setTimeout((() => {
                    re.emptyAlertSectionBar(), R.sipOrderWindowOpen() && Y.handleInitialSmartSipValidation()
                }))
            }
            handleSmartOwCloseButton() {
                re.handleSmartOWCloseButton()
            }
            handleTradeInvestClick() {
                smartOrders.smartOrderMenuOpen = !1, re.undoSmartButtonClickEvent()
            }
            handleQtyAndLimPriceFromDomClick(e) {
                re.handleQtyAndLimPriceFromDomClick(e)
            }
            closeSmartOrderDisplay() {
                re.handleSmartButtonCloseEvent()
            }
            handleOrderSocketData(e = null) {
                smartOrders.smartOrderBookOpen && G.updateOrderBookdataFromSocket(e)
            }
            static handleCloseOrderBookEvent() {
                try {
                    $("#soHistoryWindow").remove(), smartOrders.smartOrderBookOpen = !1, G.unSubscribeSmartOrderStocksLTP(), this.resetStoreOrderBookData(), this.resetSmartOrderBookVariables()
                } catch (e) {
                    console.log(e)
                }
            }
            static resetStoreOrderBookData() {
                try {
                    P.dispatch(H.setOrderBookData({})), P.dispatch(H.setOrderBookDataWithKey({})), P.dispatch(H.filterSelectedState(!1)), P.dispatch(H.resetFilterSelectedValues())
                } catch (e) {
                    console.log(e)
                }
            }
            static resetSmartOrderBookVariables() {
                smartOrders.smartOrderBookOpen = !1, smartOrders.currentPage = 1, smartOrders.orderBookLoading = !1, smartOrders.paginationFlag = !1, smartOrders.furtherPageEmpty = !1, smartOrders.currentTotalOrders = 0, smartOrders.totalOrders = 0, smartOrders.filterOrderBookParams = "", smartOrders.filterOrdersFlag = !1, smartOrders.sorting = {
                    sortingFlag: !1,
                    sortingParams: "",
                    symbolSorting: -1,
                    createdSorting: -1,
                    updatedSorting: -1,
                    symbolSortingFlag: !1,
                    createdSortingFlag: !1,
                    updatedSortingFlag: !1
                }
            }
            static initiateSmartOrderHistoryEvents() {
                const e = this;
                $("#closeSmartHistory").unbind().click((() => {
                    e.handleCloseOrderBookEvent()
                })), $(".so_history_dataRow").off().hover((function() {
                    $(this).data("flowid");
                    const e = Number($(this).data("orderstatus"));
                    $(".so_history_parent_container").hasClass("so_history_parent_container-dark") ? $(this).css("background-color", "var(--Neutral-dark-dark50, #333)") : $(this).css("background-color", "var(--Neutral-blue-blue50, #F6F8FF)"), re.enableHoverButtons(this, e)
                }), (function() {
                    $(this).css("background-color", ""), re.disableHoverButtons(this)
                })).click((function(e) {
                    e.preventDefault();
                    const t = $(this).data("flowid");
                    $('[id="orderDetailsSideSection"]').remove(), re.attachOrderDetails(t)
                })), $("#soHistoryWindow").draggable({
                    disabled: !1,
                    containment: "window",
                    scroll: !1,
                    drag: function(e, t) {
                        "none" !== $(".so_history_parent_container").css("transform") && $(".so_history_parent_container").css("transform", "none");
                        let r = t.position;
                        $.cookie("owPosL", r.left), $.cookie("owPosT", r.top)
                    }
                }), $("#smartFilterIcon").off().on("click", (() => {
                    z.attachFilterUiToModal()
                })), $(".so_history_table-container").off("scroll").on("scroll", (() => {
                    re.handleScrollEventForSmartOrderBook()
                })), $("#symbolSorting").off().on("click", (() => {
                    this.handleSymbolSortingSmartOrderBook()
                })), $("#createdSorting").off().on("click", (() => {
                    this.handleCreatedSortingSmartOrderBook()
                })), $("#updatedSorting").off().on("click", (() => {
                    this.handleUpdatedSortingSmartOrderBook()
                }))
            }
            static handleSymbolSortingSmartOrderBook() {
                smartOrders.sorting.symbolSortingFlag = !0, 1 === smartOrders.sorting.symbolSorting ? smartOrders.sorting.symbolSorting = -1 : -1 === smartOrders.sorting.symbolSorting && (smartOrders.sorting.symbolSorting = 1), smartOrders.sorting.createdSortingFlag = !1, smartOrders.sorting.updatedSortingFlag = !1, smartOrders.sorting.createdSorting = -1, smartOrders.sorting.updatedSorting = -1, smartOrders.sorting.sortingParams = `&sort_by=Alphabet&ord_by=${smartOrders.sorting.symbolSorting}`, smartOrders.sorting.sortingFlag = !0, G.displaySmartOrderBook()
            }
            static handleCreatedSortingSmartOrderBook() {
                smartOrders.sorting.createdSortingFlag = !0, 1 === smartOrders.sorting.createdSorting ? smartOrders.sorting.createdSorting = -1 : -1 === smartOrders.sorting.createdSorting && (smartOrders.sorting.createdSorting = 1), smartOrders.sorting.updatedSortingFlag = !1, smartOrders.sorting.symbolSortingFlag = !1, smartOrders.sorting.symbolSorting = -1, smartOrders.sorting.updatedSorting = -1, smartOrders.sorting.sortingFlag = !0, smartOrders.sorting.sortingParams = `&sort_by=CreatedTime&ord_by=${smartOrders.sorting.createdSorting}`, G.displaySmartOrderBook()
            }
            static handleUpdatedSortingSmartOrderBook() {
                smartOrders.sorting.updatedSortingFlag = !0, 1 === smartOrders.sorting.updatedSorting ? smartOrders.sorting.updatedSorting = -1 : -1 === smartOrders.sorting.updatedSorting && (smartOrders.sorting.updatedSorting = 1), smartOrders.sorting.symbolSortingFlag = !1, smartOrders.sorting.createdSortingFlag = !1, smartOrders.sorting.symbolSorting = -1, smartOrders.sorting.createdSorting = -1, smartOrders.sorting.sortingFlag = !0, smartOrders.sorting.sortingParams = `&sort_by=UpdatedTime&ord_by=${smartOrders.sorting.updatedSorting}`, G.displaySmartOrderBook()
            }
            static displaySmartHistoryWindow() {
                smartOrderHistory.displaySmartOrderBook()
            }
            static enableBuySellButton() {}
            static handleIntialSmartValidations() {
                re.addAsmGmCheckIfRequired(), this.handleSmartLimitTextOnBuySellToggle(document.getElementById("order-toggle").classList)
            }
            handleExchangeToggle() {
                smartOrders.smartOrderOpen && ie.canWeShowMtfToClient() ? $("#so_mtf").removeClass("d-none") : $("#so_mtf").addClass("d-none")
            }
            handleBuySellToggle(e) {
                try {
                    J.handleSmartLimitTextOnBuySellToggle(e), orderWindow.handler.refreshPriceBreakup(), smartOrders.smartOrderOpen && re.handleInitialSmartOrderValidation(), orderWindow.events.getMarginForSmartOrders(), re.hideSmartSipFromSmartMenu()
                } catch (e) {
                    console.log(e)
                }
            }
            static handleSmartLimitTextOnBuySellToggle(e) {
                e.contains("buy") ? (R.getRadioButtonChecked("stepOrderUpSideDirection"), R.getRadioButtonUnChecked("stepOrderDownSideDirection"), $("#stepOrderUpSideDirection"), $(".smartTriggerBySell").text("Trigger Buy"), $(".smartLimitMaxPriceLabelText").text("Set Max Price"), $("#smartLimitMaxPriceBox").attr("placeholder", "Max Price")) : e.contains("sell") && (R.getRadioButtonChecked("stepOrderDownSideDirection"), R.getRadioButtonUnChecked("stepOrderUpSideDirection"), $(".smartTriggerBySell").text("Trigger Sell"), $(".smartLimitMaxPriceLabelText").text("Set Min Price"), $("#smartLimitMaxPriceBox").attr("placeholder", "Min Price"))
            }
            static handleInitialBuySellToggle(e) {
                try {
                    e.contains("buy") ? $(".smartTriggerBySell").text("Trigger Buy") : e.contains("sell") && $(".smartTriggerBySell").text("Trigger Sell")
                } catch (e) {
                    console.log(e)
                }
            }
            static handleAdvancedSectionToggle(e) {
                1 === e ? ($("#so_advancedContainer").addClass("d-none"), $("#so_advancedContainer").removeClass("d-flex")) : 2 === e && ($("#so_advancedContainer").removeClass("d-none"), $("#so_advancedContainer").addClass("d-flex"))
            }
            static handleSmartValidations(e) {
                let t = Number($(`#${e}`).attr("step")),
                    r = Number($(`#${e}`).val());
                const a = R.floatSafeRemainder(r, t),
                    i = ie.getNSEprescribedLimitsPerentage(R.getInstrumentCode()),
                    s = 100 * i,
                    o = parseFloat(ie.getLtpPrice()),
                    n = o + o * i,
                    d = o - o * i,
                    l = ie.getBuySellSide();
                switch (e) {
                    case "mppQtyBox":
                        if (R.checkIfMppValidationsIsRequired()) {
                            if (r = parseFloat($(`#${e}`).val()), !r || r > R.getMppDataToPrefill().max || r < R.getMppDataToPrefill().min) {
                                $("#mppQtyBox").addClass("input-field-error");
                                const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.mppRangeBreached(R.getMppDataToPrefill().min, R.getMppDataToPrefill().max));
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                            }(!(!r || r > R.getMppDataToPrefill().max || r < R.getMppDataToPrefill().min) || 0 === R.getMppDataToPrefill().min && 0 === r) && ($("#mppQtyBox").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.mppRangeBreached(R.getMppDataToPrefill().min, R.getMppDataToPrefill().max)))
                        } else j.removeMppvalidations();
                        break;
                    case "mppAdvancedToggle":
                        $("#customMppCheckBoxContainer").hasClass("invisible") && ($("#mppQtyBox").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.mppRangeBreached(R.getMppDataToPrefill().min, R.getMppDataToPrefill().max)));
                        break;
                    case "customMppCheckBox":
                        R.checkIfMppValidationsIsRequired() || j.removeMppvalidations();
                        break;
                    case "stepUpQuantityInputId":
                        j.validateSipStepUpValue(r);
                        break;
                    case "sipExpiryInputId":
                        j.validateSipExpiryInputValue(r);
                        break;
                    case "smartLimitQty":
                        if (R.sipOrderWindowOpen() && R.getSipAmountButtonActive()) orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.qtyMultiples), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.freezeQtyReached(R.getSmartMaxQtyLimit())), j.validateSmartSipAmount(r, t);
                        else {
                            if (orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.sipLess500), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.sipLessLtp), !r || r % t != 0 || r <= 0) {
                                $("#smartLimitQty").addClass("input-field-error");
                                const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.qtyMultiples);
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                            }
                            if (!r || r % t != 0 || r <= 0 || ($("#smartLimitQty").removeClass("input-field-error"), orderWindow.events.getMarginForSmartOrders(), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.qtyMultiples)), r > R.getSmartMaxQtyLimit()) {
                                const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.freezeQtyReached(R.getSmartMaxQtyLimit()));
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                            }
                            r > R.getSmartMaxQtyLimit() || orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.freezeQtyReached(R.getSmartMaxQtyLimit()))
                        }
                        break;
                    case "smartStepInitialQty":
                        if (R.checkIfInitialQtyValidationsIsRequired()) {
                            r = parseInt($("#smartStepInitialQty").val()), r += +parseInt($("#smartStepAvgQty").val());
                            const e = parseInt($("#smartLimitQty").val());
                            if (!r || r % t != 0 || r <= 0) {
                                $("#smartStepInitialQty").addClass("input-field-error");
                                const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.initialQtyMultiples);
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                            }
                            if (!r || r % t != 0 || r <= 0 || ($("#smartStepInitialQty").removeClass("input-field-error"), orderWindow.events.getMarginForSmartOrders(), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.initialQtyMultiples)), r && r > e) {
                                $("#smartStepInitialQty").addClass("input-field-error"), $("#smartLimitQty").addClass("input-field-error"), $("#smartStepAvgQty").addClass("input-field-error");
                                const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.initialQtyLessThanTotalQty);
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                            }
                            r && r <= e && ($("#smartStepInitialQty").removeClass("input-field-error"), $("#smartLimitQty").removeClass("input-field-error"), $("#smartStepAvgQty").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.initialQtyLessThanTotalQty))
                        } else j.removeSmartStepInitialQtyValidation();
                        break;
                    case "smartStepAvgQty":
                        if (R.checkIfAverageQtyValidationIsRequired()) {
                            r = parseInt($("#smartStepAvgQty").val()), r += +parseInt($("#smartStepInitialQty").val());
                            const e = parseInt($("#smartLimitQty").val());
                            if (!r || r % t != 0 || r <= 0) {
                                $("#smartStepAvgQty").addClass("input-field-error");
                                const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.avgQtyMultiples);
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                            }
                            if (!r || r % t != 0 || r <= 0 || ($("#smartStepAvgQty").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.avgQtyMultiples)), r > e) {
                                $("#smartStepAvgQty").addClass("input-field-error"), $("#smartLimitQty").addClass("input-field-error"), $("#smartStepInitialQty").addClass("input-field-error");
                                const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.stepAverageQtyLessThan);
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                            }
                            r <= e && ($("#smartStepAvgQty").removeClass("input-field-error"), $("#smartLimitQty").removeClass("input-field-error"), $("#smartStepInitialQty").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stepAverageQtyLessThan))
                        } else j.removeSmartStepAvgQtyValidation();
                        break;
                    case "smartStepAvgEntryDiffQty":
                        if (R.checkIfAverageEntryPriceValidationIsRequired()) {
                            const t = 20 * R.getPriceTickSize();
                            if (r = parseFloat(r), !Number.isInteger(a) || !r) {
                                $("#smartStepAvgEntryDiffQty").addClass("input-field-error");
                                const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.stepAverageEntryMultiples(R.getPriceTickSize()));
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                            }
                            if (Number.isInteger(a) && r && ($("#smartStepAvgEntryDiffQty").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stepAverageEntryMultiples(R.getPriceTickSize()))), r && r < t) {
                                $(`#${e}`).addClass("input-field-error");
                                const t = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.stepAverageEntryMinimum(R.getPriceTickSize()));
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, t)
                            }
                            r && r >= t && ($(`#${e}`).removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stepAverageEntryMinimum(R.getPriceTickSize())))
                        } else j.removeSmartStepAvgEntryDiffQtyValidation();
                        break;
                    case "smartLimitPriceField":
                        if (t = R.getPriceTickSize(), R.checkIfSmartLimitPricevalidationIsRequired) {
                            if (!Number.isInteger(a) || !r) {
                                $(`#${e}`).addClass("input-field-error");
                                const r = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.limitmultiples(t));
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, r)
                            }
                            if (Number.isInteger(a) && r && ($(`#${e}`).removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.limitmultiples(t))), R.getRadioButtonCheckedOrNot("triggerPriceCheckBox")) {
                                if (1 === ie.getBuySellSide() && r <= Number($("#smartLimitTriggerPriceField").val())) {
                                    const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.stoplesslimit);
                                    orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                                }
                                if (1 === ie.getBuySellSide() && r > Number($("#smartLimitTriggerPriceField").val()) && orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stoplesslimit), -1 === ie.getBuySellSide() && r >= Number($("#smartLimitTriggerPriceField").val())) {
                                    const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.stopgreaterlimit);
                                    orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                                } - 1 === ie.getBuySellSide() && r < Number($("#smartLimitTriggerPriceField").val()) && orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stopgreaterlimit)
                            }
                            if (s)
                                if (r > n || r < d) {
                                    const e = orderWindow.owModal.alertComponent("alert", I.alertBarMessages.ALERT_MESSAGES.nseLimit(s));
                                    orderWindow.common.addValidationResult(orderWindow.alertMessages, e)
                                } else orderWindow.common.removeValidationResult(orderWindow.alertMessages, I.alertBarMessages.ALERT_MESSAGES.nseLimit(s))
                        } else $("#smartLimitPriceField").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.limitmultiples(R.getPriceTickSize())), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stoplesslimit), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stopgreaterlimit), orderWindow.common.removeValidationResult(orderWindow.alertMessages, I.alertBarMessages.ALERT_MESSAGES.nseLimit(s));
                        break;
                    case "smartStepLimitPriceField":
                        if (R.checkIfStepLimitPriceValidationIsRequired()) {
                            if (!Number.isInteger(a) || !r) {
                                $(`#${e}`).addClass("input-field-error");
                                const r = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.limitmultiples(t));
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, r)
                            }
                            Number.isInteger(a) && r && ($(`#${e}`).removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.limitmultiples(t)))
                        } else j.removeSmartStepLimitPriceFieldValidation();
                        break;
                    case "smartLimitMaxPriceBox":
                        if (R.checkIfLimitMaxMinValidationIsRequired()) {
                            const t = $("#smartLimitPriceField").val();
                            if (!Number.isInteger(a) || !r) {
                                $(`#${e}`).addClass("input-field-error");
                                const t = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.maxPriceMultiples(R.getPriceTickSize()));
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, t)
                            }
                            Number.isInteger(a) && r && ($("#smartLimitMaxPriceBox").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.maxPriceMultiples(R.getPriceTickSize()))), 1 === l && (j.removeValidation(I.alertBarMessages.ERROR_MESSAGES.minPriceLowerLimit, orderWindow.errorMessages), r && r <= t && j.addValidation("error", I.alertBarMessages.ERROR_MESSAGES.maxPriceGreaterLimit, orderWindow.errorMessages), r && r > t && j.removeValidation(I.alertBarMessages.ERROR_MESSAGES.maxPriceGreaterLimit, orderWindow.errorMessages)), -1 === l && (j.removeValidation(I.alertBarMessages.ERROR_MESSAGES.maxPriceGreaterLimit, orderWindow.errorMessages), r && r >= t && j.addValidation("error", I.alertBarMessages.ERROR_MESSAGES.minPriceLowerLimit, orderWindow.errorMessages), r && r < t && j.removeValidation(I.alertBarMessages.ERROR_MESSAGES.minPriceLowerLimit, orderWindow.errorMessages))
                        } else j.removeAllMaxMinPriceLimitValidations();
                        break;
                    case "smartLimitTriggerPriceField":
                        if (R.checkIfSmartLimitTriggerPriceFieldValidationRequired()) {
                            if (!Number.isInteger(a)) {
                                $(`#${e}`).addClass("input-field-error");
                                const t = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.triggerMultiples(R.getPriceTickSize()));
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, t)
                            }
                            if (Number.isInteger(a) && ($("#smartLimitTriggerPriceField").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.triggerMultiples(R.getPriceTickSize()))), 1 === ie.getBuySellSide() && (orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stoplowerLTP), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stopgreaterlimit)), -1 === ie.getBuySellSide() && (orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stopgreaterLTP), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stoplesslimit)), 1 === ie.getBuySellSide() && r >= Number($("#smartLimitPriceField").val())) {
                                const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.stoplesslimit);
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                            }
                            if (1 === ie.getBuySellSide() && r < Number($("#smartLimitPriceField").val()) && orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stoplesslimit), -1 === ie.getBuySellSide() && r <= Number($("#smartLimitPriceField").val())) {
                                const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.stopgreaterlimit);
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                            }
                            if (-1 === ie.getBuySellSide() && r > Number($("#smartLimitPriceField").val()) && orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stopgreaterlimit), 1 === ie.getBuySellSide() && r <= ie.getLtpPrice()) {
                                const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.stopgreaterLTP);
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                            }
                            if (1 === ie.getBuySellSide() && r > ie.getLtpPrice() && orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stopgreaterLTP), -1 === ie.getBuySellSide() && r >= ie.getLtpPrice()) {
                                const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.stoplowerLTP);
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                            } - 1 === ie.getBuySellSide() && r < ie.getLtpPrice() && orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stoplowerLTP)
                        } else j.removeSmartLimitTriggerPriceFieldValidation();
                        break;
                    case "triggerPriceCheckBox":
                        $("#triggerPriceCheckBox").prop("checked") || (orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stoplowerLTP), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stopgreaterLTP), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stopgreaterlimit), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stoplesslimit));
                        break;
                    case "smartTimeInterval":
                        const i = $(`#${e}`).val(),
                            c = ie.getSeconds(i);
                        if (!i || c > 3559) {
                            $("#smartTimeInterval").addClass("input-field-error");
                            const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.validTimeInterval);
                            orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                        }
                        if (!i || c > 3559 || (orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.validTimeInterval), $("#smartTimeInterval").removeClass("input-field-error")), 5 === i.length && Number(i.split(":")[1]) >= 60) {
                            $("#smartTimeInterval").addClass("input-field-error");
                            const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.validTimeInterval);
                            orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                        }!i || 5 === i.length && Number(i.split(":")[1]) >= 60 || (orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.validTimeInterval), $("#smartTimeInterval").removeClass("input-field-error"));
                        break;
                    case "peggedAdjustmentField":
                        if (r = parseFloat($(`#${e}`).val()), 0 !== r || !Number.isInteger(a) || r < t) {
                            $(`#${e}`).addClass("input-field-error");
                            const t = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.adjustmentMultiples);
                            orderWindow.common.addValidationResult(orderWindow.errorMessages, t)
                        }(0 === r || Number.isInteger(a) && r >= t) && ($(`#${e}`).removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.adjustmentMultiples));
                        break;
                    case "priceRangeHigh":
                        if (R.checkIfHprValidationIsRequiredForStep() || R.checkIfHprValidationIsRequiredForSip()) {
                            if (r = parseFloat($(`#${e}`).val()), !(r && r > 0 && Number.isInteger(a))) {
                                $(`#${e}`).addClass("input-field-error");
                                const t = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.highMultiples);
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, t)
                            }
                            if (Number.isInteger(a) && r && r > 0 && ($(`#${e}`).removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.highMultiples)), $("#priceRangeRadioBtnHighLowId").prop("checked")) {
                                const e = Number($("#priceRangeLow").val());
                                if (r <= e) {
                                    $("#priceRangeHigh").addClass("input-field-error");
                                    const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.highGreaterThanLow);
                                    orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                                } else r > e && ($("#priceRangeHigh").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.highGreaterThanLow))
                            }
                        } else j.removeHprValidations();
                        break;
                    case "priceRangeLow":
                        if (R.checkIfLprValidationIsRequiredForStep() || R.checkIfLprValidationIsRequiredForSip()) {
                            if (r = parseFloat($(`#${e}`).val()), !(r && r > 0 && Number.isInteger(a))) {
                                $("#priceRangeLow").addClass("input-field-error");
                                const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.lowMultiples);
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                            }
                            if (Number.isInteger(a) && r && r > 0 && ($("#priceRangeLow").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.lowMultiples)), $("#priceRangeRadioBtnHighLowId").prop("checked")) {
                                const e = Number($("#priceRangeHigh").val());
                                if (r >= e) {
                                    $("#priceRangeLow").addClass("input-field-error");
                                    const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.highGreaterThanLow);
                                    orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                                } else r < e && ($("#priceRangeLow").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.highGreaterThanLow))
                            }
                        } else j.removeLprValidatios();
                        break;
                    case "smartTrailTriggerPrice":
                        if (R.checkIfsmartTrailTriggerPriceValidationRequired()) {
                            let t = parseFloat($("#smartTrailLimitPriceField").val());
                            if (r = parseFloat(r), !Number.isInteger(a) || !r) {
                                $(`#${e}`).addClass("input-field-error");
                                const t = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.triggerMultiples(R.getPriceTickSize()));
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, t)
                            }
                            if (Number.isInteger(a) && r && ($(`#${e}`).removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.triggerMultiples(R.getPriceTickSize()))), r && -1 === l)
                                if (orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stopgreaterLTP), r >= o) {
                                    const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.stoplowerLTP);
                                    orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                                } else r < o && orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stoplowerLTP);
                            if (r && 1 === l)
                                if (orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stoplowerLTP), r <= o) {
                                    const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.stopgreaterLTP);
                                    orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                                } else r > o && orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stopgreaterLTP);
                            if (r && t)
                                if (1 === l)
                                    if (orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stopgreaterlimit), r >= t) {
                                        const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.stoplesslimit);
                                        orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                                    } else r < t && orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stoplesslimit);
                            else if (-1 === l)
                                if (orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stoplesslimit), r <= t) {
                                    const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.stopgreaterlimit);
                                    orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                                } else r > t && orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stopgreaterlimit);
                            r && !t && (orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stoplesslimit), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stopgreaterlimit))
                        } else j.removeSmartTrailTriggerPriceValidation();
                        break;
                    case "smartTrailLimitPriceField":
                        if (R.checkIfSmartTrailLimitPriceFieldValidationRequired()) {
                            let t = parseFloat($("#smartTrailTriggerPrice").val());
                            if (r = parseFloat(r), !Number.isInteger(a) || !r) {
                                $(`#${e}`).addClass("input-field-error");
                                const t = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.limitmultiples(R.getPriceTickSize()));
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, t)
                            }
                            if (Number.isInteger(a) && r && ($(`#${e}`).removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.limitmultiples(R.getPriceTickSize()))), t) {
                                if (1 === l && r <= t) {
                                    const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.stoplesslimit);
                                    orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                                }
                                if (1 === l && r > t && orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stoplesslimit), -1 === l && r >= t) {
                                    const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.stopgreaterlimit);
                                    orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                                } - 1 === l && r < t && orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.stopgreaterlimit)
                            }
                            if (s)
                                if (r > n || r < d) {
                                    const e = orderWindow.owModal.alertComponent("alert", I.alertBarMessages.ALERT_MESSAGES.nseLimit(s));
                                    orderWindow.common.addValidationResult(orderWindow.alertMessages, e)
                                } else orderWindow.common.removeValidationResult(orderWindow.alertMessages, I.alertBarMessages.ALERT_MESSAGES.nseLimit(s))
                        } else j.removeSmartTrailLimitPriceValidation(s);
                        break;
                    case "smartTrailJumpPriceField":
                        if (R.checkIfSmartTrailJumpPriceFieldValidationRequired()) {
                            r = parseFloat(r), parseFloat($("#smartTrailTriggerPrice").val());
                            const i = parseFloat(20 * t);
                            if (!Number.isInteger(a) || !r) {
                                $(`#${e}`).addClass("input-field-error");
                                const t = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.jumpMultiples(R.getPriceTickSize()));
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, t)
                            }
                            if (Number.isInteger(a) && r && ($(`#${e}`).removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.jumpMultiples(R.getPriceTickSize()))), r) {
                                if (r < i) {
                                    $(`#${e}`).addClass("input-field-error");
                                    const t = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.minJumpPrice(i));
                                    orderWindow.common.addValidationResult(orderWindow.errorMessages, t)
                                }
                                r >= i && ($(`#${e}`).removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.minJumpPrice(i)))
                            }
                        } else j.removeSmartTrailJumpPriceValidation();
                        break;
                    case "smartTrailTragetPriceBox":
                        if (R.checkIfTargetPriceValidationsIsRequired()) {
                            if (r = parseFloat($("#smartTrailTragetPriceBox").val()), !Number.isInteger(a) || !r) {
                                $("#smartTrailTragetPriceBox").addClass("input-field-error");
                                const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.targetPriceMultiples(t));
                                orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                            }
                            if (Number.isInteger(a) && r && ($("#smartTrailTragetPriceBox").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.targetPriceMultiples(t))), r && 1 === l)
                                if (r >= o) {
                                    $("#smartTrailTragetPriceBox").addClass("input-field-error");
                                    const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.targetLowerLTP);
                                    orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                                } else r < o && ($("#smartTrailTragetPriceBox").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.targetLowerLTP));
                            if (r && -1 === l)
                                if (r <= o) {
                                    $("#smartTrailTragetPriceBox").addClass("input-field-error");
                                    const e = orderWindow.owModal.alertComponent("error", I.alertBarMessages.ERROR_MESSAGES.targetGreaterLTP);
                                    orderWindow.common.addValidationResult(orderWindow.errorMessages, e)
                                } else r > o && ($("#smartTrailTragetPriceBox").removeClass("input-field-error"), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.targetGreaterLTP))
                        } else j.removeSmartTrailTargetPriceValidation();
                        break;
                    case "smartLimitEndTime":
                    case "smartStepStartTime":
                        j.validateStartAndEndTimeErrorMessage()
                }
                orderWindow.alertMessages.length, orderWindow.errorMessages.length || $(".asmt2tCheck").length && !$(".asmt2tCheck").is(":checked") || $(".t2tSegment").length ? $("#buyButton").attr("disabled", !0) : $("#buyButton").attr("disabled", !1)
            }
            isSymbolToggleValid(e) {
                try {
                    return smartOrders.toggleExchangeValue = e, e
                } catch (e) {
                    return smartOrders.toggleExchangeValue = !1, !1
                }
            }
            static investProductTypeClickEvents() {
                $("#so_trade").removeClass("so-btn-product-selected"), $("#so_mtf").removeClass("so-btn-product-selected"), $("#so_invest").addClass("so-btn-product-selected");
                const e = R.checkIfCncOrMargin();
                R.sipOrderWindowOpen() ? $("#so_orderTypeText").text("CNC - Equity SIP") : $("#so_orderTypeText").text(e), smartOrders.toggleExchangeValue && $("#bseExchangeSection").show(), orderWindow.events.getMarginForSmartOrders()
            }
            static tradeProductTypeClickEvents() {
                $("#so_trade").addClass("so-btn-product-selected"), $("#so_mtf").removeClass("so-btn-product-selected"), $("#so_invest").removeClass("so-btn-product-selected"), $("#so_orderTypeText").text("INTRADAY"), smartOrders.toggleExchangeValue && $("#bseExchangeSection").show(), orderWindow.events.getMarginForSmartOrders()
            }
            static mtfProductTypeClickEvents() {
                $("#so_trade").removeClass("so-btn-product-selected"), $("#so_mtf").addClass("so-btn-product-selected"), $("#so_invest").removeClass("so-btn-product-selected"), R.sipOrderWindowOpen() ? $("#so_orderTypeText").text("MTF - Equity SIP") : $("#so_orderTypeText").text("MTF"), $("#bseExchangeSection").hide(), orderWindow.events.getMarginForSmartOrders()
            }
            static handleSmartDropdownClickHelper(e, t) {
                re.emptyAlertSectionBar(), re.addAsmGmCheckIfRequired(), $(`#${e}`).length ? $(".so_dropdown_container").remove() : (this.removeSmartOrderSectionFromOrderWindow(), re.triggerBannerItems(t))
            }
            static handleSmartLimitDropdownClick() {
                this.handleSmartDropdownClickHelper("smart-order-body-limit", I.smartMenuIdMatching.sm_limit)
            }
            static handleSmartTrailDropdownClick() {
                this.handleSmartDropdownClickHelper("smart-order-body-trail", I.smartMenuIdMatching.smart_trail)
            }
            static handleSmartPeggedDropdownClick() {
                this.handleSmartDropdownClickHelper("smart-order-body-pegged", I.smartMenuIdMatching.smart_pegged)
            }
            static handleSmartStepDropdownClick() {
                this.handleSmartDropdownClickHelper("smart-order-body-step", I.smartMenuIdMatching.smart_step)
            }
            static handleSmartSipDropdownClick() {
                this.handleSmartDropdownClickHelper("smart-order-body-sip", I.smartMenuIdMatching.smart_sip)
            }
            static updateBuySellButtonText(e) {
                $("#buyButton").text(e)
            }
            static appendSmartOrderDropdown() {
                const e = F.getDropDownFrame();
                !$(".so_dropdown_container").length && $(".smart-order-body").append(e), this.attachSmartOrdersDropdownClickEvents()
            }
            static getDropDownMenuClickEvents(e = !1) {
                try {
                    if ($(".so_dropdown_container").length) return void $(".so_dropdown_container").remove();
                    !e && this.appendSmartOrderDropdown()
                } catch (e) {
                    console.log(e)
                }
            }
            static updateTextsOfInputFields() {
                $("#smartLimitQty").attr("step", R.getLotSize()), $("#smartLimitQty").attr("min", R.getLotSize()), R.getSmartMaxQtyLimit(), $("#smartLimitQty").attr("max", R.getSmartMaxQtyLimit()), $("#smartLimitQty").val(R.getLotSize()), $("#smartLimitEndTime").val(R.getSessionEndTime()), $("#smartLimitPriceField").attr("step", R.getPriceTickSize()), $("#smartLimitTriggerPriceField").attr("step", R.getPriceTickSize()), $("#lotTextId").text(`(Lot: ${R.getLotSize()})`)
            }
            static smartQtyFieldValidation() {
                let e = Number($("#smartLimitQty").attr("step")),
                    t = Number($("#smartLimitQty").val());
                !t || t % e != 0 || t <= 0 ? $("#smartLimitQty").addClass("input-field-error") : ($("#smartLimitQty").removeClass("input-field-error"), orderWindow.events.getMarginForSmartOrders(), this.priceValidationForButtonAbleDisableHelperPegged("smartLimitQty"))
            }
            static smartPriceFieldValidation() {
                let e = parseFloat($("#smartLimitPriceField").attr("step")),
                    t = parseFloat($("#smartLimitPriceField").val());
                const r = R.floatSafeRemainder(t, e);
                Number.isInteger(r) ? $("#smartLimitPriceField").removeClass("input-field-error") : $("#smartLimitPriceField").addClass("input-field-error")
            }
            static priceValidationForButtonAbleDisableHelperPegged(e) {
                const t = "input-field-error";
                switch (e) {
                    case "priceRangeLow":
                        return !!($("#priceRangeHigh").hasClass(t) || $("#smartLimitQty").hasClass(t) || $("#peggedAdjustmentField").hasClass(t));
                    case "priceRangeHigh":
                        return !!($("#priceRangeLow").hasClass("input-field-error") || $("#smartLimitQty").hasClass(t) || $("#peggedAdjustmentField").hasClass("input-field-error"));
                    case "peggedAdjustmentField":
                        return !!($("#priceRangeLow").hasClass("input-field-error") || $("#smartLimitQty").hasClass(t) || $("#priceRangeHigh").hasClass("input-field-error"));
                    case "smartLimitQty":
                        return !!($("#priceRangeLow").hasClass("input-field-error") || $("#peggedAdjustmentField").hasClass(t) || $("#priceRangeHigh").hasClass("input-field-error"))
                }
            }
            static priceValidationForButtonAbleDisable(e, t = null, r = null, a = null) {
                let i = parseFloat($(`#${e}`).attr("step")),
                    s = parseFloat($(`#${e}`).val());
                const o = R.floatSafeRemainder(s, i);
                Number.isInteger(o) ? r && s >= t || a && s <= t ? $(`#${e}`).addClass("input-field-error") : ($(`#${e}`).removeClass("input-field-error"), this.priceValidationForButtonAbleDisableHelperPegged(e)) : $(`#${e}`).addClass("input-field-error")
            }
            static smartTriggerPriceValidation(e = void 0) {
                this.priceValidationForButtonAbleDisable("smartLimitTriggerPriceField")
            }
            static maskSmartPriceFieldConatiner() {
                $("#smartLimitPriceField").addClass("input-field-disabled disabled-stripes so_InputBoxDisabledStyle")
            }
            static maskSmartTriggerPriceFieldConatiner() {
                $("#smartLimitTriggerPriceField").addClass("input-field-disabled disabled-stripes so_InputBoxDisabledStyle")
            }
            static maskMppQtyContainer() {
                $("#mppQtyBox").addClass("input-field-disabled disabled-stripes so_InputBoxDisabledStyle")
            }
            static maskFieldContainer(e) {
                $(e).addClass("input-field-disabled disabled-stripes so_InputBoxDisabledStyle")
            }
            static unmaskFieldContainer(e) {
                $(e).removeClass("input-field-disabled disabled-stripes so_InputBoxDisabledStyle")
            }
            static attachSmartOrdersDropdownClickEvents() {
                const e = this;
                $("#so_dropdown_limit").unbind().click((function() {
                    e.handleSmartLimitDropdownClick()
                })), $("#so_dropdown_pegged").unbind().click((function() {
                    e.handleSmartPeggedDropdownClick()
                })), $("#so_dropdown_step").unbind().click((function() {
                    e.handleSmartStepDropdownClick()
                })), $("#so_dropdown_trail").unbind().click((function() {
                    e.handleSmartTrailDropdownClick()
                })), $("#so_dropdown_sip").unbind().click((function() {
                    e.handleSmartSipDropdownClick()
                })), smartOrders.smartOrderMenuOpen = !1, smartOrders.smartOrderOpen = !0
            }
            static smartLimitEndTimeValidation(e = !1, t = !1) {
                let r = e ? $("#smartTimeInterval").val() : $("#smartLimitEndTime").val();
                r = t ? $("#sipFrequencyDayInput").val() : r;
                let a = $("#smartLimitEndTime");
                e ? a = $("#smartTimeInterval") : t && (a = $("#sipFrequencyDayInput"));
                const i = Number(r.split(":")[0]),
                    s = Number(r.split(":")[1]),
                    o = Number(R.getSessionEndTime().split(":")[0]),
                    n = Number(R.getSessionEndTime().split(":")[1]),
                    d = Number(R.getSessionStartTime().split(":")[0]),
                    l = Number(R.getSessionStartTime().split(":")[1]);
                (i > o || i === o && s > n) && a.val(`${o.toString().padStart(2,"0")}:${n.toString().padStart(2,"0")}`), (i < d || i === d && s < l) && a.val(`${d.toString().padStart(2,"0")}:${l.toString().padStart(2,"0")}`)
            }
            static smartStartTimeValidation() {
                const e = $("#smartStepStartTime").val(),
                    t = 60 * parseInt(e.split(":")[0]) + parseInt(e.split(":")[1]),
                    r = parseInt(R.getSessionStartTime().split(":")[0]),
                    a = parseInt(R.getSessionStartTime().split(":")[1]);
                t < 60 * r + a && $("#smartStepStartTime").val(`${r.toString().padStart(2,"0")}:${a.toString().padStart(2,"0")}`)
            }
            static mppAdvancedToggleEvent() {
                R.limitOrderWindowOpen() && J.advancedMppConatinerWithLimit(), R.trailOrderWindowOpen() && J.advancedMppConatinerWithTrail(), R.stepOrderWindowOpen() && J.advancedMppConatinerWithStep(), J.displayCustomMppBoxConatiner(), R.limitOrderWindowOpen() && J.displayCustomMaxPriceContainer(), R.trailOrderWindowOpen() && J.displayCustomTargetPriceContainer()
            }
            static advancedMppConatinerWithStep() {
                R.toggleClass("stepAveragingStartsFromComponent", "d-none", "d-flex"), R.toggleClass("stepOrderInitialQtyContainer", "d-none", "d-flex"), R.toggleClass("stepPriceRangeComponent", "d-none", "d-flex"), R.toggleClass("stepOrderInitialQtyInputContainer", "d-none", "d-flex")
            }
            static advancedMppConatinerWithTrail() {
                $("#so_advancedContainer").hasClass("sl-part-7-trail-small") ? ($("#so_advancedContainer").removeClass("sl-part-7-trail-small").addClass("sl-part-7-trail"), $("#mppContainer").removeClass("d-none"), $("#targetPriceContainer").removeClass("d-none")) : $("#so_advancedContainer").hasClass("sl-part-7-trail-small") || ($("#so_advancedContainer").addClass("sl-part-7-trail-small").removeClass("sl-part-7-trail"), $("#mppContainer").addClass("d-none"), $("#targetPriceContainer").addClass("d-none"))
            }
            static advancedMppConatinerWithLimit() {
                $("#so_advancedContainer").hasClass("sl-part-7-trail-small") ? ($("#so_advancedContainer").removeClass("sl-part-7-trail-small").addClass("sl-part-7-trail"), $("#mppContainer").removeClass("d-none"), $("#limitMaxPriceContainer").removeClass("d-none")) : $("#so_advancedContainer").hasClass("sl-part-7-trail-small") || ($("#so_advancedContainer").addClass("sl-part-7-trail-small").removeClass("sl-part-7-trail"), $("#mppContainer").addClass("d-none"), $("#limitMaxPriceContainer").addClass("d-none"))
            }
            static displayCustomMppBoxConatiner() {
                $("#customMppCheckBoxContainer").hasClass("invisible") || $("#trailMarketPriceCheckBox").prop("checked") || $("#customTrailTargetCheckBox").prop("checked") && R.trailOrderWindowOpen() ? $("#customMppCheckBoxContainer").removeClass("invisible") : $("#customMppCheckBoxContainer").hasClass("invisible") || ($("#customMppCheckBoxContainer").addClass("invisible"), J.maskFieldContainer("#mppQtyBox"), $("#customMppCheckBox").prop("checked", !1), $("#mppQtyBox").val(""), $("#mppQtyBox").prop("placeholder", "Auto"))
            }
            static resetMppBoxContainer() {
                J.maskFieldContainer("#mppQtyBox"), $("#customMppCheckBox").prop("checked", !1), $("#mppQtyBox").val(""), $("#mppQtyBox").prop("placeholder", "Auto")
            }
            static displayCustomMaxPriceContainer() {
                $("#smartLimitMaxPriceBoxContainer").hasClass("invisible") ? $("#smartLimitMaxPriceBoxContainer").removeClass("invisible") : $("#smartLimitMaxPriceBoxContainer").hasClass("invisible") || ($("#smartLimitMaxPriceBoxContainer").addClass("invisible"), J.maskFieldContainer("#smartLimitMaxPriceBox"), $("#customMaxPriceLimitCheckBox").prop("checked", !1), $("#smartLimitMaxPriceBox").val(""))
            }
            static displayCustomTargetPriceContainer() {
                $("#smartTrailTragetPriceBoxContainer").hasClass("invisible") ? $("#smartTrailTragetPriceBoxContainer").removeClass("invisible") : $("#smartTrailTragetPriceBoxContainer").hasClass("invisible") || ($("#smartTrailTragetPriceBoxContainer").addClass("invisible"), J.maskFieldContainer("#smartTrailTragetPriceBox"), $("#customTrailTargetCheckBox").prop("checked", !1), $("#smartTrailTragetPriceBox").val(""))
            }
            static customMppCheckBoxEvent() {
                if ($("#customMppCheckBox").prop("checked")) {
                    $("#mppQtyBox").removeClass("disabled-stripes"), $("#mppQtyBox").removeClass("input-field-disabled so_InputBoxDisabledStyle");
                    let e = R.getMppDataToPrefill() ? .fyers_max;
                    $("#mppQtyBox").val(e.toFixed(2)), ie.removeCustomData("#mppQtyBox", "placeholder")
                } else $("#mppQtyBox").addClass("disabled-stripes"), $("#mppQtyBox").addClass("input-field-disabled so_InputBoxDisabledStyle"), $("#mppQtyBox").val(""), ie.setCustomData("#mppQtyBox", "placeholder", "Auto")
            }
            static marketPriceCheckBoxEvent() {
                $("#marketPriceCheckBox").prop("checked") ? ($("#smartLimitPriceField").addClass("disabled-stripes"), $("#smartLimitPriceField").addClass("input-field-disabled so_InputBoxDisabledStyle"), $("#smartLimitPriceField").val(""), $("#smartLimitPriceLabel").addClass("d-none")) : ($("#smartLimitPriceField").removeClass("disabled-stripes so_InputBoxDisabledStyle"), $("#smartLimitPriceField").removeClass("input-field-disabled"), $("#smartLimitPriceField").val(orderWindow.common.getInitialLimitPrice()), $("#smartLimitPriceLabel").removeClass("d-none"))
            }
            static triggerPriceCheckBoxEvent() {
                $("#triggerPriceCheckBox").prop("checked") ? ($("#smartLimitTriggerPriceField").removeClass("disabled-stripes so_InputBoxDisabledStyle"), $("#smartLimitTriggerPriceField").removeClass("input-field-disabled"), $("#smartLimitTriggerPriceField").val(orderWindow.common.getInitialStopPrice()), $("#smartLimittriggerPriceLabel").removeClass("d-none")) : ($("#smartLimitTriggerPriceField").addClass("disabled-stripes so_InputBoxDisabledStyle"), $("#smartLimitTriggerPriceField").addClass("input-field-disabled"), $("#smartLimitTriggerPriceField").val(""), $("#smartLimittriggerPriceLabel").addClass("d-none"))
            }
            static removeSmartOrderSectionFromOrderWindow() {
                $(".smart-order-body").remove()
            }
            static smartBackArrowEvent() {
                smartOrders.smartOrderOpen = !1, smartOrders.smartOrderMenuOpen = !0, re.emptyAlertSectionBar(), this.removeSmartOrderSectionFromOrderWindow(), re.addSmartOrdersMenuInOW(), re.attachSmartBannerClickEvents(), $("#trade-buttons-container").removeClass("d-none"), $(".modal-body").removeClass("d-none"), R.hideOwBootomFooter(), J.updateBuySellButtonText("buy" === orderWindow.orderData.selectedSide ? "Buy" : "Sell"), re.hideSmartSipFromSmartMenu(), re.enableBuySellToggle(), re.showMarginComponent()
            }
            static blockSmartHeaderEventsForModifyOrClone() {
                $("#so-backArrow").css("pointer-events", "none"), $(".so-menu-items").css("pointer-events", "none"), $(".so-btn-product ").css("pointer-events", "none")
            }
            static initiateSmartLimitEvents() {
                $("#smartLimitPriceField").val(R.prefillLimitPrice()), $("#smartLimitLabelSpan").text(`(Tick:${R.getPriceTickSize()})`), this.maskFieldContainer("#smartLimitMaxPriceBox"), $("#customMaxPriceLimitCheckBox").unbind().click((function() {
                    J.handleLimitMaxPriceCheckBox()
                })), this.handleDefaultProductType(), orderWindow.events.getMarginForSmartOrders()
            }
            static handleDefaultProductType() {
                try {
                    const e = ie.getUserSettingsProductType();
                    "INTRADAY" === e || "BO" === e || "CO" === e ? this.tradeProductTypeClickEvents() : "INVEST" === e ? this.investProductTypeClickEvents() : "MTF" === e && (ie.canWeShowMtfToClient() ? this.mtfProductTypeClickEvents() : this.investProductTypeClickEvents())
                } catch (e) {
                    console.log(e), this.tradeProductTypeClickEvents()
                }
            }
            static handlePriceRangeToggle() {
                R.sipOrderWindowOpen() && ($("#sipHighLowComponent").hasClass("d-none") ? $("#sipHighLowComponent").removeClass("d-none") : $("#sipHighLowComponent").addClass("d-none")), re.priceRangeSlider(), J.handleSmartValidations("priceRangeHigh"), J.handleSmartValidations("priceRangeLow")
            }
            static onlyHprClickedEvent() {
                re.disableAndEnableForHighPriceRange("#priceRangeHigh"), $("#priceRangeHigh").hasClass("input-field-disabled") || $("#priceRangeHigh").val(R.getUpperCircuit()), J.handleSmartValidations("priceRangeHigh"), J.handleSmartValidations("priceRangeLow")
            }
            static onlyLprClickedEvent() {
                re.disableAndEnableForHighPriceRange("#priceRangeLow"), $("#priceRangeLow").hasClass("input-field-disabled") || $("#priceRangeLow").val(R.getLowerCircuit()), J.handleSmartValidations("priceRangeHigh"), J.handleSmartValidations("priceRangeLow")
            }
            static bothHprLprClickedEvent() {
                if (re.enableFieldsForHighAndLow(), $("#priceRangeHigh").hasClass("input-field-disabled") || $("#priceRangeHigh").val(R.getUpperCircuit() ? R.getUpperCircuit() : R.getLtpDataIfCircuitsNotAvailable("priceRangeHigh")), $("#priceRangeLow").hasClass("input-field-disabled") || $("#priceRangeLow").val(R.getLowerCircuit() ? R.getLowerCircuit() : R.getLtpDataIfCircuitsNotAvailable("priceRangeLow", !0)), $("#priceRangeHigh").val() === $("#priceRangeLow").val()) {
                    const e = Number($("#priceRangeHigh").attr("step"));
                    $("#priceRangeHigh").val(Number($("#priceRangeHigh").val()) + e)
                }
                J.handleSmartValidations("priceRangeHigh"), J.handleSmartValidations("priceRangeLow")
            }
            static handlePriceRangeComponentEvents() {
                $("#priceRangeHigh").attr("step", R.getPriceTickSize()), $("#priceRangeLow").attr("step", R.getPriceTickSize()), $("#so_priceRangeSlider").off().click((function() {
                    J.handlePriceRangeToggle()
                })), re.disableHighAndLowInPriceRange(), $("#priceRangeRadioBtnHighId").off().click((function() {
                    J.onlyHprClickedEvent()
                })), $("#priceRangeRadioBtnLowId").off().click((function() {
                    J.onlyLprClickedEvent()
                })), $("#priceRangeRadioBtnHighLowId").off().click((function() {
                    J.bothHprLprClickedEvent()
                })), $("#priceRangeHigh").unbind("keyup change").on("keyup change", (function(e) {
                    J.handleSmartValidations("priceRangeLow"), J.handleSmartValidations("priceRangeHigh")
                })), $("#priceRangeLow").unbind("keyup change").on("keyup change", (function(e) {
                    J.handleSmartValidations("priceRangeHigh"), J.handleSmartValidations("priceRangeLow")
                }))
            }
            static initiateSmartPeggedEvents() {
                const e = this;
                orderWindow.events.getMarginForSmartOrders(), $("#smartTimeInterval").val("00:15"), $("#smartTimeInterval").on("input", (function() {
                    let t = $(this).val().replace(/[^0-9]/g, "");
                    t.length > 4 && (t = t.slice(0, 4)), t.length <= 2 ? $(this).val(t) : 3 === t.length ? $(this).val(t.slice(0, 2) + ":" + t.slice(2)) : $(this).val(t.slice(0, t.length - 2) + ":" + t.slice(t.length - 2)), e.handleSmartValidations("smartTimeInterval")
                })), $("#peggedAdjustmentField").val(R.getPriceTickSize()), $("#peggedAdjustmentField").attr("step", R.getPriceTickSize()), $("#peggedAdjustmentField").attr("min", R.getPriceTickSize()), $("#peggedAdjustmentField").unbind("keyup change").on("keyup change", (function(t) {
                    e.handleSmartValidations("peggedAdjustmentField")
                })), $("#priceRangeHigh").attr("step", R.getPriceTickSize()), $("#priceRangeLow").attr("step", R.getPriceTickSize()), re.disableHighAndLowInPriceRange(), $("#priceRangeRadioBtnHighId").off().click((function() {
                    re.disableAndEnableForHighPriceRange("#priceRangeHigh"), $("#priceRangeHigh").hasClass("input-field-disabled") || $("#priceRangeHigh").val(R.getUpperCircuit())
                })), $("#priceRangeRadioBtnLowId").off().click((function() {
                    re.disableAndEnableForHighPriceRange("#priceRangeLow"), $("#priceRangeLow").hasClass("input-field-disabled") || $("#priceRangeLow").val(R.getLowerCircuit())
                })), $("#priceRangeRadioBtnHighLowId").off().click((function() {
                    if (re.enableFieldsForHighAndLow(), $("#priceRangeHigh").hasClass("input-field-disabled") || $("#priceRangeHigh").val(R.getUpperCircuit() ? R.getUpperCircuit() : R.getLtpDataIfCircuitsNotAvailable("priceRangeHigh")), $("#priceRangeLow").hasClass("input-field-disabled") || $("#priceRangeLow").val(R.getLowerCircuit() ? R.getLowerCircuit() : R.getLtpDataIfCircuitsNotAvailable("priceRangeLow", !0)), $("#priceRangeHigh").val() === $("#priceRangeLow").val()) {
                        const e = Number($("#priceRangeHigh").attr("step"));
                        $("#priceRangeHigh").val(Number($("#priceRangeHigh").val()) + e)
                    }
                })), $("#priceRangeHigh").unbind("keyup change").on("keyup change", (function(t) {
                    e.handleSmartValidations("priceRangeHigh")
                })), $("#priceRangeLow").unbind("keyup change").on("keyup change", (function(t) {
                    e.handleSmartValidations("priceRangeLow")
                })), $("#peggedToLotIdSpan").unbind().click((function() {
                    $("#peggedToLotId").prop("checked", !0)
                })), $("#peggedBestBidSpan").unbind().click((function() {
                    $("#peggedBestBid").prop("checked", !0)
                })), $("#peggedBestAskSpan").unbind().click((function() {
                    $("#peggedBestAsk").prop("checked", !0)
                })), $("#peggedMidBidAskSpan").unbind().click((function() {
                    $("#peggedMidBidAsk").prop("checked", !0)
                })), $("#adjustmentDirectionUpIdSpan").unbind().click((function() {
                    $("#adjustmentDirectionUpId").prop("checked", !0)
                })), $("#adjustmentDirectionDownIdSpan").unbind().click((function() {
                    $("#adjustmentDirectionDownId").prop("checked", !0)
                }))
            }
            static initiateSmartSipEvents() {
                re.smartSipPreRequisite();
                const e = this;
                $("#smartLimitQty").on("keypress", (function(e) {
                    const t = e.charCode,
                        r = $(this).val();
                    return t >= 48 && t <= 57 || !(!R.sipOrderWindowOpen() || !R.getSipAmountButtonActive() || 46 !== t || r.includes("."))
                })), $("#so_sip_QtyPrimary").unbind().click((function() {
                    re.handleSipQtyPrimaryClicked()
                })), $("#so_sip_AmountSecondary").unbind().click((function() {
                    re.handleSipAmountSecondaryClicked()
                })), $("#sipExpiryDateButton").unbind().click((function() {
                    re.handleSipExpiryDateButtonClick()
                })), $("#sipExpiryAmountButton").unbind().click((function() {
                    re.handleSipExpiryAmountButtonClick()
                })), $("#sipFrequencyInput").click((function(e) {
                    e.stopPropagation()
                })), $("#sipFrequencyInput").focus((function() {
                    "block" !== $("#sipFrequenceDropDownContainer").css("display") && $("#sipFrequenceDropDownContainer").css("display", "block")
                })), $("#stepUpQFrequencyInputId").click((function(e) {
                    e.stopPropagation()
                })), $("#sipFrequencyDayInput").on("keydown", (function(e) {
                    "Custom" === $("#sipFrequencyInput").val() && e.preventDefault()
                })), $("#sipExpiryInputId").on("keydown", (function(e) {
                    R.getSipExpiryConditionToVaidateDate() && e.preventDefault()
                })), $("#sipFrequencyDayInput").on("input", (function(e) {
                    j.validateSipFrequencyCustomValue(this.value)
                })), $("#sipExpiryInputId").on("input", (function(e) {
                    j.validateSipExpiryInputValue(this.value)
                })), $("#sipFrequencyDayInput").click((function(e) {
                    e.stopPropagation()
                })), $("#stepUpQFrequencyInputId").focus((function() {
                    "block" !== $("#sipFrequenceDropDownContainerStep").css("display") && ($("#sipStepUpAdvancedInputContainer > div:first").append(L.sipFrequenceDropDown("Step", R.getSipStepFrequency(), R.getSipStepFrequency(!0))), e.initiateSipStepDropdownEvents(), R.highlightSipStepFrequencyRadioButton(), $("#sipFrequenceDropDownContainerStep").css("display", "block"))
                })), $("#sipFrequencyDayInput").focus((function() {
                    if ("block" === $("#sipFrequenceDropDownContainerDate").css("display")) return;
                    if ("block" === $("#sipFrequenceDropDownContainerMonthly").css("display")) return;
                    const t = $("#sipFrequencyInput").val();
                    "Daily" !== t && "Custom" !== t && ("Weekly" === t && ($("#sipFrequencyContainer > div:nth-child(2)").append(L.sipFrequenceDropDown("Date", R.getSipWeeklyFrequency(), R.getSipWeeklyFrequency(!0))), e.initiateSiPFrequencyWeeklyDropDownEvents(), $("#sipFrequenceDropDownContainerDate").css("display", "block"), R.highlightSipFrequencyWeekRadioButton()), "Monthly" === t && ($("#sipFrequencyContainer > div:nth-child(2)").append(L.sipFrequenceDropDown("Monthly", R.getSipMonthlyFrequency(), R.getSipMonthlyFrequency(!0), !0)), e.initiateSiPFrequencyMonthlyDropDownEvents(), $("#sipFrequenceDropDownContainerMonthly").css("display", "block"), R.highlightSipFrequencyMonthRadioButton()))
                })), $("#stepUpQuantityInputId").on("keypress", (function(e) {
                    return e.charCode >= 48 && e.charCode <= 57
                })), $("#stepUpQuantityInputId").unbind("keyup change").on("keyup change", (function(e) {
                    J.handleSmartValidations("stepUpQuantityInputId")
                })), $("#sipExpiryInputId").on("keypress", (function(e) {
                    return e.charCode >= 48 && e.charCode <= 57
                })), $("#sipExpiryInputId").unbind("keyup change").on("keyup change", (function(e) {
                    $("#sipExpiryAmountButton").hasClass("so_qtyAmountSwapParentConatinerActive") && J.handleSmartValidations("sipExpiryInputId")
                })), $("#sip_daily").unbind().click((function() {
                    re.sipDailyFreqClickHandler(), R.getPrefillSipExpiryDatev2(), R.highlightSipFrequencyRadioButton(), $($(".so_dropDownIconHtml")[1]).addClass("d-none"), j.validateSipFrequencyCustomValue(), J.handleSmartValidations("sipExpiryInputId")
                })), $("#sip_weekly").unbind().click((function() {
                    re.sipWeeklyFreqClickHandler(), R.getPrefillSipExpiryDatev2(), R.highlightSipFrequencyRadioButton(), $($(".so_dropDownIconHtml")[1]).removeClass("d-none"), j.validateSipFrequencyCustomValue(), J.handleSmartValidations("sipExpiryInputId")
                })), $("#sip_monthly").unbind().click((function() {
                    re.sipMonthlyFreqClickHandler(), R.getPrefillSipExpiryDatev2(), R.highlightSipFrequencyRadioButton(), $($(".so_dropDownIconHtml")[1]).removeClass("d-none"), j.validateSipFrequencyCustomValue($("#sipFrequencyDayInput").val()), J.handleSmartValidations("sipExpiryInputId")
                })), $("#sip_custom").unbind().click((function() {
                    re.sipCustomFreqClickHandler(), R.highlightSipFrequencyRadioButton(), $($(".so_dropDownIconHtml")[1]).addClass("d-none"), j.validateSipFrequencyCustomValue(), J.handleSmartValidations("sipExpiryInputId")
                })), this.initiateSipStepDropdownEvents(), $("#sipExpirySlider").unbind().click((function() {
                    re.handleSipExpirySliderClick()
                })), $("#sipStepUpSlider").unbind().click((function() {
                    re.handleSipStepUpSliderClick()
                })), $("#sipAdvancedSlider").unbind().click((function() {
                    re.handleSipAdvancedToggle()
                })), J.handlePriceRangeComponentEvents()
            }
            static initiateSipStepDropdownEvents() {
                $("#sip_dailyStep").unbind().click((function() {
                    $("#sipFrequenceDropDownContainerStep").css("display", "none"), $("#stepUpQFrequencyInputId").val("Daily"), R.highlightSipStepFrequencyRadioButton()
                })), $("#sip_weeklyStep").unbind().click((function() {
                    $("#sipFrequenceDropDownContainerStep").css("display", "none"), $("#stepUpQFrequencyInputId").val("Weekly"), R.highlightSipStepFrequencyRadioButton()
                })), $("#sip_monthlyStep").unbind().click((function() {
                    $("#sipFrequenceDropDownContainerStep").css("display", "none"), $("#stepUpQFrequencyInputId").val("Monthly"), R.highlightSipStepFrequencyRadioButton()
                })), $("#sip_customStep").unbind().click((function() {
                    $("#sipFrequenceDropDownContainerStep").css("display", "none"), $("#stepUpQFrequencyInputId").val("Yearly"), R.highlightSipStepFrequencyRadioButton()
                }))
            }
            static initiateSiPFrequencyWeeklyDropDownEvents() {
                $("#sip_weeklyMonday").unbind().click((function() {
                    $("#sipFrequenceDropDownContainerDate").css("display", "none"), $("#sipFrequencyDayInput").val("Monday"), R.getPrefillSipExpiryDatev2(), R.highlightSipFrequencyWeekRadioButton()
                })), $("#sip_weeklyTuesday").unbind().click((function() {
                    $("#sipFrequenceDropDownContainerDate").css("display", "none"), $("#sipFrequencyDayInput").val("Tuesday"), R.getPrefillSipExpiryDatev2(), R.highlightSipFrequencyWeekRadioButton()
                })), $("#sip_weeklyWednesday").unbind().click((function() {
                    $("#sipFrequenceDropDownContainerDate").css("display", "none"), $("#sipFrequencyDayInput").val("Wednesday"), R.getPrefillSipExpiryDatev2(), R.highlightSipFrequencyWeekRadioButton()
                })), $("#sip_weeklyThursday").unbind().click((function() {
                    $("#sipFrequenceDropDownContainerDate").css("display", "none"), $("#sipFrequencyDayInput").val("Thursday"), R.getPrefillSipExpiryDatev2(), R.highlightSipFrequencyWeekRadioButton()
                })), $("#sip_weeklyFriday").unbind().click((function() {
                    $("#sipFrequenceDropDownContainerDate").css("display", "none"), $("#sipFrequencyDayInput").val("Friday"), R.getPrefillSipExpiryDatev2(), R.highlightSipFrequencyWeekRadioButton()
                }))
            }
            static initiateSiPFrequencyMonthlyDropDownEvents() {
                const e = e => {
                    if (e >= 11 && e <= 13) return "th";
                    switch (e % 10) {
                        case 1:
                            return "st";
                        case 2:
                            return "nd";
                        case 3:
                            return "rd";
                        default:
                            return "th"
                    }
                };
                for (let t = 1; t <= 28; t++) $(`#sip_monthly${t}`).unbind().click((function() {
                    const r = e(t);
                    $("#sipFrequenceDropDownContainerMonth").css("display", "none"), $("#sipFrequencyDayInput").val(`${t}${r} of every month`), R.getPrefillSipExpiryDatev2()
                }))
            }
            static initiateSmartTrailEvents() {
                const e = this;
                $("#smartTrailLimitPriceLabel").addClass("d-none"), this.maskFieldContainer("#smartTrailLimitPriceField"), this.maskFieldContainer("#smartTrailTragetPriceBox"), $("#smartTrailJumpPriceField").val(R.getPrefillJumpPriceForTrail()), $("#smartTrailTriggerPrice").val(R.getPrefillStopLossTriggerPriceForTrail()), $("#trailMarketPriceCheckBox").unbind().click((function() {
                    e.handleTrailMarketPriceCheckBox(), J.displayCustomMppBoxConatiner(), J.handleMarketOrderInfoMessage()
                })), $("#smartTrailLimitPriceField").unbind("keyup change").on("keyup change", (function(e) {
                    J.handleSmartValidations("smartTrailLimitPriceField"), J.handleSmartValidations("smartTrailTriggerPrice")
                })), $("#smartTrailJumpPriceField").unbind("keyup change").on("keyup change", (function(e) {
                    J.handleSmartValidations("smartTrailJumpPriceField")
                })), $("#smartTrailTriggerPrice").unbind("keyup change").on("keyup change", (function(e) {
                    J.handleSmartValidations("smartTrailTriggerPrice")
                })), $("#customTrailTargetCheckBox").unbind().click((function() {
                    J.handleTrailTargetCheckBox(), J.displayCustomMppBoxConatiner()
                })), $("#smartTrailTragetPriceBox").unbind("keyup change").on("keyup change", (function(e) {
                    J.handleSmartValidations("smartTrailTragetPriceBox")
                })), J.handleMarketOrderInfoMessage(), Y.handleInitialSmartTrailValidation(), this.handleDefaultProductType()
            }
            static initiateSmartStepEvents() {
                J.prefillStepOrderInputFields(), $("#smartStepAvgQty").on("keypress", (function(e) {
                    return e.charCode >= 48 && e.charCode <= 57
                })), $("#smartStepAvgQty").unbind("keyup change").on("keyup change", (function(e) {
                    J.handleSmartValidations("smartStepAvgQty")
                })), $("#smartStepInitialQty").on("keypress", (function(e) {
                    return e.charCode >= 48 && e.charCode <= 57
                })), $("#smartStepInitialQty").unbind("keyup change").on("keyup change", (function(e) {
                    J.handleSmartValidations("smartStepInitialQty"), J.handleSmartValidations("smartStepAvgQty")
                })), $("#smartStepAvgEntryDiffQty").unbind("keyup change").on("keyup change", (function(e) {
                    J.handleSmartValidations("smartStepAvgEntryDiffQty")
                })), $("#smartStepLimitPriceLabel").addClass("d-none"), $("#stepOrderCustomAverageContainer").unbind().on("click", (function(e) {
                    e.preventDefault(), J.handlestepAveragingRadioButtonClick("stepOrderCustomAverageContainer")
                })), $("#stepOrderLtpAverageContainer").unbind().on("click", (function(e) {
                    e.preventDefault(), J.handlestepAveragingRadioButtonClick("stepOrderLtpAverageContainer")
                })), $("#smartStepLimitPriceField").unbind("keyup change").on("keyup change", (function(e) {
                    J.handleSmartValidations("smartStepLimitPriceField")
                })), J.handlePriceRangeComponentEvents(), Y.handleInitialSmartStepValidation(), this.handleDefaultProductType()
            }
            static handlestepAveragingRadioButtonClick(e) {
                const t = R.getRadioButtonCheckedOrNot("stepOrderLtpAverage"),
                    r = R.getRadioButtonCheckedOrNot("stepOrderCustomAverage");
                t && "stepOrderCustomAverageContainer" === e ? (R.getRadioButtonChecked("stepOrderCustomAverage"), R.getRadioButtonUnChecked("stepOrderLtpAverage"), J.unmaskFieldContainer("#smartStepLimitPriceField"), $("#smartStepLimitPriceField").val(ie.getLtpPrice()), $("#smartStepLimitPriceLabel").toggleClass("d-none d-flex")) : r && "stepOrderLtpAverageContainer" === e && (R.getRadioButtonChecked("stepOrderLtpAverage"), R.getRadioButtonUnChecked("stepOrderCustomAverage"), J.maskFieldContainer("#smartStepLimitPriceField"), $("#smartStepLimitPriceField").val(`Limit Price(Tick:${R.getPriceTickSize()})`), $("#smartStepLimitPriceLabel").toggleClass("d-none d-flex")), J.handleSmartValidations("smartStepLimitPriceField")
            }
            static prefillStepOrderInputFields() {
                const e = R.getLotSize(),
                    t = R.getPriceTickSize();
                $("#smartLimitQty").val(10 * e), $("#smartStepEndTime").val(R.getSessionEndTime), $("#smartStepAvgQty").val(e), $("#smartStepAvgQty").prop("min", e), $("#smartStepAvgQty").prop("step", e), $("#smartStepAvgEntryDiffQty").val((100 * t).toFixed(2)), J.maskFieldContainer("#smartStepLimitPriceField"), J.resetStepInitialQty(), J.handleInitialStepDirection(), R.prefillStartStepTime()
            }
            static handleInitialStepDirection() {
                -1 === ie.getBuySellSide() && $("#stepOrderDownSideDirection").prop("checked", !0)
            }
            static resetStepInitialQty() {
                const e = R.getLotSize();
                $("#smartStepInitialQty").val(e), $("#smartStepInitialQty").prop("min", e)
            }
            static handleMarketOrderInfoMessage() {
                if (R.trailOrderWindowOpen() && $("#trailMarketPriceCheckBox").prop("checked")) {
                    const e = orderWindow.owModal.alertComponent("message", I.alertBarMessages.ALERT_MESSAGES.marketPriceRisk());
                    orderWindow.common.addValidationResult(orderWindow.alertMessages, e)
                } else orderWindow.common.removeValidationResult(orderWindow.alertMessages, I.alertBarMessages.ALERT_MESSAGES.marketPriceRisk())
            }
            static handleTrailMarketPriceCheckBox() {
                $("#trailMarketPriceCheckBox").prop("checked") ? (this.maskFieldContainer("#smartTrailLimitPriceField"), $("#smartTrailLimitPriceLabel").addClass("d-none"), $("#smartTrailLimitPriceField").val(""), J.handleSmartValidations("smartTrailTriggerPrice")) : (this.unmaskFieldContainer("#smartTrailLimitPriceField"), $("#smartTrailLimitPriceLabel").removeClass("d-none"), $("#smartTrailLimitPriceField").val(R.getPrefillLimitPriceForTrail()), J.handleSmartValidations("smartTrailTriggerPrice"))
            }
            static handleTrailTargetCheckBox() {
                $("#customTrailTargetCheckBox").prop("checked") ? (this.unmaskFieldContainer("#smartTrailTragetPriceBox"), $("#smartTrailTragetPriceBox").val(R.getPrefillTargetPriceForTrail()), J.handleSmartValidations("smartTrailTragetPriceBox")) : (this.maskFieldContainer("#smartTrailTragetPriceBox"), $("#smartTrailTragetPriceBox").val(""), J.handleSmartValidations("smartTrailTragetPriceBox"))
            }
            static handleLimitMaxPriceCheckBox() {
                $("#customMaxPriceLimitCheckBox").prop("checked") ? (this.unmaskFieldContainer("#smartLimitMaxPriceBox"), $("#smartLimitMaxPriceBox").val(R.getPrefillMaxMinPriceForLimit())) : (this.maskFieldContainer("#smartLimitMaxPriceBox"), $("#smartLimitMaxPriceBox").val("")), J.handleSmartValidations("smartLimitMaxPriceBox")
            }
            static handleMppCappingEvents() {
                $("#mppQtyBox").attr("step", .1)
            }
            static addTooltips(e) {
                try {
                    I.tooltip.common.forEach((e => {
                        FyersWidget.tooltip.createTooltip(e ? .id, e ? .text, e ? .link)
                    })), I.tooltip[e].forEach((e => {
                        FyersWidget.tooltip.createTooltip(e.id, e.text, e.link)
                    }))
                } catch (e) {
                    console.log("Error in ToolTips", e)
                }
            }
            static resetStepAdvancedComponentsWhenAdvancedNotToggled() {
                J.handlestepAveragingRadioButtonClick("stepOrderLtpAverageContainer"), re.resetPriceRangeComponent(), J.resetStepInitialQty(), J.handleSmartValidations("priceRangeHigh"), J.handleSmartValidations("priceRangeLow"), J.handleSmartValidations("smartStepInitialQty"), J.handleSmartValidations("smartStepLimitPriceField"), J.handleSmartValidations("mppQtyBox")
            }
            static resetTrailAdvancedComponentsWhenAdvancedNotToggled() {
                J.handleTrailTargetCheckBox(), J.displayCustomMppBoxConatiner(), J.resetMppBoxContainer(), J.handleSmartValidations("mppQtyBox"), J.handleSmartValidations("smartTrailTragetPriceBox")
            }
        }
        const K = J,
            Z = function() {
                function e(e) {
                    const t = e || 0;
                    return t > 0 ? "exitPositionProfitText" : t < 0 ? "exitPositionLossText" : "exitPositionBreakEvenText"
                }
                return {
                    customCancelOrder: function(t, r) {
                        if (TradeModules.storeData.quickTrade.quickTradeStatus) return void broker.cancelOrder(t.id, !1);
                        let a = "",
                            i = "",
                            s = "";
                        t.symbol && (a = FyTrade.helper.getSymbolMasterValue(datafeed.unzippedData ? .data ? .[t.symbol], "exchange_name"), i = FyTrade.helper.getSymbolMasterValue(datafeed.unzippedData ? .data ? .[t.symbol], "symbol_details"), s = FyTrade.data.symbolPriceDict ? .[t.symbol] ? .v ? .cmd ? .c || 0);
                        let o = "";
                        t.symbol && (o = t.symbol.split(":")[1]);
                        let n = `\n      <div class="exitPositionWrapper realTimeOrderUpdateRequired">\n      <div class="exitPositionConfirmationText">You are about to cancel this order, check the details and confirm.</div>\n        <div class="exitPositionStockContainer align-items-center">\n              <div class="exitPositionStockPrimaryWrapper">\n                <div class="exitPositionStockInfo">\n                  <span>${1===t.side?"<span class='exitPositionProfitText'>BUY</span>":"<span class='exitPositionLossText'>SELL</span>"}</span>\n                  <span class="d-flex flex-nowrap"><span class='exitPositionStockItemSmall'>Qty: ${t.qty??"0"}</span></span>\n                  <span class="exitPositionStockItemSmall">${t.productType??""}</span>\n              </div>\n              <div class="exitPositionStockSymbolContainer"><span class="exitPositionStockSymbol">${o}</span> <span class="exitPositionStockExchange">${a??""}</span>\n              </div>\n              <div class="exitPositionStockItemSmall">${i??""}\n              </div>\n            </div>\n            <div class="exitPositionStockSecondaryWrapper">\n              <span class="exitPositionStockItemSmall pendingCancelOrderContainer">\n                    <span class="pendingCancelOrderImgWrapper">\n                      <img src="https://assets.fyers.in/global-components/trade-icons/widgets/pendingIcon.svg" height="12" width="12"/>\n                    </span>\n                    Pending\n              </span>\n                <span class="exitPositionStockPLWrapper">\n                  <span>${3===t.type?t.stopPrice:t.limitPrice?t.limitPrice:"0"}</span>\n                </span>\n              <span class="exitPositionLTPWrapper">\n              LTP:&nbsp;\n              <span id="CANCEL-ORDER-LTP-${t.id}" >\n                <span class="${e(t.ltp_ch||0)}">\n                  ${s}\n                </span>\n              </span>\n              <span class="exitPositionStockArrowWrapper" id="CANCEL-ORDER-ARROW-${t.id}">\n                ${t.ltp_ch?`<span class="exitPositionStockArrowIcon ${t.ltp_ch>0?"exitPositionArrowUp":t.ltp_ch<0?"exitPositionArrowDown":""}">`:""}\n              </span>\n            </span>\n            </span>\n            </div>\n        </div>\n      </div>\n    `;
                        FyersWidget.popup_msg.getPopup({
                            category: "normal",
                            type: "modal",
                            title: "Cancel order",
                            desc: n,
                            desc_title: "",
                            pri_btn: "Confirm cancel",
                            seco_btn: "Keep order",
                            desc_sub: "",
                            identifierClass: "cancelOrderModal"
                        }, (e => {
                            $("#fy_overLay").hide(), "primary" == e && broker.cancelOrder(t.id, r)
                        }))
                    },
                    closePositionDialogue: function(t) {
                        const r = FyTrade.helper.getSymbolMasterValue(datafeed.unzippedData ? .data ? .[t.symbol], "exchange_name"),
                            a = `${t.pl?t.pl.toFixed(2):0}(${t.chg?t.chg.toFixed(2):0}%)`;
                        let i = "";
                        t.symbol && (i = t.symbol.split(":")[1]);
                        let s = `\n            <div class="exitPositionWrapper realTimePositionUpdateRequired">\n                <div class="exitPositionConfirmationText">Check and confirm the following details before closing position.</div>\n                <div class="exitPositionStockContainer align-items-center">\n                    <div class="exitPositionStockPrimaryWrapper">\n                        <div class="exitPositionStockInfo">\n                        <span>${1===t.side?"<span class='exitPositionProfitText'>BUY</span>":"<span class='exitPositionLossText'>SELL</span>"}</span>\n                        <span class="d-flex flex-nowrap"><span class='exitPositionStockItemSmall'>Qty: ${t.qty??"0"}</span></span>\n                        <span class="exitPositionStockItemSmall">${t.productType??""}</span>\n                        </div>\n                        <div class="exitPositionStockSymbolContainer"><span class="exitPositionStockSymbol">${i}</span> <span class="exitPositionStockExchange">${r??""}</span></div>\n                        <div class="exitPositionStockItemSmall">${t.symbol_desc??""}</div>\n                    </div>\n                    <div class="exitPositionStockSecondaryWrapper">\n                        <span class="exitPositionStockItemSmall">Avg. price: <span id="CLOSE-POSITION-AVG-${t.id}">${t.netAvg?(o=t.netAvg,parseFloat(o).toFixed(2)):"0"}</span></span>\n                        <span class="exitPositionStockPLWrapper" id="CLOSE-POSITION-PL-${t.id}">\n                            <span class=${e(t.pl)}>${a}</span>\n                        </span>\n                        <span class="exitPositionLTPWrapper">\n                            LTP:&nbsp;\n                            <span id="CLOSE-POSITION-LTP-${t.id}" >\n                              <span class="${e(t.ltp_ch)}">\n                                ${t.ltp??0}\n                              </span>\n                            </span>\n                            <span class="exitPositionStockArrowWrapper" id="CLOSE-POSITION-ARROW-${t.id}">\n                              <span class="exitPositionStockArrowIcon ${t.ltp_ch>0?"exitPositionArrowUp":t.ltp_ch<0?"exitPositionArrowDown":""}">\n                              </span>\n                            </span>\n                        </span>\n                    </div>\n                </div>\n            </div>\n        `;
                        var o;
                        FyersWidget.popup_msg.getPopup({
                            category: "normal",
                            type: "modal",
                            title: "Close Positions",
                            desc: s,
                            desc_title: "",
                            pri_btn: "Close position",
                            seco_btn: "Cancel",
                            desc_sub: "",
                            identifierClass: "closePositionsModal"
                        }, (e => {
                            $("#fy_overLay").hide(), "primary" == e && broker.closePosition(t.id)
                        }))
                    },
                    customGttCancelOrder: function(t, r) {
                        let a = "",
                            i = "",
                            s = "";
                        t.symbol && (a = FyTrade.helper.getSymbolMasterValue(datafeed.unzippedData ? .data ? .[t.symbol], "exchange_name"), i = FyTrade.helper.getSymbolMasterValue(datafeed.unzippedData ? .data ? .[t.symbol], "symbol_details"), s = FyTrade.data.symbolPriceDict ? .[t.symbol] ? .v ? .cmd ? .c || 0);
                        let o = "";
                        t.symbol && (o = t.symbol.split(":")[1]);
                        let n = `\n      <div class="exitPositionWrapper realTimeOrderUpdateRequired">\n      <div class="exitPositionConfirmationText">You are about to cancel this order, check the details and confirm.</div>\n        <div class="exitPositionStockContainer align-items-center">\n              <div class="exitPositionStockPrimaryWrapper">\n                <div class="exitPositionStockInfo">\n                  <span>${1===t.side?"<span class='exitPositionProfitText'>BUY</span>":"<span class='exitPositionLossText'>SELL</span>"}</span>\n                  <span class="d-flex flex-nowrap"><span class='exitPositionStockItemSmall'>Qty: ${(2===t.gtt_oco_ind?1===t.side?`${t.qty2}/${t.qty}`:`${t.qty}/${t.qty2}`:`${t.qty}`)??"0"}</span></span>\n                  <span class="exitPositionStockItemSmall">${1===t.gtt_oco_ind?"GTT-SINGLE":"GTT-OCO"}</span>\n              </div>\n              <div class="exitPositionStockSymbolContainer"><span class="exitPositionStockSymbol">${o}</span> <span class="exitPositionStockExchange">${a??""}</span>\n              </div>\n              <div class="exitPositionStockItemSmall">${i??""}\n              </div>\n            </div>\n            <div class="exitPositionStockSecondaryWrapper">\n              <span class="exitPositionStockItemSmall pendingCancelOrderContainer">\n                    <span class="pendingCancelOrderImgWrapper">\n                      <img src="https://assets.fyers.in/global-components/trade-icons/widgets/pendingIcon.svg" height="12" width="12"/>\n                    </span>\n                    Pending\n              </span>\n                <span class="exitPositionStockPLWrapper">\n                  <span> ${2===t.gtt_oco_ind?`${t.leg2TriggerPrice}/${t.leg1TriggerPrice}`:t.triggerPrice}</span>\n                </span>\n              <span class="exitPositionLTPWrapper">\n              LTP:&nbsp;\n              <span id="CANCEL-ORDER-LTP-${t.id}" >\n                <span class="${e(t.ltp_ch||0)}">\n                  ${s}\n                </span>\n              </span>\n              <span class="exitPositionStockArrowWrapper" id="CANCEL-ORDER-ARROW-${t.id}">\n                ${t.ltp_ch?`<span class="exitPositionStockArrowIcon ${t.ltp_ch>0?"exitPositionArrowUp":t.ltp_ch<0?"exitPositionArrowDown":""}">`:""}\n              </span>\n            </span>\n            </span>\n            </div>\n        </div>\n      </div>\n    `;
                        FyersWidget.popup_msg.getPopup({
                            category: "normal",
                            type: "modal",
                            title: "Cancel order",
                            desc: n,
                            desc_title: "",
                            pri_btn: "Confirm cancel",
                            seco_btn: "Keep order",
                            desc_sub: "",
                            identifierClass: "cancelOrderModal"
                        }, (e => {
                            $("#fy_overLay").hide(), "primary" == e && TradeModules.gtt.handler.cancelGttOrder(t.id)
                        }))
                    },
                    modifySmartOrderWarningMessage: (t, r) => {
                        let a = "",
                            i = "",
                            s = "";
                        t.symbol && (a = FyTrade.helper.getSymbolMasterValue(datafeed.unzippedData ? .data ? .[t.symbol], "exchange_name"), i = FyTrade.helper.getSymbolMasterValue(datafeed.unzippedData ? .data ? .[t.symbol], "symbol_details"), s = FyTrade.data.symbolPriceDict ? .[t.symbol] ? .v ? .cmd ? .c || 0);
                        let o = "";
                        t ? .symbol && (o = t.symbol.split(":")[1]);
                        let n = `\n      <div class="exitPositionWrapper realTimeOrderUpdateRequired">\n      <div class="exitPositionConfirmationText">You are trying to modify a smart order.This modification might impact the expected behaviour of the smart order,Do you wish to continue?.</div>\n        <div class="exitPositionStockContainer align-items-center">\n              <div class="exitPositionStockPrimaryWrapper">\n                <div class="exitPositionStockInfo">\n                  <span class="d-flex flex-nowrap"><span class='exitPositionStockItemSmall'>Qty: ${t.qty??"0"}</span></span>\n                  <span class="exitPositionStockItemSmall">${t.productType??""}</span>\n              </div>\n              <div class="exitPositionStockSymbolContainer"><span class="exitPositionStockSymbol">${o}</span> <span class="exitPositionStockExchange">${a??""}</span>\n              </div>\n              <div class="exitPositionStockItemSmall">${i??""}\n              </div>\n            </div>\n            <div class="exitPositionStockSecondaryWrapper">\n              <span class=" d-none exitPositionStockItemSmall pendingCancelOrderContainer">\n                    <span class="pendingCancelOrderImgWrapper">\n                      <img src="https://assets.fyers.in/global-components/trade-icons/widgets/pendingIcon.svg" height="12" width="12"/>\n                    </span>\n                    Pending\n              </span>\n                <span class="d-none exitPositionStockPLWrapper">\n                  <span>${3===t.type?t.stopPrice:t.limitPrice?t.limitPrice:"0"}</span>\n                </span>\n              <span class="exitPositionLTPWrapper">\n              LTP:&nbsp;\n              <span id="CANCEL-ORDER-LTP-${t.id}" >\n                <span class="${e(t.ltp_ch||0)}">\n                  ${s}\n                </span>\n              </span>\n              <span class="exitPositionStockArrowWrapper" id="CANCEL-ORDER-ARROW-${t.id}">\n                ${t.ltp_ch?`<span class="exitPositionStockArrowIcon ${t.ltp_ch>0?"exitPositionArrowUp":t.ltp_ch<0?"exitPositionArrowDown":""}">`:""}\n              </span>\n            </span>\n            </span>\n            </div>\n        </div>\n      </div>\n    `;
                        FyersWidget.popup_msg.getPopup({
                            category: "normal",
                            type: "modal",
                            title: "Modify Smart Order",
                            desc: n,
                            desc_title: "",
                            pri_btn: "Confirm Modify",
                            seco_btn: "Keep order",
                            desc_sub: "",
                            identifierClass: "cancelOrderModal"
                        }, (e => {
                            $("#fy_overLay").hide(), "primary" == e && (smartOrders.modiFyWarningAccepted = !0, broker.modifyOrder(t, r))
                        }))
                    },
                    smartSipMandateSetup: () => {
                        FyersWidget.popup_msg.getPopup({
                            category: "warning",
                            type: "warning",
                            modal: "modal-md",
                            title: "Set up an e-Mandate",
                            desc: '\n    <div class="exitPositionWrapper realTimeOrderUpdateRequired">\n    <div class="exitPositionConfirmationText">Want to ensure smooth fund availability during SIP executions? Explore the e-mandate facility for hassle-free payments.\n    Note: Changes to your Equity SIP order will not affect the e-mandate.</div>\n </div>\n    ',
                            desc_title: "",
                            pri_btn: "Explore e-Mandate",
                            seco_btn: "Not now",
                            desc_sub: "",
                            identifierClass: ""
                        }, (e => {
                            $("#fy_overLay").hide(), "primary" == e && window.open("https://fyers.in/web/funds")
                        }))
                    }
                }
            }();
        class X {
            constructor() {}
            performOrderExecution(e) {
                const t = R.getTheSelectedSmartOrder();
                if (ie.isModifyOrder()) X.performSmartModifyOrderPlacement(e);
                else switch (t) {
                    case "smart-order-body-limit":
                        X.performSmartLimitOrderPlacement();
                        break;
                    case "smart-order-body-pegged":
                        X.performSmartPeggedOrderPlacement();
                        break;
                    case "smart-order-body-trail":
                        X.performSmartTrailOrderPlacement();
                        break;
                    case "smart-order-body-step":
                        X.performSmartStepOrderPlacement();
                        break;
                    case "smart-order-body-sip":
                        X.performSmartSipOrderPlacement()
                }
            }
            static performSmartPause(e) {
                X.performSmartPauseOrderPlacement(e)
            }
            static performSmartCancel(e) {
                X.performSmartCancelOrderPlacement(e)
            }
            static performSmartResume(e) {
                X.smartResumeOrderPlacement(e)
            }
            static async performSmartLimitOrderPlacement() {
                const e = ie.createSmartLimitOrderObject();
                let t = ie.getProductType(),
                    r = orderWindow.orderData.selectedSide;
                if (TradeModules.common.logAnalyticEvents("BtClk_ord_ordplcmt_ordwnd_plcsmrtord_s", {
                        product_type: t,
                        smart_order: "limit",
                        side: r
                    }), !await this.checkCdslFlow(e)) return;
                let a = await N.smartLimitOrderPlacement(e);
                I.apiCodes.fail.includes(a.code) ? FyTrade.common.fy_showToaster("error", I.placeOrder.title.error, a.message) : I.apiCodes.success === a.code && FyTrade.common.fy_showToaster("info", I.placeOrder.title.success, a ? .message || I.placeOrder.desc.success)
            }
            static async performSmartPeggedOrderPlacement() {
                const e = ie.createSmartPeggedOrderObject();
                if (!await this.checkCdslFlow(e)) return;
                let t = await N.smartPeggedOrderPlacement(e);
                I.apiCodes.fail.includes(t.code) ? FyTrade.common.fy_showToaster("error", I.placeOrder.title.error, t.message) : I.apiCodes.success === t.code && FyTrade.common.fy_showToaster("info", I.placeOrder.title.success, t ? .message || I.placeOrder.desc.success)
            }
            static async performSmartTrailOrderPlacement() {
                const e = ie.createSmartTrailOrderObject();
                let t = ie.getProductType(),
                    r = orderWindow.orderData.selectedSide;
                if (TradeModules.common.logAnalyticEvents("BtClk_ord_ordplcmt_ordwnd_plcsmrtord_s", {
                        product_type: t,
                        smart_order: "trail",
                        side: r
                    }), !await this.checkCdslFlow(e)) return;
                let a = await N.smartTrailOrderPlacement(e);
                I.apiCodes.fail.includes(a.code) ? FyTrade.common.fy_showToaster("error", I.placeOrder.title.error, a.message) : I.apiCodes.success === a.code && FyTrade.common.fy_showToaster("info", I.placeOrder.title.success, a ? .message || I.placeOrder.desc.success)
            }
            static async performSmartStepOrderPlacement() {
                const e = ie.createSmartStepOrderObject();
                let t = ie.getProductType(),
                    r = orderWindow.orderData.selectedSide;
                if (TradeModules.common.logAnalyticEvents("BtClk_ord_ordplcmt_ordwnd_plcsmrtord_s", {
                        product_type: t,
                        smart_order: "step",
                        side: r
                    }), !await this.checkCdslFlow(e)) return;
                let a = await N.smartStepOrderPlacement(e);
                I.apiCodes.fail.includes(a.code) ? FyTrade.common.fy_showToaster("error", I.placeOrder.title.error, a.message) : I.apiCodes.success === a.code && FyTrade.common.fy_showToaster("info", I.placeOrder.title.success, a ? .message || I.placeOrder.desc.success)
            }
            static async performSmartSipOrderPlacement() {
                const e = ie.createSmartSipOrderObject();
                let t = ie.getProductType(),
                    r = orderWindow.orderData.selectedSide;
                TradeModules.common.logAnalyticEvents("BtClk_ord_ordplcmt_ordwnd_plcsmrtord_s", {
                    product_type: t,
                    smart_order: "sip",
                    side: r
                });
                let a = await N.smartSipOrderPlacement(e);
                I.apiCodes.fail.includes(a.code) ? FyTrade.common.fy_showToaster("error", I.placeOrder.title.error, a.message) : I.apiCodes.success === a.code && (FyTrade.common.fy_showToaster("success", "Equity SIP Initiated", a ? .message || "Your Equity SIP has been successfully initiated."), Z.smartSipMandateSetup())
            }
            static async performSmartModifyOrderPlacement(e) {
                let t = await N.smartModifyOrderPlacement(e);
                I.apiCodes.fail.includes(t.code) ? FyTrade.common.fy_showToaster("error", I.placeOrder.title.error, t.message) : I.apiCodes.success === t.code && FyTrade.common.fy_showToaster("info", I.placeOrder.title.modify_success, t ? .message || I.placeOrder.desc.success)
            }
            static async performSmartPauseOrderPlacement(e) {
                let t = await N.smartPauseOrderPlacement(e);
                I.apiCodes.fail.includes(t.code) ? FyTrade.common.fy_showToaster("error", I.placeOrder.title.error, t.message) : I.apiCodes.success === t.code && FyTrade.common.fy_showToaster("info", I.placeOrder.title.pause_success, t ? .message || I.placeOrder.desc.success)
            }
            static async performSmartCancelOrderPlacement(e) {
                let t = await N.smartCancelOrderPlacement(e);
                I.apiCodes.fail.includes(t.code) ? FyTrade.common.fy_showToaster("error", I.placeOrder.title.error, t.message) : I.apiCodes.success === t.code && FyTrade.common.fy_showToaster("warning", I.placeOrder.title.delete_success, t ? .message || I.placeOrder.desc.delete_success)
            }
            static async smartResumeOrderPlacement(e) {
                let t = await N.smartResumeOrderPlacement(e);
                I.apiCodes.fail.includes(t.code) ? FyTrade.common.fy_showToaster("error", I.placeOrder.title.error, t.message) : I.apiCodes.success === t.code && FyTrade.common.fy_showToaster("success", I.placeOrder.title.resume_success, t.message || I.placeOrder.desc.success)
            }
            static async checkCdslFlow(e) {
                if (-1 !== e.side || e.productType !== I.productType.CNC || "N" != poaFlag || FyTrade.common.getDdpiFlag()) return !0;
                try {
                    return !!await FyTrade.place.cdslDetails(e)
                } catch (e) {
                    FyTrade.common.fy_showToaster(DEFINES.toaster.type.error, DEFINES.toaster.placeOrder.title.error)
                }
            }
        }
        const ee = X;
        class te {
            static handleSmartModifyFromAccountManager(e) {
                FyTrade.common.getSmartOrderSource(e ? .id_fyers) && Z.modifySmartOrderWarningMessage(e)
            }
            static handleSmartButtonClickedEvent() {
                try {
                    smartOrders.smartOrderMenuOpen = !0, R.hideoldOrderWindowBody(), this.addSmartOrdersMenuInOW(), this.attachSmartBannerClickEvents(), $("#buyButton").attr("disabled", !1), this.handleMppFileLoading(), this.emptyAlertSectionBar(), this.hideSmartSipFromSmartMenu()
                } catch (e) {
                    console.log(e)
                }
            }
            static hideSmartSipFromSmartMenu(e = !1) {
                const t = ie.getBuySellSide(),
                    r = $("#smartSipOrder"),
                    a = ie.getSymbolMasterData(),
                    i = (12 === a[22] || 10 === a[22]) && 10 === a[23],
                    s = -1 === t || !i || !globalConstants.config.enabled_features ? .smart_order_types_v2[R.getSmartOderTypesToMapWithConfig("smartSipOrder")];
                if (e) return s;
                r.length && r.toggleClass("d-none", s)
            }
            static disableBuySellToggle() {
                $("#order-toggle").addClass("d-none")
            }
            static enableBuySellToggle() {
                $("#order-toggle").removeClass("d-none")
            }
            static handleInitialSmartOrderValidation() {
                Y.handleInitialSmartOrderValidation()
            }
            static emptyAlertSectionBar() {
                orderWindow.alertMessages.length && orderWindow.alertMessages.splice(0, orderWindow.alertMessages.length), orderWindow.errorMessages.length && orderWindow.errorMessages.splice(0, orderWindow.errorMessages.length), $("#alertSection").empty()
            }
            static addAsmGmCheckIfRequired() {}
            static handleQtyAndLimPriceFromDomClick(e) {
                $("#smartLimitQty").val(e ? .qty), $("#smartLimitPriceField").val(e ? .limitPrice), $("#os_info").addClass("d-none"), K.handleSmartValidations("smartLimitQty"), K.handleSmartValidations("smartLimitPriceField")
            }
            static async handleMppFileLoading() {
                try {
                    const t = e.getIndianDateTime(),
                        r = e.getEpochTimeStamp(t);
                    if (globalConstants.masterFilesUpdateTime.mpp_json > r || !localStorage.getItem("_mppData")) {
                        const e = await fetch(V.SmartOrdersEndpoints.smart_order_mpp),
                            t = await e.json();
                        localStorage.setItem("_mppData", JSON.stringify(t))
                    }
                } catch (e) {
                    return console.log(e), {}
                }
            }
            static handleScrollEventForSmartOrderBook() {
                const e = $(".so_history_table-container"),
                    t = e.scrollTop(),
                    r = e[0].scrollHeight;
                t + e[0].clientHeight >= r - 5 && !smartOrders.orderBookLoading && (smartOrders.currentPage++, smartOrders.paginationFlag = !0, G.displaySmartOrderBook())
            }
            static enableHoverButtons(e, t) {
                const r = {
                        clone: $(e).find(".so_history_td:eq(9) .so_orderHistory_hover_details"),
                        paused: $(e).find(".so_history_td:eq(9) .so_orderHistory_hover_paused"),
                        resume: $(e).find(".so_history_td:eq(9) .so_orderHistory_hover_resume"),
                        modify: $(e).find(".so_history_td:eq(9) .so_orderHistory_hover_modify"),
                        cancel: $(e).find(".so_history_td:eq(9) .so_orderHistory_hover_cancel")
                    },
                    a = $(e).data("flowid"),
                    i = P.getState().orderBook.orderBookDataWithKey[a],
                    s = () => {
                        r.cancel.off().on("click", (e => {
                            e.stopPropagation(), ee.performSmartCancel(a)
                        })), r.paused.off().on("click", (e => {
                            e.stopPropagation(), ee.performSmartPause(a)
                        })), r.resume.off().on("click", (e => {
                            e.stopPropagation(), ee.performSmartResume(a)
                        })), r.modify.off().on("click", (e => {
                            e.stopPropagation(), FyTrade.modifyOrder(i)
                        })), r.clone.off().on("click", (e => {
                            e.stopPropagation(), TradeModules.SmartOrders.events.handleSmartOrderClone(i)
                        }))
                    },
                    o = (...e) => {
                        e.forEach((e => e.removeClass("d-none")))
                    },
                    n = $(e).find(".so_history_orderType_smartOrder").text();
                switch (t) {
                    case 13:
                    case 14:
                    case 132:
                    case 8:
                    case 11:
                    case 10:
                    case 9:
                    case 12:
                        o(r.clone), s();
                        break;
                    case 6:
                    case 3:
                        o(r.cancel, r.paused), s();
                        break;
                    case 4:
                    case 5:
                        o(r.resume), s();
                        break;
                    case 7:
                        o(r.modify, r.cancel, r.resume), s();
                        break;
                    case 15:
                    case 18:
                        {
                            let e = "Limit" === n;
                            ["Trail", "Step", "EQ SIP"].includes(n) ? o(r.cancel, r.paused) : e && o(r.modify, r.cancel),
                            s();
                            break
                        }
                }
            }
            static disableHoverButtons(e) {
                $(e).find(".so_history_td:eq(9) .so_orderHistory_hover_details").addClass("d-none"), $(e).find(".so_history_td:eq(9) .so_orderHistory_hover_paused").addClass("d-none"), $(e).find(".so_history_td:eq(9) .so_orderHistory_hover_resume").addClass("d-none"), $(e).find(".so_history_td:eq(9) .so_orderHistory_hover_modify").addClass("d-none"), $(e).find(".so_history_td:eq(9) .so_orderHistory_hover_cancel").addClass("d-none")
            }
            static changeSmartButtonClickedAppearcence() {
                $("#smart_toggle_icon1").attr("src", "https://assets.fyers.in/orderWindow/smartOrders/smartOrderSelected.svg"), $("#smart_toggle").addClass("smartButtonActive")
            }
            static undoSmartButtonClickEvent() {
                $("#scheduleField").removeClass("d-none"), $("#setting-icon-container").removeClass("d-none"), $("#orderTypeRow").removeClass("d-none"), $("#inputFieldsSectionOw").removeClass("d-none"), $("#nonBSESection").removeClass("d-none"), $("#smartOrdersParentContainer").addClass("d-none").removeClass("so_parentContainer"), $(".orderWindowModalAlerts").removeClass("d-none").addClass("d-block"), $(".mtf-banner-component").removeClass("d-none"), $(".orderwindow-footer").removeClass("d-none").addClass("d-block"), $("#smartOrdersParentContainer").empty()
            }
            static addValidationTosmartOrders() {}
            static handleSmartOWCloseButton() {
                smartOrders.smartOrderOpen = !1, this.removeSmartLimitOrderWindow(), this.removeSmartPeggedOrderWindow(), this.removeSmartStepOrderWindow(), this.removeSmartTrailOrderWindow(), this.removeSmartSipOrderWindow(), $("#inputFieldsSectionOw").removeClass("d-none"), $("#smartOrdersParentContainer").addClass("d-none"), $("#scheduleField").removeClass("d-none"), $("#setting-icon-container").removeClass("d-none"), $("#orderTypeRow").removeClass("d-none"), this.enableBuySellToggle(), this.showMarginComponent()
            }
            static removeSmartLimitOrderWindow() {
                $("#smart-order-body-limit").remove()
            }
            static removeSmartPeggedOrderWindow() {
                $("#smart-order-body-pegged").remove()
            }
            static removeSmartStepOrderWindow() {
                $("#smart-order-body-step").remove()
            }
            static removeSmartTrailOrderWindow() {
                $("#smart-order-body-trail").remove()
            }
            static removeSmartSipOrderWindow() {
                $("#smart-order-body-sip").remove()
            }
            static addSmartOrdersMenuInOW() {
                try {
                    const e = F.getSmartOrdersMenuFrame();
                    !$(".so_menuParentContainer").length && $("#smartOrdersParentContainer").append(e)
                } catch (e) {
                    console.log(e)
                }
            }
            static changeBuySellButtonNameToStart() {}
            static handleSmartButtonCloseEvent() {}
            static attachSmartBannerClickEvents() {
                $(".so_itemContainer").off().click((e => {
                    const t = $(e.currentTarget).attr("id");
                    t === I.smartMenuIdMatching.smart_trail ? TradeModules.common.logAnalyticEvents("BtClk_Trd_SO_trailCnf_trailClk_suc") : t === I.smartMenuIdMatching.sm_limit ? TradeModules.common.logAnalyticEvents("BtClk_Trd_SO_limitCnf_limitClk_suc") : t === I.smartMenuIdMatching.smart_step ? TradeModules.common.logAnalyticEvents("BtClk_Trd_SO_stepCnf_stepClk_suc") : t === I.smartMenuIdMatching.smart_sip && TradeModules.common.logAnalyticEvents("BtClk_Trd_SO_eqsipCnf_eqsipClk_suc"), this.triggerBannerItems(t), smartOrders.smartOrderMenuOpen = !1, smartOrders.smartOrderOpen = !0
                }))
            }
            static triggerBannerItems(e) {
                switch (this.emptyAlertSectionBar(), this.addAsmGmCheckIfRequired(), R.removeSmartBanner(), e) {
                    case I.smartMenuIdMatching.sm_limit:
                        this.appendSmartBodyModal(I.smartMenuIdMatching.sm_limit), K.initiateSmartLimitEvents();
                        break;
                    case I.smartMenuIdMatching.sm_iceberg:
                    case I.smartMenuIdMatching.sm_slice:
                        break;
                    case I.smartMenuIdMatching.smart_pegged:
                        this.appendSmartBodyModal(I.smartMenuIdMatching.smart_pegged), K.initiateSmartPeggedEvents();
                        break;
                    case I.smartMenuIdMatching.smart_step:
                        this.appendSmartBodyModal(I.smartMenuIdMatching.smart_step), K.initiateSmartStepEvents();
                        break;
                    case I.smartMenuIdMatching.smart_trail:
                        this.appendSmartBodyModal(I.smartMenuIdMatching.smart_trail), K.initiateSmartTrailEvents();
                        break;
                    case I.smartMenuIdMatching.smart_sip:
                        this.appendSmartBodyModal(I.smartMenuIdMatching.smart_sip), K.initiateSmartSipEvents()
                }
                smartOrders.smartOrderOpen = !0, ie.removeCustomData("#buyButton", "data-modifyid")
            }
            static appendSmartBodyModal(e) {
                let t;
                switch ($(".modal-body").addClass("d-none"), e) {
                    case I.smartMenuIdMatching.sm_limit:
                        t = W.getSmartLimitOrderFrame();
                        break;
                    case I.smartMenuIdMatching.smart_pegged:
                        t = W.getSmartPeggedOrderFrame();
                        break;
                    case I.smartMenuIdMatching.smart_trail:
                        t = W.getSmartTrailOrderFrame();
                        break;
                    case I.smartMenuIdMatching.smart_step:
                        t = W.getSmartStepOrderFrame();
                        break;
                    case I.smartMenuIdMatching.smart_sip:
                        t = W.getSmartSipOrderFrame();
                        break;
                    default:
                        console.log("No Matching Id found For SmartOrder")
                }
                $(t).appendTo(".orderwindow-body"), this.initiateSmartEvents(), K.addTooltips(e), R.enableOwBottomFooter()
            }
            static disableHighAndLowInPriceRange() {
                $("#priceRangeHigh").addClass("input-field-disabled disabled-stripes"), $("#priceRangeLow").addClass("input-field-disabled disabled-stripes"), $("#priceRangeHigh").removeClass("input-field-error"), $("#priceRangeLow").removeClass("input-field-error"), $("#priceRangeLow").val(""), $("#priceRangeHigh").val("")
            }
            static disableAndEnableForHighPriceRange(e) {
                this.disableHighAndLowInPriceRange(), $(e).removeClass("disabled-stripes input-field-disabled")
            }
            static enableFieldsForHighAndLow() {
                $("#priceRangeHigh").removeClass("disabled-stripes input-field-disabled"), $("#priceRangeLow").removeClass("disabled-stripes input-field-disabled")
            }
            static priceRangeSlider() {
                $("#so_priceRangeRadioButton").hasClass("invisible") ? $("#so_priceRangeRadioButton").removeClass("invisible") : ($("#so_priceRangeRadioButton").addClass("invisible"), this.disableHighAndLowInPriceRange(), $("#priceRangeRadioBtnHighId").attr("checked", !1), $("#priceRangeRadioBtnLowId").attr("checked", !1), $("#priceRangeRadioBtnHighLowId").attr("checked", !1), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.highGreaterThanLow))
            }
            static resetPriceRangeComponent() {
                $("#so_priceRangeRadioButton").addClass("invisible"), this.disableHighAndLowInPriceRange(), $("#priceRangeRadioBtnHighId").attr("checked", !1), $("#priceRangeRadioBtnLowId").attr("checked", !1), $("#priceRangeRadioBtnHighLowId").attr("checked", !1), orderWindow.common.removeValidationResult(orderWindow.errorMessages, I.alertBarMessages.ERROR_MESSAGES.highGreaterThanLow)
            }
            static handleMarginForSipAmount() {
                try {
                    const e = parseInt($("#smartLimitQty").val());
                    $("#margin-req-value").text(e), $("#leverageRate").text("")
                } catch (e) {
                    console.log(e)
                }
            }
            static initiateSmartEvents() {
                try {
                    const e = this;
                    $("#mppQtyBox").attr("step", .1), $("#smartLimittriggerPriceLabel").addClass("d-none"), $("#os_infol").addClass("d-none"), e.enableBuySellToggle(), $("#smartLimitTriggerPriceField").attr("placeholder", "Trigger Price"), $("#so_invest").unbind().click((function() {
                        K.investProductTypeClickEvents()
                    })), $("#so_trade").unbind().click((function() {
                        K.tradeProductTypeClickEvents()
                    })), $("#so_mtf").unbind().click((function() {
                        K.mtfProductTypeClickEvents()
                    })), K.updateBuySellButtonText("Start"), $(".so-menu-items").unbind().click((function(e) {
                        e.stopPropagation(), K.getDropDownMenuClickEvents()
                    })), K.updateTextsOfInputFields(), $("#smartLimitQty").unbind("keyup change").on("keyup change", (function(e) {
                        K.handleSmartValidations("smartLimitQty"), R.stepOrderWindowOpen() && (K.handleSmartValidations("smartStepInitialQty"), K.handleSmartValidations("smartStepAvgQty"))
                    })), $("#smartLimitPriceField").unbind("keyup change").on("keyup change", (function(e) {
                        K.handleSmartValidations("smartLimitPriceField")
                    })), $("#smartLimitTriggerPriceField").unbind("input").on("input", (function() {
                        K.handleSmartValidations("smartLimitTriggerPriceField")
                    })), $("#mppQtyBox").off("keyup change").on("keyup change", (function(e) {
                        e.stopPropagation(), K.handleSmartValidations("mppQtyBox")
                    })), $("#smartLimitMaxPriceBox").off("keyup change").on("keyup change", (function() {
                        K.handleSmartValidations("smartLimitMaxPriceBox")
                    })), $('input[name="actionEndTime"]').unbind().on("click", (function() {})), K.maskSmartTriggerPriceFieldConatiner(), K.maskMppQtyContainer(), K.attachSmartOrdersDropdownClickEvents(), $("#smartLimitEndTime").unbind("blur").on("blur", (function() {
                        K.smartLimitEndTimeValidation(), K.handleSmartValidations("smartLimitEndTime")
                    })), $("#sipFrequencyDayInput").unbind("input").on("input", (function() {
                        "Daily" !== !$("#sipFrequencyInput").val() && K.smartLimitEndTimeValidation(!1, !0)
                    })), $("#smartStepStartTime").unbind("blur").on("blur", (function() {
                        K.smartStartTimeValidation(), K.handleSmartValidations("smartStepStartTime")
                    })), $("#mppAdvancedToggle").unbind().click((function() {
                        te.handleMppToggleEvent()
                    })), $("#customMppCheckBox").unbind().click((function() {
                        K.customMppCheckBoxEvent(), K.handleSmartValidations("mppQtyBox")
                    })), $("#marketPriceCheckBox").unbind().click((function() {
                        K.marketPriceCheckBoxEvent(), K.handleSmartValidations("marketPriceCheckBox")
                    })), $("#triggerPriceCheckBox").unbind().click((function(e) {
                        K.triggerPriceCheckBoxEvent(), K.handleSmartValidations("smartLimitTriggerPriceField"), K.handleSmartValidations("triggerPriceCheckBox")
                    })), $("#so-backArrow").unbind().click((function() {
                        K.smartBackArrowEvent()
                    })), $("#mppFieldLabel").unbind().hover((function(e) {
                        e.stopPropagation()
                    })), $("#actionEndTimeCancel").unbind().click((function() {
                        e.actionEndTimeCancelClickEvent()
                    })), $("#actionEndTimeConvert").unbind().click((function() {
                        e.actionEndTimeConvertMarket()
                    })), $("#so_mtf").addClass("d-none"), ie.canWeShowMtfToClient() && $("#so_mtf").removeClass("d-none"), $("#smartLimitEndTime").attr("step", "60"), K.handleIntialSmartValidations(), $(document).click((function(e) {
                        e.stopPropagation(), $("#sipFrequenceDropDownContainer").length && $("#sipFrequenceDropDownContainer").css("display", "none"), $("#sipFrequenceDropDownContainerStep").length && ($("#sipFrequenceDropDownContainerStep").remove(), $("#sipFrequenceDropDownContainerStep").css("display", "none")), $("#sipFrequenceDropDownContainerDate").length && ($("#sipFrequenceDropDownContainerDate").remove(), $("#sipFrequenceDropDownContainerDate").css("display", "none")), $("#sipFrequenceDropDownContainerMonthly").length && ($("#sipFrequenceDropDownContainerMonthly").remove(), $("#sipFrequenceDropDownContainerMonthly").css("display", "none")), $(".so_dropdown_container").length && K.getDropDownMenuClickEvents(!0)
                    })), e.showMarginComponent()
                } catch (e) {
                    console.log(e)
                }
            }
            static actionEndTimeCancelClickEvent() {
                $("#cancelTheOrder").prop("checked", !0), $("#so_advancedContainer").addClass("d-none").removeClass("d-flex")
            }
            static actionEndTimeConvertMarket() {
                $("#convertToMarket").prop("checked", !0), $("#so_advancedContainer").removeClass("d-none").addClass("d-flex")
            }
            static handleMppToggleEvent() {
                K.mppAdvancedToggleEvent(), K.handleSmartValidations("mppAdvancedToggle"), R.stepOrderWindowOpen() && K.resetStepAdvancedComponentsWhenAdvancedNotToggled(), R.trailOrderWindowOpen() && K.resetTrailAdvancedComponentsWhenAdvancedNotToggled()
            }
            static handleSmartOrderModify(e) {
                try {
                    switch (K.removeSmartOrderSectionFromOrderWindow(), e.flowtype) {
                        case 1:
                        case 2:
                            break;
                        case 3:
                            this.triggerBannerItems(I.smartMenuIdMatching.smart_step), ie.updateSmartWindowWithModifyObjectData(e, I.smartMenuIdMatching.smart_step);
                            break;
                        case 4:
                            this.triggerBannerItems(I.smartMenuIdMatching.sm_limit), ie.updateSmartWindowWithModifyObjectData(e, I.smartMenuIdMatching.sm_limit);
                            break;
                        case 5:
                            this.triggerBannerItems(I.smartMenuIdMatching.smart_pegged), ie.updateSmartWindowWithModifyObjectData(e, I.smartMenuIdMatching.smart_pegged);
                            break;
                        case 6:
                            this.triggerBannerItems(I.smartMenuIdMatching.smart_trail), ie.updateSmartWindowWithModifyObjectData(e, I.smartMenuIdMatching.smart_trail);
                            break;
                        case 7:
                            this.triggerBannerItems(I.smartMenuIdMatching.smart_sip), ie.updateSmartWindowWithModifyObjectData(e, I.smartMenuIdMatching.smart_sip)
                    }
                    K.blockSmartHeaderEventsForModifyOrClone(), this.emptyAlertSectionBar(), this.addAsmGmCheckIfRequired(), setTimeout((() => {
                        $(".orderwindow-body .main-setting-modal").addClass("d-none")
                    }), 10), R.hideMtfBanner(), setTimeout((() => {
                        R.stepOrderWindowOpen() && j.handleInitialStepValidation()
                    }), 100), setTimeout((() => {
                        K.updateBuySellButtonText("Modify")
                    }), 1100), smartOrders.smartOrderOpen = !0
                } catch (e) {
                    console.log(e)
                }
            }
            static handleSmartClone(e) {
                switch (e.clone = !0, K.removeSmartOrderSectionFromOrderWindow(), e.flowtype) {
                    case 1:
                    case 2:
                        break;
                    case 3:
                        this.triggerBannerItems(I.smartMenuIdMatching.smart_step), ie.updateSmartWindowWithClonedObjectData(e, I.smartMenuIdMatching.smart_step);
                        break;
                    case 4:
                        this.triggerBannerItems(I.smartMenuIdMatching.sm_limit), ie.updateSmartWindowWithClonedObjectData(e, I.smartMenuIdMatching.sm_limit);
                        break;
                    case 5:
                        this.triggerBannerItems(I.smartMenuIdMatching.smart_pegged), ie.updateSmartWindowWithClonedObjectData(e, I.smartMenuIdMatching.smart_pegged);
                        break;
                    case 6:
                        this.triggerBannerItems(I.smartMenuIdMatching.smart_trail), ie.updateSmartWindowWithClonedObjectData(e, I.smartMenuIdMatching.smart_trail);
                        break;
                    case 7:
                        this.triggerBannerItems(I.smartMenuIdMatching.smart_sip), ie.updateSmartWindowWithClonedObjectData(e, I.smartMenuIdMatching.smart_sip)
                }
            }
            static async attachOrderDetails(e) {
                let t = P.getState().orderBook.orderBookDataWithKey[e],
                    r = R.mapDataForOrderDetailSection(t),
                    a = R.createOrderDetails(t.flowtype, t);
                const i = await N.getSmartOrderHistory(e, t ? .flowtype),
                    s = i ? .orderHistory,
                    o = W.getSmartOrderDetails(a, s, r);
                $(".so_history_heading-container").append(o), this.handleThemeForOrderDetails(), this.initiateEventHandlersForOrderDetailSection()
            }
            static handleThemeForOrderDetails() {
                $(".so_history_parent_container").hasClass("so_history_parent_container-dark") ? $("#orderDetailsSideSection").addClass("smartOrderDetailsDark") : $("#orderDetailsSideSection").removeClass("smartOrderDetailsDark")
            }
            static initiateEventHandlersForOrderDetailSection() {
                $("#smartOrderDetailsclose").off().click((() => {
                    $("#orderDetailsSideSection").remove()
                })), $("#orderDetailsDropDownWrapper").off().click((() => {
                    $("#orderDetailDropdown").toggle(""), $("#smartOrderSectionDropArrow").hasClass("smartArrowRotate") ? $("#smartOrderSectionDropArrow").removeClass("smartArrowRotate") : $("#smartOrderSectionDropArrow").addClass("smartArrowRotate")
                })), $("#orderHistoryDropDownWrapper").off().click((() => {
                    $("#orderHistoryDropDown").toggle(""), $("#smartOrderHistorySectionDropArrow").hasClass("smartArrowRotate") ? $("#smartOrderHistorySectionDropArrow").removeClass("smartArrowRotate") : $("#smartOrderHistorySectionDropArrow").addClass("smartArrowRotate")
                })), $(".orderDetailsCTA").off().click((() => {
                    broker._host.activateBottomWidget()
                }))
            }
            static handleSipStepUpSliderClick() {
                $("#sipStepUpAdvancedInput").hasClass("d-none") && R.getRadioButtonCheckedOrNot("sipStepUpSlider") ? $("#sipStepUpAdvancedInput").removeClass("d-none") : this.resetSipStepUpComponent()
            }
            static handleSipExpirySliderClick() {
                $("#sipExpiryAdvanced").hasClass("d-none") && R.getRadioButtonCheckedOrNot("sipExpirySlider") ? ($("#sipExpiryAdvanced").removeClass("d-none"), R.getPrefillSipExpiryDatev2()) : this.resetSipExpiryComponent(), K.handleSmartValidations("sipExpiryInputId")
            }
            static resetSipStepUpComponent() {
                R.getRadioButtonCheckedOrNot("sipStepUpSlider") && R.getRadioButtonUnChecked("sipStepUpSlider"), $("#so_sip_QtyPrimary").hasClass("so_qtyAmountSwapParentConatinerActive") ? $("#stepUpQuantityInputId").val(1) : R.getSipAmountButtonActive() && $("#stepUpQuantityInputId").val(1e3), $("#sipStepUpAdvancedInput").addClass("d-none")
            }
            static resetSipExpiryComponent() {
                R.getRadioButtonCheckedOrNot("sipExpirySlider") && R.getRadioButtonUnChecked("sipExpirySlider"), this.handleSipExpiryDateButtonClick(), $("#sipExpiryAdvanced").addClass("d-none")
            }
            static handleSipQtyPrimaryClicked(e = 20) {
                $("#so_sip_AmountSecondary").removeClass("so_qtyAmountSwapParentConatinerActive"), $("#so_sip_QtyPrimary").addClass("so_qtyAmountSwapParentConatinerActive"), $("#smartLimitQtyLabel").contents().get(0).nodeValue = "Qty", $("#lotTextId").removeClass("d-none"), $("#stepUpQuantityInputId").val(1), $("#stepUpQuantityLabel").contents().get(0).nodeValue = "Step Up Quantity", $("#sipExpiryAmountButton").find("div > div").text("Qty"), $("#smartLimitQty").val(e), $("#smartLimitQty").attr("step", R.getLotSize()), $("#smartLimitQty").attr("min", 1), $("#sipExpiryAmountButton").hasClass("so_qtyAmountSwapParentConatinerActive") && this.handleSipExpiryAmountButtonClickForQty(), this.showMarginComponent(), orderWindow.events.getMarginForSmartOrders(), Y.handleInitialSmartSipValidation()
            }
            static handleSipAmountSecondaryClicked(e = null) {
                $("#so_sip_AmountSecondary").addClass("so_qtyAmountSwapParentConatinerActive"), $("#so_sip_QtyPrimary").removeClass("so_qtyAmountSwapParentConatinerActive"), $("#smartLimitQtyLabel").contents().get(0).nodeValue = "Amount", $("#lotTextId").addClass("d-none"), $("#stepUpQuantityLabel").contents().get(0).nodeValue = "Step Up Amount", $("#stepUpQuantityInputId").val(1e3), $("#sipExpiryAmountButton").find("div > div").text("Amount"), $("#smartLimitQty").val(e || (5e3 > ie.getLtpPrice() ? 5e3 : ie.getLtpPrice())), $("#smartLimitQty").attr("step", 500), $("#smartLimitQty").attr("min", R.getMinSipValue()), $("#sipExpiryAmountButton").hasClass("so_qtyAmountSwapParentConatinerActive") && this.handleSipExpiryAmountButtonClickForAmount(), Y.handleInitialSmartSipValidation(), this.hideMarginComponent()
            }
            static handleSipExpiryDateButtonClick(e = null) {
                $("#sipExpiryDateButton").hasClass("so_qtyAmountSwapParentConatinerActive") || ($("#sipExpiryDateButton").addClass("so_qtyAmountSwapParentConatinerActive"), $("#sipExpiryAmountButton").removeClass("so_qtyAmountSwapParentConatinerActive"), $("#sipExpiryLabel").contents().get(0).nodeValue = "Expiry Date", $("#sipExpiryInputId").attr("type", "date"), $("#sipExpiryInputId").val(e || `${R.getTodayDate().year+10}-${R.getTodayDate().month}-${R.getTodayDate().day}`), R.getPrefillSipExpiryDatev2(), $("#sipExpiryInputId").attr("min", `${R.getTodayDate().year}-${R.getTodayDate().month}-${R.getTodayDate().day}`), $("#sipExpiryInputId").attr("max", `${R.getTodayDate().year+10}-${R.getTodayDate().month}-${R.getTodayDate().day}`), $("#sipExpiryInputId").removeAttr("step"), j.validateSipExpiryInputValue())
            }
            static handleSipExpiryAmountButtonClick() {
                $("#sipExpiryAmountButton").hasClass("so_qtyAmountSwapParentConatinerActive") || ($("#sipExpiryAmountButton").addClass("so_qtyAmountSwapParentConatinerActive"), $("#sipExpiryDateButton").removeClass("so_qtyAmountSwapParentConatinerActive"), $("#sipExpiryInputId").attr("type", "number"), "Qty" === $("#sipExpiryAmountButton").find("div > div").text() ? this.handleSipExpiryAmountButtonClickForQty() : "Amount" === $("#sipExpiryAmountButton").find("div > div").text() && this.handleSipExpiryAmountButtonClickForAmount())
            }
            static handleSipExpiryAmountButtonClickForAmount() {
                const e = $("#sipExpiryInputId");
                $("#sipExpiryLabel").contents().get(0).nodeValue = "Expiry Amount", e.val("1000000"), e.attr("step", 500)
            }
            static handleSipExpiryAmountButtonClickForQty() {
                const e = $("#sipExpiryInputId");
                $("#sipExpiryLabel").contents().get(0).nodeValue = "Expiry Qty", e.val("1000"), e.attr("step", 1)
            }
            static resetSipPriceRangeComponent() {
                R.getRadioButtonCheckedOrNot("so_priceRangeSlider") && K.handlePriceRangeToggle(), R.getRadioButtonCheckedOrNot("so_priceRangeSlider") && R.getRadioButtonUnChecked("so_priceRangeSlider")
            }
            static handleSipAdvancedToggle() {
                R.getRadioButtonCheckedOrNot("sipAdvancedSlider") ? ($("#sipAdvancedFeatureComponent").removeClass("d-none"), this.handleAdvancedSectionForCustomFrequency()) : (this.resetSipExpiryComponent(), this.resetSipStepUpComponent(), this.resetSipPriceRangeComponent(), $("#sipAdvancedFeatureComponent").addClass("d-none")), K.handleSmartValidations("sipExpiryInputId")
            }
            static handleAdvancedSectionForCustomFrequency() {
                "Custom" === $("#sipFrequencyInput").val() ? (te.handleSipExpirySliderClick(), te.handleSipStepUpSliderClick(), $("#sipStepUpAdvancedConatiner").addClass("d-none").removeClass("d-flex"), $("#sipExpiryAdvancedContainer").addClass("d-none").removeClass("d-flex")) : R.getRadioButtonCheckedOrNot("sipAdvancedSlider") && ($("#sipStepUpAdvancedConatiner").removeClass("d-none").addClass("d-flex"), $("#sipExpiryAdvancedContainer").removeClass("d-none").addClass("d-flex"))
            }
            static handleExecuteSipImmediateCheckbox() {
                const e = new Date,
                    t = 60 * parseInt(e.getHours()) + parseInt(e.getMinutes());
                t < R.getSessionStartTimeInMinutes() || t > R.getSessionEndTimeInMinutes() ? $("#execurteFirstRow").css("display", "none") : $("#execurteFirstRow").css("display", "auto")
            }
            static smartSipPreRequisite() {
                $("#sipFrequencyInput").val("Monthly"), $("#stepUpQFrequencyInputId").val("Monthly"), $("#stepUpQuantityInputId").val(1), $("#sipStepUpAdvancedInput").addClass("d-none"), $("#sipExpiryAdvanced").addClass("d-none"), R.getPrefillSipExpiryDatev2(), $("#sipExpiryInputId").val(`${R.getTodayDate().year+10}-${R.getTodayDate().month}-${R.getTodayDate().day}`), $("#sipExpiryInputId").attr("min", `${R.getTodayDate().year}-${R.getTodayDate().month}-${R.getTodayDate().day}`), $("#sipExpiryInputId").attr("max", `${R.getTodayDate().year+10}-${R.getTodayDate().month}-${R.getTodayDate().day}`), $("#sipExpiryInputId").removeAttr("step"), $("#so_trade").addClass("d-none"), $("#so_invest").addClass("so-btn-product-selected"), $("#so_trade").removeClass("so-btn-product-selected"), $("#so_mtf").removeClass("so-btn-product-selected"), $("#sipAdvancedFeatureComponent").addClass("d-none"), this.handleExecuteSipImmediateCheckbox(), $("#sipFrequencyDayInput").val("1st of every month"), this.disableBuySellToggle(), $("#smartLimitQty").val(20), orderWindow.events.getMarginForSmartOrders(), this.sipFrequencyInputReadOnlyTrue(), R.highlightSipFrequencyRadioButton()
            }
            static sipFrequencyInputReadOnlyTrue() {
                $("#sipFrequencyInput").attr("readOnly", !0), $("#sipFrequencyDayInput").attr("readOnly", !0)
            }
            static sipFrequencyInputReadOnlyFalse() {
                $("#sipFrequencyInput").attr("readOnly", !1), $("#sipFrequencyDayInput").attr("readOnly", !1)
            }
            static hideMarginComponent() {
                $("#marginDetails").addClass("d-none").removeClass("d-flex"), $("#invokePriceBreakup").addClass("invisible").removeClass("d-flex")
            }
            static showMarginComponent() {
                $("#marginDetails").removeClass("d-none").addClass("d-flex"), $("#invokePriceBreakup").removeClass("invisible").addClass("d-flex")
            }
            static removeMaxMinPrtopertyFromFrequencyDateInput() {
                $("#sipFrequencyDayInput").removeAttr("max"), $("#sipFrequencyDayInput").removeAttr("min")
            }
            static sipDailyFreqClickHandler(e = null) {
                $("#sipFrequenceDropDownContainer").css("display", "none"), $("#sipFrequencyInput").val("Daily"), $("#stepUpQFrequencyInputId").val("Daily"), this.removeMaxMinPrtopertyFromFrequencyDateInput(), $("#sipFrequencyDayInput").prop("type", "time"), $("#sipFrequencyDayInput").attr("step", "60"), $("#sipFrequencyDayInput").val(e || "11:00"), $("#sipFrequencyDayLabel").contents().get(0).nodeValue = "SIP Time", this.handleAdvancedSectionForCustomFrequency(), this.sipFrequencyInputReadOnlyFalse()
            }
            static sipWeeklyFreqClickHandler(e = null) {
                $("#sipFrequenceDropDownContainer").css("display", "none"), $("#sipFrequencyInput").val("Weekly"), $("#stepUpQFrequencyInputId").val("Weekly"), this.removeMaxMinPrtopertyFromFrequencyDateInput(), $("#sipFrequencyDayInput").prop("type", "text"), $("#sipFrequencyDayInput").val(e || "Monday"), this.handleAdvancedSectionForCustomFrequency(), this.sipFrequencyInputReadOnlyTrue()
            }
            static sipMonthlyFreqClickHandler(e = null) {
                $("#sipFrequenceDropDownContainer").css("display", "none"), $("#sipFrequencyInput").val("Monthly"), $("#stepUpQFrequencyInputId").val("Monthly"), this.removeMaxMinPrtopertyFromFrequencyDateInput(), $("#sipFrequencyDayInput").prop("type", "text"), $("#sipFrequencyDayInput").val(e || "1st of every month"), this.handleAdvancedSectionForCustomFrequency(), this.sipFrequencyInputReadOnlyTrue()
            }
            static sipCustomFreqClickHandler(e = null) {
                $("#sipFrequenceDropDownContainer").css("display", "none"), $("#sipFrequencyInput").val("Custom"), $("#stepUpQFrequencyInputId").val("Yearly"), $("#sipFrequencyDayInput").prop("type", "date"), $("#sipFrequencyDayInput").removeAttr("step"), $("#sipFrequencyDayInput").val(e || `${R.getTodayDate().year}-${R.getTodayDate().month}-${R.getTodayDate().day}`), $("#sipFrequencyDayInput").attr("min", `${R.getTodayDate().year}-${R.getTodayDate().month}-${R.getTodayDate().day}`), $("#sipFrequencyDayInput").attr("max", `${R.getTodayDate().year+1}-${R.getTodayDate().month}-${R.getTodayDate().day}`), $("#sipFrequencyDayLabel").contents().get(0).nodeValue = "SIP Date", this.sipFrequencyInputReadOnlyFalse(), this.handleAdvancedSectionForCustomFrequency()
            }
        }
        const re = te;
        class ae {
            static getBuySellSide() {
                return "buy" === orderWindow.orderData.selectedSide ? 1 : -1
            }
            static getBuySellSideInString(e) {
                return 1 === e ? "BUY" : "SELL"
            }
            static getUserSettingsProductType() {
                return JSON.parse(e.getUserSettingsDataFromLocalStorage()).orderWindow.productType
            }
            static getEpocTimeInSeconds(e) {
                let t = new Date;
                const [r, a] = e.split(":");
                return t.setHours(r), t.setMinutes(a), t.setSeconds(0), t.getTime() / 1e3
            }
            static canWeShowMtfToClient() {
                return FyTrade.common.getMtfFlag() && FyTrade.common.getMtfEnableFlag() && orderWindow.common.getMtfEnabledStock()
            }
            static convertToEpochTimeZoneFix(e) {
                let t = e.split(":"),
                    r = parseInt(t[0]),
                    a = parseInt(t[1]),
                    i = new Date,
                    s = 198e5,
                    o = new Date(i.getTime() + s),
                    n = new Date(Date.UTC(o.getUTCFullYear(), o.getUTCMonth(), o.getUTCDate(), r, a)),
                    d = new Date(n.getTime() - s);
                return Math.floor(d.getTime() / 1e3)
            }
            static extractHoursAndMinutes(e, t = !1, r = !1, a = !1) {
                let i, s, o = "";
                if (t) {
                    const t = new Date(13 === e.toString().length ? e : 1e3 * e);
                    i = t.getHours(), s = t.getMinutes(), r && (o = `${t.getFullYear()}-${(t.getMonth()+1).toString().padStart(2,"0")}-${t.getDate().toString().padStart(2,"0")}`)
                } else {
                    let [t, r] = e.split(" ");
                    [i, s] = r.split(":")
                }
                let n = parseInt(i) < 10 ? `${String(i).padStart(2,"0")}` : i,
                    d = parseInt(s) < 10 ? `${String(s).padStart(2,"0")}` : s;
                return a ? `${n}:${d}` : r ? `${o}` : `${n}:${d}`
            }
            static getSeconds(e) {
                try {
                    if (!e) return 5;
                    let [t, r] = e.split(":");
                    return t = Number(t), r = Number(r), e.includes(":") || (t = 0, r = Number(e)), 60 * t + r
                } catch (e) {
                    console.log(e)
                }
            }
            static getProductType() {
                let e;
                return $("#so_trade").hasClass("so-btn-product-selected") ? e = "INTRADAY" : $("#so_invest").hasClass("so-btn-product-selected") ? e = this.getCncOrMargin() : $("#so_mtf").hasClass("so-btn-product-selected") && (e = "MTF"), e
            }
            static getDirection(e) {
                return e > 0 || 0 === e ? 1 : -1
            }
            static toggleBasedOnProductType(e) {
                switch (e) {
                    case "INTRADAY":
                    default:
                        K.tradeProductTypeClickEvents();
                        break;
                    case "CNC":
                    case "MARGIN":
                        K.investProductTypeClickEvents();
                        break;
                    case "MTF":
                        K.mtfProductTypeClickEvents()
                }
            }
            static getCncOrMargin(e = null) {
                let t;
                return t = 10 === this.getSymbolMasterValue(e ? ? orderWindow.orderData.selectedSymbol, "segment_code") ? "CNC" : "MARGIN", t
            }
            static getSymbolMasterData(e = null) {
                let t = e || orderWindow.orderData.selectedSymbol;
                try {
                    return datafeed.unzippedData.data ? .[t]
                } catch (e) {
                    throw "Unable read datafeed"
                }
            }
            static getSymbolMasterValue(e, t) {
                let r = e || orderWindow.orderData.selectedSymbol,
                    a = this.getSymbolMasterData(r);
                try {
                    const e = datafeed.unzippedData.data_format.indexOf(t);
                    return a ? .[e]
                } catch (e) {
                    throw `Error while getting datafeed value ${t}: ${e}`
                }
            }
            static getOrdertypeCode = e => {
                let t;
                switch (e) {
                    case "MARKET":
                    default:
                        t = 2;
                        break;
                    case "LIMIT":
                        t = 1;
                        break;
                    case "STOP":
                        t = 3;
                        break;
                    case "STOP LIMIT":
                        t = 4
                }
                return t
            };
            static getOrderTypeFromCode(e) {
                return {
                    1: "LIMIT",
                    2: "MARKET",
                    3: "STOP",
                    4: "STOP LIMIT"
                }[e]
            }
            static getOrderType() {
                let e, t = $('input[name="marketPriceCheckBox"]:checked').val(),
                    r = $("#triggerPriceCheckBox").prop("checked");
                return t && !r ? e = "MARKET" : t || r ? t && r ? e = "STOP" : r && !t && (e = "STOP LIMIT") : e = "LIMIT", e
            }
            static getOrderWindowSymbol() {
                return orderWindow.orderData.selectedSymbol
            }
            static getSmartOrderObject(e) {
                return R.limitOrderWindowOpen() ? ae.createSmartLimitOrderObject() : R.peggedOrderWindowOpen() ? ae.createSmartPeggedOrderObject() : R.trailOrderWindowOpen() ? ae.createSmartTrailOrderObject() : R.stepOrderWindowOpen() ? ae.createSmartStepOrderObject(!0, e) : R.sipOrderWindowOpen() ? ae.createSmartSipOrderObject(!0) : void 0
            }
            static formatOrderObjectWithNullSafety(e) {
                Object.keys(e).forEach((t => {
                    (null === e[t] || void 0 === e[t] || Number.isNaN(e[t])) && delete e[t]
                }))
            }
            static createSmartLimitOrderObject() {
                const e = this.getOrderWindowSymbol(),
                    t = this.getProductType(),
                    r = this.getBuySellSide(),
                    a = this.getOrdertypeCode(this.getOrderType()),
                    i = parseInt(this.getInputValue("#smartLimitQty")),
                    s = parseInt(this.convertToEpochTimeZoneFix(this.getInputValue("#smartLimitEndTime"))),
                    o = parseFloat(this.getInputValue("#smartLimitPriceField")),
                    n = parseFloat(this.getInputValue("#smartLimitTriggerPriceField")),
                    d = parseInt(this.getInputValue('input[name="actionEndTime"]:checked')),
                    l = this.isCheckboxChecked("#mppAdvancedToggle"),
                    c = parseFloat(this.getInputValue("#mppQtyBox")),
                    p = this.isCheckboxChecked("#customMppCheckBox"),
                    m = this.isCheckboxChecked("#customMaxPriceLimitCheckBox"),
                    u = parseFloat(this.getInputValue("#smartLimitMaxPriceBox")),
                    g = {
                        symbol: e,
                        productType: t,
                        side: r,
                        qty: i,
                        endTime: s,
                        orderType: a,
                        limitPrice: o,
                        onExp: d,
                        mpp: c,
                        stopPrice: n
                    };
                return p || (g.mpp = -1), l && m && (g[1 === r ? "hpr" : "lpr"] = u), this.formatOrderObjectWithNullSafety(g), g
            }
            static createSmartPeggedOrderObject() {
                const e = this.getOrderWindowSymbol(),
                    t = this.getProductType(),
                    r = this.getBuySellSide(),
                    a = parseInt(this.getInputValue("#smartLimitQty")),
                    i = parseInt(this.getEpocTimeInSeconds(this.getInputValue("#smartLimitEndTime"))),
                    s = parseInt(this.getInputValue('input[name="actionEndTime"]:checked')),
                    o = this.isCheckboxChecked("#mppAdvancedToggle"),
                    n = parseFloat(this.getInputValue("#mppQtyBox")),
                    d = parseInt(this.getSeconds(this.getInputValue("#smartTimeInterval"))),
                    l = parseFloat(this.getInputValue("#priceRangeHigh")),
                    c = parseFloat(this.getInputValue("#priceRangeLow")),
                    p = {
                        symbol: e,
                        productType: t,
                        side: r,
                        qty: a,
                        endTime: i,
                        interval: d,
                        orderType: 1,
                        onExp: s,
                        mpp: n,
                        peg: parseInt(this.getInputValue('input[name="peggedLot"]:checked')),
                        offset: parseFloat(this.getInputValue("#peggedAdjustmentField")),
                        offsetType: parseInt(this.getInputValue('input[name="adjustmentDirection"]:checked')),
                        hpr: l,
                        lpr: c
                    };
                return o || delete p.mpp, this.formatOrderObjectWithNullSafety(p), p
            }
            static createSmartTrailOrderObject() {
                const e = this.getOrderWindowSymbol(),
                    t = this.getProductType(),
                    r = parseInt(this.getBuySellSide()),
                    a = parseInt(this.getInputValue("#smartLimitQty")),
                    i = parseFloat(this.getInputValue("#smartTrailTriggerPrice")),
                    s = parseFloat(this.getInputValue("#smartTrailLimitPriceField")),
                    o = parseFloat(this.getInputValue("#smartTrailJumpPriceField")),
                    n = (this.isCheckboxChecked("#mppAdvancedToggle"), parseFloat(this.getInputValue("#mppQtyBox"))),
                    d = {
                        symbol: e,
                        qty: a,
                        limitPrice: s,
                        stopPrice: i,
                        productType: t,
                        side: r,
                        jump_diff: o,
                        target_price: parseFloat(this.getInputValue("#smartTrailTragetPriceBox")),
                        orderType: this.getSmartTrailOrderType(),
                        mpp: n
                    };
                return this.isCheckboxChecked("#trailMarketPriceCheckBox") && delete d.limitPrice, this.isCheckboxChecked("#customMppCheckBox") || delete d.mpp, this.isCheckboxChecked("#customTrailTargetCheckBox") || delete d.target_price, this.formatOrderObjectWithNullSafety(d), d
            }
            static createSmartStepOrderObject(e = !1, t) {
                const r = this.getOrderWindowSymbol(),
                    a = this.getProductType(),
                    i = parseInt(this.getBuySellSide()),
                    s = parseInt(this.getInputValue("#smartLimitQty")),
                    o = parseInt(this.getEpocTimeInSeconds(this.getInputValue("#smartStepStartTime"))),
                    n = parseInt(this.getEpocTimeInSeconds(this.getInputValue("#smartLimitEndTime"))),
                    d = parseFloat(this.getInputValue("#priceRangeHigh")),
                    l = parseFloat(this.getInputValue("#priceRangeLow")),
                    c = parseFloat(this.getInputValue("#mppQtyBox")),
                    p = this.getStepDirection(),
                    m = parseInt(this.getInputValue("#smartStepAvgQty")),
                    u = parseFloat(this.getInputValue("#smartStepAvgEntryDiffQty")),
                    g = parseFloat(this.getInputValue("#smartStepLimitPriceField")),
                    h = parseFloat(this.getInputValue("#smartStepInitialQty")),
                    y = (this.isCheckboxChecked("#mppAdvancedToggle"), this.isCheckboxChecked("#so_priceRangeSlider"), {
                        symbol: r,
                        orderType: 1,
                        productType: a,
                        side: i,
                        qty: s,
                        startTime: o,
                        endTime: n,
                        hpr: d,
                        lpr: l,
                        mpp: c,
                        direction: p,
                        avgqty: m,
                        avgdiff: u,
                        limitPrice: g,
                        initQty: h
                    });
                return this.isCheckboxChecked("#stepOrderCustomAverage") || (delete y.limitPrice, y.orderType = 2), this.handleHprLprKey(y), this.handleMppKey(y), e && this.modifyStepOrderObjectWithModifiedKeys(y, t), this.formatOrderObjectWithNullSafety(y), y
            }
            static createSmartSipOrderObject(e = !1) {
                const t = this.getOrderWindowSymbol(),
                    r = this.getProductType(),
                    a = R.getSipQtyButtonActive() ? parseInt(this.getInputValue("#smartLimitQty")) : parseFloat(this.getInputValue("#smartLimitQty")),
                    i = this.getSipFrequency(),
                    s = this.getSipDay(),
                    o = R.getRadioButtonCheckedOrNot("sipExecuteImmediately"),
                    n = parseFloat(this.getInputValue("#priceRangeHigh")),
                    d = parseFloat(this.getInputValue("#priceRangeLow")),
                    l = this.getSipFrequency(this.getInputValue("#stepUpQFrequencyInputId")),
                    c = parseInt(this.getInputValue("#stepUpQuantityInputId")),
                    p = parseInt(this.getInputValue("#sipExpiryInputId")),
                    m = {
                        symbol: t,
                        productType: r,
                        qty: a,
                        amount: a,
                        freq: i,
                        sip_day: s,
                        imd_start: o,
                        hpr: n,
                        lpr: d,
                        step_up_freq: l,
                        step_up_qty: c,
                        step_up_amount: c,
                        exp_qty: p,
                        exp_amount: p,
                        endTime: parseInt(this.getSipExpiryDate())
                    };
                return $("#so_sip_QtyPrimary").hasClass("so_qtyAmountSwapParentConatinerActive") ? delete m.amount : delete m.qty, $("#sipExpiryDateButton").hasClass("so_qtyAmountSwapParentConatinerActive") ? delete m.exp_qty : delete m.endTime, this.handleSipTime(m), this.handleSipAdvancedKeyPayload(m), this.formatOrderObjectWithNullSafety(m), e && (m.hpr || (m.hpr = -1), m.lpr || (m.lpr = -1)), m
            }
            static handleSipTime(e) {
                const t = $("#sipFrequencyInput").val(),
                    r = this.getInputValue("#sipFrequencyDayInput");
                if ("Daily" === t) e.sip_time = parseInt(this.convertToEpochTimeZoneFix(r));
                else if ("Custom" === t) {
                    const t = r.split("-"),
                        a = {
                            year: t[0],
                            month: t[1],
                            day: t[2]
                        };
                    e.sip_time = R.getEpochTimeWithSelectedDate(a)
                }
            }
            static handleSipAdvancedKeyPayload(e) {
                const t = R.getRadioButtonCheckedOrNot("sipAdvancedSlider"),
                    r = R.getRadioButtonCheckedOrNot("sipStepUpSlider"),
                    a = R.getRadioButtonCheckedOrNot("sipExpirySlider");
                t || this.deleteSmartSipAdvancedKey(e, ["hpr", "lpr", "step_up_freq", "step_up_qty", "step_up_amount", "exp_qty", "exp_amount", "endTime"]), t && !r && this.deleteSmartSipAdvancedKey(e, ["step_up_freq", "step_up_qty", "step_up_amount"]), t && r && ($("#so_sip_QtyPrimary").hasClass("so_qtyAmountSwapParentConatinerActive") ? delete e.step_up_amount : delete e.step_up_qty), t && !a && this.deleteSmartSipAdvancedKey(e, ["endTime", "exp_amount", "exp_qty"]), t && a && ($("#so_sip_QtyPrimary").hasClass("so_qtyAmountSwapParentConatinerActive") ? delete e.exp_amount : delete e.exp_qty)
            }
            static deleteSmartSipAdvancedKey(e, t = []) {
                t.forEach((t => {
                    delete e[t]
                }))
            }
            static getSipExpiryDate() {
                const e = this.getInputValue("#sipExpiryInputId").split("-"),
                    t = {
                        year: e[0],
                        month: e[1],
                        day: e[2]
                    };
                return R.getEpochTimeWithSelectedDate(t)
            }
            static getSipFrequency(e) {
                let t = 1;
                const r = $("#sipFrequencyInput").val();
                switch (e ? ? r) {
                    case "Daily":
                        t = 1;
                        break;
                    case "Weekly":
                        t = 2;
                        break;
                    case "Monthly":
                        t = 3;
                        break;
                    case "Yearly":
                        t = 5;
                        break;
                    case "Custom":
                        t = 6;
                        break;
                    default:
                        console.log("No Matching Frequency Found")
                }
                return t
            }
            static getSipFrequencyText(e = 1) {
                let t = "Daily";
                switch (e) {
                    case 1:
                        t = "Daily";
                        break;
                    case 2:
                        t = "Weekly";
                        break;
                    case 3:
                        t = "Monthly";
                        break;
                    case 5:
                        t = "Yearly";
                        break;
                    case 6:
                        t = "Custom";
                        break;
                    default:
                        console.log("No Matching Frequency Found")
                }
                return t
            }
            static getSipDay() {
                switch ($("#sipFrequencyInput").val()) {
                    case "Daily":
                    case "Custom":
                        break;
                    case "Weekly":
                        return this.getWeekDaySelected();
                    case "Monthly":
                        const e = $("#sipFrequencyDayInput").val();
                        return 0 === parseInt(e[1]) || parseInt(e[1]) ? parseInt(e[0] + e[1]) : parseInt(e[0]);
                    default:
                        return parseInt($("#sipFrequencyDayInput").val()[0])
                }
            }
            static getWeekDaySelected() {
                switch ($("#sipFrequencyDayInput").val()) {
                    case "Monday":
                    default:
                        return 1;
                    case "Tuesday":
                        return 2;
                    case "Wednesday":
                        return 3;
                    case "Thursday":
                        return 4;
                    case "Friday":
                        return 5
                }
            }
            static modifyStepOrderObjectWithModifiedKeys(e, t) {
                try {
                    const r = TradeModules.store.getState().orderBook.orderBookDataWithKey[t],
                        a = I.stepPayloadAndOredrBookKeymapper,
                        i = parseInt(this.getEpocTimeInSeconds(this.extractHoursAndMinutes(r ? .start))),
                        s = parseInt(this.getEpocTimeInSeconds(this.extractHoursAndMinutes(r ? .end)));
                    Object.keys(e).forEach((t => {
                        e[t] === r[a[t]] && delete e[t]
                    })), i === e.startTime && delete e.startTime, s === e.endTime && delete e.endTime
                } catch (e) {
                    console.log(e)
                }
            }
            static handleHprLprKey(e) {
                const t = this.isCheckboxChecked("#mppAdvancedToggle"),
                    r = this.isCheckboxChecked("#so_priceRangeSlider");
                if (!t || !r) return delete e.hpr, void delete e.lpr;
                const a = this.isCheckboxChecked("#priceRangeRadioBtnHighId"),
                    i = this.isCheckboxChecked("#priceRangeRadioBtnLowId");
                a && !i ? delete e.lpr : !a && i && delete e.hpr
            }
            static handleMppKey(e) {
                const t = this.isCheckboxChecked("#mppAdvancedToggle"),
                    r = this.isCheckboxChecked("#customMppCheckBox");
                (!t || t && !r) && delete e.mpp
            }
            static getStepDirection() {
                let e = 1;
                try {
                    return R.getRadioButtonCheckedOrNot("stepOrderDownSideDirection") && (e = -1), e
                } catch (t) {
                    return console.log(t), e
                }
            }
            static getSmartTrailOrderType() {
                let e = 2;
                try {
                    return e = this.isCheckboxChecked("#trailMarketPriceCheckBox") ? 2 : 1, e
                } catch (t) {
                    return console.log(t), e
                }
            }
            static getInputValue(e) {
                return $(e).val()
            }
            static isModifyOrder() {
                return $("#buyButton").is("[data-modifyid]")
            }
            static isCheckboxChecked(e) {
                return $(e).is(":checked")
            }
            static setInputValue(e, t) {
                $(e).val(t)
            }
            static setradioChecked(e, t) {
                $(`input[type="radio"][name='${e}'][value=${t}]`).prop("checked", !0)
            }
            static setCheckboxChecked(e, t) {
                $(`${e}`).prop("checked", t)
            }
            static setCustomData(e, t, r) {
                $(e).attr(t, r)
            }
            static removeCustomData(e, t) {
                $(e).removeAttr(t)
            }
            static getCustomData(e, t) {
                return $(e).attr(`data-${t}`)
            }
            static checkIfValueIsValid(e) {
                return !!e
            }
            static updateTimeField(e, t) {
                let r = R.convertSecondsToMinutesAndRemainingSeconds(t);
                this.setInputValue(e, r)
            }
            static convertToPositiveNumber(e) {
                return NaN != Math.abs(e) ? Math.abs(e) : 0
            }
            static setOrderType(e) {
                switch (e) {
                    case "MARKET":
                    case "STOP":
                        break;
                    case "LIMIT":
                        this.setCheckboxChecked("#triggerPriceCheckBox", !1), K.triggerPriceCheckBoxEvent();
                        break;
                    case "STOP LIMIT":
                        this.setCheckboxChecked("#triggerPriceCheckBox", !0), K.triggerPriceCheckBoxEvent();
                        break;
                    default:
                        code = 2
                }
            }
            static updateSmartWindowWithModifyObjectData(e, t) {
                switch (t) {
                    case I.smartMenuIdMatching.sm_limit:
                        this.modifyItemsForLimit(e);
                        break;
                    case I.smartMenuIdMatching.smart_pegged:
                        this.modifyItemsForPegged(e);
                        break;
                    case I.smartMenuIdMatching.smart_trail:
                        this.modifyItemsForTrail(e);
                        break;
                    case I.smartMenuIdMatching.smart_step:
                        this.modifyItemsForStep(e);
                        break;
                    case I.smartMenuIdMatching.smart_sip:
                        this.modifyItemsForSip(e)
                }
                this.setCustomData("#buyButton", "data-modifyid", e ? .flowId), this.performValidationsForModifyFields()
            }
            static updateSmartWindowWithClonedObjectData(e, t) {
                switch (t) {
                    case I.smartMenuIdMatching.sm_limit:
                        this.cloneItemsForLimit(e);
                        break;
                    case I.smartMenuIdMatching.smart_pegged:
                        this.cloneItemsForPegged(e);
                        break;
                    case I.smartMenuIdMatching.smart_trail:
                        this.cloneItemsForTrail(e);
                        break;
                    case I.smartMenuIdMatching.smart_step:
                        this.cloneItemsForStep(e);
                        break;
                    case I.smartMenuIdMatching.smart_sip:
                        this.cloneItemsForSip(e);
                        break;
                    default:
                        console.log("OrderType Not matched while cloning", t)
                }
                this.removeCustomData("#buyButton", "data-modifyid"), this.performValidationsForModifyFields()
            }
            static handleMppModifySection(e) {
                1 === e.on_exp ? $("#so_advancedContainer").addClass("d-none").removeClass("d-flex") : $("#so_advancedContainer").removeClass("d-none").addClass("d-flex"), this.checkIfValueIsValid(e ? .mpp) && -1 !== e ? .mpp ? (this.setCheckboxChecked("#mppAdvancedToggle", !0), K.mppAdvancedToggleEvent(), this.setCheckboxChecked("#customMppCheckBox", !0), K.customMppCheckBoxEvent(), this.setInputValue("#mppQtyBox", this.handlePrecision(e ? .mpp))) : this.setCheckboxChecked("#mppAdvancedToggle", !1)
            }
            static handleTriggerPriceSection(e) {
                e ? (this.setCheckboxChecked("#triggerPriceCheckBox", !0), K.triggerPriceCheckBoxEvent(), this.setInputValue("#smartLimitTriggerPriceField", e)) : (this.setCheckboxChecked("#triggerPriceCheckBox", !1), this.setInputValue("#smartLimitTriggerPriceField", ""))
            }
            static handlePrecision(e) {
                return parseFloat(e).toFixed(2)
            }
            static handlePriceRangeModifySection(e) {
                this.checkIfValueIsValid(e ? .hpr) || this.checkIfValueIsValid(e ? .lpr) ? (this.setCheckboxChecked("#so_priceRangeSlider", !0), re.priceRangeSlider(), this.checkIfValueIsValid(e ? .hpr) && this.checkIfValueIsValid(e ? .lpr) ? (this.setradioChecked("priceRangeRadioBtn", 3), re.enableFieldsForHighAndLow(), this.setInputValue("#priceRangeHigh", e ? .hpr), this.setInputValue("#priceRangeLow", e ? .lpr)) : this.checkIfValueIsValid(e ? .hpr) ? (this.setradioChecked("priceRangeRadioBtn", 1), re.disableAndEnableForHighPriceRange("#priceRangeHigh"), this.setInputValue("#priceRangeHigh", e ? .hpr)) : this.checkIfValueIsValid(e ? .lpr) && (this.setradioChecked("priceRangeRadioBtn", 2), re.disableAndEnableForHighPriceRange("#priceRangeLow"), this.setInputValue("#priceRangeLow", e ? .lpr))) : this.setCheckboxChecked("#so_priceRangeSlider", !1)
            }
            static modifyItemsForLimit(e) {
                this.setInputValue("#smartLimitQty", e ? .totqty), this.setInputValue("#smartLimitEndTime", this.extractHoursAndMinutes(e ? .end)), this.setInputValue("#smartLimitPriceField", e ? .price), this.setradioChecked("actionEndTime", e ? .on_exp), this.setOrderType(this.getOrderTypeFromCode(e ? .ordtype)), this.handleTriggerPriceSection(e ? .trigprice), this.toggleBasedOnProductType(e ? .product), this.handleAdvancedItemsForLimitModify(e)
            }
            static modifyItemsForTrail(e) {
                this.setInputValue("#smartLimitQty", e ? .totqty), this.setInputValue("#smartTrailTriggerPrice", e ? .trigprice), this.setInputValue("#smartTrailJumpPriceField", e ? .jump_diff), this.handleTrailLimitPriceForClone(e ? .price, e ? .ordtype), this.toggleBasedOnProductType(e ? .product), this.handleAdvancedItemsForTrailModify(e)
            }
            static modifyItemsForStep(e) {
                this.setInputValue("#smartLimitQty", e ? .totqty), this.setInputValue("#smartStepAvgQty", e ? .avgqty), this.setInputValue("#smartStepAvgEntryDiffQty", Math.abs(e ? .avgdiff)), this.handleStepDirectionForClone(e ? .direction), this.toggleBasedOnProductType(e ? .product), this.setInputValue("#smartStepStartTime", this.extractHoursAndMinutes(e ? .start)), this.setInputValue("#smartLimitEndTime", this.extractHoursAndMinutes(e ? .end)), this.handleAdvancedItemsForStepModify(e), e ? .totplcqty > 0 && (K.maskFieldContainer("#smartStepStartTime"), K.maskFieldContainer("#smartStepInitialQty")), $("#stepUpSideDirectionRadio").addClass("unclickable"), $("#stepDownSideDirectionRadio").addClass("unclickable"), $("#stepOrderLtpAverageContainer").addClass("unclickable"), $("#stepOrderCustomAverageContainer").addClass("unclickable"), this.setInputValue("#smartStepInitialQty", e ? .initQty)
            }
            static modifyItemsForSip(e) {
                this.cloneItemsForSip(e), this.handleEnableDisableForSipModify()
            }
            static handleEnableDisableForSipModify() {
                $("#sipStepUpAdvancedConatiner").addClass("unclickable"), $("#sipStepUpAdvancedInput").addClass("unclickable"), $("#sipExpiryAdvancedContainer").addClass("unclickable"), $("#sipExpiryAdvanced").addClass("unclickable"), $("#sipFrequencyInput_contanier").addClass("unclickable"), $("#sipFrequencyInputLabel").addClass("unclickable"), $("#sipFrequencyInput").addClass("unclickable"), R.getSipQtyButtonActive() && $("#so_sip_AmountSecondary").addClass("unclickable"), R.getSipAmountButtonActive() && $("#so_sip_QtyPrimary").addClass("unclickable")
            }
            static handleAdvancedItemsForLimitModify(e) {
                let {
                    hpr: t,
                    lpr: r,
                    mpp: a,
                    on_exp: i
                } = e || {};
                1 !== i ? (1 === i && re.actionEndTimeConvertMarket(), (t || r || -1 !== a) && (R.getRadioButtonChecked("mppAdvancedToggle"), re.handleMppToggleEvent()), t && (R.getRadioButtonChecked("customMaxPriceLimitCheckBox"), K.unmaskFieldContainer("#smartLimitMaxPriceBox"), $("#smartLimitMaxPriceBox").val(t)), r && (R.getRadioButtonChecked("customMaxPriceLimitCheckBox"), K.unmaskFieldContainer("smartLimitMaxPriceBox"), $("#smartLimitMaxPriceBox").val(r)), -1 !== a && ($("#customMppCheckBox").prop("checked", !0), K.customMppCheckBoxEvent(), K.handleSmartValidations("mppQtyBox"), $("#mppQtyBox").val(a))) : re.actionEndTimeCancelClickEvent()
            }
            static handleAdvancedItemsForTrailModify(e) {
                this.handleAdvancedToggleForTrailClone(e)
            }
            static handleAdvancedItemsForStepModify(e) {
                $("#smartStepInitialQty").val(e ? .initQty), (1 === e ? .ordtype || e ? .hpr || e ? .lpr || e ? .mpp || e ? .initQty) && (re.handleMppToggleEvent(), R.getRadioButtonChecked("mppAdvancedToggle")), 1 === e ? .ordtype && (K.handlestepAveragingRadioButtonClick("stepOrderCustomAverageContainer"), $("#smartStepLimitPriceField").val(e ? .price)), e ? .hpr && !e ? .lpr ? (K.handlePriceRangeToggle(), K.onlyHprClickedEvent(), $("#priceRangeHigh").val(e ? .hpr)) : !e ? .hpr && e ? .lpr ? (K.handlePriceRangeToggle(), K.onlyLprClickedEvent(), $("#priceRangeLow").val(e ? .lpr)) : e ? .hpr && e.lpr && (K.handlePriceRangeToggle(), K.bothHprLprClickedEvent(), $("#priceRangeHigh").val(e ? .hpr), $("#priceRangeLow").val(e ? .lpr)), e ? .mpp && -1 !== e ? .mpp && ($("#customMppCheckBox").prop("checked", !0), K.customMppCheckBoxEvent(), K.handleSmartValidations("mppQtyBox"), $("#mppQtyBox").val(e ? .mpp))
            }
            static modifyItemsForPegged(e) {
                this.setInputValue("#smartLimitQty", e ? .totqty), this.setInputValue("#smartLimitEndTime", this.extractHoursAndMinutes(e ? .end)), this.updateTimeField("#smartTimeInterval", e ? .interval), this.setInputValue("#peggedAdjustmentField", this.convertToPositiveNumber(e ? .offset)), this.setradioChecked("peggedLot", e ? .peg), this.setradioChecked("adjustmentDirection", this.getDirection(e ? .offset)), this.setradioChecked("actionEndTime", e ? .on_exp), this.handlePriceRangeModifySection(e), this.handleMppModifySection(e), this.toggleBasedOnProductType(e ? .product)
            }
            static cloneItemsForLimit(e) {
                this.setInputValue("#smartLimitQty", e ? .totqty), this.setInputValue("#smartLimitPriceField", e ? .price), this.setradioChecked("actionEndTime", e ? .on_exp), this.handleMppModifySection(e), this.setOrderType(this.getOrderTypeFromCode(e ? .ordtype)), this.handleTriggerPriceSection(e ? .trigprice), this.toggleBasedOnProductType(e ? .product), this.handleAdvancedItemsForLimitModify(e)
            }
            static cloneItemsForPegged(e) {
                this.setInputValue("#smartLimitQty", e ? .totqty), this.updateTimeField("#smartTimeInterval", e ? .interval), this.setInputValue("#peggedAdjustmentField", this.convertToPositiveNumber(e ? .offset)), this.setradioChecked("peggedLot", e ? .peg), this.setradioChecked("adjustmentDirection", this.getDirection(e ? .offset)), this.setradioChecked("actionEndTime", e ? .on_exp), this.handlePriceRangeModifySection(e), this.handleMppModifySection(e), this.toggleBasedOnProductType(e ? .product)
            }
            static cloneItemsForTrail(e) {
                this.setInputValue("#smartLimitQty", e ? .totqty), this.setInputValue("#smartTrailTriggerPrice", e ? .trigprice), this.setInputValue("#smartTrailJumpPriceField", e ? .jump_diff), this.handleTrailLimitPriceForClone(e ? .price, e ? .ordtype), this.toggleBasedOnProductType(e ? .product), this.handleAdvancedToggleForTrailClone(e)
            }
            static cloneItemsForStep(e) {
                this.setInputValue("#smartLimitQty", e ? .totqty), this.setInputValue("#smartStepAvgQty", e ? .avgqty), this.setInputValue("#smartStepAvgEntryDiffQty", Math.abs(e ? .avgdiff)), this.handleStepDirectionForClone(e ? .direction), this.toggleBasedOnProductType(e ? .product), R.prefillStartStepTime(), this.setInputValue("#smartLimitEndTime", this.extractHoursAndMinutes(e ? .end)), this.handleAdvancedItemsForStepModify(e), this.setInputValue("#smartStepInitialQty", e ? .initQty)
            }
            static cloneItemsForSip(e) {
                this.toggleBasedOnProductType(e ? .product), this.fillQtyAmountForSip(e), this.fillSipFrequencyInput(e), e ? .imd_start && R.getRadioButtonChecked("sipExecuteImmediately"), this.handleAdvancedItemsForSip(e)
            }
            static fillSipFrequencyInput(e) {
                const t = this.getSipFrequencyTextForClone(e);
                this.setInputValue("#sipFrequencyInput", t)
            }
            static getSipFrequencyTextForClone(e) {
                const t = this;
                let r = "Daily";
                switch (e ? .freq) {
                    case 1:
                        r = "Daily";
                        let a = t.extractHoursAndMinutes(e ? .sip_time, !0, !1, !0);
                        re.sipDailyFreqClickHandler(a);
                        break;
                    case 2:
                        r = "Weekly", re.sipWeeklyFreqClickHandler(t.getWeekdayText(e ? .sip_day));
                        break;
                    case 3:
                        r = "Monthly", re.sipMonthlyFreqClickHandler(`${e?.sip_day} of every month`);
                        break;
                    case 6:
                        r = "Custom";
                        let i = t.extractHoursAndMinutes(e ? .sip_time, !0, !0);
                        re.sipCustomFreqClickHandler(i)
                }
                return r
            }
            static getWeekdayText(e) {
                let t = "Monday";
                switch (e) {
                    case 1:
                    default:
                        t = "Monday";
                        break;
                    case 2:
                        t = "Tuesday";
                        break;
                    case 3:
                        t = "Wednesday";
                        break;
                    case 4:
                        t = "Thursday";
                        break;
                    case 5:
                        t = "Friday"
                }
                return t
            }
            static handleAdvancedItemsForSip(e) {
                const t = this,
                    r = ["hpr", "lpr", "exp_qty", "end_time", "exp_amount", "Step_up_freq", "step_up_qty", "step_up_amount"].some((t => e[t])),
                    a = ["hpr", "lpr"].some((t => e[t])),
                    i = ["step_up_freq", "step_up_qty", "step_up_amount"].some((t => e[t])),
                    s = ["exp_qty", "end_time", "exp_amount"].some((t => e[t]));
                if (r && (R.getRadioButtonChecked("sipAdvancedSlider"), re.handleSipAdvancedToggle()), a && (R.getRadioButtonChecked("so_priceRangeSlider"), K.handlePriceRangeToggle(), e ? .hpr && !e ? .lpr ? (K.onlyHprClickedEvent(), $("#priceRangeRadioBtnHighId").attr("checked", !0), $("#priceRangeHigh").val(e ? .hpr)) : !e ? .hpr && e ? .lpr ? (K.onlyLprClickedEvent(), $("#priceRangeRadioBtnLowId").attr("checked", !0), $("#priceRangeLow").val(e ? .lpr)) : e ? .hpr && e.lpr && (K.bothHprLprClickedEvent(), $("#priceRangeRadioBtnHighLowId").attr("checked", !0), $("#priceRangeHigh").val(e ? .hpr), $("#priceRangeLow").val(e ? .lpr))), i) {
                    R.getRadioButtonChecked("sipStepUpSlider"), re.handleSipStepUpSliderClick();
                    const t = {
                        1: "Daily",
                        2: "Weekly",
                        3: "Monthly",
                        5: "Yearly"
                    }[e.Step_up_freq];
                    t && $("#stepUpQFrequencyInputId").val(t);
                    const r = e.step_up_qty || e.step_up_amount;
                    $("#stepUpQuantityInputId").val(r)
                }
                if (s)
                    if (R.getRadioButtonChecked("sipExpirySlider"), re.handleSipExpirySliderClick(), e.end_time) {
                        let r = t.extractHoursAndMinutes(e ? .end_time, !0, !0);
                        re.handleSipExpiryDateButtonClick(r)
                    } else e.exp_qty ? (re.handleSipExpiryAmountButtonClick(), $("#sipExpiryInputId").val(e.exp_qty)) : (re.handleSipExpiryAmountButtonClick(), $("#sipExpiryInputId").val(e.exp_amount))
            }
            static fillQtyAmountForSip(e) {
                e ? .totqty ? re.handleSipQtyPrimaryClicked(e ? .totqty) : re.handleSipAmountSecondaryClicked(e ? .amount)
            }
            static handleStepDirectionForClone(e) {
                1 === e ? R.getRadioButtonChecked("stepOrderUpSideDirection") : R.getRadioButtonChecked("stepOrderDownSideDirection")
            }
            static handleTrailLimitPriceForClone(e, t) {
                1 === t && e ? ($("#trailMarketPriceCheckBox").prop("checked", !1), $("#smartTrailLimitPriceField").val(e), K.handleSmartValidations("smartTrailLimitPriceField")) : ($("#trailMarketPriceCheckBox").prop("checked", !0), $("#smartTrailLimitPriceField").val(""), K.handleTrailMarketPriceCheckBox())
            }
            static handleAdvancedToggleForLimitClone(e) {
                console.log(e)
            }
            static handleAdvancedToggleForTrailClone(e) {
                const {
                    mpp: t,
                    target_price: r
                } = e || {};
                (t || r) && ($("#mppAdvancedToggle").prop("checked", !0), K.mppAdvancedToggleEvent()), r && ($("#customTrailTargetCheckBox").prop("checked", !0), K.handleTrailTargetCheckBox(), K.displayCustomMppBoxConatiner()), t && ($("#customMppCheckBox").prop("checked", !0), K.customMppCheckBoxEvent(), K.handleSmartValidations("customMppCheckBox"))
            }
            static performValidationsForModifyFields() {
                $("#buyButton").removeAttr("disabled")
            }
            static smartPriceWithTickValidation(e, t) {
                const r = R.floatSafeRemainder(e, t);
                return !Number.isInteger(r)
            }
            static getLtpPrice() {
                try {
                    let e;
                    switch (this.getSymbolMasterValue(orderWindow.orderData.selectedSymbol, "exchange_name")) {
                        case "NSE":
                            e = parseFloat($("#nse-ltp-price").text());
                            break;
                        case "BSE":
                            e = parseFloat($("#bse-ltp-price").text());
                            break;
                        case "MCX":
                            e = parseFloat($("#mcx-ltp-price").text())
                    }
                    return e = R.getPriceFormattedWithDecimalPlaces(e), e
                } catch (e) {
                    console.log(e)
                }
            }
            static getPriceForPriceBreakup() {
                try {
                    return R.limitOrderWindowOpen() ? parseFloat($("#smartLimitPriceField").val()) : R.stepOrderWindowOpen() ? ae.getLtpPrice() : R.trailOrderWindowOpen() ? R.getRadioButtonCheckedOrNot("trailMarketPriceCheckBox") ? ae.getLtpPrice() : R.getPriceFormattedWithDecimalPlaces($("#smartTrailLimitPriceField").val()) : ""
                } catch (e) {
                    return console.log(e), ""
                }
            }
            static getNSEprescribedLimitsPerentage(e) {
                switch (e) {
                    case 11:
                    case 13:
                        return .03;
                    case 16:
                        return .01;
                    case 14:
                    case 15:
                    case 19:
                        return 1
                }
            }
        }
        const ie = ae;
        class se {
            constructor() {
                this.apiResponse = null, this.isApiCalled = !1, this.timeoutId = null, this.cacheResponse = null
            }
            static createPayloadData(e) {
                const t = e;
                return {
                    product_type: le.reverseProductType(t.product_type),
                    stoploss_type: le.reverseStopLossType(t.stoploss_type),
                    target_type: le.reverseTargetType(t.target_type),
                    position_sizing_type: le.reversePositionSizingType(t.position_sizing_type),
                    stop_loss_enabled: t.stoploss_qr_checkbox,
                    target_enabled: t.target_qr_checkbox,
                    position_sizing_enabled: t.positionSizing_qr_checkbox,
                    stop_loss_value: t.stoplossValue_qr,
                    target_value: t.targetValue_qr,
                    position_sizing_value: t.positionSizingValue_qr,
                    live_update: t.liveUpdates_qr_checkbox
                }
            }
            static async createQuickTradeObj(e) {
                let t = Object.assign({}, e);
                t.filledQty = 0, t.disclosedQty = 0, t.offlineOrder = !1, t.validity = "DAY", t.type = e.type ? ? 2, t.side = t.side ? t.side : 1, t.limitPrice = 1 === e.type || 4 === e.type ? t.limitPrice ? t.limitPrice : le.getLtp(e) : 0;
                const r = P.getState().quickTrade.quicktrade;
                return t.productType = le.getProductType(r, t.symbol), t.qty = await le.qtyModify(e), le.addProductTypeKeys(r, t), le.updateOrderObjForMarket(t), le.addOrderTagForQuickTrade(t), t
            }
            static createMarginPayload(e, t) {
                const r = P.getState().quickTrade.quicktrade,
                    a = {
                        symbol: e,
                        qty: R.getLotSize(e),
                        side: t ? .side ? t ? .side : 1,
                        productType: le.getProductType(r, e),
                        limitPrice: 0,
                        stopLoss: 0,
                        stopPrice: 0,
                        takeProfit: 0,
                        type: 2
                    };
                return le.addProductTypeKeys(r, a), a
            }
            static async getQuickTradeUserSettings() {
                const e = await ne.getQuickTrade();
                P.dispatch(E.setQuickTradeApiData(e))
            }
            static async getQuickTradeBannerStatus() {
                const e = await ne.getQuickTradeBannerStatus();
                P.dispatch(E.setQuickTradeBannerStatus(e))
            }
            static async postQuickTradeBannerStaus() {
                200 === (await ne.postQuickTradeBannerStatus(!0)).code && P.dispatch(E.setQuickTradeBannerStatus(!0))
            }
        }
        class oe {
            constructor() {}
            static marginData = {};
            static Authorization = token;
            static quickTradeGet = globalConstants ? .config ? .endpoints ? .current ? .quickTrade ? .quickTradeGet ? ? "https://api-g1.fyers.in/settings?setting=quick_trade";
            static quickTradePut = globalConstants ? .config ? .endpoints ? .current ? .quickTrade ? .quickTradePut ? ? "https://api-g1.fyers.in/settings/quick-trade";
            static quickTradeReset = globalConstants ? .config ? .endpoints ? .current ? .quickTrade ? .quickTradeReset ? ? "https://api-g1.fyers.in/settings/quick-trade/reset";
            static getMarginUrl = `${globalConstants.constant.kambalaUrl}/margin?token_id=${this.Authorization}`;
            static getQuickTradeBannerStatusUrl = globalConstants ? .config ? .endpoints ? .current ? .quickTrade ? .getQuickTradeBannerStatusUrl ? ? "https://api-g1.fyers.in/settings?setting=quick_trade_immutable";
            static postQuickTradeBannerStatusUrl = globalConstants ? .config ? .endpoints ? .current ? .quickTrade ? .postQuickTradeBannerStatusUrl ? ? "https://api-g1.fyers.in/settings/quick-trade-immutable";
            static async getQuickTradeBannerStatus() {
                const e = await t.sendRequest(this.getQuickTradeBannerStatusUrl, "GET", "");
                return 200 === e.code && e ? .data ? .quick_trade_immutable ? .user_toggled || !1
            }
            static async postQuickTradeBannerStatus(e) {
                const r = {
                    user_toggled: e ? ? !1
                };
                return await t.sendRequest(this.postQuickTradeBannerStatusUrl, "PUT", r)
            }
            static async getQuickTrade() {
                const e = await t.sendRequest(this.quickTradeGet, "GET", "");
                return le.mapQuickTrade(e ? .data ? .quick_trade)
            }
            static async postQuickTrade(e) {
                const r = se.createPayloadData(e);
                return await t.sendRequest(oe.quickTradePut, "PUT", r)
            }
            static async resetQuickTrade() {
                200 === (await t.sendRequest(oe.quickTradeReset, "PUT", "")).code && se.getQuickTradeUserSettings()
            }
            static async getMargin(e, r, a) {
                if (null != oe.marginData[e] && null == r && a && null != a.lp) return {
                    margin_total: a.lp / oe.marginData[e].leverage
                };
                const i = se.createMarginPayload(e, r),
                    s = await t.sendRequest(this.getMarginUrl, "POST", i);
                return oe.marginDataCal(s.data, e, a), s.data
            }
            static async placeQuickTrade(e, t, r) {
                t(await se.createQuickTradeObj(e), r)
            }
            static async marginDataCal(e, t, r) {
                let a;
                a = r && r.lp ? r.lp : await le.getLtpFromApi({
                    symbol: t
                }), e.margin_total > 0 && (oe.marginData = {
                    [t]: {
                        leverage: a / e.margin_total
                    }
                })
            }
        }
        const ne = oe,
            de = {
                storeKey: {
                    ProductType: "product_type",
                    StopLossType: "stoploss_type",
                    TargetType: "target_type",
                    PositionSizingType: "position_sizing_type",
                    StopLossValue: "stoplossValue_qr",
                    TargetValue: "targetValue_qr",
                    PositionSizingValue: "positionSizingValue_qr",
                    StopLossEnabled: "stoploss_qr_checkbox",
                    TargetEnabled: "target_qr_checkbox",
                    PositionSizingEnabled: "positionSizing_qr_checkbox",
                    LiveUpdateEnabled: "liveUpdates_qr_checkbox"
                },
                defaultValues: {
                    stopLossAbsValue: 5,
                    stopLossDifference: 5,
                    targetAbsValue: 5,
                    targetDifference: 5,
                    positionSizingMargin: 20,
                    amountValue: 2e4,
                    lotsValue: 5
                },
                apiCodes: {
                    success: 200,
                    error: [400.401, 500]
                },
                quickTradeOrderTag: ["CNC", "INTRADAY", "MARGIN"],
                optionsInstruments: [14, 15, 19, 31, 32]
            },
            le = class {
                static getAdvancedProductType(e, t) {
                    return "OVERNIGHT" === this.reverseProductType(e) ? ie.getCncOrMargin(t) : "INTRADAY"
                }
                static mapQuickTrade(e) {
                    return {
                        product_type: e.product_type.toLowerCase() + "_qr",
                        stoploss_type: this.mapStopLossType(e.stoploss_type),
                        target_type: this.mapTargetType(e.target_type),
                        position_sizing_type: this.mapPositionSizingType(e.position_sizing_type),
                        stoploss_qr_checkbox: e.stop_loss_enabled,
                        target_qr_checkbox: e.target_enabled,
                        positionSizing_qr_checkbox: e.position_sizing_enabled,
                        stoplossValue_qr: e.stop_loss_value,
                        targetValue_qr: e.target_value,
                        positionSizingValue_qr: e.position_sizing_value,
                        liveUpdates_qr_checkbox: e.live_update ? ? !1
                    }
                }
                static mapStopLossType(e) {
                    return {
                        ABS_VAL: "stopLossAbsValue",
                        PERC_DIFF: "stopLossDifference"
                    }[e] || "stopLossDifference"
                }
                static mapTargetType(e) {
                    return {
                        PERC_DIFF: "targetDifference",
                        ABS_VAL: "targetAbsValue"
                    }[e] || "targetDifference"
                }
                static mapPositionSizingType(e) {
                    return {
                        PERC_MARGIN: "positionSizingMargin",
                        AMOUNT: "amountValue",
                        LOTS: "lotsValue"
                    }[e] || "amountValue"
                }
                static reverseProductType(e) {
                    return e.replace("_qr", "").toUpperCase()
                }
                static reverseStopLossType(e) {
                    return {
                        stopLossDifference: "PERC_DIFF",
                        stopLossAbsValue: "ABS_VAL"
                    }[e] || "PERC_DIFF"
                }
                static reverseTargetType(e) {
                    return {
                        targetDifference: "PERC_DIFF",
                        targetAbsValue: "ABS_VAL"
                    }[e] || "PERC_DIFF"
                }
                static reversePositionSizingType(e) {
                    return {
                        amountValue: "AMOUNT",
                        lotsValue: "LOTS",
                        positionSizingMargin: "PERC_MARGIN"
                    }[e] || "PERC_MARGIN"
                }
                static updateInputAttributes({
                    elementId: e,
                    storeKey: t,
                    event: r,
                    min: a,
                    step: i,
                    defaultValue: s
                }) {
                    const o = $(`#${e}`);
                    r && (this.toggleActive(r), this.updateToStore(t, r.target.id)), o.attr("min", a), o.attr("step", i), r && o.val(s), $(`#${e}`).removeClass("input-field-error")
                }
                static toggleActive(e, t) {
                    let r = e ? e.target.id : t;
                    $(`#${r}`).parent().find("button").removeClass("toggleButtonsActive"), $(`#${r}`).addClass("toggleButtonsActive")
                }
                static updateToStore(e, t) {
                    P.dispatch(E.updateQuickTradeData(e, t))
                }
                static async getLtpFromApi(e) {
                    return (await FyTrade.getQuotes([e.symbol]))[0].v.lp
                }
                static getIsIntraday(e) {
                    return "INTRADAY" === this.getAdvancedProductType(e.product_type)
                }
                static getIsMargin(e) {
                    return "MARGIN" === this.getAdvancedProductType(e.product_type)
                }
                static getQtyRoundedToLotSize(e, t) {
                    const r = R.getLotSize(t);
                    return Math.floor(e / r) * r
                }
                static updateOrderObjForMarket(e) {
                    2 == e.type && (e.limitPrice = 0, e.stopPrice = 0)
                }
                static addOrderTagForQuickTrade(e) {
                    try {
                        de.quickTradeOrderTag.includes(e.productType) && (e.ordertag = "QuickTrade")
                    } catch (e) {
                        console.log(e)
                    }
                }
                static getProductType(e, t) {
                    let r = this.getAdvancedProductType(e.product_type, t);
                    return this.getIsIntraday(e) ? e.stoploss_qr_checkbox && e.target_qr_checkbox ? "BO" : e.stoploss_qr_checkbox && !e.target_qr_checkbox ? "CO" : e.stoploss_qr_checkbox || e.target_qr_checkbox ? void 0 : r : r
                }
                static async qtyModify(e) {
                    return e.hasOwnProperty("currentQuotes") ? e.qty : await this.getQtyBasedOnPositionSizing(e.symbol, e)
                }
                static addProductTypeKeys(e, t) {
                    this.getIsIntraday(e) && (e.stoploss_qr_checkbox && e.target_qr_checkbox ? (t.stopLoss = this.getStopLoss(e, t), t.takeProfit = this.getTakeProfit(e, t)) : e.stoploss_qr_checkbox && !e.target_qr_checkbox && (t.stopLoss = this.getStopLoss(e, t)))
                }
                static getStopLoss(e, t) {
                    return R.getPriceFormattedWithDecimalPlaces(R.getPriceWithNearestTickSize(this.modifyPayloadForStoploss(e, t), "", t.symbol), t.symbol)
                }
                static getTakeProfit(e, t) {
                    return R.getPriceFormattedWithDecimalPlaces(R.getPriceWithNearestTickSize(this.modifyPayloadForTakeProfit(e, t), "", t.symbol), t.symbol)
                }
                static modifyPayloadForStoploss(e, t) {
                    return "stopLossDifference" == e.stoploss_type ? e.stoplossValue_qr / 100 * this.getValueForCalculation(t) : e.stoplossValue_qr
                }
                static modifyPayloadForTakeProfit(e, t) {
                    return "targetDifference" == e.target_type ? e.targetValue_qr / 100 * this.getValueForCalculation(t) : e.targetValue_qr
                }
                static getValueForCalculation(e) {
                    let t;
                    return t = e.hasOwnProperty("limitPrice") && e.limitPrice ? e.limitPrice : e.hasOwnProperty("stopPrice") && e.stopPrice ? e.stopPrice : this.getLtp(e), t ? ? 1
                }
                static getLtp(e) {
                    try {
                        let t;
                        return e.price || e.seenPrice ? t = this.santizePrice(e.price || e.seenPrice) : FyTrade ? .data ? .symbolPriceDict[e.symbol] && (t = FyTrade ? .data ? .symbolPriceDict[e.symbol].v ? .cmd ? .c), t
                    } catch (e) {
                        return console.warn("LTP fetching QR", e), ltp ? ? 0
                    }
                }
                static santizePrice(e) {
                    let t = e.toString().replace(/[^\d.-]/g, "");
                    return parseFloat(t)
                }
                static async getQtyBasedOnPositionSizing(e, t, r) {
                    if (!TradeModules.store.getState().quickTrade.quicktrade.positionSizing_qr_checkbox) return R.getLotSize(e ? ? t.symbol);
                    const a = TradeModules.store.getState().quickTrade.quicktrade,
                        i = FyTrade ? .store ? .getState().broker ? .funds ? .fund_limit ? .filter((e => "Available Balance" === e.title));
                    let s, o, n = i[0] ? .equityAmount || 0;
                    const d = this.getIsIntraday(a),
                        l = this.getIsMargin(a),
                        c = de.optionsInstruments,
                        p = FyTrade.helper.getSymbolMasterValue(datafeed.unzippedData.data[e], "inst_type") || 0,
                        m = FyTrade.helper.getSymbolMasterValue(datafeed.unzippedData.data[e], "segment_code") || 0,
                        u = c.includes(p) && 20 !== m;
                    let g = a.positionSizingValue_qr;
                    try {
                        if ("lotsValue" != a.position_sizing_type)
                            if (!d && !l || u) s = null != r ? r.lp : await this.getLtpFromApi({
                                symbol: e
                            });
                            else {
                                const i = await ne.getMargin(e, t, r);
                                g = a.positionSizingValue_qr, s = i.margin_total, n = i.margin_avail ? ? n
                            }
                    } catch (t) {
                        console.warn("Something wrong with QR getMargin API"), s = await this.getLtpFromApi({
                            symbol: e
                        })
                    }
                    if (a.positionSizing_qr_checkbox) switch (a.position_sizing_type) {
                        case "amountValue":
                            if (s <= 0) TradeModules.common.hawkeye("ERROR", "ERROR Position Sizing in Quick Trade - Zero / Less Than Zero LTP"), o = R.getLotSize(e);
                            else if (u) {
                                const t = Math.floor(g / s);
                                o = Math.floor(t / R.getLotSize(e)) * R.getLotSize(e)
                            } else o = Math.floor(g / s) * R.getLotSize(e);
                            break;
                        case "lotsValue":
                            o = g * R.getLotSize(e);
                            break;
                        case "positionSizingMargin":
                            if (s <= 0) TradeModules.common.hawkeye("ERROR", "ERROR Position Sizing in Quick Trade - Zero / Less Than Zero LTP"), o = R.getLotSize(e);
                            else if (u) {
                                const t = g / 100 * n,
                                    r = Math.floor(t / s);
                                o = Math.floor(r / R.getLotSize(e)) * R.getLotSize(e)
                            } else o = Math.floor(g / 100 * n / s) * R.getLotSize(e);
                            break;
                        default:
                            o = R.getLotSize(e)
                    }
                    return this.qtyRounderToLotSize(o, R.getLotSize(e))
                }
                static qtyRounderToLotSize(e, t) {
                    return e < t ? t : e % t == 0 ? e : t * Math.round(e / t)
                }
                static triggerDom() {
                    const e = document.getElementById("tv_chart_container").firstElementChild;
                    e && e.contentDocument.querySelector('button[data-name="trade-panel-button"]').click()
                }
                static updateQtyInDom(e, t) {
                    e.includes("INDEX") ? (broker._host.setQty(e, 1), TradeModules.quickTrade.quickTradeQtyVal[e] = 1) : (broker._host.setQty(e, t), TradeModules.quickTrade.quickTradeQtyVal[e] = t)
                }
                static async domUpdateQtyOnRealtimeForQuickTrade(e) {
                    try {
                        if (!TradeModules.storeData.quickTrade.quicktrade.liveUpdates_qr_checkbox) return;
                        const t = TradeModules.storeData.quickTrade.quickTradeStatus && TradeModules.storeData.quickTrade.quicktrade.positionSizing_qr_checkbox,
                            r = document.getElementById("tv_chart_container") ? .firstElementChild;
                        let a = tvWidget.activeChart().symbol(),
                            i = r.contentDocument.getElementById("dom-quantity-input");
                        if (t) {
                            let t = await broker._host.getQty(a);
                            if (TradeModules.quickTrade.quickTradeQtyVal[a] == t) {
                                const t = e.find((e => e.n === a));
                                if (t) {
                                    const e = await TradeModules.quickTrade.getQtyForQuickTrade(a, null, t ? .v ? ? null);
                                    broker._host.setQty(a, e), i && (i.value = e), TradeModules.quickTrade.quickTradeQtyVal[a] = e
                                }
                            }
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }
            },
            ce = "comparisonType",
            pe = "condition",
            me = "value",
            ue = "name",
            ge = "symbol",
            he = "triggeredAt",
            ye = "comparisonType",
            Se = "condition",
            ve = "value",
            be = "name",
            we = "symbol",
            Te = "alertId",
            fe = "triggeredAt",
            ke = "alert",
            Ce = "notification_data",
            Me = "LTP",
            $e = {
                title: {
                    duplicate: "Alert already exist"
                }
            },
            _e = class {
                static mapperDataFromApi(e) {
                    const t = e;
                    let r = {};
                    for (let e of Object.keys(t)) {
                        const a = this.mappedData(e, t);
                        a[ye] == Me && "" == a[fe] && (r = { ...r,
                            [e]: a
                        })
                    }
                    return r
                }
                static mappedData(e, t) {
                    return {
                        [ye]: t[e][ke][ce],
                        [Se]: t[e][ke][pe],
                        [be]: t[e][ke][ue],
                        [we]: t[e][ge],
                        [ve]: t[e][ke][me],
                        [Te]: e,
                        [fe]: t[e][ke][he]
                    }
                }
                static socketDataMapper(e, t) {
                    return {
                        [ye]: t[Ce][ce],
                        [Se]: t[Ce][pe],
                        [be]: t[Ce][ue],
                        [we]: t[Ce][ge],
                        [ve]: t[Ce][me],
                        [Te]: e
                    }
                }
                static payloadGenForPost({
                    symbol: e,
                    value: t
                }) {
                    return {
                        agent: "fyers-api",
                        "alert-type": 1,
                        [be]: e,
                        [we]: e,
                        [ye]: Me,
                        [Se]: this.conditionGenerator({
                            symbolTicker: e,
                            price: t
                        }),
                        [ve]: t
                    }
                }
                static payloadGenForModify({
                    alertId: e,
                    symbolTicker: t,
                    updateValue: r
                }) {
                    const a = P.getState().alertFromChart.alertsData[e];
                    return {
                        alertId: e,
                        agent: "fyers-api",
                        "alert-type": 1,
                        [be]: a[ue],
                        [we]: t,
                        [ye]: a[ce],
                        [Se]: this.conditionGenerator({
                            symbolTicker: t,
                            price: r
                        }),
                        [ve]: r
                    }
                }
                static conditionGenerator({
                    symbolTicker: e,
                    price: t
                }) {
                    const r = le.getLtp({
                            symbol: e
                        }),
                        a = parseFloat(t);
                    return r < a || a === r ? "GTE" : "LTE"
                }
            },
            xe = class {
                static setPriceAlertMappedData = e => ({
                    type: T,
                    payload: e
                });
                static deleteAlertData = e => ({
                    type: M,
                    payload: e
                });
                static updateAlertMappedData = e => ({
                    type: C,
                    payload: e
                });
                static setPriceAlertInstanceForCharts = e => ({
                    type: f,
                    payload: e
                });
                static deleteChartInstance = e => ({
                    type: k,
                    payload: e
                });
                static plusClickedPrice = e => {
                    let {
                        symbol: t,
                        price: r
                    } = e;
                    return r = R.getPriceFormattedWithDecimalPlaces(Fe.roundOffPriceBasedOnTickSize(r, null, t), t), {
                        type: _,
                        payload: r
                    }
                }
            };
        class Oe {
            static priceAlert = globalConstants.dynamicUrl.alerts.alerts_get;
            static getPriceAlert = async () => {
                const e = await t.sendRequest(this.priceAlert, "GET");
                if (200 === e.code) {
                    const t = _e.mapperDataFromApi(e.data);
                    return P.dispatch(xe.setPriceAlertMappedData(t)), !0
                }
                return TradeModules.common.hawkeye("ERROR", JSON.stringify(e)), !1
            };
            static postPriceAlert = async ({
                symbol: e,
                value: r
            }) => {
                const a = _e.payloadGenForPost({
                        symbol: e,
                        value: r
                    }),
                    i = await t.sendRequest(this.priceAlert, "POST", a);
                120 != i.code && TradeModules.common.hawkeye("ERROR", JSON.stringify(i))
            };
            static cancelPriceAlert = async ({
                alertId: e
            }) => {
                const r = {
                        alertId: e,
                        agent: "fyers-api"
                    },
                    a = await t.sendRequest(this.priceAlert, "DELETE", r);
                121 != a.code && TradeModules.common.hawkeye("ERROR", JSON.stringify(a))
            };
            static modifyPriceAlert = async e => {
                const r = _e.payloadGenForModify(e),
                    a = await t.sendRequest(this.priceAlert, "PUT", r);
                123 != a.code && TradeModules.common.hawkeye("ERROR", JSON.stringify(a))
            }
        }
        const Pe = Oe;
        class Ee {
            static isFirst = !0;
            static createAlert(e) {
                const t = P.getState().alertFromChart.plusClickedPrice;
                Ee.checkIfPricePresentInAlertsForSymbol(e, t) ? FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.info, "Alert Info", `Alert for price ${t} is already present for ${e}`) : (TradeModules.common.logAnalyticEvents("BtClk_Trd_chrts_alrtCrte_Crtealrt_suc"), Pe.postPriceAlert({
                    symbol: e,
                    value: t
                }))
            }
            static async updateChartsWithGetAlerts(e = !1) {
                if (!e && await Pe.getPriceAlert() || e) {
                    const e = P.getState().alertFromChart.alertsData;
                    for (let t in e) {
                        const {
                            symbol: r,
                            value: a,
                            alertId: i
                        } = e[t];
                        this.updateChartsWithAlerts(r, a, i)
                    }
                }
            }
            static handleLayoutChange() {
                tvWidget.activeChart().getVisibleRange().from > 0 || tvWidget.activeChart().getVisibleRange().to > 0 ? setTimeout((() => {
                    Ee.clearAllAlertsFromCharts(), Ee.updateChartsWithGetAlerts(!1)
                }), 500) : tvWidget.activeChart().onVisibleRangeChanged().subscribe(window, Ee.updateChartsWithLayoutChange)
            }
            static updateChartsWithLayoutChange(e) {
                e.to > 0 && (Ee.isFirst ? (Ee.isFirst = !1, setTimeout((() => {
                    Ee.clearAllAlertsFromCharts(), Ee.updateChartsWithGetAlerts(!1)
                }), 500)) : setTimeout((() => {
                    Ee.clearAllAlertsFromCharts(), Ee.updateChartsWithGetAlerts(!0)
                }), 500), tvWidget.activeChart().onVisibleRangeChanged().unsubscribe(window, Ee.updateChartsWithLayoutChange))
            }
            static async updateChartsWithAlerts(e, t = null, r) {
                let a = e,
                    i = tvWidget.chartsCount();
                for (let e = 0; e < i; e++)
                    if (a === tvWidget.chart(e).symbol()) {
                        let a = await Ee.createAlertLineWithCustomStyles(e, r, t, Ee.onMoveAlert, Ee.onCancelAlert);
                        Ee.updateTheStoreWithAlert(r, a, e)
                    }
            }
            static async createAlertLineWithCustomStyles(e, t, r, a, i) {
                try {
                    const s = tvWidget.chart(e),
                        o = await s.createOrderLine({
                            disableUndo: !0
                        });
                    return await o.setCancelTooltip("Cancel Alert"), o.onMove((function() {
                        const r = tvWidget.chart(e).symbol(),
                            i = this.getPrice();
                        a(t, r, i)
                    })), o.onCancel((async function() {
                        try {
                            await i(t)
                        } catch (e) {
                            console.error("Error in cancel callback:", e)
                        }
                    })), await Promise.all([o.setText(`Alert ₹${r}`), o.setQuantity(""), o.setPrice(r), o.setLineStyle(3), o.setLineStyle(3), o.setLineColor("#6A7483"), o.setBodyBorderColor("#000"), o.setBodyTextColor("#000"), o.setCancelButtonBorderColor("#000"), o.setCancelButtonIconColor("#000"), o.setExtendLeft(!0), o.setLineLength(50, "percentage")]), o
                } catch (e) {
                    console.log("Error on creating orderLine instance", e)
                }
            }
            static updateTheStoreWithAlert(e, t, r) {
                P.dispatch(xe.setPriceAlertInstanceForCharts({
                    key: e,
                    value: t,
                    chartId: r
                }))
            }
            static onCancelAlert(e) {
                TradeModules.common.logAnalyticEvents("BtClk_Trd_chrts_alrtdel_delalrt_suc"), Pe.cancelPriceAlert({
                    alertId: e
                })
            }
            static clearAlertsFromChart(e) {
                const t = P.getState().alertFromChart.alertsInstanceData;
                if (t[e]) {
                    for (const r in t[e]) t[e][r].remove();
                    P.dispatch(xe.deleteChartInstance(e))
                }
            }
            static clearAllAlertsFromCharts() {
                const e = P.getState().alertFromChart.alertsInstanceData;
                for (const t in e) {
                    for (const r in e[t]) e[t][r].remove();
                    P.dispatch(xe.deleteChartInstance(t))
                }
            }
            static onMoveAlert(e, t, r) {
                Ee.checkIfPricePresentInAlertsForSymbol(t, r) ? (Ee.clearAllAlertsFromCharts(), Ee.updateChartsWithGetAlerts(!0), FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.info, $e.title.duplicate, `A price alert for ${t} at ₹${r} already exists.`)) : Pe.modifyPriceAlert({
                    alertId: e,
                    symbolTicker: t,
                    updateValue: r
                })
            }
            static checkIfPricePresentInAlertsForSymbol(e, t) {
                const r = P.getState().alertFromChart.alertsData;
                return Object.values(r).filter((r => r.symbol === e && t === r.value)).length > 0
            }
            static updateAlertOnSymbolChange(e) {
                if (Ee.loadLayout) return void(Ee.loadLayout = !1);
                const {
                    from: t,
                    to: r
                } = tvWidget.activeChart().getVisibleRange();
                t > 0 || r > 0 ? Ee.updateSymbolCallback(e) : tvWidget.activeChart().onDataLoaded().subscribe(null, (() => {
                    Ee.updateSymbolCallback(e)
                }), !0)
            }
            static updateSymbolCallback(e) {
                const t = e.symbol,
                    r = TradeModules.store.getState().alertFromChart.alertsData;
                for (const e in r) {
                    const a = r[e],
                        i = a[we],
                        s = a[ve];
                    t === i && (Ee.clearAlertsFromChart(e), Ee.updateChartsWithAlerts(i, s, e))
                }
            }
            static SocketDataToPriceAlerts(e) {
                const t = e[Ce][ce],
                    r = e.notification_status;
                if (t != Me && 3 != r) return;
                const a = e[Ce][ge],
                    i = e[Ce][me],
                    s = e.id;
                let o = _e.socketDataMapper(e.id, e);
                switch (r) {
                    case 1:
                        Ee.updateChartsWithAlerts(a, i, s), P.dispatch(xe.updateAlertMappedData({
                            key: e.id,
                            value: o
                        }));
                        break;
                    case 2:
                        Ee.clearAlertsFromChart(s), Ee.updateChartsWithAlerts(a, i, s), P.dispatch(xe.updateAlertMappedData({
                            key: e.id,
                            value: o
                        }));
                        break;
                    case 3:
                    case 4:
                        Ee.clearAlertsFromChart(s), P.dispatch(xe.deleteAlertData(s));
                        break;
                    default:
                        Ee.clearAlertsFromChart(s)
                }
            }
        }
        const Ae = Ee;
        class Ie {
            constructor() {}
            static domIntervalId = null;
            static debounceTradingDetailsTimeout = null;
            getMonthNo(e) {
                return moment(e, "MMM").month() + 1
            }
            getDateObject(e) {
                const t = new Date(e).toString().split(" "),
                    r = t[4].toString().split(":");
                let a = {};
                return a.Year = parseInt(t[3]), a.Month = this.getMonthNo(t[1]), a.Day = parseInt(t[2]), a.Hour = parseInt(r[0]), a.Minute = parseInt(r[1]), a.Second = parseInt(r[2]), a
            }
            getUnixTimeStamp(e) {
                let t = e.Month + "/" + e.Day + "/" + e.Year + " " + e.Hour + ":" + e.Minute + ":00";
                return Date.parse(t)
            }
            getDateMonthYear(e) {
                const t = new Date(e).toString().split(" ");
                return t[2] + "_" + t[1] + "_" + t[0] + "_" + t[3]
            }
            getClientId() {
                try {
                    return e.parseJWT(token).fy_id || null
                } catch (e) {
                    return console.error("Error getting client ID from token:", e), null
                }
            }
            logAnalyticEvents(e, t = {}) {
                const r = this.getClientId(),
                    a = {
                        fy_id: r,
                        ...t
                    },
                    i = {
                        fy_id: r,
                        user_id: r,
                        ...t
                    };
                this.captureScreenEvent(e, i), this.captureClevertapEvent(e, a)
            }
            captureScreenEvent(e, t) {
                try {
                    gtag("event", `${e}`, { ...t
                    })
                } catch (e) {
                    console.log("Error capturing screen event:", e)
                }
            }
            captureClevertapEvent(e, t = {}) {
                try {
                    window.userEngagement.trackEvent(e, t)
                } catch (e) {
                    console.error("Error capturing Clevertap event:", e), TradeModules.common.hawkeye("ERROR", `Error while sending event to clevertap : fn [captureClevertapEvent] :  ${e}`)
                }
            }
            createClevertapProfile(e, t) {
                try {
                    window.userEngagement.createProfile(e, t)
                } catch (e) {
                    console.error("Error creating Clevertap profile:", e), TradeModules.common.hawkeye("ERROR", `Error while setting user profile at Clever tap : fn [createClevertapProfile] :  ${e}`)
                }
            }
            createGAProfile(e) {
                try {
                    window.userEngagement.createGAProfile("G-NTFX8XLKVH", e)
                } catch (e) {
                    console.log("Error creating GA profile:", e), TradeModules.common.hawkeye("ERROR", `Error while setting user profile at GA : fn [createGAProfile] :  ${e}`)
                }
            }
            hawkeye(t, r) {
                try {
                    const a = e.parseJWT(token).fy_id;
                    if (!a) return void console.warn("No fy_id found in token.");
                    switch (t) {
                        case "INFO":
                            logger.logInfo(r, a);
                            break;
                        case "ERROR":
                            logger.logError(r, a);
                            break;
                        case "DEBUG":
                            logger.logDebug(r, a);
                            break;
                        case "FATAL":
                            logger.logFatal(r, a);
                            break;
                        case "WARN":
                            logger.logWarn(r, a);
                            break;
                        default:
                            console.error("Invalid log level:", t)
                    }
                } catch (e) {
                    console.error(`Error capturing Hawkeye ${t} event:`, e)
                }
            }
            getSymbolMasterValue(e, t) {
                try {
                    const r = datafeed.unzippedData.data[e] || {};
                    return FyTrade.helper.getSymbolMasterValue(r, t) || 0
                } catch (e) {
                    return console.warn("Error getting symbol master data in getSymbolMasterValue", e), 0
                }
            }
            static subscribeToSymbolChange() {
                tvWidget.chart(window.currentChartId).onSymbolChanged().subscribe(window, Ie.debouncerSymbolChangeListener), tvWidget.subscribe("activeChartChanged", (e => {
                    try {
                        tvWidget.chart(window.currentChartId).onSymbolChanged().unsubscribe(window, Ie.debouncerSymbolChangeListener), tvWidget.chart(e).onSymbolChanged().subscribe(window, Ie.debouncerSymbolChangeListener), window.currentChartId = e
                    } catch (t) {
                        tvWidget.chart(e).onSymbolChanged().subscribe(window, Ie.debouncerSymbolChangeListener), window.currentChartId = e
                    }
                    FyersCommonModule.saveChart && (FyersCommonModule.saveChart.isDeleteAction && (FyersCommonModule.saveChart.isDeleteAction = !1), localStorage.getItem("activeChartSerializableObject") && localStorage.removeItem("activeChartSerializableObject"))
                }))
            }
            static debouncerSymbolChangeListener = Ie.debouncer(this.updateListenerFunctionOnSymbolChange, 300);
            static updateListenerFunctionOnSymbolChange(e) {
                Ae.updateAlertOnSymbolChange(e), FyersCommonModule.saveChart && (FyersCommonModule.saveChart.isDeleteAction && (FyersCommonModule.saveChart.isDeleteAction = !1), localStorage.getItem("activeChartSerializableObject") && localStorage.removeItem("activeChartSerializableObject"))
            }
            static roundOffPriceBasedOnTickSize(e, t, r = null) {
                try {
                    return t || (t = R.getPriceTickSize(r)), Math.round(e / t) * t
                } catch (t) {
                    return console.log(t), e
                }
            }
            static debouncer(e, t) {
                let r;
                return function(...a) {
                    clearTimeout(r), r = setTimeout((() => {
                        e(...a)
                    }), t)
                }
            }
            static refreshChartAndTradingDetails() {
                FyTrade._updateTradingDetails(), datafeed.resetCache(), tvWidget.activeChart().resetData(), tvWidget.resetLayoutSizes(), TradeModules.alertsFromCharts.ResetPriceAlerts(), tvWidget.save((e => {
                    tvWidget.load(e)
                }))
            }
            resetDataForAllCharts() {
                try {
                    const e = tvWidget.chartsCount(),
                        t = tvWidget.activeChartIndex();
                    for (let t = 0; t < e; t++) tvWidget.setActiveChart(t), tvWidget.activeChart().resetData();
                    tvWidget.setActiveChart(t)
                } catch (e) {
                    console.error("Error in resetDataForAllCharts", e), TradeModules.common.hawkeye("ERROR", `Error in resetDataForAllCharts : ${e}`)
                }
            }
            static refreshTradingDetails() {
                clearTimeout(Ie.debounceTradingDetailsTimeout), Ie.debounceTradingDetailsTimeout = setTimeout((() => {
                    this.refreshChartAndTradingDetails()
                }), 500)
            }
            handleDomAutoCenterBasedOnFlag(e) {
                "1" === e ? this.autoCenterDOM() : this.stopAutoCenterDOM()
            }
            autoCenterDOM() {
                Ie.domIntervalId || (Ie.domIntervalId = setInterval((() => {
                    const e = this.getDOMCenterButton();
                    e && e.click()
                }), 300))
            }
            getDOMCenterButton() {
                const e = document.getElementById("tv_chart_container") ? .firstElementChild;
                if (e) {
                    const t = e.contentDocument,
                        r = t ? .querySelector(".centeringContainer-AQZPvIZ5 button");
                    return r
                }
            }
            stopAutoCenterDOM() {
                Ie.domIntervalId && (clearInterval(Ie.domIntervalId), Ie.domIntervalId = null)
            }
            handleUserSettingsDomUpdate(e) {
                this.handleDomAutoCenterBasedOnFlag(e.dom_autocenter)
            }
            attachDOMButtonListener() {
                const e = document.getElementById("tv_chart_container") ? .firstElementChild;
                if (e) {
                    const t = e.contentDocument.querySelector('[data-name="trade-panel-button"]');
                    t && !t.hasAttribute("fy-dom-listener") && (t.addEventListener("click", (() => {
                        this.checkDomVisibilityAndToggleDom()
                    })), t.setAttribute("fy-dom-listener", "true"))
                }
            }
            checkDomVisibilityAndToggleDom() {
                setTimeout((() => {
                    if (this.getDOMCenterButton()) {
                        this.handleDomAutoCenterBasedOnFlag("1");
                        const e = document.getElementById("tv_chart_container") ? .firstElementChild;
                        if (e) {
                            const t = e.contentDocument.querySelector('.trading-panel-header-LlInYWMC [data-name="button-close"]');
                            t && !t.hasAttribute("fy-dom-listener") && (t.addEventListener("click", (() => {
                                this.handleDomAutoCenterBasedOnFlag("0")
                            })), t.setAttribute("fy-dom-listener", "true"))
                        }
                    } else this.handleDomAutoCenterBasedOnFlag("0")
                }), 1e3)
            }
        }
        const Fe = Ie,
            Be = {
                DISABLED_FEATURES: ["snapshot_trading_drawings", "widget_logo", "show_trading_notifications_history", "order_panel", "trading_notifications", "right_bar_stays_on_scroll", "broker_button", "watchlist_sections"],
                ENABLED_FEATURES: ["study_templates", "dom_widget", "dont_show_boolean_study_arguments", "chart_style_hilo_last_price", "hide_unresolved_symbols_in_legend", "show_average_close_price_line_and_label", "use_na_string_for_not_available_values", "header_in_fullscreen_mode", "lock_visible_time_range_on_resize", "confirm_overwrite_if_chart_layout_with_name_exists", "iframe_loading_compatibility_mode", "custom_resolutions", "two_character_bar_marks_labels", "seconds_resolution", "legend_last_day_change", "extended_extrapolation_limit"],
                DURATION_LIST: [{
                    name: "INTRADAY",
                    value: "INTRADAY"
                }, {
                    name: "CNC",
                    value: "CNC"
                }, {
                    name: "MARGIN",
                    value: "MARGIN"
                }, {
                    name: "CO",
                    value: "CO"
                }],
                TIME_FRAME: [{
                    text: "1D",
                    resolution: "5",
                    description: "1 Day"
                }, {
                    text: "5D",
                    resolution: "60",
                    description: "5 Days"
                }, {
                    text: "1M",
                    resolution: "240",
                    description: "1 Month"
                }, {
                    text: "3M",
                    resolution: "D",
                    description: "3 Months"
                }, {
                    text: "6M",
                    resolution: "D",
                    description: "6 Months"
                }, {
                    text: "1Y",
                    resolution: "D",
                    description: "1 Year"
                }, {
                    text: "5Y",
                    resolution: "W",
                    description: "5 Years"
                }, {
                    text: "10Y",
                    resolution: "M",
                    description: "10 Years"
                }, {
                    title: "All",
                    text: "30Y",
                    resolution: "M",
                    description: "Entire Historical"
                }],
                TRADINGVIEW_CONFIG: {
                    custom_css_url: globalConstants.constant.customCssUrl,
                    library_path: "https://assets.fyers.in/tv_lib/v29.5.0_unmodified/",
                    container: "tv_chart_container",
                    debug: !1,
                    fullscreen: !0,
                    locale: e.getParameterByName("lang") || "en",
                    symbol_search_request_delay: "250",
                    timezone: "Asia/Kolkata",
                    charts_storage_api_version: "1.3",
                    client_id: "trading_platform",
                    load_last_chart: !0,
                    auto_save_delay: 5,
                    settings_adapter: settingsAdapter,
                    interval: "1",
                    widgetbar: {
                        details: !0,
                        news: !1,
                        watchlist: !0,
                        datawindow: !0,
                        watchlist_settings: {
                            default_symbols: defaultWatchlistSym
                        }
                    },
                    broker_flags: {
                        supportPositionBrackets: !1,
                        supportEditAmount: !1,
                        supportReversePosition: !0,
                        supportNativeReversePosition: !0,
                        supportClosePosition: !0,
                        supportReducePosition: !1,
                        supportOrderBrackets: !1,
                        supportPLUpdate: !0,
                        supportDOME: !0,
                        supportLevel2Data: !0,
                        supportStopLimitOrders: !0,
                        showQuantityInsteadOfAmount: !0,
                        durationForMarketOrders: !0,
                        supportMarketBrackets: !0,
                        supportExecutions: !0
                    }
                },
                LEGACY_TOPBAR_BUTTONS: [
                    [{
                        key: "title",
                        value: "Try Web 1.5"
                    }, {
                        action: "click",
                        callback: function() {
                            e.handleClientRedirection()
                        }
                    }, {
                        itemClassName: "legacy-all-item",
                        imageSrc: "https://assets.fyers.in/global-components/trade-icons/topBar/one-point-five.svg",
                        itemLabel: "Try Web 1.5",
                        customHTML: ""
                    }, !0]
                ],
                ONEPOINTFIVE_TOPBAR_BUTTONS: [
                    [{
                        key: "title",
                        value: "onePointFiveHtml"
                    }, {
                        action: "click",
                        callback: function() {
                            if (!$("#exploreOnePointFiveContainer").length) {
                                const e = '\n                    <div id="exploreOnePointFiveContainer" class="explore-one-point-five-container">\n                     <div class="one-five-first-container">\n                      <div>\n                        <img src="https://assets.fyers.in/global-components/trade-icons/topBar/one-point-five.svg" height="36" />\n                      </div>\n                      <div class="one-five-first-wrapper">\n                        <span class="one-five-first-new-text">\n                          New\n                        </span>\n                        <span class="one-five-explore-text-heading">\n                          Supercharge Your Trading Experience!\n                        </span>\n                      </div>\n                    </div>\n                    <div>\n                      <ul class="one-point-five-list">\n                        <li>Uncover F&O opportunities to trade, equities too; we call it <span class="one-five-explore-discover-link" id="OneFiveExploreDiscoverLink"><span class="one-five-explore-discover-link-ul">Discover</span> <img src="https://assets.fyers.in/global-components/trade-icons/topBar/externalLinkYellow.svg" class="one-five-explore-discover-link-image" height="12"/></span></li>\n                        <li>Introducing Seconds Chart: Analyze price action & spot market shifts quickly!</li>\n                        <li>iPads and Android tablets grant seamless chart access via the Fyers App!</li>\n                      </ul>\n                    </div>\n                    <div class="one-point-btn-container">\n                        <div id="oneFivelearnMore" class="one-five-learn-btn">Learn more <img src="https://assets.fyers.in/global-components/trade-icons/topBar/externalLinkArrow.svg" height="10" width="10" class="ml-1"/></div>\n                        <div id="oneFiveModalClose" class="one-five-cencel-btn">Got it!</div>\n                    </div>\n                  </div>                  \n                    ';
                                $(document.body).append(e), $("#oneFivelearnMore").click((() => window.open("https://fyers.in/notice-board/?announcementType=Innovations", "_blank"))), $("#oneFiveModalClose").click((() => $("#exploreOnePointFiveContainer").remove())), $("#OneFiveExploreDiscoverLink").click((() => window.open(globalConstants.redirectionsConfig.discover, "_blank")))
                            }
                        }
                    }, {
                        itemClassName: "beta-all-item",
                        imageSrc: "",
                        itemLabel: "",
                        customHTML: "<div class='beta-all-item-wrapper'><span class='beta-all-item-img-container'><img src='https://assets.fyers.in/global-components/trade-icons/topBar/fyers-web-icon-topbar.svg'></span><span class='beta-all-item-text-container'>1.5</span></div>"
                    }, !0],
                    [{
                        key: "title",
                        value: "Insta options"
                    }, {
                        action: "click",
                        callback: function() {
                            window.open(Be.INSTAOPTIONS_URL, "_blank")
                        }
                    }, {
                        itemClassName: "visit-instaoptions",
                        imageSrc: "https://assets.fyers.in/global-components/trade-icons/topBar/instaOptions-new.svg",
                        itemLabel: "",
                        customHTML: ""
                    }, !0]
                ],
                COMMON_TOPBAR_BUTTONS: [
                    [{
                        key: "title",
                        value: "Manage positions and orders"
                    }, {
                        action: "click",
                        callback: function() {
                            TradeModules.exitPositionWindow.openExitPositionWindow()
                        }
                    }, {
                        itemClassName: "exit-all-item",
                        imageSrc: "https://assets.fyers.in/global-components/trade-icons/topBar/iconfix/Manage-positions-and-orders-light.svg",
                        itemLabel: "",
                        customHTML: ""
                    }, !0],
                    [{
                        key: "title",
                        value: "Smart OrderBook"
                    }, {
                        action: "click",
                        callback: function() {
                            try {
                                G.displaySmartOrderBook()
                            } catch (e) {
                                console.log(e)
                            }
                        }
                    }, {
                        itemClassName: "active-smartOrderbook-item",
                        imageSrc: "https://assets.fyers.in/global-components/trade-icons/topBar/smart-order-light.svg",
                        itemLabel: "",
                        customHTML: ""
                    }, !0],
                    [{
                        key: "title",
                        value: "Open option chain of active chart"
                    }, {
                        action: "click",
                        callback: function() {
                            $("#optionChainModal").modal("show"), optionChain.modal.appendOptionChainModalToUI(tvWidget.activeChart().symbol()), orderWindow.theme.applyTheme()
                        }
                    }, {
                        itemClassName: "active-option-chain-item",
                        imageSrc: "https://assets.fyers.in/global-components/trade-icons/topBar/Option-chain-light.svg",
                        itemLabel: "",
                        customHTML: ""
                    }, !0],
                    [{
                        key: "title",
                        value: "Basket Orders"
                    }, {
                        action: "click",
                        callback: function() {
                            TradeModules.basketWindow.openBasketWindow()
                        }
                    }, {
                        itemClassName: "basket-item",
                        imageSrc: "https://assets.fyers.in/global-components/trade-icons/topBar/iconfix/basket-order-light.svg",
                        itemLabel: "",
                        customHTML: ""
                    }, !0],
                    [{
                        key: "title",
                        value: "Holding Authorization"
                    }, {
                        action: "click",
                        callback: function() {
                            FyTrade.displayEdisWindow()
                        }
                    }, {
                        itemClassName: "authorize-item",
                        imageSrc: "https://assets.fyers.in/global-components/trade-icons/topBar/iconfix/Holding-Authorization-light.svg",
                        itemLabel: "",
                        customHTML: ""
                    }, !0],
                    [{
                        key: "title",
                        value: "Pop Out Chart"
                    }, {
                        action: "click",
                        callback: function() {
                            e.openPopoutChart()
                        }
                    }, {
                        itemClassName: "popout-item",
                        imageSrc: "https://assets.fyers.in/global-components/trade-icons/topBar/iconfix/Pop-out-chart-light.svg",
                        itemLabel: "",
                        customHTML: ""
                    }, !0],
                    [{
                        key: "title",
                        value: "View saved charts"
                    }, {
                        action: "click",
                        callback: function() {
                            window.open("https://savedcharts.fyers.in", "_blank")
                        }
                    }, {
                        itemClassName: "saved-charts-item",
                        imageSrc: "https://assets.fyers.in/global-components/trade-icons/topBar/iconfix/saved-charts-light.svg",
                        itemLabel: "",
                        customHTML: ""
                    }, !0],
                    [{
                        key: "title",
                        value: "Reset chart and refresh trading details"
                    }, {
                        action: "click",
                        callback: function() {
                            Fe.refreshTradingDetails()
                        }
                    }, {
                        itemClassName: "reset-chart-item",
                        imageSrc: "https://assets.fyers.in/global-components/trade-icons/topBar/iconfix/reset-light.svg",
                        itemLabel: "",
                        customHTML: ""
                    }, !0],
                    [{
                        key: "title",
                        value: "Change Theme"
                    }, {
                        action: "click",
                        callback: function() {
                            try {
                                const t = e.getUserSettingsDataFromLocalStorage(),
                                    r = JSON.parse(t);
                                "LIGHT" === r.theme ? (tvWidget.changeTheme("dark"), r.theme = "DARK") : (tvWidget.changeTheme("light"), r.theme = "LIGHT"), e.setUserSettingsDataToLocalStorage(JSON.stringify(r)), e.postData(Be.USER_SETTINGS, r)
                            } catch (e) {
                                console.log("Error in changing theme", e)
                            }
                        }
                    }, {
                        itemClassName: "change-theme-item",
                        imageSrc: "https://assets.fyers.in/global-components/trade-icons/topBar/theme-switch-light.svg",
                        itemLabel: "",
                        customHTML: ""
                    }, !0],
                    [{
                        key: "title",
                        value: "User Settings"
                    }, {
                        action: "click",
                        callback: function() {
                            $("#userSettingWindow").length || orderWindow.userSetting.createUserSettingsModal();
                            const e = $("#userSettingWindow");
                            e.length && new bootstrap.Modal(e[0]).show(), orderWindow.events.initiateEvents(), orderWindow.commonEventHandler.handleUserSettings(), orderWindow.userSettingEvents.initiateUserSettingsEvents(), window.orderWindow.events.triggerUserSettings()
                        }
                    }, {
                        itemClassName: "user-settings-item",
                        imageSrc: "https://assets.fyers.in/global-components/trade-icons/topBar/iconfix/user-settings-light.svg",
                        itemLabel: "",
                        customHTML: ""
                    }, !0],
                    [{
                        key: "title",
                        value: "Add funds to your Fyers account"
                    }, {
                        action: "click",
                        callback: function() {
                            window.open("https://fundtransfer.fyers.in/v2/", "_blank")
                        }
                    }, {
                        itemClassName: "add-funds-item",
                        imageSrc: "https://assets.fyers.in/global-components/trade-icons/topBar/iconfix/Funds-light.svg",
                        itemLabel: "",
                        customHTML: ""
                    }, !1],
                    [{
                        key: "title",
                        value: "Quick Trade"
                    }, {
                        action: "click"
                    }, {
                        itemClassName: "QuickTradeCheckbox",
                        itemLabel: "",
                        customHTML: '<div style="display:flex;align-items:center">\n                        <div class="quickTradeTextHeader">\n                        <div>Quick</div>\n                        <div>Trade</div>\n                        </div> \n                        <label class="switch">\n                          <input id="quickTradeInput" type="checkbox">\n                          <span class="slider round"></span>\n                        </label>\n                      </div>'
                    }, !1]
                ],
                DATAFEED_URL: globalConstants.dynamicUrl.data.base_data,
                USER_SETTINGS: globalConstants.dynamicUrl.user.settings_get,
                SAVE_CHART: globalConstants.dynamicUrl.tv_charts.save_charts_base,
                VERIFY_TOKEN: globalConstants.dynamicUrl.login.verify_token_gk,
                LEGACY_LIBRARY_PATH: globalConstants.constant.legacyLibraryPath,
                REDIRECTION_URL: globalConstants.constant.redirectionUrl,
                WEBONEPOINTFIVE_URL: globalConstants.constant.webOnePointFiveUrl,
                WEBONEPOINTFIVE_URL_WITH_SLASH: globalConstants.constant.webOnePointFiveUrlWithSlash,
                WEBLEGACY_URL: globalConstants.constant.webLegacyUrl,
                INSTAOPTIONS_URL: "https://instaoptions.fyers.in",
                FYERS_APP_URL: "https://fyers.in/web",
                SMART_ORDERBOOK_LABEL: "Smart OrderBook",
                ONE_POINT_FIVE_LABEL: "onePointFiveHtml",
                FYERS_TOKEN_COOKIE_NAME: "_FYERS",
                LOGINURL_CB: "https://login.fyers.in/?cb=https://trade.fyers.in",
                DEVICE_ID_COOKIE_NAME: "_deviceId",
                ORDER_STATUS: {
                    1: "Cancelled",
                    2: "Traded / Filled",
                    3: "For future use",
                    4: "Transit",
                    5: "Rejected",
                    6: "Pending"
                },
                RISK_DISCLOSURE_EXPIRY: 90,
                MARKET_STATUS_FLAG_FEATURE: "display_market_status",
                MTF_TOPBAR_ICON_OBJECT: [{
                    key: "title",
                    value: "Margin Trading Facility"
                }, {
                    action: "click",
                    callback: function() {
                        TradeModules.common.logAnalyticEvents("BtClk_nav_nav_mtf_BtClk_payLater"), e.enableMtfPopoup()
                    }
                }, {
                    itemClassName: "mtf-all-item",
                    imageSrc: "https://assets.fyers.in/global-components/trade-icons/topBar/mtf.svg",
                    itemLabel: "",
                    customHTML: ""
                }, !0],
                FYERS_WEB_ICON_OBJECT: [{
                    key: "title",
                    value: "Fyers Web"
                }, {
                    action: "click",
                    callback: function() {
                        window.open("https://fyers.in/web/", "_blank")
                    }
                }, {
                    itemClassName: "fyers-web",
                    itemLabel: "",
                    customHTML: '<div style="display:flex;align-items:center">\n        <img src="https://assets.fyers.in/global-components/trade-icons/topBar/Fyers.svg">\n        </div>'
                }, !0],
                FIA_TOPBAR_ICON_OBJECT: [{
                    key: "title",
                    value: "Fyers Intelligent Assistant"
                }, {
                    action: "click",
                    callback: function() {
                        e.enableFiaPopoup()
                    }
                }, {
                    itemClassName: "fiaBox",
                    imageSrc: "https://assets.fyers.in/fy_ui/fia/fia-new-light.svg",
                    itemLabel: "",
                    customHTML: ""
                }, !0],
                SWITCH_TO_LEGACY_TOPBAR: [
                    [{
                        key: "title",
                        value: "Switch to legacy"
                    }, {
                        action: "click",
                        callback: function() {
                            window.location.href = "https://trade.fyers.in/legacy.html"
                        }
                    }, {
                        itemClassName: "switch-to-legacy-latest",
                        imageSrc: "https://assets.fyers.in/global-components/trade-icons/topBar/back-to-v2.svg",
                        itemLabel: "",
                        customHTML: ""
                    }, !0]
                ],
                TRADING_VIEW_DURATIONS: [{
                    name: "INTRADAY",
                    value: "INTRADAY"
                }, {
                    name: "CNC",
                    value: "CNC"
                }, {
                    name: "MARGIN",
                    value: "MARGIN"
                }, {
                    name: "CO",
                    value: "CO"
                }],
                TRADING_VIEW_DURATIONS_MTF: {
                    name: "MTF",
                    value: "MTF"
                }
            },
            Re = {
                daily_pivot: "#0000FF",
                daily_bc: "#0000FF",
                daily_tc: "#0000FF",
                daily_s1: "#FF0000",
                daily_r1: "#008000",
                daily_s2: "#FF0000",
                daily_r2: "#008000",
                daily_s3: "#FF0000",
                daily_r3: "#008000",
                daily_s4: "#FF0000",
                daily_r4: "#008000",
                previous_day_high: "#FF7F00",
                previous_day_low: "#FF7F00"
            },
            Le = {
                previous_day_high: "#4CAF50",
                previous_day_close: "#2196F3",
                previous_day_open: "#00BCD4",
                previous_day_low: "#FF5252"
            },
            De = {
                previous_day_close: "#FF7F00"
            },
            We = {
                plot_0: "blue",
                OI_MA: "black"
            };
        class qe {
            constructor() {}
            getQuickTradeModal() {
                return `<div class="p-4 tabcontent quickTradeSection" id="settingOptionQuickTrade">\n                    <div class="quickTradeWrapper d-flex flex-column">\n                        <div class="quickTradeBody d-flex flex-column flex-grow-1">\n                            <div class="">\n                                <h3 class="quickTradeHeading">Quick Trade Settings</h3>\n                            </div>\n                            ${this.gap("top","1.5rem")}\n                            <div class="d-flex">\n                                <p class="checkBoxQuickTradeLabel mr-4">Product Type</p>\n                                    ${this.toggleButtons("Intraday","intraday_qr","Overnight","overnight_qr")}\n                            </div>\n                            ${this.gap("top","1.8rem")}\n                            <div class="d-flex align-items-center stopLossWrapper">\n                                ${this.checkBoxComponent("Stoploss:","stoploss_qr_checkbox","customCheckboxLabel")}\n                                ${this.simpleTextBox("stoplossValue_qr","0.01","28","120","","stoplossValue_qr","number","5","0.01")}\n                                ${this.toggleButtons("% Difference","stopLossDifference","<span class='rupee-symbol'>₹</span> Abs value","stopLossAbsValue")}\n                            </div>\n                            ${this.gap("top","1.5rem")}\n                            <div class="d-flex align-items-center targetWrapper">\n                                ${this.checkBoxComponent("Target:","target_qr_checkbox","customCheckboxLabel")}\n                                ${this.simpleTextBox("targetValue_qr","0.01","28","120","","targetValue_qr","number","5","0.01")}\n                                ${this.toggleButtons("% Difference","targetDifference","<span class='rupee-symbol'>₹</span> Abs value","targetAbsValue")}\n                            </div>\n                            ${this.gap("top","1.5rem")}\n                            <div class="d-flex flex-column positionSizingWrapper">\n                                <div class="d-flex align-items-center">\n                                ${this.checkBoxComponent("Position Sizing:","positionSizing_qr_checkbox","customCheckboxLabel",!1)}\n                                ${this.simpleTextBox("positionSizingValue_qr","1","28","120","","positionSizingValue_qr","number","5000","500")}\n                                ${this.toggleButtons("Amount","amountValue","Lots","lotsValue","% Margin","positionSizingMargin")}\n                                </div>\n                                <div class="d-flex infoSection-qr">\n                                    <div class="d-flex align-items-center infoContentPositionSizing">\n                                        ${this.checkBoxComponent("Auto update of quantity on price change","liveUpdates_qr_checkbox","infoContentPositionSizing",!1)}\n                                </div>\n                                 </div>\n                                <div class="d-flex infoSection-qr">\n                                    ${this.infoIcon()}\n                                    ${this.gap("left","0.5rem")}\n                                    ${this.paragraphComponent("infoContentPositionSizing positionSizingInfo","","For amount, Position size will be calculated on the basis of net premium of the order.")}\n                                </div>\n                                \n                           \n                            </div>\n                        </div>\n                        <div class="align-items-sm-baseline flex-grow-0 quickTradeFooter d-none">\n                                ${this.infoIcon("","18","18")}\n                                 ${this.gap("left","0.5rem")}\n                                <span class="infoContentNote">Note:</span> \n                                ${this.paragraphComponent("infoContentPositionSizing","infoContentProductType","Based on your selected preference your order type will be BO by default.")}\n                        </div>\n                    </div>\n                </div>`
            }
            static getQuickTradeBanner() {
                return '\n        <div class="qrBanner">\n            <div class="qrBannerHeader">\n              <img src="https://assets.fyers.in/images/quickTrade/thunderWithBox.svg" alt="">\n               <div class="d-flex flex-column ml-3">\n                <div class="bannerNewText">New</div>\n                <div class="bannerHeading">Introducing quick trade from charts</div>\n               </div>\n            </div>\n            <div class= "qrBannerbody">\n                <ul>\n                    <li>Activate \'Quick Trade\' with a simple toggle.</li>\n                    <li>Set predefined stop-loss and targets for your orders.</li>\n                    <li>Set position sizing as per your risk. </li>\n                    <li>Place instant orders with just a click.</li>\n                </ul>\n            </div>\n            <div class= "qrBannerFooter">\n              <button id="quickTradeTryNow" class="qrTryNow">Try now <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">\n                <path d="M5.82407 11.0546L13.0513 3.82733C13.201 3.67762 13.201 3.42983 13.0513 3.28013C12.9016 3.13042 12.6538 3.13042 12.5041 3.28013L5.27686 10.5074C5.12716 10.6571 5.12716 10.9049 5.27686 11.0546C5.3543 11.132 5.45238 11.1681 5.55046 11.1681C5.64855 11.1681 5.74663 11.132 5.82407 11.0546Z" fill="#436AF5"/>\n                <path d="M13.1647 8.85555V3.55386C13.1647 3.34221 12.9892 3.16669 12.7776 3.16669H7.47587C7.26422 3.16669 7.0887 3.34221 7.0887 3.55386C7.0887 3.76551 7.26422 3.94103 7.47587 3.94103H12.3904V8.85555C12.3904 9.0672 12.5659 9.24272 12.7776 9.24272C12.9892 9.24272 13.1647 9.0672 13.1647 8.85555Z" fill="#436AF5"/>\n              </svg></button>\n              <button id="quickTradeLearnMore" class="qrLearnMore">Learn More <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none">\n                <path d="M3.685 13.353L13.0183 4.01964C13.2117 3.8263 13.2117 3.5063 13.0183 3.31297C12.825 3.11964 12.505 3.11964 12.3117 3.31297L2.97833 12.6463C2.785 12.8396 2.785 13.1596 2.97833 13.353C3.07833 13.453 3.205 13.4996 3.33167 13.4996C3.45833 13.4996 3.585 13.453 3.685 13.353Z" fill="white"/>\n                <path d="M13.1647 10.5134V3.66669C13.1647 3.39335 12.938 3.16669 12.6647 3.16669H5.81801C5.54467 3.16669 5.31801 3.39335 5.31801 3.66669C5.31801 3.94002 5.54467 4.16669 5.81801 4.16669H12.1647V10.5134C12.1647 10.7867 12.3913 11.0134 12.6647 11.0134C12.938 11.0134 13.1647 10.7867 13.1647 10.5134Z" fill="white"/>\n              </svg></button>\n            </div>\n        </div>\n      '
            }
            infoIcon(e = "", t = "14", r = "14") {
                return `<span id=${e}>\n                    <svg xmlns="http://www.w3.org/2000/svg" width=${t} height=${r} viewBox="0 0 14 14" fill="none">\n                        <path d="M6.5625 6.41683V9.3335C6.5625 9.57266 6.76083 9.771 7 9.771C7.23917 9.771 7.4375 9.57266 7.4375 9.3335V6.41683C7.4375 6.17766 7.23917 5.97933 7 5.97933C6.76083 5.97933 6.5625 6.17766 6.5625 6.41683Z" fill="#959CA6"/>\n                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.729187 7.00016C0.729187 10.4593 3.54085 13.271 7.00002 13.271C10.4592 13.271 13.2709 10.4593 13.2709 7.00016C13.2709 3.541 10.4592 0.729329 7.00002 0.729329C3.54085 0.729329 0.729187 3.541 0.729187 7.00016ZM1.60419 7.00016C1.60419 4.02516 4.02502 1.60433 7.00002 1.60433C9.97502 1.60433 12.3959 4.02516 12.3959 7.00016C12.3959 9.97516 9.97502 12.396 7.00002 12.396C4.02502 12.396 1.60419 9.97516 1.60419 7.00016Z" fill="#959CA6"/>\n                        <path d="M6.77835 4.12999C6.70835 4.15915 6.64419 4.19999 6.58585 4.25249C6.53335 4.31082 6.49252 4.36915 6.46335 4.44499C6.43419 4.51499 6.41669 4.59082 6.41669 4.66665C6.41669 4.74249 6.43419 4.81832 6.46335 4.88832C6.49252 4.95832 6.53335 5.02249 6.58585 5.08082C6.64419 5.13332 6.70835 5.17415 6.77835 5.20332C6.91835 5.26165 7.08169 5.26165 7.22169 5.20332C7.29169 5.17415 7.35585 5.13332 7.41419 5.08082C7.46669 5.02249 7.50752 4.95832 7.53669 4.88832C7.56585 4.81832 7.58335 4.74249 7.58335 4.66665C7.58335 4.59082 7.56585 4.51499 7.53669 4.44499C7.50752 4.36915 7.46669 4.31082 7.41419 4.25249C7.35585 4.19999 7.29169 4.15915 7.22169 4.12999C7.15169 4.10082 7.07585 4.08332 7.00002 4.08332C6.92419 4.08332 6.84835 4.10082 6.77835 4.12999Z" fill="#959CA6"/>\n                    </svg>\n                </span>`
            }
            paragraphComponent(e, t, r) {
                return `<p id="${t}" class="${e}">${r}</p>`
            }
            gap(e = "top", t = "1rem") {
                return `<div style="margin-${e}: ${t}"></div>`
            }
            toggleButtons(e, t, r, a, i, s) {
                return `\n        <div class="settingsButtonWrapper">\n            <button class="toggleButtons toggleButtonsActive" id="${t}">${e}</button>\n            <button class="toggleButtons" id="${a}">${r}</button>\n            ${i?`<button class="toggleButtons" id="${s}">${i}</button>`:""}\n        </div>`
            }
            simpleTextBox(e, t, r, a, i, s, o, n, d) {
                return `<div class= "">\n                    <input type=${o} step=${t} id=${e} value="${n}" min=${d} class="p-2 pb-1 dynamicTextBox" name="${s}" placeholder="${i}" style="height: ${r}px;width:${a}px">\n                </div>`
            }
            checkBoxComponent(e, t, r = "", a = !1) {
                return `<input id=${t} class="customCheckBoxInput" type="checkbox" ${a?"checked":""}>\n                <label class="checkboxCustomComp" for=${t}></label>\n                <label class=${r} for=${t}>${e}</label>`
            }
        }
        const Ve = class {
            static initateQuickTradeEvents() {
                $("#intraday_qr").unbind().click((function(e) {
                    Qe.handleIntradaySwitchQr(e)
                })), $("#overnight_qr").unbind().click((function(e) {
                    Qe.handleOvernightSwitchQr(e)
                })), $("#stopLossDifference").unbind().click((function(e) {
                    Qe.stopLossDiffButtonHandler(e)
                })), $("#stopLossAbsValue").unbind().click((function(e) {
                    Qe.stopLossAbsValueHandler(e)
                })), $("#targetDifference").unbind().click((function(e) {
                    Qe.targetDiffButtonHandler(e)
                })), $("#targetAbsValue").unbind().click((function(e) {
                    Qe.targetAbsValueButtonHandler(e)
                })), $("#positionSizingMargin").unbind().click((function(e) {
                    Qe.positionSizingButtonClickHandler(e)
                })), $("#lotsValue").unbind().click((function(e) {
                    Qe.lotValueButtonClickHandler(e)
                })), $("#amountValue").unbind().click((function(e) {
                    Qe.ammountValueButtonClickHandler(e)
                })), $("#stoploss_qr_checkbox").unbind().click((function(e) {
                    Qe.stopLossCheckClick(), le.updateToStore(de.storeKey.StopLossEnabled, e.target.checked)
                })), $("#target_qr_checkbox").unbind().click((function(e) {
                    Qe.targetCheckClick(), le.updateToStore(de.storeKey.TargetEnabled, e.target.checked)
                })), $("#positionSizing_qr_checkbox").unbind().click((function(e) {
                    Qe.position_sizingCheckClick(), le.updateToStore(de.storeKey.PositionSizingEnabled, e.target.checked)
                })), $("#stoplossValue_qr").off().on("change keyup", (function(e) {
                    Qe.stopLossValueChange(e)
                })), $("#targetValue_qr").off().on("change keyup", (function(e) {
                    Qe.targetValueChange(e)
                })), $("#positionSizingValue_qr").off().on("change keyup", (function(e) {
                    Qe.position_sizingValueChange(e)
                })), $("#liveUpdates_qr_checkbox").unbind().click((function(e) {
                    le.updateToStore(de.storeKey.LiveUpdateEnabled, e.target.checked)
                })), this.setDefaultValues()
            }
            static initiateQuickTradeBannerEvents() {
                $("#quickTradeTryNow").off().on("click", (() => {
                    Qe.quickTradeTryNowHandler()
                })), $("#quickTradeLearnMore").off().on("click", (() => {
                    Qe.quickTradeLearnMoreHandler()
                }))
            }
            static setDefaultValues() {
                const e = TradeModules.storeData.quickTrade.quicktrade;
                $("#positionSizingValue_qr").val(e.positionSizingValue_qr), $("#stoplossValue_qr").val(e.stoplossValue_qr), $("#targetValue_qr").val(e.targetValue_qr)
            }
        };
        class Ne {
            static position_sizingCheckClick() {
                const e = $("#positionSizing_qr_checkbox").prop("checked");
                $(".positionSizingWrapper .dynamicTextBox, .positionSizingWrapper .settingsButtonWrapper").toggleClass("noneCursor", !e)
            }
            static handleIntradaySwitchQr(e) {
                e && le.updateToStore(de.storeKey.ProductType, e.target.id), le.toggleActive(e, "intraday_qr"), $(".stopLossWrapper").removeClass("d-none").addClass("d-flex"), $(".stopLossWrapper").next().removeClass("d-none").addClass("d-flex"), $(".targetWrapper").removeClass("d-none").addClass("d-flex");
                const t = $("#target_qr_checkbox").prop("checked"),
                    r = $("#stoploss_qr_checkbox").prop("checked");
                t || r ? $(".quickTradeFooter").removeClass("d-none").addClass("d-flex") : $(".quickTradeFooter").removeClass("d-flex").addClass("d-none")
            }
            static handleOvernightSwitchQr(e) {
                e && le.updateToStore(de.storeKey.ProductType, e.target.id), le.toggleActive(e, "overnight_qr"), $(".stopLossWrapper").removeClass("d-flex").addClass("d-none"), $(".stopLossWrapper").next().removeClass("d-flex").addClass("d-none"), $(".targetWrapper").removeClass("d-flex").addClass("d-none"), $(".quickTradeFooter").removeClass("d-flex").addClass("d-none")
            }
            static stopLossCheckClick() {
                const e = $("#stoploss_qr_checkbox").prop("checked"),
                    t = $("#target_qr_checkbox");
                $(".stopLossWrapper .dynamicTextBox, .stopLossWrapper .settingsButtonWrapper").toggleClass("noneCursor", !e), $(".quickTradeFooter").toggleClass("d-none", !e).toggleClass("d-flex", e), e ? $("#infoContentProductType").text("Based on your selected preference your order type will be CO by default.") : t.prop("checked") && (t.prop("checked", !1), $(".targetWrapper .dynamicTextBox, .targetWrapper .settingsButtonWrapper").addClass("noneCursor"), le.updateToStore(de.storeKey.TargetEnabled, !1))
            }
            static targetCheckClick() {
                const e = $("#target_qr_checkbox").prop("checked"),
                    t = $("#stoploss_qr_checkbox").prop("checked");
                $(".targetWrapper .dynamicTextBox, .targetWrapper .settingsButtonWrapper").toggleClass("noneCursor", !e), e ? (t || ($("#stoploss_qr_checkbox").prop("checked", !0), $(".stopLossWrapper .dynamicTextBox, .stopLossWrapper .settingsButtonWrapper").removeClass("noneCursor"), le.updateToStore(de.storeKey.StopLossEnabled, !0)), $("#infoContentProductType").text("Based on your selected preference your order type will be BO by default.")) : t && $("#infoContentProductType").text("Based on your selected preference your order type will be CO by default."), $(".quickTradeFooter").toggleClass("d-none", !(e || t)).toggleClass("d-flex", e || t)
            }
            static handlecheckEventsForQr() {
                this.stopLossCheckClick(), this.targetCheckClick(), this.position_sizingCheckClick()
            }
            static handleValidation(e, t, r = 1) {
                return t < r || 0 === t || isNaN(t) ? ($(`#${e}`).addClass("input-field-error"), !1) : ($(`#${e}`).removeClass("input-field-error"), !0)
            }
            static handleValidationForPositionSizing(e, t) {
                switch (TradeModules.storeData.quickTrade.updatedQuickTradeData.position_sizing_type) {
                    case "amountValue":
                        return this.handleValidation(e, t, 500);
                    case "lotsValue":
                        return this.handleValidation(e, t, 1);
                    case "positionSizingMargin":
                        return this.handleValidation(e, t, .5);
                    default:
                        return this.handleValidation(e, t)
                }
            }
            static stopLossValueChange(e) {
                const t = e.target.id,
                    r = parseFloat(e.target.value);
                this.handleValidation(t, r) && le.updateToStore(t, r)
            }
            static targetValueChange(e) {
                const t = e.target.id,
                    r = parseFloat(e.target.value);
                this.handleValidation(t, r) && le.updateToStore(t, r)
            }
            static position_sizingValueChange(e) {
                const t = e.target.id,
                    r = parseFloat(e.target.value);
                this.handleValidationForPositionSizing(t, r) && le.updateToStore(t, r)
            }
            static positionSizingButtonClickHandler(e) {
                const t = $("#positionSizingValue_qr");
                e && le.toggleActive(e), e && le.updateToStore(de.storeKey.PositionSizingType, e.target.id), e && le.updateToStore(de.storeKey.PositionSizingValue, e.target.value), t.attr("min", "1"), t.attr("step", "1"), "positionSizingMargin" === TradeModules.storeData.quickTrade.quicktrade.position_sizing_type ? t.val(TradeModules.storeData.quickTrade.quicktrade.positionSizingValue_qr) : (t.val(de.defaultValues.positionSizingMargin), le.updateToStore(de.storeKey.PositionSizingValue, de.defaultValues.positionSizingMargin)), $(".positionSizingInfo").text("For % margin, Position size will be calculated on the basis of net premium of the order."), $(".infoSection-qr").removeClass("d-none").addClass("d-flex"), t.removeClass("input-field-error")
            }
            static lotValueButtonClickHandler(e) {
                const t = $("#positionSizingValue_qr");
                e && le.toggleActive(e), e && le.updateToStore(de.storeKey.PositionSizingType, e.target.id), t.attr("min", "1"), t.attr("step", "1"), "lotsValue" === TradeModules.storeData.quickTrade.quicktrade.position_sizing_type ? t.val(TradeModules.storeData.quickTrade.quicktrade.positionSizingValue_qr) : (t.val(de.defaultValues.lotsValue), le.updateToStore(de.storeKey.PositionSizingValue, de.defaultValues.lotsValue)), $(".infoSection-qr").addClass("d-none").removeClass("d-flex"), t.removeClass("input-field-error")
            }
            static ammountValueButtonClickHandler(e) {
                const t = $("#positionSizingValue_qr");
                e && le.toggleActive(e), e && le.updateToStore(de.storeKey.PositionSizingType, e.target.id), t.attr("min", "500"), t.attr("step", "1"), "amountValue" === TradeModules.storeData.quickTrade.quicktrade.position_sizing_type ? t.val(TradeModules.storeData.quickTrade.quicktrade.positionSizingValue_qr) : (t.val(de.defaultValues.amountValue), le.updateToStore(de.storeKey.PositionSizingValue, de.defaultValues.amountValue)), $(".positionSizingInfo").text("For amount, Position size will be calculated on the basis of net premium of the order."), $(".infoSection-qr").removeClass("d-none").addClass("d-flex"), t.removeClass("input-field-error")
            }
            applyUserSettingsForQuickTrade(e, t) {
                let r;
                r = t ? e : P.getState().quickTrade;
                const a = r.quicktrade;
                for (let e in a) {
                    const t = a[e],
                        r = $(`#${e}`);
                    if (e.includes("type")) {
                        const e = $(`#${t}`);
                        e.parent().find("button").removeClass("toggleButtonsActive"), e.addClass("toggleButtonsActive")
                    } else e.includes("checkbox") ? r.prop("checked", t) : e.includes("Value_qr") && r.val(t)
                }
                Ne.triggerEventHandlersBasedOnSettings(a)
            }
            static triggerEventHandlersBasedOnSettings(e) {
                const t = e.product_type,
                    r = e.position_sizing_type,
                    a = e.stoploss_type,
                    i = e.target_type;
                switch (r) {
                    case "amountValue":
                    default:
                        Ne.ammountValueButtonClickHandler();
                        break;
                    case "lotsValue":
                        Ne.lotValueButtonClickHandler();
                        break;
                    case "positionSizingMargin":
                        Ne.positionSizingButtonClickHandler()
                }
                switch (a) {
                    case "stopLossDifference":
                    default:
                        Ne.stopLossDiffButtonHandler();
                        break;
                    case "stopLossAbsValue":
                        Ne.stopLossAbsValueHandler()
                }
                switch (i) {
                    case "targetDifference":
                    default:
                        Ne.targetDiffButtonHandler();
                        break;
                    case "targetAbsValue":
                        Ne.targetAbsValueButtonHandler()
                }
                Ne.handlecheckEventsForQr(), "intraday_qr" === t ? Ne.handleIntradaySwitchQr() : "overnight_qr" === t && Ne.handleOvernightSwitchQr()
            }
            static stopLossDiffButtonHandler(e) {
                le.updateInputAttributes({
                    elementId: "stoplossValue_qr",
                    storeKey: de.storeKey.StopLossType,
                    event: e,
                    min: "0.01",
                    step: "0.01",
                    defaultValue: de.defaultValues.stopLossDifference
                })
            }
            static stopLossAbsValueHandler(e) {
                le.updateInputAttributes({
                    elementId: "stoplossValue_qr",
                    storeKey: de.storeKey.StopLossType,
                    event: e,
                    min: "0.05",
                    step: "0.01",
                    defaultValue: de.defaultValues.stopLossAbsValue
                })
            }
            static targetDiffButtonHandler(e) {
                le.updateInputAttributes({
                    elementId: "targetValue_qr",
                    storeKey: de.storeKey.TargetType,
                    event: e,
                    min: "0.01",
                    step: "0.01",
                    defaultValue: de.defaultValues.targetDifference
                })
            }
            static targetAbsValueButtonHandler(e) {
                le.updateInputAttributes({
                    elementId: "targetValue_qr",
                    storeKey: de.storeKey.TargetType,
                    event: e,
                    min: "0.05",
                    step: "0.01",
                    defaultValue: de.defaultValues.targetAbsValue
                })
            }
            static async quickTradeHeaderCallback(e) {
                const t = $(".qrBanner"),
                    r = broker._host.domPanelVisibility()._value,
                    a = e.target.checked,
                    i = tvWidget.activeChart().symbol();
                P.dispatch(E.setQuickTradeStatus(a));
                const s = P.getState().quickTrade.bannerStatus;
                if (TradeModules.common.logAnalyticEvents("TgClk_ord_ordplcmt_ordwndw_SwchQuickTrd_", {
                        "Quick Trade": a ? "On" : "Off"
                    }), t.length && !e.target.checked && t.remove(), a && !JSON.parse(s)) {
                    const e = qe.getQuickTradeBanner();
                    $(document.body).append(e), Ve.initiateQuickTradeBannerEvents()
                }
                if (r && a ? (le.triggerDom(), le.triggerDom()) : (!r && a || r && !a) && le.triggerDom(), a) {
                    const e = await le.getQtyBasedOnPositionSizing(i);
                    le.updateQtyInDom(i, e)
                } else TradeModules.quickTrade.resetSymbolCache(), le.updateQtyInDom(i, R.getLotSize(i))
            }
            static quickTradeTryNowHandler() {
                $(".qrBanner").remove(), se.postQuickTradeBannerStaus()
            }
            static quickTradeLearnMoreHandler() {
                $(".qrBanner").remove(), $("iframe").eq(0).contents().find("#quickTradeInput").click(), window.open("https://support.fyers.in/portal/en/kb/platforms-tools/fyers-web/quick-trade", "_blank")
            }
            async saveQuickTradeSettings() {
                const e = P.getState().quickTrade.updatedQuickTradeData;
                if (200 === (await ne.postQuickTrade(e)).code) {
                    const t = tvWidget.activeChart().symbol();
                    P.dispatch(E.setQuickTradeApiData(e));
                    const r = await TradeModules.quickTrade.getQtyForQuickTrade(t);
                    TradeModules.storeData.quickTrade.quickTradeStatus && TradeModules.storeData.quickTrade.quicktrade.positionSizing_qr_checkbox && (le.updateQtyInDom(t, r), TradeModules.quickTrade.resetSymbolCache())
                }
            }
            static subscribeToChartChange() {
                tvWidget.chart(window.currentChartId).onSymbolChanged().subscribe(window, Ne.updateQtyForQuickTrade), tvWidget.subscribe("activeChartChanged", (e => {
                    try {
                        tvWidget.chart(window.currentChartId).onSymbolChanged().unsubscribe(window, Ne.updateQtyForQuickTrade), tvWidget.chart(e).onSymbolChanged().subscribe(window, Ne.updateQtyForQuickTrade), window.currentChartId = e
                    } catch (t) {
                        tvWidget.chart(e).onSymbolChanged().subscribe(window, Ne.updateQtyForQuickTrade), window.currentChartId = e
                    }
                    Ne.updateQtyForQuickTrade()
                }))
            }
            static async updateQtyForQuickTrade() {
                const e = tvWidget.activeChart().symbol();
                if (!e.includes("INDEX")) {
                    const t = TradeModules.storeData.quickTrade.symbolCache.includes(e);
                    if (TradeModules.storeData.quickTrade.quickTradeStatus && TradeModules.storeData.quickTrade.quicktrade.positionSizing_qr_checkbox && !t) {
                        const t = await TradeModules.quickTrade.getQtyForQuickTrade(e);
                        setTimeout((() => {
                            le.updateQtyInDom(e, t)
                        }), 0), TradeModules.quickTrade.updateSymbolCache(e)
                    }
                }
            }
            static attachEventForQuickTradeToggle() {
                $("iframe").eq(0).contents().find("#quickTradeInput").off().on("click", (function(e) {
                    Ne.quickTradeHeaderCallback(e)
                }))
            }
        }
        const Qe = Ne,
            He = {
                t2tSegment: function() {
                    return 'To proceed, kindly confirm as this stock is in T2T segment and cannot be squared-off until settlement (T+1 Days). <span id="t2tLearnMore" style="color: #436AF5;cursor: pointer;">Learn More</span>'
                },
                asmGsmAlert: function(e) {
                    return `Security is under ${e}, would you like to continue? <span id="asmGsmLearnMore" style="color: #436AF5;cursor: pointer;">Learn More</span>`
                },
                grossSettleMent: function() {
                    return 'Security is under Gross settlement (Trade for Trade), would you like to continue?<span id="grossSettlementLearnMore" style="color: #436AF5;cursor: pointer;">Learn More</span>'
                },
                fresh_pledge: function() {
                    return `Placing this order may impact the pledge request for this symbol. <a href="${this.freshPledgeLink}" target="_blank" rel="noopener">Learn more</a>`
                },
                previously_pledged: function() {
                    return `Placing this order may reduce this symbol's pledged quantity and collateral margin. <a href="${this.previouslyPledgedLink}" target="_blank" rel="noopener">Learn more</a>`
                },
                freshPledgeLink: "https://support.fyers.in/portal/en/kb/articles/is-it-possible-to-sell-my-holdings-after-submitting-a-pledge-request",
                previouslyPledgedLink: "https://support.fyers.in/portal/en/kb/articles/can-i-sell-my-pledged-shares-without-unpledging-them-at-fyers",
                t2tSupportArticle: "https://support.fyers.in/portal/en/kb/articles/why-am-i-getting-an-error-stating-this-scrip-is-in-t2t-segment-and-cannot-be-squared-off-until-settlement",
                asmGsmSupportArticle: "https://support.fyers.in/portal/en/kb/articles/why-am-i-getting-an-error-stating-this-scrip-is-marked-under-asm-gsm-by-the-exchange",
                grossSettleMentSupportArticle: "https://support.fyers.in/portal/en/kb/articles/why-am-i-getting-an-error-stating-this-scrip-is-in-t2t-segment-and-cannot-be-squared-off-until-settlement"
            },
            Ue = class {
                constructor() {}
                validateT2TSegments() {
                    const e = orderWindow.orderData.selectedSymbol;
                    try {
                        let t = [];
                        return "NSE" === orderWindow.orderData.exchangeName ? t = e.match(/-BE|-BZ|-ST/g) : "BSE" === orderWindow.orderData.exchangeName && (t = e.match(/-TS|-ZP|-MT|-Z|-ST|-T|-R|-XT/g)), !(!t || !t.length)
                    } catch (e) {
                        return console.log("error catched", e), !1
                    }
                }
                getArrayOfErrorWarningMessages() {
                    try {
                        const e = datafeed.unzippedData.data[orderWindow.orderData.selectedSymbol][14],
                            t = this.validateT2TSegments(),
                            r = !!datafeed.unzippedData.data[orderWindow.orderData.selectedSymbol][35],
                            a = [];
                        return e && a.push(He.asmGsmAlert(e)), t && a.push(He.t2tSegment()), r && a.push(He.grossSettleMent()), a
                    } catch (e) {
                        console.log(e)
                    }
                }
                getArrayOfInfoWarningMessages() {
                    const e = [],
                        t = FyTrade.storeData.broker.holdingsData.holdings ? ? [],
                        r = orderWindow.orderData.selectedSymbol,
                        a = t.find((e => e.symbol === r)) ? ? {},
                        i = document.querySelector("#invest_toggle").classList;
                    if (Object.keys(a).length && "sell" === orderWindow.orderData.selectedSide && i.contains("toggle-button-active")) {
                        const t = a.qty,
                            r = a.qty_pledge_available,
                            i = (a.qty_t1, a.qty_used),
                            s = a.qty_colateral_today,
                            o = a.qty_colateral,
                            n = orderWindow.orderData.quantityConverted,
                            d = n - r;
                        if (n > r) {
                            const a = t - r;
                            let n = 0,
                                l = 0,
                                c = 0,
                                p = 0;
                            if (i <= a) n = i;
                            else {
                                n = a;
                                let e = i - n;
                                e <= s ? l = e : (l = s, e -= l, e <= o ? c = e : (c = o, p = e - c))
                            }
                            const m = s - l;
                            m > 0 && e.push(He.fresh_pledge()), d - m > 0 && o - c > 0 && e.push(He.previously_pledged())
                        }
                    }
                    return e
                }
                toShowWarningPopupOrNot() {
                    try {
                        return [...this.getArrayOfInfoWarningMessages(), ...this.getArrayOfErrorWarningMessages()].length
                    } catch (e) {
                        return console.log(e), 0
                    }
                }
            },
            ze = class {
                constructor() {}
                getWarningPopup() {
                    const e = this.generateWarningPopupHtml();
                    $("#ow_warningPopupDiv").append(e), Ge.prototype.initiateModalEvents()
                }
                generateWarningPopupHtml() {
                    return `\n            <div id='ow_warning_parentPopup' class="ow_warning_parent">\n                ${this.getWarningHeader()}\n                ${this.getWarningBody()}\n             <div class="ow_warning_lineBreak"></div>\n                ${this.getWarningFooter()}\n            </div>\n        `
                }
                getWarningHeader() {
                    return '\n     \x3c!-- Heading --\x3e\n     <div class="ow_warning_heading">\n         <div class="ow_warning_img"></div>\n         <div class="ow_warning_text">Do you want to proceed with this order?</div>\n     </div>\n     '
                }
                getWarningBody() {
                    return `\n        \x3c!-- Body - Warning+ error  message --\x3e\n        <div class="ow_warning_flex ow_warning_bodyContainer">\n            ${this.getErrorWarningContent()}\n             ${this.getMessageWarningContent()}\n        </div>\n        `
                }
                getWarningFooter() {
                    return '\n       <div class="os_footer d-flex align-items-center justify-content-start"\n            style=" margin-bottom: 10px;padding-top: 15px;padding-left: 20px;">\n           <button class="os_slicer_proceed_btn text-center buy" id="ow_warning_proceed">Proceed</button>\n           <button class="os_border os_slicer_cancel_btn text-center os_text" id="ow_warning_cancel"> Cancel </button>\n           </div>\n       '
                }
                getErrorWarningContent() {
                    const e = Ue.prototype.getArrayOfErrorWarningMessages();
                    return e.length ? `\n         <div class="ow_warning_flex ow_warning_contentCenter ow_warning_messageContainer ow_warning_error">\n      <div class="ow_warning_flex ow_warning_flexColoumn" style="padding-left: 10px;">\n                  ${this.getErrorWarningContentEachWarning(e)}  \n                 </div></div>\n      ` : ""
                }
                getErrorWarningContentEachWarning(e) {
                    let t = "";
                    return e.forEach((e => {
                        t += ` <div style="display:flex; align-items: flex-start; justify-content: center; gap: 10px;">\n         <div\n             style="justify-content: center; width:8px; height:8px; flex-shrink: 0;  background: #FF3B2F; border-radius: 9999px">\n         </div>\n         <div class="errorWarningContentEachWarning">\n             ${e}</div>\n     </div>`
                    })), t
                }
                getMessageWarningContent() {
                    const e = Ue.prototype.getArrayOfInfoWarningMessages();
                    return e.length ? `\n    <div class="ow_warning_flex ow_warning_contentCenter ow_warning_messageContainer ow_warning_message">\n    <div class="ow_warning_flex ow_warning_flexColoumn" style="padding-left: 10px;">${this.getMessageWarningContentEachMessage(e)} </div></div>\n    ` : ""
                }
                getMessageWarningContentEachMessage(e) {
                    let t = "";
                    return e.forEach((e => {
                        t += `<div style="display:flex; align-items: flex-start; justify-content: center; gap: 10px;">\n            <div\n                style="justify-content: center; width:8px; height:8px; flex-shrink: 0;  background: #FFCC02; border-radius: 9999px">\n            </div>\n            <div class="errorWarningContentEachWarning">\n                ${e}</div>\n        </div>`
                    })), t
                }
            },
            Ge = class {
                constructor() {}
                initiateModalEvents() {
                    $("#t2tLearnMore").off("click").on("click", (function() {
                        window.open(He.t2tSupportArticle)
                    })), $("#asmGsmLearnMore").off("click").on("click", (function() {
                        window.open(He.asmGsmSupportArticle)
                    })), $("#grossSettlementLearnMore").off("click").on("click", (function() {
                        window.open(He.grossSettleMentSupportArticle)
                    })), $("#ow_warning_proceed").off("click").on("click", (function() {
                        $("#ow_warningPopupDiv").empty(), orderWindow.events.handleBuySellButtonClick()
                    })), $("#ow_warning_cancel").off("click").on("click", (function() {
                        $("#ow_warningPopupDiv").empty(), orderWindow.events.enableOwElementsToBeClicked()
                    })), orderWindow.events.disableOwElementsToBeClicked()
                }
                getOwWarningPopoup() {
                    $("#ow_warningPopupDiv") && $("#ow_warningPopupDiv").children().length || ze.prototype.getWarningPopup()
                }
                proceedOrder() {
                    $("#orderConfirmationModal").modal("hide")
                }
            };
        var je = r(961),
            Ye = r.n(je);
        class Je {
            constructor() {
                this.firstLoad = !0, this.customIndicator = new class {
                    constructor() {
                        this.cpr = new class {
                            constructor() {}
                            getCprGraphValues(e, t, r) {
                                let a = (e + t + r) / 3,
                                    i = (e + t) / 2,
                                    s = 2 * a - t,
                                    o = a + e - t,
                                    n = s + e - t,
                                    d = 2 * a - e,
                                    l = a - e + t,
                                    c = d - e + t;
                                return [a, i, 2 * a - i, d, s, l, o, c, n, c + l - d, n + o - s, e, t]
                            }
                            getIndicatorTemplates(e) {
                                let t = {
                                    metainfo: {
                                        plots: TradeModules.customIndicator.helper.getPlots(Re),
                                        defaults: {
                                            styles: TradeModules.customIndicator.helper.getDefaultStyle(Re),
                                            precision: 2,
                                            inputs: {}
                                        },
                                        styles: TradeModules.customIndicator.helper.getStyle(Re),
                                        inputs: []
                                    },
                                    constructor: function() {
                                        this.init = function(t, r) {
                                            this._context = t, this._input = r;
                                            var a = e.Std.ticker(this._context);
                                            this._context.new_sym(a, e.Std.period(this._context))
                                        }, this.main = function(t, r) {
                                            try {
                                                this._context = t, this._input = r, this._context.select_sym(1);
                                                let a = e.Std.time(this._context);
                                                if (isNaN(a)) return [NaN];
                                                let i = TradeModules.common.getDateMonthYear(a),
                                                    s = e.Std.ticker(this._context),
                                                    o = TradeModules.storeData.indicator.symbolNameAndBar[s][i];
                                                o || (o = TradeModules.storeData.indicator.symbolNameAndBar[s].backupData);
                                                let n = o.high,
                                                    d = o.low,
                                                    l = o.close;
                                                return TradeModules.customIndicator.cpr.getCprGraphValues(n, d, l)
                                            } catch (e) {
                                                return console.log("Error in cpr module indicator : ", e), [NaN]
                                            }
                                        }
                                    }
                                };
                                return TradeModules.customIndicator.helper.setNameAndRequiredField("CPR with Pivot levels", t)
                            }
                        }, this.ohCL = new class {
                            constructor() {}
                            getIndicatorTemplates(e) {
                                let t = {
                                    metainfo: {
                                        plots: TradeModules.customIndicator.helper.getPlots(Le),
                                        defaults: {
                                            styles: TradeModules.customIndicator.helper.getDefaultStyle(Le),
                                            precision: 2,
                                            inputs: {}
                                        },
                                        styles: TradeModules.customIndicator.helper.getStyle(Le),
                                        inputs: []
                                    },
                                    constructor: function() {
                                        this.init = function(t, r) {
                                            this._context = t, this._input = r;
                                            var a = e.Std.ticker(this._context);
                                            this._context.new_sym(a, e.Std.period(this._context))
                                        }, this.main = function(t, r) {
                                            try {
                                                this._context = t, this._input = r, this._context.select_sym(1);
                                                let a = e.Std.time(this._context);
                                                if (isNaN(a)) return [NaN];
                                                let i = TradeModules.common.getDateMonthYear(a),
                                                    s = e.Std.ticker(this._context),
                                                    o = TradeModules.storeData.indicator.symbolNameAndBar[s][i];
                                                o || (o = TradeModules.storeData.indicator.symbolNameAndBar[s].backupData);
                                                let n = o.high,
                                                    d = o.low;
                                                return [n, o.close, o.open, d]
                                            } catch (e) {
                                                return console.log("Error ohcl module indicator: ", e), [NaN]
                                            }
                                        }
                                    }
                                };
                                return TradeModules.customIndicator.helper.setNameAndRequiredField("Previous day OHLC", t)
                            }
                        }, this.boring = new class {
                            constructor() {}
                            isBarColor(e, t, r, a, i) {
                                let s;
                                return s = 100 * Math.abs(e - a) / Math.abs(t - r) <= i, s
                            }
                            getIndicatorTemplates(e) {
                                let t = {
                                    metainfo: {
                                        defaults: {
                                            palettes: {
                                                palette_0: {
                                                    colors: [{
                                                        color: "#0000FF"
                                                    }]
                                                }
                                            },
                                            inputs: {
                                                "Candle Range <=": 50
                                            }
                                        },
                                        inputs: [{
                                            id: "Candle Range <=",
                                            name: "Candle Range <=",
                                            type: "integer",
                                            isHidden: !1,
                                            defval: 50,
                                            max: 95,
                                            min: 5
                                        }],
                                        plots: [{
                                            id: "plot_0",
                                            type: "bar_colorer",
                                            palette: "palette_0"
                                        }],
                                        palettes: {
                                            palette_0: {
                                                colors: [{
                                                    name: "Color 0"
                                                }],
                                                valToIndex: {
                                                    100: 0
                                                }
                                            }
                                        }
                                    },
                                    constructor: function() {
                                        this.main = function(t, r) {
                                            this._context = t, this._input = r;
                                            let a = r(0);
                                            var i = e.Std.close(this._context),
                                                s = e.Std.open(this._context),
                                                o = e.Std.high(this._context),
                                                n = e.Std.low(this._context);
                                            return TradeModules.customIndicator.boring.isBarColor(s, o, n, i, a) ? [100] : [NaN]
                                        }
                                    }
                                };
                                return TradeModules.customIndicator.helper.setNameAndRequiredField("Boring candle", t)
                            }
                        }, this.anchor = new class {
                            constructor() {
                                this.closeVolumeSigma = 0, this.volumeSigma = 0, this.isCompute = !1, this.currentSymbol = "", this.currentInput = "", this.currentResolution = "", this.candleSnapshot = {
                                    barTime: "",
                                    VWAP: "",
                                    volume: ""
                                }
                            }
                            isWeekend(e) {
                                const t = new Date(`${e.Year}-${e.Month}-${e.Day}`);
                                return 6 === t.getDay() ? e.Day = e.Day + 2 : 0 === t.getDay() && (e.Day = e.Day + 1), e
                            }
                            isInputAndBarTimeMatch(e, t) {
                                TradeModules.customIndicator.anchor.isWeekend(e), this.isCompute || JSON.stringify(e) == JSON.stringify(t) && (this.isCompute = !0)
                            }
                            resetIfNewCall(e, t, r) {
                                this.currentSymbol && e != this.currentSymbol && this.resetDefault(), t = JSON.stringify(t), this.currentInput && this.currentInput != t && this.resetDefault(), this.currentResolution && this.currentResolution != r && this.resetDefault(), this.currentResolution = r, this.currentInput = t, this.currentSymbol = e
                            }
                            resetDefault() {
                                this.closeVolumeSigma = 0, this.volumeSigma = 0, this.isCompute = !1, this.candleSnapshot = {
                                    barTime: "",
                                    VWAP: "",
                                    volume: ""
                                }
                            }
                            calculateAnchor(e, t, r) {
                                return this.isRepeatCandle(r) && (this.closeVolumeSigma = this.closeVolumeSigma - this.candleSnapshot.VWAP * this.candleSnapshot.volume, this.volumeSigma = this.volumeSigma - this.candleSnapshot.volume), this.candleSnapshot = {
                                    VWAP: e,
                                    volume: t,
                                    barTime: r
                                }, this.calculateGraphValue(e, t)
                            }
                            isRepeatCandle(e) {
                                return this.candleSnapshot.barTime === e
                            }
                            getVwapFactoryValue(e, t, r) {
                                let a = r(6);
                                return a || (a = "close"), e.Std[a](t)
                            }
                            calculateGraphValue(e, t) {
                                let r = e * t + this.closeVolumeSigma;
                                this.closeVolumeSigma = r;
                                let a = t + this.volumeSigma;
                                return this.volumeSigma = a, r / a
                            }
                            getIndicatorTemplates(e) {
                                const t = this;
                                let r = {
                                    metainfo: {
                                        plots: TradeModules.customIndicator.helper.getPlots(De),
                                        defaults: {
                                            styles: TradeModules.customIndicator.helper.getDefaultStyle(De),
                                            precision: 2,
                                            inputs: {
                                                Year: (new Date).getFullYear(),
                                                Day: (new Date).getDate(),
                                                Month: (new Date).getMonth() + 1,
                                                Hour: 9,
                                                Minute: 15,
                                                Second: 0,
                                                VWAP: "close"
                                            }
                                        },
                                        styles: TradeModules.customIndicator.helper.getStyle(De),
                                        inputs: TradeModules.customIndicator.helper.userInputOptions()
                                    },
                                    constructor: function() {
                                        this.init = function(t, r) {
                                            this._context = t, this._input = r, TradeModules.customIndicator.anchor.resetDefault();
                                            var a = e.Std.ticker(this._context);
                                            this._context.new_sym(a, e.Std.period(this._context))
                                        }, this.main = function(r, a) {
                                            try {
                                                this._context = r, this._input = a, this._context.select_sym(1);
                                                let o = e.Std.ticker(this._context),
                                                    n = e.Std.period(this._context),
                                                    d = e.Std.time(this._context);
                                                if (isNaN(d)) return TradeModules.customIndicator.anchor.resetDefault(), [NaN];
                                                let l = TradeModules.customIndicator.helper.getInputData(a);
                                                if (d < TradeModules.common.getUnixTimeStamp(l)) return TradeModules.customIndicator.anchor.resetDefault(), [NaN];
                                                let c = TradeModules.common.getDateObject(d);
                                                TradeModules.customIndicator.anchor.resetIfNewCall(o, l, n), TradeModules.customIndicator.anchor.isInputAndBarTimeMatch(l, c);
                                                var i = TradeModules.customIndicator.anchor.getVwapFactoryValue(e, this._context, a),
                                                    s = e.Std.volume(this._context);
                                                return t.isCompute ? TradeModules.customIndicator.anchor.calculateAnchor(i, s, d) : (TradeModules.customIndicator.anchor.resetDefault(), [NaN])
                                            } catch (e) {
                                                return console.log("Error in Anchor module indicator : ", e), [NaN]
                                            }
                                        }
                                    }
                                };
                                return TradeModules.customIndicator.helper.setNameAndRequiredField("Anchored VWAP (Custom)", r)
                            }
                        }, this.oi = new class {
                            constructor() {
                                this.symbolInst
                            }
                            isFutOpt(t) {
                                const r = e.checkIfOISymbol(t) ? e.getSymbolNameFromOiSymbol(t) : t,
                                    a = datafeed.unzippedData.data[r] ? datafeed.unzippedData.data[r][9] : this.symbolInst;
                                return [11, 12, 13, 14, 15, 16, 17, 18, 19, 25, 30, 31, 32, 33, 34, 35, 36, 37].includes(a)
                            }
                            getIndicatorTemplates(e) {
                                let t = {
                                    metainfo: {
                                        plots: TradeModules.customIndicator.helper.getPlots(We),
                                        defaults: {
                                            styles: TradeModules.customIndicator.helper.getDefaultStyle(We),
                                            precision: 1,
                                            inputs: {
                                                length: 20,
                                                ma: "SMA"
                                            }
                                        },
                                        styles: {
                                            plot_0: {
                                                title: "OI Line",
                                                histogramBase: 0
                                            },
                                            OI_MA: {
                                                title: "OI MA",
                                                histogramBase: 0
                                            }
                                        },
                                        inputs: [{
                                            id: "length",
                                            name: "MA Length",
                                            type: "integer",
                                            isHidden: !1,
                                            defval: 20,
                                            min: 1,
                                            max: 200
                                        }, {
                                            id: "ma",
                                            name: "MA Type",
                                            type: "text",
                                            defval: "SMA",
                                            options: ["SMA", "EMA"],
                                            optionsTitles: {
                                                SMA: "SMA",
                                                EMA: "EMA"
                                            }
                                        }],
                                        canExtendTimeScale: !0
                                    },
                                    constructor: function() {
                                        this.init = function(t, r) {
                                            this._context = t, this._input = r;
                                            var a = e.Std.ticker(this._context);
                                            this._context.new_sym(a + "#OI", e.Std.period(this._context))
                                        }, this.main = function(t, r) {
                                            try {
                                                this._context = t, this._input = r, this._context.select_sym(1);
                                                const i = e.Std.ticker(this._context),
                                                    s = e.Std.time(this._context),
                                                    o = e.Std.close(this._context);
                                                if ((!o || isNaN(o)) && 0 !== o) return [NaN];
                                                if (isNaN(s)) return [NaN];
                                                if (!TradeModules.customIndicator.oi.isFutOpt(i)) return [NaN];
                                                const n = r(0),
                                                    d = r(1);
                                                var a = this._context.new_var(e.Std.close(this._context));
                                                return [o, "SMA" === d ? e.Std.sma(a, n, this._context) : e.Std.ema(a, n, this._context)]
                                            } catch (e) {
                                                return console.log("Error oi module indicator: ", e), [NaN]
                                            }
                                        }
                                    }
                                };
                                return TradeModules.customIndicator.helper.setNameAndRequiredField("Open Interest (Custom)", t)
                            }
                        }, this.helper = new class {
                            constructor() {}
                            getDefaultStyle(e) {
                                let t = {
                                        linestyle: 0,
                                        visible: !0,
                                        linewidth: 2,
                                        plottype: "6",
                                        trackPrice: !1
                                    },
                                    r = {};
                                for (var a in e) t.color = e[a], r[a] = JSON.parse(JSON.stringify(t));
                                return r
                            }
                            getStyle(e) {
                                let t = {
                                        histogramBase: 1
                                    },
                                    r = {};
                                for (var a in e) t.title = a, r[a] = JSON.parse(JSON.stringify(t));
                                return r
                            }
                            getPlots(e) {
                                let t = [];
                                for (var r in e) {
                                    let e = {
                                        id: "",
                                        type: "line"
                                    };
                                    e.id = r, t.push(JSON.parse(JSON.stringify(e)))
                                }
                                return t
                            }
                            setNameAndRequiredField(e, t) {
                                return t.name = e + "@tv-basicstudies-1", this.appendInMetaInfo(e, t.metainfo), t
                            }
                            appendInMetaInfo(e, t) {
                                const r = "Open Interest (Custom)" === e;
                                t._metainfoVersion = 51, t.id = e, t.description = e, t.shortDescription = e, t.is_hidden_study = !1, t.is_price_study = !r, t.isCustomIndicator = !0, t.format = {
                                    type: "price",
                                    precision: r ? 1 : 2
                                }
                            }
                            userInputOptions() {
                                let e = {
                                    yearDefault: (new Date).getFullYear(),
                                    monthDefault: (new Date).getMonth() + 1,
                                    dayDefault: (new Date).getDate(),
                                    hourDefault: 9,
                                    minuteDefault: 15,
                                    secondDefault: 0,
                                    close: "close"
                                };
                                return [{
                                    id: "Year",
                                    name: "Year",
                                    type: "integer",
                                    isHidden: !1,
                                    defval: e.yearDefault,
                                    max: 9999,
                                    min: 1e3
                                }, {
                                    id: "Month",
                                    name: "Month",
                                    type: "integer",
                                    isHidden: !1,
                                    defval: e.monthDefault,
                                    max: 12,
                                    min: 1
                                }, {
                                    id: "Day",
                                    name: "Day",
                                    type: "integer",
                                    isHidden: !1,
                                    defval: e.dayDefault,
                                    max: 31,
                                    min: 1
                                }, {
                                    id: "Hour",
                                    name: "Hour",
                                    type: "integer",
                                    isHidden: !1,
                                    defval: e.hourDefault,
                                    max: 24,
                                    min: 1
                                }, {
                                    id: "Minute",
                                    name: "Minute",
                                    type: "integer",
                                    isHidden: !1,
                                    defval: e.minuteDefault,
                                    max: 60,
                                    min: 0
                                }, {
                                    id: "Second",
                                    name: "Second",
                                    type: "integer",
                                    isHidden: !1,
                                    defval: e.secondDefault,
                                    max: 60,
                                    min: 0
                                }, {
                                    id: "VWAP",
                                    name: "VWAP",
                                    type: "text",
                                    isHidden: !1,
                                    options: ["close", "open", "high", "low", "hl2", "hlc3", "ohlc4"],
                                    defval: e.close
                                }]
                            }
                            getInputData(e) {
                                let t = {};
                                return t.Year = e(0), t.Month = e(1), t.Day = e(2), t.Hour = e(3), t.Minute = e(4), t.Second = e(5), t
                            }
                        }
                    }
                    convertBarsToObject(e) {
                        let t = {};
                        try {
                            for (let r = 1; r < e.length; r++) {
                                const a = e[r],
                                    i = e[r - 1],
                                    s = TradeModules.common.getDateMonthYear(a.time),
                                    {
                                        open: o,
                                        high: n,
                                        low: d,
                                        close: l
                                    } = i || {};
                                t[s] = {
                                    open: o,
                                    high: n,
                                    low: d,
                                    close: l
                                }
                            }
                            const r = e[e.length - 1];
                            t.backupData = {
                                open: r ? .open,
                                high: r ? .high,
                                low: r ? .low,
                                close: r ? .close
                            }
                        } catch (e) {
                            console.log("Error in convertBarsToObject : ", e)
                        }
                        return t
                    }
                    getIndicatorValues(e) {
                        return new Promise(((t, r) => {
                            let a = TradeModules.storeData.indicator.symbolNameAndBar;
                            if (a.hasOwnProperty(e.ticker)) return void t();
                            a[e.ticker] = null;
                            let i = Math.round((new Date).getTime() / 1e3);
                            FyTrade.getHistoryBars(e, "1D", {
                                from: 0,
                                to: i
                            }, 1).then((r => {
                                t(), a[e.ticker] = this.convertBarsToObject(r.bars), TradeModules.store.dispatch(TradeModules.actions.setSymbolNameAndBar(a))
                            })).catch((function(e) {
                                console.log("getIndicatorValues : failed to load all bars", e), t()
                            }))
                        }))
                    }
                    getIndicatorTemplates(e) {
                        let t = [];
                        return t.push(TradeModules.customIndicator.cpr.getIndicatorTemplates(e)), t.push(TradeModules.customIndicator.ohCL.getIndicatorTemplates(e)), t.push(TradeModules.customIndicator.boring.getIndicatorTemplates(e)), t.push(TradeModules.customIndicator.anchor.getIndicatorTemplates(e)), t.push(TradeModules.customIndicator.oi.getIndicatorTemplates(e)), Promise.resolve(t)
                    }
                }, this.validateUser(), window.datafeed = this.datafeed = new Datafeeds.UDFCompatibleDatafeed(Be.DATAFEED_URL), window.tradingContext = this.tradingContext = null, window.basketorderFlag = this.basketorderFlag = !1, window.orderWindow = this.orderwindow = new OrderWindow, window.displayTradingPopup = !1, this.feedValue = null, this.fund_feedValue = null, this.msi_feedValue = null, window.theme = "LIGHT", this.TRADE_USER_SETTING_API = Be.USER_SETTINGS, this.decodedFuncNameInQueryParam = null, this.decodedSymbolNameInQueryParam = null, this.initExitOptionsModule(), this.initBasketWindowModule(), this.loadSymbolFromFiles(), this.riskDisclosure = new class {
                    constructor() {
                        this.isDisclosureOpen = $("#riskDisclosurePopup").length, this.cookieData = this.getDisclosureCookie(), this.isAcknowledgedInSameDay = "1" === this.cookieData
                    }
                    displayRiskDisclosure() {
                        this.isDisclosureOpen || this.isAcknowledgedInSameDay || (this.createRiskDisclosure(), this.attachRDEvents(), this.disablePointerEvents())
                    }
                    disablePointerEvents() {
                        $("#tv_chart_container").css("pointer-events", "none"), $("#bubbleView").css("pointer-events", "none")
                    }
                    enablePointerEvents() {
                        $("#tv_chart_container").css("pointer-events", "auto"), $("#bubbleView").css("pointer-events", "auto")
                    }
                    attachRDEvents() {
                        $("#confirmRiskDisclosure").unbind().click((() => {
                            $("#riskDisclosurePopup").addClass("d-none"), $("#riskDisclosurePopup").remove(), e.setCookie("riskDisclosureStatus", "1", Be.RISK_DISCLOSURE_EXPIRY), this.enablePointerEvents()
                        }))
                    }
                    getDisclosureHTML() {
                        return '\n      <div id="riskDisclosurePopup" class="risk-disclosure-container">\n        <div class="sebiIconContainer">\n          <span class="sebiIconImage"/>\n        </div>\n        <span class="riskDisclosureHeading">\n          Risk Disclosures on Derivatives\n        </span>\n        <div class="sebiInstructionsContainer">\n            <ul class="sebiInstructionsList">\n              <li>9 out of 10 individual traders in Equity, Futures & Options segment incurred net losses.</li>\n              <li>On an average, loss makers registered net trading loss close to  <span class="disclosure-rupee-text">₹</span> 50,000.</li>\n              <li>Over and above the net trading losses incurred, loss makers expended an additional 28% of net trading losses at transaction costs.</li>\n              <li>Those making net trading profits, incurred between 15% to 50% of such profits as transaction cost.</li>\n            </ul>\n        </div>\n        <div class="sebiInformationWrapper">\n          <div class="sebiInformationContainer">\n            <span class="sebiInformationLabel">\n              For more information:\n            </span>\n            <a href="https://www.sebi.gov.in/reports-and-statistics/research/jan-2023/study-analysis-of-profit-and-loss-of-individual-traders-dealing-in-equity-fando-segment_67525.html" target="_blank">\n              SEBI study dated January 25, 2023, on “Analysis of Profit and Loss of Individual Traders dealing in equity Futures and Options (F&O) Segment”, wherein Aggregate Level findings are based on annual Profit/Loss incurred by individual traders in equity F&O during FY 2021-22. \n            </a>\n          </div>\n        </div>\n        <div class="riskDisclosureConfirmContainer">\n            <button id="confirmRiskDisclosure" class="riskDisclosureConfirmButton">\n              I understand\n            </button>\n        </div>\n      </div>\n    '
                    }
                    createRiskDisclosure() {
                        const e = this.getDisclosureHTML();
                        $(document.body).append(e), orderWindow.theme.applyTheme()
                    }
                    getDisclosureCookie() {
                        const e = document.cookie.split("; ");
                        for (let t = 0; t < e.length; t++) {
                            const r = e[t].split("="),
                                a = r[0],
                                i = r[1];
                            if ("riskDisclosureStatus" === a) return i
                        }
                        return ""
                    }
                }, this.getQuickTradeUserSettings(), window.currentChartId = 0, this.ow_warningPopup = new class {
                    constructor() {
                        this.modal = new ze, this.events = new Ge, this.helper = new Ue
                    }
                }, window.addEventListener("message", (e => {
                    "functionCall" === e.data.type && "handleSymbolClick" === e.data.function && this.handleSymbolClick(e.data.data.symbol)
                }))
            }
            loadSymbolFromFiles() {
                FyTrade.symbolDataFromURL(), this.datafeed.get_mcx_lotsize_data(), this.datafeed.get_ncom_lotsize_data()
            }
            initiateTradingViewConfig() {
                window.datafeed = this.datafeed, FyersCommonModule.helper.checkIfClientEnabledForDrawingOptimisation() && Be.ENABLED_FEATURES.push("saveload_separate_drawings_storage");
                let t = e.getCookieData("_FYERS"),
                    r = t ? e.parseJWT(t).fy_id : "",
                    a = window.tvWidget = new TradingView.widget({ ...Be.TRADINGVIEW_CONFIG,
                        theme: window.theme,
                        snapshot_url: `https://trade.fyers.in/v1/snapshot?userId=${r}`,
                        datafeed: this.datafeed,
                        broker_factory: function(e) {
                            try {
                                let t = new Brokers(e, window.datafeed);
                                return window.broker = t, t
                            } catch (e) {
                                console.log(e)
                            }
                        },
                        user_id: t,
                        disabled_features: Be.DISABLED_FEATURES,
                        enabled_features: Be.ENABLED_FEATURES,
                        save_load_adapter: !!Be.ENABLED_FEATURES.includes("saveload_separate_drawings_storage") && FyersCommonModule.saveChart,
                        time_frames: Be.TIME_FRAME,
                        charts_storage_url: Be.SAVE_CHART,
                        auto_save_delay: 5,
                        client_id: "trading_platform",
                        durations: Be.DURATION_LIST,
                        custom_indicators_getter: this.customIndicator.getIndicatorTemplates,
                        broker_config: {
                            configFlags: Be.TRADINGVIEW_CONFIG.broker_flags,
                            durations: Be.TRADING_VIEW_DURATIONS,
                            customUI: {
                                showOrderDialog: function(t, r) {
                                    e.customOrderDialog(t, r)
                                },
                                showPositionDialog: function(t, r, a) {
                                    e.customPositionDialog(t, r, a)
                                },
                                showCancelOrderDialog: function(e) {
                                    Z.customCancelOrder(e)
                                },
                                showClosePositionDialog: function(e) {
                                    Z.closePositionDialogue(e)
                                }
                            }
                        },
                        context_menu: {
                            items_processor: function(t, r, a) {
                                if ("CrosshairMenuView" === a.menuName) {
                                    const e = r.createAction({
                                        actionId: "fy-alerts-create-chart-btn",
                                        icon: '<svg class="fy-alert-from-chart-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n                                    <path d="M8.66698 5.6665V9.41649H5.66699" stroke="var(--icon-stroke-color)" stroke-width="0.95" stroke-linecap="round" stroke-linejoin="round"/>\n                                    <path d="M15.417 9.41648C15.417 5.68857 12.3949 2.6665 8.66697 2.6665C4.93906 2.6665 1.91699 5.68857 1.91699 9.41648C1.91699 13.1444 4.93906 16.1665 8.66697 16.1665C9.05027 16.1665 9.42611 16.1345 9.79197 16.0731" stroke="var(--icon-stroke-color)" stroke-width="0.95" stroke-linecap="round"/>\n                                    <path d="M12.2695 1.1665C13.8622 1.86296 15.2144 3.00709 16.1669 4.4398M5.06442 1.1665C3.47176 1.86296 2.11959 3.00709 1.16699 4.4398" stroke="var(--icon-stroke-color)" stroke-width="0.95" stroke-linecap="round"/>\n                                    <path d="M1.91699 16.1665L3.59902 13.9165" stroke="var(--icon-stroke-color)" stroke-width="0.95" stroke-linecap="round" stroke-linejoin="round"/>\n                                    <path d="M13.917 11.6665V16.1665" stroke="var(--icon-stroke-color)" stroke-width="0.95" stroke-linecap="round" stroke-linejoin="round"/>\n                                    <path d="M16.167 13.9165L11.667 13.9165" stroke="var(--icon-stroke-color)" stroke-width="0.95" stroke-linecap="round" stroke-linejoin="round"/>\n                                </svg>',
                                        label: `Create alert for ${P.getState().alertFromChart.plusClickedPrice}`,
                                        onExecute: function() {
                                            Ae.createAlert(tvWidget.activeChart().symbol())
                                        }
                                    });
                                    t.unshift(e)
                                } else if ("ChartContextMenu" === a.menuName) {
                                    const a = t.findIndex((e => "Chart.AddSymbolToWatchList" === e._options ? .actionId));
                                    if (-1 !== a && t[a]._options) {
                                        const e = t[a]._options,
                                            r = tvWidget.activeChart().symbol(),
                                            i = datafeed.unzippedData.data[r] ? .[24];
                                        t[a]._options = { ...e,
                                            label: "Add " + i + " to watchlist"
                                        }
                                    }[{
                                        actionId: "create-alert",
                                        label: "Create Alert",
                                        onExecute: () => {
                                            e.redirectToExternalUrl("https://alerts.fyers.in/dashboard", 2, !1, "symbol")
                                        }
                                    }, {
                                        actionId: "highs-lows",
                                        label: "Highs & Lows",
                                        onExecute: () => {
                                            window.loadHighsAndLows()
                                        }
                                    }, {
                                        actionId: "option-chain",
                                        label: "Option Chain",
                                        onExecute: () => {
                                            optionChain.modal.appendOptionChainModalToUI()
                                        }
                                    }, {
                                        actionId: "symbol-details",
                                        label: "Symbol Details",
                                        onExecute: () => {
                                            e.redirectToExternalUrl(`${Be.FYERS_APP_URL}/symbol`, 1)
                                        }
                                    }, {
                                        actionId: "options-desk",
                                        label: "Options Desk",
                                        onExecute: () => {
                                            e.redirectToExternalUrl("https://fyers.gocharting.com")
                                        }
                                    }, {
                                        actionId: "futures-chain",
                                        label: "Futures Chain",
                                        onExecute: () => {
                                            window.loadFuturesChain()
                                        }
                                    }, {
                                        actionId: "corporate-actions",
                                        label: "Corporate Actions",
                                        onExecute: () => {
                                            window.loadCorporateActions()
                                        }
                                    }, {
                                        actionId: "time-sales",
                                        label: "Time & Sales",
                                        onExecute: () => {
                                            window.loadTimenSales()
                                        }
                                    }, {
                                        actionId: "market-depth",
                                        label: "Market Depth",
                                        onExecute: () => {
                                            window.loadMarketDepth()
                                        }
                                    }, {
                                        actionId: "insights",
                                        label: "Insights",
                                        onExecute: () => {
                                            let t = FyTrade.helper.getSymbolMasterValue(datafeed.unzippedData ? .data ? .[tvWidget.activeChart().symbol()], "short_sym_name");
                                            e.redirectToExternalUrl("https://insights.fyers.in/fundamentals", 2, t, "company")
                                        }
                                    }, {
                                        actionId: "research-report",
                                        label: "Research Report",
                                        onExecute: () => {
                                            let t = FyTrade.helper.getSymbolMasterValue(datafeed.unzippedData ? .data ? .[tvWidget.activeChart().symbol()], "short_sym_name");
                                            e.redirectToExternalUrl("https://marketsmith.fyers.in/evaluation/Evaluation.html", 2, t, "company")
                                        }
                                    }].forEach((e => {
                                        t.push(r.createAction(e))
                                    }))
                                }
                                return Promise.resolve(t)
                            }
                        }
                    });
                FyersCommonModule.helper.interceptDownloadAndCopySnapshot(), this.subscribeChartLoadedEvent(), this.widgetReadyEvents(a)
            }
            subscribeChartLoadedEvent() {
                this.chartParams = this.handleIncomingParams()
            }
            setupChartDataReady(e) {
                let t = this.chartParams;
                e.chart().dataReady((() => {
                    if (t && t.function && this.firstLoad && (this.processIncomingParams(), this.removeAllURLParams()), this.firstLoad) {
                        const e = document.getElementById("tv_chart_container") ? .firstElementChild;
                        if (e) {
                            const t = e.contentDocument;
                            t.addEventListener("keydown", (function(e) {
                                if (("Delete" === e.key || "Backspace" === e.key) && FyersCommonModule.saveChart) {
                                    FyersCommonModule.saveChart.isDeleteAction = !0;
                                    const e = tvWidget.activeChartIndex() + 1;
                                    FyersCommonModule.saveChart.deleteActionChartIds = FyersCommonModule.saveChart.deleteActionChartIds || new Set;
                                    const t = e - 1,
                                        r = tvWidget.chart(t).symbol() + "-" + e;
                                    FyersCommonModule.saveChart.deleteActionChartIds.add(r)
                                }
                            }), !0), FyersCommonModule.saveChart.handleDeleteButtonEvents(t), t.body.addEventListener("click", (e => {
                                e.target.closest('[data-name="save-load-menu"].button-merBkM5y.apply-common-tooltip.accessible-merBkM5y[data-tooltip="Manage layouts"]') && FyersCommonModule.saveChart.handleMakeACopyButton(t)
                            }))
                        }
                        this.firstLoad = !1
                    }
                })), FyersCommonModule ? .helper ? .checkIfClientIsEnabledForVolumeIndicator() && FyersCommonModule ? .customIndicator ? .initiateVolumeIndicator(), tvWidget.onShortcut("shift+t", (function() {
                    try {
                        const e = tvWidget.activeChart().symbol(),
                            t = datafeed.unzippedData.data[e] || null;
                        if (t) {
                            const r = t ? {
                                duration: void 0,
                                limitPrice: 0,
                                price: 0,
                                qty: t[1],
                                side: "BUY",
                                symbol: e,
                                type: 2,
                                productType: "MARGIN"
                            } : null;
                            broker.placeOrder(r, !1)
                        }
                    } catch (e) {
                        console.log("Error in placing order:", e)
                    }
                }))
            }
            handleTabChangeVisibility() {
                try {
                    let e = null;
                    const t = 1e3 * globalConstants ? .config ? .enabled_features ? .trader_tab_change_refresh_time || 6e4;

                    function r() {
                        "hidden" === document.visibilityState ? e = Date.now() : "visible" === document.visibilityState && e && (Date.now() - e >= t && (datafeed.resetCache(), tvWidget.activeChart().resetData(), tvWidget.save((e => {
                            tvWidget.load(e)
                        }))), e = null)
                    }
                    document.addEventListener("visibilitychange", r)
                } catch (a) {
                    console.log("Error in handleTabChangeVisibility", a), TradeModules.common.hawkeye("ERROR", `Error in handleTabChangeVisibility : ${a}`)
                }
            }
            getTradeUserSettings() {
                return new Promise(((t, r) => {
                    let a = {
                        type: "get",
                        url: `${this.TRADE_USER_SETTING_API}`,
                        headers: {
                            Authorization: auth_token
                        }
                    };
                    try {
                        $.ajax(a).done((r => {
                            r && r.data ? (e.setUserSettingsDataToLocalStorage(JSON.stringify(r.data)), window.theme = r.data.theme, t(r)) : console.log("fetching user settings failed!.")
                        })).fail((e => {
                            r(e)
                        }))
                    } catch (e) {
                        r(e)
                    }
                }))
            }
            async getQuickTradeUserSettings() {
                se.getQuickTradeUserSettings(), se.getQuickTradeBannerStatus()
            }
            verify_token() {
                return new Promise((function(t, r) {
                    var a = {
                        url: Be.VERIFY_TOKEN,
                        method: "GET",
                        timeout: 0,
                        headers: {
                            Authorization: {},
                            "X-Device-ID": getCookie(Be.DEVICE_ID_COOKIE_NAME) || "-"
                        }
                    };
                    a.headers.Authorization = token;
                    try {
                        $.ajax(a).done((function(r) {
                            if ("ok" === r.s) {
                                t();
                                let r = e.getCookieData("_FYERS"),
                                    a = r ? e.parseJWT(r).fy_id : "",
                                    i = r ? e.parseJWT(r).display_name : "";
                                TradeModules.common.createClevertapProfile(a, i), TradeModules.common.createGAProfile(a)
                            } else window.location = Be.LOGINURL_CB
                        })).fail((function() {
                            console.log("fail"), window.location = Be.LOGINURL_CB
                        }))
                    } catch (e) {
                        console.log("verify token failed!"), window.location = Be.LOGINURL_CB
                    }
                }))
            }
            widgetReadyEvents(t) {
                const r = this;
                t.headerReady().then((function() {
                    FyTrade.watchlist_load(!1, t), r.stopLoader(), r.addOnlineHandler(), r.addOflineHandler();
                    let a, i = e.getChartVersion();
                    0 === i ? a = [...Be.LEGACY_TOPBAR_BUTTONS, ...Be.COMMON_TOPBAR_BUTTONS] : 1 === i && (a = [...Be.ONEPOINTFIVE_TOPBAR_BUTTONS, ...Be.COMMON_TOPBAR_BUTTONS]), e.createCustomTopbarButton(t, ...Be.FYERS_WEB_ICON_OBJECT), e.createCustomTopbarButton(t, ...Be.FIA_TOPBAR_ICON_OBJECT);
                    for (let r = 0; r < a.length; r++) {
                        const s = a[r],
                            o = FyTrade.common.getMtfEnableFlag(),
                            n = globalConstants ? .config ? .enabled_features ? .smart_orders;
                        o && 1 === i && s[0].value === Be.ONE_POINT_FIVE_LABEL && (a[r] = Be.MTF_TOPBAR_ICON_OBJECT), !n && s[0].value === Be.SMART_ORDERBOOK_LABEL || !o && s[0].value === Be.ONE_POINT_FIVE_LABEL || e.createCustomTopbarButton(t, ...a[r])
                    }
                    e.createCommonTopbarButton(t, r), Qe.attachEventForQuickTradeToggle()
                })), t.onChartReady((function() {
                    r.setupChartDataReady(t), r.showBodBanner(), t.subscribe("onAutoSaveNeeded", r.triggerChartAutoSave), t.subscribe("onPlusClick", (e => {
                        P.dispatch(xe.plusClickedPrice(e))
                    })), t.activeChart().onIntervalChanged().subscribe(null, (e => {
                        ["5S", "10S", "15S", "45S", "30S"].includes(e)
                    })), t.subscribe("layout_changed", (() => {
                        const t = !!JSON.parse(e.getUserSettingsDataFromLocalStorage()).corporate_action;
                        FyTrade.common.checkCorpActionAndUpdate(t), Ae.handleLayoutChange()
                    })), t.subscribe("undo", (() => {
                        FyersCommonModule.saveChart && (FyersCommonModule.saveChart.isDeleteAction = !1, localStorage.removeItem("activeChartSerializableObject"))
                    })), t.subscribe("redo", (() => {})), t.subscribe("study", (e => {})), r.initAccountManageListener(), window.orderWindow.displayOrderWindow(), window.orderWindow.handler.triggerOrderWindowHide();
                    var a = document.getElementById("d-fyers-widgets");
                    serverDict.hasOwnProperty("current_theme.name") ? "light" == serverDict["current_theme.name"] ? (localStorage.setItem("fyerstrade_themeStyle", "light"), a.classList.contains("d-dark") && a.classList.remove("d-dark")) : (localStorage.setItem("fyerstrade_themeStyle", serverDict["current_theme.name"]), a.classList.contains("d-dark") || a.classList.add("d-dark")) : (localStorage.setItem("fyerstrade_themeStyle", "light"), a.classList.contains("d-dark") && a.classList.remove("d-dark")), serverDict.hasOwnProperty("BarsMarksContainer.visibile") && 0 == JSON.parse(serverDict["BarsMarksContainer.visibile"]) && t.activeChart().executeActionById("hideAllMarks");
                    const i = !!JSON.parse(e.getUserSettingsDataFromLocalStorage()).corporate_action;
                    FyTrade.common.checkCorpActionAndUpdate(i), FyTrade.broker.funds.getData(), r.riskDisclosure.displayRiskDisclosure(), r.processIncomingParams(), Qe.subscribeToChartChange(), Fe.subscribeToSymbolChange(), broker && broker._host.domPanelVisibility()._value && TradeModules.common.handleUserSettingsDomUpdate(JSON.parse(e.getUserSettingsDataFromLocalStorage())), TradeModules.common.attachDOMButtonListener(), globalConstants ? .config ? .enabled_features ? .trader_tab_change_refresh_enabled && r.handleTabChangeVisibility()
                }))
            }
            triggerChartAutoSave() {
                try {
                    "1" === JSON.parse(e.getUserSettingsDataFromLocalStorage()).chartAutoSave && tvWidget.saveChartToServer((() => {}), (() => {}), {
                        defaultChartName: "Autosaved Chart"
                    })
                } catch (e) {
                    console.log("triggerChartAutoSave : error : " + e), TradeModules.common.hawkeye("ERROR", "triggerChartAutoSave")
                }
            }
            addOnlineHandler() {
                try {
                    window.addEventListener("online", (() => {
                        window.displayTradingPopup || (window.displayTradingPopup = !0, logoutStatus(3), FyTrade.data.FYERS_OBJ ? .isConnected() && (FyTrade.data.FYERS_OBJ ? .close(), TradeModules.common.hawkeye("ERROR", "Network Disruption case , Mocking OnClose")), TradeModules.common.hawkeye("DEBUG", "Online Event Triggered"))
                    }))
                } catch (e) {
                    console.log("Error in addOnlineHandler:", e), TradeModules.common.hawkeye("ERROR", `Error in addOnlineHandler : ${e}`)
                }
            }
            addOflineHandler() {
                window.addEventListener("offline", (() => {
                    FyTrade.common.fy_showToaster("warning", "Network Disconnected", "Please check your internet connection")
                }))
            }
            recallSymbol() {
                var e = tvWidget.activeChart().symbol();
                this.getDatafeedValue(e)
            }
            getDatafeedValue(e) {
                this.feedValue = datafeed.unzippedData.data[e][11], this.fund_feedValue = datafeed.unzippedData.data[e][11], this.msi_feedValue = datafeed.unzippedData.data[e][11]
            }
            stopLoader() {
                fyersLoader.stopLoader({
                    parentElementID: "tv_chart_container",
                    fadeoutDelay: 0
                })
            }
            async showBodBanner() {
                try {
                    const t = globalConstants.bodProcess.bod_start_time,
                        r = globalConstants.bodProcess.bod_end_time,
                        a = globalConstants.bodProcess.no_bod,
                        i = globalConstants.bodProcess.show_bod_alert;
                    if (!i) return;
                    let s = [];
                    for (let t = 0; t < a.length; t++) {
                        let r = e.mapWeekDay(a[t].toLowerCase());
                        s.push(r)
                    }
                    const o = t.split(":")[0],
                        n = t.split(":")[1],
                        d = r.split(":")[0],
                        l = r.split(":")[1],
                        c = e.getIndianDateTime(),
                        p = e.getEpochTimeStamp(c),
                        m = e.createDateFromCustomFormat(c),
                        u = m.getDay(),
                        g = e.createDateFromCustomFormat(c, o, n),
                        h = e.createDateFromCustomFormat(c, d, l);
                    let y = (Number(o) - 1 || 4).toString();
                    const S = e.createDateFromCustomFormat(c, y, "00"),
                        v = await e.getPublicHolidayForBodBanner(p);
                    let b = [];
                    v.map((t => {
                        let r = e.getIndianDateTime(t.timestamp).split(",")[0];
                        b.push(r)
                    })), -1 !== s.findIndex((e => e === u)) && (i = !1), -1 !== b.findIndex((e => e === c.split(",")[0])) && (i = !1), e.showBodBannerHelper(i, m, g, h, S)
                } catch (e) {
                    console.log(`Error during BOD banner : ${e}`), TradeModules.common.hawkeye("ERROR", "Error during BOD banner")
                }
            }
            extractUserInfoFromToken(e) {
                var t = e.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"),
                    r = decodeURIComponent(atob(t).split("").map((function(e) {
                        return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
                    })).join(""));
                return JSON.parse(r)
            }
            handleClientMigration() {
                window.location.href.includes(Be.WEBLEGACY_URL) && (window.location.href = Be.WEBONEPOINTFIVE_URL)
            }
            marketStatusFlag() {
                try {
                    const e = Be.MARKET_STATUS_FLAG_FEATURE,
                        t = Be.DISABLED_FEATURES.indexOf(e),
                        r = globalConstants ? .config ? .enabled_features ? .charts_market_status_key;
                    r && -1 !== t ? Be.DISABLED_FEATURES.splice(t, 1) : r || -1 !== t ? r && -1 === t || (r || -1 === t) && console.log(`Unhandled MarketStatus case :-> MarketStatus : ${r} , FeatureIndexInArray : ${t}`) : Be.DISABLED_FEATURES.push(e)
                } catch (e) {
                    console.log(`Error in MarketStatusFlag ${e}`), TradeModules.common.hawkeye("ERROR", "Error in MarketStatusFlag")
                }
            }
            handleMtfEnableDisableInDom() {
                try {
                    globalConstants ? .config.enabled_features ? .is_mtf_enabled && Be.TRADING_VIEW_DURATIONS.push(Be.TRADING_VIEW_DURATIONS_MTF)
                } catch (e) {
                    console.log(e)
                }
            }
            validateUser() {
                let e = this;
                this.verify_token().then((() => {
                    try {
                        const t = window.getUserSettings(),
                            r = e.getTradeUserSettings();
                        Promise.all([t, r]).then((t => {
                            let r;
                            e.handleClientMigration();
                            let a = t[1];
                            r = orderWindow.orderNotification.isUserNotificationEnabled(a), e.marketStatusFlag(), e.handleMtfEnableDisableInDom(), e.initiateTradingViewConfig(r)
                        })).catch((t => {
                            e.initiateTradingViewConfig(!0)
                        }))
                    } catch (t) {
                        e.initiateTradingViewConfig(!0)
                    }
                }));
                try {
                    globalConstants ? .config ? .enabled_features ? .is_kra_status_enabled && FyTrade.helper.KRAStatusBannerTrigger()
                } catch (e) {
                    console.log("Error while fetching KRA status"), TradeModules.common.hawkeye("ERROR", "Error while fetching KRA status")
                }
            }
            handleIncomingParams() {
                let e = window.location.search,
                    t = new URLSearchParams(e),
                    r = t.get("funcName"),
                    a = t.get("symbolName");
                return this.decodedFuncNameInQueryParam = decodeURIComponent(r), this.decodedSymbolNameInQueryParam = decodeURIComponent(a), {
                    symbol: this.decodedSymbolNameInQueryParam,
                    function: this.decodedFuncNameInQueryParam
                }
            }
            getResolution() {
                return tvWidget.activeChart().resolution()
            }
            processIncomingParams() {
                let t = this.handleIncomingParams();
                switch (t.function) {
                    case "marketDepth":
                        tvWidget.setSymbol(t.symbol, this.getResolution()), window.loadMarketDepth(t.symbol);
                        break;
                    case "ocChain":
                        tvWidget.setSymbol(t.symbol, this.getResolution()), optionChain.modal.appendOptionChainModalToUI(t.symbol);
                        break;
                    case "openChart":
                        tvWidget.setSymbol(t.symbol, this.getResolution());
                        break;
                    case "addToBasket":
                        tvWidget.setSymbol(t.symbol, this.getResolution()), e.helperIncomingParams(1, t.symbol, t.function);
                        break;
                    case "addSymbolInWatchList":
                        tvWidget.setSymbol(t.symbol, this.getResolution()), e.helperIncomingParamsAddWatchlist(t.symbol);
                        break;
                    case "orderWindowBuy":
                        tvWidget.setSymbol(t.symbol, this.getResolution()), e.helperIncomingParams(1, t.symbol);
                        break;
                    case "orderWindowSell":
                        tvWidget.setSymbol(t.symbol, this.getResolution()), e.helperIncomingParams(-1, t.symbol);
                        break;
                    case "baskets":
                        TradeModules.basketWindow.openBasketWindow();
                        break;
                    case "exitPositions":
                        TradeModules.exitPositionWindow.openExitPositionWindow();
                        break;
                    case "authHoldings":
                        FyTrade.displayEdisWindow()
                }
            }
            removeAllURLParams() {
                try {
                    const e = new URL(window.location.href);
                    e.search = "", e.pathname.endsWith("/") && (e.pathname = e.pathname.slice(0, -1)), window.history.replaceState({}, document.title, e.toString())
                } catch (e) {
                    console.warn("Unable to remove URL params", e), TradeModules.common.hawkeye("ERROR", "Unable to remove URL params")
                }
            }
            initExitOptionsModule() {
                window.addEventListener("load", (() => {
                    TradeModules.exitPositionWindow.addExitPositionWindowWrapper()
                }))
            }
            initBasketWindowModule() {
                window.addEventListener("load", (() => {
                    TradeModules.basketWindow.addBasketWindowWrapper()
                }))
            }
            createClickEvent(e, t, r) {
                let a = e.getElementById(t);
                a && a.addEventListener("click", (() => {}))
            }
            initAccountManageListener() {
                var e = document.getElementsByTagName("iframe")[0].contentDocument;
                this.createClickEvent(e, "positions", "positions"), this.createClickEvent(e, "orders", "orders"), this.createClickEvent(e, "orderstatus-all", "all"), this.createClickEvent(e, "orderstatus-inactive", "inactive"), this.createClickEvent(e, "orderstatus-filled", "filled"), this.createClickEvent(e, "orderstatus-cancelled", "cancelled"), this.createClickEvent(e, "orderstatus-rejected", "rejected")
            }
            handleSymbolClick(e) {
                tvWidget.activeChart().setSymbol(e)
            }
            checkFeatureFlag(e, t) {
                const r = e ? .feature_set;
                if (!r) return !1;
                try {
                    const e = Ye().decompressFromBase64(r);
                    if (!e) return console.error("Failed to decompress feature flags"), !1;
                    const a = e.split(",");
                    return !!JSON.parse(a).includes(t)
                } catch (e) {
                    return console.error("Error processing feature flags:", e), !1
                }
            }
        }
        const Ke = class {
            static setSymbolNameAndBar = e => ({
                type: i,
                payload: e
            })
        };
        class Ze {
            constructor() {
                this.positionsList = [], this.exitAllData = {}, this.selectedTab = 0, this.isPositionsRefreshRequired = !0
            }
            renderExitAllSection() {
                const e = TradeModules.exitPositionWindow.modal.getExitAllSectionHTML();
                let t = FyTrade.common.getMtfFlag() && FyTrade.common.getConfigFlag("is_mtf_enabled");
                $("#ewExitBody").html(e), TradeModules.exitPositionWindow.events.attachExitAllPageEventListeners(), TradeModules.exitPositionWindow.handler.handlePrefillExitAllCheckBoxes(), t ? $("#mtf-exit-window").css("display", "flex") : $("#mtf-exit-window").css("display", "none")
            }
            renderExitPositionsPage() {
                const e = FyTrade.broker.positions._positions1.filter((e => 0 !== e.qty));
                if (e && e.length) {
                    if (this.isPositionsRefreshRequired) {
                        const t = e.reduce(((e, t) => (t.isSelected = !1, -1 === t.side ? e.unshift(t) : e.push(t), e)), []);
                        this.positionsList = t, this.isPositionsRefreshRequired = !1
                    }
                    this.renderExitPositionTable()
                } else this.renderEmptyPositionsPage()
            }
            renderExitPositionTable() {
                const e = TradeModules.exitPositionWindow.modal.frameExitPositionTable().toString().replaceAll(",", "");
                $("#ewExitBody").html(e), TradeModules.exitPositionWindow.events.attachExitByPositionsEventListeners(), TradeModules.exitPositionWindow.handler.checkUncheckSelectAllPositions()
            }
            renderEmptyPositionsPage() {
                const e = TradeModules.exitPositionWindow.modal.getEmptyPositionsHTML();
                $("#ewExitBody").html(e), TradeModules.exitPositionWindow.handler.hideExitFooter()
            }
            getExitPositionDataFromCookies() {
                const t = e.getUserSettingsDataFromLocalStorage();
                try {
                    const e = JSON.parse(t).exit_positions;
                    $.isEmptyObject(e) ? console.warn("Failed in getExitPositionDataFromCookies: No data in cookie") : this.exitAllData = e
                } catch (e) {
                    console.warn(`Failed in getExitPositionDataFromCookies: ${e}`)
                }
            }
            async handleConfirmExitByPositions() {
                const e = {
                    id: this.positionsList.filter((e => !0 === e.isSelected)).map((e => e.id))
                };
                try {
                    const t = await TradeModules.exitPositionWindow.service.exitPositions(e);
                    "ok" === t.s ? TradeModules.exitPositionWindow.handler.handleExitToaster(t) : TradeModules.basketWindow.helper.destructureApiErrorAndShowToaster(t)
                } catch (e) {
                    FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.error, "Error", "Failed to exit positions. Please try again")
                } finally {
                    this.isPositionsRefreshRequired = !0, TradeModules.exitPositionWindow.handler.closeExitWindow()
                }
            }
            async handleConfirmExitByType() {
                const e = {
                    exit_all: 0,
                    side: this.exitAllData.side.filter((e => 0 !== e)),
                    segment: this.exitAllData.segment.filter((e => 0 !== e)),
                    productType: this.exitAllData.productType.filter((e => "ALL" !== e))
                };
                try {
                    const t = await TradeModules.exitPositionWindow.service.exitPositions(e);
                    "ok" === t.s ? TradeModules.exitPositionWindow.handler.handleExitToaster(t) : TradeModules.basketWindow.helper.destructureApiErrorAndShowToaster(t)
                } catch (e) {
                    FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.error, "Error", "Failed to exit positions. Please try again")
                } finally {
                    this.isPositionsRefreshRequired = !0, TradeModules.exitPositionWindow.handler.closeExitWindow()
                }
            }
            realTimeExitPositionsUpdate(t) {
                if (t) {
                    const r = `.ew-pl-${t.pos_id.replace(/:/g,"")}`;
                    if ($(r) && $(r).length) {
                        const a = TradeModules.basketWindow.helper.roundOffTo2DecimalPlaces(t.pl),
                            i = TradeModules.basketWindow.helper.roundOffTo2DecimalPlaces(t.chg),
                            s = e.getProfitOrLossClass(a);
                        $(r).html(`<div class="${s}">${a}(${i}%)</div>`)
                    }
                }
            }
        }
        class Xe {
            constructor() {}
            addExitPositionWrapper() {
                const e = TradeModules.exitPositionWindow.modal.getWrapperHTML();
                $(document.body).append(e), TradeModules.exitPositionWindow.events.allowEwDrag()
            }
            openExitPositionWindow() {
                $(".ew-topmost-wrapper").addClass("ew-open"), $("#ewcanFooter").removeClass("ew-footer-visible");
                const e = TradeModules.exitPositionWindow.modal.getBodyHTML();
                document.querySelector("#ewModalBody").innerHTML = e, $.isEmptyObject(TradeModules.exitPositionWindow.controller.exitAllData) && TradeModules.exitPositionWindow.controller.getExitPositionDataFromCookies(), TradeModules.exitPositionWindow.controller.renderExitAllSection(), orderWindow.theme.applyTheme(), TradeModules.exitPositionWindow.events.attachCommonEventListeners(), TradeModules.exitPositionWindow.controller.selectedTab = 0, TradeModules.exitPositionWindow.handler.handleConfirmExitButtonState()
            }
            displayExitFooter() {
                $("#ewcanFooter").removeClass("ew-footer-visible");
                const e = $("#ewFooter");
                e.hasClass("ew-footer-visible") || e.addClass("ew-footer-visible")
            }
            getCancelFooterHTML() {
                $("#ewFooter").removeClass("ew-footer-visible");
                const e = $("#ewcanFooter");
                e.hasClass("ew-footer-visible") || e.addClass("ew-footer-visible")
            }
            hideExitFooter() {
                $("#ewcanFooter").removeClass("ew-footer-visible"), $("#ewFooter").removeClass("ew-footer-visible")
            }
            closeExitWindow() {
                $(".ew-topmost-wrapper").removeClass("ew-open")
            }
            toggleActive(e, t) {
                e.hasClass("ew-toggle-active") || (e.addClass("ew-toggle-active"), t())
            }
            selectExitAllToggle() {
                TradeModules.exitPositionWindow.controller.selectedTab = 0, $("#ewSelectPositionToggle").removeClass("ew-toggle-active"), $("#ewCancelPositionToggle").removeClass("ew-toggle-active"), $("#ewcanFooter").removeClass("ew-footer-visible"), TradeModules.exitPositionWindow.handler.displayExitFooter(), TradeModules.exitPositionWindow.handler.toggleActive($(this), (function() {
                    TradeModules.exitPositionWindow.controller.renderExitAllSection()
                })), TradeModules.exitPositionWindow.handler.handleConfirmExitButtonState()
            }
            selectSelectPositionToggle() {
                TradeModules.exitPositionWindow.controller.selectedTab = 1, $("#ewExitAllToggle").removeClass("ew-toggle-active"), $("#ewCancelPositionToggle").removeClass("ew-toggle-active"), TradeModules.exitPositionWindow.handler.displayExitFooter(), TradeModules.exitPositionWindow.handler.toggleActive($(this), (function() {
                    TradeModules.exitPositionWindow.controller.renderExitPositionsPage()
                })), TradeModules.exitPositionWindow.handler.checkUncheckSelectAllPositions()
            }
            handlePrefillExitAllCheckBoxes() {
                const e = TradeModules.exitPositionWindow.controller.exitAllData;

                function t(e, t) {
                    $(`${e} .fy-custom-checkbox`).each((function() {
                        const e = $(this).data("value");
                        t.includes(e) ? $(this).prop("checked", !0) : $(this).prop("checked", !1)
                    }))
                }
                $.isEmptyObject(e) || (t("#ewExitAllProductsContainer", e.productType), t("#ewExitAllSideContainer", e.side), t("#ewExitAllSegmentsContainer", e.segment))
            }
            handleSelectAllCheck(e) {
                $(e).prop("checked", $(this).prop("checked"))
            }
            handleSelectAllOnOptionsClick(e, t, r, a) {
                const i = TradeModules.exitPositionWindow.controller.exitAllData;
                if ($(`${e}:checked`).length === $(e).length) $(t).prop("checked", !0), i[r].includes(a) || TradeModules.exitPositionWindow.controller.exitAllData[r].push(a);
                else {
                    $(t).prop("checked", !1);
                    const e = i[r].filter((e => e !== a));
                    TradeModules.exitPositionWindow.controller.exitAllData[r] = e
                }
                TradeModules.exitPositionWindow.handler.handleConfirmExitButtonState()
            }
            handleSelectSide() {
                TradeModules.exitPositionWindow.handler.handleSelectAllOnOptionsClick.call(this, ".ew-select-side-option", ".ew-select-all-side", "side", 0), TradeModules.exitPositionWindow.handler.handleUpdateExitData.call(this, "side")
            }
            handleSelectSegment() {
                TradeModules.exitPositionWindow.handler.handleSelectAllOnOptionsClick.call(this, ".ew-select-segment-option", ".ew-select-all-segment", "segment", 0), TradeModules.exitPositionWindow.handler.handleUpdateExitData.call(this, "segment")
            }
            handleSelectProduct() {
                TradeModules.exitPositionWindow.handler.handleSelectAllOnOptionsClick.call(this, ".ew-select-product-option", ".ew-select-all-product", "productType", "ALL"), TradeModules.exitPositionWindow.handler.handleUpdateExitData.call(this, "productType")
            }
            handleSelectAllSide() {
                TradeModules.exitPositionWindow.handler.handleSelectAllCheck.call(this, ".ew-select-side-option");
                const e = $(this).prop("checked");
                TradeModules.exitPositionWindow.controller.exitAllData.side = e ? [0, 1, -1] : [], TradeModules.exitPositionWindow.handler.handleConfirmExitButtonState()
            }
            handleSelectAllSegment() {
                TradeModules.exitPositionWindow.handler.handleSelectAllCheck.call(this, ".ew-select-segment-option");
                const e = $(this).prop("checked");
                TradeModules.exitPositionWindow.controller.exitAllData.segment = e ? [0, 10, 11, 12, 20] : [], TradeModules.exitPositionWindow.handler.handleConfirmExitButtonState()
            }
            handleSelectAllProduct() {
                TradeModules.exitPositionWindow.handler.handleSelectAllCheck.call(this, ".ew-select-product-option");
                const e = $(this).prop("checked");
                TradeModules.exitPositionWindow.controller.exitAllData.productType = e ? ["ALL", "INTRADAY", "MARGIN", "CO", "BO", "CNC"] : [], TradeModules.exitPositionWindow.handler.handleConfirmExitButtonState()
            }
            handleUpdateExitData(e) {
                const t = TradeModules.exitPositionWindow.controller.exitAllData[e],
                    r = $(this).data("value"),
                    a = $(this).prop("checked"),
                    i = t.includes(r);
                if (a && !i) TradeModules.exitPositionWindow.controller.exitAllData[e].push(r);
                else {
                    const a = t.filter((e => e !== r));
                    TradeModules.exitPositionWindow.controller.exitAllData[e] = a
                }
            }
            confirmExitPositions() {
                $("#ewConfirmExit").prop("disabled", !0), 1 === TradeModules.exitPositionWindow.controller.selectedTab ? TradeModules.exitPositionWindow.controller.handleConfirmExitByPositions() : TradeModules.exitPositionWindow.controller.handleConfirmExitByType()
            }
            confirmCancelOrder() {
                const e = [];
                $(".ew-select-all-cancel-scripts:checked").each((function() {
                    e.push($(this).val())
                }));
                const t = $("#selectAllCancel").is(":checked");
                TradeModules.exitPositionWindow.CancelOrderService.deleteAllOrders(e, t)
            }
            handleSelectAllScripts() {
                TradeModules.exitPositionWindow.handler.handleSelectAllCheck.call(this, ".ew-select-pos-script");
                const e = $(this).prop("checked");
                TradeModules.exitPositionWindow.handler.selectUnselectAllItems(e)
            }
            selectUnselectAllItems(e) {
                for (let t = 0; t < TradeModules.exitPositionWindow.controller.positionsList.length; t++) TradeModules.exitPositionWindow.controller.positionsList[t].isSelected = e;
                TradeModules.exitPositionWindow.handler.handleConfirmExitButtonState()
            }
            checkUncheckSelectAllPositions() {
                $(".ew-select-pos-script:checked").length === $(".ew-select-pos-script").length ? $(".ew-select-all-pos-scripts").prop("checked", !0) : $(".ew-select-all-pos-scripts").prop("checked", !1), TradeModules.exitPositionWindow.handler.handleConfirmExitButtonState()
            }
            handleSelectScript() {
                const e = $(this).data("exit-item-index"),
                    t = TradeModules.exitPositionWindow.controller.positionsList.findIndex((t => t.id == e)),
                    r = $(this).prop("checked");
                TradeModules.exitPositionWindow.controller.positionsList[t].isSelected = !!r, TradeModules.exitPositionWindow.handler.checkUncheckSelectAllPositions()
            }
            handleExitToaster(e) {
                200 == e.code && e.message ? FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.success, FyTrade.DEFINES.toaster.exitPositions.title.success, e.message) : 201 == e.code && e.message && FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.info, FyTrade.DEFINES.toaster.exitPositions.title.success, e.message)
            }
            handleConfirmExitButtonState() {
                const e = TradeModules.exitPositionWindow.controller.positionsList.filter((e => !0 === e.isSelected));
                if (1 === TradeModules.exitPositionWindow.controller.selectedTab) e && ($("#ewConfirmExit").text(`Exit ${e.length} position${1===e.length?"":"s"}`), 0 === e.length ? $("#ewConfirmExit").prop("disabled", !0) : $("#ewConfirmExit").prop("disabled", !1));
                else {
                    $("#ewConfirmExit").text("Exit positions");
                    const e = $("#ewExitAllSideContainer .fy-custom-checkbox"),
                        t = $("#ewExitAllSegmentsContainer .fy-custom-checkbox"),
                        r = $("#ewExitAllProductsContainer .fy-custom-checkbox"),
                        a = e.is(":checked"),
                        i = t.is(":checked"),
                        s = r.is(":checked");
                    a && i && s ? $("#ewConfirmExit").prop("disabled", !1) : $("#ewConfirmExit").prop("disabled", !0)
                }
            }
            handleExitPositionWindowDrag() {
                const e = document.querySelectorAll(".ew-stock-drag-icon"),
                    t = document.querySelectorAll(".ew-details-table-row");
                let r;
                e.forEach(((e, r) => {
                    e.addEventListener("mouseenter", (() => {
                        t[r].setAttribute("draggable", !0), $("#ewContainer").draggable({
                            disabled: !0
                        })
                    })), e.addEventListener("mouseleave", (() => {
                        t[r].setAttribute("draggable", !1), TradeModules.exitPositionWindow.events.allowEwDrag()
                    }))
                })), t.forEach(((e, a) => {
                    e.addEventListener("dragstart", (() => {
                        e.classList.add("e-dragging")
                    })), e.addEventListener("dragend", (function() {
                        e.classList.remove("e-dragging"), async function(e) {
                            const a = t[e].dataset.exitItemIndex,
                                i = r.dataset.exitItemIndex;
                            let s = TradeModules.exitPositionWindow.controller.positionsList;
                            if (a == i) {
                                const e = s.splice(a, 1);
                                s.push(e[0])
                            } else {
                                const e = s.splice(a, 1);
                                s.splice(i, 0, e[0])
                            }
                            TradeModules.exitPositionWindow.controller.positionsList = s, TradeModules.exitPositionWindow.controller.renderExitPositionTable()
                        }(a)
                    }))
                }));
                const a = document.querySelector(".ew-exit-tbody");
                a.addEventListener("dragover", (e => {
                    e.preventDefault();
                    const t = document.querySelector(".e-dragging"),
                        i = (s = a, o = e.clientY, [...s.querySelectorAll(".ew-details-table-row:not(.e-dragging)")].reduce(((e, t) => {
                            const r = t.getBoundingClientRect(),
                                a = o - r.top - r.height / 2;
                            return a < 0 && a > e.offset ? {
                                offset: a,
                                element: t
                            } : e
                        }), {
                            offset: Number.NEGATIVE_INFINITY
                        }).element);
                    var s, o;
                    null == i ? (a.appendChild(t), r = t) : (a.insertBefore(t, i), r = i)
                }))
            }
        }
        class et {
            constructor() {}
            allowEwDrag() {
                $("#ewContainer").draggable({
                    disabled: !1,
                    containment: "window",
                    scroll: !1,
                    drag: function(e, t) {
                        "none" !== $(".ew-topmost-wrapper").css("transform") && $(".ew-topmost-wrapper").css("transform", "none");
                        let r = t.position;
                        $.cookie("owPosL", r.left), $.cookie("owPosT", r.top)
                    }
                })
            }
            attachCommonEventListeners() {
                $("#ewExitAllToggle").unbind().click(TradeModules.exitPositionWindow.handler.selectExitAllToggle), $("#ewSelectPositionToggle").unbind().click(TradeModules.exitPositionWindow.handler.selectSelectPositionToggle), $("#ewCancelPositionToggle").unbind().click(TradeModules.exitPositionWindow.CancelOrderEventHandler.ewCancelPositionToggle), $("#closeExitWindow,#ewCancelExit").unbind().click(TradeModules.exitPositionWindow.handler.closeExitWindow), $("#ewConfirmExit").unbind().click(TradeModules.exitPositionWindow.handler.confirmExitPositions), $("#ewConfirmCancelOrder").unbind().click(TradeModules.exitPositionWindow.handler.confirmCancelOrder)
            }
            attachExitAllPageEventListeners() {
                $(".ew-select-all-side").unbind().on("change", TradeModules.exitPositionWindow.handler.handleSelectAllSide), $(".ew-select-side-option").unbind().on("change", TradeModules.exitPositionWindow.handler.handleSelectSide), $(".ew-select-all-segment").unbind().on("change", TradeModules.exitPositionWindow.handler.handleSelectAllSegment), $(".ew-select-segment-option").unbind().on("change", TradeModules.exitPositionWindow.handler.handleSelectSegment), $(".ew-select-all-product").unbind().on("change", TradeModules.exitPositionWindow.handler.handleSelectAllProduct), $(".ew-select-product-option").unbind().on("change", TradeModules.exitPositionWindow.handler.handleSelectProduct)
            }
            attachExitByPositionsEventListeners() {
                TradeModules.exitPositionWindow.handler.handleExitPositionWindowDrag(), $(".ew-select-all-pos-scripts").unbind().on("change", TradeModules.exitPositionWindow.handler.handleSelectAllScripts), $(".ew-select-pos-script").unbind().on("change", TradeModules.exitPositionWindow.handler.handleSelectScript)
            }
        }
        class tt {
            constructor() {}
            getWrapperHTML() {
                return `  <div id="ewContainer" class="ew-topmost-wrapper">\n                 <div class="modal-content ui-draggable ew-modal-content" style="position: relative;">\n                    ${this.getHeaderHTML()}\n                    <div id="ewModalBody" class="ew-modal-body">\n                    </div>\n                    ${this.getFooterHTML()}\n                    ${TradeModules.exitPositionWindow.cancelOrderModal.getCancelFooterHTML()}\n                </div>\n              </div>\n    `
            }
            getHeaderHTML() {
                return '\n      <div id="ewModalHeader" class="modal-header ui-draggable-handle ew-modal-header">\n        <div class="ew-header-heading-container">\n          <span class="bw-header-heading-text">\n          Manage positions and orders\n          </span>\n          <div id="closeExitWindow" class="ew-modal-close-icon-container" title="Close exit position window">\n            <img src="https://assets.fyers.in/global-components/trade-icons/basket/bw-close-icon.svg" height="24" width="24" />\n          </div>\n        </div>\n      </div>\n      '
            }
            getFooterHTML() {
                return '\n      <div id="ewFooter" class="ew-footer-container ew-footer-visible">\n        <button id="ewConfirmExit" class="fy-primary-button">Exit positions</button>\n        <button id="ewCancelExit" class="fy-secondary-button">Cancel</button>\n      </div>\n    '
            }
            getBodyHTML() {
                return '\n    <div>\n      <div class="ew-toggle-wrapper">\n        <div class="ew-toggle-container">\n          <span id="ewExitAllToggle" class="ew-toggle-item ew-toggle-active" title="Exit all positions">\n            Exit all positions \n          </span>\n          <span id="ewSelectPositionToggle" class="ew-toggle-item" title="Select postions to exit">\n            Select positions\n          </span>\n          <span id="ewCancelPositionToggle" class="ew-toggle-item" title=" Let\'s you cancel all/partial open orders of your account">\n            Cancel orders\n          </span>\n        </div>\n      </div>\n      <div class="ew-exit-body" id="ewExitBody">\n      </div>\n    </div>\n    '
            }
            getExitAllSectionHTML() {
                return '\n      <div class="ew-exit-all-wrapper">\n        <div class="ew-exit-all-container">\n          <span class="ew-exit-all-primary-text">\n            Side\n          </span>\n          <div id="ewExitAllSideContainer" class="ew-exit-all-options-container">\n            <div class="ew-exit-all-checkbox-container">\n              <span class="ew-exit-all-secondary-text">All</span>\n              <div class="ew-exit-all-checkbox-input-container">\n                <input type="checkbox" class="fy-custom-checkbox ew-select-all-side" data-value="0">\n                <span class="fy-custom-checkbox-checkmark"></span>    \n              </div>\n            </div>\n            <div class="ew-exit-all-checkbox-container">\n              <span class="ew-exit-all-secondary-text">Long</span>\n              <div class="ew-exit-all-checkbox-input-container">\n                <input type="checkbox" class="fy-custom-checkbox ew-select-side-option" data-value="1">\n                <span class="fy-custom-checkbox-checkmark"></span>    \n              </div>\n            </div>\n            <div class="ew-exit-all-checkbox-container">\n              <span class="ew-exit-all-secondary-text">Short</span>\n              <div class="ew-exit-all-checkbox-input-container">\n                <input type="checkbox" class="fy-custom-checkbox ew-select-side-option" data-value="-1">\n                <span class="fy-custom-checkbox-checkmark"></span>    \n              </div>\n            </div>\n          </div>\n        </div>\n        <div class="ew-exit-all-container">\n          <span class="ew-exit-all-primary-text">\n            Segment\n          </span>\n          <div id="ewExitAllSegmentsContainer" class="ew-exit-all-options-container ew-exit-all-segments-container">\n            <div class="ew-exit-all-checkbox-container">\n              <span class="ew-exit-all-secondary-text">All</span>\n              <div class="ew-exit-all-checkbox-input-container">\n                <input type="checkbox" class="fy-custom-checkbox ew-select-all-segment" data-value="0">\n                <span class="fy-custom-checkbox-checkmark"></span>    \n              </div>\n            </div>\n            <div class="ew-exit-all-checkbox-container">\n              <span class="ew-exit-all-secondary-text">CM</span>\n              <div class="ew-exit-all-checkbox-input-container">\n                <input type="checkbox" class="fy-custom-checkbox ew-select-segment-option" data-value="10">\n                <span class="fy-custom-checkbox-checkmark"></span>    \n              </div>\n            </div>\n            <div class="ew-exit-all-checkbox-container">\n              <span class="ew-exit-all-secondary-text">FO</span>\n              <div class="ew-exit-all-checkbox-input-container">\n                <input type="checkbox" class="fy-custom-checkbox ew-select-segment-option" data-value="11">\n                <span class="fy-custom-checkbox-checkmark"></span>    \n              </div>\n            </div>\n            <div class="ew-exit-all-checkbox-container">\n              <span class="ew-exit-all-secondary-text">CD</span>\n              <div class="ew-exit-all-checkbox-input-container">\n                <input type="checkbox" class="fy-custom-checkbox ew-select-segment-option" data-value="12">\n                <span class="fy-custom-checkbox-checkmark"></span>    \n              </div>\n            </div>\n            <div class="ew-exit-all-checkbox-container">\n              <span class="ew-exit-all-secondary-text">COM</span>\n              <div class="ew-exit-all-checkbox-input-container">\n                <input type="checkbox" class="fy-custom-checkbox ew-select-segment-option" data-value="20">\n                <span class="fy-custom-checkbox-checkmark"></span>    \n              </div>\n            </div>\n          </div>\n        </div>\n        <div class="ew-exit-all-container">\n          <span class="ew-exit-all-primary-text">\n            Product Type\n          </span>\n          <div id="ewExitAllProductsContainer" class="ew-exit-all-options-container">\n            <div class="ew-exit-all-checkbox-container">\n              <span class="ew-exit-all-secondary-text">All</span>\n              <div class="ew-exit-all-checkbox-input-container">\n                <input type="checkbox" class="fy-custom-checkbox ew-select-all-product" data-value="ALL">\n                <span class="fy-custom-checkbox-checkmark"></span>    \n              </div>\n            </div>\n            <div class="ew-exit-all-checkbox-container">\n              <span class="ew-exit-all-secondary-text">Intraday</span>\n              <div class="ew-exit-all-checkbox-input-container">\n                <input type="checkbox" class="fy-custom-checkbox ew-select-product-option" data-value="INTRADAY">\n                <span class="fy-custom-checkbox-checkmark"></span>    \n              </div>\n            </div>\n            <div class="ew-exit-all-checkbox-container">\n              <span class="ew-exit-all-secondary-text">Margin</span>\n              <div class="ew-exit-all-checkbox-input-container">\n                <input type="checkbox" class="fy-custom-checkbox ew-select-product-option" data-value="MARGIN">\n                <span class="fy-custom-checkbox-checkmark"></span>    \n              </div>\n            </div>\n            <div class="ew-exit-all-checkbox-container">\n              <span class="ew-exit-all-secondary-text">CO</span>\n              <div class="ew-exit-all-checkbox-input-container">\n                <input type="checkbox" class="fy-custom-checkbox ew-select-product-option" data-value="CO">\n                <span class="fy-custom-checkbox-checkmark"></span>    \n              </div>\n            </div>\n            <div class="ew-exit-all-checkbox-container">\n              <span class="ew-exit-all-secondary-text">BO</span>\n              <div class="ew-exit-all-checkbox-input-container">\n                <input type="checkbox" class="fy-custom-checkbox ew-select-product-option" data-value="BO">\n                <span class="fy-custom-checkbox-checkmark"></span>    \n              </div>\n            </div>\n            <div class="ew-exit-all-checkbox-container">\n              <span class="ew-exit-all-secondary-text">CNC</span>\n              <div class="ew-exit-all-checkbox-input-container">\n                <input type="checkbox" class="fy-custom-checkbox ew-select-product-option" data-value="CNC">\n                <span class="fy-custom-checkbox-checkmark"></span>    \n              </div>\n            </div>\n            <div class="ew-exit-all-checkbox-container" id="mtf-exit-window">\n              <span class="ew-exit-all-secondary-text">MTF</span>\n              <div class="ew-exit-all-checkbox-input-container">\n                <input type="checkbox" class="fy-custom-checkbox ew-select-product-option" data-value="MTF">\n                <span class="fy-custom-checkbox-checkmark"></span>    \n              </div>\n            </div> \n          </div>\n        </div>\n      </div>\n    '
            }
            frameExitPositionTable() {
                return `\n      <div class="ew-table-wrapper">\n        <table class="ew-table">\n          <thead>\n            <tr>     \n              <th class="ew-table-drag-heading"></th>         \n              <th class="ew-table-symbol-heading">\n              <div class="ew-exit-positions-select-all-container">\n                <div class="ew-exit-positions-select-all">\n                  <input type="checkbox" class="fy-custom-checkbox ew-select-all-pos-scripts">\n                  <span class="fy-custom-checkbox-checkmark"></span>    \n                </div>\n                <span>Scrip</span>\n              <div>\n              </th>\n              <th class="ew-table-pl-heading">P&L(%)</th>\n              <th class="ew-table-price-heading">Avg price</th>\n              <th class="ew-table-net-product-heading text-left">Product</th>\n              <th class="ew-table-net-side-heading text-left">Side</th>\n              <th class="ew-table-net-qty-heading text-right">Net qty</th>\n            </tr>\n          </thead>\n          <tbody class="ew-exit-tbody">\n            ${TradeModules.exitPositionWindow.controller.positionsList.map(((t,r)=>{const a=t.id.replace(/:/g,"");return`\n                <tr class="ew-details-table-row"  data-exit-item-index="${r}">\n                  <td class="ew-table-drag-item">\n                  <span class="ew-stock-drag-icon"></span>\n                  </td>\n                  <td class="ew-table-symbol-item">\n                    <div class="ew-table-symbol-container">\n                      <div class="ew-exit-positions-select-script">\n                        <input type="checkbox" data-exit-item-index="${t.id}" class="fy-custom-checkbox ew-select-pos-script" ${t.isSelected?"checked":""} />\n                        <span class="fy-custom-checkbox-checkmark"></span>    \n                      </div>\n                      <span>${t.symbol}</span>\n                    </div>\n                  </td>\n                  <td class="ew-table-pl-item ew-pl-${a}">\n                    <div class="${e.getProfitOrLossClass(t.pl)}">                    \n                      ${TradeModules.basketWindow.helper.roundOffTo2DecimalPlaces(t.pl)}(${TradeModules.basketWindow.helper.roundOffTo2DecimalPlaces(t.chg)}%)\n                    </div>\n                  </td>\n                  <td class="ew-table-price-item text-right">\n                    ${TradeModules.basketWindow.helper.roundOffTo2DecimalPlaces(t.avgPrice)}\n                  </td>\n                  <td class="ew-table-net-product-item text-left">\n                    ${t.productType}\n                  </td>\n                  <td class="ew-table-net-side-item text-left">\n                    ${1===t.side?"<span class='fy-profit'>BUY</span>":"<span class='fy-loss'>SELL</span>"}\n                  </td>\n                  <td class="ew-table-net-qty-item text-right">\n                    ${t.netQty}\n                  </td>\n                </tr>\n              `}))}\n          </tbody>\n        </table>\n      </div>\n    `
            }
            getEmptyPositionsHTML() {
                return '\n      <div class="ew-empty-positions-wrapper">\n        <div class="ew-empty-img-container">\n          <img src="https://assets.fyers.in/global-components/trade-icons/exitPosition/ew-empty-positions.svg" height="125" alt="No positions"/>\n        </div>\n        <div class="ew-empty-positions-text-container">\n          <span class="ew-empty-primary-text">You don\'t have any positions</span>\n          <span  class="ew-empty-secondary-text">Looks like you don’t have any positions.</span>\n        </div>\n      </div>\n    '
            }
        }
        class rt {
            getCancelFooterHTML() {
                return '\n      <div id="ewcanFooter" class="ew-footer-container">\n        <button id="ewConfirmCancelOrder" class="fy-primary-button cancelOrderBtn ">Cancel orders</button>\n        <button id="ewCancelExit" class="fy-secondary-button">Cancel</button>\n      </div>\n    '
            }
            frameCancelOrderTable(e) {
                return `\n      <div class="ew-table-wrapper overflow-auto" >\n        <table class="ew-table w-auto overflow-auto cancel-order-table" id= "cancelordertbale" >\n          <thead class= "w-auto">\n            <tr>         \n              <th class="ew-table-symbol-heading cancelsymbol">\n                <div class="ew-exit-positions-select-all-container">\n                  <div class="ew-exit-positions-select-all">\n                    <input type="checkbox" class="fy-custom-checkbox" id="selectAllCancel" value="true">\n                    <span class="fy-custom-checkbox-checkmark"></span>    \n                  </div>\n                  <span>Symbol</span>\n                </div>\n              </th>\n              <th class="ew-table-pl-heading text-left">Buy/Sell</th>\n              <th class="ew-table-price-heading text-left">Type</th>\n              <th class="ew-table-net-product-heading text-left">Product Type</th>\n              <th class="ew-table-net-side-heading text-right">Qty</th>\n              <th class="ew-table-net-qty-heading text-right">Rem Qty</th>\n              <th class="ew-table-net-qty-heading text-right ">Limit Price</th>\n              <th class="ew-table-net-qty-heading text-right">Stop Price</th>\n            </tr>\n          </thead>\n          <tbody class="ew-exit-tbody cancelTbody">\n            ${e.map(((e,t)=>`\n      <tr class="ew-details-table-row w-auto cancelordertr" data-exit-item-index="${t}" id= "${e.oms_Id}">\n       \n        <td class="ew-table-symbol-item cancelsymbol">\n          <div class="ew-table-symbol-container">\n            <div class="ew-exit-positions-select-script">\n              <input type="checkbox" data-exit-item-index="${t}" value= "${e.oms_Id}"  class="fy-custom-checkbox ew-select-all-cancel-scripts " ${e.isSelected?"checked":""} />\n              <span class="fy-custom-checkbox-checkmark"></span>   \n            </div>\n            <span>${e.symbol}</span>\n          </div>\n        </td>\n        <td class="ew-table-pl-item ew-pl text-left w-auto">\n          <div class="">                    \n          ${1===e.side?"Buy":"Sell"}\n          </div>\n        </td>\n        <td class="ew-table-price-item text-left w-auto">\n        ${2===e.type?"Market":1===e.type?"Limit":3===e.type?"Stop Order":"Stop Limit"}\n        </td>\n        <td class="ew-table-net-product-item text-left w-auto">\n          ${e.productType}\n        </td>\n        <td class="ew-table-net-side-item text-right ">\n          ${e?.qty??0}\n        </td>\n        <td class="ew-table-net-qty-item text-right">\n          ${e?.remainingQuantity??0}\n        </td>\n        <td class="ew-table-net-qty-item text-right">\n        ${e?.limitPrice??0}\n      </td>\n      <td class="ew-table-net-qty-item text-right">\n      ${e?.stopPrice??0}\n    </td>\n \n \n\n      </tr>\n    `)).join("")}\n          </tbody>\n        </table>\n      </div>\n    `
            }
            getEmptyCancelOrderHTML() {
                return '\n      <div class="ew-empty-positions-wrapper">\n        <div class="ew-empty-img-container">\n          <img src="https://assets.fyers.in/global-components/trade-icons/exitPosition/ew-empty-positions.svg" height="125" alt="No positions"/>\n        </div>\n        <div class="ew-empty-positions-text-container">\n          <span class="ew-empty-primary-text">You don\'t have any open Orders</span>\n          <span  class="ew-empty-secondary-text">Looks like you don’t have any open orders.</span>\n        </div>\n      </div>\n    '
            }
        }
        const at = class {
            static SUCCESS = 1103;
            static POSITION_CODE = -51;
            static ALLOWED_PENDING_ORDER_STATUS = [6]
        };
        class it {
            async fetchOrdersAPi(e = !1) {
                try {
                    !e && await FyTrade.broker.ordersRefresh();
                    const t = e ? broker._orders : FyTrade.store.getState().broker.orderBookData;
                    0 === t.length ? TradeModules.exitPositionWindow.CancelOrderController.renderEmptyCancelOrderPage() : TradeModules.exitPositionWindow.CancelOrderController.cancelOrderFilter(t)
                } catch (e) {
                    console.error("Error fetching orders:", e)
                }
            }
            async deleteAllOrders(e, r) {
                try {
                    let a = {
                        cancel_all: r
                    };
                    r || (a.order_ids = e);
                    const i = await t.sendRequest(globalConstants.dynamicUrl.trading.orders_multi, "DELETE", a);
                    if (!i.ok) {
                        const e = await i.text();
                        throw new Error(`HTTP error! Status: ${i.status}, Response: ${e}`)
                    }
                    const s = i;
                    s ? .code === at.SUCCESS ? ((Array.isArray(s.data) ? s.data : []).some((e => e.code === at.POSITION_CODE)), TradeModules.exitPositionWindow.CancelOrderController.closePositionWindow()) : console.error("Error in response data:", s)
                } catch (e) {
                    console.error("Error deleting orders:", e)
                }
            }
        }
        class st {
            closePositionWindow() {
                TradeModules.exitPositionWindow.handler.closeExitWindow()
            }
            cancelOrderFilter(e) {
                let t = [];
                for (let r = 0; r < e.length; r++) at.ALLOWED_PENDING_ORDER_STATUS.includes(e[r].status) && ("CO" == e[r].productType || "BO" == e[r].productType || e[r].offlineOrder || t.push(e[r]));
                t.length > 0 ? (this.renderCancelOrderTable(t), $("#ewcanFooter").addClass("ew-footer-visible")) : this.renderEmptyCancelOrderPage()
            }
            renderErrorMessage(e) {
                $("#cancel-holder").html(`<div class="error-message">${e}</div>`)
            }
            removeTableList(e) {
                document.getElementById("cancel-holder") && (document.getElementById("cancelordertbale"), TradeModules.exitPositionWindow.CancelOrderService.fetchOrdersAPi(!0), 0 === tbody.querySelectorAll("tr").length && this.renderEmptyCancelOrderPage())
            }
            renderCancelOrderTable(e) {
                $("#cancel-holder").html(TradeModules.exitPositionWindow.cancelOrderModal.frameCancelOrderTable(e)), TradeModules.exitPositionWindow.CancelOrderEventHandler.checkUncheckAllCancelOrder()
            }
            renderEmptyCancelOrderPage() {
                const e = TradeModules.exitPositionWindow.cancelOrderModal.getEmptyCancelOrderHTML();
                $("#cancel-holder").html(e), TradeModules.exitPositionWindow.handler.hideExitFooter()
            }
        }
        class ot {
            constructor() {
                this.headers = {
                    Authorization: token,
                    "Content-Type": "application/json"
                }
            }
            async exitPositions(e) {
                const t = {
                        token_id
                    },
                    r = new URLSearchParams(t),
                    a = {
                        method: "DELETE",
                        headers: this.headers,
                        body: JSON.stringify(e)
                    },
                    i = `${globalConstants.dynamicUrl.trading.positions}?${r}`,
                    s = await fetch(i, a),
                    o = await s.text();
                return JSON.parse(o)
            }
        }
        const nt = class {
            static setCancelOrderData = e => ({
                type: m,
                payload: e
            })
        };
        class dt {
            ewCancelPositionToggle() {
                TradeModules.exitPositionWindow.controller.selectedTab = 2, $("#ewExitAllToggle").removeClass("ew-toggle-active"), $("#ewSelectPositionToggle").removeClass("ew-toggle-active"), $("#ewExitBody").html("<div id='cancel-holder'></div>"), TradeModules.exitPositionWindow.handler.getCancelFooterHTML(), TradeModules.exitPositionWindow.handler.toggleActive($(this), (function() {
                    TradeModules.exitPositionWindow.CancelOrderService.fetchOrdersAPi()
                })), TradeModules.exitPositionWindow.CancelOrderEventHandler.checkUncheckAllCancelOrder()
            }
            checkUncheckAllCancelOrder() {
                function e() {
                    const e = {};
                    $(".ew-select-all-cancel-scripts").each((function() {
                        e[$(this).val()] = $(this).prop("checked")
                    })), e.selectAllCancel = $("#selectAllCancel").prop("checked"), P.dispatch(nt.setCancelOrderData(e))
                }

                function t() {
                    const e = $(".ew-select-all-cancel-scripts:checked").length;
                    0 === e ? $(".cancelOrderBtn").html("Cancel Orders").prop("disabled", !0) : $(".cancelOrderBtn").html(`Cancel ${e} Orders`).prop("disabled", !1)
                }
                $(".ew-select-all-cancel-scripts").prop("checked", !1), $("#selectAllCancel").prop("checked", !1), $(".cancelOrderBtn").prop("disabled", !0),
                    function(e) {
                        let r = !0;
                        $(".ew-select-all-cancel-scripts").each((function() {
                            const t = e[$(this).val()] || !1;
                            $(this).prop("checked", t), t || (r = !1)
                        })), $("#selectAllCancel").prop("checked", r), t()
                    }(P.getState().cancelOrder.cancelOrderData), $("#selectAllCancel").click((function() {
                        const r = $(this).prop("checked");
                        $(".ew-select-all-cancel-scripts").prop("checked", r), t(), e()
                    })), $(".ew-select-all-cancel-scripts").click((function() {
                        const r = $(".ew-select-all-cancel-scripts:checked").length === $(".ew-select-all-cancel-scripts").length;
                        $("#selectAllCancel").prop("checked", r), t(), e()
                    })), t()
            }
        }
        const lt = class {
                constructor() {
                    this.events = new K, this.service = new N, this.smartOrderOpen = !1, this.smartOrderMenuOpen = !1, this.smartOrderBookOpen = !1, this.smartOrderPlacement = new ee, this.currentPage = 1, this.orderBookLoading = !1, this.paginationFlag = !1, this.filterOrdersFlag = !1, this.furtherPageEmpty = !1, this.currentTotalOrders = 0, this.totalOrders = 0, this.filterOrderBookParams = "", this.modiFyWarningAccepted = !1, this.sorting = {
                        sortingFlag: !1,
                        sortingParams: "",
                        symbolSorting: -1,
                        createdSorting: -1,
                        updatedSorting: -1,
                        symbolSortingFlag: !1,
                        createdSortingFlag: !1,
                        updatedSortingFlag: !1
                    }, this.toggleExchangeValue = !1
                }
            },
            ct = {
                fieldValueMap: {
                    gttSingleOrderQtyField: "qty",
                    gttOcoNormalQtyField: "qty",
                    gttSingleOrderPriceField: "leg2Price",
                    gttOcoNormalPriceField2: "leg2Price",
                    gttOcoAdvancedPriceField2: "leg2Price",
                    gttSingleOrderTriggerPriceField: "leg2TriggerPrice",
                    gttOcoNormalTriggerPriceField2: "leg2TriggerPrice",
                    gttOcoAdvancedTriggerPriceField2: "leg2TriggerPrice",
                    gttOcoNormalPriceField1: "leg1Price",
                    gttOcoAdvancedPriceField1: "leg1Price",
                    gttOcoNormalTriggerPriceField1: "leg1TriggerPrice",
                    gttOcoAdvancedTriggerPriceField1: "leg1TriggerPrice"
                },
                acknowledgementError: {
                    id: "gttTnc",
                    message: "I have read and agree to the <a class='fy-cusom-alert-message-wrapper-tnc-link' target='_blank' href='https://support.fyers.in/portal/en/kb/articles/what-are-the-terms-and-conditions-for-placing-a-gtt-order-with-fyers'>Terms & Conditions</a> (we don’t guarantee the trigger execution). The trigger will expire on <b id=\"gttOrderExpiryDate\"></b>.",
                    identifierClass: "gtt-order-acknowledgement-alert",
                    preceedingHtml: '<div class="fy-custom-alert-checkbox-container"><input id="gttOrderAcknowledgementCheck" type="checkbox" class="fy-custom-checkbox ew-select-all-side" data-value="0"><span class="fy-custom-checkbox-checkmark"></span></div>',
                    priority: 2
                },
                singleQuanitityError: {
                    id: "gttSingleQty",
                    message: "Quantity has to be more than 0",
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                },
                singlePriceError: {
                    id: "gttSinglePrice",
                    message: "Price has to be more than 0",
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                },
                singleTriggerPriceError: {
                    id: "gttSingleTriggerPrice",
                    message: "Trigger price has to be more than 0",
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                },
                ocoQuantityError: {
                    id: "gttOcoQuantity",
                    message: "Quantity has to be more than 0",
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                },
                ocoPrice1Error: e => ({
                    id: "gttOcoPrice1",
                    message: (e ? "Target" : "Stoploss") + " price has to be more than 0",
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                ocoPrice2Error: e => ({
                    id: "gttOcoPrice2",
                    message: (e ? "Stoploss" : "Target") + " price has to be more than 0",
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                ocoTriggerPrice1Error: e => ({
                    id: "gttOcoTriggerPrice1",
                    message: (e ? "Target" : "Stoploss") + " trigger price has to be more than 0",
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                ocoTriggerPrice2Error: e => ({
                    id: "gttOcoTriggerPrice2",
                    message: (e ? "Stoploss" : "Target") + " trigger price has to be more than 0",
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                ocoTriggerQty1Error: e => ({
                    id: "gttOcoQty1",
                    message: (e ? "Target" : "Stoploss") + " quantity has to be more than 0",
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                ocoTriggerQty2Error: e => ({
                    id: "gttOcoQty2",
                    message: (e ? "Stoploss" : "Target") + " quantity has to be more than 0",
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                ocoAdvancedPrice1Error: e => ({
                    id: "gttOcoAdvPrice1",
                    message: (e ? "Target" : "Stoploss") + " price has to be more than 0",
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                ocoAdvancedPrice2Error: e => ({
                    id: "gttOcoAdvPrice2",
                    message: (e ? "Stoploss" : "Target") + " price has to be more than 0",
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                ocoAdvancedTriggerPrice1Error: e => ({
                    id: "gttOcoAdvTriggerPrice1",
                    message: (e ? "Target" : "Stoploss") + " trigger price has to be more than 0",
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                ocoAdvancedTriggerPrice2Error: e => ({
                    id: "gttOcoAdvTriggerPrice2",
                    message: (e ? "Stoploss" : "Target") + " trigger price has to be more than 0",
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                leg1LTPCheck: e => ({
                    id: "leg1LTPCheck",
                    message: (e ? "Target" : "Stop loss") + " trigger price should be greater than LTP",
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                leg2LTPCheck: e => ({
                    id: "leg2LTPCheck",
                    message: (e ? "Stop loss trigger price cannot be greater than LTP" : "Target trigger price should be less than LTP") + " ",
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                gttSingleQtyLotSize: e => ({
                    id: "gttOcoQuantity",
                    message: `Quantity should be multiples of ${e}`,
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                gttSingleLimitTickSize: e => ({
                    id: "gttSingleLimitTickSize",
                    message: `Limit price should be multiples of ${e}`,
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                gttSingleTriggerTickSize: e => ({
                    id: "gttSingleTriggerTickSize",
                    message: `Trigger price should be multiples of ${e}`,
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                ocoQtyLotSize: e => ({
                    id: "ocoQtyLotSize",
                    message: `Quantity should be multiples of ${e}`,
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                ocoPrice1TickSize: (e, t) => ({
                    id: "ocoPrice1TickSize",
                    message: `${t?"Target":"Stoploss"} limit price should be multiples of ${e}`,
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                ocoPrice2TickSize: (e, t) => ({
                    id: "ocoPrice2TickSize",
                    message: `${t?"Stoploss":"Target"} limit price should be multiples of ${e}`,
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                ocoTriggerPrice1TickSize: (e, t) => ({
                    id: "ocoTriggerPrice1TickSize",
                    message: `${t?"Target":"Stoploss"} trigger price should be multiples of ${e}`,
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                ocoTriggerPrice2TickSize: (e, t) => ({
                    id: "ocoTriggerPrice2TickSize",
                    message: `${t?"Stoploss":"Target"} trigger price should be multiples of ${e}`,
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                advancedQty1LotSize: (e, t) => ({
                    id: "advancedQty1LotSize",
                    message: `${t?"Target":"Stoploss"} quantity should be multiples of ${e}`,
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                advancedQty2LotSize: (e, t) => ({
                    id: "advancedQty2LotSize",
                    message: `${t?"Stoploss":"Target"} quantity should be multiples of ${e}`,
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                advancedPrice1TickSize: (e, t) => ({
                    id: "advancedPrice1TickSize",
                    message: `${t?"Target":"Stoploss"} limit price should be multiples of ${e}`,
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                advancedPrice2TickSize: (e, t) => ({
                    id: "advancedPrice2TickSize",
                    message: `${t?"Stoploss":"Target"} limit price should be multiples of ${e}`,
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                advancedTriggerPrice1TickSize: (e, t) => ({
                    id: "advancedTriggerPrice1TickSize",
                    message: `${t?"Target":"Stoploss"} trigger price should be multiples of ${e}`,
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                advancedTriggerPrice2TickSize: (e, t) => ({
                    id: "advancedTriggerPrice2TickSize",
                    message: `${t?"Stoploss":"Target"} trigger price should be multiples of ${e}`,
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }),
                advancedSlTargetSame: {
                    id: "advancedSlTargetSame",
                    message: "Stoploss price and target price values cannot be equal to each other",
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                },
                ocoSlTargetSame: {
                    id: "ocoSlTargetSame",
                    message: "Stoploss price and target price values cannot be equal to each other",
                    identifierClass: "gtt-order-error-alert",
                    preceedingHtml: '<div class="orderWindowAlerts-info-img"><img id="image_url" src="https://trade.fyers.in/static/js/ordwin/assets/img/SF-Error.svg" alt="more-info"></div>',
                    priority: 1
                }
            };
        window.smartOrders = new lt, window.TradeModules = new class {
            constructor() {
                window.webChartFlag = !0, this.init = new Je, this.customIndicator = this.init.customIndicator, this.common = new Fe, this.actions = Ke, this.store = P, this.storeData = this.store.getState(), this.basketWindow = new class {
                    constructor() {
                        this.modal = new class {
                            getWrapperHTML() {
                                return `  <div id="bwContainer" class="bw-topmost-wrapper">\n                 <div class="modal-content ui-draggable bw-modal-content" style="position: relative;">\n                    <div id="bwModalHeader" class="modal-header ui-draggable-handle bw-modal-header">\n                    </div>\n                    <div id="bwModalBody" class="bw-modal-body">\n                    </div>\n                    ${this.getSearchPopupHTML()}\n                    ${this.getCreateBasketPopup()}\n                    ${this.getEditBasketPopup()}\n                </div>\n              </div>\n              `
                            }
                            getHeaderHTML() {
                                const e = TradeModules.basketWindow.controller.basketsList.length;
                                return `\n      <div>\n        <span class="bw-header-heading-text" id="bw-modal-header-title">\n          Baskets \n          <span class="bw-header-heading-basket-count">\n            ${e}\n          </span>\n        </span>\n      </div>\n      <div class="d-flex align-items-center">\n        ${e?'\n            <div class="bw-search-wrapper">\n              <input type="text" class="bw-search-input" id="bwListSearchInput" placeholder="Search Basket" autocomplete="off" maxlength="20">\n              <span class="bw-search-input-icon">\n                <img src="https://trade.fyers.in/static/js/basket-order/assets/images/icons/search-icon.svg"/>\n              </span>\n            </div>\n            <button id="bwCreateBasketBtn" class="bw-create-basket-btn" title="Create a new basket">\n              Create Basket\n            </button>':""}\n        <div id="bwModalCloseIconContainer" class="bw-modal-close-icon-container" title="Close basket order window">\n          <img src="https://assets.fyers.in/global-components/trade-icons/basket/bw-close-icon.svg" height="24"\n            width="24" />\n        </div>\n      </div>\n      `
                            }
                            getDetailsHeaderHTML(e) {
                                return `\n    <div class="bw-details-header-heading-topmost-wrapper">\n     <div class="bw-details-header-heading-wrapper">\n      <div id="bwHeadingGoBack" class="bw-details-header-heading-go-back-icon">\n        <img src="https://assets.fyers.in/global-components/trade-icons/basket/bw-go-back-icon.svg"/>\n      </div>\n      <div class="bw-details-header-sub-heading-wrapper">\n        <div class="bw-details-header-heading-text-wrapper">\n          <span class="bw-details-header-heading-text" id="bwDetailsHeaderBasketName">Basket</span>\n          <span id="bwEditBasketName" class="bw-details-header-heading-edit-icon" title="Rename basket">\n            <img src="https://assets.fyers.in/global-components/trade-icons/basket/bw-edit-basket-icon.svg"/>\n          </span>\n        </div>\n        <div class="d-flex">\n          <span id="bwDetailsCreationExecutionDate"></span>\n        </div>\n      </div>\n     </div>\n     <div class="bw-details-header-right-container">\n        ${e.items.length&&!e.items[0].order_data?.status?'<button\n              id="bwAddInstrument"\n              class="bw-details-header-add-instrument-btn"\n              title="Add instrument to basket"\n            >\n              <img\n                src="https://assets.fyers.in/global-components/trade-icons/basket/bw-add-instrument-icon.svg"\n                alt="Add instrument to basket"\n                height="16"\n                width="16"\n              />\n              <span>Add instrument</span>\n            </button>':""}\n        <div id="bwDetailsClose" class="bw-details-header-close-icon" title="Close basket order window">\n          <img src="https://assets.fyers.in/global-components/trade-icons/basket/bw-close-icon.svg" alt="Close basket window" height="24" width="24" />\n        </div>\n     </div>\n    </div>\n    `
                            }
                            getLoaderHTML() {
                                return '\n    <div class="bw-page-loader-wrapper">\n      <img src="https://assets.fyers.in/global-components/loader/fyers-loader-white.gif" height="90" width="90"/>\n    </div>\n    '
                            }
                            frameBasketListSection(e) {
                                return `\n      <div class="bw-basket-list-topmost">\n        <table id="bwTable" class="bw-table bw-basket-list-table">\n        <thead>\n            <tr>\n            <th class="bw-table-bname-heading d-flex">\n                <div class="bw-select-all-checkbox-wrapper" title="Select all baskets for multi-basket execution">\n                    <input id="bwSelectAllCheckbox" class="checkbox-custom" name="bwSelectAllCheckbox" type="checkbox" ${TradeModules.basketWindow.controller.basketsList.length?"":"disabled"}>\n                    <label for="bwSelectAllCheckbox" class="checkbox-custom-label"></label>\n                </div>\n                Basket\n            </th>\n            <th class="bw-table-instrument-heading">Instrument</th>\n            <th>Created</th>\n            <th>Last Executed</th>\n            <th></th>\n            </tr>\n        </thead>\n        <tbody id="bWbasketListTableBody">\n          ${e.length?this.frameBasketListTableRows(e):this.getEmptyBasketHTML("listing")}\n        </tbody>\n        </table>\n        <div id="bwExecuteMultiWrapper" class="bw-execute-multi-wrapper d-none">\n            <button id="bwExecuteMultiBasketsBtn" class="bw-execute-baskets-btn">Execute Baskets</button>\n            <button id="bwCancelMultiSelection" class="bw-cancel-execute-btn">Cancel</button>\n        </div>\n      </div>\n    `
                            }
                            getEmptyBasketHTML(e) {
                                let t = "",
                                    r = "",
                                    a = "",
                                    i = "",
                                    s = "";
                                return "listing" === e ? (t = "https://assets.fyers.in/global-components/trade-icons/basket/bw-empty-basket.svg", r = "No baskets created", a = "Nothing here, Yet...", i = "You haven’t added any baskets. Create basket to place orders.", s = '<button id="bwEmptyCreateBtn" class="bw-empty-basket-create-btn">\n        <img src="https://assets.fyers.in/global-components/trade-icons/basket/bw-empty-basket-create.svg" alt="Add a new instrument to basket" height="16" width="16" />\n        Create Basket\n      </button>') : (t = "https://assets.fyers.in/global-components/trade-icons/basket/bw-empty-intruments.svg", r = "No instruments added to basket", a = "Nothing here, Yet...", i = "You haven’t added any instruments to the basket. Add instruments to the basket and place the order together.", s = '<button id="bwEmptyAddInstrumentBtn" class="bw-empty-basket-create-btn">\n                        <img src="https://assets.fyers.in/global-components/trade-icons/basket/bw-empty-basket-create.svg" alt="Add a new instrument to basket" height="16" width="16" />\n                        Add instrument\n                      </button>\n                      '), `\n    <tr class="bw-no-baskets-wrapper" rowspan="4">\n      <td colspan="5">\n        <div class="bw-no-baskets-container">\n          <div class="bw-empty-basket-icon-wrapper ${"listing"===e?"bw-listing-empty":""}">\n            <img src="${t}" alt="${r}" height="90" width="90" />\n          </div>\n          <div class="bw-no-baskets-text-container">\n            <span class="bw-empty-basket-primary-text">\n              ${a}\n            </span>\n            <span class="bw-empty-basket-secondary-text">\n              ${i}\n            </span>\n          </div>\n          <div>\n            ${s}\n          </div>\n        </div>\n       </td>\n     </tr>\n    `
                            }
                            frameBasketListTableRows(e) {
                                return e.map((e => `\n            <tr data-id=${e.id}>\n                <td class="bw-table-bname-item bw-show-details">\n                    <span class="basket-selection-icon-wrapper" title="Select/unselect this basket for multi-basket execution">\n                        <span class="basket-selection-icon-alphabet">\n                            ${e.name?e.name.charAt(0).toUpperCase():"B"}\n                        </span>\n                        <div class="bw-selection-icon-check-container">\n                            <img class="bw-selection-icon-check" src="https://assets.fyers.in/global-components/trade-icons/basket/basket-unselected.svg" height="25" width="25"/>\n                        </div>\n                    </span>\n                    <span class="bw-basket-name-text" title="${e.name}">\n                        ${TradeModules.basketWindow.helper.truncateText(e.name,15)}\n                    </span>\n                </td>\n                <td class="bw-table-instrument-item bw-show-details">${e.items.length}<span class="bw-basket-instrument-secondary-text">/50</span></td>\n                <td class="bw-basket-instrument-date-text bw-show-details">${e.time_create?moment(1e3*e.time_create).format("DD MMM YYYY"):"-"}</td>\n                <td class="bw-basket-instrument-date-text bw-show-details">${e.time_execute?moment(1e3*e.time_execute).format("DD MMM YYYY"):"-"}</td>\n                <td class="bw-basket-actions-container">\n                <div class="bw-basket-actions-wrapper ">\n                  <div id="bwDeleteSingleBasket" class="bw-basket-action-item bw-delete-single-basket" title="Delete basket">\n                    <img src="https://assets.fyers.in/global-components/trade-icons/basket/basket-item-delete.svg"/>\n                  </div>\n                  <div class="bw-basket-action-item bw-show-details bw-edit-single-basket" title="Modify basket">\n                    <img src="https://assets.fyers.in/global-components/trade-icons/basket/basket-item-edit.svg"/>\n                  </div>\n                </div>\n              </td>\n             </tr>\n            `))
                            }
                            frameBasketDetailsSection(e) {
                                const t = e && e.items.length,
                                    r = t && e.items[0].order_data ? .status;
                                return `\n    <div class="bw-basket-details-wrapper-container">\n      <div class="bw-basket-details-wrapper">\n        <table id="bwTable" class="bw-table bw-details-table">\n          <thead>\n            <tr>\n              <th class="bw-table-detail-drag-heading text-center"></th>\n              <th class="bw-table-detail-symbol-heading text-left">Symbol</th>\n              <th class="text-left">Order type</th>\n              <th class="text-right bw-basket-details-qty-heading">Qty</th>\n              <th class="text-right bw-basket-details-price-heading">Price</th>\n              ${r?'<th class="text-left">Status</th>':'<th class="text-center"></th>'}\n            </tr>\n          </thead>\n          <tbody class="bw-basket-details-tbody">\n            ${t?e.items.map(((e,t)=>{const r=e.order_data&&e.order_data.status?TradeModules.basketWindow.helper.getBasketOrderStatusClass(e.order_data.status):"";return`\n                <tr class="bw-details-table-row" data-item-id="${e.id}" data-basket-item-index="${t}">\n                  <td class="bw-table-detail-drag-item text-center">\n                    <span class="bw-stock-drag-icon"></span>\n                  </td>\n                  <td class="bw-table-detail-symbol-item text-left">\n                    <div class="bw-table-detail-symbol-item-wrapper">\n                      <span class="bw-table-detail-symbol-item-symbol">${TradeModules.basketWindow.helper.getSymbolWithoutExchange(e.params.symbol)} <span class="bw-table-detail-symbol-exchange">${e.params.exchange}</span></span>\n                      <span class="bw-table-detail-symbol-item-description">${e.params.description}</span>\n                    </div>\n                  </td>\n                  <td>\n                    <div class="bw-table-detail-symbol-order-details">\n                      <div class="bw-table-detail-symbol-item-side ${1===e.params.side?"bw-buy":"bw-sell"}">\n                        ${1===e.params.side?"BUY":"SELL"}\n                      </div>\n                      <div>\n                        ${e.params?1===e.params.type?"LIMIT":2===e.params.type?"MARKET":3===e.params.type?"STOP":4===e.params.type?"STOP LIMIT":"-":"-"}\n                      </div>\n                      <div>\n                        ${e.params.productType}\n                      </div>\n                    </div>\n                  </td>\n                  <td class="bw-table-detail-symbol-item-data text-right bw-basket-details-qty-data">\n                    ${e.params.qty}\n                  </td>\n                  <td class="bw-table-detail-symbol-item-data text-right bw-basket-details-price-data">\n                    <div class="bw-table-detail-symbol-price-ltp-wrapper">\n                      <span class="bw-table-detail-symbol-price-ltp-price">\n                        ${e.params.stopPrice?e.params.stopPrice:e.params.limitPrice?e.params.limitPrice:"-"}</span>\n                      <span class="bw-table-detail-symbol-price-ltp-value">\n                        <span>LTP:&nbsp;</span>\n                        <span class="bw-basket-details-live-ltp-wrapper bwBasketDetailsLTP-${TradeModules.basketWindow.helper.removeSpecialCharactersFromSymbol(e.params.symbol)}">\n                          -\n                        </span>\n                      </span>\n                    </div>\n                  </td>\n                  ${e.order_data&&e.order_data.status?`\n                      <td class="bw-item-execution-status-text d-flex ${r}">\n                        <span id="bwOrderStatusIcon" data-bs-target="${e.id}" class="bw-table-detail-status-icon">\n                          ${"bw-order-failed"===r?"<span><img class='mr-1' src='https://assets.fyers.in/global-components/trade-icons/basket/bw-order-failed.svg' alt='Order failed'/>Failed</span>":"bw-order-success"===r?"<span><img class='mr-1' src='https://assets.fyers.in/global-components/trade-icons/basket/bw-order-success.svg' alt='Order success'/>Success</span>":"bw-order-processing"===r?"<span><img class='mr-1' src='https://assets.fyers.in/global-components/trade-icons/basket/bw-order-processing.svg' alt='Order processing'/>Processing</span>":""}\n                        </span>\n                        <div class="bw-order-status-popover" id="bwOrderStatusPopover-${e.id}">\n                            <div class="bw-arrow"></div> \n                            ${e.order_data.message}\n                        </div>\n                      </td>`:"<td class='bw-basket-actions-container'>\n                      <div class='bw-basket-actions-wrapper'>\n                        <div class='bw-basket-action-item bw-basket-action-clone-stock' title=\"Create a clone of this instrument\">\n                          <img src='https://assets.fyers.in/global-components/trade-icons/basket/basket-item-clone.svg'/>\n                        </div>\n                        <div class='bw-basket-action-item bw-basket-action-delete-stock' title=\"Delete this instrument from basket\">\n                          <img src='https://assets.fyers.in/global-components/trade-icons/basket/basket-item-delete.svg'/>\n                        </div>\n                        <div class='bw-basket-action-item bw-basket-action-edit-stock' title=\"Edit this instrument\">\n                          <img src='https://assets.fyers.in/global-components/trade-icons/basket/basket-item-edit.svg'/>\n                        </div>\n                      </div>\n                    </td>"}\n                </tr>\n              `})):this.getEmptyBasketHTML("details")}\n          </tbody>\n        </table>\n      </div>\n      ${t?`<div class="bw-basket-details-footer-wrapper">\n        <div class="bw-details-place-wrapper">\n          ${r?'<button\n                id="bwResetBasketBtn"\n                class="bw-execute-baskets-btn"\n              >\n                Reset\n              </button>':' <button\n                id="bwExecuteSingleBasketBtn"\n                class="bw-execute-baskets-btn"\n              >\n                Place\n              </button>'}\n          <button id="bwDetailsBackBtn" class="bw-cancel-execute-btn">Back</button>\n        </div>\n        <div class="bw-margin-required-wrapper">\n        <div>\n          <span id="bwRefreshMargin" class="bw-refresh-margin-container" title="Refresh margin">\n            <img src="https://assets.fyers.in/global-components/trade-icons/basket/bw-refresh-margin.svg" alt="Refresh margin"/>\n          </span>\n        </div>\n        <div id="bwMarginContent" class="bw-margin-required-content-wrapper">\n          ${this.getMarginRequiredAvailableHTML()}\n          </div>\n         </span>\n        </div>\n      </div>`:'<div class="bw-margin-place-empty"></div>'}\n    `
                            }
                            getMarginRequiredAvailableHTML() {
                                return '<span>\n          <span class="bw-margin-info-label">Margin Required: \n          </span> \n            <span class="bw-margin-required-text">\n                <span id="bwMarginRequiredText">₹0</span>\n            </span>\n            <span>\n            <span class="bw-margin-info-label">Available: \n            </span>\n            <span class="bw-margin-available-text"><span id="bwMarginAvailableText">\n              ₹0\n            </span>\n          </span>'
                            }
                            getMultiBasketConfirmationHTML() {
                                return '\n    <div id="bwMultiBasketConfirmModal" class="bw-multi-basket-confirmation-container ui-draggable ui-draggable-handle">\n      <div class="bw-multi-basket-modal-close-icon">\n        <img src="https://assets.fyers.in/global-components/trade-icons/basket/basket-modal-close.svg" height="12" id="bwMultiBasketCloseConfirm"  />\n      </div>\n      <div class="bw-multi-basket-confirmation-img-container">\n        <img src="https://assets.fyers.in/global-components/trade-icons/basket/multi-basket-confirm.svg"/>\n      </div>\n      <div class="bw-multi-basket-confirmation-content-container">\n        <span class="bw-multi-basket-confirmation-primary-text">Are you sure?</span>\n        <span class="bw-multi-basket-confirmation-secondary-text">Do you want to execute the selected baskets?</span>\n      </div>\n      <div class="bw-multi-basket-confirmation-btn-container">\n        <button id="bwMultiBasketConfirmExecute" class="bw-multi-basket-confirmation-primary-btn">Execute</button>\n        <button id="bwMultiBasketCancelExecute"  class="bw-multi-basket-confirmation-secondary-btn">Cancel</button>\n      </div>\n    </div>\n  '
                            }
                            getSearchPopupHTML() {
                                return '\n      <div id="bwSearchPopup" class="bw-search-popup-wrapper">\n        <div class="bw-search-popup-container">\n          <div class="bw-search-popup-header">\n            <span>Search Symbol</span>\n            <span id="bwSearchPopupClose" class="bw-search-popup-close" title="Close search popup">\n              <img src="https://assets.fyers.in/global-components/trade-icons/basket/bw-close-icon.svg" alt="Close search window" height="24" width="24" />\n            </span>\n          </div>\n          <div class="bw-search-popup-search-wrapper">\n            <span class="bw-search-popup-header-search-icon">\n              <img src="https://assets.fyers.in/global-components/trade-icons/basket/bw-search-icon.svg" alt="Search For Symbol" height="16" width="16" />\n            </span>  \n            <input type="text" id="bwSearchInstrumentInput" class="bw-search-popup-search-input" placeholder="Search" autocomplete="off" /> \n          </div>\n          <div id="bwSearchParent" class="bw-search-topmost">\n          </div>\n        </div>\n      </div>\n    '
                            }
                            getCreateBasketPopup() {
                                return '\n      <div id="bwCreateBasketPopup" class="bw-create-basket-wrapper">\n        <div class="bw-add-new-basket-heading-container">\n          <span class="bw-add-new-basket-heading-text">\n            Create Basket\n          </span>\n          <span id="bwCloseNewBasketPopup" class="bw-new-basket-close-icon cursor-pointer" title="Close create basket popup">\n            <img src="https://assets.fyers.in/global-components/trade-icons/basket/bw-close-icon.svg" alt="Close create basket popup" height="24" width="24" />\n          </span>\n        </div>\n        <div class="bw-add-new-basket-input-container">\n          <span class="bw-add-new-basket-input-label">Basket name</span>\n          <div id="bwAddNameInputContainer" class="bw-add-basket-name-input-container">\n            <input type="text" id="bwAddNewBasketInput" class="bw-add-new-basket-input" placeholder="Basket Name" autocomplete="off" maxlength="40" /> \n            <span id="bwAddBasketNameErrorText" class="bw-add-basket-error-text bw-loss"></span>\n          </div>\n        </div>\n        <div class="bw-add-new-basket-buttons-wrapper">\n          <button id="bwAddNewBasketSave" class="bw-add-new-basket-primary-btn">Save</button>\n          <button id="bwAddNewBasketCancel" class="bw-add-new-basket-secondary-btn">Cancel</button>\n        </div>\n      </div>\n    '
                            }
                            getEditBasketPopup() {
                                return '\n      <div id="bwEditBasketNamePopup" class="bw-edit-basket-wrapper">\n        <div class="bw-edit-basket-close-container" title="Close basket rename popup">\n          <img id="bwEditBasketNameClosePopup" class="bw-edit-basket-close-icon" src="https://assets.fyers.in/global-components/trade-icons/basket/bw-close-icon.svg" alt="Close create basket popup" height="24" width="24" />\n        </div>\n        <div class="bw-add-new-basket-input-container">\n          <span class="bw-add-new-basket-input-label">Basket name</span>\n          <div id="bwEditNameInputContainer" class="bw-edit-basket-name-input-container">\n            <input type="text" id="bwEditBasketNameInput" class="bw-add-new-basket-input" placeholder="Basket Name" autocomplete="off" maxlength="40" /> \n            <span id="bwEditBasketNameErrorText" class="bw-edit-basket-error-text bw-loss"></span>\n          </div>\n        </div>\n        <div class="bw-add-new-basket-buttons-wrapper">\n          <button id="bwEditBasketNameSave" class="bw-add-new-basket-primary-btn">Save</button>\n          <button id="bwEditBasketNameCancel" class="bw-add-new-basket-secondary-btn">Cancel</button>\n        </div>\n      </div>\n    '
                            }
                            getRecentPopularSearchWrapperHTML() {
                                return '\n      <div class="bw-search-data-wrapper" id="bwRecentSearchBody">\n      </div>          \n      <div class="bw-search-data-wrapper" id="bwPopularSearchBody">\n      </div>\n    '
                            }
                            getRecentSearchHTML(e) {
                                return `\n      <div class="bw-recent-searches-container">\n        <div class="bw-recent-searches-heading-container">\n          <span>\n            <img class="bw-recent-search-icon" src="https://assets.fyers.in/global-components/trade-icons/basket/bw-recent-search-icon.svg" alt="Recent Searches" height="12" width="12" />\n          </span>\n          <span class="bw-recent-searches-heading-text">\n            Recent Searches\n          </span>\n        </div>\n        <div class="bw-recent-searches-data-container">\n          ${e.map((e=>`\n              <div class="bw-recent-searches-item" data-symbol-name="${e.symbol}">\n                <div class="bw-recent-searches-item-symbol">\n                  <span class="bw-recent-searches-item-name">\n                    ${TradeModules.basketWindow.helper.getSymbolWithoutExchange(e.symbol)}\n                    <span class="bw-table-detail-symbol-exchange bw-exchange-search">${e.exchange}</span>\n                  </span>\n                  <span class="bw-recent-searches-item-description">${e.description}</span>\n                </div>\n                <div class="bwInstrumentSearchLTP-${TradeModules.basketWindow.helper.removeSpecialCharactersFromSymbol(e.symbol)} bw-recent-searches-item-price">\n                  <span class="text-right">0.00</span>\n                  <span class="text-right">0.0 (0.00%)</span>\n                </div>\n              </div>\n          `))}\n        </div>\n      </div>\n    `
                            }
                            getPopularSearchHTML(e) {
                                return `\n    <div class="bw-popular-searches-heading-container">\n      <span>\n        <img class="bw-popular-search-icon" src="https://assets.fyers.in/global-components/trade-icons/basket/bw-popular-search-icon.svg" alt="Popular Searches" height="12" width="12" />\n      </span>\n      <span class="bw-recent-searches-heading-text">\n        Popular Searches\n      </span>\n    </div>\n    <div class="bw-popular-searches-container">\n      ${e.map((e=>`\n          <div class="bw-popular-search-item" data-symbol-name="${e}">\n            ${e}\n          </div>\n      `))}\n    </div>\n    `
                            }
                            frameSearchResultHTML(e) {
                                return `\n    <div class="bw-search-result-data-container">\n      <span class="bw-search-result-count-text">\n          Results (${e.length})\n      </span>\n      <div class="bw-search-result-results-container">\n      ${e.map((e=>`\n            <div class="bw-search-result-item" data-symbol-id="${e.sym_token}">\n              <div class="bw-search-result-item-symbol">\n                <span class="bw-search-result-item-name">${TradeModules.basketWindow.helper.getSymbolWithoutExchange(e.symbol)}\n                  <span class="bw-table-detail-symbol-exchange bw-exchange-search">${e.exchange}</span>\n                </span>\n                <span class="bw-search-result-item-description">${e.description}</span>\n              </div>\n            </div>\n          `))}\n      </div>\n    </div>\n  `
                            }
                            getSearchLoadingHTML() {
                                return '\n      <div class="bw-search-result-loading-wrapper">\n        <img src="https://assets.fyers.in/global-components/loader/fyers-loader-white.gif" height="70" width="70"/>\n      </div>\n    '
                            }
                            getDetailsSubHeaderHTML(e) {
                                const t = e.time_execute ? "execute" : e.time_create ? "create" : "";
                                return t ? `<div>\n                <span class="bw-details-header-last-placed-label">${"execute"===t?"Last placed at:":"Created at:"}</span>\n                <span class="bw-details-header-last-placed-date">${moment("execute"===t?1e3*e.time_execute:1e3*e.time_create).format("DD MMM YYYY h:mma")}</span>\n               </div>` : ""
                            }
                            getNoResultsHTML(e) {
                                return `\n      <tr id="twNoResultDisplay" class="tw-no-baskets-found-parent">\n        <td colspan="5" class="tw-no-baskets-found-wrapper">\n          <div class="tw-no-baskets-found-container">\n            <div class="bw-empty-search-icon-wrapper">\n              <img src="https://assets.fyers.in/global-components/trade-icons/basket/bw-empty-basket.svg" alt="No baskets found" height="90" width="90">\n            </div>\n            <div class="tw-no-baskets-found-primary-text">\n              Oh-oh! There isn't a match.\n            </div>\n            <div class="tw-no-baskets-found-secondary-text">\n              We're sorry. No basket found for "${e}". Check for typos and spelling errors or use different search term\n            </div>\n          </div>\n        </td>\n      </tr>`
                            }
                        }, this.service = new class {
                            constructor() {
                                this.headers = {
                                    Authorization: token,
                                    "Content-Type": "application/json"
                                }, this.basket_get = "https://api-t2.fyers.in/fydev/v1/baskets"
                            }
                            async getBasketsList() {
                                const e = await fetch(`${globalConstants.dynamicUrl.baskets.baskets_get}?token_id=${token_id}`, {
                                        headers: this.headers
                                    }),
                                    t = await e.text();
                                return JSON.parse(t)
                            }
                            async createNewBasket(e) {
                                const t = {
                                        method: "POST",
                                        headers: this.headers,
                                        body: JSON.stringify({
                                            name: e
                                        })
                                    },
                                    r = await fetch(`${globalConstants.dynamicUrl.baskets.baskets_get}?token_id=${token_id}`, t),
                                    a = await r.text();
                                return JSON.parse(a)
                            }
                            async executeSingleBasketOrder() {
                                const e = {
                                        token_id
                                    },
                                    t = new URLSearchParams(e),
                                    r = TradeModules.basketWindow.controller.currentBasketId,
                                    a = {
                                        method: "POST",
                                        headers: this.headers,
                                        body: JSON.stringify({
                                            basketid: [r]
                                        })
                                    },
                                    i = `${globalConstants.dynamicUrl.baskets.baskets_execute}?${t}`,
                                    s = await fetch(i, a),
                                    o = await s.text();
                                return JSON.parse(o)
                            }
                            async executeMultiBasketOrder() {
                                const e = {
                                        method: "POST",
                                        headers: this.headers,
                                        body: JSON.stringify({
                                            basketid: TradeModules.basketWindow.controller.selectedBasketIds
                                        })
                                    },
                                    t = await fetch(`${globalConstants.dynamicUrl.baskets.baskets_execute}`, e),
                                    r = await t.text();
                                return TradeModules.basketWindow.handler.openBasketWindow(), JSON.parse(r)
                            }
                            async getStockList(e) {
                                const t = e ? e.toString() ? .trim().toUpperCase() : "",
                                    r = FyTrade.common.getTimeStamp(),
                                    a = new URLSearchParams({
                                        limit: 30,
                                        query: t,
                                        type: "",
                                        exchange: "",
                                        dataReq: r
                                    }),
                                    i = `${globalConstants.dynamicUrl.data.search}?${a}`,
                                    s = await fetch(i, {
                                        headers: this.headers
                                    }),
                                    o = await s.text();
                                return JSON.parse(o)
                            }
                            async getStockQuotes(e) {
                                const t = new URLSearchParams({
                                        symbols: e
                                    }),
                                    r = `${globalConstants.dynamicUrl.data.quotes}?${t}`,
                                    a = await fetch(r, {
                                        headers: this.headers
                                    }),
                                    i = await a.text();
                                return JSON.parse(i)
                            }
                            async addNewStockToBasket(e, t) {
                                const r = {
                                        token_id
                                    },
                                    a = new URLSearchParams(r),
                                    i = {
                                        method: "POST",
                                        headers: this.headers,
                                        body: JSON.stringify({
                                            basketid: e,
                                            params: t
                                        })
                                    },
                                    s = `${globalConstants.dynamicUrl.baskets.basket_items}?${a}`,
                                    o = await fetch(s, i),
                                    n = await o.text();
                                return JSON.parse(n)
                            }
                            async deleteSingleBasket(e) {
                                const t = {
                                        token_id
                                    },
                                    r = new URLSearchParams(t),
                                    a = {
                                        method: "DELETE",
                                        headers: this.headers,
                                        body: JSON.stringify({
                                            basketid: e
                                        })
                                    },
                                    i = `${globalConstants.dynamicUrl.baskets.baskets_get}?${r}`,
                                    s = await fetch(i, a),
                                    o = await s.text();
                                return JSON.parse(o)
                            }
                            async resetSelectedBasket(e) {
                                const t = {
                                        token_id
                                    },
                                    r = new URLSearchParams(t),
                                    a = {
                                        method: "POST",
                                        headers: this.headers,
                                        body: JSON.stringify({
                                            basketid: e
                                        })
                                    },
                                    i = `${globalConstants.dynamicUrl.baskets.basket_reset}?${r}`,
                                    s = await fetch(i, a),
                                    o = await s.text();
                                return JSON.parse(o)
                            }
                            async getMarginData(e) {
                                const t = {
                                        token_id
                                    },
                                    r = new URLSearchParams(t),
                                    a = {
                                        method: "POST",
                                        headers: this.headers,
                                        body: JSON.stringify({
                                            basketid: e
                                        })
                                    },
                                    i = `${globalConstants.dynamicUrl.baskets.basket_margin}?${r}`,
                                    s = await fetch(i, a),
                                    o = await s.text();
                                return JSON.parse(o)
                            }
                            async deleteStockFromBasket(e, t) {
                                const r = {
                                        token_id
                                    },
                                    a = new URLSearchParams(r),
                                    i = {
                                        method: "DELETE",
                                        headers: this.headers,
                                        body: JSON.stringify({
                                            basketid: e,
                                            itemid: t
                                        })
                                    },
                                    s = `${globalConstants.dynamicUrl.baskets.basket_items}?${a}`,
                                    o = await fetch(s, i),
                                    n = await o.text();
                                return JSON.parse(n)
                            }
                            async updateSelectedBasket(e) {
                                const t = {
                                        token_id
                                    },
                                    r = new URLSearchParams(t),
                                    a = {
                                        method: "PUT",
                                        headers: this.headers,
                                        body: JSON.stringify(e)
                                    },
                                    i = `${globalConstants.dynamicUrl.baskets.baskets_get}?${r}`,
                                    s = await fetch(i, a),
                                    o = await s.text();
                                return JSON.parse(o)
                            }
                            async updateSelectedBasketItem(e) {
                                const t = {
                                        token_id
                                    },
                                    r = new URLSearchParams(t),
                                    a = {
                                        method: "PUT",
                                        headers: this.headers,
                                        body: JSON.stringify(e)
                                    },
                                    i = `${globalConstants.dynamicUrl.baskets.basket_items}?${r}`,
                                    s = await fetch(i, a),
                                    o = await s.text();
                                return JSON.parse(o)
                            }
                            async updateSelectedBasketItem(e) {
                                const t = {
                                        token_id
                                    },
                                    r = new URLSearchParams(t),
                                    a = {
                                        method: "PUT",
                                        headers: this.headers,
                                        body: JSON.stringify(e)
                                    },
                                    i = `${globalConstants.dynamicUrl.baskets.basket_items}?${r}`,
                                    s = await fetch(i, a),
                                    o = await s.text();
                                return JSON.parse(o)
                            }
                            async updateSelectedBasketAsOpened(e) {
                                const t = {
                                        token_id
                                    },
                                    r = new URLSearchParams(t),
                                    a = {
                                        method: "PUT",
                                        headers: this.headers,
                                        body: JSON.stringify(e)
                                    },
                                    i = `${globalConstants.dynamicUrl.baskets.basket_update}?${r}`,
                                    s = await fetch(i, a),
                                    o = await s.text();
                                return JSON.parse(o)
                            }
                        }, this.events = new class {
                            allowBwDrag() {
                                $("#bwContainer").draggable({
                                    disabled: !1,
                                    containment: "window",
                                    scroll: !1,
                                    drag: function(e, t) {
                                        "none" !== $(".bw-topmost-wrapper").css("transform") && $(".bw-topmost-wrapper").css("transform", "none");
                                        let r = t.position;
                                        $.cookie("owPosL", r.left), $.cookie("owPosT", r.top)
                                    }
                                })
                            }
                            attachBasketListingPageListeners() {
                                $("#bwTable tbody tr .basket-selection-icon-wrapper").unbind().click((function() {
                                    const e = $(this).closest("tr").data("id");
                                    let t = TradeModules.basketWindow.controller.selectedBasketIds;
                                    const r = t.indexOf(e); - 1 === r ? (t.push(e), $(this).closest("tr").addClass("multi-basket-highlight")) : (t.splice(r, 1), $(this).closest("tr").removeClass("multi-basket-highlight"));
                                    const a = t.length === $("#bwTable tbody tr").length;
                                    $("#bwSelectAllCheckbox").prop("checked", a), TradeModules.basketWindow.handler.checkMultiBasketExecuteBtnDisplay()
                                })), $("#bwSelectAllCheckbox").unbind().click((function() {
                                    const e = $(this),
                                        t = $("#bwTable tbody tr");
                                    e.prop("checked") ? (t.addClass("multi-basket-highlight"), TradeModules.basketWindow.controller.selectedBasketIds = t.map((function() {
                                        return $(this).data("id")
                                    })).get()) : (t.removeClass("multi-basket-highlight"), TradeModules.basketWindow.controller.selectedBasketIds = []), TradeModules.basketWindow.handler.checkMultiBasketExecuteBtnDisplay()
                                })), $("#bwContainer #bwExecuteMultiBasketsBtn").unbind().click((() => {
                                    TradeModules.basketWindow.handler.closeBasketWindow(), TradeModules.basketWindow.controller.displayMultiBasketConfirmation()
                                })), $("#bwModalCloseIconContainer").unbind().click((() => {
                                    TradeModules.basketWindow.handler.closeAllPopups()
                                })), $("#bwCreateBasketBtn, #bwEmptyCreateBtn").unbind().click((() => {
                                    TradeModules.basketWindow.controller.basketsList.length < 10 ? TradeModules.basketWindow.handler.createNewBasket() : FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.warning, "Maximum basket limit reached", "You can only create a maximum of 10 baskets!")
                                })), $("#bwTable tbody tr .bw-show-details").unbind().click((function(e) {
                                    if (!e.target.closest(".basket-selection-icon-wrapper")) {
                                        const e = $(this).closest("tr").data("id");
                                        TradeModules.basketWindow.controller.currentBasketId = e, TradeModules.basketWindow.controller.renderBasketDetailsPage(e)
                                    }
                                })), $(".bw-delete-single-basket").unbind().click((function() {
                                    const e = $(this).closest("tr").data("id");
                                    TradeModules.basketWindow.handler.disableBasketItemActions($(this)), TradeModules.basketWindow.controller.deleteBasket(e)
                                })), $("#bwListSearchInput").unbind().on("input", (function() {
                                    const e = $(this).val();
                                    TradeModules.basketWindow.handler.searchBasketsFromList(e)
                                })), $("#bwAddNewBasketSave").unbind().click(TradeModules.basketWindow.handler.handleAddNewBasket), $("#bwAddNewBasketInput").unbind().on("input", (function(e) {
                                    TradeModules.basketWindow.handler.handleBasketValidation(e, "#bwAddNameInputContainer", "#bwAddBasketNameErrorText")
                                })).on("keydown", (function(e) {
                                    "Enter" === e.key && TradeModules.basketWindow.handler.handleAddNewBasket()
                                })), $("#bwAddNewBasketCancel,#bwCloseNewBasketPopup").unbind().click((function() {
                                    TradeModules.basketWindow.handler.closeAddBasketPopup()
                                })), $("#bwCancelMultiSelection").unbind().click((function() {
                                    TradeModules.basketWindow.handler.cancelMultiBasketSelection()
                                })), $(".bw-modal-content").unbind().click((function(e) {
                                    $(".bw-create-visible") && $(".bw-create-visible").length && (e.target === this || e.target.closest(".bw-create-basket-wrapper") || e.target.closest(".bw-create-basket-btn") || e.target.closest(".bw-empty-basket-create-btn") || TradeModules.basketWindow.handler.closeAddBasketPopup()), $(".bw-search-visible") && $(".bw-search-visible").length && (e.target === this || e.target.closest(".bw-search-popup-wrapper") || e.target.closest(".bw-details-header-add-instrument-btn") || e.target.closest(".bw-empty-basket-create-btn") || TradeModules.basketWindow.handler.hideInstrumentSearchPopup()), $(".bw-edit-visible") && $(".bw-edit-visible").length && (e.target === this || e.target.closest(".bw-edit-basket-wrapper") || e.target.closest(".bw-details-header-heading-edit-icon") || TradeModules.basketWindow.handler.closeEditBasketPopup())
                                }))
                            }
                            attachBasketDetailsPageListeners() {
                                $("#bwExecuteSingleBasketBtn").unbind().on("click", (async function(e) {
                                    await TradeModules.basketWindow.controller.executeSingleBasketOrder()
                                })), $(".bw-table-detail-status-icon").hover((function() {
                                    const e = $(this).parent(),
                                        t = e.find(".bw-order-status-popover"),
                                        r = e.parent().position().top + 44;
                                    t.css({
                                        display: "block",
                                        top: `${r}px`
                                    })
                                }), (function() {
                                    $(this).parent().find(".bw-order-status-popover").css("display", "none")
                                })), $("#bwDetailsBackBtn,#bwHeadingGoBack").unbind().click((function() {
                                    TradeModules.basketWindow.controller.renderBasketsList(), TradeModules.basketWindow.handler.closeEditBasketPopup(), TradeModules.basketWindow.handler.hideInstrumentSearchPopup()
                                })), $("#bwResetBasketBtn").unbind().click((function() {
                                    TradeModules.basketWindow.controller.resetSelectedBasket()
                                })), $(".bw-basket-action-delete-stock").unbind().click((function() {
                                    const e = $(this).closest("tr").attr("data-item-id");
                                    TradeModules.basketWindow.controller.deleteStockFromBasket(e), TradeModules.basketWindow.handler.disableBasketItemActions($(this))
                                })), $(".bw-basket-action-clone-stock").unbind().click((function() {
                                    const e = TradeModules.basketWindow.helper.getSelectedBasketDetails();
                                    if (e && e.items.length < 50) {
                                        const e = $(this).closest("tr").attr("data-item-id");
                                        TradeModules.basketWindow.controller.cloneStockFromBasket(e), TradeModules.basketWindow.handler.disableBasketItemActions($(this))
                                    } else FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.warning, "Maximum instrument limit reached", "You can only add a maximum of 50 instruments in a basket!")
                                })), $(".bw-basket-action-edit-stock").unbind().click((function() {
                                    const e = $(this).closest("tr").attr("data-item-id");
                                    TradeModules.basketWindow.controller.updateExistingStockInBasket(e)
                                })), $("#bwRenameBasket").on("change", (async function(e) {
                                    const t = e.target.value;
                                    TradeModules.basketWindow.controller.renameSelectedBasket(t)
                                })), $("#bwAddInstrument").unbind().click((function() {
                                    TradeModules.basketWindow.handler.handleShowInstrumentSearch()
                                })), $("#bwDetailsClose").unbind().click((() => {
                                    TradeModules.basketWindow.handler.closeAllPopups()
                                })), $("#bwEditBasketName").unbind().click((() => {
                                    TradeModules.basketWindow.handler.handleEditBasketNamePopupOpen(), TradeModules.basketWindow.handler.hideInstrumentSearchPopup(), TradeModules.basketWindow.handler.hideInputValidationMessages("#bwEditNameInputContainer")
                                })), $("#bwEditBasketNameClosePopup,#bwEditBasketNameCancel").unbind().click((function() {
                                    TradeModules.basketWindow.handler.closeEditBasketPopup()
                                })), $("#bwEditBasketNameSave").unbind().click((function() {
                                    TradeModules.basketWindow.handler.handleEditBasketNameSave()
                                })), $("#bwEmptyAddInstrumentBtn").unbind().click((function() {
                                    TradeModules.basketWindow.handler.handleShowEmptySearchPopup()
                                })), $("#bwEditBasketNameInput").unbind().on("input", (function(e) {
                                    TradeModules.basketWindow.handler.handleBasketValidation(e, "#bwEditNameInputContainer", "#bwEditBasketNameErrorText")
                                })).on("keydown", (function(e) {
                                    "Enter" === e.key && TradeModules.basketWindow.handler.handleEditBasketNameSave()
                                })), $("#bwRefreshMargin").unbind().click((function() {
                                    TradeModules.basketWindow.controller.updateMarginData(), TradeModules.basketWindow.handler.rotateRefreshIconAnimation()
                                }))
                            }
                            enableBasketItemsDrag() {
                                TradeModules.basketWindow.handler.handleBasketDrag()
                            }
                            attachMultibasketListeners() {
                                $("#bwMultiBasketConfirmModal").draggable({
                                    containment: "window"
                                }), $("#bwMultiBasketConfirmExecute").unbind().click((async function() {
                                    TradeModules.basketWindow.handler.executeMultiBasketOrder()
                                })), $("#bwMultiBasketCancelExecute, #bwMultiBasketCloseConfirm").unbind().click(TradeModules.basketWindow.controller.closeMultiBasketConfirmation)
                            }
                            removeMultiBasketEventListeners() {
                                $("#bwMultiBasketConfirmExecute").unbind(), $("#bwMultiBasketCancelExecute, #bwMultiBasketCloseConfirm").unbind(), $("#bwMultiBasketConfirmModal").draggable("destroy")
                            }
                            attachAddInstrumentEventListeners() {
                                $("#bwSearchInstrumentInput").unbind().on("input", (function(e) {
                                    TradeModules.basketWindow.handler.handleInstrumentSearch(e.target.value)
                                })), $("#bwSearchPopupClose").unbind().click((() => TradeModules.basketWindow.handler.hideInstrumentSearchPopup())), $(".bw-recent-searches-item,.bw-popular-search-item").unbind().click((function() {
                                    const e = $(this).attr("data-symbol-name");
                                    TradeModules.basketWindow.handler.prefillAndTriggerInstrumentSearch(e)
                                }))
                            }
                            attachSearchResultEventListerners() {
                                $(".bw-search-result-item").unbind().click((function() {
                                    const e = $(this).attr("data-symbol-id");
                                    e && TradeModules.basketWindow.controller.addSelectedStockToBasket(e)
                                }))
                            }
                        }, this.handler = new class {
                            constructor() {
                                this.searchDebounceLimit
                            }
                            addBasketWindowWrapper() {
                                const e = TradeModules.basketWindow.modal.getWrapperHTML();
                                $(document.body).append(e), TradeModules.basketWindow.events.allowBwDrag()
                            }
                            openBasketWindow() {
                                $(".bw-topmost-wrapper").addClass("bw-open");
                                const e = TradeModules.basketWindow.modal.getHeaderHTML(),
                                    t = TradeModules.basketWindow.modal.getLoaderHTML();
                                document.querySelector("#bwModalHeader").innerHTML = e, document.querySelector("#bwModalBody").innerHTML = t, orderWindow.theme.applyTheme(), TradeModules.basketWindow.controller.renderBasketsList()
                            }
                            renderBasketListTable() {
                                const e = TradeModules.basketWindow.modal.getHeaderHTML();
                                document.querySelector("#bwModalHeader").innerHTML = e;
                                const t = TradeModules.basketWindow.modal.frameBasketListSection(TradeModules.basketWindow.controller.basketsList);
                                document.getElementById("bwModalBody").innerHTML = t.toString().replaceAll(",", ""), TradeModules.basketWindow.events.attachBasketListingPageListeners(), TradeModules.basketWindow.controller.resetSelectedBasketAndUnsubscribe()
                            }
                            searchBasketsFromList(e) {
                                const t = e.toLowerCase().replace(/\s+/g, "");
                                let r = !1;
                                const a = TradeModules.basketWindow.modal.getNoResultsHTML(e),
                                    i = TradeModules.basketWindow.controller.basketsList.filter((e => e.name.toLowerCase().replace(/\s+/g, "").includes(t))).length || !e;
                                if ($("#twNoResultDisplay") && $("#twNoResultDisplay").length && i) {
                                    let e = TradeModules.basketWindow.modal.frameBasketListTableRows(TradeModules.basketWindow.controller.basketsList);
                                    $("#bWbasketListTableBody").html(e), TradeModules.basketWindow.events.attachBasketListingPageListeners()
                                }
                                const s = $("#bWbasketListTableBody").children(),
                                    o = $("#bWbasketListTableBody");
                                s.each((function() {
                                    const e = $(this).find(".bw-basket-name-text").text().toLowerCase().replace(/\s+/g, "");
                                    "" === t || e.includes(t) ? ($(this).css("display", "table"), r = !0) : $(this).css("display", "none")
                                })), r || o.empty().append(a), TradeModules.basketWindow.handler.cancelMultiBasketSelection()
                            }
                            async handleAddNewBasket() {
                                const e = $("#bwAddNewBasketInput").val();
                                if (e) try {
                                    const t = await TradeModules.basketWindow.service.createNewBasket(e);
                                    t && 200 === t.code ? (TradeModules.basketWindow.controller.basketsList = t.data, TradeModules.basketWindow.controller.renderBasketsList(), TradeModules.basketWindow.handler.closeAddBasketPopup(), FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.success, "Successfully created new basket", e)) : TradeModules.basketWindow.helper.destructureApiErrorAndShowToaster(t)
                                } catch (e) {
                                    FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.error, "Error", "Failed to create new basket. Please try again")
                                }
                            }
                            async createNewBasket() {
                                const e = $("#bwCreateBasketPopup");
                                if (!e.hasClass("bw-create-visible")) {
                                    e.addClass("bw-create-visible");
                                    const t = TradeModules.basketWindow.helper.getBasketName();
                                    $("#bwAddNewBasketInput").val(t), $("#bwAddNewBasketInput").focus(), this.hideInputValidationMessages("#bwAddNameInputContainer")
                                }
                            }
                            closeBasketWindow() {
                                $(".bw-topmost-wrapper").removeClass("bw-open"), this.closeEditBasketPopup()
                            }
                            closeAddBasketPopup() {
                                $("#bwCreateBasketPopup").removeClass("bw-create-visible")
                            }
                            closeEditBasketPopup() {
                                $("#bwEditBasketNamePopup").removeClass("bw-edit-visible")
                            }
                            closeAllPopups() {
                                this.closeBasketWindow(), this.closeEditBasketPopup(), this.closeAddBasketPopup()
                            }
                            async executeMultiBasketOrder() {
                                try {
                                    const e = await TradeModules.basketWindow.service.executeMultiBasketOrder();
                                    "ok" === e.s ? FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.success, "Success", "Successfully executed multi-basket order") : TradeModules.basketWindow.helper.destructureApiErrorAndShowToaster(e)
                                } catch (e) {
                                    console.log("Failed in executeMultiBasketOrder handler:", e), FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.error, "Error", "Failed to execute multi-basket order. Please try again")
                                } finally {
                                    TradeModules.basketWindow.controller.selectedBasketIds = [], TradeModules.basketWindow.controller.closeMultiBasketConfirmation()
                                }
                            }
                            checkMultiBasketExecuteBtnDisplay() {
                                TradeModules.basketWindow.controller.selectedBasketIds.length ? ($("#bwExecuteMultiWrapper").removeClass("d-none"), $("#bwExecuteMultiBasketsBtn").text(`Execute ${TradeModules.basketWindow.controller.selectedBasketIds.length} Basket${1===TradeModules.basketWindow.controller.selectedBasketIds.length?"":"s"}`)) : ($("#bwExecuteMultiWrapper").addClass("d-none"), $("#bwExecuteMultiBasketsBtn").text("Execute Baskets"))
                            }
                            cancelMultiBasketSelection() {
                                $("#bwTable tbody tr").removeClass("multi-basket-highlight"), TradeModules.basketWindow.controller.selectedBasketIds = [], TradeModules.basketWindow.handler.checkMultiBasketExecuteBtnDisplay(), $("#bwSelectAllCheckbox").prop("checked", !1)
                            }
                            disableBasketItemActions(e) {
                                e.parent().css("pointer-events", "none")
                            }
                            enableBasketItemActions(e) {
                                $(e).find(".bw-basket-actions-wrapper").css("pointer-events", "auto")
                            }
                            handleShowInstrumentSearch() {
                                const e = TradeModules.basketWindow.helper.getSelectedBasketDetails();
                                e && e.items.length < 50 ? (this.handleShowSearchPopup(), this.closeEditBasketPopup()) : FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.warning, "Maximum instrument limit reached", "You can only add a maximum of 50 instruments in a basket!")
                            }
                            async handleShowSearchPopup() {
                                const e = $("#bwSearchPopup");
                                e.hasClass("bw-search-visible") || e.addClass("bw-search-visible");
                                try {
                                    const e = await optionChain.optiondata.getRecentSearchResult();
                                    "ok" === e.s && e.recent_search && (TradeModules.basketWindow.controller.recentSearchList = e.recent_search.symbols, TradeModules.basketWindow.controller.subscribeRecentSearchLTP())
                                } catch (e) {
                                    console.log("Error getting recent search data:", e)
                                }
                                try {
                                    const e = await optionChain.optiondata.getPopularSearchResult();
                                    "ok" === e.s && e.data && (TradeModules.basketWindow.controller.popularSearchList = e.data)
                                } catch (e) {
                                    console.log("Error getting popular search data:", e)
                                }
                                const t = TradeModules.basketWindow.controller.recentSearchList.slice(0, 5),
                                    r = TradeModules.basketWindow.controller.popularSearchList.slice(0, 5),
                                    a = TradeModules.basketWindow.modal.getRecentPopularSearchWrapperHTML(),
                                    i = TradeModules.basketWindow.modal.getRecentSearchHTML(t).toString().replaceAll(",", ""),
                                    s = TradeModules.basketWindow.modal.getPopularSearchHTML(r).toString().replaceAll(",", "");
                                $("#bwSearchParent").html(a), $("#bwRecentSearchBody").html(i), $("#bwPopularSearchBody").html(s), $("#bwSearchInstrumentInput").focus(), TradeModules.basketWindow.events.attachAddInstrumentEventListeners()
                            }
                            async handleInstrumentSearch(e) {
                                clearTimeout(this.searchDebounceLimit), this.searchDebounceLimit = setTimeout((async () => {
                                    if (e) {
                                        this.renderSearchLoading();
                                        const t = await TradeModules.basketWindow.service.getStockList(e);
                                        "ok" === t.s && (TradeModules.basketWindow.controller.stockSearchOptions = t.data, this.renderInstrumentSearchResults(t.data))
                                    } else this.handleShowSearchPopup()
                                }), 800)
                            }
                            renderSearchLoading() {
                                const e = TradeModules.basketWindow.modal.getSearchLoadingHTML();
                                $("#bwSearchParent").html(e)
                            }
                            renderInstrumentSearchResults(e) {
                                const t = TradeModules.basketWindow.modal.frameSearchResultHTML(e).toString().replaceAll(",", "");
                                $("#bwSearchParent").html(t), TradeModules.basketWindow.events.attachSearchResultEventListerners()
                            }
                            refreshBasketHeaderDetails() {
                                const e = TradeModules.basketWindow.controller.basketsList.find((e => e.id === TradeModules.basketWindow.controller.currentBasketId));
                                e.name && $("#bwDetailsHeaderBasketName").text(`${e.name}`);
                                const t = TradeModules.basketWindow.modal.getDetailsSubHeaderHTML(e);
                                $("#bwDetailsCreationExecutionDate").html(t)
                            }
                            async handleEditBasketNamePopupOpen() {
                                const e = $("#bwEditBasketNamePopup");
                                if (!e.hasClass("bw-edit-visible")) {
                                    e.addClass("bw-edit-visible");
                                    const t = TradeModules.basketWindow.controller.basketsList.find((e => e.id === TradeModules.basketWindow.controller.currentBasketId));
                                    t && t.name && ($("#bwEditBasketNameInput").val(t.name), $("#bwEditBasketNameInput").focus())
                                }
                            }
                            renderBasketDetailsParent(e) {
                                const t = document.querySelector("#bwModalHeader"),
                                    r = document.querySelector("#bwModalBody"),
                                    a = TradeModules.basketWindow.controller.basketsList.find((t => t.id === e)),
                                    i = TradeModules.basketWindow.modal.frameBasketDetailsSection(a),
                                    s = TradeModules.basketWindow.modal.getDetailsHeaderHTML(a);
                                t.innerHTML = s.toString().replaceAll(",", ""), r.innerHTML = i.toString().replaceAll(",", "")
                            }
                            async handleEditBasketNameSave() {
                                const e = $("#bwEditBasketNameInput").val(),
                                    t = {
                                        basketid: TradeModules.basketWindow.controller.currentBasketId,
                                        name: e
                                    };
                                try {
                                    const r = await TradeModules.basketWindow.service.updateSelectedBasket(t);
                                    "ok" === r.s && (TradeModules.basketWindow.controller.basketsList = r.data, TradeModules.basketWindow.controller.renderBasketDetailsPage(TradeModules.basketWindow.controller.currentBasketId), TradeModules.basketWindow.handler.closeEditBasketPopup(), FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.success, "Successfully renamed basket", e))
                                } catch (e) {
                                    FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.error, "Failed to renamed basket!", "")
                                }
                            }
                            handleBasketValidation(e, t, r) {
                                const a = e.target.value;
                                this.handleShowValidationMessage((() => a && a.length < 40), a ? "Basket name should be less than 40 characters." : "Basket name is required.", t, r)
                            }
                            handleShowValidationMessage(e, t, r, a) {
                                const i = $(r).hasClass("bw-input-error");
                                e() ? i && ($(a).text(""), $(r).removeClass("bw-input-error")) : ($(a).text(t), $(r).addClass("bw-input-error"))
                            }
                            hideInputValidationMessages(e) {
                                $(e).removeClass("bw-input-error")
                            }
                            async handleShowEmptySearchPopup() {
                                const e = $("#bwSearchPopup");
                                e.hasClass("bw-search-large") || e.addClass("bw-search-large"), this.handleShowSearchPopup()
                            }
                            resizeSearchToSmall() {
                                const e = $("#bwSearchPopup");
                                e.hasClass("bw-search-large") && e.removeClass("bw-search-large")
                            }
                            prefillAndTriggerInstrumentSearch(e) {
                                $("#bwSearchInstrumentInput").val(e), this.handleInstrumentSearch(e)
                            }
                            hideInstrumentSearchPopup() {
                                $("#bwSearchPopup").removeClass("bw-search-visible"), $("#bwSearchInstrumentInput").val("")
                            }
                            rotateRefreshIconAnimation() {
                                const e = $(".bw-refresh-margin-container img");
                                e.hasClass("bo-refresh-rotate") || (e.addClass("bo-refresh-rotate"), setTimeout((() => e.removeClass("bo-refresh-rotate")), 2e3))
                            }
                            displayToasterForExpiredScripts() {
                                for (const e of TradeModules.basketWindow.controller.basketsList)
                                    if (e.hasOwnProperty("message")) {
                                        const t = e.message || "",
                                            r = e.name || "";
                                        FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.info, `${r} Basket Updated`, t)
                                    }
                            }
                            handleBasketDrag() {
                                const e = document.querySelectorAll(".bw-stock-drag-icon"),
                                    t = document.querySelectorAll(".bw-details-table-row");
                                let r;
                                e.forEach(((e, r) => {
                                    e.addEventListener("mouseenter", (() => {
                                        t[r].setAttribute("draggable", !0), $("#bwContainer").draggable({
                                            disabled: !0
                                        })
                                    })), e.addEventListener("mouseleave", (() => {
                                        t[r].setAttribute("draggable", !1), TradeModules.basketWindow.events.allowBwDrag()
                                    }))
                                })), t.forEach(((e, a) => {
                                    e.addEventListener("dragstart", (() => {
                                        e.classList.add("e-dragging")
                                    })), e.addEventListener("dragend", (function() {
                                        e.classList.remove("e-dragging"), async function(e) {
                                            const a = t[e].dataset.basketItemIndex,
                                                i = r.dataset.basketItemIndex;
                                            let s = TradeModules.basketWindow.controller.basketsList.find((e => e.id === TradeModules.basketWindow.controller.currentBasketId)).items;
                                            if (s)
                                                if (a == i) {
                                                    const e = s.splice(a, 1);
                                                    s.push(e[0])
                                                } else {
                                                    const e = s.splice(a, 1);
                                                    s.splice(i, 0, e[0])
                                                }
                                            const o = {
                                                basketid: TradeModules.basketWindow.controller.currentBasketId,
                                                items: s
                                            };
                                            TradeModules.basketWindow.service.updateSelectedBasket(o)
                                        }(a)
                                    }))
                                }));
                                const a = document.querySelector(".bw-basket-details-tbody");
                                a.addEventListener("dragover", (e => {
                                    e.preventDefault();
                                    const t = document.querySelector(".e-dragging"),
                                        i = (s = a, o = e.clientY, [...s.querySelectorAll(".bw-details-table-row:not(.e-dragging)")].reduce(((e, t) => {
                                            const r = t.getBoundingClientRect(),
                                                a = o - r.top - r.height / 2;
                                            return a < 0 && a > e.offset ? {
                                                offset: a,
                                                element: t
                                            } : e
                                        }), {
                                            offset: Number.NEGATIVE_INFINITY
                                        }).element);
                                    var s, o;
                                    null == i ? (a.appendChild(t), r = t) : (a.insertBefore(t, i), r = i)
                                }))
                            }
                        }, this.controller = new class {
                            constructor() {
                                this.orderPlaceCallback = this.orderPlaceCallback.bind(this), this.orderUpdateCallback = this.orderUpdateCallback.bind(this), this.basketsList = [], this.currentBasketId = null, this.currentBasketStockId = null, this.selectedBasketIds = [], this.stockSearchOptions = [], this.recentSearchList = [], this.popularSearchList = [], this.basketQuotesSupplierUniqueId = FyTrade.helper.createGuid("bqsu_"), this.recentSearchQuotesSupplierUniqueId = FyTrade.helper.createGuid("rsqsu_")
                            }
                            async renderBasketsList() {
                                const e = await TradeModules.basketWindow.service.getBasketsList();
                                e && 200 === e.code && (this.basketsList = e.data, TradeModules.basketWindow.handler.renderBasketListTable())
                            }
                            renderBasketDetailsPage(e) {
                                TradeModules.basketWindow.handler.renderBasketDetailsParent(e), TradeModules.basketWindow.events.attachBasketDetailsPageListeners(), TradeModules.basketWindow.handler.refreshBasketHeaderDetails(), TradeModules.basketWindow.events.enableBasketItemsDrag(), this.subscribeBasketStocksLTP(), TradeModules.basketWindow.handler.cancelMultiBasketSelection(), TradeModules.basketWindow.handler.closeAddBasketPopup(), this.displayNotificationForExpiredScripts()
                            }
                            async addSelectedStockToBasket(e) {
                                let t = 1;
                                const r = this.stockSearchOptions.filter((t => t.sym_token === e)),
                                    a = r[0].symbol,
                                    i = {
                                        recent_search: [a]
                                    };
                                optionChain.optiondata.updateRecentSearchAPI(i);
                                const s = r[0].type,
                                    o = datafeed.unzippedData.data[a];
                                "Options" !== s && "Futures" !== s || (t = FyTrade.helper.getSymbolMasterValue(o, "min_lot_size"));
                                const n = TradeModules.basketWindow.helper.replaceAll("&", "%26", a),
                                    d = await TradeModules.basketWindow.service.getStockQuotes(n);
                                if (200 === d.code && "ok" === d.s) {
                                    const e = d.d[0].v;
                                    let r = {
                                        duration: void 0,
                                        limitPrice: e.lp,
                                        price: e.lp,
                                        qty: t,
                                        side: 1,
                                        symbol: a,
                                        type: 2,
                                        source: "BASKET"
                                    };
                                    TradeModules.basketWindow.handler.hideInstrumentSearchPopup(), orderWindow.order.initPlaceOrder(r, this.orderPlaceCallback, tradingContext);
                                    const i = this.basketsList.find((e => e.id === this.currentBasketId));
                                    i ? (document.getElementById("basket-order-check").checked = !0, $("#basketName").text(i.name), document.getElementById("bracketOrderSection").style.pointerEvents = "none") : ($("#basketName").text("Basket Order"), document.getElementById("basket-order-check").checked = !1, document.getElementById("bracketOrderSection").style.pointerEvents = "all"), $("#buyButton").text(`Add ${orderWindow.orderData.quantityConverted} Qty`)
                                }
                            }
                            async orderPlaceCallback(e) {
                                document.getElementById("buyButton").disabled = !1, e.limitPrice = e.limitPrice ? e.limitPrice : 0;
                                const t = FyTrade.place.formatOrder(e);
                                if (orderWindow.owCancelFlag = !0, orderWindow.events.handleOrderWindowHide(), t) {
                                    const e = {
                                        symbol: t.symbol,
                                        qty: t.qty,
                                        side: t.side,
                                        limitPrice: t.limitPrice ? t.limitPrice : 0,
                                        stopPrice: t.stopPrice ? t.stopPrice : 0,
                                        productType: t.productType,
                                        type: t.type,
                                        disclosedQty: t.disclosedQty ? t.disclosedQty : 0,
                                        validity: t.validity ? t.validity : "",
                                        offlineOrder: t.offlineOrder ? t.offlineOrder : "false",
                                        stopLoss: t.stopLoss ? t.stopLoss : 0,
                                        takeProfit: t.takeProfit ? t.takeProfit : 0
                                    };
                                    this.addNewStockToBasket(e)
                                }
                            }
                            async updateExistingStockInBasket(e) {
                                this.currentBasketStockId = e;
                                const t = TradeModules.basketWindow.controller.basketsList.find((e => e.id === TradeModules.basketWindow.controller.currentBasketId)),
                                    r = t.items.find((t => t.id === e));
                                if (r) {
                                    const e = TradeModules.basketWindow.helper.replaceAll("&", "%26", r.params.symbol),
                                        a = await TradeModules.basketWindow.service.getStockQuotes(e);
                                    if ("ok" === a.s) {
                                        const e = a.d[0].v,
                                            i = { ...r.params,
                                                id: r.id,
                                                orderValidity: r.params.validity,
                                                remainingQuantity: r.params.qty,
                                                dqQtyRem: r.params.disclosedQty,
                                                price_loss: r.params.stopLoss ? r.params.stopLoss : 0,
                                                source: "BASKET"
                                            };
                                        if (i.limitPrice = r.params.limitPrice ? r.params.limitPrice : e.lp, i.price = e.lp, orderWindow.order.initModifyOrder(i, this.orderUpdateCallback, "", tradingContext), $("#stopLoss").val(parseFloat($("#stopLoss").val()).toFixed(2)), orderWindow.commonEventHandler.enableModifyOrderFields(), this.basketsList.length && this.currentBasketId) {
                                            const e = t.name;
                                            document.getElementById("basket-order-check").checked = !0, $("#basketName").text(e), document.getElementById("bracketOrderSection").style.pointerEvents = "none"
                                        } else $("#basketName").text("Basket Order"), document.getElementById("basket-order-check").checked = !1, document.getElementById("bracketOrderSection").style.pointerEvents = "all", basketorderFlag = !1;
                                        $("#buyButton").text(`Modify ${orderWindow.orderData.quantityConverted} Qty`), orderWindow.common.handleMarginOptions(i), orderObj.hasOwnProperty("orderValidity") && orderWindow.common.displayUserSelectedvalidity(i.orderValidity)
                                    }
                                }
                            }
                            async orderUpdateCallback(e) {
                                if (orderWindow.order.orderStatus("completed"), orderWindow.owCancelFlag = !0, orderWindow.events.handleOrderWindowHide(), document.getElementById("buyButton").disabled = !1, e) {
                                    const t = {
                                            symbol: e.symbol,
                                            qty: e.qty,
                                            side: e.side,
                                            limitPrice: e.limitPrice ? e.limitPrice : 0,
                                            stopPrice: e.stopPrice ? e.stopPrice : 0,
                                            productType: e.productType,
                                            type: e.type,
                                            disclosedQty: e.disclosedQty ? e.disclosedQty : 0,
                                            validity: e.validity ? e.validity : "DAY",
                                            offlineOrder: e.offlineOrder ? e.offlineOrder : "false",
                                            stopLoss: e.stopLoss ? e.stopLoss : 0,
                                            takeProfit: e.takeProfit ? e.takeProfit : 0
                                        },
                                        r = {
                                            basketid: this.currentBasketId,
                                            itemid: this.currentBasketStockId,
                                            params: t
                                        };
                                    try {
                                        const e = await TradeModules.basketWindow.service.updateSelectedBasketItem(r);
                                        "ok" === e.s ? (this.basketsList = e.data, this.renderBasketDetailsPage(this.currentBasketId), FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.success, "Success", `Successfully modified instrument ${t.symbol}`)) : TradeModules.basketWindow.helper.destructureApiErrorAndShowToaster(e)
                                    } catch (e) {
                                        console.log("Failed to modify instrument:", e), FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.error, "Error", "Failed to modify instrument. Please try again")
                                    }
                                }
                            }
                            async addNewStockToBasket(e) {
                                const t = await TradeModules.basketWindow.service.addNewStockToBasket(this.currentBasketId, e);
                                if ("ok" === t.s) {
                                    this.basketsList = t.data, setTimeout((function() {
                                        orderWindow.order.orderStatus("completed")
                                    }), 250), this.renderBasketDetailsPage(this.currentBasketId);
                                    const r = 1 === e.side ? "BUY" : "SELL";
                                    TradeModules.basketWindow.handler.resizeSearchToSmall();
                                    const a = e.symbol + " " + r + " " + e.qty + " Qty";
                                    FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.success, "Added in Basket", a)
                                } else TradeModules.basketWindow.helper.destructureApiErrorAndShowToaster(t)
                            }
                            async deleteStockFromBasket(e) {
                                try {
                                    const t = TradeModules.basketWindow.helper.getSelectedBasketDetails().items.find((t => t.id === e)),
                                        r = await TradeModules.basketWindow.service.deleteStockFromBasket(this.currentBasketId, e);
                                    "ok" === r.s ? (this.basketsList = r.data, this.renderBasketDetailsPage(this.currentBasketId), FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.success, "Success", `Successfully deleted instrument ${t.params.symbol}`)) : (TradeModules.basketWindow.helper.destructureApiErrorAndShowToaster(r), TradeModules.basketWindow.handler.enableBasketItemActions(`tr[data-item-id="${e}"]`))
                                } catch (t) {
                                    console.log("Failed to delete instrument:", t), FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.error, "Error", "Failed to delete instrument from basket. Please try again"), TradeModules.basketWindow.handler.enableBasketItemActions(`tr[data-item-id="${e}"]`)
                                }
                            }
                            async cloneStockFromBasket(e) {
                                const t = this.basketsList.find((e => e.id === this.currentBasketId));
                                if (t) {
                                    const r = t.items.find((t => t.id === e));
                                    if (r.params) try {
                                        const e = await TradeModules.basketWindow.service.addNewStockToBasket(this.currentBasketId, r.params);
                                        "ok" === e.s ? (this.basketsList = e.data, this.renderBasketDetailsPage(this.currentBasketId), FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.success, "Success", `Successfully created clone of instrument ${r.params.symbol}`)) : TradeModules.basketWindow.helper.destructureApiErrorAndShowToaster(e)
                                    } catch (e) {
                                        console.log("Failed to create clone:", e), FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.error, "Error", "Failed to create clone. Please try again")
                                    }
                                }
                            }
                            async executeSingleBasketOrder() {
                                const e = await TradeModules.basketWindow.service.executeSingleBasketOrder();
                                "ok" === e.s ? (this.basketsList = e.data, this.renderBasketDetailsPage(this.currentBasketId)) : TradeModules.basketWindow.helper.destructureApiErrorAndShowToaster(e)
                            }
                            async deleteBasket(e) {
                                try {
                                    const t = await TradeModules.basketWindow.service.deleteSingleBasket(e);
                                    "ok" === t.s ? (this.basketsList = t.data, this.renderBasketsList(), TradeModules.basketWindow.handler.cancelMultiBasketSelection(), FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.success, "Success", "Successfully deleted basket")) : (TradeModules.basketWindow.helper.destructureApiErrorAndShowToaster(t), TradeModules.basketWindow.handler.enableBasketItemActions(`tr[data-id="${e}"]`))
                                } catch (t) {
                                    console.log("Failed to delete basket:", t), FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.error, "Error", "Failed to delete basket. Please try again"), TradeModules.basketWindow.handler.enableBasketItemActions(`tr[data-id="${e}"]`)
                                }
                            }
                            async resetSelectedBasket() {
                                const e = await TradeModules.basketWindow.service.resetSelectedBasket(this.currentBasketId);
                                "ok" === e.s ? (this.basketsList = e.data, this.renderBasketDetailsPage(this.currentBasketId)) : TradeModules.basketWindow.helper.destructureApiErrorAndShowToaster(e)
                            }
                            async updateMarginData() {
                                $("#bwMarginRequiredText").html('<span class="bw-rupee-symbol">₹0</span>'), $("#bwMarginAvailableText").html('<span class="bw-rupee-symbol">₹0</span>');
                                const e = await TradeModules.basketWindow.service.getMarginData(this.currentBasketId);
                                if ("ok" === e.s) {
                                    $("#bwMarginContent").html(TradeModules.basketWindow.modal.getMarginRequiredAvailableHTML());
                                    const t = e.data.margin_total || 0,
                                        r = e.data.margin_avail || 0,
                                        a = TradeModules.basketWindow.helper.getBwProfitOrLossClass(r),
                                        i = r.toLocaleString("en-IN", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        }),
                                        s = t.toLocaleString("en-IN", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        });
                                    $("#bwMarginRequiredText").html(`<span><span class="bw-rupee-symbol">₹</span>${s}</span>`), $("#bwMarginAvailableText").html(`<span class="${a}"><span class="bw-rupee-symbol">₹</span>${i}</span>`)
                                } else $("#bwMarginContent").html("<span class='bw-margin-error'>Something went wrong. Click on refresh to reload the margin data.</span>")
                            }
                            async renameSelectedBasket(e) {
                                if (e) {
                                    const t = {
                                            basketid: this.currentBasketId,
                                            name: e
                                        },
                                        r = await TradeModules.basketWindow.service.updateSelectedBasket(t);
                                    "ok" === r.s ? (this.basketsList = r.data, this.renderBasketDetailsPage(this.currentBasketId)) : TradeModules.basketWindow.helper.destructureApiErrorAndShowToaster(r)
                                }
                            }
                            displayMultiBasketConfirmation() {
                                const e = TradeModules.basketWindow.modal.getMultiBasketConfirmationHTML();
                                $("#bwMultiBasketConfirmModal").length || ($(document.body).append(e), TradeModules.basketWindow.events.attachMultibasketListeners(), orderWindow.theme.applyTheme())
                            }
                            closeMultiBasketConfirmation() {
                                $("#bwMultiBasketConfirmModal").remove(), TradeModules.basketWindow.events.removeMultiBasketEventListeners()
                            }
                            resetSelectedBasketAndUnsubscribe() {
                                this.currentBasketId = null, FyTrade.unsubscribeQuotesRtData(this.basketQuotesSupplierUniqueId), FyTrade.unsubscribeQuotesRtData(this.recentSearchQuotesSupplierUniqueId)
                            }
                            subscribeBasketStocksLTP() {
                                let e = [];
                                if (FyTrade.unsubscribeQuotesRtData(this.basketQuotesSupplierUniqueId), this.currentBasketId) {
                                    const t = this.basketsList.find((e => e.id === this.currentBasketId)),
                                        r = new Set;
                                    for (const a of t.items) r.has(a.params.symbol) || (r.add(a.params.symbol), e.push(a.params.symbol));
                                    FyTrade.subscribeQuotesRtData(e, e, this.subscribeBasketStocksLTPCallback, this.basketQuotesSupplierUniqueId)
                                }
                            }
                            subscribeBasketStocksLTPCallback(e) {
                                TradeModules.basketWindow.helper.replaceDOMElementWithLTP(e, ".bwBasketDetailsLTP", "bw-basket-details-ltp-live-wrapper", !1)
                            }
                            subscribeRecentSearchLTP() {
                                let e = [];
                                FyTrade.unsubscribeQuotesRtData(this.recentSearchQuotesSupplierUniqueId), this.recentSearchList.length && (e = this.recentSearchList.map((e => e.symbol)), FyTrade.subscribeQuotesRtData(e, e, this.subscribeRecentSearchLTPCallback, this.recentSearchQuotesSupplierUniqueId))
                            }
                            subscribeRecentSearchLTPCallback(e) {
                                TradeModules.basketWindow.helper.replaceDOMElementWithLTP(e, ".bwInstrumentSearchLTP", "bw-recent-search-ltp-live-wrapper", !0)
                            }
                            async displayNotificationForExpiredScripts() {
                                const e = TradeModules.basketWindow.helper.getSelectedBasketDetails();
                                if (e && e.message) {
                                    const t = e.message || "";
                                    FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.info, "Basket Updated", t);
                                    const r = {
                                        basketid: e.id
                                    };
                                    try {
                                        await TradeModules.basketWindow.service.updateSelectedBasketAsOpened(r)
                                    } catch (e) {
                                        console.log("Failed to mark basket as opened:", e)
                                    } finally {
                                        this.updateMarginData()
                                    }
                                } else this.updateMarginData()
                            }
                        }, this.helper = new class {
                            getBasketName(e = TradeModules.basketWindow.controller.basketsList.length) {
                                const t = `Basket ${e+1}`;
                                return TradeModules.basketWindow.controller.basketsList.some((e => e.name === t)) ? this.getBasketName(e + 1) : t
                            }
                            getSelectedBasketDetails() {
                                return TradeModules.basketWindow.controller.basketsList.find((e => e.id === TradeModules.basketWindow.controller.currentBasketId))
                            }
                            getBasketOrderStatusClass(e) {
                                if (e) return -1 === e ? "bw-order-failed" : 1 === e ? "bw-order-success" : 2 === e ? "bw-order-processing" : ""
                            }
                            replaceAll(e, t, r) {
                                return r.split(e).join(t)
                            }
                            removeSpecialCharactersFromSymbol(e) {
                                return e.replace(/[^\w\s-]/g, "")
                            }
                            replaceDOMElementWithLTP(e, t, r, a) {
                                if (e)
                                    for (const i in e) {
                                        const s = e[i],
                                            o = `${t}-${this.removeSpecialCharactersFromSymbol(s.symbol)}`;
                                        if ($(o) && $(o).length && s.v ? .lp) {
                                            let e = !0;
                                            const t = $(o).find(".bw-ltp-value");
                                            if (t && t.text() === this.roundOffTo2DecimalPlaces(s.v.lp) && (e = !1), e) {
                                                const e = this.roundOffTo2DecimalPlaces(s.v.lp) || 0,
                                                    t = this.roundOffTo2DecimalPlaces(s.v.ch) || 0,
                                                    i = this.roundOffTo2DecimalPlaces(s.v.chp) || 0;
                                                let n = "";
                                                const d = this.getBwProfitOrLossClass(s.v.chp),
                                                    l = s.v.chp > 0 ? "https://assets.fyers.in/global-components/trade-icons/widgets/ltpUpArrow.svg" : s.v.chp < 0 ? "https://assets.fyers.in/global-components/trade-icons/widgets/ltpDownArrow.svg" : "",
                                                    c = l ? `<img src="${l}"/>` : "";
                                                n = a ? `\n              <div class="${r} ${d}">\n                <span class="live-ltp-element"><span class="bw-ltp-value">${e}</span> <span class="bw-live-ltp-container">${c}</span></span>\n                <span class="live-price-element">${t} (${i}%)\n                </span>\n              </div>` : `<div class="${r} ${d}"><span class="live-ltp-element"><span class="bw-ltp-value">${e}</span><span class="bw-live-ltp-container"> ${c}</span></span></div>`, $(o).html(n)
                                            }
                                        }
                                    }
                            }
                            getBwProfitOrLossClass(e) {
                                return e > 0 ? "bw-profit" : e < 0 ? "bw-loss" : "bw-breakeven"
                            }
                            roundOffTo2DecimalPlaces(e) {
                                return parseFloat(e).toFixed(2)
                            }
                            destructureApiErrorAndShowToaster(e) {
                                e.message ? FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.error, "Error", e.message) : FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.error, "Error", "Something went wrong. Please contact support")
                            }
                            truncateText(e, t) {
                                const r = String(e) || "";
                                return r.length <= t ? r : r.substring(0, t) + "..."
                            }
                            getSymbolWithoutExchange(e) {
                                if (e) {
                                    const t = e.split(":");
                                    return t[1] ? t[1] : e
                                }
                                return console.log("Error: Symbol not passed in getSymbolWithoutExchange"), ""
                            }
                        }
                    }
                    addBasketWindowWrapper() {
                        this.handler.addBasketWindowWrapper()
                    }
                    openBasketWindow() {
                        this.handler.openBasketWindow()
                    }
                }, this.exitPositionWindow = new class {
                    constructor() {
                        this.modal = new tt, this.cancelOrderModal = new rt, this.service = new ot, this.events = new et, this.handler = new Xe, this.controller = new Ze, this.CancelOrderService = new it, this.CancelOrderController = new st, this.CancelOrderEventHandler = new dt
                    }
                    addExitPositionWindowWrapper() {
                        this.handler.addExitPositionWrapper()
                    }
                    openExitPositionWindow() {
                        this.handler.openExitPositionWindow()
                    }
                }, this.SmartOrders = new lt, this.gtt = new class {
                    constructor() {
                        this.helper = new class {
                            handleGttToOldOwTransition() {
                                $("#scheduleField").removeClass("d-none"), $("#orderTypeRow").removeClass("d-none"), $("#inputFieldsSectionOw").removeClass("d-none"), $("#nonBSESection").removeClass("d-none"), $(".orderWindowModalAlerts").addClass("d-block").removeClass("d-none"), $("#os_info").removeClass("d-none"), $(".orderwindow-body .line-break").removeClass("d-none"), this.showOwBootomFooter(), this.showShowMoreContents(), this.destroyGttWindow(), this.removeGttAlerts()
                            }
                            handleOldOwToGttTransition() {
                                $("#scheduleField").addClass("d-none"), $("#orderTypeRow").addClass("d-none"), $("#inputFieldsSectionOw").addClass("d-none"), $("#nonBSESection").addClass("d-none"), $("#smartOrdersParentContainer").removeClass("d-none").addClass("so_parentContainer"), $(".orderWindowModalAlerts").addClass("d-none").removeClass("d-block"), $("#os_info").addClass("d-none"), $(".orderwindow-body .line-break").addClass("d-none"), $(".so_parentContainer").addClass("d-none"), this.hideOwBootomFooter(), this.hideShowMoreContents(), this.displayGttAlerts(), $("#setting-icon-container").removeClass("d-none")
                            }
                            hideOwBootomFooter() {
                                $(".orderwindow-footer").addClass("d-none").removeClass("d-block")
                            }
                            showOwBootomFooter() {
                                $(".orderwindow-footer").removeClass("d-none").addClass("d-block")
                            }
                            hideShowMoreContents() {
                                $("#showMoreContainer").addClass("d-none")
                            }
                            showShowMoreContents() {
                                $("#showMoreContainer").removeClass("d-none")
                            }
                            destroyGttWindow() {
                                $("#gtt-order-parent-container").html("")
                            }
                            displayGttAlerts() {
                                $("#gttOrderAlerts").removeClass("d-none"), TradeModules.gtt.customAlerts.renderAlertsOnOrderWindow("#gttOrderAlerts")
                            }
                            removeGttAlerts() {
                                $("#gttOrderAlerts").addClass("d-none"), $("#gttOrderAlerts").html("")
                            }
                            getInputField(e, t, r, a, i, s, o, n, d) {
                                return `\n        <label id="lot-size-item-label" class="has-float-label mr-3 gtt-order-main-input-label">\n            <input type="number" id="${e}" step="${t}" name="${r}" width="100%" class="${a} ${n?"gtt-order-input-field-with-percent":""}" placeholder="${i}" onkeypress="${s}" min="0">\n            <span id="lot-size-item" class="input-content us-label-names" for="${r}">\n                ${o}\n                ${d?`<span class="gtt-order-input-field-top-text">(${d} ${t})</span>`:""}\n            </span>\n            ${n?`<span id="${e}PercentText" class="gtt-order-percent-display">0.00%</span>`:""}\n        </label>\n    `
                            }
                            getLineSeperator() {
                                return '\n      <div class="gtt-order-separator">\n        <hr class="breaker-hr">\n      </div>\n  '
                            }
                            hideOrShowInputField(e, t) {
                                var r = $(e);
                                const a = $("#order-window-modal-content").hasClass("order-window-modal-content-mm");
                                orderWindow.theme.applyInputFieldTheme(a ? "dark" : "light", !t, r)
                            }
                            getLtp() {
                                let e = 0;
                                const t = this.getSelectedSymbol(),
                                    r = FyTrade.data.symbolPriceDict[t] || {};
                                return e = r.v ? .lp ? r.v.lp : ie.getLtpPrice() || 0, e
                            }
                            adjustByTwoPercent(e, t = !0) {
                                const r = orderWindow.orderData.pricechange.countDecimals();
                                return t ? this.roundToTickSize(e - .02 * e).toFixed(r || 2) : this.roundToTickSize(e + .02 * e).toFixed(r || 2)
                            }
                            roundToTickSize(e) {
                                try {
                                    let t = this.getSelectedSymbol(),
                                        r = datafeed.unzippedData.data[t],
                                        a = FyTrade.helper.getSymbolMasterValue(r, "tick_size");
                                    return Math.round(e / a) * a
                                } catch (t) {
                                    return .05 * Math.round(e / .05)
                                }
                            }
                            getSelectedSymbol() {
                                return orderWindow.orderData.selectedSymbol || ""
                            }
                            getSelectedSymbolTickSize() {
                                return orderWindow.orderData.pricechange || 0
                            }
                            getDateOneYearFromToday() {
                                let e = new Date,
                                    t = new Date(e.setFullYear(e.getFullYear() + 1)),
                                    r = t.getDate(),
                                    a = t.getMonth() + 1;
                                return r < 10 && (r = "0" + r), a < 10 && (a = "0" + a), `${r}-${a}-${t.getFullYear()}`
                            }
                            isOrderWindowSell() {
                                return $("#orderwin-header").hasClass("sell")
                            }
                            isGttTabSelected() {
                                return $("#gtt-order_toggle")[0].classList.contains("toggle-button-active")
                            }
                            getGttPriceAndQty(e = !1) {
                                let t = {
                                    price: 0,
                                    qty: 0
                                };
                                if (this.isSingleTriggerChecked()) {
                                    const r = e ? "#gttSingleOrderPriceField" : "#gttSingleOrderTriggerPriceField";
                                    t.price = parseFloat($(r).val() || 0), t.qty = parseInt($("#gttSingleOrderQtyField").val() || 0)
                                } else if (this.isAdvancedOcoChecked()) {
                                    const r = e ? "#gttOcoAdvancedPriceField1" : "#gttOcoAdvancedTriggerPriceField1",
                                        a = e ? "#gttOcoAdvancedPriceField2" : "#gttOcoAdvancedTriggerPriceField2",
                                        i = "#gttOcoAdvancedQtyField1",
                                        s = "#gttOcoAdvancedQtyField2";
                                    $(r).val() && $(a).val() && (e ? $(i).val() * parseFloat($(r).val()) > $(s).val() * parseFloat($(a).val()) ? (t.price = parseFloat($(r).val() || 0), t.qty = parseInt($(i).val() || 0)) : (t.price = parseFloat($(a).val() || 0), t.qty = parseInt($(s).val() || 0)) : parseFloat($(r).val()) > parseFloat($(a).val()) ? (t.price = parseFloat($(r).val()), t.qty = parseInt($(i).val() || 0)) : (t.price = parseFloat($(a).val()), t.qty = parseInt($(s).val() || 0)))
                                } else {
                                    const r = e ? "#gttOcoNormalPriceField1" : "#gttOcoNormalTriggerPriceField1",
                                        a = e ? "#gttOcoNormalPriceField2" : "#gttOcoNormalTriggerPriceField2",
                                        i = "#gttOcoNormalQtyField";
                                    $(r).val() && $(a).val() && (e ? (t.qty = parseInt($(i).val() || 0), t.price = $(r).val() > $(a).val() ? parseFloat($(r).val()) : parseFloat($(a).val())) : (parseFloat($(r).val()) > parseFloat($(a).val()) ? t.price = parseFloat($(r).val()) : t.price = parseFloat($(a).val()), t.qty = parseInt($(i).val() || 0)))
                                }
                                return t
                            }
                            isSingleTriggerChecked() {
                                return $("#gttOrderSingleTriggercheck").is(":checked")
                            }
                            isAdvancedOcoChecked() {
                                return $("#gttOrderOcoAdvancedToggle").is(":checked")
                            }
                            calculateProfitPercentage(e, t, r = !1) {
                                let a, i;
                                return "" === t ? "" : (a = r ? (t - e) / e * 100 : (e - t) / e * 100, isNaN(a) && (a = "0.00"), i = parseFloat(a).toFixed(2), `${i}%`)
                            }
                            addErrorField(e) {
                                const t = $(e);
                                t.hasClass("input-field-error") || t.addClass("input-field-error")
                            }
                            removeErrorField(e) {
                                $(e).removeClass("input-field-error")
                            }
                            checkMultipleOfStep(e, t) {
                                const r = this.getFieldStepSize(t);
                                return parseFloat(e / r)
                            }
                            getFieldStepSize(e) {
                                return parseFloat($(e).prop("step"))
                            }
                            isSingleOrder(e) {
                                return 1 === e.gtt_oco_ind
                            }
                            hideOrderWindow() {
                                1 !== orderWindow.userSettingsData.orderWindow.stickyOrderwindow && (orderWindow.events.triggerOrderWindowHide(), orderWindow.owCancelFlag = !1)
                            }
                        }, this.events = new class {
                            toggleGttOrder(e) {
                                e || (TradeModules.gtt.handler.isModifyOrder = !1), TradeModules.gtt.handler.toggleGttOrder()
                            }
                            attachTriggerToggleEvents() {
                                $("#gttOrderWindowHide").unbind().on("click", (function() {
                                    orderWindow.events.handleOrderWindowHide()
                                })), $("#gttOrderSingleTriggercheck").unbind().click((function() {
                                    TradeModules.gtt.handler.renderSingleTriggerSelection(), $(this).is(":checked") && TradeModules.gtt.handler.handleSingleCheckboxSelection()
                                })), $("#gttOrderOcoTriggercheck").unbind().click((function() {
                                    TradeModules.gtt.handler.renderOcoTriggerSelection(), $(this).is(":checked") && TradeModules.gtt.handler.handleOcoCheckboxSelection()
                                })), $("#gttOrderCreateButton").unbind().click((function() {
                                    TradeModules.gtt.handler.placeGttOrder()
                                })), $("#gttOrderCancelButton").unbind().click((function(e) {
                                    e.stopPropagation(), orderWindow.orderData.exeOrder = !1, orderWindow.owCancelFlag = !0, window.closeWidgets(), orderWindow.events.handleOrderWindowHide()
                                })), orderWindow.handler.attachPriceBreakupEvents()
                            }
                            attachSingleHandlers() {
                                $("#gttSingleOrderQtyField, #gttSingleOrderPriceField, #gttSingleOrderTriggerPriceField").unbind().on("input", (function(e) {
                                    TradeModules.gtt.handler.storeFieldValues(e), TradeModules.gtt.handler.validateFields(), TradeModules.gtt.handler.calculateSingleFieldPercents(), orderWindow.handler.refreshPriceBreakup()
                                })), $("#gttOrderMarketDepth").unbind().on("click", (function() {
                                    window.loadMarketDepth(window.orderWindow.orderData.selectedSymbol, "OW")
                                }))
                            }
                            attachOcoHandlers() {
                                $("#gttOrderOcoAdvancedToggle").unbind().on("change", TradeModules.gtt.handler.handleAdvancedOcoToggle), $("#gttOrderOcoAdvancedText").unbind().click((function() {
                                    $("#gttOrderOcoAdvancedToggle").click()
                                })), $("#gttOcoNormalQtyField").unbind().on("input", (function(e) {
                                    TradeModules.gtt.handler.storeFieldValues(e), TradeModules.gtt.handler.validateFields(), orderWindow.handler.refreshPriceBreakup()
                                })), $("#gttOrderMarketDepth").unbind().on("click", (function() {
                                    window.loadMarketDepth(window.orderWindow.orderData.selectedSymbol, "OW")
                                })), $("#ocoAdvancedCheck_icon").unbind("mouseover").mouseover((function() {
                                    orderWindow.events.toolTipComponent("#ocoAdvancedCheck_icon", orderWindow.owModal.customToolTip("Advanced OCO Order", "Specify a distinct quantity for the target & stop loss leg.", ""))
                                }))
                            }
                            attachNormalOcoHandlers() {
                                $("#gttOcoNormalPriceField1, #gttOcoNormalPriceField2, #gttOcoNormalTriggerPriceField1, #gttOcoNormalTriggerPriceField2").unbind().on("input", (function(e) {
                                    TradeModules.gtt.handler.validateFields(), TradeModules.gtt.handler.calculateNormalOcoFieldPercents(), orderWindow.handler.refreshPriceBreakup(), TradeModules.gtt.handler.storeFieldValues(e)
                                }))
                            }
                            attachAdvancedOcoHandlers() {
                                $("#gttOcoAdvancedQtyField1, #gttOcoAdvancedQtyField2, #gttOcoAdvancedPriceField1, #gttOcoAdvancedPriceField2, #gttOcoAdvancedTriggerPriceField1, #gttOcoAdvancedTriggerPriceField2").unbind().on("input", (function(e) {
                                    TradeModules.gtt.handler.validateFields(), TradeModules.gtt.handler.calculateAdvancedOcoFieldPercents(), orderWindow.handler.refreshPriceBreakup(), TradeModules.gtt.handler.storeFieldValues(e)
                                }))
                            }
                            attachAlertHandlers() {
                                $("#gttOrderAcknowledgementCheck").unbind().on("change", (e => {
                                    e.target.checked ? TradeModules.gtt.handler.isAcknowledged = !0 : TradeModules.gtt.handler.isAcknowledged = !1, TradeModules.gtt.handler.validateFields()
                                })), $("#fyCustomAlertNextBtn").unbind().click((function() {
                                    TradeModules.gtt.customAlerts.displayNextAlert()
                                }))
                            }
                            attachModifyOrderHandlers() {
                                $("#gttOrderCreateButton").unbind().click((function() {
                                    TradeModules.gtt.handler.modifyGttOrder()
                                })), $("#ocoAdvancedCheck_icon").unbind("mouseover").mouseover((function() {
                                    orderWindow.events.toolTipComponent("#ocoAdvancedCheck_icon", orderWindow.owModal.customToolTip("Advanced OCO Order", "Specify a distinct quantity for the target & stop loss leg.", ""))
                                }))
                            }
                        }, this.handler = new class {
                            constructor() {
                                this.isAcknowledged = !1, this.isModifyOrder = !1, this.userInputFieldValues = {}
                            }
                            placeGttOrder() {
                                $("#gttOrderCreateButton").prop("disabled", !0), TradeModules.gtt.helper.hideOrderWindow();
                                const e = this.getGttPayload();
                                TradeModules.gtt.service.createGttOrder(e)
                            }
                            getGttPayload() {
                                const e = $("#gttOrderSingleTriggercheck").is(":checked");
                                let t = {
                                    side: "buy" === orderWindow.orderData.selectedSide ? 1 : -1,
                                    symbol: orderWindow.orderData.selectedSymbol
                                };
                                if ($("#mtf-check").prop("checked") && (t.productType = "MTF"), e) t.orderInfo = {
                                    leg1: {
                                        price: Number($("#gttSingleOrderPriceField").val()) ? ? 0,
                                        triggerPrice: Number($("#gttSingleOrderTriggerPriceField").val()) ? ? 0,
                                        qty: Number($("#gttSingleOrderQtyField").val()) ? ? 0
                                    }
                                };
                                else {
                                    const e = $("#gttOrderOcoAdvancedToggle").is(":checked");
                                    t.orderInfo = e ? {
                                        leg1: {
                                            price: Number($("#gttOcoAdvancedPriceField1").val()) ? ? 0,
                                            triggerPrice: Number($("#gttOcoAdvancedTriggerPriceField1").val()) ? ? 0,
                                            qty: Number($("#gttOcoAdvancedQtyField1").val()) ? ? 0
                                        },
                                        leg2: {
                                            price: Number($("#gttOcoAdvancedPriceField2").val()) ? ? 0,
                                            triggerPrice: Number($("#gttOcoAdvancedTriggerPriceField2").val()) ? ? 0,
                                            qty: Number($("#gttOcoAdvancedQtyField2").val()) ? ? 0
                                        }
                                    } : {
                                        leg1: {
                                            price: Number($("#gttOcoNormalPriceField1").val()) ? ? 0,
                                            triggerPrice: Number($("#gttOcoNormalTriggerPriceField1").val()) ? ? 0,
                                            qty: Number($("#gttOcoNormalQtyField").val()) ? ? 0
                                        },
                                        leg2: {
                                            price: Number($("#gttOcoNormalPriceField2").val()) ? ? 0,
                                            triggerPrice: Number($("#gttOcoNormalTriggerPriceField2").val()) ? ? 0,
                                            qty: Number($("#gttOcoNormalQtyField").val()) ? ? 0
                                        }
                                    }
                                }
                                return t
                            }
                            modifyGttOrder() {
                                $("#gttOrderCreateButton").prop("disabled", !0), TradeModules.gtt.helper.hideOrderWindow();
                                const e = this.getGttPayload(),
                                    t = {
                                        id: FyTrade.broker.gtt._selectedModifyGttOrder,
                                        orderInfo: e.orderInfo
                                    };
                                TradeModules.gtt.service.updateGttOrder(t)
                            }
                            cancelGttOrder(e) {
                                TradeModules.gtt.service.deleteGttOrder(e)
                            }
                            toggleGttOrder() {
                                $("#gtt-order-parent-container").children().length <= 0 && (TradeModules.gtt.helper.handleOldOwToGttTransition(), this.renderGttHTML())
                            }
                            renderGttHTML() {
                                this.isAcknowledged = !1;
                                const e = TradeModules.gtt.modal.getGttOrderContainer();
                                $("#gtt-order-parent-container").html(e), TradeModules.gtt.events.attachTriggerToggleEvents(), TradeModules.gtt.handler.renderSingleTriggerSelection(), TradeModules.gtt.handler.validateFields()
                            }
                            renderSingleTriggerSelection() {
                                $("#gttOrderOcoToggle").prop("checked", !1), $("#gttOrderSingleTriggercheck").prop("checked", !0);
                                const e = TradeModules.gtt.modal.getSingleTriggerHTML();
                                $("#gttOrderBody").html(e), TradeModules.gtt.events.attachSingleHandlers(), this.prefillDefaultInitialValues(), TradeModules.gtt.customAlerts.clearExistingAlerts(), this.validateFields(), TradeModules.gtt.customAlerts.renderAlertsOnOrderWindow("#gttOrderAlerts"), this.applyTheme(), orderWindow.customPolyfills.preventNegativeNumbers()
                            }
                            renderOcoTriggerSelection() {
                                $("#gttOrderSingleTriggercheck").prop("checked", !1), $("#gttOrderOcoTriggercheck").prop("checked", !0);
                                const e = TradeModules.gtt.modal.getOcoHTML();
                                $("#gttOrderBody").html(e), this.renderNormalOco(), TradeModules.gtt.events.attachOcoHandlers(), TradeModules.gtt.customAlerts.clearExistingAlerts(), this.validateFields(), TradeModules.gtt.customAlerts.renderAlertsOnOrderWindow("#gttOrderAlerts")
                            }
                            renderNormalOco() {
                                const e = TradeModules.gtt.modal.getNormalOcoHTML();
                                $("#gttOcoOrderBody").html(e), TradeModules.gtt.customAlerts.clearExistingAlerts(), this.prefillDefaultInitialValues(), this.validateFields(), TradeModules.gtt.customAlerts.renderAlertsOnOrderWindow("#gttOrderAlerts"), TradeModules.gtt.events.attachNormalOcoHandlers(), this.applyTheme(), orderWindow.customPolyfills.preventNegativeNumbers()
                            }
                            renderAdvancedOco() {
                                const e = TradeModules.gtt.modal.getAdvancedOcoHTML();
                                $("#gttOcoOrderBody").html(e), TradeModules.gtt.events.attachAdvancedOcoHandlers(), TradeModules.gtt.customAlerts.clearExistingAlerts(), this.prefillDefaultInitialValues(), this.validateFields(), TradeModules.gtt.customAlerts.renderAlertsOnOrderWindow("#gttOrderAlerts"), this.applyTheme(), orderWindow.customPolyfills.preventNegativeNumbers()
                            }
                            applyTheme() {
                                orderWindow.theme.applyTheme()
                            }
                            prefillDefaultInitialValues() {
                                TradeModules.gtt.helper.isSingleTriggerChecked() ? (this.prefillSingleOrderFieldValues(), this.calculateSingleFieldPercents()) : TradeModules.gtt.helper.isAdvancedOcoChecked() ? (this.prefillAdvancedOcoOrderFieldValues(), this.calculateAdvancedOcoFieldPercents()) : (this.prefillNormalOcoOrderFieldValues(), this.calculateNormalOcoFieldPercents())
                            }
                            calculateSingleFieldPercents() {
                                this.handleFieldPercentCalculation("#gttSingleOrderPriceField"), this.handleFieldPercentCalculation("#gttSingleOrderTriggerPriceField")
                            }
                            calculateNormalOcoFieldPercents() {
                                this.handleFieldPercentCalculation("#gttOcoNormalPriceField1", !0), this.handleFieldPercentCalculation("#gttOcoNormalPriceField2"), this.handleFieldPercentCalculation("#gttOcoNormalTriggerPriceField1", !0), this.handleFieldPercentCalculation("#gttOcoNormalTriggerPriceField2")
                            }
                            calculateAdvancedOcoFieldPercents() {
                                this.handleFieldPercentCalculation("#gttOcoAdvancedPriceField1", !0), this.handleFieldPercentCalculation("#gttOcoAdvancedPriceField2"), this.handleFieldPercentCalculation("#gttOcoAdvancedTriggerPriceField1", !0), this.handleFieldPercentCalculation("#gttOcoAdvancedTriggerPriceField2")
                            }
                            prefillSingleOrderFieldValues() {
                                const e = TradeModules.gtt.helper.getLtp(),
                                    t = orderWindow.orderData.selectedSide,
                                    r = R.getLotSize(),
                                    a = this.userInputFieldValues.qty || 0,
                                    i = this.userInputFieldValues.leg2Price || 0,
                                    s = this.userInputFieldValues.leg2TriggerPrice || 0;
                                if (a ? $("#gttSingleOrderQtyField").val(a) : r ? $("#gttSingleOrderQtyField").val(r) : $("#gttSingleOrderQtyField").val(1), "buy" === t) {
                                    const t = TradeModules.gtt.helper.adjustByTwoPercent(e);
                                    $("#gttSingleOrderPriceField").val(t), $("#gttSingleOrderTriggerPriceField").val(t)
                                } else {
                                    const t = TradeModules.gtt.helper.adjustByTwoPercent(e, !1);
                                    $("#gttSingleOrderPriceField").val(t), $("#gttSingleOrderTriggerPriceField").val(t)
                                }
                                i && $("#gttSingleOrderPriceField").val(i), s && $("#gttSingleOrderTriggerPriceField").val(s)
                            }
                            prefillNormalOcoOrderFieldValues() {
                                const e = TradeModules.gtt.helper.getLtp(),
                                    t = TradeModules.gtt.helper.adjustByTwoPercent(e),
                                    r = TradeModules.gtt.helper.adjustByTwoPercent(e, !1),
                                    a = R.getLotSize(),
                                    i = this.userInputFieldValues.qty || 0,
                                    s = this.userInputFieldValues.leg1Price || 0,
                                    o = this.userInputFieldValues.leg1TriggerPrice || 0,
                                    n = this.userInputFieldValues.leg2Price || 0,
                                    d = this.userInputFieldValues.leg2TriggerPrice || 0;
                                i ? $("#gttOcoNormalQtyField").val(i) : a ? $("#gttOcoNormalQtyField").val(a) : $("#gttOcoNormalQtyField").val(1), $("#gttOcoNormalPriceField1").val(r), $("#gttOcoNormalTriggerPriceField1").val(r), $("#gttOcoNormalPriceField2").val(t), $("#gttOcoNormalTriggerPriceField2").val(t), s && $("#gttOcoNormalPriceField1").val(s), o && $("#gttOcoNormalTriggerPriceField1").val(o), n && $("#gttOcoNormalPriceField2").val(n), d && $("#gttOcoNormalTriggerPriceField2").val(d)
                            }
                            prefillAdvancedOcoOrderFieldValues() {
                                const e = TradeModules.gtt.helper.getLtp(),
                                    t = TradeModules.gtt.helper.adjustByTwoPercent(e),
                                    r = TradeModules.gtt.helper.adjustByTwoPercent(e, !1),
                                    a = R.getLotSize(),
                                    i = this.userInputFieldValues.qty || 0,
                                    s = this.userInputFieldValues.leg1Price || 0,
                                    o = this.userInputFieldValues.leg1TriggerPrice || 0,
                                    n = this.userInputFieldValues.leg2Price || 0,
                                    d = this.userInputFieldValues.leg2TriggerPrice || 0;
                                i ? ($("#gttOcoAdvancedQtyField1").val(i), $("#gttOcoAdvancedQtyField2").val(i)) : a ? ($("#gttOcoAdvancedQtyField1").val(a), $("#gttOcoAdvancedQtyField2").val(a)) : ($("#gttOcoAdvancedQtyField1").val(1), $("#gttOcoAdvancedQtyField2").val(1)), $("#gttOcoAdvancedPriceField1").val(r), $("#gttOcoAdvancedTriggerPriceField1").val(r), $("#gttOcoAdvancedPriceField2").val(t), $("#gttOcoAdvancedTriggerPriceField2").val(t), s && $("#gttOcoAdvancedPriceField1").val(s), o && $("#gttOcoAdvancedTriggerPriceField1").val(o), n && $("#gttOcoAdvancedPriceField2").val(n), d && $("#gttOcoAdvancedTriggerPriceField2").val(d)
                            }
                            handleAdvancedOcoToggle = e => {
                                e.target.checked ? (this.renderAdvancedOco(), TradeModules.gtt.helper.hideOrShowInputField("#gttOcoNormalQtyField", !0)) : (this.renderNormalOco(), TradeModules.gtt.helper.hideOrShowInputField("#gttOcoNormalQtyField", !1)), this.validateFields(), TradeModules.gtt.customAlerts.renderAlertsOnOrderWindow("#gttOrderAlerts")
                            };
                            validateFields() {
                                TradeModules.gtt.customAlerts.alerts.some((e => e.id === TradeModules.gtt.constants.acknowledgementError.id)) || TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.acknowledgementError), $("#gttOrderSingleTriggercheck").is(":checked") ? (this.validateSingleTriggerFields(), this.calculateNormalOcoFieldPercents()) : this.validateOcoTriggerFields(), TradeModules.gtt.customAlerts.renderAlertsOnOrderWindow("#gttOrderAlerts"), this.applySideToCheckbox(), this.disableCheckboxIfAlertExists()
                            }
                            disableCheckboxIfAlertExists() {
                                const e = $("#gttOrderAcknowledgementCheck").is(":checked");
                                let t = !1;
                                TradeModules.gtt.customAlerts.alerts.length > 1 && (t = !0), !e || t ? $("#gttOrderCreateButton").prop("disabled", !0) : $("#gttOrderCreateButton").prop("disabled", !1)
                            }
                            applySideToCheckbox() {
                                TradeModules.gtt.helper.isOrderWindowSell() ? $("#gttOrderAcknowledgementCheck").hasClass("gtt-order-check-sell") || $("#gttOrderAcknowledgementCheck").addClass("gtt-order-check-sell") : $("#gttOrderAcknowledgementCheck").removeClass("gtt-order-check-sell")
                            }
                            validateSingleTriggerFields() {
                                const e = Number($("#gttSingleOrderQtyField").val());
                                e > 0 ? TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.singleQuanitityError.id) : TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.singleQuanitityError);
                                const t = TradeModules.gtt.helper.checkMultipleOfStep(e, "#gttSingleOrderQtyField");
                                !Number.isInteger(t) || "" == e || e <= 0 ? (TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.gttSingleQtyLotSize(TradeModules.gtt.helper.getFieldStepSize("#gttSingleOrderQtyField"))), TradeModules.gtt.helper.addErrorField("#gttSingleOrderQtyField")) : (TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.gttSingleQtyLotSize().id), TradeModules.gtt.helper.removeErrorField("#gttSingleOrderQtyField"));
                                const r = Number($("#gttSingleOrderPriceField").val());
                                r > 0 ? TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.singlePriceError.id) : TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.singlePriceError);
                                const a = orderWindow.customPolyfills.floatSafeRemainder(r, TradeModules.gtt.helper.getSelectedSymbolTickSize());
                                !Number.isInteger(a) || "" === r || r <= 0 ? (TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.gttSingleLimitTickSize(TradeModules.gtt.helper.getSelectedSymbolTickSize())), TradeModules.gtt.helper.addErrorField("#gttSingleOrderPriceField")) : (TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.gttSingleLimitTickSize().id), TradeModules.gtt.helper.removeErrorField("#gttSingleOrderPriceField"));
                                const i = Number($("#gttSingleOrderTriggerPriceField").val());
                                i > 0 ? TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.singleTriggerPriceError.id) : TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.singleTriggerPriceError);
                                const s = orderWindow.customPolyfills.floatSafeRemainder(i, TradeModules.gtt.helper.getSelectedSymbolTickSize());
                                !Number.isInteger(s) || "" === i || i <= 0 ? (TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.gttSingleTriggerTickSize(TradeModules.gtt.helper.getSelectedSymbolTickSize())), TradeModules.gtt.helper.addErrorField("#gttSingleOrderTriggerPriceField")) : (TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.gttSingleTriggerTickSize().id), TradeModules.gtt.helper.removeErrorField("#gttSingleOrderTriggerPriceField"))
                            }
                            validateOcoTriggerFields() {
                                const e = $("#gttOrderOcoAdvancedToggle").is(":checked"),
                                    t = TradeModules.gtt.helper.isOrderWindowSell();
                                if (e) {
                                    this.calculateAdvancedOcoFieldPercents(), this.validateTriggerPrice(!0);
                                    const e = Number($("#gttOcoAdvancedQtyField1").val());
                                    e > 0 ? TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.ocoTriggerQty1Error().id) : TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.ocoTriggerQty1Error(t));
                                    const r = TradeModules.gtt.helper.checkMultipleOfStep(e, "#gttOcoAdvancedQtyField1");
                                    !Number.isInteger(r) || "" == e || e <= 0 ? (TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.advancedQty1LotSize(TradeModules.gtt.helper.getFieldStepSize("#gttOcoAdvancedQtyField1")), t), TradeModules.gtt.helper.addErrorField("#gttOcoAdvancedQtyField1")) : (TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.advancedQty1LotSize().id), TradeModules.gtt.helper.removeErrorField("#gttOcoAdvancedQtyField1"));
                                    const a = Number($("#gttOcoAdvancedQtyField2").val());
                                    a > 0 ? TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.ocoTriggerQty2Error().id) : TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.ocoTriggerQty2Error(t));
                                    const i = TradeModules.gtt.helper.checkMultipleOfStep(a, "#gttOcoAdvancedQtyField2");
                                    !Number.isInteger(i) || "" == a || a <= 0 ? (TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.advancedQty2LotSize(TradeModules.gtt.helper.getFieldStepSize("#gttOcoAdvancedQtyField2")), t), TradeModules.gtt.helper.addErrorField("#gttOcoAdvancedQtyField2")) : (TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.advancedQty2LotSize().id), TradeModules.gtt.helper.removeErrorField("#gttOcoAdvancedQtyField2"));
                                    const s = Number($("#gttOcoAdvancedPriceField1").val());
                                    s > 0 ? TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.ocoAdvancedPrice1Error().id) : TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.ocoAdvancedPrice1Error(t));
                                    const o = Number($("#gttOcoAdvancedPriceField2").val());
                                    o > 0 ? TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.ocoAdvancedPrice2Error(t).id) : TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.ocoAdvancedPrice2Error(t));
                                    const n = Number($("#gttOcoAdvancedTriggerPriceField1").val());
                                    n > 0 ? TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.ocoAdvancedTriggerPrice1Error().id) : TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.ocoAdvancedTriggerPrice1Error(t));
                                    const d = Number($("#gttOcoAdvancedTriggerPriceField2").val());
                                    d > 0 ? TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.ocoAdvancedTriggerPrice2Error().id) : TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.ocoAdvancedTriggerPrice2Error(t));
                                    const l = orderWindow.customPolyfills.floatSafeRemainder(s, TradeModules.gtt.helper.getSelectedSymbolTickSize());
                                    !Number.isInteger(l) || "" === s || s <= 0 ? (TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.advancedPrice1TickSize(TradeModules.gtt.helper.getSelectedSymbolTickSize(), t)), TradeModules.gtt.helper.addErrorField("#gttOcoAdvancedPriceField1")) : (TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.advancedPrice1TickSize().id), TradeModules.gtt.helper.removeErrorField("#gttOcoAdvancedPriceField1"));
                                    const c = orderWindow.customPolyfills.floatSafeRemainder(o, TradeModules.gtt.helper.getSelectedSymbolTickSize());
                                    !Number.isInteger(c) || "" === o || o <= 0 ? (TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.advancedPrice2TickSize(TradeModules.gtt.helper.getSelectedSymbolTickSize(), t)), TradeModules.gtt.helper.addErrorField("#gttOcoAdvancedPriceField2")) : (TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.advancedPrice2TickSize().id), TradeModules.gtt.helper.removeErrorField("#gttOcoAdvancedPriceField2"));
                                    const p = orderWindow.customPolyfills.floatSafeRemainder(n, TradeModules.gtt.helper.getSelectedSymbolTickSize());
                                    !Number.isInteger(p) || "" === n || n <= 0 ? (TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.advancedTriggerPrice1TickSize(TradeModules.gtt.helper.getSelectedSymbolTickSize(), t)), TradeModules.gtt.helper.addErrorField("#gttOcoAdvancedTriggerPriceField1")) : (TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.advancedTriggerPrice1TickSize().id), TradeModules.gtt.helper.removeErrorField("#gttOcoAdvancedTriggerPriceField1"));
                                    const m = orderWindow.customPolyfills.floatSafeRemainder(d, TradeModules.gtt.helper.getSelectedSymbolTickSize());
                                    !Number.isInteger(m) || "" === d || d <= 0 ? (TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.advancedTriggerPrice2TickSize(TradeModules.gtt.helper.getSelectedSymbolTickSize())), TradeModules.gtt.helper.addErrorField("#gttOcoAdvancedTriggerPriceField2")) : (TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.advancedTriggerPrice2TickSize().id), TradeModules.gtt.helper.removeErrorField("#gttOcoAdvancedTriggerPriceField2")), s === o ? TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.advancedSlTargetSame) : TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.advancedSlTargetSame.id)
                                } else {
                                    this.validateTriggerPrice(!1);
                                    const r = Number($("#gttOcoNormalQtyField").val());
                                    r > 0 ? TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.ocoQuantityError.id) : TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.ocoQuantityError);
                                    const a = TradeModules.gtt.helper.checkMultipleOfStep(r, "#gttOcoNormalQtyField");
                                    !Number.isInteger(a) || "" == r || r <= 0 ? (TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.ocoQtyLotSize(TradeModules.gtt.helper.getFieldStepSize("#gttOcoNormalQtyField"))), TradeModules.gtt.helper.addErrorField("#gttOcoNormalQtyField")) : (TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.ocoQtyLotSize().id), TradeModules.gtt.helper.removeErrorField("#gttOcoNormalQtyField"));
                                    const i = Number($("#gttOcoNormalPriceField1").val());
                                    i > 0 ? TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.ocoPrice1Error().id) : TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.ocoPrice1Error(t));
                                    const s = Number($("#gttOcoNormalPriceField2").val());
                                    s > 0 || e ? TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.ocoPrice2Error().id) : TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.ocoPrice2Error(t));
                                    const o = Number($("#gttOcoNormalTriggerPriceField1").val());
                                    o > 0 || e ? TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.ocoTriggerPrice1Error().id) : TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.ocoTriggerPrice1Error(t));
                                    const n = Number($("#gttOcoNormalTriggerPriceField2").val());
                                    n > 0 ? TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.ocoTriggerPrice2Error().id) : TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.ocoTriggerPrice2Error(t));
                                    const d = orderWindow.customPolyfills.floatSafeRemainder(i, TradeModules.gtt.helper.getSelectedSymbolTickSize());
                                    !Number.isInteger(d) || "" === i || i <= 0 ? (TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.ocoPrice1TickSize(TradeModules.gtt.helper.getSelectedSymbolTickSize(), t)), TradeModules.gtt.helper.addErrorField("#gttOcoNormalPriceField1")) : (TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.ocoPrice1TickSize().id), TradeModules.gtt.helper.removeErrorField("#gttOcoNormalPriceField1"));
                                    const l = orderWindow.customPolyfills.floatSafeRemainder(s, TradeModules.gtt.helper.getSelectedSymbolTickSize());
                                    !Number.isInteger(l) || "" === s || s <= 0 ? (TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.ocoPrice2TickSize(TradeModules.gtt.helper.getSelectedSymbolTickSize(), t)), TradeModules.gtt.helper.addErrorField("#gttOcoNormalPriceField2")) : (TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.ocoPrice2TickSize().id), TradeModules.gtt.helper.removeErrorField("#gttOcoNormalPriceField2"));
                                    const c = orderWindow.customPolyfills.floatSafeRemainder(o, TradeModules.gtt.helper.getSelectedSymbolTickSize());
                                    !Number.isInteger(c) || "" === o || o <= 0 ? (TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.ocoTriggerPrice1TickSize(TradeModules.gtt.helper.getSelectedSymbolTickSize(), t)), TradeModules.gtt.helper.addErrorField("#gttOcoNormalTriggerPriceField1")) : (TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.ocoTriggerPrice1TickSize().id), TradeModules.gtt.helper.removeErrorField("#gttOcoNormalTriggerPriceField1"));
                                    const p = orderWindow.customPolyfills.floatSafeRemainder(n, TradeModules.gtt.helper.getSelectedSymbolTickSize());
                                    !Number.isInteger(p) || "" === n || n <= 0 ? (TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.ocoTriggerPrice2TickSize(TradeModules.gtt.helper.getSelectedSymbolTickSize(), t)), TradeModules.gtt.helper.addErrorField("#gttOcoNormalTriggerPriceField2")) : (TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.ocoTriggerPrice2TickSize().id), TradeModules.gtt.helper.removeErrorField("#gttOcoNormalTriggerPriceField2")), i === s ? TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.ocoSlTargetSame) : TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.ocoSlTargetSame.id)
                                }
                            }
                            validateTriggerPrice(e) {
                                const t = TradeModules.gtt.helper.isOrderWindowSell(),
                                    r = TradeModules.gtt.helper.getLtp(),
                                    a = e ? "#gttOcoAdvancedTriggerPriceField1" : "#gttOcoNormalTriggerPriceField1";
                                TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.leg1LTPCheck(t).id), Number($(a).val()) < r ? TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.leg1LTPCheck(t)) : TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.leg1LTPCheck(t).id), Number($(e ? "#gttOcoAdvancedTriggerPriceField2" : "#gttOcoNormalTriggerPriceField2").val()) > r ? TradeModules.gtt.customAlerts.addAlert(TradeModules.gtt.constants.leg2LTPCheck(t)) : TradeModules.gtt.customAlerts.removeAlertById(TradeModules.gtt.constants.leg2LTPCheck(t).id)
                            }
                            clearExistingAlerts() {
                                TradeModules.gtt.customAlerts.alerts = []
                            }
                            showGttCancelOrder(e) {
                                e.symbol && FyTrade.broker.gtt.subscribeGttSymbolsData(e.symbol), FyTrade.broker.gtt._selectedCancelGttOrder = e.id, Z.customGttCancelOrder(e)
                            }
                            showGttModifyOrder(e) {
                                this.isModifyOrder = !0, FyTrade.broker.gtt._selectedModifyGttOrder = e.id, orderWindow.order.initModifyOrder(e), orderWindow.events.handleActiveButtonDisplay(5), TradeModules.gtt.events.toggleGttOrder(!0), orderWindow.common.disableModifyOrderFields("GTT"), this.disableGttModifyFields(), $("#gttOrderCreateButton").text("Modify"), 2 === e.gtt_oco_ind ? (TradeModules.gtt.handler.handleOcoCheckboxSelection(), this.prefillEditOcoData(e)) : (TradeModules.gtt.handler.handleSingleCheckboxSelection(), this.prefillEditSingleData(e)), "MTF" === e.productType && ($(".mtf-banner-component").css("display", "flex"), $(".mtf-icon-parent").addClass("mtf-icon-position"), $(".enable-mtf-button").css("display", "none"), $(".mtf-disabled-checkbox").css("display", "block"), $(".mtf-clickable-checkbox").css("display", "none"), -1 === e.side ? ($(".mtf-banner-component").css("background", "linear-gradient(90.56deg, #FEB5B3 -26.39%, #C7BCFF 100%)"), $(".mtf-text").text("Exit MTF Position")) : ($(".mtf-banner-component").css("background", "linear-gradient(263.79deg, #C6BBFF 39.33%, #FFF0B3 92.26%)"), $(".mtf-text").text("Buy now, pay later."))), this.isAcknowledged = !0, TradeModules.gtt.events.attachModifyOrderHandlers(), this.validateFields()
                            }
                            disableGttModifyFields() {
                                $("#gttOrderTriggerRadioContainer").css("pointer-events", "none"), $("#gttOrderTriggerCheckboxContainer").css("pointer-events", "none"), $("#ocoAdvancedCheck_icon").css("pointer-events", "auto")
                            }
                            prefillEditOcoData(e) {
                                const t = e.leg1Qty !== e.leg2Qty,
                                    r = -1 === e.side;
                                t ? (this.renderOcoTriggerSelection(), this.renderAdvancedOco(), $("#gttOrderOcoAdvancedToggle").click(), this.prefillEditOcoAdvanced(e, r), $("#gttOrderOcoToggle").prop("checked", !0), this.disableGttModifyFields()) : (this.renderOcoTriggerSelection(), $("#gttOrderOcoToggle").prop("checked", !0), this.prefillEditOcoNormal(e, r), this.disableGttModifyFields())
                            }
                            prefillEditOcoNormal(e, t) {
                                $("#gttOcoNormalQtyField").val((t ? e.leg2Qty : e.leg1Qty) || 0), $("#gttOcoNormalPriceField1").val((t ? e.leg2LimitPrice : e.leg1LimitPrice) || 0), $("#gttOcoNormalTriggerPriceField1").val((t ? e.leg2TriggerPrice : e.leg1TriggerPrice) || 0), $("#gttOcoNormalPriceField2").val((t ? e.leg1LimitPrice : e.leg2LimitPrice) || 0), $("#gttOcoNormalTriggerPriceField2").val((t ? e.leg1TriggerPrice : e.leg2TriggerPrice) || 0), this.calculateNormalOcoFieldPercents()
                            }
                            prefillEditOcoAdvanced(e, t) {
                                $("#gttOcoAdvancedQtyField1").val((t ? e.leg2Qty : e.leg1Qty) || 0), $("#gttOcoAdvancedQtyField2").val((t ? e.leg1Qty : e.leg2Qty) || 0), $("#gttOcoAdvancedPriceField1").val((t ? e.leg2LimitPrice : e.leg1LimitPrice) || 0), $("#gttOcoAdvancedPriceField2").val((t ? e.leg1LimitPrice : e.leg2LimitPrice) || 0), $("#gttOcoAdvancedTriggerPriceField1").val((t ? e.leg2TriggerPrice : e.leg1TriggerPrice) || 0), $("#gttOcoAdvancedTriggerPriceField2").val((t ? e.leg1TriggerPrice : e.leg2TriggerPrice) || 0), this.calculateAdvancedOcoFieldPercents()
                            }
                            prefillEditSingleData(e) {
                                this.renderSingleTriggerSelection(), $("#gttSingleOrderQtyField").val(e.qty || 0), $("#gttSingleOrderPriceField").val(e.limitPrice || 0), $("#gttSingleOrderTriggerPriceField").val(e.triggerPrice || 0), this.calculateSingleFieldPercents()
                            }
                            handleBuySellToggle() {
                                TradeModules.gtt.customAlerts.clearExistingAlerts();
                                const e = TradeModules.gtt.helper.isOrderWindowSell();
                                this.applySideToCheckbox(), e ? ($("#gttOrderCreateButton").hasClass("sell") || $("#gttOrderCreateButton").addClass("sell"), $("#gttOrderOcoAdvancedToggle").hasClass("gtt-order-check-sell") || $("#gttOrderOcoAdvancedToggle").addClass("gtt-order-check-sell"), $("#gttOrderOcoLeg1Header").text("Target"), $("#gttOrderOcoLeg2Header").text("Stop loss")) : ($("#gttOrderCreateButton").removeClass("sell"), $("#gttOrderOcoAdvancedToggle").removeClass("gtt-order-check-sell"), $("#gttOrderOcoLeg1Header").text("Stop loss"), $("#gttOrderOcoLeg2Header").text("Target")), this.prefillDefaultInitialValues(), this.validateFields(), orderWindow.handler.refreshPriceBreakup()
                            }
                            handleOrderWindowOpen() {
                                this.userInputFieldValues = {}
                            }
                            handleFieldPercentCalculation(e, t) {
                                const r = Number($(e).val() || 0),
                                    a = TradeModules.gtt.helper.getLtp(),
                                    i = TradeModules.gtt.helper.calculateProfitPercentage(a, $(e).val() ? r : "", t);
                                $(e + "PercentText").text(`${i}`)
                            }
                            handleSingleCheckboxSelection() {
                                $("gttOrderSingleTriggercheckSpan").hasClass("gtt-order-check-span-active") || $("#gttOrderSingleTriggercheckSpan").addClass("gtt-order-check-span-active"), $("#gttOrderOcoTriggercheckSpan").removeClass("gtt-order-check-span-active")
                            }
                            handleOcoCheckboxSelection() {
                                $("#gttOrderOcoTriggercheckSpan").hasClass("gtt-order-check-span-active") || $("#gttOrderOcoTriggercheckSpan").addClass("gtt-order-check-span-active"), $("#gttOrderSingleTriggercheckSpan").removeClass("gtt-order-check-span-active")
                            }
                            storeFieldValues(e) {
                                const t = e.target.id,
                                    r = TradeModules.gtt.constants.fieldValueMap[t];
                                r && (this.userInputFieldValues[r] = e.target.value)
                            }
                        }, this.modal = new class {
                            getGttOrderContainer() {
                                return `\n        <div class="gtt-order-parent-container">\n            ${this.getGttOrderTriggerSection()}\n        </div>\n    `
                            }
                            getGttOrderTriggerSection() {
                                const e = $("#orderwin-header").hasClass("sell"),
                                    t = e ? "checkmarkValRadioSell" : "checkmarkValRadio";
                                return `\n      <div class="gtt-order-trigger-parent-container">\n        <div class="gtt-order-trigger-text">\n          Trigger type:\n        </div>\n        <div id="gttOrderTriggerRadioContainer" class="gtt-order-trigger-radio-container">\n          <label class="containerRadio">\n            <input type="radio" id="gttOrderSingleTriggercheck" name="gttOrderTriggercheck" value="Single">\n            <span id="gttOrderSingleTriggercheckSpan" class="${t} gtt-order-check-span-active"></span>\n            <span class="order-window-content gtt-order-trigger-side-selection-text" id="gttOrderSingleToggle" aria-expanded="false">\n              Single\n            </span>\n          </label>\n          <label class="containerRadio">\n            <input type="radio" id="gttOrderOcoTriggercheck" name="gttOrderTriggercheck" value="OCO">\n            <span id="gttOrderOcoTriggercheckSpan" class="${t}"></span>\n            <span class="order-window-content gtt-order-trigger-side-selection-text" id="gttOrderOcoToggle" aria-expanded="false">\n              OCO\n            </span>\n          </label>\n        </div>\n      </div>\n      <div id="gttOrderBody" class="gtt-order-body"></div>\n      <div class="gtt-order-footer">\n        <div class="gtt-order-actions-container">\n          <div class="gtt-order-footer-add-funds">\n            <div class="add-funds-link mt-1 ml-1" id="AddFunds">\n              <a id="add-funds" href="https://fundtransfer.fyers.in/v2/" target="_blank">\n                + Add Funds\n              </a>\n            </div>\n            <div style="cursor: pointer;" class="add-funds-link mt-1 ml-3 d-flex align-items-center text-primary" id="invokePriceBreakup">\n              <img src="https://assets.fyers.in/priceBreakUp/receipt__1_.svg" class="mr-1">\n              Price breakup\n            </div>\n          </div>\n          <div class="gtt-order-actions">\n            <button class="gtt-order-create-button ${e?"sell":""}" id="gttOrderCreateButton">Create</button>\n            <button class="btn cancel-button gtt-order-cancel-button" id="gttOrderCancelButton">Cancel</button>\n            <div class="float-right" id="gttOrderWindowHide" aria-expanded="false">\n                <div class="mt-3 pl-8 order-window-hide "> <img src="https://trade.fyers.in/static/js/ordwin/assets/img/hide.svg" alt="hide-order-window" class="order-window-hide"> </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    `
                            }
                            getSingleTriggerHTML() {
                                const e = TradeModules.gtt.helper.getSelectedSymbolTickSize(),
                                    t = R.getLotSize() || 1;
                                return `\n        <div class="gtt-order-single-trigger-row">\n          <div class="gtt-order-single-trigger-inputs-container">\n            ${TradeModules.gtt.helper.getInputField("gttSingleOrderQtyField",t,"gttSingleOrderQtyField","form-control orderwin-input","Qty",`return event.charCode >= 48 &amp;&amp; event.charCode <= 57" min="${t}" max="1.7976931348623157e+308`,"Qty",!1,"Lot:")}\n            ${TradeModules.gtt.helper.getInputField("gttSingleOrderPriceField",e,"gttSingleOrderPriceField","form-control orderwin-input","Price","","Price",!0,"Tick:")}\n            ${TradeModules.gtt.helper.getInputField("gttSingleOrderTriggerPriceField",e,"gttSingleOrderTriggerPriceField","form-control orderwin-input","Trigger Price","","Trigger Price",!0,"")}\n          </div>\n          ${this.getMarketDepthHTML()}\n        </div>\n    `
                            }
                            getOcoHTML() {
                                const e = TradeModules.gtt.helper.isOrderWindowSell(),
                                    t = R.getLotSize() || 1;
                                return `\n      <div class="gtt-order-oco-trigger-container">\n        <div class="gtt-order-oco-trigger-primary-wrapper">\n            ${TradeModules.gtt.helper.getInputField("gttOcoNormalQtyField",t,"gttOcoNormalQtyField","form-control orderwin-input","Qty",`return event.charCode >= 48 &amp;&amp; event.charCode <= 57" min="${t}" max="1.7976931348623157e+308`,"Qty",!1,"Lot:")}\n            <div id="gttOrderTriggerCheckboxContainer" class="gtt-order-oco-checkbox-input-parent-container">\n              <div class="gtt-order-oco-checkbox-input-container">\n                <input id="gttOrderOcoAdvancedToggle" type="checkbox" class="fy-custom-checkbox ew-select-all-side  ${e?"gtt-order-check-sell":""}" data-value="0">\n                <span class="fy-custom-checkbox-checkmark"></span>\n              </div>\n              <span id="gttOrderOcoAdvancedText" class="gtt-order-oco-checkbox-input-label-text">\n                Advanced\n                <img id="ocoAdvancedCheck_icon" class="logo-info-icon" src="https://assets.fyers.in/images/Group_61.svg" alt="" aria-expanded="false">\n              </span>\n            </div>\n        </div>\n        <div id="gttOcoOrderBody">\n        </div>\n        ${this.getMarketDepthHTML()}\n      </div>\n    `
                            }
                            getMarketDepthHTML() {
                                return `\n    <div class="gtt-order-single-trigger-marketdepth-container">\n        <div id="gttOrderMarketDepth">\n          <span class="gtt-order-single-trigger-marketdepth-text">\n            Market Depth\n          </span>\n          <img class="gtt-order-single-trigger-marketdepth-arrow-icon external-arrow-logo" src="https://assets.fyers.in/orderWindow/marketDepth.svg" alt="show-more-expand">\n        </div>\n     </div>\n     ${TradeModules.gtt.helper.getLineSeperator()}\n    `
                            }
                            getNormalOcoHTML() {
                                const e = TradeModules.gtt.helper.isOrderWindowSell(),
                                    t = TradeModules.gtt.helper.getSelectedSymbolTickSize();
                                return `\n        <div class="gtt-order-oco-trigger-secondary-selection-wrapper gtt-order-oco-trigger-secondary-selection-wrapper-oco">\n            <div id="gttOrderOcoLeg1Header" class="gtt-order-oco-trigger-secondary-selection-header">\n              ${e?"Target":"Stop loss"}\n            </div>\n            <div class="gtt-order-oco-trigger-secondary-selection-body">\n                ${TradeModules.gtt.helper.getInputField("gttOcoNormalPriceField1",t,"gttOcoNormalPriceField1","form-control orderwin-input","Price","","Price",!0,"Tick:")}\n                ${TradeModules.gtt.helper.getInputField("gttOcoNormalTriggerPriceField1",t,"gttOcoNormalTriggerPriceField1","form-control orderwin-input","Trigger Price","","Trigger Price",!0,"")}\n            </div>\n        </div>\n        <div class="gtt-order-oco-trigger-tertiary-selection-wrapper  gtt-order-oco-trigger-tertiary-selection-wrapper-oco">\n            <div id="gttOrderOcoLeg2Header" class="gtt-order-oco-trigger-tertiary-selection-header">\n            ${e?"Stop loss":"Target"}\n            </div>\n            <div class="gtt-order-oco-trigger-tertiary-selection-body">\n              ${TradeModules.gtt.helper.getInputField("gttOcoNormalPriceField2",t,"gttOcoNormalPriceField2","form-control orderwin-input","Price","","Price",!0,"Tick:")}\n              ${TradeModules.gtt.helper.getInputField("gttOcoNormalTriggerPriceField2",t,"gttOcoNormalTriggerPriceField2","form-control orderwin-input","Trigger Price","","Trigger Price",!0,"")}\n            </div>\n        </div>\n      `
                            }
                            getAdvancedOcoHTML() {
                                const e = TradeModules.gtt.helper.isOrderWindowSell(),
                                    t = TradeModules.gtt.helper.getSelectedSymbolTickSize(),
                                    r = R.getLotSize() || 1;
                                return `\n        <div class="gtt-order-oco-trigger-secondary-selection-wrapper">\n            <div id="gttOrderOcoLeg1Header" class="gtt-order-oco-trigger-secondary-selection-header">\n              ${e?"Target":"Stop loss"}\n            </div>\n            <div class="gtt-order-oco-trigger-secondary-selection-body">\n                ${TradeModules.gtt.helper.getInputField("gttOcoAdvancedQtyField1",r,"gttOcoAdvancedQtyField1","form-control orderwin-input","Qty",`return event.charCode >= 48 &amp;&amp; event.charCode <= 57" min="${r}" max="1.7976931348623157e+308`,"Qty",!1,"Lot:")}\n                ${TradeModules.gtt.helper.getInputField("gttOcoAdvancedPriceField1",t,"gttOcoAdvancedPriceField1","form-control orderwin-input","Price","","Price",!0,"Tick:")}\n                ${TradeModules.gtt.helper.getInputField("gttOcoAdvancedTriggerPriceField1",t,"gttOcoAdvancedTriggerPriceField1","form-control orderwin-input","Trigger Price","","Trigger Price",!0,"")}\n            </div>\n        </div>\n        <div class="gtt-order-oco-trigger-tertiary-selection-wrapper">\n            <div id="gttOrderOcoLeg2Header" class="gtt-order-oco-trigger-tertiary-selection-header">\n              ${e?"Stop loss":"Target"}\n            </div>\n            <div class="gtt-order-oco-trigger-tertiary-selection-body">\n              ${TradeModules.gtt.helper.getInputField("gttOcoAdvancedQtyField2",r,"gttOcoAdvancedQtyField2","form-control orderwin-input","Qty",`return event.charCode >= 48 &amp;&amp; event.charCode <= 57" min="${r}"  max="1.7976931348623157e+308`,"Qty",!1,"Lot:")}\n              ${TradeModules.gtt.helper.getInputField("gttOcoAdvancedPriceField2",t,"gttOcoAdvancedPriceField2","form-control orderwin-input","Price","","Price",!0,"Tick:")}\n              ${TradeModules.gtt.helper.getInputField("gttOcoAdvancedTriggerPriceField2",t,"gttOcoAdvancedTriggerPriceField2","form-control orderwin-input","Trigger Price","","Trigger Price",!0,"")}\n            </div>\n        </div>\n      `
                            }
                        }, this.service = new class {
                            constructor() {
                                this.headers = {
                                    Authorization: token,
                                    "Content-Type": "application/json"
                                }
                            }
                            createGttOrder(e) {
                                const t = {
                                    method: "POST",
                                    headers: this.headers,
                                    body: JSON.stringify(e)
                                };
                                fetch(globalConstants.dynamicUrl.trading.gtt, t).then((e => e.json())).then((e => {
                                    "ok" === e.s ? FyTrade.common.fy_showToaster("success", "Order successful", "GTT order has been successfully placed") : FyTrade.common.fy_showToaster("error", "Order rejected", "GTT order has been rejected")
                                })).catch((e => {
                                    console.warn("There was an error with the GTT order:", e), FyTrade.common.fy_showToaster("error", "Order failed", "There was an issue placing the GTT order. Please try again later.")
                                })).finally((() => {
                                    $("#gttOrderCreateButton").prop("disabled", !1)
                                }))
                            }
                            updateGttOrder(e) {
                                const t = {
                                    method: "PATCH",
                                    headers: this.headers,
                                    body: JSON.stringify(e)
                                };
                                fetch(globalConstants.dynamicUrl.trading.gtt, t).then((e => e.json())).then((e => {
                                    "ok" === e.s ? FyTrade.common.fy_showToaster("success", "Order modified", "GTT order has been modified successfully") : FyTrade.common.fy_showToaster("error", "Order modification failed", "GTT order modification has been rejected")
                                })).catch((e => {
                                    console.warn("There was an error with the GTT order:", e), FyTrade.common.fy_showToaster("error", "Order failed", "There was an issue modifying the GTT order. Please try again later.")
                                })).finally((() => {
                                    $("#gttOrderCreateButton").prop("disabled", !1)
                                }))
                            }
                            deleteGttOrder(e) {
                                const t = {
                                    method: "DELETE",
                                    headers: this.headers,
                                    body: JSON.stringify({
                                        id: e
                                    })
                                };
                                fetch(globalConstants.dynamicUrl.trading.gtt, t).then((e => e.json())).then((e => {
                                    "ok" === e.s ? FyTrade.common.fy_showToaster("warning", "Order cancelled", "GTT order has been cancelled successfully") : FyTrade.common.fy_showToaster("error", "Order cancellation failed", "GTT order cancellation has been rejected")
                                }))
                            }
                        }, this.customAlerts = new class {
                            constructor() {
                                this.alerts = [], this.currentMessageIndex = 0
                            }
                            renderAlertsOnOrderWindow(e) {
                                if (this.alerts[this.currentMessageIndex] || (this.currentMessageIndex = 0), this.alerts.length) {
                                    const t = this.alerts[this.currentMessageIndex],
                                        r = `\n      <hr class="alerts-breaker-hr">\n      <div class="fy-cusom-alert-container ${t.identifierClass}">\n            ${t.preceedingHtml}\n            <div class="fy-cusom-alert-message-wrapper">\n                <span>${t.message}</span>\n            </div>\n            <div id="" class="fy-cusom-alert-actions-wrapper">\n                <span>${this.currentMessageIndex+1}</span>\n                <span>/</span>\n                <span>${this.alerts.length}</span>\n                <a id="fyCustomAlertNextBtn" class="fy-cusom-alert-actions-next-button" type="button">\n                    <img height="10px" width="25px" id="nextButton" src="https://trade.fyers.in/static/js/ordwin/assets/img/right-arrow.svg" alt="next alert">\n                </a>\n            </div>\n        </div>\n    `;
                                    $(e).html(r), TradeModules.gtt.events.attachAlertHandlers(), $("#gttOrderExpiryDate").text(TradeModules.gtt.helper.getDateOneYearFromToday()), TradeModules.gtt.handler.isAcknowledged && $("#gttOrderAcknowledgementCheck").prop("checked", !0)
                                }
                            }
                            addAlert(e) {
                                this.alerts.some((t => t.id === e.id)) || (this.alerts.push(e), this.rearrangeAlertsByPriority())
                            }
                            rearrangeAlertsByPriority() {
                                this.alerts.sort(((e, t) => e.priority === t.priority ? this.alerts.indexOf(e) - this.alerts.indexOf(t) : e.priority - t.priority))
                            }
                            removeAlertById(e) {
                                this.alerts = this.alerts.filter((t => t.id !== e))
                            }
                            displayNextAlert() {
                                const e = this.currentMessageIndex + 1;
                                e <= this.alerts.length && this.alerts[e] ? this.currentMessageIndex = e : this.currentMessageIndex = 0, this.renderAlertsOnOrderWindow("#gttOrderAlerts")
                            }
                            clearExistingAlerts() {
                                this.alerts = []
                            }
                        }, this.constants = ct
                    }
                }, this.quickTrade = new class {
                    constructor() {
                        this.events = new Ve, this.handler = new Qe, this.service = new ne, this.modal = new qe, this.quickTradeQtyVal = {}
                    }
                    initateQuickTradeEvents() {
                        Ve.initateQuickTradeEvents()
                    }
                    getQtyForQuickTrade(e, t = null, r = null) {
                        return le.getQtyBasedOnPositionSizing(e, t, r)
                    }
                    resetQuickTrade() {
                        ne.resetQuickTrade()
                    }
                    placeQuickTrade(e, t, r) {
                        ne.placeQuickTrade(e, t, r)
                    }
                    onToggleOfQuickTrade(e) {
                        console.log(e.target.checked)
                    }
                    updateSymbolCache(e) {
                        P.dispatch(E.setQuickSymbolCache(e))
                    }
                    getSymbolCache() {
                        return P.getState().quicktrade.symbolCache
                    }
                    resetSymbolCache() {
                        P.dispatch(E.resetQuickSymbolCache()), ne.marginData = {}
                    }
                    domUpdateQtyOnRealtimeForQuickTrade(e) {
                        le.domUpdateQtyOnRealtimeForQuickTrade(e)
                    }
                }, this.alertsFromCharts = new class {
                    constructor() {}
                    SocketDataToPriceAlerts(e) {
                        Ae.SocketDataToPriceAlerts(e)
                    }
                    ResetPriceAlerts() {
                        Ae.isFirst = !0, Ae.loadLayout = !0
                    }
                }
            }
        }
    })(), a
})()));