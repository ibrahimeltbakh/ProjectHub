
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../api/config';

const fetchProducts = createAsyncThunk("products/fetch", async (_, { rejectWithValue }) => {
    try {
        const [res1, res2] = await Promise.all([
            axios.get(`${BASE_URL}/products?page=1`),
            axios.get(`${BASE_URL}/products?page=2`),
        ]);

        const products = [...res1.data.products, ...res2.data.products];
        console.log(products);
        return products;
    } catch (error) {
        console.log(`Error Fitching Products ${error}`);
        return rejectWithValue(error.response?.data || error.message);
    }

})

const initialState = {
    products: [],
    loading: false,
    error: null
}
const productsSlice = createSlice({
    name: "products",
    initialState: initialState,

    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload

        }).addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })

    }


})

export { fetchProducts };
export default productsSlice.reducer
