"use client";

import { useState } from "react";
import { toast } from "sonner";
import { categories } from "@/components/categories";
import FormField from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { todayString } from "@/lib/format";
import { validateEvent, type Errors, type EventValues } from "@/lib/validation";

// The form used by BOTH "Create Event" and "Edit Event".
//  - initialValues : the starting values (empty for a new event)
//  - originalDate  : only for editing, so an old date can stay unchanged
//  - onSubmit      : called with the clean values when validation passes
export default function EventForm({
  initialValues,
  originalDate,
  submitLabel,
  loading,
  onSubmit,
  onCancel,
}: {
  initialValues?: EventValues;
  originalDate?: string;
  submitLabel: string;
  loading: boolean;
  onSubmit: (values: EventValues) => void;
  onCancel?: () => void;
}) {
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const values: EventValues = {
      title: String(formData.get("title") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      category: String(formData.get("category") ?? ""),
      thumbnailImageUrl: String(formData.get("thumbnailImageUrl") ?? "").trim(),
      location: String(formData.get("location") ?? "").trim(),
      date: String(formData.get("date") ?? ""),
    };

    const newErrors = validateEvent(values, originalDate);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors)[0]);
      return;
    }
    onSubmit(values);
  };

  // the calendar greys out past days (unless we are editing an event that is already old)
  const minDate = originalDate && originalDate < todayString() ? originalDate : todayString();

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <FormField label="Title" htmlFor="title" error={errors.title}>
        <Input
          id="title"
          name="title"
          placeholder="Winter blanket drive"
          defaultValue={initialValues?.title}
          aria-invalid={!!errors.title}
        />
      </FormField>

      <FormField label="Description" htmlFor="description" error={errors.description}>
        <Textarea
          id="description"
          name="description"
          rows={5}
          placeholder="What will volunteers do?"
          defaultValue={initialValues?.description}
          aria-invalid={!!errors.description}
        />
      </FormField>

      <FormField label="Event type" htmlFor="category" error={errors.category}>
        <Select
          id="category"
          name="category"
          defaultValue={initialValues?.category ?? categories[0]}
          aria-invalid={!!errors.category}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField label="Thumbnail image URL" htmlFor="thumbnailImageUrl" error={errors.thumbnailImageUrl}>
        <Input
          id="thumbnailImageUrl"
          name="thumbnailImageUrl"
          type="url"
          placeholder="https://..."
          defaultValue={initialValues?.thumbnailImageUrl}
          aria-invalid={!!errors.thumbnailImageUrl}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Location" htmlFor="location" error={errors.location}>
          <Input
            id="location"
            name="location"
            placeholder="Town Hall Square"
            defaultValue={initialValues?.location}
            aria-invalid={!!errors.location}
          />
        </FormField>

        <FormField label="Date" htmlFor="date" error={errors.date}>
          <Input
            id="date"
            name="date"
            type="date"
            min={minDate}
            defaultValue={initialValues?.date}
            aria-invalid={!!errors.date}
          />
        </FormField>
      </div>

      <div className="flex gap-3">
        <Button type="submit" size="lg" className="h-10 flex-1" disabled={loading}>
          {loading ? "Please wait..." : submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" size="lg" className="h-10" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
