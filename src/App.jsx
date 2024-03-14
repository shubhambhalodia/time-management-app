import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectsSelected";
import ProjectsSidebar from "./components/projectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState,setProjectsState]=useState({
    selectedProjectId:undefined,
    projects:[],
    tasks:[],
  });
  function handleAddTask(text){
    setProjectsState(prevState=>{
      const taskId=Math.random();
      const newTask={
        text:text,
        projectID: prevState.selectedProjectId,
        id:taskId,
      }
      return{
        ...prevState,
        tasks:[...prevState.tasks,newTask]
      }
    })
  }
  function handleDeleteTask(id){
    setProjectsState(prev=>{
      return {
        ...prev,
        tasks:prev.tasks.filter((task)=>task.id!==id),
      };
    });
  }
  function handleSelectProject(id){
    setProjectsState(prev=>{
      return {
        ...prev,
        selectedProjectId:id
      };
    });
  }
  function handleStartAddProject(){
    setProjectsState(prev=>{
      return {
        ...prev,
        selectedProjectId:null
      };
    });
  }
  function handleCancelAddProject(){
    setProjectsState(prev=>{
      return {
        ...prev,
        selectedProjectId:undefined
      };
    });
  }
  function handleAddProject(projectData){
    setProjectsState(prevState=>{
      const projectID=Math.random();
      const newProject={
        ...projectData,
        id: projectID
      }
      return{
        ...prevState,
        selectedProjectId:undefined,
        projects:[...prevState.projects,newProject]
      }
    })
  }
  function handleDeleteProject(){
    setProjectsState(prev=>{
      return {
        ...prev,
        selectedProjectId:undefined,
        projects:prev.projects.filter((project)=>project.id!==prev.selectedProjectId),
      };
    });
  }
  const selectedProject=projectsState.projects.find(project=>project.id===projectsState.selectedProjectId)
  let content=<SelectedProject tasks={projectsState.tasks} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} project={selectedProject} onDelete={handleDeleteProject}/>;
  if(projectsState.selectedProjectId===null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }
  else if(projectsState.selectedProjectId===undefined){
    content=<NoProjectSelected onStartAddProject={handleStartAddProject}/>;
  }
  return (
   <main className="h-screen my-8 flex gap-8">
    <ProjectsSidebar selectedProjectId={projectsState.selectedProjectId} onSelectProject={handleSelectProject} onStartAddProject={handleStartAddProject} projects={projectsState.projects}/>
    {content}
   </main>
  );
}

export default App;
