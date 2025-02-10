import { cn } from "@/lib/utils";
import moment from "moment";
import "moment/locale/tr";

function CommentCard({ review, isCommentsPage }) {
  const { name, date, description } = review;
  const turkishDate = moment(date).locale("tr").format("D MMMM, YYYY");

  return (
    <figure
      className={cn(
        "relative md:max-w-[350px] max-w-80 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] hover:border-purple-500 duration-300",
        isCommentsPage && "bg-white mx-auto"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col">
          <h4 className="text-sm text-purple-600 font-medium">{name}</h4>
          <p className="text-xs text-slate-600">{turkishDate}</p>
        </div>
      </div>
        
      <blockquote className={`mt-2 text-sm text-black ${!isCommentsPage && "truncate-text truncate-3"}`}>{description}</blockquote>
    </figure>
  );
}

export default CommentCard;
