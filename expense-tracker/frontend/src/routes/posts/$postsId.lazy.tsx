import { createFileRoute } from "@tanstack/react-router";
//@ts-ignore
export const Route = createFileRoute("/posts/$postsId")({
  component: PostComponent,
});
function PostComponent() {
  const { postsId } = Route.useParams();

  return <div>Post {postsId}</div>;
}
