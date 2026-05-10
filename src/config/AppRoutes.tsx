import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

const HomePage = lazy(() => import('../pages/Homepage'));
const Layout = lazy(() => import('../components/Layout'));
const LoadingScreen = lazy(() => import('../components/LoadingScreen'));
const PageNotFound = lazy(() => import('../components/PageNotFound'));

export const AppRoutes = () => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="*" element={<PageNotFound />} />
                    <Route path="/" element={<HomePage />} />
                </Route>
            </Routes>
        </Suspense>
    );
};