import Link from "next/link";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { getBlogPosts } from "@/utils/blog";

export const UpdatesPage = () => {
  const allUpdates = getBlogPosts();

  return (
    <div className="py-32 wrapper wrapper-sm">
      <div className="mb-14 text-center page-intro">
        <h1>Blog</h1>
      </div>
      <div>
        <div className="space-y-8">
          {allUpdates
            .slice()
            .reverse()
            .map((post) => (
              <article
                key={post.slug}
                className="overflow-hidden w-full rounded-xl border"
              >
                <Link href={"/blog/" + post.slug}>
                  {post.metadata.image && (
                    <div className="w-full border-b">
                      <Image
                        src={post.metadata.image}
                        width={900}
                        height={400}
                        objectFit="cover"
                        alt={post.metadata.title}
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                  <div className="p-10 space-y-4">
                    <h2 className="text-xl text-gray-500 md:text-4xl">
                      {post.metadata.title}
                    </h2>
                    <div className="flex space-x-2">
                      <p className="text-gray-600">by {post.metadata.author}</p>
                      <span>{` • `}</span>
                      <p className="text-gray-600">
                        {format(
                          parseISO(post.metadata.publishedAt),
                          "MMMM dd, yyyy"
                        )}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {post.metadata.tags &&
                        post.metadata.tags
                          .split(", ")
                          .map((tag) => (
                            <p className="rounded-md bg-gray-200 font-medium px-2 py-0.5 text-sm text-gray-500">
                              {tag}
                            </p>
                          ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
        </div>
      </div>
    </div>
  );
};
