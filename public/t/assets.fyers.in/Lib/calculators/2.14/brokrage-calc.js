(function() {
    'use strict';

    var COMMODITY_FUTURES = {
        "ALUMINI": {
            "lot_size": 1000,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "ALUMINIUM": {
            "lot_size": 5000,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "COPPER": {
            "lot_size": 2500,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "COTTONCNDY": {
            "lot_size": 48,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.00
        },
        "CRUDEOIL": {
            "lot_size": 100,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "CRUDEOILM": {
            "lot_size": 10,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "GOLD": {
            "lot_size": 100,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "GOLDGUINEA": {
            "lot_size": 1,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "GOLDM": {
            "lot_size": 10,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "GOLDPETAL": {
            "lot_size": 1,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "KAPAS": {
            "lot_size": 200,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.00
        },
        "LEAD": {
            "lot_size": 5000,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "LEADMINI": {
            "lot_size": 1000,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "MCXBULLDEX": {
            "lot_size": 50,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "MCXMETLDEX": {
            "lot_size": 50,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "MENTHAOIL": {
            "lot_size": 360,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "NATURALGAS": {
            "lot_size": 1250,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "NATGASMINI": {
            "lot_size": 250,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "NICKEL": {
            "lot_size": 1500,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "SILVER": {
            "lot_size": 30,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "SILVERM": {
            "lot_size": 5,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "SILVERMIC": {
            "lot_size": 1,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "STEELREBAR": {
            "lot_size": 5,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "ZINC": {
            "lot_size": 5000,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        },
        "ZINCMINI": {
            "lot_size": 1000,
            "exch_transaction_charge_buy": 0.000021,
            "exch_transaction_charge_sell": 0.000021,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0001
        }
    };

    var NSE_COMMODITY_FUTURES = {
        "ALUMINIUM": {
            "lot_size": 5000,
            "exch_transaction_charge_buy": 0.000001,
            "exch_transaction_charge_sell": 0.000001,
            "stt_on_buy_side": 0.0,
            "stt_on_sell_side": 0.0001,
        },
        "ALUMINIUMMINI": {
            "lot_size": 1000,
            "exch_transaction_charge_buy": 0.000001,
            "exch_transaction_charge_sell": 0.000001,
            "stt_on_buy_side": 0.0,
            "stt_on_sell_side": 0.0001,
        },
        "BRCRUDE": {
            "lot_size": 100,
            "exch_transaction_charge_buy": 0.000001,
            "exch_transaction_charge_sell": 0.000001,
            "stt_on_buy_side": 0.0,
            "stt_on_sell_side": 0.0001,
        },
        "COPPER": {
            "lot_size": 2500,
            "exch_transaction_charge_buy": 0.000001,
            "exch_transaction_charge_sell": 0.000001,
            "stt_on_buy_side": 0.0,
            "stt_on_sell_side": 0.0001,
        },
        "GOLD": {
            "lot_size": 100,
            "exch_transaction_charge_buy": 0.000001,
            "exch_transaction_charge_sell": 0.000001,
            "stt_on_buy_side": 0.0,
            "stt_on_sell_side": 0.0001,
        },
        "GOLDGUINEA": {
            "lot_size": 10,
            "exch_transaction_charge_buy": 0.000001,
            "exch_transaction_charge_sell": 0.000001,
            "stt_on_buy_side": 0.0,
            "stt_on_sell_side": 0.0001,
        },
        "GOLDM": {
            "lot_size": 10,
            "exch_transaction_charge_buy": 0.000001,
            "exch_transaction_charge_sell": 0.000001,
            "stt_on_buy_side": 0.0,
            "stt_on_sell_side": 0.0001,
        },
        "GOLD1G": {
            "lot_size": 1,
            "exch_transaction_charge_buy": 0.000001,
            "exch_transaction_charge_sell": 0.000001,
            "stt_on_buy_side": 0.0,
            "stt_on_sell_side": 0.0001,
        },
        "LEAD": {
            "lot_size": 5000,
            "exch_transaction_charge_buy": 0.000001,
            "exch_transaction_charge_sell": 0.000001,
            "stt_on_buy_side": 0.0,
            "stt_on_sell_side": 0.0001,
        },
        "LEADMINI": {
            "lot_size": 1000,
            "exch_transaction_charge_buy": 0.000001,
            "exch_transaction_charge_sell": 0.000001,
            "stt_on_buy_side": 0.0,
            "stt_on_sell_side": 0.0001,
        },
        "NATURALGAS": {
            "lot_size": 1250,
            "exch_transaction_charge_buy": 0.000001,
            "exch_transaction_charge_sell": 0.000001,
            "stt_on_buy_side": 0.0,
            "stt_on_sell_side": 0.0001,
        },
        "NATGASMINI": {
            "lot_size": 250,
            "exch_transaction_charge_buy": 0.000001,
            "exch_transaction_charge_sell": 0.000001,
            "stt_on_buy_side": 0.0,
            "stt_on_sell_side": 0.0001,
        },
        "NICKEL": {
            "lot_size": 1500,
            "exch_transaction_charge_buy": 0.000001,
            "exch_transaction_charge_sell": 0.000001,
            "stt_on_buy_side": 0.0,
            "stt_on_sell_side": 0.0001,
        },
        "SILVER": {
            "lot_size": 30,
            "exch_transaction_charge_buy": 0.000001,
            "exch_transaction_charge_sell": 0.000001,
            "stt_on_buy_side": 0.0,
            "stt_on_sell_side": 0.0001,
        },
        "SILVERM": {
            "lot_size": 5,
            "exch_transaction_charge_buy": 0.000001,
            "exch_transaction_charge_sell": 0.000001,
            "stt_on_buy_side": 0.0,
            "stt_on_sell_side": 0.0001,
        },
        "SILVERMICRO": {
            "lot_size": 1,
            "exch_transaction_charge_buy": 0.000001,
            "exch_transaction_charge_sell": 0.000001,
            "stt_on_buy_side": 0.0,
            "stt_on_sell_side": 0.0001,
        },
        "WTICRUDE": {
            "lot_size": 100,
            "exch_transaction_charge_buy": 0.000001,
            "exch_transaction_charge_sell": 0.000001,
            "stt_on_buy_side": 0.0,
            "stt_on_sell_side": 0.0001,
        },
        "WTICRUDEM": {
            "lot_size": 10,
            "exch_transaction_charge_buy": 0.000001,
            "exch_transaction_charge_sell": 0.000001,
            "stt_on_buy_side": 0.0,
            "stt_on_sell_side": 0.0001,
        },
        "ZINC": {
            "lot_size": 5000,
            "exch_transaction_charge_buy": 0.000001,
            "exch_transaction_charge_sell": 0.000001,
            "stt_on_buy_side": 0.0,
            "stt_on_sell_side": 0.0001,
        },
        "ZINCMINI": {
            "lot_size": 1000,
            "exch_transaction_charge_buy": 0.000001,
            "exch_transaction_charge_sell": 0.000001,
            "stt_on_buy_side": 0.0,
            "stt_on_sell_side": 0.0001,
        },
    };

    var COMMODITY_OPTIONS = {
        "COPPER": {
            "lot_size": 2500,
            "exch_transaction_charge_buy": 0.000418,
            "exch_transaction_charge_sell": 0.000418,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0005
        },
        "CRUDEOIL": {
            "lot_size": 100,
            "exch_transaction_charge_buy": 0.000418,
            "exch_transaction_charge_sell": 0.000418,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0005
        },
        "CRUDEOILM": {
            "lot_size": 10,
            "exch_transaction_charge_buy": 0.000418,
            "exch_transaction_charge_sell": 0.000418,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0005
        },
        "GOLD": {
            "lot_size": 100,
            "exch_transaction_charge_buy": 0.000418,
            "exch_transaction_charge_sell": 0.000418,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0005
        },
        "GOLDM": {
            "lot_size": 10,
            "exch_transaction_charge_buy": 0.000418,
            "exch_transaction_charge_sell": 0.000418,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0005
        },
        "NATURALGAS": {
            "lot_size": 1250,
            "exch_transaction_charge_buy": 0.000418,
            "exch_transaction_charge_sell": 0.000418,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0005
        },
        "NATGASMINI": {
            "lot_size": 250,
            "exch_transaction_charge_buy": 0.000418,
            "exch_transaction_charge_sell": 0.000418,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0005
        },
        "NICKEL": {
            "lot_size": 1500,
            "exch_transaction_charge_buy": 0.000418,
            "exch_transaction_charge_sell": 0.000418,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0005
        },
        "SILVER": {
            "lot_size": 30,
            "exch_transaction_charge_buy": 0.000418,
            "exch_transaction_charge_sell": 0.000418,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0005
        },
        "SILVERM": {
            "lot_size": 5,
            "exch_transaction_charge_buy": 0.000418,
            "exch_transaction_charge_sell": 0.000418,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0005
        },
        "ZINC": {
            "lot_size": 5000,
            "exch_transaction_charge_buy": 0.000418,
            "exch_transaction_charge_sell": 0.000418,
            "stt_on_buy_side": 0.00,
            "stt_on_sell_side": 0.0005
        }
    };

    var NSE_COMMODITY_OPTIONS = {
        COPPER: {
            lot_size: 2500,
            exch_transaction_charge_buy: 0.00001,
            exch_transaction_charge_sell: 0.00001,
            stt_on_buy_side: 0.0,
            stt_on_sell_side: 0.0005,
        },
        GOLD: {
            lot_size: 100,
            exch_transaction_charge_buy: 0.00001,
            exch_transaction_charge_sell: 0.00001,
            stt_on_buy_side: 0.0,
            stt_on_sell_side: 0.0005,
        },
        GOLDM: {
            lot_size: 10,
            exch_transaction_charge_buy: 0.00001,
            exch_transaction_charge_sell: 0.00001,
            stt_on_buy_side: 0.0,
            stt_on_sell_side: 0.0005,
        },
        NATURALGAS: {
            lot_size: 1250,
            exch_transaction_charge_buy: 0.00001,
            exch_transaction_charge_sell: 0.00001,
            stt_on_buy_side: 0.0,
            stt_on_sell_side: 0.0005,
        },
        SILVER: {
            lot_size: 30,
            exch_transaction_charge_buy: 0.00001,
            exch_transaction_charge_sell: 0.00001,
            stt_on_buy_side: 0.0,
            stt_on_sell_side: 0.0005,
        },
        SILVERM: {
            lot_size: 5,
            exch_transaction_charge_buy: 0.00001,
            exch_transaction_charge_sell: 0.00001,
            stt_on_buy_side: 0.0,
            stt_on_sell_side: 0.0005,
        },
        WTICRUDE: {
            lot_size: 100,
            exch_transaction_charge_buy: 0.00001,
            exch_transaction_charge_sell: 0.00001,
            stt_on_buy_side: 0.0,
            stt_on_sell_side: 0.0005,
        },
        ZINC: {
            lot_size: 5000,
            exch_transaction_charge_buy: 0.00001,
            exch_transaction_charge_sell: 0.00001,
            stt_on_buy_side: 0.0,
            stt_on_sell_side: 0.0005,
        },
    };

    var BROKERAGE_DEFINES = {
        EQUITY_INTRADAY_NSE: {
            brokerage_upper_cap: 20,
            brokerage_percentage: 0.0003,
            stt_on_buy_side: 0.0,
            stt_on_sell_side: 0.00025,
            exch_transaction_charge_buy: 0.0000297,
            exch_transaction_charge_sell: 0.0000297,
            cm_transaction_buy: 0.0,
            cm_transaction_sell: 0.0,
            gst: 0.18,
            sebi_fees: 0.000001,
            stamp_duty_buy: 0.00003,
            stamp_duty_sell: 0.0,
            nse_ipft: 0.000001,
            lot_size: 1,
        },
        EQUITY_DELIVERY_NSE: {
            brokerage_upper_cap: 20,
            brokerage_percentage: 0.003,
            stt_on_buy_side: 0.001,
            stt_on_sell_side: 0.001,
            exch_transaction_charge_buy: 0.0000297,
            exch_transaction_charge_sell: 0.0000297,
            cm_transaction_buy: 0.0,
            cm_transaction_sell: 0.0,
            gst: 0.18,
            sebi_fees: 0.000001,
            stamp_duty_buy: 0.00015,
            stamp_duty_sell: 0.0,
            nse_ipft: 0.000001,
            lot_size: 1,
        },
        EQUITY_FUTURES_NSE: {
            brokerage_upper_cap: 20,
            brokerage_percentage: 0.0003,
            stt_on_buy_side: 0.0,
            stt_on_sell_side: 0.0002,
            exch_transaction_charge_buy: 0.0000173,
            exch_transaction_charge_sell: 0.0000173,
            cm_transaction_buy: 0.000005,
            cm_transaction_sell: 0.000005,
            gst: 0.18,
            sebi_fees: 0.000001,
            stamp_duty_buy: 0.00002,
            stamp_duty_sell: 0.0,
            nse_ipft: 0.000001,
            lot_size: 1,
        },
        EQUITY_OPTIONS_NSE: {
            brokerage_upper_cap: 20,
            brokerage_percentage: 100,
            stt_on_buy_side: 0.0,
            stt_on_sell_side: 0.001,
            exch_transaction_charge_buy: 0.0003503,
            exch_transaction_charge_sell: 0.0003503,
            cm_transaction_buy: 0.00009,
            cm_transaction_sell: 0.00009,
            gst: 0.18,
            sebi_fees: 0.000001,
            stamp_duty_buy: 0.00003,
            stamp_duty_sell: 0.0,
            nse_ipft: 0.000005,
            lot_size: 1,
        },
        EQUITY_INTRADAY_BSE: {
            brokerage_upper_cap: 20,
            brokerage_percentage: 0.0003,
            stt_on_buy_side: 0.0,
            stt_on_sell_side: 0.00025,
            exch_transaction_charge_buy: 0.0000375,
            exch_transaction_charge_sell: 0.0000375,
            cm_transaction_buy: 0.0,
            cm_transaction_sell: 0.0,
            gst: 0.18,
            sebi_fees: 0.000001,
            stamp_duty_buy: 0.00003,
            stamp_duty_sell: 0.0,
            lot_size: 1,
        },
        EQUITY_DELIVERY_BSE: {
            brokerage_upper_cap: 20,
            brokerage_percentage: 0.003,
            stt_on_buy_side: 0.001,
            stt_on_sell_side: 0.001,
            exch_transaction_charge_buy: 0.0000375,
            exch_transaction_charge_sell: 0.0000375,
            cm_transaction_buy: 0.0,
            cm_transaction_sell: 0.0,
            gst: 0.18,
            sebi_fees: 0.000001,
            stamp_duty_buy: 0.00015,
            stamp_duty_sell: 0.0,
            lot_size: 1,
        },
        EQUITY_FUTURES_BSE: {
            brokerage_upper_cap: 20,
            brokerage_percentage: 0.0003,
            stt_on_buy_side: 0.0,
            stt_on_sell_side: 0.0002,
            exch_transaction_charge_buy: 0.0,
            exch_transaction_charge_sell: 0.0,
            cm_transaction_buy: 0.000005,
            cm_transaction_sell: 0.000005,
            gst: 0.18,
            sebi_fees: 0.000001,
            stamp_duty_buy: 0.00002,
            stamp_duty_sell: 0.0,
            lot_size: 1,
        },
        EQUITY_OPTIONS_BSE: {
            brokerage_upper_cap: 20,
            brokerage_percentage: 100,
            stt_on_buy_side: 0.0,
            stt_on_sell_side: 0.001,
            exch_transaction_charge_buy: 0.00005,
            exch_transaction_charge_sell: 0.00005,
            cm_transaction_buy: 0.00009,
            cm_transaction_sell: 0.00009,
            gst: 0.18,
            sebi_fees: 0.000001,
            stamp_duty_buy: 0.00003,
            stamp_duty_sell: 0.0,
            lot_size: 1,
        },
        CD_FUTURES_BSE: {
            brokerage_upper_cap: 20,
            brokerage_percentage: 0.0003,
            stt_on_buy_side: 0.0,
            stt_on_sell_side: 0.0,
            exch_transaction_charge_buy: 0.0000045,
            exch_transaction_charge_sell: 0.0000045,
            cm_transaction_buy: 0.000005,
            cm_transaction_sell: 0.000005,
            gst: 0.18,
            sebi_fees: 0.000001,
            stamp_duty_buy: 0.000001,
            stamp_duty_sell: 0.0,
            lot_size: 1000,
        },
        CD_FUTURES_NSE: {
            brokerage_upper_cap: 20,
            brokerage_percentage: 0.0003,
            stt_on_buy_side: 0.0,
            stt_on_sell_side: 0.0,
            exch_transaction_charge_buy: 0.0000035,
            exch_transaction_charge_sell: 0.0000035,
            cm_transaction_buy: 0.000005,
            cm_transaction_sell: 0.000005,
            gst: 0.18,
            nse_ipft: 0.0000005,
            sebi_fees: 0.000001,
            stamp_duty_buy: 0.000001,
            stamp_duty_sell: 0.0,
            lot_size: 1000,
        },
        CD_OPTIONS_NSE: {
            brokerage_upper_cap: 20,
            brokerage_percentage: 100,
            stt_on_buy_side: 0.0,
            stt_on_sell_side: 0.0,
            exch_transaction_charge_buy: 0.000311,
            exch_transaction_charge_sell: 0.000311,
            cm_transaction_buy: 0.00009,
            cm_transaction_sell: 0.00009,
            gst: 0.18,
            sebi_fees: 0.000001,
            stamp_duty_buy: 0.000001,
            stamp_duty_sell: 0.0,
            nse_ipft: 0.00002,
            lot_size: 1000,
        },
        CD_OPTIONS_BSE: {
            brokerage_upper_cap: 20,
            brokerage_percentage: 100,
            stt_on_buy_side: 0.0,
            stt_on_sell_side: 0.0,
            exch_transaction_charge_buy: 0.00001,
            exch_transaction_charge_sell: 0.00001,
            cm_transaction_buy: 0.000005,
            cm_transaction_sell: 0.000005,
            gst: 0.18,
            sebi_fees: 0.000001,
            stamp_duty_buy: 0.000001,
            stamp_duty_sell: 0.0,
            lot_size: 1000,
        },
        MCX_FUTURES: {
            brokerage_upper_cap: 20,
            brokerage_percentage: 0.0003,
            cm_transaction_buy: 0.000018,
            cm_transaction_sell: 0.000018,
            gst: 0.18,
            sebi_fees: 0.000001,
            stamp_duty_buy: 0.00002,
            stamp_duty_sell: 0.0,
        },
        MCX_OPTIONS: {
            brokerage_upper_cap: 20,
            brokerage_percentage: 100,
            cm_transaction_buy: 0.0005,
            cm_transaction_sell: 0.0005,
            gst: 0.18,
            sebi_fees: 0.000001,
            stamp_duty_buy: 0.00003,
            stamp_duty_sell: 0.0,
        },
        NCOM_FUTURES: {
            brokerage_upper_cap: 0,
            brokerage_percentage: 0.0003,
            stt_on_buy_side: 0.0,
            stt_on_sell_side: 0.0001,
            exch_transaction_charge_buy: 0.000001,
            exch_transaction_charge_sell: 0.000001,
            cm_transaction_buy: 0.000018,
            cm_transaction_sell: 0.000018,
            gst: 0.18,
            sebi_fees: 0.000001,
            stamp_duty_buy: 0.00002,
            stamp_duty_sell: 0.0,
        },
        NCOM_OPTIONS: {
            brokerage_upper_cap: 0,
            brokerage_percentage: 100,
            stt_on_buy_side: 0.0,
            stt_on_sell_side: 0.0005,
            exch_transaction_charge_buy: 0.00001,
            exch_transaction_charge_sell: 0.00001,
            cm_transaction_buy: 0.0005,
            cm_transaction_sell: 0.0005,
            gst: 0.18,
            sebi_fees: 0.000001,
            stamp_duty_buy: 0.00003,
            stamp_duty_sell: 0.0,
        },
    };

    var BrokerageData = function() {
        var dataFunctions = {
            0: getEquityData,
            1: getFnoData,
            2: getCurrencyData,
            3: getCommodityData,
        };

        function getData(segment, sub_segment, exchange, symbol) {
            if (symbol === void 0) symbol = null;

            var dataFunction = dataFunctions[segment];
            if (!dataFunction) {
                throw new Error(("Invalid segment value: " + segment));
            }
            return dataFunction(exchange, sub_segment, symbol);
        }

        function getEquityData(exchange, sub_segment, symbol) {
            var EQUITY_DATA_MAPPING = {
                NSE: {
                    0: "EQUITY_DELIVERY_NSE",
                    1: "EQUITY_INTRADAY_NSE",
                },
                BSE: {
                    0: "EQUITY_DELIVERY_BSE",
                    1: "EQUITY_INTRADAY_BSE",
                },
            };

            return BROKERAGE_DEFINES[EQUITY_DATA_MAPPING[exchange][sub_segment]];
        }

        function getFnoData(exchange, sub_segment, symbol) {
            var FNO_DATA_MAPPING = {
                NSE: {
                    0: "EQUITY_FUTURES_NSE",
                    1: "EQUITY_OPTIONS_NSE",
                },
                BSE: {
                    0: "EQUITY_FUTURES_BSE",
                    1: "EQUITY_OPTIONS_BSE",
                },
            };
            return BROKERAGE_DEFINES[FNO_DATA_MAPPING[exchange][sub_segment]];
        }

        function getCurrencyData(exchange, sub_segment, symbol) {
            var CURRENCY_DATA_MAPPING = {
                NSE: {
                    0: "CD_FUTURES_NSE",
                    1: "CD_OPTIONS_NSE",
                },
                BSE: {
                    0: "CD_FUTURES_BSE",
                    1: "CD_OPTIONS_BSE",
                },
            };
            return BROKERAGE_DEFINES[CURRENCY_DATA_MAPPING[exchange][sub_segment]];
        }

        function getCommodityData(exchange, sub_segment, symbol) {
            var MCX_DATA_MAPPING = {
                MCX: {
                    0: "MCX_FUTURES",
                    1: "MCX_OPTIONS",
                },
                NCOM: {
                    0: "NCOM_FUTURES",
                    1: "NCOM_OPTIONS",
                },
            };
            if (sub_segment == 0) {
                var SYMBOL =
                    exchange === "MCX" ?
                    COMMODITY_FUTURES[symbol] :
                    NSE_COMMODITY_FUTURES[symbol];
                var COMMODITY_DATA_FUTURES = Object.assign({},
                    BROKERAGE_DEFINES[MCX_DATA_MAPPING[exchange][sub_segment]],
                    SYMBOL
                );
                return COMMODITY_DATA_FUTURES;
            } else {
                var SYMBOL$1 =
                    exchange === "MCX" ?
                    COMMODITY_OPTIONS[symbol] :
                    NSE_COMMODITY_OPTIONS[symbol];
                var COMMODITY_DATA_OPTIONS = Object.assign({},
                    BROKERAGE_DEFINES[MCX_DATA_MAPPING[exchange][sub_segment]],
                    SYMBOL$1
                );
                return COMMODITY_DATA_OPTIONS;
            }
        }

        return {
            getData: getData,
        };
    };

    var BrokerageCalculator = function() {
        //Calculating Brokrage For Equity Delivery  & Intraday
        function calculate_brokrage(
            buyValue,
            sellValue,
            qtyValue,
            exchange,
            sub_segment,
            segment,
            symbol
        ) {
            var calculation_data = window.FyersCalculator.brokerData.getData(
                segment,
                sub_segment,
                exchange,
                symbol
            );
            if (calculation_data) {
                var buy_turnover = buyValue * qtyValue * calculation_data.lot_size;
                var sell_turnover = sellValue * qtyValue * calculation_data.lot_size;
                var brokerage_buy_side = Math.min(
                    calculation_data.brokerage_upper_cap,
                    buy_turnover * calculation_data.brokerage_percentage
                );
                var brokerage_sell_side = Math.min(
                    calculation_data.brokerage_upper_cap,
                    sell_turnover * calculation_data.brokerage_percentage
                );
                var stt_buy = buy_turnover * calculation_data.stt_on_buy_side;
                var stt_sell = sell_turnover * calculation_data.stt_on_sell_side;
                var exchange_transaction_buy =
                    buy_turnover * calculation_data.exch_transaction_charge_buy;
                var exchange_transaction_sell =
                    sell_turnover * calculation_data.exch_transaction_charge_sell;
                var cm_transaction_buy =
                    buy_turnover * calculation_data.cm_transaction_buy;
                var cm_transaction_sell =
                    sell_turnover * calculation_data.cm_transaction_sell;
                var sebi_buy = buy_turnover * calculation_data.sebi_fees;
                var sebi_sell = sell_turnover * calculation_data.sebi_fees;
                var ipft_buy = buy_turnover * calculation_data.nse_ipft;
                var ipft_sell = sell_turnover * calculation_data.nse_ipft;
                var gst_brokerage =
                    calculation_data.gst * (brokerage_buy_side + brokerage_sell_side);
                var gst_transaction =
                    calculation_data.gst *
                    (exchange_transaction_buy +
                        exchange_transaction_sell +
                        cm_transaction_buy +
                        cm_transaction_sell);
                var stamp_duty_buy = buy_turnover * calculation_data.stamp_duty_buy;
                var stamp_duty_sell = sell_turnover * calculation_data.stamp_duty_sell;
                var gst_sebi = calculation_data.gst * (sebi_buy + sebi_sell);
                var brokerage = brokerage_buy_side + brokerage_sell_side;
                var turnover = buy_turnover + sell_turnover;
                var exchange_transaction_charges =
                    exchange_transaction_buy +
                    exchange_transaction_sell +
                    cm_transaction_buy +
                    cm_transaction_sell;
                var gst = gst_brokerage + gst_sebi + gst_transaction;
                var stt = stt_buy + stt_sell;
                var sebi = sebi_buy + sebi_sell;
                var stamp_duty = stamp_duty_buy + stamp_duty_sell;
                var nse_ipft = ipft_buy + ipft_sell;
                if (exchange === "BSE" || exchange === "MCX" || exchange === "NCOM") {
                    nse_ipft = 0;
                }
                var total_charges =
                    brokerage +
                    exchange_transaction_charges +
                    gst +
                    sebi +
                    stt +
                    stamp_duty +
                    nse_ipft;
                var points_to_break =
                    total_charges / (qtyValue * calculation_data.lot_size);
                var net_pnl = sell_turnover - buy_turnover - total_charges;

                return {
                    turnover: isNaN(turnover) ? 0 : turnover,
                    brokerage: isNaN(brokerage) ? 0 : brokerage,
                    exchange_transaction_charges: isNaN(exchange_transaction_charges) ?
                        0 :
                        exchange_transaction_charges,
                    gst: isNaN(gst) ? 0 : gst,
                    stt: isNaN(stt) ? 0 : stt,
                    sebi: isNaN(sebi) ? 0 : sebi,
                    stamp_duty: isNaN(stamp_duty) ? 0 : stamp_duty,
                    nse_ipft: isNaN(nse_ipft) ? 0 : nse_ipft,
                    total_charges: isNaN(total_charges) ? 0 : total_charges,
                    points_to_break: isNaN(points_to_break) ? 0 : points_to_break,
                    net_pnl: isNaN(net_pnl) ? 0 : net_pnl,
                };
            }
        }
        return {
            calculate_brokrage: calculate_brokrage,
        };
    };

    var BracketOrderCoverOrder = function() {
        function calculateMargin(
            symbolCalcValues,
            calculator_data,
            stopLoss,
            premium,
            exchange,
            selectedProduct,
            qty
        ) {
            function parseValue(value) {
                return parseFloat(value) / 100;
            }
            var margin_required;
            var margin_factor = parseFloat(symbolCalcValues.margin_factor);
            var quantity = parseFloat(calculator_data.qty);
            var buy_span_exposure = parseFloat(symbolCalcValues.buy_span_exposure);
            var sell_span_exposure = parseFloat(symbolCalcValues.sell_span_exposure);
            var lot_size_qty = parseFloat(symbolCalcValues.lot_size);
            var no_of_lot_size = parseFloat(quantity / lot_size_qty);
            var actual_stop_loss = stopLoss;

            if (exchange == "NFO") {
                if (calculator_data.side == "Buy") {
                    margin_required =
                        Math.round(buy_span_exposure * no_of_lot_size * 100) / 100;
                } else if (calculator_data.side == "Sell") {
                    margin_required =
                        Math.round(sell_span_exposure * no_of_lot_size * 100) / 100;
                }
            } else if (exchange == "CDS") {
                if (calculator_data.side == "Buy") {
                    margin_required = Math.round(buy_span_exposure * quantity);
                } else if (calculator_data.side == "Sell") {
                    margin_required = Math.round(sell_span_exposure * quantity);
                }
            } else if (exchange == "MCX") {
                if (calculator_data.side == "Buy") {
                    margin_required =
                        Math.round(buy_span_exposure * no_of_lot_size * 100) / 100;
                } else if (calculator_data.side == "Sell") {
                    margin_required =
                        Math.round(sell_span_exposure * no_of_lot_size * 100) / 100;
                }
            }

            var stop_loss_min_trigger_price_value_per;

            if (selectedProduct == "OPT" && exchange == "NFO") {
                parseFloat(
                    symbolCalcValues.max_stop_loss_price_range
                );
                stop_loss_min_trigger_price_value_per = parseFloat(
                    symbolCalcValues.min_trigger_price_per
                );
            } else {
                parseValue(
                    parseFloat(symbolCalcValues.max_stop_loss_price_range)
                );
                stop_loss_min_trigger_price_value_per = parseValue(
                    parseFloat(symbolCalcValues.min_trigger_price_per)
                );
            }

            var stop_loss_range_per_qty = 0;
            var min_block_amount_per_qty =
                premium * stop_loss_min_trigger_price_value_per;

            if (calculator_data.side == "Buy") {
                stop_loss_range_per_qty = premium - actual_stop_loss;
            } else {
                if (exchange == "NFO" || exchange == "CDS" || exchange == "MCX") {
                    if (selectedProduct == "OPT") {
                        //For NFO-option, CDS options, and MCX Options calculation are unique
                        parseFloat(
                            symbolCalcValues.sell_max_stop_loss_price_range
                        );
                        stop_loss_min_trigger_price_value_per = parseFloat(
                            symbolCalcValues.sell_min_trigger_price_per
                        );
                        min_block_amount_per_qty =
                            (premium + strike_price) * stop_loss_min_trigger_price_value_per;
                    }
                }
                stop_loss_range_per_qty = actual_stop_loss - premium;
            }

            var consideration_for_margin = Math.max(
                stop_loss_range_per_qty,
                min_block_amount_per_qty
            ); //Maximum of these numbers

            var actual_value = Math.round(premium * qty * 100) / 100;
            if (exchange == "NFO" || exchange == "CDS" || exchange == "MCX") {
                if (selectedProduct == "OPT" && calculator_data.side == "Sell") {
                    actual_value = Math.round((premium + strike_price) * qty * 100) / 100;
                }
            }

            if (
                exchange == "EQUITY" &&
                exchange != "NFO" &&
                exchange != "CDS" &&
                exchange != "MCX"
            ) {
                margin_required =
                    Math.round(consideration_for_margin * margin_factor * qty * 100) / 100;
            }

            var leverage_provide =
                Math.round((actual_value / margin_required) * 100) / 100;

            if (
                exchange == "NFO" &&
                selectedProduct == "OPT" &&
                calculator_data.side == "Buy"
            ) {
                margin_required = actual_value;
            }
            leverage_provide = Math.round((actual_value / margin_required) * 100) / 100;
            calculator_data.actual_value = "Rs. " + actual_value;
            calculator_data.margin_required = "Rs. " + margin_required;
            calculator_data.leverage_provide = leverage_provide + "X";
            return calculator_data;
        }
        return {
            calculateMargin: calculateMargin
        };
    };

    var SpanCalculator = function() {
        function calculateMargin(data, updateData) {
            if (data.length === 0) {
                updateData();
            }
            var result = {
                "individual_info": "",
                "span": "",
                "expo": "",
                "total": "",
                "benefit": ""
            };
            var settings = {
                "url": "https://api-t1.fyers.in/trade/v3/spancalc",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json",
                },
                "data": JSON.stringify({
                    "data": data
                })
            };
            $.ajax(settings).done(function(response) {
                result.individual_info = response.individual_info;
                result.span = response.data.span;
                result.expo = response.data.expo;
                result.total = response.data.total;
                result.benefit = response.data.benefit;
                updateData(result);
            });

        }
        return {
            calculateMargin: calculateMargin
        };
    };

    var AverageCalculator = function() {
        function calculateAverage(
            // expects sum of all the shares buy price (no. of shares * cost of shares) and total quantity
            priceSum,
            quantitySum
        ) {
            var average = priceSum / quantitySum;
            // returns the average value of shares, 
            return {
                average: average,
            }
        }

        return {
            calculateAverage: calculateAverage
        }
    };

    var MTFCalculator = function() {
        function calculateMTF(
            stockPrice,
            yourFunds,
            tenure,
            expRet,
            leverage
        ) {
            var fyFunds = yourFunds * (leverage - 1);
            var intRate = 0.18;
            var qty = (fyFunds + yourFunds) / stockPrice;
            var intAmt = (fyFunds * intRate * tenure) / 365;
            var totalReqFunds = yourFunds + intAmt;
            var retWithDelivery = (yourFunds * (1 + expRet)) - yourFunds;
            var retWithMTF = (yourFunds + fyFunds) * expRet;

            var overallReturn = retWithMTF / retWithDelivery;
            return {
                fyFunds: fyFunds,
                intRate: intRate * 100,
                qty: qty,
                intAmt: intAmt,
                totalReqFunds: totalReqFunds,
                retWithDelivery: retWithDelivery,
                retWithMTF: retWithMTF,
                overallReturn: overallReturn,
            }
        }

        return {
            calculateMTF: calculateMTF
        }
    };

    var Formatter = function() {
        function indianCommaFormatted(num, maxDecimals) {
            var decimalToBeFixed = maxDecimals ? maxDecimals : 2;
            try {
                var res = num.toLocaleString("en-IN", {
                    minimumFractionDigits: decimalToBeFixed,
                    maximumFractionDigits: decimalToBeFixed,
                });
                return res;
            } catch (error) {
                console.log("formatter : indian_comma_format : " + error);
                // if any error occurs in formatting will return value
                return num;
            }
        }
        return {
            indianCommaFormatted: indianCommaFormatted
        };
    };

    var FyersCalculator = (function() {
        var brokerage = BrokerageCalculator();
        var bracketCoverCalc = BracketOrderCoverOrder();
        var spanCalc = SpanCalculator();
        var averageCalc = AverageCalculator();
        var brokerData = BrokerageData();
        var formatter = Formatter();
        var mtfCalc = MTFCalculator();
        return {
            brokerage: brokerage,
            bracketCoverOrder: bracketCoverCalc,
            span: spanCalc,
            averageCalc: averageCalc,
            mtfCalc: mtfCalc,
            futures: COMMODITY_FUTURES,
            options: COMMODITY_OPTIONS,
            ncom_futures: NSE_COMMODITY_FUTURES,
            ncom_options: NSE_COMMODITY_OPTIONS,
            brokerData: brokerData,
            formatter: formatter,
        };
    })();

    window.FyersCalculator = FyersCalculator;

})();