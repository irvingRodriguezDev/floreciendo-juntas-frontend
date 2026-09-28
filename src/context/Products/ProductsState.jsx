import { useReducer } from "react";
import MethodGet, { MethodPost } from "../../config/Service";
import Swal from "sweetalert2";
import ProductsReducer from "./ProductsReducer";
import { GET_ALL_PRODUCTS, GET_ONE_PRODUCT } from "../../types";
import ProductsContext from "./ProductsContext";
const ProductsState = ({ children }) => {
  const initialState = {
    products: [],
    product: null,
    event: {},
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
    topCourses: [],
  };
  const [state, dispatch] = useReducer(ProductsReducer, initialState);

  const getAllProducts = (page, limit, search = "") => {
    let url = `/products?page=${page}&limit=${limit}`;

    if (search.trim() !== "") {
      url += `&search=${encodeURIComponent(search)}`; // 👈 usar +=
    }

    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_PRODUCTS,
          payload: {
            products: res.data.products,
            totalItems: res.data.total, // ⚠ ojo, tu backend devuelve 'total'
            totalPages: res.data.totalPages,
            currentPage: res.data.currentPage,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getOneProduct = (id) => {
    let url = `/products/${id}`;
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ONE_PRODUCT,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al consultar el producto");
      });
  };

  return (
    <ProductsContext.Provider
      value={{
        products: state.products,
        product: state.product,
        totalItems: state.totalItems,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        getAllProducts,
        getOneProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export default ProductsState;
