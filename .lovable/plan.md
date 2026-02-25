

## Problem Diagnosis

The edge function is deployed and working correctly (confirmed by direct test call returning a valid response). The "Failed to fetch" error occurs in the browser because:

1. **Payload too large**: Images up to 2MB each (max 5 = 10MB) are converted to base64 (which adds ~33% overhead), creating requests up to ~13MB. This exceeds browser/edge function request limits.
2. **No image compression**: Raw full-resolution photos are sent without any resizing.

## Solution

Resize and compress images client-side before sending to the edge function using an HTML Canvas.

### Changes

**File: `src/components/report/StepAIAnalysis.tsx`**

Replace the `toBase64` helper with a `resizeAndBase64` function that:
1. Loads each blob URL into an `Image` element
2. Draws it onto a canvas at a max dimension of 1024px (preserving aspect ratio)
3. Exports as JPEG at 70% quality
4. This reduces each image from potentially 2MB+ to ~50-150KB

```text
Before:  blob URL → FileReader → raw base64 (2MB+)
After:   blob URL → Image → Canvas(1024px) → JPEG 0.7 → base64 (~100KB)
```

The `runAnalysis` function will call `resizeAndBase64` instead of `toBase64`, keeping everything else the same.

