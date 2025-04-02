import { FaReact, FaDocker, FaGitAlt, FaLinux, FaGithub, FaLinkedin } from 'react-icons/fa';
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri';
import { SiTypescript, SiExpress, SiPostgresql, SiJest, SiVercel, SiAlwaysdata } from 'react-icons/si';
import { DiNodejs } from 'react-icons/di';
import { AiOutlineCode } from 'react-icons/ai';
import { BsCloud } from 'react-icons/bs';
import { IoDocumentTextSharp } from 'react-icons/io5';
import { RiBaseStationLine } from 'react-icons/ri';
import { IconBaseProps } from 'react-icons';

export const IconReact = FaReact;
export const IconDocker = FaDocker;
export const IconGit = FaGitAlt;
export const IconLinux = FaLinux;
export const IconGithub = FaGithub;
export const IconLinkedin = FaLinkedin;
export const IconNextjs = RiNextjsFill;
export const IconTailwindCSS = RiTailwindCssFill;
export const IconTypeScript = SiTypescript;
export const IconExpress = SiExpress;
export const IconPostgreSQL = SiPostgresql;
export const IconJest = SiJest;
export const IconVercel = SiVercel;
export const IconAlwaysdata = SiAlwaysdata;
export const IconNodejs = DiNodejs;
export const IconCode = AiOutlineCode;
export const IconCloud = BsCloud;
export const IconDocument = IoDocumentTextSharp;
export const IconOnline = RiBaseStationLine;

export const TechnologiesPack = {
	IconReact,
	IconNextjs,
	IconTypeScript,
	IconTailwindCSS,
	IconNodejs,
	IconExpress,
	IconPostgreSQL,
	IconDocker,
	IconCloud,
	IconGit,
	IconLinux,
	IconAlwaysdata,
	IconCode,
	IconJest,
	IconGithub,
	IconVercel,
};

export const IconEmail: React.FC<IconBaseProps> = ({ className = '', size = '24', color = 'currentColor' }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height={size}
		width={size}
		viewBox="0 0 512 512"
		className={className}
		fill={color}>
		<path d="M510.746,110.361c-2.128-10.754-6.926-20.918-13.926-29.463c-1.422-1.794-2.909-3.39-4.535-5.009 c-12.454-12.52-29.778-19.701-47.531-19.701H67.244c-17.951,0-34.834,7-47.539,19.708c-1.608,1.604-3.099,3.216-4.575,5.067 c-6.97,8.509-11.747,18.659-13.824,29.428C0.438,114.62,0,119.002,0,123.435v265.137c0,9.224,1.874,18.206,5.589,26.745 c3.215,7.583,8.093,14.772,14.112,20.788c1.516,1.509,3.022,2.901,4.63,4.258c12.034,9.966,27.272,15.45,42.913,15.45h377.51 c15.742,0,30.965-5.505,42.967-15.56c1.604-1.298,3.091-2.661,4.578-4.148c5.818-5.812,10.442-12.49,13.766-19.854l0.438-1.05 c3.646-8.377,5.497-17.33,5.497-26.628V123.435C512,119.06,511.578,114.649,510.746,110.361z M34.823,99.104 c0.951-1.392,2.165-2.821,3.714-4.382c7.689-7.685,17.886-11.914,28.706-11.914h377.51c10.915,0,21.115,4.236,28.719,11.929 c1.313,1.327,2.567,2.8,3.661,4.272l2.887,3.88l-201.5,175.616c-6.212,5.446-14.21,8.443-22.523,8.443 c-8.231,0-16.222-2.99-22.508-8.436L32.19,102.939L34.823,99.104z M26.755,390.913c-0.109-0.722-0.134-1.524-0.134-2.341V128.925 l156.37,136.411L28.199,400.297L26.755,390.913z M464.899,423.84c-6.052,3.492-13.022,5.344-20.145,5.344H67.244 c-7.127,0-14.094-1.852-20.142-5.344l-6.328-3.668l159.936-139.379l17.528,15.246c10.514,9.128,23.922,14.16,37.761,14.16 c13.89,0,27.32-5.032,37.827-14.16l17.521-15.253L471.228,420.18L464.899,423.84z M485.372,388.572 c0,0.803-0.015,1.597-0.116,2.304l-1.386,9.472L329.012,265.409l156.36-136.418V388.572z" />
	</svg>
);

