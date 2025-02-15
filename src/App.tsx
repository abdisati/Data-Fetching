import { get } from "./util/http";
import { useEffect, useState } from "react";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import fetchingImg from "./assets/data-fetching.png";
import { ReactNode } from "react";
import ErrorMessage from "./components/ErrorMessage";

type RawDataBlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      setError(undefined);

      try {
        const data = (await get(
          "https://jsonplaceholder.typicode.com/posts"
        )) as RawDataBlogPost[];

        const blogPosts: BlogPost[] = data.map((rawPost) => {
          return {
            id: rawPost.id,
            title: rawPost.title,
            text: rawPost.body,
          };
        });
        setFetchedPosts(blogPosts);
      } catch (err) {
        setError("Failed to fetch posts.");
      } finally {
        setIsFetching(false);
      }
    }
    fetchPosts();
  }, []);

  let content: ReactNode;
  if (error) {
    content = <ErrorMessage text={error} />;
  } else if (isFetching) {
    content = <p id="loading-fallback">Fetching posts....</p>;
  } else if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />;
  }

  return (
    <main>
      <img src={fetchingImg} alt="Fetching data..." />
      {content}
    </main>
  );
}

export default App;
