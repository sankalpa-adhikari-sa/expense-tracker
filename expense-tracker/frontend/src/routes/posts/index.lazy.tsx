import { useTransactionMethod } from "@/hooks/useTransactionMethod";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/posts/")({
  component: Posts,
});

function Posts() {
  const navigate = useNavigate({ from: "/posts" });
  const { data: CategoryData = [] }: any = useTransactionMethod();
  return (
    <div className="p-2">
      {CategoryData.map((item: any) => (
        <div
          key={item.id}
          onClick={() =>
            navigate({ to: "/posts/$postsId", params: { postsId: item.id } })
          }
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
