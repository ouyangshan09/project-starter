/**
 * 异步请求hooks封装
*/
import { useEffect, useRef, useState } from 'react';

const InitialAnsyncState = {
    loading: true,
    result: undefined,
    error: undefined,
};

const defaultSetLoading = _asyncState = InitialAnsyncState;

const defaultSetResult = (result, _asyncState) => ({
    loading: false,
    result: result,
    error: undefined,
});

const defaultSetError = (error, _asyncState) => ({
    loading: false,
    result: undefined,
    error: error
});

const DefaultOptions = {
    initialState: () => InitialAnsyncState,
    executeOnMount: true,
    executeOnUpdate: true,
    setLoading: defaultSetLoading,
    setResult: defaultSetResult,
    setError: defaultSetError,
};

const normalizeOptions = options => ({
    ...DefaultOptions,
    ...options,
});

const useAsyncState = options => {
    const [value, setValue] = useState(options.initialState());
    return {
        value,
        set: setValue,
        setLoading: () => setValue(options.setLoading(value)),
        setResult: result => setValue(options.setResult(result, value)),
        setError: error => setValue(options.setError(error, value)),
    }
}

const useIsMounted = () => {
    const ref = useRef(false);

    useEffect(() => {
        ref.current = true;
        return () => {
            ref.current = false;
        }
    }, []);

    return () => ref.current;
}

const useAsyncPromise = () => {
    const ref = useRef(null);
    return {
        set: promise => (ref.current = promise),
        get: () => ref.current,
        is: promise => ref.current === promise,
    }
}

/**
 * @param {Function} asyncFunction 异步方法
 * @param {array} params 异步参数数组
 * @param {object} [options] 配置
*/
const useAsyncInternal = (
    asyncFunction,
    params,
    options
) => {
    const normalizedOptions = normalizeOptions(options);

    const AsyncState = useAsyncState(normalizedOptions);

    const isMounted = useIsMounted();
    const CurrentPromise = useAsyncPromise();

    const shouldHanldePromise = (value) => isMounted() && CurrentPromise.is(value);

    const executeAsnycOperation = (...args) => {
        const promise = asyncFunction(...args);
        if (promise instanceof Promise) {
            CurrentPromise.set(promise);
            AsyncState.setLoading();
            promise.then(result => {
                if (shouldHanldePromise()) {
                    AsyncState.setResult(result);
                }
            }, error => {
                if (shouldHanldePromise()) {
                    AsyncState.setError(error);
                }
            });
            return promise;
        } else {
            const syncResult = promise;
            AsyncState.setResult(syncResult);
            return Promise.resolve(syncResult);
        }
    };

    const isMounting = !isMounted();
    useEffect(() => {
        if (isMounting) {
            normalizedOptions.executeOnMount && executeAsnycOperation(...params);
        } else {
            normalizedOptions.executeOnUpdate && executeAsnycOperation(...params);
        }
    }, params);

    return {
        ...AsyncState.value,
        set: AsyncState.set,
        execute: executeAsnycOperation,
        currentPromise: CurrentPromise.get(),
        retry: (...args) => executeAsnycOperation(...args)
    }
}

export const useAsync = (
    asyncFunction,
    params,
    options
) => {
    return useAsyncInternal(asyncFunction, params, options);
}

export const useAsyncAbortable = (
    asyncFunction,
    params,
    options
) => {
    const abortControllerRef = useRef();

    const asyncFunctionWrapper = async (...args) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        try {
            return await asyncFunction(abortController.signal, ...args);
        } catch (e) {
            console.error('useReqeust hooks error:', e);
        } finally {
            if (abortControllerRef.current === abortController) {
                abortControllerRef.current = undefined;
            }
        }
    };

    return useAsync(asyncFunctionWrapper, params, options);''
}

export const useAsyncCallback = asyncFunction => {
    return useAsyncInternal(
        asyncFunction,
        [],
        {
            executeOnMount: false,
            executeOnUpdate: false,
            initialState: () => ({
                loading: false,
                result: undefined,
                error: undefined
            })
        }
    )
}
