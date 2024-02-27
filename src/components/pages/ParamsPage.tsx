import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import scss from "./ParamsPage.module.scss";

const ParamsPage = () => {
	const youTube = useAppSelector((state) => state.youTubes);
	const { id } = useParams();
	console.log(id);

	console.log(youTube);

	const filterMovies = youTube.find((item) => item._id === Number(id));
	console.log(filterMovies?.video);

	return (
		<div
			style={{
				display: "flex",
			}}>
			<div>
				<iframe
					className={scss.iframeOne}
					src={filterMovies?.video}
					title={`videos/${id}`}></iframe>
			</div>
			<div className={scss.iframees}>
				{youTube.map((item) => (
					<div key={item._id}>
						{item._id !== Number(id) && (
							<iframe className={scss.iframeTwo} src={item.video} title={`videos/${id}`}></iframe>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default ParamsPage;
