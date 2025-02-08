import BlogLayout from "@/components/layout/home";
import { api, combineURLQuery } from "@/modules/utils";
import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const slug = ctx.params?.slug as string;

    const filter = {
      where: {
        ...(process.env.NODE_ENV === "production" && {
          is_published: { eq: true },
        }),
      },
      limit: 25,
      relations: { author: {}, draft: {}, live: {}, settings: {}, tags: {} },
    };
    const url = combineURLQuery(`/v1/tag/${slug}/stories`, {
      filter: JSON.stringify(filter),
    });

    const resp = await api.get(url);

    return { props: { stories: resp.data } };
  } catch (error) {
    console.error("An error occurred while fetching tag", error);
    return {};
  }
};

export default function TagsRoute(props: any) {
  console.log(props);

  return (
    <>
      <BlogLayout></BlogLayout>
    </>
  );
}
