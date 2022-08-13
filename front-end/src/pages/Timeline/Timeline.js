import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header/Header";
import Logo from "../../components/Logo/Logo";
import SideBar from "../../components/SideBar/SideBar";

function Timeline () {
	return (
		<Component>
			<Header/>
			<Logo />
			<SideBar />
			<Outlet />
		</Component>
	)
}

const Component = styled.div`
	width: 100vw;
	height: 100vh;
`

export default Timeline