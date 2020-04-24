import React, { useContext } from "react";
import { AppContext } from "../context";
import httpClient from "../httpClient"

export default function Component() {
    const [state, dispatch] = useContext(AppContext);

    const api = new httpClient()

    const healthcheck = async () => {
        const healthcheck = await api.getHealthcheck()
        dispatch({
            type: 'HEALTHCHECK',
            payload: healthcheck
        })
    }

    return (
        <div>
            <button onClick={healthcheck}>Healthcheck</button>
            <div>{state.healthcheck}</div>
        </div>
    );
}