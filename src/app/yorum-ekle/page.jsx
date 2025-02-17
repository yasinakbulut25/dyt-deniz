import CommentsSection from "@/components/sections/CommentsSection";
import AddCommentForm from "./AddCommentForm";

function AddComment() {
  return (
    <div>
      <AddCommentForm />
      <CommentsSection isAddPage={true} />
    </div>
  );
}

export default AddComment;
