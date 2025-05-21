"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner";
import { createPitch } from "@/lib/actions";
import { useRouter } from "next/navigation";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);
      console.log(formValues);

      const result = await createPitch(prevState, formData, pitch);
      console.log(result);

      if (result.status === "SUCCESS") {
        toast.success("Your business pitch has been created successfully.");
      }
      router.push(`/startup/${result._id}`);
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast.error("Please check your inputs and try again.");

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }
      toast.error("An Unexpected error has occurred.");

      return {
        ...prevState,
        error: "An Unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form
      action={formAction}
      className="max-w-2xl mx-auto bg-white my-10 space-y-8 px-6"
    >
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          className="startup-form_input"
          id="title"
          name="title"
          required
          placeholder="Business Name"
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          className="startup-form_input"
          id="description"
          name="description"
          required
          placeholder="Describe your business"
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>
      <div>
        <label htmlFor="title" className="startup-form_label">
          Category
        </label>
        <Input
          className="startup-form_input"
          id="category"
          name="category"
          required
          placeholder="Business Category (like Education, Health, Sports etc)"
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>
      <div>
        <label htmlFor="title" className="startup-form_label">
          Image
        </label>
        <Input
          className="startup-form_input"
          id="link"
          name="link"
          required
          placeholder="Business URL"
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>
      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your business and what problem it solves.",
          }}
          previewOptions={{ disallowedElements: ["styles"] }}
          value={pitch}
          onChange={(value) => setPitch(value as string)}
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>
      <Button
        disabled={isPending}
        type="submit"
        className="startup-form_btn bg-[#ff0054] text-[#e0e1dd] hover:bg-[#ff3366]"
      >
        {isPending ? "Submitting..." : "Submit"}
        <Send className="size-5 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
