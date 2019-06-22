import { useState } from 'react';

const useBoolean = (defaultState = false) => {
    const [state, setState] = useState(defaultState);

    return {
        state,
        turnOn: () => setState(true),
        turnOff: () => setState(false),
    };
}

export default useBoolean;
