import styled from "styled-components";
import RecipeList from "../RecipesList/RecipeList";

function Home () {
	return (
		<Component>
			<RecipeList />
		</Component>
	)
}

const Component = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 200px;
	div {
		margin: 20px;
	}
`

export default Home