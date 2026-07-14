"use client";

import { useState, useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteVehicleAction } from "@/app/admin/(protected)/vehicles/actions";

interface DeleteVehicleButtonProps {
  vehicleId: string;
  vehicleName: string;
}

export function DeleteVehicleButton({
  vehicleId,
  vehicleName,
}: DeleteVehicleButtonProps) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const confirm = () => {
    startTransition(async () => {
      await deleteVehicleAction(vehicleId);
      setOpen(false);
    });
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label={`Delete ${vehicleName}`}
        className="text-muted-foreground hover:text-destructive"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete {vehicleName}?</DialogTitle>
            <DialogDescription>
              This removes the listing and its photos from the site. This
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              disabled={pending}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={pending}
              onClick={confirm}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete listing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
