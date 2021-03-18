// import React from "react";
// import { screen } from "@testing-library/react";
// import { render } from "tests-renderer";
// import { AggregationType, ChartType, Dimension } from "pages/Analytics/types";
// import * as reactRedux from "react-redux";
// import * as reactQuery from "react-query";
// import userFactory from "redux/user/user.factory";
// import analyticsFilterFactory from "redux/analyticsFilters/analyticsFilter.factory";
// import { RootState } from "redux/store";
// import { analyticsFixtureFactory } from "services/innovorder/analytics.fixture_factory";
// import { QueryResult } from "react-query";
// import {
//   anaylticsResquestName,
//   getCumulatedCAByDate,
// } from "services/innovorder";
// import { computeGranularityFromDateRange } from "util/date";
// import TileContainer, { sumDataItems, DEBOUNCE_DELAY } from "./TileContainer";

// const defaultQueryOptions = {
//   retry: false,
//   staleTime: Infinity,
//   enabled: true,
// };

// describe("TileContainer", () => {
//   const mockedState: RootState = {
//     user: userFactory({
//       brands: [
//         { name: "brand1", brandId: 0 },
//         { name: "brand2", brandId: 1 },
//       ],
//       restaurants: [
//         { name: "restaurant1", brandId: 0, restaurantId: 0 },
//         { name: "restaurant2", brandId: 1, restaurantId: 1 },
//       ],
//     }),
//     analyticsFilters: analyticsFilterFactory({
//       brand: [],
//       restaurant: [],
//     }),
//   };

//   const data = analyticsFixtureFactory(10, 2);

//   const query = jest
//     .spyOn(reactQuery, "useQuery")
//     .mockImplementation(
//       () => ({ data, isSuccess: true } as QueryResult<unknown, unknown>)
//     );

