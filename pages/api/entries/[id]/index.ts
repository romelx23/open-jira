import type { NextApiRequest, NextApiResponse } from "next";
import moongose from "mongoose";
import { db } from "../../../../database";
import { Entry } from "../../../../models";
import { IEntry } from "../../../../models/Entry";

type Data = { message: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const { id } = req.query;
  // if (!moongose.isValidObjectId(id)) {
  //   return res.status(400).json({ message: "El id no es valido " + id });
  // }
  switch (req.method) {
    case "GET":
      return getEntry(req, res);
    case "PUT":
      return updateEntry(req, res);
    default:
      return res.status(405).json({ message: "Metodo no existe" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  const entryToUpdate = await Entry.findById(id);
  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(404).json({ message: "No se encontro la entrada" });
  }
  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;
  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );
    return res.status(200).json(updatedEntry!);
  } catch (error: any) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: error.errors.status.message });
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  try {
    const entryToGet = await Entry.findById(id);
    if (!entryToGet) {
      await db.disconnect();
      return res.status(404).json({ message: "No se encontro la entrada" });
    }

    return res.status(200).json(entryToGet);
  } catch (error: any) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: error.errors.status.message });
  }
};
