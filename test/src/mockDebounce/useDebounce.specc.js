// import { renderHook, RenderHookResult } from '@testing-library/react-hooks';
// import { DependencyList } from 'react';
// import useDebounce from './useDebounce';

// type UseDebounceReturn = void;

// describe('useDebounce', () => {
//     beforeAll(() => {
//         jest.useFakeTimers();
//     });

//     afterEach(() => {
//         jest.clearAllTimers();
//     });

//     afterAll(() => {
//         jest.useRealTimers();
//     });

//     it('should be defined', () => {
//         expect(useDebounce).toBeDefined();
//     });

//     const getHook = (
//         ms = 5,
//         dep: DependencyList = [],
//     ): [jest.Mock, RenderHookResult<{ delay: number; deps: DependencyList }, UseDebounceReturn>] => {
//         const spy = jest.fn();
//         return [
//             spy,
//             renderHook(({ delay = 5, deps = [] }) => useDebounce(spy, delay, deps), {
//                 initialProps: {
//                     delay: ms,
//                     deps: dep,
//                 },
//             }),
//         ];
//     };

//     it('should call passed function after given amount of time', () => {
//         const [spy] = getHook();

//         expect(spy).not.toHaveBeenCalled();
//         jest.advanceTimersByTime(5);
//         expect(spy).toHaveBeenCalledTimes(1);
//     });

//     it('should cancel function call on unmount', () => {
//         const [spy, hook] = getHook();

//         expect(spy).not.toHaveBeenCalled();
//         hook.unmount();
//         jest.advanceTimersByTime(5);
//         expect(spy).not.toHaveBeenCalled();
//     });

//     it('should reset timeout on deps change', () => {
//         const [spy, hook] = getHook(50, [5, 6]);

//         jest.advanceTimersByTime(45);
//         expect(spy).not.toHaveBeenCalled();
//         hook.rerender({ delay: 50, deps: [6, 6] });

//         jest.advanceTimersByTime(45);
//         expect(spy).not.toHaveBeenCalled();
//         jest.advanceTimersByTime(5);
//         expect(spy).toHaveBeenCalledTimes(1);
//     });
// });
