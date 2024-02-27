import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import scss from "./Layout.module.scss";
import ParamsPage from "../pages/ParamsPage";

const Layout = () => {
	return (
		<div className={scss.Layout}>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="videos/:id" element={<ParamsPage />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
