import { useState } from "react";
import "./App.css";
import type { Resume, SidebarSection } from "./types.ts";
import resumeData from "./data/resumeData.json";

import Sidebar from "./components/Sidebar.tsx";
import EditorPanel from "./components/EditorPanel.tsx";
import JobDescriptionPanel from "./components/JobDescriptionPanel.tsx";
import PreviewPanel from "./components/PreviewPanel.tsx";
import ThemePicker from "./components/ThemePicker.tsx";

function App() {

	const [theme, setTheme] = useState<"light" | "dark" | "cat">("dark");

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
		<div className="app" data-theme={theme}>
				<ThemePicker theme={theme} setTheme={setTheme} />

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
		</div>
	);
}

export default App;