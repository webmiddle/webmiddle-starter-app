import test from 'ava';
import FetchPageLinks from '../src/services/FetchPageLinks';
import { rootContext, isResource } from 'webmiddle';

test('FetchPageLinks', async t => {
  const resource = await rootContext.extend({
    expectResource: true
  }).evaluate(
    <FetchPageLinks
      url="https://news.ycombinator.com/"
      query="javascript"
    />
  );

  t.true(isResource(resource));
  t.is(resource.contentType, 'application/json');
  t.is(typeof resource.content.root, 'object');
});
