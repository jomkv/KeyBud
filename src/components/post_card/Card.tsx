import { Card as BootstrapCard } from "react-bootstrap";

import { IPost } from "../../@types/postType";
import CardFooter from "../post_card/CardFooter";
import CardHeader from "../post_card/CardHeader";
import Comments from "../post/Comments";

interface ICardProps {
  post: IPost;
  isPostPage?: boolean;
}

const Card: React.FC<ICardProps> = ({ post, isPostPage }) => {
  return (
    <BootstrapCard
      className="bg-secondary"
      style={{
        color: "white",
      }}
    >
      <CardHeader post={post} isPostPage={isPostPage} />
      <BootstrapCard.Body className="pt-0 pb-0">
        {isPostPage && (
          <BootstrapCard.Text className="p-2 pt-0">
            {post?.description}
          </BootstrapCard.Text>
        )}
        {post.images && post.images.length > 0 && (
          <div className="d-flex justify-content-center">
            <img
              src={post.images[0].url}
              alt="content"
              className="img-fluid m-0 p-0"
            />
          </div>
        )}
      </BootstrapCard.Body>
      <CardFooter
        postId={post._id}
        initialLikeCount={post.likeCount}
        isPostLiked={post.isLiked}
        commentCount={post.commentCount}
      />
      {isPostPage && <Comments postId={post._id} />}
    </BootstrapCard>
  );
};

export default Card;
