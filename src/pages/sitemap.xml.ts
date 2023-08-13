import { GetServerSidePropsContext } from "next";
import fs from "fs";
import { globby } from "globby";

export default function sitemap() {}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const files = fs.readdirSync(".");

  console.log("files", files);

  ctx.res.setHeader("Content-Type", "application/json");
  ctx.res.write(JSON.stringify(files));
  ctx.res.end();

  return { props: {} };
}
