import ProjectList from "@/Components/ProjectList/ProjectListLayout";

export default function ProjectPage() {
  return (
    <>
      <div className="flex mt-6 gap-2  ">
        <div className="h-full">
          <ProjectList />
        </div>
        <div>This is the Project Details Section</div>
      </div>
    </>
  );
}
