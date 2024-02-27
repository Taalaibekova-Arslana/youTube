import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import {
	deleteCard,
	getSlice,
	patchSlice,
} from "../../redux/tools/youtubeSlice";
import scss from "./HomePage.module.scss";
import { Link } from "react-router-dom";

const HomePage = () => {
	const youTube = useAppSelector((state) => state.youTubes);
	const dispatch = useAppDispatch();

	// !state 1
	const [image, setImg] = useState("");
	const [name, setName] = useState("");
	const [url, setUrl] = useState("");
	const [title, setTitle] = useState("");
	const [sub, setSub] = useState("");
	const [category, setCategory] = useState("");
	const [video, setVideo] = useState("");

	const [filtered, setFiltered] = useState<string>("Все");

	const filterCategory = (category: string) => {
		setFiltered(category);
	};

	const [edit, setEdit] = useState(null);

	useEffect(() => {
		dispatch(getSlice());
	}, [dispatch]);

	const deleteContent = (id: number) => {
		dispatch(deleteCard(id));
		getSlice();
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const editYou = (item: any) => {
		setImg(item.image);
		setName(item.name);
		setUrl(item.url);
		setTitle(item.title);
		setSub(item.sub);
		setCategory(item.category);
		setVideo(item.video);
		setEdit(item._id);
	};

	const saveYouTube = (_id: number) => {
		const newData = {
			id: _id,
			name: name,
			title: title,
			url: url,
			category: category,
			sub: sub,
			image: image,
			video: video,
		};
		dispatch(patchSlice({ newData, _id }));
		setEdit(null);
	};

	return (
		<div className={scss.HomePage}>
			<div className="container">
				<div className={scss.categories}>
					<button onClick={() => filterCategory("Все")}>Все</button>
					<button onClick={() => filterCategory("Music")}>Музыка</button>
					<button onClick={() => filterCategory("movie")}>Фильмы</button>
					<button onClick={() => filterCategory("cartoon")}>Мультфильмы</button>
				</div>
				<div className={scss.content}>
					{youTube
						.filter((item) => filtered === "Все" || item.category === filtered)
						.map((item) => (
							<div key={item._id}>
								{edit === item._id ? (
									<>
										<div className={scss.inputsEdit}>
											<input
												type="text"
												value={image}
												onChange={(e) => setImg(e.target.value)}
											/>
											<input
												type="text"
												value={name}
												onChange={(e) => setName(e.target.value)}
											/>
											<input
												type="text"
												value={url}
												onChange={(e) => setUrl(e.target.value)}
											/>
											<input
												type="text"
												value={title}
												onChange={(e) => setTitle(e.target.value)}
											/>
											<input
												type="text"
												value={sub}
												onChange={(e) => setSub(e.target.value)}
											/>
											<input
												type="text"
												value={category}
												onChange={(e) => setCategory(e.target.value)}
											/>
											<input
												type="text"
												value={video}
												onChange={(e) => setVideo(e.target.value)}
											/>
											<div className={scss.editButton}>
												<button onClick={() => saveYouTube(item._id)}>
													Save
												</button>
												<button onClick={() => setEdit(null)}>Cancel</button>
											</div>
										</div>
									</>
								) : (
									<>
										<div className={scss.cards}>
											<Link key={item._id} to={`videos/${item._id}`}>
												<img className={scss.card} src={item.image} alt="" />
											</Link>
											<h2>{item.name}</h2>
											<div className={scss.text}>
												<img className={scss.url} src={item.url} alt="" />
												<div>
													<p>{item.title}</p>
													<p className={scss.sub}>{item.sub}</p>
													<p>{item.category}</p>
												</div>
											</div>
											<div className={scss.buttons}>
												<button onClick={() => deleteContent(item._id)}>
													Delete
												</button>
												<button onClick={() => editYou(item)}>Edit</button>
											</div>
										</div>
									</>
								)}
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
