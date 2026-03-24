! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.TradeCommon = t() : e.TradeCommon = t()
}(this, (() => (() => {
    "use strict";
    var e = {};
    (e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    })(e);
    const t = class {
            constructor() {
                this.requester = new Requester
            }
            static async sendRequest(e, t, n = void 0, o = void 0) {
                let a = {
                    method: t,
                    headers: {
                        Authorization: token ? ? common.getCookieData("_FYERS")
                    }
                };
                if (n) {
                    var r = JSON.stringify(n);
                    a.body = r
                }
                o && (a.body = o);
                try {
                    let t = await fetch(e, a);
                    return await t.json()
                } catch (t) {
                    return console.log(`Unable to make request to URL: ${e}`), {
                        s: "error",
                        message: "Failed: " + e
                    }
                }
            }
        },
        n = Object.fromEntries(["XR00839", "XV27581", "XA33422", "DP02479", "FP0869", "XA53627", "XB00602", "XH01182", "XN16842", "XP17807", "XR00333", "XS09233", "XS47964", "XV14580", "XV20177", "YA09355", "YM17131", "DS06359", "XA30275", "XA72871", "XC03431", "XM21752", "XP01139", "XP30608", "XR07069", "XS47258", "XV01402", "XV15456", "XV20986", "YK04391"].map((e => [e, !0]))),
        o = class {
            constructor() {}
            parseJWT(e) {
                const t = e.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"),
                    n = this.decodeBase64Url(t);
                return JSON.parse(n)
            }
            decodeBase64Url(e) {
                const t = e.padEnd(e.length + (4 - e.length % 4) % 4, "="),
                    n = window.atob(t);
                return decodeURIComponent(Array.from(n).map((e => "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2))).join(""))
            }
            checkIfClientIsEnabledForVolumeIndicator() {
                try {
                    const e = globalConstants ? .config ? .indices_volume ? .enabled_flag,
                        t = this.parseJWT(token).fy_id,
                        n = globalConstants ? .config ? .indices_volume ? .list_cug || [],
                        o = globalConstants ? .config ? .indices_volume ? .list_series || [];
                    return "scalper" === window.APP_FLAG ? globalConstants ? .config ? .indices_volume ? .enabled_flag_ost : !!e || !(!n ? .includes(t) && !o ? .includes(t.slice(0, 1)))
                } catch (e) {
                    return console.log("Error in checkIfClientIsEnabledForVolumeIndicator", e), !1
                }
            }
            checkIfClientEnabledForDrawingOptimisation() {
                try {
                    const e = this.parseJWT(token).fy_id,
                        t = globalConstants ? .config ? .drawing_optimisation_config ? .enable,
                        o = n || {},
                        a = globalConstants ? .config ? .drawing_optimisation_config ? .list_series || [];
                    return !!(t || o[e] || globalConstants ? .config ? .drawing_optimisation_config ? .list_cug ? .includes(e) || a ? .includes(e.slice(0, 1)) || a ? .includes(e.slice(0, 2)))
                } catch (e) {
                    return console.log(e), !1
                }
            }
            async checkIfValidSymbol(e) {
                if (this.isSymbolDetailsFromAPI()) {
                    const n = `https://api-t1.fyers.in/indus/data/v1/symbols?symbol=${e}`,
                        o = await t.sendRequest(n, "GET");
                    return !o ? .data ? .expired
                }
                return !!datafeed.unzippedData.data[e]
            }
            throttlePromise(e, t) {
                let n = [],
                    o = !1;
                return function(...a) {
                    return new Promise(((r, s) => {
                        n.push({
                            context: this,
                            args: a,
                            resolve: r,
                            reject: s
                        }), async function() {
                            if (!o && 0 !== n.length) {
                                for (o = !0; n.length > 0;) {
                                    const {
                                        context: o,
                                        args: a,
                                        resolve: r,
                                        reject: s
                                    } = n.shift();
                                    try {
                                        r(await e.apply(o, a))
                                    } catch (e) {
                                        s(e)
                                    }
                                    await new Promise((e => setTimeout(e, t)))
                                }
                                o = !1
                            }
                        }()
                    }))
                }
            }
            isSymbolDetailsFromAPI() {
                return "mobile" === window.APP_FLAG || "appChart" === window.APP_FLAG
            }
            triggerSnapshotDownloadOrCopy(e, t, n) {
                try {
                    if (!window.tvWidget || "function" != typeof window.tvWidget.takeScreenshot) return void TradeModules.common.hawkeye("ERROR", "Error while trying to create snapshot from library: tvWidget.takeScreenshot is not available.");
                    if (t || n) {
                        e && "function" == typeof e.preventDefault && e.preventDefault(), e && "function" == typeof e.stopImmediatePropagation && e.stopImmediatePropagation(), e && "function" == typeof e.stopPropagation && e.stopPropagation();
                        try {
                            const e = async function(o) {
                                try {
                                    window.tvWidget && window.tvWidget.unsubscribe && window.tvWidget.unsubscribe("onScreenshotReady", e)
                                } catch (e) {}
                                if ("" != o) {
                                    if (t) {
                                        const e = new Date,
                                            t = e => e.toString().padStart(2, "0"),
                                            n = `${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}_${t(e.getHours())}-${t(e.getMinutes())}-${t(e.getSeconds())}`,
                                            a = tvWidget.activeChart().symbol();
                                        let r = a;
                                        a && a.includes(":") && (r = a.split(":")[1]);
                                        const s = datafeed.unzippedData ? .data ? .[a];
                                        s && s[24] && (r = s[24]);
                                        const i = `${r}_${n}.png`;
                                        fetch(o, {
                                            method: "GET",
                                            credentials: "omit"
                                        }).then((e => e.blob())).then((e => {
                                            const t = URL.createObjectURL(e),
                                                n = document.createElement("a");
                                            n.href = t, n.download = i, document.body.appendChild(n), n.click(), document.body.removeChild(n), URL.revokeObjectURL(t)
                                        })).catch(console.error)
                                    } else if (n && window.isSecureContext && navigator.clipboard) {
                                        const e = () => {
                                                const e = document.getElementById("tv_chart_container") ? .firstElementChild;
                                                if (e ? .contentDocument) {
                                                    const t = e.contentDocument.querySelector(".layout__area--center");
                                                    if (t) {
                                                        const n = e.contentDocument.createElement("div");
                                                        Object.assign(n.style, {
                                                            position: "absolute",
                                                            bottom: "70px",
                                                            left: "50%",
                                                            transform: "translateX(-50%)",
                                                            zIndex: 9999,
                                                            display: "flex",
                                                            alignItems: "center"
                                                        }), n.innerHTML = '\n                                                    <div style="display: inline-flex; align-items: center; background: #ffffff; padding: 8px 14px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.15); border: 1px solid #e0e0e0;">\n                                                        <span style="font-size:18px; margin-right:8px; border-radius:50%; background:#00695c; display:inline-flex; align-items:center; justify-content:center; width:26px; height:26px; font-weight:bold; color:#ffffff;">&#10003;</span>\n                                                        <span style="color: #000000;">Chart image copied to clipboard</span>\n                                                        <span style="font-size:16px; margin-left:8px">&#x1F44D;</span>\n                                                    </div>', t.appendChild(n), setTimeout((() => {
                                                            n.style.transition = "opacity 0.4s", n.style.opacity = "0", setTimeout((() => {
                                                                n.parentNode && n.parentNode.removeChild(n)
                                                            }), 400)
                                                        }), 1800)
                                                    }
                                                }
                                            },
                                            t = async t => {
                                                const n = await fetch(t, {
                                                        method: "GET",
                                                        mode: "cors",
                                                        credentials: "omit"
                                                    }),
                                                    o = await n.blob(),
                                                    a = new ClipboardItem({
                                                        "image/png": o
                                                    });
                                                await navigator.clipboard.write([a]), e()
                                            },
                                            n = async t => {
                                                try {
                                                    const n = new Image;
                                                    return n.crossOrigin = "anonymous", new Promise(((o, r) => {
                                                        n.onload = () => {
                                                            try {
                                                                const t = document.createElement("canvas"),
                                                                    r = t.getContext("2d");
                                                                t.width = n.width, t.height = n.height, r.drawImage(n, 0, 0);
                                                                const s = document.createElement("img");
                                                                s.src = t.toDataURL("image/png"), s.style.cssText = "\n                                                            position: absolute;\n                                                            left: -9999px;\n                                                            top: -9999px;\n                                                            width: 1px;\n                                                            height: 1px;\n                                                        ", document.body.appendChild(s);
                                                                const i = document.createRange();
                                                                i.selectNode(s);
                                                                const l = window.getSelection();
                                                                l.removeAllRanges(), l.addRange(i);
                                                                const c = document.execCommand("copy");
                                                                l.removeAllRanges(), document.body.removeChild(s), c ? (e(), o()) : (a(s.src), o())
                                                            } catch (e) {
                                                                r(e)
                                                            }
                                                        }, n.onerror = () => {
                                                            r(new Error("Failed to load image"))
                                                        }, n.src = t
                                                    }))
                                                } catch (e) {
                                                    throw TradeModules.common.hawkeye("ERROR", "Direct copy method failed:", e), e
                                                }
                                            },
                                            a = t => {
                                                const n = document.createElement("div");
                                                n.style.cssText = "\n                                            position: fixed;\n                                            top: 0;\n                                            left: 0;\n                                            width: 100%;\n                                            height: 100%;\n                                            background: rgba(0, 0, 0, 0.5);\n                                            z-index: 10000;\n                                            display: flex;\n                                            align-items: center;\n                                            justify-content: center;\n                                        ";
                                                const o = document.createElement("div");
                                                o.style.cssText = "\n                                            background: white;\n                                            border-radius: 8px;\n                                            padding: 24px;\n                                            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);\n                                            text-align: center;\n                                            max-width: 400px;\n                                            width: 85%;\n                                            position: relative;\n                                            margin: 0 auto;\n                                        ";
                                                const a = document.createElement("div");
                                                a.className = "content text__general--heading", a.style.cssText = "\n                                            position: relative;\n                                            padding: 0;\n                                        ";
                                                const r = document.createElement("h6");
                                                r.className = "first title alignc", r.textContent = "For security reasons, your browser needs you to confirm this action", r.style.cssText = "\n                                            font-size: 18px;\n                                            font-weight: 600;\n                                            color: #1a1a1a;\n                                            margin-bottom: 12px;\n                                            margin-top: 0;\n                                            line-height: 1.3;\n                                            text-align: center;\n                                        ";
                                                const s = document.createElement("p");
                                                s.className = "subtitle alignc font-sm", s.textContent = "If you don't want to take this extra step, we recommend you trying on Chrome browser.", s.style.cssText = "\n                                            font-size: 14px;\n                                            color: #666;\n                                            margin-bottom: 20px;\n                                            line-height: 1.5;\n                                            text-align: center;\n                                            max-width: 350px;\n                                            margin-left: auto;\n                                            margin-right: auto;\n                                        ";
                                                const i = document.createElement("div");
                                                i.id = "copy-image-progress", i.className = "progress-bar", i.style.cssText = "\n                                            margin-bottom: 20px;\n                                            display: none;\n                                            text-align: center;\n                                            background: transparent;\n                                            background-color: transparent;\n                                        ";
                                                const l = document.createElement("p");
                                                l.className = "progress-bar__title alignc", l.textContent = "Processing your image...", l.style.cssText = "\n                                            font-size: 14px;\n                                            color: #666;\n                                            margin-bottom: 10px;\n                                            font-weight: 500;\n                                        ";
                                                const c = document.createElement("div");
                                                c.className = "progress-bar__wrapper", c.style.cssText = "\n                                            width: 100%;\n                                            height: 6px;\n                                            background: #f0f0f0;\n                                            border-radius: 3px;\n                                            overflow: hidden;\n                                            margin: 0 auto;\n                                            max-width: 300px;\n                                        ";
                                                const d = document.createElement("div");
                                                d.className = "progress-bar__value", d.style.cssText = "\n                                            width: 0%;\n                                            height: 100%;\n                                            background: linear-gradient(90deg, #007AFF, #0056CC);\n                                            border-radius: 3px;\n                                            transition: width 0.4s ease;\n                                        ", c.appendChild(d), i.appendChild(l), i.appendChild(c);
                                                const u = document.createElement("div");
                                                u.className = "modal-actions", u.style.cssText = "\n                                            display: flex;\n                                            gap: 12px;\n                                            justify-content: center;\n                                            margin-top: 6px;\n                                        ";
                                                const m = document.createElement("button");
                                                m.className = "bj-button bj-button--md button--outline bj-button--outline bj-button--secondary button__cancel", m.textContent = "Cancel", m.style.cssText = "\n                                            background: transparent;\n                                            color: #666;\n                                            border: 2px solid #e0e0e0;\n                                            border-radius: 6px;\n                                            padding: 12px 24px;\n                                            font-size: 14px;\n                                            font-weight: 500;\n                                            cursor: pointer;\n                                            flex: 1;\n                                            max-width: 120px;\n                                            transition: all 0.2s ease;\n                                            min-height: 42px;\n                                        ", m.addEventListener("mouseenter", (() => {
                                                    m.style.backgroundColor = "#f8f9fa", m.style.borderColor = "#d0d0d0"
                                                })), m.addEventListener("mouseleave", (() => {
                                                    m.style.backgroundColor = "transparent", m.style.borderColor = "#e0e0e0"
                                                }));
                                                const h = document.createElement("button");
                                                h.id = "confirm-download-button", h.className = "bj-button bj-button--md bj-button--green", h.textContent = "Confirm copy to clipboard", h.style.cssText = "\n                                            background: #28a745;\n                                            color: white;\n                                            border: none;\n                                            border-radius: 6px;\n                                            padding: 12px 24px;\n                                            font-size: 14px;\n                                            font-weight: 600;\n                                            cursor: pointer;\n                                            flex: 1;\n                                            max-width: 180px;\n                                            transition: all 0.2s ease;\n                                            min-height: 42px;\n                                        ", h.addEventListener("mouseenter", (() => {
                                                    h.style.backgroundColor = "#218838", h.style.transform = "translateY(-1px)", h.style.boxShadow = "0 4px 12px rgba(40, 167, 69, 0.3)"
                                                })), h.addEventListener("mouseleave", (() => {
                                                    h.style.backgroundColor = "#28a745", h.style.transform = "translateY(0)", h.style.boxShadow = "none"
                                                })), m.onclick = () => {
                                                    document.body.removeChild(n)
                                                }, h.onclick = () => {
                                                    try {
                                                        i.style.display = "block", h.disabled = !0, m.disabled = !0;
                                                        let o = 0;
                                                        const a = setInterval((() => {
                                                                o += 10, d.style.width = o + "%", o >= 100 && clearInterval(a)
                                                            }), 50),
                                                            r = document.createElement("img");
                                                        r.src = t, r.style.cssText = "\n                                                    position: absolute;\n                                                    left: -9999px;\n                                                    top: -9999px;\n                                                    width: 1px;\n                                                    height: 1px;\n                                                ", document.body.appendChild(r);
                                                        const s = document.createRange();
                                                        s.selectNode(r);
                                                        const l = window.getSelection();
                                                        l.removeAllRanges(), l.addRange(s);
                                                        const c = document.execCommand("copy");
                                                        l.removeAllRanges(), document.body.removeChild(r), setTimeout((() => {
                                                            c ? (e(), document.body.removeChild(n)) : (TradeModules.common.hawkeye("ERROR", "Copy failed. Please try again."), i.style.display = "none", h.disabled = !1, m.disabled = !1)
                                                        }), 1e3)
                                                    } catch (e) {
                                                        i.style.display = "none", h.disabled = !1, m.disabled = !1
                                                    }
                                                }, u.appendChild(m), u.appendChild(h), a.appendChild(r), a.appendChild(s), a.appendChild(i), a.appendChild(u), o.appendChild(a), n.appendChild(o), document.body.appendChild(n), setTimeout((() => {
                                                    document.body.contains(n) && document.body.removeChild(n)
                                                }), 2e4)
                                            };
                                        try {
                                            await t(o)
                                        } catch (e) {
                                            await n(o)
                                        }
                                    }
                                    const e = document.getElementById("tv_chart_container") ? .firstElementChild;
                                    e ? .contentWindow ? .document && e.contentWindow.document.dispatchEvent(new KeyboardEvent("keydown", {
                                        key: "Escape",
                                        keyCode: 27,
                                        which: 27,
                                        bubbles: !0,
                                        cancelable: !0
                                    }))
                                }
                            };
                            if (window.tvWidget && window.tvWidget.subscribe) {
                                window.tvWidget.subscribe("onScreenshotReady", e);
                                try {
                                    window.tvWidget.takeScreenshot()
                                } catch (e) {}
                                return
                            }
                        } catch (e) {
                            console.log("snapshot api exception", e)
                        }
                        return
                    }
                } catch (e) {
                    console.log("Error in Download And Copy Snapshot:", e)
                }
            }
            isIpad(e) {
                try {
                    const t = navigator.userAgent || "",
                        n = navigator.maxTouchPoints || 0,
                        o = "MacIntel" === e && n > 1,
                        a = /iPad/.test(t);
                    return o || a
                } catch (e) {
                    return TradeModules.common.hawkeye("ERROR", "Error detecting iPad:", e), !1
                }
            }
            isAndroid(e, t) {
                try {
                    return /android/i.test(e) || /Android/i.test(e) || /Linux.*Android/i.test(e) || /Realme/i.test(e) || /RMX/i.test(e) || /OPPO/i.test(e) || /Vivo/i.test(e) || /Xiaomi/i.test(e) || /Samsung/i.test(e) || /Huawei/i.test(e) || /OnePlus/i.test(e) || /Lenovo/i.test(e) || /Asus/i.test(e) || "Linux armv7l" === t || "Linux aarch64" === t || "Linux armv8l" === t || "Linux armv81" === t || "Linux x86_64" === t || t.includes("Linux") && navigator.maxTouchPoints > 1
                } catch (e) {
                    return TradeModules.common.hawkeye("ERROR", "Error detecting Android:", e), !1
                }
            }
            interceptDownloadAndCopySnapshot() {
                try {
                    const e = document.getElementById("tv_chart_container").firstElementChild;
                    if (e && e.contentDocument) {
                        const t = e.contentDocument,
                            n = navigator.userAgent || window.opera,
                            o = navigator.platform,
                            a = this.isIpad(o),
                            r = this.isAndroid(n, o);
                        t.addEventListener("click", (e => {
                            try {
                                const t = e.target,
                                    n = t && (t.innerText || "").trim() || "",
                                    o = n.includes("Download image") || n.includes("⌥ ⌘ S"),
                                    s = n.includes("Copy image") || n.includes("⇧ ⌘ S");
                                (o || !a && !r && s || !s) && this.triggerSnapshotDownloadOrCopy(e, o, s)
                            } catch (e) {
                                TradeModules.common.hawkeye("ERROR", "Error in click event handler:", e)
                            }
                        }), !0), t.addEventListener("keydown", (e => {
                            try {
                                const t = ["s", "S", "ś", "Ś", "ß"].includes(e.key),
                                    n = e.ctrlKey && e.altKey && !e.metaKey && !e.shiftKey && t,
                                    o = e.altKey && e.metaKey && !e.ctrlKey && !e.shiftKey && t,
                                    s = e.ctrlKey && e.shiftKey && !e.metaKey && !e.altKey && t,
                                    i = e.ctrlKey && e.metaKey && !e.altKey && !e.shiftKey && t,
                                    l = n || o,
                                    c = (s || i) && !a && !r;
                                if (l || c) return e.preventDefault(), e.stopPropagation(), void this.triggerSnapshotDownloadOrCopy(e, l, c)
                            } catch (e) {
                                TradeModules.common.hawkeye("ERROR", "Error in keydown event handler:", e)
                            }
                        }))
                    }
                } catch (e) {
                    TradeModules.common.hawkeye("ERROR", "Error in interceptDownloadAndCopySnapshot:", e)
                }
            }
        };
    class a {
        constructor() {}
        checkIfStudyTemplateNameIsAlreadyPresentInOriginalArray(e, t) {
            for (const n of e)
                if (n.name === t) return !0;
            return !1
        }
        checkIfStudyTemplateNameIsAlreadyPresentInModifiedArray(e = [], t) {
            return e.includes(t)
        }
        async checkIfDrawingSyncIsON() {
            try {
                return tvWidget.drawOnAllChartsEnabled().value()
            } catch (e) {
                return console.error("Error checking if drawing sync is on:", e), !1
            }
        }
        async handleChartDeleteButtons(e) {
            const t = () => {
                const t = e.querySelector("[data-name='widgetbar-pages-with-tabs']");
                t && new MutationObserver((e => {
                    t.querySelectorAll('[data-name="remove"]').forEach((e => {
                        e._listenerAdded || (e.addEventListener("click", (() => {
                            a.triggerDeleteAction()
                        })), e._listenerAdded = !0)
                    }))
                })).observe(t, {
                    childList: !0,
                    subtree: !0
                })
            };
            e.querySelector("[data-name='widgetbar-pages-with-tabs']") && t();
            const n = new MutationObserver((o => {
                e.querySelector("[data-name='widgetbar-pages-with-tabs']") && (t(), n.disconnect())
            }));
            n.observe(e.body, {
                childList: !0,
                subtree: !0
            });
            const o = e.querySelector("[aria-label='Show Object tree']");
            o && !o._listenerAdded && (o.addEventListener("click", (() => {
                const n = new MutationObserver((o => {
                    e.querySelector("[data-name='widgetbar-pages-with-tabs']") && (t(), n.disconnect())
                }));
                n.observe(e.body, {
                    childList: !0,
                    subtree: !0
                })
            })), o._listenerAdded = !0);
            const r = e.querySelector("[data-name='removeAllDrawingTools']");
            if (r) {
                const e = r.querySelector(".bg-KTgbfaP5");
                e && e.addEventListener("click", (() => {
                    a.triggerDeleteAction()
                }))
            }
            e.body.addEventListener("click", (e => {
                if (e.target.closest("[data-name='drawing-toolbar'] [data-name='remove']")) a.triggerDeleteAction();
                else {
                    if (e.target.closest("[data-name='popup-menu-container']")) {
                        if (e.target.closest("[data-name='remove-all']")) return void a.triggerDeleteAction();
                        if (e.target.closest("[data-name='remove-drawing-tools']")) return void a.triggerDeleteAction()
                    }(e.target.closest("[data-name='remove-all']") || e.target.closest("[data-name='remove-drawing-tools']")) && a.triggerDeleteAction()
                }
            })), new MutationObserver((() => {
                e.querySelectorAll('tr[data-role="menuitem"] .content-GJX1EXhk > .label-GJX1EXhk[data-label="true"]').forEach((e => {
                    e.textContent.trim().toLowerCase().startsWith("remove") && e.textContent.toLowerCase().includes("drawing") && !e._listenerAdded && (e.addEventListener("click", (() => {
                        a.triggerDeleteAction()
                    })), e._listenerAdded = !0)
                }))
            })).observe(e.body, {
                childList: !0,
                subtree: !0
            }), new MutationObserver((() => {
                e.querySelectorAll("div.menuWrap-Kq3ruQo8.context-menu").forEach((e => {
                    e.querySelectorAll('span.label-GJX1EXhk[data-label="true"]').forEach((e => {
                        if ("remove" === e.textContent.trim().toLowerCase() && !e._listenerAdded) {
                            const t = e.closest('tr[data-role="menuitem"]');
                            t && !t._listenerAdded && (t.addEventListener("click", (() => {
                                a.triggerDeleteAction()
                            })), t._listenerAdded = !0), e._listenerAdded = !0
                        }
                    }))
                }))
            })).observe(e.body, {
                childList: !0,
                subtree: !0
            })
        }
        async handleMakeACopyButton(e) {
            try {
                const t = e.querySelector('.menu-yyMUOAN9.menuWrap-Kq3ruQo8[data-name="popup-menu-container"]');
                if (!t) return;
                const n = t.querySelector('[data-name="save-load-menu-item-clone"]');
                n && !n._listenerAdded && (n.addEventListener("click", (() => {
                    try {
                        FyersCommonModule.saveChart.isCopyAction = !0;
                        const t = e.querySelector('button[name="save"][data-overflow-tooltip-text="Save"]');
                        t && !t._listenerAdded && (t.addEventListener("click", (() => {
                            try {
                                FyersCommonModule.saveChart.isCopyAction = !1
                            } catch (e) {
                                console.error("Error in save button click handler:", e)
                            }
                        })), t._listenerAdded = !0)
                    } catch (e) {
                        console.error("Error in make a copy button click handler:", e)
                    }
                })), n._listenerAdded = !0)
            } catch (e) {
                console.error("Error in handleMakeACopyButton:", e)
            }
        }
        static triggerDeleteAction() {
            FyersCommonModule.saveChart.isDeleteAction = !0;
            const e = tvWidget.activeChartIndex() + 1;
            FyersCommonModule.saveChart.deleteActionChartIds = FyersCommonModule.saveChart.deleteActionChartIds || new Set;
            const t = e - 1,
                n = tvWidget.chart(t).symbol() + "-" + e;
            FyersCommonModule.saveChart.deleteActionChartIds.add(n)
        }
    }
    const r = a,
        s = {
            content: "{}",
            id: null,
            name: "",
            timestamp: null
        },
        i = {
            sources: new Map,
            groups: new Map,
            lineToolsToValidate: [],
            groupsToValidate: []
        },
        l = class {
            constructor() {}
            checkIfChartHasAlreadyVolumeIndicator(e) {
                try {
                    return e.some((e => "Volume" === e ? .name))
                } catch (e) {
                    return console.error("Error in checkIfChartHasAlreadyVolumeIndicator", e), !1
                }
            }
        };
    return window.FyersCommonModule = new class {
        constructor() {
            this.helper = new o, this.saveChart = new class {
                constructor() {
                    this.MAX_DRAWINGS_LIMIT = globalConstants ? .config ? .drawing_optimisation_config ? .max_drawings_limit || 500, this.charts = [], this.studyTemplates = [], this.drawingTemplates = [], this.chartTemplates = [], this.drawings = {}, this.groups = {}, this.kodi_savechart_url = globalConstants ? .config ? .drawing_optimisation_config ? .kodi_savechart_url || "https://api-g1.fyers.in/tv/", this.indus_savechart_url = "https://api-t1.fyers.in/indus/user/v1/savechart/1.3/", this.loadingPromises = new Map, this.throttledApiCall = o.prototype.throttlePromise(this.throttledApiCall.bind(this), 10), this.layoutDrawingsData = {}, this.isDeleteAction = !1, this.deleteActionChartIds = new Set, this.currentLayoutId = null, this.newlyCreatedChartId = null, this.isCopyAction = !1, this.processedChartsForDeleteAction = new Set, this.totalChartsToProcess = 0, this.syncAllProcessedCharts = new Set, this.totalChartsForSyncAll = 0
                }
                async getAllCharts() {
                    localStorage.removeItem("processedCombinations"), localStorage.removeItem("sentCombinations");
                    try {
                        const e = await t.sendRequest(`${this.kodi_savechart_url}chart/meta?client=trading_platform&user=${token}`, "GET");
                        this.charts = e.data
                    } catch (e) {
                        console.log(`Error in new saveChart : fn [getAllCharts] :  ${e}`), TradeModules.common.hawkeye("ERROR", `Error in new saveChart : fn [getAllCharts] :  ${e}`)
                    } finally {
                        return this.charts
                    }
                }
                async removeChart(e, n = !0) {
                    localStorage.removeItem("sentCombinations");
                    const o = this.charts.findIndex((t => t.id == e));
                    if (-1 === o) return Promise.reject(new Error("Chart not found"));
                    this.charts.splice(o, 1);
                    try {
                        return await t.sendRequest(`${this.kodi_savechart_url}chart?client=trading_platform&user=${token}&chart=${e}&all=${n}`, "DELETE"), await Promise.resolve(e)
                    } catch (e) {
                        return console.log(`Error in new saveChart : fn [removeChart] :  ${e}`), TradeModules.common.hawkeye("ERROR", `Error in new saveChart : fn [removeChart] :  ${e}`), Promise.reject(e)
                    }
                }
                sanitizeChartData(e) {
                    try {
                        let t, n = e;
                        "string" == typeof e && (n = JSON.parse(e));
                        try {
                            t = JSON.parse(n.content)
                        } catch (e) {
                            t = "object" == typeof n.content ? n.content : n
                        }
                        if (t.charts && Array.isArray(t.charts)) try {
                            t.charts.some(((e, t) => {
                                try {
                                    return e.chartId !== (t + 1).toString()
                                } catch (e) {
                                    return console.error("Error checking chart ID:", e), !1
                                }
                            })) && (TradeModules.common.hawkeye("INFO", "Correcting chart IDs as they are not in sequence"), t.charts = t.charts.map(((e, t) => {
                                try {
                                    return { ...e,
                                        chartId: (t + 1).toString()
                                    }
                                } catch (t) {
                                    return console.error("Error updating chart:", t), e
                                }
                            })))
                        } catch (e) {
                            console.error("Error processing charts:", e)
                        }
                        return n.content = JSON.stringify(t), JSON.stringify(n)
                    } catch (t) {
                        return TradeModules.common.hawkeye("ERROR", `Error in sanitizeChartData: ${t}`), e
                    }
                }
                async saveChart(e) {
                    try {
                        let n = null;
                        e.id && (n = e.id, await this.removeChart(e.id, !1));
                        const o = { ...e,
                                id: n,
                                timestamp: Math.round(Date.now() / 1e3)
                            },
                            a = new FormData;
                        a.append("name", o.name), a.append("content", o.content), a.append("symbol", o.symbol), a.append("resolution", o.resolution);
                        const r = await t.sendRequest(`${this.kodi_savechart_url}chart?client=trading_platform&user=${token}${n?`&chart=${n}`:""}`, "POST", void 0, a);
                        if (n = n || r.id, !this.charts.some((e => e.id === n)) && (this.newlyCreatedChartId = n, this.isCopyAction && this.currentLayoutId)) try {
                            await this.copyDrawings(this.currentLayoutId, this.newlyCreatedChartId), TradeModules.common.hawkeye("ERROR", `Successfully copied drawings from layout ${this.currentLayoutId} to ${this.newlyCreatedChartId}`)
                        } catch (e) {
                            console.error("Error copying drawings:", e)
                        } finally {
                            this.isCopyAction = !1
                        }
                        return o ? .id || (o.id = n), delete o.content, this.charts.push(o), await this.getChartContent(n), await Promise.resolve(n)
                    } catch (e) {
                        return console.log(`Error in new saveChart : fn[saveChart] ${e}`), TradeModules.common.hawkeye("ERROR", `Error in new saveChart : fn[saveChart] ${e}`), await Promise.reject(`Chart not saved: ${e}`)
                    }
                }
                async getChartContent(e) {
                    if (e) {
                        if (localStorage.removeItem("processedCombinations"), !this.charts.find((t => t.id === e))) throw new Error("Chart not found");
                        try {
                            const n = await t.sendRequest(`${this.kodi_savechart_url}chart/content?client=trading_platform&user=${token}&chart=${e}`, "GET");
                            return this.stateWorkAround = {}, this.groupWorkAround = {}, "object" == typeof this.layoutDrawingsData[e] && null !== this.layoutDrawingsData[e] || (this.layoutDrawingsData[e] = {}), n ? .data ? .id && (this.currentLayoutId = n.data.id), n.data.content = this.sanitizeChartData(n.data.content), n.data.content
                        } catch (e) {
                            throw console.log(`Error in new saveChart : fn[getChartContent] ${e}`), TradeModules.common.hawkeye("ERROR", `Error in new saveChart : fn[getChartContent] ${e}`), e
                        }
                    }
                }
                async removeStudyTemplate(e) {
                    try {
                        for (var n = 0; n < this.studyTemplates.length; ++n)
                            if (this.studyTemplates[n].name === e.name) {
                                this.studyTemplates.splice(n, 1);
                                const o = `${this.indus_savechart_url}study_templates?client=trading_platform&user=${token}&template=${encodeURIComponent(e.name)}`;
                                return void await t.sendRequest(o, "DELETE")
                            }
                        throw new Error("Study template not found")
                    } catch (e) {
                        throw console.error("ERROR removeStudyTemplate:", e), TradeModules.common.hawkeye("ERROR", "ERROR removeStudyTemplate"), e
                    }
                }
                async getStudyTemplateContent(e) {
                    try {
                        for (var n = 0; n < this.studyTemplates.length; ++n)
                            if (this.studyTemplates[n].name === e.name) {
                                const n = `${this.indus_savechart_url}study_templates?client=trading_platform&user=${token}&template=${encodeURIComponent(e.name)}`,
                                    o = await t.sendRequest(n, "GET");
                                if (!o ? .data ? .content) throw new Error("No content found in template response");
                                return o.data.content
                            }
                        throw new Error("Study template not found")
                    } catch (e) {
                        throw console.error("ERROR getStudyTemplateContent:", e), TradeModules.common.hawkeye("ERROR", "ERROR getStudyTemplateContent"), e
                    }
                }
                async saveStudyTemplate(e) {
                    try {
                        const {
                            name: n,
                            content: a
                        } = e, s = n.trim(), i = r.prototype.checkIfStudyTemplateNameIsAlreadyPresentInOriginalArray(this.studyTemplates, n);
                        if (!i && r.prototype.checkIfStudyTemplateNameIsAlreadyPresentInModifiedArray(this.studyTemplatesWithTrimmedNames, s)) return void(o.prototype.isSymbolDetailsFromAPI() || FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.warning, "Study template already exists", "Please use a different name for your study template."));
                        const l = new FormData;
                        l.append("name", i ? n : s), l.append("content", a), this.studyTemplates.push(e), await t.sendRequest(`${this.indus_savechart_url}study_templates?client=trading_platform&user=${token}`, "POST", void 0, l)
                    } catch (e) {
                        throw console.error("ERROR saveStudyTemplate:", e), TradeModules.common.hawkeye("ERROR", "ERROR saveStudyTemplate"), e
                    }
                }
                async getAllStudyTemplates() {
                    try {
                        const e = await t.sendRequest(`${this.indus_savechart_url}study_templates?client=trading_platform&user=${token}`, "GET");
                        return this.studyTemplates = e.data, await this.getDrawingTemplates(), this.studyTemplatesWithTrimmedNames = [], this.studyTemplates.forEach((e => {
                            this.studyTemplatesWithTrimmedNames.push(e.name.trim())
                        })), this.studyTemplates
                    } catch (e) {
                        throw console.error("ERROR getAllStudyTemplates:", e), TradeModules.common.hawkeye("ERROR", "ERROR getAllStudyTemplates"), e
                    }
                }
                async removeDrawingTemplate(e, n) {
                    try {
                        for (var o = 0; o < this.drawingTemplates.length; ++o)
                            if (this.drawingTemplates[o] === n) return this.drawingTemplates.splice(o, 1), void await t.sendRequest(`${this.indus_savechart_url}drawing_templates?client=trading_platform&user=${token}&tool=${e}&name=${encodeURIComponent(n)}`, "DELETE");
                        throw new Error("Drawing template not found")
                    } catch (e) {
                        throw console.error("ERROR removeDrawingTemplate:", e), TradeModules.common.hawkeye("ERROR", "ERROR removeDrawingTemplate"), e
                    }
                }
                async loadDrawingTemplate(e, n) {
                    try {
                        if (!e || !n) return TradeModules.common.hawkeye("ERROR", `InValid toolName ${e} or templateName ${n}`), s;
                        const o = `${this.indus_savechart_url}drawing_templates?client=trading_platform&user=${token}&tool=${e}&name=${encodeURIComponent(n)}`,
                            a = await t.sendRequest(o, "GET");
                        return "ok" === a ? .status && a ? .data ? .content ? a.data.content : (TradeModules.common.hawkeye("ERROR", `Drawing template not found for tool ${e} and template ${n}`), s)
                    } catch (t) {
                        return console.log("ERROR loadDrawingTemplate:", t), TradeModules.common.hawkeye("ERROR", `Error in loadDrawingTemplate for tool ${e} and template ${n} , Error : ${t}`), s
                    }
                }
                async saveDrawingTemplate(e, n, o) {
                    try {
                        for (var a = 0; a < this.drawingTemplates.length + 1; a++) {
                            this.drawingTemplates[a] === n && this.drawingTemplates.splice(a, 1);
                            const r = new FormData;
                            r.append("content", o), await t.sendRequest(`${this.indus_savechart_url}drawing_templates?client=trading_platform&user=${token}&tool=${e}&name=${encodeURIComponent(n)}`, "POST", void 0, r);
                            break
                        }
                        return void this.drawingTemplates.push(n)
                    } catch (e) {
                        throw console.error("ERROR saveDrawingTemplate:", e), TradeModules.common.hawkeye("ERROR", "ERROR saveDrawingTemplate"), e
                    }
                }
                async getDrawingTemplates(e) {
                    try {
                        if (e) {
                            const n = await t.sendRequest(`${this.indus_savechart_url}drawing_templates?client=trading_platform&user=${token}&tool=${e}`, "GET");
                            this.drawingTemplates = n.data
                        }
                        return this.drawingTemplates.map((e => e))
                    } catch (e) {
                        throw console.error("ERROR getDrawingTemplates:", e), TradeModules.common.hawkeye("ERROR", "ERROR getDrawingTemplates"), e
                    }
                }
                checkIfSymbolIsAlreadyPresentInLayout(e) {
                    try {
                        const t = tvWidget.chartsCount();
                        for (let n = 0; n < t; n++)
                            if (tvWidget.chart(n).symbol() === e) return !0;
                        return !1
                    } catch (e) {
                        return console.log(e), !1
                    }
                }
                getActiveChartIndex() {
                    try {
                        const e = tvWidget.activeChart().symbol(),
                            t = tvWidget.chartsCount();
                        for (let n = 0; n < t; n++)
                            if (tvWidget.chart(n).symbol() === e) return n;
                        return 0
                    } catch (e) {
                        return console.log("Error getting active chart index:", e), 0
                    }
                }
                getActiveChartSymbolWithIndex() {
                    try {
                        const e = this.getActiveChartIndex();
                        return tvWidget.chart(e).symbol() + "-" + (e + 1)
                    } catch (e) {
                        return console.log("Error getting active chart symbol with index:", e), ""
                    }
                }
                generateSyncAllLogic(e, t, n) {
                    try {
                        const o = FyersCommonModule.saveChart.isDeleteAction && n && (FyersCommonModule.saveChart.deleteActionChartIds.has(parseInt(t)) || FyersCommonModule.saveChart.deleteActionChartIds.has(t) || FyersCommonModule.saveChart.deleteActionChartIds.has(e + "-" + t)) ? "&syncAll=true" : "";
                        return FyersCommonModule.saveChart.isDeleteAction && this.syncAllProcessedCharts.add(t), o
                    } catch (e) {
                        return console.error("Error in generateSyncAllLogic:", e), TradeModules.common.hawkeye("ERROR", `Error in generateSyncAllLogic: ${e}`), ""
                    }
                }
                async saveLineToolsAndGroups(e, n, a) {
                    try {
                        const s = await r.prototype.checkIfDrawingSyncIsON(),
                            i = n - 1,
                            l = tvWidget.chartsCount();
                        if (i < 0 || i >= l) return;
                        const c = tvWidget.chart(i).symbol();
                        this.isDeleteAction && (this.totalChartsToProcess = l, this.processedChartsForDeleteAction.add(n), this.totalChartsForSyncAll = l), this.isDeleteAction && this.syncAllProcessedCharts.size < this.totalChartsForSyncAll && this.syncAllProcessedCharts.add(n), this.drawings instanceof Map || (this.drawings = new Map), this.groups instanceof Map || (this.groups = new Map), l > 1 ? ("object" == typeof this.stateWorkAround && null !== this.stateWorkAround || (this.stateWorkAround = {}), this.stateWorkAround[n] = this.stateWorkAround[n] ? new Map([...this.stateWorkAround[n], ...a ? .sources]) : new Map(a ? .sources), this.drawings = this.stateWorkAround[n]) : this.drawings = new Map([...this.drawings, ...a.sources].filter((([e, t]) => null === t || t ? .symbol === c))), this.groups = new Map([...this.groups, ...a.groups].filter((([e, t]) => null !== t))), localStorage.removeItem("processedCombinations");
                        const d = "sentCombinations",
                            u = "activeChartSerializableObject";
                        JSON.parse(localStorage.getItem(d) || "{}");
                        let m = Array.from(a.sources.entries());
                        const h = Array.from(this.groups),
                            p = Array.from(this.drawings).filter((([e, t]) => t ? .symbol === c));
                        m = Array.from(new Map([...p, ...m].map((([e, t]) => [e, t]))).entries()), l > 1 && (m = Array.from(new Map([...m, ...p].map((([e, t]) => [e, t]))).entries()));
                        const y = Array.from(new Map([...m, ...h, ...p].map((([e, t]) => [e, t]))).entries());
                        let g = [];
                        try {
                            g = [...new Set(y.map((e => e && e[1] && e[1].symbol || null)).filter(Boolean))]
                        } catch (e) {
                            console.error("Error in creating uniqueSymbols:", e), TradeModules.common.hawkeye("ERROR", "Error in creating uniqueSymbols")
                        }
                        0 === g.length && g.push(c), g.map((async r => {
                            if (!await o.prototype.checkIfValidSymbol(r)) return;
                            let i = m.filter((e => {
                                if (e[1] && e[1].symbol) return e[1].symbol === r
                            }));
                            const l = m.filter((e => null === e[1]));
                            i = [...i, ...l], i = i.filter((([e, t]) => null !== t && null !== t.state));
                            const d = h.filter((e => e[1] && e[1].symbol === r)),
                                p = a.lineToolsToValidate.filter((e => i.some((t => t[0] === e)))),
                                y = a.groupsToValidate.filter((e => d.some((t => t[0] === e)))),
                                g = tvWidget.chart(n - 1).getAllShapes().map((e => e.id)),
                                w = i.filter((([e, t]) => g.includes(e) && null !== t && null !== t.state && null !== t.state.type));
                            if (i = w, r === tvWidget.chart(n - 1).symbol()) {
                                const l = { ...a,
                                        sources: w,
                                        groups: d,
                                        lineToolsToValidate: p,
                                        groupsToValidate: y
                                    },
                                    m = JSON.parse(localStorage.getItem(u) || "{}");
                                if (l.exactDrawingsCount = w.length.toString(), JSON.stringify(m) !== JSON.stringify(l) && tvWidget.chart(n - 1).getAllShapes().length === w ? .length) {
                                    localStorage.setItem(u, JSON.stringify(l));
                                    try {
                                        const a = new FormData;
                                        if (!(w.length > this.MAX_DRAWINGS_LIMIT)) {
                                            if (this.drawings = new Map, i.forEach((([e, t]) => {
                                                    null !== t && this.drawings.set(e, t)
                                                })), this.drawings = new Map([...this.drawings].filter((([e, t]) => null !== t))), a.append("content", JSON.stringify(l)), "0" !== l.exactDrawingsCount) {
                                                const o = this.generateSyncAllLogic(r, n, s),
                                                    i = await t.sendRequest(`${this.kodi_savechart_url}drawing?client=trading_platform&user=${token}&sync=${s}&layout=${encodeURIComponent(r)}-${n}&chart=${e}&drawing_count=${l.exactDrawingsCount}${o}`, "POST", void 0, a);
                                                return this.layoutDrawingsData[e][`${r}_${n}`] = l, i
                                            }
                                            if (FyersCommonModule.saveChart.isDeleteAction && "0" === l.exactDrawingsCount) {
                                                const o = this.generateSyncAllLogic(r, n, s),
                                                    i = await t.sendRequest(`${this.kodi_savechart_url}drawing?client=trading_platform&user=${token}&sync=${s}&layout=${encodeURIComponent(r)}-${n}&chart=${e}&drawing_count=${l.exactDrawingsCount}${o}`, "POST", void 0, a);
                                                return this.layoutDrawingsData[e][`${r}_${n}`] = l, i
                                            }
                                            return null
                                        }
                                        o.prototype.isSymbolDetailsFromAPI() ? window.flutter_inappwebview.callHandler("max_drawings_reached", {
                                            data: `You can only have a maximum of ${TRADE_CONFIG.MAX_DRAWINGS_LIMIT} drawings in chart ${n} ticker : ${c}`
                                        }) : FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.warning, "Maximum drawing limit reached", `You can only have a maximum of ${this.MAX_DRAWINGS_LIMIT} drawings in chart ${n} ticker : ${c}`)
                                    } catch (e) {
                                        return console.log(`Failed to send data for symbol ${r}`, e), TradeModules.common.hawkeye("ERROR", `Failed to send data for symbol ${r}`), Promise.reject(e)
                                    }
                                }
                            } else if (!this.checkIfSymbolIsAlreadyPresentInLayout(r)) {
                                const l = `${r}_${n}`;
                                if (!this.layoutDrawingsData[e] || !this.layoutDrawingsData[e][l]) return void TradeModules.common.hawkeye("ERROR", `Blocking POST call - symbol_chartId ${l} doesn't exist in store for layoutId ${e}`);
                                const c = this.layoutDrawingsData[e] ? .[`${r}_${n}`] || {};
                                i = m.filter((e => e[1] && (e[1].symbol === r || null === e[1])));
                                const u = c.sources ? [...c.sources || [], ...i].filter(((e, t, n) => n.findIndex((t => t[0] === e[0])) === t)) : i,
                                    h = c.groups ? [...c.groups || [], ...d].filter(((e, t, n) => n.findIndex((t => t[0] === e[0])) === t)) : d,
                                    g = c.lineToolsToValidate ? [...new Set([...c.lineToolsToValidate || [], ...p])] : p,
                                    w = c.groupsToValidate ? [...new Set([...c.groupsToValidate || [], ...y])] : y,
                                    f = u.filter((([e, t]) => null !== t && null !== t.state && null !== t.state.type)),
                                    v = h.filter((([e, t]) => null !== t)),
                                    b = { ...a,
                                        sources: f,
                                        groups: v,
                                        lineToolsToValidate: g,
                                        groupsToValidate: w
                                    },
                                    C = new FormData;
                                C.append("content", JSON.stringify(b));
                                const T = this.generateSyncAllLogic(r, n, s),
                                    R = `${this.kodi_savechart_url}drawing?client=trading_platform&user=${token}&sync=${s}&layout=${encodeURIComponent(r)}-${n}&chart=${e}&drawing_count=${f?.length}${T}`;
                                try {
                                    if (u ? .length > this.MAX_DRAWINGS_LIMIT) return void(o.prototype.isSymbolDetailsFromAPI() ? window.flutter_inappwebview.callHandler("max_drawings_reached", {
                                        data: `You can only have a maximum of ${this.MAX_DRAWINGS_LIMIT} drawings in chart ${n} ticker : ${r}`
                                    }) : FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.warning, "Maximum drawing limit reached", `You can only have a maximum of ${this.MAX_DRAWINGS_LIMIT} drawings in chart ${n} ticker : ${r}`));
                                    const a = await t.sendRequest(R, "POST", void 0, C);
                                    return this.layoutDrawingsData[e][`${r}_${n}`] = b, a
                                } catch (e) {
                                    console.error(`Error while sending request for ${r}:`, e)
                                }
                            }
                        }));
                        const w = tvWidget.activeChart().symbol(),
                            f = JSON.parse(localStorage.getItem(u) || "{}");
                        f.sources && f.sources[0] && f.sources[0][1] ? .symbol !== w && localStorage.removeItem(u), FyersCommonModule.saveChart.isDeleteAction && this.syncAllProcessedCharts.size >= this.totalChartsForSyncAll && setTimeout((() => {
                            FyersCommonModule.saveChart.isDeleteAction = !1, localStorage.removeItem("activeChartSerializableObject"), FyersCommonModule.saveChart.deleteActionChartIds.clear(), this.processedChartsForDeleteAction.clear(), this.totalChartsToProcess = 0, this.syncAllProcessedCharts.clear(), this.totalChartsForSyncAll = 0
                        }), 200)
                    } catch (e) {
                        console.log(`Error in new saveChart : fn[saveLineToolsAndGroups] ${e}`), TradeModules.common.hawkeye("ERROR", `Error in new saveChart : fn[saveLineToolsAndGroups] ${e}`)
                    }
                }
                async throttledApiCall(e, n) {
                    try {
                        return await t.sendRequest(e, "POST", void 0, n)
                    } catch (e) {
                        return null
                    }
                }
                async handleForFirstTimeSplit(e, t, n, o) {
                    this.splittingData instanceof Map || (this.splittingData = new Map), this.splittingData.set(o, n)
                }
                async loadLineToolsAndGroups(e, t, n, o) {
                    if (!(e = e || this.currentLayoutId)) {
                        if (this.charts && this.charts.length > 0) {
                            const e = this.charts[0].id;
                            if (e) return this.loadLineToolsAndGroups(e, t, n, o)
                        }
                        return {
                            sources: new Map
                        }
                    }
                    "object" == typeof this.layoutDrawingsData[e] && null !== this.layoutDrawingsData[e] || (this.layoutDrawingsData[e] = {});
                    const a = await r.prototype.checkIfDrawingSyncIsON(),
                        s = tvWidget.chart(t - 1).symbol();
                    localStorage.removeItem("sentCombinations"), JSON.parse(localStorage.getItem("processedCombinations") || "{}");
                    const l = `${e}_${t}_${s}_loadLineToolsAndGroups`;
                    if (this.loadingPromises.has(l)) return this.loadingPromises.get(l);
                    const c = `${this.kodi_savechart_url}drawing?client=trading_platform&user=${token}&sync=${a}&layout=${encodeURIComponent(s)}-${t}&chart=${e}`,
                        d = (async () => {
                            try {
                                const n = await fetch(c, {
                                    method: "GET",
                                    headers: {
                                        "Keep-Alive": "timeout=5, max=1000",
                                        authorization: token
                                    }
                                });
                                if (!n.ok) throw new Error(`HTTP error! status: ${n.status}`);
                                const o = await n.text(),
                                    r = JSON.parse(o),
                                    l = `${s}_${t}`;
                                if ("error" === r.s) return this.layoutDrawingsData[e][l] = i, {
                                    sources: new Map
                                };
                                const d = r ? .data ? .content ? JSON.parse(r.data.content) : i;
                                d.sources = new Map(d.sources);
                                const u = new Map;
                                for (let [e, t] of Object.entries(d)) u.set(e, t);
                                if (this.drawings = new Map, this.groups = new Map, d.sources.forEach(((e, t) => {
                                        null !== e && this.drawings.set(t, e)
                                    })), d.groups.forEach(((e, t) => {
                                        null !== e && this.groups.set(t, e)
                                    })), a) {
                                    const t = r.data.sync_content ? JSON.parse(r.data.sync_content) : null,
                                        n = d.sources ? .size > 0,
                                        o = t ? .sources ? .length > 0;
                                    if (n && o) {
                                        const e = new Map(t.sources || []),
                                            n = new Map(t.groups || []);
                                        let o = Array.from(e.values()).filter((e => e ? .symbol === s && null !== e ? .state)).length;
                                        new Map(d.sources).forEach(((t, n) => {
                                            o < this.MAX_DRAWINGS_LIMIT && t ? .symbol === s && null !== t ? .state && !e.has(n) && (e.set(n, t), o++)
                                        })), new Map(d.groups).forEach(((e, t) => {
                                            e ? .symbol !== s || null === e || n.has(t) || n.set(t, e)
                                        })), d.sources = e, d.groups = n, d.lineToolsToValidate = t.lineToolsToValidate || d.lineToolsToValidate, d.groupsToValidate = t.groupsToValidate || d.groupsToValidate
                                    } else n && !o ? (d.sources = new Map(d.sources), d.groups = new Map(d.groups)) : !n && o && (d.sources = new Map(t.sources), d.groups = new Map(t.groups));
                                    return this.layoutDrawingsData[e][l] = d, {
                                        sources: d.sources,
                                        groups: d.groups
                                    }
                                }
                                return this.layoutDrawingsData[e][l] = d, {
                                    sources: d.sources,
                                    groups: new Map(d.groups)
                                }
                            } catch (e) {
                                return console.error(`Error in new saveChart : fn[loadLineToolsAndGroups] ${e}`), TradeModules.common.hawkeye("ERROR", `Error in new saveChart : fn[loadLineToolsAndGroups] ${e}`), {
                                    sources: new Map
                                }
                            } finally {
                                this.loadingPromises.delete(l)
                            }
                        })();
                    return this.loadingPromises.set(l, d), d
                }
                static _getDrawingKey(e, t) {
                    return `${e}/${t}`
                }
                handleDeleteButtonEvents(e) {
                    return r.prototype.handleChartDeleteButtons(e)
                }
                handleMakeACopyButton(e) {
                    return r.prototype.handleMakeACopyButton(e)
                }
                async copyDrawings(e, n) {
                    try {
                        return await t.sendRequest(`${this.kodi_savechart_url}drawing/copy?client=trading_platform&user=${token}`, "POST", {
                            sourceLayoutId: e.toString(),
                            targetLayoutId: n.toString()
                        })
                    } catch (e) {
                        throw TradeModules.common.hawkeye("ERROR", `Error in new saveChart : fn[copyDrawings] ${e}`), e
                    }
                }
            }, this.customIndicator = new class {
                constructor() {
                    this.volumeIndicator = new class {
                        constructor() {}
                        applyVolumeIndicatorOnEnabledIndicesChart() {
                            try {
                                const {
                                    enabled_indices: e
                                } = globalConstants.config.indices_volume, t = tvWidget.chartsCount();
                                for (let n = 0; n < t; n++) {
                                    const t = tvWidget.chart(n),
                                        o = t.symbol();
                                    e.includes(o) && (l.prototype.checkIfChartHasAlreadyVolumeIndicator(t.getAllStudies() || []) || t.createStudy("Volume", !0, !1, {
                                        showMA: !0,
                                        length: 20,
                                        volumeMA: "SMA"
                                    }))
                                }
                            } catch (e) {
                                console.error("Error in applyVolumeIndicatorOnEnabledIndicesChart:", e)
                            }
                        }
                        async initiateVolumeIndicator() {
                            try {
                                let e = await t.sendRequest(globalConstants.dynamicUrl.watchlist.predefined_watchlist, "GET");
                                this.createSymblMappingForIndices(e)
                            } catch (e) {
                                console.log(e)
                            }
                        }
                        createSymblMappingForIndices(e) {
                            try {
                                const t = globalConstants ? .config ? .indices_volume ? .predefinedIndicesMapper,
                                    n = globalConstants ? .config ? .indices_volume ? .enabled_indices;
                                n.forEach((n => {
                                    const o = {},
                                        a = t[n];
                                    e.data.forEach((e => {
                                        e ? .id === a && e.symbols.forEach((e => {
                                            o[e] = {
                                                timestamp: null,
                                                accumVolume: 0,
                                                volume: 0,
                                                dayVolume: 0,
                                                firstTick: !0
                                            }
                                        }))
                                    })), o.realTimeVolume = 0, o.dayVolume = 0, FyTrade.data.dataPulseProvider._indicesSymbolMapping[n] = o
                                }))
                            } catch (e) {
                                console.log("Error in creating symbol mapping for indices", e)
                            }
                        }
                        subscribeConstituentSymbolIfneeded(e) {
                            try {
                                if (!FyersCommonModule ? .helper ? .checkIfClientIsEnabledForVolumeIndicator()) return;
                                globalConstants ? .config ? .indices_volume ? .enabled_indices ? .includes(e) && this.subscribeConstituentSymbols(e)
                            } catch (e) {
                                console.log(e)
                            }
                        }
                        subscribeConstituentSymbols(e) {
                            try {
                                let t = [];
                                Object.keys(FyTrade.data.dataPulseProvider._indicesSymbolMapping[e]).forEach((n => {
                                    n.includes(":") && !n.includes(e) && t.push(n)
                                })), "appChart" === window.APP_FLAG ? FyTrade.subscribeQuotesRtData(t, t, FyersCommonModule.customIndicator.volumeIndicator.realTimeSocketDataHandler, `${e}_volumeIndicator`) : FyTrade.subscribeQuotesRtData(t, t, (() => {}), `${e}_volumeIndicator`)
                            } catch (e) {
                                console.log(e)
                            }
                        }
                        realTimeSocketDataHandler(e) {
                            try {
                                if (Array.isArray(e))
                                    for (let t = 0; t < e.length; t++) FyersCommonModule.customIndicator.volumeIndicator.updateIndicesConstituentVolumeIfRequired(e[t])
                            } catch (e) {
                                console.log("Error in realTimeSocketDataHandler", e)
                            }
                        }
                        resetIndicesConstituentVolume(e = "") {
                            try {
                                const t = FyTrade ? .data ? .dataPulseProvider ? ._indicesSymbolMapping ? .[e];
                                if (!t) return;
                                t.realTimeVolume = 0, Object.values(t).forEach((e => {
                                    "object" == typeof e && null !== e && "accumVolume" in e && (e.accumVolume = 0, e.volume = 0, e.firstTick = !0)
                                }))
                            } catch (e) {
                                console.log(e)
                            }
                        }
                        updateR2realTimeVolume(e) {
                            try {
                                if (!e ? .volume) return;
                                e.n = e ? .symbol, e.v = {
                                    volume: e ? .volume,
                                    cmd: {
                                        t: e ? .ltt
                                    }
                                }, this.updateIndicesConstituentVolumeIfRequired(e)
                            } catch (e) {
                                console.log("Error in updateR2realTimeVolume", e)
                            }
                        }
                        updateIndicesConstituentVolumeIfRequired(e) {
                            try {
                                globalConstants ? .config ? .indices_volume ? .enabled_indices.forEach((t => {
                                    const n = FyTrade.data.dataPulseProvider._indicesSymbolMapping ? .[t];
                                    n ? .[e.n] && this.updateIndicesConstituentVolume(e.n, e)
                                }))
                            } catch (e) {
                                console.log(e)
                            }
                        }
                        updateIndicesConstituentVolume(e, t) {
                            try {
                                globalConstants.config.indices_volume.enabled_indices.forEach((n => {
                                    const o = n,
                                        a = FyTrade ? .data ? .dataPulseProvider ? ._indicesSymbolMapping ? .[o] ? .[e],
                                        r = t ? .v ? .volume,
                                        s = t ? .v ? .cmd ? .t;
                                    if (a && r)
                                        if (FyTrade.data.dataPulseProvider._indicesSymbolMapping[o].dayVolume = FyTrade.data.dataPulseProvider._indicesSymbolMapping[o].dayVolume - a.dayVolume + r, a.dayVolume = r, a.firstTick) a.accumVolume = r, a.timestamp = s, a.firstTick = !1;
                                        else {
                                            const e = r - a.accumVolume;
                                            a.volume += e, a.accumVolume = r, a.timestamp = s, FyTrade.data.dataPulseProvider._indicesSymbolMapping[o].realTimeVolume += e
                                        }
                                }))
                            } catch (e) {
                                console.log("Error in updating indices constituent volume", e)
                            }
                        }
                    }
                }
                initiateVolumeIndicator() {
                    this.volumeIndicator.initiateVolumeIndicator()
                }
            }
        }
    }, e
})()));