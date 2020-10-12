import type { NowRequest, NowResponse } from '@vercel/node'
import { fetchFeed } from '../srvsrc/feed'

export default (request: NowRequest, response: NowResponse) => {
  const { feed } = request.query
  const r = fetchFeed(feed as string)
  return response.status(200).send(JSON.stringify(r))
}
