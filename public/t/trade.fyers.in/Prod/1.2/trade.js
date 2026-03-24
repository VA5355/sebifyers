! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.FyersTrade = t() : e.FyersTrade = t()
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
    const t = {
            FYERS_WEB_URL: "https://fyers.in/web",
            FYERS_OBJ: {
                WS1_URL: "wss://api-socket.fyers.in/hsm/v1",
                WS2_URL: "wss://socket.fyers.in/hsm/v1-5/web/prod",
                DATA_CONN: null,
                HISTORY_TEST: {
                    T: "H",
                    symbol: "NSE:NIFTY50-INDEX",
                    resolution: "1D",
                    FROM: 1524349248,
                    to: 1524835708,
                    token_id: "gAAAAABa1N59RgFWfiG1JD_W5KO143HKlj9Ezz6HMInChy8ud97qUSx01m3CMeyFk--Rrp13NSSUaGzvtstiim9nILsCOT3y1jDWSqsl5bmM1B2CXOW0V-M="
                },
                SUBSCRIBE_TICKER: {
                    T: "SUB_DATA",
                    TLIST: "",
                    SUB_T: 1
                },
                UNSUBSCRIBE_TICKER: {
                    T: "SUB_DATA",
                    TLIST: "",
                    SUB_T: 0
                },
                SUBSCRIBE_L2: {
                    T: "SUB_L2",
                    L2LIST: "",
                    SUB_T: 1
                },
                UNSUBSCRIBE_L2: {
                    T: "SUB_L2",
                    L2LIST: "",
                    SUB_T: 0
                }
            },
            WS_Fallback: "wss://api-socket.fyers.in/hsm/v1",
            WS1_URL: globalConstants ? .dynamicUrl ? .sockets ? .market_data_3 || "wss://api-socket.fyers.in/hsm/v1",
            WS2_URL: globalConstants ? .dynamicUrl ? .sockets ? .market_data_4 || "wss://socket.fyers.in/hsm/v1-5/web/prod",
            LOGIN_SOCKET_URL: globalConstants ? .dynamicUrl ? .sockets ? .login_socket || "wss://socket.fyers.in/login",
            TELI_PER_REQUEST_LIMIT: 95,
            FY_P_VAL_KEY: "v",
            FY_P_MIN_KEY: "cmd",
            FY_P_SEC_KEY: "csd",
            FY_P_STATUS: "s",
            INDEX_PREFIX: "INDEX",
            autoRefreshIntervalId: null,
            autoRefreshFlag: !0,
            userWatchlist: {
                _1: []
            },
            callbackInvalidate: null,
            titleUpdateIntervalId: null,
            titleUpdateSymbol: null,
            titleUpdateString: "FYERS",
            _allSymMinQty: {},
            loginUrlPath: globalConstants.dynamicUrl.login.login_web,
            loginUrlPath_CB: globalConstants.dynamicUrl.login.login_web + "?cb=https://trade.fyers.in",
            urlWebMain: "https://trade.fyers.in/",
            urlWebBeta: "https://betatrade.fyers.in/",
            kambalaUrl: globalConstants.dynamicUrl.web.base_mahi_kambala,
            kambalaWs: "wss://api-t2.fyers.in/juhu/dev/ws",
            fyersCookieName: "_FYERS",
            deviceIdCookieName: "_deviceId",
            fyersRefreshToken: "refresh_token",
            fyersUID: "_userID",
            fyersUName: "_userName",
            localStorageDefaulSuffix: "fyerstrade_",
            currencyPairs: ["USDINR", "EURINR", "GBPINR", "JPYINR", "EURUSD", "GBPUSD", "USDJPY"],
            productTypeIntraday: "INTRADAY",
            productTypeMargin: "MARGIN",
            productTypeCnc: "CNC",
            productTypeCo: "CO",
            productTypeBo: "BO",
            segmentCm: "cm",
            segmentFo: "fo",
            segmentCd: "cd",
            autoRefreshNotice: {
                title: "Auto-Refresh Enabled",
                body: "Enabling auto-refresh may cause your browser to become slow. Incase you experience slowness, kindly disable it."
            },
            autoRefreshNoticeAlreadyOn: {
                title: "Enable Auto-Refresh",
                body: "Looks like you have already enabled auto-refresh"
            },
            autoRefreshStop: {
                title: "Auto-Refresh Disabled",
                body: "Click on Refresh Trading Details when you want latest details from the server"
            },
            watchlistMaxScriptLengthError: "Maximum watchlist limit reached.",
            watchlistLengthNotice: {
                title: "Watchlist Size",
                body: "You have more than 30 symbols in your watchlist. Please remove few symbols for optimal performance."
            },
            watchlistSaveFail: {
                title: "Watchlist Auto-save Failed",
                body: "Your watchlist could not be saved."
            },
            watchlistLoadFail: {
                title: "Watchlist Load Failed",
                body: "Could not load the watchlist"
            },
            chartLoadFail: {
                title: "Popout chart load Failed.",
                body: "Could not load the chart"
            },
            multipleChartLoadFail: {
                title: "Popout chart load Failed.",
                body: "Multiple layout is not supported"
            },
            quotaExceeded: {
                title: "Popout chart failed",
                body: "There was an error while loading your current layout into the popout tab. As an alternative, you can save the layout and then load it in the popout tab."
            },
            changeThemeFail: {
                title: "Error while changing the theme",
                body: "Looks like there was an error while changing the theme. Please contact support if the issue persists."
            },
            watchlistMaxSize: 30,
            allWatchlists: {},
            predefinedWatchlists: {},
            watchlistSyncTime: 0,
            titleDict: {},
            duplicateWL: [],
            cdslAuthPopUp: {
                title: "CDSL Authorisation",
                body: "Authorise your holdings at CDSL to execute sell transactions."
            },
            getAllMinQtyFail: {
                title: "Minimum Quantity Error",
                body: "Could not receive the minimum quantity for derivative contracts. Please contact support"
            },
            orderPlacementFail: {
                title: "Order Placement Error",
                body: "There was an error while placing the order. Please refresh your trading details from the dashboard to check the status of the order."
            },
            orderModificationFail: {
                title: "Order Modification Error",
                body: "There was an error while modifying the order. Please refresh your trading details from the dashboard to check the status of the order."
            },
            orderCancellationFail: {
                title: "Order Cancellation Error",
                body: "There was an error while cancelling the order. Please refresh your trading details from the dashboard to check the status of the order."
            },
            orderInvalidCoverOrder: {
                title: "Invalid stoploss for Cover Order",
                body: "Stop loss price needs to be lower than entry price for long and higher for short"
            },
            noOmsId: {
                title: "Your order is in process.",
                body: "The order is still in the process and can't be modified or cancelled until the status is updated."
            },
            orderBracketTargetNotEnabled: {
                title: "Take Profit Orders Not Enabled",
                body: "Take profit orders are not yet enabled. This feature is coming soon."
            },
            orderCoStopLossNotProvided: {
                title: "Stop Loss is Mandatory for Cover Orders",
                body: "Stop Loss price is mandatory for Cover Orders. Kindly select Stop Loss check box and provide the stop loss price"
            },
            orderStopLossGivenWithoutCoProductType: {
                title: "Stop Loss only allowed for Cover Orders",
                body: "Stop loss should be given only if the product type is CO. If you want to place a normal stop loss order, you can select either Stop or StopLimit options above."
            },
            orderCoForStopLossOrderType: {
                title: "Invalid order type for Cover Order",
                body: "You can only place market or limit orders for leg 1 of the cover order."
            },
            orderBoInvalidLeg1: {
                title: "Invalid order type for Bracket Order",
                body: "You can only place limit orders for leg 1 of the bracket order."
            },
            orderBoStopLossNotProvided: {
                title: "Stop Loss is Mandatory for Bracket Orders",
                body: "Stop Loss price is mandatory for Bracket Orders."
            },
            orderBoTakeProfitNotProvided: {
                title: "Take profit is mandatory for Bracket Orders",
                body: "Take profit is mandatory for Bracket Orders."
            },
            orderBoTrailStopLossProvided: {
                title: "Trailing Stop Loss Feature",
                body: "Trailing stop loss feature has not been enabled. This feature will be available soon."
            },
            orderBoInputInputInPriceNotAbs: {
                title: "Invalid Bracket Order Input",
                body: "Input values of Stop Loss and Take Profit orders should be in points (Rupees) and not the actual price of the scrip."
            },
            orderCancelStatus: {
                title: "Orders cancellation",
                body: "Please check order book status for more info"
            },
            invalidSymbolRequest: {
                title: "Invalid Symbol",
                body: "Oh-oh! Looks like the symbol you're trying to add is invalid. Check for typos and spelling errors, or use different search items."
            },
            positionsCoInvalid: {
                title: "Invalid input for Cover Order Position",
                body: "Cover order positions can only be modified or exited from Orders tab"
            },
            positionsBoInvalid: {
                title: "Invalid input for Bracket Order Position",
                body: "Bracket order positions can only be modified or exited from Orders tab"
            },
            positionsCNCInvalid: {
                title: "Invalid input for CNC Position",
                body: "CNC positions can only be modified or exited from Orders tab"
            },
            modifyOrderCheckboxEnabled: {
                title: "Invalid input for order modification",
                body: "You cannot add stoploss or target to existing orders."
            },
            watchlist_cannotChangePredefined: {
                title: "Predefined Watchlist",
                body: "You are trying to change a predefined watchlist. These changes will not be saved to the server"
            },
            watchlist_maxSizeReached: {
                title: "Maximum limit reached",
                body: "Looks like you have exceeded the maximum number of symbols allowed per watchlist."
            },
            watchlist_deleteError: {
                title: "Watchlist Delete Failed",
                body: "Cannot delete this watchlist"
            },
            watchlist_duplicate: {
                title: "Duplicate Watchlist",
                body: "Watchlist with this name already exists."
            },
            corpActionError: {
                title: "Corp Action Error",
                body: "There was an error in corporate action"
            },
            watchlist_predifinedStartsWith: "predefined_",
            watchlist_customStartsWith: " ",
            openDashboardOnOrderPlacement: !1,
            orderRejectedContnet: {
                title: "Order Placement Failed!",
                body: "Kindly check your orderbook for more details."
            },
            placeOrderRejectionMessage: `Failed: ${globalConstants?.dynamicUrl?.trading?.orders_place}`,
            placeOrderNetworkErrorMessage: "Order Placement Failed , Please check your network connection and try again.",
            orderStatusMessages: {
                new: "Order sent successfully",
                executed: "Order executed",
                cancelled: "Order cancelled successfully",
                modified: "Order modified",
                rejected: "Order rejected"
            },
            OVERLAY_TYPES: {
                modal: "modal",
                error: "error",
                info: "info",
                warning: "warning"
            },
            toaster: {
                type: {
                    success: "success",
                    error: "error",
                    info: "info",
                    warning: "warning"
                },
                placeOrder: {
                    title: {
                        success: "Order placement success",
                        error: "Order placement failed"
                    },
                    desc: {
                        success: "Request sent successfully",
                        error: "Check orderbook for more details"
                    }
                },
                modifyOrder: {
                    title: {
                        success: "Order modification",
                        error: "Order modification failed",
                        modifyError: "Invalid Modification Request"
                    },
                    desc: {
                        success: "Request sent successfully",
                        error: "Check orderbook for more details",
                        modifyError: "You cannot modify the product type while modifying a pending order."
                    }
                },
                cancelOrder: {
                    title: {
                        success: "Order cancellation",
                        error: "Order cancellation failed"
                    },
                    desc: {
                        success: "Request sent successfully",
                        error: "Check orderbook for more details"
                    }
                },
                cancelOrders: {
                    title: {
                        success: "Cancel multiple orders",
                        error: "Cancel multiple orders failed"
                    },
                    desc: {
                        success: "Request sent successfully",
                        error: "Check orderbook for more details"
                    }
                },
                exitPositions: {
                    title: {
                        success: "Exit positions",
                        error: "Exit positions failed"
                    },
                    desc: {
                        success: "Positions closed successfully",
                        error: "Looks like there was an error while trying to close your positions"
                    }
                },
                convertPositions: {
                    title: {
                        success: "Your position has been converted successfully.",
                        error: "Position Conversion Error"
                    }
                },
                convertMtfPositions: {
                    title: {
                        success: "MTF position conversion request is successfully placed.",
                        error: "Position Conversion Error"
                    }
                },
                priceAlerts: {
                    title: "Price Alerts",
                    titles: {
                        1: "Alert created",
                        2: "Alert updated",
                        3: "Alert cancelled",
                        4: "Alert triggered"
                    },
                    ALERT_NOTIFICATION_TYPE_CREATE: 1,
                    ALERT_NOTIFICATION_TYPE_UPDATE: 2,
                    ALERT_NOTIFICATION_TYPE_DELETE: 3,
                    ALERT_NOTIFICATION_TYPE_TRIGGERED: 4
                },
                importWatchlistError: {
                    singleScript: "couldn't be added to the watchlist. Please check for typos and retry.",
                    multipleScript: "symbols couldn't be added to the watchlist. Please check for typos and retry."
                }
            },
            message_types: {
                information: "Information",
                error: "Error"
            },
            updateHoldingsCheck: 0,
            updateFundsCheck: 0,
            updateCounterholding: 5e3,
            updateCounterFunds: 5e3,
            INVALID_SESSION: "Looks like your session has been invalidated. Please relogin to continue",
            edisAuth: {
                title: "CDSL Authorisation",
                description: "Authorise your holdings at CDSL to execute sell transactions.",
                qtyHighError: "Quantity entered is higher than the available quantity",
                qtyZeroError: "Quantity to be authorized cannot be zero or lesser"
            },
            FUTURES: "FUTURES",
            MARKET_OPEN: 2,
            MARKET_PARTIALLY_OPEN: 7,
            AUTH_MAX_QTY: 100,
            API_CODES: {
                SUCCESS: 200,
                ERROR: [-50, -500, -53, -99],
                OA_SUCCESS: 1e3
            },
            KRA_REJECTED: "rejected",
            KRA_ONHOLD: "on_hold",
            KRA_INPROGRESS: "in_progress",
            SUCCESS: "success",
            KRA_PORTAL: "kra_portal",
            ARTICLE: "article",
            SUPPORT: "support",
            VIEWED_KRA_STATUS: "viewed_kra_status"
        },
        r = {
            wlVoyager: globalConstants.dynamicUrl.watchlist.web_get,
            wlDevURL: "https://api-t1.fydev.tech/voyager/dev",
            wlCDSLURL: globalConstants.dynamicUrl.cdsl.base_cdsl_v1,
            AUTH_CDSL_URL: globalConstants.dynamicUrl.cdsl.auth_cdsl,
            INDUS_API: globalConstants.dynamicUrl.data.base_indus,
            INDUS_API_2: globalConstants.dynamicUrl.data.base_indus,
            DATAFEED_URL: globalConstants.dynamicUrl.data.base_data,
            QUOTES_URL: globalConstants.dynamicUrl.web.base_api_d1,
            HISTORY_URL: globalConstants.dynamicUrl.data.history,
            SYMBOL_MASTER_URL: globalConstants.dynamicUrl.master_files.symbols_combined_gzip,
            LOGOUT: globalConstants.dynamicUrl.login.logout,
            DDPI: globalConstants.dynamicUrl.ddpi_mtf.ddpi_mtf_status || "https://api-a1.fyers.in/marina/v1/ddpi/status",
            MTF_AUTH: globalConstants.dynamicUrl.ddpi_mtf.mtf_auth_setup || "https://api-t1.fyers.in/cdsl/mtf/authorize_setup",
            MTF_BANNER: globalConstants.dynamicUrl.ddpi_mtf.mtf_auth_banner || "https://api-t1.fyers.in/cdsl/mtf/banner",
            MTF_AUTH_URL: "https://trade.fyers.in/mtfAuth.html",
            KRA_STATUS_API: globalConstants.dynamicUrl.open_account.kraStatusAPI
        },
        a = {
            DASHBOARD_COLORS: {
                profitText: "#089981",
                lossText: "#f23645",
                breakEvenText: "#131722",
                breakEventTextDark: "#d1d4dc"
            },
            EXCHANGE_NAME: {
                mcxExchange: "MCX"
            },
            CORRECTION_KEY: globalConstants ? .config ? .snooze ? .charts_correctionKey || "1815-1915:20231112;0915-1530:20240120;0915-1230:20240302",
            CORRECTION_KEY_SEGEMENT: {
                CURRENCY_MARKET: globalConstants ? .config ? .snooze ? .charts_correctionKey_segment ? .CURRENCY_MARKET || "1815-1915:20231112;0915-1530:20240120;0915-1230:20240302",
                COMMODITY_MARKET: globalConstants ? .config ? .snooze ? .charts_correctionKey_segment ? .COMMODITY_MARKET || "1815-1915:20231112;0915-1530:20240120;0915-1230:20240302",
                EQUITY_AND_DERIVATIVES_MARKET: globalConstants ? .config ? .snooze ? .charts_correctionKey_segment ? .EQUITY_AND_DERIVATIVES_MARKET || "1815-1915:20231112;0915-1530:20240120;0915-1230:20240302",
                DEFAULT: "1815-1915:20231112;0915-1530:20240120;0915-1230:20240302"
            },
            SESSION_HOLIDAYS_KEY: globalConstants ? .config ? .snooze ? .charts_sessionHolidayKey,
            SESSION_HOLIDAYS_KEY_SEGMENT: {
                CURRENCY_MARKET: globalConstants ? .config ? .snooze ? .charts_sessionHolidayKey_segment ? .CURRENCY_MARKET,
                COMMODITY_MARKET: globalConstants ? .config ? .snooze ? .charts_sessionHolidayKey_segment ? .COMMODITY_MARKET,
                EQUITY_AND_DERIVATIVES_MARKET: globalConstants ? .config ? .snooze ? .charts_sessionHolidayKey_segment ? .EQUITY_AND_DERIVATIVES_MARKET,
                DEFAULT: "20240126,20240329,20240815,20241002"
            },
            DATABASE_KEYS: {
                DB_NAME: "SYMBOL_MASTER",
                SM_OBJECT_STORE: "SM_STORE",
                SYMBOL_MASTER_DATA_KEY: "SM_DATA",
                TIMESTAMP_KEY: "SM_TIMESTAMP"
            },
            MARKS_API_EMPTY_RESPONSE: {
                code: 200,
                data: [],
                message: "",
                s: "ok"
            },
            MULTI_SYMBOLS_INVALID_RESPONSE: {
                code: 200,
                data: [{
                    code: -300,
                    message: "Please provide a valid symbol",
                    s: "error"
                }],
                message: "",
                s: "ok"
            },
            SYMBOL_API_INVALID_RESPONSE: {
                code: -300,
                message: "Please provide a valid symbol",
                s: "error"
            }
        },
        s = class {
            changeTheme() {
                const e = FyTrade.DEFINES.localStorageDefaulSuffix + "themeStyle",
                    t = tvWidget.getTheme();
                if (null == t || "light" == t ? (tvWidget.changeTheme("dark"), localStorage.setItem(e, "dark"), document.getElementById("d-fyers-widgets").classList.add("d-dark")) : "dark" == t ? (tvWidget.changeTheme("light"), localStorage.setItem(e, "light"), document.getElementById("d-fyers-widgets").classList.remove("d-dark")) : FyTrade.common._showNoticeToUser(FyTrade.DEFINES.changeThemeFail.title, FyTrade.DEFINES.changeThemeFail.body, FyTrade.DEFINES.OVERLAY_TYPES.error), optionChainThemeFlag) {
                    const r = $(".e-outer-wrapper");
                    t = localStorage.getItem(e), "dark" == t ? (r.removeClass("e-light-bg"), r.$(".e-outer-wrapper").addClass("e-dark-bg")) : (r.removeClass("e-dark-bg"), r.addClass("e-light-bg"))
                }
                if (basketOrderThemeFlag) {
                    const r = $(".e-bo-outer-wrapper");
                    t = localStorage.getItem(e), "dark" == t ? (r.removeClass("e-light-theme"), r.addClass("e-dark-theme")) : (r.removeClass("e-dark-theme"), r.addClass("e-light-theme"))
                }
            }
            logoutUser() {
                var e = this;
                try {
                    FyTrade.request._sendRequestLogout().then((t => {
                        gtag("config", "G-NTFX8XLKVH", {
                            user_id: null
                        }), t.status, e.invalidateCookie(), window.location = FyTrade.DEFINES.loginUrlPath_CB, e.removeDisclosureCookie()
                    }))
                } catch (t) {
                    TradeModules.common.hawkeye("ERROR", "Unable to logout the user!"), e.invalidateCookie(), window.location = FyTrade.DEFINES.loginUrlPath_CB
                }
            }
            removeDisclosureCookie() {
                document.cookie = "riskDisclosureStatus=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain=.fyers.in"
            }
            invalidateCookie() {
                const e = `fy_notifaction_ids_${(new Date).toLocaleDateString()}`;
                try {
                    document.cookie.indexOf(FyTrade.DEFINES.fyersCookieName) >= 0 && (document.cookie = FyTrade.DEFINES.fyersCookieName + "=-1;expires=Thu, 01 Jan 2018 12:00:00 UTC;path=/;domain=.fyers.in", tokenId = "-1"), document.cookie.indexOf(FyTrade.DEFINES.fyersRefreshToken) >= 0 && (document.cookie = FyTrade.DEFINES.fyersRefreshToken + "=-1;expires=Thu, 01 Jan 2018 12:00:00 UTC;path=/;domain=.fyers.in"), document.cookie.indexOf(e) >= 0 && (document.cookie = e + "=-1;expires=Thu, 01 Jan 2018 12:00:00 UTC;path=/;domain=.fyers.in"), document.cookie = FyTrade.DEFINES.deviceIdCookieName + "=-1;expires=Thu, 01 Jan 2018 12:00:00 UTC;path=/;domain=.fyers.in"
                } catch (e) {
                    throw e
                }
            }
            getSymbolMasterData(e) {
                try {
                    return datafeed.unzippedData.data ? .[e]
                } catch (e) {
                    throw "Unable read datafeed"
                }
            }
            getSymbolMasterValue(e, t) {
                try {
                    const r = datafeed.unzippedData.data_format.indexOf(t);
                    return e ? .[r]
                } catch (e) {
                    throw `Error while getting datafeed value ${t}: ${e}`
                }
            }
            createGuid(e) {
                return e + Math.random().toString(20).substring(2, 8) + Math.random().toString(20).substring(2, 8)
            }
            invalidSymbolsName(e = [], t = 5, r = 20) {
                try {
                    let a = [];
                    for (let s = 0; s < e.length && s !== t; s++) {
                        const t = e[s];
                        if (t.length >= r) {
                            const e = TradeModules.basketWindow.helper.truncateText(t, 15);
                            a.push(e)
                        } else a.push(t)
                    }
                    return a
                } catch (e) {
                    return console.log(e), []
                }
            }
            convertTimestampToHumanReadable(e) {
                const t = new Date(e);
                return t.toDateString() + ", " + t.toLocaleTimeString()
            }
            async KRAStatusBannerTrigger() {
                const e = await FyTrade.service.fetchBannerStatusForKRAStatus();
                e.code === FyTrade.DEFINES.API_CODES.OA_SUCCESS ? (FyTrade.helper.addKRAStatusBanner(e ? .data), e ? .data ? .cvlurl && localStorage.setItem("cvl_kra_portal", e ? .data ? .cvlurl)) : console.warn("KRA Status Banner Response failed")
            }
            launchArticleForKRA(e) {
                switch (e) {
                    case t.ARTICLE:
                        window.open(globalConstants ? .config ? .redirections ? .kra_status_article, "_blank");
                        break;
                    case t.SUPPORT:
                        window.open(globalConstants ? .config ? .redirections ? .contact_us, "_blank");
                        break;
                    case t.KRA_PORTAL:
                        window.open(localStorage.getItem("cvl_kra_portal"), "_blank");
                        break;
                    default:
                        throw new Error("Failed to launch url")
                }
            }
            addKRAStatusBanner(e) {
                if (e ? .type == t.SUCCESS) {
                    for (var r = "", a = 0; a < e ? .ActiveSegments ? .length; a++) r = a < e.ActiveSegments.length - 1 ? `${r} ${e.ActiveSegments[a]}${a<e.ActiveSegments.length-2?",":""}` : `${r} and ${e.ActiveSegments[a]}.`;
                    "true" != localStorage.getItem(t.VIEWED_KRA_STATUS) && (localStorage.setItem(t.VIEWED_KRA_STATUS, !0), FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.success, e.cvlstatus, e.message + r))
                } else if (e ? .type == t.KRA_INPROGRESS || e ? .type == t.KRA_REJECTED || e ? .type == t.KRA_ONHOLD) {
                    localStorage.setItem(t.VIEWED_KRA_STATUS, !1);
                    let r = `<section \n            id="kra-status-messageBar" \n            class="col-lg-12 d-flex kra-status-banner kra-status-banner-bg-${e.type==t.KRA_INPROGRESS?"yellow":e.type==t.KRA_REJECTED?"red":"orange"} text-center"\n            >\n            <div id="frontSection" class="row col-lg-12 text-center text-center-kra-banner"> \n                <img id="warning-icon-img" class="mt-2 kra-status-img img-fluid" src="https://assets.fyers.in/images/trade/${e?.type==t.KRA_INPROGRESS?"kra_inprogress":e?.type==t.KRA_REJECTED?"kra_rejected":"kra_on_hold"}.svg" alt="icon" />\n                <span id="Mtf-text-content-title" class="mt-12 ml-3 kra-status-banner-title kra-status-banner-text-${e.type==t.KRA_INPROGRESS?"yellow":e.type==t.KRA_REJECTED?"red":"orange"} kra-status-banner ">${e?.cvlstatus}:</span>\n                <span id="Mtf-text-content-desc" class="ml-1 mt-12 kra-status-banner kra-banner-desc">${e.message}&nbsp;</span>\n                ${e.type==t.KRA_INPROGRESS?"":`<p class="mt-12 kra-status-banner kra-banner-desc">\n                ${e.type==t.KRA_REJECTED||e.type==t.KRA_ONHOLD&&e.exchange_hold?' Contact <span class="text-primary pointer" onclick="FyTrade.helper.launchArticleForKRA(\'support\')">Support</span> or read this <span class="text-primary pointer" onclick="FyTrade.helper.launchArticleForKRA(\'article\')">article</span> for details.':' Visit the <span class="text-primary pointer" onclick="FyTrade.helper.launchArticleForKRA(\'kra_portal\')">KRA Portal</span> to resolve it and read this <span class="pointer text-primary" onclick="FyTrade.helper.launchArticleForKRA(\'article\')">article</span> for details.'}\n                </p>`}\n                </div>\n            </section>`;
                    const a = $("#kra-status-messageBar");
                    a.length ? a.removeClass("d-none").addClass("d-flex") : $(r).insertBefore("#tv_chart_container"), "light" == JSON.parse(FyTrade.common.getUserSettingsDataFromLocalStorage()).theme.toLowerCase() ? ($(".kra-status-banner").removeClass("kra-banner-dark"), $(".kra-status-banner").addClass("kra-banner-light")) : ($(".kra-status-banner").addClass("kra-banner-dark"), $(".kra-status-banner").removeClass("kra-banner-light"))
                }
            }
            async mtfIndex(e) {
                let a = await FyTrade.service.fetchMtfAuthoFlow(),
                    s = a ? .data;
                if (a.code === t.API_CODES.SUCCESS) try {
                    localStorage.setItem("htmlContent", s), e.location.href = `${r.MTF_AUTH_URL}?token_id=${token}`
                } catch (t) {
                    e.close(), FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.info, "Please allow popup", "To ensure you enjoy all our website's features seamlessly, please enable pop-ups for FYERS in your browser settings.")
                } else e.close(), FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.error, a.message, a.data)
            }
            getOrderSource(e) {
                try {
                    if (!e || !e.includes(":")) return "";
                    const t = e ? .split(":")[1];
                    return t.includes("_") ? t.split("_")[0] : t.split("-")[0]
                } catch (e) {
                    return console.log(e), ""
                }
            }
            getCorrectionKeyForSegment(e) {
                try {
                    switch (e) {
                        case 10:
                        case 11:
                            return a.CORRECTION_KEY_SEGEMENT.EQUITY_AND_DERIVATIVES_MARKET;
                        case 12:
                            return a.CORRECTION_KEY_SEGEMENT.CURRENCY_MARKET;
                        case 20:
                            return a.CORRECTION_KEY_SEGEMENT.COMMODITY_MARKET;
                        default:
                            return a.CORRECTION_KEY_SEGEMENT.DEFAULT
                    }
                } catch (e) {
                    return console.log(e), a.CORRECTION_KEY_SEGEMENT.DEFAULT
                }
            }
            getSessionHolidayForSegment(e) {
                try {
                    switch (e) {
                        case 10:
                        case 11:
                            return a.SESSION_HOLIDAYS_KEY_SEGMENT.EQUITY_AND_DERIVATIVES_MARKET;
                        case 12:
                            return a.SESSION_HOLIDAYS_KEY_SEGMENT.CURRENCY_MARKET;
                        case 20:
                            return a.SESSION_HOLIDAYS_KEY_SEGMENT.COMMODITY_MARKET;
                        default:
                            return a.SESSION_HOLIDAYS_KEY_SEGMENT.DEFAULT
                    }
                } catch (e) {
                    return console.log(e), a.SESSION_HOLIDAYS_KEY_SEGMENT.DEFAULT
                }
            }
        },
        o = {
            MONTHLY_DERIVATIVE: /[1-3][0-9]JAN|[1-3][0-9]FEB|[1-3][0-9]MAR|[1-3][0-9]APR|[1-3][0-9]MAY|[1-3][0-9]JUN|[1-3][0-9]JUL|[1-3][0-9]AUG|[1-3][0-9]SEP|[1-3][0-9]OCT|[1-3][0-9]NOV|[1-3][0-9]DEC/,
            WEEKLY_DERIVATIVE: /[1-3][0-9][1-9][0-3][0-9]|[1-3][0-9]O[0-3][0-9]|[1-3][0-9]N[0-3][0-9]|[1-3][0-9]D[0-3][0-9]/,
            NSE: /^NSE:[A-Za-z0-9][A-Za-z0-9&\.\-]{1,29}(CE|PE)?$/,
            BSE: /^BSE:[A-Za-z0-9][A-Za-z0-9&\.\-]{1,29}(CE|PE)?$/,
            MCX: /^MCX:[A-Za-z0-9][A-Za-z0-9&\.\-]{1,29}$/,
            GM: /^GM:[A-Za-z0-9][A-Za-z0-9&\.\-]{1,29}$/
        },
        i = class {
            constructor() {}
            parseJWT(e) {
                const t = e.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"),
                    r = this.decodeBase64Url(t);
                return JSON.parse(r)
            }
            getIfClientIsEnabledForMtf() {
                try {
                    return "Y" === this.parseJWT(getCookie("_FYERS")).cug_mtf
                } catch (e) {
                    return console.log(e), !1
                }
            }
            getMtfEnableFlag() {
                return FyTrade.common.getConfigFlag("is_mtf_enabled") || this.getIfClientIsEnabledForMtf()
            }
            decodeBase64Url(e) {
                const t = e.padEnd(e.length + (4 - e.length % 4) % 4, "="),
                    r = window.atob(t);
                return decodeURIComponent(Array.from(r).map((e => "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2))).join(""))
            }
            chunkArray(e, t) {
                for (var r = [], a = 0; a < e.length; a += t) r.push(e.slice(a, a + t));
                return r
            }
            fy_showToaster(e, t, r, a, s) {
                void 0 === t && (t = ""), void 0 === r && (r = ""), void 0 === a && (a = ""), void 0 === s && (s = 5e3);
                var o = {
                    type: e,
                    title: t,
                    desc: r,
                    desc_sub: a
                };
                FyersWidget.toaster.getToaster(o, s)
            }
            _showNoticeToUser(e, t, r) {
                FyersWidget.popup_msg.getPopup({
                    category: "normal",
                    type: r,
                    title: e,
                    desc: t,
                    desc_title: "",
                    pri_btn: "OK",
                    desc_sub: ""
                })
            }
            getCurrentTimeStamp() {
                var e = new Date;
                return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0, 0, 0).getTime()
            }
            getTimeString() {
                return (new Date).toLocaleString().split(",")[1].trim()
            }
            getTimeStamp() {
                return Math.round((new Date).getTime() / 1e3)
            }
            isValidSearchSymbol(e) {
                return /^[-A-Z0-9&:(). ]*$/.test(e)
            }
            extractField(e, t, r) {
                var a = e[t];
                return Array.isArray(a) ? a[r] : a
            }
            definedValueOrDefault(e, t) {
                return void 0 !== e ? e : t
            }
            checkCorpActionAndUpdate(e) {
                const t = tvWidget.activeChart().getCheckableActionState("hideAllMarks");
                t && e ? broker.changeCorpActionView() : t || e || broker.changeCorpActionView()
            }
            updateFundsWithTimer() {
                0 == t.updateFundsCheck && (setTimeout((() => {
                    FyTrade.broker._updateAvailableFunds(), t.updateFundsCheck = 0
                }), t.updateCounterFunds), t.updateFundsCheck = 1)
            }
            getDdpiFlag() {
                return "Y" === this.parseJWT(token).isDdpiEnabled || !1
            }
            getMtfFlag() {
                try {
                    return "Y" === this.parseJWT(token).isMtfEnabled || !1
                } catch (e) {
                    return console.log(e), !1
                }
            }
            getConfigFlag(e) {
                return globalConstants.config.enabled_features[e]
            }
            getClientSpecificFlag(e) {
                const t = this.parseJWT(token).fy_id || "",
                    r = t[0] || "";
                return e.includes(t) || e.includes(r)
            }
            getHSMenabledClient() {
                const e = globalConstants ? .config ? .hsm_config ? .cug_web,
                    t = this.parseJWT(token).fy_id;
                return !!globalConstants ? .config ? .hsm_config ? .enable_web || !!e.includes(t.slice(0, 1))
            }
            getSmartOrderSource(e) {
                try {
                    if (!e) return "";
                    if (!e.includes("_") && !e.includes("-")) return "";
                    switch (s.prototype.getOrderSource(e)) {
                        case "SL":
                            return "Limit";
                        case "ST":
                            return "Step";
                        case "STSL":
                            return "Trail";
                        case "SIP":
                            return "SIP";
                        default:
                            return ""
                    }
                } catch (e) {
                    return console.log(e), ""
                }
            }
            async checkIfSymbolsAreValid(e) {
                try {
                    if (!e) return !1;
                    const t = datafeed.unzippedData ? .data ? .[e];
                    if (t ? .length) return !0;
                    const r = {
                            symbol: e.toUpperCase()
                        },
                        a = await FyTrade.dataService.symbolService2(r);
                    return !(!a ? .data || !Object.keys(a.data).length || a.data.expired)
                } catch (e) {
                    return console.log("Error in checkIfSymbolsAreValid:", e), !1
                }
            }
            checkIfValidFormatForSymbol(e) {
                try {
                    return o.NSE.test(e) || o.BSE.test(e) || o.MCX.test(e) || o.GM.test(e)
                } catch (e) {
                    return console.log(e), !0
                }
            }
            checkIfMcxOrIndexScript(e) {
                try {
                    return this.checkIfMcxScript(e) || this.checkIfIndexScript(e)
                } catch (e) {
                    return console.log(e), !0
                }
            }
            checkIfMcxScript(e) {
                try {
                    return e.startsWith("MCX")
                } catch (e) {
                    return console.log(e), !0
                }
            }
            checkIfIndexScript(e) {
                try {
                    return e.endsWith("-INDEX")
                } catch (e) {
                    return console.log(e), !0
                }
            }
            getCorectionSessionTime() {
                try {
                    const e = a.CORRECTION_KEY.split(";");
                    let t = (1 === e.length ? e[0] : e[e.length - 1]).split(":")[0];
                    const r = t.split("-")[0],
                        s = t.split("-")[1];
                    return {
                        sh: parseInt(r.slice(0, 2)),
                        sm: parseInt(r.slice(2, 4)),
                        eh: parseInt(s.slice(0, 2)),
                        em: parseInt(s.slice(2, 4))
                    }
                } catch (e) {
                    return console.log(e), {}
                }
            }
            getUserSettingsDataFromLocalStorage() {
                return localStorage.getItem("userSettingsData")
            }
        },
        n = {
            DEFAULt_CONFIG: {},
            TELI_FYERS_SYMBOL_MAPPING: {
                "NSE:NIFTY50-INDEX": "Nifty 50",
                "NSE:HANGSENG BEES-NAV-INDEX": "HangSeng BeES-NAV",
                "NSE:INDIAVIX-INDEX": "India VIX",
                "NSE:NIFTYIT-INDEX": "Nifty IT",
                "NSE:NIFTYNXT50-INDEX": "Nifty Next 50",
                "NSE:NIFTYBANK-INDEX": "Nifty Bank",
                "NSE:NIFTY500-INDEX": "Nifty 500",
                "NSE:NIFTY100-INDEX": "Nifty 100",
                "NSE:NIFTYMIDCAP50-INDEX": "Nifty Midcap 50",
                "NSE:NIFTYREALTY-INDEX": "Nifty Realty",
                "NSE:NIFTYINFRA-INDEX": "Nifty Infra",
                "NSE:NIFTYENERGY-INDEX": "Nifty Energy",
                "NSE:NIFTYFMCG-INDEX": "Nifty FMCG",
                "NSE:NIFTYMNC-INDEX": "Nifty MNC",
                "NSE:NIFTYPHARMA-INDEX": "Nifty Pharma",
                "NSE:NIFTYPSE-INDEX": "Nifty PSE",
                "NSE:NIFTYPSUBANK-INDEX": "Nifty PSU Bank",
                "NSE:NIFTYSERVSECTOR-INDEX": "Nifty Serv Sector",
                "NSE:NIFTYAUTO-INDEX": "Nifty Auto",
                "NSE:NIFTY ALPHA 50-INDEX": "NIFTY Alpha 50",
                "NSE:NIFTYMETAL-INDEX": "Nifty Metal",
                "NSE:NIFTYMEDIA-INDEX": "Nifty Media",
                "NSE:NIFTY200-INDEX": "Nifty 200",
                "NSE:NIFTYDIVOPPS50-INDEX": "Nifty Div Opps 50",
                "NSE:NIFTYCOMMODITIES-INDEX": "Nifty Commodities",
                "NSE:NIFTYCONSUMPTION-INDEX": "Nifty Consumption",
                "NSE:FINNIFTY-INDEX": "Nifty Fin Service",
                "NSE:NIFTY50DIVPOINT-INDEX": "Nifty50 Div Point",
                "NSE:NIFTY100LIQ15-INDEX": "Nifty100 Liq 15",
                "NSE:NIFTYCPSE-INDEX": "Nifty CPSE",
                "NSE:NIFTYGROWSECT15-INDEX": "Nifty GrowSect 15",
                "NSE:NIFTY50PR2XLEV-INDEX": "Nifty50 PR 2x Lev",
                "NSE:NIFTY50PR1XINV-INDEX": "Nifty50 PR 1x Inv",
                "NSE:NIFTY50TR2XLEV-INDEX": "Nifty50 TR 2x Lev",
                "NSE:NIFTY50TR1XINV-INDEX": "Nifty50 TR 1x Inv",
                "NSE:NIFTY50VALUE20-INDEX": "Nifty50 Value 20",
                "NSE:NIFTYMIDLIQ15-INDEX": "Nifty Mid Liq 15",
                "NSE:NIFTYPVTBANK-INDEX": "Nifty Pvt Bank",
                "NSE:NIFTYMIDCAP100-INDEX": "NIFTY MIDCAP 100",
                "NIFTYSMLCAP100-INDEX": "NIFTY SMLCAP 100",
                "NSE:NIFTYGS813YR-INDEX": "Nifty GS 8 13Yr",
                "NSE:NIFTYGS10YR-INDEX": "Nifty GS 10Yr",
                "NSE:NIFTYGS10YRCLN-INDEX": "Nifty GS 10Yr Cln",
                "NSE:NIFTYGS48YR-INDEX": "Nifty GS 4 8Yr",
                "NSE:NIFTYGS1115YR-INDEX": "Nifty GS 11 15Yr",
                "NSE:NIFTYGS15YRPLUS-INDEX": "Nifty GS 15YrPlus",
                "NSE:NIFTYGSCOMPSITE-INDEX": "Nifty GS Compsite",
                "NSE:NIFTY50 EQL WGT-INDEX": "NIFTY50 EQL Wgt",
                "NSE:NIFTY100 EQL WGT-INDEX": "NIFTY100 EQL WGT",
                "NSE:NIFTY100 LOWVOL30-INDEX": "NIFTY100 LowVol30",
                "NSE:NIFTYALPHA50-INDEX": "NIFTY Alpha 50",
                "NSE:NIFTYMIDCAP150-INDEX": "NIFTY MIDCAP 150",
                "NSE:NIFTYSMLCAP50-INDEX": "NIFTY SMLCAP 50",
                "NSE:NIFTYSMLCAP250-INDEX": "NIFTY SMLCAP 250",
                "NSE:NIFTYMIDSML400-INDEX": "NIFTY MIDSML 400",
                "NSE:NIFTY200QUALTY30-INDEX": "NIFTY200 QUALTY30",
                "BSE:SENSEX-INDEX": "SENSEX",
                "BSE:PSU-INDEX": "BSEPSU",
                "BSE:TECK-INDEX": "TECK",
                "BSE:BANKEX-INDEX": "BANKEX",
                "BSE:AUTO-INDEX": "AUTO",
                "BSE:METAL-INDEX": "METAL",
                "BSE:OILGAS-INDEX": "OILGAS",
                "BSE:100-INDEX": "BSE100",
                "BSE:REALTY-INDEX": "REALTY",
                "BSE:POWER-INDEX": "POWER",
                "BSE:IPO-INDEX": "BSEIPO",
                "BSE:INFRA-INDEX": "INFRA",
                "BSE:CPSE-INDEX": "CPSE",
                "BSE:200-INDEX": "BSE200",
                "BSE:MIDCAP-INDEX": "MIDCAP",
                "BSE:SMLCAP-INDEX": "SMLCAP",
                "BSE:FMC-INDEX": "BSEFMC",
                "BSE:HC-INDEX": "BSE HC",
                "BSE:IT-INDEX": "BSE IT",
                "BSE:ALLCAP-INDEX": "ALLCAP",
                "BSE:BASMTR-INDEX": "BASMTR",
                "BSE:CDGS-INDEX": "CDGS",
                "BSE:ENERGY-INDEX": "ENERGY",
                "BSE:500-INDEX": "BSE500",
                "BSE:FIN-INDEX": "FIN",
                "BSE:INDSTR-INDEX": "INDSTR",
                "BSE:LRGCAP-INDEX": "LRGCAP",
                "BSE:MIDSEL-INDEX": "MIDSEL",
                "BSE:SMLSEL-INDEX": "SMLSEL",
                "BSE:TELCOM-INDEX": "TELCOM",
                "BSE:UTILS-INDEX": "UTILS",
                "BSE:SNSX50-INDEX": "SNSX50",
                "BSE:SNXT50-INDEX": "SNXT50",
                "BSE:BHRT22-INDEX": "BHRT22",
                "BSE:ESG100-INDEX": "ESG100",
                "BSE:CG-INDEX": "BSE CG",
                "BSE:CD-INDEX": "BSE CD",
                "BSE:DFRG-INDEX": "DFRGRI",
                "BSE:SME IPO-INDEX": "SMEIPO",
                "BSE:150MIDCAP-INDEX": "MID150",
                "BSE:250SMALLCAP-INDEX": "SML250",
                "BSE:250LARGEMIDCAP-INDEX": "LMI250",
                "BSE:400MIDSMALLCAP-INDEX": "MSL400",
                "BSE:GREENEX-INDEX": "GREENX",
                "BSE:QUALITY-INDEX": "BSEQUI",
                "BSE:CARBONEX-INDEX": "CARBON",
                "NSE:NIFTYQUALITY30-INDEX": "NIFTY100 Qualty30",
                "NSE:NIFTYSMLCAP100-INDEX": "NIFTY SMLCAP 100",
                "NSE:NIFTYHEALTHCARE-INDEX": "NIFTY HEALTHCARE",
                "NSE:NIFTYFINSRV2550-INDEX": "Nifty FinSrv25 50",
                "NSE:NIFTYCONSRDURBL-INDEX": "NIFTY CONSR DURBL",
                "NSE:NIFTYOILANDGAS-INDEX": "NIFTY OIL AND GAS",
                "NSE:MIDCPNIFTY-INDEX": "NIFTY MID SELECT",
                "NSE:NIFTY500MULTICAP-INDEX": "NIFTY500 MULTICAP",
                "NSE:NIFTY200MOMENTM30-INDEX": "Nifty200Momentm30",
                "NSE:NIFTYMICROCAP250-INDEX": "NIFTY MICROCAP250",
                "NSE:NIFTYINDDEFENCE-INDEX": "Nifty Ind Defence",
                "NSE:NIFTYTATA25CAP-INDEX": "Nifty Tata 25 Cap",
                "NSE:NIFTYMIDSMLHLTH-INDEX": "Nifty MidSml Hlth",
                "NSE:NIFTYMULTIMFG-INDEX": "Nifty Multi Mfg",
                "NSE:NIFTYMULTIINFRA-INDEX": "Nifty Multi Infra",
                "NSE:BHARATBOND-APR30-INDEX": "BHARATBOND-APR30",
                "NSE:BHARATBOND-APR31-INDEX": "BHARATBOND-APR31",
                "NSE:BHARATBOND-APR32-INDEX": "BHARATBOND-APR32",
                "NSE:BHARATBOND-APR33-INDEX": "BHARATBOND-APR33",
                "NSE:NIFTYINDTOURISM-INDEX": "Nifty Ind Tourism",
                "NSE:NIFTYCAPITALMKT-INDEX": "Nifty Capital Mkt",
                "NSE:NIFTY500MOMENTM50-INDEX": "Nifty500Momentm50",
                "NSE:NIFTYMS400MQ100-INDEX": "NiftyMS400 MQ 100",
                "NSE:NIFTYSML250MQ100-INDEX": "NiftySml250MQ 100",
                "NSE:NIFTYTOP10EW-INDEX": "Nifty Top 10 EW",
                "NSE:NIFTYAQL30-INDEX": "Nifty AQL 30",
                "NSE:NIFTYAQLV30-INDEX": "Nifty AQLV 30",
                "NSE:NIFTYEV-INDEX": "Nifty EV",
                "NSE:NIFTYHIGHBETA50-INDEX": "Nifty HighBeta 50",
                "NSE:NIFTYNEWCONSUMP-INDEX": "Nifty New Consump",
                "NSE:NIFTYCORPMAATR-INDEX": "Nifty Corp MAATR",
                "NSE:NIFTYLOWVOL50-INDEX": "Nifty Low Vol 50",
                "NSE:NIFTYMOBILITY-INDEX": "Nifty Mobility",
                "NSE:NIFTYQLTYLV30-INDEX": "Nifty Qlty LV 30",
                "NSE:NIFTYSML250Q50-INDEX": "Nifty Sml250 Q50",
                "NSE:NIFTYTOP15EW-INDEX": "Nifty Top 15 EW",
                "NSE:NIFTY100ALPHA30-INDEX": "Nifty100 Alpha 30",
                "NSE:NIFTY100ENHESG-INDEX": "Nifty100 Enh ESG",
                "NSE:NIFTY200VALUE30-INDEX": "Nifty200 Value 30",
                "NSE:NIFTY500EW-INDEX": "Nifty500 EW",
                "NSE:NIFTYMULTIMQ50-INDEX": "Nifty Multi MQ 50",
                "NSE:NIFTY500VALUE50-INDEX": "Nifty500 Value 50",
                "NSE:NIFTYTOP20EW-INDEX": "Nifty Top 20 EW",
                "NSE:NIFTYCOREHOUSING-INDEX": "Nifty CoreHousing",
                "NSE:NIFTYFINSEREXBNK-INDEX": "Nifty FinSerExBnk",
                "NSE:NIFTYHOUSING-INDEX": "Nifty Housing",
                "NSE:NIFTYIPO-INDEX": "Nifty IPO",
                "NSE:NIFTYMSFINSERV-INDEX": "Nifty MS Fin Serv",
                "NSE:NIFTYMSINDCONS-INDEX": "Nifty MS Ind Cons",
                "NSE:NIFTYMSITTELCM-INDEX": "Nifty MS IT Telcm",
                "NSE:NIFTYNONCYCCONS-INDEX": "Nifty NonCyc Cons",
                "NSE:NIFTYRURAL-INDEX": "Nifty Rural",
                "NSE:NIFTYSHARIAH25-INDEX": "Nifty Shariah 25",
                "NSE:NIFTYTRANSLOGIS-INDEX": "Nifty Trans Logis",
                "NSE:NIFTY50SHARIAH-INDEX": "Nifty50 Shariah",
                "NSE:NIFTY500LMSEQL-INDEX": "Nifty500 LMS Eql",
                "NSE:NIFTY500SHARIAH-INDEX": "Nifty500 Shariah",
                "NSE:NIFTY500QLTY50-INDEX": "Nifty500 Qlty50",
                "NSE:NIFTY500LOWVOL50-INDEX": "Nifty500 LowVol50"
            },
            TELI_FYERS_DATA_KEY_MAPPING: {
                cng: "ch",
                nc: "chp",
                ltp: "lp",
                op: "open_price",
                c: "prev_close_price",
                lo: "low_price",
                h: "high_price",
                ap: "ATP",
                tbq: "totBuy",
                tsq: "totSell",
                lcl: "lower_ckt",
                ucl: "upper_ckt",
                oi: "oi",
                bp: "bp",
                sp: "sp",
                bq: "bq",
                bs: "bs",
                ltq: "LTQ",
                iv: "lp",
                openingPrice: "open_price",
                ic: "prev_close_price",
                lowPrice: "low_price",
                highPrice: "high_price",
                fdtm: "L2_LTT",
                tvalue: "L2_LTT"
            },
            INSTRUMENT_EXCHANGE_MAPPING: {
                11: "mcx",
                12: "bse",
                10: "nse"
            },
            INSTRUMENT_SEGMENT_MAPPING: {
                10: "cm",
                11: "fo",
                12: "cd",
                20: "com"
            },
            ACTION_FLAG_MAPPING: {
                0: "mws",
                1: "ifs",
                2: "dps",
                3: "mwsp",
                4: "mwu",
                5: "dpu",
                6: "ifu"
            }
        };
    class l {
        constructor() {
            this.symMasterOnChartDownload = !1
        }
        mapTeleToFyersSymbols(e) {
            if (n.TELI_FYERS_SYMBOL_MAPPING.hasOwnProperty(e)) return n.TELI_FYERS_SYMBOL_MAPPING[e];
            console.log("Key not found :", e)
        }
        getSessionIdFromToken(e) {
            try {
                return i.prototype.parseJWT(e).hsm_key
            } catch (e) {
                return console.log("Error update session token :", e), null
            }
        }
        getSessionToken() {
            return this.getSessionIdFromToken(token)
        }
        getHSMauthRequest() {
            var e;
            try {
                if (i.prototype.getHSMenabledClient()) {
                    const t = globalConstants ? .config ? .hsm_config ? .user_type_web;
                    e = {
                        type: "cn",
                        sessionid: this.getSessionToken(),
                        mode: t || "M"
                    }
                } else e = {
                    sessionid: this.getSessionToken(),
                    type: "cn"
                }
            } catch (e) {
                console.log("error in getting hsm auth req", e)
            }
            return JSON.stringify(e)
        }
        getCurrentDate() {
            return (new Date).toLocaleString()
        }
        sanitizeSymbols(e) {
            return e.map((e => this.isInvalidSymbol(e)))
        }
        isInvalidSymbol(e) {
            return /_INR_#|_2|_1/.test(e) ? this.updatedSymbol(e) : e
        }
        updatedSymbol(e) {
            return e.split("_")[0]
        }
        getIndexMcxAndGenricSymbol(e) {
            var t = [],
                r = [],
                a = [];
            for (const s of e) s.endsWith("-INDEX") ? t.push(s) : s.startsWith("MCX") ? a.push(s) : r.push(s);
            return {
                mcxSymbols: a,
                indexSymbol: t,
                genricSymbol: r
            }
        }
        precisionForTitle(e) {
            return ["USDINR", "EURINR", "GBPINR", "JPYINR", "EURUSD", "GBPUSD", "USDJPY"].includes(e) ? 4 : 2
        }
        createGuid(e) {
            return e + Math.random().toString(20).substring(2, 8) + Math.random().toString(20).substring(2, 8)
        }
        updateSymbolList(e, t) {
            for (const r of e) t.includes(r) || t.push(r)
        }
        getSymbolInfoDict(e) {
            try {
                let t = "NSE",
                    r = datafeed.unzippedData ? .data ? .[e],
                    a = FyTrade.helper.getSymbolMasterValue(r, "min_lot_size");
                a = a || 1;
                let s = FyTrade.helper.getSymbolMasterValue(r, "tick_size");
                return s = s || .05, t = e.split(":")[0], {
                    lot: a,
                    tickSize: s,
                    ex: t
                }
            } catch (e) {
                return {
                    lot: 1,
                    tickSize: .05
                }
            }
        }
        getSymbolInfo(e) {
            try {
                var t = this.getSymbolInfoDict(e),
                    r = t.tickSize;
                return {
                    qty: {
                        min: t.lot,
                        max: Number.MAX_VALUE,
                        step: t.lot
                    },
                    pipValue: r || 1,
                    pipSize: r,
                    minTick: r,
                    ex: t.ex
                }
            } catch (t) {
                throw `symbolInfo2 : symbol : ${e} : error : ${t}`
            }
        }
        getExpiredSymbolDummyData(e) {
            return {
                bt: "101000000026000",
                currency_code: "INR",
                data_status: "streaming",
                description: `${e}`,
                "exchange-listed": "NSE",
                "exchange-traded": "NSE",
                expired: !1,
                has_daily: !0,
                has_empty_bars: !1,
                has_intraday: !0,
                has_seconds: !1,
                has_weekly_and_monthly: !1,
                minmov: 5,
                minmov2: 0,
                name: e,
                pointvalue: 1,
                pricescale: 100,
                session: "0915-1530",
                symbol: e,
                timezone: "Asia/Kolkata",
                type: "Stocks"
            }
        }
        getOiIndicatorSymbolData(e) {
            const t = this.getSymbolNameFromOiSymbol(e),
                r = datafeed.unzippedData.data[t];
            return {
                bt: r && r[6] ? r[6] : "101000000026000",
                currency_code: "INR",
                data_status: "streaming",
                description: `${e}`,
                "exchange-listed": "NSE",
                "exchange-traded": "NSE",
                expired: !1,
                has_daily: !0,
                has_empty_bars: !1,
                has_intraday: !0,
                has_seconds: !1,
                has_weekly_and_monthly: !1,
                minmov: 5,
                minmov2: 0,
                name: e,
                pointvalue: 1,
                pricescale: 100,
                session: r && r[4] ? r[4].split("|")[0] : "0900-2355",
                symbol: e,
                timezone: "Asia/Kolkata",
                type: "Stocks",
                corrections: FyTrade.helper.getCorrectionKeyForSegment(FyTrade.helper.getSymbolMasterValue(r, "segment_code")),
                session_holidays: FyTrade.helper.getSessionHolidayForSegment(FyTrade.helper.getSymbolMasterValue(r, "segment_code"))
            }
        }
        getSymbolNameFromOiSymbol(e) {
            return e ? e.replace("#OI", "") : ""
        }
        checkIfOISymbol(e) {
            return !!e && e.endsWith("#OI")
        }
        checkIfPreMarketCandle(e) {
            const t = new Date,
                r = new Date(t.getFullYear(), t.getMonth(), t.getDate(), 9, 0, 0).getTime(),
                a = new Date(t.getFullYear(), t.getMonth(), t.getDate(), 9, 14, 59).getTime();
            return e >= r && e <= a
        }
        checkIfCDorCOM(e) {
            if (e && datafeed.unzippedData.data[e]) {
                const t = FyTrade.helper.getSymbolMasterValue(datafeed.unzippedData.data[e], "inst_type");
                return t && t > 15
            }
            return !1
        }
        getNCOMLotSize(e) {
            var t;
            try {
                var r = datafeed.unzippedData.data[e],
                    a = FyTrade.helper.getSymbolMasterValue(r, "short_sym_name");
                t = datafeed.unzippedData.ncom_lot_size.ncom_lot_size_2[a]
            } catch (e) {
                t = "", console.log("Symbol not found error:", e)
            }
            return t
        }
        checkIfNCOM(e) {
            let t = !1;
            try {
                const a = [33, 34, 35, 36, 37],
                    s = datafeed.unzippedData.data[e];
                var r = FyTrade.helper.getSymbolMasterValue(s, "inst_type");
                t = a.includes(r)
            } catch (e) {
                lotSize = "", console.log("Error while checking isNCOM:", e)
            }
            return t
        }
        updateWidgetSymbol() {
            if (void 0 !== window.isWWOpen && 1 == window.isWWOpen) switch (active_tab) {
                case "d-tab-highs-n-lows":
                    loadHighsAndLows();
                    break;
                case "d-tab-futures-chain":
                    loadFuturesChain();
                    break;
                case "d-tab-corporate-actions":
                    loadCorporateActions();
                    break;
                case "d-tab-time-n-sales":
                    loadTimenSales();
                    break;
                case "d-tab-market-depth":
                    loadMarketDepth()
            }
        }
        convertToLocalIST(e) {
            let t = (e = e || new Date).getTimezoneOffset() + 330;
            return new Date(e.getTime() + 6e4 * t)
        }
        timestampDiffAndConversion(e) {
            const t = new Date(1e3 * e.from),
                r = new Date(1e3 * e.to);
            if (r - t > 315576e5) {
                FyTrade.data.historyProvider.splitApiCalls = !0;
                const e = new Date(r);
                return e.setFullYear(e.getFullYear() - 1), e.getTime() / 1e3
            }
            return FyTrade.data.historyProvider.splitApiCalls = !1, e.from
        }
        getTimeInMinutes(e, t) {
            return 60 * e + t
        }
        isWithinTimeRange(e, t, r = !1) {
            try {
                const a = new Date(e),
                    s = FyTrade.data.datahelper.convertToLocalIST(a),
                    o = s.getHours(),
                    i = s.getMinutes(),
                    n = this.getTimeInMinutes(o, i),
                    l = this.getTimeInMinutes(9, 0),
                    d = this.getTimeInMinutes(t ? .eh, t ? .em);
                return !FyTrade.helpers.symMasterOnChartDownload && r && n === l && (FyTrade.symbolClass.symbolDataFromURL(!0), FyTrade.helpers.symMasterOnChartDownload = !0), n >= l && n <= d
            } catch (e) {
                return console.log(e), !0
            }
        }
        checkForObjectNull(e) {
            for (const t in e)
                if (e.hasOwnProperty(t) && null === e[t]) return !0;
            return !1
        }
        generateSymbolTickerName(e, t) {
            return `${e}_#_INR_#_${t}`
        }
        checkIfExchangeIsMcx(e) {
            try {
                return e.toUpperCase() === a.EXCHANGE_NAME.mcxExchange
            } catch (e) {
                return console.log(e), !1
            }
        }
        getSymbolMasterDataFromDB(e) {
            c("Fetching symbol master from DB and returning the data...");
            const t = e.get(a.DATABASE_KEYS.SYMBOL_MASTER_DATA_KEY);
            t.onsuccess = () => {
                const e = t.result;
                l.prototype.updateGlobalObject(e)
            }
        }
        callSymbolMasterApi(e) {
            c("Calling symbol master api and returning the data..."), fetch(r.SYMBOL_MASTER_URL).then((e => e.arrayBuffer())).then((t => {
                const r = new Uint8Array(t),
                    s = pako.inflate(r);
                let o = (new TextDecoder).decode(s);
                e.transaction([a.DATABASE_KEYS.SM_OBJECT_STORE], "readwrite").objectStore(a.DATABASE_KEYS.SM_OBJECT_STORE).put(o, a.DATABASE_KEYS.SYMBOL_MASTER_DATA_KEY), l.prototype.updateGlobalObject(o)
            })).catch((e => {
                throw TradeModules.common.hawkeye("ERROR", "unable to fetch data from symbol API", e), datafeed.unzippedData = {}, "Error while fetching symbol master information: " + e
            }))
        }
        updateGlobalObject(e) {
            try {
                e = JSON.parse(e);
                const {
                    data: t,
                    others: r
                } = datafeed.unzippedData;
                Object.keys(e).forEach((a => {
                    "otherDetails" === a ? Object.assign(r, e[a]) : "data_format" === a ? datafeed.unzippedData[a] = Array.from(e[a]) : Object.assign(t, e[a])
                })), datafeed.unzippedData.others.supportedResolutions = globalConstants.tradingViewConfig.supported_resolutions, datafeed.unzippedData.others.hasSeconds = !0
            } catch (e) {
                console.error("Error updating global object:", e)
            }
        }
        hasData(e) {
            return Array.isArray(e) ? e.length > 0 : "string" == typeof e && null !== e
        }
        async fetchConfigToUpdateMasterFileUpdateTime() {
            let e = await fetch("https://config.fyers.in/config/config.gz"),
                t = await e.json();
            globalConstants.config.master_files_update_time.sym_combined = t.master_files_update_time.sym_combined
        }
        async symbolMasterDbCRUD(e = !1) {
            try {
                e && await this.fetchConfigToUpdateMasterFileUpdateTime();
                const t = globalConstants.config.master_files_update_time.sym_combined;
                let r;
                const s = indexedDB.open(a.DATABASE_KEYS.DB_NAME);
                s.onupgradeneeded = function(e) {
                    c("Database upgrading . . . "), r = e.target.result;
                    var t = r.createObjectStore(a.DATABASE_KEYS.SM_OBJECT_STORE);
                    t.add(null, a.DATABASE_KEYS.SYMBOL_MASTER_DATA_KEY), t.add(null, a.DATABASE_KEYS.TIMESTAMP_KEY)
                }, s.onsuccess = function(e) {
                    c("Database opened successfully"), r = e.target.result;
                    const s = r.transaction([a.DATABASE_KEYS.SM_OBJECT_STORE], "readwrite").objectStore(a.DATABASE_KEYS.SM_OBJECT_STORE),
                        o = s.get(a.DATABASE_KEYS.TIMESTAMP_KEY);
                    o.onsuccess = function() {
                        const e = o.result,
                            i = s.get(a.DATABASE_KEYS.SYMBOL_MASTER_DATA_KEY);
                        i.onsuccess = () => {
                            const o = i.result;
                            e != t ? (c("timestamp not matching"), s.put(t, a.DATABASE_KEYS.TIMESTAMP_KEY), l.prototype.callSymbolMasterApi(r)) : e === t && l.prototype.hasData(o) ? (c("TimeStamp matching"), l.prototype.getSymbolMasterDataFromDB(s)) : (c("TimeStamp matching & Data not present"), l.prototype.callSymbolMasterApi(r))
                        }
                    }
                }, s.onerror = function(e) {
                    console.error("Error opening database:", e.target.error)
                }
            } catch (e) {
                throw "Error in DB setup" + e
            }
        }
        symbolMasterDBImplementation(e) {
            try {
                c("calling DB setup"), l.prototype.symbolMasterDbCRUD(e)
            } catch (e) {
                console.log("Error in DB initialization, performing old implementation", e);
                try {
                    fetch(r.SYMBOL_MASTER_URL).then((e => e.arrayBuffer())).then((e => {
                        const t = new Uint8Array(e),
                            r = pako.inflate(t);
                        let a = (new TextDecoder).decode(r);
                        try {
                            a = JSON.parse(a);
                            const {
                                data: e,
                                others: t
                            } = datafeed.unzippedData;
                            Object.keys(a).forEach((r => {
                                "otherDetails" === r ? Object.assign(t, a[r]) : "data_format" === r ? datafeed.unzippedData[r] = Array.from(a[r]) : Object.assign(e, a[r])
                            })), datafeed.unzippedData.others.supportedResolutions = globalConstants.tradingViewConfig.supported_resolutions, datafeed.unzippedData.others.hasSeconds = !0
                        } catch (e) {
                            console.error("Error in parsing the JSON:", e)
                        }
                        return datafeed.unzippedData
                    })).catch((e => {
                        throw TradeModules.common.hawkeye("ERROR", "unable to fetch data from symbol API", e), datafeed.unzippedData = {}, "Error while fetching symbol master information: " + e
                    }))
                } catch (e) {
                    throw "Reading symbol data from url failed: " + e
                }
            }
        }
        checkIfCandleIsOfPreviousDay(e) {
            const t = new Date(e),
                r = new Date;
            return t.setHours(0, 0, 0, 0), r.setHours(0, 0, 0, 0), t.getTime() < r.getTime()
        }
    }
    const d = l;

    function c(e) {
        if (FyTrade.isLoggingEnabled) {
            const t = new Date;
            console.log(`${t.toLocaleTimeString()}.${t.getMilliseconds()}> ${e}`)
        }
    }

    function u(e) {
        return void 0 === e ? "" : "string" == typeof e ? e : e.message
    }
    const h = class {
        constructor() {
            this.isFire = !0, this.sessionid = null, this.waitQSymbolSub = {
                index: new Set,
                general: new Set
            }, this.ohlcInjectMapping = {}, this.isWaitStarted = !1, this.waitTime = 200, this.reconnectCount = 0, this.stopReconnectCount = 20, this.isTeliEnable = !1, this.depthDataModel = {}, this.scriptSubList = {
                generalSymbol: {},
                indexSymbol: {}
            }, this.record = {
                reconnectionTime: [],
                init: [],
                index: []
            }, this.preConnectionSubscriptionList = []
        }
        connectToHSM(e = !1) {
            if (this.sessionid = d.prototype.getSessionToken(), this.record.init.push({
                    time: d.prototype.getCurrentDate(),
                    isReconnect: e
                }), !FyTrade.data.FYERS_OBJ || e) {
                try {
                    FyTrade.data.FYERS_OBJ = new y(i.prototype.getHSMenabledClient() ? t.WS2_URL : t.WS1_URL, this.sessionid)
                } catch (e) {
                    console.log("hsm fallback triggered", e), TradeModules.common.hawkeye("ERROR", "Disconnected from HSM, Trying to Reconnect."), FyTrade.data.FYERS_OBJ = new y(t.WS1_URL, this.sessionid)
                }
                FyTrade.data.FYERS_OBJ.connect()
            } else this.record.init.push("Previous call ignored")
        }
        reconnectToHSM() {
            FyTrade.data.FYERS_OBJ = null, this.record.reconnectionTime.push({
                time: d.prototype.getCurrentDate(),
                triggeredBy: "WS Close"
            }), this.connectToHSM(!0), this.isReconnectInitiated = !0, console.log("Reconnection done to HSM!"), TradeModules.common.hawkeye("ERROR", "Reconnected to HSM.")
        }
        resubscribe() {
            this.isReconnectInitiated && (window.displayTradingPopup || (FyTrade._updateTradingDetails(), TradeModules.common.hawkeye("DEBUG", "Going to Resetting Datafeed_fnResubscribe"), datafeed.resetCache(), tvWidget.activeChart().resetData(), tvWidget.save((e => {
                tvWidget.load(e)
            })), TradeModules.common.hawkeye("DEBUG", "Datafeed Reset Done_fnResubscribe")), this.divideAndSubscribe(), this.subUnsubViaScript(Object.keys(this.scriptSubList.indexSymbol), 1), this.isReconnectInitiated = !1)
        }
        generateSubscriptionScript(e, t) {
            let r = this;
            try {
                const a = e.filter((e => !e.includes("_#_INR_#"))),
                    s = a.map((e => datafeed.resolveSymbolWithPromise(e)));
                Promise.allSettled(s).then((function(e) {
                    const a = e.filter((e => "fulfilled" === e.status)).map((e => e.value)),
                        s = r.getSubScript(a);
                    r.sendSockRequest(s, t)
                }))
            } catch (e) {
                console.log("error in generate script : ", e)
            }
        }
        divideAndSubscribe(e) {
            let r = this;
            void 0 === e && (e = []);
            var a = e && e.length > 0 ? Object.values(e) : Object.keys(FyTrade.teli.scriptSubList.generalSymbol);
            i.prototype.chunkArray(a, t.TELI_PER_REQUEST_LIMIT).forEach((function(e) {
                r.subUnsubViaScript(e, 0)
            }))
        }
        subUnsubViaScript(e, r) {
            let a = this;
            e.length && (i.prototype.chunkArray(e, t.TELI_PER_REQUEST_LIMIT).forEach((function(e) {
                a.generateSubscriptionScript(e, r)
            })), this.syncSubAndSubGlobalValue(e, r))
        }
        syncSubAndSubGlobalValue(e, t) {
            e.forEach((e => {
                0 === t ? FyTrade.teli.scriptSubList.generalSymbol[e] = !0 : 1 === t ? FyTrade.teli.scriptSubList.indexSymbol[e] = !0 : 4 === t ? unset(FyTrade.teli.scriptSubList.generalSymbol[e]) : 6 === t && unset(FyTrade.teli.scriptSubList.indexSymbol[e])
            }))
        }
        getSubScript(e) {
            let t = this;
            const r = e.map((({
                    symbol: e,
                    bt: t
                }) => {
                    const r = t.substring(2, 4),
                        a = t.substring(0, 2);
                    let s = t.substring(10, t.length),
                        o = n.INSTRUMENT_EXCHANGE_MAPPING[a],
                        i = n.INSTRUMENT_SEGMENT_MAPPING[r];
                    return e.includes("-INDEX") && (s = d.prototype.mapTeleToFyersSymbols(e)), "10" === a && "12" === r && (o = "cde", i = "fo"), "mcx" === o && (i = "fo"), "12" === a && "12" === r && (o = "bcs", i = "fo"), {
                        symbolTicker: e,
                        exchange: o,
                        segment: i,
                        exchangeToken: s
                    }
                })),
                a = r.map((({
                    exchange: e,
                    segment: t,
                    exchangeToken: r
                }) => `${e}_${t}|${r}`)).join("&");
            return r.forEach((e => {
                t.setExchangeAndValueMapping(e.exchangeToken, e)
            })), a
        }
        setExchangeAndValueMapping(e, t) {
            FyTrade.data.exchangeTokenAndValueMapping[e] = t
        }
        createLibDict(e) {
            const t = [];
            for (let r = 0; r < e.length; r++) {
                const a = e[r];
                if ("dp" === a.name) this.updateDepth(a);
                else {
                    const e = this.getRealTimeData(a);
                    e && t.push(e)
                }
            }
            return t
        }
        updateDepth(e) {
            const t = this.getValueMappingByExToken(e.tk).symbolTicker;
            this.depthDataModel.hasOwnProperty(t) ? Object.assign(this.depthDataModel[t], e) : this.depthDataModel[t] = e;
            const r = this.depthDataModel[t],
                {
                    bidList: a,
                    askList: s
                } = this.createBidAskList(r),
                o = FyTrade.data.symbolPriceDict[t],
                i = o && o.v ? o.v : {},
                n = {
                    bids: a,
                    asks: s,
                    snapshot: !0,
                    totSell: i.totSell || 0,
                    totBuy: i.totBuy || 0
                };
            for (const e in datafeed._l2SubDict) datafeed._l2SubDict[e].symbol === t && datafeed._l2SubDict[e].callback(n)
        }
        createBidAskList(e) {
            const t = [],
                r = [];
            for (let a = 0; a <= 4; a++) {
                const s = 0 === a ? "" : a.toString();
                t.push({
                    price: parseFloat(e[`bp${s}`]),
                    volume: parseInt(e[`bq${s}`]),
                    ord: parseInt(e[`bno${a+1}`])
                }), r.push({
                    price: parseFloat(e[`sp${s}`]),
                    volume: parseInt(e[`bs${s}`]),
                    ord: parseInt(e[`sno${a+1}`])
                })
            }
            return {
                bidList: t,
                askList: r
            }
        }
        callAndClearData() {
            const {
                general: e,
                index: t
            } = this.waitQSymbolSub;
            this.waitQSymbolSub = {
                index: new Set,
                general: new Set
            }, this.isWaitStarted = !1, e.size && this.divideAndSubscribe(Array.from(e)), t.size && this.subUnsubViaScript(Array.from(t), 1)
        }
        triggerWait() {
            this.isWaitStarted || (this.isWaitStarted = !0, setTimeout((() => this.callAndClearData()), this.waitTime))
        }
        waitBeforeCall(e, t) {
            let r = 0 === t ? this.waitQSymbolSub.general : this.waitQSymbolSub.index;
            e.forEach((e => r.add(e))), this.triggerWait()
        }
        buildSubscription(e, t) {
            return n.ACTION_FLAG_MAPPING.hasOwnProperty(t) ? {
                type: n.ACTION_FLAG_MAPPING[t],
                scrips: e,
                channelnum: 1
            } : (c("Invalid subscription"), null)
        }
        sendSockRequest(e, t) {
            const r = this.buildSubscription(e, t);
            this.sendFinalRequest(r)
        }
        sendFinalRequest(e) {
            const t = FyTrade.data.FYERS_OBJ ? .isConnected();
            t ? (this.preConnectionSubscriptionList = this.preConnectionSubscriptionList.filter((t => t.scrips !== e.scrips)), e && FyTrade.data.FYERS_OBJ && FyTrade.data.FYERS_OBJ.send(JSON.stringify(e))) : this.preConnectionSubscriptionList.some((t => t.scrips === e.scrips)) || this.preConnectionSubscriptionList.push(e)
        }
        isMinChanged(e, t) {
            if (!e || !t) return !1;
            const r = e => parseInt(e.split(":")[1]);
            return r(e) !== r(t)
        }
        isSecChanged(e, t) {
            if (!e || !t) return !1;
            const r = e => parseInt(e.split(":")[2]);
            return r(e) !== r(t)
        }
        generateCandle(e, t, r, a, s) {
            const o = this.getExchangeTimeStamp(r.fdtm || r.ltt || r.tvalue);
            r.v && !t && s.lp && (t = s.lp), e.ltpFromSource = t, t && !e.o ? this.appendOhlcValues(e, t) : (this.calculateIfMinChanged(r, e, t, o), this.appendHighLowClose(e, t)), this.updateCandleData(e, o)
        }
        generateCandleForSeconds(e, t, r, a, s) {
            const o = this.getExchangeTimeStamp(r.fdtm || r.ltt || r.tvalue);
            this.calculateIfSecChanged(r, e, t, o), r.v && !t && s.lp && (t = s.lp), e.ltpFromSource = t, this.updateCandleData(e, o)
        }
        updateCandleData(e, t) {
            t.unixTime && (e.t = t.unixTime), t.hourStr && (e.tf = t.hourStr), t.timeString && (e.timeString = t.timeString)
        }
        appendOhlcValues(e, t) {
            e.o = e.h = e.l = e.c = t
        }
        calculateIfMinChanged(e, t, r, a) {
            t.isMinChanged = this.isMinChanged(t.tf, a.hourStr), t.isMinChanged && (r ? this.appendOhlcValues(t, r) : this.appendOhlcValues(t, t.c))
        }
        calculateIfSecChanged(e, t, r, a) {
            t.isSecChanged = this.isSecChanged(t.timeString, a.timeString, a.unixTime)
        }
        appendHighLowClose(e, t) {
            t > e.h && (e.h = t), t < e.l && (e.l = t), isNaN(t) || (e.c = t)
        }
        getValueMappingByExToken(e) {
            return FyTrade.data.exchangeTokenAndValueMapping[e]
        }
        checkIfLtpIsZero(e) {
            return 0 === parseFloat(e) && (console.warn(`Invalid Ltp From HSM : ${e}`), !0)
        }
        getRealTimeData(e) {
            const r = this.getLtp(e);
            if (this.checkIfLtpIsZero(r)) return;
            const a = r && !isNaN(r),
                s = e.v || a,
                {
                    exchange: o,
                    symbolTicker: i
                } = this.getValueMappingByExToken(e.tk),
                n = i.split(":")[1],
                l = FyTrade.data.symbolPriceDict;
            l[i] = l[i] || {};
            const d = l[i];
            d.n = i, d.original_name = i, d.symbol = i, d.s = "ok", d[t.FY_P_VAL_KEY] = d[t.FY_P_VAL_KEY] || {};
            const c = d[t.FY_P_VAL_KEY];
            if (this.appendGeneralValues(c, o.toUpperCase(), n, e), void 0 === e.tbq && void 0 === e.tsq || !this.depthDataModel.hasOwnProperty(i) || this.updateDepth({
                    tk: e.tk
                }), this.appendBidAndAsk(c, e, r), s) {
                c.tickHasVolumeOrLtp = !0;
                const a = c[t.FY_P_MIN_KEY] || {},
                    s = c[t.FY_P_SEC_KEY] || {};
                this.generateCandle(a, r, e, n, c), this.generateCandleForSeconds(s, r, e, n, c), c[t.FY_P_MIN_KEY] = a, c[t.FY_P_SEC_KEY] = s, this.appendSnapshotData(e, c), e.v && !c.isASnapShot && (c.volume = parseInt(e.v), "if" === e.name && (c.volume = 0)), c.tt = a.t
            } else c.tickHasVolumeOrLtp = !1;
            c.lttOnly = this.getExchangeTimeStamp(e.ltt || e.fdtm || e.tvalue).unixTime, c.description = i;
            const u = c.ask || 0,
                h = c.bid || 0;
            let m = 0;
            return 0 !== u && 0 !== h && (m = parseFloat(u) - parseFloat(h)), c.spread = m, i.startsWith(t.INDEX_PREFIX) ? this.getRandomData(i, c) : d
        }
        appendSnapshotData(e, t) {
            e.h ? t.tickHasNewHigh = !0 : t.tickHasNewHigh = !1, e.lo ? t.tickHasNewLow = !0 : t.tickHasNewLow = !1;
            const r = e.h && e.lo,
                a = e.highPrice && e.lowPrice;
            t.isASnapShot = !(!r && !a)
        }
        getLtp(e) {
            let t;
            switch (e.name) {
                case "sf":
                    t = "ltp";
                    break;
                case "if":
                    t = "iv";
                    break;
                default:
                    throw new Error("Invalid name property in data object")
            }
            return parseFloat(e[t])
        }
        injectOhlcFromHistory(e, r, a) {
            const s = tvWidget.activeChart() ? .resolution();
            if (s !== a) return;
            const o = `${e}_${s}`;
            if (this.ohlcInjectMapping[o]) return;
            this.updateOhlcInjectStatus(o);
            const i = FyTrade.data.symbolPriceDict[e] ? .[t.FY_P_VAL_KEY] ? .[t.FY_P_MIN_KEY];
            i || this.initializeBaseStructure(e, t.FY_P_VAL_KEY, t.FY_P_MIN_KEY, t.FY_P_STATUS);
            const {
                time: n,
                open: l,
                high: d,
                low: c,
                close: u
            } = r, h = new Date(n).toLocaleString(), m = this.getExchangeTimeStamp(h);
            i.o = l, i.h = d, i.l = c, i.c = u, i.t = m.unixTime, i.tf = m.hourStr, i.timeString = m.timeString, i.aggregatedMinVolume = r.volume
        }
        updateOhlcInjectStatus(e) {
            this.ohlcInjectMapping[e] = !0
        }
        initializeBaseStructure(e, t, r, a) {
            FyTrade.data.symbolPriceDict || (FyTrade.data.symbolPriceDict = {}), FyTrade.data.symbolPriceDict.hasOwnProperty(e) || (FyTrade.data.symbolPriceDict[e] = {}, FyTrade.data.symbolPriceDict[e][a] = "ok", FyTrade.data.symbolPriceDict[e][t] = {
                lp: 0,
                ch: 0,
                chp: 0
            }, FyTrade.data.symbolPriceDict[e][t][r] = {}, FyTrade.data.symbolPriceDict[e][t][r].v = null)
        }
        getExchangeTimeStamp(e) {
            if (!e) return {};
            const [t, r] = e.split(" "), [a, s, o] = t.split("/"), i = new Date(`${o}-${s}-${a}T${r}`).getTime() / 1e3;
            return {
                hourStr: r.slice(0, 5),
                unixTime: i,
                fullUnixTime: 1e3 * i,
                timeString: r
            }
        }
        appendBidAndAsk(e, t, r) {
            "sf" === t.name ? (t.bp && (e.bid = parseFloat(t.bp)), t.sp && (e.ask = parseFloat(t.sp))) : "if" === t.name && (e.bid = r, e.ask = r)
        }
        appendGeneralValues(e, t, r, a) {
            e.exchange = t, e.short_name = r, e.marketStat = 2;
            const s = n.TELI_FYERS_DATA_KEY_MAPPING;
            for (var o in s) {
                var i = s[o];
                if (a.hasOwnProperty(o))
                    if ("fdtm" === o || "tvalue" === o) {
                        const {
                            fullUnixTime: t
                        } = this.getExchangeTimeStamp(a[o]);
                        e[i] = t
                    } else e[i] = parseFloat(a[o])
            }
        }
        getRandomData(e, t) {
            return {
                s: "ok",
                v: {
                    high_price: t.high_price,
                    prev_close_price: t.prev_close_price,
                    ch: t.ch,
                    tt: t.cmd.t,
                    description: e,
                    short_name: e,
                    exchange: t.exchange,
                    low_price: t.low_price,
                    cmd: t.cmd,
                    original_name: e,
                    chp: t.chp,
                    open_price: t.open_price,
                    lp: t.lp,
                    symbol: e,
                    bid: t.bid,
                    change: t.change,
                    ask: t.ask,
                    change_percent: t.change_percent,
                    spread: 0,
                    marketStat: 2
                },
                n: e
            }
        }
    };
    class m {
        constructor(e, t) {
            this.url = e, this.ws = null, this.reconnectAttempts = 0, this.maxReconnectAttempts = 3, this.reconnectDelay = 1e3, this.messageHandlers = new Map, this.accessToken = t, this.pingInterval = null, this.pingTimeout = null
        }
        static get MessageType() {
            return {
                QR_TOKEN: 1,
                ACCESS_TOKEN: 2,
                ERROR: 3,
                PING: 4,
                PONG: 5
            }
        }
        connect() {
            return new Promise(((e, t) => {
                try {
                    this.ws = new WebSocket(this.url), this.ws.binaryType = "arraybuffer", this.ws.onopen = () => {
                        this.sendHashMessage(), this.reconnectAttempts = 0, e()
                    }, this.ws.onmessage = e => {
                        this.handleMessage(e.data)
                    }, this.ws.onclose = () => {
                        this.stopPingInterval(), this.handleReconnect()
                    }, this.ws.onerror = e => {
                        console.error("WebSocket error:", e), this.stopPingInterval(), t(e)
                    }
                } catch (e) {
                    console.log(e)
                }
            }))
        }
        startPingInterval() {
            this.pingInterval = setInterval((() => {
                this.sendPing()
            }), 3e4)
        }
        stopPingInterval() {
            this.pingInterval && (clearInterval(this.pingInterval), this.pingInterval = null), this.pingTimeout && (clearTimeout(this.pingTimeout), this.pingTimeout = null)
        }
        sendHashMessage() {
            try {
                const e = this,
                    t = (new TextEncoder).encode(e.accessToken).buffer;
                this.send(m.MessageType.ACCESS_TOKEN, t)
            } catch (e) {
                console.log(e)
            }
        }
        sendPing() {
            this.send(m.MessageType.PING, new ArrayBuffer(0))
        }
        handleReconnect() {
            this.reconnectAttempts < this.maxReconnectAttempts ? (this.reconnectAttempts++, setTimeout((() => this.connect()), this.reconnectDelay * this.reconnectAttempts)) : console.error("Max reconnection attempts reached")
        }
        on(e, t) {
            this.messageHandlers.set(e, t)
        }
        encodeMessage(e, t) {
            let r;
            r = t instanceof ArrayBuffer ? new Uint8Array(t) : "string" == typeof t ? (new TextEncoder).encode(t) : "object" == typeof t && null !== t ? (new TextEncoder).encode(JSON.stringify(t)) : (new TextEncoder).encode(String(t));
            const a = r.length,
                s = new ArrayBuffer(5 + a),
                o = new DataView(s),
                i = new Uint8Array(s);
            return o.setUint8(0, e), o.setUint32(1, a, !1), i.set(r, 5), i
        }
        decodeMessage(e) {
            try {
                let t;
                if (e instanceof ArrayBuffer) t = new Uint8Array(e);
                else {
                    if (!(e instanceof Uint8Array)) throw new Error("Input must be ArrayBuffer or Uint8Array");
                    t = e
                }
                if (t.length < 5) throw new Error("Message too short");
                const r = new DataView(t.buffer, t.byteOffset, t.byteLength),
                    a = r.getUint8(0),
                    s = r.getUint32(1, !1);
                if (t.length !== 5 + s) throw new Error("Message length mismatch");
                return {
                    type: a,
                    length: s,
                    payload: t.slice(5, 5 + s).buffer
                }
            } catch (e) {
                throw console.error("Error decoding message:", e), e
            }
        }
        handleMessage(e) {
            try {
                const t = this.decodeMessage(e);
                if (t.type === m.MessageType.ERROR) {
                    const e = (new TextDecoder).decode(t ? .payload);
                    return void this.handleErrorMessage(e)
                }
                if (t.type === m.MessageType.PING) return void this.sendPong();
                if (t.type === m.MessageType.PONG) return;
                const r = this.messageHandlers.get(t.type);
                r ? r(t) : console.warn(`No handler registered for message type: ${t.type}`)
            } catch (e) {
                console.error("Error handling message:", e)
            }
        }
        handleErrorMessage(e) {
            "401" === e && window.location.reload()
        }
        send(e, t) {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                const r = this.encodeMessage(e, t);
                this.ws.send(r)
            } else console.error("WebSocket is not connected")
        }
        sendPong() {
            this.send(m.MessageType.PONG, new ArrayBuffer(0))
        }
        close() {
            this.stopPingInterval(), this.ws && (this.ws.close(), this.ws = null)
        }
    }
    const p = m,
        y = class {
            constructor(e, t) {
                this.url = e, this.sessionid = t, this.reconnectCount = 0, this.stopReconnectCount = 10, this.connection = null, this.subscribers = [], this.lastPacketFiredTime = "00", this.isPendingUpdate = !1, this.isUpdateTradingDetailsCalled = !1, this._orderWsConfigObj = {
                    WS_URL: globalConstants.dynamicUrl.sockets.interactive,
                    CONN_OBJ: null,
                    SUB_ORDER: {
                        T: "SUB_ORD",
                        SLIST: ["orders", "positions", "trades", "pricealerts", "gtt", "smart_orders_all"],
                        SUB_T: 1
                    },
                    UNSUB_ORDER: {
                        T: "SUB_ORD",
                        SLIST: ["orders", "positions", "trades", "pricealerts", "smart_orders_all"],
                        SUB_T: 0
                    }
                }
            }
            connect() {
                let e = this;

                function r() {
                    console.log("HSM WebSocket connection established......"), FyTrade.isHSMConnectionActive = !0, e.connection.send(d.prototype.getHSMauthRequest()), s()
                }

                function a() {
                    console.log("HSM WebSocket connection established......"), FyTrade.isHSMConnectionActive = !0;
                    let t = {
                        sessionid: d.prototype.getSessionToken(),
                        type: "cn"
                    };
                    e.connection.send(JSON.stringify(t)), s()
                }

                function s() {
                    (FyTrade.data.teli ? .preConnectionSubscriptionList || []).forEach((e => {
                        FyTrade.data.teli.sendFinalRequest(e)
                    }))
                }

                function o(t) {
                    FyTrade.isHSMConnectionActive = !1, console.log("WebSocket connection closed: ", t), TradeModules.common.hawkeye("ERROR", "WebSocket connection closed", t), setTimeout((() => {
                        if (e.reconnectCount++, e.reconnectCount > e.stopReconnectCount) return console.log("WebSocket reconnection limit exceeded"), void TradeModules.common.hawkeye("ERROR", "Websocket reconnection limit exceeded");
                        e.reconnect()
                    }), Math.floor(3e3 * Math.random()) + 100)
                }

                function n(t) {
                    let r = JSON.parse(t);
                    if ("Ok" === r[0].stat && "cn" === r[0].type && i.prototype.getHSMenabledClient() && FyTrade.data.FYERS_OBJ.send(JSON.stringify({
                            type: "ful",
                            channelnums: [1]
                        })), !t) return;
                    const a = JSON.parse(t);
                    if (a[0] && "successful" === a[0].msg) FyTrade.teli.resubscribe();
                    else if (a[0].hasOwnProperty("stat")) console.log("Error in WebSocket message: ", a), TradeModules.common.hawkeye("ERROR", `Error in WebSocket message ${a}`);
                    else {
                        e.reconnectCount = 0;
                        const t = FyTrade.teli.createLibDict(a);
                        if (t.length) {
                            FyTrade.data.quoteSupplier.realTimeUpdate2(t);
                            for (let e in FyTrade.data.quoteSupplier._subscribers) FyTrade.data.quoteSupplier._subscribers.hasOwnProperty(e) && FyTrade.data.quoteSupplier._subscribers[e].listener(t)
                        }
                        TradeModules.quickTrade && TradeModules.quickTrade.domUpdateQtyOnRealtimeForQuickTrade(t)
                    }
                }

                function l(t) {
                    e.connection.onopen = t ? a : r, e.connection.onclose = o, e.connection.onmessage = n
                }
                "popout" !== window.APP_FLAG && e.connectToLoginSocket();
                try {
                    if (i.prototype.getHSMenabledClient()) {
                        if (e.connection = HSWebSocket.getInstance(), e.connection.isConnected()) return;
                        e.connection.onOpen = r, e.connection.onClose = o, e.connection.onMessage = n, e.connection.onError = e => {
                            console.log("Encountered Error with HSM", e), TradeModules.common.hawkeye("ERROR", "Encountered Error with HSM", e)
                        }
                    } else {
                        if (e.connection) return;
                        e.connection = new HSWebSocket(e.url), l()
                    }
                } catch (r) {
                    console.log("unable to switch HSM version rolling back to HSM 1", r);
                    try {
                        if (document.getElementById("hsm_element").src = "https://trade.fyers.in/static/js/hsweb/hslibo.js", e.connection) return;
                        e.connection = new HSWebSocket(t.WS1_URL), l(!0)
                    } catch (r) {
                        console.log("initiating fallback", r), e.connection = new HSWebSocket(t.WS1_URL), l(!0)
                    }
                }
                if (FyTrade.data.FYERS_OBJ = this.connection, i.prototype.getHSMenabledClient()) try {
                    this.connection.connect(this.url)
                } catch (e) {
                    console.log("using fallback", e)
                }
            }
            reconnect() {
                FyTrade.teli.reconnectToHSM()
            }
            subscribe(e) {
                this.subscribers.push(e)
            }
            openOrderWsSock() {
                var e = this;
                if (e._orderWsConfigObj.CONN_OBJ) return;
                var t = e._orderWsConfigObj.WS_URL + "?type=orderUpdate";
                let r = btoa(token);
                r = encodeURIComponent(r);
                let a = new WebSocket(t, [r]);
                var s = 0;
                e._orderWsConfigObj.CONN_OBJ = a;
                var o = 0,
                    i = setInterval((() => {
                        o += 1
                    }), 1e3),
                    n = setInterval((() => {
                        o >= 10 && (clearInterval(n), clearInterval(l), clearInterval(i), a.close(1e3))
                    }), 1e4),
                    l = setInterval((() => {
                        a.send(JSON.stringify("ping"))
                    }), 5e3);
                a.onopen = function(t) {
                    s && (clearTimeout(s), s = 0);
                    var r = e._orderWsConfigObj.SUB_ORDER;
                    e.sendSubscription(r), c("OrderSocket Open")
                }, a.onmessage = function(t) {
                    if ("pong" === (t = JSON.parse(t.data))) return o = 0, "";
                    e.onNewMsg(t), e.onOrderWsSockSuccess(t)
                }, a.onclose = function(t) {
                    console.log("OrderSocket connection closed : ", t.reason), clearInterval(n), clearInterval(l), clearInterval(i), s || (e._orderWsConfigObj.CONN_OBJ = null, s = setTimeout((function() {
                        e.openOrderWsSock()
                    }), 5e3))
                }
            }
            sendSubscription(e) {
                null != this._orderWsConfigObj.CONN_OBJ ? this._orderWsConfigObj.CONN_OBJ.send(JSON.stringify(e)) : console.log("Order Connection not established.\n")
            }
            onNewMsg(e) {
                switch (!0) {
                    case e.hasOwnProperty("orders"):
                        this.updateOrderFromWs(FyTrade.broker.order.getkambalaToUiKeys([e.orders]));
                        break;
                    case e.hasOwnProperty("trades"):
                        this.onTradeMsg(e.trades);
                        break;
                    case e.hasOwnProperty("positions"):
                        FyTrade.broker.onPositionMsg(e.positions);
                        break;
                    case e.hasOwnProperty("pricealerts"):
                        this.updateAlertsFromWs(e.pricealerts), TradeModules.alertsFromCharts.SocketDataToPriceAlerts(e.pricealerts);
                        break;
                    case e.hasOwnProperty("gtt"):
                        this.updateGttOrderFromWs(FyTrade.broker.gtt.getkambalaToUiKeys([e.gtt]));
                    case e.hasOwnProperty("smart_orders_all"):
                        smartOrders.events.handleOrderSocketData(e);
                        break;
                    default:
                        c("Not able to recognise")
                }
            }
            updateOrderFromWs(e) {
                e.map((function(t) {
                    FyTrade.brokerHelper.addSymbolToArray(t.symbol), t.message = t.message, t.message1 = t.message, FyTrade.broker.fy_updateOrder(t, "Information"), TradeModules.exitPositionWindow.CancelOrderController.removeTableList(e)
                })), 2 != e[0].status && 6 != e[0].status || e[0].productType !== t.productTypeCnc || 0 == t.updateHoldingsCheck && (setTimeout((() => {
                    FyTrade.broker._updateHoldings(), t.updateHoldingsCheck = 0
                }), t.updateCounterholding), t.updateHoldingsCheck = 1), e && i.prototype.updateFundsWithTimer()
            }
            updateGttOrderFromWs(e) {
                FyTrade.broker.fy_updateGttOrder(e)
            }
            async onTradeMsg(e) {
                await FyTrade.store.dispatch(FyTrade.BrokerActions.fetchTradesAction(e)), e = {
                    s: "ok",
                    tradeBook: FyTrade.broker.tradebook.getkambalaToUiKeys([e])
                }, FyTrade.broker.tradebook.onTradeBookSuccess(e), i.prototype.updateFundsWithTimer()
            }
            updateAlertsFromWs(e) {
                if ("LTP" === e.notification_data.comparisonType) {
                    let r;
                    switch (e.notification_status) {
                        case t.toaster.priceAlerts.ALERT_NOTIFICATION_TYPE_CREATE:
                            r = t.toaster.priceAlerts.titles[t.toaster.priceAlerts.ALERT_NOTIFICATION_TYPE_CREATE];
                            break;
                        case t.toaster.priceAlerts.ALERT_NOTIFICATION_TYPE_UPDATE:
                            r = t.toaster.priceAlerts.titles[t.toaster.priceAlerts.ALERT_NOTIFICATION_TYPE_UPDATE];
                            break;
                        case t.toaster.priceAlerts.ALERT_NOTIFICATION_TYPE_DELETE:
                            r = t.toaster.priceAlerts.titles[t.toaster.priceAlerts.ALERT_NOTIFICATION_TYPE_DELETE];
                            break;
                        case t.toaster.priceAlerts.ALERT_NOTIFICATION_TYPE_TRIGGERED:
                            r = t.toaster.priceAlerts.titles[t.toaster.priceAlerts.ALERT_NOTIFICATION_TYPE_TRIGGERED];
                            break;
                        default:
                            r = t.toaster.priceAlerts.title
                    }
                    FyTrade.common.fy_showToaster(t.toaster.type.success, r, e.body)
                }
            }
            onOrderWsSockSuccess(e) {
                const t = this;
                if ("ok" == e.s && e.hasOwnProperty("d")) {
                    var r = e.d;
                    if (e.hasOwnProperty("ws_type"))
                        if (1 === e.ws_type) FyTrade.broker.fy_updateOrder(r), 5 != parseInt(r.status) && t.updateTradingDetailsService();
                        else if (2 === e.ws_type) {
                        var a = {
                            title: e.d.title,
                            body: e.d.body + " Do you want to view your alerts? ",
                            callback: broker.priceAlertWindow
                        };
                        tvWidget.showConfirmDialog(a)
                    }
                }
            }
            updateTradingDetailsService() {
                const e = this;
                let t = FyTrade.common.getTimeString();
                e.lastPacketFiredTime !== timeStamp && (e.lastPacketFiredTime = timeStamp, e.isPendingUpdate = !0, e.updateTradingDetailsStrict(e.isUpdateTradingDetailsCalled, t))
            }
            updateTradingDetailsStrict(e) {
                const t = this;
                !1 === e && !0 === t.isPendingUpdate && (t._updateTradingDetails(), t.isUpdateTradingDetailsCalled = !0, t.isPendingUpdate = !1, setTimeout((() => {
                    t.isUpdateTradingDetailsCalled = !1, t.updateTradingDetailsStrict(t.isUpdateTradingDetailsCalled, FyTrade.common.getTimeString())
                }), 3e3))
            }
            _updateTradingDetails(e, t) {
                var r = this;
                return new Promise((function(a, s) {
                    FyTrade.broker.ordersRefresh(e, t).then((function() {
                        FyTrade.broker.positionsRefresh(e).then((function() {
                            r._updateTradebook(e).then((function() {
                                FyTrade.broker.funds._updateAvailableFunds(e).then((function() {
                                    FyTrade.broker._updateHoldings(e).then((function() {
                                        FyTrade.broker.gttOrdersRefresh(e).then((function() {
                                            Promise.resolve(1).then((function() {
                                                var e = Date.now() / 1e3;
                                                FyTrade.broker._lastUpdateTradingDetails = e, FyTrade.updateQuotes(), a()
                                            }))
                                        }))
                                    }))
                                }))
                            }))
                        }))
                    }))
                }))
            }
            _updateTradebook(e = !1) {
                var t = new Promise((async function(r, a) {
                    if (!1 === e && FyTrade.broker._requestPendingCountTrades > 2) return r(), t;
                    FyTrade.broker._requestPendingCountTrades++, await FyTrade.store.dispatch(FyTrade.BrokerActions.fetchTradesAction());
                    var s = Object.assign({}, FyTrade.storeData.broker.trade_list);
                    s ? (FyTrade.broker._requestPendingCountTrades--, "error" === s.s && (FyTrade.brokerHelper.checkIfInvalidateError(s), a()), s.tradeBook = FyTrade.broker.tradebook.getkambalaToUiKeys(s.tradeBook), FyTrade.broker.tradebook.onTradeBookSuccess(s), r()) : a()
                }));
                return t
            }
            realTimeUpdate(e) {
                var t = {},
                    r = 0;
                for (r = 0; r < e.length; r++) e[r].v && (t[e[r].n] = e[r].v);
                FyTrade.broker.order.ordersRealtimeUpdate(t), FyTrade.broker.positions.positionsRealtimeUpdate(t), FyTrade.broker.holdings.holdingsRealtimeUpdate(t), FyTrade.broker.gtt.gttOrdersRealtimeUpdate(t)
            }
            connectToLoginSocket() {
                try {
                    new p(t.LOGIN_SOCKET_URL, getCookie("_FYERS")).connect()
                } catch (e) {
                    console.log(e)
                }
            }
        },
        g = {
            exchangeMapping: {
                10: "NSE",
                11: "MCX",
                12: "BSE"
            },
            buySellMapping: {
                1: "BUY",
                "-1": "SELL",
                0: "Closed"
            },
            segmentMapping: {
                10: "CM",
                11: "FO",
                12: "CD",
                13: "MCX",
                20: "COM"
            },
            orderTypes: {
                1: "Limit Order",
                2: "Market Order",
                3: "Stop Order",
                4: "Stop Limit order"
            },
            orderIdAndStatusMapping: {},
            kambalaAndUiStatusMapping: {
                11: 6,
                12: 6,
                20: 6,
                21: 6,
                22: 6,
                23: 6,
                24: 6,
                25: 6,
                26: 6,
                90: 2,
                91: 1,
                92: 5,
                93: 5,
                93: 5,
                94: 5,
                51: 6,
                52: 6,
                53: 6,
                54: 6,
                55: 6,
                61: 6,
                62: 6,
                63: 6,
                64: 6,
                71: 6,
                72: 6,
                73: 1
            },
            MONTH_LIST: ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
            VALIDATE_ERROR_CODE_LIST: [-15, -12, -14, -16, -100, -102, -104, -22],
            FO_INSTRUMENT_CODES: [11, 12, 13, 14, 15, 16, 17, 18, 19, 25, 30, 31, 32],
            COLUMNS: {
                HOLDINGS: {
                    TOTALQTY: "totalQty"
                }
            },
            sourceMapper: {
                1: "Regular",
                2: "Regular",
                3: "Smart"
            }
        },
        b = "SET_HOLDINGS_DATA",
        T = "SET_HOLDINGS",
        f = "SET_FUNDS",
        _ = "SET_WATCHLIST",
        S = "SET_POSITIONS",
        E = "SET_TRADEBOOK",
        F = "SET_ORDERBOOK",
        I = "SET_MTFCONVERSIONDATA",
        v = class {
            static setOrderBook = e => ({
                type: F,
                payload: e
            });
            static setHoldings = e => ({
                type: T,
                payload: e
            });
            static setMtfConversionData = e => ({
                type: I,
                payload: {
                    data: e.data,
                    is_market_closed: e.is_market_closed
                }
            });
            static setHoldingsData = e => ({
                type: b,
                payload: e
            });
            static fetchHoldingsAction = () => async e => {
                let t = await FyTrade.service.fetchHoldings();
                e(this.setHoldingsData(t))
            };
            static setWatchlistData = e => ({
                type: _,
                payload: e
            });
            static fetchWatchlistData = () => async e => {
                let t = await FyTrade.service.fetchWatchlistData();
                e(this.setWatchlistData(t))
            };
            static setFunds = e => ({
                type: f,
                payload: e
            });
            static fetchFundsAction = () => async e => {
                let t = await FyTrade.service.fetchFunds();
                if (t) {
                    let e = t.fund_limit[18] ? .equityAmount;
                    broker._panelValue.funds.avaialbleFunds = e, broker._amChangeDelegate.fire(broker._panelValue)
                }
                e(this.setFunds(t))
            };
            static setPositions = e => ({
                type: S,
                payload: e
            });
            static fetchPositionsAction = () => async e => {
                let t = await FyTrade.service.fetchPositions();
                e(this.setPositions(t))
            };
            static setTradebook = e => ({
                type: E,
                payload: e
            });
            static fetchTradesAction = e => async t => {
                if (e) {
                    let r = { ...FyTrade.storeData.broker.trade_list,
                        tradeBook: [...FyTrade.storeData.broker.trade_list.tradeBook, e]
                    };
                    t(this.setTradebook(r))
                } else {
                    let e = await FyTrade.service.fetchTradeBook();
                    t(this.setTradebook(e))
                }
            }
        };
    var N = [{
            label: "Symbol",
            className: "tv-data-table__cell--symbol-cell",
            formatter: "symbolsub",
            id: "symbol",
            dataFields: ["symbol"]
        }, {
            label: "Buy/Sell",
            className: "tv-data-table__cell--left-align",
            id: "side",
            formatter: "side",
            dataFields: ["side"]
        }, {
            label: "Type",
            className: "tv-data-table__cell--right-align",
            id: "type",
            formatter: "type",
            dataFields: ["type"]
        }, {
            label: "Product Type",
            className: "tv-data-table__cell--left-align",
            id: "productType",
            formatter: "",
            dataFields: ["productType"]
        }, {
            label: "Qty",
            alignment: "right",
            className: "tv-data-table__cell--left-align",
            id: "qty",
            help: "Size in lots",
            dataFields: ["qty"]
        }, {
            label: "Rem Qty",
            alignment: "right",
            className: "tv-data-table__cell--left-align",
            id: "remainingQuantity",
            help: "Quantity yet to be traded",
            dataFields: ["remainingQuantity"]
        }, {
            label: "Limit Price",
            alignment: "right",
            className: "tv-data-table__cell--left-align",
            id: "limitPrice",
            formatter: "formatPrice",
            dataFields: ["limitPrice"]
        }, {
            label: "Stop Price",
            alignment: "right",
            className: "tv-data-table__cell--left-align",
            id: "stopPrice",
            formatter: "formatStopPrice",
            dataFields: ["stopPrice", "type"]
        }, {
            label: "Traded Price",
            alignment: "right",
            className: "tv-data-table__cell--left-align",
            id: "tradedPrice",
            formatter: "formatPrice",
            dataFields: ["tradedPrice"]
        }, {
            id: "status",
            label: "Status",
            className: "tv-data-table__cell--left-align",
            id: "status",
            formatter: "status",
            dataFields: ["status"]
        }, {
            label: "Order Time",
            className: "tv-data-table__cell--left-align",
            id: "orderDateTime",
            formatter: "remove_whitespace",
            sortProp: "timeEpoch",
            dataFields: ["orderDateTime"]
        }, {
            label: "Fyers Order id",
            className: "tv-data-table__cell--left-align",
            id: "id",
            formatter: "remove_whitespace",
            dataFields: ["id"]
        }, {
            label: "Exchange Order id",
            alignment: "right",
            className: "tv-data-table__cell--left-align",
            id: "exchOrdId",
            formatter: "remove_whitespace",
            dataFields: ["exchOrdId"]
        }, {
            label: "Oms Order id",
            className: "tv-data-table__cell--left-align",
            id: "oms_Id",
            formatter: "remove_whitespace",
            dataFields: ["oms_Id"]
        }, {
            label: "Smart Source",
            className: "tv-data-table__cell--left-align",
            id: "orderSource",
            help: "source of order generated from",
            formatter: "",
            dataFields: ["orderSource"]
        }, {
            label: "Message",
            className: "tv-data-table__cell--left-align",
            id: "message1",
            fixedWidth: !1,
            formatter: "remove_whitespace",
            dataFields: ["message1"]
        }],
        D = [{
            label: "Symbol",
            className: "tv-data-table__cell--symbol-cell",
            formatter: "symbolsub",
            id: "symbol",
            dataFields: ["symbol"]
        }, {
            label: "",
            className: "tv-data-table__cell--symbol-cell",
            formatter: "closeButton",
            id: "",
            dataFields: []
        }, {
            label: "Product",
            className: "tv-data-table__cell--left-align",
            id: "productType",
            alignment: "right",
            dataFields: ["productType"],
            formatter: ""
        }, {
            label: "Buy/Sell",
            className: "tv-data-table__cell--left-align",
            id: "side",
            alignment: "right",
            dataFields: ["side"],
            formatter: "side"
        }, {
            label: "Net Qty",
            id: "netQty",
            dataFields: ["netQty"],
            alignment: "right",
            className: "tv-data-table__cell--left-align",
            formatter: "float_format"
        }, {
            label: "Avg Price",
            className: "tv-data-table__cell--left-align",
            id: "avgPrice",
            dataFields: ["avgPrice"],
            formatter: "float_format",
            alignment: "right",
            help: "Avg Price. If long, then Buy Avg and if short, then Sell Avg"
        }, {
            label: "LTP",
            className: "tv-data-table__cell--left-align",
            id: "ltp",
            dataFields: ["ltp"],
            formatter: "formatPrice",
            notSortable: !1,
            fixedWidth: !1,
            alignment: "right",
            highlightDiff: !0,
            help: "Current Market Price"
        }, {
            label: "Realized P&L",
            className: "tv-data-table__cell--left-align",
            id: "realized_profit",
            alignment: "right",
            dataFields: ["realized_profit"],
            formatter: "indian_comma_format_with_profit"
        }, {
            label: "Unrealized P&L",
            className: "tv-data-table__cell--left-align",
            id: "unrealized_profit",
            alignment: "right",
            dataFields: ["unrealized_profit"],
            formatter: "indian_comma_format_with_profit"
        }, {
            label: "Total P&L",
            className: "tv-data-table__cell--left-align",
            id: "pl",
            dataFields: ["pl"],
            alignment: "right",
            formatter: "indian_comma_format_with_profit"
        }, {
            label: "%chg",
            className: "tv-data-table__cell--left-align",
            id: "chg",
            dataFields: ["chg"],
            alignment: "right",
            formatter: "profit"
        }, {
            label: "Buy Qty",
            className: "tv-data-table__cell--left-align",
            id: "buyQty",
            dataFields: ["buyQty"],
            alignment: "right",
            formatter: "float_format"
        }, {
            label: "Buy Avg",
            className: "tv-data-table__cell--left-align",
            id: "buyAvg",
            dataFields: ["buyAvg"],
            alignment: "right",
            formatter: "float_format"
        }, {
            label: "Sell Qty",
            className: "tv-data-table__cell--left-align",
            id: "sellQty",
            dataFields: ["sellQty"],
            alignment: "right",
            formatter: "float_format"
        }, {
            label: "Sell Avg",
            className: "tv-data-table__cell--left-align",
            id: "sellAvg",
            dataFields: ["sellAvg"],
            alignment: "right",
            formatter: "float_format"
        }, {
            label: "Net Avg",
            className: "tv-data-table__cell--left-align",
            id: "netAvg",
            dataFields: ["netAvg"],
            alignment: "right",
            formatter: "float_format"
        }],
        w = [{
            label: "Symbol",
            className: "tv-data-table__cell--symbol-cell",
            formatter: "symbolsub",
            dataFields: ["symbol"],
            id: "symbol"
        }, {
            label: "Product",
            className: "tv-data-table__cell--left-align",
            id: "productType",
            dataFields: ["productType"],
            formatter: ""
        }, {
            label: "Buy/Sell",
            className: "tv-data-table__cell--left-align",
            id: "side",
            dataFields: ["side"],
            formatter: "side"
        }, {
            label: "Net Qty",
            className: "tv-data-table__cell--left-align",
            id: "netQty",
            dataFields: ["netQty"],
            alignment: "right",
            formatter: "float_format"
        }, {
            label: "Avg Price",
            className: "tv-data-table__cell--left-align",
            id: "avgPrice",
            dataFields: ["avgPrice"],
            formatter: "float_format",
            alignment: "right",
            help: "Avg Price. If long, then Buy Avg and if short, then Sell Avg"
        }, {
            label: "LTP",
            className: "tv-data-table__cell--left-align",
            id: "ltp",
            dataFields: ["ltp"],
            formatter: "formatPrice",
            notSortable: !1,
            fixedWidth: !1,
            highlightDiff: !0,
            alignment: "right",
            help: "Current Market Price"
        }, {
            label: "Realized P&L",
            dataFields: ["realized_profit"],
            className: "tv-data-table__cell--left-align",
            id: "realized_profit",
            alignment: "right",
            formatter: "indian_comma_format_with_profit"
        }, {
            label: "Unrealized P&L",
            className: "tv-data-table__cell--left-align",
            id: "unrealized_profit",
            dataFields: ["unrealized_profit"],
            alignment: "right",
            formatter: "indian_comma_format_with_profit"
        }, {
            label: "Total P&L",
            dataFields: ["pl"],
            className: "tv-data-table__cell--left-align",
            id: "pl",
            alignment: "right",
            formatter: "indian_comma_format_with_profit"
        }, {
            label: "Buy Qty",
            className: "tv-data-table__cell--left-align",
            id: "buyQty",
            dataFields: ["buyQty"],
            alignment: "right",
            formatter: "float_format"
        }, {
            label: "Buy Avg",
            dataFields: ["buyAvg"],
            className: "tv-data-table__cell--left-align",
            id: "buyAvg",
            alignment: "right",
            formatter: "float_format"
        }, {
            label: "Sell Qty",
            dataFields: ["sellQty"],
            className: "tv-data-table__cell--left-align",
            id: "sellQty",
            alignment: "right",
            formatter: "float_format"
        }, {
            label: "Sell Avg",
            dataFields: ["sellAvg"],
            className: "tv-data-table__cell--left-align",
            id: "sellAvg",
            alignment: "right",
            formatter: "float_format"
        }, {
            label: "Net Avg",
            dataFields: ["netAvg"],
            className: "tv-data-table__cell--left-align",
            id: "netAvg",
            alignment: "right",
            formatter: "float_format"
        }],
        k = [{
            label: "Details",
            notSortable: !0,
            dataFields: ["title"],
            id: "id",
            formatter: "custom_uppercase",
            sortProp: "id",
            fixedWidth: !1
        }, {
            label: "All",
            className: "tv-data-table__cell--buttons-cell",
            dataFields: ["equityAmount"],
            id: "equityAmount",
            formatter: "indian_comma_format_with_profit",
            notSortable: !0,
            alignment: "right",
            fixedWidth: !1
        }],
        P = [{
            label: "Symbol",
            className: "tv-data-table__cell--symbol-cell",
            id: "symbol",
            dataFields: ["symbol"],
            formatter: "symbolsub",
            notSortable: !1,
            fixedWidth: !1
        }, {
            label: "Net Quantity",
            className: "tv-data-table__cell--symbol-cell",
            id: g.COLUMNS.HOLDINGS.TOTALQTY,
            dataFields: [g.COLUMNS.HOLDINGS.TOTALQTY],
            formatter: "float_format",
            notSortable: !1,
            fixedWidth: !1,
            alignment: "right",
            help: "Net quantity available for the day"
        }, {
            label: "T1 Quantity",
            className: "tv-data-table__cell--symbol-cell",
            id: "qty_t1",
            dataFields: ["qty_t1"],
            formatter: "float_format",
            notSortable: !1,
            fixedWidth: !1,
            alignment: "right",
            help: "Total T1 quantity available at the beginning of the day"
        }, {
            label: "Remaining Qty",
            dataFields: ["remainingQuantity"],
            className: "tv-data-table__cell--symbol-cell",
            id: "remainingQuantity",
            formatter: "float_format",
            notSortable: !1,
            fixedWidth: !1,
            alignment: "right",
            help: "Latest remaining quantity"
        }, {
            label: "Avg. Cost Price",
            dataFields: ["costPrice"],
            className: "tv-data-table__cell--symbol-cell",
            id: "costPrice",
            formatter: "float_format",
            notSortable: !1,
            fixedWidth: !1,
            highlightDiff: !0,
            alignment: "right",
            help: "Average Cost Price"
        }, {
            label: "LTP",
            dataFields: ["symbolLtp"],
            className: "tv-data-table__cell--symbol-cell",
            id: "symbolLtp",
            formatter: "formatPrice",
            notSortable: !1,
            fixedWidth: !1,
            highlightDiff: !0,
            alignment: "right",
            help: "Current Market Price"
        }, {
            label: "Day's P/L",
            className: "tv-data-table__cell--symbol-cell",
            id: "daysPL",
            formatter: "indian_comma_format_with_profit",
            dataFields: ["daysPL"],
            notSortable: !1,
            fixedWidth: !1,
            highlightDiff: !0,
            alignment: "right",
            help: "Day's profit/ loss for the holding"
        }, {
            label: "Day's Change (%)",
            dataFields: ["percChange"],
            className: "tv-data-table__cell--symbol-cell",
            id: "percChange",
            formatter: "profit",
            notSortable: !1,
            fixedWidth: !1,
            highlightDiff: !0,
            alignment: "right",
            help: "Today's Percentage Change"
        }, {
            label: "Invested value",
            className: "tv-data-table__cell--symbol-cell",
            id: "investedValue",
            dataFields: ["investedValue"],
            formatter: "indian_comma_format",
            notSortable: !1,
            fixedWidth: !1,
            highlightDiff: !0,
            alignment: "right",
            help: "Invested value"
        }, {
            label: "Market Value",
            dataFields: ["marketVal"],
            className: "tv-data-table__cell--symbol-cell",
            id: "marketVal",
            formatter: "indian_comma_format",
            notSortable: !1,
            fixedWidth: !1,
            alignment: "right",
            help: "Total Market Value of Holding"
        }, {
            label: "Unrealized P&L",
            dataFields: ["holdingUnrealizedPnl"],
            className: "tv-data-table__cell--symbol-cell",
            id: "holdingUnrealizedPnl",
            formatter: "indian_comma_format_with_profit",
            notSortable: !1,
            fixedWidth: !1,
            highlightDiff: !0,
            alignment: "right",
            help: "Unrealized profit/ loss for the holding"
        }, {
            label: "Unrealized P&L (%)",
            dataFields: ["holdingUnrealizedPnlPerc"],
            className: "tv-data-table__cell--symbol-cell",
            id: "holdingUnrealizedPnlPerc",
            formatter: "indian_comma_format_with_profit",
            notSortable: !1,
            fixedWidth: !1,
            highlightDiff: !0,
            alignment: "right",
            help: "Unrealized profit/ loss for the holding"
        }],
        A = [{
            label: "Symbol",
            className: "tv-data-table__cell--symbol-cell",
            id: "symbol",
            dataFields: ["symbol"],
            formatter: "symbolsub",
            notSortable: !1,
            fixedWidth: !1
        }, {
            label: "Exchange",
            className: "tv-data-table__cell--right-align",
            id: "exchange",
            dataFields: ["exchange"],
            formatter: "custom_uppercase",
            notSortable: !1,
            fixedWidth: !1,
            help: "Exchange on which the trade has occurred"
        }, {
            label: "Buy/Sell",
            dataFields: ["transactionType"],
            className: "tv-data-table__cell--right-align",
            id: "transactionType",
            formatter: "custom_uppercase",
            notSortable: !1,
            fixedWidth: !1,
            help: "Transaction type"
        }, {
            label: "Segment",
            className: "tv-data-table__cell--right-align",
            id: "segment",
            dataFields: ["segment"],
            formatter: "custom_uppercase",
            notSortable: !1,
            fixedWidth: !1,
            help: "The segment in which the trade has occurred"
        }, {
            label: "Product Type",
            className: "tv-data-table__cell--right-align",
            id: "productType",
            dataFields: ["productType"],
            formatter: "custom_uppercase",
            notSortable: !1,
            fixedWidth: !1,
            help: "Product type"
        }, {
            label: "Traded Quantity",
            className: "tv-data-table__cell--right-align",
            id: "tradedQty",
            dataFields: ["tradedQty"],
            formatter: "float_format",
            notSortable: !1,
            fixedWidth: !1,
            alignment: "right",
            help: "Transaction type"
        }, {
            label: "Traded Price",
            className: "tv-data-table__cell--right-align",
            id: "tradePrice",
            dataFields: ["tradePrice"],
            formatter: "float_format",
            notSortable: !1,
            fixedWidth: !1,
            alignment: "right",
            help: "Traded price"
        }, {
            label: "Time",
            className: "tv-data-table__cell--right-align",
            id: "orderDateTime",
            dataFields: ["orderDateTime"]
        }, {
            label: "Order Number",
            className: "tv-data-table__cell--right-align",
            id: "id2",
            dataFields: ["id2"],
            formatter: "custom_uppercase",
            notSortable: !1,
            fixedWidth: !1,
            alignment: "right",
            help: "Order number for which the corresponding trade has occurred"
        }, {
            label: "Trade Number",
            className: "tv-data-table__cell--right-align",
            id: "id",
            dataFields: ["id"],
            formatter: "",
            notSortable: !1,
            fixedWidth: !1,
            alignment: "right",
            help: "Trade number for that has occurred on the exchange"
        }],
        O = [{
            label: "Symbol",
            className: "tv-data-table__cell--symbol-cell",
            formatter: "symbolsub",
            id: "symbol",
            dataFields: ["symbol"]
        }, {
            label: "",
            className: "tv-data-table__cell--symbol-cell",
            formatter: "closeGttButton",
            id: "",
            dataFields: []
        }, {
            label: "Buy/Sell",
            className: "tv-data-table__cell--left-align",
            id: "side",
            formatter: "side",
            dataFields: ["side"]
        }, {
            label: "GTT Type",
            className: "tv-data-table__cell--left-align",
            id: "gttType",
            formatter: "gttType",
            dataFields: ["gtt_oco_ind"]
        }, {
            label: "Product Type",
            className: "tv-data-table__cell--left-align",
            id: "productType",
            dataFields: ["productType"]
        }, {
            id: "status",
            label: "Status",
            className: "tv-data-table__cell--left-align",
            id: "status",
            formatter: "status",
            dataFields: ["status"]
        }, {
            label: "Qty",
            alignment: "right",
            className: "tv-data-table__cell--left-align",
            id: "qty",
            dataFields: ["tableQty"]
        }, {
            label: "Trigger Price",
            alignment: "right",
            className: "tv-data-table__cell--left-align",
            id: "gttTriggerPrice",
            dataFields: ["tableTriggerPrice"]
        }, {
            label: "Limit Price",
            alignment: "right",
            className: "tv-data-table__cell--left-align",
            id: "gttLimitPrice",
            dataFields: ["tableLimitPrice"]
        }, {
            label: "SL Qty",
            alignment: "right",
            className: "tv-data-table__cell--left-align",
            id: "gttSlQty",
            dataFields: ["tableSlQty"]
        }, {
            label: "SL Trigger Price",
            alignment: "right",
            className: "tv-data-table__cell--left-align",
            id: "slTrigger",
            dataFields: ["tableSlTriggerPrice"]
        }, {
            label: "SL Limit Price",
            alignment: "right",
            className: "tv-data-table__cell--left-align",
            id: "slLimit",
            dataFields: ["tableSlLimitPrice"]
        }, {
            label: "Target Qty",
            alignment: "right",
            className: "tv-data-table__cell--left-align",
            id: "targetQty",
            dataFields: ["tableTargetQty"]
        }, {
            label: "Target Trigger Price",
            alignment: "right",
            className: "tv-data-table__cell--left-align",
            id: "targetTriggerPrice",
            dataFields: ["tableTargetTriggerPrice"]
        }, {
            label: "Target Limit Price",
            alignment: "right",
            className: "tv-data-table__cell--left-align",
            id: "targetLimitPrice",
            dataFields: ["tableTargetLimitPrice"]
        }, {
            label: "Order ID",
            className: "tv-data-table__cell--left-align",
            id: "id",
            formatter: "remove_whitespace",
            dataFields: ["id"]
        }, {
            label: "Fyers ID",
            className: "tv-data-table__cell--left-align",
            id: "fyersId",
            formatter: "remove_whitespace",
            dataFields: ["id_fyers"]
        }, {
            label: "Message",
            className: "tv-data-table__cell--left-align",
            id: "message",
            fixedWidth: !1,
            formatter: "remove_whitespace",
            dataFields: ["message"]
        }];
    class C {
        constructor(e, t) {
            this._subscribers = {}, this._oiSubscribers = {}, this._historyProvider = e, this._realtimeBarsSubList = [], this._realTimeBarsGuid = d.prototype.createGuid("RtBa_"), this.subresolutionsList = ["5S", "10S", "15S", "30S", "45S", "2", "3", "5", "10", "15", "20", "30", "45", "60", "75", "120", "180", "240"], this.noData = !1, this.refreshEnabledTimeFrames = [], this._indicesSymbolMapping = {}
        }
        subscribeBars(e, t, r, a) {
            if (e.symbol && d.prototype.checkIfOISymbol(e.symbol)) {
                const s = d.prototype.getSymbolNameFromOiSymbol(e.symbol),
                    o = { ...e,
                        base_name: [s],
                        description: s,
                        name: s,
                        symbol: s,
                        base_name: [s],
                        legs: [s],
                        full_name: [s],
                        pro_name: [s],
                        ticker: s
                    };
                this._oiSubscribers[a] = {
                    lastBarTime: null,
                    listener: r,
                    resolution: t,
                    symbolInfo: o
                }
            } else this._subscribers.hasOwnProperty(a) ? c(`DataPulseProvider: already has subscriber with id=${a}`) : (this._subscribers[a] = {
                lastBarTime: null,
                listener: r,
                resolution: t,
                symbolInfo: e
            }, FyersCommonModule.customIndicator.volumeIndicator.subscribeConstituentSymbolIfneeded(e ? .full_name), this._updateRtBarsList(a, "add"), FyTrade.subscribeQuotesRtData(this._realtimeBarsSubList, this._realtimeBarsSubList, this._updateBars.bind(this), this._realTimeBarsGuid), c(`DataPulseProvider: subscribed for #${a} - {${e.name}, ${t}}`))
        }
        unsubscribeBars(e) {
            delete this._subscribers[e], delete this._oiSubscribers[e], delete FyTrade.data._subscribedBars[e], this._updateRtBarsList(e, "remove"), c(`DataPulseProvider: unsubscribed for #${e}`)
        }
        _updateRtBarsList(e, t) {
            const r = e.slice(0, -2),
                a = this._realtimeBarsSubList.indexOf(r),
                s = -1 === a;
            "add" === t && s ? this._realtimeBarsSubList.push(r) : "remove" !== t || s || this._realtimeBarsSubList.splice(a, 1)
        }
        _updateBars(e) {
            for (let t in this._subscribers) {
                let r = this._subscribers[t];
                const a = t.split("_")[0];
                let s = e.find((e => e.n === a));
                s && this.processSubSymbolData(s, r, t)
            }
            for (let t in this._oiSubscribers) {
                let r = t,
                    a = this._oiSubscribers[r];
                const s = r.split("_")[0],
                    o = d.prototype.checkIfOISymbol(s);
                a.isOISymbol = o;
                const i = o ? d.prototype.getSymbolNameFromOiSymbol(s) : s;
                let n = e.find((e => e.n === i));
                n && this.processSubSymbolData(n, a, r)
            }
        }
        processSubSymbolData(e, t, r) {
            if (!e.v ? .tickHasVolumeOrLtp) return;
            if (e.v.isASnapShot) return;
            if ("sessionTiming" in t || (t.sessionTiming = this.getSessionTiming(t.symbolInfo.session)), globalConstants ? .config ? .enabled_features ? .prepost_candle_restrict) {
                const r = globalConstants ? .config ? .enabled_features ? .correctionKeyFlag ? i.prototype.getCorectionSessionTime() : t.sessionTiming;
                if (!d.prototype.isWithinTimeRange(1e3 * e ? .v ? .cmd ? .t, r, !0)) return
            }
            let a = t.resolution;
            "D" === a || "1D" == a ? this.processDailyData(e, t) : "1" === a ? this.processIntradayData(e, t, r) : a.endsWith("S") ? this.processSecondsResolutionData(e, t, r) : parseInt(a) >= 2 && parseInt(a) <= 240 && this.processCustomResolutionData(e, t, r)
        }
        incrementCandleCountAndReset(e, t) {
            const r = t[e];
            if (r.candleRefreshCount && r.candleRefreshCount >= 5) {
                r.candleRefreshCount = 1;
                let t = [];
                for (let e = 0; e <= tvWidget.chartsCount(); e++) try {
                    const r = tvWidget.chart(e);
                    r && t.push(r)
                } catch (e) {
                    break
                }
                return t.forEach((t => {
                    const r = t.symbol(),
                        a = t.resolution(),
                        s = d.prototype.generateSymbolTickerName(r, a);
                    if (s === e) {
                        const e = datafeed.resetCacheNeededCallbacks[s];
                        e && e(), t.resetData()
                    }
                })), !0
            }
            return r.candleRefreshCount = (r.candleRefreshCount || 0) + 1, !1
        }
        processSecondsResolutionData(e, t, r) {
            let a = FyTrade.data._subscribedBars;
            if ("csd" in e.v) {
                "sessionTiming" in t || (t.sessionTiming = this.getSessionTiming(t.symbolInfo.session));
                let s = parseFloat(e.v.csd.t),
                    o = this.floorTimeToParentSecond(s, t);
                if (void 0 === a[r]) {
                    console.warn("Seconds bar not updated from History!");
                    const t = e.v.csd.ltpFromSource,
                        s = e.v.volume || 0;
                    if (!t) return void console.warn("%cUnexpected boundary. Unable to create tick due to no ltp change", "color: red");
                    a[r] = {
                        open: t,
                        high: t,
                        low: t,
                        close: t,
                        timeBeginStamp: 1e3 * o,
                        volume_prev_min: 0,
                        volume_last_tick: 0,
                        volume: s
                    }
                }
                let i = !1;
                if (o === a[r].time_prev_tick || a[r].first || (i = !0), a[r].time_prev_tick = o, e.v.csd.isSecChanged && i && !a[r].first) {
                    if (FyersCommonModule.customIndicator.volumeIndicator.resetIndicesConstituentVolume(e ? .symbol), a[r].open = parseFloat(e.v.csd.ltpFromSource), a[r].low = parseFloat(e.v.csd.ltpFromSource), a[r].high = parseFloat(e.v.csd.ltpFromSource), a[r].accumulatedVolume = 0, this.refreshEnabledTimeFrames.includes(t.resolution) && this.incrementCandleCountAndReset(r, a)) return
                } else a[r].high < parseFloat(e.v.csd.ltpFromSource) && (a[r].high = parseFloat(e.v.csd.ltpFromSource)), a[r].low > parseFloat(e.v.csd.ltpFromSource) && (a[r].low = parseFloat(e.v.csd.ltpFromSource));
                this.setLtpAsOHLCForCandleDifference(a[r], 1e3 * o, e.v.csd.ltpFromSource), e.v.tickHasNewHigh && e.v.high_price && !a[r].first && e.v.high_price > a[r].high && (a[r].high = e.v.high_price), e.v.tickHasNewLow && e.v.low_price && !a[r].first && e.v.low_price < a[r].low && (a[r].low = e.v.low_price), a[r].first = !1, a[r].subResolution_arr = t.resolution;
                const n = this.calculateVolume(e, r, 1e3 * o);
                a[r].timeBeginStamp = 1e3 * o;
                let l = {
                    close: t.isOISymbol ? e.v.oi : parseFloat(e.v.csd.ltpFromSource),
                    high: a[r].high,
                    low: a[r].low,
                    open: a[r].open,
                    time: a[r].timeBeginStamp,
                    volume: n
                };
                !e.v.isASnapShot && d.prototype.checkForObjectNull(l) && (c("%cUnexpected boundary Last bar updated to OHLC for first candle."), l = {
                    close: parseFloat(e.v.csd.ltpFromSource),
                    high: parseFloat(e.v.csd.ltpFromSource),
                    low: parseFloat(e.v.csd.ltpFromSource),
                    open: parseFloat(e.v.csd.ltpFromSource),
                    time: a[r].timeBeginStamp,
                    volume: 0
                }, a[r].last_history_time && d.prototype.checkIfCandleIsOfPreviousDay(a[r].last_history_time) && e.v ? .open_price && (a[r].open = e.v ? .open_price, a[r].last_history_time = null)), d.prototype.checkForObjectNull(l) || t.listener(l)
            }
        }
        calculateVolume(e, t, r) {
            try {
                let a = e.v.volume || 0;
                const s = globalConstants ? .config ? .indices_volume ? .enabled_indices ? .includes(t.split("_")[0]);
                s && (a = FyTrade.data.dataPulseProvider._indicesSymbolMapping[t.split("_")[0]].realTimeVolume);
                let o = FyTrade.data._subscribedBars;
                if (o[t].hasOwnProperty("accumulatedVolume") && !o[t].first) o[t].hasOwnProperty("hasDaysVolume") ? (o[t].accumulatedVolume = o[t].accumulatedVolume + a - o[t].volume_last_tick, s && o[t].accumulatedVolume < 0 && (o[t].accumulatedVolume = 0)) : (o[t].accumulatedVolume = 0, a && (o[t].hasDaysVolume = !0));
                else if (o[t].timeBeginStamp === r) {
                    if (!a) return o[t].volume_last_tick;
                    o[t].accumulatedVolume = o[t].volume_last_tick, o[t].hasDaysVolume = !0
                } else {
                    if (!a) return 0;
                    o[t].hasDaysVolume = !0, o[t].accumulatedVolume = 0
                }
                return o[t].volume_last_tick = a, o[t].accumulatedVolume < 0 && (console.warn("%cUnexpected boundary Negative volume.", "color: red"), o[t].accumulatedVolume = 0), o[t].accumulatedVolume
            } catch (e) {
                return console.warn(e), c("%cUnexpected boundary: Volume calculation"), 0
            }
        }
        processCustomResolutionData(e, r, a) {
            let s = FyTrade.data._subscribedBars;
            if ("cmd" in e.v) {
                "sessionTiming" in r || (r.sessionTiming = this.getSessionTiming(r.symbolInfo.session));
                let l = parseFloat(e.v.cmd.t),
                    {
                        timeD: u,
                        remMinTocomplCandle: h
                    } = this.getMinAndupdatedTime(l, r);
                const m = e.v.cmd ? .ltpFromSource;
                if (void 0 === s[a]) return c("Bar not updated from History.....Need to check"), void(s[a] = {
                    open: m,
                    high: m,
                    low: m,
                    close: m,
                    timeBeginStamp: u,
                    volume_prev_min: 0,
                    volume_last_tick: 0
                });
                e.v.cmd.isMinChanged && 0 === h && !s[a].first && (FyersCommonModule.customIndicator.volumeIndicator.resetIndicesConstituentVolume(e ? .symbol), s[a].open = parseFloat(e.v.cmd.o), s[a].low = parseFloat(e.v.cmd.l), s[a].volume_prev_min = 0, s[a].high = parseFloat(e.v.cmd.h), s[a].accumulatedVolume = 0), this.setLtpAsOHLCForCandleDifference(s[a], 1e3 * u, m), s[a].subResolution_arr = r.resolution, s[a].high < parseFloat(e.v.cmd.h) && (s[a].high = parseFloat(e.v.cmd.h)), s[a].low > parseFloat(e.v.cmd.l) && (s[a].low = parseFloat(e.v.cmd.l)), e.v.tickHasNewHigh && e.v.high_price && !s[a].first && e.v.high_price > s[a].high && (s[a].high = e.v.high_price), e.v.tickHasNewLow && e.v.low_price && !s[a].first && e.v.low_price < s[a].low && (s[a].low = e.v.low_price);
                const p = this.calculateVolume(e, a, 1e3 * u);
                s[a].timeBeginStamp = 1e3 * u, s[a].first = !1;
                var o = e.v.marketStat,
                    i = r.isOISymbol ? e.v.oi : parseFloat(e.v.cmd.c);
                s[a].last_history_time && d.prototype.checkIfCandleIsOfPreviousDay(s[a].last_history_time) && e.v ? .open_price && (s[a].open = e.v ? .open_price, s[a].last_history_time = null);
                var n = {
                    close: i,
                    high: s[a].high,
                    low: s[a].low,
                    open: s[a].open,
                    time: s[a].timeBeginStamp,
                    volume: p
                };
                (o === t.MARKET_OPEN || o === t.MARKET_PARTIALLY_OPEN && !d.prototype.checkForObjectNull(n)) && r.listener(n)
            }
        }
        processIntradayData(e, r, a) {
            if ("cmd" in e.v) {
                let s = FyTrade.data._subscribedBars,
                    o = {},
                    i = parseFloat(e.v.cmd.t),
                    n = this.updateTimeToMinStart(1e3 * i);
                const l = e.v.cmd ? .ltpFromSource;
                if (void 0 === s[a]) {
                    if (c("Bar not updated from History....."), !l) return void console.warn("%cUnexpected boundary. Unable to create tick due to no ltp change", "color: red");
                    s[a] = {
                        open: l,
                        high: l,
                        low: l,
                        close: l,
                        timeBeginStamp: n,
                        volume_prev_min: 0,
                        volume_last_tick: 0,
                        hasDaysVolume: !1
                    }
                }
                if (!s[a].first && e.v.cmd.isMinChanged && n !== s[a].timeBeginStamp) {
                    const t = e.v.cmd;
                    FyersCommonModule.customIndicator.volumeIndicator.resetIndicesConstituentVolume(e ? .symbol), s[a] = {
                        open: parseFloat(t.o),
                        low: parseFloat(t.l),
                        high: parseFloat(t.h),
                        timeBeginStamp: n,
                        accumulatedVolume: 0,
                        volume_last_tick: s[a].volume_last_tick,
                        first: s[a].first,
                        hasDaysVolume: !!s[a].hasDaysVolume && s[a].hasDaysVolume
                    }
                }
                this.setLtpAsOHLCForCandleDifference(s[a], n, l), s[a].high < parseFloat(e.v.cmd.h) && (s[a].high = parseFloat(e.v.cmd.h)), s[a].low > parseFloat(e.v.cmd.l) && (s[a].low = parseFloat(e.v.cmd.l)), e.v.tickHasNewHigh && e.v.high_price && !s[a].first && e.v.high_price > s[a].high && (s[a].high = e.v.high_price), e.v.tickHasNewLow && e.v.low_price && !s[a].first && e.v.low_price < s[a].low && (s[a].low = e.v.low_price);
                const u = this.calculateVolume(e, a, n);
                s[a].first = !1;
                const h = r.isOISymbol ? e.v.oi : parseFloat(e.v.cmd.c);
                "sessionTiming" in r || (r.sessionTiming = this.getSessionTiming(r.symbolInfo.session));
                let m = e.v.marketStat;
                s[a].last_history_time && d.prototype.checkIfCandleIsOfPreviousDay(s[a].last_history_time) && e.v ? .open_price && (s[a].open = e.v ? .open_price, s[a].last_history_time = null), o = {
                    close: h,
                    high: s[a].high,
                    low: s[a].low,
                    open: s[a].open,
                    time: n,
                    volume: u
                }, (m === t.MARKET_OPEN || m === t.MARKET_PARTIALLY_OPEN && !d.prototype.checkForObjectNull(o)) && r.listener(o)
            }
        }
        processDailyData(e, t) {
            let r = this.createLastBar(e.v, "D");
            if (t.isOISymbol && e.v.oi && (r.close = e.v.oi), r.close && this.setDefaultClosePricesIfZero(r), "cmd" in e.v) {
                t.lastBarTime = r.time;
                const a = d.prototype.checkIfPreMarketCandle(r.time),
                    s = d.prototype.checkIfCDorCOM(e.symbol);
                d.prototype.checkForObjectNull(r) || (!s && a ? (r.open = r.close, r.low = r.close, r.high = r.close, globalConstants ? .config ? .indices_volume ? .enabled_indices ? .includes(e ? .symbol) && (r.volume = 0), t.listener(r)) : t.listener(r))
            }
        }
        getSessionTiming(e) {
            var t = e.split("-");
            return {
                sh: parseInt(t[0].slice(0, 2)),
                sm: parseInt(t[0].slice(2)),
                eh: parseInt(t[1].slice(0, 2)),
                em: parseInt(t[1].slice(2))
            }
        }
        setDefaultClosePricesIfZero(e) {
            0 === e.high && (e.high = e.close), 0 === e.open && (e.open = e.close), 0 === e.low && (e.low = e.close)
        }
        createLastBar(e, t) {
            let r = {};
            if ("D" === t) {
                let t;
                t = globalConstants.config.indices_volume.enabled_indices.includes(e ? .description) ? FyTrade.data.dataPulseProvider._indicesSymbolMapping[e ? .description].dayVolume : e ? .volume, r = {
                    close: parseFloat(e.lp),
                    high: parseFloat(e.high_price),
                    isBarClose: !1,
                    isLastBar: !0,
                    low: parseFloat(e.low_price),
                    open: parseFloat(e.open_price),
                    time: 1e3 * parseFloat(e.tt),
                    volume: parseFloat(t)
                }
            } else "1" === t && (r = {
                close: parseFloat(e.c),
                high: parseFloat(e.h),
                low: parseFloat(e.l),
                open: parseFloat(e.o),
                time: 1e3 * parseFloat(e.t),
                volume: parseFloat(e.v)
            });
            return r
        }
        updateSubscribedBarsFromHist(e, t, r) {
            let a = FyTrade.data._subscribedBars,
                s = d.prototype.generateSymbolTickerName(t, r);
            if (e.length) {
                let t = e[e.length - 1];
                0 === Object.keys(a).filter((e => s === e)).length && (a[s] = {
                    open: t.open,
                    high: t.high,
                    low: t.low,
                    close: t.close,
                    timeBeginStamp: t.time,
                    volume_prev_min: t.volume,
                    volume_last_tick: t.volume,
                    first: !0,
                    last_history_time: t.time || null
                })
            }
        }
        updateTimeToMinStart(e) {
            const t = Math.floor(e / 1e3),
                r = new Date(1e3 * t);
            return r.setSeconds(0), r.setMilliseconds(0), r.getTime()
        }
        getMinAndupdatedTime(e, t) {
            var r = new Date,
                a = new Date(r.getFullYear(), r.getMonth(), r.getDate(), t.sessionTiming.sh, t.sessionTiming.sm),
                s = e % parseInt(a.getTime() / 1e3) / 60 % parseInt(t.resolution);
            return {
                timeD: e -= 60 * s,
                remMinTocomplCandle: s = parseInt(s)
            }
        }
        floorTimeToParentSecond(e, t) {
            const r = new Date,
                a = new Date(r.getFullYear(), r.getMonth(), r.getDate(), t.sessionTiming.sh, t.sessionTiming.sm);
            return e - e % parseInt(a.getTime() / 1e3) % parseInt(t.resolution)
        }
        setLtpAsOHLCForCandleDifference(e, t, r) {
            if (e.first && t && e.timeBeginStamp && e.timeBeginStamp !== t) {
                console.warn("LTP updated to OHLC due to candle difference");
                const t = r || e.close;
                e.open = t, e.low = t, e.volume_prev_min = 0, e.high = t
            }
        }
    }
    class R {
        constructor() {
            this.FYERS_OBJ = t.FYERS_OBJ, this._subscribers = {}, this._entireSubscribers = {
                fastSymbols: [],
                symbols: []
            }, this._requestsPending = 0, this.L2callback = "", this._titleSymbolsGuid = d.prototype.createGuid("qsbt_")
        }
        subscribeQuotes(e, t, r, a) {
            e = FyTrade.data.datahelper.sanitizeSymbols(e), t = FyTrade.data.datahelper.sanitizeSymbols(t), this._subscribers[a] = {
                symbols: e,
                fastSymbols: t,
                listener: r
            }, this.subscribeQuotesToTeli(t);
            var s = this.createEntireSubscribers(this._subscribers);
            this._entireSubscribers = s, c("QuotesPulseProvider: subscribed quotes with #" + a)
        }
        subscribeQuotesToTeli(e) {
            let t = FyTrade.data.datahelper.getIndexMcxAndGenricSymbol(e);
            t.mcxSymbols.length && FyTrade.data.teli.waitBeforeCall(t.mcxSymbols, 0), t.genricSymbol.length && FyTrade.data.teli.waitBeforeCall(t.genricSymbol, 0), t.indexSymbol.length && FyTrade.data.teli.waitBeforeCall(t.indexSymbol, 1)
        }
        unsubscribeQuotes(e) {
            delete this._subscribers[e];
            var t = this._entireSubscribers.fastSymbols,
                r = this.createEntireSubscribers(this._subscribers),
                a = t.filter((function(e) {
                    return r.fastSymbols.indexOf(e) < 0
                }));
            a.length > 0 && this.unSubscribe(a), this._entireSubscribers = r, c("QuotesPulseProvider: unsubscribed quotes with #" + e)
        }
        createEntireSubscribers(e) {
            const t = {
                fastSymbols: [],
                symbols: []
            };
            for (const r of Object.values(e)) FyTrade.data.datahelper.updateSymbolList(r.symbols, t.symbols), FyTrade.data.datahelper.updateSymbolList(r.fastSymbols, t.fastSymbols);
            return t
        }
        titleSymbolSubscribeFunc(e) {
            try {
                var t = e.symbol ? e.symbol : e;
                this.unsubscribeQuotes(this._titleSymbolsGuid), this.subscribeQuotes([t], [t], this.realTimeUpdate2.bind(this), this._titleSymbolsGuid);
                var r = t.split(":")[1].split("-")[0];
                document.title = r, FyTrade.helpers.updateWidgetSymbol()
            } catch (e) {
                console.log("titleSymbolSubscribeFunc : error : " + e)
            }
        }
        realTimeUpdate2(e) {
            try {
                var t = {};
                for (let r of e) r && (FyersCommonModule.customIndicator.volumeIndicator.updateIndicesConstituentVolumeIfRequired(r), t[r.n] = r.v);
                this.titleRealtimeUpdate(t)
            } catch (e) {
                console.log("realTimeUpdate2: " + e)
            }
        }
        titleRealtimeUpdate(e) {
            var t = tvWidget.activeChart().symbol();
            if (t) try {
                var r = e[t];
                if (!r) return;
                var a = t.split(":")[1],
                    s = r.lp,
                    o = r.chp,
                    i = FyTrade.data.datahelper.precisionForTitle(a),
                    n = parseFloat(s).toFixed(i) + " (" + o.toFixed(2) + "%) " + a;
                "/" !== window.location.pathname && (n = "* " + n), document.title = n
            } catch (e) {
                console.log("titleRealtimeUpdate: " + e)
            }
        }
        _updateQuotes(e) {
            if (!(this._requestsPending > 1) && this._entireSubscribers.symbols.length) {
                this._requestsPending++;
                var t = this,
                    r = this._entireSubscribers.symbols;
                FyTrade.data.quotes.getQuotes(r).then((function(r) {
                    for (var a in t._requestsPending--, t._subscribers) t._subscribers.hasOwnProperty(a) && (t._subscribers[a].listener(r), c("QuotesPulseProvider: data for #" + a + " (" + e + ") updated successfully, pending=" + t._requestsPending))
                })).catch((function(e) {
                    t._requestsPending--
                }))
            }
        }
        unSubscribe(e) {
            try {
                if (null == FyTrade.data.FYERS_OBJ.DATA_CONN) console.log("WebSocket not open");
                else {
                    for (var t = 0; t < e.length; t++) {
                        var r = this.FYERS_OBJ.SUBSCRIBE_TICKER.TLIST.indexOf(e[t]); - 1 !== r && this.FYERS_OBJ.SUBSCRIBE_TICKER.TLIST.splice(r, 1)
                    }
                    this.FYERS_OBJ.UNSUBSCRIBE_TICKER.TLIST = e;
                    let a = FyTrade.data.datahelper.getIndexMcxAndGenricSymbol(this.FYERS_OBJ.UNSUBSCRIBE_TICKER.TLIST);
                    FyTrade.data.teli.subUnsubViaScript(a.genricSymbol, 4), FyTrade.data.teli.subUnsubViaScript(a.indexSymbol, 6)
                }
            } catch (e) {
                console.log(e)
            }
        }
        subscribeL2(e, t) {
            try {
                var r = [e];
                return this.FYERS_OBJ.SUBSCRIBE_L2.L2LIST = r, this.L2callback = t, e.startsWith("MCX") ? FyTrade.data.teli.subUnsubViaScript(this.FYERS_OBJ.SUBSCRIBE_L2.L2LIST, 2) : r.length && FyTrade.data.teli.subUnsubViaScript(r, 2), e + "_" + Math.random().toString(20)
            } catch (e) {
                console.log(e)
            }
        }
        unSubscribeL2(e) {
            try {
                var t = [e];
                this.FYERS_OBJ.UNSUBSCRIBE_L2.L2LIST = t, FyTrade.data.teli.subUnsubViaScript(this.FYERS_OBJ.UNSUBSCRIBE_L2.L2LIST, 5)
            } catch (e) {
                console.log(e)
            }
        }
    }
    var M = {},
        L = {},
        B = [];
    class Y {
        constructor() {
            this._datafeedUrl = r.DATAFEED_URL, this._quotesGuid = d.prototype.createGuid("qsqt_")
        }
        getQuotes(e) {
            var t = this;
            if (0 === e.length) return Promise.resolve([]);
            var r = [],
                a = [],
                s = [];
            return FyTrade.data.quoteSupplier.subscribeQuotes(e, e, t.quotesDataUpdate.bind(t), t._quotesGuid), new Promise((function(o, i) {
                t.watchlistQuotesUpdate(a), t.checkIfQuotesReqNeeded(e, s), s.length ? t.callQuotes(s, o) : t.CheckInUpdatedQuotes(e, o, r)
            }))
        }
        quotesDataUpdate(e) {
            if (void 0 !== e)
                for (const t of e) M[t.n] = t
        }
        watchlistQuotesUpdate(e) {
            let t;
            if (tvWidget.watchList().then((r => {
                    r && (t = r.getActiveListId(), null !== t && (e = r.getList()))
                })), e.length) {
                if (B.length) {
                    if (B.length > e.length)
                        for (const t of B)
                            if (!e.includes(t)) {
                                delete M[t];
                                break
                            }
                } else B = e;
                B = e
            }
        }
        checkIfQuotesReqNeeded(e, t) {
            e.forEach((e => {
                e in L || (L[e] = 0, t.push(e))
            }))
        }
        CheckInUpdatedQuotes(e, t, r) {
            for (const t of e)
                if (void 0 !== M[t]) {
                    const e = M[t];
                    r.includes(e) || r.push(e)
                }
            t(r)
        }
        callQuotes(e, t) {
            var r = {
                symbols: e,
                dataReq: Math.round((new Date).getTime() / 1e3)
            };
            FyTrade.data.requester.sendRequest(globalConstants.dynamicUrl.data.quotes, "", r).then((function(e) {
                "ok" === e.s ? (e.d.forEach((function(e) {
                    "ok" != e.s && delete L[e.n], M[e.n] = e
                })), t(e.d)) : reject(e.errmsg)
            })).catch((function(e) {
                var t = getErrorMessage(e);
                logMessage("QuotesProvider: getQuotes failed, error=" + t)
            }))
        }
    }
    class U {
        constructor() {
            this.splitApiCalls = !1, this.chartResetCount = 0
        }
        getBars(e, a, s, o) {
            const i = "1D" != a ? FyTrade.data.datahelper.timestampDiffAndConversion(s) : s.from,
                n = Math.round((new Date).getTime() / 1e3),
                l = d.prototype.checkIfOISymbol(e.symbol),
                c = l ? d.prototype.getSymbolNameFromOiSymbol(e.symbol) : "";
            s.isOISymbol = l;
            const h = {
                symbol: c || e.ticker || "",
                resolution: a,
                from: i,
                to: s.to,
                token_id: tokenId,
                dataReq: n,
                token_id: tokenId,
                contFlag: o
            };
            return 1 == FyTrade.symbolData[h.symbol] ? .expired ? (FyTrade.symbolData[h.symbol] ? .expiryWarning || (FyTrade.common.fy_showToaster(t.toaster.type.warning, "The symbol has expired!", `The scrip ${h.symbol} is expired, Please select another symbol to access the chart`, "", 3e3), FyTrade.symbolData[h.symbol].expiryWarning = !0), Promise.resolve({
                bars: [],
                meta: {
                    noData: !0
                }
            })) : s.from < 0 && s.to < 0 ? Promise.resolve({
                bars: [],
                meta: {
                    noData: !0
                }
            }) : (void 0 !== s.countBack && (h.countback = s.countBack), void 0 !== e.currency_code && (h.currencyCode = e.currency_code), void 0 !== e.unit_id && (h.unitId = e.unit_id), new Promise((async (t, o) => {
                try {
                    const o = globalConstants ? .config ? .indices_volume ? .enabled_indices.includes(e ? .symbol),
                        n = await FyTrade.data.requester.sendRequest(r.HISTORY_URL, "", h),
                        d = this._processHistoryResponse(n, l, o);
                    this.splitApiCalls && !d.meta.noData && 0 != d.meta.nextTime && await this._processTruncatedResponse(d, s, i, h), s.firstDataRequest && FyTrade.data.dataPulseProvider.updateSubscribedBarsFromHist(d.bars, e.ticker, a), t(d)
                } catch (e) {
                    if (e instanceof Error || "string" == typeof e) {
                        const t = u(e);
                        "Failed to fetch" === t && this.chartResetCount <= 3 && (this.chartResetCount = this.chartResetCount + 1, FyTrade._updateTradingDetails(), datafeed.resetCache(), tvWidget.activeChart().resetData(), tvWidget.save((e => {
                            tvWidget.load(e)
                        }))), console.warn(`HistoryProvider: getBars() failed, error=${t}`), o(t)
                    }
                }
            })))
        }
        _processHistoryResponse(e, t, r = !1) {
            if ("ok" !== e.s && "no_data" !== e.s) return {
                bars: [],
                meta: {
                    noData: !0
                }
            };
            const a = [],
                s = {
                    noData: !1
                };
            if ("no_data" === e.s) s.noData = !0, s.nextTime = e.nextTime;
            else {
                const s = e.candles,
                    o = void 0 !== s[0][5],
                    i = void 0 !== s[0][1];
                for (let e = 0; e < s.length; ++e) {
                    const n = {
                        time: 1e3 * s[e][0],
                        open: s[e][4],
                        high: s[e][4],
                        low: s[e][4],
                        close: t ? s[e][6] : s[e][4]
                    };
                    i && (n.open = s[e][1], n.high = s[e][2], n.low = s[e][3]), o && (n.volume = s[e][5]), !FyersCommonModule ? .helper ? .checkIfClientIsEnabledForVolumeIndicator() && r && (n.volume = 0), a.push(n)
                }
            }
            return {
                bars: a,
                meta: s
            }
        }
        async _processTruncatedResponse(e, t, a, s) {
            try {
                let o, i, n, l, d = !0;
                for (; d;) {
                    i = t.from, o = o || a, n = t.to, l = o;
                    const c = new Date(1e3 * l);
                    if (c.setFullYear(c.getFullYear() - 1), c.setDate(c.getDate()), o = c.getTime() / 1e3, o < 0 || l < 0) break;
                    s.from = o, s.to = l;
                    const u = await FyTrade.data.requester.sendRequest(r.HISTORY_URL, "", s),
                        h = this._processHistoryResponse(u, t.isOISymbol);
                    if (h.meta.noData && (void 0 === h.meta.nextTime || 0 === h.meta.nextTime)) break;
                    e.bars.unshift(...h.bars), new Date(1e3 * i) > new Date(1e3 * o) && (d = !1)
                }
            } catch (e) {
                if (e instanceof Error || "string" == typeof e) {
                    const t = u(e);
                    console.warn(`HistoryProvider: getBars() warning during followup request, error=${t}`)
                }
            }
        }
    }
    class x {
        constructor(e) {
            e && (this._headers = e)
        }
        async sendRequest(e, t, r, a = !0) {
            let s = t;
            r && (a && (r.token_id = tokenId), t += `?${Object.entries(r).map((([e,t])=>`${encodeURIComponent(e)}=${encodeURIComponent(t.toString())}`)).join("&")}`), c(`New request: ${t}`);
            const o = {},
                {
                    _headers: i
                } = this;
            i && (o.headers = i);
            try {
                const e = getCookie("_FYERS");
                o.headers || (o.headers = {}), o.headers.Authorization = e
            } catch (e) {
                console.log("Error while adding token", e)
            }
            const n = await fetch(`${e}${""===s?"":"/"}${t}`, o),
                l = await n.text();
            return JSON.parse(l)
        }
    }
    class W {
        constructor() {
            this.teli = new h, this.socket = new y, this.datahelper = new d, this.quotes = new Y, this.quoteSupplier = new R, this.historyProvider = new U, this.requester = new x, this.dataPulseProvider = new C, this.exchangeTokenAndValueMapping = {}, this.symbolPriceDict = {}, this.FYERS_OBJ = null, this._subscribedBars = {}
        }
        connect() {
            this.teli.connectToHSM()
        }
        reconnect() {
            this.teli.reconnectToHSM()
        }
    }
    const V = {
            orderBookData: {},
            holdingsData: {},
            mtfConversiondata: {},
            holdings: [],
            positions: {},
            funds: {},
            trade_list: {},
            watchlist: {
                load: !1,
                data: {}
            }
        },
        H = "SET_SYMBOL_MASTER",
        q = {
            unzippedData: {}
        },
        X = Redux.combineReducers({
            broker: (e = V, t) => {
                switch (t.type) {
                    case T:
                        return Object.assign(e, {
                            holdings: t.payload
                        });
                    case b:
                        return Object.assign(e, {
                            holdingsData: t.payload
                        });
                    case f:
                        return Object.assign(e, {
                            funds: t.payload
                        });
                    case E:
                        return Object.assign(e, {
                            trade_list: t.payload
                        });
                    case S:
                        return Object.assign(e, {
                            positions: t.payload
                        });
                    case _:
                        return Object.assign(e, {
                            watchlist: {
                                load: !0,
                                data: t.payload
                            }
                        });
                    case F:
                        return Object.assign(e, {
                            orderBookData: t.payload
                        });
                    case I:
                        return Object.assign({}, e, {
                            mtfConversiondata: t.payload
                        });
                    default:
                        return e
                }
            },
            symbol: (e = q, t) => t.type === H ? (console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"), console.log(t.payload), Object.assign(e, {
                unzippedData: t.payload
            })) : e
        }),
        Q = Redux.createStore(X, Redux.applyMiddleware((({
            dispatch: e
        }) => t => r => "function" == typeof r ? r(e) : t(r))));
    Q.subscribe((() => {
        FyTrade.storeData = Q.getState()
    }));
    const z = Q,
        G = {
            broker: z.getState().broker,
            symbol: z.getState().symbol
        };
    class K {
        constructor() {}
        getPledgeIcon() {
            return '\n            <svg class="ml-2" width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n                <g clip-path="url(#clip0_12_2278)">\n                    <path d="M4.48909 0.719999C7.17456 0.719999 9.36 2.81042 9.36 5.4C9.36 7.98958 7.17456 10.08 4.48909 10.08H0.48C0.214903 10.08 0 9.8651 0 9.6C0 9.3349 0.214903 9.12 0.48 9.12H4.48909C6.65368 9.12 8.4 7.44961 8.4 5.4C8.4 3.35039 6.65368 1.68 4.48909 1.68H0.48C0.214903 1.68 0 1.4651 0 1.2C0 0.934903 0.214903 0.719999 0.48 0.719999H4.48909Z" fill="#747E8B"/>\n                    <path d="M4.41916 3.02034L6.21916 4.81769L6.55882 5.15685L6.21966 5.49651L4.41966 7.29916C4.23235 7.48675 3.92843 7.48697 3.74084 7.29966C3.55325 7.11235 3.55303 6.80843 3.74034 6.62084L4.7124 5.646L3 5.64706C1.89543 5.64706 1 6.40554 1 7.34118V11.5765C1 11.8104 0.776142 12 0.5 12C0.223858 12 0 11.8104 0 11.5765V7.34118C0 5.93772 1.34315 4.8 3 4.8L4.842 4.7988L3.74084 3.69966C3.5767 3.53576 3.55601 3.28259 3.67889 3.09618L3.74034 3.02084C3.92765 2.83325 4.23157 2.83302 4.41916 3.02034Z" fill="#747E8B"/>\n                </g>\n                <defs>\n                    <clipPath id="clip0_12_2278">\n                    <rect width="9.6" height="12" fill="white"/>\n                    </clipPath>\n                </defs>\n            </svg>'
        }
        getEdisPledgeModal(e, t, r, a) {
            return `\n            <tr class="edis-pledge">\n                <td class="CbContainer"><input type="checkbox" class="alignmentFixCheckbox mr-1 orderwin-checkbox customCbBuy"\n                    id=${e.isin} onclick="FyTrade.edis.selectAndUnselect(this)">\n                    <span class="checkmark"></span>\n                    <span class="ml-4 edis-label-item">${e.symbol} ${this.getPledgeIcon()}</span>\n                </td>\n                <td class="edis-${a}" id='${e.symbol}H'>${r}</td>\n                <td>${e.costPrice}</td>\n                <td>${e.totalQty}</td>\n                <td>${t}</td>\n                <td><input id=${e.isin+"AuthQuantity"} type="number" step="1" value=${t} min=1 max=${t}  class="inputEntryAuth"/></td>\n            </tr>`
        }
        getSecondModal(e, t, r, a, s, o) {
            return `\n        <tr style="position:relative">\n            <td class="CbContainer">\n                <input type="checkbox" class="alignmentFixCheckbox mr-1 orderwin-checkbox customCbBuy"\n                    id=${e.isin} onclick="FyTrade.edis.selectAndUnselect(this)">\n                <span class="checkmark"></span>\n                <span class="ml-4 edis-label-item">\n                    ${e.symbol} ${r?this.getPledgeIcon():""}  ${t?"<img src='https://assets.fyers.in/edis/images/Authenticated.svg' width='20' height='15'></img>":""}\n                </span>\n            </td>\n            <td class="edis-${s}" id='${e.symbol}H'>${a}</td>\n            <td>${e.costPrice}</td>\n            <td>${e.totalQty}</td>\n            <td>${o}</td>\n            <td>\n                <input id=${e.isin+"AuthQuantity"} type="number" step="1" value=${o} min=1 max=${o} \n                    class="inputEntryAuth mb-2" oninput="FyTrade.edis.validateValue(this)"/>                    \n            </td>\n            <td  width="0" style="padding: 0;\n                position: unset;\n                width: 0px;\n                border: none;\n                display: 4;\n                margin: 0;\n                font-size: 0;">\n                <div id=${e.isin+"AuthQuantityTd"} style="    position: absolute;\n                    right: 10px;\n                    z-index: 9;\n                    bottom: -5px;\n                    font-size: 12px;\n                    color: red;">\n                </div>\n            </td>\n        </tr>`
        }
        getEdisModal() {
            var e = JSON.parse(FyTrade.common.getUserSettingsDataFromLocalStorage()).theme.toLowerCase();
            return `<div id="edisAuthWindow" class="edisContainer ui-draggable ui-draggable-handle d-none">\n              <div class="align-items-center justify-content-between mt-3 row edis-container-padding">\n                  <div id="headings" class="col-md-6"> Authorize holdings</div>\n                  <div class="col-md-6">\n                  <div class="d-flex align-items-center justify-content-md-end">\n                  <div id="ddpi-progress-bar" class="ddpi-progress  d-none px-3">\n                  <div class="ddpi-progress-mustard"></div>\n                  <div class="status-text">Activation In progress</div>\n                  <div class="ddpi-progress-arrow ml-1"></div>\n                  \n                  </div>\n                  <label id="searchBox" class="d-none">\n                      <svg class="searchEdisIcon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">\n                          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.729126 6.70834C0.729126 3.41251 3.41246 0.729172 6.70829 0.729172C10.0041 0.729172 12.6875 3.41251 12.6875 6.70834C12.6875 10.0042 10.0041 12.6875 6.70829 12.6875C3.41246 12.6875 0.729126 10.0042 0.729126 6.70834ZM1.60413 6.70834C1.60413 9.52 3.89079 11.8125 6.70829 11.8125C9.52579 11.8125 11.8125 9.52 11.8125 6.70834C11.8125 3.89667 9.52579 1.60417 6.70829 1.60417C3.89079 1.60417 1.60413 3.89667 1.60413 6.70834Z" fill="#949CA6"/>\n                          <path d="M12.5244 13.1425L11.3577 11.9758C11.1885 11.8066 11.1885 11.5266 11.3577 11.3575C11.5269 11.1883 11.8069 11.1883 11.976 11.3575L13.1427 12.5241C13.3119 12.6933 13.3119 12.9733 13.1427 13.1425C13.0552 13.23 12.9444 13.2708 12.8335 13.2708C12.7227 13.2708 12.6119 13.23 12.5244 13.1425Z" fill="#949CA6"/>\n                      </svg>                            \n                      <input class="form-control" id="searchHoldings" type="search" placeholder="Search Holdings" aria-label="Search"/>\n                  </label>\n                  <button id="closeEdis" class="close-edis-popup-btn pl-3 pr-0 ">\n                  </button>\n                  </div>\n              </div>\n              </div>\n              <div class="row edis-table-container mt-3 overflow-auto edis-container-padding">\n                  <table class="table option-table edis-table">\n                      <thead>\n                          <tr>\n                             ${FyTrade.edis.getIsPoaIsDdpi()?"<th>Scrips</th>":'<th class="CbContainer"><input type="checkbox" class="alignmentFixCheckbox mr-1 orderwin-checkbox customCbBuy" id="selectAllHoldings" onclick="FyTrade.edis.checkAndUncheckAllBox(this)"><span class="checkmark mt-1"></span><span class="edis-label-item ml-4">Scrips</span></th>'} \n                              <th>P&L(%)</th>\n                              <th>Avg Price</th>\n                              <th>Qty</th>\n                              <th>Available Qty</th>\n                              <th>Authorize Qty</th>\n                          </tr>\n                      </thead>\n                      <tbody>\n                      ${FyTrade.edis.getIsPoaIsDdpi()?'<tr><td><div class="editcontainer-error"s>\n                        <img src="https://assets.fyers.in/edis/images/empty-state.svg"  class="mb-3"/>\n                        <h3 class="mt-3 auth-noreq-heading">Authorisation Not Required!</h3>\n                        <h4 class=\'auth-noreq-text\'>You don\'t need authorisation for your holdings since you\'ve already activated POA/DDPI.</h4>\n                      </div></td></tr>':'<tbody id="holdingsRows" class="scrollbarEdis">'}\n                      </tbody>\n                  </table>\n              </div>\n              ${FyTrade.edis.getIsPoaIsDdpi()?"":'<div class="bottomEdisBar justify-content-end pb-2 pt-3 row edis-container-padding">\n                  <div class="col-12 d-flex">\n                      <button class="btn btn-primary authAlignbtn mx-3 block-btn-select" onclick="FyTrade.edis.authoriseHoldings()">Authorize <span id="selectedScriptsQty"></span> scrips</button>\n                      <button id="cancelHoldingsBtn" class="btn btn-outline-dark hoverColor">Cancel</button>\n                  </div>\n              </div>'}\n              <div class="DDPI-container edis-container-padding py-2 d-none">\n              <div class="ddpi-text  py-2 px-3"> \n              \n              </div>\n              <div class="ddpi-desc-text py-1">With DDPI, you can now sell your holdings effortlessly, eliminating the need for repetitive OTPs and TPINs.</div>\n              <div class="d-flex">\n              <a id="ddpi-enable-later" class="enable-ddpi-later ml-3 mr-4" >Later</a>\n              <button class="enable-ddpi-button px-3 py-1">Enable</button>\n              </div>\n              </div>\n              </div>\n              <div class="exeeds-limit-error d-none" id="max-limit-error">\n              <img src="https://assets.fyers.in/edis/images/max-limit-close.svg"/>\n              <p>You have exceeded the max limit of ${t.AUTH_MAX_QTY} scrips. Please unselect the scrips you do not require</p><div>\n      </div>\n  </div>\n  <div class="overlay-ddpi" id="overlay-ddpi">\n      <span class="overlay-ddpi-close"><img src="https://assets.fyers.in/global-components/MTF-icons/backbutton.svg" /></span>\n      <iframe src="${globalConstants.dynamicUrl.ddpi_mtf.mtf_ddpi_base_url}?access_token=${token}&cta=ddpi&theme=${e||"light"}" id="ddpi-iframe"></iframe>\n       </div>`
        }
        appendRealTimePnlValue(e, t) {
            document.getElementById(e) && (document.getElementById(e).innerText = t)
        }
        handleMaxLimitErrorDisplay(e) {
            Object.keys(e).length > t.AUTH_MAX_QTY ? $("#max-limit-error").removeClass("d-none") : $("#max-limit-error").addClass("d-none")
        }
        displayEdisModal(e) {
            e ? $("#edisAuthWindow").removeClass("d-none") : $("#edisAuthWindow").addClass("d-none")
        }
        edisWindow() {
            $(document.body).append(this.getEdisModal()), orderWindow.theme.applyTheme()
        }
        enableEdisWindow() {
            !$("#edisAuthWindow").length && this.edisWindow()
        }
        displayDdpiItems() {
            FyTrade.common.getDdpiFlag() ? this.disableBottomBanner() : this.enableBottomBanner()
        }
        checkDdpiStatus() {
            FyTrade.service.fetchStatusForDDPI().then((e => {
                1e3 === e.code ? this.changeDdpiStatus(e.data.ddpi_status) : console.log("Status API is not ok ! ")
            }))
        }
        changeDdpiStatus(e) {
            switch (e) {
                case "Inactive":
                    this.disableDdpiTopBanner(), this.enableBottomBanner();
                    break;
                case "Active":
                    this.disableDdpiTopBanner(), this.disableBottomBanner();
                    break;
                case "In-progress":
                case "Failed":
                case "On-hold":
                    this.enableDdpiTopBanner(), this.disableBottomBanner();
                    break;
                case "Rejected":
                    this.enableDdpiTopBanner(!0), this.disableBottomBanner();
                    break;
                default:
                    this.disableDdpiTopBanner()
            }
        }
        enableBottomBanner() {
            $(".DDPI-container").removeClass("d-none")
        }
        disableBottomBanner() {
            $(".DDPI-container").addClass("d-none")
        }
        disableDdpiTopBanner() {
            $("#ddpi-progress-bar").removeClass("d-flex").addClass("d-none")
        }
        enableDdpiTopBanner(e = !1) {
            e ? ($("#ddpi-progress-bar").addClass("ddpi-progress-rejected"), $(".status-text").text("Application Rejected")) : ($("#ddpi-progress-bar").removeClass("ddpi-progress-rejected"), $(".status-text").text("Activation In progress")), $("#ddpi-progress-bar").addClass("d-flex").removeClass("d-none")
        }
        checkAllSelectedHoldings(e) {
            $("#selectAllHoldings").prop("checked", e)
        }
        getQuantityValue(e) {
            return document.getElementById(e).value
        }
        getColor(e, t) {
            return e ? t > 0 ? "green" : "red" : "pledge"
        }
        appedHoldingsTalble(e) {
            document.getElementById("holdingsRows").innerHTML = e.toString().replaceAll(",", ""), orderWindow.theme.applyTheme()
        }
        displaySelectedScriptsQty(e) {
            document.getElementById("selectedScriptsQty").innerText = e
        }
        hideAuthButton(e) {
            e ? $(".authAlignbtn").addClass("block-btn-select") : $(".authAlignbtn").removeClass("block-btn-select")
        }
        getErrorMessageElement() {
            return document.getElementsByClassName("errorMsg")
        }
        getCheckBoxElement() {
            return document.getElementsByClassName("alignmentFixCheckbox")
        }
        toggleErrorClass(e, t) {
            var r = document.getElementById(e + "Td");
            t ? r.classList.add("errorMsg") : r.classList.remove("errorMsg"), FyTrade.edis.toggeleAuthButton()
        }
        initiateEventListners() {
            $("#edisAuthWindow").draggable({
                containment: "window"
            }), $("#cancelHoldingsBtn").unbind().click((function() {
                $("#edisAuthWindow").addClass("d-none"), FyTrade.edis.clearData()
            })), $("#closeEdis").unbind().click((function() {
                $("#edisAuthWindow").addClass("d-none"), FyTrade.edis.clearData()
            })), $("#ddpi-enable-later").click((function() {
                $(".DDPI-container")[0].style.display = "none"
            })), $(".enable-ddpi-button").click((function() {
                window.open(t.FYERS_WEB_URL + "/profile/segments/ddpi", "_blank")
            })), $("#ddpi-progress-bar").unbind().click((function() {
                window.open(t.FYERS_WEB_URL + "/profile/segments/ddpi", "_blank")
            }))
        }
        validateValue(e) {
            let r = "";
            parseInt(e.value) > parseInt(e.max) ? (r = t.edisAuth.qtyHighError, this.toggleErrorClass(e.id, !0)) : parseInt(e.value) < parseInt(e.min) ? (r = t.edisAuth.qtyZeroError, this.toggleErrorClass(e.id, !0)) : (r = "", this.toggleErrorClass(e.id, !1)), $("#" + e.id + "Td").text(r)
        }
    }
    class j extends K {
        constructor() {
            super(), this.selectedSctipts = {}, this.allScriptsIsinMapping = {}, this.edisReqObject = {}, this.errorCount = 0, this.isPOA = "N" !== window.poaFlag
        }
        getIsPOA() {
            return this.isPOA
        }
        getIsPoaIsDdpi(e = 0) {
            if (e) {
                const e = "",
                    t = this.getIsPOA(),
                    r = FyTrade.common.getDdpiFlag();
                return t && r || t && !r ? e = "POA" : !t && r && (e = "DDPI"), e
            }
            return this.getIsPOA() || FyTrade.common.getDdpiFlag()
        }
        getReqObject() {
            return this.edisReqObject
        }
        getRealTimePNL(e) {
            try {
                let t = `${e.holdingUnrealizedPnl.toFixed(2)}(${e.holdingUnrealizedPnlPerc.toFixed(2)}%)`,
                    r = e.symbol.replace(/"/g, "") + "H";
                this.appendRealTimePnlValue(r, t)
            } catch (e) {
                console.log("AUTH window real time update error =>", e)
            }
        }
        clearData() {
            this.selectedSctipts = {}, this.allScriptsIsinMapping = {}, this.countAndAddValueInAuthorizeButton(), this.checkAllSelectedHoldings(!1)
        }
        displayEdisWindow() {
            this.enableEdisWindow(), this.clearData(), this.addHoldingsData(), this.initiateEventListners(), FyTrade.common.getConfigFlag("is_ddpi_enabled") && this.checkDdpiStatus()
        }
        handler(e) {
            "primary" == e && FyTrade.cdsl.cdslIndex(broker)
        }
        authoriseHoldings() {
            let e = Object.keys(this.selectedSctipts).map((e => {
                let t = e + "AuthQuantity";
                return {
                    isin_code: e,
                    qty: this.getQuantityValue(t),
                    symbol: this.allScriptsIsinMapping[e]
                }
            }));
            this.edisReqObject = {
                recordLst: e
            };
            let r = {
                title: t.edisAuth.title,
                body: t.edisAuth.description
            };
            FyersWidget.popup_msg.getPopup({
                category: "normal",
                type: "modal",
                title: r.title,
                desc: r.body,
                desc_title: "",
                pri_btn: "Yes",
                seco_btn: "No",
                desc_sub: ""
            }, this.handler.bind(this)), this.displayEdisModal(!1)
        }
        addHoldingsData() {
            this.displayEdisModal(!0), FyTrade.broker._updateHoldings(), FyTrade.updateQuotes(1), setTimeout(this.displayHoldingTable, 500)
        }
        displayHoldingTable() {
            let e = FyTrade.storeData.broker.holdings.map((e => {
                if (!e.description) return null;
                let t = `${e.holdingUnrealizedPnl?e.holdingUnrealizedPnl.toFixed(2):"0"}(${e.holdingUnrealizedPnlPerc?e.holdingUnrealizedPnlPerc.toFixed(2):"0"}%)`,
                    r = e.qty_authorized_available + e.qty_t1_authorized_available,
                    a = FyTrade.edis.getColor(r, e.holdingUnrealizedPnl),
                    s = e.totalQty - e.qty_pledge_available;
                e.qty_t1_authorized_available && !e.qty_authorized_available && (s = 0);
                let o = e.qty_authorized;
                return 0 === r && 0 != e.qty_pledge_available ? null : e.qty_authorized_available + e.qty_t1_authorized_available > 0 ? (FyTrade.edis.allScriptsIsinMapping[e.isin] = e.symbol, FyTrade.edis.getSecondModal(e, o, s, t, a, r)) : void 0
            }));
            FyTrade.edis.appedHoldingsTalble(e)
        }
        countAndAddValueInAuthorizeButton() {
            if (this.getIsPoaIsDdpi()) return;
            let e = Object.keys(this.selectedSctipts).length;
            this.displaySelectedScriptsQty(e || ""), this.toggeleAuthButton(), e !== Object.keys(this.allScriptsIsinMapping).length ? this.checkAllSelectedHoldings(!1) : this.checkAllSelectedHoldings(!0)
        }
        toggeleAuthButton() {
            let e = this.getErrorMessageElement();
            this.handleMaxLimitErrorDisplay(this.selectedSctipts), e.length || Object.keys(this.selectedSctipts).length > t.AUTH_MAX_QTY ? this.hideAuthButton(!0) : Object.keys(this.selectedSctipts).length ? this.hideAuthButton(!1) : this.hideAuthButton(!0)
        }
        checkAndUncheckAllBox(e) {
            let t = this.getCheckBoxElement();
            for (let r of t) this.allScriptsIsinMapping.hasOwnProperty(r.id) && (r.checked = e.checked);
            this.selectedSctipts = e.checked ? { ...this.allScriptsIsinMapping
            } : {}, this.countAndAddValueInAuthorizeButton()
        }
        selectAndUnselect(e) {
            let t = e.id;
            e.checked ? this.selectedSctipts[t] = !0 : delete this.selectedSctipts[t], this.countAndAddValueInAuthorizeButton()
        }
    }
    const J = class {
        static setSymbolMasterData = e => (console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"), console.log(e), {
            type: H,
            payload: e
        });
        static fetchSymbolMaster = () => async e => {
            let t = await FyTrade.dataService.fetchSymbolMasterService();
            if (t) {
                let r = {
                    data: {},
                    others: {},
                    data_format: []
                };
                Object.assign(r.data, t.NSE_FO), Object.assign(r.data, t.NSE_CD), Object.assign(r.data, t.NSE_CM), Object.assign(r.data, t.NSE_COM), Object.assign(r.data, t.BSE_CM), Object.assign(r.data, t.MCX_COM), Object.assign(r.data, t.BSE_FO), Object.assign(r.data, t.BSE_CD), Object.assign(r.data, t.BCS_FO), Object.assign(r.others, t.otherDetails), r.data_format = Array.from(t.data_format), r.others.supportedResolutions = globalConstants.tradingViewConfig.supported_resolutions, datafeed.unzippedData = Object.assign({}, r), e(this.setSymbolMasterData(r))
            }
        }
    };
    class Z {
        constructor() {
            this.broker = new class {
                constructor() {
                    this.funds = new class {
                        constructor() {
                            this._afData = []
                        }
                        async _updateAvailableFunds(e) {
                            try {
                                var t = this;
                                FyTrade.broker._requestPendingCountFunds++, await FyTrade.store.dispatch(FyTrade.BrokerActions.fetchFundsAction());
                                var r = new Promise((function(a, s) {
                                    if (!1 === e && FyTrade.broker._requestPendingCountFunds > 2) return a(), r;
                                    var o = Object.assign({}, FyTrade.storeData.broker.funds);
                                    if ("ok" === o.s) {
                                        if (o.fund_limit.filter((e => "Collaterals" == e.title)) && (o.fund_limit = o.fund_limit.filter((e => "Collaterals" != e.title))), FyTrade.common.getMtfFlag())
                                            for (const e of o.fund_limit) "Unclear Cash" === e.title && (e.title = "MTF Funded Amount"), "Cash Intraday Margin" === e.title && (e.title = "Cash Intraday/ MTF margin");
                                        t._afData = o.fund_limit, t._afData.forEach((function(e) {
                                            broker._afChangeDelegate.fire(e)
                                        })), FyTrade.broker._requestPendingCountFunds--, a()
                                    } else o && (FyTrade.brokerHelper.checkIfInvalidateError(o), FyTrade.broker._requestPendingCountFunds--, s())
                                }));
                                return r
                            } catch (e) {
                                throw `Error while fetching funds ${e}`
                            }
                        }
                        async getData() {
                            const e = this;
                            return new Promise((function(t, r) {
                                var a = FyTrade.storeData.broker.funds;
                                "ok" === a.s ? (e._afData = a.fund_limit, t(e._afData.map((function(e) {
                                    return e
                                })))) : r()
                            }))
                        }
                    }, this.holdings = new class {
                        constructor() {
                            this.kambalaAndUMapping = {
                                symbol_desc: "description",
                                cost_price: "costPrice",
                                symbol_exch: "ex_sym",
                                fy_token: "fyToken",
                                id: "id",
                                isin: "isin",
                                lot_size: "lot_size",
                                market_val: "marketVal",
                                pl: "pl",
                                qty: "quantity",
                                qty_remaining: "remainingQuantity",
                                symbol: "symbol",
                                tick_size: "tick_size",
                                qty_t1: "qty_t1",
                                qty_total: "totalQty",
                                qty_authorized_available: "qty_authorized_available",
                                qty_t1_authorized_available: "qty_t1_authorized_available",
                                qty_pledge_available: "qty_pledge_available",
                                qty_authorized: "qty_authorized",
                                day_pl: "daysPL",
                                ltp_chp: "percChange"
                            }, this._holdingsTotalPNL = {}, this._holdingsDict = {}
                        }
                        updateDataInHoldingsTab(e, t) {
                            let r = t.find((t => t.symbol === e.symbol));
                            if (e.marketVal = r.market_val ? r.market_val : 0, e.investedValue = e.costPrice * e.totalQty ? e.costPrice * e.totalQty : 0, e.symbolLtp || (e.symbolLtp = r.ltp ? r.ltp : 0), !e.holdingUnrealizedPnl) {
                                let t = r.cost_price * r.qty,
                                    a = (r.ltp - r.cost_price) * r.qty,
                                    s = a / t * 100 || 0;
                                e.holdingUnrealizedPnl = a, e.holdingUnrealizedPnlPerc = s, e.percChange = 0
                            }
                        }
                        getkambalaToUiKeys(e) {
                            let t = this.kambalaAndUMapping,
                                r = [];
                            for (let a = 0; a < e.length; a++) {
                                let s = {},
                                    o = e[a];
                                for (let e in t) o.hasOwnProperty(e) && (s[t[e]] = o[e]);
                                s.pl = 0, s.marketVal = 0, r.push(s)
                            }
                            return r
                        }
                        async getData() {
                            const e = this;
                            return new Promise((function(t, r) {
                                var a = FyTrade.storeData.broker.holdingsData;
                                if ("error" === a.s) r();
                                else if ("ok" === a.s) {
                                    let r = e.getkambalaToUiKeys(a.holdings);
                                    FyTrade.store.dispatch(FyTrade.BrokerActions.setHoldings(r)), t(r.map((function(t) {
                                        FyTrade.brokerHelper.addSymbolToArray(t.symbol);
                                        var r = t.symbol + "_" + t.holdingType;
                                        return e._holdingsTotalPNL[r] = t.pl, e._holdingsTotalPNL[r] = {
                                            marketVal: t.marketVal,
                                            buyVal: t.costPrice * t.remainingQuantity
                                        }, e.updateDataInHoldingsTab(t, a.holdings), t
                                    })))
                                }
                                FyTrade.updateQuotes(1)
                            }))
                        }
                        async _updateHoldings(e) {
                            var t = this;
                            FyTrade.broker._requestPendingCountHoldings++, await FyTrade.store.dispatch(FyTrade.BrokerActions.fetchHoldingsAction());
                            let r = new Promise((async function(a, s) {
                                if (!1 === e && FyTrade.broker._requestPendingCountHoldings > 2) return a(), r;
                                var o = FyTrade.storeData.broker.holdingsData;
                                if ("error" === o.s) FyTrade.brokerHelper.checkIfInvalidateError(o), FyTrade.broker._requestPendingCountHoldings--, s();
                                else if ("ok" === o.s) {
                                    let e = t.getkambalaToUiKeys(o.holdings);
                                    FyTrade.store.dispatch(FyTrade.BrokerActions.setHoldings(e)), e.forEach((function(e) {
                                        FyTrade.brokerHelper.addSymbolToArray(e.symbol), broker._holdingsChangeDelegate.fire(e);
                                        var r = e.symbol + "_" + e.holdingType;
                                        t._holdingsTotalPNL[r] = e.pl, t._holdingsTotalPNL[r] = {
                                            marketVal: e.marketVal,
                                            buyVal: e.costPrice * e.remainingQuantity
                                        }
                                    })), FyTrade.broker._requestPendingCountHoldings--, FyTrade.updateQuotes(1), a()
                                }
                            }));
                            return r
                        }
                        holdingsRealtimeUpdate(e) {
                            try {
                                var t = this,
                                    r = FyTrade.storeData.broker.holdings;
                                if (0 === r.length) return;
                                for (var a = 0, s = 0, o = 0; o < r.length; o++) {
                                    var i = r[o];
                                    if (i.symbol in e) {
                                        var n = parseInt(i.totalQty || i.quantity);
                                        i.hasOwnProperty("totalQty") && 0 === i.totalQty && (n = 0);
                                        var l = parseFloat(i.costPrice),
                                            d = parseFloat(e[i.symbol] ? .change) || parseFloat(e[i.symbol] ? .ch),
                                            c = parseFloat(e[i.symbol].chp),
                                            u = (parseFloat(e[i.symbol].ch), parseFloat(e[i.symbol].prev_close_price), e[i.symbol].lp),
                                            h = (u = parseFloat(u)) * n,
                                            m = l * n,
                                            p = (u - l) * n,
                                            y = p / m * 100 || 0,
                                            g = i.symbol + "_" + i.holdingType;
                                        t._holdingsDict[g] = {
                                            marketVal: h,
                                            buyVal: m
                                        }, i.symbolLtp = u, i.marketVal = h, i.percChange = c, i.holdingUnrealizedPnl = p, i.holdingUnrealizedPnlPerc = y, broker._holdingsChangeDelegate.fire(i), s = isNaN(i.totalQty * i.costPrice) ? 0 : i.totalQty * i.costPrice, i.investedValue = s, i.daysPL = isNaN(i.totalQty * d) ? 0 : i.totalQty * d, parseInt(i.quantity), a += h;
                                        var b = i.symbol + "_" + i.holdingType;
                                        t._holdingsTotalPNL[b] = {
                                            marketVal: h,
                                            buyVal: m
                                        }, b = i.symbol + "_" + i.holdingType, t._holdingsTotalPNL[b] = {
                                            marketVal: h,
                                            buyVal: m
                                        };
                                        const r = {
                                            symbol: i.symbol,
                                            holdingUnrealizedPnl: i.holdingUnrealizedPnl,
                                            holdingUnrealizedPnlPerc: i.holdingUnrealizedPnlPerc
                                        };
                                        $("#edisAuthWindow").length && !$("#edisAuthWindow").hasClass("d-none") && FyTrade.edis.getRealTimePNL(r)
                                    }
                                }
                                a = 0;
                                var T = 0,
                                    f = 0;
                                for (var o in t._holdingsTotalPNL) isNaN(t._holdingsTotalPNL[o].marketVal) || (f = (a += t._holdingsTotalPNL[o].marketVal) - (T += t._holdingsTotalPNL[o].buyVal), broker._panelValue.holdings.holdingsPNL = f, broker._amChangeDelegate.fire(broker._panelValue))
                            } catch (e) {
                                return void TradeModules.init.verify_token()
                            }
                        }
                    }, this.order = new class {
                        constructor() {
                            this.kambalaAndUMapping = {
                                client_id: "clientId",
                                id_parent: "parentId",
                                id_exchange: "exchOrdId",
                                qty_remaining: "remainingQuantity",
                                qty_filled: "filledQty",
                                qty_disc: "disclosedQty",
                                qty_disc_remaining: "qtyDiscRem",
                                price_limit: "limitPrice",
                                price_stop: "stopPrice",
                                price_traded: "tradedPrice",
                                ord_type: "type",
                                fy_token: "fyToken",
                                oms_msg: "message",
                                offline_flag: "offlineOrder",
                                time_oms: "orderDateTime",
                                validity: "orderValidity",
                                product_type: "productType",
                                tran_side: "side",
                                ord_status: "status",
                                ord_source: "orderSource"
                            }, this._orders1 = []
                        }
                        getArrayWithNewKeysViaTemplate(e, t) {
                            let r = [];
                            for (let a = 0; a < e.length; a++) {
                                let s = {},
                                    o = e[a];
                                for (let e in o) t.hasOwnProperty(e) ? s[t[e]] = o[e] : s[e] = o[e];
                                if (s ? .id_fyers && (s.orderSource = FyTrade.common.getSmartOrderSource(s ? .id_fyers)), s.status && (s.status = g.kambalaAndUiStatusMapping[s.status]), s.oms_Id = s.id, s.id = s.id_fyers, this.setIdandStatusMapping(s.oms_Id, s.status), this.setIdandStatusMapping(s.id_fyers, s.status), s.message || (s.message = ""), s.orderDateTime) {
                                    let e = new Date(s.orderDateTime).getTime() / 1e3;
                                    s.timeEpoch = e
                                } else s.timeEpoch = 0;
                                this.addFyersAndOmsId(s), 4 == s.type && delete s.parentId, s.parentId && 1 == s.type && (s.parentType = 2), s.fy_status_msg && (s.message = s.fy_status_msg), r.push(s)
                            }
                            return r
                        }
                        addFyersAndOmsId(e) {
                            e.id_fyers && e.oms_Id && this.setfyersIdAndNorenId(e.id_fyers, e.oms_Id)
                        }
                        setfyersIdAndNorenId(e, t) {
                            FyTrade.brokerHelper.fyersIdAndNorenIdMapping[e] = t
                        }
                        setIdandStatusMapping(e, t) {
                            g.orderIdAndStatusMapping[e] = t || 0
                        }
                        getStatusById(e) {
                            return g.orderIdAndStatusMapping[e] || null
                        }
                        getkambalaToUiKeys(e) {
                            return this.getArrayWithNewKeysViaTemplate(e, this.kambalaAndUMapping)
                        }
                        formatOrder(e) {
                            switch (e.productType) {
                                case "CO":
                                    this.formateCO(e);
                                    break;
                                case "BO":
                                    this.formateBO(e);
                                    break;
                                case 3:
                                    this.onPositionMsg(e)
                            }
                        }
                        formateCO(e) {
                            e.hasOwnProperty("stopLoss") && (e.stopLoss = Math.abs(e.stopLoss)), e.hasOwnProperty("limitPrice") && e.hasOwnProperty("stopLoss") && (e.limitPrice ? e.stopLoss = Math.abs(e.limitPrice - e.stopLoss) : e.stopLoss = Math.abs(e.LTP - e.stopLoss))
                        }
                        formateBO(e) {
                            e.hasOwnProperty("stopLoss") && (e.stopLoss = Math.abs(e.stopLoss)), e.hasOwnProperty("takeProfit") && (e.takeProfit = Math.abs(e.takeProfit))
                        }
                        formatModify(e) {
                            return this.assignNoranIdByFyersId(e)
                        }
                        formatDelete(e) {
                            return this.assignNoranIdByFyersId(e)
                        }
                        assignNoranIdByFyersId(e) {
                            let t = FyTrade.brokerHelper.getOmsIdByFyersId(e.id);
                            return e.id = t || null, e
                        }
                        fy_updateOrder(e, r, a, s) {
                            var o = FyTrade.broker._orderById[e.id];
                            if (e.message = {
                                    type: r,
                                    text: e.message
                                }, !o) return (o = {}).quotes = !1, o.data = e, FyTrade.broker._orderById[e.id] = o, broker._orders.push(o.data), broker._host.orderUpdate(e), void(a || FyTrade.brokerHelper.fy_updateOrderShowToaster(e, 5 == o.data.status ? 4 : 1));
                            if (!s) {
                                if (e.parentId && 2 === e.type && (e.type = o.data.type), 6 === e.status) {
                                    "Replaced" === e.report_type && TradeModules.common.logAnalyticEvents("BtClk_ord_ordCncl_ordwndw_modifyord_s"), "Replaced Reject" === e.report_type && e.message1 && (TradeModules.common.logAnalyticEvents("BtClk_ord_ordCncl_ordwndw_modifyord_f"), setTimeout((() => {
                                        FyTrade.common.fy_showToaster(t.toaster.type.error, t.toaster.modifyOrder.title.error, e.message1)
                                    }), 2e3)), o.data = e;
                                    let r = broker._orders.filter((t => t.id !== e.id));
                                    return r.push(e), broker._orders = r, broker._host.orderUpdate(e), void(o.data.qty == e.qty && o.data.limitPrice == e.limitPrice && o.data.stopPrice == e.stopPrice || !a && FyTrade.brokerHelper.fy_updateOrderShowToaster(e, 5))
                                }
                                if (4 !== e.status) {
                                    if (o.data.status != e.status) return 1 === e.status ? (o.data.type !== e.type && (e.type = o.data.type), o.data.status = e.status, o.data.orderDateTime = e.orderDateTime, !a && FyTrade.brokerHelper.fy_updateOrderShowToaster(e, 2)) : 2 === e.status ? (o.data.type !== e.type && (e.type = o.data.type), o.data.status = e.status, o.data.orderDateTime = e.orderDateTime, !a && FyTrade.brokerHelper.fy_updateOrderShowToaster(o.data, 3)) : 5 === e.status ? (o.data.type !== e.type && (e.type = o.data.type), o.data.status = e.status, o.data.orderDateTime = e.orderDateTime, !a && FyTrade.brokerHelper.fy_updateOrderShowToaster(o.data, 4)) : o.data = e, void broker._host.orderUpdate(e);
                                    o.data = e, broker._host.orderPartialUpdate(e)
                                }
                            }
                        }
                        ordersRefresh(e, t) {
                            var r = this,
                                a = new Promise((function(s, o) {
                                    if (!1 === e && FyTrade.broker._requestPendingCountOrders > 2) return s(), a;
                                    FyTrade.broker._requestPendingCountOrders++, FyTrade.service.getAPIService(globalConstants.dynamicUrl.trading.orders_get).then((function(e) {
                                        FyTrade.broker._requestPendingCountOrders--;
                                        var a = e;
                                        "error" === a.s ? (FyTrade.brokerHelper.checkIfInvalidateError(a), o()) : "ok" === a.s && (r._orders1 = r.getkambalaToUiKeys(a.orderBook), r.fireOrders(t), FyTrade.store.dispatch(v.setOrderBook(broker._orders)), s())
                                    })).catch((function(e) {
                                        TradeModules.common.hawkeye("ERROR", "Failed to get order details from orders API!", e), o()
                                    }))
                                }));
                            return a
                        }
                        fireOrders(e) {
                            let t = 600;
                            var r = this;
                            try {
                                r._orders1.map((function(a) {
                                    let s = broker.sleep(t);
                                    t += 50, s.then((() => {
                                        FyTrade.brokerHelper.addSymbolToArray(a.symbol), a.message = a.message, a.message1 = a.message, r.fy_updateOrder(a, "Information", e)
                                    }))
                                })), broker.orders()
                            } catch (e) {
                                TradeModules.common.hawkeye("ERROR", "Failed in firing the order placement notifications!", e)
                            }
                        }
                        ordersRealtimeUpdate(e) {
                            try {
                                if (0 === this._orders1.length) return;
                                window.broker._orders.map((function(t) {
                                    try {
                                        if (6 === t.status) {
                                            if (!0 === t.offlineOrder) return;
                                            if ($("#fy_overlay-popup .realTimeOrderUpdateRequired") && $("#fy_overlay-popup .realTimeOrderUpdateRequired").length && e[t.symbol].lp) {
                                                const r = {
                                                    id: t ? .id,
                                                    ltp: e[t.symbol] ? .lp,
                                                    ch: e[t.symbol] ? .ch
                                                };
                                                FyersWidget.popup_msg.getRealTimeOrderData(r)
                                            }
                                            var r = t.type,
                                                a = t.side,
                                                s = t.symbol,
                                                o = e[s].lp,
                                                i = e[s].bid,
                                                n = e[s].ask;
                                            if (n <= 0 && (n = o), i <= 0 && (i = o), 2 === r);
                                            else if (1 === r) {
                                                var l = t.limitPrice;
                                                if (1 === a) {
                                                    if (n < l) return
                                                } else if (-1 === a && i > l) return
                                            } else if (3 === r) {
                                                var d = t.stopPrice;
                                                if (1 === a) {
                                                    if (n > d) return
                                                } else if (-1 === a && i < d) return
                                            } else if (4 === r)
                                                if (l = t.limitPrice, d = t.stopPrice, 1 === a) {
                                                    if (n > d) return
                                                } else if (-1 === a && i < d) return
                                        }
                                    } catch (e) {
                                        return
                                    }
                                }))
                            } catch (e) {
                                return
                            }
                        }
                    }, this.positions = new class {
                        constructor() {
                            this.kambalaAndUMapping = {
                                buy_avg: "buyAvg",
                                buy_qty: "buyQty",
                                buy_val: "buyVal",
                                sell_avg: "sellAvg",
                                sell_qty: "sellQty",
                                sell_val: "sellVal",
                                net_avg: "netAvg",
                                net_qty: "netQty",
                                tran_side: "side",
                                product_type: "productType",
                                pl_realized: "realized_profit",
                                cross_curr_flag: "crossCurrency",
                                rbi_ref_rate: "rbiRefRate",
                                qty_multi: "qtyMulti_com",
                                sym_desc: "description",
                                pl_unrealized: "unrealized_profit",
                                pl_total: "pl",
                                fy_token: "fyToken",
                                percentChange: "chg"
                            }, this._positions1 = [], this._positionsTotalPNL = {}, this._allPositionsData = [], this._positionDict = {}, this._positionIds = {}
                        }
                        onPositionMsg(e) {
                            this.calculateUnrealizedTotal(e);
                            let t = this.getkambalaToUiKeys([e]);
                            this.updatePositionArray(t, !0)
                        }
                        getArrayWithNewKeysViaTemplate(e, t) {
                            let r = [];
                            for (let a = 0; a < e.length; a++) {
                                let s = {},
                                    o = e[a];
                                for (let e in o) t.hasOwnProperty(e) ? s[t[e]] = o[e] : s[e] = o[e];
                                s.avgPrice = this.appendData(s), r.push(s)
                            }
                            return r
                        }
                        appendData(e) {
                            return 1 === e.side ? e.buyAvg : -1 === e.side ? e.sellAvg : e.avgPrice
                        }
                        calculateUnrealizedTotal(e, t) {
                            try {
                                let u, h;
                                u = t || FyTrade.data.symbolPriceDict ? .[e.symbol].v.cmd.c;
                                var r = e.cf_buy_qty + e.day_buy_qty,
                                    a = e.cf_sell_qty + e.day_sell_qty,
                                    s = 0,
                                    o = 0;
                                0 != r && (s = (e.cf_buy_avg * e.cf_buy_qty + e.day_buy_avg * e.day_buy_qty) / r), 0 != a && (o = (e.cf_sell_avg * e.cf_sell_qty + e.day_sell_avg * e.day_sell_qty) / a);
                                var i = r - a,
                                    n = 0,
                                    l = e.qty_multiplier * e.price_multiplier * e.rbirefrate;
                                i > 0 ? (n = (u - s) * i * l, h = s) : (n = (u - o) * i * l, h = o);
                                var d = n + (null != (e.pl_realized || e.realized_profit) ? e.pl_realized || e.realized_profit : 0),
                                    c = 0 != h ? d / (h * Math.abs(r + a) * l) * 100 : 0;
                                e.percentChange = c || 0, e.ltp = u || 0, e.pl_unrealized = n || 0, e.pl_total = d || 0
                            } catch (t) {
                                e.pl_unrealized = 0, e.pl_realized = 0, e.pl_total = 0, console.warn("Error while calculating calculateUnrealizedTotal : ", t)
                            }
                        }
                        getkambalaToUiKeys(e) {
                            return this.getArrayWithNewKeysViaTemplate(e, this.kambalaAndUMapping)
                        }
                        getData() {
                            const e = this;
                            return new Promise((function(t, r) {
                                let a = FyTrade.storeData.broker.positions;
                                "error" === a.s ? r() : "ok" === a.s && (e._allPositionsData = e.getkambalaToUiKeys(a.netPositions), t(e._allPositionsData.map((function(t) {
                                    return e._positionsTotalPNL[t.id] = t.pl, t
                                }))))
                            }))
                        }
                        positionsRealtimeUpdate(e) {
                            try {
                                var t = this;
                                if (0 === t._positions1.length) return;
                                t._positions1.map((function(r) {
                                    try {
                                        if (r.symbol in e) {
                                            var a = r.id,
                                                s = r.realized_profit,
                                                o = e[r.symbol].lp,
                                                i = r.netAvg;
                                            s = parseFloat(s), o = parseFloat(o), i = parseFloat(i), t.calculateUnrealizedTotal(r, o);
                                            var n = r.pl_total;
                                            r.realized_profit = s, r.unrealized_profit = r.pl_unrealized, r.ltp = o, r.pl = n, r.chg = r.percentChange, t._positionDict[r.id] = n, broker._host.positionPartialUpdate(r), broker._host.plUpdate(a, n), broker._allpositionChangeDelegate.fire(r), t._positionsTotalPNL[r.id] = r.pl;
                                            const l = {
                                                pos_id: r.id,
                                                symbol: r.symbol,
                                                ltp: r.ltp,
                                                ltp_ch: r.ltp_ch,
                                                avgPrice: r.avgPrice,
                                                chg: r.chg,
                                                pl: r.pl
                                            };
                                            $("#fy_overlay-popup .realTimePositionUpdateRequired") && $("#fy_overlay-popup .realTimePositionUpdateRequired").length && FyersWidget.popup_msg.getRealTimePNL(l), $(".ew-open .ew-exit-tbody") && $(".ew-open .ew-exit-tbody").length && TradeModules.exitPositionWindow.controller.realTimeExitPositionsUpdate(l)
                                        }
                                    } catch (e) {
                                        TradeModules.common.hawkeye("ERROR", `Position real time update is failed! due to ${error} and symbol is ${r.symbol}`, e)
                                    }
                                }));
                                var r = 0;
                                for (var a in t._positionsTotalPNL) r += t._positionsTotalPNL[a];
                                broker._panelValue.positions.positionsPNL = r, broker._amChangeDelegate.fire(broker._panelValue)
                            } catch (e) {
                                return void TradeModules.common.hawkeye("ERROR", "Position real time update is failed!")
                            }
                        }
                        updatePositionArrayFromWS(e, t) {
                            let r = t[0].id;
                            for (let a = 0; a < e.length; a++)
                                if (e[a].id === r) return void(e[a] = t[0]);
                            e.push(t[0])
                        }
                        updatePositionArray(e, t = !1) {
                            var r = this;
                            t && (r.updatePositionArrayFromWS(r._positions1, e), i.prototype.updateFundsWithTimer()), e.map((function(e) {
                                FyTrade.brokerHelper.addSymbolToArray(e.symbol), r.fy_updatePosition(e), broker._allpositionChangeDelegate.fire(e), r._positionIds[e.id] = !0, r._positionsTotalPNL[e.id] = e.pl
                            })), broker.positions(), r.checkIfPosExist()
                        }
                        checkIfPosExist() {
                            for (var e in FyTrade.broker._positionsBySymbolAndProduct)
                                if (-1 === Object.keys(this._positionIds).indexOf(e)) {
                                    var t = FyTrade.broker._positionsBySymbolAndProduct[e].data;
                                    t.qty = 0, t.netQty = "0", t.net_price = "0", t.avgPrice = 0, t.netAvg = 0, t.side = "", t.realized_profit = "", t.unrealized_profit = "", t.pl = "", t.ltp = "", t.chg = "", t.buyQty = "", t.buyAvg = "", t.sellQty = "", t.sellAvg = "", this.fy_updatePosition(t), broker._allpositionChangeDelegate.fire(t)
                                }
                        }
                        fy_updatePosition(e) {
                            var t = FyTrade.broker._positionsBySymbolAndProduct[e.id];
                            if (!t) {
                                if (0 === e.qty) return;
                                (t = {}).quotes = !1, t.data = e, FyTrade.broker._positionsBySymbolAndProduct[e.id] = t, broker._positions.push(t)
                            }
                            if (t.data = e, broker._host.positionUpdate(e), FyTrade.updateQuotes(), TradeModules.exitPositionWindow.controller.isPositionsRefreshRequired = !0, 0 === e.qty) {
                                var r = broker._positions.indexOf(t); - 1 !== r && broker._positions.splice(r, 1), delete FyTrade.broker._positionsBySymbolAndProduct[e.id]
                            }
                        }
                        positionsRefresh(e) {
                            var t = this,
                                r = new Promise((async function(a, s) {
                                    if (!1 === e && FyTrade.broker._requestPendingCountPositions > 2) return a(), r;
                                    FyTrade.broker._requestPendingCountPositions++, await FyTrade.store.dispatch(FyTrade.BrokerActions.fetchPositionsAction());
                                    let o = FyTrade.storeData.broker.positions;
                                    if (o) {
                                        var i = o;
                                        FyTrade.broker._requestPendingCountPositions--, "error" === i.s ? (FyTrade.brokerHelper.checkIfInvalidateError(i), s()) : "ok" === i.s && (t._positionsTotalPNL = [], t._positions1 = t.getkambalaToUiKeys(i.netPositions), t._positionIds = {}, t.updatePositionArray(t._positions1), a())
                                    } else s(), TradeModules.common.hawkeye("ERROR", "Position refresh 2 details function failed!")
                                }));
                            return r
                        }
                    }, this.tradebook = new class {
                        constructor() {
                            this.kambalaAndUMapping = {
                                client_id: "clientId",
                                id_fill: "tradeNumber",
                                id_exchange: "exchangeOrderNo",
                                fy_token: "fyToken",
                                time_oms: "orderDateTime",
                                qty_traded: "tradedQty",
                                price_traded: "tradePrice",
                                traded_val: "tradeValue",
                                tran_side: "transactionType",
                                ord_type: "orderType",
                                product_type: "productType",
                                exchange: "exchange",
                                segment: "segment",
                                symbol: "symbol",
                                id: "id",
                                id_fyers: "id_fyers",
                                id_fill: "id_fill"
                            }, this._tradebookData = [], this._executionsById = {}
                        }
                        getArrayWithNewKeysViaTemplate(e, t) {
                            let r = [];
                            for (let a = 0; a < e.length; a++) {
                                let s = {},
                                    o = e[a];
                                for (let e in t) o.hasOwnProperty(e) && (s[t[e]] = o[e]);
                                this.convertValues(s), s.id2 = s.id, s.tradeNumber = s.id = s.id_fill, r.push(s)
                            }
                            return r
                        }
                        convertValues(e) {
                            e.hasOwnProperty("transactionType") && (e.transactionType = g.buySellMapping[e.transactionType.toString()]), e.hasOwnProperty("exchange") && (e.exchange = g.exchangeMapping[e.exchange]), e.hasOwnProperty("segment") && (e.segment = g.segmentMapping[e.segment]), e.hasOwnProperty("orderType") && (e.orderType = g.orderTypes[e.orderType])
                        }
                        getkambalaToUiKeys(e) {
                            return this.getArrayWithNewKeysViaTemplate(e, this.kambalaAndUMapping)
                        }
                        getData() {
                            const e = this;
                            return new Promise((function(t, r) {
                                var a = FyTrade.storeData.broker.trade_list;
                                a ? "error" === a.s ? r() : "ok" === a.s && (e._tradebookData = e.getkambalaToUiKeys(a.tradeBook), t(e._tradebookData.map((function(e) {
                                    return delete e.row, e
                                }))), a.tradeBook = e._tradebookData, e.onTradeBookSuccess(a, !1)) : r()
                            }))
                        }
                        onTradeBookSuccess(e, t = !0) {
                            var r = this;
                            "ok" === e.s && (r._tradebookData = e.tradeBook, r._tradebookData.map((function(e) {
                                delete e.row;
                                var a, s, o = "";
                                if (o = (o = (o = e.orderDateTime.split(" ")[0]).split("-").reverse().join("/")) + " " + e.orderDateTime.split(" ")[1], a = new Date(o), s = "buy" == e.transactionType.toLowerCase() ? 1 : -1, !r._executionsById[e.tradeNumber]) {
                                    var i = {
                                        id: e.tradeNumber,
                                        symbol: e.symbol,
                                        brokerSymbol: e.symbol,
                                        price: e.tradePrice,
                                        time: a,
                                        side: s,
                                        qty: e.tradedQty
                                    };
                                    r._executionsById[i.id] = i, broker._executions.push(i), broker._host.executionUpdate(i), t && broker._tradebookChangeDelegate.fire(e)
                                }
                            })))
                        }
                    }, this.gtt = new class {
                        constructor() {
                            this.kambalaAndUMapping = {
                                client_id: "clientId",
                                fy_token: "fyToken",
                                ord_status: "status",
                                price_limit: "limitPrice",
                                price_trigger: "triggerPrice",
                                product_type: "productType",
                                oms_msg: "message",
                                tran_side: "side",
                                time_oms: "orderDateTime",
                                price2_limit: "limitPrice2",
                                price2_trigger: "triggerPrice2"
                            }, this._gttOrders = [], this._selectedModifyGttOrder = null, this._selectedCancelGttOrder = null
                        }
                        getArrayWithNewKeysViaTemplate(e, t) {
                            let r = [];
                            for (let a = 0; a < e.length; a++) {
                                let s = {},
                                    o = e[a];
                                for (let e in o) t.hasOwnProperty(e) ? s[t[e]] = o[e] : s[e] = o[e];
                                if (s.status && (s.status = g.kambalaAndUiStatusMapping[s.status]), s.orderDateTime) {
                                    let e = new Date(s.orderDateTime).getTime() / 1e3;
                                    s.timeEpoch = e
                                } else s.timeEpoch = 0;
                                r.push(s)
                            }
                            return r
                        }
                        addFyersAndOmsId(e) {
                            e.id_fyers && e.oms_Id && this.setfyersIdAndNorenId(e.id_fyers, e.oms_Id)
                        }
                        setfyersIdAndNorenId(e, t) {
                            FyTrade.brokerHelper.fyersIdAndNorenIdMapping[e] = t
                        }
                        setIdandStatusMapping(e, t) {
                            g.orderIdAndStatusMapping[e] = t || 0
                        }
                        getkambalaToUiKeys(e) {
                            return this.getArrayWithNewKeysViaTemplate(e, this.kambalaAndUMapping)
                        }
                        getLimitPrice(e) {
                            return e.map((e => {
                                const t = 2 === e.gtt_oco_ind && 1 === e.side;
                                return { ...e,
                                    leg1LimitPrice: t ? e.limitPrice : e.limitPrice2,
                                    leg2LimitPrice: t ? e.limitPrice2 : e.limitPrice,
                                    leg1TriggerPrice: t ? e.triggerPrice : e.triggerPrice2,
                                    leg2TriggerPrice: t ? e.triggerPrice2 : e.triggerPrice,
                                    leg1Qty: t ? e.qty : e.qty2,
                                    leg2Qty: t ? e.qty2 : e.qty
                                }
                            }))
                        }
                        getQty(e, t, r) {
                            return 2 == e.gtt_oco_ind && 1 == e.side ? e[r] ? ? 0 : e[t] ? ? 0
                        }
                        subscribeGttSymbolsData(e) {
                            FyTrade.brokerHelper.addSymbolToArray(e)
                        }
                        gttOrdersRefresh(e, t) {
                            const r = this;
                            return new Promise(((e, t) => {
                                FyTrade.service.getAPIService(globalConstants.dynamicUrl.trading.gtt).then((function(a) {
                                    if ("error" === a.s) FyTrade.brokerHelper.checkIfInvalidateError(k1), t();
                                    else if ("ok" === a.s) {
                                        const t = r.getkambalaToUiKeys(a.orderBook),
                                            s = r.formatAccountManagerData(r.formatGttStatus(r.formatGttLegs(t)));
                                        r._gttOrders = t, e(s)
                                    }
                                })).catch((function(e) {
                                    console.warn("Error in getting GTT data:", e), t()
                                }))
                            }))
                        }
                        formatAccountManagerData(e) {
                            return e.map((e => {
                                const t = TradeModules.gtt.helper.isSingleOrder(e);
                                return {
                                    tableQty: t ? e.qty : "",
                                    tableTriggerPrice: t ? e.triggerPrice : "",
                                    tableLimitPrice: t ? e.limitPrice : "",
                                    tableSlQty: t ? "" : e.leg1Qty,
                                    tableSlTriggerPrice: t ? "" : e.leg1TriggerPrice,
                                    tableSlLimitPrice: t ? "" : e.leg1LimitPrice,
                                    tableTargetQty: t ? "" : e.leg2Qty,
                                    tableTargetTriggerPrice: t ? "" : e.leg2TriggerPrice,
                                    tableTargetLimitPrice: t ? "" : e.leg2LimitPrice,
                                    ...e
                                }
                            }))
                        }
                        formatGttStatus(e) {
                            return e.filter((e => 6 === e.status || 1 === e.status))
                        }
                        formatGttLegs(e) {
                            return this.getLimitPrice(e)
                        }
                        fy_updateGttOrder(e) {
                            const t = this.formatGttLegs(e);
                            this.formatAccountManagerData(t).forEach((e => {
                                const t = this._gttOrders.findIndex((t => t.id === e.id)); - 1 !== t ? this._gttOrders[t] = e : this._gttOrders.push(e), broker._gttOrderChangeDelegate.fire(e)
                            }))
                        }
                        gttOrdersRealtimeUpdate(e) {
                            for (const t of this._gttOrders)
                                if (6 === t.status && $("#fy_overlay-popup .realTimeOrderUpdateRequired") && $("#fy_overlay-popup .realTimeOrderUpdateRequired").length && e[t.symbol] && e[t.symbol].lp) {
                                    const r = {
                                        id: t ? .id,
                                        ltp: e[t.symbol] ? .lp,
                                        ch: e[t.symbol] ? .ch
                                    };
                                    FyersWidget.popup_msg.getRealTimeOrderData(r)
                                }
                        }
                    }, this._orderById = {}, this._positionsBySymbolAndProduct = {}, this._requestPendingCountFunds = 0, this._requestPendingCountOrders = 0, this._requestPendingCountPositions = 0, this._requestPendingCountHoldings = 0, this._requestPendingCountTrades = 0, this._lastUpdateTradingDetails = 0
                }
                positionsRefresh(e = !1) {
                    return this.positions.positionsRefresh(e)
                }
                onPositionMsg(e) {
                    this.positions.onPositionMsg(e)
                }
                ordersRefresh(e = !1, t) {
                    return this.order.ordersRefresh(e, t)
                }
                gttOrdersRefresh() {
                    return this.gtt.gttOrdersRefresh()
                }
                _updateHoldings(e = !1) {
                    return this.holdings._updateHoldings(e)
                }
                _updateAvailableFunds(e = !1) {
                    return this.funds._updateAvailableFunds(e)
                }
                fy_updateOrder(e, r = t.message_types.information, a, s = !1) {
                    return this.order.fy_updateOrder(e, r, a, s)
                }
                fireOrders(e) {
                    this.order.fireOrders(e)
                }
                fy_updateGttOrder(e) {
                    return this.gtt.fy_updateGttOrder(e)
                }
            }, this.teli = new h, this.data = new W, this.helpers = new d, this.socket = new y, this.symbolClass = new class {
                constructor() {
                    this.prevResolution = "", this.prevTicker = "", this._globalFyersDict = {}
                }
                symbolDataFromURL(e = !1) {
                    if (globalConstants.config.enabled_features.indexedDb_enabled) d.prototype.symbolMasterDBImplementation(e);
                    else try {
                        fetch(r.SYMBOL_MASTER_URL).then((e => e.arrayBuffer())).then((e => {
                            const t = new Uint8Array(e),
                                r = pako.inflate(t);
                            let a = (new TextDecoder).decode(r);
                            try {
                                a = JSON.parse(a);
                                const {
                                    data: e,
                                    others: t
                                } = datafeed.unzippedData;
                                Object.keys(a).forEach((r => {
                                    "otherDetails" === r ? Object.assign(t, a[r]) : "data_format" === r ? datafeed.unzippedData[r] = Array.from(a[r]) : Object.assign(e, a[r])
                                })), datafeed.unzippedData.others.supportedResolutions = globalConstants.tradingViewConfig.supported_resolutions, datafeed.unzippedData.others.hasSeconds = !0
                            } catch (e) {
                                TradeModules.common.hawkeye("ERROR", "Error in parsing the JSON:", e), console.error("Error in parsing the JSON:", e)
                            }
                            return datafeed.unzippedData
                        })).catch((e => {
                            throw TradeModules.common.hawkeye("ERROR", "unable to fetch data from symbol API", e), datafeed.unzippedData = {}, "Error while fetching symbol master information: " + e
                        }))
                    } catch (e) {
                        throw "Reading symbol data from url failed: " + e
                    }
                }
                searchSymbols(e, t, r, a) {
                    if (!datafeed._configuration.supports_search) {
                        if (null === datafeed._symbolsStorage) throw new Error("UdfCompatibleDatafeed: inconsistent configuration (symbols storage)");
                        return void FyTrade.symbolStorage.searchSymbols(e, t, r, 30).then(a).catch(a.bind(null, []))
                    }
                    var s = e ? e.toString() ? .trim().toUpperCase() : "";
                    if (!FyTrade.common.isValidSearchSymbol(s)) return FyTrade.common._showNoticeToUser("Invalid Input", "Please enter a valid symbol", FyTrade.DEFINES.OVERLAY_TYPES.error), void a([]);
                    const o = {
                        limit: 30,
                        query: s,
                        type: r,
                        exchange: t,
                        dataReq: FyTrade.common.getTimeStamp()
                    };
                    FyTrade.dataService.symbolService(o).then((function(e) {
                        if (void 0 === e.s || "error" === e.s) return c("UdfCompatibleDatafeed: search symbols error=" + e.errmsg), void a([]);
                        a(e.data)
                    })).catch((function(t) {
                        c("UdfCompatibleDatafeed: Search symbols for '" + e + "' failed. Error=" + u(t)), a([])
                    }))
                }
                async searchSymbolAPI(e, t, r) {
                    let a = this;
                    var s = {
                        symbol: e.toUpperCase()
                    };
                    try {
                        let o = await FyTrade.dataService.symbolService2(s);
                        if (200 == o ? .code && o ? .data) {
                            a._globalFyersDict[o.data.bt] = o.data.symbol;
                            const e = Array.from({
                                length: 240
                            }, ((e, t) => String(t + 1)));
                            return o.data.supported_resolutions = ["5S", "10S", "15S", "30S", "45S", ...e, "D", "W", "M", "3M", "6M", "12M"], o.data.has_seconds = !0, o.data.ticker = o.data.symbol, o.data.name = o.data.symbol.split(":")[1], o.data.corrections = FyTrade.helper.getCorrectionKeyForSegment(parseInt(o ? .data ? .bt.substring(2, 4))), o.data.session_holidays = FyTrade.helper.getSessionHolidayForSegment(parseInt(o ? .data ? .bt.substring(2, 4))), o.data.expiration_date && (o.data.expiration_date = parseFloat(o.data.expiration_date)), d.prototype.checkIfExchangeIsMcx(o.data["exchange-listed"]) && globalConstants ? .config ? .chart_session_timing ? .mcx_session_time && (o.data.session = globalConstants ? .config ? .chart_session_timing ? .mcx_session_time), o.data.session = o.data.session.split("|")[0], FyTrade.symbolData[o.data.symbol] = o.data, void t(o.data)
                        }
                        return "error" == o.s && "Please provide a valid symbol" == o.message ? (t(FyTrade.data.datahelper.getExpiredSymbolDummyData(e)), void TradeModules.common.hawkeye("ERROR", "Symbol is expired, unable to fetch symbol details!")) : (TradeModules.common.hawkeye("ERROR", `Error in fetching symbol details for ${e} from API`), void r("unknown_symbol"))
                    } catch (e) {
                        return c("UdfCompatibleDatafeed: Error resolving symbol: " + u(e)), void r("unknown_symbol")
                    }
                }
                frameSymbolDict(e, t, r) {
                    let a = {},
                        s = FyTrade.helper.getSymbolMasterValue(t, "exchange_name"),
                        o = FyTrade.helper.getSymbolMasterValue(t, "symbol_det_original");
                    FyTrade.helper.getSymbolMasterValue(t, "short_sym_name");
                    const i = Array.from({
                        length: 240
                    }, ((e, t) => String(t + 1)));
                    a.base_name = e, a.full_name = e, a.exchange = s, a.listed_exchange = s, a.minmove2 = r.minMov2, a.ticker = e, a.name = e.split(":")[1], a.description = o, a.currency_code = r.currencyCode, a["exchange-listed"] = s, a["exchange-traded"] = s, a.pointvalue = r.pointValue, a.pricescale = FyTrade.helper.getSymbolMasterValue(t, "price_scale"), a.has_intraday = r.hasIntraday, a.supported_resolutions = ["5S", "10S", "15S", "30S", "45S", ...i, "D", "W", "M", "3M", "6M", "12M"], a.minmov = FyTrade.helper.getSymbolMasterValue(t, "lot_multiplier"), a.minmov2 = r.minMov2, a.timezone = r.timeZone, a.type = r.type, a.session = FyTrade.helper.getSymbolMasterValue(t, "trading_session") ? .split("|")[0], d.prototype.checkIfExchangeIsMcx(s) && globalConstants ? .config ? .chart_session_timing ? .mcx_session_time && (a.session = globalConstants ? .config ? .chart_session_timing ? .mcx_session_time ? .split("|")[0]), a.has_daily = r.hasDaily;
                    const n = r.supportedResolutions.filter((e => "75" !== e));
                    return a.intraday_multipliers = n, a.has_weekly_and_monthly = r.hasWeeklyAndMonthly, a.has_empty_bars = r.hasEmptyBars, a.bt = FyTrade.helper.getSymbolMasterValue(t, "fy_token"), a.data_status = r.dataStatus, a.expired = FyTrade.helper.getSymbolMasterValue(t, "expiry_stat"), a.has_seconds = r.hasSeconds, a.symbol = e, a.visible_plots_set = FyTrade.helper.getSymbolMasterValue(t, "visible_plots_set"), a.corrections = FyTrade.helper.getCorrectionKeyForSegment(FyTrade.helper.getSymbolMasterValue(t, "segment_code")), a.session_holidays = FyTrade.helper.getSessionHolidayForSegment(FyTrade.helper.getSymbolMasterValue(t, "segment_code")), a
                }
                sanitiseSymbolSpace(e) {
                    return e.indexOf(" ") >= 0 && (e = e.replaceAll(" ", "")), e
                }
                async resolveSymbol(e, t, r) {
                    c("Resolve requested"), "" === e && (console.log("Now loading NIFTY as user had no saved symbol"), e = "NSE:NIFTY50-INDEX");
                    var a = Date.now();

                    function s(e) {
                        "has_no_volume" in e && delete e.has_no_volume, c("Symbol resolved: " + (Date.now() - a) + "ms"), t(e)
                    }
                    if (d.prototype.checkIfOISymbol(e)) {
                        const t = FyTrade.data.datahelper.getOiIndicatorSymbolData(e);
                        setTimeout((function() {
                            s(t)
                        }), 0)
                    } else if (datafeed._configuration.supports_group_request) {
                        if (null === datafeed._symbolsStorage) throw new Error("UdfCompatibleDatafeed: inconsistent configuration (symbols storage)");
                        FyTrade.symbolStorage.resolveSymbol(e).then(s).catch(r)
                    } else {
                        e = this.sanitiseSymbolSpace(e);
                        var o = window.datafeed.unzippedData.data[e],
                            i = window.datafeed.unzippedData.others;
                        if (void 0 !== o && void 0 !== i) {
                            var n = this.frameSymbolDict(e, o, i);
                            this._globalFyersDict[n.bt] = n.symbol, setTimeout((function() {
                                s(n)
                            }), 0)
                        } else await this.searchSymbolAPI(e, s, r)
                    }
                }
                getMarks(e, t, r, a, s) {
                    if (datafeed._configuration.supports_marks) {
                        var o = FyTrade.common.getTimeStamp(),
                            i = {
                                symbol: e.ticker ? e.ticker.toUpperCase() : "",
                                from: t,
                                to: r,
                                resolution: "",
                                dataReq: o
                            };
                        this.prevResolution === s && this.prevTicker === e.ticker || FyTrade.dataService.getMarksService(i).then((function(e) {
                            const t = e.data || [];
                            for (var r = [], s = [], o = [], i = [], n = [], l = [], d = [], c = [], u = [], h = [], m = [], p = 0, y = 0; y < t.length; y++)
                                if (!(parseInt(Date.now() / 1e3) < t[y][2])) {
                                    r.push(t[y][5]), s.push(t[y][3]), o.push(t[y][2]), n.push("white"), l.push(22), c.push(t[y][4]);
                                    var g = new Date(t[y][1]),
                                        b = `${g.getFullYear()}`.slice(2, 4),
                                        T = `${g.getDate()} ${moment(g).format("MMM")}  '${b}`;
                                    switch (u.push(T), t[y][3]) {
                                        case "D":
                                            i.push("red"), h.push("Dividend of Rs "), m.push(" paid");
                                            break;
                                        case "DM":
                                        case "M":
                                            i.push("yellow"), h.push(""), m.push("");
                                            break;
                                        case "B":
                                            i.push("green"), h.push("Bonus adjusted @ "), m.push("");
                                            break;
                                        case "R":
                                            i.push("blue"), h.push("Rights adjusted @ "), m.push("");
                                            break;
                                        default:
                                            i.push("yellow"), h.push("Split adjusted @ "), m.push("")
                                    }
                                    d.push(h[p] + c[p] + m[p] + " on " + u[p]), p += 1
                                }
                            if (e = {
                                    id: r,
                                    label: s,
                                    time: o,
                                    color: i,
                                    labelFontColor: n,
                                    minSize: l,
                                    text: d
                                }, !Array.isArray(e)) {
                                var f = [];
                                for (y = 0; y < e.id.length; ++y) f.push({
                                    id: FyTrade.common.extractField(e, "id", y),
                                    time: FyTrade.common.extractField(e, "time", y),
                                    color: FyTrade.common.extractField(e, "color", y),
                                    text: FyTrade.common.extractField(e, "text", y),
                                    label: FyTrade.common.extractField(e, "label", y),
                                    labelFontColor: FyTrade.common.extractField(e, "labelFontColor", y),
                                    minSize: FyTrade.common.extractField(e, "minSize", y)
                                });
                                e = f
                            }
                            a(e)
                        })).catch((function(e) {
                            TradeModules.common.hawkeye("ERROR", "UdfCompatibleDatafeed: Request marks failed: ", u(e)), c("UdfCompatibleDatafeed: Request marks failed: " + u(e)), a([])
                        })), this.prevTicker = e.ticker, this.prevResolution = s
                    }
                }
            }, this.common = new i, this.DEFINES = t, this.place = new class {
                constructor() {
                    this._tradingPreferences = {
                        productType: {
                            cm: t.productTypeIntraday,
                            fo: t.productTypeIntraday,
                            cd: t.productTypeIntraday,
                            other: t.productTypeIntraday
                        }
                    }
                }
                formatOrder(e) {
                    let t = Object.assign({}, e);
                    switch (e.productType) {
                        case "CO":
                            t = this.formatCO(e);
                            break;
                        case "BO":
                            t = this.formatBO(e)
                    }
                    return t
                }
                formatCO(e) {
                    let t = Object.assign({}, e);
                    return t.hasOwnProperty("stopLoss") && (t.stopLoss = Math.abs(t.stopLoss)), t.hasOwnProperty("stopPrice") && t.hasOwnProperty("stopLoss") ? t.stopPrice ? t.stopLoss = Math.abs(t.stopPrice - t.stopLoss) : t.limitPrice ? t.stopLoss = Math.abs(t.limitPrice - t.stopLoss) : t.stopLoss = Math.abs(t.LTP - t.stopLoss) : t.hasOwnProperty("limitPrice") && t.hasOwnProperty("stopLoss") && (t.limitPrice ? t.stopLoss = Math.abs(t.limitPrice - t.stopLoss) : t.stopLoss = Math.abs((t.LTP ? t.LTP : t.ltp) - t.stopLoss)), t
                }
                formatBO(e) {
                    let t = Object.assign({}, e);
                    return t.hasOwnProperty("stopLoss") && (t.stopLoss = Math.abs(t.stopLoss)), t.hasOwnProperty("takeProfit") && (t.takeProfit = Math.abs(t.takeProfit)), t
                }
                getInputProductType(e) {
                    const r = this;
                    try {
                        var a = FyTrade.brokerHelper.getSymbolSegment(e.symbol),
                            s = r._tradingPreferences.productType[a]
                    } catch (e) {
                        s = t.productTypeIntraday
                    }
                    return s
                }
                cdslDetails(e) {
                    return new Promise((function(r, a) {
                        FyTrade.service.fetchHoldings().then((function(a) {
                            FyTrade.brokerHelper.closeOrderWindow(!1);
                            var s = a;
                            if ("error" === s.s) FyTrade.brokerHelper.checkIfInvalidateError(s), FyTrade.common._showNoticeToUser(t.orderPlacementFail.title, t.orderPlacementFail.body, t.OVERLAY_TYPES.error), r(a);
                            else if ("ok" === s.s) {
                                const t = broker._positions.find((t => t.data.symbol === e.symbol && 1 == t.data.side && "CNC" == t.data.productType));
                                var o = t ? .data,
                                    i = s.holdings ? .find((function(t) {
                                        if (t.symbol == e.symbol) return !0
                                    }));
                                if (o && o.qty >= e.qty) r(!0);
                                else if (i) {
                                    let t = i.qty_authorized + i.qty_authorized_t1,
                                        a = e.qty;
                                    o && (a = e.qty - o.qty), a += i.qty_used, a > i.qty_total && (a = i.qty_total + i.qty_used), t >= a ? r(!0) : t < a && (FyTrade.displayEdisWindow(), r(!1))
                                } else r(!0)
                            }
                        })).catch((e => {
                            FyTrade.brokerHelper.closeOrderWindow(!1), FyTrade.common.fy_showToaster(t.toaster.type.error, t.toaster.placeOrder.title.error, t.toaster.placeOrder.desc.error), r({
                                s: "error"
                            })
                        }))
                    }))
                }
                checkIfDerivative(e) {
                    var t = e.split(":")[0],
                        r = e.split(":")[1],
                        a = r.match(o.MONTHLY_DERIVATIVE),
                        s = r.match(o.WEEKLY_DERIVATIVE),
                        i = r.substring(r.length - 3, r.length);
                    if (i = i.includes("FUT") ? "FUT" : i.includes("PE") || i.includes("CE") ? "OPT" : i, null != a) {
                        var n = r.split(o.MONTHLY_DERIVATIVE),
                            l = a[0].slice(0, 2),
                            d = a[0].slice(2, 5);
                        return {
                            s: !0,
                            sym: n[0],
                            expYear: l,
                            expMonth: d,
                            ex: t,
                            type: i
                        }
                    }
                    if (null != s) {
                        n = r.split(o.WEEKLY_DERIVATIVE), l = s[0].slice(0, 2), d = s[0].slice(2, 3);
                        const e = g.MONTH_LIST;
                        return ["O", "N", "D"].includes(d) && (d = "O" == d ? 10 : "N" == d ? 11 : "D" == d ? 12 : 0), d = e[d], {
                            s: !0,
                            sym: n[0],
                            expYear: l,
                            expMonth: d,
                            ex: t,
                            type: i
                        }
                    }
                    return {
                        s: !1,
                        sym: r,
                        ex: t
                    }
                }
                formatPlaceOrderParams(e, t) {
                    return Object.assign(e, {
                        productType: t && !e.productType ? this.getInputProductType(e) : e.productType,
                        filledQty: 0,
                        limitPrice: e.limitPrice ? parseFloat(e.limitPrice.toFixed(4)) : 0,
                        stopPrice: e.stopPrice ? parseFloat(e.stopPrice.toFixed(4)) : 0,
                        disclosedQty: e.disclosedQty ? parseFloat(e.disclosedQty.toFixed(4)) : 0,
                        offlineOrder: !!e.offlineOrder && e.offlineOrder,
                        validity: e.validity ? e.validity : "DAY"
                    })
                }
                validateProductTypeCO(e, r) {
                    if (e.productType === t.productTypeCo) {
                        if (3 === e.type || 4 === e.type) return !1;
                        if (null === e.stopLoss || void 0 === e.stopLoss) return FyTrade.common.fy_showToaster(t.toaster.type.info, t.orderCoStopLossNotProvided.title, t.orderCoStopLossNotProvided.body, t.OVERLAY_TYPES.error), FyTrade.brokerHelper.closeOrderWindow(r), !0;
                        if (1 === e.side) {
                            if (1 === e.type && e.stopLoss > e.limitPrice || 2 === e.type && e.stopLoss > e.price) return FyTrade.common._showNoticeToUser(t.orderInvalidCoverOrder.title, t.orderInvalidCoverOrder.body, t.OVERLAY_TYPES.error), FyTrade.brokerHelper.closeOrderWindow(r), !0
                        } else if (-1 === e.side && (1 === e.type && e.stopLoss < e.limitPrice || 2 === e.type && e.stopLoss < e.price)) return FyTrade.common._showNoticeToUser(t.orderInvalidCoverOrder.title, t.orderInvalidCoverOrder.body, t.OVERLAY_TYPES.error), FyTrade.brokerHelper.closeOrderWindow(r), !0
                    }
                    return !1
                }
                validateProductTypeBO(e, r) {
                    const a = this;
                    if (e.productType === t.productTypeBo) {
                        if (null === e.stopLoss || void 0 === e.stopLoss) return FyTrade.common.fy_showToaster(t.toaster.type.info, t.orderBoStopLossNotProvided.title, t.orderBoStopLossNotProvided.body, t.OVERLAY_TYPES.error), FyTrade.brokerHelper.closeOrderWindow(r), !0;
                        if (null === e.takeProfit || void 0 === e.takeProfit) return FyTrade.common.fy_showToaster(t.toaster.type.info, t.orderBoTakeProfitNotProvided.title, t.OVERLAY_TYPES.error), FyTrade.brokerHelper.closeOrderWindow(r), !0;
                        if (null != e.trailStopLoss || void 0 !== e.trailStopLoss || e.trailStopLoss > 0 || e.trailStopLoss < 0) return FyTrade.common.fy_showToaster(t.toaster.type.info, t.orderBoTrailStopLossProvided.title, t.orderBoTrailStopLossProvided.body, t.OVERLAY_TYPES.error), FyTrade.brokerHelper.closeOrderWindow(r), !0;
                        var s = .5 * e.LTP;
                        if ("OPT" != a.checkIfDerivative(e.symbol).type && (e.trailStopLoss > s || e.takeProfit > s)) return FyTrade.common._showNoticeToUser(t.orderBoInputInputInPriceNotAbs.title, t.orderBoInputInputInPriceNotAbs.body, t.OVERLAY_TYPES.error), FyTrade.brokerHelper.closeOrderWindow(r), !0
                    }
                    return !1
                }
                postOrderHandler(e, r) {
                    return FyTrade.brokerHelper.modifyOrderBasedOnMPP(e), FyTrade.service.placeOrderService(e).then((function(a) {
                        let s = Object.assign({}, e);
                        if (FyTrade.brokerHelper.closeOrderWindow(r), "error" === a.s) {
                            if ([-201, -202, -203, -399].includes(a.code)) FyTrade.common.fy_showToaster(t.toaster.type.error, t.toaster.placeOrder.title.error, a.message || t.toaster.placeOrder.desc.error), TradeModules.common.hawkeye("ERROR", `Error in placing order : ${a?.message}`);
                            else {
                                const e = t.placeOrderRejectionMessage === a ? .message;
                                FyTrade.brokerHelper.checkIfInvalidateError(a), s.status = 5, s.id = a.id, s.message = e ? t.placeOrderNetworkErrorMessage : a.message, s.message1 = e ? t.placeOrderNetworkErrorMessage : a.message, FyTrade.broker.fy_updateOrder(s, t.message_types.error), orderWindow.orderNotification.getNotificationStatus() || FyTrade.common.fy_showToaster(t.toaster.type.error, t.toaster.placeOrder.title.error, t.toaster.placeOrder.desc.error), TradeModules.common.hawkeye("ERROR", `Order Placement failed due to Network error: ${a?.message}`)
                            }
                            TradeModules.common.logAnalyticEvents("BtClk_ord_ordplcmt_ordwndw_plcord_f", {
                                segment: s.symbol.slice(0, 3),
                                orderType: 1 === s.type ? "Limit Order" : 2 === s.type ? "Market Order" : 3 === s.type ? "Stop Order / SL-M" : 4 === s.type ? "Stop Limit Order / SL-L" : s.type,
                                productType: s.productType
                            })
                        } else "ok" === a.s && (s.id = a.id_fyers, s.message = a.message, s.message1 = a.message, "" === s.id_fyers ? s.status = 4 : (s.status = 6, FyTrade.broker.fy_updateOrder(s, t.message_types.information, !1, !0)));
                        TradeModules.common.logAnalyticEvents("BtClk_ord_ordplcmt_ordwndw_plcord_s", {
                            segment: s.symbol.slice(0, 3),
                            orderType: 1 === s.type ? "Limit Order" : 2 === s.type ? "Market Order" : 3 === s.type ? "Stop Order / SL-M" : 4 === s.type ? "Stop Limit Order / SL-L" : s.type,
                            productType: s.productType
                        })
                    })).catch((e => {
                        FyTrade.brokerHelper.closeOrderWindow(r), FyTrade.common.fy_showToaster(t.toaster.type.error, t.toaster.placeOrder.title.error, t.toaster.placeOrder.desc.error)
                    }))
                }
                postSlicedOrderHandler(e, r) {
                    return FyTrade.brokerHelper.modifyOrderBasedOnMPP(e), FyTrade.service.placeSlicedOrderService(e).then((function(a) {
                        let s = Object.assign({}, e);
                        FyTrade.brokerHelper.closeOrderWindow(r), "error" === a.s ? [-201, -202, -203, -399].includes(a.code) ? FyTrade.common.fy_showToaster(t.toaster.type.error, t.toaster.placeOrder.title.error, a.message || t.toaster.placeOrder.desc.error) : (FyTrade.brokerHelper.checkIfInvalidateError(a), s.status = 5, s.id = a.id, s.message = a.message, s.message1 = a.message, FyTrade.broker.fy_updateOrder(s, t.message_types.error), orderWindow.orderNotification.getNotificationStatus() || FyTrade.common.fy_showToaster(t.toaster.type.error, t.toaster.placeOrder.title.error, a.message || t.toaster.placeOrder.desc.error)) : a.data.forEach((e => {
                            "error" === e.s ? [-201, -202, -203, -399].includes(e.code) ? FyTrade.common.fy_showToaster(t.toaster.type.error, t.toaster.placeOrder.title.error, e.message || t.toaster.placeOrder.desc.error) : (FyTrade.brokerHelper.checkIfInvalidateError(e), s.status = 5, s.id = e.id, s.message = e.message, s.message1 = e.message, FyTrade.broker.fy_updateOrder(s, t.message_types.error), orderWindow.orderNotification.getNotificationStatus() || FyTrade.common.fy_showToaster(t.toaster.type.error, t.toaster.placeOrder.title.error, t.toaster.placeOrder.desc.error)) : "ok" === e.s && (s.id = e.id_fyers, s.message = e.message, s.message1 = e.message, "" === s.id_fyers ? s.status = 4 : (s.status = 6, FyTrade.broker.fy_updateOrder(s, t.message_types.information, !1, !0)))
                        }))
                    })).catch((e => {
                        FyTrade.brokerHelper.closeOrderWindow(r), FyTrade.common.fy_showToaster(t.toaster.type.error, t.toaster.placeOrder.title.error, t.toaster.placeOrder.desc.error)
                    }))
                }
                placeOrder(e, r) {
                    if (TradeModules.storeData.quickTrade.quickTradeStatus && !e.symbol.includes("INDEX") && "BASEKETOPTCHAIN" !== e.Source && "REVERSE_POSITION" !== e.posType) return TradeModules.quickTrade.placeQuickTrade(e, this.postOrderHandler.bind(this), !0), Promise.resolve(); {
                        const s = this;
                        (smartOrders.smartOrderMenuOpen || smartOrders.smartOrderOpen) && (smartOrders.events.handleTradeInvestClick(), smartOrders.events.handleDomAndOptionChainBuySellClick()), !0 === t.openDashboardOnOrderPlacement && broker._host.activateBottomWidget();
                        var a = async function(e) {
                            let a = e.qtyFreeze ? s.postSlicedOrderHandler : s.postOrderHandler;
                            var o = s.formatPlaceOrderParams(e, r);
                            if (!s.validateProductTypeCO(o, r) && !s.validateProductTypeBO(o, r))
                                if (-1 !== o.side || o.productType !== t.productTypeCnc || "N" != poaFlag || FyTrade.common.getDdpiFlag()) {
                                    let e = s.formatOrder(o);
                                    await a(e, r)
                                } else try {
                                    await s.cdslDetails(o).then((async e => {
                                        if (1 == e) {
                                            let e = s.formatOrder(o);
                                            await a(e, r)
                                        }
                                    }))
                                } catch (e) {
                                    FyTrade.common.fy_showToaster(t.toaster.type.error, t.toaster.placeOrder.title.error)
                                }
                        };
                        if ("true" === localStorage.getItem("fyerstrade_instantOrderFlag") && (r = !0), r) {
                            if (e.symbol.includes("INDEX")) return FyTrade.getQuotes([e.symbol]).then((function(t) {
                                e.price = t[0].v.lp, broker._orderwindow.order.initPlaceOrder(e, a, broker)
                            })), Promise.resolve();
                            let t = FyTrade.common.getUserSettingsDataFromLocalStorage(),
                                r = JSON.parse(t) ? .orderWindow ? .productType,
                                s = (JSON.parse(t) ? .orderWindow ? .orderType, FyTrade.helper.getSymbolMasterData(e.symbol)),
                                o = g.FO_INSTRUMENT_CODES.includes(s[9]);
                            switch (e.type) {
                                case 1:
                                    e.stopPrice = 0;
                                    break;
                                case 2:
                                default:
                                    e.stopPrice = 0, e.limitPrice = 0;
                                    break;
                                case 3:
                                    e.limitPrice = 0, e.disclosedQty = 0;
                                    break;
                                case 4:
                                    e.disclosedQty = 0
                            }
                            if ("REVERSE_POSITION" !== e.posType) {
                                let t = s[33] && FyTrade.common.getMtfFlag() && FyTrade.common.getConfigFlag("is_ddpi_enabled");
                                "MTF" === r && (r = t ? "MTF" : "INVEST"), e.productType = "INVEST" === r ? o ? "MARGIN" : "CNC" : "MTF" === r ? "MTF" : "INTRADAY"
                            }
                            return a(e), Promise.resolve()
                        }
                        return FyTrade.getQuotes([e.symbol]).then((function(r) {
                            e.segment && e.segment === t.FUTURES && !r.length ? e.price = Number(e.price.split("₹")[1]) : e.price = r[0].v.lp, broker._orderwindow.order.initPlaceOrder(e, a, broker)
                        })), Promise.resolve()
                    }
                }
            }, this.positionAction = new class {
                constructor() {}
                async handleMTFConversion(e) {
                    const r = `${globalConstants.config.endpoints.current.trading.mtf_positions_conversion}?id=${e}`;
                    let a = [],
                        s = [];
                    try {
                        const e = await FyTrade.request.sendRequest(r, "GET");
                        return FyTrade.store.dispatch(v.setMtfConversionData(e)), e.code === t.API_CODES.SUCCESS ? (e.data.forEach((e => {
                            a.push(e.id), s.push(e.qty)
                        })), {
                            success: !0,
                            positionIds: a,
                            positionQuantities: s,
                            mtfData: e.data
                        }) : {
                            mtfData: []
                        }
                    } catch (e) {
                        console.log("Error in MTF conversion:", e)
                    }
                }
                reversePosition(e, r) {
                    var a = FyTrade.broker._positionsBySymbolAndProduct[e],
                        s = {
                            type: a.data.productType
                        },
                        o = a.data.productType,
                        i = function() {
                            return s.type === t.productTypeCo ? (FyTrade.common.fy_showToaster(t.toaster.type.info, t.positionsCoInvalid.title, t.positionsCoInvalid.body), Promise.reject(1)) : s.type === t.productTypeBo ? (FyTrade.common.fy_showToaster(t.toaster.type.info, t.positionsBoInvalid.title, t.positionsBoInvalid.body), Promise.reject(1)) : s.type === t.productTypeCnc ? (FyTrade.common.fy_showToaster(t.toaster.type.info, t.positionsCNCInvalid.title, t.positionsCNCInvalid.body), Promise.reject(1)) : FyTrade.placeOrder({
                                symbol: a.data.symbol,
                                side: -1 === a.data.side ? 1 : -1,
                                type: 2,
                                qty: 2 * a.data.qty,
                                duration: s,
                                productType: o,
                                posType: "REVERSE_POSITION"
                            }, !0)
                        };
                    return r ? i() : broker._host.showReversePositionDialog(a.data, i)
                }
                closePosition(e) {
                    return this.exitPositionServer(e)
                }
                exitPositionServer(e) {
                    var r = {};
                    if (null != e) {
                        var a = FyTrade.broker._positionsBySymbolAndProduct[e].data;
                        r = {
                            id: a.id
                        }
                    }
                    return new Promise((function(e, s) {
                        FyTrade.broker._requestPendingCountFunds = 10, FyTrade.broker._requestPendingCountOrders = 10, FyTrade.broker._requestPendingCountPositions = 10, FyTrade.broker._requestPendingCountHoldings = 10, FyTrade.broker._requestPendingCountTrades = 10, FyTrade.broker._requestPendingCountTrades = 10, FyTrade.service.deleteOrderService(globalConstants.dynamicUrl.trading.positions, r).catch((function() {
                            FyTrade.common.fy_showToaster(t.toaster.type.error, t.toaster.exitPositions.title.error, t.toaster.exitPositions.desc.error), e()
                        })).then((function(r) {
                            var s = r;
                            s.message, "error" === s.s && (FyTrade.brokerHelper.checkIfInvalidateError(s), s.message, FyTrade.common.fy_showToaster(t.toaster.type.error, t.toaster.exitPositions.title.error, s.message), TradeModules.common.logAnalyticEvents("BtClk_portfolio_Pos_PosVw_extPos_f", {
                                segment: a.productType,
                                orderStatus: s.s
                            })), 200 == s.code && s.message ? (FyTrade.common.fy_showToaster(t.toaster.type.success, t.toaster.exitPositions.title.success, s.message), TradeModules.common.logAnalyticEvents("BtClk_portfolio_Pos_PosVw_extPos_s", {
                                segment: a.productType,
                                orderStatus: 200 === s.code || "ok" === s.s ? "Position exited" : s.s
                            })) : 201 == s.code && s.message && FyTrade.common.fy_showToaster(t.toaster.type.info, t.toaster.exitPositions.title.success, s.message), e(s)
                        })).then((function() {
                            setTimeout((function() {
                                FyTrade.broker._requestPendingCountFunds = 0, FyTrade.broker._requestPendingCountOrders = 0, FyTrade.broker._requestPendingCountPositions = 0, FyTrade.broker._requestPendingCountHoldings = 0, FyTrade.broker._requestPendingCountTrades = 0, FyTrade.broker._requestPendingCountTrades = 0, FyTrade.broker._updateAvailableFunds(), FyTrade.broker.positionsRefresh(), FyTrade.updateQuotes()
                            }), 500)
                        }))
                    }))
                }
                getSymbolMinQty(e) {
                    try {
                        var t = FyTrade.helper.getSymbolMasterValue(datafeed.unzippedData ? .data ? .[e], "min_lot_size");
                        return void 0 === t ? 1 : t
                    } catch (e) {
                        return t
                    }
                }
                callPositionConversionFunc(e) {
                    var r = this,
                        a = FyTrade.broker._positionsBySymbolAndProduct[e.target.id],
                        s = a.data.qty,
                        o = a.data.productType,
                        i = a.data.symbol,
                        n = a.data.segment,
                        l = a.data.side,
                        d = r.getSymbolMinQty(i);
                    if (0 === s) return void FyTrade.common._showNoticeToUser("Position Conversion Error", "You can convert only open positions", t.OVERLAY_TYPES.error);
                    if ("CO" === o || "BO" === o) {
                        let e = "CO / BO positions cannot be converted";
                        return void FyTrade.common.fy_showToaster(t.toaster.type.error, t.toaster.convertPositions.title.error, e)
                    }
                    let c = {
                        positions_NetQty: s,
                        positions_ProductType: o,
                        positions_Symbol: i,
                        position_Segment: n,
                        position_Side: l,
                        lotSize: d
                    };
                    "MTF" === o ? this.handleMTFConversion(a.data.id).then((e => {
                        c.mtfData = e.mtfData, position_conv.callPositionConversion(a, c, r.updatedDataPositionConversion.bind(r)), TradeModules.common.logAnalyticEvents("BtClk_ord_posConv_ordwndw_mtfPos_Sub", {
                            product_type: o,
                            platform_type: "web"
                        })
                    })).catch((e => {
                        c.mtfData = [], position_conv.callPositionConversion(a, c, r.updatedDataPositionConversion.bind(r)), console.log("Error in MTF conversion:", e), TradeModules.common.logAnalyticEvents("BtClk_ord_posConv_ordwndw_mtfPos_Rej", {
                            product_type: o,
                            platform_type: "web"
                        })
                    })) : position_conv.callPositionConversion(a, c, r.updatedDataPositionConversion.bind(r))
                }
                updatedDataPositionConversion(e) {
                    try {
                        var {
                            convertTo: r,
                            convertFrom: a
                        } = e, s = "MARGIN" === r || "MARGIN" === a ? e.symbol.split("-").splice(0, 1).join("-") : e.symbol.split("-").splice(0, 2).join("-");
                        FyTrade.service.postOrderService(globalConstants.dynamicUrl.trading.positions, e).catch((function(e) {
                            FyTrade.common.fy_showToaster(t.toaster.type.error, t.toaster.convertPositions.title.error, s)
                        })).then((function(r) {
                            r.code === t.API_CODES.SUCCESS ? (FyTrade.updateQuotes(), "MTF" === a ? FyTrade.common.fy_showToaster(t.toaster.type.success, t.toaster.convertMtfPositions.title.success, s) : FyTrade.common.fy_showToaster(t.toaster.type.success, t.toaster.convertPositions.title.success, s), TradeModules.common.logAnalyticEvents("BtClk_portfolio_Pos_PosVw_ConvPos_s", {
                                segment: `${e.convertFrom} to ${e.convertTo}`,
                                conversionTriggerStatus: 200 === r.code || "ok" === r.code ? "converted" : r.code
                            })) : (FyTrade.common.fy_showToaster(t.toaster.type.error, t.toaster.convertPositions.title.error, r.message || s), TradeModules.common.logAnalyticEvents("BtClk_portfolio_Pos_PosVw_ConvPos_f", {
                                segment: `${e.convertFrom} to ${e.convertTo}`,
                                conversionTriggerStatus: r.code
                            }))
                        }))
                    } catch (e) {
                        return void FyTrade.common.fy_showToaster(t.toaster.type.error, t.toaster.convertPositions.title.error, s)
                    }
                }
            }, this.modify = new class {
                constructor() {}
                modifyOrder(e, r, a) {
                    if (!FyTrade.common.getSmartOrderSource(e ? .id_fyers ? ? e ? .id) || smartOrders.modiFyWarningAccepted) {
                        smartOrders.modiFyWarningAccepted = !1, "true" === localStorage.getItem("fyerstrade_instantOrderFlag") && (r = !0), "true" === localStorage.getItem("fyerstrade_nonDraggable") && (a = !0);
                        var s = function(e) {
                            var a = FyTrade.broker._orderById[e.id];
                            if (a) {
                                var s = Object.assign({}, a.data);
                                if (s.productType !== e.productType) return FyTrade.brokerHelper.closeOrderWindow(r), void FyTrade.common.fy_showToaster(t.toaster.type.info, t.toaster.modifyOrder.title.modifyError, t.toaster.modifyOrder.desc.modifyError);
                                if ("validity" in e && s.orderValidity && s.orderValidity !== e.validity.toUpperCase()) return FyTrade.brokerHelper.closeOrderWindow(r), void FyTrade.common.fy_showToaster(t.toaster.type.info, t.toaster.modifyOrder.title.modifyError, t.toaster.modifyOrder.desc.modifyError);
                                if (s.qty = e.qty, s.stopPrice = e.stopPrice, s.limitPrice = e.limitPrice, s.type = e.type, s.LTP = e.LTP, s.disclosedQty = e.disclosedQty, e.stopLoss && (s.stopLoss = parseFloat(e.stopLoss)), e.takeProfit && (s.takeProfit = parseFloat(e.takeProfit)), !(s = 1 !== orderWindow.userSettingsData.orderWindow.stoploss_takeprofit ? FyTrade.broker.order.formatModify(FyTrade.place.formatOrder(s)) : FyTrade.broker.order.formatModify(s)).id) return void FyTrade.common.fy_showToaster(t.toaster.type.info, t.noOmsId.title, t.noOmsId.body);
                                FyTrade.brokerHelper.modifyOrderBasedOnMPP(s), FyTrade.service.patchOrderService(globalConstants.dynamicUrl.trading.orders_get, s).then((function(e) {
                                    var a = e;
                                    FyTrade.brokerHelper.closeOrderWindow(r), "error" === a.s && (FyTrade.brokerHelper.checkIfInvalidateError(a), FyTrade.common.fy_showToaster(t.toaster.type.error, t.toaster.modifyOrder.title.error, a.message), TradeModules.common.logAnalyticEvents("BtClk_ord_ordCncl_ordwndw_modifyord_f"), TradeModules.common.hawkeye("ERROR", "Error in Modifying Order", a.message)), setTimeout((function() {
                                        parseInt((new Date).getTime() / 1e3) - parseInt(FyTrade.broker._lastUpdateTradingDetails) >= 3 && FyTrade.broker._updateAvailableFunds(), FyTrade.common.fy_showToaster(t.toaster.type.success, t.toaster.modifyOrder.title.success, t.toaster.modifyOrder.desc.success)
                                    }), 500)
                                })).catch((function(e) {
                                    FyTrade.common.fy_showToaster(t.toaster.type.error, t.toaster.modifyOrder.title.error, t.toaster.modifyOrder.desc.error)
                                }))
                            } else FyTrade.brokerHelper.closeOrderWindow(r)
                        };
                        return TradeModules.storeData.quickTrade.quickTradeStatus && !a ? (localStorage.setItem("fyerstrade_nonDraggable", "false"), void s(e)) : r && !a ? (localStorage.setItem("fyerstrade_nonDraggable", "false"), s(e), Promise.resolve()) : (localStorage.setItem("fyerstrade_nonDraggable", "false"), broker._orderwindow.order.initModifyOrder(e, s, !1, this), Promise.resolve())
                    }
                    smartOrders.events.handleSmartModifyFromAccountManager(e)
                }
            }, this.cancel = new class {
                constructor() {}
                formatDelete(e) {
                    let t = FyTrade.brokerHelper.getOmsIdByFyersId(e.id);
                    return e.id = t || null, e
                }
                cancelOrder(e, r) {
                    var a = FyTrade.broker._orderById[e].data,
                        s = {
                            id: a.id
                        };
                    if (!(s = this.formatDelete(s)).id) return FyTrade.common.fy_showToaster(t.toaster.type.info, t.noOmsId.title, t.noOmsId.body), Promise.resolve();
                    var o = function() {
                        var e = new Promise((function(r, a) {
                            let o = globalConstants.dynamicUrl.trading.orders_cancel;
                            FyTrade.service.deleteOrderService(o, s).then((s => {
                                var o = s;
                                if ("error" === o.s) return FyTrade.brokerHelper.checkIfInvalidateError(o), FyTrade.common.fy_showToaster(t.toaster.type.error, t.toaster.cancelOrder.title.error, o.message), TradeModules.common.logAnalyticEvents("BtClk_ord_ordCncl_ordBook_Cnclord_f"), a(), e;
                                setTimeout((function() {
                                    parseInt((new Date).getTime() / 1e3) - parseInt(FyTrade.broker._lastUpdateTradingDetails) >= 3 && FyTrade.broker._updateAvailableFunds()
                                }), 500), r(), TradeModules.common.logAnalyticEvents("BtClk_ord_ordCncl_ordBook_Cnclord_s")
                            })).catch((r => (TradeModules.common.hawkeye("ERROR", "Error canceling the order", r), FyTrade.common.fy_showToaster(t.toaster.type.error, t.toaster.cancelOrder.title.error, t.toaster.cancelOrder.desc.error), a(), e)))
                        }));
                        return e
                    };
                    return r ? broker._host.showCancelOrderDialog(a.id, o) : o()
                }
            }, this.accountManager = new class {
                constructor() {}
                accountManagerInfo() {
                    var e = this;
                    return {
                        accountTitle: "Dashboard",
                        hasHistory: !1,
                        summary: [{
                            text: "Funds Available",
                            wValue: broker.funds_available,
                            formatter: "fixed"
                        }, {
                            text: "Holdings P&L",
                            wValue: broker.unrealizedHoldingsPNL,
                            formatter: "fixed"
                        }, {
                            text: "Positions P&L",
                            wValue: broker.unrealizedPositionsPNL,
                            formatter: "fixed"
                        }],
                        customFormatters: [{
                            name: "custom_uppercase",
                            formatText: function(e) {
                                try {
                                    return e.values[0].toUpperCase()
                                } catch (e) {
                                    console.info(e)
                                }
                            }
                        }, {
                            name: "float_format",
                            formatText: function(e) {
                                try {
                                    var t = e.values[0];
                                    return null == t ? Number(0) : (t = (t = parseFloat(t)).toFixed(4), t = parseFloat(t))
                                } catch (e) {
                                    console.log("formatter : float_format : error : " + e)
                                }
                            }
                        }, {
                            name: "indian_comma_format",
                            formatText: function(e) {
                                try {
                                    return e.values[0].toLocaleString("en-IN", {
                                        maximumFractionDigits: 2
                                    })
                                } catch (e) {
                                    return console.log("formatter : indian_comma_format : " + e), "-"
                                }
                            }
                        }, {
                            name: "indian_comma_format_with_profit",
                            formatText: function(e) {
                                try {
                                    return e.values[0].toLocaleString("en-IN", {
                                        maximumFractionDigits: 2
                                    })
                                } catch (e) {
                                    return console.log("formatter : indian_comma_format_with_profit : " + e), "-"
                                }
                            },
                            formatElement: ({
                                values: e
                            }) => {
                                const t = e[0] || 0,
                                    r = parseFloat(t.toFixed(2));
                                let s = t.toLocaleString("en-IN", {
                                    maximumFractionDigits: 2
                                });
                                const o = document.createElement("span");
                                return r > 0 ? (o.style.color = a.DASHBOARD_COLORS.profitText, s = `+${s}`) : r < 0 ? o.style.color = a.DASHBOARD_COLORS.lossText : o.classList.add("dashboard-breakeven-text"), o.innerText = s, o
                            }
                        }, {
                            name: "remove_whitespace",
                            formatText: function(e) {
                                try {
                                    var t = e.values[0];
                                    return null == t ? "" : "string" != typeof t ? e.values[0] : t = t.replace(/-|\s/g, " ")
                                } catch (e) {
                                    return console.log("formatter : remove_whitespace : error : " + e), "INVALID"
                                }
                            }
                        }, {
                            name: "formatStopPrice",
                            formatText: function(e) {
                                try {
                                    let t = e.values[0],
                                        r = e.values[1];
                                    if (1 === r || 2 === r || "1" === r || "2" === r) return;
                                    let a = parseFloat(t);
                                    if (isNaN(a) || 0 === a) return;
                                    return a.toLocaleString("en-IN", {
                                        maximumFractionDigits: 2
                                    })
                                } catch (e) {
                                    return TradeModules.common.hawkeye("ERROR", "formatter : formatStopPrice : " + e), void console.log("formatter : formatStopPrice : error : " + e)
                                }
                            }
                        }, {
                            name: "closeButton",
                            formatText: () => "",
                            formatElement: e => {
                                try {
                                    const t = document.createElement("button"),
                                        r = e.values[0];
                                    return t.innerText = "", t.classList = "btn-pos-conv", t.addEventListener("click", (t => {
                                        t.stopPropagation();
                                        let r = {
                                            target: {
                                                id: e.values[0].id
                                            }
                                        };
                                        broker.callPositionConversionFunc(r)
                                    })), "MTF" === r.productType && 0 === r.cf_net_qty && (t.disabled = !0, t.style.opacity = "0.5", t.style.cursor = "default"), t
                                } catch (e) {
                                    return console.log("formatter : Custom Exit Button: " + e), ""
                                }
                            }
                        }, {
                            name: "exit_button_co_bo",
                            formatElement: function(t, r) {
                                try {
                                    var a = t.row.productType,
                                        s = $("<button/>", {
                                            text: "Exit",
                                            id: t.row.id,
                                            style: "background:none; border:none",
                                            click: e.callCancelFunc.bind(e)
                                        });
                                    if ("BO" === a || "CO" === a) return s
                                } catch (e) {
                                    return console.log("formatter : Custom Exit Button: " + e), ""
                                }
                            }
                        }, {
                            name: "order_details_button",
                            formatElement: function(t, r) {
                                try {
                                    return $("<button/>", {
                                        text: "Details",
                                        class: "modal-header-btn modal-trigger",
                                        id: t.row.id,
                                        style: "background:none; border:none",
                                        click: e.callOrderModal.bind(e, r)
                                    })
                                } catch (e) {
                                    return console.log("formatter : Custom Button: " + e), ""
                                }
                            }
                        }, {
                            name: "position_conversion",
                            formatElement: function(e, t) {
                                try {
                                    return (new DOMParser).parseFromString("<button>My Button</button>", "text/html"), "<button>My Button</button>"
                                } catch (e) {
                                    return console.log("formatter : Custom Order Position Button: " + e), ""
                                }
                            }
                        }, {
                            name: "symbolsub",
                            formatElement: function(e, t) {
                                const r = document.createElement("button");
                                return r.innerText = e.values[0], r.style.border = "none", r.style.background = "none", r.addEventListener("click", (t => {
                                    t.stopPropagation(), tvWidget.activeChart().setSymbol(e.values[0])
                                })), r
                            }
                        }, {
                            name: "gttType",
                            formatElement: function(e, t) {
                                return 2 === e.values[0] ? "OCO" : "SINGLE"
                            }
                        }, {
                            name: "closeGttButton",
                            formatText: () => "",
                            formatElement: e => {
                                try {
                                    const t = e.values[0] && 6 === e.values[0].status,
                                        r = document.createElement("div");
                                    if (t) {
                                        r.classList = "gtt-order-button-container";
                                        const t = (e, t) => {
                                                const r = document.createElement("button");
                                                return r.classList = e, ["click", "mouseup", "mousedown"].forEach((e => {
                                                    r.addEventListener(e, (e => {
                                                        e.stopPropagation(), t(e)
                                                    }))
                                                })), r
                                            },
                                            a = t("btn-pos-conv", (t => {
                                                TradeModules.gtt.handler.showGttModifyOrder(e.values[0])
                                            })),
                                            s = t("btn-gtt-close", (t => {
                                                TradeModules.gtt.handler.showGttCancelOrder(e.values[0])
                                            }));
                                        r.appendChild(a), r.appendChild(s)
                                    } else r.classList = "gtt-order-button-empty-container", r.innerText = "-";
                                    return r
                                } catch (e) {
                                    return console.log("formatter >> custom close GTT: ", e), ""
                                }
                            }
                        }],
                        orderColumns: N,
                        positionColumns: D,
                        pages: [{
                            id: "gttOrders",
                            title: "GTT Orders",
                            tables: [{
                                id: "gttOrders",
                                columns: O,
                                getData: function() {
                                    return FyTrade.broker.gttOrdersRefresh()
                                },
                                changeDelegate: broker._gttOrderChangeDelegate
                            }]
                        }, {
                            id: "allPositions",
                            title: "All Positions",
                            tables: [{
                                id: "allPositions",
                                columns: w,
                                getData: function() {
                                    return FyTrade.broker.positions.getData()
                                },
                                changeDelegate: broker._allpositionChangeDelegate
                            }]
                        }, {
                            id: "holding",
                            title: "Holdings",
                            tables: [{
                                id: "holding",
                                columns: P,
                                getData: function() {
                                    return TradeModules.common.logAnalyticEvents("PL_portfolio_holdings_holdingsVw_PL_"), FyTrade.broker.holdings.getData()
                                },
                                changeDelegate: broker._holdingsChangeDelegate
                            }]
                        }, {
                            id: "fundLimit",
                            title: "Funds",
                            tables: [{
                                id: "fundLimit",
                                columns: k,
                                getData: function() {
                                    return TradeModules.common.logAnalyticEvents("PL_acc_ovrw_fd_PL_"), FyTrade.broker.funds.getData()
                                },
                                changeDelegate: broker._afChangeDelegate
                            }]
                        }, {
                            id: "tradebook",
                            title: "Trades",
                            tables: [{
                                id: "tradebook",
                                columns: A,
                                getData: function() {
                                    return FyTrade.broker.tradebook.getData()
                                },
                                changeDelegate: broker._tradebookChangeDelegate
                            }]
                        }],
                        contextMenuActions: function(e, t) {
                            return Promise.resolve(broker._bottomContextMenuItems(t))
                        }
                    }
                }
                callCancelFunc(e) {
                    var t = FyTrade.broker._orderById[e.target.id].data.id;
                    FyTrade.cancelOrder(t, !1)
                }
                callOrderModal(e) {
                    var t = FyTrade.broker._orderById[e.target.id],
                        r = t.data.id,
                        a = t.data.segment,
                        s = t.data.symbol;
                    return "E" === a ? a = "CM" : "C" === a ? a = "CD" : "M" === a ? a = "COM" : "D" === a && (a = "FO"), (r.includes("CO") || r.includes("BO")) && (r = r.split("-")[0]), window.callModal(r, a, s)
                }
            }, this.brokerHelper = new class {
                constructor() {
                    this.fyersIdAndNorenIdMapping = {}, this._extraSymbols = [], this._extraSymbolsGuid = d.prototype.createGuid("brSub_"), this.sessionInvalidatedNotice = {
                        title: "Session Invalidated",
                        body: t.INVALID_SESSION,
                        callback: this.invalidateSession
                    }, this.symbolInfoCache = {}
                }
                getSymbolSegment(e) {
                    try {
                        const r = e.split(":") ? .[1],
                            a = r.split("-") ? .[1],
                            s = r ? .match(/\d+/g),
                            o = {
                                INDEX: "other",
                                EQ: t.segmentCm,
                                BE: t.segmentCm
                            };
                        if (o[a]) return o[a];
                        if (null != s) {
                            let e = r.split(/[0-9]+/);
                            return t.currencyPairs.includes(e[0]) ? t.segmentCd : t.segmentFo
                        }
                        return "other"
                    } catch (e) {
                        return "other"
                    }
                }
                closeOrderWindow(e) {
                    setTimeout((function() {
                        0 != e && null != e || orderWindow.order.orderStatus("completed")
                    }), 250)
                }
                fy_updateOrderShowToaster(e, r) {
                    var a = {
                            type: "",
                            title: "",
                            desc: "",
                            desc_sub: ""
                        },
                        s = "";
                    switch (1 === e.side ? s = "Buy" : -1 === e.side && (s = "Sell"), r) {
                        case 1:
                            a.type = t.toaster.type.info, a.title = t.orderStatusMessages.new;
                            break;
                        case 2:
                            a.type = t.toaster.type.warning, a.title = t.orderStatusMessages.cancelled;
                            break;
                        case 3:
                            a.type = t.toaster.type.success, a.title = t.orderStatusMessages.executed;
                            break;
                        case 4:
                            a.type = t.toaster.type.error, a.title = t.orderStatusMessages.rejected;
                            break;
                        case 5:
                            a.type = t.toaster.type.success, a.title = t.orderStatusMessages.modified;
                            break;
                        default:
                            return
                    }
                    a.desc = e.symbol + " " + s + " " + e.qty + " Qty", FyTrade.common.fy_showToaster(a.type, a.title, a.desc, a.desc_sub, 2e3)
                }
                invalidateSession() {
                    window.location = t.loginUrlPath_CB + "&message=Your session was invalidated. Please relogin&message_type=-1"
                }
                checkIfInvalidateError(e) {
                    g.VALIDATE_ERROR_CODE_LIST.includes(e.code) && tvWidget.showConfirmDialog(this.sessionInvalidatedNotice)
                }
                getOmsIdByFyersId(e) {
                    return this.fyersIdAndNorenIdMapping[e]
                }
                addSymbolToArray(e) {
                    if ("" === e || "TOTAL HOLDING VALUE" === e) return !0;
                    var t = this,
                        r = FyTrade.data.quoteSupplier._subscribers;
                    return t._extraSymbolsGuid in r || FyTrade.subscribeQuotesRtData(t._extraSymbols, t._extraSymbols, t.realTimeUpdate.bind(t), t._extraSymbolsGuid), 0 == t._extraSymbols.indexOf(e) > -1 && (t._extraSymbols.push(e), FyTrade.subscribeQuotesRtData(t._extraSymbols, t._extraSymbols, t.realTimeUpdate.bind(t), t._extraSymbolsGuid)), !0
                }
                realTimeUpdate(e) {
                    FyTrade.socket.realTimeUpdate(e)
                }
                async getSymbolInfoBroker(e) {
                    if (this.symbolInfoCache[e]) return this.symbolInfoCache[e];
                    try {
                        if (window.datafeed.unzippedData.data[e]) {
                            const r = window.datafeed.unzippedData.data[e][3],
                                a = window.datafeed.unzippedData.data[e][12] * r / r,
                                s = window.datafeed.unzippedData.data[e][1] ? window.datafeed.unzippedData.data[e][1] : 1,
                                o = a,
                                i = 1,
                                n = 1;
                            var t = {
                                qty: {
                                    min: s,
                                    max: Number.MAX_VALUE,
                                    step: s
                                },
                                pipValue: o * n * i || 1,
                                pipSize: o,
                                minTick: a,
                                description: ""
                            };
                            return this.symbolInfoCache[e] = t, t
                        } {
                            let r = e.split(":")[0],
                                a = {
                                    symbol: e.toUpperCase()
                                };
                            const s = await FyTrade.dataService.symbolService3(a);
                            if (200 == s.code && s.data) {
                                let a;
                                a = r === s.data[0].value[0]["exchange-listed"] ? 0 : 1;
                                let o = s.data[a].value[a];
                                const i = o.pricescale,
                                    n = o.tick_size * i / i,
                                    l = o.lot_size ? o.lot_size : 1,
                                    d = n,
                                    c = 1,
                                    u = 1;
                                return TradeModules.customIndicator.oi.symbolInst = o.instrument_type, t = {
                                    qty: {
                                        min: l,
                                        max: Number.MAX_VALUE,
                                        step: l
                                    },
                                    pipValue: d * u * c || 1,
                                    pipSize: d,
                                    minTick: n,
                                    description: o.description
                                }, this.symbolInfoCache[e] = t, t
                            }
                            this.symbolInfoCache[e] = 0
                        }
                    } catch (t) {
                        console.log("getSymbolInfologic : symbol : " + e + " : error : " + t)
                    }
                }
                isMppOrder(e) {
                    try {
                        const t = datafeed ? .unzippedData ? .data[e][36];
                        return 1 === t
                    } catch (e) {
                        return console.log(e), !1
                    }
                }
                modifyOrderBasedOnMPP(e) {
                    FyTrade.brokerHelper.isMppOrder(e.symbol) && (2 !== e.type && 3 !== e.type || (e.MppPriceFlag = !0))
                }
            }, this.service = new class {
                constructor() {}
                cdslIndexService(e) {
                    try {
                        return new Promise((function(t, r) {
                            FyTrade.request.sendRequest(`${globalConstants.dynamicUrl.depository.edis_setup_kambala}?token_id=${tokenId}`, "POST", e).then((e => {
                                e ? t(e) : r(e)
                            })).catch((e => {
                                r(e)
                            }))
                        }))
                    } catch (e) {
                        throw `Error in setting CDSL service API: ${e}`
                    }
                }
                postOrderService(e, t, r = !1) {
                    try {
                        return new Promise((function(a, s) {
                            FyTrade.request.sendRequest(e, "POST", t, r).then((e => {
                                e ? a(e) : s(e)
                            })).catch((e => {
                                s(e)
                            }))
                        }))
                    } catch (e) {
                        throw `Error in setting CDSL service API: ${e}`
                    }
                }
                patchOrderService(e, t) {
                    try {
                        return new Promise((function(r, a) {
                            FyTrade.request.sendRequest(e, "PATCH", t).then((e => {
                                e ? r(e) : a(e)
                            })).catch((e => {
                                a(e)
                            }))
                        }))
                    } catch (e) {
                        throw `Error in setting CDSL service API: ${e}`
                    }
                }
                getAPIService(e, t, r = !1) {
                    try {
                        return new Promise((function(a, s) {
                            FyTrade.request.sendRequest(e, "GET", t, r).then((e => {
                                e ? a(e) : s(e)
                            })).catch((e => {
                                s(e)
                            }))
                        }))
                    } catch (e) {
                        throw `Error in setting CDSL service API: ${e}`
                    }
                }
                deleteOrderService(e, t, r = !1) {
                    try {
                        return new Promise((function(a, s) {
                            FyTrade.request.sendRequest(e, "DELETE", t, r).then((e => {
                                e ? a(e) : s(e)
                            })).catch((e => {
                                s(e)
                            }))
                        }))
                    } catch (e) {
                        throw `Error in setting CDSL service API: ${e}`
                    }
                }
                async placeOrderService(e) {
                    try {
                        let t = globalConstants.dynamicUrl.trading.orders_get;
                        return await FyTrade.request.sendRequest(t, "POST", e)
                    } catch (e) {
                        throw `Error while placing orders: ${e}`
                    }
                }
                async placeSlicedOrderService(e) {
                    try {
                        let t = globalConstants.dynamicUrl.trading.orders_slice;
                        return await FyTrade.request.sendRequest(t, "POST", e)
                    } catch (e) {
                        throw `Error while placing orders: ${e}`
                    }
                }
                async fetchFunds() {
                    try {
                        return await FyTrade.request.sendRequest(globalConstants.dynamicUrl.trading.funds, "GET")
                    } catch (e) {
                        throw `Error while fetching Funds: ${e}`
                    }
                }
                async fetchHoldings() {
                    try {
                        return await FyTrade.request.sendRequest(globalConstants.dynamicUrl.trading.holdings, "GET")
                    } catch (e) {
                        throw `Error while fetching Holdings: ${e}`
                    }
                }
                async fetchPositions() {
                    try {
                        return await FyTrade.request.sendRequest(globalConstants.dynamicUrl.trading.positions, "GET")
                    } catch (e) {
                        throw `Error while fetching positions: ${e}`
                    }
                }
                async fetchTradeBook() {
                    try {
                        return await FyTrade.request.sendRequest(globalConstants.dynamicUrl.trading.trades, "GET")
                    } catch (e) {
                        throw `Error while fetching Funds: ${e}`
                    }
                }
                async fetchWatchlistData() {
                    try {
                        return await FyTrade.request.sendRequest(r.wlVoyager, "GET")
                    } catch (e) {
                        throw `Error while fetching watchlist Data: ${e}`
                    }
                }
                async fetchStatusForDDPI() {
                    try {
                        return await FyTrade.request.sendRequest(r.DDPI, "GET")
                    } catch (e) {
                        throw `Error while fetching DDPI Data: ${e}`
                    }
                }
                async fetchMtfAuthoFlow() {
                    try {
                        return await FyTrade.request.sendRequest(r.MTF_AUTH, "POST")
                    } catch (e) {
                        throw `Error while fetching MTF AUth Data: ${e}`
                    }
                }
                async fetchBannerStatusForKRAStatus() {
                    try {
                        return await FyTrade.request.sendRequest(`${r.KRA_STATUS_API}?source=web`, "GET")
                    } catch (e) {
                        throw `Error while fetching MTF Banner Data: ${e}`
                    }
                }
            }, this.request = new class {
                constructor() {}
                async sendRequest(e, t, a, s = !1) {
                    TRADEAPIURL = r.wlDevURL, s && (TRADEAPIURL = r.wlCDSLURL), e = e.includes("https") ? e : TRADEAPIURL + e;
                    let o = {
                        method: t,
                        headers: {
                            Authorization: getCookie("_FYERS")
                        }
                    };
                    a && (o.body = JSON.stringify(a));
                    try {
                        return (await fetch(e, o)).json()
                    } catch (t) {
                        return console.log(`Unable to make request to URL: ${e}`), {
                            s: "error",
                            message: "Failed: " + e
                        }
                    }
                }
                async _sendRequestLogout() {
                    let e = r.LOGOUT;
                    const t = {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "text/plain",
                            Authorization: `Bearer ${getCookie("_FYERS")}`,
                            app_id: "2",
                            "X-Device-ID": getCookie(FyTrade.DEFINES.deviceIdCookieName) || "-"
                        }
                    };
                    try {
                        let r = await fetch(e, t);
                        if (r) return sessionStorage.clear("retrials"), r
                    } catch (e) {
                        console.log(e.message)
                    }
                }
            }, this.dataService = new class {
                constructor() {
                    this.symbolService2DataIfAlreadyThere = {
                        isApiInLoadingState: !1
                    }, this.symbolService3DataIfAlreadyThere = {
                        isApiInLoadingState: !1
                    }
                }
                async symbolService(e) {
                    try {
                        return await FyTrade.data.requester.sendRequest(globalConstants.dynamicUrl.data.search, "", e)
                    } catch (e) {
                        throw "Error while searching symbols " + e
                    }
                }
                async symbolService3(e) {
                    try {
                        if (!FyTrade.common.checkIfValidFormatForSymbol(e ? .symbol)) return a.MULTI_SYMBOLS_INVALID_RESPONSE;
                        const t = this.symbolService3DataIfAlreadyThere[e ? .symbol];
                        if (t) return t;
                        this.symbolService3DataIfAlreadyThere.isApiInLoadingState = !0;
                        const r = await FyTrade.data.requester.sendRequest(globalConstants.dynamicUrl.data.multi_symbols, "", e, !1);
                        return this.symbolService3DataIfAlreadyThere.isApiInLoadingState = !1, this.symbolService3DataIfAlreadyThere[e.symbol] = r, r
                    } catch (e) {
                        throw this.symbolService3DataIfAlreadyThere.isApiInLoadingState = !1, new Error("Error while searching symbols: " + e.message)
                    }
                }
                async symbolService2(e) {
                    try {
                        if (!FyTrade.common.checkIfValidFormatForSymbol(e ? .symbol)) return a.SYMBOL_API_INVALID_RESPONSE;
                        const t = this.symbolService2DataIfAlreadyThere[e ? .symbol];
                        if (t) return t;
                        this.symbolService2DataIfAlreadyThere.isApiInLoadingState = !0;
                        const r = await FyTrade.data.requester.sendRequest(globalConstants.dynamicUrl.data.symbols_web, "", e, !1);
                        return this.symbolService2DataIfAlreadyThere.isApiInLoadingState = !1, this.symbolService2DataIfAlreadyThere[e.symbol] = r, r
                    } catch (e) {
                        throw this.symbolService2DataIfAlreadyThere.isApiInLoadingState = !1, new Error("Error while searching symbols: " + e.message)
                    }
                }
                async getMarksService(e) {
                    try {
                        return FyTrade.common.checkIfMcxOrIndexScript(e ? .symbol) || !FyTrade.common.checkIfValidFormatForSymbol(e ? .symbol) ? a.MARKS_API_EMPTY_RESPONSE : await FyTrade.data.requester.sendRequest(globalConstants.dynamicUrl.data.marks, "", e)
                    } catch (e) {
                        throw "Error while getting marks"
                    }
                }
                async excahngeReqService(e) {
                    try {
                        return await FyTrade.data.requester.sendRequest(datafeed._datafeedURL, "symbol_info", e)
                    } catch (e) {
                        throw "Error while getting marks"
                    }
                }
                async fetchSymbolMasterService() {
                    try {
                        return new Promise(((e, t) => {
                            fetch(r.SYMBOL_MASTER_URL).then((e => e.arrayBuffer())).then((t => {
                                const r = new Uint8Array(t),
                                    a = pako.inflate(r);
                                let s = (new TextDecoder).decode(a);
                                s = JSON.parse(s), e(s)
                            })).catch((e => {
                                throw TradeModules.common.hawkeye("ERROR", "Unable to fetch symbol master data", e), datafeed.unzippedData = {}, t(e), "Error while fetching symbol master information: " + e
                            }))
                        }))
                    } catch (e) {
                        throw e
                    }
                }
            }, this.cdsl = new class {
                constructor() {}
                cdslIndex(e) {
                    if (e) {
                        const e = window.open("", "_blank");
                        tvWidget.closePopupsAndDialogs();
                        let a = FyTrade.edis.getReqObject();
                        FyTrade.service.cdslIndexService(a).then((function(a) {
                            var {
                                s,
                                data: o,
                                code: i
                            } = a, n = a.message ? a.message : t.orderPlacementFail.message;
                            "error" === s ? ([-201, -202, -203].includes(i) ? FyTrade.common._showNoticeToUser(t.orderPlacementFail.title, t.orderPlacementFail.body, t.OVERLAY_TYPES.error) : [-399, -156, -203].includes(i) && FyTrade.common._showNoticeToUser(t.orderPlacementFail.title, n, t.OVERLAY_TYPES.error), e.close()) : (localStorage.setItem("htmlContent", o), e.location.href = `${r.AUTH_CDSL_URL}?token_id=${token}`, e && !e.closed && void 0 !== e.closed || FyTrade.common.fy_showToaster(FyTrade.DEFINES.toaster.type.info, "Please allow popup", "To ensure you enjoy all our website's features seamlessly, please enable pop-ups for FYERS in your browser settings."))
                        })).catch((t => {
                            console.log(t), e.close()
                        }))
                    }
                }
            }, this.store = z, this.storeData = G, this.BrokerActions = v, this.symbolActions = J, this.watchlist = new class {
                constructor() {
                    this.watchlistFromResponse = {}, this.shouldWatchlistRest = !1, this.deleteid = null, this.duplicateWatchlistFound = !1, this.activeIdForDuplicateWatchlist = null, this.error_codes = [-16, -403], this.clearListFlag = !1
                }
                isPredefinedWatchlist(e) {
                    return !!e.startsWith(FyTrade.DEFINES.watchlist_predifinedStartsWith)
                }
                reLoginUser(e) {
                    this.error_codes.includes(e) && (window.location = FyTrade.DEFINES.loginUrlPath_CB + "&message=Your session was invalidated. Please relogin&message_type=-1")
                }
                async watchlist_load() {
                    try {
                        let e = this;
                        if (FyTrade.storeData.broker.watchlist.load) return;
                        await FyTrade.store.dispatch(FyTrade.BrokerActions.fetchWatchlistData());
                        let t = FyTrade.storeData.broker.watchlist.data;
                        if (void 0 === t) return;
                        if ("error" === t.s) e.reLoginUser(t.code), FyTrade.common._showNoticeToUser(FyTrade.DEFINES.watchlistLoadFail.title, FyTrade.DEFINES.watchlistLoadFail.body, FyTrade.DEFINES.OVERLAY_TYPES.error);
                        else if ("ok" === t.s)
                            if (0 == JSON.parse(FyTrade.common.getUserSettingsDataFromLocalStorage()).predefined_watchlist) {
                                let r = {};
                                Object.entries(t.watchlist).forEach((([t, a]) => {
                                    e.isPredefinedWatchlist(a.id) || (r[t] = a)
                                })), t.watchlist = r, e.addWatchlist(t)
                            } else e.addWatchlist(t)
                    } catch (e) {
                        this.reLoginUser(e.code), FyTrade.common._showNoticeToUser(FyTrade.DEFINES.watchlistLoadFail.title, FyTrade.DEFINES.watchlistLoadFail.body, FyTrade.DEFINES.OVERLAY_TYPES.error)
                    }
                }
                async addWatchlist(e) {
                    try {
                        this.getActiveWatchlistDetails(e).then((t => {
                            this.setWatchlist(t, e)
                        }))
                    } catch (e) {
                        TradeModules.common.hawkeye("ERROR", "Unable to add a new Watchlist", e)
                    }
                }
                async getActiveWatchlistDetails(e) {
                    let t = this,
                        r = "",
                        a = "",
                        s = await tvWidget.watchList(),
                        o = {
                            title: "",
                            id: ""
                        };
                    return new Promise((function(i, n) {
                        for (let s in e.watchlist)
                            if (!t.isPredefinedWatchlist(s)) {
                                if ("" == r) r = e.watchlist[s].lut;
                                else {
                                    if (!(parseInt(e.watchlist[s].lut) > parseInt(r))) continue;
                                    r = e.watchlist[s].lut
                                }
                                a = s
                            }
                        a = a || Object.keys(e.watchlist)[0], s.saveList(e.watchlist[a]), o.id = e.watchlist[a].id, o.title = e.watchlist[a].title, i(o)
                    }))
                }
                initiateAllWatchListEvents(e, t) {
                    e.onListChanged().subscribe(t, t.watchlist_changed), e.onListAdded().subscribe(t, t.watchlist_listAdded), e.onListRemoved().subscribe(t, t.watchlist_deleted), e.onListRenamed().subscribe(t, t.watchlist_renamed), e.onActiveListChanged().subscribe(t, t.watchlist_activeChanged), tvWidget.activeChart().onSymbolChanged().subscribe(window.FyTrade, FyTrade.titileSubscription)
                }
                async setWatchlist(e, t) {
                    try {
                        let o = this,
                            i = null,
                            n = await tvWidget.watchList();
                        for (var r in n.deleteList(n.getActiveListId()), t.watchlist) FyTrade.DEFINES.allWatchlists[t.watchlist[r].id] = t.watchlist[r], t.watchlist[r].id !== o.deleteid && n.saveList(t.watchlist[r]);
                        null !== e.id && (FyTrade.DEFINES.allWatchlists[e.id] ? .symbols && n.updateList(e.id, FyTrade.DEFINES.allWatchlists[e.id].symbols), n.renameList(e.id, e.title), o.deleteid = e.id), FyTrade.DEFINES.watchlistMaxSize = t.wl_size;
                        var a = n.getAllLists();
                        if (null != a) {
                            for (var s in i = Math.floor(Date.now()), a) !0 !== o.isPredefinedWatchlist(s) && (a[s].lut = i);
                            n.setActiveList(e.id), FyTrade.DEFINES.watchlistSyncTime = i, o.initiateAllWatchListEvents(n, o)
                        }
                    } catch (e) {
                        TradeModules.common.hawkeye("ERROR", "error in setting watchlist", e), console.log("error in setting watchlist", e)
                    }
                }
                async watchlist_deleted(e) {
                    var t = this;
                    try {
                        if (t.duplicateWatchlistFound) {
                            t.duplicateWatchlistFound = !1;
                            let e = await tvWidget.watchList();
                            return void setTimeout((() => {
                                t.activeIdForDuplicateWatchlist && e.setActiveList(t.activeIdForDuplicateWatchlist), t.activeIdForDuplicateWatchlist = null
                            }), 0)
                        }
                        if (await tvWidget.watchList(), t.isPredefinedWatchlist(e)) return void FyTrade.common._showNoticeToUser(FyTrade.DEFINES.watchlist_cannotChangePredefined.title, FyTrade.DEFINES.watchlist_cannotChangePredefined.body, FyTrade.DEFINES.OVERLAY_TYPES.error);
                        var r, a = FyTrade.DEFINES.allWatchlists[e];
                        if (void 0 === FyTrade.DEFINES.allWatchlists[e]) return void FyTrade.common._showNoticeToUser(FyTrade.DEFINES.watchlist_deleteError.title, FyTrade.DEFINES.watchlist_deleteError.body, FyTrade.DEFINES.OVERLAY_TYPES.error);
                        r = a.title, delete FyTrade.DEFINES.allWatchlists[e], delete FyTrade.DEFINES.titleDict[e], FyTrade.DEFINES.watchlistSyncTime = 1, t.watchlist_saveToDb(r, Math.floor(Date.now()), 1, e, a.symbols)
                    } catch (e) {
                        TradeModules.common.hawkeye("ERROR", "Unable to delete the watchlist!", e)
                    }
                }
                async watchlist_listAdded(e, t) {
                    let r = this;
                    try {
                        const t = await tvWidget.watchList(),
                            a = t.getAllLists(),
                            s = a[e];
                        void 0 === FyTrade.DEFINES.allWatchlists[e] && (FyTrade.DEFINES.allWatchlists[`${e}`] = a[e]);
                        const o = r.checkForDuplicateWatchlist(a, s);
                        if (r.normalizeWatchlistTitle(s), o) return r.duplicateWatchlistFound = !0, r.activeIdForDuplicateWatchlist = t.getActiveListId(), void r.handleDuplicateWatchlist(e, s, t);
                        r.updateWatchlist(t, e, s), r.watchlist_update(e, s.symbols, s.title)
                    } catch (e) {
                        TradeModules.common.hawkeye("ERROR", "could not add watchlist", e), console.log("watchlist_listAdded : error : " + e)
                    }
                }
                checkForDuplicateWatchlist(e, t) {
                    let r = this;
                    for (const a in e)
                        if (!r.isPredefinedWatchlist(a) && e[a].title === FyTrade.DEFINES.watchlist_customStartsWith + t.title) return !0;
                    return !1
                }
                handleDuplicateWatchlist(e, t, r) {
                    FyTrade.common._showNoticeToUser(FyTrade.DEFINES.watchlist_duplicate.title, FyTrade.DEFINES.watchlist_duplicate.body, FyTrade.DEFINES.OVERLAY_TYPES.error), t.symbols = [], r.deleteList(e), FyTrade.DEFINES.duplicateWL.push(e)
                }
                normalizeWatchlistTitle(e) {
                    e.title.startsWith(FyTrade.DEFINES.watchlist_customStartsWith) || (e.title = FyTrade.DEFINES.watchlist_customStartsWith + e.title)
                }
                updateWatchlist(e, t, r) {
                    FyTrade.DEFINES.allWatchlists[t] = r, e.renameList(t, r.title)
                }
                async watchlist_renamed(e, t, r) {
                    var a = this;
                    const s = await tvWidget.watchList();
                    if (a.isPredefinedWatchlist(e)) a.watchlist_resetLastSaved(e, "", 1), FyTrade.common._showNoticeToUser(FyTrade.DEFINES.watchlist_cannotChangePredefined.title, FyTrade.DEFINES.watchlist_cannotChangePredefined.body, FyTrade.DEFINES.OVERLAY_TYPES.error);
                    else {
                        if (t.replaceAll(" ", "") === r.replaceAll(" ", "")) return;
                        s.renameList(e, r), a.watchlist_update(e, [], r, 1)
                    }
                }
                async watchlist_changed(e) {
                    var t = this;
                    try {
                        let s = await tvWidget.watchList();
                        e = s.getActiveListId();
                        var r = s.getList(e);
                        if (0 === r.length && (t.clearListFlag = !0), void 0 === FyTrade.DEFINES.allWatchlists[e] && (FyTrade.DEFINES.allWatchlists[`${e}`] = FyTrade.DEFINES.allWatchlists[e]), t.isPredefinedWatchlist(e)) return void(r.length !== FyTrade.DEFINES.allWatchlists[e].symbols.length && setTimeout((function() {
                            t.watchlist_resetLastSaved(e, 1), FyTrade.common._showNoticeToUser(FyTrade.DEFINES.watchlist_cannotChangePredefined.title, FyTrade.DEFINES.watchlist_cannotChangePredefined.body, FyTrade.DEFINES.OVERLAY_TYPES.error)
                        }), 100));
                        for (var a = 0; a < FyTrade.DEFINES.duplicateWL.length; a++)
                            if (FyTrade.DEFINES.duplicateWL[a] == e) return t.watchlist_resetLastSaved(e, 1), void FyTrade.common._showNoticeToUser(FyTrade.DEFINES.watchlist_duplicate.title, FyTrade.DEFINES.watchlist_duplicate.body, FyTrade.DEFINES.OVERLAY_TYPES.error);
                        return r.length > FyTrade.DEFINES.watchlistMaxSize ? (t.watchlist_resetLastSaved(e, 1), void FyTrade.common._showNoticeToUser(FyTrade.DEFINES.watchlist_maxSizeReached.title, FyTrade.DEFINES.watchlist_maxSizeReached.body, FyTrade.DEFINES.OVERLAY_TYPES.error)) : (void 0 === (r.length > 0 ? await FyTrade.common.checkIfSymbolsAreValid(r[r.length - 1]) : await FyTrade.common.checkIfSymbolsAreValid(r[0])) && (r = r.slice(0, r.length - 1), this.shouldWatchlistRest = !0), void t.watchlist_update(e, r, "", 1))
                    } catch (e) {
                        TradeModules.common.hawkeye("ERROR", "watchlist_changed", e), console.log("watchlist_changed : error : " + e)
                    }
                }
                async watchlist_activeChanged(e) {
                    try {
                        let r = await tvWidget.watchList();
                        if (void 0 === e && (e = r.getActiveListId()), void 0 === FyTrade.DEFINES.allWatchlists[e]) {
                            var t = r.getAllLists()[e];
                            FyTrade.DEFINES.allWatchlists[e] = t, FyTrade.DEFINES.titleDict[e] = t.title
                        }
                    } catch (t) {
                        TradeModules.common.hawkeye("ERROR", "watchlist_activeChanged", t), console.log("watchlist_activeChanged : error : " + e + " : " + t)
                    }
                }
                async watchlist_resetLastSaved(e, t = "", r = "") {
                    let a = this;
                    try {
                        let o = await tvWidget.watchList();
                        var s = FyTrade.DEFINES.allWatchlists[e];
                        "" !== t && (o.onListChanged().unsubscribe(a, a.watchlist_changed), setTimeout((function() {
                            t.length ? o.updateList(e, t) : o.updateList(e, s.symbols), o.onListChanged().subscribe(a, a.watchlist_changed)
                        }), 500)), "" !== r && (o.onListRenamed().unsubscribe(a, a.watchlist_renamed), setTimeout((function() {
                            o.renameList(e, s.title.trim()), o.onListRenamed().subscribe(a, a.watchlist_renamed)
                        }), 1e3))
                    } catch (t) {
                        TradeModules.common.hawkeye("ERROR", "watchlist_resetLastSaved", t), console.log("watchlist_resetLastSaved : error : " + e + " : " + t)
                    }
                }
                handleWatchlistDeleteService(e, t) {
                    let a = this;
                    try {
                        FyTrade.service.deleteOrderService(r.wlVoyager, e).catch((function(e) {
                            a.reLoginUser(e.code), FyTrade.common._showNoticeToUser(FyTrade.DEFINES.watchlistSaveFail.title, FyTrade.DEFINES.watchlistSaveFail.body, FyTrade.DEFINES.OVERLAY_TYPES.error)
                        })).then((function(e) {
                            void 0 !== e && ("ok" === e.s ? FyTrade.DEFINES.watchlistSyncTime = t : (a.reLoginUser(e.code), FyTrade.common._showNoticeToUser(FyTrade.DEFINES.watchlistSaveFail.title, FyTrade.DEFINES.watchlistSaveFail.body, FyTrade.DEFINES.OVERLAY_TYPES.error)))
                        }))
                    } catch (e) {
                        TradeModules.common.hawkeye("ERROR", "handleWatchlistDeleteService", e), a.reLoginUser(e.code), FyTrade.common._showNoticeToUser(FyTrade.DEFINES.watchlistSaveFail.title, FyTrade.DEFINES.watchlistSaveFail.body, FyTrade.DEFINES.OVERLAY_TYPES.error)
                    }
                }
                handleWatchlistPostService(e, a, s, o) {
                    let i = this;
                    FyTrade.service.postOrderService(r.wlVoyager, e).catch((function(e) {
                        i.reLoginUser(e.code), FyTrade.common._showNoticeToUser(FyTrade.DEFINES.watchlistSaveFail.title, FyTrade.DEFINES.watchlistSaveFail.body, FyTrade.DEFINES.OVERLAY_TYPES.error)
                    })).then((function(e) {
                        void 0 !== e && ("ok" === e.s ? (FyTrade.DEFINES.watchlistSyncTime = o, i.shouldWatchlistRest && i.watchlist_resetLastSaved(a, s), i.shouldWatchlistRest = !1) : e ? .message === t.watchlistMaxScriptLengthError ? FyTrade.common._showNoticeToUser(FyTrade.DEFINES.watchlistSaveFail.title, FyTrade.DEFINES.watchlistMaxScriptLengthError, FyTrade.DEFINES.OVERLAY_TYPES.error) : (i.reLoginUser(e.code), FyTrade.common._showNoticeToUser(FyTrade.DEFINES.watchlistSaveFail.title, FyTrade.DEFINES.watchlistSaveFail.body, FyTrade.DEFINES.OVERLAY_TYPES.error)))
                    }))
                }
                watchlist_saveToDb(e, t, r = 0, a, s) {
                    var o = this;
                    try {
                        let i = {
                            watchlist: e,
                            lut: t,
                            clear_list: o.clearListFlag
                        };
                        o.clearListFlag = !1, 1 === r ? o.handleWatchlistDeleteService(i, t) : o.handleWatchlistPostService(i, a, s, t)
                    } catch (e) {
                        TradeModules.common.hawkeye("ERROR", "watchlist_saveToDb", e), console.log("watchlist_saveToDb : error : " + e)
                    }
                }
                async watchlist_update(e, r = [], a = "", s = 0) {
                    var o = "";
                    try {
                        let n = await tvWidget.watchList();
                        0 !== s && (FyTrade.DEFINES.allWatchlists[e].lut = Math.floor(Date.now())), r !== [] && (FyTrade.DEFINES.allWatchlists[e].symbols = r), "" !== a && (o = FyTrade.DEFINES.allWatchlists[e].title, FyTrade.DEFINES.allWatchlists[e].title = a);
                        var i = n.getAllLists()[e];
                        const l = i.symbols;
                        let d = {},
                            c = [],
                            u = [];
                        if (l && l.length) {
                            for (let e = 0; e < l.length; e++) {
                                const t = l[e].trim();
                                await FyTrade.common.checkIfSymbolsAreValid(t) ? c.push(t) : u.push(t)
                            }
                            if (u.length) {
                                const e = FyTrade.helper.invalidSymbolsName(u, 5, 20),
                                    r = u.length;
                                if (1 === r) FyTrade.common._showNoticeToUser(FyTrade.DEFINES.invalidSymbolRequest.title, `${e.join(", ")}${t.toaster.importWatchlistError.singleScript}`, FyTrade.DEFINES.OVERLAY_TYPES.error);
                                else if (r <= 5) FyTrade.common._showNoticeToUser(FyTrade.DEFINES.invalidSymbolRequest.title, `${e.join(", ")} ${t.toaster.importWatchlistError.multipleScript}`, FyTrade.DEFINES.OVERLAY_TYPES.error);
                                else {
                                    const a = r - e.length;
                                    FyTrade.common._showNoticeToUser(FyTrade.DEFINES.invalidSymbolRequest.title, `${e.join(", ")} + ${a} ${t.toaster.importWatchlistError.multipleScript}`, FyTrade.DEFINES.OVERLAY_TYPES.error)
                                }
                                this.shouldWatchlistRest = !0
                            }
                        }
                        i.lut = Math.floor(Date.now()), i.symbols = c, d[i.title] = i, d.old_title = o, this.watchlist_saveToDb(d, Math.floor(Date.now()), 0, e, i.symbols)
                    } catch (e) {
                        TradeModules.common.hawkeye("ERROR", "watchlist_update", e), console.log(e)
                    }
                }
            }, this.symbolStorage = new class {
                constructor() {
                    this.exchangesList = ["NSE"], this.symbolsInfo = {}, this.symbolsList = []
                }
                searchSymbols(e, t, r, a) {
                    return datafeed._symbolsStorage._readyPromise.then((function() {
                        var s = [],
                            o = 0 === e.length;
                        e = e.toUpperCase();
                        for (var i = function(a) {
                                var i = datafeed._symbolsStorage.symbolsInfo[a];
                                if (void 0 === i) return "continue";
                                if (r.length > 0 && i.type !== r) return "continue";
                                if (t && t.length > 0 && i.exchange !== t) return "continue";
                                var n = i.name.toUpperCase().indexOf(e),
                                    l = i.description.toUpperCase().indexOf(e);
                                if ((o || n >= 0 || l >= 0) && !s.some((function(e) {
                                        return e.symbolInfo === i
                                    }))) {
                                    var d = n >= 0 ? n : 8e3 + l;
                                    s.push({
                                        symbolInfo: i,
                                        weight: d
                                    })
                                }
                            }, n = 0, l = datafeed._symbolsStorage.symbolsList; n < l.length; n++) i(l[n]);
                        var d = s.sort((function(e, t) {
                            return e.weight - t.weight
                        })).slice(0, a).map((function(e) {
                            var t = e.symbolInfo;
                            return {
                                symbol: t.name,
                                full_name: t.full_name,
                                description: t.description,
                                exchange: t.exchange,
                                params: [],
                                type: t.type,
                                ticker: t.name
                            }
                        }));
                        return Promise.resolve(d)
                    }))
                }
                resolveSymbol(e) {
                    return datafeed._symbolsStorage._readyPromise.then((function() {
                        var t = datafeed._symbolsStorage._symbolsInfo[e];
                        return void 0 === t ? Promise.reject("invalid symbol") : Promise.resolve(t)
                    }))
                }
            }, this.helper = new s, this.edis = new j, this.unzippedData = G.symbol.unzippedData, this.symbolData = {}, this.isLoggingEnabled = !1, this.isHSMConnectionActive = !1
        }
        placeOrder(e, t) {
            return this.place.placeOrder(e, t)
        }
        cancelOrder(e, t) {
            return this.cancel.cancelOrder(e, t)
        }
        modifyOrder(e, t) {
            return this.modify.modifyOrder(e, t)
        }
        reversePosition(e, t) {
            return this.positionAction.reversePosition(e, t)
        }
        exitPositionServer(e) {
            return this.positionAction.exitPositionServer(e)
        }
        callPositionConversionFunc(e) {
            return this.positionAction.callPositionConversionFunc(e)
        }
        closePosition(e) {
            return this.positionAction.closePosition(e)
        }
        accountManagerInfo() {
            return this.accountManager.accountManagerInfo()
        }
        _updateTradingDetails(e = !1, t = !1) {
            return this.socket._updateTradingDetails(e, t)
        }
        openOrderWsSock() {
            this.socket.openOrderWsSock()
        }
        connectToWS() {
            this.teli.connectToHSM()
        }
        parseJWT(e) {
            return this.common.parseJWT(e)
        }
        reconnectToWS() {
            this.teli.reconnectToHSM()
        }
        getQuotes(e) {
            return this.data.quotes.getQuotes(e)
        }
        subscribeQuotesRtData(e, t, r, a) {
            this.data.quoteSupplier.subscribeQuotes(e, t, r, a)
        }
        unsubscribeQuotesRtData(e) {
            this.data.quoteSupplier.unsubscribeQuotes(e)
        }
        updateQuotes() {
            this.data.quoteSupplier._updateQuotes()
        }
        getHistoryBars(e, t, r, a) {
            return this.data.historyProvider.getBars(e, t, r, a)
        }
        searchSymbols(e, t, r, a) {
            this.symbolClass.searchSymbols(e, t, r, a)
        }
        resolveSymbol(e, t, r) {
            this.symbolClass.resolveSymbol(e, t, r)
        }
        getMarks(e, t, r, a, s) {
            return this.symbolClass.getMarks(e, t, r, a, s)
        }
        subscribeBars(e, t, r, a) {
            this.data.dataPulseProvider.subscribeBars(e, t, r, a)
        }
        unsubscribeBars(e) {
            this.data.dataPulseProvider.unsubscribeBars(e)
        }
        subscribeDepth(e, t) {
            return this.data.quoteSupplier.subscribeL2(e, t)
        }
        unsubscribeDepth(e) {
            this.data.quoteSupplier.unSubscribeL2(e)
        }
        watchlist_load(e, t) {
            this.watchlist.watchlist_load(e, t)
        }
        getSymbolInfo(e) {
            return this.helpers.getSymbolInfo(e)
        }
        getSymbolInfoBroker(e) {
            return this.brokerHelper.getSymbolInfoBroker(e)
        }
        symbolDataFromURL(e, t) {
            return this.symbolClass.symbolDataFromURL(e, t)
        }
        titileSubscription(e) {
            this.data.quoteSupplier.titleSymbolSubscribeFunc(e)
        }
        displayEdisWindow() {
            this.edis.displayEdisWindow()
        }
        postOrderHandle(e, t) {
            this.place.postOrderHandler(e, t)
        }
    }
    return window.FyersTrade = new Z, window.FyTrade = new Z, e
})()));