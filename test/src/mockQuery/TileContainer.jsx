// import ChartContainer from 'components/tile/ChartContainer';
// import ChartHeader from 'components/tile/ChartHeader';
// import ChartKpiDifference from 'components/tile/ChartKpiDifference';
// import { ChartMainKpi } from 'components/tile/ChartMainKpi';
// import { ChartSecondaryKpi } from 'components/tile/ChartSecondaryKpi';
// import React, { useState, useEffect, useCallback } from 'react';
// import { useQuery } from 'react-query';
// import { useSelector, shallowEqual } from 'react-redux';
// import { getUserBrandIds, getUserRestaurants, getUserToken } from 'redux/user/user';
// import {
//     getAnalyticsDateRanges,
//     getAnalyticsFilterBrandId,
//     getAnalyticsFilterRestaurantId,
//     getAnalyticsFilterTimeRange,
// } from 'redux/analyticsFilters/analyticsFilters';
// import styled from 'styled';
// import { getCumulatedCAByDate, anaylticsResquestName } from 'services/innovorder';
// import sum from 'lodash/sum';
// import { DataItem, RequestResponse } from 'services/innovorder/request.types';
// import { assertUnreachable, computeGranularityFromDateRange, DateRange } from 'util/date';
// import { AggregationType, ChartType, Dimension, Segment } from 'pages/Analytics/types';
// import Chart from 'components/tile/Chart';
// import { FormattedNumber } from 'react-intl';
// import ChartLegend from 'components/tile/ChartLegend/ChartLegend';
// import { filterRestaurantByBrandId } from 'components/filters/AnalyticsRestaurantFilter/AnalyticsRestaurantFilter';
// import { SIDE_BAR_WIDTH } from 'components/SideBar/SideBar.component';
// import max from 'lodash/max';
// import useDebounce from 'hooks/useDebounce';

// const MARGIN_WIDGET = 14;

// const WidgetContainer = styled.div`
//     margin-right: ${MARGIN_WIDGET}px;
//     margin-bottom: ${MARGIN_WIDGET}px;
// `;

// export const DEBOUNCE_DELAY = 300;

// export const removeDateAndSumValuesFromDataItem = ({ date, ...values }: DataItem): number => {
//     return sum(Object.values(values));
// };

// const mapDimensionToUnit: { [key: string]: 'currency' | undefined } = {
//     [Dimension.AVERAGE_BASKET]: `currency`,
//     [Dimension.AVERAGE_CANCELLED_BASKET]: `currency`,
//     [Dimension.CANCELLED_ORDERS_COUNT]: undefined,
//     [Dimension.CANCELLED_REVENUE]: `currency`,
//     [Dimension.ORDERS_COUNT]: undefined,
//     [Dimension.REVENUE]: `currency`,
//     [Dimension.MASS_CATERING_REVENUE]: 'currency',
//     [Dimension.AVERAGE_MASS_CATERING_BASKET]: 'currency',
//     [Dimension.ENTRANCE_FEE]: 'currency',
//     [Dimension.ENTRANCE_FEE_COUNT]: undefined,
// };

// const hasChartComparison = (chartType: ChartType): boolean => {
//     switch (chartType) {
//         case ChartType.lineChart:
//             return true;
//         case ChartType.barChart:
//         case ChartType.multiLineChart:
//             return false;
//         default:
//             return assertUnreachable(chartType);
//     }
// };

// const hasChartLegend = (chartType: ChartType): boolean => {
//     switch (chartType) {
//         case ChartType.lineChart:
//             return false;
//         case ChartType.barChart:
//         case ChartType.multiLineChart:
//             return true;
//         default:
//             return assertUnreachable(chartType);
//     }
// };

// export const sumDataItems = (dataItemArray: DataItem[]): number =>
//     Math.floor(sum(dataItemArray.map((item) => removeDateAndSumValuesFromDataItem(item))));

// export const isDateRangeDefined = ({ startDate, endDate }: DateRange): boolean => {
//     return ![startDate, endDate].includes(null);
// };

// export type TileProps = {
//     title: string;
//     dimension: Dimension;
//     chartType: ChartType;
//     segment: Segment | null;
//     queryKey?: string;
//     aggregationType: AggregationType;
// };

// const TileContainer: React.FunctionComponent<TileProps> = ({
//     title,
//     dimension,
//     segment,
//     chartType,
//     aggregationType,
//     queryKey,
// }) => {
//     // initialize component state
//     const [comparedKpi, setComparedKpi] = useState<number | undefined>();
//     const [diffPercentage, setDiffPercentage] = useState<number | undefined>();
//     const [dataSet, setDataSet] = useState<DataItem[][]>([]);
//     const [mainKpi, setMainKpi] = useState<number>(0);

