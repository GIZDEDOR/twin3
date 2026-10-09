import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchPrismic, createPrismicScope } from '../lib/prismic-fetch.ts';

test('transient failures retry once, preserve Next cache options and recover', async () => {
  const original = globalThis.fetch; let calls = 0;
  try {
    globalThis.fetch = async (_, init) => {
      assert.equal(init.cache, 'force-cache'); assert.deepEqual(init.next, {tags:['prismic']});
      if (++calls === 1) throw new TypeError('fetch failed', {cause:Object.assign(new Error(),{code:'ETIMEDOUT'})});
      return new Response('{"ok":true}', {headers:{'content-type':'application/json'}});
    };
    assert.deepEqual(await (await fetchPrismic('https://example.test', {cache:'force-cache',next:{tags:['prismic']}})).json(), {ok:true});
    assert.equal(calls, 2);
  } finally { globalThis.fetch = original; }
});

test('stalled headers and body have a bounded deadline; never return empty success', async () => {
  const original = globalThis.fetch;
  try {
    for (const stage of ['headers','body']) {
      let calls = 0;
      globalThis.fetch = async (_, init) => {
        calls++;
        if (stage === 'headers') return new Promise((_, reject) => init.signal.addEventListener('abort',()=>reject(init.signal.reason)));
        return new Response(new ReadableStream({ start(controller) {
          init.signal.addEventListener('abort',()=>controller.error(init.signal.reason));
        }}));
      };
      await assert.rejects(fetchPrismic('https://example.test', undefined, 20), {name:'TimeoutError'});
      assert.equal(calls, 2);
    }
  } finally { globalThis.fetch = original; }
});

test('caller cancellation, HTTP errors and non-transient errors are not retried or masked', async () => {
  const original = globalThis.fetch;
  try {
    let calls = 0;
    globalThis.fetch = async () => { calls++; return new Response('forbidden',{status:403}); };
    assert.equal((await fetchPrismic('https://example.test')).status,403);assert.equal(calls,1);
    const failure = new Error('permanent');calls=0;
    globalThis.fetch = async () => { calls++; throw failure; };
    await assert.rejects(fetchPrismic('https://example.test'),e=>e===failure);assert.equal(calls,1);
    const controller = new AbortController();controller.abort();calls=0;
    globalThis.fetch = async (_, init) => { calls++; init.signal.throwIfAborted(); };
    await assert.rejects(fetchPrismic('https://example.test',{signal:controller.signal}),{name:'AbortError'});assert.equal(calls,0);
  } finally { globalThis.fetch = original; }
});


test('installed SDK cannot retry permanent 429 beyond two requests', async () => {
  const { createClient } = await import('@prismicio/client');
  const original = globalThis.fetch;let calls=0;
  try {
    globalThis.fetch=async()=>{calls++;return new Response('{}',{status:429,headers:{'retry-after':'0'}});};
    const scope=createPrismicScope({operationMs:150,attemptMs:100});
    const client=createClient('twin3',{fetch:scope.fetch});
    await assert.rejects(scope.run(()=>client.getRepository()),{name:'PrismicRateLimitError'});
    assert.equal(calls,2);
  } finally {globalThis.fetch=original;}
});

test('Retry-After beyond budget fails immediately and network failures remain finite', async () => {
  const original=globalThis.fetch;let calls=0;
  try {
    globalThis.fetch=async()=>{calls++;return new Response('{}',{status:429,headers:{'retry-after':'3600'}});};
    await assert.rejects(createPrismicScope({operationMs:100}).fetch('https://example.test'),{name:'PrismicRateLimitError'});
    assert.equal(calls,1);calls=0;
    const error=Object.assign(new Error(),{code:'ECONNRESET'});
    globalThis.fetch=async()=>{calls++;throw error;};
    await assert.rejects(createPrismicScope().fetch('https://example.test'),e=>e===error);
    assert.equal(calls,2);
  } finally {globalThis.fetch=original;}
});

test('common operation budget covers SDK work between requests', async () => {
  const scope=createPrismicScope({operationMs:25,attemptMs:100});
  await assert.rejects(scope.run(async()=>{await new Promise(resolve=>setTimeout(resolve,60));return 1;}),{name:'TimeoutError'});
  await assert.rejects(scope.fetch('https://example.test'),{name:'TimeoutError'});
});

test('equivalent concurrent and sequential GETs share one real HTTP request only within scope', async () => {
  const {createServer}=await import('node:http');let count=0;
  const server=createServer((req,res)=>{count++;res.setHeader('content-type','application/json');res.end('{"value":1}');});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  try {
    const url=`http://127.0.0.1:${server.address().port}/api/v2`;
    const scope=createPrismicScope();
    const results=await Promise.all([scope.fetch(url,{cache:'no-store'}),scope.fetch(url,{cache:'no-store'})]);
    assert.deepEqual(await results[0].json(),{value:1});assert.deepEqual(await results[1].json(),{value:1});
    assert.deepEqual(await (await scope.fetch(url,{cache:'no-store'})).json(),{value:1});assert.equal(count,1);
    await createPrismicScope().fetch(url,{cache:'no-store'});assert.equal(count,2);
    await scope.fetch(url+'?ref=preview',{cache:'no-store'});assert.equal(count,3);
    await scope.fetch(url,{cache:'no-store',headers:{authorization:'different'}});assert.equal(count,4);
  } finally {server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
});

test('one bounded 429 recovery preserves useful Retry-After handling', async () => {
  const original=globalThis.fetch;let calls=0;
  try {
    globalThis.fetch=async()=>++calls===1
      ? new Response('{}',{status:429,headers:{'retry-after':'0.01'}})
      : new Response('{"ok":true}');
    assert.deepEqual(await (await createPrismicScope({operationMs:500}).fetch('https://example.test')).json(),{ok:true});
    assert.equal(calls,2);
  } finally {globalThis.fetch=original;}
});
