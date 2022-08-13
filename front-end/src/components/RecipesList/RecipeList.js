import { useEffect, useState } from "react"
import styled from "styled-components"
import { recipes } from "../../services/api"
import RecipeCard from "../RecipeCard/RecipeCard"

function RecipeList () {
	const [data, setData] = useState([])

	useEffect(() => {
		const promise = recipes()
		promise.then(res => setData(res))
	}, [])

	return (
		<Component>
			{data.map(recipe => <RecipeCard id={recipe.Id} key={`recipe-${recipe.Id}`} recipe={recipe} />)}
		</Component>
	)
}

const Component = styled.div`

`

export default RecipeList