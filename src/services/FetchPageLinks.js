import { PropTypes } from "webmiddle";
import Pipe from "webmiddle-component-pipe";
import HttpRequest from "webmiddle-component-http-request";
import HtmlToJson, { $$ } from "webmiddle-component-cheerio-to-json";

function FetchPageLinks({ url, query, waitFor }) {
  return (
    <Pipe>
      <HttpRequest
        name="rawHtml"
        contentType="text/html"
        url={url}
        waitFor={waitFor}
      />

      {rawHtml => (
        <HtmlToJson
          name="result"
          from={rawHtml}
          content={{
            anchors: $$.within(
              "a",
              $$.pipe(
                $$.filter(
                  el =>
                    el
                      .text()
                      .toUpperCase()
                      .indexOf(query.toUpperCase()) !== -1
                ),
                $$.map({
                  anchor: {
                    url: $$.attr("href"),
                    text: $$.getFirst()
                  }
                })
              )
            )
          }}
        />
      )}
    </Pipe>
  );
}

FetchPageLinks.propTypes = {
  url: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired
};

export default FetchPageLinks;
