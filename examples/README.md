## Examples

Included in this directory are several "batteries-included" samples that show how to deploy Speedybot on a variety of platforms/services. It doesn't matter if it's Serverless-less/Server-ful, Container-less-- it can probably run Speedybot. There's no "best" infrastructure solution but choices/options depending on your setup and requirements.

Grab an example and see the included README for instructions on how to quickly go from zero to an agent with which you can start collecting feedback from test users

| **Item**                                                  | **Remarks**                                                                                                                                                                |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[Expressjs](./express-incoming-webhook/README.md)**<br> | Sample agent running on a "boring" **[expressjs](https://expressjs.com/)** server                                                                                          |
| **[Lambda](./aws-lambda/README.md)**<br>                  | Sample agent running on a "serverless" **[AWS Lambda](https://aws.amazon.com/lambda/)** with live-code reload enabled with **[SST](https://sst.dev/)**                     |
| **[Deno](./deno/README.md)**                              | Sample agent running on the **[deno deploy platform](https://deno.com/deploy)**, see also the **["MultiBot" sample (one deno many bots)](./deno/multibot-deno/README.md)** |
| **[Workers](./worker/README.md)**                         | Sample agent running on **[V8 Isolates/"Workers"](https://developers.cloudflare.com/workers/learning/how-workers-works/#isolates)**                                        |
