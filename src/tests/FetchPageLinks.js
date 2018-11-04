import { isResource } from "webmiddle";
import testWrapper from "../test-wrapper";
import FetchPageLinks from "../services/FetchPageLinks";

const { test, testServices } = testWrapper();
export default testServices;

test(
  "must return a valid JSON resource",
  (props, context) => {
    // evaluate something here
    // `props` and `context.options` can be specified with webmiddle-devtools
    return context
      .extend({ expectResource: true })
      .evaluate(
        <FetchPageLinks
          name="hackernews"
          url="https://news.ycombinator.com/"
          query="show hn"
          {...props}
        />
      );
  },
  (result, t) => {
    t.true(isResource(result));
    t.is(result.name, "hackernews");
    t.is(result.contentType, "application/json");
    t.is(typeof result.content.anchors, "object");
  },
  (err, t) => {
    // do assertions with `t` on error `err`
    return Promise.reject(err); // (this is the default when callback is omitted)
  }
);
