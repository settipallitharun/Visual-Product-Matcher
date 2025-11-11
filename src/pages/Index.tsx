import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ImageUploader";
import { SimilaritySlider } from "@/components/SimilaritySlider";
import { ProductGrid } from "@/components/ProductGrid";
import { Loader2, Search, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  similarity: number;
}

const Index = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [minSimilarity, setMinSimilarity] = useState(0.1);
  const [isSearching, setIsSearching] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [imageDescription, setImageDescription] = useState<string>("");
  const { toast } = useToast();

  const handleImageSelect = (file: File | null, url: string | null) => {
    if (file) {
      setImageFile(file);
      setImageUrl(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (url) {
      setImageUrl(url);
      setImageFile(null);
      setImagePreview(url);
    }
  };

  const handleSearch = async () => {
    if (!imageFile && !imageUrl) {
      toast({
        title: "No image selected",
        description: "Please upload an image or provide an image URL",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setProducts([]);

    try {
      const formData = new FormData();
      formData.append('minScore', minSimilarity.toString());
      
      if (imageFile) {
        formData.append('image', imageFile);
      } else if (imageUrl) {
        formData.append('imageUrl', imageUrl);
      }

      const { data, error } = await supabase.functions.invoke('visual-search', {
        body: formData,
      });

      if (error) throw error;

      setProducts(data.results || []);
      setImageDescription(data.imageDescription || "");
      
      toast({
        title: "Search completed!",
        description: `Found ${data.results?.length || 0} matching products`,
      });
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search failed",
        description: error instanceof Error ? error.message : "An error occurred during search",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Visual Product Matcher
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Find Products Using
              <span className="bg-gradient-accent bg-clip-text text-transparent"> AI Vision</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload any product image and discover visually similar items from our catalog using advanced AI technology
            </p>
          </div>

          {/* Upload Section */}
          <div className="space-y-8">
            <ImageUploader
              onImageSelect={handleImageSelect}
              imagePreview={imagePreview}
            />

            {imagePreview && (
              <>
                <SimilaritySlider
                  value={minSimilarity}
                  onChange={setMinSimilarity}
                />

                <div className="flex justify-center">
                  <Button
                    onClick={handleSearch}
                    disabled={isSearching}
                    size="lg"
                    className="bg-gradient-primary shadow-glow hover:shadow-large transition-smooth"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5 mr-2" />
                        Find Similar Products
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Image Description */}
          {imageDescription && (
            <div className="bg-card rounded-xl p-6 shadow-medium">
              <h3 className="font-semibold text-lg mb-2">AI Analysis</h3>
              <p className="text-muted-foreground">{imageDescription}</p>
            </div>
          )}

          {/* Results Section */}
          {products.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">
                  Similar Products <span className="text-primary">({products.length})</span>
                </h3>
              </div>
              <ProductGrid products={products} />
            </div>
          )}

          {/* Empty State when no search done */}
          {!imagePreview && (
            <div className="text-center py-16 space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-primary/10 flex items-center justify-center">
                <Search className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Ready to start searching?</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Upload a product image or paste an image URL to find visually similar products in our catalog
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm mt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>Powered by Google Gemini Vision AI • 55+ Products in Catalog</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;