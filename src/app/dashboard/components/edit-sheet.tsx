"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formSchema } from "@/lib/schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditDashboard } from "../actions";
import { useFetchById } from "../../../../actions";
import { supabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface editSheetProps {
  id: string;
}
const EditSheet = ({ id }: editSheetProps) => {
  const route = useRouter();
  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const { mutateAsync: editDashboard } = useEditDashboard();
  const { mutateAsync: fetchDataById } = useFetchById();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      semester: "",
      ipk: "",
      tipeBeasiswa: "",
      berkas: "",
      status: "",
    },
  });
  async function fetchData(id: string) {
    try {
      const response = await fetchDataById(id);

      if (response) {
        form.setValue("name", response.name);
        form.setValue("email", response.email);
        form.setValue("phoneNumber", response.phoneNumber);
        form.setValue("semester", response.semester);
        form.setValue("ipk", response.ipk);
        form.setValue("tipeBeasiswa", response.tipeBeasiswa);
        form.setValue("berkas", response.berkas);
        form.setValue("status", response.status);
      }
    } catch (error) {
      toast.error("Error Fetching");
    }
  }
  useEffect(() => {
    fetchData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await editDashboard({ id: id, body: values });
      toast.success("Edit Success");
      route.refresh();
    } catch (error) {
      toast.error("Error");
      console.log(error);
    }
  }

  const handleFileChange = async (e: any) => {
    try {
      const selectedFile = e.target.files?.[0];
      if (!selectedFile) {
        // Handle if no file is selected
        return null;
      }
      const { data, error } = await supabaseClient.storage
        .from("berkas")
        .upload(`${selectedFile.name}`, selectedFile);

      if (error) {
        toast.error(error.message);
      }

      if (!error) {
        const promise = () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ name: "Berkas" }), 2000),
          );

        toast.promise(promise, {
          loading: "Loading...",
          success: () => {
            return `Berkas has been added`;
          },
          error: "Error",
        });
      }
      const publicUrl = await supabaseClient.storage
        .from("berkas")
        .getPublicUrl(data?.path as string);

      form.setValue("berkas", publicUrl.data.publicUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <ScrollArea className="h-full w-full items-center  rounded-md p-4">
          <SheetHeader className="mb-4">
            <SheetTitle>Edit Profile</SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {semesters.map((semester) => (
                            <SelectItem key={semester} value={semester}>
                              {semester}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ipk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IPK Terakhir</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="IPK" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tipeBeasiswa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beasiswa</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Beasiswa" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Akademik">Akademik</SelectItem>
                          <SelectItem value="Non Akademik">
                            Non Akademik
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="berkas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Berkas</FormLabel>
                    <FormControl>
                      <Input type="file" onChange={handleFileChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beasiswa</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Belum Verifikasi">
                            Belum Verifikasi
                          </SelectItem>
                          <SelectItem value="Sudah Terverifikasi">
                            Sudah Terverifikasi
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default EditSheet;
