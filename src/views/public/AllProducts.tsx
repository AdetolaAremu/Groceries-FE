import React, { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../utils/Hook";
import { getAllProducts } from "./actions/action";
import LoadingSpinner from "../../components/Loading";
import Edit from "../../assets/Edit.svg";
import Search from "../../assets/Search.svg";
import { IProduct } from "../../types/response/ProductsResponse";

const initialState: IProduct = {
  sortBy: "id",
  sortOrder: "ASC",
  search: "",
};

const AllProducts = () => {
  const [Params, setParams] = React.useState(initialState);
  const dispatch = useAppDispatch();

  const { productLoading, allProducts, errors } = useTypedSelector(
    (state) => state.public
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "sortOrder") {
      const [sortBy, sortOrder] = value.split("-");
      setParams((prevParams) => ({
        ...prevParams,
        sortBy,
        sortOrder,
      }));
    } else {
      setParams((prevParams) => ({
        ...prevParams,
        [name]: value,
      }));
    }
  };

  React.useEffect(() => {
    dispatch(getAllProducts(Params));
  }, [dispatch, Params]);

  return (
    <div>
      <div className="flex justify-between mt-7">
        <div>
          <select
            className="py-2 px-3 w-64 rounded-xl"
            onChange={handleChange}
            value={Params.sortOrder}
            name="sortOrder"
          >
            <option defaultValue="">Sort By</option>
            <option value="brand-ASC">Sort By Brand: A to Z</option>
            <option value="brand-DESC">Sort By Brand: Z to A</option>
            <option value="product_name-ASC">Sort By Product: A to Z</option>
            <option value="product_name-DESC">Sort By Product: Z to A</option>
          </select>
        </div>

        <div className="relative">
          <input
            type="text"
            className="w-80 py-2 px-3 rounded-xl pl-10"
            placeholder="Search product name or brand"
            onChange={handleChange}
            value={Params.search}
            name="search"
          />
          <img
            src={Search}
            alt="edit"
            className="h-6 w-6 absolute left-3 top-2 text-gray-400"
          />
        </div>
      </div>

      {errors?.message !== undefined && (
        <div className="flex justify-center">
          <div className="rounded-md px-2 h-20 pt-5 text-center w-2/4 bg-red-500 text-white">
            {errors?.message}
          </div>
        </div>
      )}

      <div className="mt-7 grid grid-cols-1 md:grid-cols lg:grid-cols-3 place-items-center">
        {productLoading ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : allProducts?.data?.length !== 0 ? (
          allProducts?.data?.map((item) => (
            <div
              key={item.id}
              className="bg-white h-44 w-72 p-3 relative rounded-xl hover:transform hover:scale-110 transition duration-300 mt-3"
            >
              <div className="font-bold pt-12 text-sm">
                {item?.product_name}
              </div>

              <Link to={`/edit/${item.id}`}>
                <img
                  src={Edit}
                  alt="edit"
                  className="hover:transform hover:scale-110 transition duration-300 absolute right-0 top-0 bg-gray-200 rounded-tr-xl cursor-pointer"
                />
              </Link>

              <div className="flex justify-end pt-4 text-sm font-bold">
                {item?.brand}
              </div>

              <div className="pt-4 text-sm font-bold">{item?.barcode}</div>
            </div>
          ))
        ) : (
          <div className="text-center mt-6">
            <div>There are no new products please check again later</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
