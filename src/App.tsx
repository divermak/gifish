import React from "react";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";

import HomePage from "pages/Home";
import NotFoundPage from "pages/NotFound";
import SearchPage from "pages/Search";

import Loading from "components/Loading";
import Header from "components/Header";
import Footer from "components/Footer";

const FavoritesPage = React.lazy(() => import("pages/Favorites"));

const overrides = extendTheme({
  styles: {
    global: () => ({
      body: {
        fontFamily: "Questrial, sans-serif",
      },
    }),
  },
});

function App() {
  return (
    <HelmetProvider>
      <ChakraProvider resetCSS theme={overrides}>
        <div className="App">
          <div className="container">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="favorites"
                element={
                  <React.Suspense fallback={<Loading />}>
                    <FavoritesPage />
                  </React.Suspense>
                }
              />
              <Route path="search" element={<SearchPage />} />
              <Route path="search/:searchTerm" element={<SearchPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </ChakraProvider>
    </HelmetProvider>
  );
}

export default App;
