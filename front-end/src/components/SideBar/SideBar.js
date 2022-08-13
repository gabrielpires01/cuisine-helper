import { Drawer, IconButton, List, ListItem, ListItemButton } from "@mui/material";
import { useState } from "react";
import { IconContext } from "react-icons";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import styled from "styled-components";

function SideBar () {
	const [open, setOpen] = useState(false)

	return (
		<IconContext.Provider value={{ color: "#DB9D47",size: 30, className: "header-icon"}}>
			<Component>
				<IconButton onClick={() => setOpen(true)}>
					<AiOutlineMenuUnfold />
				</IconButton>
				<Drawer
					sx={{
						backgroundColor:"#DB9D47"
					}}
					variant="persistent"
					anchor="left"
					open={open}
					
				>
					<SideBarHeader>
						<IconButton onClick={() => setOpen(false)}>
							<AiOutlineMenuFold />
						</IconButton>
					</SideBarHeader>
					<List>
						<ListItemButton>
							<ListItem>News</ListItem>
						</ListItemButton>
						<ListItemButton>
							<ListItem>Recipes</ListItem>
						</ListItemButton>
						<ListItemButton>
							<ListItem>Filter</ListItem>
						</ListItemButton>
					</List>
				</Drawer>
			</Component>
		</IconContext.Provider>
	)
}

const Component = styled.div`
	position: absolute;
	width: 30px;
	border-radius: 15px;
	padding: 10px;
`

const SideBarHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding-top: 10px;
`

export default SideBar