//   beforeEach(() => {
//     jest
//       .spyOn(reactRedux, "useSelector")
//       .mockImplementation((selector) => selector(mockedState));
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it("render correcty", () => {
//     render(
//       <TileContainer
//         chartType={ChartType.lineChart}
//         title={"title"}
//         dimension={Dimension.REVENUE}
//         segment={null}
//         aggregationType={AggregationType.SUM}
//       />
//     );
//     expect(screen.getByText("title")).toBeInTheDocument();
//   });

//   it("display formated numbers", () => {
//     render(
//       <TileContainer
//         segment={null}
//         chartType={ChartType.lineChart}
//         title={"title"}
//         dimension={Dimension.REVENUE}
//         aggregationType={AggregationType.SUM}
//       />
//     );
//     const formatedNumbers = screen.queryAllByText(/FormattedNumber/);
//     expect(formatedNumbers.length).toEqual(2);
//   });

//   it("call right Dimension", () => {
//     jest.useFakeTimers();
//     render(
//       <TileContainer
//         segment={null}
//         chartType={ChartType.lineChart}
//         title={"title"}
//         dimension={Dimension.REVENUE}
//         aggregationType={AggregationType.SUM}
//       />
//     );
//     const timeGranularity = computeGranularityFromDateRange(
//       mockedState.analyticsFilters.timeRange,
//       mockedState.analyticsFilters.dateTimeRanges[0]
//     );
//     jest.advanceTimersByTime(DEBOUNCE_DELAY);
//     expect(query).toHaveBeenCalledWith(
//       [
//         [anaylticsResquestName, undefined],
//         {
//           token: mockedState.user?.accessToken,
//           dateRanges: mockedState.analyticsFilters.dateTimeRanges,
//           authorizedBrands: [0, 1, 2, 3],
//           authorizedRestaurants: [0, 1, 2, 3],
//           segment: null,
//           chartType: "lineChart",
//           dimension: "revenue",
//           timeGranularity,
//           aggregationType: AggregationType.SUM,
//         },
//       ],
//       getCumulatedCAByDate,
//       defaultQueryOptions
//     );
//     jest.clearAllTimers();
//   });

//   it("filter restaurants in query", () => {
//     const state: RootState = {
//       ...mockedState,
//       analyticsFilters: analyticsFilterFactory({
//         brand: [{ name: "b", brandId: 1 }],
//         restaurant: [],
//       }),
//     };
//     jest
//       .spyOn(reactRedux, "useSelector")
//       .mockImplementation((selector) => selector(state));
//     jest.useFakeTimers();
//     render(
//       <TileContainer
//         segment={null}
//         chartType={ChartType.lineChart}
//         title={"title"}
//         dimension={Dimension.REVENUE}
//         aggregationType={AggregationType.SUM}
//       />
//     );
//     const timeGranularity = computeGranularityFromDateRange(
//       state.analyticsFilters.timeRange,
//       mockedState.analyticsFilters.dateTimeRanges[0]
//     );
//     jest.advanceTimersByTime(DEBOUNCE_DELAY);
//     expect(query).toHaveBeenCalledWith(
//       [
//         [anaylticsResquestName, undefined],
//         {
//           token: state.user?.accessToken,
//           dateRanges: state.analyticsFilters.dateTimeRanges,
//           authorizedBrands: [1],
//           authorizedRestaurants: [1],
//           segment: null,
//           chartType: "lineChart",
//           dimension: "revenue",
//           timeGranularity,
//           aggregationType: AggregationType.SUM,
//         },
//       ],
//       getCumulatedCAByDate,
//       defaultQueryOptions
//     );
//     jest.clearAllTimers();
//   });

//   it("doesn't query if there are no restaurant selected", () => {
//     const state: RootState = {
//       user: userFactory({
//         brands: [{ name: "a", brandId: 1 }],
//         restaurants: [],
//       }),
//       analyticsFilters: analyticsFilterFactory({
//         brand: [{ name: "a", brandId: 1 }],
//         restaurant: [],
//       }),
//     };
//     jest
//       .spyOn(reactRedux, "useSelector")
//       .mockImplementation((selector) => selector(state));
//     jest.useFakeTimers();
//     render(
//       <TileContainer
//         segment={null}
//         chartType={ChartType.lineChart}
//         title={"title"}
//         dimension={Dimension.REVENUE}
//         aggregationType={AggregationType.SUM}
//       />
//     );
//     const timeGranularity = computeGranularityFromDateRange(
//       state.analyticsFilters.timeRange,
//       mockedState.analyticsFilters.dateTimeRanges[0]
//     );
//     jest.advanceTimersByTime(DEBOUNCE_DELAY);
//     expect(query).toHaveBeenCalledWith(
//       [
//         [anaylticsResquestName, undefined],
//         {
//           token: state.user?.accessToken,
//           dateRanges: state.analyticsFilters.dateTimeRanges,
//           authorizedBrands: [1],
//           authorizedRestaurants: [],
//           segment: null,
//           chartType: "lineChart",
//           dimension: "revenue",
//           timeGranularity,
//           aggregationType: AggregationType.SUM,
//         },
//       ],
//       getCumulatedCAByDate,
//       { ...defaultQueryOptions, enabled: false }
//     );
//     jest.clearAllTimers();
//   });

//   it("doesn't query if time granularity is not computed yet", () => {
//     const state: RootState = {
//       ...mockedState,
//       analyticsFilters: analyticsFilterFactory({
//         brand: [{ name: "a", brandId: 1 }],
//         restaurant: [],
//       }),
//     };
//     jest
//       .spyOn(reactRedux, "useSelector")
//       .mockImplementation((selector) => selector(state));
//     jest.useFakeTimers();
//     render(
//       <TileContainer
//         segment={null}
//         chartType={ChartType.lineChart}
//         title={"title"}
//         dimension={Dimension.REVENUE}
//         aggregationType={AggregationType.SUM}
//       />
//     );
//     jest.advanceTimersByTime(DEBOUNCE_DELAY - 1);
//     expect(query).toHaveBeenCalledWith(
//       [
//         [anaylticsResquestName, undefined],
//         {
//           token: state.user?.accessToken,
//           dateRanges: state.analyticsFilters.dateTimeRanges,
//           authorizedBrands: [1],
//           authorizedRestaurants: [1],
//           segment: null,
//           chartType: "lineChart",
//           dimension: "revenue",
//           timeGranularity: 0,
//           aggregationType: AggregationType.SUM,
//         },
//       ],
//       getCumulatedCAByDate,
//       { ...defaultQueryOptions, enabled: false }
//     );
//     jest.clearAllTimers();
//   });

//   it("debounces the query for the date ranges and time granularity", () => {
//     const state: RootState = {
//       ...mockedState,
//       analyticsFilters: analyticsFilterFactory({
//         brand: [{ name: "a", brandId: 1 }],
//         restaurant: [],
//       }),
//     };
//     jest
//       .spyOn(reactRedux, "useSelector")
//       .mockImplementation((selector) => selector(state));
//     jest.useFakeTimers();
//     render(
//       <TileContainer
//         segment={null}
//         chartType={ChartType.lineChart}
//         title={"title"}
//         dimension={Dimension.REVENUE}
//         aggregationType={AggregationType.SUM}
//       />
//     );
//     const timeGranularity = computeGranularityFromDateRange(
//       state.analyticsFilters.timeRange,
//       mockedState.analyticsFilters.dateTimeRanges[0]
//     );
//     const queryPayload = [
//       [
//         [anaylticsResquestName, undefined],
//         {
//           token: state.user?.accessToken,
//           dateRanges: state.analyticsFilters.dateTimeRanges,
//           authorizedBrands: [1],
//           authorizedRestaurants: [1],
//           segment: null,
//           chartType: "lineChart",
//           dimension: "revenue",
//           timeGranularity,
//           aggregationType: AggregationType.SUM,
//         },
//       ],
//       getCumulatedCAByDate,
//       defaultQueryOptions,
//     ];

//     jest.advanceTimersByTime(DEBOUNCE_DELAY - 1);
//     expect(query).toHaveBeenCalledTimes(2); // Initial query on mount + query when getting the state from redux
//     expect(query).not.toHaveBeenCalledWith(...queryPayload);
//     jest.advanceTimersByTime(1);
//     expect(query).toHaveBeenCalledTimes(3); // Query due to the debounce
//     expect(query).toHaveBeenCalledWith(...queryPayload);
//     jest.clearAllTimers();
//   });

//   it("Display correct Chart", () => {
//     render(
//       <TileContainer
//         segment={null}
//         chartType={ChartType.lineChart}
//         title={"title"}
//         dimension={Dimension.REVENUE}
//         aggregationType={AggregationType.SUM}
//       />
//     );
//     expect(screen.getByTestId("line-chart")).toBeInTheDocument();
//   });

//   it("Should display difference kpi", () => {
//     render(
//       <TileContainer
//         segment={null}
//         chartType={ChartType.lineChart}
//         title={"title"}
//         dimension={Dimension.REVENUE}
//         aggregationType={AggregationType.SUM}
//       />
//     );
//     expect(screen.getByTestId("trend-indicator")).toBeInTheDocument();
//   });

//   it("Should not display difference kpi if there is only one dataSet", () => {
//     const oneLineData = analyticsFixtureFactory(10, 1);
//     jest
//       .spyOn(reactQuery, "useQuery")
//       .mockImplementation(
//         () =>
//           ({ data: oneLineData, isSuccess: true } as QueryResult<
//             unknown,
//             unknown
//           >)
//       );
//     render(
//       <TileContainer
//         segment={null}
//         chartType={ChartType.lineChart}
//         title={"title"}
//         dimension={Dimension.REVENUE}
//         aggregationType={AggregationType.SUM}
//       />
//     );
//     expect(screen.queryByTestId("trend-indicator")).not.toBeInTheDocument();
//   });

//   it("Should not display difference kpi if BarChart", () => {
//     const oneLineData = analyticsFixtureFactory(10, 1);
//     jest
//       .spyOn(reactQuery, "useQuery")
//       .mockImplementation(
//         () =>
//           ({ data: oneLineData, isSuccess: true } as QueryResult<
//             unknown,
//             unknown
//           >)
//       );
//     render(
//       <TileContainer
//         segment={null}
//         chartType={ChartType.barChart}
//         title={"title"}
//         dimension={Dimension.REVENUE}
//         aggregationType={AggregationType.SUM}
//       />
//     );
//     expect(screen.queryByTestId("trend-indicator")).not.toBeInTheDocument();
//   });

//   describe("TileContainer > sumDataItems", () => {
//     const dataSet = [
//       { value: 1, date: "1" },
//       { value: 2, date: "2" },
//       { value: 3, date: "3" },
//       { value: 4, date: "4" },
//       { value: 5, date: "5" },
//       { value: 6, date: "6" },
//       { value: 7, date: "7" },
//       { value: 8, date: "8" },
//       { value: 9, date: "9" },
//     ];

//     it("should sum all values in dataset", () => {
//       const sum = sumDataItems(dataSet);
//       expect(sum).toEqual(45);
//     });
//   });
// });
