import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

const HomePage = lazy(() => import('../pages/Homepage'));

export const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Suspense>
    );
};