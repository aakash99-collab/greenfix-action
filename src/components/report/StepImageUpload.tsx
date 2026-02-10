import { useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload, X, MapPin } from "lucide-react";
import { ReportLocation } from "@/lib/types";

interface Props {
  images: string[];
  setImages: (imgs: string[]) => void;
  location: ReportLocation | null;
  setLocation: (loc: ReportLocation | null) => void;
}

export default function StepImageUpload({ images, setImages, location, setLocation }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const newImages = [...images];
      Array.from(files).forEach((file) => {
        if (newImages.length >= 5) return;
        if (file.size > 2 * 1024 * 1024) return; // skip > 2MB
        const url = URL.createObjectURL(file);
        newImages.push(url);
      });
      setImages(newImages);
    },
    [images, setImages]
  );

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const captureLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          address: "",
        });
      },
      () => {
        // fallback: set a dummy location
        setLocation({ lat: 22.5726, lng: 88.3639, address: "" });
      }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-lg font-semibold mb-1">Upload Images</h3>
        <p className="text-sm text-muted-foreground">
          Take photos or upload 2–5 images of the climate issue (max 2MB each)
        </p>
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((src, i) => (
          <div key={i} className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
            <img src={src} alt={`Upload ${i + 1}`} className="h-full w-full object-cover" />
            <button
              onClick={() => removeImage(i)}
              className="absolute right-1 top-1 rounded-full bg-background/80 p-1 hover:bg-destructive hover:text-destructive-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        {images.length < 5 && (
          <button
            onClick={() => fileRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-muted/50 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Upload className="h-6 w-6" />
            <span className="text-xs font-medium">Add Photo</span>
          </button>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="gap-2" onClick={() => fileRef.current?.click()}>
          <Upload className="h-4 w-4" /> Upload Files
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => {
            // Use file input with capture for camera
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.capture = "environment";
            input.onchange = (e) => handleFiles((e.target as HTMLInputElement).files);
            input.click();
          }}
        >
          <Camera className="h-4 w-4" /> Use Camera
        </Button>
      </div>

      {/* Location */}
      <div className="space-y-3 border-t pt-4">
        <h3 className="font-display text-lg font-semibold flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" /> Location
        </h3>
        {location ? (
          <div className="rounded-lg border bg-muted/50 p-3 text-sm">
            <p className="font-medium">📍 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
            <div className="mt-2">
              <Label htmlFor="address" className="text-xs">Address (optional)</Label>
              <Input
                id="address"
                placeholder="Enter address manually..."
                value={location.address}
                onChange={(e) => setLocation({ ...location, address: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
        ) : (
          <Button variant="outline" size="sm" className="gap-2" onClick={captureLocation}>
            <MapPin className="h-4 w-4" /> Capture GPS Location
          </Button>
        )}
      </div>
    </div>
  );
}
