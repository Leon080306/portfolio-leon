import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

const HomePage = lazy(() => import('../pages/Homepage'));
const Layout = lazy(() => import('../components/Layout'));

export const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                </Route>
            </Routes>
        </Suspense>
    );
};