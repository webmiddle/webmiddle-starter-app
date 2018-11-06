import { rootContext } from "webmiddle";
import path from "path";
import fs from "fs";
import FetchPageLinks from "./services/FetchPageLinks";

rootContext
  .evaluate(
    <FetchPageLinks
      name="hackernews"
      url="https://news.ycombinator.com/"
      query="show hn"
    />
  )
  .then(resource => {
    console.log(JSON.stringify(resource, null, 2));
  });
