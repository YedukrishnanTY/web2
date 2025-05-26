import React from 'react';
import { Route } from 'react-router-dom';

const RouteProvider = ({ path, layout: Layout = React.Fragment, element, key, ...rest }) => {
    const WrappedElement = <Layout>{element}</Layout>;

    return (
        <Route
            key={key}
            path={path}
            element={WrappedElement}
            {...rest}
        />
    );
};

export default RouteProvider;
