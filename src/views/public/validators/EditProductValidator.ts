import * as Yup from "yup";

export const validateProductEdit = Yup.object().shape({
  brand: Yup.string()
    .min(3, "Brand name must be at least 3 characters")
    .required("Brand name is required"),
  product_name: Yup.string()
    .min(6, "Product name must be at least 3 characters")
    .required("Product name is required"),
  barcode: Yup.string()
    .matches(/^[0-9]+$/, "Barcode must contain only numbers")
    .length(12, "Barcode must be exactly 12 numbers"),
});
