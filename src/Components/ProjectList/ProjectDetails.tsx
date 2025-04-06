import { useParams } from "react-router-dom";
import { ProjectListItem,ProjectListDataType } from "@/CONSTANTS/ProjectListItems";

export default function ProjectDetails()
{
  const{ slack } = useParams<{slack:string}>();
  const project = ProjectListItem.find((p:ProjectListDataType) => p.slack === slack)
  
  return(
    <>
      <div>
         {project.name}
      </div>    
    </>
  );
}