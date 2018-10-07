import { isResource } from 'webmiddle';
import testWrapper from '../test-wrapper';
import FetchPageLinks from '../services/FetchPageLinks';

const { test, testServices } = testWrapper();
export default testServices;

test('must return a valid JSON resource', (props, context) => {
  return context.extend({ expectResource: true }).evaluate(
    <FetchPageLinks
      name="hackernews"
      url="https://news.ycombinator.com/"
      query="show hn"
    />
  );
}, (resource, t) => {
  t.true(isResource(resource));
  t.is(resource.contentType, 'application/json');
  t.is(typeof resource.content.root, 'object');
});
