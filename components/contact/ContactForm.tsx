"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";
import { company, getWhatsAppUrl } from "@/lib/data/company";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    const message = `New enquiry from ${data.name}\nPhone: ${data.phone}${data.email ? `\nEmail: ${data.email}` : ""}\n\n${data.message}`;
    window.open(getWhatsAppUrl(message), "_blank");
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center border border-brand/20 bg-card px-8 py-16 text-center"
      >
        <CheckCircle className="h-12 w-12 text-brand" />
        <h3 className="mt-4 text-2xl font-extrabold text-foreground">
          Message sent
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Your enquiry has been opened in WhatsApp. Our team will respond
          shortly.
        </p>
        <Button
          variant="outline"
          className="mt-6 border-brand/30 hover:bg-brand/10 hover:text-brand"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-sm text-muted-foreground">
          Full Name
        </Label>
        <Input
          id="name"
          {...register("name")}
          className="mt-2 border-border bg-background"
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone" className="text-sm text-muted-foreground">
          Phone Number
        </Label>
        <Input
          id="phone"
          {...register("phone")}
          className="mt-2 border-border bg-background"
          placeholder="077 285 8359"
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email" className="text-sm text-muted-foreground">
          Email <span className="text-muted-foreground/60">(optional)</span>
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="mt-2 border-border bg-background"
          placeholder={company.email.startsWith("TODO") ? "your@email.com" : company.email}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message" className="text-sm text-muted-foreground">
          Message
        </Label>
        <Textarea
          id="message"
          {...register("message")}
          className="mt-2 min-h-32 border-border bg-background"
          placeholder="Tell us about the vehicle you're looking for..."
        />
        {errors.message && (
          <p className="mt-1 text-xs text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-brand text-white hover:bg-brand-dark"
      >
        <Send className="mr-2 h-4 w-4" />
        Send via WhatsApp
      </Button>
    </form>
  );
}
