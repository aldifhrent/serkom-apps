import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const beasiswa = await db.beasiswa.findMany({});
  return NextResponse.json(beasiswa);
};

export const POST = async (
  req: NextRequest,
) => {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phoneNumber,
      semester,
      ipk,
      tipeBeasiswa,
      status,
      berkas
    } = body;
    const beasiswa = await db.beasiswa.create({
      data: {
        name,
        email,
        phoneNumber,
        semester,
        ipk,
        tipeBeasiswa,
        berkas,
        status,
      },
    });

    return NextResponse.json(beasiswa);
  } catch (error) {
    console.log(error);
  }
};
