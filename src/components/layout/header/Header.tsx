import { useState } from "react";
import scss from "./Header.module.scss";
import Modal from "../../pages/modal/Modal";

import { getSlice, postSlice } from "../../../redux/tools/youtubeSlice";
import { useAppDispatch } from "../../../redux/store";

const Header = () => {
	const dispatch = useAppDispatch();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [image, setImage] = useState("");
	const [name, setName] = useState("");
	const [url, setUrl] = useState("");
	const [title, setTitle] = useState("");
	const [sub, setSub] = useState("");
	const [category, setCategory] = useState("");

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const addYoutubes = () => {
		if (
			name === "" ||
			image === "" ||
			url === "" ||
			title === "" ||
			sub === "" ||
			category === ""
		) {
			alert("Заполните поля!");
		} else {
			const newData = {
				name: name,
				image: image,
				url: url,
				title: title,
				sub: sub,
				category: category,
			};
			dispatch(postSlice(newData));
			dispatch(getSlice());
			setImage("");
			setName("");
			setUrl("");
			setTitle("");
			setSub("");
			setCategory("");
			setIsModalOpen(false);
		}
	};

	return (
		<header className={scss.Header}>
			<div className="container">
				<div className={scss.content}>
					<img
						className={scss.logo}
						src="https://www.edigitalagency.com.au/wp-content/uploads/Youtube-logo-png.png"
						alt=""
					/>
					<div>
						<input
							className={scss.inputSearch}
							type="text"
							placeholder="Введите поиск"
						/>
						<button className={scss.buttonVoice}>
							<img
								src="https://cdn.icon-icons.com/icons2/1129/PNG/512/voice_79948.png"
								alt=""
							/>
						</button>
					</div>
					<button onClick={openModal} className={scss.addVideo}>
						Добавить видео
					</button>
					<Modal
						openIs={isModalOpen}
						closeOn={closeModal}
						children={
							<>
								<div className={scss.addVideoInput}>
									<input
										className={scss.inputsAdd}
										type="text"
										placeholder="Image"
										value={image}
										onChange={(e) => setImage(e.target.value)}
									/>
									<input
										className={scss.inputsAdd}
										type="text"
										placeholder="Name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
									<input
										className={scss.inputsAdd}
										type="text"
										placeholder="Nickname image"
										value={url}
										onChange={(e) => setUrl(e.target.value)}
									/>
									<input
										className={scss.inputsAdd}
										type="text"
										placeholder="Nickname"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
									/>
									<input
										className={scss.inputsAdd}
										type="text"
										placeholder="Subscribers"
										value={sub}
										onChange={(e) => setSub(e.target.value)}
									/>
									<input
										className={scss.inputsAdd}
										type="text"
										placeholder="Category"
										value={category}
										onChange={(e) => setCategory(e.target.value)}
									/>
									<button className={scss.addButton} onClick={addYoutubes}>
										Добавить
									</button>
								</div>
							</>
						}
					/>
				</div>
			</div>
		</header>
	);
};

export default Header;
