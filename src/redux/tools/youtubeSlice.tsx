import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface TypeYouTube {
	_id: number;
	image: string;
	name: string;
	url: string;
	title: string;
	sub: string | number;
	category: string;
	video: string;
}

export interface NewDataType {
	name: string;
	image: string;
	url: string;
	title: string;
	sub: string;
	category: string;
}

export interface TypeState {
	loading: boolean;
	error: string | null;
	youTubes: TypeYouTube[];
}

const initialState: TypeState = {
	loading: false,
	error: null,
	youTubes: [],
};
export interface PatchData {
	newData: Partial<TypeYouTube>;
	_id: number;
}

const url =
	"https://api.elchocrud.pro/api/v1/a9e2384d65e667c352589588263b32aa/youTube";

export const getSlice = createAsyncThunk("youTube/getSlice", async () => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("error", error);
	}
});

export const postSlice = createAsyncThunk<TypeYouTube, NewDataType>(
	"youTube/postSlice",
	async (newData) => {
		try {
			const response = await axios.post(url, newData);
			return response.data;
		} catch (error) {
			console.error("error", error);
		}
	}
);

export const deleteCard = createAsyncThunk(
	"youTube/deleteCard",
	async (id: number) => {
		try {
			await axios.delete(`${url}/${id}`);
			return id;
		} catch (error) {
			console.error("error", error);
		}
	}
);

export const patchSlice = createAsyncThunk<TypeYouTube[], PatchData>(
	"youTube/patchSlice",
	async ({ newData, _id }) => {
		console.log(newData);

		try {
			const response = await axios.patch(`${url}/${_id}`, newData);
			return response.data;
		} catch (error) {
			console.error("error", error);
		}
	}
);

const youTubeSlice = createSlice({
	name: "youTubeSlice",
	initialState,
	reducers: {
		addCard: (state, action) => {
			state.youTubes.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(getSlice.fulfilled, (state, action) => {
				state.loading = false;
				state.youTubes = action.payload;
			})
			.addCase(getSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message as string;
			})
			// !POST
			.addCase(postSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(postSlice.fulfilled, (state, action) => {
				state.loading = false;
				state.youTubes = state.youTubes.concat(action.payload);
			})
			.addCase(postSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message as string;
			})
			// !DELETE
			.addCase(deleteCard.fulfilled, (state, action) => {
				state.youTubes = state.youTubes.filter(
					(youTube) => youTube._id !== action.payload
				);
			})
			// !Patch
			.addCase(patchSlice.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(patchSlice.fulfilled, (state, action) => {
				state.loading = false;
				state.youTubes = action.payload;
			})
			.addCase(patchSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message as string;
			});
	},
});

export const { addCard } = youTubeSlice.actions;
export const youTubeReduce = youTubeSlice.reducer;