//     // retrieve redux data for request
//     const token = useSelector(getUserToken);
//     const authorizedBrands = useSelector(getAnalyticsFilterBrandId, shallowEqual);
//     const userBrands = useSelector(getUserBrandIds, shallowEqual);
//     const timeRange = useSelector(getAnalyticsFilterTimeRange, shallowEqual);
//     const authorizedRestaurants = useSelector(getAnalyticsFilterRestaurantId, shallowEqual);
//     const userRestaurants = useSelector(getUserRestaurants, shallowEqual);

//     const dateRanges = useSelector(getAnalyticsDateRanges);
//     /**
//      * We merge these 2 states to avoid multiple queries
//      */
//     const [[debouncedDateRanges, timeGranularity], setDebouncedRangesAndTimeGranularity] = useState([dateRanges, 0]);

//     const memoizedSetDebouncedRangesAndTimeGranularity = useCallback(() => {
//         setDebouncedRangesAndTimeGranularity([dateRanges, computeGranularityFromDateRange(timeRange, dateRanges[0])]);
//     }, [setDebouncedRangesAndTimeGranularity, dateRanges, timeRange]);

//     useDebounce(memoizedSetDebouncedRangesAndTimeGranularity, DEBOUNCE_DELAY, [
//         memoizedSetDebouncedRangesAndTimeGranularity,
//     ]);

//     const restaurantsToQuery = authorizedRestaurants.length
//         ? authorizedRestaurants
//         : filterRestaurantByBrandId(userRestaurants ?? [], authorizedBrands).map(
//               (restaurant) => restaurant.restaurantId,
//           );

//     // prepare & fire request
//     const { data, isSuccess, isLoading, isError } = useQuery<RequestResponse>(
//         [
//             [anaylticsResquestName, queryKey],
//             {
//                 token,
//                 dateRanges: debouncedDateRanges,
//                 authorizedBrands: authorizedBrands.length ? authorizedBrands : userBrands,
//                 authorizedRestaurants: restaurantsToQuery,
//                 timeGranularity,
//                 chartType,
//                 segment,
//                 dimension,
//                 aggregationType,
//             },
//         ],
//         getCumulatedCAByDate,
//         {
//             retry: false,
//             staleTime: Infinity,
//             enabled:
//                 restaurantsToQuery.length !== 0 &&
//                 timeGranularity !== 0 &&
//                 debouncedDateRanges.every(isDateRangeDefined),
//         },
//     );

//     // compute received data
//     useEffect(() => {
//         if (data && isSuccess) {
//             const mainKpiTmp = data[0].kpi;
//             const chartDataSets = data.map(({ chartData }) => chartData);

//             setDataSet(chartDataSets);
//             setMainKpi(mainKpiTmp);

//             if (data.length > 1 && hasChartComparison(chartType)) {
//                 const comparedKpiTmp = data[1].kpi;
//                 setComparedKpi(comparedKpiTmp);
//                 if (mainKpiTmp && comparedKpiTmp) {
//                     setDiffPercentage(((comparedKpiTmp - mainKpiTmp) / comparedKpiTmp) * 100);
//                 }
//             }
//         }
//     }, [data, isSuccess, chartType]);

//     // render
//     const unit = mapDimensionToUnit[dimension];
//     // eslint-disable-next-line no-undef
//     const tileWidth = max([(window.innerWidth - SIDE_BAR_WIDTH - 3 * (MARGIN_WIDGET * 2)) / 3, 300]);
//     return (
//         <WidgetContainer>
//             <ChartContainer width={tileWidth} isLoading={isLoading} isError={isError} height={240}>
//                 <ChartHeader>{title}</ChartHeader>
//                 {hasChartLegend(chartType) && <ChartLegend />}
//                 <ChartMainKpi>
//                     <FormattedNumber
//                         style={unit} // syntax to avoid react/style-prop-object https://github.com/formatjs/formatjs/issues/785
//                         currency="EUR"
//                         minimumFractionDigits={0}
//                         value={unit ? mainKpi / 100 : mainKpi}
//                     />
//                 </ChartMainKpi>
//                 {diffPercentage && (
//                     <ChartKpiDifference isNegative={diffPercentage > 0}>
//                         {Math.abs(diffPercentage).toFixed(2)}%
//                     </ChartKpiDifference>
//                 )}
//                 {comparedKpi && (
//                     <ChartSecondaryKpi>
//                         <FormattedNumber
//                             style={unit} // syntax to avoid react/style-prop-object https://github.com/formatjs/formatjs/issues/785
//                             currency="EUR"
//                             minimumFractionDigits={0}
//                             value={unit ? comparedKpi / 100 : comparedKpi}
//                         />
//                     </ChartSecondaryKpi>
//                 )}
//                 <Chart type={chartType} data={dataSet} segment={segment} unit={unit} />
//             </ChartContainer>
//         </WidgetContainer>
//     );
// };

// export default TileContainer;
