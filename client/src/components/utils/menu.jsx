import React from "react";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const options = ["None", "Delete", "Update"];
const ITEM_HEIGHT = 48;

export default function MenuIconFunction({ funcToExecute }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = e => {
		setAnchorEl(null);
		e.target.innerText === "Delete" && funcToExecute();
	};

	return (
		<div>
			<IconButton
				aria-label="more"
				aria-controls="long-menu"
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="long-menu"
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: "20ch",
					},
				}}
			>
				{React.Children.toArray(
					options.map(option => (
						<MenuItem selected={option === "Delete"} onClick={handleClose}>
							{option}
						</MenuItem>
					))
				)}
			</Menu>
		</div>
	);
}
