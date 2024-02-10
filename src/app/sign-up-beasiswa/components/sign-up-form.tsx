"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useCreateBeasiswa } from "../actions";
import { supabaseClient } from "@/lib/supabase/client";

const SignUpForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
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
      status: "Belum Verifikasi",
    },
  });
  const {
    mutateAsync: createBeasiswa,
    isError,
  } = useCreateBeasiswa();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createBeasiswa(values);

      if (isError) {
        toast.error("Error creating beasiswa");
      } else {
        toast.success("Successfully created");
        router.push("/beasiswa");
      }
    } catch (error) {
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
                <Input
                  placeholder="Phone Number"
                  {...field}
                  disabled={loading}
                />
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

              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={loading}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Semester" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {semesters.map((semester) => (
                      <SelectItem key={semester} value={semester}>
                        {semester}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

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
                <Input
                  type="number"
                  placeholder="IPK"
                  {...field}
                  disabled={loading}
                />
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
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={loading}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Tipe Beasiswa" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Akademik">Akademik</SelectItem>
                  <SelectItem value="Non Akademik">Non Akademik</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="berkas"
          render={() => (
            <FormItem>
              <FormLabel>Berkas</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mx-auto items-center text-center">
          <Button type="submit">Register</Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
