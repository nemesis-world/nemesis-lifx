import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  res.send(req.query);
};
