import { GetServerSidePropsContext } from "next";
import fs from "fs";

export default function sitemap() {}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const files = fs.readdirSync("src/pages");

  ctx.res.setHeader("Content-Type", "application/json");
  ctx.res.write(JSON.stringify(files));
  ctx.res.end();

  return { props: {} };
}
