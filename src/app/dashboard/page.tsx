"use client";

import Navbar from "@/components/navbar";

import { toast } from "sonner";
import { useDeleteBeasiswa } from "./actions";
import TableDashboard from "./components/table-dashboard";
import { useFetch } from "../../../actions";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const route = useRouter();
  const { data: beasiswa } = useFetch();
  const { mutate: deleteBeasiswa } = useDeleteBeasiswa();
  const handleDelete = async (id: string) => {
    try {
      deleteBeasiswa(id);
      toast.success("Successfully deleted");
      route.refresh();
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen mx-auto items-center justify-center">
        <h1 className="mt-4 text-center text-2xl font-bold">
          Dashboard Beasiswa
        </h1>
        <TableDashboard beasiswa={beasiswa} handleDelete={handleDelete} />
      </div>
    </>
  );
};

export default DashboardPage;
