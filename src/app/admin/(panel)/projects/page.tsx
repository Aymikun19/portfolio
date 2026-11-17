import { ImageInput } from "../ImageInput";
import { mediaUrl } from "@/lib/media";
import { ChevronDown, Plus } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { getContent } from "@/lib/store";
import type { Project } from "@/lib/types";
import { deleteProject, saveProject } from "../../actions";

// Admin pages read the session cookie on every request.
export const instant = false;

export default async function ProjectsAdmin() {
  await requireAdmin(); // pages render in parallel with the layout, so guard each one
  const { projects } = await getContent();
  return (
    <div>
      <h1 className="text-2xl font-semibold">Projects</h1>
      <p className="mt-1 text-sm text-muted">Edit what shows on your portfolio. Changes go live immediately.</p>

      <details className="card mt-8 p-5">
        <summary className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-accent">
          <Plus size={16} aria-hidden /> Add a project
        </summary>
        <ProjectForm />
      </details>

      <div className="mt-6 grid gap-4">
        {projects.map((p) => (
          <details key={p.id} className="card p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between">
              <span className="font-medium">
                {p.title}{" "}
                <span className="ml-2 font-mono text-xs text-muted">
                  {p.category}
                  {p.featured ? " · featured" : ""}
                </span>
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-muted">
                edit <ChevronDown size={14} aria-hidden />
              </span>
            </summary>
            <ProjectForm project={p} />
            <form action={deleteProject.bind(null, p.id)} className="mt-3">
              <button className="btn-danger">Delete project</button>
            </form>
          </details>
        ))}
      </div>
    </div>
  );
}

function ProjectForm({ project }: { project?: Project }) {
  return (
    <form action={saveProject} className="mt-5 grid gap-4">
      <input type="hidden" name="id" value={project?.id ?? ""} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="field">
          <span>Title</span>
          <input name="title" defaultValue={project?.title} required />
        </label>
        <label className="field">
          <span>Category</span>
          <select name="category" defaultValue={project?.category ?? "fullstack"}>
            <option value="fullstack">Full-stack</option>
            <option value="data">Data / ML</option>
          </select>
        </label>
      </div>
      <ImageInput name="image" label="Screenshot" current={mediaUrl(project?.image)} />
      <label className="field">
        <span>Description</span>
        <textarea name="description" rows={3} defaultValue={project?.description} />
      </label>
      <label className="field">
        <span>Highlights for the case-study page (one per line)</span>
        <textarea name="highlights" rows={4} defaultValue={project?.highlights?.join("\n")} />
      </label>
      <label className="field">
        <span>Tech (comma separated)</span>
        <input name="tech" defaultValue={project?.tech.join(", ")} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="field">
          <span>GitHub URL</span>
          <input name="repo" type="url" defaultValue={project?.repo} />
        </label>
        <label className="field">
          <span>Live demo URL</span>
          <input name="live" type="url" defaultValue={project?.live} />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="featured" defaultChecked={project?.featured} /> Featured
      </label>
      <button className="btn-primary justify-self-start">Save</button>
    </form>
  );
}
