import styled from "styled-components";
import RecipeCard from "../RecipeCard/RecipeCard";

function Home () {
	return (
		<Component>
			<RecipeCard />
		</Component>
	)
}

const Component = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 200px;
	div {
		margin-bottom: 20px;
	}
`

export default Home