import { useState } from "react";
import { Upload, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ImageUploaderProps {
  onImageSelect: (file: File | null, url: string | null) => void;
  imagePreview: string | null;
}

export const ImageUploader = ({ onImageSelect, imagePreview }: ImageUploaderProps) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file, null);
    }
  };

  const handleUrlSubmit = () => {
    if (imageUrl) {
      onImageSelect(null, imageUrl);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Image</TabsTrigger>
          <TabsTrigger value="url">Image URL</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-smooth bg-card">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Click to upload an image</p>
              <p className="text-sm text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
            </label>
          </div>
        </TabsContent>
        
        <TabsContent value="url" className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleUrlSubmit} className="bg-gradient-primary">
              <LinkIcon className="w-4 h-4 mr-2" />
              Load
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {imagePreview && (
        <div className="mt-6 rounded-xl overflow-hidden shadow-large">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-64 object-contain bg-muted"
          />
        </div>
      )}
    </div>
  );
};