export const IconCV: React.FC<IconBaseProps> = ({ className = '', size = '24', color = 'currentColor' }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
		height={size}
		width={size}
		fill={color}
		className={className}
		id="resume">
		<rect
			width="360.73"
			height="497"
			x="75.64"
			y="7.5"
			fill="#fff8cc"
			rx="30"></rect>
		<path
			fill="#f66"
			d="M233.52 223.77h-91.38a21.5 21.5 0 0 1-21.5-21.51v-5.63a39.88 39.88 0 0 1 32.43-39.19l34.76-6.63 34.76 6.63A39.88 39.88 0 0 1 255 196.63v5.63a21.5 21.5 0 0 1-21.48 21.51Z"></path>
		<path
			fill="#ff4e4e"
			d="m222.59 157.44-34.76-6.63-9.16 1.75 25.61 4.88a39.88 39.88 0 0 1 32.43 39.19v5.63a21.51 21.51 0 0 1-21.5 21.51h18.31A21.5 21.5 0 0 0 255 202.26v-5.63a39.88 39.88 0 0 0-32.41-39.19Z"></path>
		<path
			fill="#ffcd85"
			d="M173.11 144.66h29.44v14.72a14.72 14.72 0 0 1-14.72 14.72 14.72 14.72 0 0 1-14.72-14.72v-14.72Z"></path>
		<path
			fill="#ffcd85"
			d="M173.11 144.66h29.44v14.72a14.72 14.72 0 0 1-14.72 14.72 14.72 14.72 0 0 1-14.72-14.72v-14.72Z"></path>
		<path
			fill="#ffc166"
			d="M190.77 144.66v14.71a14.72 14.72 0 0 1-8.83 13.49 14.61 14.61 0 0 0 5.89 1.23 14.72 14.72 0 0 0 14.72-14.72v-14.71Z"></path>
		<path
			fill="#595f74"
			d="m211.86 80-59.23 11.16V63.67c0-6.17 5-12.77 11.17-12.77H223v17.93A11.17 11.17 0 0 1 211.86 80Z"></path>
		<path
			fill="#4a4f60"
			d="M208 50.9v17.93A11.17 11.17 0 0 1 196.86 80l-44.23 8.33v2.83L211.86 80A11.17 11.17 0 0 0 223 68.83V50.9Z"></path>
		<path
			fill="#ffcd85"
			d="M165.43 80h44.8A12.8 12.8 0 0 1 223 92.79v22.4a35.2 35.2 0 0 1-35.2 35.2 35.2 35.2 0 0 1-35.2-35.2v-22.4A12.8 12.8 0 0 1 165.43 80Z"></path>
		<path
			fill="#ffc166"
			d="M210.23 80h-15A12.8 12.8 0 0 1 208 92.79v22.4a35.21 35.21 0 0 1-27.7 34.39 35.68 35.68 0 0 0 7.5.81 35.2 35.2 0 0 0 35.2-35.2v-22.4A12.8 12.8 0 0 0 210.23 80Z"></path>
		<path
			fill="#272a33"
			d="M128.14 263.5a7.5 7.5 0 1 0 7.5 7.5 7.5 7.5 0 0 0-7.5-7.5Zm0 135a7.5 7.5 0 1 0 7.5 7.5 7.5 7.5 0 0 0-7.5-7.5Zm0-90a7.5 7.5 0 1 0 7.5 7.5 7.5 7.5 0 0 0-7.5-7.5Zm0 135a7.5 7.5 0 1 0 7.5 7.5 7.5 7.5 0 0 0-7.5-7.5Zm134.38-241.24v-5.63A47.44 47.44 0 0 0 224 150.07l-9.25-1.76a42.62 42.62 0 0 0 15.79-33.12v-22.4a20.14 20.14 0 0 0-4.16-12.25 18.52 18.52 0 0 0 4.16-11.71V50.9a7.5 7.5 0 0 0-7.5-7.5H163.8c-11 0-18.67 10.68-18.67 20.27v27.49a6.84 6.84 0 0 0 .05.79c0 .28-.05.56-.05.84v22.4a42.62 42.62 0 0 0 15.79 33.12l-9.25 1.76a47.44 47.44 0 0 0-38.53 46.56v5.63a29 29 0 0 0 29 29h91.38a29 29 0 0 0 29-29ZM160.13 63.67c0-2.49 2.19-5.27 3.67-5.27h51.73v10.43a3.68 3.68 0 0 1-3.67 3.67 6.85 6.85 0 0 0-.79 0h-45.64a20.23 20.23 0 0 0-5.3.72Zm0 51.52v-22.4a5.3 5.3 0 0 1 5.3-5.29h44.8a5.3 5.3 0 0 1 5.3 5.29v22.4a27.7 27.7 0 1 1-55.4 0Zm34.92 42.08v2.1a7.22 7.22 0 1 1-14.44 0v-2.1a42.35 42.35 0 0 0 14.44 0Zm-66.91 45v-5.63a32.44 32.44 0 0 1 26.33-31.83l11.38-2.16a22.22 22.22 0 0 0 44 0l11.38 2.16a32.44 32.44 0 0 1 26.33 31.83v5.63a14 14 0 0 1-14 14h-91.42a14 14 0 0 1-14-14.01Zm0 151.24a7.5 7.5 0 1 0 7.5 7.5 7.5 7.5 0 0 0-7.5-7.51Zm263.22-137.24H291.7a7.5 7.5 0 0 0 0 15h99.66a7.5 7.5 0 0 0 0-15Zm0-30H291.7a7.5 7.5 0 0 0 0 15h99.66a7.5 7.5 0 0 0 0-15Zm0-141.27H291.7a7.5 7.5 0 0 0 0 15h99.66a7.5 7.5 0 0 0 0-15ZM291.7 90h54.66a7.5 7.5 0 0 0 0-15H291.7a7.5 7.5 0 0 0 0 15ZM406.36 0H105.64a37.54 37.54 0 0 0-37.5 37.5v437a37.54 37.54 0 0 0 37.5 37.5h300.72a37.54 37.54 0 0 0 37.5-37.5v-437A37.54 37.54 0 0 0 406.36 0Zm22.5 474.5a22.52 22.52 0 0 1-22.5 22.5H105.64a22.52 22.52 0 0 1-22.5-22.5v-437a22.52 22.52 0 0 1 22.5-22.5h300.72a22.52 22.52 0 0 1 22.5 22.5Zm-37.5-76H167.72a7.5 7.5 0 0 0 0 15h223.64a7.5 7.5 0 0 0 0-15Zm0 45H167.72a7.5 7.5 0 0 0 0 15h223.64a7.5 7.5 0 0 0 0-15Zm0-180H167.72a7.5 7.5 0 0 0 0 15h223.64a7.5 7.5 0 0 0 0-15Zm0 90H167.72a7.5 7.5 0 0 0 0 15h223.64a7.5 7.5 0 0 0 0-15Zm0-45H167.72a7.5 7.5 0 0 0 0 15h223.64a7.5 7.5 0 0 0 0-15Z"></path>
	</svg>
);
