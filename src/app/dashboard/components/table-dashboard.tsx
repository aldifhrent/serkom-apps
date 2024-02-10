import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Beasiswa } from "@prisma/client"
import Link from "next/link"
import EditSheet from "./edit-sheet"
import { FileCheck } from "lucide-react"

interface BeasiswaProps {
    beasiswa: Beasiswa[]
    handleDelete: (id: string) => void;
}
const TableDashboard = ({beasiswa, handleDelete}: BeasiswaProps) => {
    return (
        <Table className="mt-12 ">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">No</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Phone Number</TableHead>
            <TableHead className="text-center">Semester</TableHead>
            <TableHead className="text-center">IPK</TableHead>
            <TableHead className="text-center">Beasiswa</TableHead>
            <TableHead className="text-center">Berkas</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
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
              <TableCell className="font-medium">{value.email}</TableCell>
              <TableCell className="font-medium">
                {value.phoneNumber}
              </TableCell>
              <TableCell className="font-medium">{value.semester}</TableCell>
              <TableCell className="font-medium">{value.ipk}</TableCell>
              <TableCell className="font-medium">
                {value.tipeBeasiswa}
              </TableCell>
              <TableCell className="font-medium">
              <Link
                  href={value.berkas ? value.berkas : ""}
                  target="_blank"
                >
                  {value.berkas ? (
                    <FileCheck size={35} className="mx-auto" />
                  ) : (
                    null
                  )}
                </Link>
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
              <TableCell className="flex gap-x-2">
                <EditSheet id={value.id} />
                <Button
                  onClick={() => handleDelete(value.id)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}

export default TableDashboard