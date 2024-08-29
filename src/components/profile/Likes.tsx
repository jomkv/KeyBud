import { IPost } from "../../@types/postType";
import ProfilePostCard from "./ProfilePostCard";

interface IPostsProps {
  posts: IPost[];
}

const Likes: React.FC<IPostsProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <ProfilePostCard key={post._id} post={post} />
      ))}
    </>
  );
};

export default Likes;
