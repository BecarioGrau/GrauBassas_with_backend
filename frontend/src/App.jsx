import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Marquee from "./components/Marquee";
import { marqueeItems } from "./data/HomeContentData";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cookiebanner from "./components/Cookiebanner";
import { NavigationProvider } from "./context/NavigationContext";

const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const Product = lazy(() => import("./pages/Product"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const Contact = lazy(() => import("./pages/Contact"));
const AvisoLegal = lazy(() => import("./pages/AvisoLegal"));
const Materials = lazy(
  () => import("./components/MaterialsComponents/Materials"),
);
const AboutUs = lazy(() => import("./pages/AboutUs"));
const WeightCalc = lazy(() => import("./pages/WeightCalc"));
const AdminCatalog = lazy(() => import("./pages/AdminCatalog"));

function App() {
  return (
    <NavigationProvider>
      <Marquee items={marqueeItems} />
      <Header />
      <Routes>
        <Route path="/productos" element={<Product />} />
        <Route
          path="/productos/materiales/:category/:title"
          element={<ProductDetails />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/productos/materiales/:title" element={<Materials />} />
        <Route path="/nosotros" element={<AboutUs />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/calculadora-pesos" element={<WeightCalc />} />
        <Route path="/panel-interno-58us/catalogo" element={<AdminCatalog />} />
      </Routes>
      <Footer />
      <Cookiebanner />
    </NavigationProvider>
  );
}

export default App;
