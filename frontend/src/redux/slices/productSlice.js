import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Async Thunk to Ftech Products by Collection and optimal Filters
export const fetchProductsByFilters = createAsyncThunk(
    "products/fetchByFilters",
    async ({
        collection,
        size,
        color,
        gender,
        minPrice,
        maxPrice,
        sortBy,
        search,
        category,
        material,
        brand,
        limit,
    }) =>{
        const query = new URLSearchParams();
        if(collection) query.append("collection", collection);
        if(size) query.append("size", size);
        if(color) query.append("color", color);
        if(gender) query.append("gender", gender);
        if(category) query.append("category", category);
        if(minPrice) query.append("minPrice", minPrice);
        if(maxPrice) query.append("maxPrice", maxPrice);
        if(sortBy) query.append("sortBy", sortBy);
        if(search) query.append("search", search);
        if(material) query.append("material", material);
        if(brand) query.append("brand", brand);
        if(limit) query.append("limit", limit);
    const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
    );
    return response.data;
    }
);

//Async Thunk to Fetch a single product by ID
export const fetchProductDetails = createAsyncThunk(
    "products/fetchProductDetails",
    async(id) =>{
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
        );
        return response.data;
    }
);

//Async Thunk to fetch similar products
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async({id, productData}) =>{
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
            productData,
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("userToken")}`
                }
            }
        );
        return response.data;
    }
);

//Async Thunk to Fetch similiar products
export const fetchSimilarProducts = createAsyncThunk(
    "products/fetchSimilarProducts",
    async({id})=>{
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
        );
        return response.data;
    }
);

const productSlice = createSlice({
    name:"products",
    initialState:{
        products:[],
        selectedProduct:null, ///Store the details of the single product
        similarProducts:[],
        loading:false,
        error:null,
        filters:{
            category:"",
            size:"",
            color:"",
            gender:"",
            brand:"",
            minPrice:"",
            maxPrice:"",
            sortBy:"",
            search:"",
            material:"",
            collection:"",
        }
    },
    reducers :{
        setFilters : (state, action ) =>{
            state.filters = {...state.filters, ...action.payload};
        },
        clearFilters:(state)=>{
            state.filters = {
                category:"",
                size:"",
                color:"",
                gender:"",
                brand:"",
                minPrice:"",
                maxPrice:"",
                sortBy:"",
                search:"",
                material:"",
                collection:"",
            }
        }
    },
    extraReducers:(builder)=>{
        builder
        //Handle fetching products with filter
        .addCase(fetchProductsByFilters.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductsByFilters.fulfilled, (state, action)=>{
            state.loading = false;
            state.products = Array.isArray(action.payload)? action.payload :[];
        })
        .addCase(fetchProductsByFilters.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        })

        //Handle fetching single products details
        .addCase(fetchProductDetails.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductDetails.fulfilled, (state, action)=>{
            state.loading = false;
            state.selectedProduct = action.payload;
        })
        .addCase(fetchProductDetails.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        })


          //Handle updating product
          .addCase(updateProduct.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(updateProduct.fulfilled, (state, action)=>{
            state.loading = false;
            state.updatedProduct = action.payload;
            const index = state.products.findIndex(
                (product) =>product._id === updateProduct._id
            )
            if(index !== -1){
                state.products[index ]= updatedProduct;
            }
        })
        .addCase(updateProduct.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        })

         //Handle fetching similar products 
         .addCase(fetchSimilarProducts.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchSimilarProducts.fulfilled, (state, action)=>{
            state.loading = false;
            state.similarProducts = action.payload;
        })
        .addCase(fetchSimilarProducts.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
    }
});

export const {setFilters, clearFilters} = productSlice.actions;
export default productSlice.reducer;