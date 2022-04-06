import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import moongose from "mongoose";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  console.log(req.page.params);
  // if(req.page.name==='api/entries')
  const id = req.page.params?.id || "";
  const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  //   const { id } = req.query;
  if (!checkMongoIDRegExp.test(id)) {
    // return res.status(400).json({ message: "El id no es valido " + id });
    return new Response(
      JSON.stringify({ message: "El id no es valido " + id }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  console.log("middleware");
  return NextResponse.next();
}
