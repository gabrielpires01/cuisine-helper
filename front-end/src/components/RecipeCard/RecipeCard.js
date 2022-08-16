import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"

function RecipeCard ({recipe}) {
	return (
		<Card
			sx={{
				maxWidth: 500,
				minWidth: 280,
				backgroundColor: "#DB9D47",
				boxShadow: "1px 1px 3px #3A3042"
			}}
		>
			<CardActionArea>
				<CardMedia 
					component="img"
					heigth="20"
					image={recipe.Image}
				/>
				<CardContent sx={{padding: 0}}>
					<Typography variant="h6" component="div">
						{recipe.Name}
					</Typography>
					<Typography variant="body1" color="text.primary">
						{recipe.Description}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Author: {recipe.AuthorName}
					</Typography>
				</CardContent>

			</CardActionArea>
		</Card>
	)
}

export default RecipeCard 