import styled from "styled-components";
import UserIcon from "./UserIcon";

function Header ({image, id}) {
	return (
		<Component>
			<UserIcon image={image} id={id} />
		</Component>
	)
}

const Component = styled.nav`
	width: 120px;
	position: fixed;
	right: 0;
	padding: 5px 10px;
`

export default Header