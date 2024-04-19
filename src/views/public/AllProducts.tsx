import React, { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../utils/Hook";
import { getAllProducts } from "./actions/action";
import LoadingSpinner from "../../components/Loading";
import Edit from "../../assets/Edit.svg";
import Search from "../../assets/Search.svg";
import { IProduct } from "../../types/response/ProductsResponse";
import TextInput from "../../components/InputComponent";
import SelectInput from "../../components/SelectComponent";

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
          <SelectInput
            options={[
              { value: "brand-ASC", label: "Sort By Brand: A to Z" },
              { value: "brand-DESC", label: "Sort By Brand: Z to A" },
              { value: "product_name-ASC", label: "Sort By Product: A to Z" },
              { value: "product_name-DESC", label: "Sort By Product: Z to A" },
            ]}
            value={Params.sortOrder}
            onChange={handleChange}
            name="sortOrder"
            placeholder="Sort By"
          />
        </div>

        <div className="relative">
          <TextInput
            label="Search"
            value={Params.search}
            onChange={handleChange}
            name="search"
            inputWidth="w-80"
            placeholder="Search product name or brand"
            icon={<img src={Search} alt="Search Icon" className="h-6 w-6" />}
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
