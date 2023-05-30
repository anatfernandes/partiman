import {
	AiOutlineEdit,
	AiOutlineLeft,
	AiOutlineMinusCircle,
	AiOutlinePlusCircle,
	AiOutlineRight,
} from "react-icons/ai";
import { BsTrashFill, BsViewList } from "react-icons/bs";
import { FaBan } from "react-icons/fa";
import { IoExitOutline, IoHome, IoPaperPlaneSharp } from "react-icons/io5";

const IconTypes = Object.freeze({
	home: IoHome,
	trash: BsTrashFill,
	edit: AiOutlineEdit,
	send: IoPaperPlaneSharp,
	plus: AiOutlinePlusCircle,
	minus: AiOutlineMinusCircle,
	exit: IoExitOutline,
	next: AiOutlineRight,
	return: AiOutlineLeft,
	view: BsViewList,
	close: FaBan,
});

const defaultConfig = {
	size: "1.4rem",
	color: "#F9FAFA",
};

function Icon({ type, config = defaultConfig, ...otherProps }) {
	const Icon = IconTypes[type];

	if (!Icon) {
		const ErrorIcon = IconTypes["close"];
		return <ErrorIcon title="not found" {...defaultConfig} color="red" />;
	}

	return <Icon title={type} {...defaultConfig} {...config} {...otherProps} />;
}

export { IconTypes, Icon };
