import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const resultSendEmail = await fetch("https://api.lifx.com/v1/lights/all", {
    method: "get",
    headers: new Headers({
      Authorization: `Bearer ${process.env.APP_TOKEN}`,
    }),
  });
  const result = await resultSendEmail.text();
  res.send(result);
};
