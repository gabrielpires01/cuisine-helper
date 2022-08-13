import styled from "styled-components"

function Logo () {
	return (
		<Container >
			<LogoContainer>Cuisine Helper</LogoContainer>
		</Container>
	)
}

const Container = styled.div`
	position: absolute;
	left: 50%;
	top: 40px;
    transform: translate(-50%, 0);
	z-index: -1;
`

const LogoContainer = styled.div`
	font-family: "Kaniti";
	font-size: 50px;
	color: #FF784F; 
`

export default Logo