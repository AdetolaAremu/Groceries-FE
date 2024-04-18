import Back from "../../assets/Back.svg";
import { useNavigate } from "react-router-dom";
import { IEditProduct } from "../../types/response/ProductsResponse";
import React from "react";
import { validateProductEdit } from "./validators/EditProductValidator";
import { useAppDispatch, useTypedSelector } from "../../utils/Hook";
import { editProduct, getOneProduct } from "./actions/action";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/Loading";
import Modal from "../../components/Modal";

const editProductValues: IEditProduct = {
  barcode: "",
  brand: "",
  product_name: "",
};

const EditProduct = () => {
  const [Input, setInput] = React.useState(editProductValues);
  const [InputErrors, setInputErrors] = React.useState<IEditProduct>({});
  const [modal, setModal] = React.useState(false);

  const dispatch = useAppDispatch();
  const { id } = useParams();

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInput({
      ...Input,
      [name]: value,
    });
  };

  const { productLoading, oneProdctFetch, errors } = useTypedSelector(
    (state) => state.public
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await validateProductEdit.validate(Input, { abortEarly: false });

      await dispatch(editProduct(Input, id));

      setModal(true);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      const validationErrors: IEditProduct = {};
      error.inner.forEach((err: any) => {
        validationErrors[err.path] = err.message;
      });
      setInputErrors(validationErrors);
    }
  };

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    dispatch(getOneProduct(id));
  }, [dispatch, id]);

  React.useEffect(() => {
    if (oneProdctFetch?.data) {
      setInput({
        ...editProductValues,
        ...oneProdctFetch.data,
      });
    }
  }, [oneProdctFetch]);

  return (
    <div className="flex justify-center mt-20">
      <div className="bg-white w-2/4 h-96 p-6 rounded-xl">
        <div className="flex">
          <img
            src={Back}
            alt="back"
            className="h-4 w-4 mr-2 mt-1 cursor-pointer"
            onClick={goBack}
          />
          <div>Edit Product</div>
        </div>

        <Modal modal={modal} onClose={toggleModal} />

        {errors?.message !== undefined && (
          <div className="flex justify-center">
            <div className="rounded-md px-2 h-20 pt-5 text-center w-2/4 bg-red-500 text-white">
              {errors?.message}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5">
          {productLoading ? (
            <LoadingSpinner />
          ) : (
            <div>
              <div>
                <label htmlFor="Brand" className="mb-3">
                  Brand
                </label>
                <input
                  type="text"
                  className="block w-full p-3 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50
					        focus:ring-buttonGreen focus:border-buttonGreen focus:outline-none"
                  placeholder="Enter brand name"
                  value={Input?.brand}
                  onChange={handleChange}
                  name="brand"
                />
                {InputErrors?.brand && (
                  <div className="text-red-600 text-sm">
                    {InputErrors?.brand}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <label htmlFor="Brand" className="mb-3">
                  Product Name
                </label>
                <input
                  type="text"
                  className="block w-full p-3 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50
					        focus:ring-buttonGreen focus:border-buttonGreen focus:outline-none"
                  placeholder="Enter product name"
                  value={Input?.product_name}
                  onChange={handleChange}
                  name="product_name"
                />
                {InputErrors.product_name && (
                  <div className="text-red-600 text-sm">
                    {InputErrors.product_name}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <label htmlFor="Brand" className="mb-3">
                  UPC Bar Code
                </label>
                <input
                  type="text"
                  className="block w-full p-3 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50
					        focus:ring-buttonGreen focus:border-buttonGreen focus:outline-none"
                  placeholder="Enter barcode"
                  value={Input?.barcode}
                  onChange={handleChange}
                  name="barcode"
                />

                {InputErrors.barcode && (
                  <div className="text-red-600 text-sm">
                    {InputErrors.barcode}
                  </div>
                )}
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={(e: any) => {
                    e.preventDefault();
                    goBack();
                  }}
                  className="w-32 flex justify-center bg-red-600 hover:bg-red-400 text-white py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-32 ml-4 flex justify-center bg-green-600 hover:bg-green-400 text-white py-2 rounded-xl"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
