"use client";
import Header from '@/components/common/pageHeader/header.component';
import { ScreenLoader } from '@/components/loader/screenLoader/loader.component';
import Menu from '@/components/listing/stockControls/menu.component';
import { useEffect } from "react";
import { GlobalState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import { SubscribePopup } from '@/components/SubscribePopup'
import TradeTickerBar from "@/components/tradeTicker/tradeTickerBar.component";
import { DocumentStyleChart }  from './components/DocumentStyleChart';
import StockCandleChart from "@/components/charts/StockCandleChart";
//import PositionSwipeHint from './PositionSwipeHint';

//import FirstLandingPage from "./virtual-account/FirstLandingPageNew";
//import SecondGetStartedPage from "./virtual-account/SecondGetStartedPageNew";

const DynamicGrid = dynamic(() => import('@/components/listing/stockGrid/grid.component'), {
  loading: () => <p>Loading...</p>,
})

/*
{
                                       children,
                                   }: {
    children: React.ReactNode
}
*/
export default function VirtualHome() {
  const searchParams = useSearchParams();

const invite = searchParams!.get("invite");

const step = searchParams!.get("step");
const router = useRouter();
  const isDarkMode = useSelector((state: GlobalState) => state.misc.isDarkMode)
    const selected = useSelector(
    (state: GlobalState) => state.stock.selectedCard
  );





  const rawTicker = selected?.ticker;
  const ticker =
  typeof rawTicker === "string"
    ? rawTicker
    : rawTicker?.symbol; // <-- adjust if needed

  /*  const symbol =
    selected?.ticker?.includes(":")
      ? selected.ticker.split(":")[1].replace("-EQ", "")
      : selected?.ticker; */
      const symbol =
  typeof ticker === "string" && ticker.includes(":")
    ? ticker.split(":")[1].replace("-EQ", "")
    : ticker;

  useEffect ( () =>{ 
      console.log("Document style chart drawing triggered ")
   /*  let chartDoc = DocumentStyleChart();
    if(chartDoc.draw  )
    {    
    
      chartDoc.draw();
    } */
  })






  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className='bg-white dark:bg-black '>
        <ScreenLoader />
        <Header />
         {/* 🔔 Ticker goes here */}
        <TradeTickerBar />
        <Menu />
        <DynamicGrid key={`grid-${isDarkMode}`} />
        
         {/* Hello world */}
                <div className="container">
                  <header>
                    <h1>Drawing Tools Demo</h1>
                    <div className="header-actions">
                    <button className="btn danger" id="enable-chart">
                        Disabled
                      </button>
                      <button className="btn danger" id="clear-all">
                        Clear All
                      </button>
                    </div>
                  </header>
                  <div className="main-content">
                    {/* Left Panel - Drawing Tools */}
                    <aside className="tools-panel">
                      {/* Trend Line Tools */}
                      <div className="tool-category" data-category="trend-line-tools">
                        <div className="tool-category-header">
                          <span>Trend Line Tools</span>
                          <span className="arrow">▼</span>
                        </div>
                        <div className="tool-subcategory">
                          <div className="tool-subcategory-header">Lines</div>
                          <div className="tool-item" data-tool="trend-line">
                            Trend Line
                          </div>
                          <div className="tool-item" data-tool="ray">
                            Ray
                          </div>
                          <div className="tool-item" data-tool="info-line">
                            Info Line
                          </div>
                          <div className="tool-item" data-tool="extended-line">
                            Extended Line
                          </div>
                          <div className="tool-item" data-tool="trend-angle">
                            Trend Angle
                          </div>
                          <div className="tool-item" data-tool="horizontal-line">
                            Horizontal Line
                          </div>
                          <div className="tool-item" data-tool="horizontal-ray">
                            Horizontal Ray
                          </div>
                          <div className="tool-item" data-tool="vertical-line">
                            Vertical Line
                          </div>
                          <div className="tool-item" data-tool="cross-line">
                            Cross Line
                          </div>
                        </div>
                        <div className="tool-subcategory">
                          <div className="tool-subcategory-header">Channels</div>
                          <div className="tool-item" data-tool="parallel-channel">
                            Parallel Channel
                          </div>
                          <div className="tool-item" data-tool="regression-trend">
                            Regression Trend
                          </div>
                          <div className="tool-item" data-tool="flat-top-bottom">
                            Flat Top/Bottom
                          </div>
                          <div className="tool-item" data-tool="disjoint-channel">
                            Disjoint Channel
                          </div>
                        </div>
                        <div className="tool-subcategory">
                          <div className="tool-subcategory-header">Pitchforks</div>
                          <div className="tool-item" data-tool="andrews-pitchfork">
                            Pitchfork
                          </div>
                          <div className="tool-item" data-tool="schiff-pitchfork">
                            Schiff Pitchfork
                          </div>
                          <div className="tool-item" data-tool="modified-schiff-pitchfork">
                            Modified Schiff
                          </div>
                          <div className="tool-item" data-tool="inside-pitchfork">
                            Inside Pitchfork
                          </div>
                        </div>
                      </div>
                      {/* Gann and Fibonacci Tools */}
                      <div className="tool-category" data-category="gann-fib-tools">
                        <div className="tool-category-header">
                          <span>Gann &amp; Fibonacci</span>
                          <span className="arrow">▼</span>
                        </div>
                        <div className="tool-subcategory">
                          <div className="tool-subcategory-header">Fibonacci</div>
                          <div className="tool-item" data-tool="fib-retracement">
                            Fib Retracement
                          </div>
                          <div className="tool-item" data-tool="fib-extension">
                            Fib Extension
                          </div>
                          <div className="tool-item" data-tool="fib-channel">
                            Fib Channel
                          </div>
                          <div className="tool-item" data-tool="fib-time-zone">
                            Fib Time Zone
                          </div>
                          <div className="tool-item" data-tool="fib-speed-fan">
                            Fib Speed Fan
                          </div>
                          <div className="tool-item" data-tool="fib-time-extension">
                            Fib Time Extension
                          </div>
                          <div className="tool-item" data-tool="fib-circles">
                            Fib Circles
                          </div>
                          <div className="tool-item" data-tool="fib-spiral">
                            Fib Spiral
                          </div>
                          <div className="tool-item" data-tool="fib-arcs">
                            Fib Arcs
                          </div>
                          <div className="tool-item" data-tool="fib-wedge">
                            Fib Wedge
                          </div>
                          <div className="tool-item" data-tool="pitchfan">
                            Pitchfan
                          </div>
                        </div>
                        <div className="tool-subcategory">
                          <div className="tool-subcategory-header">Gann</div>
                          <div className="tool-item" data-tool="gann-box">
                            Gann Box
                          </div>
                          <div className="tool-item" data-tool="gann-fan">
                            Gann Fan
                          </div>
                          <div className="tool-item" data-tool="gann-square-fixed">
                            Gann Square Fixed
                          </div>
                          <div className="tool-item" data-tool="gann-square">
                            Gann Square
                          </div>
                        </div>
                      </div>
                      {/* Forecasting and Measurement */}
                      <div className="tool-category" data-category="forecast-measure">
                        <div className="tool-category-header">
                          <span>Forecast &amp; Measure</span>
                          <span className="arrow">▼</span>
                        </div>
                        <div className="tool-subcategory">
                          <div className="tool-subcategory-header">Projection</div>
                          <div className="tool-item" data-tool="long-position">
                            Long Position
                          </div>
                          <div className="tool-item" data-tool="short-position">
                            Short Position
                          </div>
                          <div className="tool-item" data-tool="forecast">
                            Forecast
                          </div>
                          <div className="tool-item" data-tool="bars-pattern">
                            Bars Pattern
                          </div>
                          <div className="tool-item" data-tool="projection">
                            Projection
                          </div>
                        </div>
                        <div className="tool-subcategory">
                          <div className="tool-subcategory-header">Volume-Based</div>
                          <div className="tool-item disabled">Anchored VWAP</div>
                          <div className="tool-item disabled">Volume Profile</div>
                        </div>
                        <div className="tool-subcategory">
                          <div className="tool-subcategory-header">Measurer</div>
                          <div className="tool-item" data-tool="price-range">
                            Price Range
                          </div>
                          <div className="tool-item" data-tool="date-range">
                            Date Range
                          </div>
                          <div className="tool-item" data-tool="date-price-range">
                            Date &amp; Price Range
                          </div>
                        </div>
                      </div>
                      {/* Geometric Shapes */}
                      <div className="tool-category" data-category="shapes">
                        <div className="tool-category-header">
                          <span>Geometric Shapes</span>
                          <span className="arrow">▼</span>
                        </div>
                        <div className="tool-subcategory">
                          <div className="tool-subcategory-header">Brushes</div>
                          <div className="tool-item" data-tool="brush">
                            Brush
                          </div>
                          <div className="tool-item" data-tool="highlighter">
                            Highlighter
                          </div>
                        </div>
                        <div className="tool-subcategory">
                          <div className="tool-subcategory-header">Arrows</div>
                          <div className="tool-item" data-tool="arrow">
                            Arrow
                          </div>
                          <div className="tool-item" data-tool="arrow-marker">
                            Arrow Marker
                          </div>
                          <div className="tool-item" data-tool="arrow-mark-up">
                            Arrow Up
                          </div>
                          <div className="tool-item" data-tool="arrow-mark-down">
                            Arrow Down
                          </div>
                        </div>
                        <div className="tool-subcategory">
                          <div className="tool-subcategory-header">Shapes</div>
                          <div className="tool-item" data-tool="rectangle">
                            Rectangle
                          </div>
                          <div className="tool-item" data-tool="rotated-rectangle">
                            Rotated Rectangle
                          </div>
                          <div className="tool-item" data-tool="circle">
                            Circle
                          </div>
                          <div className="tool-item" data-tool="triangle">
                            Triangle
                          </div>
                          <div className="tool-item" data-tool="ellipse">
                            Ellipse
                          </div>
                          <div className="tool-item" data-tool="arc">
                            Arc
                          </div>
                          <div className="tool-item" data-tool="path">
                            Path
                          </div>
                          <div className="tool-item" data-tool="polyline">
                            Polyline
                          </div>
                          <div className="tool-item" data-tool="curve">
                            Curve
                          </div>
                          <div className="tool-item" data-tool="double-curve">
                            Double Curve
                          </div>
                        </div>
                      </div>
                      {/* Annotation Tools */}
                      <div className="tool-category" data-category="annotations">
                        <div className="tool-category-header">
                          <span>Annotation Tools</span>
                          <span className="arrow">▼</span>
                        </div>
                        <div className="tool-subcategory">
                          <div className="tool-subcategory-header">Text &amp; Notes</div>
                          <div className="tool-item" data-tool="text-annotation">
                            Text
                          </div>
                          <div className="tool-item" data-tool="callout">
                            Callout
                          </div>
                          <div className="tool-item" data-tool="anchored-text">
                            Anchored Text
                          </div>
                          <div className="tool-item" data-tool="note">
                            Note
                          </div>
                          <div className="tool-item" data-tool="price-note">
                            Price Note
                          </div>
                          <div className="tool-item" data-tool="price-label">
                            Price Label
                          </div>
                          <div className="tool-item" data-tool="flag-mark">
                            Flag Mark
                          </div>
                          <div className="tool-item" data-tool="pin">
                            Pin
                          </div>
                          <div className="tool-item" data-tool="comment">
                            Comment
                          </div>
                          <div className="tool-item" data-tool="signpost">
                            Signpost
                          </div>
                          <div className="tool-item" data-tool="table">
                            Table
                          </div>
                        </div>
                      </div>
                    </aside>
                    {/* Chart */}
                    <div className="chart-container">
                      <div id="chart" />
                        {/** <DocumentStyleChart/> */}
                       
                    </div>
                    {/* Right Panel - Active Drawings */}
                    <aside className="drawings-panel">
                      <div className="drawings-panel-header">
                        <span>Drawings</span>
                        <span id="status-count">0</span>
                      </div>
                      <div className="drawing-list" id="drawing-list">
                        <div className="empty-state">No drawings yet</div>
                      </div>
                    </aside>
                  </div>
                  <div className="status-bar">
                    <div className="status-item">
                      <label>Tool:</label>
                      <span id="status-tool">None</span>
                    </div>
                    <div className="status-item">
                      <label>State:</label>
                      <span id="status-state">Idle</span>
                    </div>
                    <div className="status-item">
                      <label>Mouse:</label>
                      <span id="status-mouse">-</span>
                    </div>
                  </div>
                </div>
                {/* Text Editor Modal */}
                <div className="text-editor-overlay" id="text-editor-overlay">
                  <div className="text-editor-modal">
                    <h3 id="text-editor-title">Edit Text</h3>
                    <textarea
                      id="text-editor-input"
                      placeholder="Enter text..."
                      defaultValue={""}
                    />
                    <div className="text-editor-hint">
                      Press Enter to save, Escape to cancel
                    </div>
                    <div className="text-editor-actions">
                      <button className="btn-cancel" id="text-editor-cancel">
                        Cancel
                      </button>
                      <button className="btn-save" id="text-editor-save">
                        Save
                      </button>
                    </div>
                  </div>
                </div>

           <SubscribePopup />
      </div>
    </div>
  )
}
