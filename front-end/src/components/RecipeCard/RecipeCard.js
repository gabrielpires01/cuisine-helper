import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import styled from "styled-components"

function RecipeCard () {
	return (
		<Card
			sx={{
				maxWidth: 500,
				minWidth: 300
			}}
		>
			<CardActionArea>
				<CardMedia 
					component="img"
					heigth="20"
					image="https://img.itdg.com.br/tdg/images/blog/uploads/2018/04/salada.jpg"
				/>
				<CardContent>
					<Typography variant="h6" component="div">
						Recipe Name
					</Typography>
					<Typography variant="body1" color="text.primary">
						Lizards are a widespread group of squamate reptiles, with over 6,000
						species, ranging across all continents except Antarctica
					</Typography>
				</CardContent>
				<UserComponent>Test User</UserComponent>
			</CardActionArea>
		</Card>
	)
}

const UserComponent = styled.div`
	margin-left: 16px;
`

export default RecipeCard 