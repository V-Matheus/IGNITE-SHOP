import { NextApiRequest, NextApiResponse } from "next";

export default function hendler(req: NextApiRequest, res: NextApiResponse) {
  return res.json({message: "Hello Word "})
}