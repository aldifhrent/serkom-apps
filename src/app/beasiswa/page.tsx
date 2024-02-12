"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from "@/components/navbar";

import { Beasiswa } from "@prisma/client"
import moment from "moment"
import { useFetch } from "../../../actions";
const BeasiswaPage = () => {
  const { data: beasiswa } = useFetch();

  return (
    <>
      <Navbar />
      <div className="max-w-screen items-center justify-center mx-auto">
        <h1 className="text-center text-2xl font-bold mt-4">
          Data Beasiswa
        </h1>

        <p className="text-center text-xs mt-2">Update data setiap hari</p>
        <Table className="mt-12 ">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">No</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Semester</TableHead>
              <TableHead className="text-center">IPK</TableHead>
              <TableHead className="text-center">Beasiswa</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {beasiswa?.map((value: Beasiswa, index: number) => (
              <TableRow
                key={index}
                className="items-center text-center justify-center"
              >
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{value.name}</TableCell>
                <TableCell className="font-medium">{value.semester}</TableCell>
                <TableCell className="font-medium">{value.ipk}</TableCell>
                <TableCell className="font-medium">
                  {value.tipeBeasiswa}
                </TableCell>
                <TableCell className="font-medium w-fit">
                  {value.status === "Belum Verifikasi" ? (
                    <span className="bg-red-700 rounded-md p-2 text-white ">
                      {value.status}
                    </span>
                  ) : (
                    <span className="bg-green-700 rounded-md p-2 text-white">
                      {value.status}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default BeasiswaPage;
