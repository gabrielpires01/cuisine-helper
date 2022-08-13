import guest from "../../assets/images/guest-user.jpg"
import { Avatar, Divider, List, ListItemButton } from "@mui/material";
import { IconContext } from "react-icons";
import { MdLogin } from "react-icons/md"
import { AiOutlineUser } from "react-icons/ai"
import styled from "styled-components";
import { useState } from "react";

function UserIcon ({image = guest, id}) {
	const [open, setOpen] = useState(false)

	return (
		<IconContext.Provider open={open} value={{ size: 20, className: "header-icon"}}>
			<Component open={open}>
				<Avatar
					alt="user image" 
					src={image}
					sx={{ width: 40, height: 40, marginBottom: [open ? 1 : 0]}}
					onClick={() => setOpen(!open)}
				/>
				{open ? 
					<List disablePadding>
						<ListItemButton sx={{
								padding: 1,
								height: 30,
								width: 90,
								display: "flex", 
								justifyContent: "space-between"
						}}>
							<MdLogin />
							<OptionDisplay>LogIn</OptionDisplay>
						</ListItemButton>
						<Divider />
						<ListItemButton sx={{
								padding: 1,
								height: 30,
								width: 90,
								display: "flex", 
								justifyContent: "space-between"
						}}>
							<AiOutlineUser />
							<OptionDisplay>Profile</OptionDisplay>
						</ListItemButton>
					</List> 
					
					: <></>}
			</Component>
		</IconContext.Provider>
	)
}

const Component = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 15px;
	margin: 10px;

	${({ open }) => open && `
		background: #DB9D47;
		padding: 10px;
	`}
`

const OptionDisplay = styled.div`

`

export default UserIcon