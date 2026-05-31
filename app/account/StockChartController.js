import ApexCharts from 'apexcharts'      
      import {  ApexStock as apexstock } from 'apexstock'
      // Modified StockChartController class with consistent data generation
export class StockChartController {

      constructor(ApexCharts, ApexStock) {
            this.ApexCharts = ApexCharts;
            this.ApexStock = ApexStock ?? apexstock ;
            this.stockChart = null;
            // rest unchanged
          this.stockChart = null;
          this.currentPeriod = "1Y";
          this.currentInterval = "1day";
          this.isLoading = false;
          this.isFirstLoad = true;
          this.historicalData = {};
          this.allData = [];
          this.masterData = null; // Master dataset for consistent generation
          this.firstDataTimestamp = null;
          this.lastDataTimestamp = null;
          this.customDateRange = {
            start: null,
            end: null,
          };

          // Bind methods to maintain 'this' context
          this.initChart = this.initChart.bind(this);
          this.handlePeriodChange = this.handlePeriodChange.bind(this);
          this.handleIntervalChange = this.handleIntervalChange.bind(this);
          this.fetchData = this.fetchData.bind(this);
          this.updateChart = this.updateChart.bind(this);
          this.toggleLoadingIndicator = this.toggleLoadingIndicator.bind(this);
          this.handleCustomDateRange = this.handleCustomDateRange.bind(this);
          this.applyCustomDateRange = this.applyCustomDateRange.bind(this);
          this.generateMasterDataset = this.generateMasterDataset.bind(this);
          this.extractDataForPeriod = this.extractDataForPeriod.bind(this);

          // Initialize UI event listeners
          this.initEventListeners();
     }
      /*  constructor() {
          this.stockChart = null;
          this.currentPeriod = "1Y";
          this.currentInterval = "1day";
          this.isLoading = false;
          this.isFirstLoad = true;
          this.historicalData = {};
          this.allData = [];
          this.masterData = null; // Master dataset for consistent generation
          this.firstDataTimestamp = null;
          this.lastDataTimestamp = null;
          this.customDateRange = {
            start: null,
            end: null,
          };

          // Bind methods to maintain 'this' context
          this.initChart = this.initChart.bind(this);
          this.handlePeriodChange = this.handlePeriodChange.bind(this);
          this.handleIntervalChange = this.handleIntervalChange.bind(this);
          this.fetchData = this.fetchData.bind(this);
          this.updateChart = this.updateChart.bind(this);
          this.toggleLoadingIndicator = this.toggleLoadingIndicator.bind(this);
          this.handleCustomDateRange = this.handleCustomDateRange.bind(this);
          this.applyCustomDateRange = this.applyCustomDateRange.bind(this);
          this.generateMasterDataset = this.generateMasterDataset.bind(this);
          this.extractDataForPeriod = this.extractDataForPeriod.bind(this);

          // Initialize UI event listeners
          this.initEventListeners();
        }
     */
        // Initialize all event listeners
        initEventListeners() {
          // Period button listeners
          document
            .querySelectorAll("#time-period-btns .time-btn")
            .forEach((btn) => {
              btn.addEventListener("click", () => {
                this.handlePeriodChange(btn.dataset.period);
              });
            });

          // Interval dropdown change
          document
            .getElementById("interval-select")
            .addEventListener("change", (e) => {
              this.handleIntervalChange(e.target.value);
            });

          // Custom date range
          document
            .getElementById("apply-range")
            .addEventListener("click", this.applyCustomDateRange);

          // Theme toggle
          document
            .getElementById("theme-toggle")
            .addEventListener("click", function () {
              document.body.classList.toggle("dark-mode");
              const isDarkMode = document.body.classList.contains("dark-mode");

              // Update chart theme
              if (
                window.stockChartController &&
                window.stockChartController.stockChart
              ) {
                window.stockChartController.stockChart.update({
                  theme: {
                    mode: isDarkMode ? "dark" : "light",
                  },
                });
              }

              // Update theme toggle icon
              this.innerHTML = "";
              const svg = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg"
              );
              svg.setAttribute("width", "24");
              svg.setAttribute("height", "24");
              svg.setAttribute("viewBox", "0 0 24 24");
              svg.setAttribute("fill", "none");
              svg.setAttribute("stroke", "currentColor");
              svg.setAttribute("stroke-width", "2");
              svg.setAttribute("stroke-linecap", "round");
              svg.setAttribute("stroke-linejoin", "round");

              if (isDarkMode) {
                // Sun icon for light mode toggle
                const sunPath = document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  "path"
                );
                sunPath.setAttribute(
                  "d",
                  "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                );
                const circle = document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  "circle"
                );
                circle.setAttribute("cx", "12");
                circle.setAttribute("cy", "12");
                circle.setAttribute("r", "5");
                svg.appendChild(sunPath);
                svg.appendChild(circle);
              } else {
                // Moon icon for dark mode toggle
                const moonPath = document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  "path"
                );
                moonPath.setAttribute(
                  "d",
                  "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                );
                svg.appendChild(moonPath);
              }

              this.appendChild(svg);
              this.setAttribute(
                "aria-label",
                isDarkMode ? "Toggle Light Mode" : "Toggle Dark Mode"
              );
            });
        }

        // Initialize the chart with default settings
        initChart() {
          // Generate the master dataset once with consistent data
          this.generateMasterDataset();

          // Get initial data slice for the current period
          this.allData = this.extractDataForPeriod(
            this.currentPeriod,
            this.currentInterval
          );

          // Store first and last timestamp for range management
          this.firstDataTimestamp = new Date(this.allData[0].x).getTime();
          this.lastDataTimestamp = new Date(
            this.allData[this.allData.length - 1].x
          ).getTime();

          // Set up chart options
          const chartOptions = {
            chart: {
              height: 400,
            },
            series: [
              {
                data: this.allData,
              },
            ],
            plotOptions: {},
            xaxis: {
              type: "category",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            theme: {
              mode: document.body.classList.contains("dark-mode")
                ? "dark"
                : "light",
            },
            drawingTools: {
              line: true,
              brush: true,
              highlighter: true,
              rectangle: true,
              ellipse: true,
              circle: true,
              text: true,
              pin: true,
            },
          };

          // Initialize ApexStock chart
          this.stockChart = new this.ApexStock(
            document.querySelector("#chart"),
            chartOptions
          );

          // Render the chart
          this.stockChart.render();

          // Set initial date range for custom picker
          const endDate = new Date();
          const startDate = new Date();
          startDate.setDate(startDate.getDate() - 30);

          document.getElementById("start-date").value =
            this.formatDateForInput(startDate);
          document.getElementById("end-date").value =
            this.formatDateForInput(endDate);

          this.isFirstLoad = false;
        }

        // Format date for date input field
        formatDateForInput(date) {
          return date.toISOString().split("T")[0];
        }

        // Handle period button clicks
        handlePeriodChange(period) {
          // Update button states
          document
            .querySelectorAll("#time-period-btns .time-btn")
            .forEach((btn) => {
              btn.classList.toggle("active", btn.dataset.period === period);
            });

          this.currentPeriod = period;

          // Show/hide custom date range inputs
          const dateRangeContainer = document.getElementById(
            "date-range-container"
          );
          dateRangeContainer.style.display =
            period === "custom" ? "flex" : "none";

          // If not custom, fetch appropriate data
          if (period !== "custom") {
            // Auto-adjust interval based on selected period
            this.autoSelectInterval(period);
            this.fetchData(period, this.currentInterval);
          }
        }

        // Auto-select appropriate interval based on time period
        autoSelectInterval(period) {
          const intervalSelect = document.getElementById("interval-select");

          switch (period) {
            case "1D":
              intervalSelect.value = "15min"; // 1D should have 15min interval
              break;
            case "5D":
              intervalSelect.value = "1hour"; // 5D should have 1H interval
              break;
            case "1M":
              intervalSelect.value = "4hour"; // 1M should have 4H interval
              break;
            case "3M":
            case "6M":
              intervalSelect.value = "1day"; // 3M and 6M should have 1D interval
              break;
            case "1Y":
              intervalSelect.value = "1day";
              break;
            case "5Y":
            case "ALL":
              intervalSelect.value = "1week";
              break;
            default:
              intervalSelect.value = "1day";
          }

          this.currentInterval = intervalSelect.value;
        }

        // Handle interval dropdown changes
        handleIntervalChange(interval) {
          this.currentInterval = interval;

          // Refetch data with new interval if not in custom mode
          if (this.currentPeriod !== "custom") {
            this.fetchData(this.currentPeriod, interval);
          }
        }

        // Handle custom date range
        handleCustomDateRange() {
          const startDate = document.getElementById("start-date").value;
          const endDate = document.getElementById("end-date").value;

          this.customDateRange.start = startDate;
          this.customDateRange.end = endDate;
        }

        // Apply custom date range
        applyCustomDateRange() {
          const startDate = document.getElementById("start-date").value;
          const endDate = document.getElementById("end-date").value;

          if (!startDate || !endDate) {
            alert("Please select both start and end dates");
            return;
          }

          this.customDateRange.start = startDate;
          this.customDateRange.end = endDate;

          // Fetch data for custom range
          this.fetchData("custom", this.currentInterval);
        }

        // Generate the master dataset that will serve as the source for all time periods
        generateMasterDataset() {
          if (this.masterData) return; // Only generate once

          // Generate a large dataset covering the maximum possible range (10 years with daily data)
          const tenYearsAgo = new Date();
          tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
          const now = new Date();

          // Define parameters for data generation
          let baseDate = tenYearsAgo.getTime();
          const endDate = now.getTime();
          const timeRange = endDate - baseDate;

          // Generate daily data for the entire 10-year period
          // We'll use approx 2500 trading days (10 years x ~250 trading days per year)
          const count = 2500;
          const data = [];

          // Start with a fixed seed price
          let price = 100;
          const volMin = 6000;
          const volMax = 900000;

          for (let i = 0; i < count; i++) {
            // Calculate position for evenly distributed timestamps
            const position = i / (count - 1);
            const timestamp = baseDate + position * timeRange;
            const currentDate = new Date(timestamp);

            // Skip weekends (consistent with real market data)
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) {
              continue;
            }

            // Use fixed volatility for ALL points in the master dataset
            // This ensures consistent price action across all time ranges
            const volatilityFactor = 2.0;
            const change = (Math.random() - 0.5) * volatilityFactor;
            const open = price;
            const close = price + change;
            const high =
              Math.max(open, close) + Math.random() * (volatilityFactor / 2);
            const low =
              Math.min(open, close) - Math.random() * (volatilityFactor / 2);

            // Generate volume
            const volumeFactor = (Math.abs(change) / volatilityFactor) * 3;
            const volumeVariance = Math.random() * 0.5 + 0.5; // 0.5 to 1.0
            const volume = Math.floor(
              volMin + (volMax - volMin) * volumeFactor * volumeVariance
            );

            data.push({
              x: new Date(currentDate).toString(),
              y: [
                Number(open.toFixed(2)),
                Number(high.toFixed(2)),
                Number(low.toFixed(2)),
                Number(close.toFixed(2)),
              ],
              v: volume,
            });

            // Update price for next data point
            price = close;
          }

          this.masterData = data;
        }

        // Extract data for a specific period from the master dataset
        extractDataForPeriod(period, interval) {
          if (!this.masterData) {
            this.generateMasterDataset();
          }

          // Get the base date for the period
          const baseDate = this.getBaseDateForPeriod(period);
          const now = new Date().getTime();

          // Filter the master data to include only points within the requested time range
          let filteredData = this.masterData.filter((point) => {
            const pointDate = new Date(point.x).getTime();
            return pointDate >= baseDate && pointDate <= now;
          });

          // If custom period, handle differently
          if (
            period === "custom" &&
            this.customDateRange.start &&
            this.customDateRange.end
          ) {
            const startDate = new Date(this.customDateRange.start).getTime();
            const endDate = new Date(this.customDateRange.end).getTime();

            filteredData = this.masterData.filter((point) => {
              const pointDate = new Date(point.x).getTime();
              return pointDate >= startDate && pointDate <= endDate;
            });
          }

          // For intervals other than 1day, we need to adjust the data
          if (interval !== "1day") {
            // For larger intervals (weekly, monthly), aggregate data
            if (interval === "1week" || interval === "1month") {
              filteredData = this.aggregateDataForInterval(
                filteredData,
                interval
              );
            }
            // For smaller intervals (intraday), we need to generate more data points
            else if (
              ["1min", "5min", "15min", "30min", "1hour", "4hour"].includes(
                interval
              )
            ) {
              filteredData = this.expandDataForIntraday(filteredData, interval);
            }
          }

          return filteredData;
        }

        // Aggregate daily data into weekly or monthly
        aggregateDataForInterval(data, interval) {
          const result = [];

          if (interval === "1week") {
            // Group by week and aggregate
            let currentWeek = null;
            let weekData = null;

            for (const point of data) {
              const date = new Date(point.x);
              const weekStart = new Date(date);
              weekStart.setDate(date.getDate() - date.getDay() + 1); // Monday of current week

              if (!currentWeek || weekStart > currentWeek) {
                // New week
                if (weekData) {
                  result.push(weekData);
                }

                currentWeek = weekStart;
                weekData = {
                  x: weekStart.toString(),
                  y: [
                    point.y[0], // Open of first day becomes open of week
                    point.y[1], // High starts as first day's high
                    point.y[2], // Low starts as first day's low
                    point.y[3], // Close will be updated with last day's close
                  ],
                  v: point.v, // Volume will be accumulated
                };
              } else {
                // Continue same week
                weekData.y[1] = Math.max(weekData.y[1], point.y[1]); // Update high
                weekData.y[2] = Math.min(weekData.y[2], point.y[2]); // Update low
                weekData.y[3] = point.y[3]; // Update close
                weekData.v += point.v; // Accumulate volume
              }
            }

            // Add the last week
            if (weekData) {
              result.push(weekData);
            }
          } else if (interval === "1month") {
            // Group by month and aggregate
            let currentMonth = null;
            let monthData = null;

            for (const point of data) {
              const date = new Date(point.x);
              const monthStart = new Date(
                date.getFullYear(),
                date.getMonth(),
                1
              );

              if (!currentMonth || monthStart > currentMonth) {
                // New month
                if (monthData) {
                  result.push(monthData);
                }

                currentMonth = monthStart;
                monthData = {
                  x: monthStart.toString(),
                  y: [
                    point.y[0], // Open of first day becomes open of month
                    point.y[1], // High starts as first day's high
                    point.y[2], // Low starts as first day's low
                    point.y[3], // Close will be updated with last day's close
                  ],
                  v: point.v, // Volume will be accumulated
                };
              } else {
                // Continue same month
                monthData.y[1] = Math.max(monthData.y[1], point.y[1]); // Update high
                monthData.y[2] = Math.min(monthData.y[2], point.y[2]); // Update low
                monthData.y[3] = point.y[3]; // Update close
                monthData.v += point.v; // Accumulate volume
              }
            }

            // Add the last month
            if (monthData) {
              result.push(monthData);
            }
          }

          return result;
        }

        // Expand daily data into intraday data
        expandDataForIntraday(data, interval) {
          const result = [];

          // Determine number of intraday candles per day
          const candlesPerDay = {
            "1min": 390, // 6.5 hours × 60 min
            "5min": 78, // 6.5 hours × 12 intervals
            "15min": 26, // 6.5 hours × 4 intervals
            "30min": 13, // 6.5 hours × 2 intervals
            "1hour": 7, // Approximately 7 hours
            "4hour": 2, // 2 intervals per day
          }[interval];

          // Expand each daily candle into multiple intraday candles
          for (const dayCandle of data) {
            const dayDate = new Date(dayCandle.x);
            const dayOpen = dayCandle.y[0];
            const dayHigh = dayCandle.y[1];
            const dayLow = dayCandle.y[2];
            const dayClose = dayCandle.y[3];
            const dayVolume = dayCandle.v;

            const marketOpen = new Date(dayDate);
            marketOpen.setHours(9, 30, 0, 0);

            // Generate prices within the day's range
            let currentPrice = dayOpen;
            let prevPrice = dayOpen;

            for (let i = 0; i < candlesPerDay; i++) {
              const candleTime = new Date(marketOpen);

              switch (interval) {
                case "1min":
                  candleTime.setMinutes(marketOpen.getMinutes() + i);
                  break;
                case "5min":
                  candleTime.setMinutes(marketOpen.getMinutes() + i * 5);
                  break;
                case "15min":
                  candleTime.setMinutes(marketOpen.getMinutes() + i * 15);
                  break;
                case "30min":
                  candleTime.setMinutes(marketOpen.getMinutes() + i * 30);
                  break;
                case "1hour":
                  candleTime.setHours(marketOpen.getHours() + i);
                  break;
                case "4hour":
                  candleTime.setHours(marketOpen.getHours() + i * 4);
                  break;
              }

              // Skip candles outside trading hours
              const hours = candleTime.getHours();
              const minutes = candleTime.getMinutes();
              const timeInMinutes = hours * 60 + minutes;

              // Trading hours: 9:30 AM (570 minutes) to 4:00 PM (960 minutes)
              if (timeInMinutes < 570 || timeInMinutes > 960) {
                continue;
              }

              // For last candle of the day, ensure it closes at day's close
              const isLastCandle = i === candlesPerDay - 1;

              // If last candle, force close price to be day close
              if (isLastCandle) {
                currentPrice = dayClose;
              } else {
                // Generate a random price movement
                // More movement for longer intervals
                const volatilityFactor = {
                  "1min": 0.2,
                  "5min": 0.3,
                  "15min": 0.5,
                  "30min": 0.7,
                  "1hour": 1.0,
                  "4hour": 1.5,
                }[interval];

                // Random walk with drift toward day's close
                const progress = i / (candlesPerDay - 1);
                const drift = (dayClose - dayOpen) * 0.1 * progress;
                const randomComponent =
                  (Math.random() - 0.5) * volatilityFactor;
                currentPrice = prevPrice + drift + randomComponent;

                // Constrain within day's high and low
                currentPrice = Math.min(
                  Math.max(currentPrice, dayLow),
                  dayHigh
                );
              }

              const open = prevPrice;
              const close = currentPrice;
              const high = Math.max(open, close) + Math.random() * 0.1;
              const low = Math.min(open, close) - Math.random() * 0.1;

              // Constrain to day's range
              const canHigh = Math.min(high, dayHigh);
              const canLow = Math.max(low, dayLow);

              // Allocate a portion of daily volume
              const volumePortion = dayVolume / candlesPerDay;
              const volumeVariance = 0.5 + Math.random();
              const volume = Math.floor(volumePortion * volumeVariance);

              result.push({
                x: candleTime.toString(),
                y: [
                  Number(open.toFixed(2)),
                  Number(canHigh.toFixed(2)),
                  Number(canLow.toFixed(2)),
                  Number(close.toFixed(2)),
                ],
                v: volume,
              });

              prevPrice = currentPrice;
            }
          }

          return result;
        }

        // Simulate API call to fetch data
        async fetchData(period, interval) {
          this.toggleLoadingIndicator(true);

          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 800));

          try {
            // Get data from master dataset
            const newData = this.extractDataForPeriod(period, interval);

            // Cache the data
            const cacheKey = `${period}_${interval}`;
            this.historicalData[cacheKey] = newData;

            // Update the chart with new data
            this.updateChart(newData);

            // Update timestamps after data update
            if (newData.length > 0) {
              this.firstDataTimestamp = new Date(newData[0].x).getTime();
              this.lastDataTimestamp = new Date(
                newData[newData.length - 1].x
              ).getTime();
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            this.toggleLoadingIndicator(false);
          }
        }

        updateChart(newData) {
          if (!this.stockChart) return;

          this.allData = newData;

          this.stockChart.update({
            series: [
              {
                data: newData,
              },
            ],
          });
        }

        toggleLoadingIndicator(isLoading) {
          this.isLoading = isLoading;
          document.getElementById("loading-indicator").style.display = isLoading
            ? "flex"
            : "none";
        }

        // Get appropriate base date for period
        getBaseDateForPeriod(period) {
          const now = new Date();

          switch (period) {
            case "1D":
              // Today at market open (9:30 AM)
              return new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                9,
                30,
                0
              ).getTime();
            case "5D":
              // 5 trading days ago
              const fiveDaysAgo = new Date(now);
              fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 7); // Add extra days to account for weekends
              return new Date(
                fiveDaysAgo.getFullYear(),
                fiveDaysAgo.getMonth(),
                fiveDaysAgo.getDate(),
                9,
                30,
                0
              ).getTime();
            case "1M":
              // 1 month ago
              const oneMonthAgo = new Date(now);
              oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
              return oneMonthAgo.getTime();
            case "3M":
              // 3 months ago
              const threeMonthsAgo = new Date(now);
              threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
              return threeMonthsAgo.getTime();
            case "6M":
              // 6 months ago
              const sixMonthsAgo = new Date(now);
              sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
              return sixMonthsAgo.getTime();
            case "1Y":
              // 1 year ago
              const oneYearAgo = new Date(now);
              oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
              return oneYearAgo.getTime();
            case "5Y":
              // 5 years ago
              const fiveYearsAgo = new Date(now);
              fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
              return fiveYearsAgo.getTime();
            case "ALL":
              // 10 years ago (for demo purposes)
              const tenYearsAgo = new Date(now);
              tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
              return tenYearsAgo.getTime();
            default:
              // Default to 1 year ago
              const defaultDate = new Date(now);
              defaultDate.setFullYear(defaultDate.getFullYear() - 1);
              return defaultDate.getTime();
          }
        }
      }

     /* document.addEventListener("DOMContentLoaded", function () {
        window.stockChartController = new StockChartController();
        window.stockChartController.initChart();
      });*/