import { PropTypes } from "webmiddle";
import Pipe from "webmiddle-component-pipe";
import HttpRequest from "webmiddle-component-http-request";
import HtmlToJson, { $$ } from "webmiddle-component-cheerio-to-json";

function FetchPageLinks({ url, query, name }) {
  return (
    <Pipe>
      <HttpRequest contentType="text/html" url={url} />

      {rawHtml => (
        <HtmlToJson
          name={name}
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
  query: PropTypes.string.isRequired,
  name: PropTypes.string
};

export default FetchPageLinks;
