import React from "react";
import type { SidebarSection } from "../types";
import "./Sidebar.css";

interface SidebarProps {
	activeSection: SidebarSection;
	onSectionChange: (section: SidebarSection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
	activeSection,
	onSectionChange,
}) => {
	const sections: Array<{ key: SidebarSection; label: string }> = [
		{ key: "instructions", label: "Instructions" },
		{ key: "contactInfo", label: "Contact Info" },
		{ key: "summaries", label: "Summaries" },
		{ key: "jobs", label: "Jobs" },
		{ key: "projects", label: "Projects" },
		{ key: "educations", label: "Education" },
		{ key: "skills", label: "Skills" },
	];

	return (
		<aside className="sidebar">
			<nav>
				<ul>
					{sections.map(({ key, label }) => (
						<li key={key}>
							<a
								className={`sidebar-button ${activeSection === key ? "active" : ""}`}
								onClick={() => onSectionChange(key)}
							>
								{label}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;
