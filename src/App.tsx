import { useState } from "react";
import "./App.css";
import type { Resume, SidebarSection } from "./types";
import resumeData from "./data/resumeData.json";

import Sidebar from "./components/Sidebar.tsx";
import EditorPanel from "./components/EditorPanel.tsx";
import JobDescriptionPanel from "./components/JobDescriptionPanel.tsx";
import PreviewPanel from "./components/PreviewPanel.tsx";

function App() {
	const [theme, setTheme] = useState<"light" | "dark">("dark");
	const [resume, setResume] = useState<Resume>(resumeData as Resume);
	const [activeSection, setActiveSection] = useState<SidebarSection>(
		"instructions",
	);
	const [jobDescription, setJobDescription] = useState<string>("");
	const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
	const [optimizedResume, setOptimizedResume] = useState<Resume | null>(
		null,
	);

	return (
		<div className="app light">
					<>
						<div onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="theme-toggle">
							{theme === "light" ? "🌙" : "☀️"}
						</div>
						<Sidebar
							activeSection={activeSection}
							onSectionChange={setActiveSection}
						/>

						<EditorPanel
							resume={resume}
							setResume={setResume}
							activeSection={activeSection}
						/>
						{/* <JobDescriptionPanel
							jobDescription={jobDescription}
							setJobDescription={setJobDescription}
							resume={resume}
							onOptimize={setOptimizedResume}
							onPreview={setIsPreviewMode}
						/> */}
					</>
		</div>
	);
}

export default App;