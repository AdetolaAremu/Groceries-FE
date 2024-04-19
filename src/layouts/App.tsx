import { Route, Routes } from "react-router-dom";
import AllProducts from "../views/public/AllProducts";
import EditProduct from "../views/public/EditProduct";
import NavBar from "../components/Navbar";

const AuthLayout = () => {
  return (
    <section className="bg-[#F2F2F2] w-full h-auto px-12 py-6">
      <NavBar />
      <div className="">
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </section>
  );
};

export default AuthLayout;
